
<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="tableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('upgradeName')" prop="name">
                        <el-input v-model.trim="tableData.searchParam.name" :placeholder="t('upgradeNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-table :data="tableData.data" size="large" v-loading="tableData.loading" ref="tableRef">

                <template #empty>
                    <span>{{ !tableData.loading ? t('emptyData') : '' }}</span>
                </template>

                <el-table-column prop="id" :label="t('id')" width="140" />
                <el-table-column prop="name" :label="t('upgradeName')" />
                <el-table-column prop="prev_version" :label="t('prevVersion')" />
                <el-table-column prop="current_version" :label="t('currentVersion')" />
                <el-table-column prop="complete_time" :label="t('completeTime')" />
            </el-table>

            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="tableData.page"
                    v-model:page-size="tableData.limit" layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.total" @size-change="loadList()"
                    @current-change="loadList" />
            </div>
        </el-card>

    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import { FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'
import { getUpgradeRecords } from '@/app/api/upgrade'
import 'vue-web-terminal/lib/theme/dark.css'

const route = useRoute()
const pageName = route.meta.title
const searchFormRef = ref<FormInstance>()
const tableRef = ref()
const tableData: any = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        name: ''
    }
})

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadList()
}

/**
 * 获取列表
 */
const loadList = (page: number = 1) => {
    tableData.loading = true
    tableData.page = page
    getUpgradeRecords({
        page: tableData.page,
        limit: tableData.limit,
        ...tableData.searchParam
    }).then(res => {
        tableData.loading = false
        tableData.data = res.data.data
        tableData.total = res.data.total
    }).catch(() => {
        tableData.loading = false
    })
}

loadList()
</script>

<style lang="scss" scoped>
</style>
