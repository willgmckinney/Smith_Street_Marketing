/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
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
    },
  },
  plugins: [],
};
