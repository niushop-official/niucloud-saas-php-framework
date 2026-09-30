<template>
    <template v-if="meta.show">
        <el-sub-menu v-if="routes.children" :index="String(routes.name)">
            <template #title>
                <icon v-if="props.level == 1" :name="menuIcon" class="aside-menu-icon" />
                <span class="aside-menu-label using-hidden">{{ meta.title }}</span>
            </template>
            <menu-item v-for="(route, index) in routes.children" :routes="route" :level="props.level + 1"  :key="index" :isNewVersion="props.isNewVersion" />
        </el-sub-menu>
        <el-menu-item v-else :index="String(routes.name)" @click="handleJump(routes.name)">
            <template #title>
                <icon v-if="props.level == 1" :name="menuIcon" class="aside-menu-icon" />
                <span class="aside-menu-label using-hidden">{{ meta.title }}
                    <div v-if="meta.view=='app/upgrade'&& props.isNewVersion" class="w-[7px] h-[7px] bg-[var(--sys-color-danger)] absolute flex items-center justify-center rounded-full top-[10px] right-[65px]"></div>
                </span>
            </template>
        </el-menu-item>
    </template>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuJump } from '@/hooks/useMenuActive'
import { resolveMenuIcon } from '@/utils/menu-icon'
import menuItem from './menu-item.vue'

const props = defineProps({
    routes: {
        type: Object,
        required: true
    },
    level: {
        type: Number,
        default: 1
    },
    isNewVersion: {
        type: Boolean,
        default: false
    }
})
const router = useRouter()
const meta = computed(() => props.routes.meta)
const menuIcon = computed(() => resolveMenuIcon(meta.value?.icon))
const { handleMenuJump } = useMenuJump()

// 统一处理跳转：需要新窗口打开的菜单开新标签页并保持原高亮，其余当前页跳转
const handleJump = (routeName: string) => {
    if (handleMenuJump(routeName, meta.value)) return
    router.push({ name: routeName })
}
</script>

<style lang="scss">
.el-sub-menu{
    .el-icon{
        width: auto;
    }
    li{
        font-size: 15px;
    }
}
.el-alert .el-alert__description{
    margin-top: 0;
}
.index-item {
	border: 1px solid;
	border-color: var(--sys-color-primary);
    &:hover {
		color: var(--sys-color-text-on-primary);
        background-color: var(--sys-color-primary);
    }
}

</style>
<style scoped>
.using-hidden {
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: nowrap;
}
</style>
