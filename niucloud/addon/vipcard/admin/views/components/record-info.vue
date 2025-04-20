<template>
    <el-dialog v-model="showDialog" :title="t('recordInfo')" width="450px" :destroy-on-close="true">
        <div class="min-h-[200px]">
            <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">

                <el-form-item :label="t('headimg')">
                    <div class="flex items-center">
                        <img class="w-[50px] h-[50px] mr-[10px]" v-if="formData.member.headimg" :src="img(formData.member.headimg)" alt="">
                        <img class="w-[50px] h-[50px] mr-[10px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                    </div>
                </el-form-item>

                <el-form-item :label="t('cardNo')">
                    <div class="input-width"> {{ formData.card_no }}</div>
                </el-form-item>

                <el-form-item :label="t('createTime')">
                    <div class="input-width"> {{ formData.create_time }}</div>
                </el-form-item>

                <el-form-item :label="t('cardTotalNum')">
                    <div class="input-width"> {{ formData.total_num }}</div>
                </el-form-item>

                <el-form-item :label="t('cardTotalUseNum')">
                    <div class="input-width"> {{ formData.total_use_num }}</div>
                </el-form-item>

                <el-form-item :label="t('cardType')">
                    <div class="input-width"> {{ formData.card_type }}</div>
                </el-form-item>

                <el-form-item :label="t('expireTime')">
                    <div class="input-width"> {{ formData.expire_time }}</div>
                </el-form-item>

            </el-form>
        </div>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="showDialog = false">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { getMemberRecordDerail } from '@/addon/vipcard/api/vipcard'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { img } from '@/utils/common'

const showDialog = ref(false)
const loading = ref(true)

const initialFormData = {
    card_no: '',
    create_time: '',
    total_num: '',
    total_use_num: '',
    card_type: '',
    status: '',
    expire_time: '',
    member: {
        headimg: '',
        mobile: '',
        username: '',
        nickname: ''
    }
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

const setFormData = async(id: any = null) => {
    loading.value = true
    Object.assign(formData, initialFormData)
    if (id > 0) {
        getMemberRecordDerail(id).then(({ data }) => {
            Object.keys(formData).forEach((key: string) => {
                if (data[key] != undefined) formData[key] = data[key]
            })

            loading.value = false
        })
    }
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
