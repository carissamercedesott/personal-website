import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

// Builds two ES-module entries into public/lab/: lab.js (the /lab
// experiments) and walker.js (the homepage's walking smiski guide).
// The pages are hand-written static HTML, so emptyOutDir must stay off.
export default defineConfig({
  plugins: [solid()],
  // publicDir would otherwise be copied INTO outDir, which lives inside it.
  publicDir: false,
  build: {
    lib: {
      entry: {
        lab: "lab-src/main.tsx",
        walker: "lab-src/walker-main.ts",
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    outDir: "public/lab",
    emptyOutDir: false,
    target: "es2020",
    // Lazy chunks (three + cannon behind the ragdoll demo) get stable names —
    // hashed names would pile up in public/ since emptyOutDir is off.
    rollupOptions: {
      output: { chunkFileNames: "[name].js" },
    },
  },
});
