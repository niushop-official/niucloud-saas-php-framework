<template>
    <el-container class="w-100 h-[100%]">
        <el-main class="p-0 flex">
            <el-scrollbar v-if="twoMenuData.length" class="two-menu w-[200px]">
                <el-menu class="aside-menu" :default-active="menuActive" :default-openeds="menuOption" :router="false" :collapse="systemStore.menuIsCollapse">
                    <menu-item v-for="(route, index) in twoMenuData" :routes="route" :key="index" />
                </el-menu>
                <div class="h-[48px]"></div>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import menuItem from './menu-item.vue'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import { cloneDeep } from 'lodash-es'
import storage from '@/utils/storage'
import { getShowApp, getShowSpecialMenu } from '@/app/api/site'
import { formatRouters } from '@/router/routers'
import { useMenuActive } from '@/hooks/useMenuActive'

const route = useRoute()
// 受控菜单高亮：点击需要新窗口打开的菜单后，高亮回滚到原菜单
const { menuActive } = useMenuActive()

const systemStore = useSystemStore()
const userStore = useUserStore()

const siteInfo = userStore.siteInfo

const appList = ref(null)
const twoMenuData = ref<Record<string, any>[]>([])
const oneMenuActive = ref(route.matched[1].name)

const getAppList = async () => {
    const res = await getShowApp()
    appList.value = res.data
    storage.set({ key: 'defaultAppList', data: appList.value })
}
const specialList = ref<Record<string, any>[]>([])
const getShowSpecialMenuList = async () => {
    const res = await getShowSpecialMenu()
    specialList.value = res.data.list
    storage.set({ key: 'specialAppList', data: specialList.value })
}

const specialMenuNames = ref<string[]>([])
const specialMenuNamesLevel1 = ref<string[]>([])

onMounted(() => {
    getAppList()
    getShowSpecialMenuList()
    const processedSpecialMenus = handleSpecialMenus()
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

// 从 addonKeys 中提取所有需要匹配的 key
const getAddonAllKeys = (addonData) => {
    if (!addonData || typeof addonData !== 'object') return []
    const allKeys = []
    Object.values(addonData).forEach(category => {
        if (Array.isArray(category.list)) {
            category.list.forEach(item => {
                if (item.key) allKeys.push(item.key)
            })
        }
    })
    return allKeys
}

// 处理 specialMenusKeys 子菜单 show 的方法
const handleSpecialMenus = () => {
    const specialMenusKeys = storage.get('specialAppList')
    if (Array.isArray(specialMenusKeys) && specialMenusKeys.length) {
        const processedSpecialMenus = JSON.parse(JSON.stringify(specialMenusKeys))
        const activeAppKey = storage.get('activeAppKey')
        // 收集所有特殊菜单的name
        processedSpecialMenus.forEach(menu => {
            if (menu.children && Array.isArray(menu.children)) {
                const traverseChildren = (children) => {
                    children.forEach(child => {
                        if (child && child.is_show !== undefined) {
                            child.is_show = (child.menu_key === activeAppKey) ? 1 : 0
                        }
                    })
                }
                traverseChildren(menu.children)
            }
        })
        // 过滤掉 children 为空的特殊菜单
        const filteredSpecialMenus = processedSpecialMenus.filter(menu => {
            return menu.children && menu.children.length > 0
        })
        return formatRouters(filteredSpecialMenus)
    }
    return []
}

watch(route, () => {
    if (route.meta.attr != '') {
        oneMenuActive.value = route.matched[1].name
        twoMenuData.value = route.matched[1].children ?? []
    } else {
        // 多应用
        if (siteInfo?.apps.length > 1) {
            twoMenuData.value = route.matched[2].children
            oneMenuActive.value = route.matched[2].name
        } else {
            // 单应用
            const oneMenu = route.matched[2]
            if (oneMenu.meta.addon == '') {
                oneMenuActive.value = route.matched[2].name
                twoMenuData.value = route.matched[2].children ?? []
            } else {
                if (oneMenu.meta.addon == siteInfo?.apps[0].key) {
                    oneMenuActive.value = route.matched[3].name
                    twoMenuData.value = route.matched[3].children ?? []
                } else {
                    oneMenuActive.value = route.matched[2].name
                    twoMenuData.value = route.matched[2].children ?? []
                }
            }
        }
    }
    secondMenuShowWayFn()
    const addonKeys = storage.get('defaultAppList')
    const addonAllKeys = getAddonAllKeys(addonKeys)
    twoMenuData.value = twoMenuData.value.filter((child) => {
        return !child.name || !addonAllKeys.includes(child.name)
    })
    if (oneMenuActive.value == 'addon') {
        // 处理特殊菜单并插入到 twoMenuData 中（与 addon_list 同级）
        const processedSpecialMenus = handleSpecialMenus()
        if (processedSpecialMenus.length) {
            // 先找到 addon_list 在 twoMenuData 中的索引
            const addonListIndex = twoMenuData.value.findIndex(
                (item) => item.name === 'addon_list'
            )
            if (addonListIndex !== -1) {
                // 将特殊菜单插入到 addon_list 后面（同级）
                twoMenuData.value.splice(
                    addonListIndex + 1,
                    0,
                    ...processedSpecialMenus
                )
            } else {
                // 如果没有 addon_list，直接将特殊菜单添加到 twoMenuData 中
                twoMenuData.value.push(...processedSpecialMenus)
            }
        }
    }
}, { immediate: true })


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
</script>

<style scoped>
:root,
body {
    --layout-side-hover-bg: #f7f8fa;
    --layout-side-active-bg: var(--el-color-primary-light-9);
    --layout-side-active-text: var(--el-color-primary);
}
</style>
<style lang="scss" scoped>
.two-menu {

    .aside-menu:not(.el-menu--collapse) {
        width: 200px;
        padding-top: 16px;
        border: 0;

        :deep(.el-menu-item) {
            height: 36px;
            margin: 0 8px 4px;
            padding: 0 !important;
            border-radius: 2px;

            span {
                font-size: 14px;
                line-height: 36px;
            }
            i {
                line-height: 36px;
            }

            &.is-active {
                background-color: #fff !important;
            }

            &:hover {
                color: var(--el-color-primary);
                background-color: #fff !important;
            }
        }

        :deep(.el-sub-menu) {
            margin-bottom: 8px;

            .el-sub-menu__title {
                height: 36px;
                margin: 0 8px 4px;
                /* 去掉组件库按层级加的左内边距，文字从 25px 图标槽后开始 */
                padding-left: 0 !important;
                border-radius: 2px;

                span {
                    font-size: 14px;
                    display: flex;
                    height: 36px;
                    align-items: center;
                }

                &:hover {
                    color: var(--el-color-primary);
                    background-color: #fff !important;
                }
            }

            .el-menu-item {
                /* 三级及更深的叶子没有图标，左内边距等于图标槽，文字与二级标题对齐 */
                padding-left: 25px !important;
                span{
                    margin-left: 0 !important;
                }
            }
            .el-sub-menu{
                .el-sub-menu__title{
                    margin: 0 8px 2px;
                    height: 40px;
                    /* 分组行自带 25px 图标，不再加左内边距，文字与二级标题对齐 */
                    padding-left: 0 !important;
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
            }
        }
    }
}
// 二级菜单折叠之后，弹窗样式
.el-menu--vertical.el-menu--popup-container{
    .el-menu--popup{
        padding: 8px;
        min-width: auto;
    }
    :deep(.el-menu-item), :deep(.el-sub-menu), :deep(.el-sub-menu){
        height: auto!important;
        padding: 10px;
        line-height: 1;
        color: #999;
        &.is-active{
            color: #333;
            background-color: transparent;
        }
        &:hover{
            background-color: var(--layout-side-hover-bg);
        }
    }
}

.logo-wrap {
    padding: 0;
    display: flex;
    white-space: nowrap;
    align-items: center;

    .logo {
        height: 100%;
        box-sizing: border-box;
    }

    .logo-title {
        flex: 1;
        width: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: var(--el-font-size-base);
    }
}
</style>
