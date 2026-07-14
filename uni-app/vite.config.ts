import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import WindiCSS from 'vite-plugin-windicss'
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import { createRequire } from 'node:module'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const { createDiyGroupFixPlugin } = require('./scripts/vite-plugin-diy-group-fix.cjs')
const { createDiyDynamicBridgeMpPlugin } = require('./scripts/vite-plugin-diy-dynamic-bridge-mp.cjs')
const { createWindiPluginOptions } = require('./scripts/windi-vite-options.cjs')

const plugins = [
    UniLayouts(),
    uni(),
    createDiyGroupFixPlugin(),
    createDiyDynamicBridgeMpPlugin(),
    WindiCSS(createWindiPluginOptions(['src']))
]

process.env.UNI_PLATFORM == 'mp-weixin' && plugins.push(MiniProgramTailwind())

// App 构建：resolveId 拦截 glob 文件导入 → .build/ 替换文件（静态 import + pinia-preinit）
// 无动态导入 = 无 code splitting = 兼容 Rollup IIFE 格式
const isApp = (process.env.UNI_PLATFORM || '').startsWith('app')

isApp &&
    plugins.unshift({
        name: 'app-replace-globs',
        enforce: 'pre',
        resolveId(source) {
            const replacements: Record<string, string> = {
                'diy-component-registry.dev': path.resolve(__dirname, '.build/diy-component-registry.dev.app.ts'),
                'diy-component-globs.app': path.resolve(__dirname, '.build/diy-component-globs.app.ts'),
                'diy-component-globs.dev': path.resolve(__dirname, '.build/diy-component-globs.dev.ts')
            }
            const name = source.replace(/^\.\//, '').replace(/\.ts$/, '')
            if (replacements[name]) return replacements[name]
            return null
        }
    })

isApp &&
    plugins.push({
        name: 'app-inline-dynamic-imports',
        apply: 'build',
        outputOptions(options: Record<string, unknown>) {
            // 内联 locale/language.ts 的 await import(...) 等非 glob 动态导入，避免 IIFE 报错
            return Object.assign({}, options, { inlineDynamicImports: true, manualChunks: undefined })
        }
    })

export default defineConfig({
    server: {
        host: '0.0.0.0'
    },
    plugins,
    optimizeDeps: {
        include: ['dayjs']
    }
})
