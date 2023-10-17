import {
  Metadata,
  userscriptMetadataGenerator,
} from "userscript-metadata-generator";
import packageJson from "./package.json" assert { type: "json" };
export function meta(): string {
  const metadata: Metadata = {
    name: "notion-kroki",
    namespace: "https://github.com/zuisong/notion-kroki",
    homepage: "https://github.com/zuisong/notion-kroki",
    homepageURL: "https://github.com/zuisong/notion-kroki",
    source: "https://github.com/zuisong/notion-kroki",
    contributionURL: "https://github.com/zuisong/notion-kroki",
    grant: ["none"],
    version: packageJson.version,
    license: "MIT",
    match: ["*://www.notion.so/*", "*://*.notion.site/*", "*://*.super.site/*"],
    supportURL: "https://github.com/zuisong/notion-kroki/issues",
    "run-at": "document-idle",
    author: "zuisong",
    description: "Render notion code block as graph by kroki",
  };

  return userscriptMetadataGenerator(metadata);
}
