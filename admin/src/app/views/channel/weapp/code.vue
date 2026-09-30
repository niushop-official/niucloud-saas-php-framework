<template>
    <!--小程序发布-->
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <el-card class="card !border-none table-fill-page__card" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-tabs v-model="activeName" class="my-[20px]" @tab-change="handleClick">
                <el-tab-pane :label="t('weappAccessFlow')" name="/channel/weapp" />
                <el-tab-pane :label="t('subscribeMessage')" name="/channel/weapp/message" />
                <el-tab-pane :label="t('weappRelease')" name="/channel/weapp/code" />
            </el-tabs>

            <div class="mt-[20px]" v-if="!weappConfig.is_authorization">
                <el-button type="primary" @click="openDialog" :loading="uploading" :disabled="loading">{{ t('cloudRelease') }}</el-button>
                <el-button @click="localInsert" :disabled="loading">{{ t('localRelease') }}</el-button>
            </div>
            <div class="mt-[20px]" v-else>
                <el-button type="primary" @click="againUpload" :loading="uploading" :disabled="loading">{{ t('uploadWeapp') }}</el-button>
            </div>

            <div class="text-[14px] mt-[15px]">
                <div class="flex items-center">
                    <div v-if="weappTableData.version_info.release_version">
                        线上版本: <span class="mr-10 text-primary">{{ weappTableData.version_info.release_version }}</span>
                    </div>
                    <div v-if="weappTableData.version_info.release_time">
                        发布时间: <span >{{ weappTableData.version_info.release_time }}</span>
                    </div>
                </div>
                <div class="flex items-center">
                    <div v-if="weappTableData.version_info.exp_version" class="mt-2">
                        体验版本: <span class="mr-10 text-primary">{{ weappTableData.version_info.exp_version }}</span>
                    </div>
                    <div v-if="weappTableData.version_info.exp_time" class="mt-2">
                        过期时间: <span >{{ weappTableData.version_info.exp_time }}</span>
                    </div>
                </div>
            </div>

            <div class="table-fill-page__table mt-[15px]">
            <el-table height="100%" :data="weappTableData.data" v-loading="weappTableData.loading" size="default">
                <template #empty>
                    <span>{{ t('emptyData') }}</span>
                </template>

                <el-table-column prop="version" :label="t('code')" align="left" />
                <el-table-column prop="status_name" :label="t('status')" align="left">
                    <template #default="{ row }">
                        <div>{{ row.status_name }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" :label="t('createTime')" align="center" />
                <el-table-column :label="t('operation')" fixed="right" align="right" min-width="250">
                    <template #default="{ row, $index }">
                        <template v-if="previewContent && $index == 0 && (row.status == 1 || row.status == 2) && weappTableData.page == 1">
                            <el-tooltip :content="previewContent" raw-content effect="light">
                                <el-button type="primary" link>{{ t('preview') }}</el-button>
                            </el-tooltip>
                        </template>
                        <el-button type="primary" link @click="handleDetail(row)">{{ t('detail') }}</el-button>
                        <!-- 回退：用该成功版本保留的源码包重新提交发布任务 -->
                        <el-button type="primary" link v-if="($index > 0 || weappTableData.page > 1) && canRollback(row)" @click="rollbackVersion(row)">{{ t('rollback') }}</el-button>
                        <el-button type="primary" link v-if="row.status == -2" @click="againUpload(row)" :loading="uploading">{{ t('againUpload') }}</el-button>
                        <el-button type="primary" link v-if="row.status == 2" @click="undoAuditFn(row)">{{ t('undoAudit') }}</el-button>
                        <el-button class="table-delete" link @click="delVersion(row)">{{ t('delete') }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>

            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="weappTableData.page" v-model:page-size="weappTableData.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="weappTableData.total"
                    @size-change="getWeappVersionListFn()" @current-change="getWeappVersionListFn" />
            </div>
        </el-card>

        <el-dialog v-model="dialogVisible" :title="t('codeDownTwoDesc')" width="30%" :before-close="handleClose">
            <el-form ref="ruleFormRef" :model="form" label-width="120px">
                <el-form-item prop="code" :label="t('code')">
                    <el-input v-model.trim="form.code" :placeholder="t('codePlaceholder')" onkeyup="this.value = this.value.replace(/[^\d\.]/g,'');" />
                </el-form-item>
                <el-form-item prop="path" :label="t('path')">
                    <upload-file v-model="form.path" :api="'weapp/upload'" :accept="'.zip'" />
                </el-form-item>
                <el-form-item :label="t('content')">
                    <el-input type="textarea" v-model.trim="form.content" :placeholder="t('contentPlaceholder')" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="insert">
                        {{ t('confirm') }}
                    </el-button> 
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="cloudVersionDialogVisible" :title="t('codeDownTwoDesc')" width="600px" :before-close="handleCloseCloudVersion">
            <el-form ref="cloudRuleFormRef" :model="form" :rules="formRules"  label-width="120px">
                <el-form-item prop="type" :label="t('版本号类型')">
                    <div>
                        <el-radio-group v-model="form.type">
                            <el-radio :label="1">{{ t('默认') }}</el-radio>
                            <el-radio :label="2">{{ t('自定义') }}</el-radio>
                        </el-radio-group>
                        <div class="mt-[10px] text-[12px] text-[#999] leading-[20px]">默认为列表版本号递增，自定义则为手动输入版本号进行上传，首位必须大于1</div>  
                    </div>
                </el-form-item>
                <el-form-item prop="version" :label="t('code')" v-if="form.type == 2">
                    <div class="flex items-end">
                        <el-form-item prop="code1">
                            <el-input v-model.number="form.code1"  class="!w-[70px]" :placeholder="t('codePlaceholder')" />
                        </el-form-item>
                        <span class="mx-[10px]">{{ t('weappUploadDot') }}</span>
                        <el-form-item prop="code2">
                            <el-input v-model.number="form.code2" class="!w-[70px]" :placeholder="t('codePlaceholder')"  />
                        </el-form-item>
                        <span class="mx-[10px]">{{ t('weappUploadDot') }}</span>
                        <el-form-item prop="code3">
                            <el-input v-model.number="form.code3" class="!w-[70px]" :placeholder="t('codePlaceholder')"  />
                        </el-form-item>
                    </div>  
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleCloseCloudVersion">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="save">
                        {{ t('confirm') }}
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="failReasonDialogVisible" :title="t('failReason')" width="60%">
            <el-scrollbar class="h-[60vh] w-full whitespace-pre-wrap p-[20px]">
                <div v-html="failReason"></div>
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

        <!-- 发布前校验：通过后创建任务并打开任务详情 -->
        <el-dialog v-model="checkVisible" title="发布前校验" width="580px"
                   :close-on-click-modal="false" :close-on-press-escape="false">
            <div class="min-h-[150px]">
                <verify-panel v-if="checkVisible" scene="weapp_upload" :params="checkParams"
                              :auto-next="true" :auto-next-delay="500" :show-prev="false"
                              :next-text="t('nextStep')" @next="onCheckPassed" />
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, nextTick, watch } from 'vue'
import { getWeappPreview, getWeappVersionList, getWeappConfig, deleteVersion } from '@/app/api/weapp'
import { t } from '@/lang'
import { useRoute, useRouter } from 'vue-router'
import { getAuthInfo } from '@/app/api/module'
import { getAppType } from '@/utils/common'
import { ElMessageBox, ElMessage } from 'element-plus'
import { AnyObject } from '@/types/global'
import { siteWeappCommit, undoAudit } from "@/app/api/wxoplatform";
import { createTask } from '@/app/api/task'
import VerifyPanel from '@/app/components/verify-panel/index.vue'
import useTaskRunnerStore from '@/stores/modules/taskRunner'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'

const runner = useTaskRunnerStore()
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()

const dialogVisible = ref(false)
const loading = ref(true)

const weappTableData:{
    page: number,
    limit: number,
    total: number,
    loading: boolean,
    data: AnyObject,
    version_info: AnyObject
} = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: [],
    version_info: {}
})
const form = ref({
    type:1,
    version: '',
    code1: '1',
    code2: '0',
    code3: '0'
})
const authCode = ref('')

getAuthInfo().then(res => {
    if (res.data.data && res.data.data.auth_code) {
        authCode.value = res.data.data.auth_code
        getWeappPreviewImage()
    }
    loading.value = false
}).catch(() => {
    loading.value = false
})

const weappConfig = ref<{
    app_id:string,
    app_secret:string,
    is_authorization: number
}>({
    app_id: '',
    app_secret: '',
    is_authorization: 0
})
getWeappConfig().then(res => {
    weappConfig.value = res.data
})

const activeName = ref('/channel/weapp/code')
const handleClick = (val: any) => {
    router.push({ path: activeName.value })
}
const ruleFormRef = ref<any>(null)
const cloudRuleFormRef = ref<any>(null)
// 表单校验规则
const formRules = reactive({
    code1: [
        {
            validator: (rule: any, value: number, callback: any) => {
                if (value < 1) {
                    callback(new Error(t('必须大于1')));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    code2: [
        {
            validator: (rule: any, value: number, callback: any) => {
                if (value < 0) {
                    callback(new Error(t('必须大于0')));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    code3: [
        {
            validator: (rule: any, value: number, callback: any) => {
                if (value < 0) {
                    callback(new Error(t('必须大于0')));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    version:[
        {
            required: true,
            validator: (rule: any, value: string, callback: any) => {
                if(form.value.type == 2){
                    if(!form.value.code1 || !form.value.code2 || !form.value.code3){
                        callback(new Error(t('请填写版本号')));
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            }
        }
    ]
});
/**
 * 获取版本列表
 */
const getWeappVersionListFn = (page?: number) => {
    weappTableData.loading = true
    if (page) weappTableData.page = page

    return getWeappVersionList({
        page: weappTableData.page,
        limit: weappTableData.limit
    }).then(res => {
        weappTableData.loading = false
        weappTableData.data = res.data.data
        weappTableData.total = res.data.total
        weappTableData.version_info = res.data.version_info
    }).catch(() => {
        weappTableData.loading = false
    })
}

getWeappVersionListFn()

const openDialog = () => {
    if (!authCode.value) {
        authElMessageBox()
        return
    }
    if (!weappConfig.value.app_id) {
        configElMessageBox()
        return
    }
    form.value = {
        type:1,
        version: '',
        code1: '1',
        code2: '0',
        code3: '0'
    }
    cloudVersionDialogVisible.value = true
}
const handleClose = () => {
    ruleFormRef.value.clearValidate()
}

const cloudVersionDialogVisible = ref(false)
const handleCloseCloudVersion = () => {
    cloudVersionDialogVisible.value = false
    form.value = {
        type:1,
        version: '',
        code1: '1',
        code2: '0',
        code3: '0'
    }
}

// ==================== 发布（校验 -> 任务 -> 详情） ====================
const uploading = ref(false)
/** 本次发起的发布任务标识（终态时刷新列表） */
const runningTaskKey = ref('')
const checkVisible = ref(false)
/** 校验通过后的动作：upload 云端发布（创建任务）/ commit 已授权站点提交（同步调用） */
const pendingAction = ref<'upload' | 'commit'>('upload')
/** 待发布的版本号（空 = 按站点版本递增自动生成） */
const pendingVersion = ref('')
const checkParams = computed(() => ({
    version: pendingVersion.value,
    mode: pendingAction.value
}))

/**
 * 发起发布：先做发布前校验（授权码 / 小程序配置 / 上传占用 / 云端连通），通过后再执行
 * @param action upload 云端发布 | commit 已授权站点提交
 * @param version 自定义版本号（空则自动递增）
 */
const startCheck = (action: 'upload' | 'commit', version: string = '') => {
    if (checkVisible.value) return
    pendingAction.value = action
    pendingVersion.value = version
    checkVisible.value = true
}

/** 校验通过：云端发布创建任务并打开任务详情；已授权站点提交仍为一次性同步调用 */
const onCheckPassed = () => {
    // verify-panel 的 next 是 setTimeout 回调，同步销毁自身会 patch 已卸载的 vnode
    nextTick(() => { checkVisible.value = false })

    const action = pendingAction.value
    const version = pendingVersion.value
    pendingVersion.value = ''

    if (action === 'commit') {
        doSiteCommit()
        return
    }

    previewContent.value = ''
    uploading.value = true

    // 先占位打开任务详情：创建期间不留空窗
    runner.openPendingDetail('weapp_upload', '正在发起发布')
    createTask('weapp_upload', { version }).then((res: any) => {
        uploading.value = false
        const key = res?.data?.task_key
        if (!key) {
            runner.closePendingDetail()
            ElMessage.error('发布任务创建失败')
            return
        }
        // 全局抽屉打开任务详情：不离开当前页，发布过程可随时关闭继续操作
        runner.openDetail(key, 'weapp_upload')
        runningTaskKey.value = key
        getWeappVersionListFn()
    }).catch((err: any) => {
        uploading.value = false
        runner.closePendingDetail()
        ElMessage({ message: err?.msg || err?.message || '发布任务创建失败', type: 'error' })
    })
}

/** 已授权站点的小程序提交：一次性同步调用，无中间过程，保持原逻辑 */
const doSiteCommit = () => {
    uploading.value = true
    siteWeappCommit().then(() => {
        getWeappVersionListFn()
        getWeappPreviewImage()
        uploading.value = false
    }).catch(() => {
        uploading.value = false
    })
}

const save = () => {
    cloudRuleFormRef.value.validate((valid: boolean) => {
        if (valid) {
            // 自定义版本：1.0.0 形式；默认则由后端按站点版本递增
            const version = form.value.type == 2
                ? `${form.value.code1}.${form.value.code2}.${form.value.code3}`
                : ''
            cloudVersionDialogVisible.value = false
            handleCloseCloudVersion()
            startCheck('upload', version)
        }
    })
}

const localInsert = () => {
    ElMessageBox.alert(t('localInsertTips'), t('warning'), {
        confirmButtonText: t('confirm')
    })
}

const previewContent = ref('')

const getWeappPreviewImage = () => {
    if (!authCode.value) return
    getWeappPreview().then(res => {
        if (res.data) previewContent.value = `<img src="${ res.data }" class="w-[150px]">`
    }).catch()
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

const configElMessageBox = () => {
    ElMessageBox.confirm(
        t('weappTips'),
        t('warning'),
        {
            confirmButtonText: t('toSetting'),
            cancelButtonText: t('cancel')
        }
    ).then(() => {
        router.push({ path: '/channel/weapp/config' })
    })
}

/**
 * 撤回代码审核
 * @param data
 */
const undoAuditFn = (data: any) => {
    ElMessageBox.confirm(
        t('undoAuditTips'),
        t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel')
        }
    ).then(() => {
        undoAudit({ id: data.id }).then(() => {
            getWeappVersionListFn()
        })
    })
}

/**
 * 是否可回退：上传成功（status=1）且保留了上传时的源码包
 * 源码包由发布任务保留并登记，历史记录没有包时无法回退
 */
const canRollback = (row: any) => Number(row.status) === 1 && !!row.source_zip

/**
 * 版本回退：用该版本保留的源码包重新提交一次发布任务
 * 会生成一条新的版本记录（版本号沿用被回退的版本），过程在任务详情查看
 */
const rollbackVersion = (row: any) => {
    ElMessageBox.confirm(
        `确认回退到版本 ${ row.version }？${ t('rollbackTips') }`,
        t('rollback'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        // 先占位打开任务详情：创建期间不留空窗
        runner.openPendingDetail('weapp_upload', '正在发起回退')
        createTask('weapp_upload', {
            version: row.version,
            source_zip: row.source_zip
        }).then((res: any) => {
            const key = res?.data?.task_key
            if (!key) {
                runner.closePendingDetail()
                ElMessage.error('回退任务创建失败')
                return
            }
            runner.openDetail(key, 'weapp_upload')
            runningTaskKey.value = key
            getWeappVersionListFn()
        }).catch((err: any) => {
            runner.closePendingDetail()
            ElMessage({ message: err?.msg || err?.message || '回退任务创建失败', type: 'error' })
        })
    }).catch(() => {
    })
}

/**
 * 删除版本
 * @param data
 */
const delVersion = (data: any) => {
    ElMessageBox.confirm(
        t('versionDeleteTips'),
        t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel')
        }
    ).then(() => {
        deleteVersion(data.id).then(() => {
            getWeappVersionListFn()
        })
    }).catch(() => {})
}

const failReason = ref('')
const failReasonDialogVisible = ref(false)

/**
 * 查看失败原因
 * 上传失败（-1）：任务里保留了完整的执行日志与失败原因，优先打开任务详情；
 * 查不到任务（任务记录已清理 / 改造前的历史记录）时回退为失败原因弹窗。
 * 审核失败（-2）由微信审核产生，没有对应任务，仍走弹窗。
 */
const handleDetail = (data: any) => {
    runner.openDetail(String(data.upload_task_key), 'weapp_upload')
}

const helpInfo = () => {
    window.open('https://doc.press.niucloud.com/php/saas-framework/use/configFAQ/minWaChatUpload.html')
}

/** 上传小程序（已授权站点）：同样先做发布前校验，通过后提交 */
const againUpload = () => {
    if (uploading.value) return
    startCheck('commit')
}

/**
 * 发布任务结束后刷新列表
 * 版本状态（成功 / 失败）由任务回写，这里只负责把最新结果同步到页面
 */
watch(() => runningTaskKey.value ? String(runner.tasks[ runningTaskKey.value ]?.status ?? '') : '', (status) => {
    if (!status) return
    if ([ 'success', 'failed', 'canceled' ].includes(status)) {
        getWeappVersionListFn()
        getWeappPreviewImage()
        runningTaskKey.value = ''
    }
})
</script>

<style lang="scss" scoped></style>
