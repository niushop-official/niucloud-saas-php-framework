<template>
    <component :is="wrapperTag" v-bind="wrapperProps">
        <el-form :model="formData" :label-position="inline ? 'top' : 'right'" label-width="140px" ref="formRef" :rules="formRules" :class="inline ? 'page-form storage-form-inline' : 'page-form'" v-loading="loading">
            <el-form-item v-if="!inline || showIsUse" :label="t('isUse')" :class="{ 'storage-form-full': inline }">
                <el-radio-group v-model="formData.is_use">
                    <el-radio label="1">{{ t('startUsing') }}</el-radio>
                    <el-radio label="0">{{ t('statusDeactivate') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('qiniuBucket')" prop="bucket">
                <el-input v-model.trim="formData.bucket" :placeholder="t('qiniuBucketPlaceholder')" class="input-width" show-word-limit clearable />
                <div class="form-tip">{{ t('qiniuBucketTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('qiniuAccessKey')" prop="access_key">
                <el-input v-model.trim="formData.access_key" :placeholder="t('qiniuAccessKeyPlaceholder')" class="input-width" clearable />
            </el-form-item>

            <el-form-item :label="t('qiniuSecretKey')" prop="secret_key">
                <el-input v-model.trim="formData.secret_key" :placeholder="t('qiniuSecretKeyPlaceholder')" class="input-width" clearable />
            </el-form-item>

            <el-form-item :label="t('domain')" prop="domain">
                <el-input v-model.trim="formData.domain" :placeholder="t('domainPlaceholder')" class="input-width" clearable />
            </el-form-item>

        </el-form>

        <template v-if="!inline" #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{t('confirm')}}</el-button>
            </span>
        </template>
    </component>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, toRefs, onMounted, watch } from 'vue'
import { ElDialog } from 'element-plus'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { getStorageInfo, editStorage } from '@/app/api/sys'

/**
 * inline：内嵌表单模式（站点端多套存储配置弹框中直接渲染表单，不作为弹窗展示）
 */
const props = defineProps({
    inline: { type: Boolean, default: false },
    //内嵌模式下是否展示启用开关（平台端左右布局需要，站点端弹框由外层开关控制）
    showIsUse: { type: Boolean, default: false },
    //内嵌模式下的初始配置数据
    configData: { type: Object, default: null }
})
const { inline, showIsUse } = toRefs(props)

const showDialog = ref(false)
const loading = ref(!props.inline)

/**
 * 表单数据
 */
const initialFormData = {
    storage_type: '',
    bucket: '',
    access_key: '',
    secret_key: '',
    domain: '',
    is_use: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        bucket: [
            { required: true, message: t('qiniuBucketPlaceholder'), trigger: 'blur' }
        ],
        access_key: [
            { required: true, message: t('qiniuAccessKeyPlaceholder'), trigger: 'blur' }
        ],
        secret_key: [
            { required: true, message: t('qiniuSecretKeyPlaceholder'), trigger: 'blur' }
        ],
        endpoint: [
            { required: true, message: t('aliEndpointPlaceholder'), trigger: 'blur' }
        ],
        domain: [
            { required: true, message: t('domainPlaceholder'), trigger: 'blur' }
        ]
    }
})

const emit = defineEmits(['complete'])

//外层容器：内嵌模式为普通容器，否则为弹窗
const wrapperTag = computed(() => props.inline ? 'div' : ElDialog)

const wrapperProps = computed(() => props.inline ? {} : {
    modelValue: showDialog.value,
    'onUpdate:modelValue': (val: boolean) => {
        showDialog.value = val
    },
    title: t('qiniuStorage'),
    width: '580px',
    destroyOnClose: true
})

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            const data = formData

            editStorage(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete')
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

const setFormData = async (row: any = null) => {
    loading.value = true
    Object.assign(formData, initialFormData)
    if (row) {
        if (props.inline) {
            //内嵌模式：直接使用外部传入的配置数据
            Object.keys(formData).forEach((key: string) => {
                if (row[key] != undefined) formData[key] = row[key]
                if (row.params && row.params[key] != undefined) formData[key] = row.params[key].value
            })
        } else {
            const data = await (await getStorageInfo(row.storage_type)).data
            Object.keys(formData).forEach((key: string) => {
                if (data[key] != undefined) formData[key] = data[key]
                if (data.params[key] != undefined) formData[key] = data.params[key].value
            })
        }
    }
    loading.value = false
}

/**
 * 获取表单数据
 */
const getFormData = () => ({ ...formData })

/**
 * 校验表单
 * @returns Promise<boolean>
 */
const validate = async () => {
    if (!formRef.value) return false
    try {
        await formRef.value.validate()
        return true
    } catch (e) {
        return false
    }
}

//内嵌模式下，使用外部传入的配置数据初始化表单
onMounted(() => {
    if (props.inline) setFormData(props.configData)
})

watch(() => props.configData, (val) => {
    if (props.inline) setFormData(val)
})

defineExpose({
    showDialog,
    setFormData,
    getFormData,
    validate
})
</script>

<style lang="scss" scoped></style>
