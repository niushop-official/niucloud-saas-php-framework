<template>
    <view class="bg-[var(--page-bg-color)] min-h-[100vh]" :style="themeColor()">
        <template v-if="!loading">
            <view class="w-[100%] h-[500rpx] relative background-size box-border" :style="{ backgroundImage: 'url(' + img('addon/shop_fenxiao/sale-ranking.png') + ')' }"></view>
            <view class="relative z-2 mt-[-104rpx] py-[30rpx] px-[var(--sidebar-m)] h-[calc(100vh-476rpx)] flex flex-col box-border flex flex-col">
                <view class="card-template !pb-[40rpx]">
                    <view class="flex items-center -mt-[60rpx] ml-[10rpx]">
                        <view class="w-[100rpx] h-[100rpx] flex-shrink-0 ">
                            <u--image width="100rpx" height="100rpx" :radius="'50%'" :src="img(info.headimg || '')" model="aspectFill" shape="circle">
                                <template #error>
                                    <image class="w-[100rpx] h-[100rpx] rounded-[50%] overflow-hidden" :src="img('addon/shop_fenxiao/index/head.png')" mode="aspectFill" />
                                </template>
                            </u--image>
                        </view>
                        <view class="ml-[20rpx] mt-[20rpx] text-[30rpx] font-500">{{ info.nickname || info.username }}</view>
                    </view>
                    <view class="flex w-full mt-[50rpx] ml-[10rpx] text-[#303133]">
                        <view class="text-[28rpx]">
                            <text>排名：</text>
                            <text class="font-500">第{{ currentRanking || '-' }}名</text>
                        </view>
                        <view class="text-[28rpx] ml-[200rpx]">
                            <text>团队销售额:</text>
                            <text class="font-500 text-[var(--primary-color)] price-font">￥{{ moneyFormat(info.order_money) }}</text>
                        </view>
                    </view>
                </view>
                <view class="flex-1 mt-[var(--top-m)]">
                    <view class="rounded-[var(--rounded-big)] bg-[#fff]">
                        <template v-for="(item, index) in list" :key="index">
                            <view class="flex items-center px-[30rpx] pb-[var(--pad-top-m)] pt-[calc(var(--pad-top-m)+30rpx)]">
                                <view class="w-[35rpx] flex-shrink-0">
                                    <view class="text-center text-[40rpx] font-500" :class="{ 'text-[#F0D232]': index === 0, 'text-[#B9D1E9]': index === 1, 'text-[#EECCB5]': index === 2 }">{{ index + 1 }}</view>
                                    <view class="h-[4rpx] rounded-[2rpx] bg-[#e9e9eb] mt-[10rpx]"></view>
                                </view>
                                <view class="w-[88rpx] h-[88rpx] relative ml-[84rpx] flex-shrink-0" v-if="index < 3">
                                    <view class="absolute z-10 right-[4rpx] bottom-[4rpx]">
                                        <u--image width="88rpx" height="88rpx" :src="img(item.member.headimg || '')" model="aspectFill" shape="circle" :radius="'50%'">
                                            <template #error>
                                                <image class="w-[88rpx] h-[88rpx] rounded-[50%]" :src="img('addon/shop_fenxiao/index/head.png')" mode="aspectFill" />
                                            </template>
                                        </u--image>
                                    </view>
                                    <image class="w-[120rpx] h-[120rpx] absolute z-5 right-0 bottom-0" :src="img(`addon/shop_fenxiao/ranking${index + 1}.png`)" mode="widthFix" />
                                </view>
                                <view class="w-[88rpx] h-[88rpx] ml-[84rpx]" v-else>
                                    <image class="w-[88rpx] h-[88rpx] rounded-[50%]" :src="img(item.member.headimg || '')" mode="aspectFill" />
                                </view>
                                <view class="text-[26rpx] font-500 ml-[20rpx] flex-1">{{ item.member.nickname || item.member.username }}</view>
                                <view class="text-[36rpx] font-500 ml-[20rpx] price-font">￥{{ parseFloat(item.order_money).toFixed(2) }}</view>
                            </view>
                        </template>
                    </view>
                </view>
            </view>
        </template>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { img, moneyFormat, redirect, goback } from '@/utils/common';
import { onLoad } from '@dcloudio/uni-app'
import { getSaleMemberInfo, getSaleRanking } from '@/addon/shop_fenxiao/api/sale'

const info: Record<string, any> = ref({})
const list = ref<Array<any>>([])
onLoad((option: any) => {
    if (!option.id) {
        let parameter = {
            url: '/addon/shop_fenxiao/pages/sale',
            title: '缺少参数id',
            mode: 'reLaunch'
        };
        goback(parameter);
        return;
    }

    getSaleMemberInfoFn(Number(option.id))
    getSaleRankingFn(Number(option.id))
})
const loading = ref<boolean>(true);//页面加载动画
const getSaleMemberInfoFn = (id: number) => {
    getSaleMemberInfo(id).then((res: any) => {
        info.value = res.data.member
        info.value.order_money = res.data.order_money
        info.value.currentRanking = 0
    }).catch(() => {
        loading.value = false
    })
}
const getSaleRankingFn = (id: number) => {
    getSaleRanking(id).then((res: any) => {
        list.value = res.data
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}
const currentRanking = computed(() => {
    let data = null
    list.value.forEach((el: any, index: number) => {
        if (el.member.member_id === info.value.member_id) data = index + 1
    })
    return data
})
</script>
<style lang="scss" scoped>
.background-size {
    background-size: 100% 100%;
}
</style>
