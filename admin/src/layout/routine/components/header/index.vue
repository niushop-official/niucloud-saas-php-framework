<template>
  <el-container :class="['h-full bg-[var(--layout-header-bg)]',{'layout-header border-b border-color': !dark}]" >
    <div class="flex items-center h-full px-[10px] w-full box-border">
        <div class="left-panel h-full flex items-center">
            <el-header class="logo-wrap flex items-center justify-center w-[190px]">
                <div class="flex items-center justify-center min-w-0 max-w-full">
                    <div class="logo flex items-center shrink-0" v-if="!systemStore.menuIsCollapse">
                        <el-image style="width: 30px; height: 30px" class="rounded-[6px]" :src="img(logoUrl ? logoUrl : '' )" fit="contain">
                            <template #error>
                                <div class="flex justify-center items-center w-full h-[30px] rounded-[6px]"><img class="max-w-[30px]" src="@/app/assets/images/icon-addon.png" alt=""  object-fit="contain"></div>
                            </template>
                        </el-image>
                    </div>
                    <div class="logo flex items-center justify-center shrink-0" v-else>
                        <i class="text-3xl iconfont iconyunkongjian"></i>
                    </div>
                    <!-- 店铺名称 -->
                    <div class="ml-[10px] text-[20px] text-[#333] min-w-0 using-hidden">{{siteInfo.site_name}}</div>
                </div>
            </el-header>
        </div>
        <div class="flex items-center gap-[8px] h-[var(--layout-header-height)] text-[var(--layout-header-text-color)]">
            <template v-for="(item, index) in oneMenuData" :key="index">
                <div v-if="item.meta.show" class="flex items-center cursor-pointer" @click="handleJump(item.name)">
                    <span class="px-[14px] truncate text-[14px] text-[#333] h-[60px] leading-[60px] rounded-[4px] hover:text-primary"  :class="{ '!text-primary font-bold oneMenu': oneMenuActive === item.original_name }">{{item.meta.short_title || item.meta.title }}</span>
                </div>
            </template>
        </div>
        <div class="ml-auto right-panel h-full flex items-center justify-end">
            <div class="flex items-center flex-shrink-0 hidden-xs-only">
                <el-dropdown trigger="hover" :hide-on-click="false" popper-class="site-info-wrap" class="mr-[8px]">
                    <!-- 状态 -->
                    <div class="mx-[8px] bg-[#f6f6f6] border-[1px] border-solid border-[#eee] rounded-[4px] px-[9px] py-[6px] flex items-center">
                        <span class="mr-[6px] text-[12px] !text-[#333]">{{ siteInfo.site_name }}</span>
                        <span class="!text-[10px] text-[#f56c6c]" :class="{'!text-[#67c23a]': siteInfo.status == 1, '!text-[#f56c6c]': siteInfo.status == 3}">{{ siteInfo.status_name }}</span>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <!-- 站点id -->
                                <div class="text-[14px]">站点编号：{{siteInfo.site_id}}</div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <!-- 到期时间 -->
                                <div v-if="siteInfo.expire_time == 0" class="text-[14px]">到期时间：永久</div>
                                <div v-else class="text-[14px]">到期时间：{{ siteInfo.expire_time }}</div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <!-- 菜单搜索 -->
            <div class="navbar-item flex items-center h-full cursor-pointer">
                <menu-search />
            </div>
            <!-- 预览 只有站点时展示-->
            <visit-channel class="navbar-item text-[#333]" />
            <i class="navbar-item iconfont iconlingdang-xianxing cursor-pointer text-[#333]" :title="t('newInfo')" v-if="appType == 'site'"></i>
            <!-- 任务指示器：有进行中的任务时图标转动，悬浮可查看进度并进入详情 -->
            <div class="navbar-item flex items-center h-full cursor-pointer" @click="openTaskIndicator">
                <task-indicator ref="taskIndicatorRef" />
            </div>
            <!-- 布局设置 -->
            <div class="navbar-item flex items-center h-full cursor-pointer" @click="openLayoutSetting">
                <layout-setting ref="layoutSettingRef" icon-color="#333" />
            </div>
            <!-- 用户信息 -->
            <div class="navbar-item flex items-center h-full cursor-pointer" @click="openUserInfo">
                <user-info ref="userInfoRef" />
            </div>
        </div>
    </div>
    <input type="hidden" v-model="comparisonToken">
    <input type="hidden" v-model="comparisonSiteId">

    <el-dialog v-model="detectionLoginDialog" :title="t('layout.detectionLoginTip')" width="30%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :append-to-body="true">
        <span>{{ t('layout.detectionLoginContent') }}</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="detectionLoginFn">{{ t('layout.detectionLoginOperation') }}</el-button>
            </span>
        </template>
    </el-dialog>
  </el-container>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch } from 'vue'
import layoutSetting from '@/layout/components/layout-setting/index.vue'
import menuSearch from '@/layout/components/menu-search/index.vue'
import taskIndicator from '@/layout/components/task-indicator/index.vue'
import userInfo from './user-info.vue'
import visitChannel from '@/components/visit-channel/index.vue'
import { useFullscreen } from '@vueuse/core'
import useSystemStore from '@/stores/modules/system'
import useAppStore from '@/stores/modules/app'
import useUserStore from '@/stores/modules/user'
import { useRoute, useRouter } from 'vue-router'
import { findFirstValidRoute, formatRouters } from '@/router/routers'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { useMenuJump } from '@/hooks/useMenuActive'
import storage from '@/utils/storage'

const appType = storage.get('app_type')
const taskIndicatorRef = ref()
const layoutSettingRef = ref()
const userInfoRef = ref()
const openTaskIndicator = () => taskIndicatorRef.value?.open()
const openLayoutSetting = () => layoutSettingRef.value?.open()
const openUserInfo = () => userInfoRef.value?.open()
const { toggle: toggleFullscreen } = useFullscreen()
const systemStore = useSystemStore()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const { handleMenuJump } = useMenuJump()
const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)

const userStore = useUserStore()
const siteInfo:any = computed(() => {
    return userStore.siteInfo
})
const addonIndexRoute = userStore.addonIndexRoute

const dark = computed(() => {
    return systemStore.dark
})
const isMenuSearch = ref(false)
const routers = userStore.routers

const logoUrl = computed(() => {
    return userStore.siteInfo.logo ? userStore.siteInfo.logo : systemStore.website.logo
})

// 检测登录 start
const detectionLoginDialog = ref(false)
const comparisonToken = ref('')
const comparisonSiteId = ref('')
if (storage.get('comparisonTokenStorage')) {
    comparisonToken.value = storage.get('comparisonTokenStorage')
    // storage.remove(['comparisonTokenStorage']);
}
if (storage.get('comparisonSiteIdStorage')) {
    comparisonSiteId.value = storage.get('comparisonSiteIdStorage')
    // storage.remove(['comparisonSiteIdStorage']);
}
// 监听标签页面切换
document.addEventListener('visibilitychange', e => {
    if (document.visibilityState === 'visible' && (comparisonSiteId.value != storage.get('siteId') || comparisonToken.value != storage.get('token'))) {
        detectionLoginDialog.value = true
    }
})

const detectionLoginFn = () => {
    detectionLoginDialog.value = false
    location.href = `${location.origin}/site/`
}
// 检测登录 end

const specialMenuNames = ref<string[]>([])
const specialMenuNamesLevel1 = ref<string[]>([])

onMounted(() => {
    const processedSpecialMenus = handleSpecialMenus()
    specialMenuNames.value = collectSpecialMenuNames(processedSpecialMenus)
    specialMenuNamesLevel1.value = collectSpecialMenuNamesLevel1(processedSpecialMenus)
    storage.set({ key: 'specialMenuNames', data: specialMenuNames.value })
    storage.set({ key: 'specialMenuNamesLevel1', data: specialMenuNamesLevel1.value })
    // 监听窗体宽度变化
    window.onresize = () => {
        return (() => {
            screenWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        })()
    }
})

/* 一级菜单 */
const oneMenuData = ref<Record<string, any>[]>([])
const addonRouters: Record<string, any> = {}
routers.forEach(item => {
    item.original_name = item.name
    if (item.meta.addon == '') {
        if (item.meta.attr == '') {
            if (item.children && item.children.length) {
                item.name = findFirstValidRoute(item.children)
            }
            oneMenuData.value.push(item)
        }
    } else if (item.meta.addon != '' && siteInfo.value?.apps.length <= 1 && siteInfo.value?.apps[0].key == item.meta.addon && item.meta.show) {
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
    oneMenuData.value.sort((a, b) => {
        if (a.meta.sort && b.meta.sort) {
            return b.meta.sort - a.meta.sort
        } else if (a.meta.sort) {
            return -1
        } else if (b.meta.sort) {                               
            return 1
        } else {
            return 0
        }
    })
})
// 多应用时将应用插入菜单
if (siteInfo.value?.apps.length > 1) {
    const routers:Record<string, any>[] = []
    siteInfo.value?.apps.forEach((item: Record<string, any>) => {
        if (addonRouters[item.key]) {
            addonRouters[item.key].name = addonIndexRoute[item.key]
            routers.push(addonRouters[item.key])
        }
    })
    oneMenuData.value.unshift(...routers)

    // 排序, 功能正确，改了排序后需要把菜单排序的默认值重新调整一下【多应用一级菜单，单应用二级菜单】
    oneMenuData.value.sort((a, b) => {
        if (a.meta.sort && b.meta.sort) {
            return b.meta.sort - a.meta.sort
        } else if (a.meta.sort) {
            return -1
        } else if (b.meta.sort) {                               
            return 1
        } else {
            return 0
        }
    })
}
const oneMenuActive = ref(oneMenuData.value[0]?.name || '')

watch(route, () => {
    if (route.meta.attr != '') {
        oneMenuActive.value = route.matched[1].name
    } else {
        // 多应用
        if (siteInfo.value?.apps.length > 1) {
            oneMenuActive.value = route.matched[2].name
        } else {
            // 单应用
            const oneMenu = route.matched[2]
            if (oneMenu.meta.addon == '') {
                oneMenuActive.value = route.matched[2].name
            } else {
                if (oneMenu.meta.addon == siteInfo.value?.apps[0].key) {
                    oneMenuActive.value = route.matched[3].name
                } else {
                    oneMenuActive.value = route.matched[2].name
                }
            }
        }
    }
}, { immediate: true })

// 统一处理跳转逻辑
const handleJump = (routeName: string) => {
    // 检查目标路由是否在特殊菜单列表中
    const isInSpecialMenus = specialMenuNames.value.includes(routeName)
    // 核心逻辑：如果不在特殊菜单中，就删除activeAppKey
    if (!isInSpecialMenus) {
        storage.remove('activeAppKey')
    } else {
    }
    // 需要新窗口打开的菜单：新开标签页，当前页面不跳转
    const target = oneMenuData.value.find(menu => menu.name === routeName)
    if (handleMenuJump(routeName, target?.meta)) return

    // 执行跳转
    router.push({ name: routeName })
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

const getParentTitleChain = (meta:any) => {
    const titles = []
    let current = meta?.parent_route

    while (current) {
        if (current.short_title) {
            titles.unshift(current.short_title)
        }
        current = current.parent_route
    }

    return titles.join(' - ')
}
const flattenRoutes = (routes:any, parent = null)=> {
    let flat: any = []
    routes.forEach(route => {
        const { path, name, meta = {}, short_title, children } = route
        const isLeaf = meta.type == 1 && meta.show == 1
        if (isLeaf) {
            const title = meta.title || short_title || ''
            const parentTitleChain = getParentTitleChain(meta)
            const fullTitle = parentTitleChain ? `${parentTitleChain} - ${title}` : title
            const item = {
                path,
                name,
                title,
                parent_title: parentTitleChain,
                full_title: fullTitle
            }

            flat.push(item)
        }
        if (children && children.length > 0) {
            flat = flat.concat(flattenRoutes(children, route))
        }
    })

    return flat
}
const flatRoutes = flattenRoutes(routers)
const selectedRoute = ref('')
const handleRouteSelect = (name:any) => {
    if (name) {
        router.push({ name })
        isMenuSearch.value = false
    }
}

</script>
<style scoped>
:root,
body {
    --layout-header-bg: #fff;
    --layout-header-height: 44px;
    --layout-header-text-color: #333;
    --layout-header-text-hover: #fff;
    --layout-header-text-selected: rgba(0, 0, 0, .2);
}
</style>

<style lang="scss" scoped>
.layout-header{
  position: relative;
  z-index: 5;
  box-shadow: 0px 0px 4px 0px rgba(0,145,255,0.1);
}
.oneMenu{
    position: relative;
    &::after{
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 2px;
        height: 3px;
        background-color: var(--el-color-primary);
    }
}
.navbar-item {
    --navbar-hit-x: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 5px;
    border-radius: 4px;
    box-sizing: border-box;
    &:hover {
        background-color: var(--layout-header-text-hover);
    }
}
.index-item {
  border: 1px solid;
  border-color: var(--el-color-primary);
  &:hover {
    color: #fff;
    background-color: var(--el-color-primary);
  }
}

</style>
