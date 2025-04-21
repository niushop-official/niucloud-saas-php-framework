<template>
    <view :style="themeColor()">
        <view class="bg-[var(--page-bg-color)] min-h-screen overflow-hidden" v-if="!loading">
            <view class="pt-[var(--top-m)]">
                <view class="card-template sidebar-margin mb-[var(--top-m)]" v-for="(item,index) in detail.refund_log">
                    <view class="text-[28rpx]">{{ item.type_name || '--' }}</view>
                    <view class="text-[24rpx] mt-[20rpx] mb-[10rpx] text-[var(--text-color-light9)]">{{ item.main_type_name }} {{ item.main_name }}</view>
                    <view class="text-[24rpx] text-[var(--text-color-light9)]">{{ item.create_time }}</view>
                </view>
                <view class="w-full footer">
                    <view class="py-[var(--top-m)] px-[var(--sidebar-m)] footer w-full fixed bottom-0 left-0 right-0 box-border">
                        <button hover-class="none"
                                class="primary-btn-bg text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[26rpx] mx-0 flex-1 font-500"
                                @click="redirect({url: '/addon/shop/pages/refund/detail', param: { order_refund_no: orderRefundNo }})">
                            返回详情</button>
                    </view>
                </view>
            </view>
        </view>

        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import { t } from '@/locale'
import { img, redirect, goback } from '@/utils/common';
import { getRefundDetail } from '@/addon/shop/api/refund';

const detail = ref<Object>({});
const loading = ref<boolean>(true);
const orderRefundNo = ref('')

onLoad((option: any) => {
    orderRefundNo.value = option.order_refund_no;
    if (option.order_refund_no) {
        refundDetailFn(option.order_refund_no);
    } else {
        let parameter = {
            url: '/addon/shop/pages/refund/list',
            title: '缺少订单号'
        };
        goback(parameter);
    }
});

const refundDetailFn = (refundNo: any) => {
    loading.value = true;
    getRefundDetail(refundNo).then((res: any) => {
        detail.value = res.data;
        loading.value = false;
    }).catch(() => {
        loading.value = false;
    })
}
</script>
<style lang="scss" scoped>
.footer {
    height: calc(80rpx + var(--top-m) + var(--top-m) + constant(safe-area-inset-bottom)) !important;
    height: calc(80rpx + var(--top-m) + var(--top-m) + env(safe-area-inset-bottom)) !important;
}
</style>
