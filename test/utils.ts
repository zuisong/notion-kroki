export type Any = Parameters<typeof console.log>[0];

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
