<template>
    <view :style="themeColor()">
        <view class="w-screen h-screen bg-[var(--page-bg-color)] min-h-[100vh]">
            <view class="bg-white p-3">
                <view class="text-[30rpx] font-500 leading-[45rpx]">{{ t('diyForm.detailInformation') }}</view>
                <u-divider text=""></u-divider>
                <!-- 动态渲染表单组件详情 -->
                <diy-form-detail :record_id="recordId" completeLayout="style-1" />
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { t } from '@/locale'
import diyFormDetail from '@/addon/components/diy-form-detail/index.vue'

const recordId = ref(0)
onLoad((data: any) => {
    recordId.value = data.record_id
})
</script>

<style lang="scss" scoped></style>
