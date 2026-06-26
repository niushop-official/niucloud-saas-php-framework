import { RouteRecordRaw, RouterView } from 'vue-router'
import Default from '@/layout/index.vue'
import Decorate from '@/layout/decorate/index.vue'
import { loadAddonView } from '@/utils/addon-loader'

// 静态路由
export const STATIC_ROUTES: Array<RouteRecordRaw> = [
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/app/views/error/404.vue')
    }
]

// 免登录路由
export const NO_LOGIN_ROUTES: string[] = [
    '/404'
]

// 根路由
export const ROOT_ROUTER: RouteRecordRaw = {
    path: '/',
    component: Default,
    name: Symbol()
}

// 平台端根路由
export const ADMIN_ROUTE: RouteRecordRaw = {
    path: '/admin',
    name: 'admin',
    children: [
        {
            path: '',
            name: 'adminRoot',
            component: Default,
            children: []
        },
        {
            path: 'login',
            meta: {
                type: 1,
                title: '用户登录'
            },
            component: () => import('@/app/views/login/index.vue')
        }
    ]
}

// HOME端根路由
export const HOME_ROUTE: RouteRecordRaw = {
    path: '/home',
    name: 'home',
    children: [
        {
            path: '',
            name: 'homeRoot',
            component: Default
        },
        {
            path: 'index',
            name: 'homeIndex',
            meta: {
                type: 1,
                title: '站点管理'
            },
            component: () => import('@/app/views/home/index.vue')
        }
    ]
}

// 站点端根路由
export const SITE_ROUTE: RouteRecordRaw = {
    path: '/site',
    name: 'site',
    children: [
        {
            path: '',
            name: 'siteRoot',
            component: Default,
            children: []
        },
        {
            path: 'wxoplatform/callback',
            name: 'wxoplatform_callback',
            meta: {
                type: 1,
                title: '微信公众号平台授权'
            },
            component: () => import('@/app/views/index/wxoplatform_callback.vue')
        },
        {
            path: 'login',
            meta: {
                type: 1,
                title: '用户登录'
            },
            component: () => import('@/app/views/login/index.vue')
        }
    ]
}

export const DECORATE_ROUTER: RouteRecordRaw = {
    path: '/decorate',
    component: Decorate,
    name: 'decorate',
    children: []
}

const modules = import.meta.glob('../app/views/**/*.vue')
// 开发环境：直接用 import.meta.glob 从源码加载所有插件视图（无需 manifest）
const addonModules = import.meta.glob('../addon/**/views/**/*.vue')

interface Route {
    menu_name: string,
    menu_short_name: string,
    router_path: string,
    view_path: string
    menu_type: number,
    menu_key: string,
    icon?: {
        name: string,
        type: string
    },
    children?: [],
    auth?:[],
    is_show: boolean,
    app_type: string,
    addon: string,
    menu_attr ?:  String
}

/**
 * 创建路由
 * @param route
 * @param parentRoute
 */
const createRoute = function (route: Route, parentRoute: RouteRecordRaw | null = null): RouteRecordRaw {
    const record: RouteRecordRaw = {
        path: `/${ route.app_type }/${ route.router_path }`,
        name: route.menu_key,
        meta: {
            title: route.menu_name,
            short_title: route.menu_short_name,
            icon: route.icon,
            type: route.menu_type,
            show: route.is_show,
            app: route.app_type,
            view: route.view_path,
            addon: route.addon,
            attr: route.menu_attr,
            parent_route: parentRoute ? parentRoute.meta : parentRoute,
            sort: route.sort,
            componentName: route.menu_key
        }
    }
    if (route.menu_type == 1) {
        if (route.addon) {
            // view_path 优先，为空时 fallback 用 router_path
            let viewPath = route.view_path
            if (!viewPath && route.router_path) {
                viewPath = route.router_path
            }
            if (viewPath) {
                if (import.meta.env.DEV) {
                    // 开发环境：直接用 import.meta.glob 从源码加载（无需 addon-loader/manifest）
                    record.component = addonModules[`../addon/${route.addon}/views/${viewPath}.vue`]
                } else {
                    // 生产环境：通过编译产物的 addon-loader 加载
                    record.component = loadAddonView(route.addon, viewPath)
                }
            }
            // 无 viewPath 且无 router_path → 不设 component，作为容器路由，
            // 其 children（由 formatRouters 递归创建）通过父级 <RouterView> 渲染
        } else {
            record.component = modules[`../app/views/${ route.view_path }.vue`]
        }
    }
    return record
}

/**
 * 格式化路由
 * @param routes
 * @param parentRoute
 */
export function formatRouters(routes: Route[], parentRoute: RouteRecordRaw | null = null) {
    return routes.map((route) => {
        const routeRecord = createRoute(route, parentRoute)
        if (route.children != null && route.children && route.children.length) {
            routeRecord.children = formatRouters(route.children, routeRecord)
        }
        return routeRecord
    })
}

/**
 * 获取首条有效路由
 * @param routes
 * @returns
 */
export function findFirstValidRoute(routes: RouteRecordRaw[]): string | undefined {
    for (const route of routes) {
        if (route.meta?.type == 1 && route.meta?.show) {
            return route.name as string
        }
        if (route.children) {
            const name = findFirstValidRoute(route.children)
            if (name) {
                return name
            }
        }
    }
}

/**
 * 获取按钮权限
 * @param routes
 * @param rules
 */
export function findRules(routes: Route[], rules :string[] = []) : string[] {
    let resultRules = [...rules]
    for (const route of routes) {
        if (route.auth && Array.isArray(route.auth)) {
            resultRules = resultRules.concat(route.auth)
        }
        if (route.children) {
            resultRules = findRules(route.children, resultRules)
        }
    }
    return resultRules
}
