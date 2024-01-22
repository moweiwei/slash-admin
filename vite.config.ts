import { Agent } from 'https';
import path from 'path';

import react from '@vitejs/plugin-react';
// import copy from 'rollup-plugin-copy';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import tsconfigPaths from 'vite-tsconfig-paths';

import gitInfoPlugin from './src/plugins/vite-plugin-git-info';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // env用于拿到环境变量
  const env = loadEnv(mode, process.cwd());
  console.log('env', env);

  return {
    base: './',
    esbuild: {
      // drop: ['console', 'debugger'],
    },
    css: {
      // 开css sourcemap方便找css
      devSourcemap: true,
    },
    plugins: [
      react(),
      // 同步tsconfig.json的path设置alias
      tsconfigPaths(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      visualizer({
        open: false,
      }),
      gitInfoPlugin(),
      // copy({
      //   targets: [
      //     { src: 'manifest.json', dest: 'dist' }, // 复制 manifest.json 到 dist 目录
      //   ],
      // }),
    ],
    server: {
      // 自动打开浏览器
      open: true,
      host: true,
      port: 3001,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          // https://github.com/vitejs/vite/discussions/8998#discussioncomment-4408695
          agent: new Agent({ keepAlive: true, keepAliveMsecs: 20000 }),
        },
      },
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      assetsInlineLimit: 4096, // 图片转 base64 编码的阈值,小于此阈值的图片转为 base64 格式
      // rollupOptions: {
      //   output: {
      //     manualChunks(id) {
      //       if (id.includes('node_modules')) {
      //         // 让每个插件都打包成独立的文件
      //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
      //       }
      //       return null;
      //     },
      //   },
      // },
      terserOptions: {
        compress: {
          // 生产环境移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  };
});
