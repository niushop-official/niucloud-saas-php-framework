
<template>
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">

            <el-card class="box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search" shadow="never">
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
                        <el-button class="table-delete" link :disabled="!selectedCount || selectionLoading" @click="batchDeleteBackup">
                            批量删除备份
                        </el-button>
                    </template>
                </table-toolbar>
            <div class="table-fill-page__table">
            <el-table height="100%" :data="tableData.data" size="large" v-loading="tableData.loading" ref="tableRef" row-key="id" @selection-change="handleSelectionChange">

                <template #empty>
                    <span>{{ !tableData.loading ? t('emptyData') : '' }}</span>
                </template>

                <!-- 勾选只用于「批量删除备份」：没有可删备份的记录不可勾选（备份已删除后同样不可选） -->
                <el-table-column type="selection" width="55" reserve-selection :selectable="selectable" />
                <el-table-column prop="name" :label="t('upgradeName')" min-width="320" class-name="upgrade-name-col">
                    <template #default="{ row }">
                        <!-- 无明细（历史记录 / 单应用升级）：一行直接展示 -->
                        <div v-if="!contentItems(row).length" class="upgrade-item">
                            <span class="upgrade-item__app">{{ row.name }}</span>
                            <span class="upgrade-item__version">从 {{ row.prev_version }} 升级到 {{ row.current_version }}</span>
                        </div>

                        <!-- 有明细：默认显示第一项，点击展开全部，平铺无缩进（单项与多项样式一致） -->
                        <div v-else class="upgrade-items">
                            <div class="upgrade-item">
                                <span class="upgrade-item__app">{{ contentItems(row)[ 0 ].app?.app_name }}</span>
                                <span class="upgrade-item__version">
                                    从 {{ contentItems(row)[ 0 ].version }} 升级到 {{ contentItems(row)[ 0 ].upgrade_version }}
                                </span>
                            </div>

                            <!-- 仅一项：无需展开 -->
                            <template v-if="contentItems(row).length > 1">
                                <div v-for="(item, index) in (isExpanded(row) ? contentItems(row).slice(1) : [])" :key="index" class="upgrade-item">
                                    <span class="upgrade-item__app">{{ item.app?.app_name }}</span>
                                    <span class="upgrade-item__version">
                                        从 {{ item.version }} 升级到 {{ item.upgrade_version }}
                                    </span>
                                </div>
                                <div class="upgrade-items__toggle" @click="toggleExpand(row)">
                                    <el-icon class="upgrade-items__arrow" :class="{ 'is-open': isExpanded(row) }"><ArrowDown /></el-icon>
                                    {{ isExpanded(row) ? t('collapse') : t('expandAll', { count: contentItems(row).length }) }}
                                </div>
                            </template>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" :label="t('completeTime')" width="220px" />
                <el-table-column prop="status_name" :label="t('status')" width="120px">
                    <template #default="{ row }">
                        <el-tag :type="statusTag(row.status)" size="small" effect="light">{{ row.status_name }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="备份路径" width="220px" show-overflow-tooltip>
                    <template #default="{ row }">
                        <div v-if="row.backup_dir" class="flex items-center gap-[6px]">
                            <span class="text-[13px]">{{ row.backup_dir }}</span>
                            <!-- 升级时未勾选备份：本次没有新备份，回滚 / 恢复基于最近一次备份 -->
                            <el-tag v-if="!row.backup_own" size="small" effect="plain" type="info">沿用上次备份</el-tag>
                        </div>
                        <span v-else class="text-[13px] text-[#a0a3bd]">-</span>
                    </template>
                </el-table-column>
                <el-table-column :label="t('operation')" align="right" width="220px">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="toTaskDetail(row)">{{ t('detail') }}</el-button>
                        <!-- 只清理该升级产生的备份（备份记录 + 归档目录），升级记录保留 -->
                        <el-button class="table-delete" link v-if="row.backup_dir" @click="deleteBackup([row.upgrade_key])">
                            删除备份
                        </el-button>
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

    </div>

    <el-dialog v-model="failReasonDialogVisible" :title="t('failReason')" width="60%">
        <el-scrollbar class="h-[60vh] w-full whitespace-pre-wrap p-[20px]">
            <div v-html="failReason"></div>
        </el-scrollbar>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, nextTick } from 'vue'
import { t } from '@/lang'
import {ElMessage, ElMessageBox, ElTable, FormInstance} from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import TablePagination from '@/components/table-pagination/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'
import { getUpgradeRecords, delUpgradeBackup } from '@/app/api/upgrade'
import useTaskRunnerStore from '@/stores/modules/taskRunner'

const runner = useTaskRunnerStore()
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()

const searchFormRef = ref<FormInstance>()
const tableRef = ref<InstanceType<typeof ElTable>>()
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
 * 升级明细（本次升级涉及的应用列表）
 * 兼容两种历史结构：无明细 / 明细为字符串时返回空数组，交由单行分支展示
 */
const contentItems = (row: any): any[] => {
    if (!row?.content || typeof row.content === 'string') return []
    return Array.isArray(row.content.content) ? row.content.content : []
}

/** 明细展开状态（key 用 upgrade_key，跨页刷新后仍保留） */
const expandedKeys = ref<Set<string>>(new Set())
const expandKey = (row: any): string => String(row?.upgrade_key || row?.id || '')

const isExpanded = (row: any): boolean => expandedKeys.value.has(expandKey(row))

/** 展开 / 收起明细：多条应用时点击「展开全部 / 收起」切换 */
const toggleExpand = (row: any): void => {
    const key = expandKey(row)
    if (key === '') return

    const next = new Set(expandedKeys.value)
    next.has(key) ? next.delete(key) : next.add(key)
    expandedKeys.value = next
}

/**
 * 状态标签配色（状态值取自 UpgradeDict：ready / complete / fail / cancel）
 */
const statusTag = (status: string): any => {
    if (status === 'complete') return 'success'
    if (status === 'fail') return 'danger'
    if (status === 'cancel') return 'info'
    return 'primary' // ready 准备执行
}

/**
 * 获取列表
 */
const loadList = (page: number = 1) => {
    tableData.loading = true
    tableData.page = page
    return getUpgradeRecords({
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

/**
 * 打开任务详情（全局抽屉）：升级记录的 upgrade_key 即升级任务的 task_key
 * （执行过程、步骤、产物统一在任务详情里查看，不离开当前页）
 */
const toTaskDetail = (row: any) => {
    if (!row?.upgrade_key) {
        ElMessage.warning('该记录缺少任务标识')
        return
    }
    runner.openDetail(String(row.upgrade_key), 'upgrade')
}

const failReason = ref('')
const failReasonDialogVisible = ref(false)
const handleFailReason = (data: any) => {
    failReason.value = data.fail_reason
    failReasonDialogVisible.value = true
}

/**
 * 行是否可勾选：没有可删除的备份时不可选（与「删除备份」按钮的禁用条件一致）
 */
const selectable = (row: any): boolean => !!row.backup_dir

/** 已勾选的升级记录（id 用于跨页复选同步，upgrade_key 用于删除备份） */
const selectedRows = ref<Array<{ id: number, upgrade_key: string }>>([])
const selectionLoading = ref(false)
const syncingSelection = ref(false)
const selectedCount = computed(() => selectedRows.value.length)
/** 选中记录的升级任务标识（删除备份的入参） */
const selectedKeys = computed(() => selectedRows.value.map(row => row.upgrade_key).filter(Boolean))

/**
 * 将跨页选择状态同步到当前页复选框
 */
const syncCurrentPageSelection = async () => {
    await nextTick()
    syncingSelection.value = true
    tableRef.value?.clearSelection()
    const selectedIdSet = new Set(selectedRows.value.map(row => row.id))
    tableData.data.forEach((row: any) => {
        if (selectedIdSet.has(row.id)) tableRef.value?.toggleRowSelection(row, true)
    })
    await nextTick()
    syncingSelection.value = false
}

const handleSelectionChange = (rows: any[]) => {
    if (syncingSelection.value) return
    const currentPageIds = new Set(tableData.data.map((row: any) => row.id))
    // 保留其它页已勾选的记录，再合并当前页
    const otherPage = selectedRows.value.filter(row => !currentPageIds.has(row.id))
    const current   = rows.map((row: any) => ({ id: row.id, upgrade_key: String(row.upgrade_key ?? '') }))

    const map = new Map<number, { id: number, upgrade_key: string }>()
    ;[ ...otherPage, ...current ].forEach(item => map.set(item.id, item))
    selectedRows.value = Array.from(map.values())
}

/**
 * 重新选择当前页数据
 */
const selectCurrentPage = () => {
    // 只选可删除备份的记录：无备份的行不可勾选，这里同样跳过
    selectedRows.value = tableData.data
        .filter((row: any) => selectable(row))
        .map((row: any) => ({ id: row.id, upgrade_key: String(row.upgrade_key ?? '') }))
    syncCurrentPageSelection()
}

/**
 * 清空全部分页选择
 */
const clearSelection = () => {
    selectedRows.value = []
    syncingSelection.value = true
    tableRef.value?.clearSelection()
    nextTick(() => {
        syncingSelection.value = false
    })
}

const batchDeleteBackup = () => {
    if (!selectedKeys.value.length) {
        ElMessage({ message: '请先勾选要删除备份的记录', type: 'error', duration: 5000 })
        return
    }
    deleteBackup([ ...selectedKeys.value ])
}

/**
 * 删除备份：清理升级产生的备份记录与归档目录，升级记录本身保留
 */
const deleteBackup = (keys: string[]) => {
    const list = (keys ?? []).filter(Boolean)
    if (!list.length) {
        ElMessage({ message: '该记录暂无可删除的备份', type: 'warning' })
        return
    }

    ElMessageBox.confirm('确认删除该升级产生的备份？备份文件将被清除且不可恢复（升级记录本身保留）。', t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        delUpgradeBackup(list).then(() => {
            clearSelection()
            loadList()
        }).catch(() => {
        })
    }).catch(() => {
    })
}
</script>

<style lang="scss" scoped>
/* 升级明细：应用名加粗、版本从浅色，多条合并成一行摘要 */

/* 该列单元格顶部对齐：展开时内容高度增加会向下生长，
   避免 el-table 默认垂直居中导致内容在行高变化时被「重新居中」而上下回弹 */
:deep(.upgrade-name-col) {
    // vertical-align: top;
}

.upgrade-item {
    display: flex;
    align-items: baseline;
    gap: 2px;
    font-size: 13px;
    line-height: 22px;
}

.upgrade-item__app {
    color: #1d1f3a;
}

.upgrade-item__version {
    color: #6b7280;
}

.upgrade-items {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

/* 多条应用：平铺展示，无缩进 / 无左侧竖线（各项等同，无从属关系） */
.upgrade-items__toggle {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    margin-top: 2px;
    font-size: 12px;
    line-height: 18px;
    color: var(--el-color-primary);
    cursor: pointer;
    user-select: none;
    width: fit-content;

    &:hover {
        opacity: .8;
    }
}
.upgrade-item__app {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: 64px;
    height: var(--cmp-table-line-height);
    padding: 0 var(--sys-space-2);
    border-radius: var(--sys-radius-sm);
    background-color: var(--sys-color-fill-light);
    color: var(--sys-color-text-regular);
    font-size: var(--sys-font-size-xs);
    line-height: var(--cmp-table-line-height);
    white-space: nowrap;
}

.upgrade-items__arrow {
    flex-shrink: 0;
    font-size: 12px;
    transition: transform .2s ease;

    &.is-open {
        transform: rotate(180deg);
    }
}
</style>
