<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateOrder') : t('addOrder')" width="50%" class="diy-dialog-wrap"
        :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('orderNum')" >
                    <el-input v-model="formData.order_num" disabled clearable :placeholder="t('orderNumPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('payStatus')" >
                    <el-select class="input-width"  v-model="formData.pay_status" clearable :placeholder="t('payStatusPlaceholder')">
                    <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in pay_statusList"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                
                <!-- <el-form-item :label="t('price')" >
                    <el-input v-model="formData.price" clearable :placeholder="t('pricePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('totalPrice')" >
                    <el-input v-model="formData.total_price" clearable :placeholder="t('totalPricePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('buyNum')" >
                    <el-input v-model="formData.buy_num" clearable :placeholder="t('buyNumPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('addressId')" >
                    <el-input v-model="formData.address_id" clearable :placeholder="t('addressIdPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('userId')" >
                    <el-select class="input-width" v-model="formData.user_id" clearable :placeholder="t('userIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in userIdList"
                            :key="index"
                            :label="item['nickname']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('authenticationId')" >
                    <el-input v-model="formData.authentication_id" clearable :placeholder="t('authenticationIdPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('productId')" >
                    <el-input v-model="formData.product_id" clearable :placeholder="t('productIdPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('ordertypeId')" >
                    <el-select class="input-width" v-model="formData.ordertype_id" clearable :placeholder="t('ordertypeIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in ordertypeIdList"
                            :key="index"
                            :label="item['name']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('ordertypeViptype')" >
                    <el-input v-model="formData.ordertype_viptype" clearable :placeholder="t('ordertypeViptypePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('orderTypeDiyname')" >
                    <el-input v-model="formData.order_type_diyname" clearable :placeholder="t('orderTypeDiynamePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('paytime')"  class="input-width">
                    <el-date-picker 
                        class="flex-1 !flex"
                        v-model="formData.paytime"
                        clearable
                        type="datetime"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        :placeholder="t('paytimePlaceholder')">
                    </el-date-picker>
                </el-form-item>
                <el-form-item :label="t('createTime')"  class="input-width">
                    <el-date-picker 
                        class="flex-1 !flex"
                        v-model="formData.create_time"
                        clearable
                        type="datetime"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        :placeholder="t('createTimePlaceholder')">
                    </el-date-picker>
                </el-form-item> -->
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
import { addOrder, editOrder, getOrderInfo, getWithUserList, getWithOrdertypeList } from '@/addon/ttcard/api/order'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    order_num: '',
    pay_status: '',
    price: '',
    total_price: '',
    buy_num: '',
    address_id: '',
    user_id: '',
    authentication_id: '',
    product_id: '',
    ordertype_id: '',
    ordertype_viptype: '',
    order_type_diyname: '',
    paytime: '',
    create_time: '',
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
    order_num: [
        { required: true, message: t('orderNumPlaceholder'), trigger: 'blur' },
        
    ]
,
    pay_status: [
        { required: true, message: t('payStatusPlaceholder'), trigger: 'blur' },
        
    ]
,
    price: [
        { required: true, message: t('pricePlaceholder'), trigger: 'blur' },
        
    ]
,
    total_price: [
        { required: true, message: t('totalPricePlaceholder'), trigger: 'blur' },
        
    ]
,
    buy_num: [
        { required: true, message: t('buyNumPlaceholder'), trigger: 'blur' },
        
    ]
,
    address_id: [
        { required: true, message: t('addressIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    user_id: [
        { required: true, message: t('userIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    authentication_id: [
        { required: true, message: t('authenticationIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    product_id: [
        { required: true, message: t('productIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    ordertype_id: [
        { required: true, message: t('ordertypeIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    ordertype_viptype: [
        { required: true, message: t('ordertypeViptypePlaceholder'), trigger: 'blur' },
        
    ]
,
    order_type_diyname: [
        { required: true, message: t('orderTypeDiynamePlaceholder'), trigger: 'blur' },
        
    ]
,
    paytime: [
        { required: true, message: t('paytimePlaceholder'), trigger: 'blur' },
        
    ]
,
    create_time: [
        { required: true, message: t('createTimePlaceholder'), trigger: 'blur' },
        
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
    let pay_statusList = ref([])
    const pay_statusDictList = async () => {
    pay_statusList.value = await (await useDictionary('支付状态')).data.dictionary
    }
    pay_statusDictList();
    watch(() => pay_statusList.value, () => { formData.pay_status = pay_statusList.value[0].value })

    
    const userIdList = ref([] as any[])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithUserList({})).data
    }
    setUserIdList()
    const ordertypeIdList = ref([] as any[])
    const setOrdertypeIdList = async () => {
    ordertypeIdList.value = await (await getWithOrdertypeList({})).data
    }
    setOrdertypeIdList()
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
