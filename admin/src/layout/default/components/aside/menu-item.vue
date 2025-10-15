<template>
    <template v-if="meta.show">
        <el-sub-menu v-if="hasVisibleChild" :index="String(routes.name)">
            <template #title>
                <div class="w-[16px] h-[16px] relative flex items-center" v-if="props.level == 1">
                    <icon v-if="meta.icon" :name="meta.icon" class="absolute !w-auto" />
                </div>
                <span class="ml-[10px]">{{ meta.title }}</span>
            </template>
            <menu-item v-for="(route, index) in routes.children" :routes="route" :key="index" :level="props.level + 1" />
            <template v-if="routes.name == 'addon_list' || routes.name == 'marketing_list'">
                <template v-if="addonsMenus">
                    <menu-item :routes="addonsMenus" :key="index" :level="props.level + 1"/>
                </template>
            </template>
        </el-sub-menu>
        <template v-else>
            <el-menu-item :index="String(routes.name)" @click="handleJump(routes.name)" v-if="meta.addon && meta.parent_route && meta.parent_route.addon == ''">
                <template #title>
                    <div class="w-[16px] h-[16px] relative flex items-center" v-if="props.level == 1">
                        <icon v-if="meta.icon" :name="meta.icon" class="absolute !w-auto" />
                    </div>
                    <span class="ml-[10px]">{{ meta.title }}</span>
                </template>
            </el-menu-item>
            <el-menu-item :index="String(routes.name)" @click="handleJump(routes.name)" v-else>
                <template #title>
                    <div class="w-[16px] h-[16px] relative flex items-center" v-if="props.level == 1">
                        <icon v-if="meta.icon" :name="meta.icon" class="absolute !w-auto" />
                    </div>
                    <span class="ml-[10px]">{{ meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <div v-if="routes.is_border" class="!border-0 !border-t-[1px] border-solid mx-[25px] bg-[#f7f7f7] my-[5px]"></div>
    </template>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, watch , onMounted, onUnmounted} from 'vue'
import menuItem from './menu-item.vue'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import storage from '@/utils/storage'
import { findFirstValidRoute ,formatRouters} from '@/router/routers'

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

// 存储所有特殊菜单的name
const specialMenuNames = ref<string[]>([])
const specialMenuNamesLevel1 = ref<string[]>([])
const addons = computed(() => {
    const addons: Record<string, any> = {}
    userStore.siteInfo?.apps.forEach((item: any) => { addons[item.key] = item })
    userStore.siteInfo?.site_addons.forEach((item: any) => { addons[item.key] = item })
    return addons
})

const systemAddonKeys = computed(() => {
    return userStore.siteInfo?.site_addons.map((item: any) => item.key)
})
const hasVisibleChild = computed(() => {
  if (!props.routes.children || !Array.isArray(props.routes.children)) {
    return false
  }
  return props.routes.children.some(child => child.meta?.show === 1)
})
const addonRouters: Record<string, any> = {}
routers.forEach(item => {
    item.original_name = item.name
    if (item.meta.addon) {
        addonRouters[item.meta.addon] = item
    }
    if (item.meta.attr) {
        addonRouters[item.meta.attr] = item
    }
})

const addonsMenus = ref(null)

// 提取所有特殊菜单的name
const collectSpecialMenuNames = (menus: any[]) => {
    const names: string[] = []
    const traverse = (children: any[]) => {
        children.forEach(child => {
            if (child.name) {
                names.push(child.name)
            }
            // 递归处理子菜单
            if (child.children && Array.isArray(child.children)) {
                traverse(child.children)
            }
        })
    }
    
    menus.forEach(menu => {
        if (menu.children && Array.isArray(menu.children)) {
            traverse(menu.children)
        }
    })
    return names
}
// 提取所有一级特殊菜单的name
const collectSpecialMenuNamesLevel1 = (menus: any[]) =>{
    const names: string[] = []
    menus.forEach(menu => {
        if (menu.name) {
            names.push(menu.name)
        }
    })
    return names
}

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

// 统一处理跳转逻辑
const handleJump = (routeName: string) => {
    // 检查目标路由是否在特殊菜单列表中
    const isInSpecialMenus = specialMenuNames.value.includes(routeName)
    // 核心逻辑：如果不在特殊菜单中，就删除activeAppKey
    if (!isInSpecialMenus) {
        storage.remove('activeAppKey')
    } else {
    }
    // 点击特殊菜单的一级，跳转应用列表
    if (specialMenuNamesLevel1.value.includes(routeName)) {
        routeName = 'addon_list'
    }
    
    // 执行跳转
    router.push({ name: routeName })
}

watch(route, () => {
    const addonKeys = storage.get('defaultAppList')
    if (props.routes.name == 'addon_list') {
        const addonAllKeys = getAddonAllKeys(addonKeys);
        if (props.routes.children) {
            // 过滤掉不需要显示的子菜单
            props.routes.children = props.routes.children.filter(child => {
                return !child.name || !addonAllKeys.includes(child.name);
            });
            // 处理特殊菜单
            const processedSpecialMenus = handleSpecialMenus();
            if (processedSpecialMenus.length) {
                const newChildren = [...(props.routes.children || [])];
                processedSpecialMenus.forEach(special => {
                    const index = newChildren.findIndex(child => child.name === special.name);
                    if (index !== -1) {
                        newChildren[index] = special;
                    } else {
                        newChildren.push(special);
                    }
                });
                props.routes.children = newChildren;
            }
        }

        if (systemAddonKeys.value.includes(route.meta.addon) && addonRouters[route.meta.addon]) {
            addonsMenus.value = addonRouters[route.meta.addon]
        } else if (route.meta.attr && addonRouters[route.meta.attr]) {
            addonsMenus.value = addonRouters[route.meta.attr]
        } else {
            addonsMenus.value = null
        }
    }

    const marketingKeys = storage.get('defaultMarketingKeys')
    const matchedName = route.matched[1]?.name
    if (props.routes.name == 'marketing_list') {
        if (marketingKeys && marketingKeys.includes(matchedName)) {
            addonsMenus.value = route.matched[1] ?? []
            addonsMenus.value.meta.show = 1
        } else {
            addonsMenus.value = null
        }
    }
    // console.log('addonsMenus', props.routes)
}, { immediate: true })

// 监听 localStorage 中 activeAppKey 的变化
onMounted(() => {
    const processedSpecialMenus = handleSpecialMenus();
    specialMenuNames.value = collectSpecialMenuNames(processedSpecialMenus)
    specialMenuNamesLevel1.value = collectSpecialMenuNamesLevel1(processedSpecialMenus)
    const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'activeAppKey') {
            if (props.routes.name == 'addon_list') {
                const processedSpecialMenus = handleSpecialMenus();
                if (processedSpecialMenus.length && props.routes.children) {
                    const newChildren = [...(props.routes.children || [])];
                    processedSpecialMenus.forEach(special => {
                        const index = newChildren.findIndex(child => child.name === special.name);
                        if (index !== -1) {
                            newChildren[index] = special;
                        } else {
                            newChildren.push(special);
                        }
                    });
                    props.routes.children = newChildren;
                }
            }
        }
    };

    window.addEventListener('storage', handleStorageChange);

    // 组件卸载时移除事件监听
    onUnmounted(() => {
        window.removeEventListener('storage', handleStorageChange);
    });
});
</script>

<style lang="scss">
.el-sub-menu {
    .el-icon {
        width: auto;
    }
}
</style>
