import { meta } from "$/build-common.ts";
import * as esbuild from "esbuild";
import { BuildOptions } from "esbuild";
import { resolve } from "node:path";
import JSON5 from "npm:json5";
await esbuild.build({
    plugins: [
      importMapPlugin(
        JSON5.parse(
          Deno.readTextFileSync("./deno.jsonc"),
        ),
      ),
    ],
    banner: {
      "js": meta(),
    },
    entryPoints: { "notion-kroki": "./src/index.ts" },
    outdir: "dist",
    bundle: true,
    target: "es6",
    minify: false,
    logLevel: "info",
    format: "esm",
  } as BuildOptions);

esbuild.stop();

function importMapPlugin(
  importMap: {
    imports: Record<string, string>;
  },
): esbuild.Plugin {
  return {
    name: importMapPlugin.name,
    setup(build) {
      build.onResolve({ filter: /^.*$/ }, (args) => {
        for (const [pre, value] of Object.entries(importMap.imports)) {
          if (args.path.startsWith(pre)) {
            return { path: resolve(args.path.replace(pre, value)) };
          }
        }
        return;
      });
    },
  };
}
