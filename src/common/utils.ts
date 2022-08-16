// deno-lint-ignore require-await
export async function sleep(ms: number): Promise<null> {
  // deno-lint-ignore no-unused-vars
  return new Promise<null>((resolve, reject) => setTimeout(resolve, ms));
}

export function _xpath(xpath: string, node: Node): HTMLElement[] {
  const xresult: XPathResult = document.evaluate(
    xpath,
    node,
    null,
    XPathResult.ANY_TYPE,
    null,
  );
  const xnodes = [];
  let xres: Node | null;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    xres = xresult.iterateNext();
    if (xres) {
      xnodes.push(xres);
    } else {
      break;
    }
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return xnodes as HTMLElement[];
}

// deno-lint-ignore no-explicit-any
export function _debug(text: any): void {
  if (localStorage.getItem("debug")) {
    console.log(text);
  }
}

type Handler = <T>(t: T) => void;

export function debounce(callback: Handler, ms: number) {
  let timer: number;
  return function <T>(...t: T[]) {
    clearTimeout(timer);
    timer = setTimeout(() => callback(t), ms);
  };
}
