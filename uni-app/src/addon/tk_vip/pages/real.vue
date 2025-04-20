<template>
	<view class="contain min-h-[100vh]" v-if="deatailData">
		<view class="tk-card mt-80rpx">
			<view class="flex items-center justify-between">
				<view class="flex items-center">
					<view class="font-bold z-10084 text-[36rpx]">
						实名认证
					</view>
					<view class="ml-2">
						<u-tag :text="deatailData.status_name" :type="deatailData.status == 1 ? 'primary' : 'error'"
							size="mini" />
					</view>
				</view>

			</view>
			<view class="flex mt-3 text-[#767676] items-center mb-[20rpx]">
				请准确填写信息,以便我们给你提供更好的服务
			</view>
			<view class="form-container">
				<up-form labelStyle="{fontWeight:'bold'}" labelPosition="left" labelWidth="70" :model="deatailData"
					:rules="rules" ref="form1">
					<up-form-item label="真实姓名" prop="real_name" borderBottom ref="item1">
						<up-input :focus="(deatailData.status==10||deatailData.status==2)?true:false" color="#666666"
							v-model="deatailData.real_name" class="custom-input"></up-input>
					</up-form-item>
					<up-form-item type="idcard" label="身份证号" prop="card_num" borderBottom ref="item2">
						<up-input color="#666666" v-model="deatailData.card_num" class="custom-input"></up-input>
					</up-form-item>
					<up-form-item label="手机号码" prop="mobile" borderBottom ref="item1">
						<up-input color="#666666" v-model="deatailData.mobile" class="custom-input"></up-input>
					</up-form-item>
					<up-form-item v-if="realConfig&&realConfig.is_upload_card&&realConfig.is_upload_card==1" label=""
						borderBottom ref="item1">
						<view class="flex flex-col mt-2" v-if="deatailData.status==10||deatailData.status==2">
							<view class="text-xs text-slate-400">上传身份证国徽面</view>
							<upload-img class="mt-[20rpx]" :max-count="1" v-model="deatailData.card_img_front"
								:multiple="true" />
						</view>
					</up-form-item>
					<up-form-item v-if="realConfig&&realConfig.is_upload_card&&realConfig.is_upload_card==1" label=""
						borderBottom ref="item1">
						<view class="flex flex-col mt-2" v-if="deatailData.status==10||deatailData.status==2">
							<view class="text-xs text-slate-400">上传身份证人像面</view>
							<upload-img class="mt-[20rpx]" :max-count="1" v-model="deatailData.card_img_back"
								:multiple="true" />
						</view>
					</up-form-item>


				</up-form>
			</view>
			<view v-if="deatailData.status==10||deatailData.status==2" class="mt-[40rpx] mb-[20rpx]">
				<u-button color="#66c0f7" type="primary" shape="circle" text="提交审核" @click="save()"
					:disabled="btnDisabled"></u-button>
			</view>

		</view>

	</view>
</template>


<script setup lang="ts">
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import { redirect } from '@/utils/common'
	import { getRealConfig, checkReal, submitReal, getRealInfo } from '@/addon/tk_vip/api/real'
	import uploadImg from '@/addon/tk_vip/pages/components/upload-img'
	const form1 = ref()
	const realInfo = ref()
	const realConfig = ref()
	getRealConfig().then((res) => {
		realConfig.value = res.data
	})
	const redirectPage = ref('/addon/tk_vip/pages/index')
	const deatailData = ref({
		real_name: '',
		card_num: '',
		mobile: '',
		card_img_back: [],
		card_img_front: [],
		status: "",
		status_name: ""
	})
	const rules = {
		real_name: [
			{ required: true, message: '请输入姓名', trigger: 'blur' }
		],
		card_num: [
			{ required: true, message: '请输入身份证号码', trigger: 'blur' },
			{ validator: validateCardNum, trigger: 'blur' }
		],
		mobile: [
			{ required: true, message: '请输入手机号码', trigger: 'blur' },
			{ validator: validateMobile, trigger: 'blur' }
		],
		card_img_front: [
			{ required: true, message: '请上传身份证国徽面', trigger: 'blur' },
		],
		card_img_back: [
			{ required: true, message: '请上传身份证人像面', trigger: 'blur' },
		],
	}
	function validateCardNum(rule, value, callback) {
		if (!value) {
			return callback(new Error('请输入身份证号码'));
		}
		// 正则表达式修改为匹配正确的身份证格式
		if (!/^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
			callback(new Error('请输入正确的身份证号码'));
		} else {
			callback();
		}
	}

	// 自定义手机号码验证函数
	function validateMobile(rule : any, value : any, callback : any) {
		if (!value) {
			return callback(new Error('请输入电话号码'));
		}
		if (!/^1[3456789]\d{9}$/.test(value)) {
			callback(new Error('请输入正确的电话号码'));
		} else {
			callback();
		}
	}
	const getRealInfoFn = async () => {
		const res = await getRealInfo()
		deatailData.value.real_name = res.data.real_name
		deatailData.value.card_num = res.data.card_num
		deatailData.value.mobile = res.data.mobile
		deatailData.value.status = res.data.status
		deatailData.value.status_name = res.data.status_name
	}
	const save = async () => {
		if (realConfig.value.is_upload_card == 1 && deatailData.value.card_img_front.length == 0) {
			uni.$u.toast('请上传身份证国徽面')
			return
		}
		if (realConfig.value.is_upload_card == 1 && deatailData.value.card_img_back.length == 0) {
			uni.$u.toast('请上传身份证人像面')
			return
		}
		const valid = await form1.value.validate();
		if (valid) {
			await submitReal(deatailData.value)
			getRealInfoFn()
			redirect({ url: redirectPage.value })
		}
		else {
			uni.showToast({
				title: '请填写必填项',
				icon: 'none'
			});
		}
	}

	onLoad((option) => {
		if (option.page) {
			redirectPage.value = option.page
		}
		getRealInfoFn()
	})
</script>

<style lang="scss" scoped>
	@import '@/addon/tk_vip/utils/styles/common.scss';
</style>