<template>
    <view class="bg-[var(--page-bg-color)] min-h-[100vh]" :style="themeColor()">
        <mescroll-body ref="mescrollRef" top="88rpx" :down="{ use: false }" @init="mescrollInit" @up="getTaskRecordFn">
            <view class="fixed top-0 left-0 right-0 z-10" v-if="!lastLoading">
                <scroll-view :scroll-x="true" class="tab-style-2">
                    <view class="tab-content !justify-around">
                        <view class="tab-items" :class="{ 'class-select': status === item.value }"
                              @click="statusSearchFn(item.value)" v-for="(item, index) in statusList">{{ item.label }}
                        </view>
                    </view>
                </scroll-view>
            </view>
            <view class="sidebar-margin pt-[var(--top-m)]" v-if="data.length">
                <template v-for="(item, index) in data">
                    <view class=" box-border mb-[var(--top-m)] card-template">
                        <view class="w-full flex justify-between items-center">
                            <view class="text-[36rpx] font-500 text-[var(--price-text-color)]">+{{ moneyFormat(item.reward_money) }}</view>
                            <view class="text-[26rpx]" :class="{'text-[#999]': item.is_send, 'text-[#333]': !item.is_send}">{{ item.is_send ? '已发放' : '待发放' }}</view>
                        </view>
                        <view v-if="item.is_send" class="text-[24rpx] text-[var(--text-color-light9)] mt-[20rpx]">已于 {{ item.send_time }} 发放该奖励</view>
                        <view v-else class="text-[24rpx] text-[var(--text-color-light9)] mt-[20rpx]">预计于 {{ timeStampTurnTime(item.send_timer) }} 发放该奖励</view>
                    </view>
                </template>
            </view>
            <mescroll-empty :option="{ 'icon': img('static/resource/images/empty.png') }" v-if="!data.length && !loading"></mescroll-empty>
        </mescroll-body>
    </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { img, timeStampTurnTime, moneyFormat } from '@/utils/common';
import { getTaskRecord } from '@/addon/shop_fenxiao/api/task'
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app';

const { mescrollInit, getMescroll } = useMescroll(onPageScroll, onReachBottom);
const id = ref<Number>(0)
onLoad((option: any) => {
    id.value = Number(option.id)
})
const loading = ref<boolean>(true);//页面加载动画
const lastLoading = ref<boolean>(true);//页面加载动画
const data = ref<Array<any>>([])
const status = ref<number>(2)
const statusList = ref<Array<any>>([
    { label: '全部', value: 2 },
    { label: '待发放', value: 0 },
    { label: '已发放', value: 1 },

])
const statusSearchFn = (value: number) => {
    status.value = value
    getMescroll().resetUpScroll();
}
const getTaskRecordFn = (mescroll: any) => {
    loading.value = true
    getTaskRecord(Number(id.value)).then((res: any) => {
        loading.value = false
        lastLoading.value = false
        data.value = res.data.filter((el: any) => {
            return status.value === 2 || el.is_send === status.value
        })
        mescroll.endSuccess(0);
    })
}
</script>
<style lang="scss" scoped>
.tab-style-2 {
    padding: 0;

    .tab-content {
        justify-content: space-around;
    }
}

.class-select {
    position: relative;
    font-weight: bold;
    color: var(--primary-color);

    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        height: 6rpx;
        background-color: var(--primary-color);
        width: 90%;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
