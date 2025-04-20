<template>
    <div class="main-container">
        <div class="flex ml-[18px] justify-between items-center mt-[20px] mb-[5px]">
            <span class="text-page-title">{{ pageName }}</span>
        </div>
        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="formData" label-width="150px" ref="formRef" class="page-form" v-loading="loading">
                <el-card class="box-card !border-none" shadow="never">
                    <h3 class="panel-title !text-sm">{{ t('hotelSetting') }}</h3>

                    <el-form-item :label="t('orderClose')">
                        <el-input v-model="formData.hotel.order_close" :placeholder="t('orderClosePlaceholder')" class="input-width" @keyup="filterNumber($event)">
                            <template #append>{{ t('second') }}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="t('isRefund')">
                        <el-radio-group v-model="formData.hotel.is_allow_refund" class="ml-4">
                            <el-radio :label="0" size="large">{{ t("no") }}</el-radio>
                            <el-radio :label="1" size="large">{{ t("yes") }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="t('refundRatio')">
                        <el-input v-model="formData.hotel.refund_rate" :placeholder="t('refundRatioPlaceholder')" class="input-width" @keyup="filterDigit($event)">
                            <template #append>%</template>
                        </el-input>
                    </el-form-item>

                </el-card>
                <el-card class="box-card !border-none" shadow="never">
                    <h3 class="panel-title !text-sm">{{ t('scenicSetting') }}</h3>

                    <el-form-item :label="t('orderClose')">
                        <el-input v-model="formData.scenic.order_close" :placeholder="t('orderClosePlaceholder')" class="input-width" @keyup="filterNumber($event)">
                            <template #append>{{ t('second') }}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="t('isRefund')">
                        <el-radio-group v-model="formData.scenic.is_allow_refund" class="ml-4">
                            <el-radio :label="0" size="large">{{ t("no") }}</el-radio>
                            <el-radio :label="1" size="large">{{ t("yes") }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="t('refundRatio')">
                        <el-input v-model="formData.scenic.refund_rate" :placeholder="t('refundRatioPlaceholder')" class="input-width" @keyup="filterDigit($event)">
                            <template #append>%</template>
                        </el-input>
                    </el-form-item>

                </el-card>
                <el-card class="box-card !border-none" shadow="never">
                    <h3 class="panel-title !text-sm">{{ t('waySetting') }}</h3>

                    <el-form-item :label="t('orderClose')">
                        <el-input v-model="formData.way.order_close" :placeholder="t('orderClosePlaceholder')" class="input-width" @keyup="filterNumber($event)">
                            <template #append>{{ t('second') }}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="t('isRefund')">
                        <el-radio-group v-model="formData.way.is_allow_refund" class="ml-4">
                            <el-radio :label="0" size="large">{{ t("no") }}</el-radio>
                            <el-radio :label="1" size="large">{{ t("yes") }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="t('refundRatio')">
                        <el-input v-model="formData.way.refund_rate" :placeholder="t('refundRatioPlaceholder')" class="input-width" @keyup="filterDigit($event)">
                            <template #append>%</template>
                        </el-input>
                    </el-form-item>

                </el-card>
            </el-form>

            <div class="fixed-footer-wrap">
                <div class="fixed-footer">
                    <el-button type="primary" :loading="loading" @click="save(formRef)">{{ t('save') }}</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { setSetting, getSetting } from '@/addon/tourism/api/tourism'
import { useRoute } from 'vue-router'
import { filterNumber, filterDigit } from '@/utils/common'

const route = useRoute()
const pageName = route.meta.title
const loading = ref(true)

const formRef = ref<FormInstance>()

interface FormDataType {
    hotel: {
        order_close: string
        is_allow_refund: string
        refund_rate: string
    }
    scenic: {
        order_close: string
        is_allow_refund: string
        refund_rate: string
    }
    way: {
        order_close: string
        is_allow_refund: string
        refund_rate: string
    }
}

const formData = reactive<FormDataType | any>({
    hotel: {
        order_close: '',
        is_allow_refund: '0',
        refund_rate: ''
    },
    scenic: {
        order_close: '',
        is_allow_refund: '0',
        refund_rate: ''
    },
    way: {
        order_close: '',
        is_allow_refund: '0',
        refund_rate: ''
    }
})

const setFormData = async() => {
    const data = await (await getSetting()).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    loading.value = false
}

const save = async(formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async(valid) => {
        if (valid) {
            loading.value = true
            setSetting(formData).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
setFormData()
</script>

<style lang="scss" scoped></style>
