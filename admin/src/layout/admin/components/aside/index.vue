<template>
    <aside :class="['layout-aside flex h-full box-border', { 'is-bright': !dark }]">
        <div :class="['one-menu flex flex-col box-border overflow-hidden', { 'is-expanded': systemStore.menuIsCollapse }]">
            <el-scrollbar class="one-menu__scrollbar">
                <div class="one-menu__list">
                    <template v-for="(item, index) in oneMenuData" :key="index">
                        <div
                            v-if="item.meta.show"
                            :title="item.meta.title || item.meta.short_title"
                            class="one-menu__item"
                            :class="{
                                'is-active': oneMenuActive === item.original_name,
                                'is-expanded': systemStore.menuIsCollapse
                            }"
                            @click="handleOneMenuClick(item)"
                        >
                            <div class="one-menu__icon">
                                <el-image v-if="item.meta.icon && isUrl(item.meta.icon)" class="one-menu__icon-image" :src="item.meta.icon" fit="contain" />
                                <icon v-else :name="resolveMenuIcon(item.meta.icon)" size="var(--cmp-admin-primary-icon-size)" />
                                <div v-if="item.name == 'app_store' && (recentlyUpdated.length > 0 || isNewVersion)" class="one-menu__badge"></div>
                            </div>
                            <div class="one-menu__label">{{ item.meta.short_title || item.meta.title }}</div>
                        </div>
                    </template>
                </div>
            </el-scrollbar>
        </div>

        <!-- 一级菜单下只有 1 个子菜单时，二级菜单面板纯属冗余（点击一级菜单已直达该页），不渲染，宽度让给内容区 -->
        <div v-if="showTwoMenu" class="two-menu flex flex-col">
            <el-scrollbar class="two-menu__scrollbar">
                <el-menu :key="oneMenuActive" :default-active="menuActive" :default-openeds="defaultOpeneds" :router="false" class="aside-menu">
                    <menu-item v-for="(route, index) in twoMenuData" :routes="route" :key="index" :isNewVersion="isNewVersion" />
                </el-menu>
            </el-scrollbar>
        </div>
    </aside>
</template>

<script lang="ts" setup>
import { watch, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuActive, useMenuJump, rollbackMenuActive, isBlankMenu } from '@/hooks/useMenuActive'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import { ADMIN_ROUTE,findFirstValidRoute } from "@/router/routers"
import { isUrl } from '@/utils/common'
import { resolveMenuIcon } from '@/utils/menu-icon'
import menuItem from './menu-item.vue'
import { getAddonLocal} from '@/app/api/addon'
import { getVersions } from "@/app/api/auth"
import { getFrameworkVersionList } from "@/app/api/module"

const route = useRoute()
const userStore = useUserStore()
const routers = userStore.routers
const systemStore = useSystemStore()
const router = useRouter()
const dark = computed(() => {
    return systemStore.dark
})

const logoUrl = computed(() => {
    return userStore.siteInfo.icon ? userStore.siteInfo.icon : systemStore.website.icon
})
const twoMenuData = ref<Record<string, any>[]>([])
const defaultOpeneds = ref<string[]>([]) // 默认打开的菜单项路径数组

const oneMenuData = ref<Record<string, any>[]>([])
routers.forEach(item => {
    item.original_name = item.name
    if (item.children && item.children.length) {
        item.name = findFirstValidRoute(item.children)
    }
    oneMenuData.value.push(item)
})

const oneMenuActive = ref(oneMenuData.value[0]?.name || '')

// 受控菜单高亮：点击需要新窗口打开的菜单后，高亮回滚到原菜单
const { menuActive } = useMenuActive()
const { handleMenuJump } = useMenuJump()

// 一级菜单点击：目录跳转到其第一个有效子菜单；单应用下一级叶子菜单同样支持新窗口打开
const handleOneMenuClick = (item: any) => {
    if (handleMenuJump(item.name, item.meta)) {
        rollbackMenuActive(oneMenuActive, oneMenuActive.value)
        return
    }
    router.push({ name: item.name })
}

/**
 * 一级菜单只有 1 个子菜单时不渲染二级面板；但该子菜单若是「新窗口打开」必须保留面板：
 * findFirstValidRoute 会跳过 is_blank 菜单，一级菜单的点击目标会变成空，该菜单将无法进入。
 */
const showTwoMenu = computed(() => {
    if (twoMenuData.value.length > 1) return true
    return twoMenuData.value.length === 1 && isBlankMenu(twoMenuData.value[0]?.meta)
})

watch(route, () => {
    twoMenuData.value = route.matched[2]?.children ?? []
    if (route.matched[1] && route.matched[2]) {
        oneMenuActive.value = route.matched[1].name == ADMIN_ROUTE.children[0]?.name ? route.matched[2].name : route.matched[1].name
    }
    // 开发（tool）下的菜单默认收起，其余一级菜单仍默认展开
    defaultOpeneds.value = oneMenuActive.value === 'tool' ? [] : twoMenuData.value.map(item => item.name)
}, { immediate: true })

const isNeedUpgrade = (currVersion: string, onlineVersion: string) => {
    if (isNaN(parseInt(onlineVersion.replaceAll('.', ''))) || isNaN(parseInt(currVersion.replaceAll('.', '')))) return false
    return parseInt(onlineVersion.replaceAll('.', '')) > parseInt(currVersion.replaceAll('.', ''))
}

const recentlyUpdated = ref([])
const localListFn = () => {
    getAddonLocal({}).then((res) => {
        const data = res.data.list
        recentlyUpdated.value = []
        for (const i in data) {
            if (data[i].install_info && Object.keys(data[i].install_info)?.length) {
                if (data[i].install_info.version != data[i].version && isNeedUpgrade(data[i].install_info.version, data[i].version)) {
                    recentlyUpdated.value.push(data[i])
                }
            }
        }
    }).catch(() => {
    })
}
localListFn()
const frameworkVersionList = ref([])
const isNewVersion = computed(() => {
    if (!newVersion.value || newVersion.value.version_no === version.value) {
        return false
    }
    return isNeedUpgrade(version.value, newVersion.value.version_no)
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
.layout-admin {
    .layout-aside {
        --cmp-admin-sidebar-bg: var(--sys-color-bg-surface);
        --cmp-admin-sidebar-border: var(--sys-color-border-default);
        --cmp-admin-icon-hover-scale: 1.1;
        --cmp-admin-icon-hover-stroke: 0.5px;
        --cmp-admin-icon-hover-stroke-svg: 36px;
        --cmp-admin-primary-width: 80px;
        --cmp-admin-primary-expanded-width: 105px;
        --cmp-admin-primary-padding-block: 8px;
        --cmp-admin-primary-item-width: 50px;
        --cmp-admin-primary-item-height: 50px;
        --cmp-admin-primary-item-expanded-height: 40px;
        --cmp-admin-primary-item-radius: var(--sys-radius-md);
        --cmp-admin-primary-item-gap: 3px;
        --cmp-admin-primary-item-padding-inline: 4px;
        --cmp-admin-primary-label-gap: 5px;
        --cmp-admin-primary-font-size: var(--sys-font-size-xs);
        --cmp-admin-primary-expanded-font-size: var(--sys-font-size-base);
        --cmp-admin-primary-icon-size: 17px;
        --cmp-admin-primary-text: var(--sys-color-text-regular);
        --cmp-admin-secondary-width: 172px;
        --cmp-admin-secondary-menu-padding-block: 8px;
        --cmp-admin-secondary-item-margin-inline: 8px;
        --cmp-admin-secondary-item-padding-inline: 12px;
        --cmp-admin-secondary-item-radius: var(--sys-radius-md);
        --cmp-admin-secondary-font-size: var(--sys-font-size-base);
        --cmp-admin-secondary-icon-size: 15px;
        --cmp-admin-secondary-icon-gap: 8px;
        --cmp-admin-secondary-indent-step: calc(var(--cmp-admin-secondary-icon-size) + var(--cmp-admin-secondary-icon-gap));
        flex: 0 0 auto;
        min-width: 0;
        background-color: var(--cmp-admin-sidebar-bg);
    }

    .one-menu {
        width: var(--cmp-admin-primary-width);
        padding: 0;
        overflow: hidden;
        background-color: var(--cmp-admin-sidebar-bg);
        border-right: 1px solid var(--cmp-admin-sidebar-border);
        transition: width 180ms ease;

        &.is-expanded {
            width: var(--cmp-admin-primary-expanded-width);
        }
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
        padding: var(--cmp-admin-primary-padding-block) 0;
    }

    .one-menu__item {
        --color: var(--cmp-admin-primary-text);
        display: flex;
        position: relative;
        box-sizing: border-box;
        flex: 0 0 auto;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--cmp-admin-primary-label-gap);
        width: var(--cmp-admin-primary-item-width);
        min-height: var(--cmp-admin-primary-item-height);
        margin: var(--cmp-admin-primary-item-gap) 0;
        padding: 6px var(--cmp-admin-primary-item-padding-inline);
        border-radius: var(--cmp-admin-primary-item-radius);
        color: var(--cmp-admin-primary-text);
        font-size: var(--cmp-admin-primary-font-size);
        line-height: 1;
        text-align: center;
        cursor: pointer;
        transition: color 160ms ease, background-color 160ms ease;

        &:hover {
            --color: var(--cmp-admin-primary-hover-text);
            color: var(--cmp-admin-primary-hover-text);
            background-color: var(--cmp-admin-primary-hover-bg);
        }

        &.is-active,
        &.is-active:hover {
            --color: var(--cmp-admin-primary-active-text);
            color: var(--cmp-admin-primary-active-text);
            background-color: var(--cmp-admin-primary-active-bg);
        }

        &.is-expanded {
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 8px;
            width: calc(100% - 15px);
            min-height: var(--cmp-admin-primary-item-expanded-height);
            padding: 0 10px;
            font-size: var(--cmp-admin-primary-expanded-font-size);
            text-align: left;
        }
    }

    .one-menu__icon {
        display: flex;
        position: relative;
        flex: 0 0 var(--cmp-admin-primary-icon-size);
        align-items: center;
        justify-content: center;
        width: var(--cmp-admin-primary-icon-size);
        height: var(--cmp-admin-primary-icon-size);
        color: currentColor;
        line-height: 1;
        transition: transform 200ms ease;
        transform-origin: center center;
        will-change: transform;
        -webkit-text-stroke: 0 currentColor;

        .icon,
        .el-icon,
        i {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            line-height: 1;
        }

        svg {
            stroke: currentColor;
            stroke-width: 0;
            transition: stroke-width 200ms ease;
        }
    }

    .one-menu__item:hover .one-menu__icon {
        transform: scale(var(--cmp-admin-icon-hover-scale));
        -webkit-text-stroke: var(--cmp-admin-icon-hover-stroke) currentColor;

        svg {
            stroke-width: var(--cmp-admin-icon-hover-stroke-svg);
        }
    }

    .one-menu__icon-image {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--cmp-admin-primary-icon-size);
        height: var(--cmp-admin-primary-icon-size);
        line-height: 1;
        overflow: hidden;
    }

    .one-menu__badge {
        position: absolute;
        top: -3px;
        right: -3px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: var(--sys-color-danger);
    }

    .one-menu__label {
        width: 100%;
        line-height: 1;
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
        width: var(--cmp-admin-secondary-width);
        min-width: var(--cmp-admin-secondary-width);
        overflow: hidden;
        background-color: var(--cmp-admin-sidebar-bg);
        border-right: 1px solid var(--cmp-admin-sidebar-border);
    }

    .two-menu .aside-menu {
        --el-menu-bg-color: transparent;
        --el-menu-hover-bg-color: var(--cmp-admin-secondary-hover-bg);
        --el-menu-text-color: var(--cmp-admin-secondary-text);
        --el-menu-active-color: var(--cmp-admin-secondary-active-text);
        width: 100%;
        padding: var(--cmp-admin-secondary-menu-padding-block) 0;
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
            height: var(--cmp-admin-secondary-item-height);
            margin: 2px var(--cmp-admin-secondary-item-margin-inline);
            padding: 0 var(--cmp-admin-secondary-item-padding-inline) !important;
            padding-left: calc(
                var(--cmp-admin-secondary-item-padding-inline) +
                var(--el-menu-level, 0) * var(--cmp-admin-secondary-indent-step)
            ) !important;
            border-radius: var(--cmp-admin-secondary-item-radius);
            color: var(--cmp-admin-secondary-text);
            font-size: var(--cmp-admin-secondary-font-size);
            line-height: var(--cmp-admin-secondary-item-height);
            transition: color 160ms ease, background-color 160ms ease;

            &:hover {
                color: var(--cmp-admin-secondary-text);
                background-color: var(--cmp-admin-secondary-hover-bg) !important;
            }
        }

        .el-menu-item.is-active {
            color: var(--cmp-admin-secondary-active-text);
            background-color: var(--cmp-admin-secondary-active-bg) !important;

            &:hover {
                color: var(--cmp-admin-secondary-active-text);
                background-color: var(--cmp-admin-secondary-active-bg) !important;
            }
        }

        .el-sub-menu.is-active > .el-sub-menu__title {
            color: var(--cmp-admin-secondary-active-text);

            > .el-sub-menu__icon-arrow {
                color: var(--cmp-admin-secondary-active-text);
            }

            &:hover {
                color: var(--cmp-admin-secondary-active-text);
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
            flex: 0 0 var(--cmp-admin-secondary-icon-size);
            align-items: center;
            justify-content: center;
            width: var(--cmp-admin-secondary-icon-size) !important;
            height: var(--cmp-admin-secondary-icon-size) !important;
            margin-right: var(--cmp-admin-secondary-icon-gap);
            color: currentColor;
            font-size: var(--cmp-admin-secondary-icon-size) !important;
            line-height: 1;
            transition: transform 200ms ease;
            transform-origin: center center;
            will-change: transform;
            -webkit-text-stroke: 0 currentColor;

            svg {
                stroke: currentColor;
                stroke-width: 0;
                transition: stroke-width 200ms ease;
            }
        }

        .el-menu-item:hover .aside-menu-icon,
        .el-sub-menu__title:hover .aside-menu-icon {
            transform: scale(var(--cmp-admin-icon-hover-scale));
            -webkit-text-stroke: var(--cmp-admin-icon-hover-stroke) currentColor;

            svg {
                stroke-width: var(--cmp-admin-icon-hover-stroke-svg);
            }
        }
    }
}
</style>
