<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updatePosition') : t('addPosition')" width="500px" :destroy-on-close="true">
        <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
            <el-form-item :label="t('positionName')" prop="name">
                <el-input v-model.trim="formData.name" clearable :placeholder="t('positionNamePlaceholder')" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('remark')">
                <el-input v-model.trim="formData.desc"  :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" clearable :placeholder="t('remarkPlaceholder')" class="input-width"  maxlength="200"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t("cancel") }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{ t("confirm") }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { addPosition, editPosition } from '@/addon/o2o/api/technician'

const showDialog = ref<boolean>(false)
const loading = ref<boolean>(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    name: '',
    desc: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        name: [
            {
                required: true,
                message: t('positionNamePlaceholder'),
                trigger: 'blur'
            }
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
    const save = formData.id ? editPosition : addPosition

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            const data = formData
            save(data).then((res) => {
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
    Object.assign(formData, initialFormData)
    if (row) {
        Object.keys(formData).forEach((key: string) => {
            if (row[key] != undefined) formData[key] = row[key]
        })
    }
    showDialog.value = true
    loading.value = false
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
