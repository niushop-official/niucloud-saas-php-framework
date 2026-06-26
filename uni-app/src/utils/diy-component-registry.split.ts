/**
 * 分构建：映射表来自构建前生成的 .build 产物，避免 import.meta.glob 扫入全部 addon 源码
 */
import type { DiyComponentMeta } from './diy-component-types'
import { DIY_COMPONENT_MAP } from '../../.build/diy-component-registry.generated'

export function resolveDiyMeta(componentName: string): DiyComponentMeta | null {
    if (!componentName) return null
    return DIY_COMPONENT_MAP[componentName] ?? null
}

export function listDiyComponentNames() {
    return Object.keys(DIY_COMPONENT_MAP)
}
