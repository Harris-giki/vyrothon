import { google } from "googleapis";
import { Readable } from "stream";

/**
 * Prefer GOOGLE_PRIVATE_KEY_BASE64 on Vercel (base64 of full PEM) to avoid newline/quote issues.
 * Or use GOOGLE_PRIVATE_KEY with literal \n between lines in a single env value.
 */
function resolvePrivateKey(): string | undefined {
  const b64 = process.env.GOOGLE_PRIVATE_KEY_BASE64?.trim();
  if (b64?.length) {
    try {
      const decoded = Buffer.from(b64, "base64").toString("utf8").trim();
      if (decoded.includes("BEGIN") && decoded.includes("PRIVATE KEY")) {
        return decoded;
      }
      console.error(
        "[Google] GOOGLE_PRIVATE_KEY_BASE64 decoded but is not a valid PEM private key"
      );
    } catch {
      console.error("[Google] GOOGLE_PRIVATE_KEY_BASE64 is not valid base64");
    }
    // Fall through to GOOGLE_PRIVATE_KEY if base64 was wrong but PEM env is set
  }

  let raw = process.env.GOOGLE_PRIVATE_KEY;
  if (!raw?.trim()) return undefined;

  raw = raw.trim().replace(/^\uFEFF/, "");
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    raw = raw.slice(1, -1);
  }

  let key = raw.replace(/\\n/g, "\n").replace(/\\r\n/g, "\n").trim();

  if (key.includes("BEGIN") && key.includes("PRIVATE KEY")) {
    key = normalizeServiceAccountPem(key);
  }

  return key;
}

/** Collapse whitespace in PEM body and re-wrap at 64 cols — fixes ERR_OSSL_UNSUPPORTED from mangled pastes */
function normalizeServiceAccountPem(pem: string): string {
  const headerMatch = pem.match(/-----BEGIN [A-Z ]+-----/);
  const footerMatch = pem.match(/-----END [A-Z ]+-----/);
  if (!headerMatch || !footerMatch) return pem;

  const header = headerMatch[0];
  const footer = footerMatch[0];
  const hIdx = pem.indexOf(header);
  const fIdx = pem.indexOf(footer);
  if (hIdx === -1 || fIdx === -1 || fIdx <= hIdx + header.length) return pem;

  const body = pem
    .slice(hIdx + header.length, fIdx)
    .replace(/\s+/g, "");
  if (body.length < 100 || !/^[A-Za-z0-9+/=]+$/.test(body)) return pem;

  const lines = body.match(/.{1,64}/g) ?? [];
  return `${header}\n${lines.join("\n")}\n${footer}`;
}

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const key = resolvePrivateKey();

  if (!email || !key) return null;

  try {
    return new google.auth.JWT({
      email,
      key,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
      ],
    });
  } catch (e) {
    console.error("[Google] JWT init failed:", e);
    return null;
  }
}

/**
 * Append a row to the configured Google Sheet.
 * The sheet must be shared with the service account email.
 */
export async function appendToSheet(values: string[]): Promise<boolean> {
  const auth = getAuth();
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!auth || !sheetId) {
    console.warn("[Google Sheets] Missing credentials or sheet ID — skipping.");
    return false;
  }

  try {
    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:Z",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [values] },
    });
    return true;
  } catch (err) {
    console.error("[Google Sheets] Append failed:", err);
    return false;
  }
}

/**
 * Upload a file buffer to the configured Google Drive folder.
 * Returns the file's webViewLink, or null on failure.
 */
export async function uploadToDrive(
  buffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<string | null> {
  const auth = getAuth();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!auth || !folderId) {
    console.warn("[Google Drive] Missing credentials or folder ID — skipping.");
    return null;
  }

  try {
    const drive = google.drive({ version: "v3", auth });
    const mime =
      mimeType && mimeType.trim()
        ? mimeType
        : "application/pdf";

    const res = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType: mime,
        body: Readable.from(buffer),
      },
      fields: "id, webViewLink",
    });

    return res.data.webViewLink ?? `https://drive.google.com/file/d/${res.data.id}/view`;
  } catch (err) {
    console.error("[Google Drive] Upload failed:", err);
    return null;
  }
}
