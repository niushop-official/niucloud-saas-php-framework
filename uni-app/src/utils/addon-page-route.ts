/**
 * 分构建 addon 桥接页登记的真实路由，供 t() 解析 fileKey 与底部导航高亮。
 *
 * 注意：外部打包插件是独立 bundle，其内部的 tabbar.vue / addon-page-route 是各自 bundle 的副本，
 * 模块级变量无法跨 bundle 共享。因此必须把状态挂到 globalThis 上（共享 JS 运行时），
 * 且 ref 来自【外置共享的 vue】——框架与插件 bundle 实际加载的是同一份 /wap/assets/shared/vue.js，
 * 这样响应式依赖才能跨 bundle 追踪，插件页 tabbar 才能读到框架设置的当前路由。
 */
import { ref } from 'vue'

const GLOBAL_KEY = '__NIUCLOUD_ACTIVE_ADDON_ROUTE__'

function getActiveRouteRef() {
    const g = globalThis as any
    if (!g[GLOBAL_KEY]) {
        g[GLOBAL_KEY] = ref('')
    }
    return g[GLOBAL_KEY] as ReturnType<typeof ref<string>>
}

export function setActiveAddonPageRoute(route: string) {
    getActiveRouteRef().value = route || ''
}

export function getActiveAddonPageRoute(): string {
    const v = getActiveRouteRef().value
    if (v) return v
    // 兜底：桥接页 onLoad 已用 history.replaceState 把浏览器地址还原为逻辑路由 /addon/{key}/pages/{page}，
    // 直接从地址还原，避免 globalThis ref 因框架/插件重建时序未就绪导致读不到值
    // #ifdef H5
    const loc = (globalThis as any).location
    if (loc && typeof loc.pathname === 'string') {
        const idx = loc.pathname.indexOf('/addon/')
        if (idx !== -1) return loc.pathname.slice(idx)
    }
    // #endif
    return ''
}

export function clearActiveAddonPageRoute() {
    getActiveRouteRef().value = ''
}
