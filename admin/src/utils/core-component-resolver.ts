/**
 * Core 内动态组件解析（pay/diy-link 等），仅 core 使用，不可打进 addon 包
 */
import type { Component } from 'vue'
import { defineAsyncComponent } from 'vue'

export const coreVueModules = {
    ...import.meta.glob('../app/**/*.vue'),
    ...import.meta.glob('../components/**/*.vue'),
    ...import.meta.glob('../layout/**/*.vue')
}

type ViewLoader = () => Promise<{ default: Component }>

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

// 开发环境：glob 直读插件源码（无需 addon-manifest.dev.ts）
const allAddonVueModules = import.meta.glob('../addon/**/views/**/*.vue')

export async function loadCoreVueModule(componentPath: string) {
    const loader = findCoreModuleLoader(componentPath)
    if (loader) return loader()
    if (import.meta.env.DEV) {
        if (componentPath.includes('/addon/')) {
            const m = componentPath.match(/\/addon\/([^/]+)\/views\/(.+)\.vue$/)
            if (m) {
                const [, addon, rest] = m
                const viewLoader = (allAddonVueModules as Record<string, ViewLoader>)[`../addon/${addon}/views/${rest}.vue`]
                if (viewLoader) return viewLoader()
            }
        }
    }
    throw new Error(`Component not found: ${componentPath}`)
}
