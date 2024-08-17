<template>
	<u-popup :show="show" :round="10" @close="show = false" :closeable="true">
		<view class="mx-[30rpx] pb-[20rpx] pt-[40rpx] border-t">
			<view class="text-base">{{ t('getAvatarNickname') }}</view>
			<view class="text-sm mt-[18rpx] text-gray-400">{{ t('getAvatarNicknameTips') }}</view>
		</view>
		<u-form labelPosition="left" :model="formData" errorType='toast' :rules="rules" ref="formRef" labelWidth="65">
			<view class="mx-[30rpx]">
				<view class="mt-[20rpx]">
					<u-form-item :label="t('headimg')" prop="headimg" :border-bottom="true">
						<button class="m-0 my-[10rpx] p-0 w-[140rpx] h-[140rpx]" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
							<view class="w-full h-full flex items-center justify-center overflow-hidden">
								<u-image :src="img(formData.headimg)" width="140rpx" height="140rpx" v-if="formData.headimg" mode="aspectFill"></u-image>
								<u-icon name="plus" v-else></u-icon>
							</view>
						</button>
					</u-form-item>
					<u-form-item :label=" t('nickname')" prop="nickname" :border-bottom="true">
						<input type="nickname" v-model="formData.nickname" :placeholder="t('nicknamePlaceholder')" @blur="bindNickname">
					</u-form-item>
					<u-form-item :label="t('mobile')" prop="mobile" :border-bottom="true" v-if="isBindMobile">
						<input type="mobile" v-model="formData.mobile" :disabled="true" v-if="formData.mobile">
						<u-button :customStyle="{border:'none',color: 'var(--primary-color)',width:'140rpx', textAlign:'left',margin:'0rpx'}" :text="t('getMobile')" open-type="getPhoneNumber" @getphonenumber="memberStore.bindMobile" v-else></u-button>
					</u-form-item>
				</view>
			</view>
			<view class="p-[30rpx] mt-[20rpx]">
                <button :loading="loading" class="bg-[var(--primary-color)] text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[28rpx]" @click="confirm">{{t('confirm')}}</button>
			</view>
		</u-form>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序隐私协议 -->
		<wx-privacy-popup ref="wxPrivacyPopupRef"></wx-privacy-popup>
		<!-- #endif -->
	</u-popup>
</template>

<script setup lang="ts">
	import { ref, reactive, computed, watch,onMounted,nextTick } from 'vue'
	import { t } from '@/locale'
	import useMemberStore from '@/stores/member'
	import { img } from '@/utils/common'
	import { modifyMember } from '@/app/api/member'
	import { fetchBase64Image } from '@/app/api/system'
	import { useLogin } from '@/hooks/useLogin'

	const show = ref(false)
	const loading = ref(false)
	const memberStore = useMemberStore()
	const info = computed(() => memberStore.info)

	const formData = reactive({
		nickname: '',
		headimg: '',
		mobile: '',
	})

	watch(() => info.value, () => {
		if (info.value) {
			formData.nickname = info.value.nickname
			formData.headimg = info.value.headimg
			formData.mobile = info.value.mobile
		}
	}, { immediate: true })

	const isBindMobile = ref(null)

	const wxPrivacyPopupRef:any = ref(null)

	onMounted(()=>{
		uni.getStorageSync('openid') && (Object.assign(formData, { openid: uni.getStorageSync('openid') }))
    	uni.getStorageSync('pid') && (Object.assign(formData, { pid: uni.getStorageSync('pid') }))
    	uni.getStorageSync('unionid') && (Object.assign(formData, { unionid: uni.getStorageSync('unionid') }))
		isBindMobile.value = uni.getStorageSync('isbindmobile');
		// #ifdef MP
		nextTick(()=>{
			if(wxPrivacyPopupRef.value) wxPrivacyPopupRef.value.proactive();
		})
		// #endif
	})

	const onChooseAvatar = (e) => {
		uni.getFileSystemManager().readFile({
			filePath: e.detail.avatarUrl, //选择图片返回的相对路径
			encoding: 'base64', //编码格式
			success: res => {
				fetchBase64Image({ content: res.data }).then(uploadRes => {
					formData.headimg = uploadRes.data.url
				})
			}
		})
	}

	const bindNickname = (e) => {
		formData.nickname = e.detail.value
	}

	const rules = {
		'headimg': {
			type: 'string',
			required: true,
			message: t('headimgPlaceholder'),
			trigger: ['blur', 'change'],
		},
		'nickname': {
			type: 'string',
			required: true,
			message: t('nicknamePlaceholder'),
			trigger: ['blur', 'change'],
		},
		'mobile': {
			type: 'string',
			required: isBindMobile.value ? true : false,
			message: t('mobileTips'),
			trigger: ['blur', 'change'],
		}
	}

	const formRef: any = ref(null)

	const confirm = async () => {
		formRef.value.validate().then(async() => {
			if (loading.value) return
			loading.value = true

			// 修改头像
			await modifyMember({ field: 'headimg', value: formData.headimg }).then(() => {
				memberStore.info.headimg = formData.headimg
			}).catch(() => {
				loading.value = false
			})
			if (!loading.value) return

			// 修改昵称
			modifyMember({ field: 'nickname', value: formData.nickname }).then(() => {
				memberStore.info.nickname = formData.nickname
				loading.value = false
				show.value = false
			}).catch(() => {
				loading.value = false
			})
			// #ifdef MP-WEIXIN
			const login = useLogin()
			if (info.value && !info.value.weapp_openid) {
				login.getAuthCode({ updateFlag: true }) // 更新oppenid
			}
			// #endif

		})
	}

	defineExpose({
		show
	})
</script>

<style lang="scss" scoped></style>
