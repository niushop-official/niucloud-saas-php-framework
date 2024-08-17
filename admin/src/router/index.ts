import { createRouter, createWebHistory, RouteLocationRaw, RouteLocationNormalizedLoaded } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { STATIC_ROUTES, NO_LOGIN_ROUTES, ROOT_ROUTER, ADMIN_ROUTE, HOME_ROUTE, SITE_ROUTE, findFirstValidRoute } from './routers'
import { language } from '@/lang'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import { setWindowTitle, getAppType, urlToRouteRaw } from '@/utils/common'

// 加载插件中定义的router
const ADDON_ROUTE = []
const addonRoutes = import.meta.globEager('@/addon/**/router/index.ts')
for (const key in addonRoutes) {
    const addon: any = addonRoutes[key]
    addon.ROUTE && ADDON_ROUTE.push(...addon.ROUTE)
    addon.NO_LOGIN_ROUTES && NO_LOGIN_ROUTES.push(...addon.NO_LOGIN_ROUTES)
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [ADMIN_ROUTE, HOME_ROUTE, SITE_ROUTE, ...STATIC_ROUTES, ...ADDON_ROUTE]
})

/**
 * 重写push方法
 */
const originPush = router.push
router.push = (to: RouteLocationRaw) => {
    const route: any = typeof to == 'string' ? urlToRouteRaw(to) : to
    if (route.path) {
        const paths = route.path.split('/').filter((item: string) => { return item })
        route.path = ['admin', 'site', 'home'].indexOf(paths[0]) == -1 ? `/${getAppType()}${route.path}` : route.path
    }
    return originPush(route)
}

/**
 * 重写resolve方法
 */
const originResolve = router.resolve
router.resolve = (to: RouteLocationRaw, currentLocation?: RouteLocationNormalizedLoaded) => {
    const route: any = typeof to == 'string' ? urlToRouteRaw(to) : to
    if (route.path) {
        const paths = route.path.split('/').filter((item: string) => { return item })
        route.path = ['admin', 'site', 'home'].indexOf(paths[0]) == -1 ? `/${getAppType()}${route.path}` : route.path
    }
    return originResolve(route, currentLocation)
}

// 全局前置守卫
router.beforeEach(async (to: any, from, next) => {
    NProgress.configure({ showSpinner: false })
    NProgress.start()

    to.redirectedFrom && (to.query = to.redirectedFrom.query)

    const userStore = useUserStore()
    const systemStore = useSystemStore()
    const appType = getAppType()
    const title = []

    to.meta.title && title.push(to.meta.title)

    if (!userStore.siteInfo && appType != 'home') {
        await userStore.getSiteInfo()
    }

    // 加载语言包
    await language.loadLocaleMessages(to.meta.addon || '', (to.meta.view || to.path), systemStore.lang);

    let matched: any = to.matched;
    if (matched && matched.length && matched[0].path != '/:pathMatch(.*)*') {
        matched = matched[0].path;
    } else {
        matched = appType
    }

    const loginPath = to.path == '/' ? '/admin/login' : `/${matched == '/admin' ? 'admin' : 'site'}/login`

    if (appType != 'site' || to.path === loginPath) {
        systemStore.website.site_name && title.push(systemStore.website.site_name)
    } else {
        userStore.siteInfo && userStore.siteInfo.site_name && title.push(userStore.siteInfo.site_name)
    }

    // 设置网站标题
    setWindowTitle(title.join('-'))

    // 判断是否需登录
    if (NO_LOGIN_ROUTES.includes(to.path)) {
        next()
    } else if (userStore.token) {
        // 如果已加载路由
        if (userStore.routers.length) {
            if (to.path === loginPath) {
                next(`/${getAppType()}`)
            } else {
                next()
            }
        } else {
            try {
                if (!userStore.siteInfo || userStore.siteInfo.site_id == undefined) {
                    if (to.path === '/home/index') {
                        next()
                    } else {
                        next({ path: '/home/index', replace: true })
                    }
                } else {
                    await userStore.getAuthMenusFn()

                    // 设置首页路由
                    let firstRoute: symbol | string | undefined = findFirstValidRoute(userStore.routers)
                    if (getAppType() != 'admin') {
                        for (let i = 0; i < userStore.siteInfo?.apps.length; i++) {
                            const item = userStore.siteInfo?.apps[i]
                            if (userStore.addonIndexRoute[item.key]) {
                                firstRoute = userStore.addonIndexRoute[item.key]
                                break
                            }
                        }
                    }

                    ROOT_ROUTER.redirect = { name: firstRoute }
                    router.addRoute(ROOT_ROUTER)

                    // 设置应用首页路由
                    if (getAppType() == 'admin') {
                        ADMIN_ROUTE.children[0].redirect = { name: firstRoute }
                        router.addRoute(ADMIN_ROUTE)
                    } else {
                        SITE_ROUTE.children[0].redirect = { name: firstRoute }
                        router.addRoute(SITE_ROUTE)
                    }

                    // 添加动态路由
                    userStore.routers.forEach(route => {
                        if (!route.children) {
                            if (route.meta.app == 'admin') {
                                router.addRoute(ADMIN_ROUTE.children[0].name, route)
                            } else {
                                router.addRoute(SITE_ROUTE.children[0].name, route)
                            }
                            return
                        }

                        // 动态添加可访问路由表
                        if (route.meta.app == 'admin') {
                            router.addRoute(ADMIN_ROUTE.name, route)
                        } else {
                            router.addRoute(SITE_ROUTE.name, route)
                        }
                    })
                    next(to)
                }

            } catch (err) {
                next({ path: loginPath })
            }
        }
    } else {
        if (to.path === loginPath) {
            next()
        } else {
            next({ path: loginPath })
        }
    }
})

// 全局后置钩子
router.afterEach(() => {
    NProgress.done()
})

export default router
