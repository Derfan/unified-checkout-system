import { defineConfig, mergeConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

import baseConfig from "./base";

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [react()],
    test: {
      environment: "node",
      setupFiles: ["./vitest.setup.ts"],
      include: ["**/*.{test,spec}.{ts,tsx}"],
      globals: true,
    },
    resolve: {
      alias: {
        "react-native": "react-native-web",
      },
    },
  }),
);
