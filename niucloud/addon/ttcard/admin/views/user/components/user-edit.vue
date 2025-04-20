<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateUser') : t('addUser')" width="50%" class="diy-dialog-wrap" :close-on-click-modal="false"
        :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('status')" >
                    <el-radio-group  v-model="formData.status" :placeholder="t('statusPlaceholder')">
                        <el-radio
                            v-for="(item, index) in statusList"
                            :key="index" :label="item.value">
                              {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <el-form-item :label="t('username')" >
                    <el-input v-model="formData.username" clearable :placeholder="t('usernamePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('password')" >
                    <el-input v-model="formData.password" clearable :placeholder="t('passwordPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('avatar')" >
                    <el-input v-model="formData.avatar" clearable :placeholder="t('avatarPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('nickname')" >
                    <el-input v-model="formData.nickname" clearable :placeholder="t('nicknamePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('phone')" >
                    <el-input v-model="formData.phone" clearable :placeholder="t('phonePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('ordertypeId')" >
                    <el-select class="input-width" v-model="formData.ordertype_id" clearable :placeholder="t('ordertypeIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in ordertypeIdList"
                            :key="index"
                            :label="item['name']"
                            :value="item['real_id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('gradeStatus')" >
                    <el-radio-group  v-model="formData.grade_status" :placeholder="t('gradeStatusPlaceholder')">
                        <el-radio
                            v-for="(item, index) in grade_statusList"
                            :key="index" :label="item.value">
                              {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item :label="t('expirationtime')"  class="input-width">
                    <el-date-picker 
                        class="flex-1 !flex"
                        v-model="formData.expirationtime"
                        clearable
                        type="datetime"
                        style="width: 100%;"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        :placeholder="t('expirationtimePlaceholder')">
                    </el-date-picker>
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
import { addUser, editUser, getUserInfo, getWithOrdertypeList } from '@/addon/ttcard/api/user'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    status: 'normal',
    username: '',
    password: '',
    avatar: '',
    nickname: '',
    phone: '',
    ordertype_id: '',
    expirationtime: '',
    grade_status: 'normal',
    prelogintime: '',
    logintime: '',
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
    status: [
        { required: true, message: t('statusPlaceholder'), trigger: 'blur' },
        
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
    avatar: [
        { required: true, message: t('avatarPlaceholder'), trigger: 'blur' },
        
    ]
,
    nickname: [
        { required: true, message: t('nicknamePlaceholder'), trigger: 'blur' },
        
    ]
,
    phone: [
        { required: true, message: t('phonePlaceholder'), trigger: 'blur' },
        
    ]
,
    ordertype_id: [
        { required: true, message: t('ordertypeIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    expirationtime: [
        { required: true, message: t('expirationtimePlaceholder'), trigger: 'blur' },
        
    ]
,
    grade_status: [
        { required: true, message: t('gradeStatusPlaceholder'), trigger: 'blur' },
        
    ]
,
    prelogintime: [
        { required: true, message: t('prelogintimePlaceholder'), trigger: 'blur' },
        
    ]
,
    logintime: [
        { required: true, message: t('logintimePlaceholder'), trigger: 'blur' },
        
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
    let save = formData.id ? editUser : addUser

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
    let statusList = ref([])
    const statusDictList = async () => {
    statusList.value = await (await useDictionary('展示状态')).data.dictionary
    }
    statusDictList();
    watch(() => statusList.value, () => { formData.status = statusList.value[0].value })
    let grade_statusList = ref([])
    const grade_statusDictList = async () => {
    grade_statusList.value = await (await useDictionary('会员等级状态')).data.dictionary
    }
    grade_statusDictList();
    watch(() => grade_statusList.value, () => { formData.grade_status = grade_statusList.value[0].value })

    
    const ordertypeIdList = ref([] as any[])
    const setOrdertypeIdList = async () => {
    ordertypeIdList.value = await (await getWithOrdertypeList({})).data
    }
    setOrdertypeIdList()
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getUserInfo(row.id)).data
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
