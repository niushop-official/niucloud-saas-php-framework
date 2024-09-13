<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <div class="mt-[50px] ml-[100px] h-[60vh]">
                <el-button type="primary" :loading="uploading" @click="commit">{{ t('weappVersionUpdate') }}</el-button>
                <p class="text-secondary text-sm mt-[10px]">{{ t('updateTips') }}</p>
                <p class="text-secondary text-sm mt-[10px]" v-if="lastRecord.create_time">
                    {{ t('lastTime') }}：{{ lastRecord.create_time }}
                    <el-button type="primary" link @click="commitRecordDialogShow = true">{{ t('seeUpdateRecord') }}</el-button>
                </p>
            </div>
        </el-card>
    </div>

    <el-dialog v-model="commitRecordDialogShow" :title="t('weappVersionUpdateRecord')" width="1000px" :destroy-on-close="true">
        <el-table :data="commitRecordTableData.data" size="large" v-loading="commitRecordTableData.loading">
            <template #empty>
                <span>{{ !commitRecordTableData.loading ? t('emptyData') : '' }}</span>
            </template>

            <el-table-column prop="user_version" :label="t('userVersion')" />
            <el-table-column prop="site_group_name" :label="t('groupName')" />
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
import { getWeappLastCommitRecord, weappCommit, getWeappCommitRecord } from '@/app/api/wxoplatform'
import { t } from '@/lang'

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
        search: ''
    }
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

const commit = () => {
    if (uploading.value) return
    uploading.value = true

    weappCommit().then(() => {
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
        role_name: commitRecordTableData.searchParam.search
    }).then(res => {
        commitRecordTableData.loading = false
        commitRecordTableData.data = res.data.data
        commitRecordTableData.total = res.data.total
    }).catch(() => {
        commitRecordTableData.loading = false
    })
}
loadCommitRecordList()
</script>

<style lang="scss" scoped></style>
