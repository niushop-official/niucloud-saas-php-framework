import { fileURLToPath, URL } from 'node:url'
import { createRequire } from 'node:module'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const require = createRequire(import.meta.url)
const { isSharedExternal, isAdminLangExternal, adminLangExternalPath } = require('./scripts/shared-external.cjs')
const { stripElementPlusStylePlugin } = require('./scripts/vite-plugin-strip-element-plus-style.cjs')

const rootDir = fileURLToPath(new URL('.', import.meta.url))

const elementPlusResolver = ElementPlusResolver({ importStyle: false })

/** Core 生产构建：不包含 src/addon 源码（运行时通过 manifest 加载） */
export default defineConfig({
    base: '',
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
        {
            name: 'exclude-addon-source',
            enforce: 'pre',
            resolveId(source, importer) {
                if (source.includes('*')) return null
                const norm = source.replace(/\\/g, '/')
                if (importer && importer.includes('/src/addon/')) return null
                if (norm.startsWith('@/addon/') || norm.includes('/src/addon/')) {
                    // 虚拟 id 勿以 .json 结尾，否则 vite:json 会尝试解析
                    return '\0addon-external:' + norm.replace(/\.json$/i, '.langdata')
                }
            },
            load(id) {
                if (id.startsWith('\0addon-external:')) {
                    return 'export default {}'
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
        outDir: 'dist/.core',
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            external: (id) => {
                const norm = id.replace(/\\/g, '/')
                if (norm.includes('/style/css') || norm.includes('/style/index')) return false
                if (norm.includes('element-plus/dist/')) return false
                if (norm.includes('element-plus/theme-chalk')) return false
                if (isAdminLangExternal(id)) return true
                return isSharedExternal(id)
            },
            output: {
                paths(id) {
                    if (isAdminLangExternal(id)) return adminLangExternalPath()
                }
            }
        }
    }
})
