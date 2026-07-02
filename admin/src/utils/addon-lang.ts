/**
 * 插件语言与 manifest 初始化（供 core shared admin-lang 与 addon-loader 共用）
 */

export interface AddonManifest {
    key: string
    version?: string
    sharedVersion?: string
    views?: Record<string, string>
    components?: Record<string, string>
    layout?: string
    langBase?: string
}

let prodManifests: Record<string, AddonManifest> = {}
let installedAddonKeys: string[] = []
let prodReady = false
let prodInitPromise: Promise<void> | null = null
const addonModuleCache: Record<string, Promise<Record<string, unknown> | null>> = {}

const ADMIN_PREFIX = '/admin'

export function adminUrl(relative: string) {
    if (!relative) return relative
    if (relative.startsWith('http') || relative.startsWith('/admin/')) return relative
    if (relative.startsWith('/assets/')) return `${ADMIN_PREFIX}${relative}`
    if (relative.startsWith('./')) return `${ADMIN_PREFIX}/assets/addons/${relative.slice(2)}`
    return `${ADMIN_PREFIX}/${relative.replace(/^\//, '')}`
}

function addonAssetUrl(addon: string, ...segments: string[]) {
    const rel = ['assets', 'addons', addon, ...segments].join('/').replace(/\/+/g, '/')
    return `${ADMIN_PREFIX}/${rel}`
}

export function resolveLangFile(app: string, path: string): string {
    if (path === '/') return 'index'
    let view = path.replace(/^(\/admin\/|\/site\/|\/)/, '').replace(/\.vue$/, '')
    if (view.startsWith('views/')) view = view.slice('views/'.length)
    if (app) {
        if (view.startsWith(`${app}/`)) view = view.slice(app.length + 1)
        else if (view === app) view = 'index'
    }
    return view.replaceAll('/', '.')
}

export function resolveRouteAddon(route: { meta: Record<string, unknown>; matched: Array<{ meta: Record<string, unknown> }> }): string {
    if (route.meta.addon) return String(route.meta.addon)
    for (let i = route.matched.length - 1; i >= 0; i--) {
        const addon = route.matched[i].meta.addon
        if (addon) return String(addon)
    }
    return ''
}

export function resolveRouteView(route: { meta: Record<string, unknown>; matched: Array<{ meta: Record<string, unknown> }>; path: string }): string {
    if (route.meta.view) return String(route.meta.view)
    for (let i = route.matched.length - 1; i >= 0; i--) {
        const view = route.matched[i].meta.view
        if (view) return String(view)
    }
    return route.path
}

function unwrapLangPack(pack: unknown): Record<string, string> {
    if (!pack || typeof pack !== 'object') return {}
    const obj = pack as Record<string, unknown>
    if (obj.default && typeof obj.default === 'object') {
        return unwrapLangPack(obj.default)
    }
    const result: Record<string, string> = {}
    for (const [key, value] of Object.entries(obj)) {
        if (key === 'default' || key === '__esModule') continue
        if (typeof value === 'string') result[key] = value
    }
    return Object.keys(result).length ? result : (obj as Record<string, string>)
}

function flattenLangPack(file: string, pack: Record<string, string>): Record<string, string> {
    const data: Record<string, string> = {}
    for (const [key, value] of Object.entries(pack)) {
        if (typeof value !== 'string') continue
        data[`${file}.${key}`] = value
        if (file === 'common') data[key] = value
    }
    return data
}

export function inferAddonFromPath(path: string, knownAddons?: string[]): string {
    const view = path.replace(/^(\/admin\/|\/site\/|\/)/, '')
    const first = view.split('/').filter(Boolean)[0]
    if (!first) return ''
    const keys = knownAddons?.length ? knownAddons : getInstalledAddonKeys()
    return keys.includes(first) ? first : ''
}

async function isAddonEntryAvailable(key: string): Promise<boolean> {
    try {
        const res = await fetch(adminUrl(`/assets/addons/${key}/index.js`), { method: 'HEAD' })
        if (!res.ok) return false
        const ct = (res.headers.get('content-type') || '').toLowerCase()
        return !ct.includes('text/html')
    } catch {
        return false
    }
}

export function isAddonInstalled(addon: string): boolean {
    return !!addon && getInstalledAddonKeys().includes(addon)
}

export async function loadAddonModule(addon: string): Promise<Record<string, unknown> | null> {
    if (!(addon in addonModuleCache)) {
        addonModuleCache[addon] = (async () => {
            try {
                const url = adminUrl(`/assets/addons/${addon}/index.js`)
                return await import(/* @vite-ignore */ url) as Record<string, unknown>
            } catch {
                return null
            }
        })()
    }
    return addonModuleCache[addon]
}

/** 清除插件模块缓存（布局切换时调用，确保样式重新注入） */
export function clearAddonModuleCache() {
    for (const key of Object.keys(addonModuleCache)) {
        delete addonModuleCache[key]
    }
}

export function isAddonProdReady() {
    return prodReady
}

export async function ensureAddonProdReady() {
    if (!prodReady) await initAddonManifests()
}

export async function initAddonManifests(keys?: string[]) {
    if (import.meta.env.DEV) {
        prodReady = true
        return
    }
    if (prodInitPromise) return prodInitPromise

    prodInitPromise = (async () => {
        prodManifests = {}
        installedAddonKeys = []
        let addonKeys = keys
        if (!addonKeys?.length) {
            try {
                const indexUrl = adminUrl('/assets/addons/index.json')
                const res = await fetch(indexUrl)
                if (res.ok) {
                    const data = await res.json()
                    addonKeys = Array.isArray(data.keys) ? data.keys : []
                    // 读取合并后的 manifests（PHP 端已打包进 index.json），避免 N 次 manifest.json 请求
                    const bundled = data.manifests as Record<string, AddonManifest> | undefined
                    if (bundled) {
                        for (const [k, m] of Object.entries(bundled)) {
                            prodManifests[k] = m
                        }
                    }
                }
            } catch {
                addonKeys = []
            }
        }
        const verifiedKeys: string[] = []
        for (const key of addonKeys || []) {
            // 如果 manifest 已从 index.json 获取，直接验证
            if (prodManifests[key]) {
                if (await isAddonEntryAvailable(key)) {
                    verifiedKeys.push(key)
                } else {
                    delete prodManifests[key]
                }
                continue
            }
            // 兼容旧版：单独请求 manifest.json
            if (!(await isAddonEntryAvailable(key))) continue
            verifiedKeys.push(key)
            try {
                const url = adminUrl(`/assets/addons/${key}/manifest.json`)
                const res = await fetch(url)
                if (res.ok) {
                    prodManifests[key] = await res.json()
                }
            } catch {
                // skip missing manifest
            }
        }
        installedAddonKeys = verifiedKeys
        prodReady = true
    })()

    return prodInitPromise
}

export function getInstalledAddonKeys(): string[] {
    if (installedAddonKeys.length) return installedAddonKeys
    return Object.keys(prodManifests)
}

export function getProdManifests(): Record<string, AddonManifest> {
    return prodManifests
}

export async function preloadAllAddonLangs(
    merge: (locale: string, messages: Record<string, string>) => void
) {
    if (import.meta.env.DEV) return
    if (!prodReady) await initAddonManifests()

    for (const addon of getInstalledAddonKeys()) {
        try {
            const mod = await loadAddonModule(addon)
            if (!mod) continue
            const langs = mod.langs as Record<string, Record<string, unknown>> | undefined
            if (!langs) continue
            for (const [locale, files] of Object.entries(langs)) {
                const merged: Record<string, string> = {}
                for (const [file, pack] of Object.entries(files || {})) {
                    Object.assign(merged, flattenLangPack(file, unwrapLangPack(pack)))
                }
                if (Object.keys(merged).length) merge(locale, merged)
            }
        } catch {
            // skip broken addon module
        }
    }
}

export function registerAddonManifest(manifest: AddonManifest) {
    prodManifests[manifest.key] = manifest
    prodReady = true
}

export async function loadAddonLang(addon: string, locale: string, file: string): Promise<Record<string, string>> {
    if (import.meta.env.DEV) {
        try {
            const messages = await import(/* @vite-ignore */ `@/addon/${addon}/lang/${locale}/${file}.json`)
            return messages.default || {}
        } catch {
            return {}
        }
    }
    if (!prodReady) await initAddonManifests()

    try {
        const mod = await loadAddonModule(addon)
        if (mod) {
            const langs = mod.langs as Record<string, Record<string, Record<string, unknown>>> | undefined
            const pack = langs?.[locale]?.[file]
            const messages = unwrapLangPack(pack)
            if (Object.keys(messages).length) return messages
        }
    } catch {
        // fallback to static lang files
    }

    const url = addonAssetUrl(addon, 'lang', locale, `${file}.json`)
    try {
        const res = await fetch(url)
        if (res.ok) return await res.json()
    } catch {
        // ignore
    }
    return {}
}
