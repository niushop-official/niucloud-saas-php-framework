<template>
    <div v-if="visible" class="tip-notice">
        <span class="tip-notice__icon">
            <svg class="tip-notice__glyph" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" />
                <path d="M12 11v5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                <circle cx="12" cy="7.6" r="1.1" fill="currentColor" />
            </svg>
        </span>

        <div class="tip-notice__body">
            <div class="tip-notice__title">{{ title }}</div>
            <div class="tip-notice__text">
                <slot></slot>
            </div>
        </div>

        <span v-if="closable" class="tip-notice__close" title="关闭" @click="close">
            <svg class="tip-notice__close-glyph" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
        </span>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
    /** 提示标题，默认「温馨提示」 */
    title?: string
    /** 是否保留关闭按钮：仅原提示本身带关闭功能时开启 */
    closable?: boolean
}

withDefaults(defineProps<Props>(), {
    title: '温馨提示',
    closable: false
})

/** 关闭仅作用于当前渲染，刷新页面后恢复，与 Element Plus el-alert 行为一致 */
const visible = ref(true)

const close = () => {
    visible.value = false
}
</script>

<style lang="scss" scoped>
.tip-notice {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    gap: var(--cmp-tip-gap);
    padding: var(--cmp-tip-padding);
    background-color: var(--cmp-tip-bg);
    border: var(--border-width) solid var(--cmp-tip-border);
    border-radius: var(--cmp-tip-radius);
}

.tip-notice__icon {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: var(--cmp-tip-icon-size);
    height: var(--cmp-tip-icon-size);
    color: var(--cmp-tip-icon-text);
    background-color: var(--cmp-tip-icon-bg);
    border-radius: var(--sys-radius-full);
}

.tip-notice__glyph {
    width: var(--cmp-tip-glyph-size);
    height: var(--cmp-tip-glyph-size);
}

.tip-notice__body {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: var(--cmp-tip-body-gap);
    min-width: 0;
}

.tip-notice__title {
    color: var(--cmp-tip-title-text);
    font-size: var(--cmp-tip-title-font-size);
    font-weight: var(--cmp-tip-title-font-weight);
    line-height: var(--cmp-tip-title-line-height);
}

.tip-notice__text {
    color: var(--cmp-tip-text);
    font-size: var(--cmp-tip-text-font-size);
    line-height: var(--cmp-tip-text-line-height);

    // 插槽内的多段说明文字保持零外边距，段间距由组件统一控制
    :deep(p) {
        margin: 0;

        & + p {
            margin-top: var(--cmp-tip-paragraph-gap);
        }
    }
}

.tip-notice__close {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: var(--cmp-tip-close-size);
    height: var(--cmp-tip-close-size);
    color: var(--cmp-tip-close-text);
    cursor: pointer;
    user-select: none;

    &:hover {
        color: var(--cmp-tip-close-hover-text);
    }
}

.tip-notice__close-glyph {
    width: 100%;
    height: 100%;
}
</style>
