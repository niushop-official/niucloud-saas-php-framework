/**
 * uni-app 插件构建公共工具
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const ADDON_DIR = path.join(ROOT, 'src', 'addon')
const PAGES_JSON = path.join(ROOT, 'src', 'pages.json')
const BUILD_DIR = path.join(ROOT, '.build')
/** 分构建桥接层：addon 页面桥接 + 组件 stub（原 src/_bridge） */
const BRIDGE_DIR = path.join(BUILD_DIR, 'bridges')
const BRIDGE_ADDON_ROOT = path.join(BRIDGE_DIR, 'addon')
const BRIDGE_STUB_ROOT = path.join(BRIDGE_DIR, 'component-stubs')
const SKIP_ADDON_DIRS = new Set(['components'])

function stripJsonComments(text) {
    return text
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/^\s*\/\/.*$/gm, '')
        .replace(/,\s*([}\]])/g, '$1')
}

function parsePagesJson() {
    const raw = stripJsonComments(fs.readFileSync(PAGES_JSON, 'utf-8'))
    return JSON.parse(raw)
}

function listAddonKeys() {
    if (!fs.existsSync(ADDON_DIR)) return []
    return fs.readdirSync(ADDON_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory() && !SKIP_ADDON_DIRS.has(d.name))
        .map((d) => d.name)
        .sort()
}

function walkFiles(dir, filter, base = dir) {
    const out = []
    if (!fs.existsSync(dir)) return out
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name)
        const stat = fs.statSync(full)
        if (stat.isDirectory()) {
            out.push(...walkFiles(full, filter, base))
        } else if (filter(full)) {
            out.push(path.relative(base, full).replace(/\\/g, '/'))
        }
    }
    return out
}

/** 从 pages.json 解析插件分包页面 */
function scanSubPackagePages() {
    const pagesJson = parsePagesJson()
    const rows = []
    for (const sub of pagesJson.subPackages || []) {
        const root = sub.root
        if (!root || !root.startsWith('addon/')) continue
        const addonKey = root.split('/')[1]
        if (!addonKey || SKIP_ADDON_DIRS.has(addonKey)) continue
        for (const page of sub.pages || []) {
            if (!page.path) continue
            const importPath = `${root.replace(/^addon\//, '')}/${page.path}`
            rows.push({
                addonKey,
                root,
                path: page.path,
                importPath,
                fullRoute: `/${root}/${page.path}`,
                vueFile: path.join(ROOT, 'src', root, `${page.path}.vue`)
            })
        }
    }
    return rows
}

/** 扫描插件 pages 目录下所有 .vue（含 home_service 等多端结构） */
function scanAddonPages(key) {
    const base = path.join(ADDON_DIR, key)
    return walkFiles(base, (f) => f.includes(`${path.sep}pages${path.sep}`) && f.endsWith('.vue'), base)
        .map((p) => p.replace(/\.vue$/, ''))
}

/**
 * 扫描插件 locale
 * @returns {Record<string, string[]>}
 */
function scanAddonLocale(key) {
    const localeDir = path.join(ADDON_DIR, key, 'locale')
    const out = {}
    if (!fs.existsSync(localeDir)) return out
    for (const locale of fs.readdirSync(localeDir)) {
        const localePath = path.join(localeDir, locale)
        if (!fs.statSync(localePath).isDirectory()) continue
        out[locale] = fs.readdirSync(localePath)
            .filter((f) => f.endsWith('.json'))
            .map((f) => f.replace(/\.json$/, ''))
            .sort()
    }
    return out
}

/** 扫描插件 diy 组件 */
function scanAddonDiyComponents(key) {
    const diyDir = path.join(ADDON_DIR, key, 'components', 'diy')
    const out = []
    if (!fs.existsSync(diyDir)) return out
    for (const name of fs.readdirSync(diyDir)) {
        const compDir = path.join(diyDir, name)
        if (!fs.statSync(compDir).isDirectory()) continue
        if (fs.existsSync(path.join(compDir, 'index.vue'))) {
            out.push(name)
        }
    }
    return out.sort()
}

module.exports = {
    ROOT,
    ADDON_DIR,
    PAGES_JSON,
    BUILD_DIR,
    BRIDGE_DIR,
    BRIDGE_ADDON_ROOT,
    BRIDGE_STUB_ROOT,
    listAddonKeys,
    walkFiles,
    parsePagesJson,
    scanSubPackagePages,
    scanAddonPages,
    scanAddonLocale,
    scanAddonDiyComponents,
    stripJsonComments
}
