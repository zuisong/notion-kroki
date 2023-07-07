import { delay } from "deno_std/async/delay.ts";
import type { } from "$/src/@types/types.d.ts";
import { requiredLibs } from "$/src/userscript-meta.ts";
import { GlobalRegistrator } from "npm:@happy-dom/global-registrator";

export async function init() {
  //@ts-ignore
  GlobalRegistrator.registered = []
  GlobalRegistrator.register()

  document.body.innerHTML = '<div class="container"></div>';
  window.TextDecoder = undefined as any;
  await Promise.all(requiredLibs.map((lib) => import(lib)));
}

export async function tearDown() {
  let id = window.setTimeout(function () { }, 0);
  while (id--) {
    window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
  await delay(500);
}
