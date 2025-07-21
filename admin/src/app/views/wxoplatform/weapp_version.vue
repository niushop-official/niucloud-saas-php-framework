<template>
    <div class="main-container">
        <el-card class="box-card !border-none p-[20px]" shadow="never">
            <div class="flex justify-between items-center">
                <!-- <span class="text-page-title">{{ pageName }}</span> -->
                <el-button type="primary" class="w-[100px]" @click="commit()">
                    {{ t('oneClickSync') }}
                </el-button>
            </div>

            <div class="mt-[20px]">
                <el-alert :title="t('updateTips')" type="info" show-icon />
            </div>

            <div class="mt-[20px]">
                <el-table :data="siteGroupCommitRecordTableData.data" size="large" v-loading="siteGroupCommitRecordTableData.loading">
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

                    <el-table-column :label="t('operation')" align="right" fixed="right" width="330">
                        <template #default="{ row }">
                            <div class="flex flex-col items-end">
                                <el-button type="primary" link @click="commit(row.group_id)">{{ t('weappVersionUpdate') }}</el-button>
                                <el-button type="primary" link @click="showCommitRecordDialog(row.group_id)">{{ t('weappVersionUpdateRecord') }}</el-button>
                                <el-button type="primary" link @click="syncSiteWeappFn(row.group_id)">{{ t('siteWeappSync') }}</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="siteGroupCommitRecordTableData.page"
                               v-model:page-size="siteGroupCommitRecordTableData.limit" layout="total, sizes, prev, pager, next, jumper"
                               :total="siteGroupCommitRecordTableData.total" @size-change="loadSiteGroupCommitRecordTableData()"
                               @current-change="loadSiteGroupCommitRecordTableData" />
            </div>
        </el-card>
    </div>

    <el-dialog v-model="commitRecordDialogShow" :title="t('weappVersionUpdateRecord')" width="1000px" :destroy-on-close="true">
        <el-table :data="commitRecordTableData.data" size="large" v-loading="commitRecordTableData.loading">
            <template #empty>
                <span>{{ !commitRecordTableData.loading ? t('emptyData') : '' }}</span>
            </template>

            <el-table-column prop="user_version" :label="t('userVersion')" />
            <el-table-column :label="t('status')" prop="status_name"></el-table-column>
            <el-table-column prop="create_time" :label="t('createTime')"></el-table-column>
            <el-table-column :label="t('operation')" align="right" fixed="right" width="130">
                <template #default="{ row }">
                    <el-button type="primary" link v-if="row.status == -1" @click="handleFailReason(row)">{{ t('failReason') }}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="mt-[16px] flex justify-end">
            <el-pagination v-model:current-page="commitRecordTableData.page" v-model:page-size="commitRecordTableData.limit" layout="total, sizes, prev, pager, next, jumper" :total="commitRecordTableData.total" @size-change="loadCommitRecordList()" @current-change="loadCommitRecordList" />
        </div>
    </el-dialog>

    <el-dialog v-model="failReasonDialogShow" :title="t('failReason')" width="60%">
        <el-scrollbar class="h-[60vh] w-full whitespace-pre-wrap p-[20px]">
            {{ failReason }}
        </el-scrollbar>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getWeappLastCommitRecord, weappCommit, getWeappCommitRecord, getSiteGroupCommitRecord, syncSiteWeapp } from '@/app/api/wxoplatform'
import { t } from '@/lang'
import { ElMessageBox } from 'element-plus'

const route = useRoute()
const pageName = route.meta.title
const uploading = ref(false)
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

getWeappLastCommitRecord().then(({ data }) => {
    lastRecord.value = data
})

const commit = (siteGroupId = '') => {
    if (uploading.value) return
    uploading.value = true

    weappCommit({ site_group_id: siteGroupId }).then(() => {
        uploading.value = false
    }).catch(() => {
        uploading.value = false
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
:deep(.el-alert__title) {
    white-space: pre;
}
// :deep(.setting-card .el-card__body){
//     padding: 0 !important;
// }
</style>
