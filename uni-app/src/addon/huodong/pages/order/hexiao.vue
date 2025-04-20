<template>
	<view class="u-skeleton">
		<view v-if="info" :class="['bg-white flex align-center p-[10px]']  " @click="toLink(info.id)">
			<u--image width="220rpx" height="220rpx" :src="img(info.image)"  class="mr-[10px]" v-if="info.image" model="aspectFill" :border-radius="20">
			</u--image>
			<view class="flex-1 flex flex-col justify-between ">
				<view class="text-[16px] leading-[1.3] multi-hidden mt-[2px]" style="font-weight: bold;">{{info.name}}
				</view>
				<view class="text-[14px]  mb-[10px] mt-[10px] text-gray-500 ">
					<!-- <text class="catename">{{item.cate_id_name}}</text> -->
					<text style="background:#ff9900;color:#fff;font-size:10px;padding:8rpx 10rpx;border-radius: 5rpx;">{{info.cate_id_name}}</text>

				</view>
				<view class="text-[12px]  flex justify-between mb-[5px]">
					<text>活动地址: {{info.address}}</text>
				</view>
				<view class="text-[12px]  flex justify-between mb-[5px]">
					<text>活动开始时间: {{info.startime}}</text>
				</view>
				<view class="text-[12px]  flex justify-between mb-[5px]">
					<text>活动结束时间: {{info.endtime}}</text>
				</view>
			</view>
		</view>
		<view class="list" style="margin-top:30rpx">
			<view class="item flex" v-if="order.realname">
				<view class="left">姓名：</view>
				<view class="right">{{order.realname}}</view>
			</view>
			<view class="item flex" v-if="order.mobile">
				<view class="left">联系电话：</view>
				<view class="right">{{order.mobile}}</view>
			</view>
		</view>

		<view class="list" style="margin-top:30rpx">
			<view class="item flex">
				<view class="left">报名编号：</view>
				<view class="right">{{order.order_no}}</view>
			</view>
			<view class="item flex">
				<view class="left">报名状态：</view>
				<view class="right">{{order.order_status_info?.name}}</view>
			</view>
			<view class="item flex" v-if="order.order_money>0">
				<view class="left">报名费用：</view>
				<view class="right" style="color:red">￥{{order.order_money}}</view>
			</view>
			<view class="item flex">
				<view class="left">报名用户：</view>
				<view class="right">{{order.member_id_name}}</view>
			</view>
			<view class="item flex">
				<view class="left">报名时间：</view>
				<view class="right">{{order.create_time}}</view>
			</view>
			
			<view class="item flex" v-if="order.hx_member_name">
				<view class="left">核销人员：</view>
				<view class="right">{{order.hx_member_name}}</view>
			</view>
			<view class="item flex" v-if="order.hx_time">
				<view class="left">核销时间：</view>
				<view class="right">{{order.hx_time}}</view>
			</view>
		</view>
		<view class=" footbox flex">
			<u-button type="primary" v-if="order.order_status==2" @click="submit">确定核销</u-button>
			<u-button type="primary" disabled plain color="#666" v-else>{{order.order_status_info.name}}</u-button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import { redirect, img } from '@/utils/common';
	import { getOrderDetail, hexiaoOrder } from '@/addon/huodong/api/order'

	// uni.setStorageSync('huodong_seller',{aa:1212});
	const id = ref('');
	const order = ref('');
	const info = ref('');
	onLoad((query : any) => {
		id.value = query.id || '';
		uni.setStorageSync('huodong_order_id',id.value);
		if(!id.value){
			id.value = uni.getStorageSync('huodong_order_id');
		}
		togetOrderDetail();
	})

	// const seller = uni.getStorageSync('huodong_seller');
	// console.log('seller',seller);
	// if(!seller){
	// 	uni.setStorageSync('huodong_backurl','/addon/huodong/pages/order/hexiao?id='+form.value.id);
	// 	uni.redirectTo({
	// 		url:'/addon/huodong/pages/seller/login'
	// 	});
	// }

	const togetOrderDetail = () => {
		if(!id.value)return;
		getOrderDetail(id.value).then((res : any) => {
			order.value = res.data
			info.value = res.data.act
		}).catch(() => {
		})
	}
	const submit = () => {
		uni.showModal({
			title: '提示', content: '确定核销吗?',
			success: function (res) {
				if (res.confirm) {
					hexiaoOrder(id.value).then((res) => {
						uni.showToast({ title: '核销成功' });
						setTimeout(function () {
							togetOrderDetail();
						}, 1500);
						return;
					})
				}
			}
		})
	}
</script>

<style>
	page {
		background: #f5f5f5;
	}

	.list {
		width: 100%;
		background: #fff;
	}

	.list .item {
		margin: 0 3%;
		border-bottom: 1px solid #eee;

		padding: 20rpx 0;
	}

	.list .item .left {
		flex: 0.3;
		font-weight: 600;
		flex-shrink: 0;
	}

	.list .item .right {
		height: 60rpx;
		flex: 1;
		padding: 0 0;

	}

	.footbox {
		margin: 50rpx 0 ;
		width: 94%;
		padding: 10rpx 3%;
		z-index: 100;
	}
</style>