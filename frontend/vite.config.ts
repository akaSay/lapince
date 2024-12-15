import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import imagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),
    imagemin({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: {
        plugins: [{ name: "removeViewBox" }],
      },
      webp: { quality: 80 },
    }),
  ],
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
