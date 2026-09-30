/**
 * 插件语言与 manifest 初始化（供 core shared admin-lang 与 addon-loader 共用）
 */

export interface AddonManifest {
    key: string
    version?: string
    sharedVersion?: string
    /** 入口脚本文件名：index.js 或 index-[contenthash:8].js（内容哈希命名，重编即失效） */
    entry?: string
    views?: Record<string, string>
    components?: Record<string, string>
    layout?: string
    langBase?: string
}

// 跨 chunk 共享：vite 会把 addon-lang.ts 同时打进主 chunk、admin-lang shared chunk 和每个 addon 包，
// 各拷贝的模块级变量互不相通。除 init promise 外，清单结果也必须挂在 window 上共享——
// 否则 addon 包内拷贝 await 了别处已 resolve 的共享 promise 后本地清单仍为空，
// isAddonInstalled() 永远 false（表现为插件页面/动态面板加载成 404，Installed: []）。
interface AddonSharedState {
    manifests: Record<string, AddonManifest>
    installedKeys: string[]
    ready: boolean
}
function sharedState(): AddonSharedState {
    const g = globalThis as any
    if (!g.__addonSharedState__) {
        g.__addonSharedState__ = { manifests: {}, installedKeys: [], ready: false } as AddonSharedState
    }
    return g.__addonSharedState__ as AddonSharedState
}
// init promise 也去重，避免多拷贝重复 fetch index.json（本地变量仅为同拷贝同步调用兜底）
let prodInitPromise: Promise<void> | null = null
const __getInit = (): Promise<void> | null =>
    ((globalThis as any).__addonInitPromise__ as Promise<void> | null | undefined) ?? null
const __setInit = (p: Promise<void> | null) => {
    prodInitPromise = p
    ;(globalThis as any).__addonInitPromise__ = p
}

const ADMIN_PREFIX = '/admin'

// 系统支持的语言（与 i18n.ts 中 zhCn / en 对应）
const supportedLocales = ['zh-cn', 'en']

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

// 语言包资产路径：尊重 manifest.langBase（默认 ./lang/），兼容其他项目编译时自定义语言目录
function addonLangAssetUrl(addon: string, locale: string, file: string) {
    const base = (getProdManifests()[addon]?.langBase || './lang/').replace(/^\.\//, '').replace(/\/+$/, '')
    const rel = ['assets', 'addons', addon, base, locale, `${file}.json`].join('/').replace(/\/+/g, '/')
    return `${ADMIN_PREFIX}/${rel}`
}

export function resolveLangFile(app: string, path: string): string {
    if (path === '/') return 'index'
    let view = path.replace(/^(\/admin\/|\/site\/|\/)/, '').replace(/\.vue$/, '')
    if (view.startsWith('views/')) view = view.slice('views/'.length)
    if (app) {
        if (view === app) view = 'index'
        // addon 语言包文件名自带 addon 前缀（如 spdr.goods.json），此处不再剥离
        // 空值：当 view 首段不等于 app 时不处理（如 app="spdr" view="goods"）
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
    // 探测插件 manifest.json 是否存在（与入口文件名解耦，兼容内容哈希命名的 index-[hash].js）
    try {
        const res = await fetch(adminUrl(`/assets/addons/${key}/manifest.json`), { method: 'HEAD' })
        if (!res.ok) return false
        const ct = (res.headers.get('content-type') || '').toLowerCase()
        return !ct.includes('text/html')
    } catch {
        return false
    }
}

const addonModuleCacheStore = (): Record<string, Promise<Record<string, unknown> | null>> => {
    const g = globalThis as any
    if (!g.__addonModuleCaches__) g.__addonModuleCaches__ = {}
    return g.__addonModuleCaches__
}

/**
 * 插件包缓存版本：来自部署清单 index.json 的 buildTime（assemble-admin 写入）。
 * 插件包体积大（含内联语言包，单个 1MB+），URL 用它拼 ?v= 参数——
 * 同一构建内 URL 稳定 → 浏览器长期缓存，刷新页面不再全量重下；
 * 重新部署后 index.json 的 buildTime 变化 → URL 变化 → 缓存自动失效。
 */
function buildVersion(): string {
    const v = (globalThis as any).__addonBuildVersion__
    return v ? String(v) : '0'
}

export function isAddonInstalled(addon: string): boolean {
    return !!addon && getInstalledAddonKeys().includes(addon)
}

export async function loadAddonModule(addon: string): Promise<Record<string, unknown> | null> {
    const addonModuleCache = addonModuleCacheStore()
    if (!(addon in addonModuleCache)) {
        addonModuleCache[addon] = (async () => {
            try {
                // 部署模式先确保清单就绪（拿到 buildTime 作为缓存版本），再按版本拼 URL
                if (!import.meta.env.DEV) await initAddonManifests()
                // entry 可能是相对路径（./index.js / ./index-[hash].js）或历史绝对路径（/assets/addons/{key}/index.js），
                // 统一抽取文件名后按 /assets/addons/{addon}/ 重建 URL，兼容旧插件（固定 index.js）与新内容哈希入口
                const entry = getProdManifests()[addon]?.entry || './index.js'
                const entryFile = entry.split('/').pop() || 'index.js'
                const url = adminUrl(`/assets/addons/${addon}/${entryFile}?v=${buildVersion()}`)
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
    const addonModuleCache = addonModuleCacheStore()
    for (const key of Object.keys(addonModuleCache)) {
        delete addonModuleCache[key]
    }
}

export function isAddonProdReady() {
    return sharedState().ready
}

export async function ensureAddonProdReady() {
    if (!sharedState().ready) await initAddonManifests()
}

export async function initAddonManifests(keys?: string[]) {
    if (import.meta.env.DEV) {
        sharedState().ready = true
        return
    }
    const shared = __getInit()
    if (shared) {
        await shared
        // 共享 promise 可能来自旧版本拷贝（只写了它自己的私有状态、未写共享状态），
        // 此时本拷贝自己拉一次清单填充共享状态，保证混合部署下也能工作
        if (sharedState().ready) return
    }

    const state = sharedState()
    __setInit((async () => {
        state.manifests = {}
        state.installedKeys = []
        let addonKeys = keys
        if (!addonKeys?.length) {
            try {
                const indexUrl = adminUrl(`/assets/addons/index.json?_t=${Date.now()}`)
                const res = await fetch(indexUrl)
                if (res.ok) {
                    const data = await res.json()
                    addonKeys = Array.isArray(data.keys) ? data.keys : []
                    // 记录构建版本：插件包/manifest 的 ?v= 缓存参数据此生成
                    if (data.buildTime) {
                        ;(globalThis as any).__addonBuildVersion__ = data.buildTime
                    }
                    // 读取合并后的 manifests（PHP 端已打包进 index.json），避免 N 次 manifest.json 请求
                    const bundled = data.manifests as Record<string, AddonManifest> | undefined
                    if (bundled) {
                        for (const [k, m] of Object.entries(bundled)) {
                            state.manifests[k] = m
                        }
                    }
                }
            } catch {
                addonKeys = []
            }
        }
        const verifiedKeys: string[] = []
        for (const key of addonKeys || []) {
            // index.json 已打包 manifests 的插件，直接视为可用（无需 N 次 HEAD 探测）
            if (state.manifests[key]) {
                verifiedKeys.push(key)
                continue
            }
            // 兼容旧版：单独请求 manifest.json（仍做一次探测）
            if (!(await isAddonEntryAvailable(key))) continue
            verifiedKeys.push(key)
            try {
                const url = adminUrl(`/assets/addons/${key}/manifest.json?v=${buildVersion()}`)
                const res = await fetch(url)
                if (res.ok) {
                    state.manifests[key] = await res.json()
                }
            } catch {
                // skip missing manifest
            }
        }
        state.installedKeys = verifiedKeys
        state.ready = true
    })())

    return prodInitPromise
}

/**
 * 预热指定路由对应的插件模块（首屏/切换时调用）。
 * 仅加载当前路由相关插件，其余插件在访问对应页面时由 loadAddonModule 惰性加载（已带缓存去重），
 * 避免首屏按插件总数并行拉取 index.js 造成空白与请求风暴。
 */
export async function preloadRouteAddon(route: { meta: Record<string, unknown>; matched: Array<{ meta: Record<string, unknown> }>; path: string }) {
    const addon = resolveRouteAddon(route)
    if (!addon || !isAddonInstalled(addon)) return
    loadAddonModule(addon)
}

export function getInstalledAddonKeys(): string[] {
    const state = sharedState()
    if (state.installedKeys.length) return state.installedKeys
    return Object.keys(state.manifests)
}

export function getProdManifests(): Record<string, AddonManifest> {
    return sharedState().manifests
}

// 内置插件（admin/src/addon 下，随 core 一起打包，部署模式下没有独立 dist/assets/addons/{key}/index.js）
// 的语言包不会被打进任何部署插件的 index.js，也不存在 /admin/assets/addons/{key}/lang/ 资源，
// 必须通过编译期 glob 直接解析源码 json。这里用懒 glob（按需加载，不膨胀 bundle）。
const builtinAddonLangFiles = import.meta.glob('@/addon/**/lang/**/*.json', { eager: false })

export async function loadBuiltinAddonLangFile(addon: string, locale: string, file: string): Promise<Record<string, string>> {
    const key = `@/addon/${addon}/lang/${locale}/${file}.json`
    const loader = (builtinAddonLangFiles as Record<string, () => Promise<{ default: Record<string, string> }>>)[key]
    if (!loader) return {}
    try {
        const mod = await loader()
        return (mod.default || {}) as Record<string, string>
    } catch {
        return {}
    }
}

export async function preloadAllAddonLangs(
    merge: (locale: string, messages: Record<string, string>) => void
) {
    if (import.meta.env.DEV) return
    if (!sharedState().ready) await initAddonManifests()

    for (const addon of getInstalledAddonKeys()) {
        try {
            const mod = await loadAddonModule(addon)
            const langs = mod?.langs as Record<string, Record<string, unknown>> | undefined
            if (langs) {
                for (const [locale, files] of Object.entries(langs)) {
                    const merged: Record<string, string> = {}
                    for (const [file, pack] of Object.entries(files || {})) {
                        Object.assign(merged, flattenLangPack(file, unwrapLangPack(pack)))
                    }
                    if (Object.keys(merged).length) merge(locale, merged)
                }
            } else {
                // index.js 未内联 langs（如其他项目编译的插件包未打包语言），
                // 从资产目录拉取 common 语言包作为兜底
                for (const locale of supportedLocales) {
                    const common = await loadAddonLang(addon, locale, 'common')
                    if (Object.keys(common).length) merge(locale, common)
                }
            }
        } catch {
            // skip broken addon module
        }
    }
}

export function registerAddonManifest(manifest: AddonManifest) {
    const state = sharedState()
    state.manifests[manifest.key] = manifest
    state.ready = true
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
    if (!sharedState().ready) await initAddonManifests()

    try {
        const mod = await loadAddonModule(addon)
        if (mod) {
            const langs = mod.langs as Record<string, Record<string, Record<string, unknown>>> | undefined
            const pack = langs?.[locale]?.[file]
            const messages = unwrapLangPack(pack)
            if (Object.keys(messages).length) return messages
        }
    } catch {
        // fallback to builtin glob / static lang files
    }

    // 内置插件（随 core 打包，无独立部署 index.js）回退到源码 glob 解析
    const builtin = await loadBuiltinAddonLangFile(addon, locale, file)
    if (Object.keys(builtin).length) return builtin

    const url = addonLangAssetUrl(addon, locale, file)
    try {
        const res = await fetch(url)
        if (res.ok) return await res.json()
    } catch {
        // ignore
    }
    return {}
}
