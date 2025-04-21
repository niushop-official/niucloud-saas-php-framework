<template>
	<view :style="themeColor()">
		<view class="bg-[#f7f7f7] min-h-screen overflow-hidden bg-contain bg-no-repeat" :style="{'background-image': 'url('+ img('addon/tourism/tourism/member/member_bg.png') +')'}" v-if="info">
			<view class="pt-6">
				<view class="m-3 px-4 flex items-center">
					<image class="w-[128rpx] h-[128rpx] rounded-full mr-3" :src="img('addon/tourism/tourism/member/member_head.png')" mode="widthFix" />
					<view class="flex flex-col">
						<text class="text-[34rpx] font-bold">{{info.nickname}}</text>
						<image class="w-[96rpx] mt-2 h-[46rpx] rounded-xl mr-3" :src="img('addon/tourism/tourism/member/member_sign.png')" />
					</view>
				</view>

				<view class="member-list show">
					<view class="member-item">
						<text>{{money}}</text>
						<text>余额</text>
					</view>
					<view class="member-item">
						<text>{{ parseInt(info?.point) || 0 }}</text>
						<text>积分</text>
					</view>
				</view>
			</view>

			<view class="bg-white m-3 p-4 pt-5 rounded-lg member-list order">
				<view class="member-item" @click="toLink('/addon/tourism/pages/order/list')">
					<image :src="img('addon/tourism/tourism/member/unpaid_order.png')" mode="widthFix" />
					<text>待支付</text>
				</view>
				<view class="member-item" @click="toLink('/addon/tourism/pages/order/list')">
					<image :src="img('addon/tourism/tourism/member/waiting_order.png')" mode="widthFix" />
					<text>待使用</text>
				</view>
				<view class="member-item" @click="toLink('/addon/tourism/pages/order/list')">
					<image :src="img('addon/tourism/tourism/member/remain_order.png')" mode="widthFix" />
					<text>已使用</text>
				</view>
				<view class="member-item" @click="toLink('/addon/tourism/pages/order/list')">
					<image :src="img('addon/tourism/tourism/member/all_order.png')" mode="widthFix" />
					<text>全部订单</text>
				</view>
			</view>

			<view class="bg-white m-3 p-4 rounded-lg">
				<view class="mb-1 font-bold text-[30rpx]">
					我的工具
				</view>
				<view class="member-list">
					<view class="member-item" @click="toLink('/addon/app/pages/member/personal')">
						<image :src="img('addon/tourism/tourism/member/vert_m_personal.png')" mode="widthFix" />
						<text>个人信息</text>
					</view>
					<view class="member-item" @click="toLink('/addon/app/pages/member/point')">
						<image :src="img('addon/tourism/tourism/member/vert_m_point.png')" mode="widthFix" />
						<text>我的积分</text>
					</view>
					<view class="member-item" @click="toLink('/addon/app/pages/member/balance')">
						<image :src="img('addon/tourism/tourism/member/vert_m_balance.png')" mode="widthFix" />
						<text>我的余额</text>
					</view>
					<view class="member-item">
						<image :src="img('addon/tourism/tourism/member/vert_m_service.png')" mode="widthFix" />
						<text>联系客服</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, computed } from 'vue';
	import useMemberStore from '@/stores/member'
	import { img, redirect, moneyFormat } from '@/utils/common';

	const memberStore = useMemberStore()

	const info = computed(() => {
		return memberStore.info;
	})

	const money = computed(() => {
		if (info.value) {
			let m = parseFloat(info.value.balance) + parseFloat(info.value.money)
			return moneyFormat(m.toString());
		} else {
			return 0;
		}
	})

	const toLink = (url: any) => {
		redirect({ url })
	}
</script>
<style lang="scss" scoped>
	.member-list{
		@apply flex flex-wrap;
		.member-item{
			@apply flex flex-col items-center  justify-center mt-3 ;
			width: 98rpx;
			padding: 0;
			image{
				width: 44rpx;
				height: 44rpx;
			}
			& > text{
				@apply mt-2;
				font-size: 24rpx;
				color: #686868;
			}
		}
		&.order{
			@apply flex justify-between;
			.member-item{
				@apply mt-0;
				width: auto;
				& > image{
					width: 52rpx;
					height: 52rpx;
				}
				& > text{
					font-size: 28rpx;
					color: #323232;
					@apply font-bold;
				}
			}
		}
		&.show{
			@apply m-3 px-4 flex justify-around;
			.member-item{
				@apply mt-0;
				width: auto;
				& > text{
					&:first-of-type{
						font-size: 44rpx;
						color: #323232;
						@apply font-bold;
					}
					&:last-of-type{
						@apply '!text-xs mt-1';
						color: #999 !important;
					}
				}

			}
		}
	}
</style>
