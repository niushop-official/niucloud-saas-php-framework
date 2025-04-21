<template>
	<view class="bg-[#f8f8f8] min-h-screen overflow-hidden" :style="themeColor()">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="{ use: false }" @up="getListFn">
			<view>
				<view class="bg-white mx-3 mt-2 flex px-[24rpx] py-[30rpx] border-0 border-b-1 border-solid border-[#F0F0F0] rounded-lg" v-for="(item,index) in list" :key="item.goods_id" @click="toLink(item.goods_id)">
					<image class="w-[240rpx] h-[180rpx] mr-[20rpx] rounded-md" :src="img(item.cover_thumb_mid)" mode="aspectFill" />
					<view class="flex flex-col flex-1">
						<view class="text-sm font-bold multi-hidden">{{item.goods_name}}</view>
						<view class="flex items-center mt-1 text-[#F55246] text-xs font-bold">
							<view>￥<text class="text-base">{{item.price}}</text></view>
						</view>
						<view class="flex items-center mt-auto justify-between">
							<text class="text-sm text-[#888]">{{t('soldOut')}} {{item.sale_num}}</text>
							<button type="primary" class="rounded-3xl text-[26rpx] w-[160rpx] h-[60rpx] leading-[60rpx] mx-0">{{t('cardBtn')}}</button>
						</view>
					</view>
				</view>
			</view>
			<mescroll-empty :option="{'icon': img('static/resource/images/empty.png')}" v-if="!list.length && loading"></mescroll-empty>
		</mescroll-body>
		<tabbar />
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { img, redirect } from '@/utils/common';
	import { getCardList} from '@/addon/vipcard/api/vipcard';
	import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
	import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
	import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
	import { onPageScroll, onReachBottom } from '@dcloudio/uni-app';
	import { t } from '@/locale';

	const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);

	let list = ref<Array<Object>>([]);
	let loading = ref<boolean>(false);
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
	const getListFn = (mescroll : mescrollStructure) => {
		loading.value = false;
		let data : object = {
			page: mescroll.num,
			limit: mescroll.size
		};

		getCardList(data).then((res : acceptingDataStructure) => {
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
	const toLink = (id : string) => {
		redirect({ url: '/addon/vipcard/pages/card/detail', param: { id } })
	}
</script>
