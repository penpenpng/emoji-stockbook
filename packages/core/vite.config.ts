import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      name: "@emoji-stockbook/core",
      fileName: (format) => `index.${format}.js`,
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs", "umd"],
    },
    sourcemap: true,
  },
  plugins: [dts()],
});
