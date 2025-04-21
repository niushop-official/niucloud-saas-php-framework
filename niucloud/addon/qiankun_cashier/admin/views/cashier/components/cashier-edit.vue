<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateCashier') : t('addCashier')" width="50%" class="diy-dialog-wrap" :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('userId')" >
                    <el-select class="input-width" v-model="formData.user_id" clearable :placeholder="t('userIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in userIdList"
                            :key="index"
                            :label="item['nickname']"
                            :value="item['member_id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('username')" >
                    <el-input v-model="formData.username" clearable :placeholder="t('usernamePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('password')" >
                    <el-input v-model="formData.password" clearable :placeholder="t('passwordPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('nickname')" >
                    <el-input v-model="formData.nickname" clearable :placeholder="t('nicknamePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('avatar')" >
                    <el-input v-model="formData.avatar" clearable :placeholder="t('avatarPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('mobile')" >
                    <el-input v-model="formData.mobile" clearable :placeholder="t('mobilePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('status')" >
                    <el-select v-model="formData.status" clearable :placeholder="t('statusPlaceholder')" class="input-width">
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
import { addCashier, editCashier, getCashierInfo, getWithMemberList } from '@/addon/qiankun_cashier/api/cashier'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    user_id: '',
    username: '',
    password: '',
    nickname: '',
    avatar: '',
    mobile: '',
    status: '',
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
    user_id: [
        { required: true, message: t('userIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    username: [
        { required: true, message: t('usernamePlaceholder'), trigger: 'blur' },
        
    ]
,
    password: [
        { required: true, message: t('passwordPlaceholder'), trigger: 'blur' },
        
    ]
,
    nickname: [
        { required: true, message: t('nicknamePlaceholder'), trigger: 'blur' },
        
    ]
,
    avatar: [
        { required: true, message: t('avatarPlaceholder'), trigger: 'blur' },
        
    ]
,
    mobile: [
        { required: true, message: t('mobilePlaceholder'), trigger: 'blur' },
        
    ]
,
    status: [
        { required: true, message: t('statusPlaceholder'), trigger: 'blur' },
        
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
    let save = formData.id ? editCashier : addCashier

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
    

    
    const userIdList = ref([] as any[])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithMemberList({})).data
    }
    setUserIdList()
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getCashierInfo(row.id)).data
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
