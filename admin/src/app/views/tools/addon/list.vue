<template>
    <!--站点列表-->
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="addonTableData.searchParam" ref="searchFormRef" class="search-form">
                    <el-form-item :label="t('title')" prop="search">
                        <el-input v-model.trim="addonTableData.searchParam.search" :placeholder="t('titlePlaceholder')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadAddonList">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[20px]">
                <el-table :data="addonTableData.data" size="large" v-loading="addonTableData.loading">
                    <template #empty>
                            <span>{{ t('emptyData') }}</span>
                        </template>

                        <el-table-column :label="t('title')" align="left" min-width="320">
                            <template #default="{ row }">
                                <div class="flex items-center justify-between">
                                    <el-image v-if="row.icon" class="w-[45px] h-[45px]" :src="row.icon.indexOf('data:image') != -1 ? row.icon : img(row.icon)" fit="contain">
                                        <template #error>
                                            <img class="w-[45px] h-[45px]" src="@/app/assets/images/category_default.png" alt="">
                                        </template>
                                    </el-image>
                                    <img v-else class="w-[45px] h-[45px]" src="@/app/assets/images/category_default.png" alt="">
                                    <div class="flex-1 w-[236px] pl-[15px] truncate">
                                        {{ row.title }}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="key" :label="t('key')" min-width="200" />
                        <el-table-column prop="type_name" :label="t('type')" align="center" min-width="200" />
                        <el-table-column prop="author" :label="t('author')"  min-width="200" />
                        <el-table-column prop="version" :label="t('version')" align="center" min-width="200" />
                        <el-table-column :label="t('status')" align="center" min-width="200">
                            <template #default="{ row }">
                                {{ Object.keys(row.install_info).length ? '已安装' : '未安装' }}
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('operation')" fixed="right" align="right" width="180" :show-overflow-tooltip="true">
                            <template #default="{ row }">
                                
                                <el-button v-if="Object.keys(row.install_info).length" type="primary" link @click="addonDevelopBuildFn(row)">{{ t('step4') }}</el-button>
                                <el-button v-if="!Object.keys(row.install_info).length" type="primary" link @click="deleteEvent(row.key)">{{ t('delete') }}</el-button>
                                <el-button type="primary" link @click="editEvent(row.key)">{{ t('edit') }}</el-button>
                            </template>
                        </el-table-column>
                </el-table>
                <!-- <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="addonTableData.page" v-model:page-size="addonTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="addonTableData.total"
                        @size-change="loadAddonList()" @current-change="loadAddonList" />
                </div> -->
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { img } from '@/utils/common'
import { t } from '@/lang'
import { getAddonDevelop, deleteAddonDevelop, addonDevelopBuild, addonDevelopDownload } from '@/app/api/tools'
import { ElMessageBox, FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

const addonTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        search: ''
    }
})

const searchFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.resetFields()
    loadAddonList()
}
/**
 * 获取站点列表
 */
const loadAddonList = (page: number = 1) => {
    addonTableData.loading = true
    addonTableData.page = page
    getAddonDevelop({
        page: addonTableData.page,
        limit: addonTableData.limit,
        ...addonTableData.searchParam
    }).then(res => {
        addonTableData.loading = false
        addonTableData.data = res.data
        addonTableData.total = res.data.total
    }).catch(() => {
        addonTableData.loading = false
    })
}
loadAddonList()

const router = useRouter()

const editEvent = (key: any) => {
    router.push({ path: '/tools/addon_edit', query: { key } })
}

// 打包插件
const addonDevelopBuildFn = (data: any) => {
    addonTableData.loading = true
    addonDevelopBuild(data.key).then(res => {
        addonTableData.loading = false
        addonDevelopDownload(data.key).then(res => {
            ElMessageBox.alert(`插件打包成功，插件包所在位置：网站根目录${res.data}下请手动进行下载`, t('warning'))
        }).catch()
    }).catch(() => {
        addonTableData.loading = false
    })
}

/**
 * 删除
 */
const deleteEvent = (key: any) => {
    ElMessageBox.confirm(t('codeDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        addonTableData.loading = true
        deleteAddonDevelop(key).then(() => {
            loadAddonList()
        }).catch(() => {
            addonTableData.loading = false
        })
    })
}
</script>

<style lang="scss" scoped>

</style>
