<template>
    <div class="layout-lightside flex flex-col w-full h-screen">
        <!-- 顶部菜单栏：左右通栏，logo 位于顶栏左侧 -->
        <el-header class="layout-lightside__header-wrap">
            <layout-header />
        </el-header>
        <!-- 顶部 end -->

        <!-- 左侧菜单与内容区左右同屏 -->
        <div class="layout-lightside__body flex flex-1 min-h-0">
            <!-- 左侧双栏菜单 -->
            <layout-aside />

            <el-container direction="vertical" class="min-w-0">
                <!-- 标签栏 -->
                <layout-tab />

                <!-- 主体 -->
                <el-main class="layout-lightside__main h-full p-0">
                    <el-scrollbar>
                        <div class="layout-lightside__content">
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
        </div>
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
.layout-lightside__header-wrap {
    --el-header-height: var(--cmp-lightside-header-height);
    height: var(--cmp-lightside-header-height);
    padding: 0;
}

.layout-lightside__body {
    min-height: 0;
    overflow: hidden;
}

.layout-lightside__main {
    min-height: 0;
    background-color: var(--cmp-layout-page-bg);
}

.layout-lightside__content {
    padding: var(--cmp-layout-content-padding);
}

// 面包屑：仅最后一级（当前页）为深色，其余层级为灰色
:deep(.inter .el-breadcrumb__inner) {
    font-weight: inherit !important;
    color: var(--cmp-lightside-breadcrumb-text) !important;
}

:deep(.inter:last-child .el-breadcrumb__inner) {
    color: var(--cmp-lightside-breadcrumb-active-text) !important;
}
</style>
