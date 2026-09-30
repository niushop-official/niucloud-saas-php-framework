<template>
    <!-- 客服图标未读红点：主包组件，各业务分包可引用（勿放在 addon 分包内互引） -->
    <view class="kefu-unread-wrap">
        <slot />
        <text v-if="kefuUnread > 0" class="kefu-unread-badge">{{ kefuUnread > 99 ? '99+' : kefuUnread }}</text>
    </view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useShopCustomerUnread } from '@/hooks/useShopCustomerUnread'

const { kefuUnread, loadKefuUnread } = useShopCustomerUnread()

onMounted(() => {
    loadKefuUnread()
})
</script>

<style lang="scss" scoped>
.kefu-unread-wrap {
    position: relative;
    display: inline-flex;
    line-height: 1;
}
.kefu-unread-badge {
    position: absolute;
    top: -8rpx;
    right: -10rpx;
    min-width: 24rpx;
    height: 24rpx;
    line-height: 24rpx;
    padding: 0 6rpx;
    font-size: 18rpx;
    color: #fff;
    text-align: center;
    background: #FF0000;
    border-radius: 28rpx;
    box-sizing: border-box;
    z-index: 1;
}
</style>
