<template>
    <el-container class="layout-header h-full" :class="{'border-b border-color': !dark}" >
        <el-row class="w-100 h-full w-full">
            <el-col :span="10">
                <div class="left-panel h-full flex items-center">
                    <!-- 左侧菜单折叠 -->
                    <div class="hidden-sm-and-up navbar-item flex items-center h-full cursor-pointer" @click="toggleMenuCollapse">
                        <icon name="element Expand" v-if="systemStore.menuIsCollapse" />
                        <icon name="element Fold" v-else />
                    </div>
                    <!-- 面包屑导航 -->
                    <div class="flex items-center h-full pl-[10px]">
                        <el-breadcrumb separator="/">
                             <!-- :to="route.path" class="inter" 这种修改方式导致部分跳转不对，需要重新调整菜单才可以 -->
                            <el-breadcrumb-item v-for="(route, index) in breadcrumb" :to="route.path" class="inter" :key="index">{{route.meta.title }}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
            </el-col>
            <el-col :span="14">
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
                    <div class="flex items-center flex-shrink-0 hidden-xs-only">
                        <!-- 点击输入框直接展开菜单下拉并支持输入搜索，无需中间确认步骤 -->
                        <el-select
                            v-model="selectedRoute"
                            class="menu-search-select"
                            :placeholder="t('search')"
                            filterable
                            @change="handleRouteSelect"
                        >
                            <el-option v-for="item in flatRoutes" :key="item.name" :label="item.full_title" :value="item.name">
                            </el-option>
                        </el-select>
                    </div>
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
                    <span class="header-divider"></span>
                    <!-- 用户信息 -->
                    <div class="navbar-item navbar-item--user flex items-center h-full cursor-pointer" @click="openUserInfo">
                        <user-info ref="userInfoRef" />
                    </div>
                </div>
            </el-col>
        </el-row>
        <input type="hidden" v-model="comparisonToken">
        <input type="hidden" v-model="comparisonSiteId">

        <el-dialog v-model="detectionLoginDialog" :title="t('layout.detectionLoginTip')" width="30%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
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
import { computed, ref, onMounted } from 'vue'
import layoutSetting from '@/layout/components/layout-setting/index.vue'
import taskIndicator from '@/layout/components/task-indicator/index.vue'
import userInfo from './user-info.vue'
import visitChannel from '@/components/visit-channel/index.vue'
import { useFullscreen } from '@vueuse/core'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@/lang'
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
const route = useRoute()
const router = useRouter()
const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)

const userStore = useUserStore()
const siteInfo:any = computed(() => {
    return userStore.siteInfo
})

const dark = computed(() => {
    return systemStore.dark
})
const routers = userStore.routers
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
};

const flatRoutes = flattenRoutes(routers);
const selectedRoute = ref('')
const handleRouteSelect = (name:any) => {
    if (name) {
        router.push({ name })
    }
    // 跳转后清空选中，保持搜索框为可继续搜索的状态
    selectedRoute.value = ''
}

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

onMounted(() => {
    // 监听窗体宽度变化
    window.onresize = () => {
        return (() => {
            screenWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        })()
    }
})

// watch(screenWidth, () => {
//     if (screenWidth.value < 992) {
//         if (!systemStore.menuIsCollapse) systemStore.toggleMenuCollapse(true)
//     } else {
//         if (systemStore.menuIsCollapse) systemStore.toggleMenuCollapse(false)
//     }
// })

// 菜单栏展开折叠
const toggleMenuCollapse = () => {
    systemStore.$patch((state) => {
        if (screenWidth.value < 768) {
            state.menuDrawer = true
            state.menuIsCollapse = false
        } else {
            systemStore.toggleMenuCollapse(!systemStore.menuIsCollapse)
        }
    })
}

// 面包屑导航
const breadcrumb = computed(() => {
    const matched = route.matched.filter(item => { return item.meta.title })
    if (matched[0] && matched[0].path == '/') matched.splice(0, 1)
    return matched
})

</script>

<style lang="scss" scoped>
.layout-header{
    position: relative;
    z-index: 5;
    padding-right: var(--cmp-default-header-padding-inline);
    padding-left: var(--cmp-default-header-padding-inline);
    color: var(--cmp-header-text);
    background-color: var(--cmp-header-bg);
    // 使用下边框线代替阴影
    border-bottom: 1px solid var(--cmp-header-border);
}
.menu-search-select {
    flex: 0 0 auto;
    width: var(--cmp-default-header-search-width);

    :deep(.el-select__wrapper) {
        cursor: pointer;
    }

    :deep(.el-select__input) {
        cursor: text;
    }
}

/* 压过全局 32px 最小高度，悬停前后都保持 30px，避免外框过渡把高度差放大成闪动 */
.layout-header .menu-search-select.el-select :deep(.el-select__wrapper) {
    height: var(--cmp-default-header-control-height);
    min-height: var(--cmp-default-header-control-height);
    padding: 1px var(--cmp-default-header-control-padding-inline);
    background-color: var(--cmp-default-header-control-bg);
    border-radius: var(--cmp-default-header-control-radius);
    box-shadow: none;
    transition: none;
}

.header-divider {
    align-self: center;
    flex: 0 0 var(--cmp-default-header-divider-width);
    width: var(--cmp-default-header-divider-width);
    height: var(--cmp-default-header-divider-height);
    margin: 0 var(--cmp-default-header-divider-margin-inline);
    background-color: var(--cmp-header-border);
}

.site-status {
    height: var(--cmp-default-header-control-height);
    padding: 0 var(--cmp-default-header-control-padding-inline);
    border-radius: var(--cmp-default-header-control-radius);
    background-color: var(--cmp-default-header-control-bg);
    transition: background-color 160ms ease;

    &:hover {
        background-color: var(--cmp-default-header-control-hover-bg);
    }
}

.site-status__dot {
    flex: 0 0 auto;
    width: var(--cmp-default-site-status-dot-size);
    height: var(--cmp-default-site-status-dot-size);
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
.navbar-item {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: var(--cmp-default-header-action-size);
    height: var(--cmp-default-header-action-size);
    padding: 0 8px;
    border-radius: var(--cmp-default-header-action-radius);
    transition: background-color 160ms ease;

    &:hover {
        background-color: var(--cmp-default-header-action-hover-bg);
    }
}

/* 用户信息项：头像自身已有悬浮反馈，不再叠加底色 */
.navbar-item.navbar-item--user:hover {
    background-color: transparent;
}
.index-item {
	border: 1px solid;
	border-color: var(--sys-color-primary);
    &:hover {
		color: var(--sys-color-text-on-primary);
        background-color: var(--sys-color-primary);
    }
}
:deep(.el-dropdown-menu__item) {
	&:focus {
		background-color: transparent !important;
		color: var(--sys-color-text-primary) !important;
	}
}
:deep(.inter .el-breadcrumb__inner) {
    font-weight: inherit !important;
    color: var(--cmp-default-breadcrumb-text) !important;
}

:deep(.inter:last-child .el-breadcrumb__inner) {
    color: var(--cmp-default-breadcrumb-active-text) !important;
}
</style>
