<template>
	<view class="u-skeleton" style="font-size:14px;">
		<view v-if="info" :class="['bg-white flex align-center p-[10px]']  " @click="toLink(info.id)">
			<u--image width="220rpx" height="220rpx" :src="img(info.image)" v-if="info.image" model="aspectFill" :border-radius="20">
			</u--image>
			<view class="flex-1 flex flex-col justify-between " style="margin-left:16rpx">
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
			<!-- <view class="item flex" v-if="order.douyin_url">
				<view class="left">抖音链接：</view>
				<view class="right">{{order.douyin_url}}</view>
			</view>
			<view class="item flex" v-if="order.shipinhao_url">
				<view class="left">视频号链接：</view>
				<view class="right">{{order.shipinhao_url}}</view>
			</view>
			<view class="item flex" v-if="order.xiaohongshu_url">
				<view class="left">小红书链接：</view>
				<view class="right">{{order.xiaohongshu_url}}</view>
			</view>
			<view class="item flex" v-if="order.kuaishou_url">
				<view class="left">快手链接：</view>
				<view class="right">{{order.kuaishou_url}}</view>
			</view>
			<view class="item flex" v-if="order.jietu_image" style="height:auto">
				<view class="left">图片：</view>
				<view class="right">
					<image :src="order.jietu_image" @click="lookimg([order.jietu_image])" style="width: 150rpx;height:150rpx"></image>
				</view>
			</view> -->
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
			<view class="flex u-flex-end u-padding-10 " v-if="order.order_status_info">
								<view></view>
								<view style="width: 150rpx;margin-left: 30rpx;" v-for="(it) in order.order_status_info.member_action"
									@click="tobtn(order,it.op)">
									<up-button type="primary" size="small" :plain="it.class=='warning'" :text="it.name"
										:color="it.color"></up-button>
								</view>
							</view>
		</view>
		
		<view class="bg-white" v-if="info.hidecontent" style="padding: 20rpx 3% 0;margin-top:30rpx">
			<view style="font-weight: bold;">报名内部信息</view>
			<view class="u-content">
				<up-parse :content="info.hidecontent"></up-parse>
			</view>
		</view>
		
		
		<up-popup v-model:show="showhexiao" mode="center" round="10">
			<view class="u-padding-30">
				<view class="font-bold text-center text-l" style="font-size:22px">出示核销</view>
				<view class="u-padding-30" v-if="orderinfo">
					<up-qrcode :size="200" :val="orderinfo.hexiao_url"></up-qrcode>
				</view>
				<up-button type="primary" @click="showhexiao=false">确定</up-button>
			</view>
		</up-popup>
		
		
	</view>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import { redirect, img } from '@/utils/common';
	import { lookimg } from '@/addon/huodong/utils/common';
	import { getOrderDetail, hexiaoOrder,closeOrder } from '@/addon/huodong/api/order'
	import { getconfig } from '@/addon/huodong/api/act'

	const id = ref('');
	const order = ref('');
	const info = ref('');
	onLoad((query : any) => {
		id.value = query.id || 1;
		togetOrderDetail();
	})

	const togetOrderDetail = () => {
		getOrderDetail(id.value).then((res : any) => {
			order.value = res.data
			info.value = res.data.act
		}).catch(() => {
		})
	}
	
	
	const config = ref();
	getconfig().then((res) => {
		config.value = res.data
	})
	
	const orderinfo = ref();
	const showhexiao = ref<Boolean>(false);
	const tobtn = (item, op) => {
		orderinfo.value = item;
		if (op == 'hexiao') {
			showhexiao.value = true;
		} else if (op == 'cancel') {
			
			var msg = '确定取消吗?';
			if(Number(config.value.cancel_del_jifen)>0){
				msg ='取消报名需要扣除'+config.value.cancel_del_jifen+'积分, 确定继续取消吗?'
			}
			uni.showModal({
				title: '提示', content: msg,
				success: function (res) {
					if (res.confirm) {
						closeOrder(item.order_id).then((res : acceptingDataStructure) => {
							uni.showToast({
								title: '取消成功'
							})
							setTimeout(function(){
								togetOrderDetail();
							},1500)
						})
					}
				}
			})
		} else if (op == 'pay') {
			payRef.value?.open('huodong', item.order_id, '/addon/huodong/pages/order/list');
		}
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
		/* height: 60rpx; */
		flex: 1;
		padding: 0 0;

	}

	.footbox {
		margin-top: 80rpx;
		width: 94%;
		padding: 10rpx 3%;
		z-index: 100;
	}
</style>