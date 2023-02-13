// deno-lint-ignore ban-types
export const debounce = (fn: Function, ms: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  // deno-lint-ignore no-explicit-any
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// deno-lint-ignore no-explicit-any
export function _debug(...data: any[]): void {
  if (isDebugMode()) {
    console.log(...data);
  }
}

export function isDebugMode(): boolean {
  return !!localStorage.getItem("debug");
}
