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

/** t() 使用的当前路由（优先 addon 桥接页登记的 fullRoute） */
export function resolveLocaleRoutePath(): string {
    const fromAddon = getActiveAddonPageRoute()
    if (fromAddon) return normalizeRoutePath(fromAddon)

    const inst = getCurrentInstance()
    const fromRouter = inst?.appContext.config.globalProperties.$route?.path as string | undefined
    if (fromRouter) return normalizeRoutePath(fromRouter)

    const fromUni = getUniPageRoute()
    if (fromUni && fromUni !== '/') return fromUni

    if (typeof window !== 'undefined' && window.location?.pathname) {
        return normalizeRoutePath(window.location.pathname)
    }

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
