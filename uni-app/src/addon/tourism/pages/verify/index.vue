<template>
    <view :style="themeColor()">
        <template v-if="!loading">
            <view v-if="isVerifier" class="bg-[#f7f7f7] min-h-screen overflow-hidden">
                <view class="h-[30rpx]"></view>
                <view v-if="verifyDetail" class="mx-[30rpx]">
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
                    <view class="mt-[30rpx]" v-if="verifyDetail.verify_time == 0">
                        <button class="bg-[var(--primary-color)] text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[28rpx]" @click="handleVerify">{{t('confirmVerify')}}</button>
                    </view>
                    <view class="mt-[30rpx]">
                        <u-button :text="t('verifyOther')" type="primary" shape="circle" @click="verifyDetail = null" :plain="true"></u-button>
                    </view>
                </view>
                <view class="bg-white px-[30rpx] py-[50rpx] mx-[30rpx] rounded" v-else>
                    <view class="text-center mt-[30rpx]">{{ t('verifyTitle') }}</view>
                    <view class="my-[60rpx]">
                        <u-input :placeholder="t('inputPlaceholder')" border="surround" inputAlign="center" v-model="verifyCode">
                            <!-- #ifdef MP -->
                            <template #suffix>
                                <u-icon name="scan" color="var(--primary-color)" size="28" @click="scan"></u-icon>
                            </template>
                            <!-- #endif -->
                        </u-input>
                    </view>
                    <button class="!bg-[var(--primary-color)] !text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[28rpx]" :class="{'opacity-50': !verifyCode}" @click="search" :disabled="!verifyCode">{{t('search')}}</button>
                </view>
                <view class="text-center mt-[20rpx]">
                    <view @click="redirect({ url: '/addon/tourism/pages/verify/record' })">
                        <text class="text-primary text-sm">{{ t('verifyRecord') }}</text>
                    </view>
                </view>
            </view>
            <view class="w-screen h-screen flex flex-col justify-center items-center" v-else>
                <u-empty :icon="img('static/resource/images/order_empty.png')" :text="t('notIsVerifier')" />
            </view>
        </template>
		<loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
	import { img,redirect } from '@/utils/common';
    import { checkIsVerifier, getVerifyDetail, verify } from '@/addon/tourism/api/tourism'
    import { t } from '@/locale'

    const loading = ref(true)
    const isVerifier = ref(false)
    const verifyCode = ref('')
    const verifyLoading = ref(false)
    const verifyDetail = ref<AnyObject | null>(null)

    checkIsVerifier().then(() => {
        isVerifier.value = true
        loading.value = false
    }).catch(() => {
        loading.value = false
    })

    const search = () => {
        if (uni.$u.test.isEmpty(verifyCode.value)) {
            uni.showToast({title: t('inputPlaceholder'), icon: 'none'})
            return
        }

        getVerifyDetail(verifyCode.value).then(res => {
            if (Object.values(res.data).length) {
                verifyDetail.value = res.data
                verifyCode.value = ''
            } else {
                uni.showToast({title: t('notSearchResult'), icon: 'none'})
            }
        }).catch(() => {
            uni.showToast({title: t('notSearchResult'), icon: 'none'})
        })
    }

    const handleVerify = ()=> {
        if (verifyLoading.value) return
        verifyLoading.value = true

        verify(verifyDetail.value.verify_code).then(()=> {
            verifyDetail.value = null
            verifyLoading.value = false
        }).catch(()=> {
            verifyLoading.value = false
        })
    }

    const scan = () => {
      // #ifdef MP
      uni.scanCode({
        onlyFromCamera: true,
        success: res => {
          if (res.errMsg == 'scanCode:ok') {
            verifyCode.value = res.result
          } else {
            uni.showToast({ title: res.errorMsg, icon: 'none' })
          }
        }
      });
      // #endif
    }
</script>
