import fetchMock from "https://esm.sh/fetch-mock@9.11.0";
import { afterEach, beforeEach, describe, it } from "deno_std/testing/bdd.ts";

beforeEach(() => {
  fetchMock.restore();
});

it("mock fetch test", async () => {
  fetchMock.mock("http://example.com", { status: 200, body: { result: "OK" } });
  const res = await fetch("http://example.com");
  console.log(await res.text());
  console.log(res.headers);
  console.log(res.status);
  console.log(res.statusText);
});
