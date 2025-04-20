<template>
    <view class="bg-[#f8f8f8] min-h-screen overflow-hidden" :style="themeColor()">
    	<view class="fixed left-0 top-0 right-0 z-10" v-if="statusLoading">
    		<scroll-view scroll-x="true" class="scroll-Y box-border px-[24rpx] bg-white">
    			<view class="flex whitespace-nowrap justify-around">
    				<view :class="['text-sm leading-[90rpx]',{'class-select': orderState === item.status.toString()}]" @click="orderStateFn(item.status)" v-for="(item,index) in orderStateList">{{item.name}}</view>
    			</view>
    		</scroll-view>
    	</view>

        <mescroll-body ref="mescrollRef" top="114rpx" @init="mescrollInit" :down="{ use: false }" @up="getOrderListFn">
            <template v-for="(item, index) in list" :key="item.order_id">
                <view class="mx-3 mb-3 bg-white p-3 rounded">
                    <view class="flex justify-between items-center text-sm text-gray-500 mb-3 pb-3 border-0 border-b border-slate-200 border-solid">
                        <view>{{ item.order_no }}</view>
                        <text>{{item.order_status_info.name}}</text>
                    </view>
                    <view v-for="(goodsItem, goodsIndex) in item.item" class="flex mb-3" @click="toDetail(item)">
                        <view class="w-[240rpx] h-[180rpx] mr-3 overflow-hidden rounded leading-none">
                            <image :src="img(goodsItem.item_image_thumb_small)" mode="aspectFill" class="w-[240rpx] h-[180rpx] leading-none" />
                        </view>
                        <view class="flex-1 w-0">
                            <view class="font-bold truncate text-sm">{{ goodsItem.item_name }}</view>
                            <view class="flex justify-between">
                                <view class="text-[#FA6400] text-xs mt-2">
                                    <text class="ml-[2rpx]">￥</text>
                                    <text class="text-[38rpx]">{{ goodsItem.price }}</text>
                                </view>
                                <view class="text-sm text-gray-400 flex items-end leading-none">
                                    x{{ goodsItem.num }}
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="text-right text-sm font-bold">
                        {{ t('payMoney') }}：{{ t('currency') }}{{ item.pay_money }}
                    </view>
                    <view class="flex justify-end mt-3">
                        <u-button :text="btnItem.name" class="!w-auto mx-0 ml-2" shape="circle" size="small" @click="orderBtnFn(item, btnItem.key)" v-for="(btnItem, btnIndex) in item.order_status_info.member_action"></u-button>
                    </view>
                </view>
            </template>
            <mescroll-empty :option="{'icon': img('static/resource/images/empty.png')}" v-if="!list.length && loading"></mescroll-empty>
        </mescroll-body>
        <pay ref="payRef"></pay>
    </view>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { img, redirect } from '@/utils/common'
    import { getOrderStatus, getOrderList, cancelOrder, deleteOrder } from '@/addon/vipcard/api/vipcard'
    import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
    import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
    import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
    import { onLoad,onPageScroll, onReachBottom } from '@dcloudio/uni-app'
    import { t } from '@/locale'

    const { mescrollInit, getMescroll } = useMescroll(onPageScroll, onReachBottom)
    const list = ref<Array<Object>>([]);
    const loading = ref<boolean>(false);
    const statusLoading = ref<boolean>(false);
    const orderState = ref('')
    const orderStateList = ref([]);

    onLoad((option: any) => {
    	orderState.value = option.status || "";
    	getOrderStatusFn();
    });

    const getOrderStatusFn = () => {
    	statusLoading.value = false;
    	orderStateList.value = [];
    	let obj = {name: t('all'),status: ''};
    	orderStateList.value.push(obj);

    	getOrderStatus().then((res) => {
    		Object.values(res.data).forEach((item,index)=>{
    			orderStateList.value.push(item);
    		});
    		statusLoading.value = true;
    	}).catch(() => {
    		statusLoading.value = true;
    	})
    }

    const orderStateFn = (status)=>{
    	orderState.value = status.toString();
    	list.value = [];
    	getMescroll().resetUpScroll();
    };

    const getOrderListFn = (mescroll) => {
    	loading.value = false;
    	let data : object = {
    		page: mescroll.num,
    		limit: mescroll.size,
    		order_status: orderState.value
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

    const toDetail = (res) => {
    	redirect({ url: '/addon/vipcard/pages/order/detail', param: { order_id : res.order_id } })
    }

    // 支付
    const payRef = ref(null)
    const orderBtnFn = (data, type='')=>{
    	if(type == 'pay')
    		payRef.value?.open(data.order_type, data.order_id, `/addon/vipcard/pages/order/detail?order_id=${data.order_id}`);
    	else if(type == 'cancel'){
            cancelOrder(data.order_id).then((res) => {
            	getMescroll().resetUpScroll()
            }).catch(() => {
            	getMescroll().resetUpScroll()
            })
    	}else if(type == 'delete'){
            deleteOrder(data.order_id).then((res) => {
            	getMescroll().resetUpScroll()
            }).catch(() => {
            	getMescroll().resetUpScroll()
            })
    	}
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
