import { esbuild, httpImports } from "./dev_deps.ts";

const VERSION = "1.1.4";

export async function build() {
  await esbuild.build({
    bundle: true,
    entryPoints: ["./src/main.ts"],
    minify: true,
    target: [
      "chrome57",
      "edge16",
      "firefox57",
      "safari11",
    ],
    format: "esm",
    outdir: "./dist",
    keepNames: false,
    treeShaking: true,
    plugins: [httpImports({
      defaultToJavascriptIfNothingElseFound: true,
    })],
    loader: {
      ".ts": "ts",
      ".js": "js",
    },
    logLevel: "verbose",
  });
  esbuild.stop();

  async function writeCode() {
    const targetFile = "notion-kroki.user.js";
    try {
      await Deno.remove(targetFile, { recursive: true });
    } catch (_) {
      // ignore error if file not exists
    }
    const code = await Deno.readTextFile("dist/main.js");

    const template = await Deno.readTextFile("src/template.js");

    const result = template
      .replace("//code here", code)
      .replace("[version]", VERSION);

    await Deno.writeTextFile(targetFile, result);
  }

  await writeCode();
}

build();
