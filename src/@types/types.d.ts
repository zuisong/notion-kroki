import * as fflateAlias from "fflateType";
declare global {
  interface Window {
    fflate: typeof fflateAlias;
  }

  const fflate: typeof fflateAlias;
}

interface KrokiOption {
  serverPath: string;
}
