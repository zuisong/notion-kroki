import metaGenerate, { Metadata } from "userscript-metadata-generator";
import type {} from "https://unpkg.com/@violentmonkey/types@0.1.5/index.d.ts";

export const requiredLibs = ["https://unpkg.com/fflate@0.7.4/umd/index.js"];

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
