export function debounce<
  T extends (...args: Parameters<typeof console.log>) => void,
  P extends Parameters<T>,
>(
  func: T,
  wait: number,
): (...args: P) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return (...args: P) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      func(...args);
    }, wait);
  };
}

export function _debug(...data: Parameters<typeof console.log>): void {
  if (isDebugMode()) {
    console.log(...data);
  }
}

export function isDebugMode(): boolean {
  return !!localStorage.getItem("debug");
}
