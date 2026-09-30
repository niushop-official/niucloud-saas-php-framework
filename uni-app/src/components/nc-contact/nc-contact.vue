<template>
    <view class="contact-wrap" @click.stop="onWrapClick">
        <slot></slot>
        <!-- 仅「小程序客服 / 不启用」在微信小程序里盖官方客服按钮；自建/企微/第三方/电话走点击中转 -->
        <!-- #ifdef MP-WEIXIN -->
        <button
            v-if="useNativeContact"
            type="default"
            hover-class="none"
            open-type="contact"
            class="contact-button"
            :send-message-title="props.sendMessageTitle"
            :send-message-path="props.sendMessagePath"
            :send-message-img="props.sendMessageImg"
            :show-message-card="true"
            @contact="handleContact"
        ></button>
        <!-- #endif -->

        <u-popup :show="popupShow" @close="popupShow = false" mode="center" :round="5" :safeAreaInsetBottom="false">
            <view @touchmove.prevent.stop>
                <view class="py-[25rpx] text-sm leading-none border-0 border-solid border-b-[2rpx] border-[#eee] flex items-center justify-between">
                    <text class="ml-[30rpx]">联系客服</text>
                    <text class="mr-[20rpx] nc-iconfont nc-icon-guanbiV6xx text-[35rpx]" @click="popupShow = false"></text>
                </view>
                <view class="px-6 py-3 w-[480rpx] h-[100rpx] text-sm" v-if="displayPhone">
                    <view class="mb-[10rpx]">客服电话</view>
                    <view @click="callPhone" class="text-primary truncate">{{ displayPhone }}</view>
                </view>
                <view class="px-6 py-3 w-[480rpx] h-[100rpx] leading-[100rpx] text-sm" v-else>抱歉，商家暂无客服，请线下联系</view>
                <button @click="popupShow = false" class="!mx-[30rpx] !mb-[40rpx] !w-auto !h-[70rpx] text-[24rpx] leading-[70rpx] rounded-full text-white !bg-[#ff4500] !text-[#fff]">我知道了</button>
            </view>
        </u-popup>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import useSystemStore from '@/stores/system'
import { redirect } from '@/utils/common'
import { getChannelSetting } from '@/app/api/system'

const props = defineProps({
    sendMessageTitle: {
        type: String,
        default: ''
    },
    sendMessagePath: {
        type: String,
        default: ''
    },
    sendMessageImg: {
        type: String,
        default: ''
    }
})

const systemStore = useSystemStore()

/** 渠道设置缓存：同页多个客服入口只请求一次 */
let channelSettingCache: any = null
let channelSettingLoading: Promise<any> | null = null

const channelSetting = ref<any>({})
const popupShow = ref(false)
const settingReady = ref(false)

const siteInfo: any = computed(() => systemStore.site)

const currentChannel = computed(() => {
    // #ifdef MP-WEIXIN
    return channelSetting.value.weapp || {}
    // #endif
    // #ifndef MP-WEIXIN
    return channelSetting.value.h5 || {}
    // #endif
})

const shopCustomerInstalled = computed(() => {
    const site: any = systemStore.site || {}
    const keys: string[] = []
    ;[...(site.apps || []), ...(site.site_addons || [])].forEach((item: any) => {
        item?.key && keys.push(item.key)
    })
    if (typeof site.app == 'string' && site.app) keys.push(...site.app.split(','))
    return keys.includes('shop_customer')
})

/** none 不启用 | self 自建 | weapp 小程序客服 | work_weixin 企微 | third 第三方 | phone 电话 */
const channelType = computed(() => {
    const type = currentChannel.value.type || 'none'
    if (type == 'self' && !shopCustomerInstalled.value) return 'none'
    return type
})

const channelPhone = computed(() => currentChannel.value.phone || '')
const displayPhone = computed(() => channelPhone.value || siteInfo.value?.phone || '')

/** 小程序原生客服按钮：仅 weapp；none 在小程序也保留原交互 */
const useNativeContact = computed(() => ['weapp', 'none'].includes(channelType.value))

const ensureChannelSetting = () => {
    if (channelSettingCache) {
        channelSetting.value = channelSettingCache
        settingReady.value = true
        return Promise.resolve(channelSettingCache)
    }
    if (!channelSettingLoading) {
        channelSettingLoading = getChannelSetting().then((res: any) => {
            channelSettingCache = res.data || {}
            channelSetting.value = channelSettingCache
            settingReady.value = true
            return channelSettingCache
        }).catch(() => {
            channelSettingCache = {}
            channelSetting.value = {}
            settingReady.value = true
            return {}
        }).finally(() => {
            channelSettingLoading = null
        })
    }
    return channelSettingLoading
}

const openWorkWeixin = (link: string) => {
    if (!link) {
        uni.showToast({ title: '商家未配置企微客服链接', icon: 'none' })
        return
    }
    // #ifdef H5
    window.location.href = link
    return
    // #endif

    // #ifdef MP-WEIXIN
    const corpId = currentChannel.value.corp_id || currentChannel.value.corpid || ''
    // @ts-ignore
    if (corpId && typeof wx !== 'undefined' && typeof wx.openCustomerServiceChat === 'function') {
        // @ts-ignore
        wx.openCustomerServiceChat({
            extInfo: { url: link },
            corpId,
            showMessageCard: true,
            sendMessageTitle: props.sendMessageTitle,
            sendMessagePath: props.sendMessagePath,
            sendMessageImg: props.sendMessageImg,
            fail: () => redirect({ url: link })
        })
        return
    }
    redirect({ url: link })
    return
    // #endif

    redirect({ url: link })
}

const callPhone = () => {
    if (!displayPhone.value) {
        popupShow.value = true
        return
    }
    uni.makePhoneCall({
        phoneNumber: String(displayPhone.value),
        fail: () => {
            popupShow.value = true
        }
    })
}

/** 按渠道类型跳转（与 member/contact 同源） */
const dispatchByChannel = () => {
    switch (channelType.value) {
        case 'weapp':
            // 小程序原生客服由透明 button 处理，此处不重复
            break
        case 'none':
            // #ifdef MP-WEIXIN
            // 与 weapp 相同：走原生客服按钮
            // #endif
            // #ifndef MP-WEIXIN
            popupShow.value = true
            // #endif
            break
        case 'self':
            // 自建客服：直接进聊天页；未登录且关闭匿名时由聊天页内引导登录并回跳
            redirect({ url: '/addon/shop_customer/pages/chat' })
            break
        case 'work_weixin':
            openWorkWeixin(currentChannel.value.work_weixin_link || '')
            break
        case 'third': {
            const link = currentChannel.value.third_link || ''
            if (link) {
                redirect({ url: link })
            } else {
                uni.showToast({ title: '商家未配置第三方客服链接', icon: 'none' })
            }
            break
        }
        case 'phone':
            if (channelPhone.value) {
                callPhone()
            } else {
                popupShow.value = true
            }
            break
        default:
            // #ifndef MP-WEIXIN
            popupShow.value = true
            // #endif
            break
    }
}

const onWrapClick = async () => {
    await ensureChannelSetting()
    // 原生客服：点击由覆盖按钮接管，wrap 上的 click 在部分机型仍会触发，原生类型直接 return
    if (useNativeContact.value) {
        // #ifndef MP-WEIXIN
        popupShow.value = true
        // #endif
        return
    }
    dispatchByChannel()
}

const handleContact = (e: any) => {
    if (e.detail && e.detail.path) {
        redirect({ mode: 'redirectTo', url: e.detail.path, param: e.detail.query || {} })
    }
}

onMounted(() => {
    ensureChannelSetting()
})

defineExpose({})
</script>

<style lang="scss" scoped>
.contact-wrap {
    width: 100%;
    height: 100%;
    position: relative;

    .contact-button {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 5;
        padding: 0;
        margin: 0;
        opacity: 0;
        overflow: hidden;
    }
}
</style>
