import type { DiyComponentMeta } from './diy-component-types'
import { isSplitBuildEnabled } from './split-build'
import * as dev from './diy-component-registry.dev'
import * as split from './diy-component-registry.split'

export function resolveDiyMeta(componentName: string): DiyComponentMeta | null {
    // #ifdef MP
    return split.resolveDiyMeta(componentName)
    // #endif
    // #ifndef MP
    return isSplitBuildEnabled()
        ? split.resolveDiyMeta(componentName)
        : dev.resolveDiyMeta(componentName)
    // #endif
}

export function listDiyComponentNames() {
    // #ifdef MP
    return split.listDiyComponentNames()
    // #endif
    // #ifndef MP
    return isSplitBuildEnabled() ? split.listDiyComponentNames() : dev.listDiyComponentNames()
    // #endif
}
