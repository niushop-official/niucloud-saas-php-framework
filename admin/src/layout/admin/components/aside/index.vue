<template>
    <div :class="['layout-aside ease-in duration-200 flex ', { 'bright': !dark }]">
        <div class="flex flex-col border-0 border-r-[1px] border-solid border-[var(--el-color-info-light-8)] box-border">
            <!-- <div class="w-full h-[64px] flex justify-center items-center w-[65px]flex-shrink-0">
                <div class="w-[40px] h-[40px] rounded-[50%] overflow-hidden">
                    <el-image style="width: 100%; height: 100%" :src="img(logoUrl)" fit="contain">
                        <template #error>
                            <div class="flex justify-center items-center w-full h-[40px]"><img class="max-w-[100px]" src="@/app/assets/images/site_login_logo.png" alt=""  object-fit="contain"></div>
                        </template>
                    </el-image>
                </div>
            </div> -->
            <el-scrollbar class="w-[65px] one-menu">
                <div class="flex flex-col items-center">
                    <template v-for="(item, index) in oneMenuData">
                        <div v-if="item.meta.show" class="menu-item py-[10px] flex flex-col items-center justify-center w-full box-border cursor-pointer" :class="{'is-active':oneMenuActive===item.original_name}" @click="router.push({ name: item.name })">
                            <div class="w-[35px] h-[35px] flex items-center justify-center mx-auto menu-icon" :class="{'is-active':oneMenuActive===item.original_name}">
                                <template v-if="item.meta.icon">
                                    <el-image class="w-[25px] h-[25px] overflow-hidden" :src="item.meta.icon" fit="fill" v-if="isUrl(item.meta.icon)"/>
                                    <icon  :name="item.meta.icon" size="25px" v-else />
                                </template>
                                <icon v-else :name="'iconfont iconshezhi1'" />
                            </div>
                            <div class="text-center text-[13px] mt-[3px]">{{ item.meta.short_title || item.meta.title }}</div>
                        </div>
                    </template>
                </div>
            </el-scrollbar>

        </div>
        <div class="flex flex-col two-menu w-[185px] " v-if="twoMenuData.length">
            <!-- <div class="w-[175px] h-[64px]  flex items-center justify-center text-[16px]">{{ route.matched[1].meta.title }}</div> -->
            <el-scrollbar class="flex-1">
                <el-menu :default-active="route.name" :default-openeds="defaultOpeneds" :router="true" class="aside-menu" :collapse="systemStore.menuIsCollapse">
                    <menu-item v-for="(route, index) in twoMenuData" :routes="route" :key="index" />
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
import { img, isUrl } from '@/utils/common'
import menuItem from './menu-item.vue'

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

</script>

<style lang="scss">
.one-menu{
        .menu-item{
            .menu-icon {
                background-color: transparent; /* 默认无背景色 */
                color: #8F9ABF;
            }

            .menu-icon.is-active {
                background-color: var(--el-color-primary); /* 选中时背景色 */
                color: white; /* 选中时图标颜色变白 */
                border-radius: 4px; /* 可选：使图标背景为圆形 */
            }

            &:hover{
                color:var(--el-color-primary);
            }
            &.is-active{
                // background-color: var(--el-color-primary) !important;
                // color: #fff !important;
                border: none;
                color:var(--el-color-primary);
            }
            span{
                font-size: 14px;
                margin-left: 8px;
            }
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
            height: 36px;
            margin: 4px 10px;
            padding: 0 8px !important;
            border-radius: 2px;
            span{
                margin-left: 8px;
                font-size: 14px;
            }
            &.is-active{
                // background-color: var(--el-color-info-light-8) !important;
                background-color: var(--el-color-primary-light-9) !important;
            }
            &:hover{
                // background-color: var(--el-color-info-light-8) !important;
                background-color: var(--el-color-primary-light-9) !important;
                color: var(--el-color-primary);
            }
        }
        .el-sub-menu{
            width: 185px;
            margin: 4px 0px;
            // margin-bottom: 8px;
            .el-sub-menu__title{
                margin: 0px 10px;
                height: 36px;
                padding-left: 8px;
                border-radius: 2px;
                span{
                    height: 36px;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                }
                &:hover{
                    // background-color: var(--el-color-info-light-8) !important;
                    background-color: var(--el-color-primary-light-9) !important;
                    color: var(--el-color-primary);
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

.layout-aside .el-scrollbar__wrap--hidden-default, .layout-aside .el-scrollbar{
    overflow: inherit !important;
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
