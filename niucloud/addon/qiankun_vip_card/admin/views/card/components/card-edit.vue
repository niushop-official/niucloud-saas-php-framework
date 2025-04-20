<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateCard') : t('addCard')" width="50%" class="diy-dialog-wrap" :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('levelId')" >
                    <el-select class="input-width" v-model="formData.level_id" clearable :placeholder="t('levelIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in levelIdList"
                            :key="index"
                            :label="item['level_name']"
                            :value="item['level_id']"
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
                
                <el-form-item :label="t('orderId')" >
                    <el-select class="input-width" v-model="formData.order_id" clearable :placeholder="t('orderIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in orderIdList"
                            :key="index"
                            :label="item['order_id']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('cardNo')" >
                    <el-input v-model="formData.card_no" clearable :placeholder="t('cardNoPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('cardPwd')" >
                    <el-input v-model="formData.card_pwd" clearable :placeholder="t('cardPwdPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('useMember')" >
                    <el-input v-model="formData.use_member" clearable :placeholder="t('useMemberPlaceholder')" class="input-width" />
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
import { addCard, editCard, getCardInfo, getWithMemberLevelList, getWithOrderList, getWithMemberList } from '@/addon/qiankun_vip_card/api/card'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    level_id: '',
    member_id: '',
    order_id: '',
    card_no: '',
    card_pwd: '',
    use_member: '',
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
    level_id: [
        { required: true, message: t('levelIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    member_id: [
        { required: true, message: t('memberIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    order_id: [
        { required: true, message: t('orderIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    card_no: [
        { required: true, message: t('cardNoPlaceholder'), trigger: 'blur' },
        
    ]
,
    card_pwd: [
        { required: true, message: t('cardPwdPlaceholder'), trigger: 'blur' },
        
    ]
,
    use_member: [
        { required: true, message: t('useMemberPlaceholder'), trigger: 'blur' },
        
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
    let save = formData.id ? editCard : addCard

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
    

    
    const levelIdList = ref([] as any[])
    const setLevelIdList = async () => {
    levelIdList.value = await (await getWithMemberLevelList({})).data
    }
    setLevelIdList()
    const memberIdList = ref([] as any[])
    const setMemberIdList = async () => {
    memberIdList.value = await (await getWithMemberList({})).data
    }
    setMemberIdList()
    const orderIdList = ref([] as any[])
    const setOrderIdList = async () => {
    orderIdList.value = await (await getWithOrderList({})).data
    }
    setOrderIdList()
    const useMemberList = ref([] as any[])
    const setUseMemberList = async () => {
    useMemberList.value = await (await getWithMemberList({})).data
    }
    setUseMemberList()
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getCardInfo(row.id)).data
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
