import { delay } from "deno_std/async/delay.ts";
import type {} from "$/src/@types/types.d.ts";
import { requiredLibs } from "$/src/userscript-meta.ts";
export async function init() {
  const doc = new DOMParser().parseFromString(
    `
    <h1>Hello World!</h1>
    <p>Hello from <a href="https://deno.land/">Deno!</a></p>
  `,
    "text/html",
  )!;

  window.MutationObserver = MutationObserverImpl as unknown as any;

  window.document = doc as unknown as Document;
  window.TextDecoder = undefined as any;
  await Promise.all(requiredLibs.map((lib) => import(lib)));
}

class MutationObserverImpl {
  constructor(private callBack: MutationCallback, private o: MutationObserver) {
  }

  observe(target: Node, options?: MutationObserverInit): void {
    setTimeout(() => {
      this.callBack([undefined as any], undefined as any);
    }, 300);
  }
}

export async function tearDown() {
  let id = window.setTimeout(function () {}, 0);
  while (id--) {
    window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
  await delay(500);
}

import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom@v0.1.37/deno-dom-wasm.ts";
