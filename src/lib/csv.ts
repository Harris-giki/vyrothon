import { existsSync, appendFileSync, writeFileSync } from "fs";
import { join } from "path";

const CSV_DIR = join(process.cwd(), "data");
const CSV_PATH = join(CSV_DIR, "registrations.csv");

const HEADERS = [
  "Timestamp",
  "Track",
  "Full Name",
  "Email",
  "Phone",
  "University",
  "Domain",
  "LinkedIn",
  "GitHub",
  "Behance/Instagram",
  "Portfolio",
  "Resume Link",
  "Motivation",
  "Experience",
  // Score columns (filled by judges later)
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

export function appendToCsv(row: Record<string, string>) {
  if (!existsSync(CSV_PATH)) {
    writeFileSync(CSV_PATH, HEADERS.map(escapeCsv).join(",") + "\n", "utf-8");
  }

  const values = [
    new Date().toISOString(),
    row.track || "",
    row.fullName || "",
    row.email || "",
    row.phone || "",
    row.university || "",
    row.domain || "",
    row.linkedin || "",
    row.github || "",
    row.behanceOrInsta || "",
    row.portfolio || "",
    row.resumeLink || "",
    row.motivation || "",
    row.experience || "",
    "", // Score - Overall (blank for judges)
    "", // Score - Round 1
    "", // Score - Round 2
    "", // Score - Round 3
  ];

  appendFileSync(CSV_PATH, values.map(escapeCsv).join(",") + "\n", "utf-8");
}

export { HEADERS };
