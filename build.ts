//@deno-types="https://deno.land/x/emit@0.24.0/mod.ts"
import { bundle } from "https://bundle.deno.dev/https://deno.land/x/emit@0.24.0/mod.ts";
import * as JSONC from "deno_std/jsonc/mod.ts";
const { code } = await bundle(
  new URL("./src/index.ts", import.meta.url),
  {
    importMap: JSONC.parse(Deno.readTextFileSync("./deno.jsonc")),
  },
);
import { meta } from "./build-common.ts";
import { transformSync } from "npm:@swc/wasm";
const transformedCode = transformSync(code, {
  minify: false,
  env: {
    targets: {
      chrome: "65",
      firefox: "65",
      safari: "13",
    },
  },
}).code;

Deno.writeTextFileSync(
  "./notion-kroki.user.js",
  `${meta()}
${transformedCode}
`,
);
