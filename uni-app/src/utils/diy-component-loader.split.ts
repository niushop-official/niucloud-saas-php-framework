import type { Component } from 'vue'
import type { DiyComponentMeta } from './diy-component-types'
import { ensureAddonProdReady, loadAddonDiyComponent } from '@/utils/addon-loader'
import { getAppDiyLoader } from './diy-component-globs.app'

export async function loadDiyComponent(meta: DiyComponentMeta): Promise<Component | null> {
    try {
        if (meta.scope === 'app') {
            const loader = getAppDiyLoader(meta.folder)
            if (!loader) {
                console.warn('[diy-loader] app component missing:', meta.folder)
                return null
            }
            const mod = await loader()
            return mod.default ?? null
        }

        await ensureAddonProdReady()
        const mod = await loadAddonDiyComponent(meta.addonKey!, meta.folder)()
        if (!mod?.default) {
            console.warn(
                '[diy-loader] addon diy missing:',
                meta.addonKey,
                meta.folder,
                meta.vueComponentName
            )
            return null
        }
        return mod.default
    } catch (err) {
        console.error('[diy-loader] load failed:', meta.vueComponentName, err)
        return null
    }
}
