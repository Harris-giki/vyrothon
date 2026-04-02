import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With Us — VYROTHON 2026",
  description: "Reach top builders, showcase your brand, and discover exceptional talent at VYROTHON 2026.",
};

export default function PartnerWithUs() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="hero-grid" />
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-15 bg-violet-900 animate-float top-[-200px] left-[calc(50%-300px)]" />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 bg-cyan-500 animate-float bottom-[-200px] right-[-100px]" style={{ animationDelay: "-4s" }} />
      </div>

      <div className="relative z-10 max-w-[720px] w-full">
        <div className="rounded-3xl p-10 sm:p-14 animate-fade-in-up" style={{ background: "var(--card-bg)", border: "1px solid var(--border)", backdropFilter: "blur(20px)" }}>
          <p className="text-sm font-medium text-brand-purple mb-6 tracking-wide">Work with us</p>

          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight mb-4">
            <span className="font-script italic" style={{ fontFamily: "var(--font-script)" }}>Partnership</span>
            <br />
            <span className="font-heading text-glow-purple">Opportunities</span>
          </h1>

          <div className="flex items-center gap-3 mb-10 themed-fg-secondary text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
              Community Partners
            </span>
            <span className="themed-fg-muted">|</span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              University Chapters
            </span>
          </div>

          <p className="text-lg leading-relaxed mb-10 themed-fg-secondary">
            Join us in building Pakistan&apos;s largest in-house hackathon through strategic partnerships that drive meaningful impact and connect the brightest builders across the country.
          </p>

          <a
            href="mailto:m.haris@imagine.art?subject=VYROTHON%202026%20Partnership%20Inquiry"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            <span className="w-2 h-2 rounded-full bg-violet-700" />
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
