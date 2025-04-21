import { fileURLToPath, URL } from "node:url"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        WindiCSS(),
        vue()
    ],
    server: { host: 'localhost', port: 2000 },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        }
    },
    base: '/cashier/',
    build: {
      outDir: 'cashier', // 打包输出目录为 cashier
      rollupOptions: {
        output: {
          // 静态资源文件输出路径
          assetFileNames: 'assets/[name].[hash].[ext]',
          // 代码分割后的文件输出路径
          chunkFileNames: 'assets/[name].[hash].js',
          // 入口文件输出路径
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
    },
})
