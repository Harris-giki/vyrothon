"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  IconCode,
  IconMonitor,
  IconPen,
  IconBrain,
  IconCheck,
  IconClock,
} from "@/components/icons";

const SUBMISSION_URL = "https://docs.google.com/spreadsheets/d/1VB0bC5aOfFNIz8329BEOFcY9xQzNtmrt/edit?usp=sharing&ouid=115952092670601631547&rtpof=true&sd=true";

const DEADLINE = new Date("2026-04-18T12:30:00+05:00").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function DeadlineTimer() {
  const [diff, setDiff] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setDiff(Math.max(0, DEADLINE - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (diff === null) {
    return <div className="flex justify-center min-h-[100px]" />;
  }

  const isOver = diff <= 0;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const units = [
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-5">
        {isOver ? "Submissions Closed" : "Submission Closes In"}
      </p>
      {isOver ? (
        <span className="font-mono text-2xl sm:text-3xl font-bold text-gradient-gold">
          Submissions Are Closed
        </span>
      ) : (
        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-3 sm:gap-4">
              <div className="flex flex-col items-center min-w-[70px] sm:min-w-[90px]">
                <span className="font-mono text-4xl sm:text-5xl font-bold leading-none text-gradient-primary py-4">
                  {pad(unit.value)}
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.15em] text-muted font-medium">
                  {unit.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="font-mono text-3xl text-muted/30 pt-1 animate-blink">:</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const domainSheets = [
  { icon: IconCode, label: "Frontend Engineering" },
  { icon: IconMonitor, label: "Backend Engineering" },
  { icon: IconPen, label: "Product Design (UI/UX)" },
  { icon: IconBrain, label: "AI / Machine Learning" },
];

const guidelines = [
  {
    title: "Find Your Domain\u2019s Sub-Sheet",
    description:
      "The shared Google Sheet contains a separate sub-sheet (tab) for each domain \u2014 Frontend, Backend, Product Design, and ML. Navigate to the tab that matches the domain you are competing in.",
  },
  {
    title: "Fill In Your Submission",
    description:
      "Enter all required links and information in your domain\u2019s sub-sheet. This may include deployed URLs, repository links, design file links, or any other deliverables specified in your problem statement.",
  },
  {
    title: "Double-Check Before Submitting",
    description:
      "Ensure all links are publicly accessible and not restricted. Verify that your name and entry details are correctly filled in. Incomplete or inaccessible submissions may not be evaluated.",
  },
  {
    title: "Do Not Edit Other Participants\u2019 Rows",
    description:
      "Only fill in your own designated row. Tampering with another participant\u2019s submission will lead to immediate disqualification.",
  },
  {
    title: "30-Minute Submission Buffer",
    description:
      "A buffer of 30 minutes is provided after Stage 1 ends for you to finalize and submit your work. The submission sheet will close at 12:30 PM sharp \u2014 no late entries will be accepted.",
  },
  {
    title: "Reach Out If You\u2019re Stuck",
    description:
      "If you face any issues with the submission sheet or need clarification, immediately reach out to your domain\u2019s mentor available onsite. Don\u2019t wait until the last minute.",
  },
];

export default function Submission() {
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
            Stage 01 &middot; Submit Your Work
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight mb-5">
            <span className="font-script">Stage 1</span>{" "}
            <span className="font-heading text-gradient-purple">
              Submission
            </span>
          </h1>
          <p className="text-lg themed-fg-secondary max-w-[600px] mx-auto leading-relaxed mb-10">
            Scan the QR code or use the link below to open the submission sheet.
            Submit your work before the deadline.
          </p>
          <DeadlineTimer />
        </div>
      </section>

      {/* QR CODE + LINK */}
      <section className="py-20 px-6">
        <div className="max-w-[600px] mx-auto">
          <ScrollReveal>
            <div
              className="rounded-2xl p-10 flex flex-col items-center text-center"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
              }}
            >
              <h2 className="font-heading text-2xl font-bold mb-2 tracking-tight">
                Submission Sheet
              </h2>
              <p className="themed-fg-secondary text-sm mb-8">
                Scan to open the Google Sheet
              </p>
              <div
                className="rounded-xl p-5 mb-8"
                style={{ background: "#ffffff" }}
              >
                <QRCodeSVG
                  value={SUBMISSION_URL}
                  size={220}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#1a1a2e"
                />
              </div>
              <a
                href={SUBMISSION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-purple hover:underline break-all leading-relaxed"
              >
                {SUBMISSION_URL}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* DOMAIN SUB-SHEETS */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">
                One Sheet, Four Domains
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight mb-4">
                <span className="font-heading">Navigate to</span>{" "}
                <span className="font-script themed-fg-secondary">
                  Your Sub-Sheet
                </span>
              </h2>
              <p className="text-lg themed-fg-secondary max-w-[600px] mx-auto leading-relaxed">
                The submission sheet has a dedicated tab for each domain. Make
                sure you submit under the correct one.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {domainSheets.map((d, i) => (
              <ScrollReveal key={d.label} delay={i * 0.06}>
                <div
                  className="relative rounded-xl p-6 flex items-center gap-4"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <d.icon className="w-6 h-6 text-brand-purple shrink-0" />
                  <span className="font-heading font-semibold text-sm">
                    {d.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SUBMISSION GUIDELINES */}
      <section
        className="py-28 px-6 themed-bg-alt"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">
                Read Carefully
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight mb-4">
                <span className="font-heading">Submission</span>{" "}
                <span className="font-script themed-fg-secondary">
                  Guidelines
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-5">
            {guidelines.map((g, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div
                  className="stage-accent relative rounded-2xl p-8 pl-10 overflow-hidden"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-brand-purple font-semibold uppercase tracking-[0.15em] shrink-0 pt-0.5">
                      {pad(i + 1)}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold mb-2 tracking-tight">
                        {g.title}
                      </h3>
                      <p className="themed-fg-secondary leading-relaxed text-[0.95rem]">
                        {g.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEADLINE WARNING */}
      <section
        className="cta-glow relative py-20 px-6 text-center overflow-hidden"
        style={{
          background: "var(--card-bg)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="relative z-10 max-w-[700px] mx-auto">
          <ScrollReveal>
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-6"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
              }}
            >
              <IconClock className="w-4 h-4 text-brand-purple" />
              <span className="font-heading font-bold text-sm text-gradient-gold">
                Hard Deadline
              </span>
            </div>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-tight mb-4">
              <span className="font-heading">Submissions close at</span>{" "}
              <span className="font-script text-gradient-gold">12:30 PM</span>
            </h2>
            <p className="text-lg themed-fg-secondary leading-relaxed">
              No extensions will be granted. Make sure your links are correct,
              publicly accessible, and submitted to the right sub-sheet before
              the deadline.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
