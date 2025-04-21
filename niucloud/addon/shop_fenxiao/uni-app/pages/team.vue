<template>
    <view class="bg-[#f8f8f8] min-h-[100vh]" :style="themeColor()">
        <view class=" fixed top-[0] left-[0] right-[0] z-10">
            <view class="tab-style-3">
                <text class="tab-items" :class="{'class-select': tabIndex == 'direct'}" @click="tabChange('direct')">直推</text>
                <text class="tab-items" :class="{'class-select': tabIndex == 'indirect'}" @click="tabChange('indirect')">间推</text>
            </view>
        </view>
        <view class="pt-[88rpx]"></view>
        <scroll-view scroll-y="true" v-if="!loading">
            <view class="pt-[var(--top-m)]" v-if="list[tabIndex].length">
                <view class="flex items-center sidebar-margin mb-[var(--top-m)] card-template" v-for="(item,index) in list[tabIndex]" :key="index">
                    <image class="w-[90rpx] h-[90rpx] mr-[20rpx] rounded-full" v-if="item.headimg" :src="img(item.headimg)" mode="aspectFill" />
                    <image class="w-[90rpx] h-[90rpx] mr-[20rpx] rounded-full" v-else :src="img('addon/shop_fenxiao/index/head.png')" mode="aspectFill" />
                    <view class="flex flex-col">
                        <view class="flex items-center">
                            <view class="mr-[10rpx] flex items-center">
                                <text class="text-[30rpx] font-500">{{ item.nickname || item.username }}</text>
                                <text class="bg-primary-light !text-[var(--primary-color)] !text-[22rpx] px-[10rpx] h-[36rpx] ml-[10rpx] tag-item">{{ item.is_fenxiao ? '分销商' : '会员' }}</text>
                            </view>
                            <text class="bg-primary-light !text-[var(--primary-color)] !text-[22rpx] px-[10rpx] h-[36rpx] ml-[10rpx] tag-item" v-if="item.is_fenxiao">{{ item.fenxiao.fenxiao_level.level_name }}</text>
                        </view>
                        <text v-if="tabIndex == 'indirect' && !item.is_fenxiao && item.fenxiao && item.fenxiao.member" class="text-[var(--text-color-light6)] text-[24rpx] mt-[20rpx]">上级分销商:{{ item.fenxiao.member.nickname }}</text>
                        <text class="text-[var(--text-color-light6)] text-[24rpx] mt-[16rpx]">加入时间: {{ item.create_time }}</text>
                    </view>
                </view>
            </view>
            <mescroll-empty v-if="!list[tabIndex] || !list[tabIndex].length" :option="{tip : '暂无数据'}"></mescroll-empty>
        </scroll-view>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { redirect, img } from '@/utils/common';
import { ref } from 'vue'
import { getFenxiaoTeam } from '@/addon/shop_fenxiao/api/fenxiao';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';

const tabIndex = ref('direct')
const tabChange = (data) => {
    tabIndex.value = data;
}

const list = ref({});
const loading = ref(true);
const getData = () => {
    loading.value = true;
    getFenxiaoTeam().then((res) => {
        list.value = res.data;
        loading.value = false;
    }).catch(() => {
        loading.value = true;
        redirect({ url: '/app/pages/member/index', mode: 'reLaunch' })
    })
}
getData();
</script>

<style lang="scss" scoped>
</style>
