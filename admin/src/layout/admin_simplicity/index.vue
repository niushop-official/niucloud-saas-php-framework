<template>
    <div class="flex w-full h-screen">
        <el-container>
            <!-- 顶部 -->
            <el-header>
                <layout-header></layout-header>
            </el-header>
            <!-- 顶部 end -->
            <el-container :style="{height:'calc(100vh - 64px)'}">
                <!-- 左侧边栏 -->
                <layout-aside></layout-aside>
                <!-- 左侧边栏 end -->
                <!-- 主体 -->
                <el-main class="h-full p-0 bg-page">
                    <el-scrollbar>
                        <div class="p-[15px]">
                            <router-view v-slot="{ Component, route }" v-if="appStore.routeRefreshTag">
                                <keep-alive :include="tabbarStore.tabNames">
                                    <component :is="Component" :key="route.fullPath" />
                                </keep-alive>
                            </router-view>
                        </div>
                    </el-scrollbar>
                </el-main>
                    <!-- 主体 end -->
            </el-container>
        </el-container>
    </div> 
</template>

<script lang="ts" setup>
import layoutHeader from './components/header/index.vue'
import layoutAside from './components/aside/index.vue'
import useAppStore from '@/stores/modules/app'
import useTabbarStore from '@/stores/modules/tabbar'

const appStore = useAppStore()
const tabbarStore = useTabbarStore()
</script>

<style lang="scss" scoped>
:deep(.inter .el-breadcrumb__inner){
    font-weight: inherit !important;
    color: var(--el-text-color-regular) !important;
}
</style>
