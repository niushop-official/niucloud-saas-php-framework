<template>
    <view class="min-h-[100vh] bg-[var(--page-bg-color)] overflow-hidden" :style="themeColor()">
        <view class="empty-page">
            <image class="img" :src="img('static/resource/images/empty.png')" mode="aspectFit" />
            <view class="desc">{{ t('pageNotFound') }}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { img } from '@/utils/common'
import { t } from '@/locale'
</script>
