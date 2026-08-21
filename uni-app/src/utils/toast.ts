import useToastStore from '@/stores/toast'

/** 超过该字数且 icon 为 none 时走自定义多行 toast */
export const TOAST_CUSTOM_LENGTH = 20

type ToastOptions = UniNamespace.ShowToastOptions

const originalShowToast = uni.showToast.bind(uni)
const originalHideToast = uni.hideToast.bind(uni)
const originalShowLoading = uni.showLoading?.bind(uni)

let patched = false

function normalizeOptions(options: ToastOptions | string): ToastOptions {
    if (typeof options === 'string') {
        return { title: options, icon: 'none' }
    }
    return options || { title: '' }
}

/**
 * 是否走自定义 toast：icon 为 none（或未传按 none 语义的纯文案）且文案超过阈值
 * success / error / loading / 短文案仍走原生
 */
export function shouldUseCustomToast(options: ToastOptions): boolean {
    const title = String(options?.title ?? '')
    const icon = options?.icon || 'success'
    if (icon === 'loading' || icon === 'success' || icon === 'error') {
        return false
    }
    // icon: none 或仅长文案场景
    if (icon !== 'none') {
        return false
    }
    return title.length > TOAST_CUSTOM_LENGTH
}

function resolveDuration(options: ToastOptions, title: string): number {
    if (typeof options.duration === 'number' && options.duration > 0) {
        return options.duration
    }
    // 长文案默认多停一会
    return Math.min(4000, 1500 + Math.ceil(title.length / 10) * 400)
}

export function installToastPatch() {
    if (patched) return
    patched = true

    uni.showToast = ((options: ToastOptions) => {
        const opts = normalizeOptions(options)
        const title = String(opts.title ?? '')

        if (!shouldUseCustomToast(opts)) {
            return originalShowToast(opts)
        }

        let store: ReturnType<typeof useToastStore>
        try {
            store = useToastStore()
        } catch (e) {
            return originalShowToast(opts)
        }

        // 主包 layout 未挂载时降级原生，保证至少有提示
        if (!store.hasHost) {
            return originalShowToast(opts)
        }

        try {
            originalHideToast()
            uni.hideLoading?.()
        } catch (e) {}

        store.show({
            title,
            duration: resolveDuration(opts, title),
            mask: !!opts.mask
        })

        opts.success?.({ errMsg: 'showToast:ok' } as any)
        opts.complete?.({ errMsg: 'showToast:ok' } as any)
    }) as typeof uni.showToast

    uni.hideToast = ((options?: UniNamespace.HideToastOptions) => {
        try {
            useToastStore().hide()
        } catch (e) {}
        return originalHideToast(options as any)
    }) as typeof uni.hideToast

    // 与原生一致：loading 出现时关掉自定义 toast
    if (originalShowLoading) {
        uni.showLoading = ((options: UniNamespace.ShowLoadingOptions) => {
            try {
                useToastStore().hide()
            } catch (e) {}
            return originalShowLoading(options)
        }) as typeof uni.showLoading
    }
}

export { originalShowToast, originalHideToast }
