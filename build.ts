import * as esbuild from 'https://deno.land/x/esbuild@v0.15.3/mod.js'
import { httpImports } from "https://deno.land/x/esbuild_plugin_http_imports@v1.2.4/index.ts";

const VERSION = "1.1.3"

await esbuild.build({
  bundle: true,
  entryPoints: ["./src/main.ts"],
  target: ["chrome60",],
  minify: true,
  format: "esm",
  outdir: "./dist",
  platform: "browser",
  keepNames: false,
  treeShaking: true,
  plugins: [httpImports()],
  loader: {
    '.ts': 'ts',
    '.js': 'js',
  },
  logLevel: 'debug'

})
esbuild.stop()


async function writeCode() {
  const targetFile = 'notion-kroki.user.js';
  await Deno.remove(targetFile);
  const code = await Deno.readTextFile('dist/main.js',);

  const template = await Deno.readTextFile('src/template.js',);

  const result = template
    .replace('//code here', code)
    .replace('[version]', VERSION);

  await Deno.writeTextFile(targetFile, result);
}


writeCode()

