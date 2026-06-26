import { fileURLToPath, URL } from 'node:url'
import { createRequire } from 'node:module'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import WindiCSS from 'vite-plugin-windicss'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'

const require = createRequire(import.meta.url)
const { createUniBuildPlugin } = require('./scripts/vite-plugin-uni-split-build.cjs')
const { createDiyGroupFixPlugin } = require('./scripts/vite-plugin-diy-group-fix.cjs')
const { createDiyGroupSplitPlugin } = require('./scripts/vite-plugin-diy-group-split.cjs')
const { isSharedExternal, isWapLocaleExternal, isDiyCoreExternal } = require('./scripts/shared-external.cjs')
const { createForceSharedExternalPlugin, createForceLocaleExternalPostPlugin, sharedOutputPaths } = require('./scripts/vite-plugin-force-shared-external.cjs')
const { createUniFullGlobalPlugin } = require('./scripts/vite-plugin-uni-full-global.cjs')
const { createWindiPluginOptions } = require('./scripts/windi-vite-options.cjs')

/** H5 框架 Core 构建：不含插件源码，分包页面使用桥接组件 */
export default defineConfig({
    define: {
        __WAP_SPLIT_BUILD__: JSON.stringify(true)
    },
    plugins: [
        createDiyGroupSplitPlugin(),
        createForceSharedExternalPlugin(),
        createForceLocaleExternalPostPlugin(),
        createUniFullGlobalPlugin(),
        createUniBuildPlugin(),
        UniLayouts(),
        uni(),
        createDiyGroupFixPlugin(),
        WindiCSS(createWindiPluginOptions(['src'], { coreBuild: true }))
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
            { find: '@/locale/i18n', replacement: fileURLToPath(new URL('./src/locale/wap-external-shim.ts', import.meta.url)) },
            { find: '@/locale', replacement: fileURLToPath(new URL('./src/locale/wap-external-shim.ts', import.meta.url)) },
            { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }
        ]
    },
    build: {
        outDir: 'dist/.core/h5',
        emptyOutDir: true,
        rollupOptions: {
            external: (id) => {
                if (isDiyCoreExternal(id)) return true
                if (isWapLocaleExternal(id)) return true
                return isSharedExternal(id)
            },
            output: {
                paths(id) {
                    return sharedOutputPaths(id)
                }
            }
        }
    }
})
