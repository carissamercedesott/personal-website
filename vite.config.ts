import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

// Builds the /lab experiments into public/lab/lab.js as a single ES module.
// The page itself (public/lab/index.html) is hand-written static HTML, so
// emptyOutDir must stay off.
export default defineConfig({
  plugins: [solid()],
  // publicDir would otherwise be copied INTO outDir, which lives inside it.
  publicDir: false,
  build: {
    lib: {
      entry: "lab-src/main.tsx",
      formats: ["es"],
      fileName: () => "lab.js",
    },
    outDir: "public/lab",
    emptyOutDir: false,
    target: "es2020",
  },
});
