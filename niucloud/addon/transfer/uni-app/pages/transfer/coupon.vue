<template>
	<view :style="themeColor()">
		<view class="w-screen  flex " v-if="info">
			<view class="indexbj flexmc bg-[var(--primary-color)]">
				<view class="flexmc" style="padding-bottom: 150rpx;color:#fff">
					<view>有效优惠券</view>
					<view class="flex">
						<view style="font-size:33px;font-weight:blod;margin-right:10rpx">{{coupon_num||0}}</view>张
					</view>
				</view>
			</view>
			<view class="flex-1 bg-[#fff]"
				style="position: relative;z-index: 2;border-radius: 16rpx 16rpx 0 0;margin:250rpx 0 0;width:94%;border-radius:50rpx 50rpx 0 0">

				<view class="flexmc" style="margin:50rpx 0 20rpx;font-size:16px;font-weight:blod;">优惠券转赠</view>

				<view class="px-[60rpx]">
					<u-form labelPosition="left" labelWidth="150rpx" :model="formData" errorType='toast' :rules="rules"
						ref="formRef">
						<view class="mt-[30rpx]">
							<u-form-item label="对方账号:" prop="to_account" :border-bottom="true">
								<u-input v-model="formData.to_account" border="none" clearable
									placeholder="请填写对方手机号/会员编号/账号" class="!bg-transparent" :disabled="real_name_input"
									fontSize="26rpx" placeholderClass="!text-[#8288A2]" />
							</u-form-item>
						</view>
						<view class="mt-[30rpx]">
							<u-form-item label="优惠券:" prop="number" :border-bottom="true">
								<view class="flexb" style="width:100%" @click="showcoupon=true">
									<view v-if="my_coupon&&my_coupon.title">{{my_coupon.title}} 【{{my_coupon.type_name}}】</view>
									<view v-else style="color:#888">请选择优惠券</view>
									<u-icon name="arrow-right"></u-icon>
								</view>
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
								<u-input v-model="formData.password" border="none" type="password" clearable
									placeholder="请填写登录密码安全验证" class="!bg-transparent" :disabled="real_name_input"
									fontSize="26rpx" placeholderClass="!text-[#8288A2]" />
							</u-form-item>
						</view>

						<view class="mt-[280rpx]">
							<button hover-class="none"
								class="bg-[var(--primary-color)] text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[28rpx]"
								:loading="loading" :loadingText="t('confirm')"
								@click="handleConfirm">{{t('confirm')}}</button>

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


		<u-popup :show="showcoupon" mode="bottom" @close="showcoupon=false" bgColor="#f8f8f8" closeable closeOnClickOverlay>
			<view style="padding:50rpx 30rpx 30rpx">
				<view class="titleb">请选择赠送的优惠券</view>
				<view class="" >
					<view class="py-[20rpx] px-[24rpx]" v-if="coupon_list.length">
						<view v-for="(item, index) in coupon_list" style="position: relative;">

							<view
								class="flex items-center relative w-[100%] rounded-[20rpx] overflow-hidden bg-[#fff] py-[10rpx] background-size"
								:class="{'mt-[20rpx]' : index}"
								:style="{ backgroundImage: 'url(' + img('addon/shop/coupon/coupn_bg.png') + ')'  }">
								<view
									class="relative box-border flex-1 border-0 border-r-[1px] border-[#FFBDBD] border-dashed flex items-center">
									<view class="pl-[40rpx] w-[200rpx] box-border">
										<view class="price-font flex items-center text-[var(--primary-color)]">
											<text class="text-[38rpx] leading-[45rpx] text-center font-500">￥</text>
											<text
												class="text-[56rpx] font-semibold text-left leading-[70rpx] truncate">{{ item.coupon_price }}</text>
										</view>
									</view>
									<view class="flex-1 box-border ml-[10rpx]">
										<view class="text-[30rpx] leading-[35rpx] text-left font-500">
											<text v-if="item.min_condition_money === '0.00'">无门槛</text>
											<text v-else>满{{ item.coupon_min_price }}元可用</text>
										</view>
										<view class="text-[20rpx] leading-[23rpx] mt-[4px] text-left flex items-center">
											<text
												class="bg-[var(--primary-color)] text-[#fff] text-[20rpx] text-center h-[28rpx] leading-[28rpx] px-[10rpx] rounded-[16rpx] mr-[6rpx] shrink-0">{{ item.type_name }}</text>
											<text class="truncate max-w-[190rpx]">{{ item.title }}</text>
										</view>
										<view class="w-[100%] mt-[4px]  mb-[11px] text-[20rpx] leading-[23rpx]">
											<text>有效期至<text>{{ item.expire_time ? item.expire_time.slice(0, 10) : '' }}</text></text>
										</view>
									</view>
								</view>
								<view class="pr-[20rpx] pl-[30rpx]" >
									<u-button text="选择"
										:customStyle="{width:'150rpx',height:'60rpx',color:'var(--primary-color)', fontSize:'24rpx',lineHeight:'60rpx', padding:'0',backgroundColor:'transparent',border:'2rpx solid var(--primary-color)'}"
										shape="circle" @click="xuan(item)"></u-button>
								</view>
								<view
									class="absolute top-0 right-[190rpx]  h-[10rpx] w-[20rpx] rounded-br-[20rpx] rounded-bl-[20rpx] bg-[#F6F6F6] ">
								</view>
								<view
									class="absolute bottom-0 right-[190rpx] h-[10rpx] w-[20rpx] rounded-tr-[20rpx] rounded-tl-[20rpx] bg-[#F6F6F6]">
								</view>
							</view>
						</view>
					</view>
					<view
						class="noData my-[20rpx] mx-[24rpx] bg-[#fff] rounded-[20rpx] flex items-center justify-center"
						v-if="!coupon_list.length && loading">
						<mescroll-empty :option="{'tip' : '暂无优惠券'}"></mescroll-empty>
					</view>
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
	import { transfer_checkmember, transfer_coupon,getMyCouponList } from '@/addon/transfer/api/transfer'
	import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
	// import { getMyCouponList } from '@/addon/shop/api/coupon'

	import useMemberStore from '@/stores/member'
	const memberStore = useMemberStore()




	const defaultFormData = {
		mobile: '',
		mobile_code: '',
		mobile_key: '',
		to_account: '',
		number: '', password: ''
	};

	const formData = reactive(Object.assign({}, defaultFormData));

	const resetFormData = () => {
		Object.assign(formData, defaultFormData);
	};


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
	onShow(() => {
		getuserinfo();
	})






	const rules = {
		'to_account': {
			type: 'string',
			required: true,
			message: '请填写对方手机号或者账号',
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

	const my_coupon_id = ref('')
	const my_coupon = ref('')
	const showta = ref(false)
	const tainfo = ref('')
	const handleConfirm = () => {
		formRef.value.validate().then(() => {
			if (loading.value) return
			loading.value = true
			
			if(!my_coupon_id.value){
				uni.showToast({
					title:'请选择优惠券',icon:'none'
				});return;
			}

			transfer_checkmember(formData).then((res : responseResult) => {
				loading.value = false
				tainfo.value = res.data;
				showta.value = true;
			}).catch(() => {
				loading.value = false
			})
		})
	}
	const to_transfer = () => {
		showta.value = false;
		loading.value = true
		formData.my_coupon_id = my_coupon_id.value
		transfer_coupon(formData).then((res : responseResult) => {
			loading.value = false
			uni.showToast({
				title: '转赠成功'
			});
			my_coupon.value = '';
			my_coupon_id.value = '';
			resetFormData()
			setTimeout(function () {
				getMyCouponListFn()
			}, 1500)

		}).catch(() => {
			loading.value = false
		})
	}

	const showcoupon = ref(false)
	const coupon_list = ref<Array<Object>>([]);
	const coupon_num = ref(0);


	const getMyCouponListFn = (mescroll) => {
		
		let data : object = {
			page: 1,
			limit: 100,
			status: 1
		};

		getMyCouponList(data).then((res) => {
			let newArr = (res.data.data as Array<Object>);

			console.log(newArr)
			coupon_list.value = coupon_list.value.concat(newArr);
			coupon_num.value = res.data.total
		}).catch(() => {
		})
	}
	getMyCouponListFn()
	
	const xuan = (item)=>{
		showcoupon.value = false;
		my_coupon.value = item;
		my_coupon_id.value = item.id;
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


<style lang="scss" scoped>
	.remove-border {
		&::after {
			border: none;
		}
	}

	.class-select {
		position: relative;
		font-weight: bold;

		&::before {
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

	.background-size {
		background-repeat: no-repeat;
		background-position: right top;
		background-size: 27%;
	}

	.noData {
		height: calc(100vh - 130rpx - constant(safe-area-inset-bottom));
		height: calc(100vh - 130rpx - env(safe-area-inset-bottom));
	}
</style>