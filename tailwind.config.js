/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Blueprint Prime Palette — light sheet, single green marking accent
        "marker-start": "#129A6A",
        "marker-end": "#1FB97E",
        "marker-ink": "#052E20",
        caution: "#FFECC2",
        "blueprint-base": "#F4F3EF",
        "drafting-surface": "#FFFFFF",
        chalk: "#1E293B",
        verified: "#129A6A",
        "accent-green": "#2F9E6A",
        muted: "#6E7680",
        redline: "#C2402E",
        "redline-wash": "#F4E0DC",
        "redline-deep": "#8E2E22",

        // Blueprint sheet palette (secondary UI on light backgrounds)
        "sheet-dark": "#CBD5E1",
        "sheet-mid": "#E2E8F0",
        "sheet-light": "#64748B",
        "grid-line": "#129A6A",
        "annotation-blue": "#129A6A",
        "beam-line": "#129A6A",
        "beam-fill": "#0E7C55",
        "station-deep": "#94A3B8",
        "station-mid": "#CBD5E1",
        "station-light": "#64748B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Archivo", "sans-serif"],
        mono: ["Spline Sans Mono", "ui-monospace", "monospace"],
      },
      // Single editorial type scale. Use only these steps.
      fontSize: {
        "display-1": [
          "clamp(3.5rem, 8vw, 6rem)",
          { lineHeight: "0.95", letterSpacing: "-0.02em" },
        ],
        "display-2": [
          "clamp(2.5rem, 5vw, 4rem)",
          { lineHeight: "1.0", letterSpacing: "-0.015em" },
        ],
        h: ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        body: ["1.125rem", { lineHeight: "1.6" }],
        "label-mono": ["0.8125rem", { lineHeight: "1", letterSpacing: "0.16em" }],
      },
      // Spacing unit equals the visible 32px grid cell.
      spacing: {
        cell: "32px",
        "2cell": "64px",
        "3cell": "96px",
        "4cell": "128px",
      },
      borderRadius: {
        card: "6px",
        spec: "4px",
        pill: "9999px",
      },
      transitionTimingFunction: {
        spec: "cubic-bezier(0.2, 0, 0, 1)",
      },
      backgroundImage: {
        // Flat accent kept as a token alias; no gradient sheen
        "marker-gradient": "linear-gradient(to right, #129A6A, #129A6A)",
        "blueprint-grid":
          "linear-gradient(rgba(18, 154, 106, 0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 154, 106, 0.09) 1px, transparent 1px)",
        "blueprint-grid-dense":
          "linear-gradient(rgba(18, 154, 106, 0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 154, 106, 0.09) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
