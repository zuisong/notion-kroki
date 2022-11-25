// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt@0.32.0/mod.ts";
import { VERSION } from "./build-write-code.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./dist/notion-kroki.js"],
  outDir: "./npm",
  shims: {
    deno: false,
  },
  compilerOptions: {
    target: "ES5",
    lib: [
      "dom",
      "dom.iterable",
      "esnext",
    ],

  },
  test: false,
  esModule: false,
  typeCheck: false,
  package: {
    // package.json properties
    name: "notion-kroki",
    version: VERSION,
    description: "notion-kroki",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/zuisong/notion-kroki.git",
    },
    bugs: {
      url: "https://github.com/zuisong/notion-kroki/issues",
    },
  },
});

// post build steps
// Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
