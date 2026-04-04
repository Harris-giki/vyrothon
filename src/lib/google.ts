import { google } from "googleapis";
import { Readable } from "stream";

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const raw = process.env.GOOGLE_PRIVATE_KEY;
  const key = raw?.replace(/\\n/g, "\n").trim();

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
