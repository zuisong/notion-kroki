// deno-lint-ignore ban-types
export const debounce = (fn: Function, ms: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  // deno-lint-ignore no-explicit-any
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export function _xpath(xpath: string, node: Node): HTMLElement[] {
  const xresult: XPathResult = document.evaluate(
    xpath,
    node,
    null,
    XPathResult.ANY_TYPE,
    null,
  );
  const xnodes: Node[] = [];
  let xres: Node | null;
  while (true) {
    xres = xresult.iterateNext();
    if (xres) {
      xnodes.push(xres);
    } else {
      break;
    }
  }
  return xnodes as HTMLElement[];
}

// deno-lint-ignore no-explicit-any
export function _debug(...data: any[]): void {
  if (isDebugMode()) {
    console.log(...data);
  }
}

export function isDebugMode(): boolean {
  return !!localStorage.getItem("debug");
}
