<template>
    <el-container class="w-100 h-screen">
        <el-main class="flex p-0">
            <div class="one-menu w-[124px] h-screen px-[8px] bg-[#1c2233]">
                <el-header class="logo-wrap">
                    <div class="logo flex items-center m-auto h-[64px]" v-if="!systemStore.menuIsCollapse">
                        <el-image style="width: 40px; height: 40px" :src="img(logoUrl)" fit="contain">
                            <template #error>
                                <div class="flex justify-center items-center w-full h-[40px]">
                                    <img class="max-w-[40px]" src="@/app/assets/images/icon-addon-one.png" alt=""  object-fit="contain">
                                </div>
                            </template>
                        </el-image>
                    </div>
                    <div class="logo flex items-center justify-center h-[64px]" v-else>
                        <i class="text-3xl iconfont iconyunkongjian"></i>
                    </div>
                </el-header>

                <el-scrollbar class="h-[calc( 100vh - 64px )]">
                    <el-menu :default-active="oneMenuActive" :router="true" class="aside-menu" :unique-opened="true" :collapse="systemStore.menuIsCollapse">
                        <template v-for="(item, index) in oneMenuData" :key="index">
                            <el-menu-item :index="item.original_name" @click="handleJump(item.name)" v-if="item.meta.show">
                                <div v-if="item.meta.icon" class="w-[16px] h-[16px] relative flex justify-center">
                                    <el-image class="w-[16px] h-[16px] rounded-[50%] overflow-hidden" :src="item.meta.icon" fit="fill" v-if="isUrl(item.meta.icon)"/>
                                    <icon :name="item.meta.icon" class="absolute top-[50%] -translate-y-[50%]" v-else />
                                </div>
                                <div v-else class="w-[16px] h-[16px]"></div>
                                <template #title>
                                    <div class="relative flex-1 w-0">
                                        <span class="ml-[10px] w-full truncate">{{ item.meta.short_title || item.meta.title }}</span>
                                    </div>
                                </template>
                            </el-menu-item>
                        </template>
                    </el-menu>
                    <div class="h-[48px]"></div>
                </el-scrollbar>
            </div>

            <el-scrollbar v-if="twoMenuData.length" class="two-menu w-[152px]">
                <div class="w-[152px] h-[64px] flex items-center justify-center text-[16px] border-b-[1px] border-solid border-[var(--el-border-color-lighter)]">
                    {{ route.matched[1].meta.title }}
                </div>

                <el-menu class="aside-menu" :default-active="route.name" :default-openeds="menuOption" :router="true" :collapse="systemStore.menuIsCollapse">
                    <menu-item v-for="(route, index) in twoMenuData" :routes="route" :key="index" />
                </el-menu>

                <div class="h-[48px]"></div>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, watch, computed, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import { img, isUrl } from '@/utils/common'
import menuItem from './menu-item.vue'
import { cloneDeep } from 'lodash-es'
import { getShowApp,getShowSpecialMenu} from '@/app/api/site'
import { findFirstValidRoute,formatRouters } from '@/router/routers'
import storage from '@/utils/storage'

const route = useRoute()
const router = useRouter()

const systemStore = useSystemStore()
const userStore = useUserStore()

const siteInfo = userStore.siteInfo
const routers = userStore.routers
const addonIndexRoute = userStore.addonIndexRoute

const oneMenuData = ref<Record<string, any>[]>([])
const twoMenuData = ref<Record<string, any>[]>([])
const addonRouters: Record<string, any> = {}
const logoUrl = computed(() => {
    return userStore.siteInfo.icon ? userStore.siteInfo.icon : systemStore.website.icon
})

routers.forEach(item => {
    item.original_name = item.name
    if (item.meta.addon == '') {
        if (item.meta.attr == '') {
            if (item.children && item.children.length) {
                item.name = findFirstValidRoute(item.children)
            }
            oneMenuData.value.push(item)
        }
    } else if (item.meta.addon != '' && siteInfo?.apps.length <= 1 && siteInfo?.apps[0].key == item.meta.addon && item.meta.show) {
        if (item.children) {
            item.children.forEach((citem: Record<string, any>) => {
                citem.original_name = citem.name
                if (citem.children && citem.children.length) {
                    citem.name = findFirstValidRoute(citem.children)
                }
            })
            oneMenuData.value.unshift(...item.children)
        } else {
            oneMenuData.value.unshift(item)
        }
    } else {
        addonRouters[item.meta.addon] = item
    }
    // 排序, 功能正确，改了排序后需要把菜单排序的默认值重新调整一下【多应用一级菜单，单应用二级菜单】
    // oneMenuData.value.sort((a, b) => {
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
    oneMenuData.value.unshift(...routers)
    // 排序, 功能正确，改了排序后需要把菜单排序的默认值重新调整一下【多应用一级菜单，单应用二级菜单】
    // oneMenuData.value.sort((a, b) => {
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

const appList = ref(null)
const marketingList = ref(null)
// const loading = ref(true);
const oneMenuActive = ref(route.matched[1].name)


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

const specialMenuNames = ref<string[]>([])
const specialMenuNamesLevel1 = ref<string[]>([])

onMounted(() => {
    getAppList()
    getShowSpecialMenuList()
    const processedSpecialMenus = handleSpecialMenus();
    specialMenuNames.value = collectSpecialMenuNames(processedSpecialMenus)
    specialMenuNamesLevel1.value = collectSpecialMenuNamesLevel1(processedSpecialMenus)
    storage.set({ key: 'specialMenuNames', data: specialMenuNames.value })
    storage.set({ key: 'specialMenuNamesLevel1', data: specialMenuNamesLevel1.value })
})


// 让二级菜单默认展开
const menuOption = ref([])
const secondMenuShowWayFn = () => {
    menuOption.value = []
    if (oneMenuActive.value !== 'active' && oneMenuActive.value !== 'addon' && twoMenuData.value && Object.values(twoMenuData.value).length) {
        const data = cloneDeep(twoMenuData.value)
        for (const key in data) {
            menuOption.value.push(data[key].name)
        }
    }
}

// watchEffect(() => {
//     // if (!appList.value || loading.value) return; // 确保数据加载完毕
//     const addonKeys = appList.value?.addon?.list?.map(item => item.key) ?? []
//     const toolKeys = appList.value?.tool?.list?.map(item => item.key) ?? []
//     const allKeys = [...addonKeys, ...toolKeys]
//     const marketingKeys = marketingList.value?.marketing?.list?.map(item => item.key) ?? []
//     const matchedName = route.matched[1]?.name
//     if (allKeys.includes(matchedName)) {
//         oneMenuActive.value = 'addon'
//         twoMenuData.value = route.matched[1]?.children ?? []
//     } else if (marketingKeys.includes(matchedName)) {
//         oneMenuActive.value = 'active'
//         twoMenuData.value = route.matched[1]?.children ?? []
//     } else if (route.meta.attr !== '') {
//         oneMenuActive.value = route.matched[2]?.name
//         twoMenuData.value = route.matched[1]?.children ?? []
//     } else {
//         // 多应用
//         if (siteInfo?.apps.length > 1) {
//             twoMenuData.value = route.matched[1]?.children
//             oneMenuActive.value = route.matched[1]?.name
//         } else {
//             // 单应用
//             const oneMenu = route.matched[1]
//             if (oneMenu.meta.addon === '') {
//                 oneMenuActive.value = route.matched[1]?.name
//                 twoMenuData.value = route.matched[1]?.children ?? []
//             } else {
//                 if (oneMenu.meta.addon === siteInfo?.apps[0]?.key) {
//                     oneMenuActive.value = route.matched[2]?.name
//                     twoMenuData.value = route.matched[2]?.children ?? []
//                 } else {
//                     oneMenuActive.value = route.matched[1]?.name
//                     twoMenuData.value = route.matched[1]?.children ?? []
//                 }
//             }
//         }
//     }
//     secondMenuShowWayFn()
// })

// 从 addonKeys 中提取所有需要匹配的 key
const getAddonAllKeys = (addonData) => {
    if (!addonData || typeof addonData !== 'object') return [];
    const allKeys = [];
    Object.values(addonData).forEach(category => {
        if (Array.isArray(category.list)) {
            category.list.forEach(item => {
                if (item.key) allKeys.push(item.key);
            });
        }
    });
    return allKeys;
};
// 处理 specialMenusKeys 子菜单 show 的方法
const handleSpecialMenus = () => {
    const specialMenusKeys = storage.get('specialAppList')
    if (Array.isArray(specialMenusKeys) && specialMenusKeys.length) {
        const processedSpecialMenus = JSON.parse(JSON.stringify(specialMenusKeys));
        const activeAppKey = storage.get('activeAppKey');
        
        // 收集所有特殊菜单的name
        processedSpecialMenus.forEach(menu => {
            if (menu.children && Array.isArray(menu.children)) {
                const traverseChildren = (children) => {
                    children.forEach(child => {
                        if (child && child.is_show !== undefined) {
                            child.is_show = (child.menu_key === activeAppKey) ? 1 : 0;
                        }
                    });
                };
                traverseChildren(menu.children);
            }
        });
        // 过滤掉 children 为空的特殊菜单
        const filteredSpecialMenus = processedSpecialMenus.filter(menu => {
            return menu.children && menu.children.length > 0;
        });
        return formatRouters(filteredSpecialMenus);
    }
    return [];
};

// 提取所有特殊菜单的name
const collectSpecialMenuNames = (menus: any[]) => {
    const names: string[] = []
    const traverse = (children: any[]) => {
        children.forEach(child => {
            if (child.name) {
                names.push(child.name)
            }
            // 递归处理子菜单
            if (child.children && Array.isArray(child.children)) {
                traverse(child.children)
            }
        })
    }
    
    menus.forEach(menu => {
        if (menu.children && Array.isArray(menu.children)) {
            traverse(menu.children)
        }
    })
    return names
}

// 提取所有一级特殊菜单的name
const collectSpecialMenuNamesLevel1 = (menus: any[]) =>{
    const names: string[] = []
    menus.forEach(menu => {
        if (menu.name) {
            names.push(menu.name)
        }
    })
    return names
}

// 统一处理跳转逻辑
const handleJump = (routeName: string) => {
    // 检查目标路由是否在特殊菜单列表中
    const isInSpecialMenus = specialMenuNames.value.includes(routeName)
    // 核心逻辑：如果不在特殊菜单中，就删除activeAppKey
    if (!isInSpecialMenus) {
        storage.remove('activeAppKey')
    } else {
    }
    
    // 执行跳转
    router.push({ name: routeName })
}

watch(route, () => {
    if (route.meta.attr != '') {
        oneMenuActive.value = route.matched[1].name
        twoMenuData.value = route.matched[1].children ?? []
    } else {
        // 多应用
        if (siteInfo?.apps.length > 1) {
            twoMenuData.value = route.matched[1].children
            oneMenuActive.value = route.matched[1].name
        } else {
            // 单应用
            const oneMenu = route.matched[1]
            if (oneMenu.meta.addon == '') {
                oneMenuActive.value = route.matched[1].name
                twoMenuData.value = route.matched[1].children ?? []
            } else {
                if (oneMenu.meta.addon == siteInfo?.apps[0].key) {
                    oneMenuActive.value = route.matched[2].name
                    twoMenuData.value = route.matched[2].children ?? []
                } else {
                    oneMenuActive.value = route.matched[1].name
                    twoMenuData.value = route.matched[1].children ?? []
                }
            }
        }
    }
    secondMenuShowWayFn()
    const addonKeys = storage.get('defaultAppList')
    const addonAllKeys = getAddonAllKeys(addonKeys);
    twoMenuData.value = twoMenuData.value.filter((child) =>{
        return !child.name || !addonAllKeys.includes(child.name);
    });
    if(oneMenuActive.value == 'addon'){
        // 处理特殊菜单并插入到 twoMenuData 中（与 addon_list 同级）
        const processedSpecialMenus = handleSpecialMenus();
            if (processedSpecialMenus.length) {
            // 先找到 addon_list 在 twoMenuData 中的索引
            const addonListIndex = twoMenuData.value.findIndex(
                (item) => item.name === 'addon_list'
            );
            if (addonListIndex !== -1) {
                // 将特殊菜单插入到 addon_list 后面（同级）
                twoMenuData.value.splice(
                addonListIndex + 1,
                0,
                ...processedSpecialMenus
                );
            } else {
                // 如果没有 addon_list，直接将特殊菜单添加到 twoMenuData 中
                twoMenuData.value.push(...processedSpecialMenus);
            }
        }
    }
    
}, { immediate: true })
</script>

<style lang="scss">
.one-menu {

    .aside-menu:not(.el-menu--collapse) {
        background-color: transparent;

        .el-menu-item {
            font-size: 14px;
            height: 40px;
            margin-bottom: 4px;
            padding-left: 12px !important;
            color: rgba(255,255,255,.7);
            border-radius: 2px;

            &:hover {
                color: #ffffff;
                background-color: var(--el-color-primary);
            }

            &.is-active {
                color: #fff !important;
                background-color: var(--el-color-primary) !important;
            }

            span {
                margin-left: 8px;
                font-size: 14px;
            }
        }
    }

    .el-menu {
        border: 0;
    }

    .el-scrollbar {
        height: calc(100vh - 65px);
    }
}

.two-menu {

    .aside-menu:not(.el-menu--collapse) {
        width: 152px;
        padding-top: 16px;
        border: 0;

        .el-menu-item {
            height: 36px;
            margin: 0 12px 4px;
            padding: 0 !important;
            border-radius: 2px;

            span {
                margin-left: 8px;
                font-size: 14px;
            }

            &.is-active {
                background-color: var(--el-color-primary-light-9) !important;
            }

            &:hover {
                color: var(--el-color-primary);
                background-color: var(--el-color-primary-light-9) !important;
            }
        }

        .el-sub-menu {
            margin-bottom: 8px;

            .el-sub-menu__title {
                height: 36px;
                margin: 0 8px 4px;
                padding-left: 0;
                border-radius: 2px;

                span {
                    font-size: 14px;
                    display: flex;
                    height: 36px;
                    align-items: center;
                }

                &:hover {
                    color: var(--el-color-primary);
                    background-color: var(--el-color-primary-light-9) !important;
                }
                .el-icon.el-sub-menu__icon-arrow {
                    right: 5px;
                }
            }

            .el-menu-item {
                padding-left: 20px !important;
                span{
                    margin-left: 0 !important;
                }
            }
            .el-sub-menu{
                .el-sub-menu__title{
                    margin: 0 8px 2px;
                    height: 40px;
                    padding-left: 18px;
                    border-radius: 2px;
                    span{
                        height: 40px;
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                    }
                    &:hover{
                        background-color: transparent;
                        color: var(--el-color-primary);
                    }
                }
                .el-menu-item{
                    padding-left: 40px !important;
                    span{
                        margin-left: 0 !important;
                    }
                }
            }
        }
    }
}

.logo-wrap {
    display: flex;
    padding: 0;
    white-space: nowrap;
    align-items: center;

    .logo {
        height: 100%;
        box-sizing: border-box;
    }
}
</style>
