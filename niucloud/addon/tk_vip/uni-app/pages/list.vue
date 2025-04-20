<template>
	<view class="bg-[#f8f8f8] min-h-screen overflow-hidden" :style="themeColor()">

		<mescroll-body ref="mescrollRef" top="64rpx" @init="mescrollInit" @down="downCallback" @up="getOrderListFn">
			<view class="font-bold ml-2 text-[32rpx]" mb-2>购买记录</view>
			<view v-if="list.length > 0" class="tk-card" v-for="(item, index) in list" :key='index'>
				<view class="flex items-center justify-between">
					<view class="font-bold text-xs">{{ item.body }}</view>

					<view class="text-[#f43034]">￥{{ item.order_money }}</view>
				</view>
				<view class="line-box mb-1"></view>
				<view class="flex items-center justify-between">
					<view class="text-xs text-red-400">{{ item.level_id_name }}</view>
					<view class="text-xs text-slate-500">{{ item.create_time }}</view>
				</view>
			</view>
			<mescroll-empty :option="{ 'icon': img('static/resource/images/empty.png') }"
				v-if="!list.length && loading"></mescroll-empty>
		</mescroll-body>
		<pay ref="payRef" @close="payLoading = false"></pay>
	</view>
	<button @click="redirect({ url: '/addon/tk_vip/pages/index', mode: 'reLaunch' })"
		class="fixed bottom-48 right-4 z-50 rounded-full p-2 text-white hover:bg-blue-700">
		<u-icon name="arrow-left-double" color="#000000" size="24"></u-icon>
	</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { img, redirect } from '@/utils/common';
import { getOrderList } from '@/addon/tk_vip/api/order';
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app';

const payRef = ref(null)
const payLoading = ref(false)
const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
let list = ref<Array<Object>>([]);
let loading = ref<boolean>(false);
let statusLoading = ref<boolean>(false);
let orderState = ref('')
let orderStateList = ref([]);
const listData = ref([])
onLoad((option) => {
	orderState.value = option.status || "";
});


const getOrderListFn = (mescroll) => {
	loading.value = false;
	let data: object = {
		page: mescroll.num,
		limit: mescroll.size,
		status: orderState.value
	};
	getOrderList(data).then((res) => {
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
</script>
<style lang="scss" scoped>
@import '@/addon/tk_vip/utils/styles/common.scss';

.class-select {
	position: relative;
	font-weight: bold;

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		height: 6rpx;
		background-color: var(--primary-color);
		width: 90%;
		left: 50%;
		transform: translateX(-50%);
	}
}
</style>