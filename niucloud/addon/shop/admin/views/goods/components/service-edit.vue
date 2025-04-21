<template>
    <el-dialog v-model="showDialog" :title="title" width="500px" class="diy-dialog-wrap" :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
            <el-form-item :label="t('serviceName')" prop="service_name">
                <el-input v-model.trim="formData.service_name" show-word-limit clearable :placeholder="t('serviceNamePlaceholder')" :maxlength="20" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('image')">
                <upload-image v-model="formData.image" />
            </el-form-item>
            <el-form-item :label="t('desc')" >
                <el-input v-model.trim="formData.desc" type="textarea" rows="5" show-word-limit clearable :placeholder="t('descPlaceholder')" :maxlength="200" class="input-width"/>
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
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { addServe, editServe, getServeInfo } from '@/addon/shop/api/goods'

const showDialog = ref(false)
const loading = ref(false)
const title = ref('')

/**
 * 表单数据
 */
const initialFormData = {
    service_id: '',
    service_name: '',
    image: '',
    desc: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        service_name: [
            { required: true, message: t('serviceNamePlaceholder'), trigger: 'blur' }
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
    const save = formData.service_id ? editServe : addServe

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            const data = formData

            save(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete')
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

// 获取字典数据
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if (row) {
        title.value = t('updateServe')
        const data = await (await getServeInfo(row.service_id)).data
        if (data) {
            Object.keys(formData).forEach((key: string) => {
                if (data[key] != undefined) formData[key] = data[key]
            })
        }
    } else {
        title.value = t('addServe')
    }
    loading.value = false
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.diy-dialog-wrap .el-form-item__label{
    height: auto  !important;
}
</style>
