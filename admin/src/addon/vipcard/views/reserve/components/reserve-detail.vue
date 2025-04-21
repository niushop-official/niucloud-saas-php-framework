<template>
    <el-dialog v-model="showDialog" :title="t('reserveDetail')" width="500px" :destroy-on-close="true">
        <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">
            <el-form-item :label="t('phone')" prop="phone" v-if="!formData.reserve_id">
                <div class="input-width">
                    <span>{{ formData.mobile }}</span>
                </div>
            </el-form-item>
            <el-form-item :label="t('client')">
                <div class="input-width">
                    <span>{{ formData.reserve_name }}</span>
                </div>
            </el-form-item>
            <el-form-item :label="t('reserveItem')">
                <div class="input-width">
                    <span>{{ formData.goods_name }}</span>
                </div>
            </el-form-item>
            <el-form-item :label="t('serviceImg')">
                <div class="input-width" v-if="formData.goods.cover_thumb_small">
                    <img class="w-[50px] h-[50px]" :src="img(formData.goods.cover_thumb_small)" alt="">
                </div>
            </el-form-item>
            <el-form-item :label="t('technician')">
                <div class="input-width">
                    <span>{{ formData.technician_name }}</span>
                </div>
            </el-form-item>

            <el-form-item :label="t('arrivalTime')">
                <div class="input-width">
                    <span>{{ formData.reserve_date }}</span>
                </div>
            </el-form-item>
            <el-form-item :label="t('status')">
                <div class="input-width">
                    <span>{{ formData.reserve_state_name }}</span>
                </div>
            </el-form-item>
            <el-form-item :label="t('remark')">
                <div class="input-width">
                    <span>{{ formData.remark }}</span>
                </div>
            </el-form-item>

        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" :loading="loading" @click="showDialog = false">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { img } from '@/utils/common'

const showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    reserve_id: '',
    mobile: '',
    member_id: '',
    reserve_name: '',
    reserve_date: '',
    goods_id: '',
    remark: '',
    technician_name: '',
    goods_name: '',
    reserve_state_name: '',
    goods: {}
}
const formData: Record<string, any> = reactive({ ...initialFormData })
const formRef = ref<FormInstance>()

const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    if (row) {
        if (row) {
            Object.keys(formData).forEach((key: string) => {
                if (row[key] != undefined) formData[key] = row[key]
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
