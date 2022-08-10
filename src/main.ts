import { strFromU8, zlibSync } from 'fflate';
import debounce from 'just-debounce-it';
import { sleep, _debug, _xpath } from './common/utils';

const defaultConfig: KrokiOption = {
  serverPath: '//kroki.io/',
};
async function main(element: Node | null = null) {
  await sleep(3000); // wait document render end
  const blocks: HTMLElement[] = _xpath("//*[starts-with(text(),'//kroki ')]", element ?? document.body);
  for (const codeDiv of blocks) {

    if (!codeDiv) continue;

    if (codeDiv.innerText.startsWith('//kroki')) {
      const lines = codeDiv.innerText.split('\n');
      const type = lines[0].replace('//kroki', '').trim();
      if (!type?.trim()) continue
      const data = lines.filter((value, index) => index != 0).join('\n');
      if (!data?.trim()) continue
      const svgUrl = plant(data, type, defaultConfig);
      const div = document.createElement('div', undefined);
      div.style.cssText = 'display: flex; flex-direction: row; place-content: center;'
      div.setAttribute("notion-kroki", "true");
      div.innerHTML = `<object type="image/svg+xml" data="${svgUrl}" />`;

      const preCreatedNode = codeDiv.parentElement?.parentElement?.querySelector("div[notion-kroki]")
      if (preCreatedNode) {
        const preSvgUrl = preCreatedNode.firstElementChild?.getAttribute("data")
        _debug("preSvgUrl:" + preSvgUrl)
        _debug("svgUrl:" + svgUrl)
        if (preSvgUrl == svgUrl) { continue }
        else { codeDiv.parentElement?.parentElement?.removeChild(preCreatedNode) }
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
  const result: string = window.btoa(compressed).replace(/\+/g, '-').replace(/\//g, '_');
  const svgUrl: string = urlPrefix + result;

  return svgUrl;
}

interface KrokiOption {
  serverPath: string;
}

main();



(new MutationObserver(check)).observe(document, { childList: true, subtree: true });

function check(mutations: MutationRecord[], observer: MutationObserver) {
  _debug(mutations)
  mutations.forEach(mutation => {
    debounce(main, 1000, true)(mutation.target)
  })
}


