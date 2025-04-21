<template>
    <view @touchmove.prevent.stop>
        <u-popup :show="formDetailPrivacyPop" @close="closeFn" zIndex="500" mode="center" :round="8">
            <view class="w-[570rpx]  popup-common center">
                <view class="text-center my-5">{{ t('diyForm.tips') }}<br />{{ data }}</view>
                <view class="flex justify-between">
                    <button class="w-[50%] h-[100rpx] rounded-[0rpx] leading-[100rpx] !bg-[transform] border-solid border-[0] border-t-[2rpx] border-[#e6e6e6] !text-[#333]" @click="call"> {{ t('diyForm.call') }}</button>
                    <button class="w-[50%] h-[100rpx] rounded-[0rpx] border-solid border-[0] border-t-[2rpx]  border-l-[2rpx] bo border-[#e6e6e6] leading-[100rpx] !bg-[transform] !text-[var(--primary-color)]" @click="closeFn">{{ t('diyForm.know') }}</button>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { t } from '@/locale'

const props = defineProps(['data']);

const data = computed(() => {
    let str = props.data || '已开启隐私保护，提交后会部分打码，只有你自己和管理员才能查看完整信息';
    return str;
})

const formDetailPrivacyPop = ref(false);
const open = () => {
    formDetailPrivacyPop.value = true
}
const closeFn = () => {
    formDetailPrivacyPop.value = false
}
const call = () => {
    uni.makePhoneCall({
        phoneNumber: props.data
    });

}

defineExpose({
    open
})
</script>

<style lang="scss" scoped>
@import '@/styles/diy_form.scss';
</style>
