import { meta } from "$/build-common.ts";
import JSON5 from "npm:json5";
import { defineConfig } from "npm:vite";
import { importMaps } from "vite-deno-import-map-plugin";

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
