<template>
    <template v-if="meta.show">
        <el-sub-menu v-if="hasVisibleChild" :index="String(routes.name)">
            <template #title>
                <span :class="['ml-[10px]']">{{ meta.title }}</span>
            </template>
            <menu-item v-for="(route, index) in routes.children" :routes="route" :key="index" />
        </el-sub-menu>
        <template v-else>
            <el-menu-item :index="String(routes.name)" @click="handleJump(routes.name)" v-if="meta.addon && meta.parent_route && meta.parent_route.addon == ''">
                <template #title>
                    <span :class="[{'text-[15px]': routes.meta.class == 1}, {'text-[14px]': routes.meta.class != 1}, {'ml-[10px]': routes.meta.class == 2, 'ml-[15px]': routes.meta.class == 3}]">{{ meta.title }}</span>
                </template>
            </el-menu-item>
            <el-menu-item :index="String(routes.name)" @click="handleJump(routes.name)" v-else>
                <template #title>
                    <span :class="[{'text-[15px]': routes.meta.class == 1}, {'text-[14px]': routes.meta.class != 1}, {'ml-[10px]': routes.meta.class == 2, 'ml-[15px]': routes.meta.class == 3}]">{{ meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <div v-if="routes.is_border" class="!border-0 !border-t-[1px] border-solid mx-[25px] bg-[#f7f7f7] my-[5px]"></div>
    </template>

</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import menuItem from './menu-item.vue'
import useUserStore from '@/stores/modules/user'
import storage from '@/utils/storage'

const router = useRouter()
const props = defineProps({
    routes: {
        type: Object,
        required: true
    }
})
const userStore = useUserStore()
const siteInfo = userStore.siteInfo
const meta = computed(() => props.routes.meta)

const hasVisibleChild = computed(() => {
  if (!props.routes.children || !Array.isArray(props.routes.children)) {
    return false
  }
  return props.routes.children.some(child => child.meta?.show === 1)
})

const addons = computed(() => {
    const addons:Record<string, any> = {}
    siteInfo?.apps.forEach((item: any) => { addons[item.key] = item })
    siteInfo?.site_addons.forEach((item: any) => { addons[item.key] = item })
    return addons
})
// 统一处理跳转逻辑
const handleJump = (routeName: string) => {
    // 检查目标路由是否在特殊菜单列表中
    const specialMenuNames = storage.get('specialMenuNames')
    const specialMenuNamesLevel1 = storage.get('specialMenuNamesLevel1')
    const isInSpecialMenus = specialMenuNames.includes(routeName)
    // 核心逻辑：如果不在特殊菜单中，就删除activeAppKey
    if (!isInSpecialMenus) {
        storage.remove('activeAppKey')
    } else {
    }
    // 点击特殊菜单的一级，跳转应用列表
    if (specialMenuNamesLevel1.includes(routeName)) {
        routeName = 'addon_list'
    }
    // 执行跳转
    router.push({ name: routeName })
}
</script>

<style lang="scss">
.el-sub-menu {

    .el-icon {
        width: auto;
    }

    li {
        font-size: 15px;
    }
}
</style>
