/**
 * 插件运行时加载：dev 用 import.meta.glob 直读源码，prod 用 drop-in 编译产物
 */
import type { Component } from 'vue'
import { defineAsyncComponent } from 'vue'
import {
    type AddonManifest,
    adminUrl,
    clearAddonModuleCache,
    ensureAddonProdReady,
    getProdManifests,
    initAddonManifests,
    loadAddonLang,
    loadAddonModule,
    preloadAllAddonLangs,
    registerAddonManifest,
    resolveLangFile,
    resolveRouteAddon,
    resolveRouteView,
    inferAddonFromPath,
    getInstalledAddonKeys,
    isAddonInstalled
} from '@/utils/addon-lang'

export type { AddonManifest }
export {
    adminUrl,
    initAddonManifests,
    loadAddonLang,
    preloadAllAddonLangs,
    registerAddonManifest,
    resolveLangFile,
    resolveRouteAddon,
    resolveRouteView,
    inferAddonFromPath,
    getInstalledAddonKeys,
    loadAddonModule
}

/** 清除插件样式 DOM 节点和模块缓存（布局切换时用） */
export function clearAddonStyleCache() {
    document.querySelectorAll('style[data-addon-style]').forEach(el => el.remove())
    clearAddonModuleCache()
}

type ViewLoader = () => Promise<{ default: Component }>

const load404 = (): Promise<{ default: Component }> =>
    import('@/app/views/error/404.vue') as Promise<{ default: Component }>

// 开发环境：用 import.meta.glob 直读所有插件源码（无需 addon-manifest.dev.ts）
const allAddonVueModules = import.meta.glob('../addon/**/views/**/*.vue')
const addonLayoutModules = import.meta.glob('../addon/*/layout/index.vue')

async function importProdModule(url: string): Promise<Component | null> {
    try {
        const full = adminUrl(url.startsWith('./') ? url : url)
        const mod = await import(/* @vite-ignore */ full)
        return mod.default ?? mod
    } catch {
        return null
    }
}

export function loadAddonView(addon: string, viewPath: string): ViewLoader {
    if (!addon) {
        return () => load404()
    }

    // 开发环境：glob 直读源码（routers.ts 已优先走 glob，此处为兜底）
    if (import.meta.env.DEV) {
        return async () => {
            const loader = allAddonVueModules[`../addon/${addon}/views/${viewPath}.vue`] as ViewLoader | undefined
            if (loader) return loader()
            return load404()
        }
    }

    return async () => {
        await ensureAddonProdReady()
        if (!isAddonInstalled(addon)) {
            console.error(`[loadAddonView] addon "${addon}" not installed. Installed:`, getInstalledAddonKeys())
            return load404()
        }
        try {
            const mod = await loadAddonModule(addon)
            if (!mod) {
                console.error(`[loadAddonView] addon "${addon}" module loaded as null/undefined`)
                return load404()
            }
            const loader = mod.views?.[viewPath] as ViewLoader | undefined
            if (!loader) {
                const available = Object.keys(mod.views || {})
                console.error(`[loadAddonView] addon="${addon}" viewPath="${viewPath}" NOT FOUND. Available (${available.length}):`, available.slice(0, 10), available.length > 10 ? `... and ${available.length - 10} more` : '')
                return load404()
            }
            try {
                return await loader()
            } catch (e) {
                console.error(`[loadAddonView] addon="${addon}" viewPath="${viewPath}" loader threw:`, e)
                return load404()
            }
        } catch (e) {
            console.error(`[loadAddonView] addon="${addon}" module import failed:`, e)
            return load404()
        }
    }
}

export function loadAddonComponent(addon: string, subPath: string, name: string): ViewLoader {
    const key = `${subPath}/${name}`.replace(/\/+/g, '/')

    if (import.meta.env.DEV) {
        return async () => {
            const loader = allAddonVueModules[`../addon/${addon}/views/${subPath}/${name}.vue`] as ViewLoader | undefined
            if (loader) return loader()
            return load404()
        }
    }

    return (async () => {
        await ensureAddonProdReady()
        if (!isAddonInstalled(addon)) return null as any
        try {
            const mod = await loadAddonModule(addon)
            if (!mod) return null as any
            const components = (mod as Record<string, unknown>).components as Record<string, ViewLoader> | undefined
            if (!components) return null as any
            const loader = components[key] as ViewLoader | undefined
            if (!loader) return null as any
            return await loader()
        } catch {
            return null as any
        }
    }) as unknown as ViewLoader
}

export function loadAddonLayout(addon: string): ViewLoader | null {
    if (import.meta.env.DEV) {
        return async () => {
            const loader = addonLayoutModules[`../addon/${addon}/layout/index.vue`] as ViewLoader | undefined
            if (loader) return loader()
            return load404()
        }
    }

    return async () => {
        await ensureAddonProdReady()
        if (!isAddonInstalled(addon)) return load404()
        const rel = getProdManifests()[addon]?.layout
        if (!rel) return load404()
        const mod = await importProdModule(rel)
        if (!mod) return load404()
        return { default: mod as Component }
    }
}

/** Core 内动态组件（pay/diy-link 等），不含 addon 部分 */
export const coreVueModules = {
    ...import.meta.glob('../app/**/*.vue'),
    ...import.meta.glob('../components/**/*.vue'),
    ...import.meta.glob('../layout/**/*.vue')
}

function normalizeComponentKey(p: string): string {
    return p
        .replace(/^@\//, '')
        .replace(/^\/src\//, '')
        .replace(/^\.\.\//, '')
        .replace(/\\/g, '/')
}

function findCoreModuleLoader(componentPath: string): ViewLoader | undefined {
    const map = coreVueModules as Record<string, ViewLoader>
    if (map[componentPath]) return map[componentPath]
    const target = normalizeComponentKey(componentPath)
    const key = Object.keys(map).find((k) => normalizeComponentKey(k) === target || normalizeComponentKey(k).endsWith(`/${target}`))
    return key ? map[key] : undefined
}

export function resolveAsyncComponent(componentPath: string) {
    return defineAsyncComponent(async () => {
        const loader = findCoreModuleLoader(componentPath)
        if (loader) return (await loader()).default as Component
        const mod = await loadCoreVueModule(componentPath)
        return mod.default as Component
    })
}

export async function loadCoreVueModule(componentPath: string) {
    const loader = findCoreModuleLoader(componentPath)
    if (loader) return loader()
    if (import.meta.env.DEV) {
        if (componentPath.includes('/addon/')) {
            const m = componentPath.match(/\/addon\/([^/]+)\/views\/(.+)\.vue$/)
            if (m) {
                const [, addon, rest] = m
                const viewLoader = allAddonVueModules[`../addon/${addon}/views/${rest}.vue`] as ViewLoader | undefined
                if (viewLoader) return viewLoader()
            }
        }
    }
    throw new Error(`Component not found: ${componentPath}`)
}
