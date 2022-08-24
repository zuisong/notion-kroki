import { JSDOM } from "https://jspm.dev/jsdom";
import * as asserts from "https://deno.land/std@0.152.0/testing/asserts.ts";
import { sleep } from "../src/common/utils.ts";
const doc = new JSDOM(`<!DOCTYPE html>
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


globalThis.document = doc.window.document
globalThis.window.XPathEvaluator = doc.window.XPathEvaluator
globalThis.window.XPathResult = doc.window.XPathResult
globalThis.window.MutationObserver = doc.window.MutationObserver

window.localStorage.setItem("debug", "1")

console.log("origin html ------ \n", document.documentElement.outerHTML, "\n", "------")

await import("../src/main.ts")

document.getElementById("change")!!.textContent = "changed"

console.log("rendered html is  ------ \n", document.documentElement.outerHTML, "\n",  "------")

const svgUrl = document.querySelector("div[notion-kroki]")?.firstElementChild?.getAttribute("data")

asserts.assertEquals(svgUrl, "//kroki.io/plantuml/svg/eNoBBAD7_2EtPmIC7QEv")

console.log("render svgUrl ->", svgUrl)

await sleep(1200)

