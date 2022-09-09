build:
  deno run -A build.ts

bundle:
  deno bundle src/main.ts

fmt:
  deno fmt src/ test/ build.ts dev_deps.ts

test_cov:
  deno test --coverage=coverage --no-check -A
  deno coverage coverage --lcov --output=coverage/lcov.info
