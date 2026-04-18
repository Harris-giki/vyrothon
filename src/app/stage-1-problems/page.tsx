"use client";

import { QRCodeSVG } from "qrcode.react";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  IconCode,
  IconMonitor,
  IconPen,
  IconBrain,
} from "@/components/icons";
const domains = [
  {
    label: "Frontend",
    icon: IconCode,
    url: "https://drive.google.com/drive/folders/1_AlxPd-zsdh5EcQ46dJPoCtu7iqXtDqM?usp=sharing",
  },
  {
    label: "Backend",
    icon: IconMonitor,
    url: "https://drive.google.com/drive/folders/1DlzcHsPWu1ldSzIFLiC5j5eQyeaVj8hZ?usp=sharing",
  },
  {
    label: "Product Design",
    icon: IconPen,
    url: "https://drive.google.com/drive/folders/1rFwTICXw005S6EnL4P80wch2mFwOztIh?usp=sharing",
  },
  {
    label: "ML",
    icon: IconBrain,
    url: "https://drive.google.com/drive/folders/1Eh3GAorKjBxAhBKrezJiWdGbdzAfl4gC?usp=sharing",
  },
];

export default function Stage1Problems() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="relative pt-[140px] pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="hero-grid" />
          <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-violet-900 animate-float top-[-200px] left-[calc(50%-200px)]" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">
            Stage 01 &middot; Domain-Specific Challenge
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight mb-5">
            <span className="font-script">Stage 1</span>{" "}
            <span className="font-heading text-gradient-purple">Problems</span>
          </h1>
          <p className="text-lg themed-fg-secondary max-w-[600px] mx-auto leading-relaxed">
            Scan the QR code for your domain to access the problem statement. Good luck!
          </p>
        </div>
      </section>

      {/* QR CODE CARDS */}
      <section className="py-28 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {domains.map((domain, i) => (
              <ScrollReveal key={domain.label} delay={i * 0.08}>
                <div
                  className="relative rounded-2xl p-8 flex flex-col items-center text-center h-full"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <domain.icon className="w-8 h-8 text-brand-purple mb-4" />
                  <h3 className="font-heading text-xl font-bold mb-6 tracking-tight">
                    {domain.label}
                  </h3>

                  <div
                    className="rounded-xl p-4 mb-6"
                    style={{ background: "#ffffff" }}
                  >
                    <QRCodeSVG
                      value={domain.url}
                      size={180}
                      level="M"
                      bgColor="#ffffff"
                      fgColor="#1a1a2e"
                    />
                  </div>

                  <a
                    href={domain.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-purple hover:underline break-all leading-relaxed"
                  >
                    {domain.url}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* MENTOR NOTE */}
      <section
        className="py-20 px-6 text-center"
        style={{
          background: "var(--card-bg)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-[700px] mx-auto">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">
              Need Help?
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight mb-4">
              <span className="font-heading">Reach Out to</span>{" "}
              <span className="font-script themed-fg-secondary">
                Your Mentor
              </span>
            </h2>
            <p className="text-lg themed-fg-secondary leading-relaxed">
              For any questions or clarifications regarding your domain&apos;s
              problem statement, please reach out to the respective mentor of
              each domain available onsite. They&apos;re here to help!
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
