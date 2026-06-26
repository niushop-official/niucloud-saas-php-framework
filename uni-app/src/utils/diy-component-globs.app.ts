/**
 * uni-app 下 import.meta.glob 必须使用相对路径（@/ 别名不会被展开）
 */
import type { Component } from 'vue'

type DiyModuleLoader = () => Promise<{ default: Component }>

export const appDiyLoaders = import.meta.glob('../app/components/diy/*/index.vue') as Record<
    string,
    DiyModuleLoader
>

export function appDiyGlobKey(folder: string) {
    return `../app/components/diy/${folder}/index.vue`
}

export function getAppDiyLoader(folder: string) {
    return appDiyLoaders[appDiyGlobKey(folder)]
}
