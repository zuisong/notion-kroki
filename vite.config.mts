import { defineConfig, PluginOption } from "npm:vite";
import JSON5 from "npm:json5";
import type {} from "@violentmonkey/types";
import b, {
  BannerPluginOptions,
  ContentCallback,
} from "npm:vite-plugin-banner";
import { importMaps } from "vite-deno-import-map-plugin";
import metaGenerate, { Metadata } from "userscript-metadata-generator";
import { requiredLibs } from "$/src/userscript-meta.ts";

const banner = b as unknown as (
  pluginOptions: string | BannerPluginOptions | ContentCallback,
) => PluginOption;
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
    target: "es6",
  },

  plugins: [
    importMaps(
      () =>
        JSON5.parse(
          Deno.readTextFileSync("./deno.jsonc"),
        ),
    ),
    banner({
      content: (_file) => {
        return meta();
      },
    }),
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
