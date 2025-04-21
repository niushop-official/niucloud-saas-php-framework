<template>
	<view class="bg-[#f8f8f8] min-h-screen overflow-hidden" :style="themeColor()">
		<view class="bg-linear h-[480rpx] text-white px-4 pt-5">
			<view class="text-[42rpx] flex items-baseline">
				<text class="nc-iconfont nc-icon-a-shijianV6xx-36 text-[42rpx] mr-1"></text>
				<text class="font-bold">订单待使用</text>
			</view>
			<view class="text-xs mt-3">您的订单已生成，请尽快使用！</view>
		</view>

		<view class="bg-white mx-3 py-4 px-3 rounded-md -mt-[340rpx] box-border">
			<view class="flex border-0 border-b-1 border-dashed border-[#EAEAEA] pb-4 mb-4">
				<image class="w-[124rpx] h-[124rpx] mr-2 rounded" :src="img('addon/tourism/tourism/index/goods_04.png')" />
				<view class="flex-1 flex flex-col">
					<view class="text-[#1A2336] text-[30rpx] font-bold truncate">唯选酒店(太原长风街北美新天地)</view>
					<view class="flex items-center text-[#7F7F85] text-xs mt-[12rpx]">寇庄西路西百万庄园西区5排8号</view>
					<view class="font-bold text-sm text-[#222] mt-auto price-font">￥25</view>
				</view>
			</view>

			<view class="bg-[#F9FBFF] rounded-lg overflow-hidden mb-4">
				<view class="bg-[#EEF3FF] flex items-center text-sm py-3 justify-center triangle">
					请提醒商家
					<text class="text-[#EA4B69]">【扫码核销】</text>
					使用
				</view>
				<view class="flex flex-col items-center pb-4">
					<image class="w-[326rpx] h-[326rpx] mt-4 mb-4" :src="img('addon/tourism/tourism/index/goods_04.png')" />
					<image class="w-[524rpx] h-[128rpx] mb-3" :src="img('addon/tourism/tourism/index/goods_04.png')" />
					<view class="text-[var(--text-color-light6)] text-xs">未消费前请不要将券码提供给商家</view>
				</view>
			</view>
			<view>
				<view class="flex items-center justify-between">
					<view class="flex items-center">
						<text class="text-sm">券码 8066843434542462</text>
						<text class="nc-iconfont nc-icon-fuzhiV6xx ml-2 text-[#636363]"></text>
					</view>
					<text class="text-[#696969] text-[26rpx]">待使用</text>
				</view>
				<view class="text-[#696969] text-xs mt-1">2043-06-09 23:59:59 到期</view>
			</view>
		</view>

		<view class="mt-3 bg-white mx-3 px-3 py-4 rounded-md">
			<view class="text-[#1A2336] text-[30rpx] font-bold mb-4">订单信息</view>
			<view class="border-0 border-b-1 border-solid border-[#EAEAEA] mb-1 pb-4">
				<view class="flex items-center">
					<view class="flex flex-col items-center">
						<text class="text-[26rpx] text-[#1A2336]">9月2日 周五</text>
						<text class="text-xs text-[#888] mt-1">14:00后入住</text>
					</view>
					<view class="ml-4 mr-4 relative w-[136rpx] text-center">
						<text class="text-white relative z-10 text-xs font-scale bg-[#1C283E] px-2 py-1 rounded-xl w-[90rpx] box-border break-keep">共1晚</text>
						<text class="nc-iconfont nc-icon-zhixiang-youjiantouV6xx absolute left-0 right-0 text-[90rpx] top-[50%] translate-y text-[#ABABAB]"></text>
					</view>
					<view class="flex flex-col items-center">
						<text class="text-[26rpx] text-[#1A2336]">9月3日 周六</text>
						<text class="text-xs text-[#888] mt-1">12:00前离店</text>
					</view>
				</view>
				<view class="mt-3 text-[#1A2336] text-[26rpx] font-bold">
					智能特惠大床房(天猫精灵+智能客控)标准件
				</view>
				<view class="mt-1 text-[#1A2336] text-[26rpx] font-bold flex items-center">
					<text class="nc-iconfont nc-icon-fengefuV6xx"></text>
					<text>共一间</text>
				</view>
				<view class="mt-3 text-[#1A2336] text-[26rpx] font-bold">
					无早餐
				</view>
			</view>
			<u--form labelPosition="left" ref="form1" labelWidth="90" :labelStyle="{color: '#A3A3A3', fontSize: '14px'}">
				<u-form-item label="入住姓名" prop="userInfo.name" borderBottom>
					<view class="border-style">
						马云
					</view>
				</u-form-item>
				<u-form-item label="联系电话" prop="userInfo.name" borderBottom>
					<view class="border-style">
						18535948334
					</view>
				</u-form-item>
				<u-form-item label="最晚入住" prop="userInfo.name" borderBottom>
					<view class="border-style">
						2023年06月08日18:00
					</view>
				</u-form-item>
				<u-form-item label="订单编号" prop="userInfo.name" borderBottom>
					<view class="border-style w-full !border-0 flex justify-between items-end">
						<text>18823948559</text>
						<text class="text-xs text-[#7D7C82]">复制</text>
					</view>
				</u-form-item>
			</u--form>
		</view>

		<view class="h-[160rpx] w-full"></view>
		<view class="flex justify-between items-center bg-white p-3 fixed left-0 right-0 bottom-0 z-10">
			<view class="flex flex-col items-center justify-center" @click="toIndex">
				<text class="nc-iconfont nc-icon-shouye-xiaolianV6xx text-[46rpx] text-[#333]"></text>
				<text class="text-xs mt-[2rpx] font-scale">首页</text>
			</view>
			<button type="primary" :plain="true" class="rounded-3xl text-[26rpx] w-[200rpx] h-[70rpx] leading-[70rpx] mr-3 ml-auto">申请退款</button>
			<button type="primary" class="rounded-3xl text-[26rpx] w-[200rpx] h-[70rpx] leading-[70rpx] m-0">再来一单</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, computed } from 'vue';
	import { img,redirect } from '@/utils/common';

	let carousel = ref([
		img('addon/tourism/tourism/index/carousel.png')
	])

    // 跳转到旅游首页
    const toIndex = ()=>{
        redirect({ url: '/addon/tourism/pages/index', mode: 'reLaunch'});
    }
</script>
<style lang="scss" scoped>
	.text-color{
		color: $u-primary;
	}
	.bg-color{
		background-color: $u-primary;
	}
	.bg-linear{
		background: linear-gradient(360deg, #F8F8F8 0%, $u-primary 100%);
	}
	.font-scale{
		transform: scale(0.9);
	}
	.triangle{
		@apply relative;
		&::after{
			content: "";
			@apply absolute;
			width: 0;
			height: 0;
			position: absolute;
			bottom: -40rpx;
			border: 20rpx solid #EEF3FF;
			border-left-color: transparent;
			border-right-color: transparent;
			border-bottom-color: transparent;
		}
	}
	.translate-y{
		transform: translateY(-50%);
	}
</style>
