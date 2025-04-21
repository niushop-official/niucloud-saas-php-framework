<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateFxbill') : t('addFxbill')" width="50%" class="diy-dialog-wrap" :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('memberId')" prop="member_id">
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

                <el-form-item :label="t('accountType')" prop="account_type">
    <el-input v-model="formData.account_type" clearable :placeholder="t('accountTypePlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('accountData')" prop="account_data">
    <el-input v-model="formData.account_data" clearable :placeholder="t('accountDataPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('accountSum')" prop="account_sum">
    <el-input v-model="formData.account_sum" clearable :placeholder="t('accountSumPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('fromType')" prop="from_type">
    <el-input v-model="formData.from_type" clearable :placeholder="t('fromTypePlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('relatedId')" prop="related_id">
    <el-input v-model="formData.related_id" clearable :placeholder="t('relatedIdPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('memo')" prop="memo">
    <el-input v-model="formData.memo" clearable :placeholder="t('memoPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('fromMemberId')" >
    <el-input v-model="formData.from_member_id" clearable :placeholder="t('fromMemberIdPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('fxlevel')" >
    <el-input v-model="formData.fxlevel" clearable :placeholder="t('fxlevelPlaceholder')" class="input-width" />
</el-form-item>

                <el-form-item :label="t('status')" >
    <el-input v-model="formData.status" clearable :placeholder="t('statusPlaceholder')" class="input-width" />
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
import { addFxbill, editFxbill, getFxbillInfo, getWithMemberList } from '@/addon/huodong/api/fxbill'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    member_id: '',
    account_type: '',
    account_data: '',
    account_sum: '',
    from_type: '',
    related_id: '',
    memo: '',
    from_member_id: '',
    fxlevel: '',
    status: '',
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
    member_id: [
        { required: true, message: t('memberIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    account_type: [
        { required: true, message: t('accountTypePlaceholder'), trigger: 'blur' },
        
    ]
,
    account_data: [
        { required: true, message: t('accountDataPlaceholder'), trigger: 'blur' },
        
    ]
,
    account_sum: [
        { required: true, message: t('accountSumPlaceholder'), trigger: 'blur' },
        
    ]
,
    from_type: [
        { required: true, message: t('fromTypePlaceholder'), trigger: 'blur' },
        
    ]
,
    related_id: [
        { required: true, message: t('relatedIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    memo: [
        { required: true, message: t('memoPlaceholder'), trigger: 'blur' },
        
    ]
,
    from_member_id: [
        { required: true, message: t('fromMemberIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    fxlevel: [
        { required: true, message: t('fxlevelPlaceholder'), trigger: 'blur' },
        
    ]
,
    status: [
        { required: true, message: t('statusPlaceholder'), trigger: 'blur' },
        
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
    let save = formData.id ? editFxbill : addFxbill

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
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getFxbillInfo(row.id)).data
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
