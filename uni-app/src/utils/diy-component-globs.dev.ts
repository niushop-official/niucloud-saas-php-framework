import type { Component } from 'vue'
import { appDiyLoaders, getAppDiyLoader } from './diy-component-globs.app'

export { appDiyLoaders, getAppDiyLoader } from './diy-component-globs.app'

type DiyModuleLoader = () => Promise<{ default: Component }>

export const addonDiyLoaders = import.meta.glob('../addon/*/components/diy/*/index.vue') as Record<
    string,
    DiyModuleLoader
>

export function addonDiyGlobKey(addonKey: string, folder: string) {
    return `../addon/${addonKey}/components/diy/${folder}/index.vue`
}

export function getAddonDiyLoader(addonKey: string, folder: string) {
    return addonDiyLoaders[addonDiyGlobKey(addonKey, folder)]
}
