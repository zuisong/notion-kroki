import { beforeEach, describe, it } from "deno_std/testing/bdd.ts";
import { delay } from "deno_std/async/delay.ts";
import { init } from "./common/jdsom-env-init.ts";
import * as asserts from "deno_std/testing/asserts.ts";

describe("coverage other case", () => {
  beforeEach(() => {
    init();
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
    document.getElementById("kroki-code")!!.textContent = `//kroki `;
    main();
    await delay(600);

    document.getElementById("kroki-code")!!.textContent = `//kroki plantuml

`;
    main();
    await delay(600);

    var id = window.setTimeout(function () {}, 0);
    while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    await delay(1000);
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
    await delay(600);
    document.getElementById("kroki-code")!!.textContent = `//kroki plantuml
    a->b
    `;
    await delay(600);
    document.getElementById("kroki-code")!!.textContent = `//kroki plantuml

`;
    await delay(600);

    const svgUrl = document.querySelector("div[notion-kroki]")
      ?.firstElementChild
      ?.getAttribute("data");

    asserts.assertEquals(
      svgUrl,
      "//kroki.io/plantuml/svg/eNoBBAD7_2EtPmIC7QEv",
    );

    var id = window.setTimeout(function () {}, 0);
    while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    await delay(1000);
  });
});