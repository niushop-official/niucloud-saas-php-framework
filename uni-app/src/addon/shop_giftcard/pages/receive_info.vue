<template>
    <view class=" min-h-[100vh]" :style="themeColor()">
        <view v-if="Object.keys(detail).length" class="give-info-bg w-full h-[100vh]">
            <view class="pt-[183rpx]">
                <view class="rounded-[var(--rounded-big)] bg-[#fff] mx-[var(--sidebar-m)] px-[82rpx] pb-[140rpx]">
                    <view class="relative w-full h-[125rpx]">
                        <view class="p-[4rpx] bg-[#fff] box-border rounded-[100rpx] w-[200rpx] h-[200rpx] absolute top-[-100rpx] left-[50%] transform -translate-x-1/2">
                            <u-avatar :src="img(detail.member.headimg)" :size="'192rpx'" leftIcon="none" :default-url="img('static/resource/images/default_headimg.png')" />
                        </view>
                    </view>
                    <view class="text-center text-[30rpx] font-500 leading-[42rpx] truncate">{{ detail.member.nickname }}</view>
                    <view class="text-center text-[28rpx] font-500 leading-[39rpx] text-[var(--text-color-light6)] mt-[10rpx] truncate">{{ t('freeForYou') + detail.card_info.giftcard.card_name }}</view>
                    <view class="w-full flex justify-center mt-[60rpx]" @click="toDetail()">
                        <image v-if="detail && detail.card_info && detail.card_info.card_cover" class="w-[546rpx] h-[330rpx] rounded-[var(--rounded-big)]" :src="img(detail.card_info.card_cover)" @error="detail.card_info.card_cover= defaultCard(detail)" :mode="'aspectFill'" />
                        <image v-else class="w-[546rpx] h-[330rpx] rounded-[var(--rounded-big)]" :src="img(defaultCard(detail))" :mode="'aspectFill'" />
                    </view>
                    <view class="text-[28rpx] mx-auto mt-[40rpx] multi-hidden" v-if="detail.blessing">
                        <text class="text-[var(--text-color-light6)] leading-[39rpx] mb-[10rpx]">{{ t('receiveTipsOne') }}：</text>
                        <text class="text-[#333] leading-[39rpx]">{{ detail.blessing }}</text>
                    </view>
                    <view class="mt-[148rpx]">
                        <view v-if="detail.give_num-detail.total_receive_num > detail.limit_num - detail.receive_num ? ((detail.limit_num - detail.receive_num)>1) : ((detail.give_num-detail.total_receive_num)>1)" class="mb-[25rpx] text-[24rpx] text-center leading-[34rpx] !text-[var(--text-color-light9)] ">{{ t('receiveTipsTwo') }}{{ detail.give_num - detail.total_receive_num > detail.limit_num - detail.receive_num ? detail.limit_num - detail.receive_num : detail.give_num - detail.total_receive_num }}{{ t('receiveTipsTwoAnd') }}</view>
                        <button
                            v-if="detail.total_leave_num && (detail.give_num >detail.total_receive_num)  && (detail.limit_num > detail.receive_num)"
                            class="w-full h-[80rpx] font-500 text-[26rpx] leading-[80rpx] !text-[#fff] !bg-[var(--primary-color)] m-0 rounded-[40rpx] remove-border"
                            :class="{'opacity-40':disable}" @click="save">{{ t('GetItNow') }}</button>
                        <button v-else class="w-full h-[80rpx] font-500 text-[26rpx] leading-[80rpx] !text-[var(--text-color-light9)] !bg-[#F7F7F7] m-0 rounded-[40rpx] remove-border">{{ t('alreadyClaimed') }}</button>
                        <view v-if="detail.receive_num" class="mt-[25rpx] text-[24rpx] text-center leading-[34rpx] !text-[var(--text-color-light9)] " @click="tolink">{{ t('seeCardBag') }}</view>
                    </view>
                </view>
            </view>
        </view>
        <uni-popup ref="popupRef" type="center" :is-mask-click="false">
            <view class="bg-[#fff] w-[530rpx] min-h-[504rpx] rounded-[var(--rounded-big)] box-border p-[32rpx] relative" :style="{'background-image':'url('+img('addon/shop_giftcard/popup_bg.png')+')',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'top',}">
                <image class="w-[327rpx] h-[327rpx] rounded-[var(--rounded-mid)] absolute left-[50%] top-[-163.5rpx] transform -translate-x-1/2 z-10" :src="img('addon/shop_giftcard/popup_top.png')" :mode="'aspectFill'" />
                <view class="text-[40rpx] leading-[56rpx] font-bold text-center pt-[174rpx]">{{ t('popupTipsOne') }}</view>
                <view class="text-[24rpx] leading-[34rpx] text-center mt-[30rpx]">{{ t('popupTipsTwo') }}</view>
                <button class="w-[370rpx] h-[80rpx] font-500 text-[26rpx] leading-[80rpx] !text-[#fff] primary-btn-bg m-0 !mx-auto rounded-[40rpx] remove-border mt-[90rpx]" @click="tolink">{{ t('gouToSee') }}</button>
                <view class="nc-iconfont nc-icon-cuohaoV6xx text-[57rpx] text-[#fff] absolute left-[50%] bottom-[-117rpx] transform -translate-x-1/2 z-10" @click="close"></view>
            </view>
        </uni-popup>
        <!-- 强制绑定手机号 -->
        <bind-mobile ref="bindMobileRef" />
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { redirect, img, handleOnloadParams, goback } from '@/utils/common';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { ref, reactive, computed } from 'vue';
import { t } from '@/locale';
import { getCardGiveInfo, receiveCard } from '@/addon/shop_giftcard/api/card';
import { useLogin } from '@/hooks/useLogin'
import useMemberStore from '@/stores/member'
import bindMobile from '@/components/bind-mobile/bind-mobile.vue';

// 会员信息
const memberStore = useMemberStore()
const userInfo = computed(() => memberStore.info)

const detail = ref({})
const loading = ref(true)
const disable = ref(false)
const give_id = ref('')

//强制绑定手机号
const bindMobileRef: any = ref(null)
const isBindMobile = ref(uni.getStorageSync('isBindMobile'))
onLoad((option: any) => {
    // #ifdef MP-WEIXIN
    // 处理小程序场景值参数
    option = handleOnloadParams(option);
    // #endif

    if (!option.give_id) {
        let parameter = {
            url: '/addon/shop_giftcard/pages/index',
            title: t('notCard'),
            mode: 'reLaunch'
        };
        goback(parameter)
    } else {
        give_id.value = option.give_id
        getCardGiveInfoFn(option.give_id)
    }
})

onShow(() => {
    if (Object.keys(detail.value).length) getCardGiveInfoFn(give_id.value)
})

const getCardGiveInfoFn = (give_id: any) => {
    loading.value = true
    getCardGiveInfo(give_id).then((res) => {
        if (res.data.give_status == 'receive_finish') {
            let parameter = {
                url: '/addon/shop_giftcard/pages/index',
                title: res.data.message,
                mode: 'reLaunch'
            };
            goback(parameter)
        } else {
            detail.value = res.data
        }

        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}
const popupRef = ref()
const save = () => {

    // #ifdef H5
    // 绑定手机号
    if (!userInfo.value && uni.getStorageSync('isBindMobile')) {
        uni.setStorage({
            key: 'loginBack', data: {
                url: '/addon/shop_giftcard/pages/receive_info',
                param: { give_id: give_id.value }
            }
        })
        bindMobileRef.value.open()
        return false
    }
    // #endif

    // 检测是否登录
    if (!userInfo.value) {
        useLogin().setLoginBack({
            url: '/addon/shop_giftcard/pages/receive_info',
            param: { give_id: give_id.value }
        })
        return false
    }

    if (disable.value || loading.value) return
    disable.value = true
    receiveCard({ give_id: give_id.value }).then((res: any) => {
        if (res.data) {
            popupRef.value.open()
        }
        disable.value = false
    }).catch(() => {
        disable.value = false
    })
}
const tolink = () => {
    popupRef.value.close()
    redirect({ url: '/addon/shop_giftcard/pages/my_card_list', mode: 'redirectTo' })
}

const toDetail = () => {
    if (detail.value && detail.value.to_have == 'my') {
        redirect({
            url: '/addon/shop_giftcard/pages/card_bag',
            param: { card_bag_id: detail.value.card_bag_id },
            mode: 'redirectTo'
        });
    }
}

const close = () => {
    popupRef.value.close()
    getCardGiveInfoFn(give_id.value)
}

const defaultCard = (data: any) => {
    let imgUrl = '';
    let giftcardData = data.card_info.giftcard;
    if (giftcardData.card_right_type == 'balance') {
        imgUrl = 'addon/shop_giftcard/diy/index/value_card.jpg';
    } else {
        imgUrl = 'addon/shop_giftcard/diy/index/redemption_card.jpg';
    }
    return imgUrl;
}
</script>

<style lang="scss" scoped>
.give-info-bg {
    background-color: #f6f6f6;
}

:deep(view[name="content"]) {
    transform: scaleX(1) scaleY(1) !important;
}
</style>
