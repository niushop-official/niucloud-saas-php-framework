<template>
    <div :class="['layout-aside ease-in duration-200 flex box-border', { 'bright': !dark}]">
        <div class="flex flex-col border-0 border-r-[1px] border-solid border-[var(--el-color-info-light-8)] box-border overflow-hidden">
        
            <div :class="['w-[150px] one-menu hide-scrollbar', { 'expanded': systemStore.menuIsCollapse  }]" >
                <!-- <div class="flex items-center justify-center bg-primary text-white h-[40px] text-[16px] rounded-[4px] mb-[10px]"><span  class="text-[20px]">+</span><span v-if="systemStore.menuIsCollapse" class="ml-[10px]">应用市场</span></div> -->
                <div class="flex flex-col items-center">
                    <template v-for="(item, index) in oneMenuData">
                        <div v-if="item.meta.show" :title="systemStore.menuIsCollapse ? item.meta.title : item.meta.short_title" class="menu-item my-[2px] p-2 flex w-full box-border cursor-pointer relative" :class="{'is-active':oneMenuActive===item.original_name,'hover-left': systemStore.menuIsCollapse, 'vertical': !systemStore.menuIsCollapse , 'horizontal': systemStore.menuIsCollapse }" :style="{ height: (systemStore.menuIsCollapse ) ? '40px' : '55px' }" @click="router.push({ name: item.name })">
                            <div class="w-[20px] h-[20px] flex items-center justify-center menu-icon" :class="{'is-active':oneMenuActive===item.original_name}">
                                <template v-if="item.meta.icon">
                                    <el-image class="w-[20px] h-[20px] overflow-hidden" :src="item.meta.icon" fit="fill" v-if="isUrl(item.meta.icon)"/>
                                    <icon :name="item.meta.icon" size="20px" color="#1D1F3A" v-else />
                                </template>
                                <icon v-else :name="'iconfont iconshezhi1'" color="#1D1F3A" />
                            </div>
                            
                            <div v-if="systemStore.menuIsCollapse" class="text-left text-[14px] mt-[3px] w-[75px] using-hidden ml-[10px]">{{ item.meta.title || item.meta.short_title }}</div> 
                            <div v-else class="text-center text-[12px] using-hidden mt-1">{{ item.meta.short_title || item.meta.title }}</div> 
                            <div v-if="systemStore.menuIsCollapse && item.name=='app_store' && recentlyUpdated.length>0" class="text-[11px] bg-[#DA203E] px-[10px] rounded-[12px] text-[#fff] absolute right-[6px]">更新</div>
                            <div v-if="!systemStore.menuIsCollapse && item.name=='app_store' && recentlyUpdated.length>0" class="w-[7px] h-[7px] bg-[#DA203E] absolute flex items-center justify-center rounded-full top-[4px] right-[14px]"></div>
                            <div v-if="systemStore.menuIsCollapse && item.original_name=='tool' && isNewVersion" class="text-[11px] bg-[#DA203E] px-[10px] rounded-[12px] text-[#fff] absolute right-[6px]">更新</div>
                            <div v-if="!systemStore.menuIsCollapse && item.original_name=='tool' && isNewVersion" class="w-[7px] h-[7px] bg-[#DA203E] absolute flex items-center justify-center rounded-full top-[4px] right-[14px]"></div>
                        
                        </div>
                    </template>
                </div>
            </div>

        </div>
        <div class="flex flex-col two-menu w-[185px] " v-if="twoMenuData.length">
            <!-- <div class="w-[185px] h-[64px]  flex items-center justify-center text-[16px]">{{ route.matched[1].meta.title }}</div> -->
            <el-scrollbar class="flex-1" >
                <el-menu :default-active="route.name" :default-openeds="defaultOpeneds" :router="true" class="aside-menu">
                    <menu-item v-for="(route, index) in twoMenuData" :routes="route" :key="index" :isNewVersion="isNewVersion" />
                </el-menu>
                <div class="h-[48px]"></div>
            </el-scrollbar>
        </div>

    </div>
</template>
 
<script lang="ts" setup>
import { watch, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import { ADMIN_ROUTE,findFirstValidRoute } from "@/router/routers"
import { isUrl } from '@/utils/common'
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

const oneMenuActive = ref(oneMenuData.value[0].name)
watch(route, () => {
    twoMenuData.value = route.matched[1].children ?? []
    oneMenuActive.value = route.matched[1].name == ADMIN_ROUTE.children[0].name ? route.matched[2].name : route.matched[1].name
    defaultOpeneds.value = twoMenuData.value.map(item => item.name)
}, { immediate: true })

const recentlyUpdated = ref([])
const localListFn = () => {
    getAddonLocal({}).then((res) => {
        const data = res.data.list
        recentlyUpdated.value = []
        for (const i in data) {
            if (data[i].install_info && Object.keys(data[i].install_info)?.length) {
                if (data[i].install_info.version != data[i].version) {
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
.one-menu{
    padding: 20px 10px 10px;
    width: 78px;
    overflow-y: auto;
    // transition: width 0.1s ease-out;
    &.expanded {
        width: 185px;
        padding: 18px 15px 15px;
    }
        .menu-item{
            border-radius: 2px;
            justify-content: center;
            &.vertical {
                width: 55px;
                height: 55px;
                flex-direction: column;
                align-items: center;
            }

            &.horizontal {
                flex-direction: row;
                align-items: center;
            }
            .menu-icon {
                // background-color: transparent; /* 默认无背景色 */
                color: #1D1F3A;
            }

            // .menu-icon.is-active {
                // background-color: var(--el-color-primary); /* 选中时背景色 */
                // color: white; /* 选中时图标颜色变白 */
                // border-radius: 4px; /* 可选：使图标背景为圆形 */
            // }

            &:hover{
                background-color: #EAEBF0 !important;
                border-radius: 6px;
                // background-color: var(--el-color-primary-light-9) !important;
                // color:var(--el-color-primary);
            }
            &.is-active{
                background-color: #EAEBF0 !important;
                border-radius: 6px;
                // background-color: var(--el-color-primary-light-9) !important;
                // border: none;
                // color:var(--el-color-primary);
            }
            span{
                font-size: 14px;
                margin-left: 8px;
            }
    }
    .menu-item.hover-left {
        justify-content: flex-start;
        padding-left: 5px;
    }
    &.expanded .menu-item .text-center {
        opacity: 1;
    }
    .el-menu{
        border: 0;
    }
    .el-scrollbar{
        height: calc(100vh - 65px);
    }
}
.two-menu{
    .aside-menu:not(.el-menu--collapse) {
        width: 185px;
        border: 0;
        padding-top: 15px;
        .el-menu-item{
            height: 40px;
            margin: 4px 15px;
            padding: 0 8px !important;
            border-radius: 2px;
            span{
                margin-left: 8px;
                font-size: 14px;
            }
            &.is-active{
                background-color: #EAEBF0 !important;
                border-radius: 6px;
                color: inherit;
                // background-color: var(--el-color-primary-light-9) !important;
            }
            &:hover{
                background-color: #EAEBF0 !important;
                border-radius: 6px;
                // background-color: var(--el-color-primary-light-9) !important;
                // color: var(--el-color-primary);
            }
        }
        .el-sub-menu{
            width: 185px;
            margin: 4px 0;
            // margin-bottom: 8px;
            .el-sub-menu__title{
                margin: 0 15px;
                height: 40px;
                padding-left: 8px;
                border-radius: 2px;
                span{
                    height: 40px;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                }
                &:hover{
                    background-color:#EAEBF0 !important;
                    border-radius: 6px;
                    // background-color: var(--el-color-primary-light-9) !important;
                    // color: var(--el-color-primary);
                }
                .el-icon.el-sub-menu__icon-arrow{
                    right: 5px;
                }
            }
            .el-menu-item{
                padding-left: 25px !important;
            }
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
// :deep(.el-scrollbar__bar){
//     display: none !important;
// }
// .layout-aside .el-scrollbar__wrap--hidden-default, .layout-aside .el-scrollbar{
//     overflow: inherit !important;
// }
// 隐藏滚动条
.hide-scrollbar::-webkit-scrollbar {
    display: none;
    /* Chrome/Safari/Edge */
}

.hide-scrollbar {
    -ms-overflow-style: none;
    /* IE/Edge */
    scrollbar-width: none;
    /* Firefox */
}
// .layout-aside .menu-item.is-active{
//     position: relative;
//     &:after{
//         content: "";
//         position: absolute;
//         top: 0;
//         bottom: 0;
//         width: 1px;
//         background: var(--el-color-primary);
//         right: -1px;
//     }
// }
</style>
