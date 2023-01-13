import * as esbuild from "https://deno.land/x/esbuild@v0.16.17/mod.js";
import { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.6.0/mod.ts";
import { meta } from "$/src/userscript-meta.ts";


await esbuild.build(
  {
    plugins: [denoPlugin() as esbuild.Plugin],
    entryPoints: { "notion-kroki": "./src/index.ts" },
    outdir: "dist",
    bundle: true,
    target: "es6",
    format: "esm",
  },
);

esbuild.stop();

export async function build() {
  async function writeCode() {
    const targetFile = "notion-kroki.user.js";
    try {
      await Deno.remove(targetFile, { recursive: true });
    } catch (_) {
      // ignore error if file not exists
    }
    const code = await Deno.readTextFile("./dist/notion-kroki.js");

    const result = `${meta()}

${code}
`;

    await Deno.writeTextFile(targetFile, result);
  }

  await writeCode();
}

build();
