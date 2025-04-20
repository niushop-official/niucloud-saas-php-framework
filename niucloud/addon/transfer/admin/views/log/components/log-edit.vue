<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateLog') : t('addLog')" width="50%" class="diy-dialog-wrap" :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('accountType')" >
    <el-select v-model="formData.account_type" clearable :placeholder="t('accountTypePlaceholder')" class="input-width">
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

                <el-form-item :label="t('toMemberId')" >
    <el-select class="input-width" v-model="formData.to_member_id" clearable :placeholder="t('toMemberIdPlaceholder')">
       <el-option label="请选择" value=""></el-option>
        <el-option
            v-for="(item, index) in toMemberIdList"
            :key="index"
            :label="item['nickname']"
            :value="item['member_id']"
        />
    </el-select>
</el-form-item>

                <el-form-item :label="t('zhuanMoney')" >
    <el-input v-model="formData.zhuan_money" clearable :placeholder="t('zhuanMoneyPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('giveMoney')" >
    <el-input v-model="formData.give_money" clearable :placeholder="t('giveMoneyPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('meno')" >
    <el-input v-model="formData.meno" clearable :placeholder="t('menoPlaceholder')" class="input-width" />
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
import { addLog, editLog, getLogInfo, getWithMemberList } from '@/addon/transfer/api/log'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    account_type: '',
    member_id: '',
    to_member_id: '',
    zhuan_money: '',
    give_money: '',
    meno: '',
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
    account_type: [
        { required: true, message: t('accountTypePlaceholder'), trigger: 'blur' },
        
    ]
,
    member_id: [
        { required: true, message: t('memberIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    to_member_id: [
        { required: true, message: t('toMemberIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    zhuan_money: [
        { required: true, message: t('zhuanMoneyPlaceholder'), trigger: 'blur' },
        
    ]
,
    give_money: [
        { required: true, message: t('giveMoneyPlaceholder'), trigger: 'blur' },
        
    ]
,
    meno: [
        { required: true, message: t('menoPlaceholder'), trigger: 'blur' },
        
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
    let save = formData.id ? editLog : addLog

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
    const toMemberIdList = ref([] as any[])
    const setToMemberIdList = async () => {
    toMemberIdList.value = await (await getWithMemberList({})).data
    }
    setToMemberIdList()
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getLogInfo(row.id)).data
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
