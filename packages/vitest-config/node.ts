import { defineConfig, mergeConfig } from "vitest/config";

import baseConfig from "./base";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: "node",
      include: ["**/*.{test,spec}.ts"],
    },
  }),
);
