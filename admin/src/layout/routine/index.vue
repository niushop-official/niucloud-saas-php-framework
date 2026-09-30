<template>
    <div class="min-w-[1500px]">
        <el-header>
            <layout-header></layout-header>
        </el-header>
        <el-container>
            <layout-aside class="h-[calc(100vh-60px)]"></layout-aside>

            <el-container direction="vertical">
                <!-- 标签栏 -->
                <layout-tab />

                <el-main class="main-wrap h-[calc(100vh-60px)] p-0 bg-page relative">
                    <el-scrollbar>
                        <div class="p-[10px]">
                            <router-view v-slot="{ Component, route }" v-if="appStore.routeRefreshTag ">
                                <keep-alive :include="tabbarStore.tabNames">
                                    <component :is="Component" :key="route.fullPath"/>
                                </keep-alive>
                            </router-view>
                        </div>
                    </el-scrollbar>
                </el-main>
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
:deep(.el-header){
    --el-header-height: 60px !important;
}
</style>
