<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateBiographical') : t('addBiographical')" width="50%" class="diy-dialog-wrap"
        :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('userId')" prop="user_id">
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
                
                <el-form-item :label="t('name')" prop="name">
                    <el-input v-model="formData.name" clearable :placeholder="t('namePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('phone')" prop="phone">
                    <el-input v-model="formData.phone" clearable :placeholder="t('phonePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('avatar')">
                    <upload-image v-model="formData.avatar" />
                </el-form-item>
                
                <el-form-item :label="t('age')" >
                    <el-input v-model="formData.age" clearable :placeholder="t('agePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('genderStatus')" >
                    <el-radio-group  v-model="formData.gender_status" :placeholder="t('genderStatusPlaceholder')">
                        <el-radio
                            v-for="(item, index) in gender_statusList"
                            :key="index" :label="item.value">
                              {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <el-form-item :label="t('email')" >
                    <el-input v-model="formData.email" clearable :placeholder="t('emailPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('wechatNum')" >
                    <el-input v-model="formData.wechat_num" clearable :placeholder="t('wechatNumPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('position')" >
                    <el-input v-model="formData.position" clearable :placeholder="t('positionPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('expected')" >
                    <el-input v-model="formData.expected" clearable :placeholder="t('expectedPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('working')" >
                    <el-input v-model="formData.working" clearable :placeholder="t('workingPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('typeStatus')" >
                    <el-radio-group  v-model="formData.type_status" :placeholder="t('typeStatusPlaceholder')">
                        <el-radio
                            v-for="(item, index) in type_statusList"
                            :key="index" :label="item.value">
                              {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <el-form-item :label="t('education')" >
                    <el-input v-model="formData.education" clearable :placeholder="t('educationPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('city')" >
                    <el-input v-model="formData.city" clearable :placeholder="t('cityPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('advantageContent')" >
                    <editor v-model="formData.advantage_content" />
                </el-form-item>
                <el-form-item :label="t('experienceContent')" >
                    <editor v-model="formData.experience_content" />
                </el-form-item>
                <el-form-item :label="t('learningContent')" >
                    <editor v-model="formData.learning_content" />
                </el-form-item>
                <el-form-item :label="t('certificateImages')">
                    <upload-image v-model="formData.certificate_images" />
                </el-form-item>
                
                <el-form-item :label="t('unemployedStatus')" >
                    <el-radio-group  v-model="formData.unemployed_status" :placeholder="t('unemployedStatusPlaceholder')">
                        <el-radio
                            v-for="(item, index) in unemployed_statusList"
                            :key="index" :label="item.value">
                              {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <el-form-item :label="t('deliveNum')" >
                    <el-input v-model="formData.delive_num" clearable :placeholder="t('deliveNumPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('viewNum')" >
                    <el-input v-model="formData.view_num" clearable :placeholder="t('viewNumPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('reporttime')"  class="input-width">
                    <el-date-picker 
                        class="flex-1 !flex"
                        v-model="formData.reporttime"
                        clearable
                        type="datetime"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        :placeholder="t('reporttimePlaceholder')">
                    </el-date-picker>
                </el-form-item>
                <el-form-item :label="t('status')" prop="status">
                    <el-radio-group  v-model="formData.status" :placeholder="t('statusPlaceholder')">
                        <el-radio
                            v-for="(item, index) in statusList"
                            :key="index" :label="item.value">
                              {{ item.name }}
                        </el-radio>
                    </el-radio-group>
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
import { addBiographical, editBiographical, getBiographicalInfo, getWithUserList } from '@/addon/ttcard/api/biographical'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    user_id: '',
    name: '',
    phone: '',
    avatar: '',
    age: '',
    gender_status: '',
    email: '',
    wechat_num: '',
    position: '',
    expected: '',
    working: '',
    type_status: '',
    education: '',
    city: '',
    advantage_content: '',
    experience_content: '',
    learning_content: '',
    certificate_images: '',
    unemployed_status: '',
    delive_num: '',
    view_num: '',
    reporttime: '',
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
    name: [
        { required: true, message: t('namePlaceholder'), trigger: 'blur' },
        
    ]
,
    phone: [
        { required: true, message: t('phonePlaceholder'), trigger: 'blur' },
        
    ]
,
    avatar: [
        { required: true, message: t('avatarPlaceholder'), trigger: 'blur' },
        
    ]
,
    age: [
        { required: true, message: t('agePlaceholder'), trigger: 'blur' },
        
    ]
,
    gender_status: [
        { required: true, message: t('genderStatusPlaceholder'), trigger: 'blur' },
        
    ]
,
    email: [
        { required: true, message: t('emailPlaceholder'), trigger: 'blur' },
        
    ]
,
    wechat_num: [
        { required: true, message: t('wechatNumPlaceholder'), trigger: 'blur' },
        
    ]
,
    position: [
        { required: true, message: t('positionPlaceholder'), trigger: 'blur' },
        
    ]
,
    expected: [
        { required: true, message: t('expectedPlaceholder'), trigger: 'blur' },
        
    ]
,
    working: [
        { required: true, message: t('workingPlaceholder'), trigger: 'blur' },
        
    ]
,
    type_status: [
        { required: true, message: t('typeStatusPlaceholder'), trigger: 'blur' },
        
    ]
,
    education: [
        { required: true, message: t('educationPlaceholder'), trigger: 'blur' },
        
    ]
,
    city: [
        { required: true, message: t('cityPlaceholder'), trigger: 'blur' },
        
    ]
,
    advantage_content: [
        { required: true, message: t('advantageContentPlaceholder'), trigger: 'blur' },
        
    ]
,
    experience_content: [
        { required: true, message: t('experienceContentPlaceholder'), trigger: 'blur' },
        
    ]
,
    learning_content: [
        { required: true, message: t('learningContentPlaceholder'), trigger: 'blur' },
        
    ]
,
    certificate_images: [
        { required: true, message: t('certificateImagesPlaceholder'), trigger: 'blur' },
        
    ]
,
    unemployed_status: [
        { required: true, message: t('unemployedStatusPlaceholder'), trigger: 'blur' },
        
    ]
,
    delive_num: [
        { required: true, message: t('deliveNumPlaceholder'), trigger: 'blur' },
        
    ]
,
    view_num: [
        { required: true, message: t('viewNumPlaceholder'), trigger: 'blur' },
        
    ]
,
    reporttime: [
        { required: true, message: t('reporttimePlaceholder'), trigger: 'blur' },
        
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
    let save = formData.id ? editBiographical : addBiographical

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
    let gender_statusList = ref([])
    const gender_statusDictList = async () => {
    gender_statusList.value = await (await useDictionary('性别')).data.dictionary
    }
    gender_statusDictList();
    watch(() => gender_statusList.value, () => { formData.gender_status = gender_statusList.value[0].value })
    let type_statusList = ref([])
    const type_statusDictList = async () => {
    type_statusList.value = await (await useDictionary('应聘类型')).data.dictionary
    }
    type_statusDictList();
    watch(() => type_statusList.value, () => { formData.type_status = type_statusList.value[0].value })
    let unemployed_statusList = ref([])
    const unemployed_statusDictList = async () => {
    unemployed_statusList.value = await (await useDictionary('是否待业')).data.dictionary
    }
    unemployed_statusDictList();
    watch(() => unemployed_statusList.value, () => { formData.unemployed_status = unemployed_statusList.value[0].value })
    let statusList = ref([])
    const statusDictList = async () => {
    statusList.value = await (await useDictionary('展示状态')).data.dictionary
    }
    statusDictList();
    watch(() => statusList.value, () => { formData.status = statusList.value[0].value })

    
    const userIdList = ref([] as any[])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithUserList({})).data
    }
    setUserIdList()
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getBiographicalInfo(row.id)).data
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
