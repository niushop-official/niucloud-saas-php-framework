<template>
    <el-container class="flex flex-col">
        <el-main class="menu-wrap">
            <el-scrollbar class="menu-scrollbar flex-1 h-0">
                <el-menu :default-active="route.name" :default-openeds="defaultOpeneds" :router="true" :unique-opened="false" :collapse="systemStore.menuIsCollapse">
                    <menu-item v-for="(route, index) in menuData" :routes="route" :key="index" />
                </el-menu>
                <div class="h-[48px]"></div>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import menuItem from './menu-item.vue'
import { findFirstValidRoute } from '@/router/routers'

const systemStore = useSystemStore()
const userStore = useUserStore()
const route = useRoute()
const siteInfo = userStore.siteInfo
const routers = userStore.routers
const addonIndexRoute = userStore.addonIndexRoute
const menuData = ref<Record<string, any>[]>([])
const addonRouters: Record<string, any> = {}
const website = computed(() => {
    return systemStore.website
})
// 默认打开的菜单项路径数组
const defaultOpeneds = ref<string[]>([])
// 在组件挂载后，生成默认打开的菜单项路径数组
onMounted(() => {

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

defaultOpeneds.value = menuData.value.map(item => item.name)
</script>

<style lang="scss">
.logo-wrap {
    // background: #1f2531;
    background: #fff;
    transition: transform getCssVar('transition-duration');
}
:root{
    --aside-width: 200px;
}
.menu-wrap {
    padding: 0!important;
    // background: #1f2531;
    // background: #fff;
    display: flex;
    flex-direction: column;

    .el-menu {
        border-right: 0!important;

        &:not(.el-menu--collapse) {
            width: var(--aside-width);
        }

        .el-menu-item, .el-sub-menu__title {
            --el-menu-item-height: 40px;
        }

        .el-sub-menu .el-menu-item {
            --el-menu-sub-item-height: 40px;
        }

        .el-menu-item.is-active {
            background: var(--el-color-primary) !important;
            color: #fff !important;
        }

        &.el-menu--inline {
            // background: #282e3a;
            // background: #fff;
        }
        .el-menu-item .el-menu-tooltip__trigger{
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &.el-menu--collapse {
            .el-menu-item, .el-sub-menu__title {
                --el-menu-item-height: 60px;
                justify-content: center;
            }
        }
    }

}
</style>
