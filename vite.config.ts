import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        dialexis: "src/index.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["presenter"],
    },
  },
});
