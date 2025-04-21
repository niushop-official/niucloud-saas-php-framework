<template>
	<view class="min-h-screen overflow-hidden bg-[#fff]" :style="themeColor()">
		<view class="fixed z-10 left-0 right-0 top-0 bg-white px-[24rpx] py-[20rpx]">
			<view class="flex items-center bg-[#F2F2F2] px-[30rpx] rounded-3xl text-[#949494] h-[74rpx]">
					<!-- <view class="flex items-center text-[#5A6677]">
						<text class="ml-[14rpx] leading-1 text-base">太原</text>
						<text class="nc-iconfont nc-icon-xiangxiaV6xx-1 text-lg"></text>
					</view>
					<text class="mx-[14rpx] text-[#D8D8D8]">|</text> -->
				<u--input :placeholder="t('searchWayName')" class="text-sm" placeholderClass="text-sm" border="none" v-model="search_name"></u--input>
				<text class="nc-iconfont nc-icon-sousuoV6xx text-[var(--text-color-light6)] text-[32rpx]" @click="searchNameFn"></text>
			</view>

			<!-- :scroll-top="scrollTop" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll" -->
			<!-- <scroll-view scroll-x="true" class="scroll-Y  border-0 border-b-1 border-solid border-[#F0F0F0] box-border px-[24rpx]">
				<view class="flex whitespace-nowrap">
					<view class="text-sm mr-[36rpx] class-select leading-[90rpx]">4.3分以上</view>
					<view class="text-sm mr-[36rpx] leading-[90rpx]">停车场</view>
					<view class="text-sm mr-[36rpx] leading-[90rpx]">含早餐</view>
					<view class="text-sm mr-[36rpx] leading-[90rpx]">网红酒店</view>
					<view class="text-sm mr-[36rpx] leading-[90rpx]">民宿</view>
				</view>
			</scroll-view> -->
		</view>


		<mescroll-body ref="mescrollRef" top="114rpx" @init="mescrollInit" :down="{ use: false }" @up="getWayListFn">
			<view class="goods-wrap px-[30rpx] mt-3">
				<view class="goods-item" v-for="(item,index) in list" :key="item.goods.goods_id" @click="toLink(item)">
					<image :src="img(item.goods.cover_thumb_mid)" mode="aspectFill" />
					<view class="name multi-hidden">{{item.way_name}}</view>

					<view class="price">
						<text class="price-font">￥</text>
						<text class="text-base price-font">{{goodsPrice(item)}}</text>
						<text>
							<image v-if="priceType(item) == 'member_price'" class="h-[22rpx] ml-[4rpx] w-[50rpx]" :src="img('addon/tourism/VIP.png')" mode="widthFix" />
						</text>
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
	import { getWayList } from '@/addon/tourism/api/tourism';
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

	const getWayListFn = (mescroll : mescrollStructure) => {
		loading.value = false;
		let data : object = {
			page: mescroll.num,
			limit: mescroll.size,
			search_name: search_name.value
		};

		getWayList(data).then((res : acceptingDataStructure) => {
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

	const toLink = (data : Object) => {
		redirect({ url: '/addon/tourism/pages/way/detail', param: { way_id : data.way_id}})
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

	.goods-wrap{
		@apply box-border w-full flex flex-wrap justify-between;
		.goods-item{
			@apply flex flex-col mb-3 border-1 border-[#F0F0F0] border-solid box-border;
			width: 336rpx;
			padding-bottom: 10rpx;
			border-radius: 10rpx;
			overflow: hidden;
			>image{
				width: 336rpx;
				height: 240rpx;
			}
			.name{
				font-size: 26rpx;
				line-height: 1.5;
				@apply px-2 pt-2;
			}
			.price{
				@apply text-white bottom-2 left-3 px-1 pt-1 rounded text-base flex items-center mt-auto;
				color: #F55246;
			}
		}
	}
	.class-select{
		position: relative;
		color: $u-primary;
		&::after{
			content: "";
			position: absolute;
			bottom: 0;
			height: 6rpx;
			background-color: $u-primary;
			width: 50%;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
