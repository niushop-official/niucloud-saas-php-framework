<template>
	<view class="bg-[#f8f8f8] min-h-screen overflow-hidden" :style="themeColor()">
        <view class="fixed left-0 top-0 right-0 z-10">
    		<scroll-view scroll-x="true" class="scroll-Y box-border px-[24rpx] bg-white">
    			<view class="flex whitespace-nowrap justify-around">
    				<view :class="['text-sm leading-[90rpx]',{'class-select': refundState === item.status}]" @click="refundStateFn(item.status)" v-for="(item,index) in refundStateList">{{item.name}}</view>
    			</view>
    		</scroll-view>
    	</view>
		<mescroll-body ref="mescrollRef" top="114rpx" @init="mescrollInit" :down="{ use: false }" @up="getRefundListFn">
			<view class="goods-wrap mx-[24rpx]">
				<view class="mb-[30rpx] bg-[#fff] p-[24rpx] rounded" v-for="(item,index) in list" :key="index">
					<view @click="toLink(item)">
						<view class="text-[#222] flex justify-between items-center  text-[28rpx] pb-[24rpx] border-0 border-b border-slate-200 border-solid">
							<view class="text-gray-500">{{item.refund_no}}</view>
							<view class="text-[var(--primary-color)]">{{item.status_name}}</view>
						</view>
						<view class="order-goods-item flex mt-[30rpx]" v-if="item.order_item">
							<view class="w-[160rpx] h-[160rpx] flex-2">
								<u--image class="rounded-[10rpx] overflow-hidden" width="160rpx" height="160rpx" :src="img(item.order_item.item_image_thumb_small ? item.order_item.item_image_thumb_small : '')" model="aspectFill">
									<template #error>
										<u-icon name="photo" color="#999" size="50"></u-icon>
									</template>
								</u--image>
							</view>
							<view class="ml-[20rpx] flex flex-1 flex-col justify-between">
								<view >
									<text class="text-[28rpx] text-item h-[80rpx] leading-[40rpx]">{{ item.order_item.item_name }}</text>
								</view>
								<view class="text-[24rpx] flex">
									<text class="text-[var(--primary-color)] rounded-[6rpx] py-[6rpx] bg-[var(--primary-color-light)] px-[10rpx]">{{ item.order_item.item_type == 'reservation' ? '预约' : '一口价' }}</text>
								</view>
								<view class="flex justify-between">
									<text class="text-right text-[28rpx] text-[var(--price-text-color)] price-font">￥{{ item.order_item.price }}</text>
									<text class="text-right text-[24rpx]">x{{ item.order_item.num }}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="flex  mt-[30rpx]">
						<text class="ml-auto mr-[20rpx] text-xs" v-if="item.order_item && item.order_item.price">{{ t('actualPayment') }}：<text class="text-sm text-[var(--price-text-color)] price-font">￥{{ item.order_item.price }}</text></text>
						<text class="text-xs" v-if="Number(item.money)">{{t('refundMoney')}}：<text class="text-sm text-[var(--price-text-color)] price-font">￥{{ item.money }}</text></text>
					</view>
					<view class="mt-[26rpx] flex flex-wrap justify-end z-10">
						<view class="inline-block text-[26rpx] leading-[56rpx] px-[30rpx] border-[3rpx] border-solid border-[#999] rounded-full ml-[20rpx]" @click="toLink(item)">{{ t('orderDetail') }}</view>
						<view class="inline-block text-[26rpx] leading-[56rpx] px-[30rpx] border-[3rpx] border-solid border-[#999] rounded-full ml-[20rpx]" @click="refundBtnFn(item)" v-if="item.status == 'wait_refund'">{{t('refundApply')}}</view>
					</view>
				</view>
			</view>
			<mescroll-empty :option="{'icon': img('static/resource/images/empty.png'),'tip': t('nothingMore')}" v-if="!list.length && loading"></mescroll-empty>
		</mescroll-body>
		<u-modal :show="cancelRefundshow" confirmColor="var(--primary-color)" :content="t('cancelRefundContent')" :showCancelButton="true" :closeOnClickOverlay="true" @cancel="refundCancel" @confirm="refundConfirm"></u-modal>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { t } from '@/locale'
	import { img, redirect } from '@/utils/common';
	import { getRefundList, cancelRefund, getRefundStatus} from '@/addon/o2o/api/order';
	import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
	import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
	import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
	import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app';

	const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
	const list = ref<Array<Object>>([]);
	const loading = ref<boolean>(false);
	const cancelRefundshow = ref(false);
    onLoad((option) => {
    	refundState.value = option.status || "";
    	getRefundStatusFn();
    });
    // 获取订单状态
    const refundState = ref('')
    const refundStateList = ref([]);
    const getRefundStatusFn = () => {
    	refundStateList.value = [];
    	let obj = {name: '全部',status: ''};
    	refundStateList.value.push(obj);
    	getRefundStatus().then((res) => {
    		Object.values(res.data).forEach((item,index)=>{
				if(item.status != 'cancel'){
					refundStateList.value.push(item)
				}
    		});
    	}).catch(() => {
    	})
    }

    // 切换状态
    const refundStateFn = (status)=>{
    	refundState.value = status;
    	list.value = [];
    	getMescroll().resetUpScroll();
    };

    // 获取列表数据
	const getRefundListFn = (mescroll) => {
		loading.value = false;
		let data : object = {
			page: mescroll.num,
			limit: mescroll.size,
			status: refundState.value
		}
		getRefundList(data).then((res) => {
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

	const toLink = (data) => {
		redirect({ url: '/addon/o2o/pages/refund/detail', param: { refund_no : data.refund_no } })
	}

	let currRefundId = "";
	const refundBtnFn = (data) => {
		currRefundId = data.refund_id;
		cancelRefundshow.value = true;
	}

	const refundConfirm = ()=>{
		cancelRefund(currRefundId).then((res) => {
			cancelRefundshow.value = false;
			getMescroll().resetUpScroll();
		}).catch(() => {
			cancelRefundshow.value = false;
		})
	}

	const refundCancel = ()=>{
		cancelRefundshow.value = false;
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
	.text-item {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.order-goods-item:nth-child(1) {
		margin-top: 20rpx;
	}
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
</style>
