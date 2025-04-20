<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateOrder') : t('addOrder')" width="50%" class="diy-dialog-wrap" :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('orderNo')" >
                    <el-input v-model="formData.order_no" clearable :placeholder="t('orderNoPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('memberId')" >
                    <el-input v-model="formData.member_id" clearable :placeholder="t('memberIdPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('goodsId')" >
                    <el-input v-model="formData.goods_id" clearable :placeholder="t('goodsIdPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('skuId')" >
                    <el-input v-model="formData.sku_id" clearable :placeholder="t('skuIdPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('goodsPrice')" >
                    <el-input v-model="formData.goods_price" clearable :placeholder="t('goodsPricePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('rules')" >
                    <el-input v-model="formData.rules" clearable :placeholder="t('rulesPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('after')" >
                    <el-input v-model="formData.after" clearable :placeholder="t('afterPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('type')" >
                    <el-input v-model="formData.type" clearable :placeholder="t('typePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('isFull')" >
                    <el-input v-model="formData.is_full" clearable :placeholder="t('isFullPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('current')" >
                    <el-input v-model="formData.current" clearable :placeholder="t('currentPlaceholder')" class="input-width" />
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
import { addOrder, editOrder, getOrderInfo } from '@/addon/qiankun_recovery/api/order'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    order_no: '',
    member_id: '',
    goods_id: '',
    sku_id: '',
    goods_price: '',
    rules: '',
    after: '',
    type: '',
    is_full: '',
    current: '',
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
    member_id: [
        { required: true, message: t('memberIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    goods_id: [
        { required: true, message: t('goodsIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    sku_id: [
        { required: true, message: t('skuIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    goods_price: [
        { required: true, message: t('goodsPricePlaceholder'), trigger: 'blur' },
        
    ]
,
    rules: [
        { required: true, message: t('rulesPlaceholder'), trigger: 'blur' },
        
    ]
,
    after: [
        { required: true, message: t('afterPlaceholder'), trigger: 'blur' },
        
    ]
,
    type: [
        { required: true, message: t('typePlaceholder'), trigger: 'blur' },
        
    ]
,
    is_full: [
        { required: true, message: t('isFullPlaceholder'), trigger: 'blur' },
        
    ]
,
    current: [
        { required: true, message: t('currentPlaceholder'), trigger: 'blur' },
        
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
