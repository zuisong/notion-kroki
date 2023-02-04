import { defineConfig } from "npm:vite";
import JSON5 from "npm:json5";
import type {} from "@violentmonkey/types";
import { importMaps } from "vite-deno-import-map-plugin";
import metaGenerate, { Metadata } from "userscript-metadata-generator";
import { requiredLibs } from "$/src/userscript-meta.ts";

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

export function meta() {
  const VERSION = JSON.parse(Deno.readTextFileSync("./package.json")).version;
  const metadata: Metadata | VMScriptGMInfoScriptMeta = {
    name: "notion-kroki",
    namespace: "https://github.com/zuisong/notion-kroki",
    homepage: "https://github.com/zuisong/notion-kroki",
    homepageURL: "https://github.com/zuisong/notion-kroki",
    source: "https://github.com/zuisong/notion-kroki",
    contributionURL: "https://github.com/zuisong/notion-kroki",
    grant: ["none"],
    version: VERSION,
    license: "MIT",
    match: [
      "*://www.notion.so/*",
      "*://*.notion.site/*",
      "*://*.super.site/*",
    ],
    supportURL: "https://github.com/zuisong/notion-kroki/issues",
    require: requiredLibs,
    "run-at": "document-idle",
    author: "zuisong",
    description: "Render notion code block as graph by kroki",
  };

  return metaGenerate(metadata);
}
