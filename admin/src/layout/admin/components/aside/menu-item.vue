<template>
    <template v-if="meta.show">
        <el-sub-menu v-if="routes.children" :index="String(routes.name)">
            <template #title>
                <div v-if="meta.icon && props.level != 2" class="w-[13px] h-[13px] mr-[10rpx] relative flex justify-center items-center">
                    <icon v-if="meta.icon && props.level != 2" :name="meta.icon" color="#1D1F3A" class="absolute !w-auto" />
                </div>
                <span class="using-hidden" :class="['ml-[10px]', {'text-[15px]': routes.meta.class == 1}, {'text-[14px]': routes.meta.class != 1}]">{{ meta.title }}</span>
            </template>
            <menu-item v-for="(route, index) in routes.children" :routes="route" :level="props.level + 1"  :key="index" :isNewVersion="props.isNewVersion" />
        </el-sub-menu>
        <el-menu-item v-else :index="String(routes.name)" :route="routes.path">
            <template #title>
                <div v-if="meta.icon && props.level != 2" class="w-[13px] h-[13px] mr-[10rpx] relative flex justify-center items-center">
                    <icon v-if="meta.icon && props.level != 2"  color="#1D1F3A" :name="meta.icon" class="absolute !w-auto" />
                </div>
                <span class="using-hidden" :class="[{'text-[15px]': routes.meta.class == 1}, {'text-[14px]': routes.meta.class != 1}, {'ml-[10px]': routes.meta.class == 2, 'ml-[15px]': routes.meta.class == 3}]">{{ meta.title }}
                    <div v-if="meta.view=='app/upgrade'&& props.isNewVersion" class="w-[7px] h-[7px] bg-[#DA203E] absolute flex items-center justify-center rounded-full top-[10px] right-[65px]"></div>
                </span>
            </template>
        </el-menu-item>
    </template>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref, computed } from 'vue'
import menuItem from './menu-item.vue'
import { CollectionTag } from '@element-plus/icons-vue'

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
const meta = computed(() => props.routes.meta)
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
	border-color: var(--el-color-primary);
    &:hover {
		color: #fff;
        background-color: var(--el-color-primary);
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
