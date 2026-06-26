/**
 * H5 分构建：已加载的 addon 包注册表（避免 diy-group bridge 重复 import index.js）
 */
type AddonModuleExports = Record<string, unknown>

type GlobalWithAddonModules = typeof globalThis & {
    __WAP_ADDON_MODULES__?: Record<string, AddonModuleExports>
}

const moduleCache: Record<string, AddonModuleExports> = {}

export function registerAddonModule(addonKey: string, mod: AddonModuleExports) {
    if (!addonKey || !mod) return
    moduleCache[addonKey] = mod
    const g = globalThis as GlobalWithAddonModules
    if (!g.__WAP_ADDON_MODULES__) g.__WAP_ADDON_MODULES__ = {}
    g.__WAP_ADDON_MODULES__[addonKey] = mod
}

export function getRegisteredAddonModule(addonKey: string): AddonModuleExports | null {
    if (!addonKey) return null
    if (moduleCache[addonKey]) return moduleCache[addonKey]
    const g = globalThis as GlobalWithAddonModules
    return g.__WAP_ADDON_MODULES__?.[addonKey] ?? null
}
