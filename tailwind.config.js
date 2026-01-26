/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Summit Prime Palette
        "golden-hour-start": "#00c484",
        "golden-hour-end": "#32e875",
        "rim-light": "#FFECC2",
        "deep-horizon": "#0F172A",
        "atmospheric-haze": "#1E293B",
        granite: "#F8FAFC",
        "alpine-flora": "#10B981",

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
        display: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        "rim-card":
        "inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "rim-card-inner": "inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
        "button-glow": "0 10px 20px -10px #32e875",
      },
      borderRadius: {
        card: "24px",
        pill: "9999px",
      },
      transitionTimingFunction: {
        bouncy: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      backgroundImage: {
        "golden-gradient": "linear-gradient(to right, #32e875, #00c484)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
