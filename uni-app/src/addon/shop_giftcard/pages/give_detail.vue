<template>
    <view class="min-h-[100vh]" :style="themeColor()">
        <view class="give-info-bg w-full h-[100vh]" v-if="Object.keys(detail).length">
            <view class="pt-[183rpx]">
                <view class="rounded-[var(--rounded-big)] bg-[#fff] mx-[var(--sidebar-m)] px-[82rpx] pb-[140rpx]">
                    <view class="relative w-full h-[125rpx]">
                        <view class="p-[4rpx] bg-[#fff] box-border rounded-[100rpx] w-[200rpx] h-[200rpx] absolute top-[-100rpx] left-[50%] transform -translate-x-1/2">
                            <u-avatar :src="img(detail.giveMember.headimg)" :size="'192rpx'" leftIcon="none" :default-url="img('static/resource/images/default_headimg.png')" />
                        </view>
                    </view>
                    <view class="text-center text-[30rpx] font-500 leading-[42rpx] truncate">{{ detail.giveMember.nickname }}</view>
                    <view class="text-center text-[28rpx] font-500 leading-[39rpx] text-[var(--text-color-light6)] mt-[10rpx] truncate">{{ t('giveTipsOne') }}{{ detail.card_info.giftcard.card_name }}</view>
                    <view class="w-full flex justify-center mt-[60rpx]">
                        <image v-if="detail && detail.card_info && detail.card_info.card_cover" class="w-[546rpx] h-[330rpx] rounded-[var(--rounded-big)]" :src="img(detail.card_info.card_cover)" @error="detail.card_info.card_cover= defaultCard(detail)" :mode="'aspectFill'" />
                        <image v-else class="w-[546rpx] h-[330rpx] rounded-[var(--rounded-big)]" :src="img(defaultCard(detail))" :mode="'aspectFill'" />
                    </view>
                    <view class="text-[28rpx] mx-auto mt-[40rpx] multi-hidden" v-if="detail.give.blessing">
                        <text class="text-[var(--text-color-light6)] leading-[39rpx]">{{ t('giveTipsTwo') }}：</text>
                        <text class="text-[#333] leading-[39rpx]">{{ detail.give.blessing }}</text>
                    </view>
                    <view class="mt-[148rpx]">
                        <button class="w-full h-[80rpx] font-500 text-[26rpx] leading-[80rpx] !text-[var(--text-color-light9)] !bg-[#F7F7F7] m-0 rounded-[40rpx] remove-border">{{ t('otherReceive') }}</button>
                    </view>
                </view>
            </view>
        </view>

        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { redirect, img, getToken, goback } from '@/utils/common';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { getCardGiveRecordsDetail } from '@/addon/shop_giftcard/api/records';
import { ref, reactive } from 'vue';
import { t } from '@/locale';
import { useLogin } from '@/hooks/useLogin';

const detail = ref({})
const loading = ref(true)

onLoad((option: any) => {
    if (!option.member_card_id) {
        let parameter = {
            url: '/addon/shop_giftcard/pages/index',
            title: t('notCard'),
            mode: 'reLaunch'
        };
        goback(parameter);
    } else {
        // 检测是否登录
        if (!getToken()) {
            useLogin().setLoginBack({
                url: '/addon/shop_giftcard/pages/give_detail',
                param: { member_card_id: option.member_card_id }
            })
            return false
        }
        getCardGiveRecordsDetailFn(option.member_card_id)
    }
})
onShow(() => {
    if (Object.keys(detail.value).length) getCardGiveRecordsDetailFn(detail.value.member_card_id);
})
const getCardGiveRecordsDetailFn = (member_card_id: any) => {
    loading.value = true
    getCardGiveRecordsDetail(member_card_id).then((res) => {
        detail.value = res.data
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
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
</style>
