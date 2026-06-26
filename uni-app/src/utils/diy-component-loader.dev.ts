import type { Component } from 'vue'
import type { DiyComponentMeta } from './diy-component-types'
import { getAppDiyLoader, getAddonDiyLoader } from './diy-component-globs.dev'

export async function loadDiyComponent(meta: DiyComponentMeta): Promise<Component | null> {
    try {
        const loader =
            meta.scope === 'app'
                ? getAppDiyLoader(meta.folder)
                : getAddonDiyLoader(meta.addonKey!, meta.folder)
        if (!loader) {
            console.warn('[diy-loader] dev glob missing:', meta.scope, meta.addonKey, meta.folder)
            return null
        }
        const mod = await loader()
        return mod.default ?? null
    } catch (err) {
        console.error('[diy-loader] dev load failed:', meta.vueComponentName, err)
        return null
    }
}
