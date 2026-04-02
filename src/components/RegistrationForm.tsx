"use client";

import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import { IconUpload, IconArrowRight, IconCheck } from "@/components/icons";

type Track = "" | "engineering" | "product-design";

export function RegistrationForm() {
  const [track, setTrack] = useState<Track>("");
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

    if (!track) {
      showToast("Please select a track first", "error");
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
      <div className="text-center py-16 animate-fade-in-up">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center">
          <IconCheck className="w-9 h-9 text-emerald-400" />
        </div>
        <h2 className="font-heading text-3xl font-bold mb-3">You&apos;re In!</h2>
        <p className="themed-fg-secondary mb-8">Your registration for VYROTHON 2026 has been submitted. We&apos;ll send a confirmation to your email shortly.</p>
        <Link href="/details" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold themed-btn-secondary transition-all">
          View Event Details
        </Link>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-[700px] mx-auto">
        {/* TRACK SELECTION */}
        <div className="mb-12">
          <h3 className="font-heading text-xl mb-6 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>Select Your Track <span className="text-pink-400">*</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setTrack("engineering")}
              className={`p-6 rounded-2xl text-left transition-all ${
                track === "engineering"
                  ? "border-violet-800 bg-violet-950/20 shadow-[0_0_20px_rgba(91,33,182,0.2)]"
                  : "hover:border-violet-800/30"
              }`}
              style={track === "engineering"
                ? { border: "1px solid rgb(139,92,246)" }
                : { background: "var(--card-bg)", border: "1px solid var(--border)" }
              }
            >
              <div className="text-2xl mb-2">&#9000;</div>
              <h4 className="font-heading font-semibold text-lg mb-1">Engineering</h4>
              <p className="text-xs themed-fg-secondary">Frontend, Backend, or AI/ML</p>
            </button>

            <button
              type="button"
              onClick={() => setTrack("product-design")}
              className={`p-6 rounded-2xl text-left transition-all ${
                track === "product-design"
                  ? "border-pink-500 bg-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.15)]"
                  : "hover:border-pink-500/30"
              }`}
              style={track === "product-design"
                ? { border: "1px solid rgb(236,72,153)" }
                : { background: "var(--card-bg)", border: "1px solid var(--border)" }
              }
            >
              <div className="text-2xl mb-2">&#9998;</div>
              <h4 className="font-heading font-semibold text-lg mb-1">Product &amp; Design</h4>
              <p className="text-xs themed-fg-secondary">UI/UX, Visual Design</p>
            </button>
          </div>
          <input type="hidden" name="track" value={track} />
        </div>

        {track && (
          <>
            {/* PERSONAL INFORMATION */}
            <div className="mb-12 animate-fade-in-up">
              <h3 className="font-heading text-xl mb-6 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>Personal Information</h3>
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

            {/* ENGINEERING SPECIFIC FIELDS */}
            {track === "engineering" && (
              <div className="mb-12 animate-fade-in-up">
                <h3 className="font-heading text-xl mb-6 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>Engineering Domain &amp; Socials</h3>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Preferred Domain <span className="text-pink-400">*</span></label>
                  <select name="domain" required className="form-select">
                    <option value="" disabled selected>Select your domain</option>
                    <option value="frontend">Frontend Engineering</option>
                    <option value="backend">Backend Engineering</option>
                    <option value="ai-ml">AI / Machine Learning</option>
                  </select>
                </div>
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
                  <label className="block text-sm font-medium mb-2">Portfolio / Technical Link</label>
                  <input name="portfolio" type="url" className="form-input" placeholder="https://yourportfolio.com or any link to judge technical ability" />
                </div>
              </div>
            )}

            {/* PRODUCT & DESIGN SPECIFIC FIELDS */}
            {track === "product-design" && (
              <div className="mb-12 animate-fade-in-up">
                <h3 className="font-heading text-xl mb-6 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>Design Socials &amp; Portfolio</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn <span className="text-pink-400">*</span></label>
                    <input name="linkedin" type="url" required className="form-input" placeholder="https://linkedin.com/in/username" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Instagram or Behance <span className="text-pink-400">*</span></label>
                    <input name="behanceOrInsta" type="url" required className="form-input" placeholder="https://behance.net/username" />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">YouTube or Portfolio <span className="themed-fg-muted text-xs">(optional)</span></label>
                  <input name="portfolio" type="url" className="form-input" placeholder="https://youtube.com/@channel or portfolio link" />
                </div>
              </div>
            )}

            {/* RESUME UPLOAD */}
            <div className="mb-12 animate-fade-in-up">
              <h3 className="font-heading text-xl mb-6 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>Resume / Portfolio File</h3>
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
            <div className="mb-12 animate-fade-in-up">
              <h3 className="font-heading text-xl mb-6 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>Motivation &amp; Obsessions</h3>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">What are you obsessed with building? Why VYROTHON? <span className="text-pink-400">*</span></label>
                <textarea name="motivation" required className="form-textarea w-full min-h-[120px] resize-y" placeholder="Tell us what drives you, what you're building, and why this hackathon excites you..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Any prior hackathon experience?</label>
                <textarea name="experience" className="form-textarea w-full min-h-[80px] resize-y" placeholder="Brief description of hackathons you've participated in (if any)..." />
              </div>
            </div>

            {/* TERMS & SUBMIT */}
            <div className="animate-fade-in-up">
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
          </>
        )}
      </form>

      {/* TOAST */}
      {toast && (
        <div className={`toast show ${toast.type === "error" ? "bg-red-500/15 border border-red-500/30 text-red-400" : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"}`}>
          {toast.msg}
        </div>
      )}
    </>
  );
}
