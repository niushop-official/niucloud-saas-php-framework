<template>
    <el-container class="w-[200px] h-screen flex flex-col">
        <el-header class="logo-wrap flex items-center justify-center h-[64px]">
            <div class="logo flex items-center m-auto h-[64px]" v-if="!systemStore.menuIsCollapse">
                <el-image style="width: 40px; height: 40px" :src="img(logoUrl)" fit="contain">
                    <template #error>
                        <div class="flex justify-center items-center w-full h-[40px]"><img class="max-w-[40px]" src="@/app/assets/images/icon-addon.png" alt=""  object-fit="contain"></div>
                    </template>
                </el-image>
            </div>
            <div class="logo flex items-center justify-center h-[64px]" v-else>
                <i class="text-3xl iconfont iconyunkongjian"></i>
            </div>
        </el-header>
        <el-main class="menu-wrap">
            <el-scrollbar>
                <el-menu :default-active="route.name" :router="true" background-color="--side-dark-color" text-color="#fff" active-text-color="#fff" :unique-opened="true" :collapse="systemStore.menuIsCollapse" >
                    <menu-item v-for="(route, index) in menuData" :routes="route" :key="index" />
                </el-menu>
                <div class="h-[48px]"></div>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import menuItem from './menu-item.vue'
import { img, isUrl } from '@/utils/common'
import { findFirstValidRoute } from '@/router/routers'

const systemStore = useSystemStore()
const userStore = useUserStore()
const route = useRoute()
const siteInfo = userStore.siteInfo
const routers = userStore.routers
const addonIndexRoute = userStore.addonIndexRoute
const menuData = ref<Record<string, any>[]>([])
const addonRouters: Record<string, any> = {}
const logoUrl = computed(() => {
    return userStore.siteInfo.icon ? userStore.siteInfo.icon : systemStore.website.icon
})

routers.forEach(item => {
    item.original_name = item.name
    if (item.meta.addon == '') {
        if (item.children && item.children.length) {
            item.name = findFirstValidRoute(item.children)
        }
        menuData.value.push(item)
    } else if (item.meta.addon != '' && siteInfo?.apps.length == 1 && siteInfo?.apps[0].key == item.meta.addon) {
        if (item.children) {
            item.children.forEach((citem: Record<string, any>) => {
                citem.original_name = citem.name
                if (citem.children && citem.children.length) {
                    citem.name = findFirstValidRoute(citem.children)
                }
            })
            menuData.value.unshift(...item.children)
        } else {
            menuData.value.unshift(item)
        }
    } else {
        addonRouters[item.meta.addon] = item
    }
})

// 多应用时将应用插入菜单
if (siteInfo?.apps.length > 1) {
    const routers:Record<string, any>[] = []
    siteInfo?.apps.forEach((item: Record<string, any>) => {
        if (addonRouters[item.key]) {
            addonRouters[item.key].name = addonIndexRoute[item.key]
            routers.push(addonRouters[item.key])
        }
    })
    menuData.value.unshift(...routers)
}
</script>

<style lang="scss">
.menu-wrap {
    padding: 0!important;

    .el-menu {
        border-right: 0!important;

        .el-menu-item, .el-sub-menu__title {
            --el-menu-item-height: 40px;
        }

        .el-sub-menu .el-menu-item {
            --el-menu-sub-item-height: 40px;
        }

        .el-menu-item.is-active {
            background-color: var(--el-color-primary)
        }
    }

}
</style>
