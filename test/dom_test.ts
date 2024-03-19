import { assertEquals } from "jsr:@std/assert";
import { it } from "jsr:@std/testing/bdd";
import { baseTest } from "./common/base-test.ts";
import { delay } from "./utils.ts";

it(baseTest, "render docsify normal", async () => {
  localStorage.setItem("debug", "123");
  await testDom();
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

  document.getElementById("change")!.textContent = "changed";

  console.log(`
rendered html is  ------
${document.documentElement.outerHTML}
------ `);

  const svgUrl = document
    .querySelector("div[notion-kroki]")
    ?.firstElementChild?.getAttribute("data");

  assertEquals(
    svgUrl,
    "https://kroki.io/plantuml/svg/eNpTgINEXbskLhgHACmYA3k=",
  );

  console.log("render svgUrl ->", svgUrl);

  await delay(1000);
}
