<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-table :data="data" size="large" class="mt-[20px]" v-loading="loading">
                <template #empty>
                    <span>{{ !loading ? t('emptyData') : '' }}</span>
                </template>

                <el-table-column label="应用" min-width="120" >
                    <template #default="{ row }">
                        <div class="flex items-center">
                            <el-image class="w-[40px] h-[40px] rounded-md overflow-hidden" :src="img(row.icon)" fit="contain">
                                <template #error>
                                    <div class="flex items-center w-full h-full">
                                        <img class="w-full h-full" src="@/app/assets/images/icon-addon.png" alt="">
                                    </div>
                                </template>
                            </el-image>
                            <div class="flex-1 ml-2 truncate">{{ row.addon_title }}</div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="配色名称" min-width="120" >
                    <template #default="{ row }">
                        <div>{{ row.title }}</div>
                    </template>
                </el-table-column>

                <el-table-column label="配色方案" min-width="120" >
                    <template #default="{ row }">
                        <div class="rounded-[3px] inline-flex items-center justify-center border-[1px] border-solid border-[#f2f2f2] overflow-hidden" v-if="row.theme">
                            <span class="w-[18px] h-[18px]" :style="{backgroundColor: row.theme['--primary-color']}"></span>
                            <span class="w-[18px] h-[18px]" :style="{backgroundColor: row.theme['--primary-help-color2']}"></span>
                            <span class="w-[18px] h-[18px]" :style="{backgroundColor: row.theme['--primary-color-dark']}"></span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column :label="t('operation')" align="right" fixed="right" width="100">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="editEvent(row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <theme-list ref="themeListRef" @confirm="initData()" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, computed } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { getDiyTheme } from '@/app/api/diy'
import { useRoute } from 'vue-router'
import themeList from './components/theme-list.vue'
import { cloneDeep } from 'lodash-es'

const route = useRoute()
const pageName = route.meta.title
const loading = ref(true)
const themeListRef = ref(null)
const data = ref([])

const initData = () => {
    loading.value = true;
    getDiyTheme({}).then((res) => {
        let obj = cloneDeep(res.data);
        for(let key in obj){
            obj[key].key = key;
        }
        data.value = Object.values(obj);
        loading.value = false;
    })
}
initData()

// 编辑
const editEvent = (data)=> {
    themeListRef.value.open(data)
}
</script>

<style lang="scss" scoped></style>
<!-- 设置弹窗标题 -->
<style scoped>
/* 使用深度选择器 */
:deep(.custom-theme-dialog .el-dialog__title) {
  font-size: 16px;
}
</style>
