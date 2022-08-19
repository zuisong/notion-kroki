build:
  deno run -A build.ts

bundle:
  deno bundle src/main.ts

fmt:
  deno fmt src/ build.ts dev_deps.ts
