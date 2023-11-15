export type Any = Parameters<typeof console.log>[0];

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
