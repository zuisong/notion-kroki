import metaGenerate, { Metadata } from "npm:userscript-metadata-generator";
import { defineConfig, PluginOption } from "npm:vite";
import type { MonkeyUserScript as ScriptMeta } from "https://unpkg.com/vite-plugin-monkey@2.10.3/dist/node/index.d.ts";
import b, {
  BannerPluginOptions,
  ContentCallback,
} from "npm:vite-plugin-banner";
import { fflateJs } from "./test/deps/fflate.ts";
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
  },

  plugins: [banner({
    content: (file) => {
      const VERSION =
        JSON.parse(Deno.readTextFileSync("./package.json")).version;
      const metadata: Metadata & ScriptMeta = {
        name: "notion-kroki",
        namespace: "https://github.com/zuisong/notion-kroki",
        homepage: "https://github.com/zuisong/notion-kroki",
        homepageURL: "https://github.com/zuisong/notion-kroki",
        source: "https://github.com/zuisong/notion-kroki",
        contributionURL: "https://github.com/zuisong/notion-kroki",
        grant: "none",
        version: VERSION,
        license: "MIT",
        match: [
          "*://www.notion.so/*",
          "*://*.notion.site/*",
          "*://*.super.site/*",
        ],
        supportURL: "https://github.com/zuisong/notion-kroki/issues",
        require: [fflateJs],
        "run-at": "document-idle",
        author: "zuisong",
        description: "Render notion code block as graph by kroki",
      };

      const generate = metaGenerate as unknown as (
        metadata: Metadata,
      ) => string;
      return generate(metadata);
    },
  })],
});
