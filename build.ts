import { bundle } from "https://deno.land/x/emit@0.23.1/mod.ts";
import json5 from "json5";

const { code } = await bundle(
  new URL("./src/index.ts", import.meta.url),
  {
    importMap: json5.parse(Deno.readTextFileSync("./deno.jsonc")),
  },
);
//@deno-types="https://esm.sh/v124/@types/babel__standalone@^7/index.d.ts"
import babel from "npm:@babel/standalone@^7";
import { meta } from "./build-common.ts";

const transformedCode = babel.transform(
  code,
  {
    filename: "result.js",
    presets: ["env"],
    targets: [
      "since 2017"
    ],
  },
).code ?? "";

Deno.writeTextFileSync(
  "./notion-kroki.user.js",
  `
${meta()}
${transformedCode}
`.trimStart(),
);
