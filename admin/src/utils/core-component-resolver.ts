/**
 * Core 内动态组件解析（pay/diy-link 等），仅 core 使用，不可打进 addon 包
 */
import type { Component } from 'vue'
import { defineAsyncComponent } from 'vue'
import { loadAddonModule } from '@/utils/addon-loader'

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
    // 插件组件：/src/addon/{addon}/views/{rest}.vue
    if (componentPath.includes('/addon/')) {
        const m = componentPath.match(/\/addon\/([^/]+)\/views\/(.+)\.vue$/)
        if (m) {
            const [, addon, rest] = m
            if (import.meta.env.DEV) {
                const viewLoader = (allAddonVueModules as Record<string, ViewLoader>)[`../addon/${addon}/views/${rest}.vue`]
                if (viewLoader) return viewLoader()
            } else {
                // 部署模式：插件独立打包，views 中存的是组件 loader 函数（generate-addon-entry 生成）
                const mod = await loadAddonModule(addon)
                const loader = (mod?.views as Record<string, ViewLoader> | undefined)?.[rest]
                if (loader) return await loader()
            }
        }
    }
    throw new Error(`Component not found: ${componentPath}`)
}
