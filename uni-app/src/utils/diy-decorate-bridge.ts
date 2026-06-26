/**
 * H5 装修预览：App 启动时注册 postMessage，避免 addon 异步加载错过 admin 推送
 */
import useDiyStore from '@/app/stores/diy'

let listenerBound = false

export function isDecoratePreviewUrl(): boolean {
    // #ifdef H5
    if (typeof window === 'undefined') return false
    return /[?&]mode=decorate(?:&|$|#)/.test(window.location.href)
    // #endif
    // #ifndef H5
    return false
    // #endif
}

export function isInAdminIframe(): boolean {
    // #ifdef H5
    if (typeof window === 'undefined') return false
    try {
        return window.parent !== window
    } catch {
        return false
    }
    // #endif
    // #ifndef H5
    return false
    // #endif
}

function applyComponentStyles(items: any[]) {
    if (!items?.length) return
    items.forEach((item) => {
        item.pageStyle = ''
        item.componentIsShow = true
        if (item.pageStartBgColor) {
            if (item.pageStartBgColor && item.pageEndBgColor) {
                item.pageStyle += `background:linear-gradient(${ item.pageGradientAngle },${ item.pageStartBgColor },${ item.pageEndBgColor });`
            } else {
                item.pageStyle += 'background-color:' + item.pageStartBgColor + ';'
            }
        }
        if (item.margin) {
            if (item.margin.top > 0) {
                item.pageStyle += 'padding-top:' + item.margin.top * 2 + 'rpx;'
            } else {
                item.pageStyle += 'padding-top:2rpx;'
            }
            item.pageStyle += 'padding-bottom:' + item.margin.bottom * 2 + 'rpx;'
            item.pageStyle += 'padding-right:' + item.margin.both * 2 + 'rpx;'
            item.pageStyle += 'padding-left:' + item.margin.both * 2 + 'rpx;'
        }
    })
}

function applyDecoratePayload(raw: Record<string, unknown>) {
    const diyStore = useDiyStore()
    if (raw.pageMode !== undefined) diyStore.pageMode = raw.pageMode as string
    if (raw.currentIndex !== undefined) diyStore.currentIndex = raw.currentIndex as number
    if (raw.global) diyStore.global = raw.global as typeof diyStore.global
    if (raw.value) diyStore.value = raw.value as typeof diyStore.value
    applyComponentStyles(diyStore.value)
}

/** App.onLaunch 调用：尽早监听 admin 推送的装修数据 */
export function ensureDiyDecorateBridge() {
    // #ifdef H5
    if (listenerBound) return
    listenerBound = true

    const diyStore = useDiyStore()
    // 仅 URL 带 mode=decorate 时预设装修模式；普通 iframe 预览（如 diy/index、member）仍走接口拉数
    if (isDecoratePreviewUrl()) {
        diyStore.mode = 'decorate'
    }

    window.addEventListener('message', (event) => {
        try {
            let data: Record<string, unknown>
            if (typeof event.data === 'string') {
                data = JSON.parse(event.data)
            } else if (typeof event.data === 'object' && event.data) {
                data = event.data as Record<string, unknown>
            } else {
                return
            }
            if (data.type) return
            if (!data.global && !data.value) return

            diyStore.mode = 'decorate'
            applyDecoratePayload(data)
        } catch (e) {
            console.log('uni-app diy decorate bridge', e)
        }
    }, false)
    // #endif
}

/** 页面 onShow 通知 admin 建立连接 */
export function notifyAdminDecorateReady() {
    // #ifdef H5
    ensureDiyDecorateBridge()
    window.parent.postMessage(JSON.stringify({
        type: 'init',
        load: true
    }), '*')
    // #endif
}

export function resolveDecorateMode(option: Record<string, unknown> = {}): string {
    if (option.mode) return String(option.mode)

    // #ifdef H5
    const pages = getCurrentPages() as Array<{ options?: Record<string, unknown> }>
    const page = pages[pages.length - 1]
    if (page?.options?.mode) return String(page.options.mode)
    if (isDecoratePreviewUrl()) return 'decorate'
    // #endif

    return ''
}
