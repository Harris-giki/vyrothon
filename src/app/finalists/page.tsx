import { ScrollReveal } from "@/components/ScrollReveal";
import {
  IconCode,
  IconMonitor,
  IconPen,
  IconBrain,
  IconMail,
} from "@/components/icons";
import type { Metadata } from "next";
import { SVGProps } from "react";

export const metadata: Metadata = {
  title: "Finalists / Stage 2 — VYROTHON 2026",
  description:
    "Stage 1 finalists advancing to the cross-functional MVP build.",
};

type Finalist = { name: string; email: string };

type Domain = {
  label: string;
  icon: (p: SVGProps<SVGSVGElement>) => React.ReactNode;
  candidates: Finalist[];
};

const domains: Domain[] = [
  {
    label: "Product Design",
    icon: IconPen,
    candidates: [
      { name: "Saadia Asghar", email: "saadianigah@gmail.com" },
      { name: "Areej Arif", email: "areejarif1302@gmail.com" },
      { name: "Muhammad Haris Zafar", email: "hariszafar102@gmail.com" },
      { name: "Abdullah", email: "backabdullah18@gmail.com" },
      { name: "Muhammad Jamil", email: "jamil.mughal77@gmail.com" },
    ],
  },
  {
    label: "Frontend Engineering",
    icon: IconCode,
    candidates: [
      { name: "Muhammad Faseeh", email: "faseehsafdar06@gmail.com" },
      { name: "Wajahat Ali", email: "contact.chwajahat@gmail.com" },
      { name: "Muhammad Wasif Shehraz", email: "wasifsheraz603@gmail.com" },
      { name: "Mansoobe Zahra", email: "mansoobezehra@gmail.com" },
      { name: "Muhammad Usman", email: "usmanchaudhary112579@gmail.com" },
    ],
  },
  {
    label: "Backend Engineering",
    icon: IconMonitor,
    candidates: [
      { name: "Muhammad Rayyan", email: "mrayyan5296@gmail.com" },
      { name: "Usman Pervez", email: "usmanpervez.work@gmail.com" },
      { name: "Annan Khan", email: "annankhan06@gmail.com" },
      { name: "Ahsan Riaz", email: "ahsanriaz8000@gmail.com" },
      { name: "Ahmad Uzzam Masood", email: "ahmaduzzammasood@gmail.com" },
    ],
  },
  {
    label: "Machine Learning",
    icon: IconBrain,
    candidates: [
      { name: "Muhammad Osama", email: "ocama_aslam@outlook.com" },
      { name: "M Wajeeh Ul Hassan", email: "Wajeeh9233@gmail.com" },
      { name: "Muhammad Abdul Majeed", email: "hasnain1033@gmail.com" },
      { name: "Mohammad Sofyan Abdullah", email: "sofyanrajpoot567@gmail.com" },
      { name: "Muhammad Bilal Shaikh", email: "bilalshaikh4717@gmail.com" },
      { name: "Haseeb Ullah", email: "haseebullahbutt07@gmail.com" },
      { name: "Shayan Maqsood", email: "smaqsood.bscs24seecs@seecs.edu.pk" },
      { name: "Esha Shabbir", email: "eshashabbir092@gmail.com" },
      { name: "Muhammad Zakaria Masood", email: "mzakariamasood@gmail.com" },
      { name: "Tayyab Ahmad", email: "tayyabahmad.ai@gmail.com" },
    ],
  },
];

const teamComposition = [
  { count: 1, domain: "Product Design", icon: IconPen },
  { count: 1, domain: "Frontend Engineering", icon: IconCode },
  { count: 1, domain: "Backend Engineering", icon: IconMonitor },
  { count: 2, domain: "Machine Learning", icon: IconBrain },
];

export default function Finalists() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-[140px] pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="hero-grid" />
          <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-violet-900 animate-float top-[-200px] left-[calc(50%-200px)]" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">
            Congratulations &middot; You Made It
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight mb-5">
            <span className="font-script">Stage 2</span>{" "}
            <span className="font-heading text-gradient-purple">Finalists</span>
          </h1>
          <p className="text-lg themed-fg-secondary max-w-[650px] mx-auto leading-relaxed">
            Congratulations on making it through Stage 1. Below are the
            finalists advancing to the cross-functional MVP build.
          </p>
        </div>
      </section>

      {/* TEAM COMPOSITION */}
      <section className="py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">
                How Teams Are Formed
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight mb-4">
                <span className="font-heading">Team</span>{" "}
                <span className="font-script themed-fg-secondary">
                  Composition
                </span>
              </h2>
              <p className="text-lg themed-fg-secondary max-w-[600px] mx-auto leading-relaxed">
                Each of the 5 teams will consist of 5 members — one from each
                domain, with two from Machine Learning.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {teamComposition.map((slot, i) => (
              <ScrollReveal key={slot.domain} delay={i * 0.06}>
                <div
                  className="rounded-2xl p-6 flex flex-col items-center text-center"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <slot.icon className="w-7 h-7 text-brand-purple mb-3" />
                  <span className="font-mono text-3xl font-bold text-gradient-primary mb-1">
                    {slot.count}
                  </span>
                  <span className="text-xs font-heading font-semibold themed-fg-secondary leading-tight">
                    {slot.domain}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINALISTS BY DOMAIN */}
      <section
        className="py-28 px-6 themed-bg-alt"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">
                Stage 1 Results
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight mb-4">
                <span className="font-heading">Advancing</span>{" "}
                <span className="font-script themed-fg-secondary">
                  Participants
                </span>
              </h2>
              <p className="text-lg themed-fg-secondary max-w-[600px] mx-auto leading-relaxed">
                Ranked in order of performance. Congratulations to everyone who
                made it through.
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-12">
            {domains.map((domain, di) => (
              <ScrollReveal key={domain.label} delay={di * 0.08}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {/* Domain header */}
                  <div
                    className="px-8 py-5 flex items-center gap-3"
                    style={{
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <domain.icon className="w-5 h-5 text-brand-purple shrink-0" />
                    <h3 className="font-heading text-lg font-bold tracking-tight">
                      {domain.label}
                    </h3>
                    <span className="ml-auto text-xs font-mono text-brand-purple font-semibold">
                      {domain.candidates.length}{" "}
                      {domain.candidates.length === 1
                        ? "finalist"
                        : "finalists"}
                    </span>
                  </div>

                  {/* Candidate list */}
                  <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                    {domain.candidates.map((c, ci) => (
                      <div
                        key={c.email}
                        className="px-8 py-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 transition-colors hover:bg-[var(--card-bg-hover)]"
                      >
                        <span className="font-mono text-xs text-brand-purple font-semibold w-6 shrink-0">
                          {String(ci + 1).padStart(2, "0")}
                        </span>
                        <span className="font-heading font-semibold flex-1 min-w-0">
                          {c.name}
                        </span>
                        <a
                          href={`mailto:${c.email}`}
                          className="inline-flex items-center gap-2 text-sm themed-fg-secondary hover:text-[var(--purple-text)] transition-colors truncate"
                        >
                          <IconMail className="w-3.5 h-3.5 shrink-0" />
                          {c.email}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / NEXT STEPS */}
      <section
        className="cta-glow relative py-24 px-6 text-center overflow-hidden"
        style={{
          background: "var(--card-bg)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="relative z-10 max-w-[700px] mx-auto">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">
              What&apos;s Next
            </span>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-tight mb-4">
              <span className="font-heading">Stage 2 —</span>{" "}
              <span className="font-script text-gradient-purple">
                MVP Build
              </span>
            </h2>
            <p className="text-lg themed-fg-secondary leading-relaxed max-w-[600px] mx-auto">
              Teams will be announced shortly. Each team receives a real-world
              problem statement and must build a functional MVP. Bring your best
              — the judges are watching.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
