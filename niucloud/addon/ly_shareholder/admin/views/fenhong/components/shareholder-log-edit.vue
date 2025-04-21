<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateShareholderLog') : t('addShareholderLog')" width="50%" class="diy-dialog-wrap"
        :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('orderAmount')" prop="order_amount">
                    <el-input v-model="formData.order_amount" clearable :placeholder="t('orderAmountPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('rate')" >
                    <el-input-number v-model="formData.rate" clearable :placeholder="t('ratePlaceholder')"  class="input-width"   />
                </el-form-item>
                
                <!-- <el-form-item :label="t('fenxiaoLevel')" prop="fenxiao_level">
                    <el-input v-model="formData.fenxiao_level" clearable :placeholder="t('fenxiaoLevelPlaceholder')" class="input-width" />
                </el-form-item> -->
                
                
                <el-form-item :label="t('fenxiaoLevelName')" >
                    <el-radio-group  v-model="formData.fenxiao_level_name" :placeholder="t('fenxiaoLevelNamePlaceholder')">
                        <el-radio
                            v-for="(item, index) in fenxiaoLevelNameList"
                            :key="index" :label="item.level_id">
                              {{ item.level_name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <el-form-item :label="t('levelNum')" prop="level_num">
                    <el-input v-model="formData.level_num" clearable :placeholder="t('levelNumPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('amount')" >
                    <el-input v-model="formData.amount" clearable :placeholder="t('amountPlaceholder')" class="input-width" />
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

import { addShareholderLog, editShareholderLog, getShareholderLogInfo } from '@/addon/ly_shareholder/api/shareholder'
import { getShareholderLevelList } from '@/addon/ly_shareholder/api/level'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    order_amount: '',
    rate: '',
    fenxiao_level: '',
    fenxiao_level_name: '',
    level_num: '',
    amount: '',
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
    order_amount: [
        { required: true, message: t('orderAmountPlaceholder'), trigger: 'blur' },
        
    ]
,
    rate: [
        { required: true, message: t('ratePlaceholder'), trigger: 'blur' },
        { validator: (rule: any, value: string, callback: any) => {  if (value && !/^\d{0,100}$/.test(value)) { callback(new Error(t('generateBetween')))} else { callback() }}},
    ]
,
    fenxiao_level: [
        { required: true, message: t('fenxiaoLevelPlaceholder'), trigger: 'blur' },
        
    ]
,
    fenxiao_level_name: [
        { required: true, message: t('fenxiaoLevelNamePlaceholder'), trigger: 'blur' },
        
    ]
,
    level_num: [
        { required: true, message: t('levelNumPlaceholder'), trigger: 'blur' },
        
    ]
,
    amount: [
        { required: true, message: t('amountPlaceholder'), trigger: 'blur' },
        
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
    let save = formData.id ? editShareholderLog : addShareholderLog

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
    

    
    const fenxiaoLevelNameList = ref([] as any[])
    const setFenxiaoLevelNameList = async () => {
    fenxiaoLevelNameList.value = await (await getShareholderLevelList({})).data
    }
    setFenxiaoLevelNameList()
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getShareholderLogInfo(row.id)).data
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