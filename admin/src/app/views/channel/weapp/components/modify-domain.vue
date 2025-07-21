<template>
    <el-dialog v-model="showDialog" :title="t('functionSetting')" width="700px" :destroy-on-close="true">
        <el-form :model="formData" label-width="180px" ref="formRef" :rules="formRules" class="page-form pr-[100px]" v-loading="loading">
            <el-form-item :label="t('requestUrl')" prop="requestdomain">
                <el-input v-model="formData.requestdomain" :placeholder="t('requestdomainPlaceholder')" type="textarea">
                </el-input>
            </el-form-item>
            <el-form-item :label="t('socketUrl')" prop="wsrequestdomain">
                <el-input v-model="formData.wsrequestdomain" :placeholder="t('wsrequestdomainPlaceholder')" type="textarea">
                </el-input>
            </el-form-item>
            <el-form-item :label="t('uploadUrl')" prop="uploaddomain">
                <el-input v-model="formData.uploaddomain" :placeholder="t('uploaddomainPlaceholder')" type="textarea">
                </el-input>
            </el-form-item>
            <el-form-item :label="t('downloadUrl')" prop="downloaddomain">
                <el-input v-model="formData.downloaddomain" :placeholder="t('downloaddomainPlaceholder')" type="textarea">
                </el-input>
            </el-form-item>
            <el-form-item :label="t('udpUrl')" prop="udpdomain">
                <el-input v-model="formData.udpdomain" :placeholder="t('udpdomainPlaceholder')" type="textarea">
                </el-input>
            </el-form-item>
            <el-form-item :label="t('tcpUrl')" prop="tcpdomain">
                <el-input v-model="formData.tcpdomain" :placeholder="t('tcpdomainPlaceholder')" type="textarea">
                </el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{t('confirm')}}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { setWeappDomain } from '@/app/api/weapp'
import Test from '@/utils/test'

const showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    requestdomain: '',
    wsrequestdomain: '',
    uploaddomain: '',
    downloaddomain: '',
    tcpdomain: '',
    udpdomain: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

const emit = defineEmits(['complete'])

const formRules = computed(() => {
    return {
        requestdomain: [
            {
                validator: (rule: any, value: any, callback: any) => validatorProtocol(rule, value, callback, 'https://'),
                trigger: 'blur'
            }
        ],
        uploaddomain: [
            {
                validator: (rule: any, value: any, callback: any) => validatorProtocol(rule, value, callback, 'https://'),
                trigger: 'blur'
            }
        ],
        downloaddomain: [
            {
                validator: (rule: any, value: any, callback: any) => validatorProtocol(rule, value, callback, 'https://'),
                trigger: 'blur'
            }
        ],
        wsrequestdomain: [
            {
                validator: (rule: any, value: any, callback: any) => validatorProtocol(rule, value, callback, 'wss://'),
                trigger: 'blur'
            }
        ],
        tcpdomain: [
            {
                validator: (rule: any, value: any, callback: any) => validatorProtocol(rule, value, callback, 'tcp://'),
                trigger: 'blur'
            }
        ],
        udpdomain: [
            {
                validator: (rule: any, value: any, callback: any) => validatorProtocol(rule, value, callback, 'udp://'),
                trigger: 'blur'
            }
        ]
    }
})

const validatorProtocol = (rule: any, value: any, callback: any, protocol: string) => {
    if (!Test.empty(value)) {
        let flag = true
        value.split(';').forEach((item: string) => {
            if (!item.startsWith(protocol)) {
                flag = false
                callback(new Error(t('domainError')))
            }
        })
        if (flag) callback()
    } else {
        callback()
    }
}

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            if (loading.value) return
            loading.value = true

            const data = formData

            setWeappDomain(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete', data)
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

const setFormData = async (data: any = null) => {
    loading.value = false
    Object.assign(formData, initialFormData)
    if (data) {
        Object.keys(formData).forEach((key: string) => {
            if (data[key] != undefined) formData[key] = data[key]
        })
    }
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
