import { NextResponse } from "next/server";
import { appendToCsv, HEADERS } from "@/lib/csv";
import { appendToSheet, uploadToDrive } from "@/lib/google";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const track = formData.get("track") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const university = formData.get("university") as string;
    const domain = (formData.get("domain") as string) || "";
    const linkedin = (formData.get("linkedin") as string) || "";
    const github = (formData.get("github") as string) || "";
    const behanceOrInsta = (formData.get("behanceOrInsta") as string) || "";
    const portfolio = (formData.get("portfolio") as string) || "";
    const motivation = (formData.get("motivation") as string) || "";
    const experience = (formData.get("experience") as string) || "";
    const resumeFile = formData.get("resume") as File | null;

    if (!track || !fullName || !email || !phone || !university) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload resume to Google Drive (if configured)
    let resumeLink = "";
    if (resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      const timestamp = Date.now();
      const safeName = fullName.replace(/[^a-zA-Z0-9]/g, "_");
      const fileName = `${safeName}_${timestamp}_${resumeFile.name}`;

      const driveLink = await uploadToDrive(buffer, fileName, resumeFile.type);
      if (driveLink) {
        resumeLink = driveLink;
      } else {
        // Fallback: save locally if Drive isn't configured
        const fs = await import("fs");
        const path = await import("path");
        const uploadsDir = path.join(process.cwd(), "data", "uploads");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const localPath = path.join(uploadsDir, fileName);
        fs.writeFileSync(localPath, buffer);
        resumeLink = `local:${fileName}`;
      }
    }

    const row = {
      track,
      fullName,
      email,
      phone,
      university,
      domain,
      linkedin,
      github,
      behanceOrInsta,
      portfolio,
      resumeLink,
      motivation,
      experience,
    };

    // 1. Always write to local CSV as backup
    appendToCsv(row);

    // 2. Append to Google Sheet (if configured)
    const sheetValues = [
      new Date().toISOString(),
      track,
      fullName,
      email,
      phone,
      university,
      domain,
      linkedin,
      github,
      behanceOrInsta,
      portfolio,
      resumeLink,
      motivation,
      experience,
      "", // Score - Overall
      "", // Score - Round 1
      "", // Score - Round 2
      "", // Score - Round 3
    ];

    await appendToSheet(sheetValues);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Register API] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
