<template>
    <el-drawer v-model="visible" class="schedule-log-drawer-root" :title="pageName" direction="rtl" size="80%" :destroy-on-close="false" @closed="onClosed">
        <div class="schedule-log-drawer table-fill-page">
        <div class="table-fill-page__card">

            <el-card class="box-card !border-none table-search-wrap table-fill-page__search" shadow="never">
                <div class="flex justify-between">
                    <el-form :inline="true" :model="cronTableData.searchParam" ref="searchFormRef">
                        <el-form-item :label="t('name')" prop="key">
                            <el-select v-model="cronTableData.searchParam.key" placeholder="全部" filterable remote clearable>
                                <el-option label="全部" value="all" />
                                <el-option v-for="item in templateList" :key="item.key" :label="item.name" :value="item.key" />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="t('status')" prop="status">
                            <el-select v-model="cronTableData.searchParam.status" placeholder="全部" filterable remote clearable>
                                <el-option label="全部" value="all" />
                                <el-option label="成功" value="success" />
                                <el-option label="失败" value="error" />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="t('executeTime')" prop="execute_time">
                            <el-date-picker v-model="cronTableData.searchParam.execute_time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="loadCronLogList()">{{ t('search') }}</el-button>
                            <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                            <el-button @click="clearAll" :loading="clearLoading">{{ t('clearAll') }}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>

            <div class="table-panel table-fill-page__panel">
                <table-toolbar
                    :title="pageName"
                    :selected-count="selectedCount"
                    :current-page-count="cronTableData.data.length"
                    :total-count="cronTableData.total"
                    :selection-loading="selectionLoading"
                    :allow-select-all="false"
                    @select-page="selectCurrentPage"
                    @clear-selection="clearSelection"
                >
                    <template #batch-actions>
                        <el-button class="table-delete" link :disabled="!selectedCount || selectionLoading" :loading="deleteLoading" @click="batchDelete">
                            {{ t('batchDelete') }}
                        </el-button>
                    </template>
                </table-toolbar>
                <div class="table-fill-page__table">
                <el-table height="100%" :data="cronTableData.data" size="large" v-loading="cronTableData.loading" ref="cronLogListTableRef" row-key="id" @selection-change="handleSelectionChange">
                    <template #empty>
                        <span>{{ !cronTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column type="selection" width="55" reserve-selection />
                    <el-table-column prop="id" :label="t('id')" min-width="80" />
                    <el-table-column prop="name" :label="t('name')" min-width="150" />
                    <el-table-column prop="key" :label="t('key')" min-width="150" />
                    <el-table-column prop="class" :label="t('class')" min-width="150" />
                    <el-table-column :label="t('executeResult')" min-width="150">
                        <template #default="{ row }">
                            {{ row.execute_result }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="status_name" :label="t('status')" min-width="100" />
                    <el-table-column prop="execute_time" :label="t('executeTime')" min-width="100" />
                    <el-table-column :label="t('operation')" align="right" fixed="right" width="130">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>
                            <el-button type="primary" link @click="delEvent(row)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </div>
                <table-pagination
                    v-model:current-page="cronTableData.page"
                    v-model:page-size="cronTableData.limit"
                    :total="cronTableData.total"
                    @size-change="loadCronLogList()"
                    @current-change="loadCronLogList"
                />
            </div>
        </div>

        <el-dialog v-model="showDialog" :title="t('cronInfo')" width="550px" :destroy-on-close="true">
            <el-form :model="formData" label-width="110px" ref="formRef" class="page-form" v-loading="loading">

                <el-form-item :label="t('name')" >
                    <div class="input-width"> {{ formData.name }} </div>
                </el-form-item>

                <el-form-item :label="t('key')" >
                    <div class="input-width"> {{ formData.key }} </div>
                </el-form-item>

                <el-form-item :label="t('class')" >
                    <div class="input-width"> {{ formData.class }} </div>
                </el-form-item>

                <el-form-item :label="t('executeResult')" >
                    <div class="input-width"> {{ formData.execute_result }} </div>
                </el-form-item>

                <el-form-item :label="t('status')" >
                    <div class="input-width"> {{ formData.status_name }} </div>
                </el-form-item>

                <el-form-item :label="t('executeTime')" >
                    <div class="input-width"> {{ formData.execute_time }} </div>
                </el-form-item>

            </el-form>

            <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="showDialog = false">{{ t('confirm') }}</el-button>
            </span>
            </template>
        </el-dialog>
        </div>
    </el-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, nextTick } from 'vue'
import { t as translate, i18n, language } from '@/lang'
import useSystemStore from '@/stores/modules/system'
import { getCronLogList, getCronTemplate, deleteCronLog, clearCronLog } from '@/app/api/sys'
import { ElMessageBox, ElMessage, ElTable, FormInstance } from 'element-plus'
import TablePagination from '@/components/table-pagination/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import { useRoute } from 'vue-router'

const systemStore = useSystemStore()
language.loadLocaleMessages('', 'tools/schedule_log', systemStore.lang || 'zh-cn')

const t = (message: string) => {
    const key = `tools.schedule_log.${message}`
    const value = i18n.global.t(key)
    return value != key ? value : translate(message)
}

const route = useRoute()
const pageName = String(route.path).includes('schedule_log') ? String(route.meta.title || '') : translate('cronLog')
const visible = ref(false)
const scheduleId = ref<any>('')

const cronTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        schedule_id: '',
        key: '',
        status: 'all',
        execute_time: []
    }
})
const templateList = ref([])
const searchFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadCronLogList()
}

const setTypeList = async () => {
    templateList.value = await (await getCronTemplate()).data
}
setTypeList()

const open = (id: number | string) => {
    scheduleId.value = id
    cronTableData.searchParam.schedule_id = id
    cronTableData.searchParam.key = ''
    cronTableData.searchParam.status = 'all'
    cronTableData.searchParam.execute_time = []
    selectedIds.value = []
    visible.value = true
    loadCronLogList()
}

const onClosed = () => {
    cronTableData.data = []
    cronTableData.total = 0
}

/**
 * 获取日志列表
 */
const loadCronLogList = (page: number = 1) => {
    cronTableData.loading = true
    cronTableData.page = page

    return getCronLogList({
        page: cronTableData.page,
        limit: cronTableData.limit,
        ...cronTableData.searchParam
    }).then(async res => {
        cronTableData.data = res.data.data
        cronTableData.total = res.data.total
        await syncCurrentPageSelection()
    }).catch(() => {
    }).finally(() => {
        cronTableData.loading = false
    })
}
const showDialog = ref(false)
const loading = ref(true)
const repeat = ref(false)
const deleteLoading = ref(false)
const clearLoading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    name: '',
    key: '',
    execute_result: '',
    status_name: '',
    class: '',
    job: '',
    execute_time: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

/**
 * 查看日志详情
 * @param row
 */
const infoEvent = (row: any) => {
    loading.value = true
    Object.assign(formData, initialFormData)

    if (row) {
        Object.keys(formData).forEach((key: string) => {
            if (row[key] != undefined) formData[key] = row[key]
        })
    }

    loading.value = false
    showDialog.value = true
}

// 删除日志
const delEvent = (data: any) => {
    ElMessageBox.confirm(t('deleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        if (repeat.value) return
        repeat.value = true

        deleteCronLog({
            ids: data.id
        }).then((res: any) => {
            if (res.code == 1) {
                selectedIds.value = selectedIds.value.filter(item => item != data.id)
                loadCronLogList()
            }
            repeat.value = false
        }).catch(() => {
            repeat.value = false
        })
    })
}

const cronLogListTableRef = ref<InstanceType<typeof ElTable>>()

// 选中数据
const selectedIds = ref<number[]>([])
const selectionLoading = ref(false)
const syncingSelection = ref(false)
const selectedCount = computed(() => selectedIds.value.length)

/**
 * 将跨页选择状态同步到当前页复选框
 */
const syncCurrentPageSelection = async () => {
    await nextTick()
    syncingSelection.value = true
    cronLogListTableRef.value?.clearSelection()
    const selectedIdSet = new Set(selectedIds.value)
    cronTableData.data.forEach((row: any) => {
        if (selectedIdSet.has(row.id)) cronLogListTableRef.value?.toggleRowSelection(row, true)
    })
    await nextTick()
    syncingSelection.value = false
}

// 监听表格单行选中
const handleSelectionChange = (rows: any[]) => {
    if (syncingSelection.value) return
    const currentPageIds = new Set(cronTableData.data.map((row: any) => row.id))
    const otherPageIds = selectedIds.value.filter(id => !currentPageIds.has(id))
    selectedIds.value = Array.from(new Set([
        ...otherPageIds,
        ...rows.map(row => row.id)
    ]))
}

/**
 * 重新选择当前页数据
 */
const selectCurrentPage = () => {
    selectedIds.value = cronTableData.data.map((row: any) => row.id)
    syncCurrentPageSelection()
}

/**
 * 清空全部分页选择
 */
const clearSelection = () => {
    selectedIds.value = []
    syncingSelection.value = true
    cronLogListTableRef.value?.clearSelection()
    nextTick(() => {
        syncingSelection.value = false
    })
}

// 批量删除
const batchDelete = () => {
    if (selectedIds.value.length == 0) {
        ElMessage({
            type: 'warning',
            message: `${t('batchEmptySelectedCronLogTips')}`
        })
        return
    }

    ElMessageBox.confirm(t('batchDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        if (repeat.value) return
        repeat.value = true
        deleteLoading.value = true

        const ids: any = [ ...selectedIds.value ]

        deleteCronLog({
            ids
        }).then(() => {
            clearSelection()
            loadCronLogList()
            repeat.value = false
            deleteLoading.value = false
        }).catch(() => {
            repeat.value = false
            deleteLoading.value = false
        })
    })
}

// 清空日志
const clearAll = () => {
    ElMessageBox.confirm(t('clearAllTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        if (repeat.value) return
        repeat.value = true
        clearLoading.value = true

        let schedule_id: any = scheduleId.value ?? ''

        clearCronLog({
            schedule_id
        }).then(() => {
            clearSelection()
            loadCronLogList()
            repeat.value = false
            clearLoading.value = false
        }).catch(() => {
            repeat.value = false
            clearLoading.value = false
        })
    })
}

if (String(route.path).includes('schedule_log') && route.query.id) {
    open(route.query.id as string)
}

defineExpose({
    open
})

</script>

<style lang="scss">
.schedule-log-drawer-root .el-drawer__body {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
}

.schedule-log-drawer-root .schedule-log-drawer {
    flex: 1;
    min-height: 0;
}
</style>
