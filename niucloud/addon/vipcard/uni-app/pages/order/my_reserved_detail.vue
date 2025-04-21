<template>
    <view :style="themeColor()">
        <view class="bg-[#F6F8FA] min-h-screen overflow-hidden" v-if="!loading">
            <view class="bg-[#fff] rounded-lg mx-3 mt-4 p-3">
                <view class="flex">
                    <image class="w-[240rpx] h-[180rpx] rounded mr-3" :src="img(detail.goods.cover_thumb_mid)" mode="aspectFill" />
                    <view class="flex flex-col py-1 flex-1">
                        <view class="font-bold multi-hidden text-[30rpx]">{{detail.goods.goods_name}}</view>
                        <view class="text-[26rpx] mt-2 text-[var(--text-color-light6)]" v-if="detail.goods.keywords">{{detail.goods.keywords}}</view>
                        <view class="mt-auto font-bold text-[#FF3223]">￥{{detail.goods.price}}</view>
                    </view>
                </view>
            </view>

            <view class="flex flex-col mx-3 mt-3 px-3 py-4 bg-[#fff] rounded-lg">
                <view class="flex justify-between items-center pb-3 border-0 border-b-[2rpx] border-[#F2F2F2] border-solid">
                    <view class="flex items-center">
                        <text class="nc-iconfont nc-icon-qiuzhirenyuanV6xx1 text-[28rpx] font-bold mr-1"></text>
                        <text class="text-[26rpx]">{{t('reservedTechnician')}}</text>
                    </view>
                    <view v-if="detail.technician" class="text-[26rpx]">{{detail.technician.name || '--'}}</view>
                </view>
                <view class="flex justify-between items-center pt-3">
                    <view class="flex items-center">
                        <text class="nc-iconfont nc-icon-a-shijianV6xx-36 font-bold text-[28rpx] mr-1"></text>
                        <text class="text-[26rpx]">{{t('reservedTime')}}</text>
                    </view>
                    <view class="text-[26rpx]">{{detail.reserve_time}}</view>
                </view>
            </view>

            <view class="flex flex-col mx-3 mt-3 px-3 py-4 bg-[#fff] rounded-lg" v-if="detail.order">
                <view class="font-bold text-sm mb-1">{{t('reservedInfo')}}</view>
                <view class="flex justify-between items-center py-2">
                    <text class="text-xs text-[var(--text-color-light6)]">{{t('orderNo')}}：</text>
                    <text class="text-xs text-[#222]">{{detail.order.order_no}}</text>
                </view>
                <view class="flex justify-between items-center py-2">
                    <text class="text-xs text-[var(--text-color-light6)]">{{t('reserveStateName')}}：</text>
                    <text class="text-xs text-[#222]">{{detail.reserve_state_name}}</text>
                </view>
                <view class="flex justify-between items-center py-2">
                    <text class="text-xs text-[var(--text-color-light6)]">{{t('createTime')}}：</text>
                    <text class="text-xs text-[#222]">{{detail.order.create_time}}</text>
                </view>
                <view class="flex justify-between items-center py-2">
                    <text class="text-xs text-[var(--text-color-light6)]">{{t('mobile')}}：</text>
                    <text class="text-xs text-[#222]">{{detail.mobile}}</text>
                </view>
                <view class="flex justify-between items-center py-2">
                    <text class="text-xs text-[var(--text-color-light6)]">{{t('remark')}}：</text>
                    <text class="text-xs text-[#222]">{{detail.remark}}</text>
                </view>
            </view>
            <view class="h-[160rpx] w-full"></view>
            <view class="flex justify-end items-center bg-white px-3 py-1 fixed left-0 right-0 bottom-0 z-10" v-if="['1','4'].includes(detail.reserve_state)">
                <u-button :text="t('cancelReserved')" type="primary" shape="circle" plain class="text-[26rpx] !w-[210rpx] !h-[70rpx] !leading-[70rpx] mx-0 my-2 mr-3" @click="orderBtnFn(detail, 'cancel')"></u-button>
                <u-button :text="t('pay')" type="primary" shape="circle" v-if="'4' == detail.reserve_state" class="text-[26rpx] !w-[210rpx] !h-[70rpx] !leading-[70rpx] mx-0 my-2 ml-3" @click="orderBtnFn(detail, 'pay')"></u-button>
            </view>
            <pay ref="payRef" @close="payClose"></pay>
        </view>
		<loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { img } from '@/utils/common';
	import { cancelReserve, getReserveDetail } from '@/addon/vipcard/api/vipcard';
	import { t } from '@/locale'

	let detail = ref({});
	let id = ref('');
    const loading = ref(true)
	onLoad((option: any) => {
		id.value = option.id;
		getReserveDetailFn(option.id);
	});

	const getReserveDetailFn = (id)=> {
	    getReserveDetail(id).then(res => {
			detail.value = res.data;
			loading.value = false;
		}).catch(() => {
			loading.value = false;
		})
	}

	// 支付
	const payRef = ref(null)
	const orderBtnFn = (data, type='')=>{
		if(type == 'pay')
			payRef.value?.open(data.trade_type, data.trade_id, `/addon/vipcard/pages/order/detail?order_id=${data.trade_id}`)
		else if(type == 'cancel'){
	        cancelReserve(data.reserve_id).then((res) => {
	        	getReserveDetailFn(id.value);
	        })
		}
	}
</script>

<style lang="scss" scoped>
	.serve-active{
		border: 2rpx solid $u-primary;
		color: $u-primary;
	}

	.transform-rotate{
		transform: rotate(180deg);
	}
	.font-scale{
		transform: scale(0.75);
	}
	.text-color{
		color: $u-primary;
	}
	.bg-color{
		background-color: $u-primary;
	}
</style>
