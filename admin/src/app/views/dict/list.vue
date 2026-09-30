<template>
    <!--数据字典-->
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">

            <el-card class="box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search" shadow="never">
                <el-form :inline="true" :model="dictTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model.trim="dictTable.searchParam.name" :placeholder="t('namePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('key')" prop="key">
                        <el-input v-model.trim="dictTable.searchParam.key" :placeholder="t('keyPlaceholder')" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="loadDictList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="table-panel table-fill-page__panel">
                <table-toolbar :title="pageName" :selectable="false">
                    <template #actions>
                        <el-button type="primary" @click="addEvent">
                            {{ t('addDict') }}
                        </el-button>
                    </template>
                </table-toolbar>
                <div class="table-fill-page__table">
                <el-table height="100%" :data="dictTable.data" size="large" v-loading="dictTable.loading">
                    <template #empty>
                        <span>{{ !dictTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="name" :label="t('name')" min-width="120" />
                    <el-table-column prop="key" :label="t('key')" min-width="120" />
                    <el-table-column prop="memo" :label="t('memo')" min-width="120" />
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="120" />
                    <el-table-column :label="t('operation')" align="right" fixed="right" min-width="200">
                       <template #default="{ row }">
                           <table-actions :actions="rowActions(row)" />
                       </template>
                    </el-table-column>

                </el-table>
                </div>
                <table-pagination
                    v-model:current-page="dictTable.page"
                    v-model:page-size="dictTable.limit"
                    :total="dictTable.total"
                    @size-change="loadDictList()"
                    @current-change="loadDictList"
                />
            </div>

            <edit ref="editDictDialog" @complete="loadDictList" />
            <dict ref="dictDialog" @complete="loadDictList" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getDictList, deleteDict } from '@/app/api/dict'
import { ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import Edit from '@/app/views/dict/components/edit.vue'
import dict from '@/app/views/dict/components/dict.vue'
import TableActions from '@/components/table-actions/index.vue'
import TablePagination from '@/components/table-pagination/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import { useRoute } from 'vue-router'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'

const route = useRoute()
const pageName = route.meta.title as string

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()

/**
 * 表格行内操作：超过 2 个自动收进「更多」
 */
const rowActions = (row: any) => [
    { label: t('edit'), onClick: () => editEvent(row) },
    { label: t('dictData'), onClick: () => dictData(row) },
    { label: t('delete'), type: 'danger' as const, onClick: () => deleteEvent(row.id) }
]

const dictTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        name: '',
        key: ''
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取数据字典列表
 */
const loadDictList = (page: number = 1) => {
    dictTable.loading = true
    dictTable.page = page

    getDictList({
        page: dictTable.page,
        limit: dictTable.limit,
        ...dictTable.searchParam
    }).then(res => {
        dictTable.loading = false
        dictTable.data = res.data.data
        dictTable.total = res.data.total
    }).catch(() => {
        dictTable.loading = false
    })
}
loadDictList()

const editDictDialog: Record<string, any> | null = ref(null)

/**
 * 添加数据字典
 */
const addEvent = () => {
    editDictDialog.value.setFormData()
    editDictDialog.value.showDialog = true
}

/**
 * 编辑数据字典
 * @param data
 */
const editEvent = (data: any) => {
    editDictDialog.value.setFormData(data)
    editDictDialog.value.showDialog = true
}

const dictDialog: Record<string, any> | null = ref(null)

const dictData = (data: any) => {
    dictDialog.value.setFormData(data)
}

/**
 * 删除数据字典
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('dictDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteDict(id).then(() => {
            loadDictList()
        }).catch(() => {
        })
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadDictList()
}

</script>

<style lang="scss" scoped></style>
