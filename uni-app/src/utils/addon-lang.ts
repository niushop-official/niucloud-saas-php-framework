/**
 * 插件 manifest 与语言包（H5 分构建生产环境）
 */

export interface AddonManifest {
    key: string
    version?: string
    sharedVersion?: string
    entry?: string
    localeBase?: string
}

type GlobalWapRuntime = typeof globalThis & {
    __WAP_ADDON_MANIFESTS__?: Record<string, AddonManifest>
    __WAP_INSTALLED_ADDONS__?: string[]
    __WAP_ADDON_PROD_READY__?: boolean
    __WAP_ADDON_INIT_PROMISE__?: Promise<void> | null
    __WAP_ADDON_MODULE_CACHE__?: Record<string, Promise<Record<string, unknown> | null>>
    __WAP_ADDON_ENTRY_PROBE__?: Record<string, Promise<boolean>>
}

const WAP_PREFIX = '/wap'

import { getRegisteredAddonModule } from '@/utils/addon-module-registry'
import { getActiveAddonPageRoute } from '@/utils/addon-page-route'

function wapRuntime(): GlobalWapRuntime {
    return globalThis as GlobalWapRuntime
}

function getProdManifests(): Record<string, AddonManifest> {
    const g = wapRuntime()
    if (!g.__WAP_ADDON_MANIFESTS__) g.__WAP_ADDON_MANIFESTS__ = {}
    return g.__WAP_ADDON_MANIFESTS__
}

function getInstalledKeysStore(): string[] {
    const g = wapRuntime()
    if (!g.__WAP_INSTALLED_ADDONS__) g.__WAP_INSTALLED_ADDONS__ = []
    return g.__WAP_INSTALLED_ADDONS__
}

function isProdReady(): boolean {
    return !!wapRuntime().__WAP_ADDON_PROD_READY__
}

function setProdReady(value: boolean) {
    wapRuntime().__WAP_ADDON_PROD_READY__ = value
}

function getProdInitPromise(): Promise<void> | null {
    return wapRuntime().__WAP_ADDON_INIT_PROMISE__ ?? null
}

function setProdInitPromise(promise: Promise<void> | null) {
    wapRuntime().__WAP_ADDON_INIT_PROMISE__ = promise
}

function getAddonModuleCache(): Record<string, Promise<Record<string, unknown> | null>> {
    const g = wapRuntime()
    if (!g.__WAP_ADDON_MODULE_CACHE__) g.__WAP_ADDON_MODULE_CACHE__ = {}
    return g.__WAP_ADDON_MODULE_CACHE__
}

function getAddonEntryProbeCache(): Record<string, Promise<boolean>> {
    const g = wapRuntime()
    if (!g.__WAP_ADDON_ENTRY_PROBE__) g.__WAP_ADDON_ENTRY_PROBE__ = {}
    return g.__WAP_ADDON_ENTRY_PROBE__
}

/** 去掉错误的 /wap/{siteId}/assets → /wap/assets */
function normalizeWapAssetPath(url: string): string {
    return url.replace(/^\/wap\/\d+\//, '/wap/')
}

/**
 * 静态资源统一走 /wap/assets/…（与 index.html、import map 一致）。
 * 路由 base 可为 /wap/{siteId}/，但资源文件不按站点 ID 分目录部署。
 */
export function wapUrl(relative: string) {
    if (!relative) return relative
    if (relative.startsWith('http')) return relative
    if (relative.startsWith('/wap/')) return normalizeWapAssetPath(relative)
    if (relative.startsWith('/assets/')) return `${WAP_PREFIX}${relative}`
    if (relative.startsWith('./')) return `${WAP_PREFIX}/assets/addons/${relative.slice(2)}`
    return `${WAP_PREFIX}/${relative.replace(/^\//, '')}`
}

const loadedAddonStyles = new Set<string>()

/** 动态加载 addon 构建产物中的 style.css（scoped SCSS / Windi 样式） */
export function ensureAddonStyles(addonKey: string) {
    if (!addonKey || typeof document === 'undefined') return
    if (!isAddonInstalled(addonKey)) return
    if (loadedAddonStyles.has(addonKey)) return

    const href = wapUrl(`assets/addons/${addonKey}/style.css`)
    const existing = document.querySelector(`link[rel="stylesheet"][href="${href}"]`)
    if (existing) {
        loadedAddonStyles.add(addonKey)
        return
    }

    const id = `addon-style-${addonKey}`
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = href
    link.onload = () => loadedAddonStyles.add(addonKey)
    link.onerror = () => {
        loadedAddonStyles.add(addonKey)
    }
    document.head.appendChild(link)
}

function addonAssetUrl(addon: string, ...segments: string[]) {
    return wapUrl(['assets', 'addons', addon, ...segments].join('/'))
}

async function isAddonEntryAvailable(key: string): Promise<boolean> {
    const addonEntryAvailableCache = getAddonEntryProbeCache()
    if (key in addonEntryAvailableCache) {
        return addonEntryAvailableCache[key]
    }

    addonEntryAvailableCache[key] = (async () => {
        const url = wapUrl(`/assets/addons/${key}/manifest.json`)
        const attempts: RequestInit[] = [{ method: 'GET' }, { method: 'HEAD' }]
        for (const init of attempts) {
            try {
                const res = await fetch(url, { ...init, cache: 'no-store' })
                if (!res.ok) continue
                const ct = (res.headers.get('content-type') || '').toLowerCase()
                if (ct.includes('text/html')) continue
                if (init.method === 'HEAD') return true
                const peek = (await res.text()).trimStart()
                if (!peek || peek.startsWith('<')) continue
                return true
            } catch {
                // try next method
            }
        }
        return false
    })()

    return addonEntryAvailableCache[key]
}

function markAddonEntryUnavailable(key: string) {
    getAddonEntryProbeCache()[key] = Promise.resolve(false)
}

export function isAddonInstalled(addon: string): boolean {
    if (!addon) return false
    if (getRegisteredAddonModule(addon)) return true
    return getInstalledAddonKeys().includes(addon)
}

type LocaleMerger = (locale: string, messages: Record<string, string>) => void

let addonLocaleMerger: LocaleMerger | null = null

export function registerAddonLocaleMerger(merge: LocaleMerger) {
    addonLocaleMerger = merge
}

export async function loadAddonModule(addon: string): Promise<Record<string, unknown> | null> {
    const registered = getRegisteredAddonModule(addon)
    if (registered) {
        if (addonLocaleMerger) {
            mergeAddonLangsFromModule(addon, registered, addonLocaleMerger)
        }
        return registered
    }

    const addonModuleCache = getAddonModuleCache()
    if (!(addon in addonModuleCache)) {
        addonModuleCache[addon] = (async () => {
            if (!isAddonInstalled(addon)) {
                return null
            }
            try {
                const available = await isAddonEntryAvailable(addon)
                if (!available) {
                    return null
                }
                // entry 可能是相对路径（./index.js / ./index-[hash].js）或历史绝对路径（/assets/addons/{key}/index.js），
                // 统一抽取文件名后按 /assets/addons/{addon}/ 重建 URL，兼容旧插件（固定 index.js）与新内容哈希入口
                const entry = getProdManifests()[addon]?.entry || './index.js'
                const entryFile = entry.split('/').pop() || 'index.js'
                const url = wapUrl(`/assets/addons/${addon}/${entryFile}`)
                const mod = await import(/* @vite-ignore */ url) as Record<string, unknown>
                if (mod && addonLocaleMerger) {
                    mergeAddonLangsFromModule(addon, mod, addonLocaleMerger)
                }
                return mod
            } catch {
                markAddonEntryUnavailable(addon)
                return null
            }
        })()
    }
    return addonModuleCache[addon]
}

export async function ensureAddonProdReady() {
    if (!isProdReady()) await initAddonManifests()
}

export async function initAddonManifests(keys?: string[]) {
    // #ifdef H5
    if (import.meta.env.DEV) {
        setProdReady(true)
        return
    }
    // #endif
    // #ifndef H5
    setProdReady(true)
    return
    // #endif

    const existingPromise = getProdInitPromise()
    if (existingPromise) return existingPromise

    const initPromise = (async () => {
        const prodManifests = getProdManifests()
        for (const key of Object.keys(prodManifests)) delete prodManifests[key]
        let addonKeys = keys
        let manifestData = null
        if (!addonKeys?.length) {
            try {
                const res = await fetch(wapUrl(`/assets/addons/index.json?_t=${Date.now()}`))
                if (res.ok) {
                    const data = await res.json()
                    addonKeys = Array.isArray(data.keys) ? data.keys : []
                    manifestData = data.manifests || null
                }
            } catch {
                addonKeys = []
            }
        }
        // 把 index.json.manifests 登记进运行期清单（含 entry 字段，供 loadAddonModule 解析
        // 内容哈希命名的入口 index-[hash].js），避免硬编码 /index.js 在改名后 404。
        // 该数据已随 index.json 一并下载，仅做本地引用合并，不触发额外请求。
        if (manifestData) Object.assign(prodManifests, manifestData)
        // 首屏仅登记“已安装清单”（来自 index.json），【不】逐个 fetch manifest.json / probe index.js，
        // 避免插件多时一次性请求所有插件的 index.js，造成首屏空白久、请求风暴。
        // 真正的 manifest.json / index.js 拉取推迟到 loadAddonModule（首次进入某插件页才按需请求）。
        const installedAddonKeys = getInstalledKeysStore()
        // 合并而非覆盖：保留模块初始化时由 DIY_COMPONENT_MAP 预登记的“内置插件” key。
        // 运行期 index.json 拉取失败时（addonKeys 为空），内置插件的装修组件仍可正常加载，
        // 否则 installedAddonKeys 会被清空，导致所有插件装修组件（依赖 isAddonInstalled 判定）全部空白。
        const merged = Array.from(new Set([...installedAddonKeys, ...(addonKeys || [])]))
        installedAddonKeys.length = 0
        installedAddonKeys.push(...merged)
        setProdReady(true)
    })()

    setProdInitPromise(initPromise)
    return initPromise
}

export function getInstalledAddonKeys(): string[] {
    return getInstalledKeysStore()
}

/** 预登记一个已安装插件（如由静态装修组件表 DIY_COMPONENT_MAP 推导出内置插件 key）。
 *  使装修组件无需依赖运行期 index.json 清单即可判定为已安装。 */
export function markAddonInstalled(key: string) {
    if (!key) return
    const store = getInstalledKeysStore()
    if (!store.includes(key)) store.push(key)
}

function unwrapLocalePack(pack: unknown): Record<string, string> {
    if (!pack || typeof pack !== 'object') return {}
    const obj = pack as Record<string, unknown>
    if (obj.default && typeof obj.default === 'object') {
        return unwrapLocalePack(obj.default)
    }
    const result: Record<string, string> = {}
    for (const [key, value] of Object.entries(obj)) {
        if (key === 'default' || key === '__esModule') continue
        if (typeof value === 'string') result[key] = value
    }
    return Object.keys(result).length ? result : (obj as Record<string, string>)
}

function flattenLocalePack(addonKey: string, file: string, pack: Record<string, string>): Record<string, string> {
    const data: Record<string, string> = {}
    const fileKey = file === 'common' ? `${addonKey}.common` : `${addonKey}.${file}`
    for (const [key, value] of Object.entries(pack)) {
        if (typeof value !== 'string') continue
        data[`${fileKey}.${key}`] = value
        if (file === 'common') data[key] = value
    }
    return data
}

function mergeAddonLangsFromModule(
    addonKey: string,
    mod: Record<string, unknown>,
    merge: (locale: string, messages: Record<string, string>) => void
) {
    const langs = mod.langs as Record<string, Record<string, unknown>> | undefined
    if (!langs) return
    for (const [locale, files] of Object.entries(langs)) {
        const merged: Record<string, string> = {}
        for (const [file, pack] of Object.entries(files || {})) {
            Object.assign(merged, flattenLocalePack(addonKey, file, unwrapLocalePack(pack)))
        }
        if (Object.keys(merged).length) merge(locale, merged)
    }
}

export async function preloadAllAddonLocales(
    merge: (locale: string, messages: Record<string, string>) => void
) {
    // #ifdef H5
    if (import.meta.env.DEV) return
    // #endif
    // #ifndef H5
    return
    // #endif

    if (!isProdReady()) await initAddonManifests()
    registerAddonLocaleMerger(merge)
    // 首屏仅预热当前路由对应的插件语言包，其余插件惰性加载（避免插件多时 index.js 请求风暴、首屏空白久）
    const addon = resolveRouteAddonKey()
    if (addon && isAddonInstalled(addon)) {
        try {
            await loadAddonModule(addon)
        } catch {
            // skip broken addon
        }
    }
}

/**
 * 解析当前路由对应的插件 key（仅 H5 运行期有意义）。
 * 优先取桥接页登记的真实路由（globalThis 共享），兜底从浏览器地址 /addon/{key}/pages/... 还原。
 */
export function resolveRouteAddonKey(): string {
    // #ifndef H5
    return ''
    // #endif
    // #ifdef H5
    try {
        const route = getActiveAddonPageRoute()
        if (route) {
            const m = route.match(/^\/?addon\/([^/]+)\//)
            if (m) return m[1]
        }
    } catch {}
    const loc = (globalThis as any).location
    if (loc && typeof loc.pathname === 'string') {
        const idx = loc.pathname.indexOf('/addon/')
        if (idx !== -1) {
            const m = loc.pathname.slice(idx).match(/^\/?addon\/([^/]+)\//)
            if (m) return m[1]
        }
    }
    return ''
    // #endif
}

/**
 * 预热指定插件（供导航守卫在路由切换时按需懒加载其余插件）。
 */
export async function preloadRouteAddon(
    addon: string,
    merge?: (locale: string, messages: Record<string, string>) => void
) {
    // #ifdef H5
    if (import.meta.env.DEV) return
    // #endif
    // #ifndef H5
    return
    // #endif
    if (!addon || !isAddonInstalled(addon)) return
    if (merge) registerAddonLocaleMerger(merge)
    if (!isProdReady()) await initAddonManifests()
    try {
        await loadAddonModule(addon)
    } catch {
        // skip broken addon
    }
}
