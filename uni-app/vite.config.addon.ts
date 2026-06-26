import { fileURLToPath, URL } from 'node:url'
import { createRequire } from 'node:module'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import WindiCSS from 'vite-plugin-windicss'

const require = createRequire(import.meta.url)
const { isSharedExternal, isWapLocaleExternal, isDiyCoreExternal } = require('./scripts/shared-external.cjs')
const { createForceSharedExternalPlugin, createForceLocaleExternalPostPlugin, sharedOutputPaths } = require('./scripts/vite-plugin-force-shared-external.cjs')
const { createDiyGroupFixPlugin } = require('./scripts/vite-plugin-diy-group-fix.cjs')
const { createDiyGroupSplitPlugin } = require('./scripts/vite-plugin-diy-group-split.cjs')
const { toViteDefine, getUniFeatureDefines } = require('./scripts/uni-feature-defines.cjs')

const uniH5Shim = fileURLToPath(new URL('./scripts/uni-h5-global-shim.ts', import.meta.url))

const addonKey = process.env.ADDON_KEY || ''
if (!addonKey) {
    throw new Error('ADDON_KEY is required for addon build')
}

const entry = fileURLToPath(new URL(`./.build/addons/${addonKey}/entry.ts`, import.meta.url))

/** Rollup 插件：在构建时替换插件中的 navigateTo 实现，委托给 globalThis.uni */
function createNavDelegatePlugin() {
    return {
        name: 'nav-delegate',
        generateBundle(_opts: any, bundle: any) {
            for (const key of Object.keys(bundle)) {
                const chunk = bundle[key]
                if (chunk.type !== 'chunk') continue
                if (!chunk.code || !chunk.code.includes('defineAsyncApi')) continue
                if (!chunk.code.includes('const navigateTo')) continue

                let code = chunk.code
                // 精确替换 const navigateTo/redirectTo/reLaunch 定义（到 \nconst 或 \nfunction 为止）
                const patchNav = (name: string) => {
                    const re = new RegExp(`const ${name}\\s*=\\s*[\\s\\S]*?;(?=\\s*(const |function |var |let |class |async |export |import |$))`, 'g')
                    const replacement = `const ${name}=function(a){var u=globalThis.uni;return u&&u.${name}?u.${name}(a):Promise.reject({errMsg:"${name}:fail"})};`
                    code = code.replace(re, replacement)
                }
                patchNav('navigateTo')
                patchNav('redirectTo')
                patchNav('reLaunch')
                if (code !== chunk.code) {
                    chunk.code = code
                    console.log('[nav-delegate] patched ' + key)
                }
            }
        }
    }
}

/** 单插件 H5 lib 构建 */
export default defineConfig({
    publicDir: false,
    define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        __VUE_OPTIONS_API__: true,
        __WAP_SPLIT_BUILD__: JSON.stringify(true),
        ...toViteDefine(getUniFeatureDefines())
    },
    plugins: [
        createDiyGroupSplitPlugin(),
        createForceSharedExternalPlugin(),
        createForceLocaleExternalPostPlugin(),
        uni(),
        createDiyGroupFixPlugin(),
        createNavDelegatePlugin(),
        WindiCSS({
            scan: {
                dirs: [
                    `src/addon/${addonKey}`,
                    'src/components'
                ],
                fileExtensions: ['vue', 'js', 'ts']
            }
        })
    ],
    resolve: {
        alias: [
            {
                find: /^@\/utils\/diy-component-registry$/,
                replacement: fileURLToPath(new URL('./src/utils/diy-component-registry.split.ts', import.meta.url))
            },
            {
                find: /^@\/utils\/diy-component-loader$/,
                replacement: fileURLToPath(new URL('./src/utils/diy-component-loader.split.ts', import.meta.url))
            },
            { find: '@/utils/addon-loader', replacement: fileURLToPath(new URL('./src/utils/addon-loader.split.ts', import.meta.url)) },
            { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
            { find: '@dcloudio/uni-h5/dist/uni-h5.es.js', replacement: uniH5Shim }
        ]
    },
    build: {
        outDir: `dist/.addons/${addonKey}`,
        emptyOutDir: true,
        lib: {
            entry,
            formats: ['es'],
            fileName: () => 'index.js'
        },
        rollupOptions: {
            external: (id) => isDiyCoreExternal(id) || isWapLocaleExternal(id) || isSharedExternal(id),
            output: {
                inlineDynamicImports: false,
                chunkFileNames: '[name]-[hash].js',
                entryFileNames: 'index.js',
                paths(id) {
                    return sharedOutputPaths(id)
                }
            }
        }
    }
})
