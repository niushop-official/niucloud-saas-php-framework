<template>
    <el-dialog v-model="showDialog" :title="formData.category_id ? t('updateVipcardGoodsCategory') : t('addVipcardGoodsCategory')" width="500px" :destroy-on-close="true">
        <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
            <el-form-item :label="t('categoryName')" prop="category_name">
                <el-input v-model.trim="formData.category_name" maxlength="30" show-word-limit clearable :placeholder="t('categoryNamePlaceholder')" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('upCategory')">
                <el-select v-model="formData.pid" class="input-width">
                    <el-option :value="0" :label="t('categoryTips')" />
                    <el-option v-for="(item, index) in categoryList" :key="index" :label="item.category_name" :value="item.category_id" />
                </el-select>
            </el-form-item>
            <el-form-item :label="t('image')">
                <upload-image v-model="formData.image" />
            </el-form-item>
            <el-form-item :label="t('sort')" prop="sort">
                <el-input v-model="formData.sort" clearable :placeholder="t('sortPlaceholder')" class="input-width" @keyup="filterNumber($event)" />
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
import { addCategory, editCategory, getCategoryInfo, getCategory } from '@/addon/vipcard/api/vipcard'
import { filterNumber } from '@/utils/common'

const showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    category_id: 0,
    category_name: '',
    image: '',
    sort: 0,
    pid: 0
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        category_name: [
            { required: true, message: t('categoryNamePlaceholder'), trigger: 'blur' }
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
    const save = formData.category_id > 0 ? editCategory : addCategory

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

const categoryList = ref([])
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)

    categoryList.value = await (await getCategory({ type: 1 })).data

    loading.value = true
    if (row) {
        const data = await (await getCategoryInfo(row.category_id)).data
        if (data) {
            Object.keys(formData).forEach((key: string) => {
                if (data[key] != undefined) formData[key] = data[key]
            })
        }
        if (formData.category_id > 0) {
            for (const i in categoryList.value) {
                if (formData.category_id == categoryList.value[i].category_id) {
                    categoryList.value.splice(i, 1)
                }
            }
        }
    }
    loading.value = false
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
