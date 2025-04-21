<template>
	<view class="bg-[#f8f8f8] min-h-screen overflow-hidden" :style="themeColor()">
		<view class="fixed left-0 top-0 right-0 z-10" v-if="statusLoading">
			<scroll-view scroll-x="true" class="scroll-Y box-border px-[24rpx] bg-white">
				<view class="flex whitespace-nowrap justify-around">
					<view :class="['text-sm leading-[90rpx]',{'class-select': orderState === item.status.toString()}]" @click="orderStateFn(item.status)" v-for="(item,index) in orderStateList">{{item.name}}</view>
				</view>
			</scroll-view>
		</view>

		<mescroll-body ref="mescrollRef" top="104rpx" @init="mescrollInit" :down="{ use: false }" @up="getMemberOrderListFn">
			<view class="goods-wrap">
				<template v-for="(item,index) in list"	:key="item.order_id">
					<view class="goods-item" v-if="item.order_type == 'hotel'" @click="toLink(item)">
						<view class="goods-head">
							<text>预订日期：{{dateFormat(item.start_time, 'yearMonthDayWeek')}}</text>
							<text>{{item.order_status_info.name}}</text>
						</view>
						<view class="goods-content">
							<image class="w-[40rpx]" :src="img('addon/tourism/tourism/member/hotel.png')" />
							<view>
								<view class="name-wrap">
									<view class="multi-hidden">{{item.hotel.hotel_name}}</view>
									<view>￥{{item.order_money}}</view>
								</view>
								<view class="desc">{{item.goods_name}}</view>
								<view class="desc">{{dateFormat(item.start_time, 'monthDay')}}(入住)-{{dateFormat(item.end_time, 'monthDay')}}(离店){{item.days}}晚/{{item.num}}间</view>
								<view class="btn-wrap">
									<button class="!w-auto  !h-[60rpx] !text-[23rpx] flex items-center" @click.stop="orderBtnFn(item,btnItem.key)" v-for="(btnItem,btnIndex) in item.order_status_info.member_action">{{btnItem.name}}</button>
									<!-- <button @click.stop="orderBtnFn(item,'buy')" v-if="item.order_status">在线咨询</button> -->
									<!-- <button @click.stop="orderBtnFn(item,'buy')" v-if="item.order_status">在线咨询</button>
									<button @click.stop="orderBtnFn(item)" v-if="item.order_status == -1">删除订单</button>
									<button @click.stop="orderBtnFn(item)" v-if="item.order_status == 0">取消订单</button>
									<button type="primary" @click.stop="orderBtnFn(item,'pay')" v-if="item.order_status == 0">去支付</button> -->
								</view>
							</view>
						</view>
					</view>
					<view class="goods-item" v-if="item.order_type == 'way'" @click="toLink(item)">
						<view class="goods-head">
							<text>预订日期：{{dateFormat(item.start_time, 'yearMonthDayWeek')}}</text>
							<text>{{item.order_status_info.name}}</text>
						</view>
						<view class="goods-content">
							<image class="w-[40rpx]" :src="img('addon/tourism/tourism/member/way.png')" />
							<view>
								<view class="name-wrap">
									<view class="multi-hidden">{{item.way.way_name}}</view>
									<view>￥{{item.order_money}}</view>
								</view>
								<view class="desc">{{item.goods_name}}</view>
								<view class="desc">{{item.num}}张 {{dateFormat(item.start_time, 'monthDay')}}（出游）</view>
								<!-- <view class="time-wrap">
									<text class="nc-iconfont nc-icon-a-shijianV6xx-36"></text>
									<text>剩余支付时间：</text>
									<text>29分钟</text>
								</view> -->
								<view class="btn-wrap">
									<button class="!w-auto !h-[60rpx] !text-[23rpx] flex items-center" @click.stop="orderBtnFn(item,btnItem.key)" v-for="(btnItem,btnIndex) in item.order_status_info.member_action">{{btnItem.name}}</button>
									<!-- <button @click.stop="orderBtnFn(item,'buy')" v-if="item.order_status">在线咨询</button>
									<button @click.stop="orderBtnFn(item)" v-if="item.order_status == -1">删除订单</button>
									<button @click.stop="orderBtnFn(item)" v-if="item.order_status == 0">取消订单</button>
									<button type="primary" @click.stop="orderBtnFn(item,'pay')" v-if="item.order_status == 0">去支付</button> -->
								</view>
							</view>
						</view>
					</view>
					<view class="goods-item" v-if="item.order_type == 'scenic'" @click="toLink(item)">
						<view class="goods-head">
							<text>预订日期：{{dateFormat(item.start_time, 'yearMonthDayWeek')}}</text>
							<text>{{item.order_status_info.name}}</text>
						</view>
						<view class="goods-content">
							<image class="w-[40rpx]" :src="img('addon/tourism/tourism/member/scenic.png')" />
							<view>
								<view class="name-wrap">
									<view class="multi-hidden">{{item.scenic.scenic_name}}</view>
									<view>￥{{item.order_money}}</view>
								</view>
								<view class="desc">{{item.num}}人 {{dateFormat(item.start_time, 'yearMonthDay')}}出发（{{item.goods_name}}）</view>
								<view class="btn-wrap">
									<button class="!w-auto !h-[60rpx] !text-[23rpx] flex items-center" @click.stop="orderBtnFn(item,btnItem.key)" v-for="(btnItem,btnIndex) in item.order_status_info.member_action">{{btnItem.name}}</button>
									<!-- <button @click.stop="orderBtnFn(item,'buy')" v-if="item.order_status">在线咨询</button>
									<button @click.stop="orderBtnFn(item)" v-if="item.order_status == -1">删除订单</button>
									<button @click.stop="orderBtnFn(item)" v-if="item.order_status == 0">取消订单</button>
									<button type="primary" @click.stop="orderBtnFn(item,'pay')" v-if="item.order_status == 0">去支付</button> -->
								</view>
							</view>
						</view>
					</view>
				</template>
			</view>
			<mescroll-empty :option="{'icon': img('static/resource/images/empty.png')}" v-if="!list.length && loading"></mescroll-empty>
		</mescroll-body>
		<pay ref="payRef" @close="payClose"></pay>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { img, redirect } from '@/utils/common';
	import { getMemberOrderStatus, getMemberOrderList, cancelOrder, deleteOrder } from '@/addon/tourism/api/tourism';
	import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
	import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
	import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
	import { onLoad,onPageScroll, onReachBottom } from '@dcloudio/uni-app';

	const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
	let list = ref<Array<Object>>([]);
	let loading = ref<boolean>(false);
	let statusLoading = ref<boolean>(false);
	let orderState = ref('')
	let orderStateList = ref([]);

	onLoad((option: any) => {
		orderState.value = option.status || "";
		getMemberOrderStatusFn();
	});

	const getMemberOrderListFn = (mescroll) => {
		loading.value = false;
		let data : object = {
			page: mescroll.num,
			limit: mescroll.size,
			order_status: orderState.value
		};

		getMemberOrderList(data).then((res) => {
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

	const getMemberOrderStatusFn = () => {
		statusLoading.value = false;
		orderStateList.value = [];
		let obj = {name: '全部',status: ''};
		orderStateList.value.push(obj);

		getMemberOrderStatus().then((res) => {
			Object.values(res.data).forEach((item,index)=>{
				orderStateList.value.push(item);
			});
			statusLoading.value = true;
		}).catch(() => {
			statusLoading.value = true;
		})
	}
	// 取消订单
	const cancelOrderFn = (data) => {
		cancelOrder(data).then((res) => {
			getMescroll().resetUpScroll();
		}).catch(() => {
			getMescroll().resetUpScroll();
		})
	}
	// 删除订单
	const deleteOrderFn = (data) => {
		deleteOrder(data.order_id).then((res) => {
			getMescroll().resetUpScroll();
		}).catch(() => {
			getMescroll().resetUpScroll();
		})
	}

	const orderStateFn = (status)=>{
		orderState.value = status.toString();
		list.value = [];
		getMescroll().resetUpScroll();
	};

	const toLink = (res) => {
		redirect({ url: '/addon/tourism/pages/order/detail', param: { order_id : res.order_id } })
	}

	const dateFormat = (res, type)=>{
        const date = new Date(res)
		let data = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ];
		let time;
		const index = date.getDay();
		const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
		if(type == "yearMonthDay")
			time = data[0] + '年' + data[1] + '月' + data[2] + '日';
		else if(type == "yearMonthDayWeek")
			time = data[0] + '年' + data[1] + '月' + data[2] + '日 ' + week[index];
		else
			time = data[1] + '月' + data[2] + '日';

		return time;
	}

	// 支付
	const payRef = ref(null)
	const orderBtnFn = (data, type='')=>{
		if(type == 'pay')
			payRef.value?.open(data.order_type, data.order_id,`/addon/tourism/pages/order/detail?order_id=${data.order_id}`);
		else if(type == 'cancel'){
			cancelOrderFn(data);
		}else if(type == 'delete'){
			deleteOrderFn(data);
		}else if(type == 'buy'){
			if(data.order_type == 'scenic'){
				redirect({ url: '/addon/tourism/pages/scenic/list'});
			}else if(data.order_type == 'way'){
				redirect({ url: '/addon/tourism/pages/way/list'});
			}else if(data.order_type == 'hotel'){
				redirect({ url: '/addon/tourism/pages/hotel/list'});
			}
		}
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
		margin: 20rpx 20rpx 0;
		.goods-item{
			@apply w-full flex flex-col mb-3 bg-[#fff] py-3 px-4 box-border;
			border-radius: 18rpx;
			overflow: hidden;
			.goods-head{
				@apply flex justify-between pb-3 border-0 border-b-1 border-solid border-[#F0F0F0] mb-4;
				font-size: 26rpx;
				color: #666;
			}
			.goods-content{
				@apply flex;
				& > image{
					width: 40rpx;
					height: 40rpx;
					margin-right: 30rpx;
				}
				& > view{
					flex: 1;
				}
				.name-wrap{
					display: flex;
					justify-content: space-between;
					margin-bottom: 30rpx;
					&> view{
						&:first-of-type{
							font-weight: bold;
							font-size: 30rpx;
						}
						&:last-of-type{
							color: #EA4B69;
							font-size: 28rpx;
							font-weight: bold;
						}
					}
				}
				.desc{
					color: #686868;
					font-size: 26rpx;
					margin-bottom: 14rpx;
				}
				.time-wrap{
					display: flex;
					align-items: center;
					background-color: #F6F7FB;
					border-radius: 8rpx;
					height: 62rpx;
					font-size: 26rpx;
					padding: 0 16rpx;
					text{
						&:nth-child(1){
							color: #444;
							margin-right: 14rpx;
						}
						&:nth-child(2){
							color: #686868;
						}
						&:nth-child(3){
							color: #333;
							font-weight: bold;
						}
					}
				}
				.btn-wrap{
					justify-content: flex-end;
					@apply flex margin-0 mt-2 flex-wrap;
					button{
						width: 172rpx;
						height: 64rpx;
						font-size: 26rpx;
						@apply rounded-3xl;
						line-height: 64rpx;
						background-color: transparent;
						margin: 0;
						margin-left: 20rpx;
						@apply mt-2;
						border: 2rpx solid #E2E2E2;
						&[type="primary"]{
							background-color: $u-primary;
						}
						&::after{
							border: none;
						}
					}
				}
			}
		}
	}
	.class-select{
		position: relative;
		font-weight: bold;
		&::after{
			content: "";
			position: absolute;
			bottom: 0;
			height: 6rpx;
			background-color: $u-primary;
			width: 90%;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
