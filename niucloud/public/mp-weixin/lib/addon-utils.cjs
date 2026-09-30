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
        .replace(/^(\s*)\/\/.*$/gm, '$1')   // 移除行首注释（保留缩进）
        .replace(/^(\s*),\s*$/gm, '$1')     // 移除孤立逗号行（保留缩进）
        .replace(/,\s*\/\/.*$/gm, ',')      // 移除行内注释 "val", // comment → "val",
        .replace(/,\s*([}\]])/g, '$1')      // 移除尾部逗号
        .replace(/,\s*,/g, ',')             // 合并连续逗号
}

function parsePagesJson() {
    const raw = stripJsonComments(fs.readFileSync(PAGES_JSON, 'utf-8'))
    return JSON.parse(raw)
}

/**
 * 基于 pages.json 中的 // {KEY}_PAGE_BEGIN ... // {KEY}_PAGE_END 注释区块，
 * 以「注释声明」作为插件分包归属的权威来源（而非 root 命名），通用且无需写死。
 *
 * 实现：
 * 1. 按行扫描原始文本，记录每个 KEY 对应的 BEGIN/END 行号区间；
 * 2. 解析 JSON（保留 root 的所在行号），将每个 addon 分包 root 映射到所属 KEY。
 *
 * @returns {{ [key: string]: string[] }} key -> 该插件区块内所有 addon 分包 root
 */
function parseAddonBoundaries() {
    if (!fs.existsSync(PAGES_JSON)) return {}
    const lines = fs.readFileSync(PAGES_JSON, 'utf-8').split(/\r?\n/)

    // 1. 收集每个 KEY 的 BEGIN/END 行号
    const ranges = {} // key -> { begin, end }
    const beginRe = /^\s*\/\/\s*([A-Z0-9_]+)_PAGE_BEGIN\s*$/
    const endRe = /^\s*\/\/\s*([A-Z0-9_]+)_PAGE_END\s*$/
    lines.forEach((line, idx) => {
        const lb = line.match(beginRe)
        if (lb) {
            ranges[lb[1]] = { begin: idx, end: -1 }
            return
        }
        const le = line.match(endRe)
        if (le) {
            if (!ranges[le[1]]) ranges[le[1]] = { begin: -1, end: idx }
            else ranges[le[1]].end = idx
        }
    })

    // 2. 解析分包 root 并定位行号
    const core = parsePagesJson()
    const result = {}
    const subs = core.subPackages || []
    subs.forEach((sub) => {
        const root = sub.root
        if (!root || !root.startsWith('addon/')) return
        // 通过文本定位该 root 所在行
        let rootLine = -1
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(`"root"`) && lines[i].includes(root)) {
                rootLine = i
                break
            }
        }
        if (rootLine < 0) return
        // 3. 判断落在哪个 KEY 区间
        let matchedKey = null
        for (const key of Object.keys(ranges)) {
            const r = ranges[key]
            if (r.begin >= 0 && r.end >= 0 && rootLine > r.begin && rootLine < r.end) {
                matchedKey = key
                break
            }
        }
        if (!matchedKey) return
        const normalizedKey = matchedKey.toLowerCase()
        if (!result[normalizedKey]) result[normalizedKey] = []
        if (!result[normalizedKey].includes(root)) result[normalizedKey].push(root)
    })

    for (const key of Object.keys(result)) result[key].sort()
    return result
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

/** 从 pages.json 解析插件分包页面（addonKey 以 // {KEY}_PAGE_BEGIN 注释区块为准） */
function scanSubPackagePages() {
    const pagesJson = parsePagesJson()
    const boundaries = parseAddonBoundaries()
    // root -> key 反查，便于 O(1) 命中
    const rootToKey = {}
    for (const key of Object.keys(boundaries)) {
        for (const root of boundaries[key]) rootToKey[root] = key
    }
    const rows = []
    for (const sub of pagesJson.subPackages || []) {
        const root = sub.root
        if (!root || !root.startsWith('addon/')) continue
        // 优先用注释区块归属；无匹配则回退到 root 第二段（兼容非注释区块场景）
        const addonKey = rootToKey[root] || root.split('/')[1]
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
    parseAddonBoundaries,
    scanSubPackagePages,
    scanAddonPages,
    scanAddonLocale,
    scanAddonDiyComponents,
    stripJsonComments,
    resolveAddonEntry
}

/** 解析 addon 入口文件名：默认 index.js；启用内容哈希后为 index-[hash].js */
function resolveAddonEntry(addonDir) {
    // 入口文件名来自构建期写入的 manifest.json（generateBundle 按 chunk.isEntry 精确记录 entry 字段），
    // 直接读取即可，无需扫描目录：shop 等大插件的懒加载 chunk（components/xxx/index.vue）
    // basename 也叫 index，目录里会同时存在多个 index-[hash].js，扫描文件名无法区分入口。
    // 兼容未生成 manifest.json 的旧产物（入口固定为 index.js）
    try {
        const m = JSON.parse(fs.readFileSync(path.join(addonDir, 'manifest.json'), 'utf-8'))
        if (m && typeof m.entry === 'string' && m.entry) {
            return './' + m.entry.replace(/\\/g, '/')
        }
    } catch { /* 无 manifest.json（旧构建）：入口固定为 index.js */ }
    return './index.js'
}
