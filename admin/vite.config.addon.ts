import { fileURLToPath, URL } from 'node:url'
import { createRequire } from 'node:module'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const require = createRequire(import.meta.url)
const { isSharedExternal, isAdminLangExternal, adminLangExternalPath, isCoreExternal, coreExternalPath } = require('./scripts/shared-external.cjs')
const { stripElementPlusStylePlugin } = require('./scripts/vite-plugin-strip-element-plus-style.cjs')

const addonKey = process.env.ADDON_KEY || ''
if (!addonKey) {
    throw new Error('ADDON_KEY is required for addon build')
}

const entry = fileURLToPath(new URL(`./.build/addons/${addonKey}/entry.ts`, import.meta.url))

const elementPlusResolver = ElementPlusResolver({ importStyle: false })

/** 单插件生产构建 */
export default defineConfig({
    base: '',
    publicDir: false,
    define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    },
    plugins: [
        stripElementPlusStylePlugin(),
        vue(),
        AutoImport({ resolvers: [elementPlusResolver] }),
        Components({ resolvers: [elementPlusResolver] }),
        // 注入 CSS：lib 模式 CSS 统一提取到 style.css，运行时注入为 <style> 标签
        {
            name: 'addon-css-inject',
            enforce: 'post',
            generateBundle(_opts, bundle) {
                const entry = bundle['index.js']
                const cssAsset = bundle['style.css']
                if (entry && entry.type === 'chunk' && cssAsset && cssAsset.type === 'asset') {
                    const css = JSON.stringify(cssAsset.source)
                    entry.code = `(function(){var s=document.createElement('style');s.textContent=${css};s.setAttribute('data-addon-style','${addonKey}');document.head.insertBefore(s,document.head.firstChild)})();\n${entry.code}`
                    delete bundle['style.css']
                }
            }
        }
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
            'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
        }
    },
    build: {
        cssCodeSplit: false,
        outDir: `dist/.addons/${addonKey}`,
        emptyOutDir: true,
        lib: {
            entry,
            formats: ['es'],
            fileName: () => 'index.js'
        },
        rollupOptions: {
            external: (id) => isAdminLangExternal(id) || isSharedExternal(id) || isCoreExternal(id),
            output: {
                inlineDynamicImports: false,
                chunkFileNames: '[name]-[hash].js',
                entryFileNames: 'index.js',
                paths(id) {
                    if (isAdminLangExternal(id)) return adminLangExternalPath()
                    if (isCoreExternal(id)) return coreExternalPath()
                }
            }
        }
    }
})
