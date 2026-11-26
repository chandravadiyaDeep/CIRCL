import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this project from /CIRCL/, not the domain root.
export default defineConfig({
  plugins: [react()],
  base: "/CIRCL/",
  build: {
    outDir: "dist",
    sourcemap: false
  }
});