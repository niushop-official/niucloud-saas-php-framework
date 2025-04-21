<template>
	<view :style="themeColor()">
		<view class="w-screen  flex " v-if="info">
			<view class="indexbj flexmc bg-[var(--primary-color)]">
				<view class="flexmc" style="padding-bottom: 150rpx;color:#fff">
					<view>余额</view>
					<view style="font-size:33px;font-weight:blod;">{{info.balance}}</view>
				</view>
			</view>
			<view class="flex-1 bg-[#fff]"
				style="position: relative;z-index: 2;border-radius: 16rpx 16rpx 0 0;margin:250rpx 0 0;width:94%;border-radius:50rpx 50rpx 0 0">

				<view class="flexmc" style="margin:50rpx 0 20rpx;font-size:16px;font-weight:blod;">余额转积分</view>

				<view class="px-[60rpx]">
					<u-form labelPosition="left" labelWidth="150rpx" :model="formData" errorType='toast' :rules="rules"
						ref="formRef">
						 
						<view class="mt-[30rpx]">
							<u-form-item label="转出数量:" prop="number" :border-bottom="true">
								<u-input v-model="formData.number" border="none" clearable placeholder="请填写转出数量"
									class="!bg-transparent" :disabled="real_name_input" fontSize="26rpx"
									placeholderClass="!text-[#8288A2]" />
							</u-form-item>
						</view>
						<view class="mt-[30rpx]" v-if="config?.is_sms==1">
							<u-form-item label="手机号:" prop="mobile" :border-bottom="true">
								<span @click="tobind">{{formData.mobile||'未绑定, 前往绑定'}}</span>
							</u-form-item>
						</view>
						<view class="mt-[30rpx]" v-if="config?.is_sms=='1'">
							<u-form-item label="验证码:" prop="code" :border-bottom="true">
								<u-input v-model="formData.mobile_code" border="none" clearable
									:placeholder="t('codePlaceholder')" class="!bg-transparent"
									:disabled="real_name_input" fontSize="26rpx" placeholderClass="!text-[#8288A2]">
									<template #suffix>
										<sms-code :mobile="formData.mobile" type="find_pass"
											v-model="formData.mobile_key"></sms-code>
									</template>
								</u-input>
							</u-form-item>
						</view>
						<view class="mt-[30rpx]" v-if="config?.is_password==1">
							<u-form-item label="安全密码:" prop="password" :border-bottom="true">
								<u-input v-model="formData.password" border="none" type="password" clearable placeholder="请填写登录密码安全验证"
									class="!bg-transparent" :disabled="real_name_input" fontSize="26rpx"
									placeholderClass="!text-[#8288A2]" />
							</u-form-item>
						</view>

						<view class="mt-[280rpx]">
							<button hover-class="none"
								class="bg-[var(--primary-color)] text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[28rpx]"
								:loading="loading" :loadingText="t('confirm')"
								@click="handleConfirm">{{t('confirm')}}</button>

							<view v-if="config?.point_balance_rate"
								style="color:#888;text-align: center;margin-top: 20rpx;font-size:14px">兑换比例:
								每1积分可兑换{{config.point_balance_rate}}元余额</view>
						</view>
					</u-form>
				</view>
			</view>

		</view>

		<u-popup :show="showta" mode="bottom" @close="showta=false" closeable closeOnClickOverlay>
			<view style="padding:50rpx 30rpx 30rpx">
				<view class="titleb">请核对受赠人信息</view>
				<view class="flexmc" style="padding:30rpx 25rpx;">
					<u-avatar :src="img(tainfo.headimg)" :size="60"></u-avatar>
					<view style="margin-top: 20rpx;">
						<view style="font-size: 18px;">{{tainfo.nickname}}</view>
					</view>
				</view>
				<view class="flex">
					<button hover-class="none"
						class="bg-[var(--primary-color)] text-[#fff] h-[80rpx] w-[290rpx] leading-[80rpx] rounded-[100rpx] text-[28rpx]"
						:loadingText="t('confirm')" style="background: #aaa;" @click="showta=false">取消修改</button>
					<button hover-class="none"
						class="bg-[var(--primary-color)] text-[#fff] h-[80rpx] w-[290rpx] leading-[80rpx] rounded-[100rpx] text-[28rpx]"
						:loading="loading" :loadingText="t('confirm')" @click="to_transfer">确定转赠</button>
				</view>
			</view>
		</u-popup>
	</view>

</template>

<script setup lang="ts">
	import { ref, reactive, onMounted, computed } from 'vue'
	import { t } from '@/locale'
	import { getMemberInfo } from '@/app/api/member'
	import { redirect, img } from '@/utils/common'
	import { onShow } from '@dcloudio/uni-app'
	import { getConfig } from '@/addon/transfer/api/index'
	import { duihuan_balance_point } from '@/addon/transfer/api/duihuan'
	
	import useMemberStore from '@/stores/member'
	const memberStore = useMemberStore()




	const defaultFormData = {
	  mobile: '',
	  mobile_code: '',
	  mobile_key: '',
	  to_account: '',
	  number: '',password:''
	};
	
	const formData = reactive(Object.assign({}, defaultFormData));
	
	const resetFormData = () => {
	  Object.assign(formData, defaultFormData);
	};
	
	const text = ref('积分');
	const yue = ref(0);

	const info = ref('');
	


	const tobind = () => {
		uni.navigateTo({
			url: '/app/pages/auth/bind'
		})
	}
	
	const getuserinfo = () => {
		getMemberInfo().then((res : responseResult) => {
			info.value = res.data;
			formData.mobile = info.value?.mobile;
			if (!info) {
				uni.navigateTo({
					url: '/app/pages/auth/login'
				});
			}
		}) 
	}
	onShow( () => {
		getuserinfo();
	})
	





	const rules = {
		'to_account': {
			type: 'string',
			required: true,
			message: '请填写对方手机号或者账号',
			trigger: ['blur', 'change']
		},
		'number': {
			type: 'number',
			required: true,
			message: '请填写转出数量',
			trigger: ['blur', 'change']
		},
		'password': {
			type: 'string',
			required: true,
			message: '请填写安全密码',
			trigger: ['blur', 'change']
		},
		'mobile': [
			{
				type: 'string',
				required: true,
				message: '未绑定手机号码',
				trigger: ['blur', 'change'],
			},
			{
				validator(rule, value) {
					return uni.$u.test.mobile(value)
				},
				message: '未绑定手机号码',
				trigger: ['change', 'blur'],
			}
		],
		'mobile_code': {
			type: 'string',
			required: true,
			message: t('codePlaceholder'),
			trigger: ['blur', 'change']
		}
	}
	const config = ref({
		is_sms: 0
	});
	getConfig().then((res : responseResult) => {
		config.value = res.data
		console.log(config.value)

		rules.mobile_code.required = config.value.is_sms == 1 ? true : false;
		rules.mobile_code.required = config.value.is_sms == 1 ? true : false;
		rules.password.required = config.value.is_password == 1 ? true : false;
	})

	const real_name_input = ref(true);
	onMounted(() => {
		// 防止浏览器自动填充
		setTimeout(() => {
			real_name_input.value = false;
		}, 800)
	});

	const loading = ref(false)
	const formRef = ref(null)


	const showta = ref(false)
	const tainfo = ref('')
	const handleConfirm = () => {
		formRef.value.validate().then(() => {
			if (loading.value) return
			loading.value = true

			duihuan_balance_point(formData).then((res : responseResult) => {
				loading.value = false
				uni.showToast({
					title: '兑换成功'
				});
				resetFormData()
				setTimeout(function () {
					getuserinfo();
				}, 1500)
			
			}).catch(() => {
				loading.value = false
			})
		})
	}
</script>

<style lang="scss">
	.u-input {
		background-color: transparent !important;
	}
</style>

<style scoped>
	@import '@/addon/transfer/static/css/base.css';

	page {
		background-color: #fff;
	}

	.body {
		padding: 0 3%;
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