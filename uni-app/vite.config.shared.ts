import { fileURLToPath, URL } from 'node:url'
import { createRequire } from 'node:module'
import { defineConfig, type Plugin } from 'vite'

const require = createRequire(import.meta.url)
const { initPreContext, preJs } = require('@dcloudio/uni-cli-shared/dist/preprocess')
const { sharedExternalForBuild, diyCoreExternalForBuild } = require('./scripts/shared-external.cjs')
const { toViteDefine, getUniFeatureDefines } = require('./scripts/uni-feature-defines.cjs')

const pkgKey = process.env.SHARED_PKG || 'vue'
const emptyOutDir = process.env.SHARED_EMPTY === '1'
const entry = fileURLToPath(new URL(`./.build/shared/${pkgKey}.ts`, import.meta.url))
const outName = pkgKey
const pagesMinAbs = fileURLToPath(new URL('./.build/pages.min.json', import.meta.url))
const srcRoot = fileURLToPath(new URL('./src', import.meta.url))

const needsSrcAlias = pkgKey === 'wap-locale' || pkgKey === 'diy-core'

if (pkgKey === 'diy-core') {
    initPreContext('h5')
}

function createUniPreprocessPlugin(): Plugin {
    return {
        name: 'uni-preprocess-h5',
        enforce: 'pre',
        transform(code, id) {
            if (!/\.(?:ts|js|vue)$/.test(id)) return null
            const norm = id.replace(/\\/g, '/')
            if (!norm.includes('/src/') && !norm.includes('/.build/shared/')) return null
            return { code: preJs(code), map: null }
        }
    }
}

const excludeAddonPlugin = {
    name: 'shared-exclude-addon',
    enforce: 'pre' as const,
    resolveId(source: string) {
        if (source.includes('*')) return null
        const norm = source.replace(/\\/g, '/')
        if (norm.startsWith('@/addon/') || norm.includes('/src/addon/')) {
            return '\0addon-external:' + norm
        }
    },
    load(id: string) {
        if (id.startsWith('\0addon-external:')) return 'export default {}'
    }
}

export default defineConfig({
    publicDir: false,
    define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __WAP_SPLIT_BUILD__: JSON.stringify(pkgKey === 'wap-locale'),
        ...(pkgKey === 'vue' || pkgKey === 'diy-core' ? toViteDefine(getUniFeatureDefines()) : {})
    },
    resolve: needsSrcAlias
        ? {
            alias: [
                { find: '@/pages.json', replacement: pagesMinAbs },
                { find: '@', replacement: srcRoot }
            ]
        }
        : undefined,
    plugins: needsSrcAlias
        ? [
            excludeAddonPlugin,
            ...(pkgKey === 'diy-core' ? [createUniPreprocessPlugin()] : [])
        ]
        : [],
    build: {
        outDir: 'dist/.shared',
        emptyOutDir,
        lib: {
            entry,
            formats: ['es'],
            fileName: () => `${outName}.js`
        },
        rollupOptions: {
            external: pkgKey === 'diy-core' ? diyCoreExternalForBuild() : sharedExternalForBuild(pkgKey),
            output: pkgKey === 'diy-core'
                ? { inlineDynamicImports: true }
                : undefined
        }
    }
})
