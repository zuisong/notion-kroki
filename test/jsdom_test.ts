import { JSDOM } from "jsdom";
import * as asserts from "deno_std/testing/asserts.ts";

// import { DOMParser } from "https://esm.sh/linkedom@0.14.14"
// import { render } from "https://esm.sh/@testing-library/preact@3.2.2?deps=preact@10.10.6"; // make sure to specify preact version
import { beforeEach, describe, it } from "deno_std/testing/bdd.ts";

describe("components/nav", () => {
  beforeEach(() => {
    init();
  });

  it("render docsify", async () => {
    await testDom();
  });
});

function init() {
  const doc = (new JSDOM("") as any);

  window.document = doc.window.document;
  window.TextDecoder = undefined as any;
  window.XPathEvaluator = doc.window.XPathEvaluator;
  window.XPathResult = doc.window.XPathResult;
  window.MutationObserver = doc.window.MutationObserver;
}

async function testDom() {
  // language=HTML
  document.body.innerHTML = `
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
`;

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

  var id = window.setTimeout(function () {}, 0);

  while (id--) {
    window.clearTimeout(id); // will do nothing if no timeout with id is present
  }

  async function sleep(n: number) {
    return new Promise((r) =>
      setTimeout(() => {
        r(1);
      }, n)
    );
  }
}
// init()
// await testDom()
