import { assertEquals } from "deno_std/assert/assert_equals.ts";
import { delay } from "deno_std/async/delay.ts";
import { it } from "deno_std/testing/bdd.ts";
import { baseTest } from "./common/base-test.ts";

it(baseTest, "render skip error data", async () => {
  // language=HTML
  document.body.innerHTML = `
  <!DOCTYPE html>
  <body>
  <div>
    <div>
      <div>
        <p id="kroki-code">//kroki 
          a->c
        </p>
      </div>
    </div>
  </div>
  <div id="change"></span>
  </body>
`;

  const { main } = await import("../src/main.ts");
  main();
  document.getElementById("kroki-code")!.textContent = "//kroki ";
  main();
  await delay(300);

  document.getElementById("kroki-code")!.textContent = `//kroki plantuml

`;
  main();
  await delay(300);
});

it(baseTest, "change content auto render", async () => {
  // language=HTML
  document.body.innerHTML = `
  <!DOCTYPE html>
  <body>
  <div>
    <div>
      <div>
        <p id="kroki-code">//kroki plantuml
          a->c
        </p>
      </div>
    </div>
  </div>
  <div id="change"></span>
  </body>
`;

  const { main, init_listener } = await import("../src/main.ts");
  main();
  init_listener();
  await delay(300);
  document.getElementById("kroki-code")!.textContent = `//kroki plantuml
    a->b
    `;
  await delay(300);
  document.getElementById("kroki-code")!.textContent = `//kroki plantuml

`;

  await delay(300);
  await import("../src/main.ts");
  await delay(300);

  const svgUrl = document
    .querySelector("div[notion-kroki]")
    ?.firstElementChild?.getAttribute("data");

  if (globalThis.MutationObserver) {
    assertEquals(
      svgUrl,
      "https://kroki.io/plantuml/svg/eNpTAIJEXbskLhADABAOAjk=",
    );
  }
});
