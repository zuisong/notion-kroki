import { JSDOM } from "jsdom";
import * as asserts from "deno_std/testing/asserts.ts";
import { sleep } from "../src/common/utils.ts";

// language=HTML
const doc = new JSDOM(`
  <!DOCTYPE html>
  <body>
  <div>
    <div>
      <div>
        <p>//kroki plantuml
          a->b
        </p>
      </div>
    </div>
  </div>
  <div id="change"></span>
  </body>
`);

globalThis.document = doc.window.document;
globalThis.window.XPathEvaluator = doc.window.XPathEvaluator;
globalThis.window.XPathResult = doc.window.XPathResult;
globalThis.window.MutationObserver = doc.window.MutationObserver;

localStorage.setItem("debug", "1");

console.log(`
origin html is  ------
${document.documentElement.outerHTML}
------ `);

await import("../src/main.ts");

document.getElementById("change")!!.textContent = "changed";

console.log(`
rendered html is  ------
${document.documentElement.outerHTML}
------ `);

const svgUrl = document.querySelector("div[notion-kroki]")?.firstElementChild
  ?.getAttribute("data");

asserts.assertEquals(svgUrl, "//kroki.io/plantuml/svg/eNoBBAD7_2EtPmIC7QEv");

console.log("render svgUrl ->", svgUrl);

Deno.exit(0);
