<template>
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">
            <!-- 小程序同步说明：原 el-alert 自带关闭功能，保留关闭按钮 -->
            <tip-notice closable>
                <p v-for="(line, index) in updateTipList" :key="index">{{ line }}</p>
            </tip-notice>

            <div class="table-panel mt-[20px] table-fill-page__panel">
                <table-toolbar :title="pageName" :selectable="false">
                    <template #actions>
                        <el-button type="primary" @click="commit()">
                            {{ t('oneClickSync') }}
                        </el-button>
                    </template>
                </table-toolbar>
                <div class="table-fill-page__table">
                <el-table height="100%" :data="siteGroupCommitRecordTableData.data" size="large" v-loading="siteGroupCommitRecordTableData.loading">
                    <template #empty>
                        <span>{{ !siteGroupCommitRecordTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="group_name" :label="t('groupName')" />

                    <el-table-column :label="t('userVersion')" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.commit_record.user_version || '--' }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="create_time" :label="t('createTime')">
                        <template #default="{ row }">
                            {{ row.commit_record.create_time || '--' }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="create_time" :label="t('status')">
                        <template #default="{ row }">
                            <div v-if="row.commit_record.user_version">
                                {{ row.commit_record.status_name }}
                                <div v-if="row.commit_record.status == 1 && row.commit_record.template_id == '0'" class="text-error">
                                    {{ t('syncTemplateError') }}
                                </div>
                            </div>
                            <div>--</div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="create_time" :label="t('templateID')">
                        <template #default="{ row }">
                            {{ row.commit_record.template_id || '--' }}
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" align="right" fixed="right" width="360">
                        <template #default="{ row }">
                            <table-actions :actions="rowActions(row)" />
                        </template>
                    </el-table-column>
                </el-table>
                </div>
            </div>

            <table-pagination
                v-model:current-page="siteGroupCommitRecordTableData.page"
                v-model:page-size="siteGroupCommitRecordTableData.limit"
                :total="siteGroupCommitRecordTableData.total"
                @size-change="loadSiteGroupCommitRecordTableData()"
                @current-change="loadSiteGroupCommitRecordTableData"
            />
        </div>
    </div>

    <el-dialog v-model="commitRecordDialogShow" :title="t('weappVersionUpdateRecord')" width="1000px" :destroy-on-close="true">
        <el-table :data="commitRecordTableData.data" size="large" v-loading="commitRecordTableData.loading">
            <template #empty>
                <span>{{ !commitRecordTableData.loading ? t('emptyData') : '' }}</span>
            </template>

            <el-table-column prop="user_version" :label="t('userVersion')" />
            <el-table-column :label="t('status')" prop="status_name">
                <template #default="{ row }">
                    <div>{{ row.status_name }}</div>
                    <div class="text-error flex items-center" v-if="canSyncTemplate(row)">
                        <el-icon class="mr-[2px]"><Warning /></el-icon>
                        尚未同步到模板库
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" :label="t('createTime')"></el-table-column>
            <el-table-column :label="t('operation')" align="right" fixed="right" width="220">
                <template #default="{ row }">
                    <el-button type="primary" link v-if="canSyncTemplate(row)" @click="syncTemplate(row)">同步模板库</el-button>
                    <el-button type="primary" link v-if="row.status == 0 || row.status == -1 || canSyncTemplate(row)" @click="deleteVersion(row)">{{ t('delete') }}</el-button>
                    <el-button type="primary" link v-if="row.status == -1" @click="handleFailReason(row)">{{ t('failReason') }}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="mt-[16px] flex justify-end">
            <el-pagination v-model:current-page="commitRecordTableData.page" v-model:page-size="commitRecordTableData.limit" layout="total, sizes, prev, pager, next, jumper" :total="commitRecordTableData.total" @size-change="loadCommitRecordList()" @current-change="loadCommitRecordList" />
        </div>
    </el-dialog>

    <!-- 同步模板库前校验：通过后创建任务并跳转任务详情 -->
    <el-dialog v-model="checkVisible" title="同步前校验" width="580px"
               :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <div class="min-h-[150px]">
            <verify-panel v-if="checkVisible" scene="weapp_commit" :params="checkParams"
                          :auto-next="true" :auto-next-delay="500" :show-prev="false"
                          :next-text="t('nextStep')" @next="onCheckPassed" />
        </div>
    </el-dialog>

    <el-dialog v-model="failReasonDialogShow" :title="t('failReason')" width="60%">
        <el-scrollbar class="h-[60vh] w-full whitespace-pre-wrap p-[20px]">
            {{ failReason }}
        </el-scrollbar>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="helpInfo">{{ t('helpInfo') }}</el-button>
                <el-button @click="failReasonDialogVisible = false">
                    {{ t('close') }}
                </el-button> 
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getWeappLastCommitRecord, getWeappCommitRecord, getSiteGroupCommitRecord, syncSiteWeapp, delVersion, syncTemplate as syncTemplateApi } from '@/app/api/wxoplatform'
import { createTask } from '@/app/api/task'
import { t } from '@/lang'
import TableActions from '@/components/table-actions/index.vue'
import TablePagination from '@/components/table-pagination/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import TipNotice from '@/components/tip-notice/index.vue'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'
import { ElMessageBox, ElMessage } from 'element-plus'
import VerifyPanel from '@/app/components/verify-panel/index.vue'
import useTaskRunnerStore from '@/stores/modules/taskRunner'

const runner = useTaskRunnerStore()
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()

/** 同步说明按换行拆分为多段，保持原文的分条展示 */
const updateTipList = computed(() =>
    String(t('updateTips')).split('\n').map(line => line.trim()).filter(Boolean)
)

/**
 * 表格行内操作：超过 2 个自动收进「更多」
 */
const rowActions = (row: any) => [
    { label: t('weappVersionUpdate'), loading: uploading.value == row.group_id, onClick: () => commit(row.group_id) },
    { label: t('weappVersionUpdateRecord'), onClick: () => showCommitRecordDialog(row.group_id) },
    { label: t('siteWeappSync'), onClick: () => syncSiteWeappFn(row.group_id) }
]
const uploading = ref(0)
const lastRecord = ref({})
const commitRecordDialogShow = ref(false)
const commitRecordTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        site_group_id: ''
    }
})
const siteGroupCommitRecordTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {}
})
const failReason = ref('')
const failReasonDialogShow = ref(false)

const handleFailReason = (data: any) => {
    failReason.value = data.fail_reason
    failReasonDialogShow.value = true
}
const helpInfo = () => {
    window.open('https://doc.press.niucloud.com/php/saas-framework/use/configFAQ/minWaChatUpload.html')
}

const deleteVersion = (data: any) => {
    ElMessageBox.confirm(t('delWeappVersionTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        delVersion(data.id).then(() => {
            loadCommitRecordList()
        })
    })
}

getWeappLastCommitRecord().then(({ data }) => {
    lastRecord.value = data
})

// ==================== 同步模板库（校验 -> 任务 -> 详情） ====================
const checkVisible = ref(false)
/** 待同步的套餐，空表示「一键同步」全部套餐 */
const pendingGroupId = ref<any>('')
const checkParams = computed(() => ({ site_group_id: pendingGroupId.value }))

/**
 * 上传成功但未入模板库的记录：可补跑「同步模板库」或删除
 */
const canSyncTemplate = (row: any) => row.status == 1 && (!row.template_id || row.template_id == '0')

/** 对单条「上传成功」记录直接补跑同步模板库（不创建任务，后端直接走草稿匹配 -> 入模板库 -> 回写模板ID） */
const syncTemplate = (row: any) => {
    syncTemplateApi(row.id).then(() => {
        loadCommitRecordList()
    })
}

/**
 * 同步模板库：先做前置校验，通过后再创建任务
 * 上传按套餐逐个执行（每个套餐一个步骤），过程统一在任务详情查看
 */
const commit = (siteGroupId: any = '') => {
    if (checkVisible.value) return
    pendingGroupId.value = siteGroupId
    checkVisible.value = true
}

/** 校验通过：创建同步任务并跳转任务详情 */
const onCheckPassed = () => {
    checkVisible.value = false

    const groupId = pendingGroupId.value
    pendingGroupId.value = ''

    uploading.value = groupId || 0
    // 先占位打开任务详情：创建期间不留空窗
    runner.openPendingDetail('weapp_commit', '正在发起同步')
    createTask('weapp_commit', { site_group_id: groupId }).then((res: any) => {
        uploading.value = 0
        const key = res?.data?.task_key
        if (!key) {
            runner.closePendingDetail()
            ElMessage.error('同步任务创建失败')
            return
        }
        // 全局抽屉打开任务详情：不离开当前页，同步过程可随时关闭继续操作
        runner.openDetail(key, 'weapp_commit')
    }).catch((err: any) => {
        uploading.value = 0
        runner.closePendingDetail()
        ElMessage({ message: err?.msg || err?.message || '同步任务创建失败', type: 'error' })
    })
}

/**
 * 获取角色列表
 */
const loadCommitRecordList = (page: number = 1) => {
    commitRecordTableData.loading = true
    commitRecordTableData.page = page

    getWeappCommitRecord({
        page: commitRecordTableData.page,
        limit: commitRecordTableData.limit,
        site_group_id: commitRecordTableData.searchParam.site_group_id
    }).then(res => {
        commitRecordTableData.loading = false
        commitRecordTableData.data = res.data.data
        commitRecordTableData.total = res.data.total
    }).catch(() => {
        commitRecordTableData.loading = false
    })
}

const loadSiteGroupCommitRecordTableData = (page: number = 1) => {
    siteGroupCommitRecordTableData.loading = true
    siteGroupCommitRecordTableData.page = page

    getSiteGroupCommitRecord({
        page: siteGroupCommitRecordTableData.page,
        limit: siteGroupCommitRecordTableData.limit
    }).then(res => {
        siteGroupCommitRecordTableData.loading = false
        siteGroupCommitRecordTableData.data = res.data.data
        siteGroupCommitRecordTableData.total = res.data.total
    }).catch(() => {
        siteGroupCommitRecordTableData.loading = false
    })
}
loadSiteGroupCommitRecordTableData()

const showCommitRecordDialog = (siteGroupId: number) => {
    commitRecordTableData.searchParam.site_group_id = siteGroupId
    loadCommitRecordList()
    commitRecordDialogShow.value = true
}

const syncSiteWeappFn = (siteGroupId: number) => {
    ElMessageBox.confirm(t('syncSiteWeappTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        syncSiteWeapp({ site_group_id: siteGroupId })
    })
}
</script>

<style lang="scss" scoped>
// :deep(.setting-card .el-card__body){
//     padding: 0 !important;
// }
</style>
