<template>
    <el-container class="h-[64px] w-full layout-admin flex items-center justify-between pr-[15px] border-b-[1px] border-solid border-[var(--el-color-info-light-8)]" >
        <!-- :class="['h-full px-[10px]',{'layout-header border-b border-color': !dark}]"  -->
        <div class="flex items-center">
            <!-- <div class="navbar-item flex items-center h-full cursor-pointer" @click="toggleMenuCollapse">
                <icon name="element Expand" v-if="systemStore.menuIsCollapse" />
                <icon name="element Fold" v-else />
            </div> -->
            <div class="flex justify-center items-center flex-shrink-0" :class="{'w-[185px]': systemStore.menuIsCollapse,'w-[78px]': !systemStore.menuIsCollapse}">
                <div class="w-full h-[40px] overflow-hidden">
                    <el-image style="width: 100%; height: 100%" :src="img(logoUrl)" fit="contain" v-if="!systemStore.menuIsCollapse">
                        <template #error>
                            <div class="flex justify-center items-center w-full h-full"><img class="max-w-[70px]" src="@/app/assets/images/logo.default.png" alt=""  object-fit="contain"></div>
                        </template>
                    </el-image>
                    <el-image style="width: 100%; height: 100%" :src="img(longLogoUrl)" fit="contain" v-else>
                        <template #error>
                            <div class="flex justify-center items-center w-full h-full"><img class="max-w-[180px]" src="@/app/assets/images/logo.default.png" alt=""  object-fit="contain"></div>
                        </template>
                    </el-image>
                </div>
            </div>
            <div class="left-panel flex items-center text-[14px] leading-[1]">
                <div class="navbar-item flex items-center h-full cursor-pointer" @click="toggleMenuCollapse">
                    <icon name="element Fold" v-if="systemStore.menuIsCollapse" />
                    <icon name="element Expand" v-else />
                </div>
                <!-- 刷新当前页 -->
                <div class="navbar-item flex items-center h-full cursor-pointer" @click="refreshRouter">
                    <icon name="element Refresh" />
                </div>
                <!-- 面包屑导航 -->
                <div class="flex items-center h-full pl-[10px] hidden-xs-only">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item v-for="(route, index) in breadcrumb" :key="index" :to="route.path" class="inter">{{route.meta.title }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
        </div>
        <!-- <div>
            <el-input placeholder="搜索站点或应用"  v-model.trim="keywords" />
        </div> -->

        <div>
            <div class="right-panel h-full flex items-center justify-end">
                <div class="flex items-center flex-shrink-0 hidden-xs-only">
                    <el-dropdown trigger="hover" :hide-on-click="false" popper-class="site-info-wrap" class="mr-[8px]">
                        <!-- 状态 -->
                        <div class="mx-[8px] bg-[#f6f6f6] border-[1px] border-solid border-[#eee] rounded-[4px] px-[9px] py-[6px] flex items-center">
                            <span class="mr-[6px] text-[12px] !text-[#333]">{{siteInfo.site_name}}</span>
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
                <div class="flex items-center flex-shrink-0 hidden-xs-only">
                    <el-popover placement="bottom" :width="330" trigger="click" v-model:visible="isMenuSearch" >
                        <template #reference>
                            <i class="iconfont icona-sousuoV6xx-36 cursor-pointer px-[8px] !text-[14px]"></i>
                        </template>
                        <template #default>
                            <div class="flex items-center">
                                <el-select v-model="selectedRoute"  filterable class="!w-[250px] mr-[20px] menu-select" :teleported="false" clearable  @change="handleRouteSelect">
                                    <el-option v-for="item in flatRoutes" :key="item.name" :label="item.full_title" :value="item.name" >
                                    </el-option>
                                </el-select>
                                <el-button type="primary" link @click="isMenuSearch = false">{{t('取消')}}</el-button>
                            </div>
                        </template>
                    </el-popover>
                </div>
                <!-- 预览 只有站点时展示-->
                <i class="iconfont iconicon_huojian1 cursor-pointer px-[8px]" :title="t('visitWap')" @click="toPreview"></i>
                <i class="iconfont iconlingdang-xianxing cursor-pointer px-[8px]" :title="t('newInfo')" v-if="appType == 'site'"></i>
                <!-- 切换语言 -->
                <!-- <div class="navbar-item flex items-center h-full cursor-pointer">
                    <switch-lang />
                </div> -->
                <!-- 切换全屏 -->
                <!-- <div class="navbar-item flex items-center h-full cursor-pointer" @click="toggleFullscreen">
                    <icon name="iconfont icontuichuquanping" v-if="isFullscreen" />
                    <icon name="iconfont iconquanping" v-else />
                </div> -->
                <!-- 布局设置 -->
                <div class="navbar-item flex items-center h-full cursor-pointer">
                    <layout-setting />
                </div>
                <!-- 用户信息 -->
                <div class="navbar-item flex items-center h-full cursor-pointer">
                    <user-info />
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
import useAppStore from '@/stores/modules/app'
import useSystemStore from '@/stores/modules/system'
import { useRoute, useRouter } from 'vue-router'
import { img } from '@/utils/common'
import { t } from '@/lang'
import storage from '@/utils/storage'
import userInfo from './user-info.vue'
import layoutSetting from './layout-setting.vue'

const systemStore = useSystemStore()
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const routers = userStore.routers
const siteInfo:any = computed(() => {
    return userStore.siteInfo
})

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

// 刷新路由
const refreshRouter = () => {
    if (!appStore.routeRefreshTag) return
    appStore.refreshRouterView()
}

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
// 跳转去预览
const toPreview = () => {
    const url = router.resolve({
        path: '/preview/wap',
        query: {
            page:'/'
        }
    })
    window.open(url.href)
}
</script>

<style lang="scss" scoped>
.layout-header{
    position: relative;
    z-index: 5;
    border-bottom: 1px solid #e8e9eb;
}
.navbar-item {
    padding: 0 8px;
}
.index-item {
	border: 1px solid;
	border-color: var(--el-color-primary);
    &:hover {
		color: #fff;
        background-color: var(--el-color-primary);
    }
}
// :deep(.el-input__wrapper) {
//     box-shadow: none !important;
//     border-radius: 4px !important;
//     background: #F7F7FA !important;
//     min-width: 638px;
//     height: 40px;
//     border-radius: 4px !important;
// }
</style>
