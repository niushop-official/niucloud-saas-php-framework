<template>
    <uni-popup ref="givePopup" type="center" :is-mask-click="false">
        <view class="bg-[#fff] w-[630rpx] min-h-[668rpx] rounded-[var(--rounded-big)] box-border p-[30rpx] relative">
            <view class="nc-iconfont nc-icon-guanbiV6xx absolute top-0 right-0 text-[30rpx] p-[30rpx]" @click="value = false"></view>
            <view class="text-[36rpx] leading-[50rpx] font-500 text-center mb-[60rpx] mt-[30rpx]">{{ t('giveSetUp') }}</view>
            <u-form labelPosition="left" :labelWidth="'136rpx'" :labelStyle="{'font-size':'28rpx','font-weight':'400','line-height':'39rpx'}" :model="formData" errorType='toast' :rules="rules" ref="formRef">
                <view class="h-[88rpx] flex w-full items-center px-[var(--pad-sidebar-m)] rounded-[var(--rounded-small)] box-border border-[2rpx] border-solid border-[#eee]">
                    <u-form-item :label="t('giveNum')" prop="give_num" :border-bottom="false">
                        <u-input v-model.trim="formData.give_num" type="number" border="none" maxlength="8"
                                 :placeholder="t('giveNumPlaceholder')" autocomplete="off" class="!bg-transparent" fontSize="24rpx" inputAlign="right"
                                 placeholderClass="!text-[var(--text-color-light9)] text-[24rpx]" @blur="giveNumBlur" />
                    </u-form-item>
                    <view class="text-[28rpx] font-500 ml-[16rpx]">{{ t('unit') }}</view>
                </view>
                <view class="!text-[var(--text-color-light6)] text-[24rpx] leading-[34rpx] font-400 mt-[10rpx] px-[var(--pad-sidebar-m)]">
                    <text>{{ t('tipsAnd') }}</text>
                    <text class="text-[var(--primary-color)]">{{ maxNum }}</text>
                    <text>{{ t('tipsEnd') }}</text>
                </view>
                <view class="mt-[30rpx] h-[88rpx] flex w-full items-center px-[var(--pad-sidebar-m)] rounded-[var(--rounded-small)] box-border border-[2rpx] border-solid border-[#eee]">
                    <u-form-item :label="t('limitNum')" prop="limit_num" :border-bottom="false">
                        <u-input v-model.trim="formData.limit_num" type="number" border="none" maxlength="8"
                                 :placeholder="t('limitNumPlaceholder')" autocomplete="off" class="!bg-transparent" fontSize="24rpx" inputAlign="right"
                                 placeholderClass="!text-[var(--text-color-light9)] text-[24rpx]" @blur="limitNumBlur" />
                    </u-form-item>
                    <view class="text-[28rpx] font-500 ml-[16rpx]">{{ t('unit') }}</view>
                </view>
            </u-form>
            <view class="px-[30rpx] mt-[100rpx]">
                <view class="h-[88rpx] leading-[88rpx] text-center text-[#fff] rounded-[44rpx] primary-btn-bg text-[28rpx]" @click="save">{{ t('giveSave') }}</view>
            </view>
        </view>
    </uni-popup>
</template>

<script lang="ts" setup>
import { redirect, img } from '@/utils/common';
import { ref, watch, computed } from 'vue';
import { t } from '@/locale';

const givePopup = ref()
const formData = ref({
    give_num: '',
    limit_num: ''
})
const prop = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    maxNum: {
        type: Number,
        default: 0
    }
})
const emit = defineEmits(['update:modelValue', 'success'])
const value = computed({
    get() {
        return prop.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
const maxNum = computed(() => {
    return prop.maxNum
})
watch(() => value.value, (newValue) => {
    if (newValue) {
        givePopup.value.open()
        formData.value = {
            give_num: '',
            limit_num: ''
        }
    } else {
        givePopup.value.close()
    }
})
const rules = computed(() => {
    return {
        'give_num': {
            type: 'string',
            required: true,
            message: t('giveNumPlaceholderOne'),
            trigger: ['blur', 'change'],
        },
        'limit_num': {
            type: 'string',
            required: true,
            message: t('limitNumPlaceholder'),
            trigger: ['blur', 'change']
        },
    }
})
const giveNumBlur = () => {
    if (formData.value.give_num === '' || formData.value.give_num === null) return
    if (parseInt(formData.value.give_num) < 1) formData.value.give_num = 1
    if (parseInt(formData.value.give_num) > maxNum.value) formData.value.give_num = parseInt(maxNum.value)
    formData.value.give_num = parseInt(formData.value.give_num) + ''
}
const limitNumBlur = () => {
    if (formData.value.limit_num === '' || formData.value.limit_num === null) return
    if (parseInt(formData.value.limit_num) < 1) formData.value.limit_num = 1
    if (parseInt(formData.value.limit_num) > maxNum.value) formData.value.limit_num = parseInt(maxNum.value)
    formData.value.limit_num = parseInt(formData.value.limit_num) + ''
}
const formRef: any = ref(null)
const save = () => {
    formRef.value.validate().then(() => {
        if (parseInt(formData.value.limit_num) > parseInt(formData.value.give_num)) {
            uni.showToast({ title: '每人最多可领数量不可大于本次赠送数量', icon: 'none' })
            return
        }
        emit('success', formData.value)
    })
}
</script>
<style lang="scss" scoped>
</style>
