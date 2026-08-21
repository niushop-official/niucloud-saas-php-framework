<template>
    <view
        v-if="toast.visible && pageActive"
        class="ns-toast"
        :class="{ 'ns-toast--mask': toast.mask }"
        @touchmove.stop.prevent
    >
        <view class="ns-toast__box">
            <text class="ns-toast__text">{{ toast.title }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { onShow, onHide } from '@dcloudio/uni-app'
import useToastStore from '@/stores/toast'

const toast = useToastStore()
const pageActive = ref(true)
let timer: ReturnType<typeof setTimeout> | null = null

const clearTimer = () => {
    if (timer) {
        clearTimeout(timer)
        timer = null
    }
}

const scheduleHide = () => {
    clearTimer()
    if (!toast.visible || !pageActive.value) return
    timer = setTimeout(() => {
        toast.hide()
        timer = null
    }, toast.duration || 2000)
}

watch(
    () => [toast.visible, toast.title, toast.duration, pageActive.value] as const,
    ([visible, , , active]) => {
        if (visible && active) scheduleHide()
        else if (!visible) clearTimer()
    }
)

onShow(() => {
    pageActive.value = true
})

onHide(() => {
    pageActive.value = false
    clearTimer()
    // 跳页后不残留
    if (toast.visible) toast.hide()
})

onMounted(() => {
    toast.registerHost()
})

onUnmounted(() => {
    clearTimer()
    toast.unregisterHost()
})
</script>

<style lang="scss" scoped>
.ns-toast {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;

    &--mask {
        pointer-events: auto;
        background: rgba(0, 0, 0, 0.15);
    }

    &__box {
        pointer-events: auto;
        max-width: 80%;
        max-height: 60vh;
        padding: 24rpx 32rpx;
        border-radius: 16rpx;
        background: rgba(0, 0, 0, 0.75);
        overflow-y: auto;
        box-sizing: border-box;
    }

    &__text {
        display: block;
        font-size: 26rpx;
        line-height: 1.5;
        color: #fff;
        text-align: center;
        white-space: pre-wrap;
        word-break: break-all;
    }
}
</style>
