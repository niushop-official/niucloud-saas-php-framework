<template>
    <div class="main-container" v-loading="loading">
        <div class="flex justify-between items-center mb-3">
            <span class="text-page-title">{{ pageName }}</span>
        </div>

        <div class="app-grid">
            <div class="app-card" @click="schemaCache()">
                <div class="app-card-head">
                    <div class="app-card-info">
                        <div class="app-card-name">{{ t('dataCache') }}</div>
                    </div>
                </div>
                <p class="app-card-desc">{{ t('dataCacheDesc') }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import { clearCache } from '@/app/api/sys'
import { ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router'

const loading = ref<Boolean>(false)
const route = useRoute()
const pageName = route.meta.title

// 数据缓存
const schemaCache = () => {
    ElMessageBox.confirm(t('clearCacheTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        loading.value = true
        clearCache({}).then(res => {
            loading.value = false
        }).catch(() => {
            loading.value = false
        })
    })
}

</script>

<style lang="scss" scoped>
.app-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(264px, 1fr));
    gap: var(--cmp-module-card-gap);
}

/* 可点击模块卡片：与站点应用页共用同一套 Token */
.app-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--cmp-module-card-gap);
    overflow: hidden;
    padding: var(--cmp-module-card-padding);
    background-color: var(--cmp-module-card-bg);
    border: var(--cmp-module-card-border-width) solid var(--cmp-module-card-border-color);
    border-radius: var(--cmp-module-card-radius);
    color: var(--cmp-module-card-text);
    cursor: pointer;
    transition: border-color .2s, box-shadow .2s, transform .2s;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: var(--cmp-module-card-accent-height);
        background: linear-gradient(90deg, var(--cmp-module-card-accent-start), var(--cmp-module-card-accent-end));
        opacity: 0;
        transition: opacity .3s;
    }

    &:hover {
        border-color: var(--cmp-module-card-hover-border-color);
        box-shadow: var(--cmp-module-card-hover-shadow);
        transform: translateY(var(--cmp-module-card-hover-offset));

        &::before {
            opacity: 1;
        }
    }
}

.app-card-head {
    display: flex;
    align-items: center;
    gap: var(--space-3);
}

.app-card-info {
    flex: 1;
    min-width: 0;
}

.app-card-name {
    overflow: hidden;
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-md);
    font-weight: var(--sys-font-weight-semibold);
    text-overflow: ellipsis;
    white-space: nowrap;
}

.app-card-desc {
    overflow: hidden;
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
}
.text-page-title{
    font-weight: var(--sys-font-weight-semibold);
}
</style>
