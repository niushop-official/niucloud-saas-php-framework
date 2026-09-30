<template>
    <el-container class="layout-lightside__header w-full flex items-center justify-between">
        <div class="left-panel flex min-w-0 items-center text-[14px] leading-[1]">
                <!-- 站点 logo：顶栏左侧，与左侧一级菜单栏宽度对齐 -->
                <div class="header-logo" :class="{ 'is-expanded': systemStore.menuIsCollapse }">
                    <el-image class="header-logo__image" :src="img(systemStore.menuIsCollapse ? longLogoUrl : logoUrl)" fit="contain">
                        <template #error>
                            <img src="@/app/assets/images/logo.default.png" alt="" />
                        </template>
                    </el-image>
                </div>
                <div class="navbar-item flex items-center h-full cursor-pointer" @click="toggleMenuCollapse">
                    <icon name="element Fold" v-if="systemStore.menuIsCollapse" />
                    <icon name="element Expand" v-else />
                </div>
                <!-- 面包屑导航 -->
                <div class="flex items-center h-full pl-[10px] hidden-xs-only">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item v-for="(route, index) in breadcrumb" :key="index" :to="route.path" class="inter">{{route.meta.title }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
        </div>
        <!-- <div>
            <el-input placeholder="搜索站点或应用"  v-model.trim="keywords" />
        </div> -->

        <div>
            <div class="right-panel h-full flex items-center justify-end">
                <div class="flex items-center flex-shrink-0 hidden-xs-only">
                    <el-dropdown trigger="hover" :hide-on-click="false" popper-class="site-info-wrap" class="mr-[8px]">
                        <!-- 状态：圆点表示站点状态（正常为绿，其余为红），悬浮可见状态文案 -->
                        <div class="site-status flex items-center" :title="siteInfo.status_name">
                            <span class="site-status__dot" :class="siteInfo.status == 1 ? 'is-success' : 'is-danger'"></span>
                            <span class="site-status__name">{{ siteInfo.site_name }}</span>
                            <icon name="element ArrowDown" size="14px" color="var(--sys-color-text-placeholder)" class="site-status__arrow" />
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
                <!-- 菜单搜索：浅色填充入口，宽度固定，点击打开搜索弹窗 -->
                <div class="header-search flex items-center h-full">
                    <menu-search />
                </div>
                <!-- 分隔线：搜索框与右侧功能图标组 -->
                <span class="header-divider"></span>
                <!-- 预览 只有站点时展示-->
                <visit-channel class="navbar-item" />
                <i class="navbar-item iconfont iconlingdang-xianxing cursor-pointer" :title="t('newInfo')" v-if="appType == 'site'"></i>
                <!-- 切换语言 -->
                <!-- <div class="navbar-item flex items-center h-full cursor-pointer">
                    <switch-lang />
                </div> -->
                <!-- 切换全屏 -->
                <!-- <div class="navbar-item flex items-center h-full cursor-pointer" @click="toggleFullscreen">
                    <icon name="iconfont icontuichuquanping" v-if="isFullscreen" />
                    <icon name="iconfont iconquanping" v-else />
                </div> -->
                <!-- 任务指示器：有进行中的任务时图标转动，悬浮可查看进度并进入详情 -->
                <div class="navbar-item flex items-center h-full cursor-pointer" @click="openTaskIndicator">
                    <task-indicator ref="taskIndicatorRef" />
                </div>
                <!-- 布局设置 -->
                <div class="navbar-item flex items-center h-full cursor-pointer" @click="openLayoutSetting">
                    <layout-setting ref="layoutSettingRef" :show-tab="true" />
                </div>
                <!-- 分隔线：功能图标组与用户信息 -->
                <span class="header-divider"></span>
                <!-- 用户信息 -->
                <div class="navbar-item navbar-item--user flex items-center h-full cursor-pointer" @click="openUserInfo">
                    <user-info ref="userInfoRef" />
                </div>
            </div>
        </div>

        <input type="hidden" v-model="comparisonToken" />
        <input type="hidden" v-model="comparisonSiteId" />

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
import { ref, computed } from 'vue'
import useUserStore from '@/stores/modules/user'
import useSystemStore from '@/stores/modules/system'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@/lang'
import storage from '@/utils/storage'
import { img } from '@/utils/common'
import userInfo from './user-info.vue'
import visitChannel from '@/components/visit-channel/index.vue'
import layoutSetting from '@/layout/components/layout-setting/index.vue'
import taskIndicator from '@/layout/components/task-indicator/index.vue'
import menuSearch from '@/layout/components/menu-search/index.vue'

const systemStore = useSystemStore()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const routers = userStore.routers
const siteInfo:any = computed(() => {
    return userStore.siteInfo
})

// 顶栏 logo：收起时显示方形 logo，展开时显示长 logo
const logoUrl = computed(() => {
    return userStore.siteInfo.icon ? userStore.siteInfo.icon : systemStore.website.icon
})
const longLogoUrl = computed(() => {
    return userStore.siteInfo.logo ? userStore.siteInfo.logo : systemStore.website.logo
})

// 检测登录 start
const detectionLoginDialog = ref(false)
const comparisonToken = ref('')
const comparisonSiteId = ref('')
if (storage.get('comparisonTokenStorage')) {
    comparisonToken.value = storage.get('comparisonTokenStorage')
}
if (storage.get('comparisonSiteIdStorage')) {
    comparisonSiteId.value = storage.get('comparisonSiteIdStorage')
}
// 监听标签页面切换
document.addEventListener('visibilitychange', e => {
    if (document.visibilityState === 'visible' && (comparisonSiteId.value != storage.get('siteId') || comparisonToken.value != storage.get('token'))) {
        detectionLoginDialog.value = true
    }
})

const getParentTitleChain = (meta: any) => {
    let titles = []
    let current = meta?.parent_route

    while (current) {
        if (current.short_title) {
        titles.unshift(current.short_title)
        }
        current = current.parent_route
    }

    return titles.join(' - ');
};

// 2. 改造 flattenRoutes：增加 parentShow 参数，传递父级 show 状态
const flattenRoutes = (routes: any, parent = null, parentShow = 1) => {
    let flat = [];

    routes.forEach(route => {
        const { path, name, meta = {}, short_title, children } = route;
        // 关键：当前菜单的最终 show 状态 = 自身 show（默认1） && 父级 show（默认1）
        // 若父级 show 不是1，当前菜单直接隐藏，不加入列表
        const currentShow = meta.show === undefined ? 1 : meta.show;
        const finalShow = currentShow && parentShow; // 父级隐藏则子级必隐藏

        // 叶子节点判断：type=1 + 最终 show=1（父级+自身都显示）
        const isLeaf = meta.type === 1 && finalShow === 1;

        if (isLeaf) {
        const title = meta.title || short_title || '';
        const parentTitleChain = getParentTitleChain(meta);
        const fullTitle = parentTitleChain ? `${parentTitleChain} - ${title}` : title;
        const item = {
            path,
            name,
            title,
            parent_title: parentTitleChain,
            full_title: fullTitle
        };
        flat.push(item);
        }

        // 递归处理子菜单：传递当前菜单的 finalShow 作为子级的 parentShow
        if (children && children.length > 0) {
        flat = flat.concat(flattenRoutes(children, route, finalShow));
        }
    });

    return flat;
}

const isMenuSearch = ref(false)
const selectedRoute = ref('')
const flatRoutes = flattenRoutes(routers);
const handleRouteSelect = (name:any) => {
    if (name) {
        router.push({ name })
        isMenuSearch.value = false
    }
}

const detectionLoginFn = () => {
    detectionLoginDialog.value = false
    location.reload()
}
// 检测登录 end

// 面包屑导航
const breadcrumb = computed(() => {
    const matched = route.matched.filter(item => { return item.meta.title })
    if (matched[0] && matched[0].path == '/') matched.splice(0, 1)
    return matched
})
storage.set({ key: 'currHeadMenuName', data: "" })
systemStore.toggleMenuCollapse(storage.get('menuiscollapse') || false)
const toggleMenuCollapse = () => {
    systemStore.toggleMenuCollapse(!systemStore.menuIsCollapse)
}

const appType = storage.get('app_type')
const taskIndicatorRef = ref()
const layoutSettingRef = ref()
const userInfoRef = ref()
const openTaskIndicator = () => taskIndicatorRef.value?.open()
const openLayoutSetting = () => layoutSettingRef.value?.open()
const openUserInfo = () => userInfoRef.value?.open()
</script>

<style lang="scss" scoped>
.layout-lightside__header {
    position: relative;
    z-index: 5;
    height: var(--cmp-lightside-header-height);
    padding: 0 var(--cmp-lightside-header-padding-inline);
    color: var(--cmp-lightside-header-text);
    background-color: var(--cmp-lightside-header-bg);
    border-bottom: 1px solid var(--cmp-lightside-header-border);
}

.navbar-item {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: var(--cmp-lightside-header-action-size);
    height: var(--cmp-lightside-header-action-size);
    padding: 0 8px;
    border-radius: var(--cmp-lightside-header-action-radius);
    transition: background-color 160ms ease;

    &:hover {
        background-color: var(--cmp-lightside-header-action-hover-bg);
    }
}

/* 用户信息项：头像自身已有悬浮反馈，不再叠加底色 */
.navbar-item.navbar-item--user:hover {
    background-color: transparent;
}

/* 顶栏菜单搜索框：浅色填充、无边框，点击仅打开搜索弹窗，不产生描边与尺寸变化 */
:deep(.header-search .menu-search-trigger) {
    --el-input-border-radius: var(--cmp-lightside-header-search-radius);
    /* 覆盖 Element Plus 默认控件高度，内部输入框高度随之计算 */
    --el-input-height: var(--cmp-lightside-header-control-height);

    flex: 0 0 auto;
    width: var(--cmp-lightside-header-search-width);
    transition: none;

    &:focus-within,
    &.is-active {
        width: var(--cmp-lightside-header-search-width);
    }

    .el-input__wrapper,
    .el-input__wrapper:hover,
    .el-input__wrapper.is-focus {
        /* 垂直内边距保持 1px，与 Element Plus 一致，输入框整体高度＝控件高度 */
        padding: 1px var(--cmp-lightside-header-control-padding-inline);
        background-color: var(--cmp-lightside-header-control-bg);
        border-radius: var(--cmp-lightside-header-search-radius) !important;
        box-shadow: none !important;
    }
}

/* 顶栏功能区分隔线：短竖线，仅作视觉分组，不参与悬浮反馈 */
.header-divider {
    align-self: center;
    flex: 0 0 var(--cmp-lightside-header-divider-width);
    width: var(--cmp-lightside-header-divider-width);
    height: var(--cmp-lightside-header-divider-height);
    margin: 0 var(--cmp-lightside-header-divider-margin-inline);
    background-color: var(--cmp-lightside-header-border);
}

/* 站点状态：与搜索框同规格的浅色填充块，无边框，悬浮加深深色反馈 */
.site-status {
    height: var(--cmp-lightside-header-control-height);
    padding: 0 var(--cmp-lightside-header-control-padding-inline);
    border-radius: var(--cmp-lightside-header-control-radius);
    background-color: var(--cmp-lightside-header-control-bg);
    transition: background-color 160ms ease;
}

.site-status:hover {
    background-color: var(--cmp-lightside-header-control-hover-bg);
}

/* 状态圆点：正常为绿，其余为红 */
.site-status__dot {
    flex: 0 0 auto;
    width: var(--cmp-lightside-site-status-dot-size);
    height: var(--cmp-lightside-site-status-dot-size);
    margin-right: 8px;
    border-radius: var(--sys-radius-full);
    background-color: var(--sys-color-danger);

    &.is-success {
        background-color: var(--sys-color-success);
    }
}

.site-status__name {
    max-width: 120px;
    overflow: hidden;
    font-size: var(--sys-font-size-base);
    font-weight: var(--sys-font-weight-medium);
    line-height: 1;
    color: var(--sys-color-text-primary);
    white-space: nowrap;
    text-overflow: ellipsis;
}

.site-status__arrow {
    margin-left: 8px;
}

.header-logo {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: calc(var(--cmp-lightside-primary-width) - var(--cmp-lightside-header-padding-inline));
    height: 100%;
    padding: 5px 8px;
    overflow: hidden;
    transition: width 180ms ease;

    &.is-expanded {
        width: calc(var(--cmp-lightside-primary-expanded-width) - var(--cmp-lightside-header-padding-inline));
    }
}

.header-logo__image,
.header-logo__image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.index-item {
	border: 1px solid;
	border-color: var(--sys-color-primary);
    &:hover {
		color: var(--sys-color-text-on-primary);
		background-color: var(--sys-color-primary);
    }
}
</style>
