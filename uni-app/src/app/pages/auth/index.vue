<template>
	<view class="w-screen h-screen" :style="themeColor()">
		<view class="w-screen h-screen" :style="warpStyle">
			<!-- #ifdef MP-WEIXIN -->
			<view :style="{'height':headerHeight}">
				<top-tabbar :data="param" :scrollBool="topTabarObj.getScrollBool()" class="top-header"/>
			</view>
			<!-- #endif -->
			<view class="mx-[var(--sidebar-m)] px-[var(--pad-sidebar-m)]">
				<view class="pt-[154rpx] flex justify-center">
					<view v-if="systemStore.site?.front_end_logo" class="h-[90rpx] w-[300rpx]">
						<image class="h-[90rpx] w-[300rpx]" :src="img(systemStore.site?.front_end_logo)" mode="aspectFit"/>
					</view>
					<view v-else-if="systemStore.site?.front_end_icon" class="h-[250rpx] w-[250rpx]">
						<image class="h-[250rpx] w-[250rpx]" :src="img(systemStore.site?.front_end_icon)" mode="aspectFit"/>
					</view>
					<view v-else class="h-[90rpx] w-[300rpx]"></view>
				</view>
				<view class="text-[var(--text-color-light6)]] text-[28rpx] text-center leading-[34rpx] min-h-[34rpx] mt-[40rpx]">{{ loginConfig.desc }}</view>
				<view class="mt-[181rpx]">

					<!-- #ifdef H5 -->
					<!-- 微信公众号快捷登录 -->
					<view v-if="isWeixinBrowser() && loginConfig.is_auth_register" class="w-full flex items-center justify-center mb-[40rpx]">
						<button class="w-[630rpx] h-[88rpx] !mx-[0] !bg-[var(--primary-color)] text-[26rpx] rounded-[44rpx] leading-[88rpx] font-500 !text-[#fff]" @click="oneClickLogin()">{{t('quickLoginOrLogout')}}</button>
					</view>
					<!-- #endif -->

					<!-- #ifdef MP-WEIXIN -->
					<!-- 微信小程序快捷登录 -->

					<!-- 优先显示第三方登录/注册 -->
					<view class="w-full flex items-center justify-center mb-[40rpx]" v-if="loginConfig.is_auth_register">

						<!-- 开启强制绑定手机号或者手机号登录的情况 -->
						<button v-if="!wapMemberMobile && loginConfig.is_bind_mobile"
						class="w-[630rpx] h-[88rpx] !bg-[var(--primary-color)] !mx-[0] text-[26rpx] rounded-[44rpx] leading-[88rpx] font-500 !text-[#fff]"
						:open-type="openType" @getphonenumber="mobileAuth" @click="checkWxPrivacy">{{t('quickLoginOrLogout')}}</button>

						<!-- 授权登录/注册 -->
						<button v-else class="w-[630rpx] h-[88rpx] !mx-[0] !bg-[var(--primary-color)] text-[26rpx] rounded-[44rpx] leading-[88rpx] font-500 !text-[#fff]" @click="oneClickLogin()">{{t('quickLoginOrLogout')}}</button>

					</view>

					<!-- 未开启第三方登录/注册，但是开启了手机号登录，则一键手机号登录/注册 -->
					<view class="w-full flex items-center justify-center mb-[40rpx]" v-else-if="!loginConfig.is_auth_register && loginConfig.is_mobile">
						<button v-if="!wapMemberMobile" class="w-[630rpx] h-[88rpx] !bg-[var(--primary-color)] !mx-[0] text-[26rpx] rounded-[44rpx] leading-[88rpx] font-500 !text-[#fff]" :open-type="openType" @getphonenumber="mobileAuth" @click="checkWxPrivacy">{{t('quickLoginOrLogout')}}</button>
						<button v-else class="w-[630rpx] h-[88rpx] !bg-[var(--primary-color)] !mx-[0] text-[26rpx] rounded-[44rpx] leading-[88rpx] font-500 !text-[#fff]" @click="oneClickLogin()">{{t('quickLoginOrLogout')}}</button>
					</view>

					<!-- 小程序隐私协议 -->
					<wx-privacy-popup ref="wxPrivacyPopupRef"></wx-privacy-popup>

					<!-- #endif -->

					<!-- 手机号登录 -->
					<view v-if="loginConfig.is_mobile" class="mb-[40rpx] w-full flex items-center justify-center">
						<!-- #ifdef H5 -->
						<button class="w-[630rpx] h-[88rpx] !mx-[0] !bg-[#fff] border-[var(--primary-color)] border-solid border-[2rpx] text-[26rpx] rounded-[44rpx] leading-[84rpx] !text-[var(--primary-color)]" @click="redirect({ url: '/app/pages/auth/login',param:{type:'mobile'}})">{{ t('mobileLogin') }}</button>
						<!-- #endif -->

						<!-- #ifdef MP-WEIXIN -->
						<button v-if="authRegisterLogin && loginConfig.is_mobile" class="w-[630rpx] h-[88rpx] !mx-[0] !bg-[#fff] border-[var(--primary-color)] border-solid border-[2rpx] text-[26rpx] rounded-[44rpx] leading-[84rpx] !text-[var(--primary-color)]" @click="redirect({ url: '/app/pages/auth/login',param:{type:'mobile'}})">{{ t('otherMobileLogin') }}</button>
						<button v-else class="w-[630rpx] h-[88rpx] !mx-[0] !bg-[#fff] border-[var(--primary-color)] border-solid border-[2rpx] text-[26rpx] rounded-[44rpx] leading-[84rpx] !text-[var(--primary-color)]" @click="redirect({ url: '/app/pages/auth/login',param:{type:'mobile'}})">{{ t('mobileLogin') }}</button>
						<!-- #endif -->
					</view>

					<view v-else-if="!loginConfig.is_mobile && loginConfig.is_username" class="w-full flex items-center justify-center">
						<button class="w-[630rpx] h-[88rpx] !mx-[0] !bg-[#fff] !border-[var(--primary-color)] border-solid border-[2rpx] text-[26rpx] rounded-[44rpx] leading-[84rpx] !text-[var(--primary-color)]" @click="redirect({ url: '/app/pages/auth/login',param:{type:'username'}})">{{t('accountLogin')}}</button>
					</view>
					<view v-if="loginConfig.agreement_show" class="w-full flex items-center justify-center mt-[28rpx]">
						<view  class="flex items-center justify-center mt-[28rpx] py-[10rpx]" @click.stop="agreeChange">
							<u-checkbox-group @change="agreeChange">
								<u-checkbox activeColor="var(--primary-color)" :checked="isAgree" shape="circle" size="26rpx" :customStyle="{ 'marginTop': '5rpx !important' }" />
							</u-checkbox-group>
							<view class="text-[24rpx] text-[var(--text-color-light6)] flex items-center flex-wrap">
								<text>{{ t('agreeTips') }}</text>
								<text @click.stop="redirect({ url: '/app/pages/auth/agreement?key=privacy' })" class="text-primary">《{{t('privacyAgreement')}}》</text>
								<text>{{ t('and') }}</text>
								<text @click.stop="redirect({ url: '/app/pages/auth/agreement?key=service' })" class="text-primary">《{{t('userAgreement')}}》</text>
							</view>
						</view>
					</view>

					<view class="footer w-full" v-if="loginConfig.is_mobile && loginConfig.is_username">
						<view class="text-[26rpx] leading-[36rpx] text-[333] text-center mb-[30rpx] font-400">{{t('otherLogin')}}</view>
						<view class="flex justify-center">
							<view class="h-[80rpx] w-[80rpx] text-center leading-[78rpx] border-[2rpx] text-primary rounded-[50%] border-solid border-[#ddd] nc-iconfont nc-icon-a-wodeV6xx-36 text-[46rpx] overflow-hidden" @click="redirect({ url: '/app/pages/auth/login',param:{type:'username'}})"></view>
						</view>
						<view class="text-[24rpx] leading-[36rpx] text-[var(--text-color-light9)] text-center font-400 mt-[30rpx]">{{t('accountLogin')}}</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, computed,nextTick } from 'vue'
	import { img,isWeixinBrowser,getToken,redirect,pxToRpx } from '@/utils/common'
	import { t } from '@/locale'
	import { useLogin } from '@/hooks/useLogin'
	import useConfigStore from '@/stores/config'
	import useMemberStore from '@/stores/member'
	import { onLoad,onShow } from '@dcloudio/uni-app'
	import { topTabar } from '@/utils/topTabbar'
	import useSystemStore from '@/stores/system'
	
	let menuButtonInfo: any = {};
	// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
	// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
	menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	// #endif
	/********* 自定义头部 - start ***********/
	const topTabarObj = topTabar()
	let param = topTabarObj.setTopTabbarParam({title:'',topStatusBar:{textColor: '#333'}})
	/********* 自定义头部 - end ***********/
	const headerHeight = computed(()=>{
		return Object.keys(menuButtonInfo).length ? pxToRpx(Number(menuButtonInfo.height)) + pxToRpx(menuButtonInfo.top) + pxToRpx(8)+'rpx':'auto'
	})
	const wapMemberMobile = ref('');
	const isAgree = ref(false)

	const configStore = useConfigStore()
	const loginConfig = computed(() => {
		return configStore.login
	})
	const login = useLogin()

	const memberStore = useMemberStore()
	const memberInfo: any = computed(()=>{
		return useMemberStore().info;
	})
	const systemStore =useSystemStore()
	const openType: any = computed(()=>{
		if (!isAgree.value && configStore.login.agreement_show) return '';
		return 'getPhoneNumber';
	})

	const wxPrivacyPopupRef:any = ref(null)
	const authRegisterLogin: any = computed(()=> {
		return !configStore.login.is_auth_register;
	});
	const loginLoading = ref(false)

	onLoad(async ()=> {
		await systemStore.getSiteInfoFn()
		await configStore.getLoginConfig()
		let normalLogin = !configStore.login.is_username && !configStore.login.is_mobile && !configStore.login.is_bind_mobile; // 未开启普通登录

		// #ifdef H5
		if (isWeixinBrowser()) {
			// 微信浏览器
			if (!getToken() && normalLogin && authRegisterLogin.value) {
				uni.showToast({ title: '商家未开启登录注册', icon: 'none' })
				setTimeout(() => {
					redirect({ url: '/app/pages/index/index', mode: 'reLaunch' })
				}, 100)
			}
		} else {
			// 普通浏览器
			if (!getToken() && normalLogin) {
				uni.showToast({ title: '商家未开启登录注册', icon: 'none' })
				setTimeout(() => {
					redirect({ url: '/app/pages/index/index', mode: 'reLaunch' })
				}, 100)
			}
		}
		// #endif

		// #ifdef MP
		if (!getToken() && normalLogin && authRegisterLogin.value) {
			uni.showToast({ title: '商家未开启登录注册', icon: 'none' })
			setTimeout(() => {
				redirect({ url: '/app/pages/index/index', mode: 'reLaunch' })
			}, 100)
			return;
		}
		wapMemberMobile.value = uni.getStorageSync('wap_member_mobile');
		nextTick(() => {
			if (wxPrivacyPopupRef.value) wxPrivacyPopupRef.value.proactive();
		})

		// #endif
	})

	onShow(()=> {
		loginLoading.value = false;
	})

	const warpStyle = computed(()=>{
		var style = '';
		if(configStore.login.bg_url){
			style += 'background-image:url(' + img(configStore.login.bg_url) + ');';
			style += 'background-size: 100%;';
			style += 'background-position: top;';
			style += 'background-repeat: no-repeat;';
		}
		return style
	})

	// 检测是否同意小程序隐私协议和登录政策协议
	const checkWxPrivacy = ()=> {
		if (!isAgree.value && configStore.login.agreement_show) {
			uni.showToast({ title: t('isAgreeTips'), icon: 'none' })
			return true;
		}
		return false;
	}

	// 一键登录
	const oneClickLogin = (callback:any = null)=> {
		if (checkWxPrivacy()) return;

		if (loginLoading.value) return
		loginLoading.value = true

		if (!callback) {
			callback = () => {
				loginLoading.value = false
			}
		}

		// #ifdef H5
		wechatLogin();
		// #endif

		// 第三方平台自动登录
		// #ifdef MP
		weappLogin(callback)
		// #endif
	}

	// 微信公众登录
	const wechatLogin = ()=> {
		if (isWeixinBrowser()) {
		   login.getAuthCode({ scopes : 'snsapi_userinfo' })
			loginLoading.value = false
		}
	}

	// 微信小程序登录
	const weappLogin = (successCallback: any)=> {
		login.getAuthCode({ backFlag: true, successCallback })
	}

	const agreeChange = () => {
		isAgree.value = !isAgree.value
	}

	const mobileAuth = (e: any) => {
		if (e.detail.errMsg == 'getPhoneNumber:ok') {
			oneClickLogin((data: any) => {
				if (!data.mobile) {
					memberStore.bindMobile(e);
				} else {
					uni.setStorageSync('wap_member_mobile', memberInfo.value.mobile) // 存储会员手机号，防止重复请求微信获取手机号接口
				}
				loginLoading.value = false
			});
		}

		if (e.detail.errno == 104) {
			let msg = '用户未授权隐私权限';
			uni.showToast({ title: msg, icon: 'none' })
		}
		if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
			let msg = '用户拒绝获取手机号码';
			uni.showToast({ title: msg, icon: 'none' })
		}
	}
</script>

<style lang="scss" scoped>
	.footer{
		margin-top:200rpx;
		padding-bottom:calc(151rpx + constant(safe-area-inset-bottom));
		padding-bottom:calc(151rpx + env(safe-area-inset-bottom));
	}
	:deep(.u-checkbox){
		margin:0 !important;
	}
</style>