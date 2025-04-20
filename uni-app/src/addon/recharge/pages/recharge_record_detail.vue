<template>
    <view class="overflow-hidden bg-[var(--page-bg-color)] min-h-[100vh] px-[var(--sidebar-m)]" :style="themeColor()" v-show="loading">
        <view class="top-mar card-template !pt-[60rpx] !pb-[40rpx]">
            <view class="flex items-center flex-col mb-[80rpx]">
                <text class="text-[60rpx] font-bold price-font mb-[20rpx]">￥{{ rechargeInfo.order_money }}</text>
                <text class="text-[28rpx]" :class="{'text-primary': rechargeInfo.order_status_info && rechargeInfo.order_status_info.status == 0}" v-if="rechargeInfo.order_status_info">{{rechargeInfo.order_status_info.name}}</text>
            </view>
            <view>
                <view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]" v-if="rechargeInfo.item">
                    <text class="text-[#333] w-[200rpx]">{{ rechargeInfo.item.item_name }}</text>
                    <text class="text-[#333]">￥{{ rechargeInfo.order_money }}</text>
                </view>
                <view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]">
                    <text class="text-[#333] w-[200rpx]">{{t('orderNo')}}</text>
                    <text class="text-[#333]">{{ rechargeInfo.order_no }}</text>
                </view>
                <view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]">
                    <text class="text-[#333] w-[200rpx]">{{t('createTime')}}</text>
                    <text class="text-[#333]">{{ rechargeInfo.create_time }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import {reactive, ref} from 'vue'
    import {onLoad} from '@dcloudio/uni-app'
    import {t} from '@/locale'
    import {getRechargeDetail} from '@/addon/recharge/api/recharge'

    const rechargeInfo = ref({});
    const loading = ref<boolean>(false);
    onLoad((option) => {
        let id = option.id || "";
        getRechargeDetailFn(id)
    })

    const getRechargeDetailFn = (id:any) => {
        loading.value = false;

        getRechargeDetail(id).then((res:any) => {
            rechargeInfo.value = res.data;
            loading.value = true;
        }).catch(() => {
            loading.value = true;
        })
    }
</script>

<style lang="scss">

</style>
