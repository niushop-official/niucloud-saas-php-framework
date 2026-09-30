<template>
    <component :is="wrapperTag" v-bind="wrapperProps">
        <el-form :model="formData" :label-position="inline ? 'top' : 'right'" label-width="140px" ref="formRef" :rules="formRules" :class="inline ? 'page-form storage-form-inline' : 'page-form'" v-loading="loading">
            <el-form-item v-if="!inline || showIsUse" :label="t('isUse')" :class="{ 'storage-form-full': inline }">
                <el-radio-group v-model="formData.is_use">
                    <el-radio label="1">{{ t('startUsing') }}</el-radio>
                    <el-radio label="0">{{ t('statusDeactivate') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <div v-if="inline" class="storage-form-full text-[12px] leading-[18px] text-[var(--el-text-color-secondary)]">
                {{ t('localStorageTips') }}
            </div>
        </el-form>

        <template v-if="!inline" #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{ t('confirm') }}</el-button>
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
 * inline：内嵌表单模式（平台端左右布局 / 站点端弹框中直接渲染表单，不作为弹窗展示）
 */
const props = defineProps({
    inline: { type: Boolean, default: false },
    // 内嵌模式下是否展示启用开关（平台端左右布局需要）
    showIsUse: { type: Boolean, default: false },
    // 内嵌模式下的初始配置数据
    configData: { type: Object, default: null }
})
const { inline, showIsUse } = toRefs(props)

const showDialog = ref(false)
const loading = ref(!props.inline)

/**
 * 表单数据
 */
const initialFormData = {
    is_use: '',
    storage_type: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {}
})

const emit = defineEmits(['complete'])

// 外层容器：内嵌模式为普通容器，否则为弹窗
const wrapperTag = computed(() => {
    return props.inline ? 'div' : ElDialog
})

const wrapperProps = computed(() => {
    return props.inline ? {} : {
        modelValue: showDialog.value,
        'onUpdate:modelValue': (val: boolean) => {
            showDialog.value = val
        },
        title: t('localStorage'),
        width: '580px',
        destroyOnClose: true
    }
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

            editStorage(data).then(() => {
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
            Object.keys(formData).forEach((key: string) => {
                if (row[key] != undefined) formData[key] = String(row[key])
            })
        } else {
            const data = await (await getStorageInfo(row.storage_type)).data
            Object.keys(formData).forEach((key: string) => {
                if (data[key] != undefined) formData[key] = data[key]
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
    if (!formRef.value) return true
    try {
        await formRef.value.validate()
        return true
    } catch (e) {
        return false
    }
}

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
