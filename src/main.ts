import { _debug, _xpath, debounce } from "$/src/common/utils.ts";
import type { KrokiOption } from "./@types/types.d.ts";
import type {} from "@violentmonkey/types";
const defaultConfig: KrokiOption = {
  serverPath: "//kroki.io/",
};

export function main(element: Node | null = null) {
  const blocks: HTMLElement[] = _xpath(
    "//*[starts-with(text(),'//kroki ')]",
    element ?? document.body,
  );
  for (const codeDiv of blocks) {
    if (codeDiv.textContent?.startsWith("//kroki")) {
      const lines = codeDiv.textContent.split("\n");
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
        const preSvgUrl = preCreatedNode.firstElementChild
          ?.getAttribute(
            "data",
          );
        _debug(`preSvgUrl:${preSvgUrl}`);
        _debug(`svgUrl:${svgUrl}`);
        if (preSvgUrl === svgUrl) {
          continue;
        } else {
          codeDiv.parentElement?.parentElement?.removeChild(
            preCreatedNode,
          );
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
  _debug(`kroki render type: ${type}`);
  _debug(`kroki render content:\n${content}`);

  const urlPrefix = `${config?.serverPath + type}/svg/`;
  const data: Uint8Array = textEncode(content);
  const compressed: string = strFromU8(
    fflate.zlibSync(data, { level: 9 }),
  );
  const result: string = btoa(compressed)
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const svgUrl: string = urlPrefix + result;

  return svgUrl;
}

export function init_listener() {
  new MutationObserver(check).observe(document, {
    childList: true,
    subtree: true,
  });
}

const render = debounce(main, 100);

function check(mutations: MutationRecord[], _observer: MutationObserver) {
  _debug("mutations", mutations);
  mutations.forEach((mutation) => {
    render();
  });
}

function strFromU8(dat: Uint8Array) {
  let r = "";
  const s = 2 ** 16;
  for (let i = 0; i < dat.length; i += s) {
    r += String.fromCharCode(...dat.subarray(i, i + s));
  }
  return r;
}
