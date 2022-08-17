// @deno-types="https://unpkg.com/fflate@0.7.3/lib/index.d.ts"
import {
  strFromU8,
  zlibSync,
} from "https://unpkg.com/fflate@0.7.3/esm/browser.js";

import { _debug, _xpath, debounce, sleep } from "./common/utils.ts";

const defaultConfig: KrokiOption = {
  serverPath: "//kroki.io/",
};
async function main(element: Node | null = null) {
  await sleep(3000); // wait document render end
  const blocks: HTMLElement[] = _xpath(
    "//*[starts-with(text(),'//kroki ')]",
    element ?? document.body,
  );
  for (const codeDiv of blocks) {
    if (!codeDiv) continue;

    if (codeDiv.innerText.startsWith("//kroki")) {
      const lines = codeDiv.innerText.split("\n");
      const type = lines[0].replace("//kroki", "").trim();
      if (!type?.trim()) continue;
      const data = lines.filter((_value, index) => index != 0).join("\n");
      if (!data?.trim()) continue;
      const svgUrl = plant(data, type, defaultConfig);
      const div = document.createElement("div", undefined);
      div.style.cssText =
        "display: flex; flex-direction: row; place-content: center;";
      div.setAttribute("notion-kroki", "true");
      div.innerHTML =
        `<object type="image/svg+xml" style="max-width: 100%;" data="${svgUrl}" />`;

      const preCreatedNode = codeDiv.parentElement?.parentElement
        ?.querySelector("div[notion-kroki]");
      if (preCreatedNode) {
        const preSvgUrl = preCreatedNode.firstElementChild?.getAttribute(
          "data",
        );
        _debug(`preSvgUrl:${preSvgUrl}`);
        _debug(`svgUrl:${svgUrl}`);
        if (preSvgUrl == svgUrl) {
          continue;
        } else {
          codeDiv.parentElement?.parentElement?.removeChild(preCreatedNode);
        }
      }

      codeDiv.parentElement?.parentElement?.appendChild(div);
    }
  }
}
function textEncode(str: string) {
  return new TextEncoder().encode(str);
}

function plant(content: string, type: string, config: KrokiOption) {
  content = content.trim();

  _debug(`kroki render type: ${type}`);
  _debug(`kroki render content: \n ${content}`);

  const urlPrefix = `${config?.serverPath + type}/svg/`;
  const data: Uint8Array = textEncode(content);
  const compressed: string = strFromU8(zlibSync(data, { level: 9 }), true);
  const result: string = btoa(compressed)
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const svgUrl: string = urlPrefix + result;

  return svgUrl;
}

interface KrokiOption {
  serverPath: string;
}

main();

function refresh() {
  main();
}

new MutationObserver(check).observe(document, {
  childList: true,
  subtree: true,
});

function check(mutations: MutationRecord[], _observer: MutationObserver) {
  _debug(mutations);
  mutations.forEach((mutation) => {
    debounce(refresh, 1000)(mutation.target);
  });
}
