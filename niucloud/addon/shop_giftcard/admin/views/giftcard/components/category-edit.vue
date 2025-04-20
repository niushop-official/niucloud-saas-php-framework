<template>
    <el-dialog v-model="showDialog" :title="formData.category_id ? t('updateCategory') : t('addCategory')" width="400px" class="diy-dialog-wrap" :destroy-on-close="true" :close-on-click-modal="formData.category_id ? true : false">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('categoryName')" prop="category_name">
                    <el-input v-model.trim="formData.category_name" clearable :placeholder="t('categoryNamePlaceholder')" class="input-width" maxlength="10" />
                </el-form-item>
                <el-form-item :label="t('sort')" prop="sort">
                    <el-input v-model.trim="formData.sort" maxlength="8" show-word-limit clearable :placeholder="t('sortPlaceholder')" class="input-width" @keyup="filterNumber($event)" @blur="formData.sort = $event.target.value"/>
                </el-form-item>
                <el-form-item :label="t('status')">
                    <el-switch v-model.trim="formData.status" :active-value="1" :inactive-value="0" />
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
import { filterNumber } from '@/utils/common'
import { addCategory, editCategory, getCategoryInfo } from '@/addon/shop_giftcard/api/category'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    category_id: '',
    category_name: '',
    sort: '',
    status:1
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        category_name: [
            { required: true, message: t('categoryNamePlaceholder'), trigger: 'blur' },
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
    let save = formData.category_id ? editCategory : addCategory

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            let data = formData

            save(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete')
            }).catch(err => {
                loading.value = false
            })
        }
    })
}

const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getCategoryInfo(row.category_id)).data
        if (data) Object.keys(formData).forEach((key: string) => {
            if (data[key] != undefined) formData[key] = data[key]
        })
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
