<template>
    <view @touchmove.prevent.stop>
        <u-popup :show="formPrivacyPop" @close="closeFn" zIndex="500" mode="center" :round="8">
            <view class="flex flex-col items-center w-[640rpx] pt-[50rpx]">
                <view class="text-[32rpx] font-bold">{{ t('diyForm.prompt') }}</view>
                <view class="text-center px-[40rpx] py-[30rpx] leading-[1.5] min-h-[90rpx]">{{ data }}</view>
                <view class="flex items-center justify-center border-solid border-[0] border-t-[2rpx] border-[#e6e6e6] w-[100%] h-[90rpx] text-[28rpx]">
                    <text @click="closeFn">{{ t('diyForm.know') }}</text>
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

const formPrivacyPop = ref(false);
const open = () => {
    formPrivacyPop.value = true
}
const closeFn = () => {
    formPrivacyPop.value = false
}

defineExpose({
    open
})
</script>

<style lang="scss" scoped>
@import '@/styles/diy_form.scss';
</style>
