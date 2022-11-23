import "npm:fflate";
import "npm:vite";
import { defineConfig } from "npm:vite";

export default defineConfig({
  esbuild: {},
  build: {
    lib: {
      entry: "./src/main.ts",
      name: "notion-kroki",
      formats: ["es", "cjs", "umd"],
      fileName: "notion-kroki",
    },
    minify: false,
  },

  plugins: [],
});
