<template>
    <view  class="w-screen h-screen bg-[var(--page-bg-color)] overflow-hidden" :style="themeColor()">
        <scroll-view scroll-y="true" >
            <view class="sidebar-margin card-template top-mar account pb-[20rpx]">
                <block v-if="formData.account_type == 'bank'">
                    <view class="text-center text-[32rpx] font-500 mt-[10rpx] text-[#333] leading-[42rpx]">{{ formData.account_id ? t('editBankCard') : t('addBankCard') }}</view>
                    <view class="text-center text-[24rpx] mt-[16rpx] text-[var(--text-color-light9)]">{{ formData.account_id ? t('editBankCardTips') : t('addBankCardTips') }}</view>
                    <view class="mt-[70rpx] px-[10rpx]">
                        <u-form labelPosition="left" :model="formData" errorType='toast' :rules="rules" ref="formRef">
                            <view>
                                <u-form-item :label="t('bankRealname')" prop="realname" labelWidth="200rpx">
                                    <u-input v-model.trim="formData.realname" fontSize="28rpx" maxlength="30" border="none" clearable :placeholder="t('bankRealnamePlaceholder')"/>
                                </u-form-item>
                            </view>
                            <view class="mt-[16rpx]">
                                <u-form-item :label="t('bankName')" prop="bank_name" labelWidth="200rpx">
                                    <u-input v-model.trim="formData.bank_name" fontSize="28rpx" maxlength="30" border="none" clearable :placeholder="t('bankNamePlaceholder')"/>
                                </u-form-item>
                            </view>
                            <view class="mt-[16rpx]">
                                <u-form-item :label="t('bankAccountNo')" prop="account_no" labelWidth="200rpx">
                                    <u-input v-model.trim="formData.account_no" fontSize="28rpx" maxlength="30" border="none" clearable :placeholder="t('bankAccountNoPlaceholder')"/>
                                </u-form-item>
                            </view>
                        </u-form>
                    </view>
                </block>

                <block v-if="formData.account_type == 'alipay'">
                    <view class="text-center text-[32rpx] font-500 mt-[20rpx] text-[#333] leading-[42rpx]">{{ formData.account_id ? t('editAlipayAccount') : t('addAlipayAccount') }}</view>
                    <view class="text-center text-[28rpx] mt-[16rpx] text-[var(--text-color-light9)] leading-[36rpx]">{{ formData.account_id ? t('editAlipayAccountTips') : t('addAlipayAccountTips') }}</view>

                    <view class="mt-[70rpx] px-[10rpx]">
                        <u-form labelPosition="left" :model="formData"  labelWidth="200rpx" errorType='toast' :rules="rules" ref="formRef">
                            <view>
                                <u-form-item :label="t('alipayRealname')" prop="realname">
                                    <u-input v-model.trim="formData.realname" maxlength="30" border="none" fontSize="28rpx" clearable :placeholder="t('alipayRealnamePlaceholder')"/>
                                </u-form-item>
                            </view>
                            <view class="mt-[16rpx]">
                                <u-form-item :label="t('alipayAccountNo')" prop="account_no">
                                    <u-input v-model.trim="formData.account_no" border="none" maxlength="30" fontSize="28rpx" clearable :placeholder="t('alipayAccountNoPlaceholder')"/>
                                </u-form-item>
                            </view>
                        </u-form>
                    </view>
                </block>
            </view>
			<view class="common-tab-bar-placeholder"></view>
			<view class="common-tab-bar fixed left-[var(--sidebar-m)] right-[var(--sidebar-m)] bottom-[0]">
				<button :loading="loading" class="primary-btn-bg text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[26rpx] font-500" @click="handleSave">{{t('save')}}</button>
			</view>
        </scroll-view>

        <u-modal :show="deleteConfirm" :content="t('deleteConfirm')" :confirmText="t('confirm')" :cancelText="t('cancel')" :showCancelButton="true" @confirm="handleDelete" @cancel="deleteConfirm = false" confirmColor="var(--primary-color)"></u-modal>
    </view>
</template>

<script setup lang="ts">
    import { ref, computed, reactive } from 'vue'
    import { onLoad } from '@dcloudio/uni-app'
    import { getCashoutAccountInfo, addCashoutAccount, editCashoutAccount, deleteCashoutAccount } from '@/app/api/member'
    import { t } from '@/locale'
    import { redirect } from '@/utils/common'

    const loading = ref(false)
    const formRef: any = ref(null)
    const mode = ref('get')
    const deleteConfirm = ref(false)
    const formData = reactive<AnyObject>({
        account_id: 0,
        account_type: 'bank',
        bank_name: '',
        realname: '',
        account_no: ''
    })

    const rules = computed(() => {
        return {
            'realname': {
                type: 'string',
                required: true,
                message: formData.account_type == 'bank' ? t('bankRealnamePlaceholder') : t('alipayRealnamePlaceholder'),
                trigger: ['blur', 'change'],
            },
            'bank_name': {
                type: 'string',
                required: formData.account_type == 'bank',
                message: t('bankNamePlaceholder'),
                trigger: ['blur', 'change'],
            },
            'account_no': {
                type: 'string',
                required: true,
                message: formData.account_type == 'bank' ? t('bankAccountNoPlaceholder') : t('alipayAccountNoPlaceholder'),
                trigger: ['blur', 'change'],
            }
        }
    })

    onLoad((data: any) => {
        data.type && (formData.account_type = data.type)
        data.mode && (mode.value = data.mode)
        if (data.id) {
            formData.account_id = data.id||''
			if(formData.account_id){
				uni.setNavigationBarTitle({
				    title:t('editAccountTitle')
				})
			}else{
				uni.setNavigationBarTitle({
				    title: t('addAccountTitle')
				})
			}

            getCashoutAccountInfo({ account_id: data.id }).then((res : any) => {
                if (res.data) {
                    Object.keys(formData).forEach((key : string) => {
                        if (res.data[key] != undefined) formData[key] = res.data[key]
                    })
                }
            })
        }
    })

    const handleSave = () => {
        const save = formData.account_id ? editCashoutAccount : addCashoutAccount

        formRef.value.validate().then(() => {
            if (loading.value) return
            loading.value = true

            save(formData).then((res) => {
                if (mode.value == 'get') redirect({ url: '/app/pages/member/account', param: { type: formData.account_type, mode: mode.value } })
                else redirect({ url: '/app/pages/member/apply_cash_out', param: { account_id: formData.account_id ? formData.account_id : res.data.id, type: formData.account_type } , mode: 'redirectTo'})
            }).catch(() => {
                loading.value = false
            })
        })
    }

    const handleDelete = () => {
        deleteCashoutAccount(formData.account_id).then(() => {
            redirect({ url: '/app/pages/member/account', mode: 'redirectTo' })
        })
    }
</script>

<style lang="scss" scoped>
:deep(.account .u-form-item .u-form-item__body){
    padding: 20rpx 0;
}
.account :deep(.u-form-item__body__left__content__label){
		font-size: 28rpx !important;
		color:#333;
	}
</style>
