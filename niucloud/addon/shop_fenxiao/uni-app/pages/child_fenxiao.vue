<template>
    <view class="bg-[#f8f8f8] min-h-[100vh]" :style="themeColor()">
        <scroll-view scroll-y="true" v-if="!loading">
            <view class="pt-[var(--top-m)]" v-if="list.length">
                <view class="flex items-center sidebar-margin mb-[var(--top-m)] h-[180rpx] card-template" v-for="(item,index) in list" :key="index">
                    <image v-if="item.member.headimg" class="w-[100rpx] h-[100rpx] mr-[20rpx] rounded-full" :src="img(item.member.headimg)" mode="widthFix" />
                    <image v-else class="w-[100rpx] h-[100rpx] mr-[20rpx] rounded-full" :src="img('addon/shop_fenxiao/index/head.png')" mode="widthFix" />
                    <view class="flex flex-col">
                        <view class="flex items-center">
                            <text class="text-[30rpx] font-500 mr-[10rpx]" v-if="item.member">{{ item.member.nickname || item.member.username }}</text>
                            <text class="bg-primary-light !text-[var(--primary-color)] !text-[22rpx] px-[10rpx] h-[36rpx] ml-[10rpx] tag-item" v-if="item.fenxiao_level&&item.fenxiao_level.level_name">{{ item.fenxiao_level.level_name }}</text>
                        </view>
                        <text class="text-[var(--text-color-light9)] text-[24rpx] mt-[20rpx]">加入时间:{{ item.create_time }}</text>
                    </view>
                    <view class="flex flex-col ml-auto items-end text-[24rpx]">
                        <text class="leading-normal">{{ item.child_fenxiao_num }} 人</text>
                        <text class="leading-normal">{{ item.fenxiao_order_num }} 单</text>
                        <text class="leading-normal">{{ item.fenxiao_total_order }} 元</text>
                    </view>
                </view>
            </view>
            <mescroll-empty :option="{ 'icon': img('static/resource/images/empty.png') }" v-if="!list.length && !loading"></mescroll-empty>
        </scroll-view>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { redirect, img } from '@/utils/common';
import { ref } from 'vue'
import { getChildFenxiao } from '@/addon/shop_fenxiao/api/fenxiao';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';

const list = ref([]);
const loading = ref(true);
const getData = () => {
    loading.value = true;
    getChildFenxiao().then((res: any) => {
        list.value = [];
        list.value = res.data;
        loading.value = false;
    }).catch(() => {
        loading.value = true;
        redirect({ url: '/app/pages/member/index', mode: 'reLaunch' })
    })
}
getData();
</script>
