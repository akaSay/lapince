import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "ui-vendor": ["@radix-ui/react-dialog", "@radix-ui/react-tooltip"],
          "motion-vendor": ["framer-motion"],
          "chart-vendor": ["chart.js"],
          "date-vendor": ["date-fns"],
          "form-vendor": ["react-hook-form"],
          "utils-vendor": ["lodash-es", "axios"],
        },
      },
    },
  },
});
