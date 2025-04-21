<template>
	<view class="min-h-screen overflow-hidden" :style="themeColor()">
		<view class="fixed z-10 left-0 right-0">
			<view class="flex items-center px-[24rpx] py-[20rpx] bg-[#fff]">
				<view class="flex-1 flex items-center bg-[#F2F2F2] px-[30rpx] rounded-3xl text-[#949494] h-[74rpx]">
					<!-- <view class="flex items-center text-[#5A6677]">
						<text class="ml-[14rpx] leading-1 text-base">太原</text>
						<text class="nc-iconfont nc-icon-xiangxiaV6xx-1 text-lg"></text>
					</view>
					<text class="mx-[14rpx] text-[#D8D8D8]">|</text> -->
					<u--input :placeholder="t('searchScenicName')" class="text-sm" placeholderClass="text-sm" border="none" v-model="search_name"></u--input>
					<text class="nc-iconfont nc-icon-sousuoV6xx text-[var(--text-color-light6)] text-[32rpx]" @click="searchNameFn"></text>
				</view>
			</view>
			<!-- <view class="flex items-center px-[24rpx] border-0 border-b-1 border-solid border-[#F0F0F0] text-sm pb-[16rpx]">
				<view class="flex items-center text-color mr-2">
					<text>全部景点</text>
					<text class="nc-iconfont nc-icon-xiangxiaV6xx-1 text-lg"></text>
				</view>
				<view class="flex items-center mr-2">
					<text>位置距离</text>
					<text class="nc-iconfont nc-icon-xiangxiaV6xx-1 text-lg"></text>
				</view>
				<view class="flex items-center mr-2">
					<text>热度排行</text>
					<text class="nc-iconfont nc-icon-xiangxiaV6xx-1 text-lg"></text>
				</view>
				<view class="flex items-center ml-auto">
					<text>筛选</text>
					<text class="nc-iconfont nc-icon-xiangxiaV6xx-1 text-lg"></text>
				</view>
			</view> -->

			<!-- :scroll-top="scrollTop" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll" -->
			<!-- <scroll-view scroll-x="true" class="scroll-Y  border-0 border-b-1 border-solid border-[#F0F0F0] p-[24rpx] box-border">
				<view class="flex whitespace-nowrap">
					<view class="bg-[#F2F5F6] text-[var(--text-color-light6)] text-[26rpx] px-[24rpx] py-[14rpx] mr-[12rpx] rounded">4.3分以上</view>
					<view class="bg-[#F2F5F6] text-[var(--text-color-light6)] text-[26rpx] px-[24rpx] py-[14rpx] mr-[12rpx] rounded">停车场</view>
					<view class="bg-[#F2F5F6] text-[var(--text-color-light6)] text-[26rpx] px-[24rpx] py-[14rpx] mr-[12rpx] rounded">含早餐</view>
					<view class="bg-[#F2F5F6] text-[var(--text-color-light6)] text-[26rpx] px-[24rpx] py-[14rpx] mr-[12rpx] rounded">网红酒店</view>
					<view class="bg-[#F2F5F6] text-[var(--text-color-light6)] text-[26rpx] px-[24rpx] py-[14rpx] mr-[12rpx] rounded">民宿</view>
				</view>
			</scroll-view> -->
		</view>

		<mescroll-body ref="mescrollRef" top="114rpx" @init="mescrollInit" :down="{ use: false }" @up="getScenicListFn">
			<view class="px-[24rpx] mt-3">
				<view class="flex mb-[30rpx]" v-for="(item,index) in list"  :key="item.scenic_id" @click="toLink(item.scenic_id)">
					<image class="w-[238rpx] h-[238rpx] mr-[20rpx] rounded-md" :src="img(item.cover_thumb_mid)" mode="aspectFill" />
					<view class="flex flex-col flex-1 py-[10rpx]">
						<view class="text-sm font-bold multi-hidden">{{item.scenic_name}}</view>
						<!-- <view class="flex items-center mt-[10rpx]">
							<text class="bg-color text-white rounded-lg rounded-br-none text-[26rpx] px-[8rpx] py-[6rpx]">3.6</text>
							<text class="text-[#777793] text-[26rpx] ml-1">149评论</text>
						</view> -->
						<view class="font-bold multi-hidden text-[#ffaf00] flex items-center text-xs my-1">
							<text class="iconfont iconxingxing mr-[2rpx] text-xs"></text>
							<text>{{item.scenic_level}}星</text>
						</view>
						<view class="flex items-center mt-auto text-[#F55246] text-xs">
							<view>
								<text class="price-font">￥</text>
								<text class="text-base price-font">{{goodsPrice(item)}}</text>
								<text class="ml-[4rpx] mr-[4rpx]"> {{t('rise')}} </text>
								<text>
									<image v-if="priceType(item) == 'member_price'" class="h-[22rpx] ml-[4rpx] w-[50rpx]" :src="img('addon/tourism/VIP.png')" mode="widthFix" />
								</text>
							</view>
							<!-- <text class="ml-1">(会员￥68)</text> -->
						</view>
					</view>
				</view>
			</view>

			<mescroll-empty :option="{'icon': img('static/resource/images/empty.png')}" v-if="!list.length && loading"></mescroll-empty>
		</mescroll-body>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, computed } from 'vue';
	import { redirect, img, getToken } from '@/utils/common';
	import { getScenicList } from '@/addon/tourism/api/tourism';
	import { t } from '@/locale';
	import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
	import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
	import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
	import { onPageScroll, onReachBottom } from '@dcloudio/uni-app';

	const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
	let list = ref<Array<Object>>([]);
	let loading = ref<boolean>(false);
	let search_name = ref('');

	interface acceptingDataStructure {
		data : acceptingDataItemStructure,
		msg : string,
		code : number
	}
	interface acceptingDataItemStructure {
		data : object,
		[propName : string] : number | string | object
	}
	interface mescrollStructure {
		num : number,
		size : number,
		endSuccess : Function,
		[propName : string] : any
	}
	const getScenicListFn = (mescroll : mescrollStructure) => {
		loading.value = false;
		let data : object = {
			page: mescroll.num,
			limit: mescroll.size,
			search_name: search_name.value
		};

		getScenicList(data).then((res : acceptingDataStructure) => {
			let newArr = (res.data.data as Array<Object>);
			//设置列表数据
			if (mescroll.num == 1) {
				list.value = []; //如果是第一页需手动制空列表
			}
			list.value = list.value.concat(newArr);

			mescroll.endSuccess(newArr.length);
			loading.value = true;
		}).catch(() => {
			loading.value = true;
			mescroll.endErr(); // 请求失败, 结束加载
		})
	}

	const searchNameFn = ()=>{
		list.value = [];
		getMescroll().resetUpScroll();
	}

	const toLink = (id : string) => {
		redirect({ url: '/addon/tourism/pages/scenic/detail', param: { scenic_id : id } })
	}

	// 价格类型
	let priceType = (data:any) =>{
		let type = "";
		if(data.goods.member_discount && getToken()){
			type = 'member_price' // 会员价
		}else{
			type = ""
		}
		return type;
	}
	// 商品价格
	let goodsPrice = (data:any) =>{
		let price = "0.00";
		if(data.goods.member_discount && getToken()){
			price = data.member_price // 会员价
		}else{
			price = data.price
		}
		return parseFloat(price).toFixed(2);
	}
</script>
<style lang="scss" scoped>
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
