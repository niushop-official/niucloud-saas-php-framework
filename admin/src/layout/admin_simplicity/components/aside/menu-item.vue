<template>
    <template v-if="meta.show">
        <el-sub-menu  v-if="meta.type == 0 && routes.children && !isSingleChildDir"  :index="String(routes.name)">
            <template #title>
                <div class="flex h-full flex-col items-center justify-center" v-if="systemStore.menuIsCollapse && props.level == 1">
                    <icon :name="menuIcon" :size="'20px'" class="leading-none"/>
                    <div class="leading-none mt-[5px]">{{ meta.short_title || meta.title }}</div>
                </div>
                <template v-else>
                    <icon v-if="props.level != 1" :name="menuIcon" size="16px" class="absolute" />
                </template>
                <span class="text-[14px]" :class="{ 'font-bold': props.level === 1 , ' ml-[20px]': props.level != 1 }">{{ meta.title }}</span>
            </template>
            <menu-item v-for="(route, index) in routes.children" :routes="route" :key="index" :level="props.level + 1" />
        </el-sub-menu>
        <template v-else>
            <el-menu-item :index="String(routes.name)" @click="handleJump(routes.name)" >
                <div class="flex h-full flex-col items-center justify-center" v-if="systemStore.menuIsCollapse && props.level == 1">
                    <icon :name="menuIcon" :size="'20px'" class="leading-none"/>
                    <div class="leading-none mt-[5px]">{{ meta.short_title || meta.title }}</div>
                </div>
                <template v-else>
                    <icon v-if="props.level != 1" :name="menuIcon" size="16px" class="absolute" />
                </template>
                <template #title>
                    <span class="text-[14px]" :class="{ 'font-bold': props.level === 1 , ' ml-[20px]': props.level != 1 }">{{ meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
    </template>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, watch } from 'vue'
import menuItem from './menu-item.vue'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import { useMenuJump, isBlankMenu } from '@/hooks/useMenuActive'
import { resolveMenuIcon } from '@/utils/menu-icon'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const routers = useUserStore().routers
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
const systemStore = useSystemStore()
const meta = computed(() => props.routes.meta)
const menuIcon = computed(() => resolveMenuIcon(meta.value?.icon))

/**
 * 目录下只有 1 个子菜单时，二级菜单没有存在意义：不再渲染可展开的分组，直接折叠成一项。
 * 一级菜单的 name 已在 side.vue 中被替换为该目录的首个有效子菜单，点击即可直达。
 *
 * 例外：唯一子菜单是「新窗口打开」时必须保留二级菜单 —— 折叠后点击传的是目录自身的 meta
 * （type != 1，不满足 isBlankMenu），会退化成原地跳转，丢失新窗口语义。
 */
const isSingleChildDir = computed(() => {
    if (props.level !== 1) return false
    const children = props.routes.children
    if (!Array.isArray(children) || children.length !== 1) return false
    return !isBlankMenu(children[0]?.meta)
})
const { handleMenuJump } = useMenuJump()

// 统一处理跳转：需要新窗口打开的菜单开新标签页并保持原高亮，其余当前页跳转
const handleJump = (routeName: string) => {
    if (handleMenuJump(routeName, meta.value)) return
    router.push({ name: routeName })
}

const addons = computed(() => {
    const addons:Record<string, any> = {}
    userStore.siteInfo?.apps.forEach((item: any) => { addons[item.key] = item })
    userStore.siteInfo?.site_addons.forEach((item: any) => { addons[item.key] = item })
    return addons
})

const systemAddonKeys = computed(() => {
    return userStore.siteInfo?.site_addons.map((item: any) => item.key)
})

const addonRouters: Record<string, any> = {}
routers.forEach(item => {
    item.original_name = item.name
    if (item.meta.addon) {
        addonRouters[item.meta.addon] = item
    }
})

const addonsMenus = ref(null)

watch(route, () => {
    if (props.routes.name != 'addon_list') return

    if (systemAddonKeys.value.includes(route.meta.addon) && addonRouters[route.meta.addon]) {
        addonsMenus.value = addonRouters[route.meta.addon]
    } else {
        addonsMenus.value = null
    }
}, { immediate: true })
</script>

<style lang="scss" scoped>
:deep(.el-sub-menu){
    .el-icon{
        // width: auto;
    }
}
:deep(.el-menu) {
    :deep(.el-sub-menu__title),
    :deep(.el-menu-item) {
        &:hover {
            // background-color: #F1F5FF !important;
            color: var(--el-color-primary);
        }
    }

    .el-icon:deep(.el-sub-menu__icon-arrow){
        font-size: 15px;
        top: 50%;
    }
}
</style>
