/**
 * 插件构建公共工具
 * - 扫描 src/addon 下目录、视图、语言包
 * - 供 generate-addon-entry / build-all / assemble 等脚本复用
 */
const fs = require('fs')
const path = require('path')

/** 项目根目录（admin/） */
const ROOT = path.resolve(__dirname, '..')
/** 插件源码根目录 */
const ADDON_DIR = path.join(ROOT, 'src', 'addon')

/** 列出 src/addon 下所有插件 key（目录名） */
function listAddonKeys() {
    if (!fs.existsSync(ADDON_DIR)) return []
    return fs.readdirSync(ADDON_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .sort()
}

/** 递归遍历目录，收集满足 filter 的文件相对路径 */
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

/**
 * 扫描插件 views 目录，返回视图路径列表（不含 .vue）
 * 例：order/list、goods/category
 */
function scanAddonViews(key) {
    const viewsDir = path.join(ADDON_DIR, key, 'views')
    return walkFiles(viewsDir, (f) => f.endsWith('.vue'), viewsDir)
        .map((p) => p.replace(/\.vue$/, ''))
}

/**
 * 扫描插件 lang 目录
 * @returns {Record<string, string[]>} locale -> json 文件名（不含 .json）
 * 例：{ 'zh-cn': ['common', 'order.list'], 'en': ['common'] }
 */
function scanAddonLang(key) {
    const langDir = path.join(ADDON_DIR, key, 'lang')
    const out = {}
    if (!fs.existsSync(langDir)) return out
    for (const locale of fs.readdirSync(langDir)) {
        const localeDir = path.join(langDir, locale)
        if (!fs.statSync(localeDir).isDirectory()) continue
        out[locale] = fs.readdirSync(localeDir)
            .filter((f) => f.endsWith('.json'))
            .map((f) => f.replace(/\.json$/, ''))
            .sort()
    }
    return out
}

module.exports = { ROOT, ADDON_DIR, listAddonKeys, walkFiles, scanAddonViews, scanAddonLang }
