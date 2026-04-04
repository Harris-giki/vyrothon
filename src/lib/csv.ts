import { existsSync, appendFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const CSV_DIR = join(process.cwd(), "data");
const CSV_PATH = join(CSV_DIR, "registrations.csv");

const HEADERS = [
  "Timestamp",
  "Full Name",
  "Email",
  "Phone",
  "University",
  "Domains",
  "LinkedIn",
  "GitHub",
  "Behance/Portfolio",
  "Resume Link",
  "Motivation",
  "Experience",
  "Tech Stack & Tools",
  "Recent Technical Challenge",
  "Work Ethic & Collaboration",
  "Score - Overall",
  "Score - Round 1",
  "Score - Round 2",
  "Score - Round 3",
];

function escapeCsv(val: string): string {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

/** Local CSV is optional; Vercel and many hosts use a read-only filesystem — never throw. */
export function appendToCsv(row: Record<string, string>) {
  try {
    if (!existsSync(CSV_DIR)) {
      mkdirSync(CSV_DIR, { recursive: true });
    }
    if (!existsSync(CSV_PATH)) {
      writeFileSync(CSV_PATH, HEADERS.map(escapeCsv).join(",") + "\n", "utf-8");
    }

    const values = [
      new Date().toISOString(),
      row.fullName || "",
      row.email || "",
      row.phone || "",
      row.university || "",
      row.domains || "",
      row.linkedin || "",
      row.github || "",
      row.portfolio || "",
      row.resumeLink || "",
      row.motivation || "",
      row.experience || "",
      row.techStack || "",
      row.techChallenge || "",
      row.workEthic || "",
      "",
      "",
      "",
      "",
    ];

    appendFileSync(CSV_PATH, values.map(escapeCsv).join(",") + "\n", "utf-8");
  } catch (err) {
    console.warn("[CSV] Skipping local file (read-only or unavailable):", err);
  }
}

export { HEADERS };
