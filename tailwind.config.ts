import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        surface: {
          primary: "#050505",
          secondary: "#0a0a0a",
          card: "rgba(255,255,255,0.03)",
          "card-hover": "rgba(255,255,255,0.06)",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          hover: "rgba(255,255,255,0.15)",
        },
        muted: "#71717a",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-20px) translateX(10px)" },
          "50%": { transform: "translateY(-10px) translateX(-5px)" },
          "75%": { transform: "translateY(-25px) translateX(5px)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        blink: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
