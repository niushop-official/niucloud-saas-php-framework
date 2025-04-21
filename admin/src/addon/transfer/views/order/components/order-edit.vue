<template>
    <el-dialog v-model="showDialog" :title="formData.order_id ? t('updateOrder') : t('addOrder')" width="50%" class="diy-dialog-wrap" :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('siteId')" prop="site_id">
    <el-input v-model="formData.site_id" clearable :placeholder="t('siteIdPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('orderNo')" prop="order_no">
    <el-input v-model="formData.order_no" clearable :placeholder="t('orderNoPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('orderFrom')" prop="order_from">
    <el-input v-model="formData.order_from" clearable :placeholder="t('orderFromPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('outTradeNo')" prop="out_trade_no">
    <el-input v-model="formData.out_trade_no" clearable :placeholder="t('outTradeNoPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('orderStatus')" prop="order_status">
    <el-input v-model="formData.order_status" clearable :placeholder="t('orderStatusPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('memberId')" prop="member_id">
    <el-input v-model="formData.member_id" clearable :placeholder="t('memberIdPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('ip')" prop="ip">
    <el-input v-model="formData.ip" clearable :placeholder="t('ipPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('orderMoney')" prop="order_money">
    <el-input v-model="formData.order_money" clearable :placeholder="t('orderMoneyPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('payTime')" prop="pay_time">
    <el-input v-model="formData.pay_time" clearable :placeholder="t('payTimePlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('closeTime')" prop="close_time">
    <el-input v-model="formData.close_time" clearable :placeholder="t('closeTimePlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('logId')" >
    <el-input v-model="formData.log_id" clearable :placeholder="t('logIdPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('orderType')" >
    <el-input v-model="formData.order_type" clearable :placeholder="t('orderTypePlaceholder')" class="input-width" />
</el-form-item>

        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{
                    t('confirm')
                }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import { useDictionary } from '@/app/api/dict'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { addOrder, editOrder, getOrderInfo } from '@/addon/transfer/api/order'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    order_id: '',
    order_no: '',
    order_from: '',
    out_trade_no: '',
    order_status: '',
    member_id: '',
    ip: '',
    order_money: '',
    pay_time: '',
    close_time: '',
    log_id: '',
    order_type: '',
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
    order_no: [
        { required: true, message: t('orderNoPlaceholder'), trigger: 'blur' },
        
    ]
,
    order_from: [
        { required: true, message: t('orderFromPlaceholder'), trigger: 'blur' },
        
    ]
,
    out_trade_no: [
        { required: true, message: t('outTradeNoPlaceholder'), trigger: 'blur' },
        
    ]
,
    order_status: [
        { required: true, message: t('orderStatusPlaceholder'), trigger: 'blur' },
        
    ]
,
    member_id: [
        { required: true, message: t('memberIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    ip: [
        { required: true, message: t('ipPlaceholder'), trigger: 'blur' },
        
    ]
,
    order_money: [
        { required: true, message: t('orderMoneyPlaceholder'), trigger: 'blur' },
        
    ]
,
    pay_time: [
        { required: true, message: t('payTimePlaceholder'), trigger: 'blur' },
        
    ]
,
    close_time: [
        { required: true, message: t('closeTimePlaceholder'), trigger: 'blur' },
        
    ]
,
    log_id: [
        { required: true, message: t('logIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    order_type: [
        { required: true, message: t('orderTypePlaceholder'), trigger: 'blur' },
        
    ]
,
    }
})

const emit = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    let save = formData.order_id ? editOrder : addOrder

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

// 获取字典数据
    

    
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getOrderInfo(row.order_id)).data
        if (data) Object.keys(formData).forEach((key: string) => {
            if (data[key] != undefined) formData[key] = data[key]
        })
    }
    loading.value = false
}

// 验证手机号格式
const mobileVerify = (rule: any, value: any, callback: any) => {
    if (value && !/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error(t('generateMobile')))
    } else {
        callback()
    }
}

// 验证身份证号
const idCardVerify = (rule: any, value: any, callback: any) => {
    if (value && !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
        callback(new Error(t('generateIdCard')))
    } else {
        callback()
    }
}

// 验证邮箱号
const emailVerify = (rule: any, value: any, callback: any) => {
    if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
        callback(new Error(t('generateEmail')))
    } else {
        callback()
    }
}

// 验证请输入整数
const numberVerify = (rule: any, value: any, callback: any) => {
    if (!Number.isInteger(value)) {
        callback(new Error(t('generateNumber')))
    } else {
        callback()
    }
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
