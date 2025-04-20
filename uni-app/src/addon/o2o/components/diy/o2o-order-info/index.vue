<template>
	<view :style="warpCss">
		<view class="diy-text relative">
			<view class="px-[var(--pad-sidebar-m)] pt-[var(--pad-top-m)] pb-[40rpx] flex items-center justify-between">
				<view @click="diyStore.toRedirect(diyComponent.link)">
					<view class="max-w-[200rpx] truncate leading-[1] text-[30rpx]" :style="{ fontSize: diyComponent.fontSize * 2 + 'rpx', color: diyComponent.textColor, fontWeight: (diyComponent.fontWeight == 'normal' ? 500 : diyComponent.fontWeight) }">
						{{ diyComponent.text }}
					</view>
				</view>
				<view class="flex items-center">
					<view  @click="redirect({ url: '/addon/o2o/pages/order/list'})" class="flex items-center">
						<text class="max-w-[200rpx] truncate text-[24rpx]" :style="{ color: diyComponent.more.color }">{{ diyComponent.more.text }}</text>
						<text class="nc-iconfont nc-icon-youV6xx text-[24rpx]" :style="{ color: diyComponent.more.color }"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="pb-[var(--pad-top-m)] px-[var(--pad-sidebar-m)] flex items-center justify-between text-center">
			<view class="flex flex-col items-center w-[20%] flex-shrink-0" @click="toList('wait_pay')">
				<view class="relative w-[44rpx] h-[44rpx]">
					<image class="w-[44rpx] h-[44rpx]" :src="img('addon/o2o/diy/member/wait_pay.png')" />
					<view v-if="orderInfo.wait_pay"
						:class="['absolute left-[35rpx] top-[-10rpx] rounded-[28rpx] h-[28rpx] min-w-[28rpx] text-center leading-[30rpx] bg-[#FF4646] text-[#fff] text-[20rpx] font-500 box-border', orderInfo.wait_pay > 9 ? 'px-[10rpx]' : '']">
						{{ orderInfo.wait_pay > 99 ? "99+" : orderInfo.wait_pay }}
					</view>
				</view>
				<view class="mt-[20rpx] leading-[1]" :style="{
					fontSize: diyComponent.item.fontSize * 2 + 'rpx',
					color: diyComponent.item.color,
					fontWeight: diyComponent.item.fontWeight
				}">待支付</view>
			</view>
			<view class="flex flex-col items-center w-[20%] flex-shrink-0" @click="toList('wait_service')">
				<view class="relative w-[44rpx] h-[44rpx]">
					<image class="w-[44rpx] h-[44rpx]" :src="img('addon/o2o/diy/member/wait_service.png')" />
					<view v-if="orderInfo.wait_service"
						:class="['absolute left-[35rpx] top-[-10rpx] rounded-[28rpx] h-[28rpx] min-w-[28rpx] text-center leading-[30rpx] bg-[#FF4646] text-[#fff] text-[20rpx] font-500 box-border', orderInfo.wait_shipping > 9 ? 'px-[10rpx]' : '']">
						{{ orderInfo.wait_service > 99 ? "99+" : orderInfo.wait_service }}
					</view>
				</view>
				<view class="mt-[20rpx] leading-[1]" :style="{
					fontSize: diyComponent.item.fontSize * 2 + 'rpx',
					color: diyComponent.item.color,
					fontWeight: diyComponent.item.fontWeight
				}">待服务</view>
			</view>
			<view class="flex flex-col items-center w-[20%] flex-shrink-0" @click="toList('in_service')">
				<view class="relative w-[44rpx] h-[44rpx]">
					<image class="w-[44rpx] h-[44rpx]" :src="img('addon/o2o/diy/member/in_service.png')" />
					<view v-if="orderInfo.in_service"
						:class="['absolute left-[35rpx] top-[-10rpx] rounded-[28rpx] h-[28rpx] min-w-[28rpx] text-center leading-[30rpx] bg-[#FF4646] text-[#fff] text-[20rpx] font-500 box-border', orderInfo.wait_take > 9 ? 'px-[10rpx]' : '']">
						{{ orderInfo.in_service > 99 ? "99+" : orderInfo.in_service }}
					</view>
				</view>
				<view class="mt-[20rpx] leading-[1]" :style="{
					fontSize: diyComponent.item.fontSize * 2 + 'rpx',
					color: diyComponent.item.color,
					fontWeight: diyComponent.item.fontWeight
				}">服务中</view>
			</view>
			<view class="flex flex-col items-center w-[20%] flex-shrink-0" @click="toList('finish')">
				<view class="relative w-[44rpx] h-[44rpx]">
					<image class="w-[44rpx] h-[44rpx]" :src="img('addon/o2o/diy/member/finish.png')" />
					<view v-if="orderInfo.finish"
						:class="['absolute left-[35rpx] top-[-10rpx] rounded-[28rpx] h-[28rpx] min-w-[28rpx] text-center leading-[30rpx] bg-[#FF4646] text-[#fff] text-[20rpx] font-500 box-border', orderInfo.evaluate > 9 ? 'px-[10rpx]' : '']">
						{{ orderInfo.finish > 99 ? "99+" : orderInfo.finish }}
					</view>
				</view>
				<view class="mt-[20rpx] leading-[1]" :style="{
					fontSize: diyComponent.item.fontSize * 2 + 'rpx',
					color: diyComponent.item.color,
					fontWeight: diyComponent.item.fontWeight
				}">已完成</view>
			</view>
			<view class="flex flex-col items-center w-[20%] flex-shrink-0" @click="redirect({ url: '/addon/o2o/pages/refund/list'})">
				<view class="relative w-[44rpx] h-[44rpx]">
					<image class="w-[44rpx] h-[44rpx]" :src="img('addon/o2o/diy/member/refund1.png')" />
					<view v-if="orderInfo.refund"
						:class="['absolute left-[35rpx] top-[-10rpx] rounded-[28rpx] h-[28rpx] min-w-[28rpx] text-center leading-[30rpx] bg-[#FF4646] text-[#fff] text-[20rpx] font-500 box-border', orderInfo.refund > 9 ? 'px-[10rpx]' : '']">
						{{ orderInfo.refund > 99 ? "99+" : orderInfo.refund }}
					</view>
				</view>
				<view class="mt-[20rpx] leading-[1]" :style="{
					fontSize: diyComponent.item.fontSize * 2 + 'rpx',
					color: diyComponent.item.color,
					fontWeight: diyComponent.item.fontWeight
				}">售后/退款</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref, computed, watch,onMounted } from 'vue';
	import useDiyStore from '@/app/stores/diy';
	import { img,redirect } from '@/utils/common';
	import { getOrderNum } from '@/addon/o2o/api/order';

	const props = defineProps(['component', 'index']);
	const diyStore = useDiyStore();
	const diyComponent = computed(() => {
		if (diyStore.mode == 'decorate') {
			return diyStore.value[props.index];
		} else {
			return props.component;
		}
	})

	onMounted(() => {
		refresh();
	});

	watch(() => diyComponent.value, (newValue, oldValue) => {
      refresh();
  },{deep: true})

	const refresh = () => {
      // 装修模式
      if (diyStore.mode == 'decorate') {
          orderInfo.value = {}
      } else {
          getOrderNumFn()
      }
  }

	const orderInfo = ref({})
	const warpCss = computed(() => {
		var style = '';
	    style += 'position:relative;';
	    if(diyComponent.value.componentStartBgColor) {
	        if (diyComponent.value.componentStartBgColor && diyComponent.value.componentEndBgColor) style += `background:linear-gradient(${diyComponent.value.componentGradientAngle},${diyComponent.value.componentStartBgColor},${diyComponent.value.componentEndBgColor});`;
	        else style += 'background-color:' + diyComponent.value.componentStartBgColor + ';';
	    }

		if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		return style;
	})

	const getOrderNumFn=()=>{
		getOrderNum().then((res:any)=>{
			orderInfo.value = res.data
		})
	}
	const toList = (status:any) => {
		redirect({ url: '/addon/o2o/pages/order/list', param: { order_status: status } })
	}
</script>

<style>
</style>
