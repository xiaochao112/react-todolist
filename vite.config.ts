import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // https://cn.vitejs.dev/config/shared-options.html#css-preprocessoroptions css预处理器配置
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { 'primary-color': '#DB4C3F' },
        javascriptEnabled: true, // 开启内置JavaScript
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.d.ts'], // 忽略后缀
  },
  plugins: [react()],
  server: {
    open: true,
    port: 8081,
  },
  build: {
    sourcemap: false, //打包后是否包含source-map
  },
});
