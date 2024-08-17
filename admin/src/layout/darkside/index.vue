<template>
    <div class="flex w-full h-screen">
        <!-- 左侧边栏 -->
        <layout-aside></layout-aside>
        <!-- 左侧边栏 end -->

        <el-container>
            <!-- 顶部 -->
            <el-header>
                <layout-header></layout-header>
            </el-header>
            <!-- 顶部 end -->

            <layout-tab />

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
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import layoutHeader from './components/header/index.vue'
import layoutAside from './components/aside/index.vue'
import layoutTab from './components/tabs.vue'
import useAppStore from '@/stores/modules/app'
import useTabbarStore from '@/stores/modules/tabbar'
import useSystemStore from '@/stores/modules/system'

const appStore = useAppStore()
const tabbarStore = useTabbarStore()
const systemStore = useSystemStore()
const dark = computed(() => {
    return systemStore.dark
})
</script>

<style lang="scss" scoped></style>
