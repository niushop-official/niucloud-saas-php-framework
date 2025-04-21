<template>
    <view :style="themeColor()">
        <template v-if="!loading">
            <view v-if="isVerifier" class="bg-[#f7f7f7] min-h-screen overflow-hidden">
                <view class="h-[30rpx]"></view>
                <view v-if="verifyDetail" class="mx-[30rpx]">
                    <view class="bg-white px-[30rpx] py-[40rpx] rounded" >
                        <view class="text-center font-bold">{{ verifyDetail.verify_code }}</view>
                        <view class="text-center font-bold text-[#f00] mt-[10rpx] text-sm">{{ isCanVerify ? t('waitUse') : t('used') }}</view>
                    </view>
                    <view class="bg-white px-[30rpx] py-[40rpx] rounded flex mt-[20rpx]" >
                        <view class="w-[180rpx] mr-3 overflow-hidden rounded leading-none">
                            <image :src="img(verifyDetail.cover_thumb_small)" mode="widthFix" class="w-full h-[auto] leading-none" />
                        </view>
                        <view class="flex-1 w-0">
                            <view class="font-bold truncate text-sm">{{ verifyDetail.goods_name }}</view>
                            <view class="flex justify-between"></view>
                        </view>
                    </view>
                    <view class="bg-white px-[30rpx] py-[30rpx] rounded mt-[20rpx]">
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('createTime') }}：</view>
                            <view>{{ $u.timeFormat(verifyDetail.card.create_time, 'yyyy-mm-dd hh:MM:ss') }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('expireTime') }}：</view>
                            <view>{{ verifyDetail.expire_time ? $u.timeFormat(verifyDetail.expire_time, 'yyyy-mm-dd hh:MM:ss') : t('longTerm') }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[150rpx]">{{ t('availableNum') }}：</view>
                            <view v-if="verifyDetail.card.card_type == 'timecard'">{{ t('noLimitNum') }}</view>
                            <view v-else>{{ verifyDetail.card.card_type == 'oncecard' ? verifyDetail.num : verifyDetail.card.total_num }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]">
                            <view class="text-gray-400 w-[180rpx]">{{ t('useNum') }}：</view>
                            <view>{{ verifyDetail.use_num }}</view>
                        </view>
                        <view class="flex text-sm mt-[20rpx]" v-if="isCanVerify">
                            <view class="text-gray-400 w-[150rpx]">{{ t('verifyNum') }}：</view>
                            <view>
                                <u-number-box :min="1" :max="availableNum" v-model="num"></u-number-box>
                            </view>
                        </view>
                    </view>
                    <view class="mt-[30rpx]" v-if="isCanVerify">
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
                    <button class="!bg-[var(--primary-color)] !text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[28rpx]" :class="{'opacity-50': !verifyCode}"  :disabled="!verifyCode" @click="search">{{t('search')}}</button>
                </view>
                <view class="text-center mt-[20rpx]">
                    <view @click="redirect({ url: '/tourism/pages/verify/record' })">
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
    import { ref, computed } from 'vue'
    import { checkIsVerifier, searchVerify, verify } from '@/addon/vipcard/api/vipcard'
    import { t } from '@/locale'
    import { img } from '@/utils/common'

    const loading = ref(true)
    const isVerifier = ref(false)
    const verifyCode = ref('')
    const verifyLoading = ref(false)
    const verifyDetail = ref<AnyObject | null>(null)
    const num = ref(1)

    checkIsVerifier()
        .then(() => {
            isVerifier.value = true
            loading.value = false
        })
        .catch(() => {
            loading.value = false
        })

    const search = () => {
        if (uni.$u.test.isEmpty(verifyCode.value)) {
            uni.showToast({ title: t('inputPlaceholder'), icon:'none' })
            return
        }

        searchVerify(verifyCode.value)
            .then(res => {
                if (Object.values(res.data).length) {
                    verifyDetail.value = res.data
                    verifyCode.value = ''
                } else {
                    uni.showToast({ title: t('notSearchResult'), icon:'none' })
                }
            })
            .catch(() => {
                uni.showToast({ title: t('notSearchResult'), icon:'none' })
            })
    }

    const handleVerify = ()=> {
        if (verifyLoading.value) return
        verifyLoading.value = true

        verify({
            verify_code: verifyDetail.value.verify_code,
            num: num.value
        }).then(()=> {
            verifyDetail.value = null
            verifyLoading.value = false
        }).catch(()=> {
            verifyLoading.value = false
        })
    }

    /**
     * 可核销次数
     */
    const availableNum = computed(() => {
        if (!verifyDetail.value) return 1
        if (verifyDetail.value.card.card_type == 'timecard') return 100
        if (verifyDetail.value.card.card_type == 'commoncard') return verifyDetail.value.card.total_num - verifyDetail.value.card.total_use_num
        if (verifyDetail.value.card.card_type == 'oncecard') return verifyDetail.value.num - verifyDetail.value.use_num
    })

    /**
     * 是否可以核销
     */
    const isCanVerify = computed(() => {
        if (!verifyDetail.value) return false
        if (verifyDetail.value.card.card_type == 'timecard' && verifyDetail.value.card.expire_time < parseInt((new Date()).getTime() / 1000)) return false
        if (availableNum.value <= 0) return false
        return true
    })

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
