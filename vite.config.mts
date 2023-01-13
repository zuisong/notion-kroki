import { defineConfig, PluginOption } from "npm:vite";
import type {} from "https://unpkg.com/@violentmonkey/types@0.1.5/index.d.ts";
import b, {
  BannerPluginOptions,
  ContentCallback,
} from "npm:vite-plugin-banner";
import { meta } from "$/src/userscript-meta.ts";
const banner = b as unknown as (
  pluginOptions: string | BannerPluginOptions | ContentCallback,
) => PluginOption;
export default defineConfig({
  esbuild: {},
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "notion-kroki",
      formats: ["es", "cjs", "umd"],
      fileName: "notion-kroki",
    },
    minify: false,
    sourcemap: true,
    target: "es6",
  },

  plugins: [banner({
    content: (_file) => {
      return meta();
    },
  })],
});
