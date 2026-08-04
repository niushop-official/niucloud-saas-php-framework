/**
 * Core / Addon 共用的「运行时 external」配置
 *
 * 生产构建时，vue / element-plus / @/lang 等不打进 bundle，
 * 由 index.html 的 Import Map 指向 /admin/assets/shared/*.js，
 * 保证全应用只有一份 Vue 实例与一套 i18n。
 */
const SHARED_PACKAGES = [
    'vue',
    'vue-router',
    'pinia',
    'element-plus',
    '@element-plus/icons-vue',
    'axios',
    'vue-i18n',
    'core-shared'
]

/** build-shared 按此顺序逐个 vite lib 构建（core-shared/admin-lang 最后） */
const SHARED_BUILD_ORDER = [
    'vue',
    'vue-router',
    'pinia',
    'element-plus',
    'icons-vue',
    'axios',
    'vue-i18n',
    'core-shared',
    'admin-lang'
]

/** build-shared 包名 -> npm 模块名 */
const PKG_TO_MODULE = {
    vue: 'vue',
    'vue-router': 'vue-router',
    pinia: 'pinia',
    'element-plus': 'element-plus',
    'icons-vue': '@element-plus/icons-vue',
    axios: 'axios',
    'vue-i18n': 'vue-i18n'
}

/** 全局 t() / language 的浏览器绝对路径（须与部署前缀 /admin 一致） */
const ADMIN_LANG_URL = '/admin/assets/shared/admin-lang.js'
const CORE_SHARED_URL = '/admin/assets/shared/core-shared.js'

/** 写入 index.html 的 importmap（assemble-admin 注入） */
const IMPORT_MAP = {
    vue: '/admin/assets/shared/vue.js',
    'vue-router': '/admin/assets/shared/vue-router.js',
    pinia: '/admin/assets/shared/pinia.js',
    'element-plus': '/admin/assets/shared/element-plus.js',
    'element-plus/es': '/admin/assets/shared/element-plus.js',
    'element-plus/dist/locale/zh-cn.mjs': '/admin/assets/shared/locale/zh-cn.mjs',
    'element-plus/dist/locale/en.mjs': '/admin/assets/shared/locale/en.mjs',
    '@element-plus/icons-vue': '/admin/assets/shared/icons-vue.js',
    axios: '/admin/assets/shared/axios.js',
    'vue-i18n': '/admin/assets/shared/vue-i18n.js',
    '@/lang': ADMIN_LANG_URL,
    '@/utils/common': CORE_SHARED_URL,
    '@/utils/request': CORE_SHARED_URL,
    '@/utils/storage': CORE_SHARED_URL,
    '@/utils/config': CORE_SHARED_URL,
    '@/utils/test': CORE_SHARED_URL,
    '@/utils/qqmap': CORE_SHARED_URL,
    '@/app/api/diy': CORE_SHARED_URL,
    '@/app/api/sys': CORE_SHARED_URL,
    '@/app/api/member': CORE_SHARED_URL,
    '@/app/api/site': CORE_SHARED_URL,
    '@/components/upload-image': CORE_SHARED_URL,
    '@/components/diy-page': CORE_SHARED_URL,
    '@/components/map-selector': CORE_SHARED_URL,
    '@/components/editor': CORE_SHARED_URL
}

/** SFC 组件映射：不在 external 中处理，直接打进插件 bundle */
const SFC_WRAPPERS = {}

/** 插件中 auto-import 的组件/模块，不 external，直接打进插件 */
const PACK_INTO_ADDON = new Set([
    'utils/config',       // export default → core-shared 的 export * 不会转发
    'utils/storage',      // export default → core-shared 的 export * 不会转发
    'utils/tianditu',     // 与 qqmap 同名导出冲突，由 addon 直接打包
    'utils/addon-loader', // core-shared build-shared.cjs 排除了此文件
    'utils/addon-lang'   // core-shared build-shared.cjs 排除了此文件
])

function isSfcBundleComponent(id) {
    const norm = id.replace(/\\/g, '/')
    for (const name of PACK_INTO_ADDON) {
        if (norm === `@/${name}` || norm.startsWith(`@/${name}/`)) return true
        if (norm.endsWith(`/${name}.ts`)) return true
    }
    return false
}

/** 所有需要 external 化并映射到 core-shared 的核心路径 */
const CORE_EXTERNAL_PATHS = Object.keys(IMPORT_MAP).filter(k => k.startsWith('@/'))

/** 是否将 @/lang 或 src/lang 标为 external（避免 addon/core 内嵌第二套 i18n） */
function isAdminLangExternal(id) {
    const norm = id.replace(/\\/g, '/')
    if (id === '@/lang' || id.startsWith('@/lang/')) return true
    if (norm.includes('/src/lang/')) return true
    return false
}

/** Rollup output.paths 中 @/lang 解析到的 URL */
function adminLangExternalPath() {
    return ADMIN_LANG_URL
}

/** 核心应用模块路径是否应 external（不打进 addon 包） */
function isCoreExternal(id) {
    // 先处理带 query 参数的情况（如 ?vue&type=script）
    const cleanId = id.split('?')[0]
    const norm = cleanId.replace(/\\/g, '/')
    // .vue 文件一律不 external（避免 default/named import 不匹配）
    if (/\.vue$/.test(norm) && (norm.includes('/src/') || norm.startsWith('@/'))) return false
    // @/components/ 下的组件一律不 external（unplugin-vue-components 解析的 import 可能不带 .vue 后缀）
    if (norm === '@/components' || norm.startsWith('@/components/')) return false
    // 已解析的 src/components/ 路径也一律不 external
    if (/\/src\/components\//.test(norm)) return false
    // utils/config 默认导出 → 不 external（core-shared 的 named export 不会转发 default）
    if (norm === '@/utils/config' || norm === '@/utils/config.ts' || norm.endsWith('/src/utils/config.ts')) return false
    // addon-loader / addon-lang 被 build-shared 排除，插件自行携带
    if (norm === '@/utils/addon-loader' || norm === '@/utils/addon-loader.ts' || norm.includes('/src/utils/addon-loader')) return false
    if (norm === '@/utils/addon-lang' || norm === '@/utils/addon-lang.ts' || norm.includes('/src/utils/addon-lang')) return false
    if (isSfcBundleComponent(norm)) return false
    // 直接匹配 @/ 别名形式（Vite resolveId 前的 source）
    if (CORE_EXTERNAL_PATHS.some(p => norm === p || norm.startsWith(p + '/'))) return true
    // 匹配已解析的文件路径（如 /path/src/utils/common.ts）
    if (norm.includes('/src/') && !norm.includes('/src/addon/')) {
        return /\/src\/(utils|app)\//.test(norm)
    }
    return false
}

/** core external 路径统一映射到 core-shared.js */
function coreExternalPath() {
    return CORE_SHARED_URL
}

/**
 * 是否将依赖标为 external（不打进当前 chunk）
 * element-plus 的 locale / theme-chalk 除外，仍由各自包处理
 */
function isSharedExternal(id) {
    const norm = id.replace(/\\/g, '/')
    if (norm.includes('/style/css') || norm.includes('/style/index')) return false
    if (norm.includes('element-plus/dist/')) return false
    if (norm.includes('element-plus/theme-chalk')) return false
    if (SHARED_PACKAGES.includes(id)) return true
    if (SHARED_PACKAGES.some((p) => id === p || id.startsWith(p + '/'))) return true
    if (!norm.includes('node_modules/')) return false
    return SHARED_PACKAGES.some((p) => {
        return norm.includes(`/node_modules/${p}/`) || norm.endsWith(`/node_modules/${p}`)
    })
}

/** 构建 shared 单包时，不把「自身」再 external 掉 */
function isSelfSharedPackage(id, pkgKey) {
    const mod = PKG_TO_MODULE[pkgKey]
    if (!mod) return false
    if (id === mod || id.startsWith(mod + '/')) return true
    const norm = id.replace(/\\/g, '/')
    return norm.includes(`/node_modules/${mod}/`) || norm.endsWith(`/node_modules/${mod}`)
}

/** vite.config.shared.ts 用：external 除当前正在打的包以外的 shared 依赖 */
function sharedExternalForBuild(pkgKey) {
    return (id) => isSharedExternal(id) && !isSelfSharedPackage(id, pkgKey)
}

module.exports = {
    SHARED_PACKAGES,
    SHARED_BUILD_ORDER,
    PKG_TO_MODULE,
    IMPORT_MAP,
    ADMIN_LANG_URL,
    CORE_SHARED_URL,
    SFC_WRAPPERS,
    isSfcBundleComponent,
    isSharedExternal,
    isAdminLangExternal,
    adminLangExternalPath,
    isCoreExternal,
    coreExternalPath,
    isSelfSharedPackage,
    sharedExternalForBuild
}
