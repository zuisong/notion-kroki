export function debounce<
  // deno-lint-ignore no-explicit-any
  T extends (...args: any[]) => any,
  P extends Parameters<T>,
>(
  func: T,
  wait: number,
): (...args: P) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return function debounced(...args: P): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      func(...args);
    }, wait);
  };
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
