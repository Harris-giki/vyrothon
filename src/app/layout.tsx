import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { logoSrc } from "@/lib/site";

export const metadata: Metadata = {
  title: "VYROTHON 2026 — Vyro Hackathon",
  description:
    "Pakistan's largest fully in-house hackathon. 3 stages, ~$5,000 in prizes. April 18, 2026 at Vyro Office, NSTP NUST.",
  icons: { icon: logoSrc },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Wordmark: fixed in layout so position is not affected by client components / motion */}
        <Link
          href="/"
          style={{
            position: "fixed",
            top: "max(1.25rem, env(safe-area-inset-top, 0px))",
            left: "max(1.5rem, env(safe-area-inset-left, 0px))",
            zIndex: 100,
          }}
        >
          <Image
            src="/Black logo@4x.png"
            alt="VYROTHON 2026"
            width={180}
            height={50}
            className="h-10 sm:h-14 w-auto object-contain themed-logo-wordmark"
            unoptimized
            priority
          />
        </Link>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
