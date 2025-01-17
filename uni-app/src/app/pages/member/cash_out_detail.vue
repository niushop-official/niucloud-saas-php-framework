<template>
	<view class="min-h-[100vh] bg-[var(--page-bg-color)] overflow-hidden" :style="themeColor()">
		<block v-if="!loading">
			<view  class="sidebar-margin card-template mt-[20rpx] !pt-[60rpx] !pb-[40rpx]">
				<view class="flex flex-col justify-center items-center mb-[44rpx]" v-if="cashOutInfo.status == 4 && cashOutInfo.transfer_type == 'wechatpay'">
					<image class="h-[70rpx] w-[70rpx] mb-[24rpx]" :src="img('static/resource/images/member/apply_withdrawal/transfer.png')" mode="widthFix" />
					<view class="text-[28rpx] text-[#333]">处理中，预计2小时内到账</view>
				</view>
				<view class="flex items-center flex-col mb-[80rpx]">
					<text class="text-[60rpx] font-bold price-font mb-[16rpx]">{{ cashOutInfo.apply_money }}</text>
					<text class="text-[28rpx] text-[#333]" :class="{'text-primary': cashOutInfo.status == 1, 'text-[#999]': cashOutInfo.status == 4 }">{{ cashOutInfo.status_name }}</text>
				</view>
				<!-- 状态1.待审核2.待转账 3.已转账 4.转账中 -1拒绝' -->
				<view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]">
						<text class="text-[#333] w-[200rpx]">{{t('cashOutNo')}}</text>
						<text class="text-[#333]">{{ cashOutInfo.cash_out_no }}</text>
					</view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]" v-if="Number(cashOutInfo.service_money)">
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
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]" v-if="cashOutInfo.status == -1 && cashOutInfo.refuse_reason">
						<text class="text-[#333] w-[200rpx]  flex-shrink-0">{{t('refuseReason')}}</text>
						<text class="text-[#333] ml-[20rpx]">{{ cashOutInfo.refuse_reason }}</text>
					</view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]" v-if="cashOutInfo.status == 3">
						<text class="text-[#333] w-[200rpx]">{{t('transferTypeName')}}</text>
						<text class="text-[#333] truncate">{{ cashOutInfo.transfer_type_name }}</text>
					</view>
				</view>
			</view>
			<view class="sidebar-margin card-template mt-[20rpx]" v-if="cashOutInfo.transfer_type == 'wechatpay' && (cashOutInfo.status == 2 || cashOutInfo.status == 3 || cashOutInfo.status == 4)">
				<u-steps :current="current"  direction="column" activeColor="var(--primary-color)" activeIcon="checkmark-circle-fill" inactiveIcon="checkmark-circle-fill">
					<u-steps-item title="提现申请" :desc="cashOutInfo.create_time" ></u-steps-item>
					<u-steps-item title="处理中" :desc="cashOutInfo.audit_time ? cashOutInfo.audit_time : '-'"></u-steps-item>
					<u-steps-item title="提现成功" :desc="cashOutInfo.transfer_time ? cashOutInfo.transfer_time : '-' "></u-steps-item>
				</u-steps>
			</view>
			<view  class="sidebar-margin card-template mt-[20rpx]">
				<view class="title">{{  t('proceedsInfo') }}</view>
				<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]">
					<text class="text-[#333] w-[200rpx]">{{t('transferAccount')}}</text>
					<text class="text-[#333] truncate">{{ cashOutInfo.transfer_type == 'wechatpay' ? '微信零钱' : cashOutInfo.transfer_account }}</text>
				</view>
				<template v-if="cashOutInfo.transfer_type == 'wechatpay'">
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]">
						<text class="text-[#333] w-[200rpx]">{{ t('transferNickname') }}</text>
						<text class="text-[#333]">{{ cashOutInfo.nickname }}</text>
					</view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]">
						<text class="text-[#333] w-[200rpx]">{{ t('transferImg') }}</text>
						<u-avatar :src="img(cashOutInfo.headimg)" size="30" leftIcon="none" :default-url="img('static/resource/images/default_headimg.png')"  />
					</view>
				</template>
				<template v-if="cashOutInfo.transfer_type !== 'wechatpay'">
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]">
						<text class="text-[#333] w-[200rpx]">{{cashOutInfo.transfer_type == 'bank' ? t('bankRealname') : t('realname')}}</text>
						<text class="text-[#333]">{{ cashOutInfo.transfer_realname }}</text>
					</view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]" v-if="cashOutInfo.transfer_bank">
						<text class="text-[#333] w-[200rpx]">{{t('transferBank')}}</text>
						<text class="text-[#333] truncate">{{ cashOutInfo.transfer_bank }}</text>
					</view>
					<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]" v-if="cashOutInfo.transfer_type == 'wechat_code' || cashOutInfo.transfer_type == 'alipay'">
						<text class="text-[#333] w-[200rpx]">{{t('transferCode')}}</text>
						<view class="flex items-center"  @click="previewImg()">
							<image :src="img(cashOutInfo.transfer_payment_code)" class="w-[140rpx] h-[140rpx] rounded-[var(--rounded-small)]"></image>
						</view>
					</view>
				</template>
			</view>
			<view  class="sidebar-margin card-template my-[20rpx]"  v-if="cashOutInfo.status == 3">
				<view class="title">{{  t('transferInfo') }}</view>
				<view class="flex justify-between text-[28rpx] leading-[32rpx]" v-if="cashOutInfo.transfer_time">
					<text class="text-[#333] w-[200rpx]">{{t('transferTime')}}</text>
					<text class="text-[#333] truncate">{{ cashOutInfo.transfer_time }}</text>
				</view>
				<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]" v-if="cashOutInfo.transfer_no">
					<text class="text-[#333] w-[200rpx]">{{ t('transferNo') }}</text>
					<text class="text-[#333] truncate">{{ cashOutInfo.transfer.transfer_no }}</text>
				</view>
				<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]" v-if="cashOutInfo.transfer && cashOutInfo.transfer.transfer_remark">
					<text class="text-[#333] w-[200rpx] flex-shrink-0">{{t('transferRemark')}}</text>
					<text class="text-[#333] ml-[20rpx]">{{ cashOutInfo.transfer.transfer_remark }}</text>
				</view>
				<view class="flex justify-between text-[28rpx] mt-[34rpx] leading-[32rpx]" v-if="cashOutInfo.transfer && cashOutInfo.transfer.transfer_voucher">
					<text class="text-[#333] w-[200rpx]">{{t('transferVoucher')}}</text>
					<view class="flex items-center"  @click="handleImg()">
						<image :src="img(cashOutInfo.transfer.transfer_voucher)" class="w-[140rpx] h-[140rpx] rounded-[var(--rounded-small)]"></image>
					</view>
				</view>
			</view>
		</block>
		<loading-page :loading="loading"></loading-page>
	</view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { t } from '@/locale'
import { redirect, img, goback } from '@/utils/common';
import { getCashOutDetail } from '@/app/api/member';

const cashOutInfo = ref<any>({});
const current = ref(0);
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
		if(cashOutInfo.value.transfer_type == 'wechatpay'){
			if(cashOutInfo.value.status == 1){
				current.value = 0;

			}else if(cashOutInfo.value.status == 2 || cashOutInfo.value.status == 4){
				current.value = 1;
			}else if(cashOutInfo.value.status == 3){
				current.value = 2;
			}
		}
		loading.value = false;
	}).catch(() => {
		loading.value = false;
	})
}
const previewImg = () =>{
	uni.previewImage({
		urls: [img(cashOutInfo.value.transfer_payment_code)],
		indicator: "number",
		loop: true
	})
}
const handleImg = () => {
	uni.previewImage({
		urls: [img(cashOutInfo.value.transfer.transfer_voucher)],
		indicator: "number",
		loop: true
	})

}

// 关闭预览图片
onUnload(()=>{
    // #ifdef  H5 || APP
	try {
		uni.closePreviewImage()
	}catch (e) {

	}
    // #endif
})
</script>

<style lang="scss" scoped>
:deep(.u-text__value--main){
	font-size: 24rpx !important;
	color: #606266;
}
:deep(.u-text__value){
	font-size: 24rpx !important;
	color: #606266;
}
</style>
