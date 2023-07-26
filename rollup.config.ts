import { rollup, type RollupOptions } from "esm.sh/rollup@3.26.3?bundle";
import { transform } from "npm:@swc/wasm@1.3.70";
import { meta } from "$/build-common.ts";

import * as JSONC from "deno_std/jsonc/mod.ts";
import { importMapResolve } from "$/rollup-import-maps-plugin.ts";
const { imports, scopes } = JSONC.parse(Deno.readTextFileSync("./deno.jsonc"));

const config: RollupOptions = {
  input: ["./src/index.ts"],
  output: {
    sourcemap: false,
    file: "notion-kroki.user.js",
    format: "module",
    banner: meta(),
  },
  plugins: [
    importMapResolve({
      importMap: { imports, scopes },
    }),
    {
      name: "swc",
      transform: (code) =>
        transform(code, {
          jsc: {
            parser: {
              syntax: "typescript",
              decorators: true,
            },
          },
          env: {
            targets: ["supports es6-module-dynamic-import"],
          },
          sourceMaps: true,
        }),
    },
  ],
};

const bundle = await rollup(config);
const output = config.output!;
await bundle.write(Array.isArray(output) ? output[0] : output);
