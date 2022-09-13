import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default (name: string) =>
  defineConfig({
    plugins: [dts()],
    build: {
      lib: {
        entry: 'index.ts',
        name,
        formats: ['cjs', 'es', 'iife'],
        fileName: (module) => {
          if (module === 'iife') return 'index.min.js';
          if (module === 'cjs') return 'index.cjs';
          if (module === 'es') return 'index.mjs';
          return 'index.js';
        }
      }
    }
  });
