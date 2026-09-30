
<template>
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">

            <el-card class="box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search" shadow="never">
                <el-form :inline="true" :model="tableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('content')" prop="content">
                        <el-input v-model.trim="tableData.searchParam.content" :placeholder="t('contentPlaceholder')" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="loadList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="table-panel table-fill-page__panel">
                <table-toolbar
                    :title="pageName"
                    :selected-count="selectedCount"
                    :current-page-count="tableData.data.length"
                    :total-count="tableData.total"
                    :selection-loading="selectionLoading"
                    :allow-select-all="false"
                    @select-page="selectCurrentPage"
                    @clear-selection="clearSelection"
                >
                    <template #batch-actions>
                        <el-button class="table-delete" link :disabled="!selectedCount || selectionLoading" @click="batchDelete">
                            {{ t('batchDelete') }}
                        </el-button>
                    </template>
                    <template #actions>
                        <el-button type="primary" @click="manualBackupEvent">
                            {{ t('manualBackup') }}
                        </el-button>
                    </template>
                </table-toolbar>
            <div class="table-fill-page__table">
            <el-table height="100%" :data="tableData.data" size="large" v-loading="tableData.loading" ref="tableRef" row-key="id" @selection-change="handleSelectionChange">

                <template #empty>
                    <span>{{ !tableData.loading ? t('emptyData') : '' }}</span>
                </template>

                <el-table-column type="selection" width="55" reserve-selection />
                <el-table-column prop="content" :label="t('操作')" width="120" align="left">
                    <template #default="{ row }">
                        <span class="multi-hidden">
                            <el-tag :type="contentTag(row.content)" size="small" effect="light">{{ row.content }}</el-tag>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="version" :label="t('currentVersion')" width="120" />
                <el-table-column prop="backup_dir" :label="t('backupDir')" width="220" />
                <el-table-column prop="complete_time" :label="t('completeTime')" width="220" />
                <el-table-column prop="remark" :label="t('remark')">
                    <template #default="{ row }">
                        <span v-if="row.remark" class="multi-hidden">{{ row.remark }}</span>
                        <span v-else>{{ t('remarkEmpty') }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="t('operation')" align="right" fixed="right" width="200">
                    <template #default="{ row }">
                        <table-actions :actions="rowActions(row)" />
                    </template>
                </el-table-column>
            </el-table>
            </div>
            <table-pagination
                v-model:current-page="tableData.page"
                v-model:page-size="tableData.limit"
                :total="tableData.total"
                @size-change="loadList()"
                @current-change="loadList"
            />
            </div>
        </div>

        <!-- 备份 / 恢复前校验：通过后创建统一任务并跳转任务详情，执行过程统一在详情页查看 -->
        <el-dialog v-model="showDialog" :title="iSBackupRecovery == 1 ? t('manualBackupTitle') : t('restoreTitle')"
                   width="580px" :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
            <div class="min-h-[150px]">
                <verify-panel v-if="showDialog" scene="backup" :auto-next="true" :show-prev="false"
                              :next-text="t('nextStep')" @next="onCheckNext" />
            </div>
        </el-dialog>

        <el-dialog v-model="showRemarkDialog" :title="t('remark')" width="460px" :destroy-on-close="true">
            <el-form :model="formData" ref="formRef" class="page-form" v-loading="remarkLoading">
                <el-form-item class="mb-0">
                    <el-input v-model.trim="formData.remark" :rows="5" type="textarea" maxlength="200" show-word-limit />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="showRemarkDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="remarkLoading" @click="modifyRemarkFn()">{{ t('confirm') }}</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, nextTick } from 'vue'
import { t } from '@/lang'
import { ElMessage, ElMessageBox, ElTable, FormInstance } from 'element-plus'
import TableActions from '@/components/table-actions/index.vue'
import TablePagination from '@/components/table-pagination/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import { useRoute } from 'vue-router'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'
import { checkDirExist, getBackupRecords, deleteRecords, modifyBackupRemark } from '@/app/api/upgrade'
import { createTask } from '@/app/api/task'
import VerifyPanel from '@/app/components/verify-panel/index.vue'
import useTaskRunnerStore from '@/stores/modules/taskRunner'

const runner = useTaskRunnerStore()
const route = useRoute()
const pageName = route.meta.title

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()

const searchFormRef = ref<FormInstance>()
const tableRef = ref<InstanceType<typeof ElTable>>()
const repeat = ref(false)
const selectedIds = ref<number[]>([])
const selectionLoading = ref(false)
const syncingSelection = ref(false)
const selectedCount = computed(() => selectedIds.value.length)
const tableData: any = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        content: ''
    }
})

const showDialog: any = ref<boolean>(false)
const uploading: any = ref(false)
/** 待恢复的备份标识（sys_backup_records.backup_key，即备份任务标识） */
const currentBackupKey: any = ref('')

const iSBackupRecovery = ref(0) // 1：手动备份 2：恢复

/**
 * 备份来源标签配色
 * 列表只查已完成（status=complete）的记录，故这里按来源区分而非状态
 */
const contentTag = (content: string): any => {
    if (content === '手动备份') return 'primary'
    if (content === '自动备份') return 'success'
    return 'warning'
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.resetFields()
    loadList()
}

/**
 * 将跨页选择状态同步到当前页复选框
 */
const syncCurrentPageSelection = async () => {
    await nextTick()
    syncingSelection.value = true
    tableRef.value?.clearSelection()
    const selectedIdSet = new Set(selectedIds.value)
    tableData.data.forEach((row: any) => {
        if (selectedIdSet.has(row.id)) tableRef.value?.toggleRowSelection(row, true)
    })
    await nextTick()
    syncingSelection.value = false
}

// 监听表格单行选中
const handleSelectionChange = (rows: any[]) => {
    if (syncingSelection.value) return
    const currentPageIds = new Set(tableData.data.map((row: any) => row.id))
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
    selectedIds.value = tableData.data.map((row: any) => row.id)
    syncCurrentPageSelection()
}

/**
 * 清空全部分页选择
 */
const clearSelection = () => {
    selectedIds.value = []
    syncingSelection.value = true
    tableRef.value?.clearSelection()
    nextTick(() => {
        syncingSelection.value = false
    })
}

/**
 * 表格行内操作：超过 2 个自动收进「更多」
 */
const rowActions = (row: any) => [
    { label: t('detail'), onClick: () => toDetail(row) },
    { label: t('restore'), onClick: () => restoreEvent(row) },
    { label: t('remark'), onClick: () => remarkEvent(row) },
    { label: t('delete'), type: 'danger', onClick: () => deleteEvent(row.id) }
]

/**
 * 获取列表
 */
const loadList = (page: number = 1) => {
    tableData.loading = true
    tableData.page = page
    return getBackupRecords({
        page: tableData.page,
        limit: tableData.limit,
        ...tableData.searchParam
    }).then(async res => {
        tableData.data = res.data.data
        tableData.total = res.data.total
        await syncCurrentPageSelection()
    }).catch(() => {
    }).finally(() => {
        tableData.loading = false
    })
}

loadList()

// 手动备份
const manualBackupEvent = () => {
    ElMessageBox.confirm(t('manualBackupTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        iSBackupRecovery.value = 1
        uploading.value = false
        showDialog.value = true
    })
}

/**
 * 校验通过后的下一步：按当前模式发起备份 / 恢复
 * （由 verify-panel 在校验通过后自动触发，也可点击「下一步」）
 */
const onCheckNext = () => {
    if (iSBackupRecovery.value == 1) {
        manualBackupFn()
    } else {
        restoreUpgradeBackupFn(currentBackupKey.value)
    }
}

/**
 * 打开统一任务详情：备份 / 恢复的执行过程与结果都在详情里查看（全局抽屉，不离开当前页）
 */
const toTaskDetail = (key: string) => {
    if (!key) return
    runner.openDetail(key, 'backup')
}

/**
 * 列表「详情」：备份记录的 backup_key 即备份任务的 task_key
 *
 * 不显式指定产物类型 —— 升级时产生的自动备份，其 backup_key 用的是升级任务标识，
 * 让详情页按任务记录自身的 task_type 决定产物口径，比写死 backup 更准。
 */
const toDetail = (row: any) => {
    if (!row?.backup_key) {
        ElMessage.warning('该记录缺少任务标识')
        return
    }
    runner.openDetail(String(row.backup_key))
}

/**
 * 发起手动备份：创建统一任务后关闭弹窗并跳转详情页
 */
const manualBackupFn = () => {
    uploading.value = true
    // 先占位打开任务详情：创建期间不留空窗
    runner.openPendingDetail('backup', '正在发起备份')
    createTask('backup', { mode: 'backup' }).then((res: any) => {
        uploading.value = false
        const key = res?.data?.task_key
        if (!key) {
            runner.closePendingDetail()
            ElMessage.error('备份任务创建失败')
            return
        }
        showDialog.value = false
        loadList()
        toTaskDetail(key)
    }).catch((err: any) => {
        uploading.value = false
        runner.closePendingDetail()
        ElMessage({ message: err?.msg || err?.message || '备份发起失败', type: 'error' })
    })
}

/**
 * 发起备份恢复：创建统一任务后关闭弹窗并跳转详情页
 */
const restoreUpgradeBackupFn = (backupKey: any) => {
    uploading.value = true
    // 传备份标识而非记录 id：后端按 backup_key 定位归档（id 是 sys_backup_records 的主键，
    // 与 sys_task 的 id 不是一回事，传 id 会查错）
    runner.openPendingDetail('backup', '正在发起恢复')
    createTask('backup', { mode: 'restore', backup_key: backupKey }).then((res: any) => {
        uploading.value = false
        const key = res?.data?.task_key
        if (!key) {
            runner.closePendingDetail()
            ElMessage.error('恢复任务创建失败')
            return
        }
        showDialog.value = false
        loadList()
        toTaskDetail(key)
    }).catch((err: any) => {
        uploading.value = false
        runner.closePendingDetail()
        ElMessage({ message: err?.msg || err?.message || '恢复发起失败', type: 'error' })
    })
}

// 恢复备份
const restoreEvent = (data: any) => {
    ElMessageBox.confirm(t('restoreTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        iSBackupRecovery.value = 2
        currentBackupKey.value = data.backup_key
        checkDirExistFn(data.id)
    })
}

// 检测目录是否存在
const checkDirExistFn = (id: any) => {
    checkDirExist({ id }).then(({ data }) => {
        if (data) {
            uploading.value = false
            showDialog.value = true
        }
    })
}

const showRemarkDialog: any = ref<boolean>(false)
const remarkLoading = ref(false)
const formData: any = reactive({
    id: 0,
    remark: ''
})

// 修改备注
const remarkEvent = (row: any) => {
    formData.id = row.id
    formData.remark = row.remark
    showRemarkDialog.value = true
}

const modifyRemarkFn = () => {
    remarkLoading.value = true
    modifyBackupRemark({
        id: formData.id,
        remark: formData.remark
    }).then(() => {
        showRemarkDialog.value = false
        remarkLoading.value = false
        loadList()
    }).catch(() => {
        remarkLoading.value = false
    })
}

// 删除升级记录
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('deleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        if (repeat.value) return
        repeat.value = true
        tableData.loading = true
        deleteRecords({
            ids: id
        }).then(() => {
            selectedIds.value = selectedIds.value.filter(item => item != id)
            loadList()
            repeat.value = false
        }).catch(() => {
            repeat.value = false
            tableData.loading = false
        })
    })
}

// 批量删除升级记录
const batchDelete = () => {
    if (selectedIds.value.length == 0) {
        ElMessage({
            type: 'warning',
            message: `${t('batchEmptySelectedTips')}`
        })
        return
    }

    ElMessageBox.confirm(t('deleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        tableData.loading = true
        if (repeat.value) return
        repeat.value = true

        const ids: any = [ ...selectedIds.value ]

        deleteRecords({
            ids
        }).then(() => {
            clearSelection()
            loadList()
            repeat.value = false
        }).catch(() => {
            repeat.value = false
            tableData.loading = false
        })
    })
}
</script>

<style lang="scss" scoped>
::deep(.terminal .t-log-box span) {
    white-space: pre-wrap;
}

.table-head-bg {
    background-color: var(--el-table-header-bg-color);
}

::deep(.number-of-steps) {
    .el-step__line {
        margin: 0 25px;
        background: #dddddd;
    }

    .el-step__head {
        margin-top: 10px;
    }

    .is-success {
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);

        .el-step__icon {
            background: var(--el-color-primary);
            color: #fff;

            i {
                color: #fff;
            }
        }

        .el-step__line {
            margin: 0 25px;
            background: var(--el-color-primary);
        }
    }
    .is-finish {
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);

        .el-step__icon {
            background: var(--el-color-primary)!important;
            color: #fff !important;

            i {
                color: #fff;
            }
        }

        .el-step__line {
            margin: 0 25px;
            background: var(--el-color-primary);
        }
    }

    .is-process {
        color: var(--el-color-primary);
        font-weight: inherit;

        .el-step__icon {
            padding: 10px;
            border: 1px solid var(--el-color-primary);
            background: var(--el-color-primary)!important;
            color: #fff !important;
        }
    }

    .is-wait {
        color: #333;
    }
}

::deep(.el-result__icon) {
  color: unset !important; // 清除默认颜色
}
::deep(.el-result__title p){
    font-size: 25px;
    color: #1D1F3A;
    font-weight: 500;
}
::deep(.el-result__subtitle p){
    font-size: 15px;
    color: #4F516D;
    font-weight: 500;
    word-break: break-all;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
}
/* 多行超出隐藏 */
.multi-hidden {
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
</style>
