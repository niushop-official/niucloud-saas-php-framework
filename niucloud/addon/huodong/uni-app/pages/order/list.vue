<template>
	<view class="bg-gray-100 min-h-[100vh]" :style="themeColor()">
		<view class="fixed top-0 inset-x-0 z-10">
			<scroll-view :scroll-x="true" :enable-flex="true"
				class="nav-list bg-white align-center px-[10px] box-border">
				<view class="flex scroll-view-wrap">
					<view
						:class="['nav-item text-[14px] mx-[5px] h-[30px] leading-[30px] my-[5px] border-t-0 border-l-0 border-r-0',{'border-solid border-b-[2px] Orderive': currstatusId===item.status}]"
						@click="loadstatus(item.status)" v-for="(item,index) in statusList" :key="item.status">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>

		<mescroll-body ref="mescrollRef" @init="mescrollInit" top="100rpx" @down="downCallback" @up="getOrderListFn">
			<view v-for="(item,index) in OrderList" :key="item.id"
				:class="['bg-white u-margin-bottom-20 align-center p-[10px]',{'border-solid border-t-0 border-l-0 border-r-0 border-b-[1px] border-gray-200': OrderList.length-1 !== index}] "
				style="font-size:14px;line-height: 36rpx;">
				<view class="flex u-flex-between u-margin-bottom-20">
					<view>
						<view>报名编号: {{item.order_no}}</view>
						<!-- <view class="text-gray">报名时间: {{item.create_time}}</view> -->
					</view>
					<view>
						<up-text type="primary" :text="item.order_status_info?.name"></up-text>
					</view>
				</view>
				<view v-if="item.act" class="flex" @click="todetail(item.order_id)">
					<u--image width="224rpx" height="224rpx" v-if="item.act.image" :src="img(item.act.image)"
						model="aspectFill" style="border-radius: 10rpx;">
						<template #error>
							<u-icon name="photo" color="#999" size="50"></u-icon>
						</template>
					</u--image>
					<view class="flex-1 flex flex-col justify-between  " style="font-size:12px;margin-left:15rpx">
						<view class="text-[16px] leading-[1.3] multi-hidden mt-[2px]" style="font-weight: bold;">
							<text v-if="item.is_jinri==1"
								style="background:#00aa00;color:#fff;font-size:10px;padding:8rpx 10rpx;border-radius: 5rpx;line-height:20px">今日活动</text>
							<text>{{item.act.name}}</text>
						</view>
						<!-- <view class="text-[14px]  mb-[10px] mt-[10px] text-gray-500 "> 
							<view class="u-page__tag-item">
								<text style="background:#ff9900;color:#fff;font-size:10px;padding:8rpx 10rpx;border-radius: 5rpx;">{{item.act.cate_id_name}}</text>
							</view>

						</view> -->
						<view class=" flex justify-between" style="margin-top:5rpx">
							<text>活动地址: {{item.act.address}}</text>
						</view>
						<view class=" flex justify-between" style="margin-top:10rpx">
							<text>活动开始: {{item.act.startime2}}</text>
						</view>
						<view class=" flex justify-between" style="margin-top:10rpx">
							<text>活动结束: {{item.act.endtime2}}</text>
						</view>
					</view>
				</view>
				<view style="color:#999;font-size:14px;margin-top:10rpx" v-if="item.order_money>0">
					报名费用: <text style="color: red;">￥{{item.order_money}}</text>
				</view>
				<view style="color:#999;font-size:14px;margin-top:10rpx">报名时间: {{item.create_time}}</view>
				<view style="color:#999;font-size:14px;margin-top:10rpx" v-if="item.hx_time">签到时间: {{item.hx_time}}
				</view>

				<view class="flex u-flex-end u-padding-10 ">
					<view></view>
					<view style="width: 150rpx;margin-left: 30rpx;" v-for="(it) in item.order_status_info.member_action"
						@click="tobtn(item,it.op)">
						<up-button type="primary" size="small" :plain="it.class=='warning'" :text="it.name"
							:color="it.color"></up-button>
					</view>
				</view>
			</view>
			<mescroll-empty v-if="!OrderList.length && loading"></mescroll-empty>
		</mescroll-body>


		<up-popup v-model:show="showhexiao" mode="center" round="10">
			<view class="u-padding-30">
				<view class="font-bold text-center text-l" style="font-size:22px">出示核销</view>
				<view class="u-padding-30" v-if="orderinfo">
					<up-qrcode :size="200" :val="orderinfo.hexiao_url"></up-qrcode>
				</view>
				<up-button type="primary" @click="showhexiao=false">确定</up-button>
			</view>
		</up-popup>


		<!-- <up-tabbar :value="1" :fixed="true" :placeholder="false" :safeAreaInsetBottom="false">
			<up-tabbar-item text="活动首页" icon="home" @click="tohome"></up-tabbar-item>
			<up-tabbar-item text="我的报名" icon="order"></up-tabbar-item>
		</up-tabbar> -->

		<tabbar />

		<pay ref="payRef" @close="payClose" />
	</view>
</template>

<script setup lang="ts">
	import { reactive, ref, onMounted } from 'vue'
	import { onLoad,onShow } from '@dcloudio/uni-app'
	import { t } from '@/locale'
	import { redirect, img } from '@/utils/common';
	import { getconfig } from '@/addon/huodong/api/act'
	import { getOrderList, getOrderStatus, closeOrder } from '@/addon/huodong/api/order'
	import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
	import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
	import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
	import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'
	import { useShare } from '@/hooks/useShare'

	const payInfo = ref<any>({
		trade_type: '',
		trade_id: ''
	})
	const payRef = ref()

	const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
	const { setShare, onShareAppMessage, onShareTimeline } = useShare()
	setShare()
	onShareAppMessage()
	onShareTimeline()

	let statusList = ref<Array<Object>>([]);
	let OrderList = ref<Array<any>>([]);
	let currstatusId = ref<number | string>('');
	let OrderTitle = ref<string>('');
	let mescrollRef = ref(null);
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
	onShow(async () => {
		await getOrderStatus().then((res : acceptingDataStructure) => {
			const statusarr = [];
			for (const key in res.data) {
				statusarr.push({
					name: res.data[key].name,
					status: res.data[key].status
				})
			}
			const initData = { name: t("all"), status: '' };
			statusList.value.push(initData);
			statusList.value = statusList.value.concat(statusarr);
		});
	})





	interface mescrollStructure {
		num : number,
		size : number,
		endSuccess : Function,
		[propName : string] : any
	}
	const getOrderListFn = (mescroll : mescrollStructure) => {
		loading.value = false;
		let data : object = {
			order_status: currstatusId.value,
			name: OrderTitle.value,
			page: mescroll.num,
			limit: mescroll.size
		};

		getOrderList(data).then((res : acceptingDataStructure) => {
			let newArr = (res.data.data as Array<Object>);
			//设置列表数据
			if (mescroll.num == 1) {
				OrderList.value = []; //如果是第一页需手动制空列表
			}
			OrderList.value = OrderList.value.concat(newArr);
			mescroll.endSuccess(newArr.length);
			loading.value = true;
		}).catch(() => {
			loading.value = true;
			mescroll.endErr(); // 请求失败, 结束加载
		})
	}

	const loadstatus = (id : string) => {
		currstatusId.value = id;
		getMescroll().resetUpScroll();
	}

	const searchFn = () => {
		getMescroll().resetUpScroll();
	}

	const toactdetail = (id : string) => {
		uni.navigateTo({
			url: '/addon/huodong/pages/act/detail?id=' + id
		})
	}
	const todetail = (id : string) => {
		uni.navigateTo({
			url: '/addon/huodong/pages/order/detail?id=' + id
		})
	}
	const tohome = () => {
		redirect({ url: '/addon/huodong/pages/index/index' });
	}
	onMounted(() => {
		setTimeout(() => {
			getMescroll().optUp.textNoMore = t("end");
		}, 500)
	});
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
							setTimeout(function () {
								getMescroll().resetUpScroll();
							}, 1500)
						})
					}
				}
			})
		} else if (op == 'pay') {
			payRef.value?.open('huodong', item.order_id, '/addon/huodong/pages/order/list');
		}
	}

	const payClose = () => {
		redirect({ url: '/addon/huodong/pages/order/list' });
	}
</script>

<style lang="scss" scoped>
	.nav-item.Orderive {
		color: $u-primary;
	}

	.nav-item {
		flex: 1;
		text-align: center;
	}

	.scroll-view-wrap {
		word-break: keep-all;
	}

	.catename {
		// border:1px solid #0269ff;
		background: #33a7ff;
		border-radius: 5rpx;
		color: #fff;
		padding: 5rpx 10rpx;
		font-size: 12px;
	}
</style>