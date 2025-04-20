<template>
    <view class="address bg-[var(--page-bg-color)] min-h-[100vh]" v-if="!loading" :style="themeColor()">
        <scroll-view scroll-y="true">
            <view class="sidebar-margin pt-[var(--top-m)]" v-if="addressList.length">
                <view class="mb-[var(--top-m)] rounded-[var(--rounded-big)] overflow-hidden" v-for="(item, index) in addressList">
                    <view class="flex flex-col card-template">
                        <view class="flex-1 line-feed mr-[20rpx]" @click="selectAddress(item)">
                            <view class="flex items-center">
                                <view class="text-[#333] text-[30rpx] leading-[34rpx] font-500">{{ item.name }}</view>
                                <text class="text-[#333] text-[30rpx] ml-[10rpx]">{{ mobileHide(item.mobile) }}</text>
                            </view>
                            <view class="mt-[16rpx] text-[26rpx] line-feed text-[var(--text-color-light9)] leading-[1.4]">{{ item.full_address }}</view>
                        </view>
                        <view class="flex justify-between pt-[26rpx]">
                            <view class="flex items-center text-[26rpx] leading-none" @click.stop="setDefault(index)">
                                <text class="iconfont !text-[26rpx] mr-[10rpx]" :class="{ 'iconduigou text-primary': item.is_default, 'iconcheckbox_nol': !item.is_default }"></text>
                                设为默认
                            </view>
                            <view class="flex">
                                <view class="text-[26rpx]" @click.stop="editAddressFn(item.id)">
                                    <text class="nc-iconfont nc-icon-xiugaiV6xx shrink-0 text-[26rpx] mr-[4rpx]"></text>
                                    编辑
                                </view>
                                <view @click.stop="deleteAddressFn(index)" class="ml-[40rpx] text-[26rpx]">
                                    <text class="nc-iconfont nc-icon-shanchu-yuangaizhiV6xx shrink-0 text-[26rpx] mr-[4rpx]"></text>
                                    删除
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <mescroll-empty v-if="!addressList.length" :option="{tip : '暂无上门地址'}"></mescroll-empty>
            <view class="w-full footer">
                <view class="py-[var(--top-m)] px-[var(--sidebar-m)] footer w-full fixed bottom-0 left-0 right-0 box-border">
                    <button hover-class="none" class="primary-btn-bg text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[26rpx] font-500" @click="addAddress">{{ t('addHomeAddress') }}</button>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@/locale'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { redirect, img, mobileHide } from '@/utils/common'
import { getAddressList, deleteAddress, editAddress } from '@/app/api/member'
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';

const loading = ref(true)
const addressList = ref<object[]>([])
const getAddressListFn = () => {
    getAddressList({}).then(({ data }) => {
        addressList.value = data
        loading.value = false
    })
    .catch(() => {
        loading.value = false
    })

}
onShow(() => {
    getAddressListFn()
})

const addAddress = () => {
    redirect({ url: '/addon/o2o/pages/address/address_edit' })
}

const editAddressFn = (id: number) => {
    redirect({ url: '/addon/o2o/pages/address/address_edit', param: { id } })
}

const selectAddress = (data: any) => {
    const selectAddress = uni.getStorageSync('selectAddressCallback')
    if (selectAddress) {
        selectAddress.address_id = data.id

        uni.setStorage({
            key: 'selectAddressCallback',
            data: selectAddress,
            success() {
                redirect({ url: selectAddress.back, mode: 'redirectTo' })
            }
        })
    }
}

const deleteAddressFn = (index: any) => {
    const data: any = addressList.value[index]

    deleteAddress(data.id).then(() => {
        addressList.value.splice(index, 1)
    }).catch()
}
const setDefault = (index: any) => {
    const data: any = addressList.value[index]
    if (data.is_default) return

    data.is_default = 1;
    editAddress(data).then(() => {
        addressList.value.forEach((item, itemIndex) => {
            item.is_default && (item.is_default = 0)
            itemIndex == index && (item.is_default = 1)
        })
    }).catch()
}
</script>

<style lang="scss" scoped>
.line-feed {
    word-wrap: break-word;
    word-break: break-all;
}

.footer {
    height: calc(80rpx + var(--top-m) + var(--top-m) + constant(safe-area-inset-bottom)) !important;
    height: calc(80rpx + var(--top-m) + var(--top-m) + env(safe-area-inset-bottom)) !important;
}
</style>
