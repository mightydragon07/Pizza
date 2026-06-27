import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        surface: "var(--surface)",
        ink: "var(--text)",
        "ink-muted": "var(--text-muted)",
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        accent: "var(--accent)",
        basil: "var(--accent-2)",
        line: "var(--border)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        warm: "0 20px 60px -20px rgba(200, 49, 43, 0.35)",
        card: "0 10px 30px -12px rgba(0,0,0,0.25)",
      },
      keyframes: {
        rise: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(-40px) scale(1.05)", opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wobble: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        flicker: {
          "0%, 100%": { transform: "scaleY(1) scaleX(1)", opacity: "1" },
          "25%": { transform: "scaleY(1.08) scaleX(0.96)", opacity: "0.92" },
          "50%": { transform: "scaleY(0.95) scaleX(1.04)", opacity: "1" },
          "75%": { transform: "scaleY(1.05) scaleX(0.98)", opacity: "0.95" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        floatSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease forwards",
        wobble: "wobble 6s ease-in-out infinite",
        "spin-slow": "spinSlow 14s linear infinite",
        "spin-slower": "spinSlow 26s linear infinite",
        flicker: "flicker 2.4s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 3.5s linear infinite",
        floatSoft: "floatSoft 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
