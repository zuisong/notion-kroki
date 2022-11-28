import * as asserts from "deno_std/testing/asserts.ts";
import { beforeEach, describe, it } from "deno_std/testing/bdd.ts";
import { delay } from "deno_std/async/delay.ts";
import { init } from "./common/jdsom-env-init.ts";

describe("base case", () => {
  beforeEach(() => {
    init();
  });

  it("render docsify normal", async () => {
    await testDom();
  });
});

async function testDom() {
  // language=HTML
  document.body.innerHTML = `
  <!DOCTYPE html>
  <body>
  <div>
    <div>
      <div>
        <p id="kroki-code">//kroki plantuml
          a->b
        </p>
      </div>
    </div>
  </div>
  <div id="change"></span>
  </body>
`;

  console.log(`
origin html is  ------
${document.documentElement.outerHTML}
------ `);

  await import("../src/index.ts");

  document.getElementById("change")!!.textContent = "changed";

  console.log(`
rendered html is  ------
${document.documentElement.outerHTML}
------ `);

  const svgUrl = document.querySelector("div[notion-kroki]")?.firstElementChild
    ?.getAttribute("data");

  asserts.assertEquals(
    svgUrl,
    "//kroki.io/plantuml/svg/eNpTgINEXbskLhgHACmYA3k=",
  );

  console.log("render svgUrl ->", svgUrl);

  var id = window.setTimeout(function () {}, 0);

  while (id--) {
    window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
  await delay(500);
}
