import { defineConfig } from "vite-plus";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  plugins: [reactRouter()],
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
