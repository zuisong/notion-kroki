import { rollup, swc } from "$/deps.ts";
import { meta } from "$/build-common.ts";

import * as JSONC from "deno_std/jsonc/mod.ts";
import { importMapResolve } from "$/rollup-import-maps-plugin.ts";
const { imports, scopes } = JSONC.parse(Deno.readTextFileSync("./deno.jsonc"));

const config: rollup.RollupOptions = {
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
        swc.transform(code, {
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

const bundle = await rollup.rollup(config);
const output = config.output!;
await bundle.write(Array.isArray(output) ? output[0] : output);
