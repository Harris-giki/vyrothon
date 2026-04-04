"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-04-16T00:00:00+05:00").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Countdown() {
  // Avoid Date.now() in initial state — server vs client differ by ms → React #418 hydration error
  const [diff, setDiff] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setDiff(TARGET - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (diff === null) {
    return (
      <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }} aria-hidden>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 text-center">
          Registration Closes In
        </p>
        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap mb-12 min-h-[120px] sm:min-h-[140px]" />
      </div>
    );
  }

  if (diff <= 0) {
    return (
      <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <span className="font-mono text-3xl font-bold text-gradient-primary">
          Registrations Closed
        </span>
      </div>
    );
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const units = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-4 text-center">
        Registration Closes In
      </p>
      <div className="flex justify-center gap-3 sm:gap-4 flex-wrap mb-12">
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
    </div>
  );
}
