<template>
    <view :style="themeColor()">
        <template v-if="!loading">
            <view class="bg-[#f7f7f7] min-h-screen overflow-hidden" v-if="verifyDetail">
                <view class="h-[30rpx]"></view>
                <view class="mx-[30rpx]">
                    <view class="bg-white px-[30rpx] py-[30rpx] rounded flex mt-[20rpx]" >
                        <view class="w-[180rpx] mr-3 overflow-hidden rounded leading-none">
                            <image :src="img(verifyDetail.member_card_item.cover_thumb_small)" mode="widthFix" class="w-full h-[auto] leading-none" />
                        </view>
                        <view class="flex-1 w-0">
                            <view class="font-bold truncate text-sm">{{ verifyDetail.member_card_item.goods_name }}</view>
                            <view class="flex justify-between"></view>
                        </view>
                    </view>

                    <view class="bg-white px-[30rpx] py-[30rpx] rounded mt-[20rpx]">
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('createTime') }}：</view>
                            <view>{{ verifyDetail.create_time }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('verifyCode') }}：</view>
                            <view>{{ verifyDetail.verify_code }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('verifyNum') }}：</view>
                            <view>{{ verifyDetail.num }}</view>
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
    import { getVerifyDetail } from '@/addon/vipcard/api/vipcard'
    import { t } from '@/locale'
    import { img } from '@/utils/common'

    const loading = ref(true)
    const verifyDetail = ref<AnyObject | null>(null)

    onLoad((data: any)=> {
        getVerifyDetail(data.id).then(res => {
            if (res.data.id) verifyDetail.value = res.data
            loading.value = false
        }).catch(() => {
            loading.value = false
        })
    })
</script>
