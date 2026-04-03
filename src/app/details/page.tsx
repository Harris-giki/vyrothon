import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  IconCode, IconMonitor, IconPen, IconBrain,
  IconArrowRight,
} from "@/components/icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Details — VYROTHON 2026",
    description: "Full details on stages, domains, and event schedule.",
};

export default function Details() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="relative pt-[140px] pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0"><div className="hero-grid" /><div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-violet-900 animate-float top-[-200px] left-[calc(50%-200px)]" /></div>
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">April 18, 2026 &middot; Vyro Office, NSTP NUST</span>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight mb-5">
            <span className="font-script">Event</span>{" "}
            <span className="font-heading text-gradient-purple">Details</span>
          </h1>
          <p className="text-lg themed-fg-secondary max-w-[600px] mx-auto leading-relaxed">A full-day, three-stage hackathon where individuals prove their skills, teams build MVPs, and the best win $5,000 in prizes.</p>
        </div>
      </section>

      {/* STAGES */}
      <section id="stages" className="py-28 px-6">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">Hackathon Structure</span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight mb-4">
                <span className="font-heading">Three Stages</span>{" "}
                <span className="font-script themed-fg-secondary">to the Top</span>
              </h2>
              <p className="text-lg themed-fg-secondary max-w-[600px] leading-relaxed">Each stage raises the bar. Only the best advance.</p>
            </div>
          </ScrollReveal>

          {/* Stage 1 */}
          <ScrollReveal>
            <div className="stage-accent relative rounded-2xl p-10 pl-12 mb-8 overflow-hidden" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
              <p className="font-mono text-xs text-brand-purple uppercase tracking-[0.15em] font-semibold mb-3">Stage 01</p>
              <h3 className="font-heading text-2xl font-bold mb-4 tracking-tight">Domain-Specific Challenge</h3>
              <p className="themed-fg-secondary leading-relaxed max-w-[700px]">Participants choose a domain and compete individually. Demonstrate your expertise in a focused, timed challenge. Top performers from each domain advance to Stage 2.</p>
              <div className="flex gap-3 flex-wrap mt-6">
                {[
                  { icon: IconCode, label: "Frontend Engineering" },
                  { icon: IconMonitor, label: "Backend Engineering" },
                  { icon: IconPen, label: "Product Design (UI/UX)" },
                  { icon: IconBrain, label: "AI / Machine Learning" },
                ].map((d) => (
                  <span key={d.label} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors hover:border-violet-800/50 hover:bg-violet-950/15" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                    <d.icon className="w-[18px] h-[18px]" /> {d.label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Stage 2 */}
          <ScrollReveal>
            <div className="stage-accent relative rounded-2xl p-10 pl-12 mb-8 overflow-hidden" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
              <p className="font-mono text-xs text-brand-purple uppercase tracking-[0.15em] font-semibold mb-3">Stage 02</p>
              <h3 className="font-heading text-2xl font-bold mb-4 tracking-tight">Cross-Functional Teams &amp; MVP Build</h3>
              <p className="themed-fg-secondary leading-relaxed max-w-[700px]">Advancing participants form cross-functional teams — one from each domain. Each team receives a real-world problem statement and must build a functional MVP under tight time constraints.</p>
            </div>
          </ScrollReveal>

          {/* Stage 3 */}
          <ScrollReveal>
            <div className="stage-accent relative rounded-2xl p-10 pl-12 overflow-hidden" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
              <p className="font-mono text-xs text-brand-purple uppercase tracking-[0.15em] font-semibold mb-3">Stage 03</p>
              <h3 className="font-heading text-2xl font-bold mb-4 tracking-tight">Final Presentations &amp; Awards</h3>
              <p className="themed-fg-secondary leading-relaxed max-w-[700px]">Teams present their MVPs to the Vyro judging panel. Winners are evaluated on execution, innovation, and product thinking. The total prize pool of $5,000 USD is distributed to the top 3 teams.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="py-28 px-6 themed-bg-alt" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">Event Day</span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight mb-4">
                <span className="font-heading">Schedule</span>{" "}
                <span className="font-script themed-fg-secondary">Overview</span>
              </h2>
              <p className="text-lg themed-fg-secondary max-w-[600px] leading-relaxed">Saturday, April 18, 2026 — Full day at Vyro Office, NSTP NUST.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:items-stretch">
            <ScrollReveal className="h-full">
              <div className="rounded-2xl p-8 h-full flex flex-col" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                <h3 className="font-heading text-lg mb-6"><span className="text-brand-purple">Morning</span> — Kickoff &amp; Stage 1</h3>
                <div className="timeline">
                  {[
                    { time: "09:00 AM", title: "Check-in & Registration", desc: "Arrive, get your badge, and settle in." },
                    { time: "09:30 AM", title: "Opening Ceremony", desc: "Welcome address and rules overview." },
                    { time: "10:00 AM", title: "Stage 1 Begins", desc: "Domain-specific individual challenges kick off." },
                    { time: "12:00 PM", title: "Stage 1 Ends & Lunch", desc: "Results announced. Top performers advance." },
                  ].map((item) => (
                    <div key={item.time} className="timeline-dot relative pl-6 pb-8">
                      <p className="font-mono text-xs text-cyan-400 mb-1">{item.time}</p>
                      <p className="font-heading font-semibold mb-1">{item.title}</p>
                      <p className="text-sm themed-fg-muted">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="h-full" delay={0.1}>
              <div className="rounded-2xl p-8 h-full flex flex-col" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                <h3 className="font-heading text-lg mb-6"><span className="text-cyan-400">Afternoon</span> — Stage 2 &amp; 3</h3>
                <div className="timeline">
                  {[
                    { time: "01:00 PM", title: "Team Formation & Problem Reveal", desc: "Cross-functional teams formed. Problem statements distributed." },
                    { time: "01:30 PM", title: "Stage 2 — MVP Build", desc: "Teams build functional MVPs under pressure." },
                    { time: "05:00 PM", title: "Stage 3 — Final Presentations", desc: "8-minute team presentations to judges panel." },
                    { time: "06:30 PM", title: "Awards & Closing Ceremony", desc: "Winners announced. Prizes distributed. Networking." },
                  ].map((item) => (
                    <div key={item.time} className="timeline-dot relative pl-6 pb-8">
                      <p className="font-mono text-xs text-cyan-400 mb-1">{item.time}</p>
                      <p className="font-heading font-semibold mb-1">{item.title}</p>
                      <p className="text-sm themed-fg-muted">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <p className="text-center text-xs themed-fg-muted mt-10">* Schedule is tentative. Final schedule will be shared with registered participants.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-glow relative py-28 px-6 text-center overflow-hidden" style={{ background: "var(--card-bg)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">Spots Are Limited</span>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight mb-5">
              <span className="font-script">Secure</span>{" "}
              <span className="font-heading text-gradient-purple">Your Place</span>
            </h2>
            <p className="text-lg themed-fg-secondary max-w-[600px] mx-auto leading-relaxed mb-10">Don&apos;t wait. Registrations close when capacity is reached.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link href="/register" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all">
              Register Now <IconArrowRight className="w-[18px] h-[18px]" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
