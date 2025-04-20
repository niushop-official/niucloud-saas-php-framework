<template>
    <view>
        <view class="flex flex-wrap justify-between">
            <template v-if="props.style == 'style1'">
                <view :class="['w-[48%] bg-[#fff] box-border rounded-[12rpx] overflow-hidden', { 'mt-[24rpx]': index > 1 }]" v-for="(item, index) in 6">
                    <u--image width="100%" height="332rpx" src="" model="aspectFill">
                        <template #error>
                            <u-icon name="photo" color="#999" size="50"></u-icon>
                        </template>
                    </u--image>
                    <view class="w-[150rpx] mt-[18rpx] h-[40rpx] bg-color animate">
                    </view>
                    <view class="w-[100%] mt-[10rpx] h-[58rpx] bg-color animate">
                    </view>
                    <view class="w-[100%] mt-[10rpx] h-[60rpx] bg-color animate">
                    </view>
                </view>
            </template>
            <template v-if="props.style == 'style2'">
                <view :class="['bg-white w-full flex p-[20rpx] rounded-[16rpx]', { 'mt-[20rpx]': index > 0 }]" v-for="(item, index) in 6">
                    <u--image class="rounded-[10rpx] overflow-hidden" width="200rpx" height="200rpx" src="" model="aspectFill">
                        <template #error>
                            <u-icon name="photo" color="#999" size="50"></u-icon>
                        </template>
                    </u--image>
                    <view class="ml-[20rpx] flex-1 flex flex-col">
                        <view class="w-[100%] h-[40rpx] bg-color animate mb-[10rpx]"></view>
                        <view class="w-[100%] h-[40rpx] bg-color animate"></view>
                        <view class="w-[100%] mt-auto h-[40rpx] bg-color animate"></view>
                    </view>
                </view>
            </template>
        </view>
        <view class="flex items-center flex-nowrap">
            <template v-if="props.style == 'style3'">
                <view
                    :class="['w-[31%] bg-[#fff] box-border rounded-[12rpx] border-box flex-shrink-0', { 'ml-[24rpx]': index }]"
                    v-for="(item, index) in 3">
                    <u--image width="100%" height="200rpx" src="" model="aspectFill">
                        <template #error>
                            <u-icon name="photo" color="#999" size="30"></u-icon>
                        </template>
                    </u--image>
                    <view class="w-[150rpx] mt-[28rpx] h-[36rpx] bg-color animate">
                    </view>
                    <view class="w-[100%] mt-[28rpx] h-[32rpx] bg-color animate">
                    </view>
                </view>
            </template>
        </view>
    </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
    style: {
        type: String
    }
})
</script>
<style>
.bg-color {
    background: linear-gradient(90deg, #F1F2F4  25%, #e6e6e6 37%, #F1F2F4 50%);
    background-size: 400% 100%;
    border-radius: 3px;
}
@keyframes loading {
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
}
.animate{
    animation: loading 1.8s ease infinite;
}
</style>
