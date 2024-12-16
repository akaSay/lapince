/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: { min: "375px", max: "639px" },
        iphone: { min: "375px", max: "812px" },
      },
      colors: {
        primary: {
          50: "#f0f9ff",
          500: "#0ea5e9",
          900: "#0c4a6e",
        },
        dark: {
          800: "#1f2937",
          900: "#111827",
        },
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        "zoom-in": {
          from: { transform: "scale(0.95)" },
          to: { transform: "scale(1)" },
        },
        "zoom-out": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(0.95)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fade-in 200ms ease-out",
        "fade-out": "fade-out 200ms ease-out",
        "zoom-in": "zoom-in 200ms ease-out",
        "zoom-out": "zoom-out 200ms ease-out",
      },
      backgroundImage: {
        "shimmer-gradient":
          "linear-gradient(90deg, transparent 0%, #374151 50%, transparent 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
