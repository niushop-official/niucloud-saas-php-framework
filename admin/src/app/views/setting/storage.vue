<template>
    <StorageConfig/>
</template>

<script lang="ts" setup>
//平台端与站点端共用同一套多套存储配置页面
import StorageConfig from './components/storage-config.vue'
</script>

<style lang="scss" scoped>
// 全局 el-card 被设为透明，本页需要白底内容区
.box-card {
    --el-card-bg-color: var(--cmp-card-bg, var(--el-bg-color-overlay)) !important;
    background-color: var(--cmp-card-bg, var(--el-bg-color-overlay)) !important;
    border-radius: 8px !important;
}

.storage-type-panel {
    width: 190px;
    flex-shrink: 0;
    padding-right: 12px;
    border-right: 1px solid var(--el-border-color-lighter);
    overflow-y: auto;
}

.storage-type-item {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 8px;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: var(--cmp-control-radius);
    cursor: pointer;
    transition: all .2s;
    background-color: var(--cmp-card-bg, var(--el-bg-color-overlay));

    &:hover {
        border-color: var(--el-color-primary-light-5);
    }

    &.is-active {
        border-color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
    }
}

.storage-type-icon {
    font-size: 20px;
    color: var(--el-color-primary);
}
</style>
