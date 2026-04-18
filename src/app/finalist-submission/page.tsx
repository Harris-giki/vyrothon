"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { IconClock, IconCheck } from "@/components/icons";

const SUBMISSION_URL =
  "https://docs.google.com/spreadsheets/d/1AgN_FV59QAProhpGDb1FccZwBEbatSBJxgaXKE3gWWg/edit?usp=sharing";

const DEADLINE = new Date("2026-04-18T19:20:00+05:00").getTime();

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
                <span className="font-mono text-3xl text-muted/30 pt-1 animate-blink">
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const guidelines = [
  {
    title: "Submit Your Pitch Deck",
    description:
      "Upload or link your pitch deck (Google Slides, Canva, PDF, etc.) on the shared submission sheet. Make sure the link is publicly accessible.",
  },
  {
    title: "Submit Your Repository Links",
    description:
      "Provide the GitHub/GitLab repository link(s) for your project. Ensure the repositories are public or that view access has been granted.",
  },
  {
    title: "Submit Live Demo / Recording (If Available)",
    description:
      "If your team has recorded a live demo or walkthrough, include the link (YouTube, Google Drive, Loom, etc.) on the sheet. This is optional but strongly recommended.",
  },
  {
    title: "Hard Deadline — 7:20 PM Sharp",
    description:
      "All links must be submitted on the sheet by 7:20 PM sharp. No late entries or edits will be accepted after the deadline. Plan ahead and submit early.",
  },
  {
    title: "Double-Check Your Links",
    description:
      "Verify that every link you submit is publicly accessible and not restricted. Broken or private links may result in your submission not being evaluated.",
  },
  {
    title: "Do Not Edit Other Teams' Rows",
    description:
      "Only fill in your own team's designated row. Tampering with another team's submission will lead to immediate disqualification.",
  },
];

export default function FinalistSubmission() {
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
            Stage 02 &middot; Final Submission
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight mb-5">
            <span className="font-script">Finalist</span>{" "}
            <span className="font-heading text-gradient-purple">
              Submission
            </span>
          </h1>
          <p className="text-lg themed-fg-secondary max-w-[650px] mx-auto leading-relaxed mb-10">
            Submit your pitch deck, repository links, and live demo recording on
            the shared sheet below. Everything must be in by{" "}
            <strong className="text-gradient-gold">7:20 PM sharp</strong> — no
            exceptions.
          </p>
          <DeadlineTimer />
        </div>
      </section>

      {/* URGENT NOTICE */}
      <section className="py-10 px-6">
        <div className="max-w-[800px] mx-auto">
          <ScrollReveal>
            <div
              className="rounded-2xl p-8 flex items-start gap-4"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
              }}
            >
              <IconClock className="w-6 h-6 text-brand-purple shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading text-lg font-bold tracking-tight mb-2">
                  What You Need to Submit
                </h3>
                <ul className="space-y-2 text-[0.95rem] themed-fg-secondary leading-relaxed">
                  <li className="flex items-start gap-2">
                    <IconCheck className="w-4 h-4 text-brand-purple shrink-0 mt-1" />
                    <span>
                      <strong>Pitch Deck</strong> — Google Slides, Canva, or PDF
                      link
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <IconCheck className="w-4 h-4 text-brand-purple shrink-0 mt-1" />
                    <span>
                      <strong>Repository Links</strong> — GitHub / GitLab (must
                      be public)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <IconCheck className="w-4 h-4 text-brand-purple shrink-0 mt-1" />
                    <span>
                      <strong>Live Demo / Recording</strong> — YouTube, Loom, or
                      Drive link (if recorded)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
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
              <span className="font-script text-gradient-gold">7:20 PM</span>
            </h2>
            <p className="text-lg themed-fg-secondary leading-relaxed">
              No extensions will be granted. Make sure your pitch deck,
              repositories, and demo links are correct, publicly accessible, and
              submitted before the deadline.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
