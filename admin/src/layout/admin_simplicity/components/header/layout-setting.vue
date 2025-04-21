<template>
    <div class="flex">
        <icon name="element Setting" @click="drawer = true" />

        <el-drawer v-model="drawer" :title="t('layout.layoutSetting')" size="300px">
            <el-scrollbar>
                <!-- 黑暗模式 -->
                <div class="setting-item flex items-center justify-between mb-[10px]">
                    <div class="title text-base text-tx-secondary">{{ t('layout.darkMode') }}</div>
                    <div>
                        <el-switch v-model="dark" :active-value="true" :inactive-value="false" />
                    </div>
                </div>
                <!-- 主题颜色 -->
                <div class="setting-item flex items-center justify-between mb-[10px]">
                    <div class="title text-base text-tx-secondary">{{ t('layout.themeColor') }}</div>
                    <div>
                        <el-color-picker v-model="theme" />
                    </div>
                </div>
                <!-- 布局风格 -->
                <div class="setting-item mb-[10px]">
                    <div class="title text-base text-tx-secondary">{{ t('layout.layoutStyle') }}</div>
                    <div class="flex mt-[10px] layout-style flex-wrap">
                        <div class="relative w-[125px] h-[100px] border mr-[10px] mb-[10px] hover:border-primary"
                             :class="{ 'border-primary': currLayout == item.key }" v-for="(item, index) in layouts"
                             @click="handleSetLayout(item.key)">
                            <img :src="item.image" alt="" class="w-full h-full">
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import useSystemStore from '@/stores/modules/system'
import { useDark, useToggle } from '@vueuse/core'
import { setThemeColor, img } from '@/utils/common'
import { t } from '@/lang'
import Storage from '@/utils/storage'

const layouts = ref([
    { key: 'admin', image: img('static/resource/images/system/layout_bussiness.png') },
    { key: 'admin_simplicity', image: img('static/resource/images/system/layout_darkside.png') }
])
const currLayout = ref(Storage.get('admin_layout') || 'admin')

const drawer = ref(false)
const systemStore = useSystemStore()

const isDark = useDark()
const toggleDark = useToggle(isDark)

const dark = computed({
    get() {
        return systemStore.dark
    },
    set(val) {
        systemStore.setTheme('dark', val)
        toggleDark(val)
        setThemeColor(systemStore.theme, systemStore.dark ? 'dark' : 'light')
    }
})

const sidebar = computed({
    get() {
        return systemStore.sidebar
    },
    set(val) {
        systemStore.setTheme('sidebar', val)
        setThemeColor(systemStore.theme, systemStore.dark ? 'dark' : 'light')
    }
})

const theme = computed({
    get() {
        return systemStore.theme
    },
    set(val) {
        systemStore.setTheme('theme', val)
        setThemeColor(systemStore.theme, systemStore.dark ? 'dark' : 'light')
    }
})

const handleSetLayout = (key: string) => {
    Storage.set({ key: 'admin_layout', data: key })
    location.reload()
}
</script>

<style lang="scss" scoped>
:deep(.el-drawer__header) {
    margin-bottom: 0 !important;
}

.layout-style {
    &>div:nth-child(2n+2) {
        margin-right: 0;
    }
}
</style>
