<template>
    <div ref="pageRef" class="main-container w-full table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">
            <!-- 筛选区：只放筛选条件与查询动作，独立成块 -->
            <el-card class="box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search" shadow="never">
                <el-form :inline="true" @submit.prevent>
                    <el-form-item label="任务类型">
                        <el-select v-model="filters.task_type" placeholder="全部" clearable class="!w-[150px]">
                            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="任务状态">
                        <el-select v-model="filters.status" placeholder="全部" clearable class="!w-[150px]">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="关键字">
                        <el-input v-model="filters.keyword" placeholder="任务标题 / 任务编号" clearable class="!w-[220px]"
                                  @keyup.enter="handleSearch" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="handleSearch">查询</el-button>
                        <el-button @click="handleReset">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="table-panel table-fill-page__panel">
                <table-toolbar title="任务管理" :selectable="false">
                    <template #actions>
                        <el-button :icon="Refresh" @click="loadList">刷新</el-button>
                    </template>
                </table-toolbar>
                <div class="table-fill-page__table">
                <el-table height="100%" v-loading="loading" :data="list">
                    <el-table-column label="类型" width="110">
                        <template #default="{ row }">
                            <span class="text-[13px]">{{ row.task_type_name || row.task_type || '-' }}</span>
                        </template>
                    </el-table-column>
    
                    <el-table-column label="目标/版本" min-width="200" show-overflow-tooltip>
                        <template #default="{ row }">
                            <div class="flex flex-col">
                                <span class="font-medium">{{ row.title || row.task_key }}</span>
                                <span class="text-[12px] text-[#94a3b8]">{{ row.task_key }}</span>
                            </div>
                        </template>
                    </el-table-column>
    
                    <el-table-column label="状态" width="140">
                        <template #default="{ row }">
                            <div class="flex items-center gap-[6px]">
                                <el-tag :type="statusTag(row.status)" size="small" effect="light">{{ statusText(row) }}</el-tag>
                            </div>
                        </template>
                    </el-table-column>
    
                    <el-table-column prop="create_time" label="创建时间" width="170" />
    
                    <el-table-column label="信息" min-width="220" show-overflow-tooltip>
                        <template #default="{ row }">
                            <span :class="['text-[13px]', row.status==='failed' || row.status==='rollback_failed' ? 'text-[#f56c6c]' : 'text-[var(--el-text-color-regular)]']">
                                {{ infoText(row) || '-' }}
                            </span>
                        </template>
                    </el-table-column>
    
                    <el-table-column label="操作" width="220" fixed="right">
                        <template #default="{ row }">
                            <el-button link type="primary" size="small" @click="toDetail(row)">详情</el-button>
                            <!-- 备份记录：已完成且为备份类型的任务可执行恢复 -->
                            <el-button v-if="canRestore(row)" link type="primary" size="small" @click="restoreOne(row)">恢复</el-button>
                            <!-- 非终态：执行中可取消，排队中（created）取消后不再被执行 -->
                            <el-button v-if="!row.is_terminal" link type="danger" size="small" @click="cancelOne(row)">取消</el-button>
                            <el-popconfirm
                                title="确认删除该任务？"
                                confirm-button-text="删除"
                                cancel-button-text="取消"
                                confirm-button-type="danger"
                                @confirm="deleteOne(row)"
                            >
                                <template #reference>
                                    <el-button link type="danger" size="small" :disabled="!row.is_terminal">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
    
                    <template #empty>
                        <div class="py-[30px] text-[13px] text-[#94a3b8]">暂无任务记录</div>
                    </template>
                </el-table>
                </div>
    
                <table-pagination
                    v-model:current-page="page"
                    v-model:page-size="limit"
                    :total="total"
                    :page-sizes="[10, 20, 50]"
                    layout="total, sizes, prev, pager, next"
                    @current-change="loadList"
                    @size-change="handleSizeChange"
                />
            </div>
        </div>

        <!-- 备份 / 恢复前校验（统一校验组件）：校验通过后自动下一步创建任务 -->
        <el-dialog v-model="checkVisible" title="备份环境校验" width="580px" :destroy-on-close="true"
                   :close-on-click-modal="false" append-to-body>
            <verify-panel ref="checkRef" scene="backup" :auto-next="true"
                          prev-text="取消" next-text="开始备份"
                          @next="onCheckNext" @prev="checkVisible = false" />
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { getTaskRecords, delTaskRecords, createTask, getTaskConfig, cancelTask } from '@/app/api/task'
import TableActions from '@/components/table-actions/index.vue'
import TablePagination from '@/components/table-pagination/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import VerifyPanel from '@/app/components/verify-panel/index.vue'
import useTaskRunnerStore from '@/stores/modules/taskRunner'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'

const runner = useTaskRunnerStore()

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()

/**
 * 删除任务（原气泡确认改为弹窗确认，保证二次确认不丢失）
 */
const confirmDeleteTask = (row: any) => {
    ElMessageBox.confirm('确认删除该任务？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        deleteOne(row)
    }).catch(() => {})
}

/**
 * 表格行内操作：超过 2 个自动收进「更多」
 */
const rowActions = (row: any) => [
    { label: '详情', onClick: () => toDetail(row) },
    { label: '恢复', show: canRestore(row), onClick: () => restoreOne(row) },
    { label: '删除', type: 'danger', disabled: !row.is_terminal, onClick: () => confirmDeleteTask(row) }
]

// ==================== 筛选与列表 ====================

/** 任务类型 / 状态筛选项：由后端 TaskDict 统一维护，页面只负责拉取渲染（避免写死） */
const typeOptions = ref<Array<{ label: string, value: string }>>([])
const statusOptions = ref<Array<{ label: string, value: string }>>([])

/** 拉取筛选配置（类型 / 状态选项） */
function loadConfig() {
    getTaskConfig().then((res: any) => {
        typeOptions.value = res.data?.types || []
        statusOptions.value = res.data?.status || []
    }).catch(() => {
        typeOptions.value = []
        statusOptions.value = []
    })
}

const filters = reactive({
    task_type: '',
    status: '',
    keyword: ''
})

const list = ref<any[]>([])
const loading = ref(false)
const page = ref(1)
const limit = ref(10)
const total = ref(0)

function statusTag(status: string): any {
    if (status === 'success') return 'success'
    if (status === 'failed' || status === 'rollback_failed') return 'danger'
    if (status === 'canceled' || status === 'rolled_back') return 'info'
    if (status === 'waiting_input') return 'warning'
    if (status === 'created') return 'info'
    return 'primary'
}

/** 状态文案：created 即「排队中」，等待同站点槽位空闲后被调度执行 */
function statusText(row: any): string {
    if (row.status === 'created') return '排队中'
    return row.status_name || row.status || '-'
}

function infoText(row: any): string {
    if (row.fail_reason && typeof row.fail_reason === 'object') {
        return row.fail_reason.Message || row.fail_reason.message || Object.values(row.fail_reason).join(' ')
    }
    if (row.fail_reason) return String(row.fail_reason)
    return row.stage || ''
}

/**
 * 解析任务业务入参（DB 中为 JSON 字符串）
 */
function taskParams(row: any): any {
    if (!row || !row.params) return {}
    try {
        return typeof row.params === 'string' ? JSON.parse(row.params) : row.params
    } catch (e) {
        return {}
    }
}

/**
 * 是否可恢复：备份类型 + 已成功终态 + 本次任务为备份（非恢复）
 */
function canRestore(row: any): boolean {
    return row.task_type === 'backup' && !!row.is_terminal && row.status === 'success' && taskParams(row).mode === 'backup'
}

/**
 * 加载列表：所有类型统一一张表，类型作为筛选条件而非分块
 */
function loadList() {
    loading.value = true

    const params: Record<string, any> = { page: page.value, limit: limit.value }
    // 空值不下发，交给后端默认行为（不带该搜索器）
    if (filters.task_type) params.task_type = filters.task_type
    if (filters.status) params.status = filters.status
    if (filters.keyword) params.keyword = filters.keyword

    getTaskRecords(params).then((res: any) => {
        list.value = res.data.data || []
        total.value = res.data.total || 0
    }).catch(() => {
        list.value = []
        total.value = 0
    }).finally(() => {
        loading.value = false
    })
}

/** 查询：回到第一页 */
function handleSearch() {
    page.value = 1
    loadList()
}

/** 重置筛选条件并重新查询 */
function handleReset() {
    filters.task_type = ''
    filters.status = ''
    filters.keyword = ''
    handleSearch()
}

function handleSizeChange() {
    page.value = 1
    loadList()
}

// ==================== 备份 / 恢复前校验（统一校验组件） ====================
const checkVisible = ref(false)
const checkRef = ref<any>(null)
/** 校验通过后待执行的备份参数 */
const pendingBackup = ref<Record<string, any> | null>(null)

/**
 * 发起备份 / 恢复：先做环境校验，通过（autoNext）后再创建任务并跳转详情页
 * （详情页左侧步骤 / 中间执行输出 / 右侧任务信息与执行进度，可全程观察任务推进）
 */
function startBackupTask(params: Record<string, any>) {
    pendingBackup.value = params
    checkVisible.value = true
}

/** 校验通过后的下一步：真正创建备份 / 恢复任务 */
function onCheckNext() {
    const params = pendingBackup.value
    checkVisible.value = false
    pendingBackup.value = null
    if (!params) return

    doCreateBackupTask(params)
}

function doCreateBackupTask(params: Record<string, any>) {
    // 先占位打开任务详情：创建期间不留空窗
    runner.openPendingDetail('backup', params.mode === 'restore' ? '正在发起恢复' : '正在发起备份')
    createTask('backup', params).then((res: any) => {
        const key = res?.data?.task_key
        if (!key) {
            runner.closePendingDetail()
            ElMessage.error('任务创建失败')
            return
        }
        // 同步一次列表，返回列表页时即可看到新记录
        loadList()
        toDetail({
            task_key: key,
            task_type: 'backup',
            title: params.mode === 'restore' ? '系统恢复' : '系统备份'
        })
    }).catch((err: any) => {
        runner.closePendingDetail()
        ElMessage({ message: err?.msg || err?.message || '任务创建失败', type: 'error' })
    })
}

// 手动备份
function manualBackup() {
    startBackupTask({ mode: 'backup' })
}

// 使用指定备份记录执行恢复（备份任务的 task_key 即备份记录的 backup_key）
function restoreOne(row: any) {
    ElMessageBox.confirm(
        '确认使用该备份进行恢复？恢复将覆盖当前系统代码与数据，请谨慎操作。',
        '提示',
        {
            confirmButtonText: '确认恢复',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        startBackupTask({ mode: 'restore', backup_key: row.task_key })
    }).catch(() => {
    })
}

/** 打开任务详情（全局抽屉，不离开列表页） */
function toDetail(row: any) {
    if (!row?.task_key) {
        ElMessage.warning('该记录缺少任务标识')
        return
    }
    // 带上任务类型：同一 task_key 可能存在多条记录（如升级任务与其产生的备份），
    // 详情页据此确定产物口径，避免按 key 反查命中先插入的那条
    runner.openDetail(String(row.task_key), String(row.task_type || ''))
}

function deleteOne(row: any) {
    delTaskRecords([row.id]).then(() => {
        loadList()
    })
}

/** 取消任务：执行中终止、排队中移出队列（取消后同站点排队任务会继续被调度） */
function cancelOne(row: any) {
    const tip = row.status === 'created' ? '确认取消该排队中的任务？' : '确认取消该任务？'
    ElMessageBox.confirm(tip, '提示', {
        confirmButtonText: '确认取消',
        cancelButtonText: '关闭',
        type: 'warning'
    }).then(() => {
        cancelTask(String(row.task_key)).then(() => {
            loadList()
        }).catch((err: any) => {
            ElMessage({ message: err?.msg || err?.message || '任务取消失败', type: 'error' })
        })
    }).catch(() => {
    })
}

onMounted(() => {
    loadConfig()
    loadList()
})
</script>

<style scoped>
::deep(.el-card__header) {
    padding: 14px 18px;
    border-bottom: 1px solid var(--el-border-color-lighter);
}
::deep(.el-card__body) {
    padding: 12px 18px;
}
</style>
