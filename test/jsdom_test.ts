import { it } from "deno_std/testing/bdd.ts";
import { baseTest } from "$/test/common/base-test.ts";
import { assertEquals } from "deno_std/assert/assert_equals.ts";

it(baseTest, "render docsify normal", async () => {
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

  await sleep(1000);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
