<template>
    <view class="bg-[#f8f8f8] min-h-screen overflow-hidden" :style="themeColor()">
    	<view class="fixed left-0 top-0 right-0 z-10" v-if="statusLoading">
    		<scroll-view scroll-x="true" class="scroll-Y box-border px-[24rpx] bg-white">
    			<view class="flex whitespace-nowrap justify-around">
    				<view :class="['text-sm leading-[90rpx]',{'class-select': orderState === item.status.toString()}]" @click="orderStateFn(item.status)" v-for="(item,index) in orderStateList">{{item.name}}</view>
    			</view>
    		</scroll-view>
    	</view>

        <mescroll-body ref="mescrollRef" top="114rpx" @init="mescrollInit" :down="{ use: false }" @up="getReserveListFn">
            <template v-for="(item, index) in list" :key="item.order_id">
                <view class="mx-3 mb-3 bg-white p-3 rounded">
                    <view class="flex justify-between items-center text-sm text-gray-500 mb-3 pb-3 border-0 border-b border-slate-200 border-solid">
                        <view>{{ dateFormat(item.create_time) }}</view>
                        <text>{{item.reserve_state_name}}</text>
                    </view>
                    <view class="flex">
                      <image :src="img(item.goods.cover_thumb_mid)" mode="widthFix" class="w-[160rpx] h-[160rpx] mr-2 overflow-hidden rounded" />
                        <view class="flex-1 flex flex-col py-2">
                          <view class="font-bold truncate text-sm">{{ item.goods.goods_name }}</view>
                          <view class="flex items-center text-[#FA6400] text-xs mt-auto">
                            <text class="ml-[2rpx]">￥</text>
                            <text class="text-[38rpx]">{{ item.goods.price }}</text>
                          </view>
                        </view>
                    </view>
                    <view class="flex justify-end mt-3">
                        <u-button text="预约详情" class="!w-auto mx-0 ml-2" shape="circle" size="small" @click="redirect({ url: '/addon/vipcard/pages/order/my_reserved_detail', param: { 'id': item.reserve_id }})"></u-button>
                        <u-button text="取消预约" class="!w-auto mx-0 ml-2" shape="circle" size="small" v-if="['1','4'].includes(item.reserve_state)" @click="orderBtnFn(item, 'cancel')"></u-button>
                        <u-button text="去支付" class="!w-auto mx-0 ml-2" shape="circle" type="primary" v-if="'4' == item.reserve_state" size="small" @click="orderBtnFn(item, 'pay')"></u-button>
                    </view>
                </view>
            </template>
            <mescroll-empty :option="{'icon': img('static/resource/images/empty.png')}" v-if="!list.length && loading"></mescroll-empty>
        </mescroll-body>
        <pay ref="payRef" @close="payClose"></pay>
    </view>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { img, redirect } from '@/utils/common'
    import {getReserveList, getReserveStatus, cancelReserve } from '@/addon/vipcard/api/vipcard'
    import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
    import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
    import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
    import { onLoad,onPageScroll, onReachBottom } from '@dcloudio/uni-app'
    import { t } from '@/locale'

    const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom)
    const list = ref<Array<Object>>([]);
    const loading = ref<boolean>(false);
    const statusLoading = ref<boolean>(false);
    const orderState = ref('')
    const orderStateList = ref([]);

    onLoad((option: any) => {
    	orderState.value = option.status || "";
    	getReserveStatusFn();
    });

	// 获取订单状态
    const getReserveStatusFn = () => {
    	statusLoading.value = false;
    	orderStateList.value = [];
    	let obj = {name: t('all'),status: ''};
    	orderStateList.value.push(obj);

    	getReserveStatus().then((res) => {
    		Object.values(res.data).forEach((item,index)=>{
    			orderStateList.value.push(item);
    		});
    		statusLoading.value = true;
    	}).catch(() => {
    		statusLoading.value = true;
    	})
    }

	// 切换订单状态
    const orderStateFn = (status)=>{
    	orderState.value = status.toString();
    	list.value = [];
    	getMescroll().resetUpScroll();
    };

	// 获取预约列表
    const getReserveListFn = (mescroll) => {
    	loading.value = false;
    	let data : object = {
    		page: mescroll.num,
    		limit: mescroll.size,
    		reserve_state: orderState.value
    	};

    	getReserveList(data).then((res) => {
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

    // 支付
    const payRef = ref(null)
    const orderBtnFn = (data, type='')=>{
    	if(type == 'pay')
    		payRef.value?.open(data.trade_type, data.trade_id, `/addon/vipcard/pages/order/detail?order_id=${data.trade_id}`)
    	else if(type == 'cancel'){
        cancelReserve(data.reserve_id).then((res) => {
          getMescroll().resetUpScroll()
        })
    	}
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
			time = data[1] + '月' + data[2] + '日' + week[index];

		return time;
	}
</script>

<style lang="scss" scoped>
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
