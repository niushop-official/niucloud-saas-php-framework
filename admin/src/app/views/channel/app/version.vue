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
                <el-button type="primary" @click="addEvent" :disabled="loading">{{ t('addAppVersion') }}</el-button>
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

                    <el-table-column prop="status_name" :label="t('status')" min-width="120" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <el-button link :loading="row.status == 'creating'">{{ row.status_name }}</el-button>
                        </template>
                    </el-table-column>

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
                            <el-button type="primary" link v-if="row.status == 'creating'" @click="seeBuildLog(row)">{{ t('seeBuildLog') }}</el-button>
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
    
    <el-dialog v-model="showDialog" :title="t('buildLog')" width="850px" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="dialogClose">
        <div class="h-[370px]">
            <terminal ref="terminalRef" :name="`upgrade-${terminalId}`"  context="" :init-log="null" :show-header="false" :show-log-time="true" @exec-cmd="onExecCmd" />
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { img, getAppType } from '@/utils/common'
import { ElMessageBox, FormInstance } from 'element-plus'
import { getVersionList, getBuildLog, deleteVersion, releaseVersion } from '@/app/api/app'
import Edit from '@/app/views/channel/app/components/app-version-edit.vue'
import { useRoute, useRouter } from 'vue-router'
import { Terminal, TerminalFlash } from 'vue-web-terminal'
import 'vue-web-terminal/lib/theme/dark.css'
import { getAuthInfo } from '@/app/api/module'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const activeName = ref('/channel/app/version')
const terminalRef: any = ref(null)
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
const showDialog = ref(false)
const loading = ref(true)
const authCode = ref('')

getAuthInfo().then(res => {
    if (res.data.data && res.data.data.auth_code) {
        authCode.value = res.data.data.auth_code
    }
    loading.value = false
}).catch(() => {
    loading.value = false
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
    if (!authCode.value) {
        authElMessageBox()
        return
    }
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

let buildLog = []
const getAppBuildLogFn = (key: string) => {
    getBuildLog(key).then(res => {
        if (res.data) {
            if (res.data.status == '') {
                if (showDialog.value) {
                    if (!buildLog.length) {
                        terminalRef.value.execute('clear')
                        terminalRef.value.execute('开始打包')
                    }
                    res.data.build_log.data[0].forEach((item) => {
                        if (!buildLog.includes(item.action)) {
                            terminalRef.value.pushMessage({ content: `${item.action}` })
                            buildLog.push(item.action)
                        }
                    })
                }
                setTimeout(() => {
                    getAppBuildLogFn(key)
                }, 2000)
            } else {
                if (res.data.status == 'fail' && showDialog.value) {
                    terminalRef.value.pushMessage({ content: res.data.fail_reason, class: 'error' })
                } else {
                    showDialog.value = false
                }
                loadAppVersionList()
                buildLog = []
            }
        }
    })
}

const seeBuildLog = () => {
    showDialog.value = true;
}

/**
 * 升级进度动画
 */
let flashInterval: any = null
const terminalFlash = new TerminalFlash()
const onExecCmd = (key, command, success, failed, name) => {
    if (command == '开始打包') {
        success(terminalFlash)
        const frames = makeIterator(['/', '——', '\\', '|'])
        flashInterval = setInterval(() => {
            terminalFlash.flush('> ' + frames.next().value)
        }, 150)
    }
}

const makeIterator = (array: string[]) => {
    let nextIndex = 0
    return {
        next () {
            if (nextIndex + 1 == array.length) {
                nextIndex = 0
            }
            return { value: array[nextIndex++] }
        }
    }
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

const authElMessageBox = () => {
    if (getAppType() == 'admin') {
        ElMessageBox.confirm(
            t('authTips'),
            t('warning'),
            {
                distinguishCancelAndClose: true,
                confirmButtonText: t('toBind'),
                cancelButtonText: t('toNiucloud')
            }
        ).then(() => {
            router.push({ path: '/app/authorize' })
        }).catch((action: string) => {
            if (action === 'cancel') {
                window.open('https://www.niucloud.com/app')
            }
        })
    } else {
        ElMessageBox.alert(t('siteAuthTips'), t('warning'))
    }
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
