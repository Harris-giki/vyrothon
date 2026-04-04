"use client";

import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import { IconUpload, IconArrowRight, IconCheck } from "@/components/icons";

const WHATSAPP_COMMUNITY =
  "https://chat.whatsapp.com/HYd1ARpRodm342ubFR04Sl?mode=gi_t";

const DOMAIN_OPTIONS = [
  { value: "frontend", label: "Frontend Engineering" },
  { value: "backend", label: "Backend Engineering" },
  { value: "ai-ml", label: "AI / Machine Learning" },
  { value: "product-design", label: "Product Design (UI/UX)" },
] as const;

export function RegistrationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setFileName(`${file.name} (${sizeMB} MB)`);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const domains = formData.getAll("domains").filter(Boolean);
    if (domains.length === 0) {
      showToast("Select at least one domain you want to compete in", "error");
      return;
    }

    const resume = formData.get("resume");
    if (!resume || !(resume instanceof File) || resume.size === 0) {
      showToast("Please upload your resume (PDF, DOC, or DOCX)", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/register", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        showToast("Registration submitted successfully!");
      } else {
        showToast(data.error || "Something went wrong", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-16 animate-fade-in-up max-w-[520px] mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center">
          <IconCheck className="w-9 h-9 text-emerald-400" />
        </div>
        <h2 className="font-heading text-3xl font-bold mb-3">You&apos;re In!</h2>
        <p className="themed-fg-secondary mb-6">
          Your registration for VYROTHON 2026 has been submitted. We&apos;ll send a confirmation to your email shortly.
        </p>
        <div
          className="rounded-2xl p-6 mb-8 text-left"
          style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
        >
          <p className="text-sm font-semibold text-brand-purple mb-2 uppercase tracking-wider">Next step</p>
          <p className="text-sm themed-fg-secondary mb-4">
            Join the <span className="themed-fg font-medium">Vyro Community (Pakistan)</span> WhatsApp group — schedules, updates, and event details are shared there.
          </p>
          <a
            href={WHATSAPP_COMMUNITY}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all"
          >
            Join WhatsApp community
            <IconArrowRight className="w-[18px] h-[18px]" />
          </a>
        </div>
        <Link href="/details" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold themed-btn-secondary transition-all">
          View Event Details
        </Link>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-[700px] mx-auto">
        {/* PERSONAL INFORMATION */}
        <div className="mb-12">
          <h3 className="font-heading text-xl mb-6 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name <span className="text-pink-400">*</span></label>
              <input name="fullName" required className="form-input" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address <span className="text-pink-400">*</span></label>
              <input name="email" type="email" required className="form-input" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number <span className="text-pink-400">*</span></label>
              <input name="phone" type="tel" required className="form-input" placeholder="+92 3XX XXXXXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">University / Organization <span className="text-pink-400">*</span></label>
              <input name="university" required className="form-input" placeholder="e.g. NUST, FAST, GIKI" />
            </div>
          </div>
        </div>

        {/* DOMAINS */}
        <div className="mb-12">
          <h3 className="font-heading text-xl mb-2 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            Domain selection <span className="text-pink-400">*</span>
          </h3>
          <p className="text-sm themed-fg-muted mb-4">Select all areas you&apos;re comfortable competing in (you can choose more than one).</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DOMAIN_OPTIONS.map((d) => (
              <label
                key={d.value}
                className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-colors hover:bg-violet-950/10"
                style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
              >
                <input type="checkbox" name="domains" value={d.value} className="w-[18px] h-[18px] accent-violet-800 shrink-0 cursor-pointer" />
                <span className="text-sm font-medium themed-fg">{d.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* LINKS */}
        <div className="mb-12">
          <h3 className="font-heading text-xl mb-6 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            Profiles &amp; portfolio <span className="text-pink-400">*</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn <span className="text-pink-400">*</span></label>
              <input name="linkedin" type="url" required className="form-input" placeholder="https://linkedin.com/in/username" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">GitHub <span className="text-pink-400">*</span></label>
              <input name="github" type="url" required className="form-input" placeholder="https://github.com/username" />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Behance / Portfolio link <span className="text-pink-400">*</span></label>
            <input
              name="portfolio"
              type="url"
              required
              className="form-input"
              placeholder="https://behance.net/username or your portfolio URL"
            />
          </div>
        </div>

        {/* TECHNICAL & WORK ETHIC */}
        <div className="mb-12">
          <h3 className="font-heading text-xl mb-6 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            Technical background <span className="text-pink-400">*</span>
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                What languages, frameworks, or design tools do you use most? <span className="text-pink-400">*</span>
              </label>
              <textarea
                name="techStack"
                required
                className="form-textarea w-full min-h-[100px] resize-y"
                placeholder="e.g. React, TypeScript, Python, FastAPI, Figma, Framer — and your approximate comfort level with each."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Describe a recent technical or design problem you solved. What was your approach? <span className="text-pink-400">*</span>
              </label>
              <textarea
                name="techChallenge"
                required
                className="form-textarea w-full min-h-[120px] resize-y"
                placeholder="A bug you debugged, a feature you shipped, a UX flow you improved — keep it concrete."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                How do you handle deadlines, feedback, and collaboration on a team? <span className="text-pink-400">*</span>
              </label>
              <textarea
                name="workEthic"
                required
                className="form-textarea w-full min-h-[100px] resize-y"
                placeholder="Short honest answer — we want to understand how you work under pressure and with others."
              />
            </div>
          </div>
        </div>

        {/* RESUME UPLOAD */}
        <div className="mb-12">
          <h3 className="font-heading text-xl mb-6 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            Resume / Portfolio File <span className="text-pink-400">*</span>
          </h3>
          <div
            className="p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all hover:border-violet-800 hover:bg-violet-950/[0.08]"
            style={{ borderColor: "var(--border)" }}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("border-violet-800", "bg-violet-950/[0.08]"); }}
            onDragLeave={(e) => { e.currentTarget.classList.remove("border-violet-800", "bg-violet-950/[0.08]"); }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove("border-violet-800", "bg-violet-950/[0.08]");
              if (e.dataTransfer.files.length && fileRef.current) {
                fileRef.current.files = e.dataTransfer.files;
                const file = e.dataTransfer.files[0];
                setFileName(`${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
              }
            }}
          >
            <input ref={fileRef} type="file" name="resume" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} required />
            <IconUpload className="w-8 h-8 themed-fg-muted mx-auto mb-2" />
            <p className="text-sm themed-fg-secondary">Drag & drop your resume or <span className="text-brand-purple font-medium">browse</span></p>
            <p className="text-xs themed-fg-muted mt-1">PDF, DOC, DOCX — Max 5MB</p>
            {fileName && <p className="text-sm text-emerald-400 font-medium mt-3">{fileName}</p>}
          </div>
        </div>

        {/* MOTIVATION */}
        <div className="mb-12">
          <h3 className="font-heading text-xl mb-6 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            Motivation &amp; experience <span className="text-pink-400">*</span>
          </h3>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">What are you obsessed with building? Why VYROTHON? <span className="text-pink-400">*</span></label>
            <textarea name="motivation" required className="form-textarea w-full min-h-[120px] resize-y" placeholder="Tell us what drives you, what you're building, and why this hackathon excites you..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Any prior hackathon experience? <span className="text-pink-400">*</span>
            </label>
            <textarea
              name="experience"
              required
              className="form-textarea w-full min-h-[80px] resize-y"
              placeholder="Describe past hackathons or write &quot;None — this would be my first&quot; if you haven&apos;t joined one before."
            />
          </div>
        </div>

        {/* TERMS & SUBMIT */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer mb-6">
            <input type="checkbox" required className="w-[18px] h-[18px] mt-0.5 accent-violet-800 cursor-pointer" />
            <span className="text-sm themed-fg-secondary leading-relaxed">
              I confirm that the information provided is accurate and I agree to participate in VYROTHON 2026. I understand this is a full-day, in-person event at Vyro Office, NSTP NUST on April 18, 2026.
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all disabled:opacity-50"
          >
            {submitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                Submitting...
              </>
            ) : (
              <>Submit Registration <IconArrowRight className="w-[18px] h-[18px]" /></>
            )}
          </button>
        </div>
      </form>

      {toast && (
        <div className={`toast show ${toast.type === "error" ? "bg-red-500/15 border border-red-500/30 text-red-400" : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"}`}>
          {toast.msg}
        </div>
      )}
    </>
  );
}
