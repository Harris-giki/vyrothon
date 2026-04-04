import { NextResponse } from "next/server";
import { appendToCsv } from "@/lib/csv";
import { appendToSheet, uploadToDrive } from "@/lib/google";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const university = formData.get("university") as string;
    const domainList = formData.getAll("domains") as string[];
    const domains = domainList.filter(Boolean).join("; ");
    const linkedin = (formData.get("linkedin") as string) || "";
    const github = (formData.get("github") as string) || "";
    const portfolio = (formData.get("portfolio") as string) || "";
    const motivation = (formData.get("motivation") as string) || "";
    const experience = (formData.get("experience") as string) || "";
    const techStack = (formData.get("techStack") as string) || "";
    const techChallenge = (formData.get("techChallenge") as string) || "";
    const workEthic = (formData.get("workEthic") as string) || "";
    const resumeFile = formData.get("resume") as File | null;

    if (!fullName || !email || !phone || !university) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!domains) {
      return NextResponse.json(
        { error: "Select at least one domain" },
        { status: 400 }
      );
    }

    if (!linkedin?.trim() || !github?.trim() || !portfolio?.trim()) {
      return NextResponse.json(
        { error: "LinkedIn, GitHub, and Behance/Portfolio links are required" },
        { status: 400 }
      );
    }

    if (!motivation?.trim()) {
      return NextResponse.json(
        { error: "Motivation is required" },
        { status: 400 }
      );
    }

    if (!experience?.trim()) {
      return NextResponse.json(
        { error: "Please answer the hackathon experience question" },
        { status: 400 }
      );
    }

    if (!techStack?.trim() || !techChallenge?.trim() || !workEthic?.trim()) {
      return NextResponse.json(
        { error: "Please answer all technical and work ethic questions" },
        { status: 400 }
      );
    }

    if (!resumeFile || typeof resumeFile === "string" || resumeFile.size === 0) {
      return NextResponse.json(
        { error: "Resume file is required (PDF, DOC, or DOCX)" },
        { status: 400 }
      );
    }

    let resumeLink = "";
    const buffer = Buffer.from(await resumeFile.arrayBuffer());
    const timestamp = Date.now();
    const safeName = fullName.replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `${safeName}_${timestamp}_${resumeFile.name}`;

    const driveLink = await uploadToDrive(buffer, fileName, resumeFile.type);
    if (driveLink) {
      resumeLink = driveLink;
    } else {
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

    const row = {
      fullName,
      email,
      phone,
      university,
      domains,
      linkedin,
      github,
      portfolio,
      resumeLink,
      motivation,
      experience,
      techStack,
      techChallenge,
      workEthic,
    };

    appendToCsv(row);

    const sheetValues = [
      new Date().toISOString(),
      fullName,
      email,
      phone,
      university,
      domains,
      linkedin,
      github,
      portfolio,
      resumeLink,
      motivation,
      experience,
      techStack,
      techChallenge,
      workEthic,
      "",
      "",
      "",
      "",
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
