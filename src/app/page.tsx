import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  IconCalendar, IconMapPin, IconClock, IconArrowRight,
  IconUser, IconUsers, IconTrophy,
} from "@/components/icons";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-6 pt-[120px] pb-20">
        <div className="absolute inset-0">
          <div className="hero-grid" />
          <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-15 bg-violet-900 animate-float top-[-200px] left-[calc(50%-300px)]" />
          <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-15 bg-cyan-500 animate-float bottom-[-200px] right-[-100px]" style={{ animationDelay: "-4s" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 bg-blue-500 animate-float top-1/2 left-[-100px]" style={{ animationDelay: "-2s" }} />
        </div>

        <div className="relative z-10 max-w-[900px]">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-10 animate-fade-in-up" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span className="text-xs font-medium themed-fg-secondary uppercase tracking-widest">Prize Pool</span>
            <span className="font-heading font-bold text-sm text-gradient-gold">$5,000 USD</span>
          </div>

          <h1 className="text-[clamp(3rem,9vw,7rem)] font-bold leading-[1.05] tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span className="font-script italic" style={{ fontFamily: "var(--font-script)" }}>Build the</span>{" "}
            <span className="font-heading text-gradient-purple">Future,</span>
            <br />
            <span className="font-heading">Unbound by</span>{" "}
            <span className="font-script italic text-glow-purple" style={{ fontFamily: "var(--font-script)" }}>Limits</span>
          </h1>

          <p className="text-[clamp(1rem,2vw,1.25rem)] max-w-[600px] mx-auto mb-14 leading-relaxed animate-fade-in-up themed-fg-secondary" style={{ animationDelay: "0.2s" }}>
            Pakistan&apos;s largest fully in-house hackathon — 3 stages, cross-functional teams, real-world problems.
          </p>

          <div className="flex justify-center gap-8 mb-12 flex-wrap animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {[
              { icon: IconCalendar, text: "Saturday, 18 April 2026" },
              { icon: IconMapPin, text: "Vyro Office, NSTP NUST" },
              { icon: IconClock, text: "Full-Day Event" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm themed-fg-secondary">
                <item.icon className="w-[18px] h-[18px] text-brand-purple" />
                {item.text}
              </div>
            ))}
          </div>

          <Countdown />

          <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <Link href="/register" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all">
              Register Now <IconArrowRight className="w-[18px] h-[18px]" />
            </Link>
            <Link href="/details" className="themed-btn-secondary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold hover:-translate-y-0.5 transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-28 px-6 themed-bg-alt" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">How It Works</span>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight mb-4">
                <span className="font-heading">Three Stages.</span>{" "}
                <span className="font-script italic text-gradient-purple" style={{ fontFamily: "var(--font-script)" }}>Top 3 Winners.</span>
              </h2>
              <p className="text-lg max-w-[600px] mx-auto leading-relaxed themed-fg-secondary">A structured, multi-stage hackathon designed to test individual skill and team execution.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: IconUser, title: "Individual Challenge", desc: "Choose your domain — Frontend, Backend, Design, or AI/ML. Compete solo to prove your skill. Top performers advance.", color: "text-brand-purple bg-violet-950/25", num: "01" },
              { icon: IconUsers, title: "Team MVP Build", desc: "Form cross-functional teams. Receive a real-world problem statement and build a functional MVP under pressure.", color: "text-cyan-400 bg-cyan-500/10", num: "02" },
              { icon: IconTrophy, title: "Finals & Awards", desc: "Present your MVP to the Vyro panel. Winners evaluated on execution, innovation, and product thinking. $5,000 in prizes for top 3 teams.", color: "text-amber-400 bg-amber-500/10", num: "03" },
            ].map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.1}>
                <div className="card-hover relative rounded-2xl p-8 pt-12 transition-all duration-400 hover:-translate-y-1" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                  <span className="absolute top-8 right-8 font-mono text-xs themed-fg-muted tracking-wider">{step.num}</span>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${step.color}`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed themed-fg-secondary">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-glow relative py-28 px-6 text-center overflow-hidden" style={{ background: "var(--card-bg)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">Don&apos;t Miss Out</span>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight mb-3">
              <span className="block font-script italic mb-1" style={{ fontFamily: "var(--font-script)" }}>Ready to Build</span>
              <span className="block font-heading text-gradient-purple">Something Extraordinary?</span>
            </h2>
            <p className="text-sm font-semibold tracking-wide text-brand-purple mb-6">Three Stages. Top 3 Winners.</p>
            <p className="text-lg max-w-[600px] mx-auto leading-relaxed mb-10 themed-fg-secondary">Join developers, designers, and AI engineers from across Pakistan. Compete, learn, and win.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/register" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all">
                Register Now <IconArrowRight className="w-[18px] h-[18px]" />
              </Link>
              <Link href="/details" className="themed-btn-secondary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all">
                View Full Details
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
