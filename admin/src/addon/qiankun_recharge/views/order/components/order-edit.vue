<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateOrder') : t('addOrder')" width="50%" class="diy-dialog-wrap" :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('orderNo')" >
                    <el-input v-model="formData.order_no" clearable :placeholder="t('orderNoPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('orderFrom')" >
                    <el-input v-model="formData.order_from" clearable :placeholder="t('orderFromPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('orderType')" >
                    <el-input v-model="formData.order_type" clearable :placeholder="t('orderTypePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('outTradeNo')" >
                    <el-input v-model="formData.out_trade_no" clearable :placeholder="t('outTradeNoPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('memberId')" >
                    <el-select class="input-width" v-model="formData.member_id" clearable :placeholder="t('memberIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in memberIdList"
                            :key="index"
                            :label="item['nickname']"
                            :value="item['member_id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('rechargeId')" >
                    <el-select class="input-width" v-model="formData.recharge_id" clearable :placeholder="t('rechargeIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in rechargeIdList"
                            :key="index"
                            :label="item['title']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('giveCoupon')" >
                    <el-input v-model="formData.give_coupon" clearable :placeholder="t('giveCouponPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('giveIntegral')" >
                    <el-input v-model="formData.give_integral" clearable :placeholder="t('giveIntegralPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('givePrice')" >
                    <el-input v-model="formData.give_price" clearable :placeholder="t('givePricePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('paid')" >
                    <el-select v-model="formData.paid" clearable :placeholder="t('paidPlaceholder')" class="input-width">
                        <el-option
                            label="选项1"
                            value="1"
                        />
                        <el-option
                            label="选项2"
                            value="2"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('payTime')" >
                    <el-input v-model="formData.pay_time" clearable :placeholder="t('payTimePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('refundStatus')" >
                    <el-input v-model="formData.refund_status" clearable :placeholder="t('refundStatusPlaceholder')" class="input-width" />
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
import { addOrder, editOrder, getOrderInfo, getWithMemberList, getWithOptionsList } from '@/addon/qiankun_recharge/api/order'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    order_no: '',
    order_from: '',
    order_type: '',
    out_trade_no: '',
    member_id: '',
    recharge_id: '',
    give_coupon: '',
    give_integral: '',
    give_price: '',
    paid: '',
    pay_time: '',
    refund_status: '',
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
    order_type: [
        { required: true, message: t('orderTypePlaceholder'), trigger: 'blur' },
        
    ]
,
    out_trade_no: [
        { required: true, message: t('outTradeNoPlaceholder'), trigger: 'blur' },
        
    ]
,
    member_id: [
        { required: true, message: t('memberIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    recharge_id: [
        { required: true, message: t('rechargeIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    give_coupon: [
        { required: true, message: t('giveCouponPlaceholder'), trigger: 'blur' },
        
    ]
,
    give_integral: [
        { required: true, message: t('giveIntegralPlaceholder'), trigger: 'blur' },
        
    ]
,
    give_price: [
        { required: true, message: t('givePricePlaceholder'), trigger: 'blur' },
        
    ]
,
    paid: [
        { required: true, message: t('paidPlaceholder'), trigger: 'blur' },
        
    ]
,
    pay_time: [
        { required: true, message: t('payTimePlaceholder'), trigger: 'blur' },
        
    ]
,
    refund_status: [
        { required: true, message: t('refundStatusPlaceholder'), trigger: 'blur' },
        
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
    let save = formData.id ? editOrder : addOrder

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
    

    
    const memberIdList = ref([] as any[])
    const setMemberIdList = async () => {
    memberIdList.value = await (await getWithMemberList({})).data
    }
    setMemberIdList()
    const rechargeIdList = ref([] as any[])
    const setRechargeIdList = async () => {
    rechargeIdList.value = await (await getWithOptionsList({})).data
    }
    setRechargeIdList()
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getOrderInfo(row.id)).data
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
