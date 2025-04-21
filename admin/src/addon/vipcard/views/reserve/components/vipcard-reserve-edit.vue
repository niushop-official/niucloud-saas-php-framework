<template>
    <el-dialog v-model="showDialog" :title="formData.reserve_id ? t('updateVipcardReserve') : t('addVipcardReserve')" width="500px"
        :destroy-on-close="true">
        <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
            <el-form-item :label="t('memberId')" prop="member_id">
                <el-input v-model="formData.member_id" clearable :placeholder="t('memberIdPlaceholder')" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('reserveName')" prop="reserve_name">
                <el-input v-model="formData.reserve_name" clearable :placeholder="t('reserveNamePlaceholder')" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('reserveTime')" prop="reserve_time">
                <el-input v-model="formData.reserve_time" clearable :placeholder="t('reserveTimePlaceholder')" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('goodsIds')" prop="goods_ids">
                <el-input v-model="formData.goods_ids" clearable :placeholder="t('goodsIdsPlaceholder')" class="input-width" />
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
import { addReserve, editReserve, getReserveInfo } from '@/addon/vipcard/api/vipcard'

const showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    reserve_id: '',
    member_id: '',
    reserve_name: '',
    reserve_time: '',
    goods_ids: ''

}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        member_id: [
            { required: true, message: t('memberIdPlaceholder'), trigger: 'blur' }
        ],
        reserve_name: [
            { required: true, message: t('reserveNamePlaceholder'), trigger: 'blur' }
        ],
        reserve_time: [
            { required: true, message: t('reserveTimePlaceholder'), trigger: 'blur' }
        ],
        goods_ids: [
            { required: true, message: t('goodsIdsPlaceholder'), trigger: 'blur' }
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
    const save = formData.reserve_id ? editReserve : addReserve

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

const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if (row) {
        const data = await (await getReserveInfo(row.reserve_id)).data
        if (data) {
            Object.keys(formData).forEach((key: string) => {
                if (data[key] != undefined) formData[key] = data[key]
            })
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
