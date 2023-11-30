import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { Any } from "../../src/common/utils.ts";
import { requiredLibs } from "../../src/userscript-meta.ts";
import { sleep } from "../utils.ts";

export async function init() {
  // deno-lint-ignore ban-ts-comment
  //@ts-ignore
  GlobalRegistrator.registered = null;
  GlobalRegistrator.register();
  document.body.innerHTML = '<div class="container"></div>';
  globalThis.TextDecoder = undefined as Any;
  await sleep(1);
  await Promise.all(requiredLibs.map((lib) => import(lib)));
}

export async function tearDown() {
  let id = setTimeout(() => {}, 0);
  while (id--) {
    clearTimeout(id); // will do nothing if no timeout with id is present
  }
  await sleep(1);
}
