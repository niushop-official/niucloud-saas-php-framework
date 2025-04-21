<template>
    <view :style="themeColor()">
        <view class="bg-[#f7f7f7] min-h-screen overflow-hidden" v-if="paymentData">
            <view class="h-3"></view>
            <view class="chunk-wrap p-3 bg-white mx-3 rounded-md">
                <view class="flex" v-for="(item, index) in paymentData.goods">
                    <view class="w-[200rpx] mr-3 overflow-hidden rounded">
                        <image :src="img(item.cover_thumb_mid)" mode="widthFix" class="w-full h-[auto]" />
                    </view>
                    <view class="flex-1 w-0">
                        <view class="font-bold truncate">{{ item.goods_name }}</view>
                        <view class="text-[#FA6400] text-xs mt-2">
                            <text class="ml-[2rpx]">￥</text>
                            <text class="text-[38rpx]">{{ item.price }}</text>
                        </view>
                    </view>
                </view>
            </view>

            <view class="chunk-wrap p-3 bg-white mx-3 mt-3 rounded-md">
                <view class="flex justify-between items-center">
                    <view class="text-gray-400">实付金额</view>
                    <view class="text-[#FA6400] text-xs mt-2 font-bold">
                        <text class="ml-[2rpx]">￥</text>
                        <text class="text-[38rpx]">{{ paymentData.pay_money.toFixed(2) }}</text>
                    </view>
                </view>
            </view>

            <view class="h-[148rpx] w-screen"></view>
            <view class="bg-white p-3 fixed bottom-0 left-0 right-0 flex items-center justify-between z-10 shadow">
                <u-button text="提交订单" class="!rounded-3xl !m-0" type="primary" size="16" :loading="createLoading"  @click="handleOrderCreate"></u-button>
            </view>

            <pay ref="payRef" @close="payClose"></pay>
        </view>
        <view class="w-screen h-screen flex flex-col justify-center items-center" v-if="error">
            <u-empty :icon="img('static/resource/images/order_empty.png')" :text="error" />
            <view class="w-[240rpx] mt-[40rpx]">
                <button class="bg-[var(--primary-color)] text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[28rpx]" @click="back">返回上一页</button>
            </view>
        </view>
		<loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
    import { ref, computed, toRaw } from 'vue'
    import { onLoad } from '@dcloudio/uni-app'
    import { redirect, img } from '@/utils/common'
    import { orderConfirm, orderCalculate, orderCreate } from '@/addon/vipcard/api/vipcard'
    import { useSubscribeMessage } from '@/hooks/useSubscribeMessage'

    const payRef = ref(null)
    const loading = ref(true)
    const error = ref('')
    const createData = ref(uni.getStorageSync('vipcardCreateData'))
    const paymentData = ref<AnyObject | null>(null)
    let orderId = 0

    onLoad(() => {
        const data = uni.$u.deepClone(toRaw(createData.value))
        data.goods = JSON.stringify(data.goods)

        orderConfirm(data).then(({ data }) => {
            loading.value = false
            paymentData.value = data
        }).catch(err => {
            error.value = err.msg
            loading.value = false
        })
    })

    const createLoading = ref(false)
    const handleOrderCreate = ()=> {
        if (createLoading.value) return
        createLoading.value = true

        const data = uni.$u.deepClone(toRaw(createData.value))
        data.goods = JSON.stringify(data.goods)

        orderCreate(data).then(({ data }) => {
            orderId = data.trade_id
            useSubscribeMessage().request('vipcard_order_pay,vipcard_order_auto_close')
            payRef.value?.open(data.trade_type, data.trade_id, `/addon/vipcard/pages/order/detail?order_id=${data.trade_id}`)
            createLoading.value = false
        }).catch(err => {
            createLoading.value = false
            uni.showToast({ title: err.msg, icon: 'none' })
        })
    }

    const payClose = () => {
        redirect({ url: '/addon/vipcard/pages/order/detail', param: { order_id: orderId }, mode: 'redirectTo' })
    }

    const back = () => {
        if(getCurrentPages().length > 1){
            uni.navigateBack({
                delta: 1
            });
        }else{
            redirect({
                url: '/addon/vipcard/pages/index',
                mode: 'reLaunch'
            });
        }
    }
</script>
