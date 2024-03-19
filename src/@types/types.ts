import type * as fflateAlias from "npm:fflate@0.8.0";
declare global {
  interface Window {
    fflate: typeof fflateAlias;
  }

  const fflate: typeof fflateAlias;
}

export declare interface KrokiOption {
  serverPath: string;
}
