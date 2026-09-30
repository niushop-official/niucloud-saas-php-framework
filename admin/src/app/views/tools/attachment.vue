<template>
    <div class="main-container attachment-container">
        <div class="attachment-page">


            <!-- 素材类型 -->
            <el-tabs v-model="type" tab-position="top" class="attachment-tabs">
                <el-tab-pane :label="t(tab)" v-for="(tab, index) in attachmentType" :name="tab" :key="index">
                    <attachment scene="attachment" :type="tab" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import attachment from '@/components/upload-attachment/attachment.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title
const attachmentType: string[] = ['image', 'video', 'icon']
const type = ref(attachmentType[0])

</script>

<style lang="scss">
/**
 * 素材管理页（setting/attachment）
 *
 * 结构：类型页签模块 + 左右素材模块。模块只用边框，不用投影。
 * 页面底色沿用布局底色，尺寸、颜色、圆角、间距统一使用全局 Token（--sys-* / --cmp-*）。
 */
.attachment-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--cmp-header-height) - var(--cmp-tabbar-height) - var(--cmp-layout-content-padding) * 2);
    min-height: 480px;
    overflow: hidden;

    .attachment-page {
        display: flex;
        flex: 1;
        flex-direction: column;
        min-height: 0;
        gap: var(--sys-space-4);
    }

    .attachment-page__header {
        flex: none;
    }

    .attachment-tabs {
        display: flex;
        flex: 1;
        flex-direction: column;
        min-height: 0;

        // 类型页签做成独立模块：白底 + 边框，不用投影
        .el-tabs__header {
            flex: none;
            box-sizing: border-box;
            height: 52px;
            margin: 0 0 var(--sys-space-4);
            padding: 0 var(--sys-space-5);
            background-color: var(--cmp-card-bg);
            border: var(--cmp-module-card-border-width) solid var(--cmp-module-card-border-color);
            border-radius: var(--cmp-module-card-radius);
            box-shadow: none;
        }

        .el-tabs__nav-wrap,
        .el-tabs__nav-scroll,
        .el-tabs__nav {
            height: 100%;
        }

        .el-tabs__nav-wrap {
            margin-bottom: 0;
        }

        .el-tabs__nav-wrap::after {
            display: none;
        }

        // Element Plus 会清掉第一个页签的左内边距、最后一个页签的右内边距。
        // 短下划线按整个页签居中，文字按内容区居中，两边内边距不一致时会错开。
        &.el-tabs--top {
            .el-tabs__item.is-top:nth-child(2),
            .el-tabs__item.is-top:last-child {
                padding-right: var(--sys-space-4);
                padding-left: var(--sys-space-4);
            }
        }

        .el-tabs__item {
            position: relative;
            height: 100%;
            padding: 0 var(--sys-space-4);
            font-size: var(--sys-font-size-base);
            line-height: calc(52px - var(--cmp-module-card-border-width) * 2);
            color: var(--sys-color-text-secondary);

            &:hover {
                color: var(--sys-color-text-primary);
            }

            &.is-active {
                color: var(--sys-color-text-primary);
                font-weight: var(--sys-font-weight-semibold);

                // 选中态使用短下划线，隐藏 Element Plus 默认的整条选中线
                &::after {
                    content: '';
                    position: absolute;
                    bottom: 9px;
                    left: 50%;
                    width: 20px;
                    height: var(--cmp-tabbar-item-indicator-height);
                    border-radius: var(--sys-radius-full);
                    background-color: var(--sys-color-primary);
                    transform: translateX(-50%);
                }
            }
        }

        .el-tabs__active-bar {
            display: none;
        }

        .el-tabs__content {
            display: flex;
            flex: 1;
            flex-direction: column;
            min-height: 0;
            overflow: hidden;

            .el-tab-pane {
                display: flex;
                flex: 1;
                flex-direction: column;
                min-height: 0;

                > * {
                    flex: 1;
                    min-height: 0;
                }
            }
        }
    }
}
</style>
