import { RegistrationForm } from "@/components/RegistrationForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register — VYROTHON 2026",
  description: "Register for Vyro Hackathon 2026. Fill in your details and secure your spot.",
};

export default function Register() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="relative pt-[140px] pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="hero-grid" />
          <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-violet-900 animate-float top-[-200px] left-[calc(50%-200px)]" />
          <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-cyan-500 animate-float bottom-[-200px] right-[-100px]" style={{ animationDelay: "-4s" }} />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 block">Limited Spots Available</span>
          <h1 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight mb-5">
            <span className="font-script">Register</span>{" "}
            <span className="text-gradient-purple">Now</span>
          </h1>
          <p className="text-lg themed-fg-secondary max-w-[600px] mx-auto leading-relaxed">
            Fill in your details below to secure your spot at VYROTHON 2026. We&apos;ll confirm your registration via email.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-[1200px] mx-auto">
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}
