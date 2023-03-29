import { beforeEach, describe, it } from "deno_std/testing/bdd.ts";
import { delay } from "deno_std/async/delay.ts";
import { init, tearDown } from "$/test/common/jdsom-env-init.ts";
import { assert } from "$/test/deps/chai.ts";

describe("coverage other case", () => {
  beforeEach(async () => {
    await init();
  });

  it("render skip error data", async () => {
    localStorage.setItem("debug", "1");
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

    const { main } = await import("../src/main.ts");
    document.getElementById("kroki-code")!!.textContent = "//kroki ";
    main();
    await delay(300);

    document.getElementById("kroki-code")!!.textContent = `//kroki plantuml

`;
    main();
    await delay(300);
    await tearDown();
  });

  it("change content auto render", async () => {
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
    document.getElementById("kroki-code")!!.textContent = `//kroki plantuml
    a->b
    `;
    await delay(300);
    document.getElementById("kroki-code")!!.textContent = `//kroki plantuml

`;

    await delay(300);
    await import("../src/main.ts");
    await delay(300);

    const svgUrl = document.querySelector("div[notion-kroki]")
      ?.firstElementChild
      ?.getAttribute("data");

    if (globalThis.MutationObserver) {
      assert.equal(
        svgUrl,
        "//kroki.io/plantuml/svg/eNpTAIJEXbskLhADABAOAjk=",
      );
    }

    await tearDown();
  });
});
