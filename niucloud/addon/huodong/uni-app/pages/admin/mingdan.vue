<template>
	<view class="bg-gray-100 min-h-[100vh]" :style="themeColor()" style="font-size:14px;line-height:36rpx">

		<mescroll-body ref="mescrollRef" @init="mescrollInit" top="20rpx" @down="downCallback" @up="getOrderListFn">
			<view v-for="(item,index) in OrderList" :key="item.id" 
				:class="['bg-white u-margin-bottom-20 align-center p-[10px] '] ">
				<view class="flex u-flex-s u-padding-10 justify-between">
					<view class="flex" >
						<up-avatar :src="img(item.member.headimg)" size="50"></up-avatar>
						<view class="ml-2" style="line-height:40rpx">
							<view style="font-weight:bold">{{item.member.realname||item.member.nickname}}</view>
							<view>{{item.member.mobile||item.mobile}}</view>
							<view style="color:#666">报名时间: {{item.create_time}}</view>
							<view style="color:#666" v-if="item.is_jiangli==1">积分奖励: <text style="color:red">{{item.point}}</text>积分</view>
							<view style="color:#666" v-if="item.hx_time">签到时间: {{item.hx_time}}</view>
						</view>
					</view>
					<view><up-text type="primary" :text="item.order_status_info?.name"></up-text></view>
				</view>
				<view class="flex u-flex-s u-padding-10 justify-between" >
					<view></view>
					<view class="flex">
						<view style="width: 150rpx;margin-left: 30rpx;" v-for="(it) in item.order_status_info.member_action"
							@click="tobtn(item,it.op)">
							<up-button type="primary" size="small" :plain="it.class=='warning'" :text="it.name" :color="it.color"></up-button>
						</view>
						<!-- <view style="width: 150rpx;margin-left: 30rpx;" v-if="config?.open_send_point==1&&item.is_jiangli==0"	@click="send_jiangli(item)">
							<up-button type="primary" size="small"  text="发放奖励" :color="'#fac220'"></up-button>
						</view> -->
					</view>
				</view>
			</view>
			<mescroll-empty v-if="!OrderList.length && loading"></mescroll-empty>
		</mescroll-body>  
	</view>
</template>

<script setup lang="ts">
	import { reactive, ref, onMounted } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { t } from '@/locale'
	import { redirect, img } from '@/utils/common';
	import { getOrderList, getOrderStatus,closeOrder,hexiaoOrder } from '@/addon/huodong/api/order'
	import { getconfig } from '@/addon/huodong/api/index'
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
	
	var act_id = '';
	onLoad(async (option) => {
		act_id = option.id
	})
	
	const config = ref('');
	getconfig().then((res)=>{
		config.value = res.data;
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
			is_admin:1,
			act_id: act_id,
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

	const orderinfo = ref();
	const showhexiao = ref<Boolean>(false);
	const tobtn = (item, op) => {
		orderinfo.value = item;
		if (op == 'hexiao') {
			if(config.value?.open_send_point==1){
				uni.showModal({
				    title: '核销',
				    placeholderText: '请输入活动积分奖励',
				    editable: true,
				    confirmText: '确定',
				    cancelText: '取消',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户输入的内容：', res.content);
							if(!res.content) {
								uni.showToast({title:'请输入发放积分奖励',icon:'none'});return;
							}
							hexiaoOrder(item.order_no,{
								point:res.content
							}).then((res : acceptingDataStructure) => {
								uni.showToast({
									title: '核销成功'
								})
								setTimeout(function(){
									getMescroll().resetUpScroll();
								},1500)
							})
				        } else if (res.cancel) {
				            console.log('用户取消了输入');
				        }
				    }
				});

				return;
			}
			uni.showModal({
				title: '提示', content: '确定核销吗?',
				success: function (res) {
					if (res.confirm) {
						hexiaoOrder(item.order_no).then((res : acceptingDataStructure) => {
							uni.showToast({
								title: '核销成功'
							})
							setTimeout(function(){
								getMescroll().resetUpScroll();
							},1500)
						})
					}
				}
			})
		} else if (op == 'cancel') {
			uni.showModal({
				title: '提示', content: '确定取消吗?',
				success: function (res) {
					if (res.confirm) {
						closeOrder(item.order_id).then((res : acceptingDataStructure) => {
							uni.showToast({
								title: '取消成功'
							})
							setTimeout(function(){
								getMescroll().resetUpScroll();
							},1500)
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