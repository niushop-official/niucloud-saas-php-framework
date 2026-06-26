/**
 * uni-app H5 Core 分构建 Vite 插件
 * - 替换 pages.json 为 pages.core.json
 * - 插件页面指向 .build/bridges/ 桥接组件
 * - 排除插件源码（保留 components/diy/group）
 */
const fs = require('fs')
const path = require('path')
const { ROOT, parsePagesJson, BRIDGE_ADDON_ROOT, BRIDGE_STUB_ROOT, BUILD_DIR } = require('./addon-utils.cjs')

const PAGES_JSON = path.join(ROOT, 'src', 'pages.json')
const ADDON_COMPONENTS_PREFIX = '@/addon/components/'
const ADDON_COMPONENTS_PATH = '/src/addon/components/'
const ADDON_COMPONENT_STUB_ROOT = BRIDGE_STUB_ROOT
const BRIDGE_ROUTE_PREFIX = BRIDGE_ADDON_ROOT
const PAGES_CORE = path.join(BUILD_DIR, 'pages.core.json')

function listAddonSubPackageRoots() {
    const pagesJson = parsePagesJson()
    const roots = new Set()
    for (const sub of pagesJson.subPackages || []) {
        if (sub.root?.startsWith('addon/')) roots.add(sub.root)
    }
    return [...roots]
}

function resolveBridgePageVue(norm) {
    const m = norm.match(/(?:@\/addon\/|\/src\/addon\/)(.+?)\/pages\/(.+?)(?:\?.*)?\.vue$/i)
    if (!m) return null
    const bridgePath = path.join(BRIDGE_ROUTE_PREFIX, m[1], 'pages', `${m[2]}.vue`)
    return fs.existsSync(bridgePath) ? bridgePath : null
}

function isAddonPath(norm) {
    if (norm.startsWith('@/addon/')) return true
    if (norm.includes('/src/addon/')) return true
    return false
}

function isAllowedAddonPath(norm) {
    if (norm.startsWith(ADDON_COMPONENTS_PREFIX)) return true
    if (norm.includes(ADDON_COMPONENTS_PATH)) return true
    if (norm.includes('/.build/bridges/')) return true
    return false
}

function createUniBuildPlugin() {
    const pagesJsonAbs = path.join(ROOT, 'src', 'pages.json')
    const pagesOverride = fs.existsSync(PAGES_CORE) ? PAGES_CORE : ''

    return {
        name: 'uni-split-build',
        enforce: 'pre',
        config(config) {
            const patch = {
                define: {
                    ...(config.define || {}),
                    __WAP_SPLIT_BUILD__: JSON.stringify(true)
                }
            }
            if (!pagesOverride) return patch

            const bridgeAliases = []
            for (const root of listAddonSubPackageRoots()) {
                const rel = root.replace(/^addon\//, '')
                const fromAbs = path.join(ROOT, 'src', root, 'pages')
                const toAbs = path.join(BRIDGE_ROUTE_PREFIX, rel, 'pages')
                if (!fs.existsSync(toAbs)) continue
                bridgeAliases.push(
                    { find: fromAbs, replacement: toAbs },
                    { find: `@/addon/${rel}/pages`, replacement: toAbs },
                    { find: `@/addon/${rel}/pages/`, replacement: toAbs + path.sep }
                )
            }
            patch.resolve = {
                alias: [
                    ...(Array.isArray(config.resolve?.alias) ? config.resolve.alias : []),
                    ...bridgeAliases,
                    { find: pagesJsonAbs, replacement: pagesOverride },
                    { find: '@/pages.json', replacement: pagesOverride },
                    { find: /src\/pages\.json$/, replacement: pagesOverride }
                ]
            }
            return patch
        },
        resolveId(source) {
            if (source.includes('*')) return null
            const norm = source.replace(/\\/g, '/')

            if (pagesOverride && (norm.endsWith('pages.json') || source === pagesJsonAbs)) {
                return pagesOverride
            }

            if (!isAddonPath(norm)) return null
            if (isAllowedAddonPath(norm)) return null

            if (norm.includes('/pages/') && norm.includes('.vue')) {
                const bridgePath = resolveBridgePageVue(norm)
                if (bridgePath) return bridgePath
                return null
            }

            if (isAddonPath(norm) && (norm.includes('.vue') || norm.endsWith('.vue'))) {
                const matched = norm.match(/(?:@\/addon\/|\/src\/addon\/)(.+?)(?:\?.*)?$/i)
                if (matched) {
                    const tsStub = path.join(ADDON_COMPONENT_STUB_ROOT, matched[1]).replace(/\.vue$/i, '.ts')
                    if (fs.existsSync(tsStub)) return tsStub
                    const stubPath = path.join(ADDON_COMPONENT_STUB_ROOT, matched[1])
                    if (fs.existsSync(stubPath)) return stubPath
                }
                return null
            }

            if (norm.endsWith('.vue') || norm.includes('.vue?')) return null

            return '\0addon-external:' + norm.replace(/\.json$/i, '.langdata')
        },
        load(id) {
            if (id.startsWith('\0addon-external:')) {
                return 'export default {}'
            }
        }
    }
}

module.exports = { createUniBuildPlugin }
