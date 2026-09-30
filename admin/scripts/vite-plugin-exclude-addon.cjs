/**
 * 统一排除插件源码的 Vite 插件（core / addon 构建共用）
 *
 * 背景：
 *   插件加载大量使用 import.meta.glob('@/addon/**') / ('../addon/**')，
 *   部分页面甚至用 import.meta.glob('@/**') 扫描整个 src。
 *   vite:import-glob 会在编译期把 glob 展开成一组真实的 import 语句，其说明符
 *   可能是相对路径（../addon/shop/views/x.vue）或 root 相对路径（/src/addon/...），
 *   仅按 '@/' 前缀做文本匹配无法拦截，于是插件源码被打进了不该出现的产物：
 *     - build:core  → dist/assets 里出现插件的 .vue / .css / 图片
 *     - build:addon → 单个插件包里混入其他全部插件的源码与整个 core 的副本
 *     （参考 scripts/generate-addon-entry.cjs 中关于「数百个核心 .vue 打进插件包」的说明）
 *
 * 两层处理：
 *   1) transform（pre，早于 vite:import-glob）：把「全量扫描 src」的 glob 收窄成
 *      「自身插件 + 白名单 core 目录」，使 glob 既不会展开出其他插件/core 的代码，
 *      也不会残留取不到内容的 key（取值不到的 key 只会让业务走 delete 分支，安全降级）。
 *   2) resolveId：把 source 结合 importer 解析成绝对路径后判定，命中则返回空模块。
 *      静态 import 与 glob 展开出的 import 在此被同等处理。
 *
 * @param {object} options
 * @param {'core'|'addon'} options.mode     core=排除全部插件；addon=排除自身以外的插件
 * @param {string} [options.addonKey]       addon 模式下正在构建的插件 key（自身保留）
 * @param {string} options.root             项目根目录（admin/）
 * @param {boolean} [options.allowMetaJson] core 模式下是否放行插件的语言包与布局注册 json
 * @param {string[]} [options.coreGlobAllow] addon 模式下全量 glob 收窄时保留的 core 目录
 */
const path = require('path')

const VIRTUAL_PREFIX = '\0addon-external:'
const VIRTUAL_JSON_SUFFIX = '|json'

/** 插件语言包 json */
const ADDON_LANG_JSON_RE = /\/src\/addon\/[^/]+\/lang\/.+\.json$/
/** 插件向系统注册的布局选项，core 需要它才能列出可切换布局 */
const ADDON_LAYOUT_JSON_RE = /\/src\/addon\/[^/]+\/layout\/layout\.json$/
/**
 * src/lang/i18n.ts 用 globEager 把插件 common.json 合并进主字典：
 * eager 是内联进主 bundle，不会产生独立 chunk 文件，保留它没有产物代价。
 * 而 src/utils/addon-lang.ts / addon_panel 用的是 lazy 或全量 glob，会为每个
 * json 生成独立 chunk（dist/assets 下的 _giftcard.edit-xxx.js 之类），必须排除。
 * 排除后语言包仍可用：loadAddonLang 依次回退到插件产物内联 langs、
 * 以及 /admin/assets/addons/{key}/lang/ 静态资源（assemble 的 copyLang 会拷贝）。
 */
const I18N_ENTRY_RE = /\/src\/lang\/i18n\.[jt]s$/

/** 全量扫描 src 的 glob pattern（会命中所有插件 + 整个 core） */
const FULL_SCAN_PATTERN_RE = /^(\*\*\/|@\/\*\*|\.\.\/\*\*|\.\/\*\*|\/\*\*)/

/** addon 模式下，全量 glob 收窄后仍保留的 core 目录（后端下发的详情展示组件所在处） */
const DEFAULT_CORE_GLOB_ALLOW = ['/src/app/views/diy_form/components/*.vue']

function toPosix(p) {
    return p.replace(/\\/g, '/')
}

/** 把 import 说明符解析为绝对路径，无法解析（裸模块名）时返回 null */
function resolveAbsolute(source, importer, root) {
    const clean = source.split('?')[0].split('#')[0]
    if (!clean || clean.startsWith('\0')) return null

    if (clean.startsWith('@/')) return path.join(root, 'src', clean.slice(2))
    if (clean.startsWith('./') || clean.startsWith('../')) {
        if (!importer) return null
        const importerPath = importer.split('?')[0]
        if (!importerPath || importerPath.startsWith('\0')) return null
        return path.resolve(path.dirname(importerPath), clean)
    }
    // vite root 相对路径（/src/...）
    if (clean.startsWith('/')) return path.join(root, clean.slice(1))
    if (path.isAbsolute(clean)) return clean
    return null
}

/** 被排除模块的内容：json 给空对象，组件给渲染 null 的合法组件（避免 Vue 报缺少 render） */
function emptyModuleCode(isJson) {
    return isJson ? 'export default {}' : 'export default { render() { return null } }'
}

/**
 * core（框架）源码目录：命中它们的 glob 会把整个框架打进插件包。
 * 注意末尾用 (\/|$)：path.resolve('../app/') 返回的路径不带尾部斜杠。
 */
const CORE_SRC_DIR_RE = /\/src\/(app|components|layout)(\/|$)/

/** glob pattern 是否命中 core 目录（取首个 * 之前的目录前缀解析后判定） */
function isCoreGlobPattern(pattern, importer, root) {
    const prefix = pattern.split('*')[0]
    if (!prefix) return false
    const abs = resolveAbsolute(prefix, importer, root)
    if (!abs) return false
    return CORE_SRC_DIR_RE.test(toPosix(abs))
}

function replaceGlob(eager, patterns, rest) {
    const list = patterns.map((p) => JSON.stringify(p)).join(', ')
    return `import.meta.glob${eager || ''}([${list}]${rest})`
}

function createExcludeAddonPlugin(options) {
    const {
        mode,
        addonKey = '',
        root,
        allowMetaJson = false,
        coreGlobAllow = DEFAULT_CORE_GLOB_ALLOW
    } = options

    return {
        name: 'exclude-addon-source',
        enforce: 'pre',

        // 早于 vite:import-glob：收窄全量 glob，避免展开出其他插件 / core 副本
        transform(code, id) {
            if (mode !== 'addon' || !addonKey) return null
            if (!code.includes('import.meta.glob')) return null

            const replaced = code.replace(
                /import\.meta\.glob(Eager)?\s*\(\s*([\s\S]*?)\)/g,
                (full, eager, args) => {
                    const matched = args.match(/^(['"])([^'"]*)\1([\s\S]*)$/)
                    if (!matched) return full
                    const pattern = matched[2]
                    const rest = matched[3] || ''

                    // 命中 core 目录：典型是 src/utils/addon-loader 的 coreVueModules
                    // （../app/**、../components/**、../layout/**）。addon-loader 会被打进插件包，
                    // 这些 glob 展开后把整个框架的 vue 都变成插件 chunk（cash_out.vue 之类），
                    // 因此收窄为白名单；插件对 core 组件的静态 import 不受影响。
                    if (isCoreGlobPattern(pattern, id, root)) {
                        return replaceGlob(eager, coreGlobAllow, rest)
                    }

                    if (!FULL_SCAN_PATTERN_RE.test(pattern)) return full

                    const extMatched = pattern.match(/\*\.[A-Za-z0-9]+$/)
                    const ext = extMatched ? extMatched[0] : '*'
                    const patterns = [`/src/addon/${addonKey}/views/**/${ext}`, ...coreGlobAllow]
                    return replaceGlob(eager, patterns, rest)
                }
            )

            if (replaced === code) return null
            return { code: replaced, map: null }
        },

        resolveId(source, importer) {
            if (!source || source.includes('*')) return null

            const importerNorm = importer ? toPosix(importer.split('?')[0]) : ''
            const importerAddon = importerNorm.match(/\/src\/addon\/([^/]+)\//)
            // 插件源码内部的互相引用：仅放行「自身插件」（addon 模式）
            if (importerAddon && mode === 'addon' && importerAddon[1] === addonKey) return null

            const abs = resolveAbsolute(source, importer, root)
            if (!abs) return null
            const norm = toPosix(abs)

            const matched = norm.match(/\/src\/addon\/([^/]+)\//)
            if (!matched) return null

            const key = matched[1]
            // addon 模式：正在构建的插件自身保留
            if (mode === 'addon' && key === addonKey) return null
            // core 模式：仅放行布局注册 json 与 i18n.ts 内联的 common 语言包
            if (mode === 'core' && allowMetaJson) {
                if (ADDON_LAYOUT_JSON_RE.test(norm)) return null
                if (ADDON_LANG_JSON_RE.test(norm) && I18N_ENTRY_RE.test(importerNorm)) return null
            }

            // 所有被排除模块共用一个虚拟 id：
            // 若按原路径生成唯一 id，rollup 会为每个插件文件单独产出一个空 chunk
            //（dist/assets 下就会出现 giftcard-xxx.js 这类只有 export default {} 的文件），
            // 共用 id 后最多只产出 json / 非 json 两个空模块，不会污染产物目录。
            const isJson = /\.json$/i.test(norm)
            return VIRTUAL_PREFIX + 'empty' + (isJson ? VIRTUAL_JSON_SUFFIX : '')
        },

        load(id) {
            if (!id.startsWith(VIRTUAL_PREFIX)) return null
            return {
                code: emptyModuleCode(id.endsWith(VIRTUAL_JSON_SUFFIX)),
                moduleSideEffects: false,
                map: null
            }
        }
    }
}

module.exports = { createExcludeAddonPlugin, VIRTUAL_PREFIX }
