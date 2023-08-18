import * as fflateAlias from "fflate";
declare global {
  interface Window {
    fflate: typeof fflateAlias;
  }

  const fflate: typeof fflateAlias;
}

interface KrokiOption {
  serverPath: string;
}
