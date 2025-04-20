<template>
    <view :style="themeColor()">
        <template v-if="!loading">
            <view class="bg-[#f7f7f7] min-h-screen overflow-hidden" v-if="verifyDetail">
                <view class="h-[30rpx]"></view>
                <view class="mx-[30rpx]">
                    <view class="bg-white px-[30rpx] py-[40rpx] rounded" >
                        <view class="text-center font-bold">{{ verifyDetail.verify_code }}</view>
                        <view class="text-center font-bold text-[#f00] mt-[10rpx] text-sm">{{ verifyDetail.verify_time ? t('used') : t('waitUse') }}</view>
                    </view>
                    <view class="bg-white px-[30rpx] py-[30rpx] rounded mt-[20rpx]" v-if="verifyDetail.order_type == 'way'">
                        <view class="flex text-sm">
                            <view class="text-gray-400 w-[150rpx]">{{ t('wayInfo') }}：</view>
                            <view>{{ verifyDetail.way.way_name }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('reserveTime') }}：</view>
                            <view>{{ verifyDetail.start_time }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('touristNum') }}：</view>
                            <view>{{ verifyDetail.num }}</view>
                        </view>
                    </view>
                    <view class="bg-white px-[30rpx] py-[30rpx] rounded mt-[20rpx]" v-if="verifyDetail.order_type == 'scenic'">
                        <view class="flex text-sm">
                            <view class="text-gray-400 w-[150rpx]">{{ t('scenicInfo') }}：</view>
                            <view>{{ verifyDetail.scenic.scenic_name }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('ticketInfo') }}：</view>
                            <view>{{ verifyDetail.goods_name }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('reserveTime') }}：</view>
                            <view>{{ verifyDetail.start_time }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('touristNum') }}：</view>
                            <view>{{ verifyDetail.num }}</view>
                        </view>
                    </view>
                    <view class="bg-white px-[30rpx] py-[30rpx] rounded mt-[20rpx]" v-if="verifyDetail.order_type == 'hotel'">
                        <view class="flex text-sm">
                            <view class="text-gray-400 w-[150rpx]">{{ t('orderNo') }}：</view>
                            <view>{{ verifyDetail.hotel.hotel_name }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx] ">{{ t('roomInfo') }}：</view>
                            <view>{{ verifyDetail.goods_name }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('hotelStartTime') }}：</view>
                            <view>{{ verifyDetail.start_time }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('hotelEndTime') }}：</view>
                            <view>{{ verifyDetail.end_time }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('hoteltNum') }}：</view>
                            <view>{{ verifyDetail.num }}</view>
                        </view>
                    </view>
                    <view class="bg-white px-[30rpx] py-[30rpx] rounded mt-[20rpx]">
                        <view class="flex text-sm">
                            <view class="text-gray-400 w-[150rpx]">{{ t('orderNo') }}：</view>
                            <view>{{ verifyDetail.order_no }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('createTime') }}：</view>
                            <view>{{ verifyDetail.create_time }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('payTime') }}：</view>
                            <view>{{ verifyDetail.pay_time }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]" v-if="verifyDetail.verify_time != 0">
                            <view class="text-gray-400 w-[150rpx]">{{ t('verifyTime') }}：</view>
                            <view>{{ verifyDetail.verify_time }}</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="w-screen h-screen flex flex-col justify-center items-center" v-else>
                <u-empty :icon="img('static/resource/images/order_empty.png')" :text="t('verifyDetailEmpty')" />
            </view>
        </template>
		<loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { onLoad } from '@dcloudio/uni-app'
    import { getVerifyDetail } from '@/addon/tourism/api/tourism'
    import { t } from '@/locale'

    const loading = ref(true)
    const verifyDetail = ref<AnyObject | null>(null)

    onLoad((data: any)=> {
        getVerifyDetail(data.code).then(res => {
            if (res.data.order_id) verifyDetail.value = res.data
            loading.value = false
        }).catch(() => {
            loading.value = false
        })
    })
</script>
