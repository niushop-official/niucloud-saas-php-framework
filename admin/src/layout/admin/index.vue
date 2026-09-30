<template>
    <div class="layout-admin flex w-full h-screen">
        <el-container>
            <!-- 顶部 -->
            <el-header>
                <layout-header></layout-header>
            </el-header>
            <!-- 顶部 end -->
            <el-container class="layout-admin__body">
                <!-- 左侧边栏 -->
                <layout-aside></layout-aside>
                <!-- 左侧边栏 end -->

                <el-container direction="vertical">
                    <!-- 标签栏 -->
                    <layout-tab />

                    <!-- 主体 -->
                    <el-main class="layout-admin__main h-full p-0">
                        <el-scrollbar>
                            <div class="layout-admin__content">
                                <router-view v-slot="{ Component, route }" v-if="appStore.routeRefreshTag">
                                    <keep-alive :include="tabbarStore.tabNames" :max="15">
                                        <component :is="Component" :key="route.fullPath" />
                                    </keep-alive>
                                </router-view>
                            </div>
                        </el-scrollbar>
                    </el-main>
                    <!-- 主体 end -->
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import layoutHeader from './components/header/index.vue'
import layoutAside from './components/aside/index.vue'
import layoutTab from './components/tabs.vue'
import useAppStore from '@/stores/modules/app'
import useTabbarStore from '@/stores/modules/tabbar'

const appStore = useAppStore()
const tabbarStore = useTabbarStore()
</script>

<style lang="scss" scoped>
.layout-admin {
    --cmp-header-height: 50px;
    --cmp-header-border: var(--sys-color-border-default);
    --cmp-admin-primary-hover-bg: var(--sys-color-fill-light);
    --cmp-admin-primary-hover-text: var(--sys-color-primary);
    --cmp-admin-primary-active-bg: var(--sys-color-primary);
    --cmp-admin-primary-active-text: var(--sys-color-text-on-primary);
    --cmp-admin-secondary-item-height: 42px;
    --cmp-admin-secondary-hover-bg: var(--sys-color-fill-light);
    --cmp-admin-secondary-active-bg: var(--sys-color-primary-soft);
    --cmp-admin-secondary-active-text: var(--sys-color-primary);
    --cmp-admin-secondary-text: var(--sys-color-text-primary);
    --cmp-admin-primary-width: 80px;
    --cmp-admin-primary-expanded-width: 110px;
    --cmp-admin-header-padding-inline: 10px;
    --cmp-admin-control-height: 30px;
    --cmp-admin-control-bg: var(--sys-color-fill-light);
    --cmp-admin-control-hover-bg: var(--sys-color-fill-default);
    --cmp-admin-control-padding-inline: 12px;
    --cmp-admin-control-radius: 4px;
    --cmp-admin-header-search-width: 175px;
    --cmp-admin-header-search-radius: 4px;
    --cmp-admin-action-size: 36px;
    --cmp-admin-action-radius: var(--sys-radius-md);
    --cmp-admin-breadcrumb-text: var(--sys-color-text-secondary);
    --cmp-admin-breadcrumb-active-text: var(--sys-color-text-primary);
}

.layout-admin__body {
    height: calc(100vh - var(--cmp-header-height));
}

:deep(.el-header) {
    --el-header-height: var(--cmp-header-height);
    height: var(--cmp-header-height);
    padding: 0;
}

.layout-admin__main {
    background-color: var(--cmp-layout-page-bg);
}

.layout-admin__content {
    padding: var(--cmp-layout-content-padding);
}

:deep(.inter .el-breadcrumb__inner) {
    font-weight: inherit !important;
    color: var(--cmp-admin-breadcrumb-text) !important;
}

:deep(.inter:last-child .el-breadcrumb__inner) {
    color: var(--cmp-admin-breadcrumb-active-text) !important;
}
</style>
