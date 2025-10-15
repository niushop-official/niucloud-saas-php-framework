<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
            </div>

            <el-tabs v-model="activeName" class="my-[20px]" @tab-change="handleClick">
                <el-tab-pane :label="t('accessFlow')" name="/channel/app" />
                <el-tab-pane :label="t('versionManage')" name="/channel/app/version" />
            </el-tabs>
            
            <el-alert type="info">
                <template #default>
                    <div class="flex items-center">
                        <div>
                            <p>使用云打包提交成功后请先不要离开该页面稍待几分钟等待打包结果的返回</p>
                        </div>
                    </div>
                </template>
            </el-alert>

            <div class="mt-[20px]">
                <el-button type="primary" @click="addEvent">{{ t('addAppVersion') }}</el-button>
            </div>

            <div class="mt-[10px]">
                <el-table :data="appVersionTable.data" size="large" v-loading="appVersionTable.loading">
                    <template #empty>
                        <span>{{ !appVersionTable.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column type="index" width="90" :label="t('index')" />

                    <el-table-column prop="version_code" :label="t('versionCode')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column prop="version_name" :label="t('versionName')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column prop="version_desc" :label="t('versionDesc')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column prop="platform_name" :label="t('platform')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column prop="status_name" :label="t('status')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column prop="status" :label="t('isForcedUpgradeTitle')" min-width="120" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.is_forced_upgrade ? '是' : '否' }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="package_path" :label="t('packagePath')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column :label="t('releaseTime')" min-width="120" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <text v-if="row.release_time != 0">
                                {{ row.release_time }}
                            </text>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="200px">
                        <template #default="{ row }">
                            <el-button type="primary" link v-if="row.release_time == 0" @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <el-button type="primary" link v-if="row.status == 'upload_success'" @click="releaseEvent(row)">{{ t('release') }}</el-button>
                            <el-button type="primary" link v-if="row.status == 'create_fail'" @click="handleFailReason(row)">{{ t('failReason') }}</el-button>
                            <el-button type="primary" link v-if="row.package_path && row.upgrade_type != 'market'" @click="downloadEvent(row)">{{ t('download') }}</el-button>
                            <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="appVersionTable.page" v-model:page-size="appVersionTable.limit"
                                   layout="total, sizes, prev, pager, next, jumper" :total="appVersionTable.total"
                                   @size-change="loadAppVersionList()" @current-change="loadAppVersionList" />
                </div>
            </div>

            <edit ref="editAppVersionDialog" @complete="loadAppVersionList" />
        </el-card>

        <el-dialog v-model="failReasonDialogVisible" :title="t('failReason')" width="60%">
            <el-scrollbar class="h-[60vh] w-full whitespace-pre-wrap p-[20px]">
                <div v-html="failReason"></div>
            </el-scrollbar>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { ElMessageBox, FormInstance } from 'element-plus'
import { getVersionList, getBuildLog, deleteVersion, releaseVersion } from '@/app/api/app'
import Edit from '@/app/views/channel/app/components/app-version-edit.vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const activeName = ref('/channel/app/version')

const appVersionTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        platfrom: ''
    }
})

const handleClick = (val: any) => {
    router.push({ path: activeName.value })
}

const searchFormRef = ref<FormInstance>()

/**
 * 获取app版本管理列表
 */
const loadAppVersionList = (page: number = 1) => {
    appVersionTable.loading = true
    appVersionTable.page = page

    getVersionList({
        page: appVersionTable.page,
        limit: appVersionTable.limit,
        ...appVersionTable.searchParam
    }).then(res => {
        appVersionTable.loading = false
        appVersionTable.data = res.data.data
        appVersionTable.total = res.data.total
        if (page == 1 && appVersionTable.data.length && appVersionTable.data[0].status == 'creating') getAppBuildLogFn(appVersionTable.data[0].task_key)
    }).catch(() => {
        appVersionTable.loading = false
    })
}
loadAppVersionList()

const editAppVersionDialog: Record<string, any> | null = ref(null)

/**
 * 添加app版本管理
 */
const addEvent = () => {
    editAppVersionDialog.value.setFormData()
    editAppVersionDialog.value.showDialog = true
}

/**
 * 编辑app版本管理
 * @param data
 */
const editEvent = (data: any) => {
    editAppVersionDialog.value.setFormData(data)
    editAppVersionDialog.value.showDialog = true
}

/**
 * 删除app版本管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('appVersionDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteVersion({ id }).then(() => {
            loadAppVersionList()
        }).catch(() => {
        })
    })
}

const releaseEvent = (data: any) => {
    ElMessageBox.confirm(t('appVersionReleaseTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        releaseVersion(data.id).then(() => {
            loadAppVersionList()
        }).catch(() => {
        })
    })
}

const getAppBuildLogFn = (key: string) => {
    getBuildLog(key).then(res => {
        if (res.data) {
            if (res.data.status == '') {
                setTimeout(() => {
                    getAppBuildLogFn(key)
                }, 2000)
            } else {
                loadAppVersionList()
            }
        }
    })
}

const failReason = ref('')
const failReasonDialogVisible = ref(false)
const handleFailReason = (data: any) => {
    failReason.value = data.fail_reason
    failReasonDialogVisible.value = true
}

const downloadEvent = (data: any) => {
    window.open(img(data.package_path), '_blank')
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadAppVersionList()
}
</script>

<style lang="scss" scoped>
/* 多行超出隐藏 */
.multi-hidden {
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
