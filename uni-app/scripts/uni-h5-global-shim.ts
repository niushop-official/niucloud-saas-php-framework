/**
 * H5 分构建：addon 内 uni API 须委托给 Core 已初始化的 globalThis.uni，
 * 否则 navigateTo / setNavigationBarTitle 等会访问未挂载 $router 的副本运行时。
 * 
 * 补充：Vite lib 模式下 export * 的 tree-shaking 可能丢失部分 API 实现，
 * 因此显式 delegate 所有常用 API，保证插件运行时使用框架的 live uni 实例。
 */
export * from '@dcloudio/uni-h5/dist/uni-h5.es.js'

type G = typeof globalThis & {
    uni: UniApp.Uni
    getCurrentPages?: () => UniApp.Page[]
}

function coreUni() {
    return (globalThis as G).uni
}

function delegate<K extends keyof UniApp.Uni>(name: K) {
    return (...args: any[]) => (coreUni()[name] as (...a: any[]) => any)(...args)
}

// ---- 导航 API ----
export const navigateTo = delegate('navigateTo')
export const redirectTo = delegate('redirectTo')
export const reLaunch = delegate('reLaunch')
export const switchTab = delegate('switchTab')
export const navigateBack = delegate('navigateBack')
export const setNavigationBarTitle = delegate('setNavigationBarTitle')
export const setNavigationBarColor = delegate('setNavigationBarColor')
export const showNavigationBarLoading = delegate('showNavigationBarLoading')
export const hideNavigationBarLoading = delegate('hideNavigationBarLoading')

// ---- 系统信息 API (lib 模式下可能 tree-shake 丢失) ----
export const getSystemInfoSync = () => coreUni().getSystemInfoSync()
export const getSystemInfo = delegate('getSystemInfo')
export const getWindowInfo = delegate('getWindowInfo')

// ---- 存储 API ----
export const getStorageSync = (key: string) => coreUni().getStorageSync(key)
export const getStorage = delegate('getStorage')
export const setStorageSync = (key: string, data: any) => coreUni().setStorageSync(key, data)
export const setStorage = delegate('setStorage')
export const removeStorageSync = (key: string) => coreUni().removeStorageSync(key)
export const removeStorage = delegate('removeStorage')

// ---- UI 交互 API ----
export const showToast = delegate('showToast')
export const hideToast = delegate('hideToast')
export const showLoading = delegate('showLoading')
export const hideLoading = delegate('hideLoading')
export const showModal = delegate('showModal')

// ---- 页面相关 ----
export function getCurrentPages() {
    const g = globalThis as G
    if (typeof g.getCurrentPages === 'function') return g.getCurrentPages()
    return coreUni().getCurrentPages()
}

export function getApp() {
    const g = globalThis as G & { getApp?: () => { $vm?: unknown } }
    if (typeof g.getApp === 'function') {
        const app = g.getApp()
        if (app) return app
    }
    return { $vm: undefined } as ReturnType<NonNullable<G['getApp']>>
}

// ---- 网络请求 ----
export const request = delegate('request')
export const uploadFile = delegate('uploadFile')
export const downloadFile = delegate('downloadFile')
