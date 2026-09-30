<template>
    <!-- 客服快捷浮窗：圆形头像 + 主题色描边 + 底标「客服」+ 粗环发散；固定右侧中部，可上下左右偏移 -->
    <view
        class="float-btn-customer middleRight"
        :class="[diyStore.mode == 'decorate' ? 'is-decorate' : '']"
        :style="wrapCss"
    >
        <view
            v-for="(item, index) in list"
            :key="index"
            class="fc-btn"
            :class="{ 'mb-[20rpx]': list.length != index + 1 }"
            :style="btnSizeCss"
            @click="diyStore.toRedirect(item.link)"
        >
            <view class="fc-ripple" :style="btnSizeCss"></view>
            <view class="fc-ripple fc-ripple--delay" :style="btnSizeCss"></view>

            <view class="fc-avatar" :style="btnSizeCss">
                <image
                    class="fc-avatar__img"
                    :src="item.imageUrl ? img(item.imageUrl) : img('static/resource/images/diy/kefu_default.png')"
                    mode="aspectFill"
                />
                <view class="fc-label">客服</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useDiyStore from '@/app/stores/diy'
import { img } from '@/utils/common'

const props = defineProps(['component', 'index'])

const diyStore = useDiyStore()

const diyComponent = computed(() => {
    if (diyStore.mode == 'decorate') {
        return diyStore.value[props.index]
    }
    return props.component
})

const list = computed(() => diyComponent.value?.list || [])

const btnSizeCss = computed(() => {
    const size = (diyComponent.value?.imageSize || 40) * 2
    return `width:${ size }rpx;height:${ size }rpx;`
})

/** 基准：右侧垂直居中（靠 .middleRight 的 top:50% + 这里的 translateY(-50%) 组合实现）；
 *  offset 正数上移、负数下移；lateralOffset 正数向左内收 */
const wrapCss = computed(() => {
    const offset = Number(diyComponent.value?.offset) || 0
    const lateral = Number(diyComponent.value?.lateralOffset) || 0
    // 先 -50% 垂直居中，再叠加上下偏移（分写两段 translateY，兼容小程序）
    let transform = `translateY(-50%)`
    if (offset) transform += ` translateY(${ (-offset) * 2 }rpx)`
    if (lateral) transform += ` translateX(${ (-lateral) * 2 }rpx)`
    return `transform:${ transform };`
})
</script>

<style lang="scss" scoped>
.float-btn-customer {
    /* 固定右侧中部（装修黄框区域）
       注意：position 必须在这里显式声明，不能依赖 Windi 的 fixed 类，
       否则在装修画布 / 分构建产物中可能丢失定位而退回文档流 */
    position: fixed;
    z-index: 1000;

    &.middleRight {
        top: 50%;
        right: 0;
        left: auto;
        bottom: auto;
    }

    &.is-decorate {
        outline: 4rpx dashed var(--primary-color);
        outline-offset: 8rpx;
    }
}

.z-1000 {
    z-index: 1000;
}

.fc-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 28rpx;
}

.fc-ripple {
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    border: 8rpx solid var(--primary-color);
    box-sizing: border-box;
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
    pointer-events: none;
    animation: fc-pulse 2s ease-out infinite;
}

.fc-ripple--delay {
    animation-delay: 1s;
}

.fc-avatar {
    position: relative;
    z-index: 1;
    overflow: hidden;
    border-radius: 50%;
    border: 4rpx solid var(--primary-color);
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, 0.1);
}

.fc-avatar__img {
    display: block;
    width: 100%;
    height: 100%;
}

.fc-label {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-color);
    color: #fff;
    font-size: 14rpx;
    line-height: 1;
    font-weight: 500;
}

@keyframes fc-pulse {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.55;
    }

    70% {
        opacity: 0.12;
    }

    100% {
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 0;
    }
}
</style>
