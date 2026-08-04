/**
 * 分构建：映射表来自构建前生成的 .build 产物，避免 import.meta.glob 扫入全部 addon 源码
 */
import type { DiyComponentMeta } from './diy-component-types'
import { DIY_COMPONENT_MAP } from '../../.build/diy-component-registry.generated'
import { resolveRuntimeDiyMeta } from './diy-component-runtime-registry'
import { markAddonInstalled } from '@/utils/addon-lang'

// 模块初始化时，将静态表中声明的“内置插件” addonKey 预登记为已安装。
// 这样装修组件（diy）无需依赖运行期 index.json 清单即可加载：
// 即便 index.json 拉取失败/为空，__WAP_INSTALLED_ADDONS__ 仍含有这些 key，
// isAddonInstalled 判定为 true，loadAddonModule 才能 import 对应插件入口并渲染装修组件。
// 否则清单为空时所有插件装修组件都会因 isAddonInstalled=false 而空白（框架组件不受影响）。
{
    const builtinKeys = new Set<string>()
    for (const meta of Object.values(DIY_COMPONENT_MAP)) {
        if (meta.addonKey) builtinKeys.add(meta.addonKey)
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
