<template>
    <view class="min-h-[100vh]" :style="themeColor()">
        <!-- 仅「不启用 / 小程序客服」留在本页；其余类型拉完配置后自动中转 -->
        <view v-if="pageReady" class="contact-wrap pt-[45%]">
            <image :src="img('static/resource/images/member/contact_service.jpg')" mode="widthFix" />
            <view class="mt-[100rpx] text-[28rpx]">欢迎您联系我们，提供您宝贵的意见！</view>

            <!-- 不启用/小程序客服：维持原有交互（小程序 open-type=contact 需用户点击） -->
            <nc-contact
                v-if="isOriginal"
                :send-message-title="sendMessageTitle"
                :send-message-path="sendMessagePath"
                :send-message-img="sendMessageImg">
                <button type="primary" class="btn-wrap font-500">{{ t('customerService') }}</button>
            </nc-contact>

            <!-- 中转失败回落时，允许手动再试 -->
            <button v-else type="primary" class="btn-wrap font-500" @click="dispatchByChannel">{{ t('customerService') }}</button>
        </view>

        <!-- 电话联系弹窗（无号码或拨号失败时展示） -->
        <u-popup :show="phonePopupShow" @close="phonePopupShow = false" mode="center" :round="5" :safeAreaInsetBottom="false">
            <view @touchmove.prevent.stop>
                <view class="py-[25rpx] text-sm leading-none border-0 border-solid border-b-[2rpx] border-[#eee] flex items-center justify-between">
                    <text class="ml-[30rpx]">联系客服</text>
                    <text class="mr-[20rpx] nc-iconfont nc-icon-guanbiV6xx text-[35rpx]" @click="phonePopupShow = false"></text>
                </view>
                <view class="px-6 py-3 w-[480rpx] h-[100rpx] text-sm" v-if="channelPhone">
                    <view class="mb-[10rpx]">客服电话</view>
                    <view @click="callPhone" class="text-primary truncate">{{ channelPhone }}</view>
                </view>
                <view class="px-6 py-3 w-[480rpx] h-[100rpx] leading-[100rpx] text-sm" v-else>抱歉，商家暂无客服，请线下联系</view>
                <button @click="phonePopupShow = false" class="!mx-[30rpx] !mb-[40rpx] !w-auto !h-[70rpx] text-[24rpx] leading-[70rpx] rounded-full text-white !bg-[#ff4500] !text-[#fff]">我知道了</button>
            </view>
        </u-popup>
    </view>
</template>

<script setup lang="ts">
import { t } from '@/locale'
import { img, redirect } from '@/utils/common'
import { computed, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getChannelSetting } from '@/app/api/system'
import useSystemStore from '@/stores/system'

const sendMessageTitle = ref('')
const sendMessagePath = ref('')
const sendMessageImg = ref('')

sendMessageImg.value = img('static/resource/images/member/contact_service.jpg')

const systemStore = useSystemStore()

/** 客服渠道设置（getChannelSetting） */
const channelSetting = ref<any>({})
const phonePopupShow = ref(false)
/** 配置拉取完成且需要留在本页时才展示内容，避免中转前闪一下 */
const pageReady = ref(false)

// 按平台取对应配置段：小程序端用 weapp 段，其余(H5/公众号/App)用 h5 段
const currentChannel = computed(() => {
    // #ifdef MP-WEIXIN
    return channelSetting.value.weapp || {}
    // #endif
    // #ifndef MP-WEIXIN
    return channelSetting.value.h5 || {}
    // #endif
})

// 自建客服依赖 shop_customer 插件，未安装时回退原有交互
// shop_customer 属于应用(apps)而非插件(site_addons)，两个列表的key需合并判断
const shopCustomerInstalled = computed(() => {
    const siteInfo: any = systemStore.site || {}
    const keys: string[] = []
    ;[...(siteInfo.apps || []), ...(siteInfo.site_addons || [])].forEach((item: any) => {
        item?.key && keys.push(item.key)
    })
    // app 为站点原始应用字段(逗号分隔字符串)
    if (typeof siteInfo.app == 'string' && siteInfo.app) keys.push(...siteInfo.app.split(','))
    return keys.includes('shop_customer')
})

// 客服类型 none 不启用 self 自建客服 weapp 小程序客服 work_weixin 企业微信客服 third 第三方客服 phone 电话联系
const channelType = computed(() => {
    const type = currentChannel.value.type || 'none'
    if (type == 'self' && !shopCustomerInstalled.value) return 'none'
    return type
})

const channelPhone = computed(() => currentChannel.value.phone || '')

// 不启用与小程序客服维持原有交互（留在本页）
const isOriginal = computed(() => ['none', 'weapp'].includes(channelType.value))

/** 企业微信客服：H5 直接打开链接；小程序走官方 openCustomerServiceChat，无 corpId 时回退 webview */
const openWorkWeixin = (link: string) => {
    if (!link) {
        uni.showToast({ title: '商家未配置企微客服链接', icon: 'none' })
        pageReady.value = true
        return
    }

    // #ifdef H5 
    // 微信内/普通浏览器均跳转企微客服网页（后台「在微信内网页中接入」）
    window.location.href = link
    return
    // #endif

    // #ifdef MP-WEIXIN
    const corpId = currentChannel.value.corp_id || currentChannel.value.corpid || ''
    // @ts-ignore 微信小程序企微客服 API
    if (corpId && typeof wx !== 'undefined' && typeof wx.openCustomerServiceChat === 'function') {
        // @ts-ignore
        wx.openCustomerServiceChat({
            extInfo: { url: link },
            corpId,
            showMessageCard: true,
            sendMessageTitle: sendMessageTitle.value,
            sendMessagePath: sendMessagePath.value,
            sendMessageImg: sendMessageImg.value,
            fail: () => {
                // 官方 API 失败时回退 webview
                redirect({ url: link })
            }
        })
        return
    }
    // 渠道配置目前仅有链接、无企业 ID：走 webview 打开
    redirect({ url: link })
    return
    // #endif

    // 其它端：统一走 redirect（外链会进 webview / 系统浏览器）
    redirect({ url: link })
}

/** 按渠道类型中转 */
const dispatchByChannel = () => {
    switch (channelType.value) {
        case 'none':
        case 'weapp':
            // 留在本页
            pageReady.value = true
            break
        case 'self':
            // 自建客服：直接进聊天页；未登录且关闭匿名时由聊天页内引导登录并回跳
            // 替换当前页跳转，返回时不回到中转页
            redirect({ url: '/addon/shop_customer/pages/chat', mode: 'redirectTo' })
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
                pageReady.value = true
            }
            break
        }
        case 'phone':
            if (channelPhone.value) {
                callPhone()
            } else {
                phonePopupShow.value = true
            }
            pageReady.value = true
            break
        default:
            pageReady.value = true
            break
    }
}

const getChannelSettingFn = () => {
    pageReady.value = false
    getChannelSetting().then((res: any) => {
        channelSetting.value = res.data || {}
        dispatchByChannel()
    }).catch(() => {
        // 拉取失败：留在本页，走原有交互
        channelSetting.value = {}
        pageReady.value = true
    })
}

// 拨打客服电话
const callPhone = () => {
    if (!channelPhone.value) {
        phonePopupShow.value = true
        return
    }
    uni.makePhoneCall({
        phoneNumber: String(channelPhone.value),
        fail: () => {
            phonePopupShow.value = true
        }
    })
}

onLoad((data: any) => {
    data.send_title && (sendMessageTitle.value = data.send_title)
    data.send_path && (sendMessagePath.value = decodeURIComponent(data.send_path))
    data.send_img && (sendMessageImg.value = decodeURIComponent(data.send_img))
})

onShow(() => {
    getChannelSettingFn()
})
</script>

<style lang="scss" scoped>
.contact-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    image {
        width: 674rpx;
    }

    .btn-wrap {
        margin-top: 60rpx;
        width: 300rpx;
        height: 80rpx;
        font-size: 26rpx;
        border-radius: 100rpx;
        line-height: 80rpx;
        border: 1px solid #dddddd;
        color: #333;
        background: transparent !important;
    }
}
</style>
