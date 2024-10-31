<template>
    <!--提现设置-->
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-form class="page-form mt-[20px]" :model="formData" label-width="150px" ref="ruleFormRef" :rules="rules" v-loading="loading">
                <el-card class="box-card !border-none" shadow="never">

                    <el-form-item :label="t('isOpen')">
                        <el-switch v-model="formData.is_open" active-value="1" inactive-value="0" />
                    </el-form-item>

                    <el-form-item :label="t('cashWithdrawalAmount')" v-if="formData.is_open" prop="min">
                        <el-input v-model.trim="formData.min" @keyup="filterDigit($event)" class="input-width" :placeholder="t('cashWithdrawalAmountPlaceholder')" />
                    </el-form-item>

                    <el-form-item :label="t('commissionRatio')" v-if="formData.is_open" prop="rate">
                        <el-input v-model.trim="formData.rate" @keyup="filterDigit($event)" class="input-width" :placeholder="t('commissionRatioPlaceholder')" />
                        <span class="ml-2">%</span>
                    </el-form-item>

                    <el-form-item :label="t('audit')" v-if="formData.is_open"  class="items-center">
                        <el-radio-group v-model="formData.is_auto_verify">
                            <el-radio label="0" size="large">{{t('manualAudit')}}</el-radio>
                            <el-radio label="1" size="large">{{t('automaticAudit')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item :label="t('transfer')" v-if="formData.is_open" class="items-center">
                        <el-radio-group v-model="formData.is_auto_transfer">
                            <el-radio label="0" size="large">{{t('manualTransfer')}}</el-radio>
                            <el-radio label="1" size="large">{{t('automatedTransit')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item :label="t('transferMode')" v-if="formData.is_open" class="items-center">
                        <el-checkbox-group v-model="formData.transfer_type" size="large">
                            <el-checkbox :label="item.key"  v-for="(item,index) in Transfertype" :key="'a'+index">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-card>
            </el-form>
        </el-card>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(ruleFormRef)">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getCashOutConfig, setCashOutConfig, getTransfertype } from '@/app/api/member'
import { FormRules, FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'
import { filterDigit } from '@/utils/common'

const route = useRoute()
const pageName = route.meta.title

const loading = ref(true)
const ruleFormRef = ref<FormInstance>()
const formData = reactive({
    is_auto_transfer: '0',
    is_auto_verify: '0',
    is_open: '0',
    min: '0.01',
    rate: '0',
    transfer_type: []
})
const Transfertype = ref<Array<Object>>([])

// 获取会员转账方式
const getTransfertypeFn = async () => {
    Transfertype.value = await (await getTransfertype()).data
}
getTransfertypeFn()

// 获取会员的配置信息
const setFormData = async () => {
    const data = await (await getCashOutConfig()).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    loading.value = false
}
setFormData()

const minRules = (rule: any, value: any, callback: any) => {
    if (Number(value) < 0.01) {
        callback(new Error(t('cashWithdrawalAmountHint')))
    } else {
        callback()
    }
}

const rateRules = (rule: any, value: any, callback: any) => {
    if (Number(value) > 100 || Number(value) < 0) {
        callback(new Error(t('commissionRatioHint')))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    min: [
        { validator: minRules, trigger: 'blur' }
    ],
    rate: [
        { validator: rateRules, trigger: 'blur' }
    ]
})

const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            const save = { ...formData }

            setCashOutConfig(save).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped></style>
