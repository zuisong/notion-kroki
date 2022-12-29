import { defineConfig } from "npm:vite";
import denoResolve from "https://deno.land/x/vite_plugin_deno_resolve@0.5.0/mod.ts";
export default defineConfig({
  esbuild: {},
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "notion-kroki",
      formats: ["es", "cjs", "umd"],
      fileName: "notion-kroki",
    },
    minify: false,
    sourcemap: true,
  },

  plugins: [denoResolve()],
});
