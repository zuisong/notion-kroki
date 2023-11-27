export type Any = Parameters<typeof console.log>[0];

export function sleep(ms: number) {
  const defer = Promise.withResolvers<void>();
  setTimeout(defer.resolve, ms);
  return defer.promise;
}
