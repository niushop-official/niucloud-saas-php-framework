<template>
    <view class="w-screen h-screen flex flex-col" :style="themeColor()" v-if="type">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{'height':headerHeight}">
			<top-tabbar :data="param" :scrollBool="topTabarObj.getScrollBool()" class="top-header"/>
		</view>
		<!-- #endif -->
		<view class="mx-[60rpx]">
			<view class="pt-[140rpx] text-[44rpx] font-500 text-[#333]">{{ type == 'username' ? t('usernameRegister') : t('mobileRegister') }}</view>
			<view class="text-[26rpx] leading-[39rpx] text-[var(--text-color-light6)] mt-[16rpx] mb-[80rpx]">{{ type == 'username' ? t('usernameRegisterTip') : t('mobileRegisterTip') }}</view>
			<u-form labelPosition="left" :model="formData" errorType='toast' :rules="rules" ref="formRef">
				<template v-if="type == 'username'">
					<view class="h-[88rpx] flex w-full items-center px-[30rpx] rounded-[var(--goods-rounded-mid)] box-border bg-[#F6F6F6]">
						<u-form-item label="" prop="username" :border-bottom="false">
							<u-input v-model="formData.username" border="none" maxlength="40" :placeholder="t('usernamePlaceholder')" class="!bg-transparent" :disabled="real_name_input" fontSize="26rpx" placeholderClass="!text-[var(--text-color-light9)] text-[26rpx]"/>
						</u-form-item>
					</view>
					<view class="h-[88rpx] flex w-full items-center px-[30rpx] rounded-[var(--goods-rounded-mid)] box-border bg-[#F6F6F6] mt-[40rpx]">
						<u-form-item label="" prop="password" :border-bottom="false">
							<u-input v-model="formData.password" border="none" type="password" maxlength="40" :placeholder="t('passwordPlaceholder')" class="!bg-transparent" :disabled="real_name_input" fontSize="26rpx" placeholderClass="!text-[var(--text-color-light9)] text-[26rpx]"/>
						</u-form-item>
					</view>
					<view class="h-[88rpx] flex w-full items-center px-[30rpx] rounded-[var(--goods-rounded-mid)] box-border bg-[#F6F6F6] mt-[40rpx]">
						<u-form-item label="" prop="confirm_password" :border-bottom="false">
							<u-input v-model="formData.confirm_password" border="none" type="password" maxlength="40" :placeholder="t('confirmPasswordPlaceholder')" class="!bg-transparent" :disabled="real_name_input" fontSize="26rpx" placeholderClass="!text-[var(--text-color-light9)] text-[26rpx]"/>
						</u-form-item>
					</view>
				</template>
				<template v-if="type == 'mobile' || configStore.login.is_bind_mobile">
					<view class="h-[88rpx] flex w-full items-center px-[30rpx] rounded-[var(--goods-rounded-mid)] box-border bg-[#F6F6F6] mt-[40rpx]">
						<u-form-item label="" prop="mobile" :border-bottom="false">
							<u-input v-model="formData.mobile" border="none" maxlength="11" :placeholder="t('mobilePlaceholder')" class="!bg-transparent" :disabled="real_name_input" fontSize="26rpx" placeholderClass="!text-[var(--text-color-light9)] text-[26rpx]"/>
						</u-form-item>
					</view>
					<view class="h-[88rpx] flex w-full items-center px-[30rpx] rounded-[var(--goods-rounded-mid)] box-border bg-[#F6F6F6] mt-[40rpx]">
						<u-form-item label="" prop="mobile_code" :border-bottom="false">
							<u-input v-model="formData.mobile_code" border="none" maxlength="4" :placeholder="t('codePlaceholder')" class="!bg-transparent" :disabled="real_name_input" fontSize="26rpx" placeholderClass="!text-[var(--text-color-light9)] text-[26rpx]">
								<template #suffix>
									<sms-code v-if="configStore.login.agreement_show" :mobile="formData.mobile" type="login" v-model="formData.mobile_key" :isAgree="isAgree"></sms-code>
									<sms-code v-else :mobile="formData.mobile" type="login" v-model="formData.mobile_key"></sms-code>
								</template>
							</u-input>
						</u-form-item>
					</view>
				</template>
				<template v-if="type == 'username'">
					<view class="h-[88rpx] flex w-full items-center px-[30rpx] rounded-[var(--goods-rounded-mid)] box-border bg-[#F6F6F6] mt-[40rpx]">
						<u-form-item label="" prop="captcha_code" :border-bottom="false">
							<u-input v-model="formData.captcha_code" border="none" :placeholder="t('captchaPlaceholder')" class="!bg-transparent" :disabled="real_name_input" fontSize="26rpx" placeholderClass="!text-[var(--text-color-light9)] text-[26rpx]">
								<template #suffix>
									<image :src="captcha.image.value" class="h-[48rpx] w-[60rpx] ml-[20rpx]" mode="heightFix" @click="captcha.refresh()"></image>
								</template>
							</u-input>
						</u-form-item>
					</view>
				</template>
			</u-form>
			<view class="mt-[160rpx]">
				<view v-if="configStore.login.agreement_show" class="flex items-center mb-[20rpx] py-[10rpx]" @click.stop="agreeChange">
					<u-checkbox-group @change="agreeChange">
						<u-checkbox activeColor="var(--primary-color)" :checked="isAgree" shape="circle" size="24rpx" :customStyle="{ 'marginTop': '4rpx' }" />
					</u-checkbox-group>
					<view class="text-[24rpx] text-[var(--text-color-light6)] flex items-center flex-wrap">
						<text>{{ t('agreeTips') }}</text>
						<text @click.stop="redirect({ url: '/app/pages/auth/agreement?key=privacy' })" class="text-primary">《{{t('privacyAgreement')}}》</text>
						<text>{{ t('and') }}</text>
						<text @click.stop="redirect({ url: '/app/pages/auth/agreement?key=service' })" class="text-primary">《{{t('userAgreement')}}》</text>
					</view>
				</view>
				<button class="w-full h-[80rpx] !bg-[var(--primary-color)] text-[26rpx] rounded-[40rpx] leading-[80rpx] font-500 !text-[#fff]" @click="handleRegister">{{t('register')}}</button>
				<view class="flex items-center justify-between mt-[30rpx]">
					<view class="text-[26rpx] text-[var(--text-color-light6)] leading-[34rpx]" v-if="registerType.length > 1" @click="type = type == 'username' ? 'mobile' : 'username' ">{{ type == 'username' ? t('mobileRegister') : t('usernameRegister') }}</view>
					<view class="text-[26rpx] text-[#333] leading-[34rpx]" @click="toLink">
						<text>{{ t('haveAccount') }},</text>
						<text class="text-primary">{{ t('toLogin') }}</text>
					</view>
				</view>
			</view>
		</view>
    </view>
</template>

<script setup lang="ts">
    import { ref, reactive, computed, onMounted } from 'vue'
    import { usernameRegister, mobileRegister } from '@/app/api/auth'
    import useMemberStore from '@/stores/member'
    import useConfigStore from '@/stores/config'
    import { useLogin } from '@/hooks/useLogin'
    import { useCaptcha } from '@/hooks/useCaptcha'
    import { t } from '@/locale'
    import { redirect, getToken,pxToRpx } from '@/utils/common'
    import { onLoad } from '@dcloudio/uni-app';
	import { topTabar } from '@/utils/topTabbar'
	
	let menuButtonInfo: any = {};
	// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
	// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
	menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	// #endif
	/********* 自定义头部 - start ***********/
	const topTabarObj = topTabar()
	let param = topTabarObj.setTopTabbarParam({title:'',topStatusBar:{bgColor: '#fff',textColor: '#333'}})
	/********* 自定义头部 - end ***********/
	const headerHeight = computed(()=>{
		return Object.keys(menuButtonInfo).length ? pxToRpx(Number(menuButtonInfo.height)) + pxToRpx(menuButtonInfo.top) + pxToRpx(8)+'rpx':'auto'
	})
    const formData = reactive({
        username: '',
        password: '',
        confirm_password: '',
        mobile: '',
        mobile_code: '',
        mobile_key: '',
        captcha_key: '',
        captcha_code: ''
    })

	const real_name_input = ref(true);
	onMounted(() => {
		// 防止浏览器自动填充
		setTimeout(()=>{
			real_name_input.value = false;
		},800)
	});

    const memberStore = useMemberStore()
    const configStore = useConfigStore()
	const loginType=ref('')

    onLoad(async (option: any) => {
	    await configStore.getLoginConfig()
	    if (!getToken() && !configStore.login.is_username && !configStore.login.is_mobile && !configStore.login.is_bind_mobile) {
		    uni.showToast({ title: '商家未开启普通账号注册', icon: 'none' })
		    setTimeout(() => {
			    redirect({ url: '/app/pages/index/index', mode: 'reLaunch' })
		    }, 100)
	    }
	    uni.getStorageSync('openid') && (Object.assign(formData, { openid: uni.getStorageSync('openid') }))
	    uni.getStorageSync('pid') && (Object.assign(formData, { pid: uni.getStorageSync('pid') }))

	    if (configStore.login.is_username) {
		    type.value = 'username'
	    } else if ((configStore.login.is_mobile || configStore.login.is_bind_mobile)) {
		    type.value = 'mobile'
	    }
	    loginType.value = option.type
    })

    const captcha = useCaptcha(formData)
    captcha.refresh()

    const loading = ref(false)

    const type = ref('')
	const agreeChange = () => {
		isAgree.value = !isAgree.value
	}
    const registerType = computed(()=> {
        const value = []
        configStore.login.is_username && (value.push({ type: 'username', title: t('usernameRegister') }))
        configStore.login.is_mobile && !configStore.login.is_bind_mobile && (value.push({ type: 'mobile', title: t('mobileRegister') }))
        return value
    })

    const rules = computed(()=>{
        return {
            'username': {
                type: 'string',
                required: type.value == 'username',
                message: t('usernamePlaceholder'),
                trigger: ['blur', 'change'],
            },
            'password': {
                type: 'string',
                required: type.value == 'username',
                message: t('passwordPlaceholder'),
                trigger: ['blur', 'change']
            },
            'confirm_password': [
                {
                    type: 'string',
                    required: type.value == 'username',
                    message: t('confirmPasswordPlaceholder'),
                    trigger: ['blur', 'change']
                },
                {
                    validator(rule: any, value: any){
                        return value == formData.password
                    },
                    message: t('confirmPasswordError'),
                    trigger: ['change','blur'],
                }
            ],
            'mobile': [
                {
                    type: 'string',
                    required: type.value == 'mobile' || configStore.login.is_bind_mobile,
                    message: t('mobilePlaceholder'),
                    trigger: ['blur', 'change'],
                },
                {
                    validator(rule: any, value: any){
                        if (type.value != 'mobile' && !configStore.login.is_bind_mobile) return true
                        else return uni.$u.test.mobile(value)
                    },
                    message: t('mobileError'),
                    trigger: ['change','blur'],
                }
            ],
            'mobile_code': {
                type: 'string',
                required: type.value == 'mobile' || configStore.login.is_bind_mobile,
                message: t('codePlaceholder'),
                trigger: ['blur', 'change']
            },
            'captcha_code': {
                type: 'string',
                required: type.value == 'username',
                message: t('captchaPlaceholder'),
                trigger: ['blur', 'change'],
            }
        }
    })

    const isAgree = ref(false)

    const formRef: any = ref(null)

    const handleRegister = () => {
        formRef.value.validate().then(() => {
            if (configStore.login.agreement_show && !isAgree.value) {
                uni.showToast({ title: t('isAgreeTips'), icon: 'none' });
                return false;
            }
            if (loading.value) return
            loading.value = true

            const register = type.value == 'username' ? usernameRegister : mobileRegister

            register(formData).then((res: any) => {
                memberStore.setToken(res.data.token)
                useLogin().handleLoginBack()
            }).catch(() => {
                loading.value = false
                captcha.refresh()
            })
        })
    }
	const toLink = ()=> {
		const pages = getCurrentPages(); // 获取页面栈
		if (pages.length > 1) {
			const currentPage = pages[pages.length - 2].route;
			if (currentPage == 'app/pages/auth/login') {
				// 返回上一页
				uni.navigateBack({
					delta: 1 // 默认值是1，表示返回的页面层数
				});
			}else{
				redirect({ url: '/app/pages/auth/login',mode:'redirectTo' })
			}
		}else{
			redirect({ url: '/app/pages/auth/login',mode:'redirectTo' })
		}

	}
</script>

<style lang="scss" scoped>
	:deep(.u-input){
		background-color: transparent !important;
	}
	:deep(.u-form-item){
		flex:1;
		.u-line{
			display:none;
		}
		.u-input__content__subfix-icon{
			display: flex;
			align-items: center;
		}
	}
	:deep(.u-checkbox){
		margin: 0 !important;
	}
</style>
