<template>
    <div class="tab-bar" v-show="systemStore.tab">
        <!-- 标签页 -->
        <div class="tab-bar__list">
            <el-dropdown v-for="(tab, index) in tabs" :key="tab.name" trigger="contextmenu" placement="bottom-start">
                <div class="tab-item" :class="{ 'is-active': tab.name == route.name }" @click="clickTab(tab)">
                    <!-- 两个及以上标签时，标签之间显示间隔线 -->
                    <span v-if="index > 0 && tabbarStore.tabLength > 1" class="tab-item__divider"></span>
                    <template v-if="typeof tab.icon == 'string' && tab.icon">
                        <el-image v-if="isUrl(tab.icon)" class="tab-item__image" :src="tab.icon" fit="fill" />
                        <icon v-else class="tab-item__icon" :name="tab.icon" size="var(--cmp-tabbar-icon-size)" />
                    </template>
                    <span class="tab-item__title" :title="tab.title">{{ tab.title }}</span>
                    <span v-if="tabbarStore.tabLength > 1" class="tab-item__close" @click.stop="closeTab(tab.name, index)">
                        <icon name="element Close" size="var(--cmp-tabbar-close-icon-size)" />
                    </span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="Back" :disabled="index == 0" @click="closeLeft(tab.name)">{{ t('tabs.closeLeft') }}</el-dropdown-item>
                        <el-dropdown-item icon="Right" :disabled="index == (tabbarStore.tabLength - 1)" @click="closeRight(tab.name)">{{ t('tabs.closeRight') }}</el-dropdown-item>
                        <el-dropdown-item icon="Close" :disabled="tabbarStore.tabLength == 1" @click="closeOthers(tab.name)">{{ t('tabs.closeOther') }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

        <!-- 工具栏 -->
        <div class="tab-bar__toolbar">
            <el-dropdown trigger="click" @command="handleCommand">
                <div class="tab-bar__action" :title="t('tabs.more')">
                    <icon name="element Grid" size="var(--cmp-tabbar-action-icon-size)" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="current" icon="Close">{{ t('tabs.closeCurrent') }}</el-dropdown-item>
                        <el-dropdown-item command="others" icon="Close">{{ t('tabs.closeOther') }}</el-dropdown-item>
                        <el-dropdown-item command="all" icon="Delete">{{ t('tabs.closeAll') }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div class="tab-bar__action" :title="t('refresh')" @click="refresh">
                <icon name="element Refresh" size="var(--cmp-tabbar-action-icon-size)" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useTabbarStore from '@/stores/modules/tabbar'
import useSystemStore from '@/stores/modules/system'
import useAppStore from '@/stores/modules/app'
import useUserStore from '@/stores/modules/user'
import { findFirstValidRoute } from '@/router/routers'
import { isUrl } from '@/utils/common'
import { t } from '@/lang'
import { KEEP_CONTENT_SCROLL } from '@/layout/content-scroll'

const tabbarStore = useTabbarStore()
const systemStore = useSystemStore()
const appStore = useAppStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const tabs = computed(() => Object.values(tabbarStore.tabs))

onMounted(() => {
    tabbarStore.addTab(route)
})

watch(route, (nval: any) => {
    tabbarStore.addTab(nval)
})

/**
 * 切换标签页
 * @param tab
 */
const clickTab = (tab: any) => {
    if (tab.name == route.name) return
    router.push({ name: tab.name, query: tab.query, state: { [KEEP_CONTENT_SCROLL]: true } })
}

/**
 * 关闭标签页，关闭当前页时自动激活相邻标签
 * @param name
 * @param index
 */
const closeTab = (name: string, index: number) => {
    const names = Object.keys(tabbarStore.tabs)
    const nextName = names[index - 1] || names[index + 1]
    tabbarStore.removeTab(name)
    if (name == route.name && nextName) router.push({ name: nextName, state: { [KEEP_CONTENT_SCROLL]: true } })
}

/**
 * 关闭当前页
 */
const closeCurrent = () => {
    const names = Object.keys(tabbarStore.tabs)
    if (names.length <= 1) return
    const index = names.indexOf(route.name as string)
    index != -1 && closeTab(route.name as string, index)
}

/**
 * 关闭左侧
 * @param name
 */
const closeLeft = (name: string) => {
    tabbarStore.removeLeft(name)
    router.push({ name, state: { [KEEP_CONTENT_SCROLL]: true } })
}

/**
 * 关闭右侧
 * @param name
 */
const closeRight = (name: string) => {
    tabbarStore.removeRight(name)
    router.push({ name, state: { [KEEP_CONTENT_SCROLL]: true } })
}

/**
 * 关闭其他页
 * @param name
 */
const closeOthers = (name: string) => {
    tabbarStore.removeOthers(name)
    router.push({ name, state: { [KEEP_CONTENT_SCROLL]: true } })
}

/**
 * 关闭全部页，回到首个菜单
 */
const closeAll = () => {
    tabbarStore.clearTab()
    const firstRoute = findFirstValidRoute(userStore.routers)
    if (firstRoute && firstRoute != route.name) {
        router.push({ name: firstRoute })
    } else {
        // 当前已在首个菜单，手动补回标签，避免标签栏为空
        tabbarStore.addTab(route)
    }
}

/**
 * 工具栏操作
 * @param command
 */
const handleCommand = (command: string) => {
    const name = route.name as string
    if (!name) return
    if (command == 'current') {
        closeCurrent()
    } else if (command == 'others') {
        closeOthers(name)
    } else if (command == 'all') {
        closeAll()
    }
}

/**
 * 刷新当前页
 */
const refresh = () => {
    if (!appStore.routeRefreshTag) return
    appStore.refreshRouterView()
}
</script>

<style lang="scss" scoped>
.tab-bar {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: var(--cmp-tabbar-height);
    padding: 0 var(--cmp-tabbar-padding-inline);
    background-color: var(--cmp-tabbar-bg);
    border-bottom: 1px solid var(--cmp-tabbar-border);
    user-select: none;
}

.tab-bar__list {
    display: flex;
    align-items: stretch;
    align-self: stretch;
    flex: 1;
    min-width: 0;
    gap: var(--cmp-tabbar-gap);
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
}

.tab-item {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: var(--cmp-tabbar-item-gap);
    position: relative;
    padding: 0 var(--cmp-tabbar-item-padding-inline);
    font-size: var(--cmp-tabbar-item-font-size);
    color: var(--cmp-tabbar-item-text);
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: var(--cmp-tabbar-item-bg-hover);
        color: var(--cmp-tabbar-item-text-hover);
    }

    &.is-active {
        background-color: var(--cmp-tabbar-item-bg-active);
        color: var(--cmp-tabbar-item-text-active);
        font-weight: var(--sys-font-weight-medium);

        &::after {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            height: var(--cmp-tabbar-item-indicator-height);
            background-color: var(--cmp-tabbar-item-indicator);
            z-index: 2;
        }
    }

    &:focus {
        outline: none;
    }
}

/* 标签之间的间隔线（显示条件见模板：index > 0 且 标签数 > 1） */
.tab-item__divider {
    position: absolute;
    top: 25%;
    bottom: 25%;
    left: 0;
    width: 1px;
    background-color: var(--cmp-tabbar-item-divider);
}

.tab-item__icon {
    flex-shrink: 0;
}

.tab-item__image {
    flex-shrink: 0;
    width: var(--cmp-tabbar-icon-size);
    height: var(--cmp-tabbar-icon-size);
}

.tab-item__title {
    max-width: var(--cmp-tabbar-item-max-width);
    overflow: hidden;
    text-overflow: ellipsis;
}

.tab-item__close {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--cmp-tabbar-close-size);
    height: var(--cmp-tabbar-close-size);
    border-radius: var(--cmp-tabbar-close-radius);
    color: var(--cmp-tabbar-close-text);
    transition: all 0.2s ease;
}

/* 悬浮标签时关闭按钮加深 */
.tab-item:hover .tab-item__close {
    color: var(--cmp-tabbar-close-text-tab-hover);
}

/* 悬浮关闭按钮时保持原有反馈 */
.tab-item .tab-item__close:hover {
    background-color: var(--cmp-tabbar-close-bg-hover);
    color: var(--cmp-tabbar-close-text-hover);
}

/* 右侧工具栏 */
.tab-bar__toolbar {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: var(--cmp-tabbar-action-gap);
    height: var(--cmp-tabbar-toolbar-height);
    margin-left: var(--cmp-tabbar-toolbar-gap);
    padding-left: var(--cmp-tabbar-toolbar-gap);
    border-left: 1px solid var(--cmp-tabbar-toolbar-divider);
}

.tab-bar__action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--cmp-tabbar-action-size);
    height: var(--cmp-tabbar-action-size);
    border-radius: var(--cmp-tabbar-action-radius);
    color: var(--cmp-tabbar-action-text);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: var(--cmp-tabbar-action-bg-hover);
        color: var(--cmp-tabbar-action-text-hover);
    }
}
</style>
