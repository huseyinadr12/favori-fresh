import type { Config } from "tailwindcss";

/**
 * Favori Fresh tasarım sistemi.
 * Renkler CSS değişkenleri üzerinden okunur (globals.css) — böylece ürün bazlı
 * vurgu renkleri ve olası tema geçişleri tek yerden yönetilir.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "rgb(var(--c-brand-green) / <alpha-value>)",
          botanic: "rgb(var(--c-botanic) / <alpha-value>)",
        },
        cream: "rgb(var(--c-cream) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        // Ürün vurgu renkleri (accent). Bölüm bazında devreye girer.
        accent: {
          lemon: "rgb(var(--c-lemon) / <alpha-value>)",
          mandarin: "rgb(var(--c-mandarin) / <alpha-value>)",
          orange: "rgb(var(--c-orange) / <alpha-value>)",
          pomegranate: "rgb(var(--c-pomegranate) / <alpha-value>)",
          mulberry: "rgb(var(--c-mulberry) / <alpha-value>)",
          grapefruit: "rgb(var(--c-grapefruit) / <alpha-value>)",
        },
        // Aktif ürünün vurgu rengi (JS ile --c-accent set edilir).
        // NOT: Tailwind'in yerleşik `current` (currentColor) token'ı korunur;
        // aktif vurgu için ayrı bir ad kullanılır.
        accentnow: "rgb(var(--c-accent) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Akışkan tipografi ölçeği.
        "fluid-hero": "clamp(2.75rem, 7vw, 6rem)",
        "fluid-h2": "clamp(2rem, 4.5vw, 3.75rem)",
        "fluid-h3": "clamp(1.5rem, 3vw, 2.25rem)",
        "fluid-lead": "clamp(1.05rem, 1.6vw, 1.35rem)",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        container: "1280px",
      },
      transitionTimingFunction: {
        // Yumuşak, "sıvı" his veren easing.
        fluid: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "drop-fall": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "translateY(10px)", opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "drop-fall": "drop-fall 1.8s ease-in-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
