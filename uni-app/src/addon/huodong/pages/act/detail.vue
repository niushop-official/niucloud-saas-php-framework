<template>
	<view class="u-skeleton">
		<u-swiper :list="info.images" v-if="info.images&&info.images.length>0&&info.images[0]" height="364rpx" circular :border-radius="0"></u-swiper>
		
		<view style="padding: 20rpx 3% ;background-color:#fff;font-size:14px;line-height: 36rpx;color:#333">
			

			<view style="display:flex;align-items: center;">
				<view style="margin:-10rpx 10rpx 0 0">
					<text style="background:#ff9900;color:#fff;font-size:10px;padding:8rpx 10rpx;border-radius: 5rpx;">{{info.cate_id_name}}</text>
				</view>
				<view style="font-weight: bold;font-size: 16px;">
				{{info.name}}
			</view>
			
			</view>
			<!-- <view class="flex">
				<u-icon name="eye"></u-icon>
				<text style="margin-left: 15rpx;">{{info.views||0}} </text>
			</view> -->
			<view class="flex" v-if="info.price>0&&info.is_pay==1" style="padding-top:12rpx">
				<u-icon name="rmb-circle" size="18"></u-icon>
				<text style="color:#f00;font-size:18px;">￥{{info.price}}</text>
			</view>
			<view class="flex"  style="padding-top:12rpx">
				<u-icon name="bag" size="18"></u-icon>
				<view style="margin-left: 15rpx;">
					<text style="margin-right:5rpx;color:#1677ff">{{info.sales||0}}</text>/
					<text v-if="info.num">限制{{info.num+'人'}}</text>
					<text v-else>不限</text>
				</view>
			</view>
			<view class="flex" style="margin-top:12rpx">
				<u-icon name="account" size="18"></u-icon>
				<view style="margin-left: 15rpx;">
					<text >报名限制: {{info.usertype_name}}</text>
				</view>
			</view>
			<view class="flex" style="margin-top:12rpx">
				<u-icon name="clock"></u-icon>
				<text style="margin-left: 15rpx;">{{info.startime2}} 至 {{info.endtime2}}</text>
			</view>
			<view class="flex" v-if="info.address" style="margin-top:12rpx;">
				<u-icon name="map"></u-icon>
				<text style="margin-left: 15rpx;">{{info.address}}</text>
			</view>
		</view>
		<view class="bg-white" v-if="info.is_verifier" style="padding: 20rpx 3% 0;margin-top:30rpx">
			<view class="flexb">
				<view style="font-weight: bold;">管理面板</view>
				<!-- <view class="flex" style="font-size: 12px;color:#999"> <u-icon name="arrow-right" colos="#999" size="12"></u-icon></view> -->
			</view>
			<view class="u-content " style="padding: 25rpx 0">
				<view>
					<text @click="mingdan" style="padding:10rpx 20rpx;color:#1677ff;border:1px solid #1677ff;">报名管理</text>
				</view>
			</view>
			
		</view>
		
		<view class="bg-white"  style="padding: 20rpx 3% 0;margin-top:30rpx">
			<view class="flexb" @click="showbao=true">
				<view style="font-weight: bold;">已报名({{baolist.length||0}})</view>
				<view class="flex" style="font-size: 12px;color:#999">更多 <u-icon name="arrow-right" colos="#999" size="12"></u-icon></view>
			</view>
			<view class="u-content " @click="showbao=true" style="padding: 25rpx 0">
				<view class="flexmc" v-for="(item,index2) in baolist" v-show="index2<18" style="float: left;width:16%">
					<u-avatar size="46" :src="img(item.headimg)"></u-avatar>
					<view class="desc line1"
						style="width: 100rpx;font-size: 12px;margin-bottom: 10rpx;text-align: center;">
						{{item.nickname}}
					</view>
				</view>
				<view style="clear: both;"></view>
			</view>
			
			<view class="u-content " v-if="config?.open_act_rank==1" style="padding: 0 0 25rpx">
				<view>
					<text @click="tourl('/addon/huodong/pages/act/rank?id='+info.id)" style="padding:10rpx 20rpx;color:#1677ff;border:1px solid #1677ff;">奖励排行榜</text>
				</view>
			</view>
			
		</view>
		<!-- <view class="info-warp" v-if="info.baolist" @click="showbao=true">
			<view class="title2">已报名({{info.baolist.length||0}})</view>
			<view class="detail flex2">
				
			</view>
		</view> -->

		<view class="bg-white" style="padding: 20rpx 3% 0;margin-top:30rpx">

			<view style="font-weight: bold;">活动详情</view>
			<view class="u-content">
				<up-parse :content="info.content"></up-parse>
			</view>
		</view>
		<view class="bg-white" v-if="info.hidecontent" style="padding: 20rpx 3% 0;margin-top:30rpx">
			<view style="font-weight: bold;">报名内部信息</view>
			<view class="u-content">
				<up-parse :content="info.hidecontent"></up-parse>
			</view>
		</view>
		<view style="height:150rpx"></view>
		<view class="bg-white footbox flex u-flex-between" v-if="info">
			<!-- <up-button class="flex u-flex-column" style="align-items: center;width:150rpx;border:none;margin-right: 20rpx;" openType="share" >
				<up-icon name="share" :size="30"></up-icon>
				<view >分享</view>
			</up-button> -->
			<view class="flex flex-col justify-center items-center mr-[39rpx]" @click="redirect({ url: '/addon/huodong/pages/index/index', mode: 'reLaunch' })">
				<view class="nc-iconfont nc-icon-shouyeV6xx text-[36rpx]"></view>
				<text class="text-[20rpx] mt-[10rpx]">首页</text>
			</view>
			<view class="flex flex-col justify-center items-center mr-[39rpx]" @click="openShareFn">
				<view class="nc-iconfont nc-icon-fenxiangV6xx text-[36rpx]"></view>
				<text class="text-[20rpx] mt-[10rpx]">分享</text>
			</view>
			<view style="width:420rpx;flex:1">
				<u-button type="error" shape="circle" v-if="info.opstatus==2" @click="topay(info.order_id)">{{info.optext}} ￥{{info.price}}</u-button>
				<u-button type="primary" shape="circle" v-else-if="info.opstatus<0" color="#aaa">{{info.optext}}</u-button>
				<u-button type="primary" shape="circle" v-else @click="baoming">我要报名
					<text v-if="info.price>0&&info.is_pay==1"
						style="margin-left: 15rpx;color:#ffaa65;font-size:18px;">￥{{info.price}}</text>
				</u-button>
			</view>
		</view>


		<up-popup id="popup" :show="showbao" mode="bottom">
			<view class="pop-container bg-white" style="padding: 30rpx 3%;">
				<view class="pop-header row-center md normal" style="font-weight: bold;"> 共有{{baolist.length||0}}位参与者 </view>
				<u-icon name="close" @click="showbao=false"
					style="position: absolute;right: 30rpx;top: 30rpx;"></u-icon>
				<scroll-view :style="'height:1000rpx'" :scroll-y="true">
					<view class="reason-box mt30 flex2" style="padding:30rpx 0">
						<view class="flexmc" v-for="(item,index2) in baolist" style="float: left;width:16%">
							<u-avatar size="46" :src="img(item.headimg)"></u-avatar>
							<view class="desc line1"
								style="width: 100rpx;font-size: 12px;margin-bottom: 10rpx;text-align: center;">
								{{item.nickname}}
							</view>
						</view>
						<view style="clear: both;"></view>
					</view>
				</scroll-view>
			</view>
		</up-popup>


			<share-poster ref="sharePosterRef" posterType="huodong_act" :posterId="info.poster_id" :posterParam="posterParam" :copyUrlParam="copyUrlParam" />
		<pay ref="payRef" @close="payClose" />

<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序隐私协议 -->
		<wx-privacy-popup ref="wxPrivacyPopup"></wx-privacy-popup>
		<!-- #endif -->
		
	</view>
</template>

<script setup lang="ts">
	import { ref, watch,computed } from 'vue';
	import { onLoad,onShow } from '@dcloudio/uni-app'
	import { getDetail } from '@/addon/huodong/api/act'
	import { redirect, img } from '@/utils/common';
	import { getPayInfo } from '@/app/api/pay'
	import { SubmitOrder } from '@/addon/huodong/api/order'
	import { getconfig } from '@/addon/huodong/api/index'
 
	
	import { useSubscribeMessage } from '@/hooks/useSubscribeMessage'
	import { useShare } from '@/hooks/useShare'
	
	const { setShare, onShareAppMessage, onShareTimeline } = useShare()
	onShareAppMessage()
	onShareTimeline()
	
	import sharePoster from '@/components/share-poster/share-poster.vue'
	
	// 会员信息
	import { useLogin } from '@/hooks/useLogin'
	import useMemberStore from '@/stores/member'
	const memberStore = useMemberStore()
	const userInfo = computed(() => memberStore.info)
	
	
	const payInfo = ref<any>({
		trade_type: '',
		trade_id: ''
	})
	const payRef = ref()
	const id = ref('')
	const baolist = ref([])
	const showbao = ref(false)
	const info = ref({
		logo: '',
		name: ''
	})

	onLoad((query : any) => {
		console.log(query, 'query');
		id.value = query.id || '';
		if(id.value){
			uni.setStorageSync('huodong_id',id.value)
		}
		console.log('userInfo',userInfo.value);
		// 检测是否登录
		if (!userInfo.value&&!uni.getStorageSync('userinfo')) {
			useLogin().setLoginBack({ url: '/addon/huodong/pages/act/detail', param: { id: id.value } })
			return false
		}
		if(userInfo.value){
			uni.setStorageSync('userinfo',userInfo.value);
		}
		
	})
	onShow((query : any) => {
		
		getinfo();
	})
	const getinfo = () => {
		if(!id.value){
			id.value = uni.getStorageSync('huodong_id')
		}
		
		getDetail({ id: id.value }).then((res : any) => {
			info.value = res.data
			var images = [];
			for (var i = 0; i < res.data.images.length; i++) {
				var aa = img(res.data.images[i]);
				images.push(aa);
			}
			info.value.images = images;
			baolist.value = info.value.baolist
				copyUrlFn();
			uni.setNavigationBarTitle({
				title: info.value.name
			})
			let share = {
				title: info.value.name,
				// url: imgs.length>0?imgs
				path:'addon/huodong/pages/act/detail?id='+info.value.id+'&mid='+info.my_member_id
				
			}
			setShare({
				wechat: {
					...share
				},
				weapp: {
					...share
				}
			});
			onShareAppMessage()
			onShareTimeline()
			
		}).catch(() => {
		})
	}
	
	const config = ref('');
	getconfig().then((res)=>{
		config.value = res.data;
	})
	
	const mingdan = () => {
		redirect({ url: '/addon/huodong/pages/admin/mingdan', param: { id: id.value }, mode: 'navigateTo' })
	}
	const baoming = () => {
		if (info.value.is_tian == 0) return submit();
		redirect({ url: '/addon/huodong/pages/act/form', param: { id: id.value,form_id:info.value.form_id }, mode: 'navigateTo' })
	}

	const submit = () => {
		    useSubscribeMessage().request('huodong_act_start')
			
			// 检测是否登录
			if (!userInfo.value) {
				useLogin().setLoginBack({ url: '/addon/huodong/pages/act/detail', param: { id: info.value.id } })
				return false
			}
			
			
		SubmitOrder({
			act_id: info.value.id,
			pid:uni.getStorageSync('pid'),
		}).then((res : any) => {
			if (res.data.trade_id == -100) {
				uni.showToast({ title: '报名成功' });
				setTimeout(function () {
					uni.redirectTo({
						url: '/addon/huodong/pages/order/list'
					})
				}, 1500);
				return;
			}
			payRef.value?.open(res.data.trade_type, res.data.trade_id, '/addon/huodong/pages/order/list')
		}).catch(() => {
		})
	}
	const topay = (order_id) => {
		payRef.value?.open('huodong',order_id, '/addon/huodong/pages/order/list');
	}
	const tourl = (url)=>{
		redirect({ url: url, param: { }, mode: 'navigateTo' })
	}
	
	
	/************* 分享海报-start **************/
	let sharePosterRef = ref(null);
	let copyUrlParam = ref('');
	let posterParam = {};
	
	// 分享海报链接
	const copyUrlFn = ()=>{
		copyUrlParam.value = '?id='+info.value.id;
		console.log(copyUrlParam.value)
		if (userInfo.value && userInfo.value.member_id) copyUrlParam.value += '&mid=' + userInfo.value.member_id;
	}
	
	const openShareFn = ()=>{
	    posterParam.act_id = info.value.id;
	    if (userInfo.value && userInfo.value.member_id) posterParam.member_id = userInfo.value.member_id;
		sharePosterRef.value.openShare()
	}
	/************* 分享海报-end **************/
	
</script>

<style lang="scss">
	page {
		background-color: #eeeeee;
	}
	@import '@/addon/huodong/static/css/base.css';
</style>
<style lang="scss" scoped>
	.thumb {
		width: 100vw;
		height: 360rpx;
	}

	.title {
		font-size: 38rpx;
	}

	.u-item-title {
		position: relative;
		font-size: 30rpx;
		padding-left: 16rpx;
		line-height: 1;
	}

	.lines {
		width: 150rpx;
		height: 3rpx;

		&.line-left {
			background-image: linear-gradient(90deg, #eee, #f0f2f3);
		}

		&.line-right {
			background-image: linear-gradient(90deg, #f0f2f3, #eee);
		}
	}

	.line {
		width: 8rpx;
		height: 32rpx;
		border-radius: 10rpx;
	}

	.item {
		margin-bottom: 30rpx;
		background-color: #ffffff;

		.content {
			// padding: 20rpx 10rpx;
		}
	}

	.footbox {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 94%;
		background-color: #ffffff;
		padding: 10rpx 3%;
		border-top: 1px solid #f4f6f8;
		z-index: 100;
	}

	.cu-btn {
		background-color: #ffffff;
		padding: 0 10rpx;
		border: none;

		&::after {
			border: none;
		}
	}
</style>
<style>
	.flex{
		display: flex;justify-content: flex-start;align-items: center;
	}
	.flexb{
		display: flex;justify-content: space-between;align-items: center;
	}
	.flexa{
		display: flex;justify-content: space-around;align-items: center;
	}
	 .flexm{
	                display: flex;justify-content: center;align-items: center;
	            }
	 .flexmc{
	                display: flex;justify-content: center;align-items: center;flex-direction: column;
	            }
				.line1{
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				
</style>