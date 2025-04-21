<template>
	<view class="bg-[#f7f7f7] min-h-screen overflow-hidden" :style="themeColor()">
		<view v-if="!loading">
			<u-swiper :list="carousel" height="380rpx" radius="0" @click="swiperClick"></u-swiper>
			<view class="chunk-wrap pt-4 pb-3 rounded-t-2xl relative -mt-[30rpx]">

				<view class="flex justify-between items-center">
					<view class="flex-1">
						<view class="text-[34rpx] font-bold multi-hidden leading-6">{{detail.scenic_name}}</view>
						<view class="text-xs mt-2">景点级别「{{detail.scenic_level}}星」</view>
					</view>
					<view class="flex flex-col items-center text-[#6D7278] ml-[40rpx] pl-[50rpx] pr-[30rpx] border-0 border-l border-solid border-[#F0F0F0]"  @click="openShareFn">
						<text class="nc-iconfont nc-icon-fenxiangV6xx-1 text-lg"></text>
						<text class="mt-1 text-xs">分享</text>
					</view>
				</view>
				<!-- <view class="flex justify-between text-[#543E3E] items-baseline mt-3">
					<view class="text-xs member-price pl-2 py-1 rounded-l-lg">
						<text>5.0评分</text>
						<text class="ml-3">风景很好</text>
					</view>
					<view class="text-xs flex items-center">
						<text>39条评论</text>
						<text class="nc-iconfont nc-icon-youV6xx text-[26rpx]"></text>
					</view>
				</view> -->
				<view class="flex mt-3">
					<view class="bg-[#F2F4F9] mr-2 py-2 px-3 rounded-md w-[240rpx] box-border">
						<text class="text-[26rpx] font-bold">营业中</text>
						<view class="text-xs mt-1">
							<text>{{detail.open_time}}</text>
							<text class="text-[26rpx] nc-iconfont nc-icon-youV6xx"></text>
						</view>
					</view>
					<view class="bg-[#F2F4F9] py-2 px-3 rounded-md flex flex-1 items-center" @click="mapPopupShow = true">
						<view class="flex-1">
							<!-- <text class="text-[26rpx] font-bold">距您直线12.3km</text> -->
							<text class="text-[26rpx] font-bold">景点地址</text>
							<view class="text-xs mt-1">
								<text>{{detail.address}}</text>
								<text class="text-[26rpx] nc-iconfont nc-icon-youV6xx"></text>
							</view>
						</view>
						<view class="flex flex-col ml-3">
							<text class="nc-iconfont nc-icon-dizhiV6mm leading-[1] p-[8rpx] text-center bg-[#fff] text-[32rpx] rounded-full"></text>
							<text class="text-xs mt-[4rpx]">地图</text>
						</view>
					</view>
				</view>
			</view>

			<u-popup :show="mapPopupShow" @close="mapPopupShow = false" :closeable="true">
			    <view class="text-center py-[30rpx] font-bold leading-none">
			        <text>地图</text>
			    </view>
			    <view>
					<map class="map-body w-full h-[600rpx]" :latitude="detail.latitude" :longitude="detail.longitude" :markers="covers"></map>
				</view>
			</u-popup>

			<view class="chunk-wrap" v-if="detail.ticket_list && detail.ticket_list.length">
				<view class="chunk-head">
					<text>门票</text>
				</view>
				<view v-for="(item,index) in detail.ticket_list" :key="item.goods_id">
					<view class="flex border-0 border-b border-solid border-[#F2F2F2] py-[30rpx] justify-between">
						<view class="flex flex-col">
							<text class="text-sm font-bold">{{item.goods_name}}</text>
							<!-- <text class="text-xs text-color mt-1">票数: {{item.stock}}</text> -->
							<view class="flex text-xs text-[#646464] mt-1">
								<text class="class-select">官方</text>
								<text class="class-select">有条件退</text>
								<text class="text-color">无需换票</text>
							</view>
							<view class="flex text-xs text-[#646464] mt-1" @click="handleGoodsContent(item.goods_content)">
								<text>门票说明<text class="nc-iconfont nc-icon-youV6xx text-[26rpx]"></text></text>
							</view>
						</view>
						<view class="flex flex-col justify-center">
							<view class="text-xs text-[#626262]">
								<text class="text-[#FA6400] price-font">￥</text>
								<text class="text-lg font-bold text-[#FA6400] price-font">{{goodsPrice(item)}}</text>
								<image v-if="priceType(item) == 'member_price'" class="h-[22rpx] ml-[6rpx] w-[55rpx]" :src="img('addon/tourism/VIP.png')" mode="widthFix" />
								起

								</view>
							<button class="w-[128rpx] h-[60rpx] leading-[60rpx] text-sm text-white bg-color rounded-2xl mt-[20rpx]" @click="toOrder(item)">预订</button>
						</view>
					</view>
				</view>
			</view>
			<!-- 门票说明 -->
			<u-popup :show="goodsContentShow" @close="goodsContentShow = false" :closeable="true">
				<view class="text-center py-[30rpx] font-bold leading-none">
					<text>门票说明</text>
				</view>
				<view class="pt-[28rpx] pb-[40rpx] px-[28rpx]">
					<scroll-view class="max-h-[60vh]" :scroll-y="true">
						<u-parse :content="goodsContent" :tagStyle="{img: 'vertical-align: top;'}" v-if="goodsContent"></u-parse>
						<text v-else class="block px-5">暂无购买须知</text>
					</scroll-view>
				</view>
			</u-popup>

			<view class="chunk-wrap" v-if="detail.telephone">
				<view class="chunk-head">
					<text>联系电话</text>
				</view>
				<view class="text-sm py-3 px-1 text-[var(--text-color-light6)] flex items-center">
					<text class="iconfont icondianhua-xianxingyuankuang font-bold mr-2 text-lg"></text>
					<text>{{detail.telephone}}</text>
				</view>
			</view>

			<view class="chunk-wrap">
				<view class="chunk-head">
					<text>景区介绍</text>
				</view>
				<view class="pt-[28rpx] pb-[40rpx] scheduling-content">
					<u-parse :content="detail.scenic_desc" :tagStyle="{img: 'vertical-align: top;'}" v-if="detail.scenic_desc"></u-parse>
					<text v-else>暂无景区介绍</text>
				</view>
			</view>

			<view class="chunk-wrap">
				<view class="chunk-head">
					<text>景区周边</text>
				</view>
				<view class="pt-[28rpx] pb-[40rpx] scheduling-content">
					<u-parse :content="detail.surround" :tagStyle="{img: 'vertical-align: top;'}" v-if="detail.surround"></u-parse>
					<text v-else>暂无景区周边</text>
				</view>
			</view>
			<sow-show v-if="detail.sow_show_list" :items="detail.sow_show_list" class="!rounded-none"></sow-show>
		</view>
		<loading-page :loading="loading"></loading-page>

		<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序隐私协议 -->
		<wx-privacy-popup ref="wxPrivacyPopupRef"></wx-privacy-popup>
		<!-- #endif -->

		<share-poster ref="sharePosterRef" posterType="tourism_scenic" :posterId="detail.poster_id" :posterParam="posterParam" :copyUrlParam="copyUrlParam" />
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, computed,nextTick } from 'vue';
	import { img, redirect, getToken, copy,handleOnloadParams } from '@/utils/common';
	import { onLoad, onUnload } from '@dcloudio/uni-app'
	import { getScenicInfo } from '@/addon/tourism/api/tourism';
	import { useLogin } from '@/hooks/useLogin';
	import sharePoster from '@/components/share-poster/share-poster.vue'
	import useMemberStore from '@/stores/member'
	import sowShow from '@/components/sow-show/sow-show.vue';

	let carousel = ref([])
	let detail = ref<Array<any>>([]);
	let loading = ref<boolean>(true);
	let scenic_id = ref("");

	let mapPopupShow = ref<boolean>(false);
	let covers = ref([]);
	let goodsContentShow = ref(false) // 门票说明弹框展示
	let goodsContent = ref(""); // 门票展示弹框内容

	const memberStore = useMemberStore()

	// 会员信息
	const userInfo = computed(() => memberStore.info)

	const wxPrivacyPopupRef:any = ref(null)

	onLoad((option: any) => {

		// #ifdef MP-WEIXIN
		// 处理小程序场景值参数
		option = handleOnloadParams(option);
		// #endif

		loading.value = true;
		getScenicInfo(option.scenic_id).then((res) => {
			scenic_id.value = option.scenic_id
			detail.value = res.data;
			covers.value.push({id:1,latitude:detail.value.latitude,longitude:detail.value.longitude,iconPath:img('addon/tourism/tourism/map_icon.png'),height:25});

			// 景点图片
			carousel.value = [];
			if(detail.value.image_thumb_big && detail.value.image_thumb_big.length){
				// detail.value.scenic_images = detail.value.scenic_images.split(",").filter((item)=>{
				// 	return item && item.trim();
				// })
				detail.value.image_thumb_big.forEach((item,index)=>{
					carousel.value.push(img(item))
				})
			}else{
				carousel.value.push(img(detail.value.cover_thumb_big))
			}
			copyUrlFn()
			loading.value = false;
		}).catch(() => {
			loading.value = false;
		});
		// #ifdef MP
		nextTick(()=>{
			if(wxPrivacyPopupRef.value) wxPrivacyPopupRef.value.proactive();
		})
		// #endif
	})

	const getSpecificDate = (day,dateVal="")=> {
        //计算出要加/ 减的毫秒数
        var num = 1000 * 60 * 60 * 24 * day;
        var newDate;
        if (dateVal) newDate = new Date(dateVal + num);
        else newDate = new Date(Date.now() + num);
        return newDate
    }
	const config  = (time)=>{
		// let d = new Date()
		let year = time.getFullYear()
		let month = time.getMonth() + 1
		let day = time.getDate()
		let date = `${year+'-'+ (month < 10 ? '0'+month : month) +'-'+ (day<10 ? '0'+day : day)}`
		return date
	}
	// 向待创建订单提交
	let orderData = ref(
	{
		ticket_id: '',
		reserve_time: config(getSpecificDate(0)),
		num: 1,
		scenic_id: scenic_id
	});

	// 跳转到详情
	const toOrder = (data)=>{
		if(!getToken()){
			useLogin().setLoginBack({ url: '/addon/tourism/pages/scenic/detail',param:{scenic_id: scenic_id.value}})
			return false;
		}
		orderData.value.ticket_id = data.goods_id;
		uni.setStorageSync('scenicCreateData', orderData.value);
		redirect({ url: '/addon/tourism/pages/scenic/order' });
	}

	// 门票说明弹框
	const handleGoodsContent = (data) =>{
		goodsContentShow.value = true;
		goodsContent.value = data;
	}


	/************* 分享海报-start **************/
	let sharePosterRef = ref(null);
	let copyUrlParam = ref('');
	let posterParam = {};

	// 分享海报链接
	const copyUrlFn = ()=>{
		copyUrlParam.value = '?scenic_id='+detail.value.scenic_id;
		if (userInfo.value && userInfo.value.member_id) copyUrlParam.value += '&mid=' + userInfo.value.member_id;
	}

	const openShareFn = ()=> {
    posterParam.scenic_id = detail.value.scenic_id;
    if (userInfo.value && userInfo.value.member_id) posterParam.member_id = userInfo.value.member_id;
    sharePosterRef.value.openShare()
  }
	/************* 分享海报-end **************/

	// 价格类型
	let priceType = (data:any) =>{
		let type = "";
		if(data.member_discount && getToken()){
			type = 'member_price' // 会员价
		}else{
			type = ""
		}
		return type;
	}
	// 商品价格
	let goodsPrice = (data:any) =>{
		let price = "0.00";
		if(data.member_discount && getToken()){
			price = data.member_price || data.price // 会员价
		}else{
			price = data.price
		}
		return parseFloat(price).toFixed(2);
	}

	const swiperClick = (index: any) =>{
		if (!carousel.value.length) return false
		uni.previewImage({
			indicator: "number",
			current:index,
			loop: true,
			urls: carousel.value
		})
	}
	// 关闭预览图片
	onUnload(()=>{
		// #ifdef  H5 || APP
		try {
			uni.closePreviewImage()
		}catch (e) {

		}
		// #endif
	})
</script>

<style lang="scss" scoped>
	.chunk-wrap{
		@apply bg-white px-4 mb-2;
		.chunk-head{
			height: 84rpx;
			@apply flex justify-between items-center border-0 border-b border-solid border-[#F2F2F2] box-border;
			text{
				&:first-of-type{
					@apply font-bold;
				}
				&:nth-child(2){
					@apply text-xs text-[var(--text-color-light9)];
				}
				.iconfont{
					@apply inline-block;
					margin-left: 2rpx;
				}
			}
		}
	}
	.member-price{
		background: linear-gradient(90deg, #FEF3E7 0%, #FFFFFF 100%);
	}
	.text-color{
		color: $u-primary;
	}
	.bg-color{
		background-color: $u-primary;
	}
	.class-select{
		position: relative;
		margin-right: 28rpx;
		&::after{
			content: "";
			position: absolute;
			background-color: #999;
			width: 2rpx;
			height: 70%;
			top: 50%;
			right: -14rpx;
			transform: translatey(-50%);
		}
	}
	.form-item{
		@apply flex mb-6;
		font-size: 26rpx;
		&>text{
			width: 150rpx;
			color: #797B7C;
		}
		&>view{
			flex: 1;
		}
		&:last-of-type{
			margin-bottom: 0;
		}
	}
	:deep(.scheduling-content img){
		vertical-align: middle;
	}
</style>
