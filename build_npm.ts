// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt@0.32.0/mod.ts";
// import { VERSION } from "./build-write-code.ts";

const VERSION="1.14.0"
await emptyDir("./npm");

await build({
  entryPoints: ["./dist/notion-kroki.js"],
  // entryPoints: ["./src/main.ts"],
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
  declaration: false,
  test: false,
  // scriptModule: "cjs",
  esModule: false,
  typeCheck: false,
  packageManager: "pnpm",
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
