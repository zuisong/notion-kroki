import { meta } from "./build-common.ts";
import { rollup } from "./deps.ts";
import denoResolve from "./rollup-deno-plugin.ts";
import * as babel from "esm.sh/@babel/standalone?bundle";
import * as terser from "esm.sh/terser?bundle";

const config: rollup.RollupInoutOptions & { output: rollup.OutputOptions } = {
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
      name: "esbuild",
      transform(rawCode, fileName) {
        const { code, map } = babel.transform(rawCode, {
          filename: fileName,
          presets: ["typescript"],
          sourceMaps: true,
          targets: ["chrome >=70"],
        });
        return { code: code ?? rawCode, map };
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
