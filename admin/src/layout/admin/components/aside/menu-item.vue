<template>
    <template v-if="meta.show">
        <el-sub-menu v-if="routes.children" :index="String(routes.name)">
            <template #title>
                <div v-if="meta.icon " class="w-[13px] h-[13px] mr-[10rpx] relative flex justify-center items-center">
                    <icon v-if="meta.icon" :name="meta.icon" class="absolute !w-auto" />
                </div>
                <span :class="['ml-[10px]', {'text-[15px]': routes.meta.class == 1}, {'text-[14px]': routes.meta.class != 1}]">{{ meta.title }}</span>
            </template>
            <menu-item v-for="(route, index) in routes.children" :routes="route"  :key="index" />
        </el-sub-menu>
        <el-menu-item v-else :index="String(routes.name)" :route="routes.path">
            <template #title>
                <div v-if="meta.icon " class="w-[13px] h-[13px] mr-[10rpx] relative flex justify-center items-center">
                    <icon v-if="meta.icon" :name="meta.icon" class="absolute !w-auto" />
                </div>
                <span :class="[{'text-[15px]': routes.meta.class == 1}, {'text-[14px]': routes.meta.class != 1}, {'ml-[10px]': routes.meta.class == 2, 'ml-[15px]': routes.meta.class == 3}]">{{ meta.title }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import menuItem from './menu-item.vue'
import { CollectionTag } from '@element-plus/icons-vue'

const router = useRouter()
const props = defineProps({
    routes: {
        type: Object,
        required: true
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
