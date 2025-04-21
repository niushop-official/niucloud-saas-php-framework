<template>
    <view class="card-template mt-[var(--top-m)]" v-if="items.list && items.list.length>0">
        <view class="flex justify-between items-center" @click="toLink">
            <view class="text-[30rpx]">
                <text>种草秀</text>
                <text class="ml-[6rpx] text-[24rpx] text-[var(--text-color-light9)]" v-if="items.count">
                    ({{ items.count }})
                </text>
            </view>
            <text class="nc-iconfont nc-icon-youV6xx text-[26rpx] text-[var(--text-color-light6)] ml-[8rpx]"></text>
        </view>

        <view class="grid grid-cols-3 gap-2 mt-[20rpx]">
            <view class="w-[210rpx] h-[210rpx]" v-for="(item, index) in items.list" :key="index" @click="handleClick(item)">
                <image :src="img(item.content_cover)" mode="aspectFill" class="w-[210rpx] h-[210rpx] rounded-[20rpx]" />
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { img, redirect } from '@/utils/common';

const props = defineProps({
    items: {
        type: Object,
        required: true,
        default: () => ({}),
    }
});

const treasureId = ref(null);

function extractTreasureId(url) {
    const match = url.match(/treasure_id=(\d+)/);
    return match ? match[1] : null;
}

onMounted(() => {
    if (props.items && props.items.url) {
        treasureId.value = extractTreasureId(props.items.url);
    }
});

const toLink = () => {
    redirect({ url: '/addon/sow_community/pages/sow_show', param: { treasure_id: treasureId.value } })
}

const handleClick = (item: any) => {
    if (item.content_type == 1) {
        redirect({ url: '/addon/sow_community/pages/image/detail', param: { content_id: item.content_id } })
    } else {
        redirect({ url: '/addon/sow_community/pages/video/detail', param: { content_id: item.content_id } })
    }
}
</script>

<style lang="scss" scoped>

</style>
