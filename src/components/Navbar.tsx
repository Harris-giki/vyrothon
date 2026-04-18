"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "motion/react";
const links = [
  { href: "/", label: "Home" },
  { href: "/details", label: "Event Details" },
  { href: "/stage-1-problems", label: "Stage 1 Problems" },
  { href: "/submission", label: "Submission" },
  { href: "/partners", label: "Partners" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Fixed top-right: Theme toggle */}
      <button
        onClick={toggle}
        className="fixed top-5 right-6 z-[100] w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0"
        style={{
          background: "var(--card-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid var(--border)",
        }}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        )}
      </button>

      {/* Floating center pill: Nav links + Register + Mobile hamburger — stays visible on scroll */}
      <nav className="fixed top-4 inset-x-0 z-[90] mx-auto max-w-fit">
          <div
            className="flex items-center gap-1.5 rounded-full px-2 py-2 shadow-lg"
            style={{
              background: "var(--nav-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid var(--border)",
              boxShadow:
                "0 4px 30px rgba(0,0,0,0.15), 0 0 60px rgba(139,92,246,0.06)",
            }}
          >
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                    pathname === link.href
                      ? "themed-fg"
                      : "themed-fg-secondary hover:themed-fg"
                  }`}
                  style={
                    pathname === link.href
                      ? { background: "var(--card-bg-hover)" }
                      : {}
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[4px] p-2 z-[1001]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              <span
                className="block w-5 h-0.5 rounded transition-all"
                style={{
                  background: "var(--fg)",
                  transform: mobileOpen
                    ? "rotate(45deg) translate(4px, 4px)"
                    : "none",
                }}
              />
              <span
                className="block w-5 h-0.5 rounded transition-all"
                style={{
                  background: "var(--fg)",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-0.5 rounded transition-all"
                style={{
                  background: "var(--fg)",
                  transform: mobileOpen
                    ? "rotate(-45deg) translate(4px, -4px)"
                    : "none",
                }}
              />
            </button>
          </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <ul
        className={`md:hidden fixed top-0 w-[280px] h-screen backdrop-blur-xl flex flex-col pt-20 px-6 gap-1 transition-all duration-300 z-[45] ${
          mobileOpen ? "right-0" : "-right-full"
        }`}
        style={{
          background: "var(--nav-bg)",
          borderLeft: "1px solid var(--border)",
        }}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                pathname === link.href ? "themed-fg" : "themed-fg-secondary"
              }`}
              style={
                pathname === link.href
                  ? { background: "var(--card-bg-hover)" }
                  : {}
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
