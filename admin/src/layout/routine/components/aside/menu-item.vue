<template>
    <template v-if="meta.show">
        <el-sub-menu v-if="hasVisibleChild" :index="String(routes.name)">
            <template #title>
                <div class="w-[25px] h-full flex items-center justify-center">
                    <template v-if="meta.icon">
                        <el-image class="w-[16px] h-[16px] overflow-hidden" :src="meta.icon" fit="fill" v-if="isUrl(meta.icon)"/>
                        <icon :name="meta.icon" v-else />
                    </template>
                    <icon v-else :name="'iconfont iconshezhi1'" />
                </div>
                <span class="text-[14px]">{{ meta.title }}</span>
            </template>
            <menu-item v-for="(route, index) in routes.children" :routes="route" :key="index" :level="props.level + 1" />
        </el-sub-menu>
        <el-menu-item :index="String(routes.name)" @click="handleJump(routes.name)" v-else>
            <template #title>
                <div class="w-[25px] h-full flex items-center justify-center" v-if="props.level == 1">
                    <template v-if="meta.icon">
                        <el-image class="w-[16px] h-[16px] overflow-hidden" :src="meta.icon" fit="fill" v-if="isUrl(meta.icon)"/>
                        <icon :name="meta.icon" v-else />
                    </template>
                    <icon v-else :name="'iconfont iconshezhi1'" />
                </div>
                <span class="text-[14px]">{{ meta.title }}</span>
            </template>
        </el-menu-item>
    </template>

</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { img, isUrl } from '@/utils/common'
import menuItem from './menu-item.vue'
import storage from '@/utils/storage'

const router = useRouter()
const route = useRoute()

const props = defineProps({
    routes: {
        type: Object,
        required: true
    },
    level: {
        type: Number,
        default: 1
    }
})

const meta = computed(() => props.routes.meta)

const hasVisibleChild = computed(() => {
    if (!props.routes.children || !Array.isArray(props.routes.children)) {
        return false
    }
    return props.routes.children.some(child => child.meta?.show === 1)
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
    }
    // 点击特殊菜单的一级，跳转应用列表
    if (specialMenuNamesLevel1.includes(routeName)) {
        routeName = 'addon_list'
    }
    // 跳转时添加随机查询参数（用于触发页面感知）// 相同路由时添加随机参数
    const query = route.name === routeName ? { refresh: Date.now() } : {}

    // 执行跳转
    router.push({ name: routeName, query })
}

</script>

<style lang="scss" scoped>
</style>
