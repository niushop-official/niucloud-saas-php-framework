<template>
    <!--小程序发布-->
    <div class="main-container">
        <el-card class="card !border-none" shadow="never">

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

            <el-table class="mt-[15px]" :data="weappTableData.data" v-loading="weappTableData.loading" size="default">
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
                <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                    <template #default="{ row, $index }">
                        <template v-if="previewContent && $index == 0 && (row.status == 1 || row.status == 2) && weappTableData.page == 1">
                            <el-tooltip :content="previewContent" raw-content effect="light">
                                <el-button type="primary" link>{{ t('preview') }}</el-button>
                            </el-tooltip>
                        </template>
                        <el-button type="primary" link v-if="row.status == -1 || row.status == -2" @click="handleFailReason(row)">{{ t('failReason') }}</el-button>
                        <el-button type="primary" link v-if="row.status == -2" @click="againUpload(row)" :loading="uploading">{{ t('againUpload') }}</el-button>
                        <el-button type="primary" link v-if="row.status == 2" @click="undoAuditFn(row)">{{ t('undoAudit') }}</el-button>
                    </template>
                </el-table-column>
            </el-table>

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
                        <span class="mx-[10px]">.</span>
                        <el-form-item prop="code2">
                            <el-input v-model.number="form.code2" class="!w-[70px]" :placeholder="t('codePlaceholder')"  />
                        </el-form-item>
                        <span class="mx-[10px]">.</span>
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
        </el-dialog>

        <el-dialog v-model="uploadSuccessShowDialog" :title="t('warning')" width="500px" draggable>
            <span v-html="t('uploadSuccessTips')"></span>
            <template #footer>
                <div class="flex justify-end">
                    <el-button @click="knownToKnow" type="primary">{{ t('knownToKnow') }}</el-button>
                    <el-button @click="uploadSuccessShowDialog = false" type="primary" plain>{{ t('confirm') }}</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { setWeappVersion, getWeappPreview, getWeappVersionList, getWeappUploadLog, getWeappConfig } from '@/app/api/weapp'
import { t } from '@/lang'
import { useRoute, useRouter } from 'vue-router'
import { getAuthInfo } from '@/app/api/module'
import { getAppType } from '@/utils/common'
import { ElMessageBox } from 'element-plus'
import { AnyObject } from '@/types/global'
import Storage from '@/utils/storage'
import { siteWeappCommit, undoAudit } from "@/app/api/wxoplatform";

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
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
const uploadSuccessShowDialog = ref(false)
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
const getWeappVersionListFn = (page: number = 1) => {
    weappTableData.loading = true
    weappTableData.page = page

    getWeappVersionList({
        page: weappTableData.page,
        limit: weappTableData.limit
    }).then(res => {
        weappTableData.loading = false
        weappTableData.data = res.data.data
        weappTableData.total = res.data.total
        if (page == 1 && weappTableData.data.length && weappTableData.data[0].status == 0) getWeappUploadLogFn(weappTableData.data[0].task_key)
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

const save = () => {
    cloudRuleFormRef.value.validate((valid: boolean) => {
        if (valid) {
            if (form.value.type == 2) {
                form.value.version = `${form.value.code1}.${form.value.code2}.${form.value.code3}`
            }
            delete form.value.code1
            delete form.value.code2
            delete form.value.code3
            delete form.value.type
            cloudVersionDialogVisible.value = false
            insert()
        }
    })
}

const uploading = ref(false)
const insert = () => {
    if (!authCode.value) {
        authElMessageBox()
        return
    }
    if (!weappConfig.value.app_id) {
        configElMessageBox()
        return
    }

    if (uploading.value) return
    uploading.value = true

    previewContent.value = ''

    setWeappVersion(form.value).then(res => {
        getWeappVersionListFn()
        getWeappPreviewImage() 
        uploading.value = false
    }).catch(() => {
        uploading.value = false
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

const getWeappUploadLogFn = (key: string) => {
    getWeappUploadLog(key).then(res => {
        const data = res.data.data ?? []
        if (data[0] && data[0].length) {
            const last = data[0][data[0].length - 1]
            if (last.code == 0) {
                getWeappVersionListFn()
                return
            }
            if (last.code == 1 && last.percent == 100) {
                getWeappVersionListFn()
                getWeappPreviewImage()
                !Storage.get('weappUploadTipsLock') && (uploadSuccessShowDialog.value = true)
                return
            }
            setTimeout(() => {
                getWeappUploadLogFn(key)
            }, 2000)
        }
    })
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

const failReason = ref('')
const failReasonDialogVisible = ref(false)
const handleFailReason = (data: any) => {
    failReason.value = data.fail_reason
    failReasonDialogVisible.value = true
}

const knownToKnow = () => {
    Storage.set({ key: 'weappUploadTipsLock', data: true })
    uploadSuccessShowDialog.value = false
}

const againUpload = () => {
    if (uploading.value) return
    uploading.value = true

    siteWeappCommit().then(() => {
        getWeappVersionListFn()
        getWeappPreviewImage()
        uploading.value = false
    }).catch(() => {
        uploading.value = false
    })
}
</script>

<style lang="scss" scoped></style>
