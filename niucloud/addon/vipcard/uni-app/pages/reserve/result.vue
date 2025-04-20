<template>
    <view class="w-screen bg-[#fff] flex flex-col items-center" :style="themeColor()">
        <view class="flex-1 flex flex-col items-center w-full pt-[100rpx]">
			<image class="max-w-[144rpx] max-h-[88rpx]" :src="img('static/resource/images/result/pay_succeed.png')"/>
			<!-- <image class="max-w-[144rpx] max-h-[88rpx]" :src="img('static/resource/images/result/pay_error.png')"/> -->
            <view class=" text-[32rpx] font-bold mt-[22rpx]">{{ t('reserveSuccess') }}</view>
        </view>
        <view class="pb-[80rpx] pt-[80rpx] w-[240rpx]">
            <u-button type="primary" :text="t('complete')" :plain="true" @click="complete"></u-button>
        </view>
    </view>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { t } from '@/locale'
    import { redirect, img } from '@/utils/common'
    import { getFirstPage } from '@/utils/pages'

    const payInfo = ref<AnyObject | null>(null)
    const complete = () => {
        const payReturn = decodeURIComponent(uni.getStorageSync('reserveReturn'))
        if (payReturn) redirect({ url: payReturn, mode: 'redirectTo' })
        else redirect({ url: getFirstPage(), param: { code: payInfo.value?.out_trade_no }, mode: 'redirectTo' })
    }
</script>

<style lang="scss" scoped>
	body{
		background-color: #F7F7F7;
	}
</style>
