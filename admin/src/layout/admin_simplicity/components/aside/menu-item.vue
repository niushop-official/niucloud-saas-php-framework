<template>
    <template v-if="meta.show">
        <el-sub-menu  v-if="meta.type == 0 && routes.children"  :index="String(routes.name)">
            <template #title>
                <div class="flex h-full flex-col items-center justify-center" v-if="systemStore.menuIsCollapse && props.level == 1">
                    <icon v-if="meta.icon"  :name="meta.icon" :size="'20px'" class="leading-none"/>
                    <div class="leading-none mt-[5px]">{{ meta.short_title || meta.title }}</div>
                </div>
                <template v-else>
                    <icon v-if="meta.icon && props.level != 1"  :name="meta.icon" :size="props.level == 1 ? '20px' : '16px'" class="absolute" />
                </template>
                <span class="text-[14px]" :class="{ 'font-bold': props.level === 1 , ' ml-[20px]': (meta.icon && props.level != 1) }">{{ meta.title }}</span>
            </template>
            <menu-item v-for="(route, index) in routes.children" :routes="route" :key="index" :level="props.level + 1" />
        </el-sub-menu>
        <template v-else>
            <el-menu-item :index="String(routes.name)" @click="router.push({ name: routes.name })" >
                <div class="flex h-full flex-col items-center justify-center" v-if="systemStore.menuIsCollapse && props.level == 1">
                    <icon v-if="meta.icon"  :name="meta.icon" :size="'20px'" class="leading-none"/>
                    <div class="leading-none mt-[5px]">{{ meta.short_title || meta.title }}</div>
                </div>
                <template v-else>
                    <icon v-if="meta.icon && props.level != 1"  :name="meta.icon" :size="props.level == 1 ? '20px' : '16px'" class="absolute" />
                </template>
                <template #title>
                    <span class="text-[14px]" :class="{ 'font-bold': props.level === 1 , ' ml-[20px]': (meta.icon && props.level != 1) }">{{ meta.title }}</span>
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

<style lang="scss">
.el-sub-menu{
    .el-icon{
        // width: auto;
    }
}
.el-menu {
    .el-sub-menu__title,
    .el-menu-item {
        &:hover {
            // background-color: #F1F5FF !important;
            color: var(--el-color-primary);
        }
    }

    .el-icon.el-sub-menu__icon-arrow{
        font-size: 15px;
        top: 50%;
    }
}
</style>
