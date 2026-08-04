import { reactive } from 'vue'
import { getInstalledAddonKeys, loadAddonModule, ensureAddonProdReady, markAddonInstalled } from '@/utils/addon-lang'

const runtimeDiyMap = reactive<Record<string, DiyComponentMeta>>({})

// 将 kebab-case 文件夹名转为 PascalCase 组件名（与构建扫描保持一致）
const kebabToPascal = (s: string) =>
    s
        .split(/[-_/]/)
        .filter(Boolean)
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join('')

// 已 import 过 index.js 并注册到运行时的插件（key 不一定出现在 index.json，
// 例如“项目部署模式”安装的外部插件，只要其 index.js 被 import 即注册到 __WAP_ADDON_MODULES__）
function registeredAddonKeys(): string[] {
    const g = globalThis as any
    return Object.keys(g.__WAP_ADDON_MODULES__ || {})
}

/**
 * 运行时补充解析“项目部署模式”安装的外部打包插件的装修组件。
 * 内置插件组件由构建期静态表 DIY_COMPONENT_MAP 提供，这里只负责外部插件。
 *
 * 不缓存“已完成”结果：外部插件可能在 onLaunch 之后才被 import 注册进运行时，
 * 需要可重复触发以补扫最新已注册模块。仅对“并发”调用做去重，避免多个组件
 * 同时未命中时重复 fetch 各插件 index.js。
 */
let scanPromise: Promise<void> | null = null

export async function ensureRuntimeDiyRegistry(): Promise<void> {
    if (scanPromise) return scanPromise
    scanPromise = (async () => {
        // 必须先等运行期安装清单（assets/addons/index.json）加载完成，
        // 否则 getInstalledAddonKeys() 为空、遍历 0 个插件，runtimeDiyMap 永远空，
        // 导致部署安装的外部打包插件其装修组件在 wap 端始终空白（admin 端正常）。
        await ensureAddonProdReady()
        // 1) index.json 中声明的插件（含项目部署模式写入的已安装插件）
        const keys = new Set<string>(getInstalledAddonKeys())
        // 2) 已注册到运行时的插件（外部插件 key 不一定在 index.json，但 import 后即注册）
        for (const k of registeredAddonKeys()) keys.add(k)

        await Promise.all(
            [...keys].map(async (key) => {
                // 外部部署插件的 key 不一定写入 index.json 已安装清单，但已被加载进
                // __WAP_ADDON_MODULES__（见 registeredAddonKeys）。预登记为“已安装”，
                // 否则 loadAddonModule / loadAddonDiyComponent 内的 isAddonInstalled 检查
                // 会误判为未安装并返回 null，导致装修组件（diy）空白。
                markAddonInstalled(key)
                try {
                const mod = await loadAddonModule(key)
                const diy = (mod as any)?.diyComponents as Record<string, () => Promise<any>> | undefined
                if (!diy) return
                    for (const folder of Object.keys(diy)) {
                        const vueComponentName = kebabToPascal(folder)
                        if (!runtimeDiyMap[vueComponentName]) {
                            runtimeDiyMap[vueComponentName] = {
                                vueComponentName,
                                scope: 'addon',
                                addonKey: key,
                                folder
                            }
                        }
                    }
                } catch (e) {
                    console.warn('[diy-runtime] 加载插件装修组件失败:', key, e)
                }
            })
        )
    })().finally(() => {
        scanPromise = null
    })
    return scanPromise
}

/**
 * 解析外部插件装修组件元信息。
 * 先查预注册的 runtimeDiyMap；未命中再懒扫描已注册运行时模块
 * （按 kebabToPascal(folder) 或原始 folder 匹配），覆盖运行期才注册进来的外部插件。
 */
export function resolveRuntimeDiyMeta(componentName: string): DiyComponentMeta | null {
    if (!componentName) return null
    if (runtimeDiyMap[componentName]) return runtimeDiyMap[componentName]
    const modules = (globalThis as any).__WAP_ADDON_MODULES__ || {}
    for (const key of Object.keys(modules)) {
        const diy = (modules[key] as any)?.diyComponents as Record<string, () => Promise<any>> | undefined
        if (!diy) continue
        // 直接以 folder/组件名为键
        if (diy[componentName]) {
            const meta: DiyComponentMeta = { vueComponentName: componentName, scope: 'addon', addonKey: key, folder: componentName }
            runtimeDiyMap[componentName] = meta
            return meta
        }
        // kebabToPascal(folder) 匹配
        for (const folder of Object.keys(diy)) {
            if (kebabToPascal(folder) === componentName) {
                const meta: DiyComponentMeta = { vueComponentName: componentName, scope: 'addon', addonKey: key, folder }
                runtimeDiyMap[componentName] = meta
                return meta
            }
        }
    }
    return null
}
