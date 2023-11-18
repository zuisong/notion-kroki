import * as swc from "npm:@swc/wasm@1.3.97";
import { meta } from "./build-common.ts";
import { rollup } from "./deps.ts";
import denoResolve from "./rollup-deno-plugin.ts";
import * as terser from "esm.sh/terser@5.24.0?bundle";

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
      async transform(rawCode, fileName) {
        return await swc.transform(rawCode,
          {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
              target: 'es2016',
            },
            sourceMaps: true,
          })
      },
    },
    {
      name: "terser",
      async renderChunk(code) {
        const res = await terser.minify(code, {
          module: true,
          compress: true,
          sourceMap: true,
          mangle: true,
        });
        return { code: res.code as string, map: res.map as string };
      },
    },
  ] satisfies rollup.Plugin[],
};

const bundle = await rollup.rollup(config);
await bundle.write(config.output);
