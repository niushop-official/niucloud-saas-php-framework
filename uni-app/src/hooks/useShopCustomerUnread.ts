import { ref, computed, watch } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import useSystemStore from '@/stores/system'
import useMemberStore from '@/stores/member'
import useDiyStore from '@/app/stores/diy'
import request from '@/utils/request'

/**
 * 站点是否安装了 shop_customer 插件（未安装则禁止请求相关接口，避免 404）
 * 放在主包 hooks：各业务分包可安全引用，不依赖跨分包组件路径
 */
export function isShopCustomerInstalled(): boolean {
    const systemStore = useSystemStore()
    const siteInfo: any = systemStore.site || {}
    const keys: string[] = []

    ;[...(siteInfo.apps || []), ...(siteInfo.site_addons || [])].forEach((item: any) => {
        if (typeof item === 'string') keys.push(item)
        else if (item?.key) keys.push(item.key)
    })
    if (typeof siteInfo.app == 'string' && siteInfo.app) {
        keys.push(...siteInfo.app.split(','))
    }

    const siteApps: any = systemStore.siteApps
    if (typeof siteApps === 'string' && siteApps) {
        keys.push(...siteApps.split(','))
    } else if (Array.isArray(siteApps)) {
        siteApps.forEach((k: any) => {
            if (typeof k === 'string') keys.push(k)
            else if (k?.key) keys.push(k.key)
        })
    }
    if (Array.isArray(systemStore.siteAddons)) {
        keys.push(...systemStore.siteAddons.filter(Boolean) as string[])
    }

    return keys.includes('shop_customer')
}

/**
 * 客服入口未读红点
 * - 未安装插件 / 装修态 / 未登录：不请求，计数为 0
 * - 接口：GET shop_customer/unread_count → data.count
 */
export function useShopCustomerUnread(options?: { autoOnShow?: boolean }) {
    const kefuUnread = ref(0)
    const diyStore = useDiyStore()
    const systemStore = useSystemStore()
    const memberStore = useMemberStore()
    const userInfo = computed(() => memberStore.info)

    const loadKefuUnread = async () => {
        if (diyStore.mode == 'decorate' || !isShopCustomerInstalled() || !userInfo.value) {
            kefuUnread.value = 0
            return
        }
        try {
            const res: any = await request.get('shop_customer/unread_count')
            kefuUnread.value = Number(res.data?.count) || 0
        } catch {
            kefuUnread.value = 0
        }
    }

    if (options?.autoOnShow !== false) {
        onShow(() => {
            loadKefuUnread()
        })
    }

    // 小程序组件 onShow 不稳定；站点 init / 登录态晚于 onMounted 时补拉一次
    watch(
        () => [systemStore.site, systemStore.initStatus, userInfo.value] as const,
        () => {
            if (systemStore.initStatus === 'finish' && userInfo.value && isShopCustomerInstalled()) {
                loadKefuUnread()
            }
        },
        { immediate: true }
    )

    return { kefuUnread, loadKefuUnread, isShopCustomerInstalled }
}
