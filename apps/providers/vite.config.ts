import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Built output is committed to static/providers/ and copied into dist/providers/
// by scripts/build.sh, because Cloudflare Pages runs only that script (no node).
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "../../static/providers",
    emptyOutDir: true,
    modulePreload: { polyfill: false },
  },
});
