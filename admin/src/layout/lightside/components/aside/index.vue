<template>
  <div :class="['layout-aside ease-in duration-200 flex box-border', { 'bright': !dark}]">
    <div class="flex flex-col border-0 border-r-[1px] border-solid border-[var(--el-color-info-light-8)] box-border overflow-hidden">
      <div :class="['w-[150px] one-menu hide-scrollbar', { 'expanded': systemStore.menuIsCollapse  }]" >
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
            </div>
          </template>
        </div>
      </div>

    </div>
    <div class="flex flex-col two-menu w-[185px] " v-if="twoMenuData.length">
      <el-scrollbar class="flex-1" >
        <el-menu :default-active="route.name" :router="true" class="aside-menu">
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
import { findFirstValidRoute, formatRouters } from "@/router/routers"
import { isUrl } from '@/utils/common'
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

  // 排序, 功能正确，改了排序后需要把菜单排序的默认值重新调整一下【多应用一级菜单，单应用二级菜单】
  oneMenuData.value.sort((a, b) => {
    if (a.meta.sort && b.meta.sort) {
      return b.meta.sort - a.meta.sort
    } else if (a.meta.sort) {
      return -1
    } else if (b.meta.sort) {
      return 1
    } else {
      return 0
    }
  })
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
  oneMenuData.value.sort((a, b) => {
    if (a.meta.sort && b.meta.sort) {
      return b.meta.sort - a.meta.sort
    } else if (a.meta.sort) {
      return -1
    } else if (b.meta.sort) {
      return 1
    } else {
      return 0
    }
  })
}

const oneMenuActive = ref(route.matched[1].name)
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
