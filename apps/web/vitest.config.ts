import { defineConfig, mergeConfig } from 'vitest/config';
import nextConfig from '@repo/vitest-config/next';

export default mergeConfig(
  nextConfig,
  defineConfig({
    test: {
      setupFiles: ['./vitest.setup.ts'],
    },
  }),
);
