/** @type {import('tailwindcss').Config} */
export default {
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
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
