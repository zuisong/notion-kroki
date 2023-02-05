import { defineConfig } from "npm:vite";
import JSON5 from "npm:json5";
import { importMaps } from "vite-deno-import-map-plugin";
import { meta } from "$/build-common.ts";

export default defineConfig({
  esbuild: {
    legalComments: "none",
    banner: meta(),
  },
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "notion-kroki",
      formats: ["es", "cjs", "umd"],
      fileName: "notion-kroki",
    },
    minify: false,
    sourcemap: false,
    target: "es6",
  },

  plugins: [
    importMaps(
      () =>
        JSON5.parse(
          Deno.readTextFileSync("./deno.jsonc"),
        ),
    ),
  ],
});
