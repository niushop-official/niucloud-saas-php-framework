import type { Component } from 'vue'
import type { DiyComponentMeta } from './diy-component-types'
import { isSplitBuildEnabled } from './split-build'
import { loadDiyComponent as loadDev } from './diy-component-loader.dev'
import { loadDiyComponent as loadSplit } from './diy-component-loader.split'

export async function loadDiyComponent(meta: DiyComponentMeta): Promise<Component | null> {
    return isSplitBuildEnabled() ? loadSplit(meta) : loadDev(meta)
}
