/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Blueprint Prime Palette
        "marker-start": "#00c484",
        "marker-end": "#32e875",
        caution: "#FFECC2",
        "blueprint-base": "#0F172A",
        "drafting-surface": "#1E293B",
        chalk: "#F8FAFC",
        verified: "#10B981",

        // Blueprint sheet palette (How We Work)
        "sheet-dark": "#2A2D34",
        "sheet-mid": "#3D4451",
        "sheet-light": "#5C6370",
        "grid-line": "#A8D8EA",
        "annotation-blue": "#64B5F6",
        "beam-line": "#5BA4D9",
        "beam-fill": "#4A8DB7",
        "station-deep": "#4A4238",
        "station-mid": "#6B5B4E",
        "station-light": "#8B7865",

        // Legacy colors (keeping to prevent immediate breakage, but should be phased out)
        "primary-color-1": "var(--primary-color-Cyan)",
        "primary-color-2": "var(--primary-color-Green)",
        "secondary-color-1": "var(--secondary-color-deep-teal)",
        "secondary-color-2": "var(--secondary-color-sky-blue)",
        "neutral-color-1": "var(--neutral-color-charcol-gray)",
        "neutral-color-2": "var(--neutral-color-light-gray)",
        "accent-color-1": "var(--accent-color-vibrant-blue)",
        "accent-color-2": "var(--accent-color-lime-green)",
        "tirtiary-color": "var(--tirtiary-color-gray)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Archivo", "sans-serif"],
        mono: ["Spline Sans Mono", "ui-monospace", "monospace"],
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
        "marker-gradient": "linear-gradient(to right, #32e875, #00c484)",
        "blueprint-grid":
          "linear-gradient(rgba(0, 196, 132, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 196, 132, 0.06) 1px, transparent 1px)",
        "blueprint-grid-dense":
          "linear-gradient(rgba(0, 196, 132, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 196, 132, 0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
