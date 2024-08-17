<template>
    <view class="min-h-[100vh] bg-[var(--page-bg-color)] overflow-hidden" :style="themeColor()">
        <view class="empty-page">
            <image class="img" :src="img('static/resource/images/site/close.png')" model="aspectFit" />
            <view class="desc">{{t('noSite')}}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
    import { watch } from 'vue'
    import { img, redirect } from '@/utils/common'
    import { t } from '@/locale'
    import useSystemStore from '@/stores/system'

    const systemStore = useSystemStore()

    watch(
        () => systemStore.site,
        (newValue, oldValue) => {
            if (newValue && newValue.status == 1) {
                redirect({ url: '/app/pages/index/index', mode: 'reLaunch' })
            }
        })
</script>

<style lang="scss" scoped></style>