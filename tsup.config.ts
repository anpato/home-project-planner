import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./server/index.ts'],
  outDir: './server/build',
  format: ['cjs'],
  clean: true,
  treeshake: true
});
