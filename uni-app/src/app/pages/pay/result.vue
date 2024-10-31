<template>
    <view :style="themeColor()">
        <view class="w-screen h-screen flex flex-col items-center" v-if="payInfo">
			<top-tabbar ref="topTabbarRef" :data="topTabbarParam" />
            <view class="flex-1 flex flex-col items-center w-full pt-[180rpx]">
                <view class="flex items-baseline"  :class="{'text-[#06c05d]': payInfo.status==2, 'text-red': payInfo.status!=2}">
					<text class="nc-iconfont -mb-[4rpx] !text-[32rpx]" :class="{'nc-icon-duihaoV6mm': payInfo.status==2, 'nc-icon-tanhaoV6mm': payInfo.status!=2}"></text>
					<text class="text-[36rpx] ml-[16rpx] font-500">{{ payInfo.status == 2 ? '支付成功' : '支付失败' }}</text>
				</view>
				
				<view class="text-[56rpx] font-500 mt-[60rpx] price-font">
                    <text class="text-[36rpx] mr-[6rpx]">{{ t('currency') }}</text>
                    <text>{{ moneyFormat(payInfo.money) }}</text>
                </view>
            </view>
			<view class="pb-[260rpx]">
				<button class="w-[380rpx] !border-0 h-[80rpx] text-[28rpx] text-[#333] !bg-[#f2f2f2] flex-center font-500 rounded-[20rpx]" :plain="true" @click="complete">
					{{payInfo.status == 2 ? t('complete') : t('close')}}
				</button>
			</view>
        </view>
        <u-modal :show="loading" :showCancelButton="true" :confirmText="t('pay.completePay')" :cancelText="t('pay.incompletePay')" @cancel="complete" confirmColor="var(--primary-color)">
            <view class="py-[20rpx]">
                <u-loading-icon :text="t('pay.getting')" textSize="16" mode="circle" :vertical="true"></u-loading-icon>
            </view>
        </u-modal>
    </view>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { onLoad } from '@dcloudio/uni-app'
    import { getPayInfo as getPayInfoApi } from '@/app/api/pay'
    import { t } from '@/locale'
    import { redirect, moneyFormat } from '@/utils/common'
    import { getFirstPage } from '@/utils/pages'
	import { topTabar } from '@/utils/topTabbar'

    const payInfo = ref<AnyObject | null>(null)
    const loading = ref(false)
    let tradeType = ''
    let tradeId = 0
    let requestNum = 0
	
	/********* 自定义头部 - start ***********/
	const topTabarObj = topTabar()
	let topTabbarParam = topTabarObj.setTopTabbarParam({title:'',isBack:false})
	/********* 自定义头部 - end ***********/

    onLoad((data : any) => {
        tradeType = data.trade_type
        tradeId = data.trade_id
        getPayInfo()
    })

    /**
     * 获取支付信息
     */
    const getPayInfo = () => {
        getPayInfoApi(tradeType, tradeId).then((res: any) => {
            if (!uni.$u.test.isEmpty(res.data)) {
                if (res.data.status == 1 && requestNum < 5) {
                    loading.value = true
                    requestNum++
                    setTimeout(() => {
                        getPayInfo()
                    }, 1000)
                    return
                }
                payInfo.value = res.data
                loading.value = false
                // uni.setNavigationBarTitle({
                //     title: payInfo.value.status == 2 ? t('pay.paySuccess') : t('pay.payFail')
                // })
            }
        })
    }

    const complete = () => {
        const payReturn = decodeURIComponent(uni.getStorageSync('payReturn'))
        if (payReturn) redirect({ url: payReturn, mode: 'reLaunch' })
        else redirect({ url: getFirstPage(), param: { code: payInfo.value?.out_trade_no }, mode: 'reLaunch' })
    }
</script>

<style lang="scss" scoped></style>
