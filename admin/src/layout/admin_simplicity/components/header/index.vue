<template>
    <el-container class="h-[64px] layout-admin  flex items-center justify-between px-[15px]" >
        <!-- :class="['h-full px-[10px]',{'layout-header border-b border-color': !dark}]"  -->
        <div class="flex items-center">
            <div class="max-w-[120px] flex justify-center items-center flex-shrink-0">
                <div class="max-w-[120px] h-[40px] overflow-hidden">
                    <el-image class="w-full h-full" :src="img(website.icon)" fit="contain">
                        <template #error>
                            <div class="flex justify-center items-center w-full h-full"><img class="max-w-[120px]" src="@/app/assets/images/logo.default.png" alt=""  object-fit="contain"></div>
                        </template>
                    </el-image>
                </div>
            </div>
            <div class="left-panel flex items-center text-[14px] leading-[1]">
                <div class="navbar-item flex items-center h-full cursor-pointer" @click="toggleMenuCollapse">
                    <icon name="element Expand" v-if="systemStore.menuIsCollapse" />
                    <icon name="element Fold" v-else />
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
        <div>
            <div class="right-panel h-full flex items-center justify-end">
                <div class="border-primary border-[1px] h-[30px] px-[15px] flex items-center rounded-[6px] mr-[10px] cursor-pointer" @click="toHome()">
                    <span class="iconfont iconguanliduan !text-primary mr-1"></span>
                    <span class="text-[14px] text-primary">客户端</span>
                </div>
                <div class="navbar-item flex items-center h-full cursor-pointer">
                    <message />
                </div>
                <div class="navbar-item flex items-center h-full cursor-pointer">
                    <layout-setting />
                </div>
                <!-- 用户信息 -->
                <div class="navbar-item flex items-center h-full cursor-pointer">
                    <user-info />
                </div>
            </div>
        </div>
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
import useAppStore from '@/stores/modules/app'
import { useRoute,useRouter } from 'vue-router'
import { t } from '@/lang'
import { img, getToken } from '@/utils/common'

import storage from '@/utils/storage'
import userInfo from './user-info.vue'
import layoutSetting from './layout-setting.vue'
import message from './message.vue'
import useSystemStore from "@/stores/modules/system";

const showDialog = ref<boolean>(false)
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const systemStore = useSystemStore()
const website = computed(() => {
    return systemStore.website
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

systemStore.toggleMenuCollapse(storage.get('menuiscollapse') || false)

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
</style>
