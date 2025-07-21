<template>
    <div class="main-container">
        <el-form :model="formData" :rules="formRules" label-width="150px" ref="formRef" class="page-form p-[20px]" v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">
                <!-- <h3 class="text-[16px] text-[#1D1F3A] font-bold mb-4">{{ pageName }}</h3> -->
                <h3 class="panel-title !text-[14px] bg-[#F4F5F7] p-3 border-[#E6E6E6] border-solid border-b-[1px]">{{ t('oplatformSetting') }}</h3>

                <el-form-item label="APPID" prop="app_id">
                    <el-input v-model.trim="formData.app_id" :placeholder="t('appidPlaceholder')" class="input-width" clearable />
                </el-form-item>
                <el-form-item label="APPSECRET" prop="app_secret">
                    <el-input v-model.trim="formData.app_secret" :placeholder="t('appSecretPlaceholder')" class="input-width" clearable />
                </el-form-item>
                <div class="box-card mt-[20px] !border-none">
                    <h3 class="panel-title !text-[14px] bg-[#F4F5F7] p-3 border-[#E6E6E6] border-solid border-b-[1px]">{{ t('messagesReceiving') }}</h3>

                    <el-form-item :label="t('empowerReceiveUrl')">
                        <el-input v-model.trim="staticInfo.auth_serve_url" placeholder="Please input" class="!w-[500px]" :readonly="true">
                            <template #append>
                                <div class="cursor-pointer" @click="copyEvent(staticInfo.auth_serve_url)">{{ t('copy') }}</div>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="t('messageReceiveUrl')">
                        <el-input v-model.trim="staticInfo.message_serve_url" placeholder="Please input" class="!w-[500px]" :readonly="true">
                            <template #append>
                                <div class="cursor-pointer" @click="copyEvent(staticInfo.message_serve_url)">{{ t('copy') }}</div>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="t('messageValidationToken')" prop="token">
                        <el-input v-model.trim="formData.token" class="input-width" clearable />
                    </el-form-item>
                    <el-form-item :label="t('messageDecryptKey')" prop="aes_key">
                        <el-input v-model.trim="formData.aes_key" class="input-width">
                            <template #append>
                                <div class="cursor-pointer" @click="copyEvent(formData.aes_key)">{{ t('copy') }}</div>
                            </template>
                        </el-input>
                        <div class="form-tip">{{ t('messageDecryptKeyTips') }}<el-button type="primary" link @click="regenerate">{{ t('regenerate') }}</el-button></div>
                    </el-form-item>
                </div>

                <div class="box-card mt-[20px] !border-none">
                    <h3 class="panel-title !text-[14px] bg-[#F4F5F7] p-3 border-[#E6E6E6] border-solid border-b-[1px]">{{ t('domainSetting') }}</h3>

                    <el-form-item :label="t('empowerStartDomain')">
                        <el-input v-model.trim="staticInfo.auth_launch_domain" placeholder="Please input" class="input-width" :readonly="true">
                            <template #append>
                                <div class="cursor-pointer" @click="copyEvent(staticInfo.auth_launch_domain)">{{ t('copy') }}</div>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="t('wechatDomain')">
                        <el-input v-model.trim="staticInfo.wechat_auth_domain" placeholder="Please input" class="input-width" :readonly="true">
                            <template #append>
                                <div class="cursor-pointer" @click="copyEvent(staticInfo.wechat_auth_domain)">{{ t('copy') }}</div>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>

                <div class="box-card mt-[20px] !border-none">
                    <h3 class="panel-title !text-[14px] bg-[#F4F5F7] p-3 border-[#E6E6E6] border-solid border-b-[1px]">{{ t('developerWeappUpload') }}</h3>

                    <el-form-item :label="t('developAppid')" prop="develop_app_id">
                        <el-input v-model.trim="formData.develop_app_id" :placeholder="t('developAppidPlaceholder')" class="input-width" clearable />
                    </el-form-item>
                    <el-form-item :label="t('uploadKey')" prop="develop_upload_private_key">
                        <div class="input-width">
                            <upload-file v-model="formData.develop_upload_private_key" api="sys/document/wechat" />
                        </div>
                        <div class="form-tip">{{ t('uploadIpTips') }}{{ staticInfo.upload_ip }}</div>
                    </el-form-item>
                </div>
            </el-card>
        </el-form>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" :loading="loading" @click="save(formRef)">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getStatic, getConfig, editConfig } from '@/app/api/wxoplatform'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useClipboard } from '@vueuse/core'
import { guid } from '@/utils/common'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title
const loading = ref(true)
const formData = ref({
    app_id: '',
    app_secret: '',
    token: '',
    aes_key: '',
    develop_app_id: '',
    develop_upload_private_key: ''
})
const staticInfo = ref({})

getStatic().then(({ data }) => {
    staticInfo.value = data
})

getConfig().then(({ data }) => {
    formData.value = data
    loading.value = false
})

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = reactive<FormRules>({
    app_id: [
        { required: true, message: t('appidPlaceholder'), trigger: 'blur' }
    ],
    app_secret: [
        { required: true, message: t('appSecretPlaceholder'), trigger: 'blur' }
    ],
    token: [
        { required: true, message: t('tokenPlaceholder'), trigger: 'blur' }
    ],
    aes_key: [
        { required: true, message: t('aesKeyPlaceholder'), trigger: 'blur' }
    ]
})

const regenerate = () => {
    formData.value.aes_key = guid(43)
}

/**
 * 保存
 */
const save = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            editConfig(formData.value).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

/**
 * 复制
 */
const { copy, isSupported, copied } = useClipboard()
const copyEvent = (text: string) => {
    if (!isSupported.value) {
        ElMessage({
            message: t('notSupportCopy'),
            type: 'warning'
        })
        return
    }
    copy(text)
}

watch(copied, () => {
    if (copied.value) {
        ElMessage({
            message: t('copySuccess'),
            type: 'success'
        })
    }
})
</script>

<style lang="scss" scoped>
:deep(.setting-card .el-card__body){
    padding: 0 !important;
}
.fixed-footer-wrap {
    height: 48px;

    .fixed-footer {
        position: absolute;
        z-index: 4;
        right: -15px;
        bottom: 0;
        left: -15px;
        display: flex;
        height: inherit;
        background: var(--el-bg-color-overlay);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        --tw-shadow: var(--el-box-shadow);
        --tw-shadow-colored: var(--el-box-shadow);
        align-items: center;
        justify-content: center;
        transition:var(--el-transition-duration) width ease-in-out,var(--el-transition-duration) padding-left ease-in-out,var(--el-transition-duration) padding-right ease-in-out;
    }
}
</style>
