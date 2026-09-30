<template>
    <el-container class="layout-header h-full w-full flex items-center justify-between" >
        <!-- :class="['h-full px-[10px]',{'layout-header border-b border-color': !dark}]"  -->
        <div class="left-panel flex min-w-0 items-center text-[14px] leading-[1]">
            <div class="header-logo" :class="{ 'is-expanded': systemStore.menuIsCollapse }">
                <el-image class="header-logo__image" :src="img(systemStore.menuIsCollapse ? longLogoUrl : logoUrl)" fit="contain">
                    <template #error>
                        <img src="@/app/assets/images/logo.default.png" alt="" />
                    </template>
                </el-image>
            </div>
            <div class="left-panel__nav flex items-center">
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
        </div>
        <!-- <div>
            <el-input placeholder="搜索站点或应用"  v-model.trim="keywords" />
        </div> -->

        <div>
            <div class="right-panel h-full flex items-center justify-end">
                <div class="client-entry px-[12px] mr-[8px] flex items-center cursor-pointer" @click="toHome()">
                    <span class="iconfont iconguanliduan !text-primary mr-1"></span>
                    <span class="text-[14px] text-primary">客户端</span>
                </div>
                <!-- 菜单搜索 -->
                <div class="header-search flex items-center h-full">
                    <menu-search />
                </div>
                <span class="header-divider"></span>
                <!-- 任务指示器：有进行中的任务时图标转动，悬浮可查看进度并进入详情 -->
                <div class="navbar-item flex items-center h-full cursor-pointer" @click="openTaskIndicator">
                    <task-indicator ref="taskIndicatorRef" />
                </div>
                <div class="navbar-item flex items-center h-full cursor-pointer">
                    <message />
                </div>
                <div class="navbar-item flex items-center h-full cursor-pointer" @click="openLayoutSetting">
                    <layout-setting ref="layoutSettingRef" :show-layout-style="true" />
                </div>
                <span class="header-divider"></span>
                <!-- 用户信息 -->
                <div class="navbar-item navbar-item--user flex items-center h-full cursor-pointer" @click="openUserInfo">
                    <user-info ref="userInfoRef" />
                </div>
            </div>
        </div>

        <input type="hidden" v-model="comparisonToken" />
        <input type="hidden" v-model="comparisonSiteId" />

        <el-dialog v-model="detectionLoginDialog" :title="t('layout.detectionLoginTip')" width="30%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <span>{{ t('layout.detectionLoginContent') }}</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="detectionLoginFn">{{ t('layout.detectionLoginOperation') }}</el-button>
                </span>
            </template>
        </el-dialog>

		<el-dialog v-model="showDialog" :title="t('indexTemplate')" width="550px" :destroy-on-close="true" >
			<div class="flex flex-wrap">
				<div v-for="(items, index) in indexList" :key="index" v-if="index_path == ''">
					<div @click="index_path = items.view_path" class="index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer" :class="items.is_use == 1 ? 'bg-primary text-[#fff]' : '' ">
						<span >{{ items.name }}</span>
					</div>
				</div>
				<div v-for="(itemTo, indexTo) in indexList" :key="indexTo" v-else>
					<div @click="index_path = itemTo.view_path" class="index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer" :class="index_path == itemTo.view_path ? 'bg-primary text-[#fff]' : '' ">
						<span >{{ itemTo.name }}</span>
					</div>
				</div>
			</div>
		    <template #footer>
		        <span class="dialog-footer">
		            <el-button type="primary" @click="submitIndex">{{ t('confirm') }}</el-button>
		        </span>
		    </template>
		</el-dialog>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import useUserStore from '@/stores/modules/user'
import useSystemStore from '@/stores/modules/system'
import { useRoute,useRouter } from 'vue-router'
import { img, getToken } from '@/utils/common'
import { t } from '@/lang'
import storage from '@/utils/storage'
import userInfo from './user-info.vue'
import layoutSetting from '@/layout/components/layout-setting/index.vue'
import message from '@/layout/components/message/index.vue'
import menuSearch from '@/layout/components/menu-search/index.vue'
import taskIndicator from '@/layout/components/task-indicator/index.vue'

const showDialog = ref<boolean>(false)
const taskIndicatorRef = ref()
const layoutSettingRef = ref()
const userInfoRef = ref()
const openTaskIndicator = () => taskIndicatorRef.value?.open()
const openLayoutSetting = () => layoutSettingRef.value?.open()
const openUserInfo = () => userInfoRef.value?.open()
const systemStore = useSystemStore()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
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

const toHome = () => {
    if (!window.localStorage.getItem('site.token')) {
        window.localStorage.setItem('site.token', getToken())
        window.localStorage.setItem('site.comparisonTokenStorage', getToken())
    }
    if (!window.localStorage.getItem('site.userinfo')) {
        window.localStorage.setItem('site.userinfo', JSON.stringify(useUserStore().userInfo))
    }
    router.push({ path: '/home/index'})
}
</script>

<style lang="scss" scoped>
.layout-header {
    position: relative;
    z-index: 5;
    height: var(--cmp-header-height);
    padding: 0 var(--cmp-admin-header-padding-inline);
    color: var(--cmp-header-text);
    background-color: var(--cmp-header-bg);
    border-bottom: 1px solid var(--cmp-header-border);
}

.header-logo {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: calc(var(--cmp-admin-primary-width) - var(--cmp-admin-header-padding-inline));
    height: 100%;
    padding: 5px 8px;
    overflow: hidden;
    transition: width 180ms ease;

    &.is-expanded {
        width: calc(var(--cmp-admin-primary-expanded-width) - var(--cmp-admin-header-padding-inline));
    }
}

.header-logo__image,
.header-logo__image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.client-entry {
    box-sizing: border-box;
    height: var(--cmp-admin-control-height);
    border-radius: var(--cmp-admin-control-radius);
    background-color: var(--cmp-admin-control-bg);
    transition: background-color 160ms ease;

    &:hover {
        background-color: var(--cmp-admin-control-hover-bg);
    }
}

:deep(.header-search .menu-search-trigger) {
    --el-input-border-radius: var(--cmp-admin-header-search-radius);
    --el-input-height: var(--cmp-admin-control-height);

    flex: 0 0 auto;
    width: var(--cmp-admin-header-search-width);
    transition: none;

    &:focus-within,
    &.is-active {
        width: var(--cmp-admin-header-search-width);
    }

    .el-input__wrapper,
    .el-input__wrapper:hover,
    .el-input__wrapper.is-focus {
        padding: 1px var(--cmp-admin-control-padding-inline);
        background-color: var(--cmp-admin-control-bg);
        border-radius: var(--cmp-admin-header-search-radius) !important;
        box-shadow: none !important;
    }
}

.header-divider {
    align-self: center;
    flex: 0 0 1px;
    width: 1px;
    height: 16px;
    margin: 0 8px;
    background-color: var(--cmp-header-border);
}

.navbar-item {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: var(--cmp-admin-action-size);
    height: var(--cmp-admin-action-size);
    padding: 0 8px;
    border-radius: var(--cmp-admin-action-radius);
    transition: background-color 160ms ease;

    &:hover {
        background-color: var(--sys-color-fill-light);
    }
}

.navbar-item.navbar-item--user:hover {
    background-color: transparent;
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
