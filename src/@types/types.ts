import * as fflateAlias from "esm.sh/fflate";
declare global {
  interface Window {
    fflate: typeof fflateAlias;
  }

  const fflate: typeof fflateAlias;
}

export declare interface KrokiOption {
  serverPath: string;
}
