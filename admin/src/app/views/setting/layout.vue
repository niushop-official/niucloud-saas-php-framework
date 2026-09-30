<template>
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">
            <div class="table-panel table-fill-page__panel">
                <table-toolbar :title="pageName" :selectable="false" />
                <div class="table-fill-page__table">
                <el-table height="100%" :data="addonList" size="large" v-loading="loading">
                    <template #empty>
                        <span>{{ !loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="title" :label="t('app')" min-width="120" >
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <el-image class="w-[40px] h-[40px] rounded-md overflow-hidden" :src="row.icon" fit="contain">
                                    <template #error>
                                        <div class="flex items-center w-full h-full">
                                            <img class="w-full h-full" src="@/app/assets/images/icon-addon-one.png" alt="">
                                        </div>
                                    </template>
                                </el-image>
                                <div class="flex-1 ml-2 truncate">{{ row.title }}</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" align="right" fixed="right" width="120">
                        <template #default="{ row }">
                            <table-actions :actions="[{ label: t('setting'), onClick: () => openSettingLayer(row.key) }]" />
                        </template>
                    </el-table-column>
                </el-table>
                </div>
            </div>
        </div>
    </div>

    <el-dialog v-model="showDialog" :title="t('selectLayout')" width="800" :destroy-on-close="true">
        <div class="h-[330px]">
            <el-scrollbar >
                <div class="flex justify-between items-center mb-[20px]">
                    <h3 class="!text-sm !text-[#444]">{{ t('layout') }}</h3>
                    <div class="flex items-center cursor-pointer" @click="toDiyLayout">
                        <span class="iconfont iconwenhao text-[#999] !text-[14px]"></span>
                        <div class="ml-[2px] text-[12px] text-[#999]">如何开发自定义布局</div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-items-stretch">
                    <div class="layout-item mr-[10px] mb-[10px]"
                         :class="{ 'is-active': ((!selectedLayout && item.layout == 'site') || (selectedLayout == item.layout)) }"
                         @click="selectedLayout = item.layout"
                         v-for="item in systemLayout">
                        <img :src="img(item.cover)" class="w-full h-full" />
                    </div>
                    <div class="layout-item mr-[20px] mb-[10px]"
                         :class="{ 'is-active': ((!selectedLayout && addonLayout.layout == 'site') || (selectedLayout == addonLayout.layout)) }"
                         @click="selectedLayout = addonLayout.layout"
                         v-if="addonLayout">
                        <img :src="img(addonLayout.cover)" class="w-full h-full" />
                    </div>
                </div>
                <!-- <h3 class="panel-title !text-sm">{{ t('themeColor') }}</h3>
                <div>
                    <el-color-picker v-model="themeColor[currAddon]" size="large" />
                    <div class="form-tip text-[#999] mt-2">设置的色调会在前端站点列表体现[home/index]，用于区分不同的应用</div>
                </div> -->
            </el-scrollbar>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm()">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import { useRoute } from 'vue-router'
import { getInstalledAddonList } from '@/app/api/addon'
import { setLayout, getLayout, getThemecolor, setThemecolor } from '@/app/api/sys'
import { img } from '@/utils/common'
import TableToolbar from '@/components/table-toolbar/index.vue'
import TableActions from '@/components/table-actions/index.vue'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'

const route = useRoute()
const pageName = route.meta.title

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()
const loading = ref(true)
const layoutConfig = ref({})
const systemLayout = ref([])
const addonLayout = ref(null)
const themeColor = ref({})
const addonList = ref([
    {
        title: t('manyApp'),
        key: 'system',
        icon: ''
    }
])

const layouts = import.meta.globEager('@/layout/**/layout.json')
for (const key in layouts) {
    const layout = layouts[key]
    systemLayout.value.push(layout.default)
}
const addonLayouts = import.meta.globEager('@/addon/**/layout/layout.json')

getInstalledAddonList().then(({ data }) => {
    Object.keys(data).forEach((key) => {
        const item = data[key]
        item.type == 'app' && addonList.value.push(item)
    })
    loading.value = false
})

const getLayoutConfig = () => {
    getLayout().then(({ data }) => {
        layoutConfig.value = data
    })
    getThemecolor().then(({ data }) => {
        themeColor.value = data
    })
}
getLayoutConfig()

const currAddon = ref('')
const showDialog = ref(false)
// 弹窗内的草稿选中，打开时从已保存配置恢复，确定后才写回
const selectedLayout = ref('')
const openSettingLayer = async (key: string) => {
    if (key != 'system') {
        addonLayout.value = null
        Object.keys(addonLayouts).forEach((path) => {
            path.indexOf(`/addon/${key}/`) != -1 && (addonLayout.value = addonLayouts[path].default)
        })
    }
    currAddon.value = key
    selectedLayout.value = layoutConfig.value[key] || ''
    showDialog.value = true
}

const confirm = () => {
    layoutConfig.value[currAddon.value] = selectedLayout.value
    setThemecolor({
        key: currAddon.value,
        value: themeColor.value[currAddon.value] ? themeColor.value[currAddon.value] : ''
    })
    setLayout({
        key: currAddon.value,
        value: selectedLayout.value ? selectedLayout.value : 'site'
    })
    showDialog.value = false
}

// 跳转自定义布局
const toDiyLayout = () => {
    let url = 'https://doc.press.niucloud.com/php/saas-framework/dev/pluginDev/diyLayoutDev.html';
    window.open(url)
}
</script>

<style lang="scss" scoped>
/* 布局缩略图：与站点列表卡片一致的圆角、白色背景与悬浮动效 */
.layout-item {
    position: relative;
    box-sizing: border-box;
    width: 180px;
    height: 130px;
    overflow: hidden;
    background-color: var(--cmp-card-bg, var(--el-bg-color-overlay));
    border: var(--cmp-module-card-border-width) solid var(--cmp-module-card-border-color);
    border-radius: var(--sys-radius-md);
    cursor: pointer;
    transition: border-color .2s, box-shadow .2s, transform .2s;

    &:hover {
        border-color: var(--cmp-module-card-hover-border-color);
        box-shadow: var(--cmp-module-card-hover-shadow);
        transform: translateY(var(--cmp-module-card-hover-offset));
    }

    &.is-active {
        border-color: var(--sys-color-primary);
        box-shadow: 0 0 0 2px var(--sys-color-primary-soft);
    }
}
</style>
