/**
 * 分构建：映射表来自构建前生成的 .build 产物，避免 import.meta.glob 扫入全部 addon 源码
 */
import type { DiyComponentMeta } from './diy-component-types'
import { DIY_COMPONENT_MAP } from '../../.build/diy-component-registry.generated'
import { resolveRuntimeDiyMeta } from './diy-component-runtime-registry'
import { markAddonInstalled } from '@/utils/addon-lang'
import { getRegisteredAddonModule } from './addon-module-registry'

// 模块初始化时，仅将“已随 core 内置打包”的插件 addonKey 预登记为已安装。
// 判据：该插件 index.js 已随 core 加载并注册进 __WAP_ADDON_MODULES__（getRegisteredAddonModule 命中）。
// 这样装修组件（diy）无需依赖运行期 index.json 清单即可加载内置插件组件。
//
// 注意：不能把 DIY_COMPONENT_MAP 里的全部插件都 mark 为已安装——
// 静态表扫描的是 src/addon 下所有插件源码（含“项目部署模式”外部单独打包、
// 未随本实例 core 安装的插件，如 friend_help）。若无条件预登记，会导致
// ensureRuntimeDiyRegistry 对未安装插件也发起 loadAddonModule → 请求其 index.js，
// 即使该插件根本不在 addons/index.json 中（造成多余请求/首屏请求风暴）。
// 真正“未随 core 打包但本实例已安装”的外部插件，由 index.json + ensureRuntimeDiyRegistry 按需处理。
{
    const builtinKeys = new Set<string>()
    for (const meta of Object.values(DIY_COMPONENT_MAP)) {
        if (meta.addonKey && getRegisteredAddonModule(meta.addonKey)) builtinKeys.add(meta.addonKey)
    }
    for (const key of builtinKeys) markAddonInstalled(key)
}

/**
 * 解析装修组件元信息：
 * 1) 优先用构建期生成的静态表 DIY_COMPONENT_MAP（源码内/内置插件）；
 * 2) 未命中再查运行时表（项目部署模式安装的外部打包插件）。
 * 命名与静态表 key 保持 PascalCase 一致（dev 下已验证可正常渲染）。
 */
export function resolveDiyMeta(componentName: string): DiyComponentMeta | null {
    if (!componentName) return null
    return DIY_COMPONENT_MAP[componentName] ?? resolveRuntimeDiyMeta(componentName)
}

export function listDiyComponentNames() {
    return Object.keys(DIY_COMPONENT_MAP)
}
