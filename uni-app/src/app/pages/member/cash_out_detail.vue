<template>
	<view class="min-h-[100vh] bg-[var(--page-bg-color)] overflow-hidden" :style="themeColor()">
		<block v-if="!loading">
			<view  class="sidebar-margin card-template mt-[20rpx] !pt-[60rpx] !pb-[40rpx]">
				<view class="flex items-center flex-col mb-[80rpx]">
					<text class="text-[60rpx] font-bold price-font mb-[20rpx]">-{{ cashOutInfo.apply_money }}</text>
					<text class="text-[28rpx] text-[#333]" :class="{'text-primary': cashOutInfo.status == 1}">{{ cashOutInfo.status_name }}</text>
				</view>
				<!-- 状态1.待审核2.待转账 3.已转账 -1拒绝' -->
				<view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]">
						<text class="text-[#333] w-[200rpx]">{{t('cashOutNo')}}</text>
						<text class="text-[#333]">{{ cashOutInfo.cash_out_no }}</text>
					</view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]">
						<text class="text-[#333] w-[200rpx]">{{t('serviceMoney')}}</text>
						<text class="text-[#333]">￥{{ cashOutInfo.service_money }}</text>
					</view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]">
						<text class="text-[#333] w-[200rpx]">{{t('createTime')}}</text>
						<text class="text-[#333]">{{ cashOutInfo.create_time }}</text>
					</view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]" v-if="cashOutInfo.status && cashOutInfo.audit_time">
						<text class="text-[#333] w-[200rpx]">{{t('auditTime')}}</text>
						<text class="text-[#333]">{{ cashOutInfo.audit_time  }}</text>
					</view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]" v-if="cashOutInfo.transfer_bank">
						<text class="text-[#333] w-[200rpx]">{{t('transferBank')}}</text>
						<text class="text-[#333] truncate">{{ cashOutInfo.transfer_bank }}</text>
					</view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]">
						<text class="text-[#333] w-[200rpx]">{{t('transferAccount')}}</text>
						<text class="text-[#333] truncate">{{ cashOutInfo.transfer_type == 'wechatpay' ? '微信' : cashOutInfo.transfer_account }}</text>
					</view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]" v-if="cashOutInfo.status == -1 && cashOutInfo.refuse_reason">
						<text class="text-[#333] w-[200rpx]">{{t('refuseReason')}}</text>
						<text class="text-[#333] truncate">{{ cashOutInfo.refuse_reason }}</text>
					</view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]" v-if="cashOutInfo.status == 3">
						<text class="text-[#333] w-[200rpx]">{{t('transferTypeName')}}</text>
						<text class="text-[#333] truncate">{{ cashOutInfo.transfer_type_name }}</text>
					</view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]" v-if="cashOutInfo.status == 3 && cashOutInfo.transfer_time">
						<text class="text-[#333] w-[200rpx]">{{t('transferTime')}}</text>
						<text class="text-[#333] truncate">{{ cashOutInfo.transfer_time }}</text>
					</view>
				</view>
			</view>
		</block>
		<loading-page :loading="loading"></loading-page>
	</view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { t } from '@/locale'
import { redirect, img, goback } from '@/utils/common';
import { getCashOutDetail } from '@/app/api/member';

const cashOutInfo = ref({});
const loading = ref<boolean>(true);
onLoad((option: any) => {
    let id = option.id || "";
    if(id){
	    getCashoutAccountListFn(id)
    }else{
        let parameter = {
            url:'/app/pages/member/cash_out',
            title: '提现详情不存在',
            mode: 'reLaunch'
        };
        goback(parameter);
    }
})

const getCashoutAccountListFn = (id: any) => {
	loading.value = true;

	getCashOutDetail(id).then((res: any) => {
		cashOutInfo.value = res.data;
		loading.value = false;
	}).catch(() => {
		loading.value = false;
	})
}
</script>

<style lang="scss">
</style>
