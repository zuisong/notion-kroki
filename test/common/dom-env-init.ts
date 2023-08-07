import { delay } from "deno_std/async/delay.ts";
import { requiredLibs } from "$/src/userscript-meta.ts";
import { happyDom } from "$/deps.ts";
import { Any } from "$/test/utils.ts";

export async function init() {
  const win = new happyDom.GlobalWindow();
  const doc = win.document;
  doc.body.innerHTML = '<div class="container"></div>';

  window.MutationObserver = win.MutationObserver as Any;
  window.document = doc as unknown as Document;
  globalThis.TextDecoder = undefined as Any;
  await Promise.all(requiredLibs.map((lib) => import(lib)));
}

export async function tearDown() {
  let id = setTimeout(function () {}, 0);
  while (id--) {
    clearTimeout(id); // will do nothing if no timeout with id is present
  }
  await delay(500);
}
