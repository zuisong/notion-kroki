import { esbuild, rollup } from "./deps.ts";
import { meta } from "./build-common.ts";
import * as JSONC from "deno_std/jsonc/mod.ts";
import { importMapResolve } from "./rollup-import-maps-plugin.ts";
import { Any } from "./test/utils.ts";
const { imports, scopes } = JSONC.parse(
  Deno.readTextFileSync("./deno.jsonc"),
) as Any;

const config: rollup.RollupOptions = {
  input: ["./src/index.ts"],
  output: {
    sourcemap: true,
    file: "notion-kroki.user.js",
    format: "module",
    banner: meta(),
  },
  plugins: [
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
    importMapResolve({
      importMap: { imports, scopes },
    }),
  ] satisfies rollup.Plugin[],
};

const bundle = await rollup.rollup(config);
const output = config.output!;
await bundle.write(Array.isArray(output) ? output[0] : output);
