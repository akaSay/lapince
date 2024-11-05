/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Changé de "./frontend/index.html"
    "./src/**/*.{js,ts,jsx,tsx}", // Changé de "./frontend/src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
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
