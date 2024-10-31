<template>
    <div class="main-container">
        <el-form :model="formData" :rules="formRules" label-width="150px" ref="formRef" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">
                <h3 class="panel-title !text-sm">{{ t('oplatformSetting') }}</h3>

                <el-form-item label="APPID" prop="app_id">
                    <el-input v-model.trim="formData.app_id" :placeholder="t('appidPlaceholder')" class="input-width" clearable />
                </el-form-item>
                <el-form-item label="APPSECRET" prop="app_secret">
                    <el-input v-model.trim="formData.app_secret" :placeholder="t('appSecretPlaceholder')" class="input-width" clearable />
                </el-form-item>
            </el-card>

            <el-card class="box-card mt-[15px] !border-none" shadow="never">
                <h3 class="panel-title !text-sm">{{ t('messagesReceiving') }}</h3>

                <el-form-item :label="t('empowerReceiveUrl')">
                    <el-input v-model.trim="staticInfo.auth_serve_url" placeholder="Please input" class="!w-[500px]" :readonly="true">
                        <template #append>
                            <div class="cursor-pointer" @click="copyEvent(staticInfo.auth_serve_url)">{{ t('copy') }}
                            </div>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="t('messageReceiveUrl')">
                    <el-input v-model.trim="staticInfo.message_serve_url" placeholder="Please input" class="!w-[500px]" :readonly="true">
                        <template #append>
                            <div class="cursor-pointer" @click="copyEvent(staticInfo.message_serve_url)">{{ t('copy') }}
                            </div>
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
            </el-card>

            <el-card class="box-card mt-[15px] !border-none" shadow="never">
                <h3 class="panel-title !text-sm">{{ t('domainSetting') }}</h3>

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
            </el-card>

            <el-card class="box-card mt-[15px] !border-none" shadow="never">
                <h3 class="panel-title !text-sm">{{ t('developerWeappUpload') }}</h3>

                <el-form-item :label="t('developAppid')" prop="develop_app_id">
                    <el-input v-model.trim="formData.develop_app_id" :placeholder="t('developAppidPlaceholder')" class="input-width" clearable />
                </el-form-item>
                <el-form-item :label="t('uploadKey')" prop="develop_upload_private_key">
                    <div class="input-width">
                        <upload-file v-model="formData.develop_upload_private_key" api="sys/document/wechat" />
                    </div>
                    <div class="form-tip">{{ t('uploadIpTips') }}{{ staticInfo.upload_ip }}</div>
                </el-form-item>
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
import { useRoute } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import { guid } from '@/utils/common'

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

<style lang="scss" scoped></style>
