<template>
	<view class="min-h-[100vh] bg-[var(--page-bg-color)] overflow-hidden" :style="themeColor()">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="{ use: false }" @up="getCashOutListFn">
			<view v-for="(item,index) in cashOutList" :key="item.id" class="sidebar-margin card-template mt-[var(--top-m)]" @click="toDetailFn(item)">
				<view class="flex items-center justify-between  mb-[20rpx]">
					<view class="text-[36rpx] font-500 price-font" :class="item.apply_money > 0 ? 'text-active' : ''">{{ item.apply_money }}</view>
					<view class="leading-[38rpx] text-[26rpx] ">{{ item.status_name }}</view>
				</view>
				<view class="text-[24rpx] text-[var(--text-color-light6)] mb-[10rpx] leading-[34rpx]">{{ t('rechargeType') }} {{item.transfer_type_name}}</view>
				<view class="text-[24rpx] text-[var(--text-color-light6)] mb-[10rpx] leading-[34rpx]">{{t('applyTime')}}: {{item.create_time}}</view>
				<view class="text-[24rpx] text-[var(--text-color-light9)]  leading-[34rpx]">{{ item.status != -1 ? currentStatusDesc(item.status) : item.refuse_reason}}</view>
			</view>
			<mescroll-empty v-if="!cashOutList.length && loading" :option="{tip : t('emptyTip')}"></mescroll-empty>
		</mescroll-body>
	</view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { t } from '@/locale'
import { redirect, img } from '@/utils/common';
import { getCashOutList } from '@/app/api/member';
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app';

const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
const cashOutList = ref<Array<any>>([]);
const mescrollRef = ref(null);
const loading = ref<boolean>(false);
let account_type = uni.getStorageSync('cashOutAccountType')
const currentStatusDesc = (status: any) =>{
	switch(status){
		case 1:
			return t('toBeReviewed')
		case 2:
			return t('toBeTransfer')
		case 3:
			return t('transfer')
		case -2:
			return t('cancelApply')
	}
}

const getCashOutListFn = (mescroll: any)=>{
	let data:any = {}
	loading.value = false;
	data.page = mescroll.num;
	data.page_size = mescroll.size;
	data.account_type = account_type;
	getCashOutList(data).then((res: any) => {
		let newArr = res.data.data;
		mescroll.endSuccess(newArr.length);
		//设置列表数据
		if (mescroll.num == 1){
			cashOutList.value = []; //如果是第一页需手动制空列表
		}
		cashOutList.value = cashOutList.value.concat(newArr);
		loading.value = true;
	}).catch(()=>{
		loading.value = true;
		mescroll.endErr(); // 请求失败, 结束加载
	})
}

const toDetailFn = (data: any)=>{
	redirect({ url: '/app/pages/member/cash_out_detail', param: { id: data.id }});
}
</script>

<style lang="scss">
	.text-active{
		color: #FF0D3E;
	}
</style>
