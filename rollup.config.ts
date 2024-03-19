import * as swc from "npm:@swc/wasm";
import { meta } from "./build-common.ts";
import { rollup } from "./deps.ts";
import denoResolve from "./rollup-deno-plugin.ts";

const config: rollup.InputOptions & { output: rollup.OutputOptions } = {
  input: ["./src/index.ts"],
  output: {
    sourcemap: true,
    file: "notion-kroki.user.js",
    format: "module",
    banner: meta(),
  },
  plugins: [
    denoResolve(import.meta.url),
    {
      name: "swc",
      async transform(rawCode, filename) {
        return await swc.transform(rawCode, {
          filename,
          jsc: { parser: { syntax: "typescript" } },
          env: { targets: "chrome>=70,firefox>=70" },
          sourceMaps: true,
          minify: false,
        });
      },
    },
  ],
};

const bundle = await rollup.rollup(config);
await bundle.write(config.output);
