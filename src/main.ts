import { _debug, _xpath, debounce, isDebugMode } from "./common/utils.ts";
import { zlibSync } from "./deps.ts";

const defaultConfig: KrokiOption = {
  serverPath: "//kroki.io/",
};

function b64encode(str: string): string {
  return btoa(str);
}

function main(element: Node | null = null) {
  const blocks: HTMLElement[] = _xpath(
    "//*[starts-with(text(),'//kroki ')]",
    element ?? document.body,
  );
  for (const codeDiv of blocks) {
    if (!codeDiv) continue;

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
        if (preSvgUrl == svgUrl) {
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
  content = content.trim();

  _debug(`kroki render type: ${type}`);
  _debug(`kroki render content: \n ${content}`);

  const urlPrefix = `${config?.serverPath + type}/svg/`;
  const data: Uint8Array = textEncode(content);
  const compressed: string = decode(zlibSync(data, { level: 9 }));
  const result: string = b64encode(compressed)
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const svgUrl: string = urlPrefix + result;

  return svgUrl;
}

interface KrokiOption {
  serverPath: string;
}

main();

new MutationObserver(check).observe(document, {
  childList: true,
  subtree: true,
});

function check(mutations: MutationRecord[], _observer: MutationObserver) {
  _debug("mutations", mutations);
  mutations.forEach((mutation) => {
    if (isDebugMode()) {
      main();
    } else {
      debounce(() => main(), 1000)();
    }
  });
}

function decode(dat: Uint8Array) {
  let r = "";
  for (let i = 0; i < dat.length; i += 16384) {
    r += String.fromCharCode(...dat.subarray(i, i + 16384));
  }
  return r;
}
