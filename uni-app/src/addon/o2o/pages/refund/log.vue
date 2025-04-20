<template>
  <view :style="themeColor()">
    <view class="bg-[#f8f8f8] min-h-screen overflow-hidden" v-if="!loading">
      <view class="bg-[#fff] mx-[30rpx] p-[20rpx] mt-[30rpx] rounded-[10rpx]" v-for="(item,index) in detail.refund_log">
        <view class="text-sm">{{ item.action_way == 'user' ? '商家' : item.action_way == 'system' ? '系统' : item.nickname }}</view>
        <view class="text-xs my-[6rpx] text-[#909399]">{{ item.action_time }}</view>
        <view class="text-sm">{{ item.action_name }}</view>
      </view>
      <view class="pt-[140rpx]"></view>
      <view class="flex tab-bar items-center bg-[#fff] fixed left-0 right-0 bottom-0 min-h-[120rpx] px-1 flex-wrap">
        <button hover-class="none"  class="bg-[var(--primary-color)] text-[#fff] h-[80rpx] !leading-[80rpx] rounded-[100rpx] flex-1 !text-[28rpx]" @click="redirect({url: '/addon/o2o/pages/refund/detail', param: { refund_no: refundNo }})">{{ t('detail') }}</button>
      </view>
    </view>

    <loading-page :loading="loading"></loading-page>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import { t } from '@/locale'
import { img, redirect } from '@/utils/common';
import { getRefundDetail } from '@/addon/o2o/api/order';

const detail = ref<Object>({});
const loading = ref<boolean>(true);
const refundNo = ref('')

onLoad((option: any) => {
  refundNo.value = option.refund_no;
  refundDetailFn(option.refund_no);
});

const refundDetailFn = (refundNo) => {
  loading.value = true;
  getRefundDetail(refundNo).then((res) => {
    detail.value = res.data;
    loading.value = false;
  }).catch(() => {
    loading.value = false;
  })
}
</script>
