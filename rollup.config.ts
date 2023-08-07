import { rollup, swc } from "$/deps.ts";
import { meta } from "$/build-common.ts";
import * as JSONC from "deno_std/jsonc/mod.ts";
import { importMapResolve } from "$/rollup-import-maps-plugin.ts";
import { Any } from "$/test/utils.ts";
const { imports, scopes } = JSONC.parse(
  Deno.readTextFileSync("./deno.jsonc"),
) as Any;

const config: rollup.RollupOptions = {
  input: ["./src/index.ts"],
  output: {
    sourcemap: false,
    file: "notion-kroki.user.js",
    format: "module",
    banner: meta(),
  },
  plugins: [
    {
      name: "swc",
      transform: async (code) => {
        const res = await swc.transform(code, {
          jsc: {
            parser: {
              syntax: "typescript",
              decorators: true,
            },
          },
          env: {
            // mode: "usage",
            targets: ["supports es6-module-dynamic-import"],
          },
          sourceMaps: true,
        });
        return res;
      },
    },
    importMapResolve({
      importMap: { imports, scopes },
    }) satisfies rollup.Plugin,
  ],
};

const bundle = await rollup.rollup(config);
const output = config.output!;
await bundle.write(Array.isArray(output) ? output[0] : output);
