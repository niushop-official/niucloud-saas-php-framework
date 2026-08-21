/**
 * 供 t() 解析当前页面路由（兼容 /wap/{siteId}/、addon 桥接页、getCurrentPages）
 */
import { getCurrentInstance } from 'vue'
import { getActiveAddonPageRoute } from '@/utils/addon-page-route'

/** 去掉 /wap/{siteId}/ 前缀，统一为 addon/shop/pages/... 或 app/pages/... */
export function normalizeRoutePath(path: string): string {
    let p = (path || '').trim()
    if (!p || p === '/') return '/'

    if (!p.startsWith('/')) p = `/${p}`

    // /wap/123/addon/shop/... → /addon/shop/...
    p = p.replace(/^\/wap\/(?:\d+\/)?/, '/')
    if (!p.startsWith('/')) p = `/${p}`

    return p
}

function getUniPageRoute(): string {
    try {
        const g = globalThis as typeof globalThis & {
            getCurrentPages?: () => Array<{ route?: string }>
        }
        const pages = g.getCurrentPages?.() || []
        const route = pages[pages.length - 1]?.route
        if (!route) return ''
        return normalizeRoutePath(route)
    } catch {
        return ''
    }
}

/** t() 使用的当前路由（仅在确实处于桥接插件页时优先用 addon 桥接登记的 fullRoute） */
export function resolveLocaleRoutePath(): string {
    const fromAddon = getActiveAddonPageRoute()

    // 当前真实路由（优先页面栈，其次浏览器地址）
    const stackRoute = getUniPageRoute()
    const locRoute = (typeof window !== 'undefined' && window.location?.pathname)
        ? normalizeRoutePath(window.location.pathname)
        : ''

    // 关键修复：只有【页面栈真实路由】本身是桥接页 app/pages/addon-universal/* 时，
    // 才采用 getActiveAddonPageRoute 登记的逻辑路由。因为桥接页的真实栈是
    // app/pages/addon-universal/index，无法从栈路由得到 /addon/xxx，必须靠登记值。
    //
    // 内置插件页（如 /addon/shop/pages/member/index）是【真实路由】，栈路由已经正确，
    // 必须直接用它，绝不能再走 fromAddon —— 否则会沿用上一个桥接插件残留的登记值，
    // 导致命名空间错乱（例如登录页误用 shop.pages.member.index）。
    const isBridgeStack = !!stackRoute && stackRoute.includes('/app/pages/addon-universal')

    if (fromAddon && isBridgeStack) return normalizeRoutePath(fromAddon)

    if (stackRoute) return stackRoute
    if (locRoute) return locRoute

    const inst = getCurrentInstance()
    const fromRouter = inst?.appContext.config.globalProperties.$route?.path as string | undefined
    if (fromRouter) return normalizeRoutePath(fromRouter)

    return '/'
}

/** 从路由解析 addon/app 语言包 fileKey */
export function parseLocaleFileKey(path: string): {
    file: string
    fileKey: string
    route: string
} {
    try {
        const normalized = normalizeRoutePath(path).replace(/^\//, '')
        if (!normalized) {
            return { file: 'pages.index.index', fileKey: 'pages.index.index', route: 'app' }
        }

        const parts = normalized.split('/').filter(Boolean)

        if (parts[0] === 'app') {
            const rest = parts.slice(1).join('/')
            const file = rest ? rest.replace(/\//g, '.') : 'pages.index.index'
            return { file, fileKey: file, route: 'app' }
        }

        if (parts[0] === 'addon' && parts.length >= 3) {
            const route = parts[1]
            const rest = parts.slice(2).join('/')
            const file = rest.replace(/\//g, '.')
            return { file, fileKey: `${route}.${file}`, route }
        }

        return { file: 'pages.index.index', fileKey: 'pages.index.index', route: 'app' }
    } catch {
        return { file: 'pages.index.index', fileKey: 'pages.index.index', route: 'app' }
    }
}
