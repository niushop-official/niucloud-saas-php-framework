<template>
    <el-container class="aside-sidebar h-screen layout-aside flex flex-col">
        <el-header class="logo-wrap flex items-center">
            <div class="logo flex items-center min-w-0" :class="{ 'is-collapse': systemStore.menuIsCollapse }">
                <el-image class="logo__image" :src="img(logoUrl)" fit="contain">
                    <template #error>
                        <img class="logo__image" src="@/app/assets/images/icon-addon-one.png" alt="" />
                    </template>
                </el-image>
                <span v-if="!systemStore.menuIsCollapse" class="logo__name">{{ siteName }}</span>
            </div>
        </el-header>
        <el-main class="menu-wrap">
            <el-scrollbar>
                <el-menu :default-active="menuActive" :router="false" class="aside-menu h-full" :unique-opened="true" :collapse="systemStore.menuIsCollapse" >
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
import { useMenuActive } from '@/hooks/useMenuActive'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import menuItem from './menu-item.vue'
import { img } from '@/utils/common'
import { findFirstValidRoute ,formatRouters} from '@/router/routers'
import { getShowApp,getShowSpecialMenu} from '@/app/api/site'

import storage from '@/utils/storage'

const systemStore = useSystemStore()
const userStore = useUserStore()
const route = useRoute()
const siteInfo = userStore.siteInfo

// 受控菜单高亮：点击需要新窗口打开的菜单后，高亮回滚到原菜单
const { menuActive } = useMenuActive()
const routers = userStore.routers
const addonIndexRoute = userStore.addonIndexRoute
const menuData = ref<Record<string, any>[]>([])
const addonRouters: Record<string, any> = {}
const logoUrl = computed(() => {
    const website = systemStore.website as any
    return userStore.siteInfo?.icon || website?.icon
})
const siteName = computed(() => {
    const website = systemStore.website as any
    return website?.site_name || userStore.siteInfo?.site_name || ''
})

const appList = ref<Record<string, any>[]>([])

const getAppList = async () => {
    const res = await getShowApp()
    appList.value = res.data
    
    storage.set({ key: 'defaultAppList', data: appList.value })
}
const specialList = ref<Record<string, any>[]>([])
const getShowSpecialMenuList = async () => {
    const res = await getShowSpecialMenu()
    // specialList.value = formatRouters(res.data.list)
    specialList.value = res.data.list

    storage.set({ key: 'specialAppList', data: specialList.value })
}


onMounted(() => {
    getAppList()
    getShowSpecialMenuList()
})

routers.forEach(item => {
    item.original_name = item.name
    if (item.meta.addon == '') {
        if (item.meta.attr == '' && item.name != 'sign' && item.name != 'verify') {
            if (item.children && item.children.length) {
                item.name = findFirstValidRoute(item.children)
            }
            menuData.value.push(item)
        }
    } else if (item.meta.addon != '' && siteInfo?.apps.length == 1 && siteInfo?.apps[0].key == item.meta.addon && item.meta.show) {
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

    // console.log('menuData', menuData.value)
    // 排序, 功能正确，改了排序后需要把菜单排序的默认值重新调整一下【多应用一级菜单，单应用二级菜单】
    // menuData.value.sort((a, b) => {
    //     if (a.meta.sort && b.meta.sort) {
    //         return b.meta.sort - a.meta.sort
    //     } else if (a.meta.sort) {
    //         return -1
    //     } else if (b.meta.sort) {
    //         return 1
    //     } else {
    //         return 0
    //     }
    // })
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

    // 排序, 功能正确，改了排序后需要把菜单排序的默认值重新调整一下【多应用一级菜单，单应用二级菜单】
    // menuData.value.sort((a, b) => {
    //     if (a.meta.sort && b.meta.sort) {
    //         return b.meta.sort - a.meta.sort
    //     } else if (a.meta.sort) {
    //         return -1
    //     } else if (b.meta.sort) {
    //         return 1
    //     } else {
    //         return 0
    //     }
    // })
}
</script>

<style lang="scss">
.layout-default {
.aside-sidebar {
    box-sizing: border-box;
    width: var(--cmp-sidebar-width);
    background-color: var(--cmp-sidebar-bg);
    border-right: 1px solid var(--cmp-sidebar-border);

    .logo-wrap {
        height: var(--cmp-header-height) !important;
        padding-right: var(--cmp-default-sidebar-content-padding-inline);
        padding-left: var(--cmp-default-sidebar-content-padding-inline);
        background: transparent;
    }

    .logo {
        width: 100%;
        padding: 0 12px;
        height: var(--cmp-header-height);
        &.is-collapse{
            justify-content: center;
        }
    }

    .logo__image {
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 6px;
        object-fit: contain;
    }

    .logo__name {
        flex: 1;
        width: 0;
        min-width: 0;
        margin-left: 8px;
        overflow: hidden;
        font-size: 20px;
        font-weight: var(--sys-font-weight-medium);
        line-height: 1;
        color: var(--sys-color-text-primary);
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .el-scrollbar__bar.is-vertical {
        width: 8px !important;
        opacity: 1 !important;
    }

    .el-scrollbar__thumb {
        background-color: var(--cmp-default-sidebar-scrollbar-thumb) !important;
        opacity: 0.35 !important;
    }
}

.menu-wrap {
    min-height: 0;
    padding: 0 !important;
    overflow: hidden;
    background-color: transparent;

    .el-scrollbar {
        height: 100%;
    }

    .el-scrollbar__view {
        padding: 0 var(--cmp-default-sidebar-content-padding-inline);
    }

    .aside-menu {
        --el-menu-bg-color: transparent;
        --el-menu-hover-bg-color: var(--cmp-default-menu-hover-bg);
        --el-menu-hover-text-color: var(--cmp-menu-text-active);
        --el-menu-text-color: var(--cmp-default-menu-text);
        --el-menu-active-color: var(--cmp-menu-text-active);
        --el-menu-base-level-padding: var(--cmp-default-menu-base-padding);
        --el-menu-level-padding: var(--cmp-default-menu-level-padding);
        --el-menu-item-height: var(--cmp-default-menu-item-height);
        --el-menu-sub-item-height: var(--cmp-default-menu-item-height);
        --el-menu-item-font-size: 13px;
        --aside-hover-bg: var(--cmp-default-menu-hover-bg);
        --aside-active-bg: var(--cmp-default-menu-active-bg);
        border-right: 0 !important;
        padding: 0;
        background-color: transparent;

        .el-menu {
            background-color: transparent;
            border-right: 0;
        }

        &:not(.el-menu--collapse) {
            width: 100%;
            padding-top: 12px;
            padding-bottom: 12px;

            .aside-menu-group {
                margin-top: var(--cmp-default-menu-group-gap);

                &:first-child {
                    margin-top: 0;
                }
            }

            .aside-menu-group-title {
                box-sizing: border-box;
                margin: 0 0 var(--cmp-default-menu-group-title-gap);
                padding: 0 12px;
                height: auto;
                background: transparent;
                color: var(--cmp-default-menu-group-text);
                font-size: 13px;
                font-weight: 400;
                line-height: 13px;
                cursor: default;
                user-select: none;
            }

            .aside-menu-group-divider,
            .menu-section-divider {
                width: 100%;
                height: 1px;
                margin: var(--cmp-default-menu-group-gap) 0 0;
                background-color: var(--cmp-default-menu-divider);
            }

            .el-menu-item,
            .el-sub-menu__title {
                margin: 0;
                box-sizing: border-box;
                border-radius: var(--cmp-default-menu-item-radius);
                background-color: transparent;
                font-weight: 400;
                cursor: pointer;
                transition: color 180ms ease, background-color 180ms ease;
            }

            .el-menu-item *,
            .el-sub-menu__title * {
                vertical-align: middle;
            }

            .el-menu-item,
            .el-sub-menu > .el-sub-menu__title {
                padding-left: calc(var(--cmp-default-menu-base-padding) + var(--el-menu-level, 0) * var(--cmp-default-menu-level-padding)) !important;
                padding-right: 34px !important;
            }

            .el-menu-item.aside-menu-lv2,
            .el-sub-menu.aside-menu-lv2 > .el-sub-menu__title,
            .el-menu-item.aside-menu-lv3,
            .el-sub-menu.aside-menu-lv3 > .el-sub-menu__title {
                height: var(--cmp-default-menu-item-height);
                border-radius: var(--cmp-default-menu-item-radius);
                font-size: 13px;
                font-weight: 400;
                line-height: var(--cmp-default-menu-item-height);
            }

            .el-menu-item.aside-menu-lv2,
            .el-sub-menu.aside-menu-lv2 > .el-sub-menu__title {
                color: var(--cmp-default-menu-text);
            }

            .el-menu-item.aside-menu-lv3,
            .el-sub-menu.aside-menu-lv3 > .el-sub-menu__title {
                padding-left: calc(var(--cmp-default-menu-base-padding) + 16px + 8px) !important;
                color: var(--cmp-default-menu-text-secondary);
            }

            .el-menu-item.aside-menu-lv4,
            .el-sub-menu.aside-menu-lv4 > .el-sub-menu__title {
                height: var(--cmp-default-menu-leaf-height);
                border-radius: var(--cmp-default-menu-leaf-radius);
                color: var(--cmp-default-menu-text-tertiary);
                font-size: 12px;
                font-weight: 400;
                line-height: var(--cmp-default-menu-leaf-height);
            }

            .el-sub-menu.aside-menu-lv4 > .el-sub-menu__title > .el-sub-menu__icon-arrow {
                display: none;
            }

            .el-menu-item.aside-menu-lv2:hover,
            .el-sub-menu.aside-menu-lv2 > .el-sub-menu__title:hover,
            .el-menu-item.aside-menu-lv3:hover,
            .el-sub-menu.aside-menu-lv3 > .el-sub-menu__title:hover {
                color: var(--cmp-menu-text-active);
                background-color: var(--aside-hover-bg) !important;
            }

            .el-menu-item.aside-menu-lv4:hover,
            .el-sub-menu.aside-menu-lv4 > .el-sub-menu__title:hover {
                color: var(--cmp-default-menu-text-secondary);
                background-color: var(--cmp-default-menu-leaf-hover-bg) !important;
            }

            .el-menu-item.aside-menu-lv2.is-active {
                color: var(--cmp-menu-text-active);
                font-weight: 400;
                background-color: var(--aside-active-bg) !important;
            }

            .el-menu-item.aside-menu-lv3.is-active,
            .el-menu-item.aside-menu-lv4.is-active {
                color: var(--cmp-menu-text-active);
                font-weight: 500;
                background-color: var(--aside-active-bg) !important;
                box-shadow: none;
            }

            .el-menu-item.aside-menu-lv2.is-active:hover,
            .el-menu-item.aside-menu-lv3.is-active:hover,
            .el-menu-item.aside-menu-lv4.is-active:hover {
                color: var(--cmp-menu-text-active);
                background-color: var(--aside-active-bg) !important;
            }

            .el-menu-item.aside-menu-lv4.is-active:hover {
                font-weight: 500;
            }

            .aside-menu-icon-wrap {
                --color: var(--cmp-default-menu-icon);
                display: flex;
                flex: 0 0 16px;
                align-items: center;
                justify-content: center;
                width: 16px;
                height: 16px;
                margin-right: 8px;
                color: var(--cmp-default-menu-icon);
            }

            .aside-menu-lv3 .aside-menu-icon-wrap {
                --color: var(--cmp-default-menu-icon-secondary);
                flex-basis: 16px;
                width: 16px;
                height: 16px;
                color: var(--cmp-default-menu-icon-secondary);
            }

            .el-menu-item:hover .aside-menu-icon-wrap,
            .el-sub-menu__title:hover .aside-menu-icon-wrap,
            .el-menu-item.is-active .aside-menu-icon-wrap {
                --color: var(--cmp-menu-text-active);
                color: var(--cmp-menu-text-active);
            }

            .el-menu-item.aside-menu-lv4:hover .aside-menu-icon-wrap {
                --color: var(--cmp-default-menu-icon);
                color: var(--cmp-default-menu-icon);
            }

            .aside-menu-icon,
            .aside-menu-icon-wrap .el-icon {
                flex-shrink: 0;
                width: 16px !important;
                height: 16px !important;
                margin: 0 !important;
                font-size: 16px !important;
                line-height: 1;
            }

            .aside-menu-lv3 .aside-menu-icon,
            .aside-menu-lv3 .aside-menu-icon-wrap .el-icon {
                width: 16px !important;
                height: 16px !important;
                font-size: 16px;
            }

            .aside-menu-dot {
                flex: 0 0 4px;
                width: 4px;
                height: 4px;
                margin-right: 8px;
                border-radius: 50%;
                background-color: var(--cmp-default-menu-dot);
            }

            .el-menu-item.aside-menu-lv4.is-active .aside-menu-dot {
                background-color: var(--cmp-menu-text-active);
            }

            .aside-menu-label {
                flex: 1 1 auto;
                min-width: 0;
                overflow: hidden;
                color: inherit;
                font-size: inherit;
                font-weight: inherit;
                line-height: 13px;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .aside-menu-lv4 .aside-menu-label {
                line-height: 16px;
            }

            .el-sub-menu > .el-sub-menu__title > .el-sub-menu__icon-arrow {
                top: 6px !important;
                right: 10px !important;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                width: 24px !important;
                height: 24px !important;
                margin-top: 0 !important;
                padding: 6px;
                color: var(--cmp-default-menu-arrow);
                font-size: 12px;
                transform: rotate(0deg) !important;
                transform-origin: center center;
                transition: transform 180ms ease, color 180ms ease !important;

                svg {
                    display: none;color: var(--cmp-default-menu-arrow);
                }

                &::before {
                    content: "\e927";
                    display: block;
                    font-family: "iconfont" !important;
                    font-size: 8px;
                    font-style: normal;
                    line-height: 1;
                    -webkit-font-smoothing: antialiased;
                }
            }

            .el-sub-menu.aside-menu-lv3 > .el-sub-menu__title:hover > .el-sub-menu__icon-arrow {
                color: var(--cmp-menu-text-active);
            }

            .el-sub-menu.is-opened > .el-sub-menu__title > .el-sub-menu__icon-arrow {
                transform: rotate(90deg) !important;
            }

            .el-sub-menu,
            .el-menu-item {
                margin-top: 0;
                margin-bottom: 0;
            }
        }

        &.el-menu--collapse {
            .el-menu-item,
            .el-sub-menu__title {
                height: var(--cmp-default-menu-item-height);
                line-height: var(--cmp-default-menu-item-height);
            }

            .aside-menu-group {
                margin: 0;
            }

            .aside-menu-group-title,
            .aside-menu-group-divider {
                display: none;
            }
        }
    }
}
}
</style>
