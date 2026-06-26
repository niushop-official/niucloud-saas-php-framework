/**
 * H5 分构建专用 loader（无源码动态 import，供 core 编译使用）
 */
import { defineAsyncComponent, type Component } from 'vue'
import {
    ensureAddonProdReady,
    initAddonManifests,
    isAddonInstalled,
    loadAddonModule,
    preloadAllAddonLocales,
    ensureAddonStyles,
    wapUrl
} from '@/utils/addon-lang'
import { getRegisteredAddonModule } from '@/utils/addon-module-registry'
import { isSplitBuildEnabled } from '@/utils/split-build'
import { wrapAddonPageComponent } from '@/utils/addon-page-lifecycle'
import { i18n } from '@/locale'
import useDiyStore from '@/app/stores/diy'

type PageLoader = () => Promise<{ default: Component | null }>

const emptyDiyLoad = (reason: string, addonKey: string, componentName: string): PageLoader => {
    console.warn('[addon-loader]', reason, addonKey, componentName)
    return async () => ({ default: null })
}

const loadPageNotFound = (): Promise<{ default: Component }> =>
    import('@/components/page-not-found/page-not-found.vue') as Promise<{ default: Component }>

export { isSplitBuildEnabled }

export async function initSplitBuildRuntime() {
    if (!isSplitBuildEnabled()) return
    // addInterceptor 必须同步注册，不能等 await，否则插件页内的导航拦截会遗漏
    registerUniversalAddonRoutes()
    await initAddonManifests()
    await preloadAllAddonLocales((locale, messages) => {
        i18n.global.mergeLocaleMessage(locale, messages)
    })
}

/**
 * 注册通用插件路由导航守卫，使框架能加载未在 pages.json 中预注册的插件页面。
 * 这样任何人开发的插件只需编译后放入 assets/addons/{key}/ 即可被框架动态加载。
 *
 * 为什么不用 router.addRoute()？
 * uni-app H5 有自己的页面系统，不通过 vue-router 的 <router-view> 渲染，
 * router.addRoute() 添加的组件永远不会被渲染。
 * 改用 router.beforeEach 导航守卫拦截未知插件路由，
 * 重定向到 pages.json 中已注册的通用桥接页，通过 onLoad 获取参数。
 */
export function registerUniversalAddonRoutes() {
    // #ifdef H5
    if (!isSplitBuildEnabled()) return

    // 辅助函数：检查路径是否为未知插件路由，是则返回桥接页 URL（含 _orig 用于 URL 还原）
    function bridgeUrl(rawPath: string): string | null {
        const match = rawPath.replace(/^\//, '').match(/^addon\/([^/]+)\/pages\/(.+)$/)
        if (!match) return null
        const pagePath = match[2].split('?')[0] // 去掉可能附带的 query
        // 检查是否已知插件路由
        try {
            const app = getApp() as any
            const router = app?.$router
            if (router) {
                const resolved = router.resolve('/' + match[0])
                if (resolved && resolved.matched && resolved.matched.length > 0) return null
            }
        } catch {}
        // 构建 _orig 保留原始 path + 当前 location.search（装修参数等）
        const origPath = '/' + rawPath.replace(/^\//, '') + (location.search || '')
        return `/app/pages/addon-universal/index?addon=${match[1]}&page=pages/${pagePath}&_orig=${encodeURIComponent(origPath)}`
    }

    // 1. vue-router beforeEach（处理浏览器前进后退等）
    try {
        let router: any = null
        try { router = (getApp() as any)?.$router } catch { /* ignore */ }
        if (!router) {
            try { router = (uni as any)?.$router } catch { /* ignore */ }
        }
        if (router) {
            router.beforeEach((to: any, _from: any, next: any) => {
                if (to.matched && to.matched.length > 0) { next(); return }
                const url = bridgeUrl(to.path)
                if (url) {
                    next({ path: '/app/pages/addon-universal/index', query: urlToQuery(url) })
                } else {
                    next()
                }
            })
        }
    } catch {}

    // 2. 直接 Hook globalThis.uni 的导航方法
    const g = globalThis as any
    function hookNavMethod(name: string) {
        const orig = g.uni?.[name] as Function | undefined
        if (typeof orig !== 'function') {
            console.warn('[addon-loader] cannot hook uni.' + name + ': ' + (g.uni ? 'method missing' : 'uni missing'))
            return
        }
        g.uni[name] = function (args: any) {
            const url = args?.url || ''
            // 装修模式下不拦截导航
            // #ifdef H5
            try {
                const diyStore = useDiyStore()
                if (diyStore && diyStore.mode === 'decorate') {
                    return orig.call(g.uni, args)
                }
            } catch (e) { console.log('[addon-loader] diyStore check error:', e) }
            // #endif
            const resolved = bridgeUrl(url)
            if (resolved) {
                const diyMode = (() => { try { return useDiyStore().mode } catch { return '' } })()
                console.log('[addon-loader] intercept ' + name + ': ' + url + ' (diy=' + diyMode + ')')
                const newArgs = { ...args, url: resolved }
                return orig.call(g.uni, newArgs)
            }
            return orig.call(g.uni, args)
        }
        console.log('[addon-loader] hooked uni.' + name)
    }
    hookNavMethod('navigateTo')
    hookNavMethod('redirectTo')
    hookNavMethod('reLaunch')

    console.log('[addon-loader] universal addon navigation guards registered')
    // #endif
}

// 辅助：从 bridge URL 提取 query 参数
function urlToQuery(url: string) {
    const params = new URLSearchParams(url.split('?')[1] || '')
    const result: Record<string, string> = {}
    params.forEach((v, k) => { result[k] = v })
    return result
}

export function loadAddonPage(addonKey: string, pagePath: string): PageLoader {
    return async () => {
        await ensureAddonProdReady()
        if (!isAddonInstalled(addonKey)) {
            return loadPageNotFound()
        }
        ensureAddonStyles(addonKey)
        const mod = await loadAddonModule(addonKey)
        if (!mod) {
            return loadPageNotFound()
        }
        const pages = mod.pages as Record<string, PageLoader> | undefined
        const loader = pages?.[pagePath]
        if (!loader) {
            console.warn(
                '[addon-loader] pagePath not found:',
                addonKey,
                pagePath,
                'available:',
                Object.keys(pages || {}).slice(0, 20)
            )
            return loadPageNotFound()
        }
        try {
            const pageMod = await loader()
            // Vite 库模式构建时，entry 的 loader 可能用 .then(n => n.i) 提取具名导出，
            // 此时 pageMod 直接就是组件对象（无 .default），需要兼容两种形式
            const comp = pageMod?.default || pageMod
            if (!comp || (typeof comp !== 'object' && typeof comp !== 'function')) {
                console.warn('[addon-loader] empty page export:', addonKey, pagePath)
                return loadPageNotFound()
            }
            return { default: wrapAddonPageComponent(comp, 'page') }
        } catch (e) {
            console.error('[addon-loader] page chunk load failed:', addonKey, pagePath, e)
            return loadPageNotFound()
        }
    }
}

export function loadAddonDiyComponent(addonKey: string, componentName: string): PageLoader {
    return async () => {
        await ensureAddonProdReady()
        if (!isAddonInstalled(addonKey)) {
            return emptyDiyLoad('diy skip, addon not installed', addonKey, componentName)()
        }
        ensureAddonStyles(addonKey)
        const mod = await loadAddonModule(addonKey)
        if (!mod) {
            return emptyDiyLoad('diy skip, addon module missing', addonKey, componentName)()
        }
        const diyMap = mod.diyComponents as Record<string, PageLoader> | undefined
        const loader = diyMap?.[componentName] as PageLoader | undefined
        if (!loader) {
            return emptyDiyLoad(
                'diy skip, component not in map',
                addonKey,
                componentName
            )()
        }
        try {
            const compMod = await loader()
            const comp = compMod?.default || compMod
            if (!comp || (typeof comp !== 'object' && typeof comp !== 'function')) {
                return emptyDiyLoad('diy skip, empty component export', addonKey, componentName)()
            }
            return { default: wrapAddonPageComponent(comp, 'fragment') }
        } catch (err) {
            console.error('[addon-loader] diy chunk load failed:', addonKey, componentName, err)
            return { default: null }
        }
    }
}

export function createAddonPageBridge(addonKey: string, pagePath: string) {
    return defineAsyncComponent(() => loadAddonPage(addonKey, pagePath)())
}

export {
    initAddonManifests,
    preloadAllAddonLocales,
    ensureAddonProdReady,
    ensureAddonStyles,
    wapUrl,
    isAddonInstalled,
    loadAddonModule
}
