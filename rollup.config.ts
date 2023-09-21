import { meta } from "./build-common.ts";
import { esbuild, rollup } from "./deps.ts";
import denoResolve from "https://gist.github.com/zuisong/5b4ac483d9efcb01fa29389bc19fc7f5/raw/rollup-deno-plugin.ts";

const config: rollup.RollupOptions & { output: rollup.OutputOptions } = {
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
      transform(code, id) {
        return esbuild.transform<esbuild.TransformOptions>(code, {
          sourcefile: id,
          loader: "ts",
          format: "esm",
          treeShaking: true,
          target: "es6",
          sourcemap: true,
          minify: false,
        });
      },
    },
  ] satisfies rollup.Plugin[],
};

const bundle = await rollup.rollup(config);
const output = config.output;
await bundle.write(Array.isArray(output) ? output[0] : output);
