import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host-app',
      remotes: {
        '@table-merge/play-element-plus': 'http://localhost:4173/assets/remoteEntry.js'
      },
      shared: ['vue']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    https: false,
    host: '192.168.1.87',
    port: 5100
  },
  cacheDir: 'node_modules/.cacheDir'
});
