 <template>
 	<view :style="themeColor()">

 		<view v-if="info?.member_id" class=" bg-[var(--primary-color)]"
 			style="height: 280rpx;padding: 40rpx 3% 80rpx;color: #fff;">
			<view style="text-align:center;font-size:18px;">我的资产</view>
 			<!-- <view style="align-items: center;display: flex;">
 				<image :src="img(info?.headimg)"
 					style="width: 120rpx;height:120rpx;border-radius: 50%;margin-right: 30rpx;border: 1px solid #eee;"
 					mode=""></image>
 				<view>
 					<view class="font-bold text--[16px] mb-[10rpx]">{{info?.nickname}}</view>
 					<view style="font-size: 12px;">UID: {{info?.member_id}}</view>
 				</view>
 			</view> -->
 			<!-- <text class="nc-iconfont nc-icon-shezhiV6xx-1 text-[40rpx] ml-[10rpx]"  @click="tourl('/app/pages/member/personal')"
 				style="color: rgb(255, 255, 255);position: absolute;right: 30rpx;top:30rpx;"><span></span></text> -->


 			<view class="flex m-[30rpx] mb-0 py-[30rpx] items-center">
 				<view class="flex-1 text-center">
 					<view class="font-bold">
 						<view @click="redirect({ url: info ? '/app/pages/member/balance' : '' })"
 							:style="{ color : '#fff' }" style="font-size: 22px;">{{ info.balance }}</view>
 					</view>
 					<view class="text-sm mt-[10rpx]">
 						<view @click="redirect({ url: info ? '/app/pages/member/balance' : '' })"
 							:style="{ color : '#fff' }">{{ t('balance') }}</view>
 					</view>
 				</view>
 				<view class="border-solid border-white border-l border-b-0 border-t-0 border-r-0 h-[60rpx]"></view>
 				<view class="flex-1 text-center">
 					<view class="font-bold">
 						<view @click="redirect({ url: info ? '/app/pages/member/point' : '' })"
 							:style="{ color : '#fff' }" style="font-size: 22px;">{{ parseInt(info?.point) || 0 }}
 						</view>
 					</view>
 					<view class="text-sm mt-[10rpx]">
 						<view @click="redirect({ url: info ? '/app/pages/member/point' : '' })"
 							:style="{ color : '#fff' }">{{ t('point') }}</view>
 					</view>
 				</view>
 				<view class="border-solid border-white border-l border-b-0 border-t-0 border-r-0 h-[60rpx]"></view>
 				<view class="flex-1 text-center">
 					<view class="font-bold">
 						<view @click="redirect({ url: info ? '/app/pages/member/commission' : '' })"
 							:style="{ color : '#fff' }" style="font-size: 22px;">{{ parseInt(info?.commission) || 0 }}
 						</view>
 					</view>
 					<view class="text-sm mt-[10rpx]">
 						<view @click="redirect({ url: info ? '/app/pages/member/commission' : '' })"
 							:style="{ color : '#fff' }">佣金</view>
 					</view>
 				</view>
 			</view>

 		</view>



 		<view v-else @click="tourl('/app/pages/auth/login')" class=" bg-[var(--primary-color)]"
 			style="height: 200rpx;padding: 40rpx 3% 100rpx;color: #fff;">
 			<view style="align-items: center;display: flex;">
 				<image :src="img('@/static/resource/images/default_headimg.png')"
 					style="width: 120rpx;height:120rpx;border-radius: 50%;margin-right: 30rpx;border: 1px solid #eee;"
 					mode=""></image>
 				<view>
 					<view class="font-bold text--[16px] mb-[10rpx]">登录/注册</view>
 				</view>
 			</view>
 			<text class="nc-iconfont nc-icon-shezhiV6xx-1 text-[40rpx] ml-[10rpx]"
 				style="color: rgb(255, 255, 255);position: absolute;right: 30rpx;top:30rpx;"><span></span></text>
 		</view>


 		<view
 			style="padding:35rpx 3%;background-color: #fff;position: relative;z-index:2;margin:-80rpx 3% 20rpx;border-radius: 15rpx;">
 			<view style="font-weight: bold;font-size: 16px;margin:20rpx 0 30rpx;">资产转赠给好友</view>
 			<view style="display:flex;align-items: center;font-size: 14px;">
 				<view v-if="config?.is_transfer_balance==1" @click="tourl('/addon/transfer/pages/transfer/balance',1)"
 					style="display: flex;justify-content: space-between;flex-direction: column;flex:1;align-items: center;">
 					<image :src="img('/addon/transfer/static/img/5.png')"
 						style="width:70rpx;height:70rpx;margin-bottom:10rpx"></image>
 					<text>转赠余额</text>
 				</view>
 				<view v-if="config?.is_transfer_point==1"  @click="tourl('/addon/transfer/pages/transfer/point',0)"
 					style="display: flex;justify-content: space-between;flex-direction: column;flex:1;align-items: center;">
 					<image :src="img('addon/transfer/static/img/7.png')"
 						style="width:60rpx;height:60rpx;margin-bottom:10rpx"></image>
 					<text>转赠积分</text>
 				</view>
 				<view v-if="config?.is_transfer_coupon==1"  @click="tourl('/addon/transfer/pages/transfer/coupon',0)"
 					style="display: flex;justify-content: space-between;flex-direction: column;flex:1;align-items: center;">
 					<image :src="img('addon/transfer/static/img/8.png')"
 						style="width:70rpx;height:70rpx;margin-bottom:10rpx"></image>
 					<text>转赠优惠券</text>
 				</view>
 				<view v-if="config?.is_transfer_commission==1"  @click="tourl('/addon/transfer/pages/transfer/commission',0)"
 					style="display: flex;justify-content: space-between;flex-direction: column;flex:1;align-items: center;">
 					<image :src="img('addon/transfer/static/img/1.png')"
 						style="width:70rpx;height:70rpx;margin-bottom:10rpx"></image>
 					<text>转赠佣金</text>
 				</view>
 			</view>


 			<view style="font-weight: bold;font-size: 16px;margin:90rpx 0 20rpx;">资产兑换互转</view>

 			<view style="display:flex;align-items: center;font-size: 14px;margin-top:20rpx">
 				<view v-if="config?.is_point_balance==1"  @click="tourl('/addon/transfer/pages/duihuan/point_balance',1)"
 					style="display: flex;justify-content: space-between;flex-direction: column;flex:1;align-items: center;">
 					<image :src="img('addon/transfer/static/img/4.png')"
 						style="width:70rpx;height:70rpx;margin-bottom:10rpx"></image>
 					<text>积分兑换余额</text>
 				</view>
 				<view v-if="config?.is_balance_point==1"  @click="tourl('/addon/transfer/pages/duihuan/balance_point',0)"
 					style="display: flex;justify-content: space-between;flex-direction: column;flex:1;align-items: center;">
 					<image :src="img('addon/transfer/static/img/2.png')"
 						style="width:60rpx;height:60rpx;margin-bottom:10rpx"></image>
 					<text>余额兑换积分</text>
 				</view>
 				<view v-if="config?.is_commission_balance==1"  @click="tourl('/addon/transfer/pages/duihuan/commission_balance',0)"
 					style="display: flex;justify-content: space-between;flex-direction: column;flex:1;align-items: center;">
 					<image :src="img('addon/transfer/static/img/6.png')"
 						style="width:70rpx;height:70rpx;margin-bottom:10rpx"></image>
 					<text>佣金兑换余额</text>
 				</view>
 			</view>

 		</view>
 	</view>
 </template>
 <script lang="ts" setup>
	import { getConfig } from '@/addon/transfer/api/index'

	import { computed, ref, watch } from 'vue'
	import useMemberStore from '@/stores/member'
	import { useLogin } from '@/hooks/useLogin'
	import { img, isWeixinBrowser, redirect, urlDeconstruction, moneyFormat } from '@/utils/common'
	import { t } from '@/locale'
	import { wechatSync } from '@/app/api/system'
	import useDiyStore from '@/app/stores/diy'
	import useConfigStore from '@/stores/config'

	const props = defineProps(['component', 'index', 'pullDownRefreshCount', 'global']);

	const configStore = useConfigStore()
	const diyStore = useDiyStore();

	const diyComponent = computed(() => {
		if (diyStore.mode == 'decorate') {
			return diyStore.value[props.index];
		} else {
			return props.component;
		}
	})
	const warpCss = computed(() => {
		var style = '';
		if (diyComponent.value.componentStartBgColor) {
			if (diyComponent.value.componentStartBgColor && diyComponent.value.componentEndBgColor) style += `background:linear-gradient(${diyComponent.value.componentGradientAngle},${diyComponent.value.componentStartBgColor},${diyComponent.value.componentEndBgColor});`;
			else style += 'background-color:' + diyComponent.value.componentStartBgColor + ';';
		}
		if (diyComponent.value.bgUrl) {
			style += 'background-image:url(' + img(diyComponent.value.bgUrl) + ');';
			style += 'background-size: 100%;';
			style += 'background-repeat: no-repeat;';
		}
		if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';

		return style;
	})
	const memberStore = useMemberStore()

	const info = computed(() => {
		return memberStore.info;
	})


	const config = ref({
		is_sms: 0
	});
	getConfig().then((res : responseResult) => {
		config.value = res.data
	})

	const tourl = (url) => {
		uni.navigateTo({
			url: url
		});
	}
 </script>
 <style scoped>
 	@import '@/addon/transfer/static/css/base.css';

 	page {
 		background-color: #f5f5f5;
 	}

 	.listbox {
 		padding: 20rpx 0
 	}

 	.listbox .item {
 		padding: 20rpx;
 		background: #fff;
 		border-bottom: 1px solid #eee;
 	}

 	.listbox .item .price {
 		font-size: 16px;
 		color: #2987ff;
 	}
 </style>