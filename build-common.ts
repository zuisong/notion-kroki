import {
  Metadata,
  userscriptMetadataGenerator,
} from "userscript-metadata-generator";
import { requiredLibs } from "$/src/userscript-meta.ts";

export function meta() {
  const VERSION = JSON.parse(Deno.readTextFileSync("./package.json")).version;
  const metadata: Metadata = {
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

  return userscriptMetadataGenerator(metadata);
}
