import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        dialexis: "src/index.ts",
        spark: "src/spark/index.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["presenter"],
    },
  },
});
