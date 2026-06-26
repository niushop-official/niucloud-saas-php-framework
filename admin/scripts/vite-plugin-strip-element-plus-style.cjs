/**
 * Vite 插件：构建期剥离 element-plus 按需 style/css import
 *
 * 背景：
 * - 全局样式已在 src/styles/index.scss 引入 element-plus
 * - Core/Addon external element-plus 后，残留的 style/css side-effect import
 *   会进入 chunk 且浏览器无法通过 importmap 解析，导致运行时报错
 *
 * 用于 vite.config.core.ts / vite.config.addon.ts
 */
const STYLE_IMPORT_RE = /import\s*["']element-plus[^"']*["'];?/g

function isElementPlusStyleImport(source) {
    const norm = source.replace(/\\/g, '/')
    if (!norm.includes('element-plus')) return false
    // 匹配 style/css、style/index、theme-chalk、dist/{comp}/style 等
    if (/\/style\/(css|index)(\.mjs|\.js)?$/i.test(norm)) return true
    if (/\/theme-chalk\//i.test(norm)) return true
    if (/\/dist\/[^/]+\/style\//i.test(norm)) return true
    return false
}

function stripElementPlusStylePlugin() {
    const EMPTY_ID = '\0element-plus-empty-style'
    return {
        name: 'strip-element-plus-style',
        enforce: 'pre',
        // resolve 阶段将 style import 指向空模块
        resolveId(source) {
            if (isElementPlusStyleImport(source)) return EMPTY_ID
            return null
        },
        load(id) {
            if (id === EMPTY_ID) return 'export {}'
            return null
        },
        // generateBundle 再扫一遍 chunk 文本，删除遗漏的 import 语句
        generateBundle(_, bundle) {
            for (const item of Object.values(bundle)) {
                if (item.type !== 'chunk') continue
                item.code = item.code.replace(STYLE_IMPORT_RE, '')
            }
        }
    }
}

module.exports = { stripElementPlusStylePlugin, isElementPlusStyleImport }
