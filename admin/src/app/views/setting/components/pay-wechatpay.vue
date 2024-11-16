<template>
    <el-dialog v-model="showDialog" :title="t('updateWechat')" width="500px" :destroy-on-close="true">
        <el-form :model="formData" label-width="140px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">

            <el-form-item :label="t('mchId')" prop="config.mch_id">
                <el-input v-model.trim="formData.config.mch_id" :placeholder="t('mchIdPlaceholder')" class="input-width" maxlength="32" show-word-limit clearable />
                <div class="form-tip">{{ t('mchIdTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('mchSecretKey')" prop="config.mch_secret_key">
                <el-input v-model.trim="formData.config.mch_secret_key" :placeholder="t('mchSecretKeyPlaceholder')" class="input-width" maxlength="32" show-word-limit clearable />
                <div class="form-tip">{{ t('mchSecretKeyTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('mchSecretCert')" prop="config.mch_secret_cert">
                <div class="input-width">
                    <upload-file v-model="formData.config.mch_secret_cert" api="sys/document/wechat" />
                </div>
                <div class="form-tip">{{ t('mchSecretCertTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('mchPublicCertPath')" prop="config.mch_public_cert_path">
                <div class="input-width">
                    <upload-file v-model="formData.config.mch_public_cert_path" api="sys/document/wechat" />
                </div>
                <div class="form-tip">{{ t('mchPublicCertPathTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('wechatpayPublicCert')" prop="config.wechat_public_cert_path">
                <div class="input-width">
                    <upload-file v-model="formData.config.wechat_public_cert_path" api="sys/document/wechat" />
                </div>
            </el-form-item>

            <el-form-item :label="t('wechatpayPublicCertId')" prop="config.wechat_public_cert_id">
                <div class="input-width">
                    <el-input v-model.trim="formData.config.wechat_public_cert_id" placeholder="" class="input-width" show-word-limit clearable />
                </div>
            </el-form-item>

            <el-form-item :label="t('jsapiDir')" v-show="formData.channel == 'wechat' || formData.channel == 'weapp'">
                <el-input :model-value="wapDomain + '/'" placeholder="Please input" class="input-width" :readonly="true" :disabled="true">
                    <template #append>
                        <div class="cursor-pointer" @click="copyEvent(wapDomain + '/')">{{ t('copy') }}
                        </div>
                    </template>
                </el-input>
                <div class="form-tip !leading-normal">{{ t('jsapiDirTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('h5Domain')" v-show="formData.channel == 'h5'">
                <el-input :model-value="wapDomain.replace('http://', '').replace('https://', '')" placeholder="Please input" class="input-width" :readonly="true" :disabled="true">
                    <template #append>
                        <div class="cursor-pointer" @click="copyEvent(wapDomain.replace('http://', '').replace('https://', ''))">{{ t('copy') }}
                        </div>
                    </template>
                </el-input>
                <div class="form-tip !leading-normal">{{ t('h5DomainTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('nativeDomain')" v-show="formData.channel == 'pc'">
                <el-input :model-value="serviceDomain" placeholder="Please input" class="input-width" :readonly="true" :disabled="true">
                    <template #append>
                        <div class="cursor-pointer" @click="copyEvent(serviceDomain)">{{ t('copy') }}
                        </div>
                    </template>
                </el-input>
                <div class="form-tip !leading-normal">{{ t('nativeDomainTips') }}</div>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import { t } from '@/lang'
import { FormInstance, ElMessage } from 'element-plus'
import Test from '@/utils/test'
import { getUrl } from '@/app/api/sys'
import { useClipboard } from '@vueuse/core'

const showDialog = ref(false)
const loading = ref(true)
const wapDomain = ref('')
const serviceDomain = ref('')

getUrl().then((res: any) => {
    wapDomain.value = res.data.wap_domain
    serviceDomain.value = res.data.service_domain
})

/**
 * 表单数据
 */
const initialFormData = {
    type: 'wechatpay',
    config: {
        mch_id: '',
        mch_secret_key: '',
        mch_secret_cert: '',
        mch_public_cert_path: '',
        wechat_public_cert_path: '',
        wechat_public_cert_id: ''
    },
    channel: '',
    status: 0,
    is_default: 0
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        'config.mch_id': [
            { required: true, message: t('mchIdPlaceholder'), trigger: 'blur' }
        ],
        'config.mch_secret_key': [
            { required: true, message: t('mchSecretKeyPlaceholder'), trigger: 'blur' }
        ],
        'config.mch_secret_cert': [
            { required: true, message: t('mchSecretCertPlaceholder'), trigger: 'blur' }
        ],
        'config.mch_public_cert_path': [
            { required: true, message: t('mchPublicCertPathPlaceholder'), trigger: 'blur' }
        ]
    }
})

const emit = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            emit('complete', formData)
            showDialog.value = false
        }
    })
}

const setFormData = async (data: any = null) => {
    loading.value = true
    Object.assign(formData, initialFormData)
    if (data) {
        Object.keys(formData).forEach((key: string) => {
            if (data[key] != undefined) formData[key] = data[key]
        })
        formData.channel = data.redio_key.split('_')[0]
        formData.status = Number(formData.status)
    }
    loading.value = false
}

const enableVerify = () => {
    let verify = true
    if (Test.empty(formData.config.mch_id) || Test.empty(formData.config.mch_secret_key) || Test.empty(formData.config.mch_secret_cert) || Test.empty(formData.config.mch_public_cert_path)) verify = false
    return verify
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

defineExpose({
    showDialog,
    setFormData,
    enableVerify
})
</script>

<style lang="scss" scoped></style>
