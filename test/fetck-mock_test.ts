import fetchMock from "https://esm.sh/fetch-mock@9.11.0";

fetchMock.mock('http://example.com', { status: 200, body: { result: "OK" } });
const res = await fetch('http://example.com');
console.log(await res.text())
console.log( res.headers)
console.log( res.status)
console.log( res.statusText)
fetchMock.restore();
