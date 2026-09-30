<template>
    <!--框架补丁管理-->
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">
            <el-card class="box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search" shadow="never">
                <el-form :inline="true" :model="searchParam" ref="searchFormRef">
                    <el-form-item :label="t('patchTitle')" prop="title">
                        <el-input v-model.trim="searchParam.title" clearable :placeholder="t('patchTitlePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('resolveStatus')" prop="is_resolved">
                        <el-select v-model="searchParam.is_resolved" clearable :placeholder="t('resolveStatusPlaceholder')">
                            <el-option :label="t('all')" value="" />
                            <el-option :label="t('unresolved')" :value="0" />
                            <el-option :label="t('resolved')" :value="1" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="table-panel table-fill-page__panel">
                <table-toolbar :title="pageName" :selectable="false">
                    <template #actions>
                        <el-button type="primary" :loading="syncing" @click="syncPatch">{{ t('syncPatch') }}</el-button>
                    </template>
                </table-toolbar>
                <div class="table-fill-page__table">
                    <el-table height="100%" :data="tableData.data" size="large" v-loading="tableData.loading">
                        <template #empty>
                            <span>{{ !tableData.loading ? t('emptyData') : '' }}</span>
                        </template>

                        <el-table-column :label="t('patchNo')" min-width="120">
                            <template #default="{ row }">
                                <span>{{ row.patch_no || '-' }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column :label="t('appName')" min-width="130">
                            <template #default="{ row }">
                                <span>{{ row.app_key || '-' }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column :label="t('patchTitle')" min-width="200" show-overflow-tooltip>
                            <template #default="{ row }">
                                <span>{{ row.title || '-' }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column :label="t('frameworkVersion')" min-width="120">
                            <template #default="{ row }">
                                <span>{{ row.app_version || row.framework_version_no || '-' }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column :label="t('releaseTime')" min-width="160">
                            <template #default="{ row }">
                                <span>{{ row.release_time || '-' }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column :label="t('resolveStatus')" min-width="110">
                            <template #default="{ row }">
                                <el-tag :type="Number(row.is_resolved) === 1 ? 'success' : 'warning'" size="small" effect="light">
                                    {{ row.resolve_name }}
                                </el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column :label="t('operation')" align="right" fixed="right" width="220">
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

        <!-- 补丁详情：抽屉展示（内容组织与消息详情一致：标题 + 标签 + 基本信息 + 富文本内容 + 附件） -->
        <el-drawer v-model="detailVisible" :title="patchInfo.title || t('patchDetail')" size="55%">
            <div v-loading="detailLoading">
                <template v-if="patchInfo.id">
                    <div class="mb-[12px]">
                        <div class="text-[16px] font-bold text-[#1D1F3A] mb-[8px]">{{ patchInfo.title }}</div>
                        <div class="flex items-center flex-wrap gap-[8px]">
                            <el-tag size="small" effect="plain">{{ patchInfo.patch_no || '-' }}</el-tag>
                            <el-tag size="small" effect="plain">{{ patchInfo.app_key || '-' }}</el-tag>
                            <el-tag size="small" effect="plain" :type="Number(patchInfo.is_resolved) === 1 ? 'success' : 'warning'">
                                {{ patchInfo.resolve_name }}
                            </el-tag>
                        </div>
                    </div>

                    <el-descriptions :column="2" border class="mb-[12px]">
                        <el-descriptions-item :label="t('appName')">{{ patchInfo.app_key || '-' }}</el-descriptions-item>
                        <el-descriptions-item :label="t('frameworkVersion')">
                            {{ patchInfo.app_version || patchInfo.framework_version_no || '-' }}
                        </el-descriptions-item>
                        <el-descriptions-item :label="t('releaseTime')">{{ patchInfo.release_time || '-' }}</el-descriptions-item>
                        <el-descriptions-item :label="t('syncTime')">{{ patchInfo.create_time || '-' }}</el-descriptions-item>
                        <el-descriptions-item :label="t('resolveStatus')">{{ patchInfo.resolve_name }}</el-descriptions-item>
                        <el-descriptions-item :label="t('resolvedTime')">
                            {{ Number(patchInfo.is_resolved) === 1 ? (patchInfo.resolved_time || '-') : '-' }}
                        </el-descriptions-item>
                    </el-descriptions>

                    <div class="mb-[12px]">
                        <div class="text-[13px] text-[#6b7280] mb-[6px]">{{ t('patchDesc') }}</div>
                        <!-- description 为富文本（补丁说明，含示意图），与补丁消息的内容展示保持一致 -->
                        <div v-if="patchInfo.description" class="patch-content-box">
                            <div v-html="patchInfo.description"></div>
                        </div>
                        <div v-else class="patch-content-box">{{ t('noPatchDesc') }}</div>
                    </div>

                    <div class="flex items-center justify-end gap-[8px]">
                        <el-button v-if="patchInfo.attach_url" type="primary" @click="downloadAttach(patchInfo)">
                            {{ t('downloadPatch') }}
                        </el-button>
                        <!-- 已解决后不再提供取消标记的操作 -->
                        <el-button v-if="Number(patchInfo.is_resolved) !== 1" type="success" plain @click="toggleResolve(patchInfo)">
                            {{ t('markResolved') }}
                        </el-button>
                    </div>
                </template>

                <el-empty v-else :description="t('emptyData')" />
            </div>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { getFrameworkPatchList, getFrameworkPatchInfo, syncFrameworkPatch, resolveFrameworkPatch } from '@/app/api/upgrade'
import TableActions from '@/components/table-actions/index.vue'
import TablePagination from '@/components/table-pagination/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import { useRoute } from 'vue-router'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'

const route = useRoute()
const pageName = route.meta.title

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()

const searchFormRef = ref<FormInstance>()

const tableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [] as any[]
})

const searchParam = reactive({
    title: '',
    is_resolved: '' as '' | 0 | 1 | null
})

const syncing = ref(false)
const detailVisible = ref(false)
const detailLoading = ref(false)
/** 抽屉中的补丁详情（接口返回，字段比列表全） */
const patchInfo = ref<any>({})

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadList()
}

/** 表格行内操作 */
const rowActions = (row: any) => [
    { label: t('patchDetail'), onClick: () => showDetail(row) },
    { label: t('download'), show: !!row.attach_url, onClick: () => downloadAttach(row) },
    { label: t('markResolved'), type: 'success' as const, show: Number(row.is_resolved) !== 1, onClick: () => toggleResolve(row) }
]

const loadList = (page: number = 1) => {
    tableData.loading = true
    if (page) tableData.page = page

    const resolved = searchParam.is_resolved

    getFrameworkPatchList({
        page: tableData.page,
        limit: tableData.limit,
        title: searchParam.title,
        is_resolved: resolved === 0 || resolved === 1 ? resolved : ''
    }).then((res: any) => {
        tableData.data = res.data.data
        tableData.total = res.data.total
        tableData.loading = false
    }).catch(() => {
        tableData.loading = false
    })
}

/** 立即同步云端补丁 */
const syncPatch = () => {
    if (syncing.value) return
    syncing.value = true

    syncFrameworkPatch().then((res: any) => {
        const data = res?.data ?? {}
        ElMessage({
            message: Number(data.new) > 0
                ? `${ t('syncPatchTip') }：新增 ${ data.new } 条（共 ${ data.total ?? 0 } 条）`
                : t('syncPatchNone'),
            type: 'success'
        })
        loadList()
    }).catch((err: any) => {
        ElMessage({ message: err?.msg || err?.message || t('syncPatchFail'), type: 'error' })
    }).finally(() => {
        syncing.value = false
    })
}

/**
 * 标记已解决
 *
 * 只提供「标记」这一个方向：标记后不可取消（记录的是「已处理过」这一事实）
 */
const toggleResolve = (row: any) => {
    if (Number(row.is_resolved) === 1) return

    ElMessageBox.confirm(t('markResolvedTips'), t('warning'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning'
    }).then(() => {
        resolveFrameworkPatch(Number(row.id), 1).then(() => {
            loadList()
            // 抽屉内标记时同步刷新详情（保持「处理状态」与按钮一致）
            if (detailVisible.value && patchInfo.value.id === Number(row.id)) {
                loadDetail(Number(row.id))
            }
        }).catch((err: any) => {
            ElMessage({ message: err?.msg || err?.message || t('resolveFail'), type: 'error' })
        })
    }).catch(() => {
    })
}

/** 加载补丁详情（抽屉用） */
const loadDetail = (id: number) => {
    detailLoading.value = true

    getFrameworkPatchInfo(id).then((res: any) => {
        patchInfo.value = res?.data ?? {}
        detailLoading.value = false
    }).catch(() => {
        patchInfo.value = {}
        detailLoading.value = false
    })
}

const showDetail = (row: any) => {
    patchInfo.value = {}
    detailVisible.value = true
    loadDetail(Number(row.id))
}

/** 下载补丁附件 */
const downloadAttach = (row: any) => {
    if (!row.attach_url) return
    window.open(row.attach_url, '_blank')
}

loadList()
</script>

<style lang="scss" scoped>
/* 补丁说明：与消息详情里的内容区块保持一致（浅灰底、圆角、富文本） */
.patch-content-box {
    padding: 12px 14px;
    min-height: 80px;
    font-size: 13px;
    line-height: 22px;
    color: #303133;
    background-color: #fafafa;
    border-radius: 4px;
    white-space: pre-wrap;
    word-break: break-all;
}
</style>
