<template>
    <el-dialog v-model="showDialog" :title="formData.material_id ? t('updateMaterial') : t('addMaterial')" width="500px" class="diy-dialog-wrap" :destroy-on-close="true" :close-on-click-modal="false">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">

            <el-form-item :label="t('materialId')" prop="group_id">
                <el-select v-model="formData.group_id" :placeholder="t('materialGroupIdPlaceholder')" clearable>
                    <el-option v-for="item in groupOptions" :key="item.group_id" :label="item.group_name" :value="item.group_id" />
                </el-select>
            </el-form-item>

            <el-form-item :label="t('url')" prop="url">
                <div>
                    <upload-image v-model="formData.url" limit="10" />
                    <p class="text-[12px] text-[#a9a9a9]">{{ t('urlTips') }}</p>
                </div>

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
import { addMaterial, editMaterial, getMaterialInfo,getMaterialGroupList } from '@/addon/shop_giftcard/api/material'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    material_id: '',
    group_id: '',
    url: '',
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        group_id: [
            { required: true, message: t('materialGroupIdPlaceholder'), trigger: 'blur' },
        ],
        url: [
            { required: true, message: t('urlPlaceholder'), trigger: 'blur' },
        ]
    }
})

const emit = defineEmits(['complete'])

// 素材分组列表下拉框
const groupOptions: any = reactive([])

const refreshGroup = () =>{
    getMaterialGroupList({}).then(res=>{
        const data = res.data
        if (data) {
            groupOptions.splice(0, groupOptions.length, ...data)
        }
    })
}

refreshGroup()

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    let save = formData.material_id ? editMaterial : addMaterial

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
        const data = await (await getMaterialInfo(row.material_id)).data
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
