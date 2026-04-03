import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { IconArrowRight, IconMail } from "@/components/icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Partners — VYROTHON 2026",
  description: "Meet the official community and campus outreach partners of Vyro Hackathon 2026.",
};

const partners = [
  { name: "GDGoC — GIKI", org: "Ghulam Ishaq Khan Institute", img: "/community-partners/GIKI.png" },
  { name: "GDGoC — NUST", org: "National University of Sciences & Technology", img: "/community-partners/Nust.png" },
  { name: "GDGoC — COMSATS", org: "COMSATS University Islamabad", img: "/community-partners/comsats.png" },
  { name: "GDGoC — FAST", org: "FAST-NUCES", img: "/community-partners/fast.png" },
  { name: "GDGoC — AIR", org: "Air University", img: "/community-partners/AIR.png" },
  {
    name: "GDGoC — PIEAS",
    org: "Pakistan Institute of Engineering & Applied Sciences",
    img: "/community-partners/pieas.png",
  },
];

export default function Partners() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="relative pt-[140px] pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0"><div className="hero-grid" /><div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-violet-900 animate-float top-[-200px] left-[calc(50%-200px)]" /></div>
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">Community &amp; Campus Outreach</span>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight mb-5">
            <span className="font-script">Our</span>{" "}
            <span className="font-heading text-gradient-purple">Partners</span>
          </h1>
          <p className="text-lg max-w-[600px] mx-auto leading-relaxed themed-fg-secondary">Vyro is partnering with university GDGoC chapters as Official Community &amp; Campus Outreach Partners. A meaningful, two-way partnership.</p>
          <div className="flex justify-center mt-8">
            <a href="#active-partners" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all">
              Explore More
              <IconArrowRight className="w-[18px] h-[18px] rotate-90" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* ACTIVE PARTNERS */}
      <section id="active-partners" className="py-28 px-6 scroll-mt-28">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">Active Partners</span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight mb-4">
                <span className="font-heading">GDGoC</span>{" "}
                <span className="font-script themed-fg-secondary">University Chapters</span>
              </h2>
              <p className="text-lg max-w-[600px] mx-auto leading-relaxed themed-fg-secondary">Our official community partners driving on-campus marketing and event promotion.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-stretch max-w-[1100px] mx-auto">
              {partners.map((p) => (
                <div
                  key={p.name}
                  className="flex h-full min-h-[260px] w-full max-w-[280px] mx-auto flex-col items-center gap-3 px-6 py-8 rounded-2xl transition-all hover:-translate-y-1 sm:max-w-none"
                  style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
                >
                  <div className="flex h-[100px] w-full shrink-0 items-center justify-center rounded-lg bg-transparent p-3">
                    <Image src={p.img} alt={p.name} width={200} height={100} className="max-h-[84px] w-auto max-w-full object-contain" />
                  </div>
                  <span className="font-heading font-semibold text-sm text-center leading-snug">{p.name}</span>
                  <span className="text-[0.7rem] themed-fg-muted uppercase tracking-wider text-center leading-relaxed">{p.org}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-glow relative py-28 px-6 text-center overflow-hidden" style={{ background: "var(--card-bg)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">Become a Partner</span>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight mb-5">
              <span className="font-script">Want Your Chapter</span>{" "}
              <span className="font-heading text-gradient-purple">to Partner?</span>
            </h2>
            <p className="text-lg max-w-[600px] mx-auto leading-relaxed mb-10 themed-fg-secondary">We&apos;re always looking for university chapters that want to amplify tech culture on campus.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/partner-with-us" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all">
                Explore Partnership <IconArrowRight className="w-[18px] h-[18px]" />
              </Link>
              <a href="mailto:m.haris@imagine.art?subject=VYROTHON%202026%20Partnership" className="themed-btn-secondary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all">
                <IconMail className="w-[18px] h-[18px]" /> Email Us
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
