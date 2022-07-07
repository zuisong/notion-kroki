import { _debug, _xpath, sleep } from './common/utils';
import { strFromU8, zlibSync } from 'fflate';

const defaultConfig: KrokiOption = {
  serverPath: '//kroki.io/',
};

await sleep(3000); // wait document render end
const blocks: HTMLElement[] = _xpath("//div[ contains( @class,'notion-code-block') and @data-block-id]", document.body);
for (const block of blocks) {
  if (_xpath(".//div[text()='Plain Text']", block).length == 0) {
    continue;
  }

  const codeDiv = _xpath(".//div[contains(@class,'notion-code-block')]", block).at(0);
  if (!codeDiv) continue;

  if (codeDiv.innerText.startsWith('//kroki')) {
    const lines = codeDiv.innerText.split('\n');
    const type = lines[0].replace('//kroki', '').trim();
    const data = lines.filter((value, index) => index != 0).join('\n');
    const obj = plant(data, type, defaultConfig);
    const div = document.createElement('div', undefined);
    div.style.cssText = 'display: flex; flex-direction: row; place-content: center;'
    div.innerHTML = obj;

    codeDiv.parentElement?.appendChild(div);
  }
}

function textEncode(str: string) {
  return new TextEncoder().encode(str);
}

function plant(content: string, type: string, config: KrokiOption) {
  content = content.trim();

  console.log(`kroki render type: ${type}`);
  console.log(`kroki render content: \n ${content}`);

  const urlPrefix = `${config?.serverPath + type}/svg/`;
  const data: Uint8Array = textEncode(content);
  const compressed: string = strFromU8(zlibSync(data, { level: 9 }), true);
  const result: string = btoa(compressed).replace(/\+/g, '-').replace(/\//g, '_');
  const svgUrl: string = urlPrefix + result;

  return `<object type="image/svg+xml" data="${svgUrl}" />`;
}

interface KrokiOption {
  serverPath: string;
}
