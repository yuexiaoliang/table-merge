import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'play-element-plus',
      filename: 'remoteEntry.js',
      exposes: {
        './table-merge': './src/components/table-merge.vue'
      },
      shared: ['vue', 'element-plus', '@table-merge/element-plus', 'element-plus/lib/components/table/style/css', 'element-plus/lib/components/table-column/style/css']
    })
  ],
  build: {
    target: ['esnext']
  }
});
