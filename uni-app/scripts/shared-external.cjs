/**
 * Core / Addon H5 共用的运行时 external 配置
 * 部署前缀 /wap/，与 publish.cjs 中 router base 一致
 */
const SHARED_PACKAGES = [
    'vue',
    'pinia',
    'vue-i18n'
]

const SHARED_BUILD_ORDER = [
    'vue',
    'pinia',
    'vue-i18n',
    'wap-locale',
    'diy-core'
]

/** 装修 DIY 单例：避免 addon 再打一份 defineStore('diy') 覆盖 Core */
const DIY_CORE_URL = '/wap/assets/shared/diy-core.js'

const DIY_CORE_MODULES = [
    '@/app/stores/diy',
    '@/utils/diy-decorate-bridge',
    '@/hooks/useDiy',
    '@/hooks/useDiyGroup'
]

const PKG_TO_MODULE = {
    vue: 'vue',
    pinia: 'pinia',
    'vue-i18n': 'vue-i18n'
}

const WAP_LOCALE_URL = '/wap/assets/shared/wap-locale.js'

const IMPORT_MAP = {
    vue: '/wap/assets/shared/vue.js',
    pinia: '/wap/assets/shared/pinia.js',
    'vue-i18n': '/wap/assets/shared/vue-i18n.js',
    '@/locale': WAP_LOCALE_URL,
    '@/app/stores/diy': DIY_CORE_URL,
    '@/utils/diy-decorate-bridge': DIY_CORE_URL,
    '@/hooks/useDiy': DIY_CORE_URL,
    '@/hooks/useDiyGroup': DIY_CORE_URL
}

function isDiyCoreExternal(id) {
    const norm = id.replace(/\\/g, '/')
    if (id === DIY_CORE_URL) return true
    if (DIY_CORE_MODULES.includes(id)) return true
    if (norm.endsWith('/src/app/stores/diy.ts') || norm.endsWith('/src/app/stores/diy.js')) return true
    if (norm.endsWith('/src/utils/diy-decorate-bridge.ts')) return true
    if (norm.endsWith('/src/hooks/useDiy.ts')) return true
    if (norm.endsWith('/src/hooks/useDiyGroup.ts')) return true
    return false
}

function diyCoreExternalPath() {
    return DIY_CORE_URL
}

function isWapLocaleExternal(id) {
    const norm = id.replace(/\\/g, '/')
    if (id === WAP_LOCALE_URL) return true
    if (id === '@/locale' || id.startsWith('@/locale/')) return true
    // 含 index.ts / i18n.ts 等，统一走 shared/wap-locale.js 单例
    if (norm.includes('/src/locale/') && !norm.includes('/src/locale/wap-shared-export')) return true
    // main.js 相对引用 ./locale
    if (norm.endsWith('/locale/index.ts') || norm.endsWith('/locale/index.js')) return true
    return false
}

function wapLocaleExternalPath() {
    return WAP_LOCALE_URL
}

function isSharedExternal(id) {
    const norm = id.replace(/\\/g, '/')
    if (SHARED_PACKAGES.includes(id)) return true
    if (SHARED_PACKAGES.some((p) => id === p || id.startsWith(p + '/'))) return true
    if (!norm.includes('node_modules/')) return false
    return SHARED_PACKAGES.some((p) => {
        return norm.includes(`/node_modules/${p}/`) || norm.endsWith(`/node_modules/${p}`)
    })
}

function isSelfSharedPackage(id, pkgKey) {
    const mod = PKG_TO_MODULE[pkgKey]
    if (!mod) return false
    if (id === mod || id.startsWith(mod + '/')) return true
    const norm = id.replace(/\\/g, '/')
    return norm.includes(`/node_modules/${mod}/`) || norm.endsWith(`/node_modules/${mod}`)
}

function sharedExternalForBuild(pkgKey) {
    return (id) => isSharedExternal(id) && !isSelfSharedPackage(id, pkgKey)
}

/** diy-core 共享包构建：external vue/pinia/vue-i18n，其余（含 @dcloudio/uni-app）打进 diy-core.js */
function diyCoreExternalForBuild() {
    return (id) => isSharedExternal(id)
}

module.exports = {
    SHARED_PACKAGES,
    SHARED_BUILD_ORDER,
    PKG_TO_MODULE,
    IMPORT_MAP,
    WAP_LOCALE_URL,
    DIY_CORE_URL,
    DIY_CORE_MODULES,
    isSharedExternal,
    isWapLocaleExternal,
    isDiyCoreExternal,
    wapLocaleExternalPath,
    diyCoreExternalPath,
    isSelfSharedPackage,
    sharedExternalForBuild,
    diyCoreExternalForBuild
}
