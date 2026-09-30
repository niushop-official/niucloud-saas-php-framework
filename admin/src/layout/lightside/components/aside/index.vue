<template>
    <aside :class="['lightside-aside flex h-full box-border', { 'is-bright': !dark }]">
        <div :class="['one-menu flex flex-col box-border overflow-hidden', { 'is-expanded': systemStore.menuIsCollapse }]">
            <el-scrollbar class="one-menu__scrollbar">
                <div class="one-menu__list">
                    <template v-for="(item, index) in oneMenuData" :key="index">
                        <div
                            v-if="item.meta.show"
                            :title="item.meta.title || item.meta.short_title"
                            class="one-menu__item"
                            :class="{
                                'is-active': isOneMenuActive(item),
                                'is-expanded': systemStore.menuIsCollapse
                            }"
                            @click="router.push({ name: item.name })"
                        >
                            <div class="one-menu__icon">
                                <el-image v-if="item.meta.icon && isUrl(item.meta.icon)" class="one-menu__icon-image" :src="item.meta.icon" fit="contain" />
                                <icon v-else :name="resolveMenuIcon(item.meta.icon)" size="var(--cmp-lightside-primary-icon-size)" />
                            </div>
                            <div class="one-menu__label">{{ item.meta.short_title || item.meta.title }}</div>
                        </div>
                    </template>
                </div>
            </el-scrollbar>
        </div>

        <div v-if="twoMenuData.length" class="two-menu flex flex-col">
            <el-scrollbar class="two-menu__scrollbar">
                <el-menu :default-active="route.name" :router="true" class="aside-menu">
                    <menu-item v-for="(route, index) in twoMenuData" :routes="route" :key="index" :isNewVersion="isNewVersion" />
                </el-menu>
            </el-scrollbar>
        </div>
    </aside>
</template>
 
<script lang="ts" setup>
import { watch, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import { findFirstValidRoute, formatRouters } from "@/router/routers"
import { useMenuActive, useMenuJump, rollbackMenuActive } from '@/hooks/useMenuActive'
import { isUrl } from '@/utils/common'
import { resolveMenuIcon } from '@/utils/menu-icon'
import menuItem from './menu-item.vue'
import { getVersions } from "@/app/api/auth"
import { getFrameworkVersionList } from "@/app/api/module"
import storage from '@/utils/storage'

const route = useRoute()
const userStore = useUserStore()
const routers = userStore.routers
const systemStore = useSystemStore()
const siteInfo = userStore.siteInfo
const router = useRouter()
const addonRouters: Record<string, any> = {}
const addonIndexRoute = userStore.addonIndexRoute
const dark = computed(() => {
    return systemStore.dark
})

const twoMenuData = ref<Record<string, any>[]>([])
const oneMenuData = ref<Record<string, any>[]>([])
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

const oneMenuActive = ref(route.matched[1].name)

// 当前路由链上的所有路由名，用于兜底判断一级菜单选中
const matchedRouteNames = computed(() => route.matched.map(item => item.name).filter(Boolean) as string[])

/**
 * 一级菜单选中判断
 * oneMenuActive 依赖 route.matched 的固定层级取值，层级不一致的场景（平台端、多应用、带 menu_attr 的菜单等）会取不到值，
 * 这里退化为“当前路由链是否包含该菜单路由”，保证一级菜单始终有选中态
 */
const isOneMenuActive = (item: Record<string, any>) => {
    if (oneMenuActive.value && oneMenuActive.value === item.original_name) return true
    return [item.original_name, item.name].some(name => !!name && matchedRouteNames.value.includes(name))
}

const activeOneMenuTitle = computed(() => {
    const activeItem = oneMenuData.value.find(item => isOneMenuActive(item))
    return activeItem?.meta?.title || activeItem?.meta?.short_title || ''
})
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
    // 兜底：固定层级取不到二级菜单时（平台端/多应用/单应用的层级不一致），
    // 回退为当前选中一级菜单自身的子菜单，避免一级菜单已选中但二级菜单为空
    if (!twoMenuData.value?.length) {
        const activeItem = oneMenuData.value.find(item => isOneMenuActive(item))
        twoMenuData.value = activeItem?.children?.length ? activeItem.children : []
    }
    // const addonKeys = storage.get('defaultAppList')
    // const addonAllKeys = getAddonAllKeys(addonKeys)
    // twoMenuData.value = twoMenuData.value.filter((child) =>{
    //     return !child.name || !addonAllKeys.includes(child.name);
    // })
    // if(oneMenuActive.value == 'addon'){
    //     // 处理特殊菜单并插入到 twoMenuData 中（与 addon_list 同级）
    //     const processedSpecialMenus = handleSpecialMenus();
    //         if (processedSpecialMenus.length) {
    //         // 先找到 addon_list 在 twoMenuData 中的索引
    //         const addonListIndex = twoMenuData.value.findIndex(
    //             (item) => item.name === 'addon_list'
    //         );
    //         if (addonListIndex !== -1) {
    //             // 将特殊菜单插入到 addon_list 后面（同级）
    //             twoMenuData.value.splice(
    //             addonListIndex + 1,
    //             0,
    //             ...processedSpecialMenus
    //             );
    //         } else {
    //             // 如果没有 addon_list，直接将特殊菜单添加到 twoMenuData 中
    //             twoMenuData.value.push(...processedSpecialMenus);
    //         }
    //     }
    // }
}, { immediate: true })

const frameworkVersionList = ref([])
const isNewVersion = computed(() => {
    if (!newVersion.value || newVersion.value.version_no === version.value) {
        return false;
    }

    // 将版本号转为字符串再处理
    const currentVersionStr = String(version.value);
    const latestVersionStr = String(newVersion.value.version_no);
    // 移除点号并转为数字比较
    const currentVersionNum = parseInt(currentVersionStr.replace(/\./g, ''), 10);
    const latestVersionNum = parseInt(latestVersionStr.replace(/\./g, ''), 10);
    return latestVersionNum > currentVersionNum;
})

const getFrameworkVersionListFn = () => {
    getFrameworkVersionList().then(({ data }) => {
        frameworkVersionList.value = data
    }).catch(() => {
    })
}
getFrameworkVersionListFn()

const newVersion: any = computed(() => {
    return frameworkVersionList.value.length ? frameworkVersionList.value[0] : null
})
const version = ref('')
const getVersionsInfo = () => {
    getVersions().then((res) => {
        version.value = res.data.version.version
    })
}
getVersionsInfo()

</script>

<style lang="scss">
.layout-lightside {
    .lightside-aside {
        flex: 0 0 auto;
        min-width: 0;
        background-color: var(--cmp-lightside-sidebar-bg);
    }

    .one-menu {
        width: var(--cmp-lightside-primary-width);
        padding: 0;
        overflow: hidden;
        background-color: var(--cmp-lightside-sidebar-bg);
        border-right: 1px solid var(--cmp-lightside-sidebar-border);
        transition: width 180ms ease;

        &.is-expanded {
            width: var(--cmp-lightside-primary-expanded-width);
        }
    }

    .two-menu__title {
        box-sizing: border-box;
        flex: 0 0 var(--cmp-lightside-header-height);
        height: var(--cmp-lightside-header-height);
        border-bottom: 1px solid var(--cmp-lightside-sidebar-border);
    }

    .one-menu__scrollbar,
    .two-menu__scrollbar {
        flex: 1;
        min-height: 0;
    }

    .one-menu__list {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: var(--cmp-lightside-primary-padding-block) 0;
    }

    .one-menu__item {
        --color: var(--cmp-lightside-primary-icon);
        display: flex;
        position: relative;
        box-sizing: border-box;
        flex: 0 0 auto;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--cmp-lightside-primary-label-gap);
        width: var(--cmp-lightside-primary-item-width);
        min-height: var(--cmp-lightside-primary-item-height);
        margin: var(--cmp-lightside-primary-item-gap) 0;
        padding: 6px var(--cmp-lightside-primary-item-padding-inline);
        border-radius: var(--cmp-lightside-primary-item-radius);
        color: var(--cmp-lightside-primary-text);
        font-size: var(--cmp-lightside-primary-font-size);
        line-height: 1.25;
        text-align: center;
        cursor: pointer;
        transition: color 160ms ease, background-color 160ms ease;

        &:hover {
            --color: var(--cmp-lightside-primary-hover-text);
            color: var(--cmp-lightside-primary-hover-text);
            background-color: var(--cmp-lightside-primary-hover-bg);
        }

        &.is-active,
        &.is-active:hover {
            --color: var(--cmp-lightside-primary-active-text);
            color: var(--cmp-lightside-primary-active-text);
            background-color: var(--cmp-lightside-primary-active-bg);
        }

        &.is-expanded {
            flex-direction: row;
            justify-content: flex-start;
            gap: 8px;
            width: calc(100% - 15px);
            min-height: var(--cmp-lightside-primary-item-expanded-height);
            padding: 0 10px;
            font-size: var(--cmp-lightside-primary-expanded-font-size);
            text-align: left;
        }
    }

    .one-menu__icon {
        display: flex;
        flex: 0 0 var(--cmp-lightside-primary-icon-size);
        align-items: center;
        justify-content: center;
        width: var(--cmp-lightside-primary-icon-size);
        height: var(--cmp-lightside-primary-icon-size);
        color: currentColor;
        transition: transform 200ms ease;
        transform-origin: center center;
        will-change: transform;
        // 字体图标加粗：常态无描边，hover 时叠加描边
        -webkit-text-stroke: 0 currentColor;

        // Element SVG 图标加粗：常态描边宽度为 0
        svg {
            stroke: currentColor;
            stroke-width: 0;
            transition: stroke-width 200ms ease;
        }
    }

    .one-menu__item:hover .one-menu__icon {
        transform: scale(var(--cmp-lightside-icon-hover-scale));
        -webkit-text-stroke: var(--cmp-lightside-icon-hover-stroke) currentColor;

        svg {
            stroke-width: var(--cmp-lightside-icon-hover-stroke-svg);
        }
    }

    .one-menu__icon-image {
        width: var(--cmp-lightside-primary-icon-size);
        height: var(--cmp-lightside-primary-icon-size);
        overflow: hidden;
    }

    .one-menu__label {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .one-menu__item.is-expanded .one-menu__label {
        width: auto;
        min-width: 0;
        flex: 1;
    }

    .two-menu {
        width: var(--cmp-lightside-secondary-width);
        min-width: var(--cmp-lightside-secondary-width);
        overflow: hidden;
        background-color: var(--cmp-lightside-sidebar-bg);
        border-right: 1px solid var(--cmp-lightside-sidebar-border);
    }

    .two-menu__title {
        display: flex;
        align-items: center;
        padding: 0 var(--cmp-lightside-secondary-title-padding-inline);
        overflow: hidden;
        color: var(--cmp-lightside-secondary-title-text);
        font-size: var(--cmp-lightside-secondary-title-font-size);
        font-weight: var(--cmp-lightside-secondary-title-font-weight);
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .two-menu .aside-menu {
        --el-menu-bg-color: transparent;
        --el-menu-hover-bg-color: var(--cmp-lightside-secondary-hover-bg);
        --el-menu-text-color: var(--cmp-lightside-secondary-text);
        --el-menu-active-color: var(--cmp-lightside-secondary-active-text);
        width: 100%;
        padding: var(--cmp-lightside-secondary-menu-padding-block) 0;
        border: 0;
        background-color: transparent;

        .el-menu {
            overflow: hidden;
            border: 0;
            background-color: transparent;
        }

        .el-menu-item,
        .el-sub-menu__title {
            box-sizing: border-box;
            height: var(--cmp-lightside-secondary-item-height);
            margin: 2px var(--cmp-lightside-secondary-item-margin-inline);
            padding: 0 var(--cmp-lightside-secondary-item-padding-inline) !important;
            // 层级缩进：每深一层多一个图标位；
            // 依赖 Element Plus 注入的 --el-menu-level（一级为 0），
            // 标题行（有子菜单）与同级菜单项（无子菜单）缩进完全一致
            padding-left: calc(
                var(--cmp-lightside-secondary-item-padding-inline) +
                var(--el-menu-level, 0) * var(--cmp-lightside-secondary-indent-step)
            ) !important;
            border-radius: var(--cmp-lightside-secondary-item-radius);
            color: var(--cmp-lightside-secondary-text);
            font-size: var(--cmp-lightside-secondary-font-size);
            line-height: var(--cmp-lightside-secondary-item-height);
            transition: color 160ms ease, background-color 160ms ease;

            &:hover {
                color: var(--cmp-lightside-secondary-text);
                background-color: var(--cmp-lightside-secondary-hover-bg) !important;
            }
        }

        .el-menu-item.is-active {
            color: var(--cmp-lightside-secondary-active-text);
            background-color: var(--cmp-lightside-secondary-active-bg) !important;

            &:hover {
                color: var(--cmp-lightside-secondary-active-text);
                background-color: var(--cmp-lightside-secondary-active-bg) !important;
            }
        }

        // 子菜单内有激活项时，仅高亮父级文字；填充背景留给真正的激活叶子项。
        .el-sub-menu.is-active > .el-sub-menu__title {
            color: var(--cmp-lightside-secondary-active-text);

            &:hover {
                color: var(--cmp-lightside-secondary-active-text);
            }
        }

        .el-sub-menu__icon-arrow {
            right: 12px;
            color: var(--sys-color-text-placeholder);
            font-size: 12px;
            transition: transform 180ms ease;
        }

        .aside-menu-icon {
            --color: currentColor;
            display: flex;
            flex: 0 0 var(--cmp-lightside-secondary-icon-size);
            align-items: center;
            justify-content: center;
            width: var(--cmp-lightside-secondary-icon-size) !important;
            height: var(--cmp-lightside-secondary-icon-size) !important;
            margin-right: var(--cmp-lightside-secondary-icon-gap);
            color: currentColor;
            font-size: var(--cmp-lightside-secondary-icon-size) !important;
            // 菜单项行高为 item-height，需重置为 1，否则字体图标按行框居中会整体下移
            line-height: 1;
            transition: transform 200ms ease;
            transform-origin: center center;
            will-change: transform;
            // 字体图标加粗：常态无描边，hover 时叠加描边
            -webkit-text-stroke: 0 currentColor;

            // Element SVG 图标加粗：常态描边宽度为 0
            svg {
                stroke: currentColor;
                stroke-width: 0;
                transition: stroke-width 200ms ease;
            }
        }

        .el-menu-item:hover .aside-menu-icon,
        .el-sub-menu__title:hover .aside-menu-icon {
            transform: scale(var(--cmp-lightside-icon-hover-scale));
            -webkit-text-stroke: var(--cmp-lightside-icon-hover-stroke) currentColor;

            svg {
                stroke-width: var(--cmp-lightside-icon-hover-stroke-svg);
            }
        }
    }
}
</style>
