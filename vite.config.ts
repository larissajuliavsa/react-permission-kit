import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ReactPermissionKit",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});