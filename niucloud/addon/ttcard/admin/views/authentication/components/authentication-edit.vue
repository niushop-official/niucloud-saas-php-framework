<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateAuthentication') : t('addAuthentication')" width="50%" class="diy-dialog-wrap" :close-on-click-modal="false"
        :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <!-- <el-form-item :label="t('status')" prop="status">
                    <el-radio-group  v-model="formData.status" :placeholder="t('statusPlaceholder')">
                        <el-radio
                            v-for="(item, index) in statusList"
                            :key="index" :label="item.value">
                              {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item> -->
                
                <el-form-item :label="t('examineStatus')" prop="examine_status">
                    <el-select class="input-width"  v-model="formData.examine_status" clearable :placeholder="t('examineStatusPlaceholder')">
                    <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in examine_statusList"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('userId')" prop="user_id">
                    <el-select class="input-width" disabled v-model="formData.user_id" clearable :placeholder="t('userIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in userIdList"
                            :key="index"
                            :label="item['nickname']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('websiteId')" prop="website_id">
                    <el-select class="input-width" disabled v-model="formData.website_id" clearable :placeholder="t('websiteIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in websiteIdList"
                            :key="index"
                            :label="item['name']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item :label="t('ordertypeId')" >
                    <el-select class="input-width" disabled v-model="formData.ordertype_id" clearable :placeholder="t('ordertypeIdPlaceholder')">
                        <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in ordertypeIdList"
                            :key="index"
                            :label="item['name']"
                            :value="item['real_id']"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item :label="t('name')" prop="name">
                    <el-input v-model="formData.name" clearable :placeholder="t('namePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('idcardNum')" prop="idcard_num">
                    <el-input v-model="formData.idcard_num" clearable :placeholder="t('idcardNumPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('idcardZImage')">
                    <upload-image v-model="formData.idcard_z_image" />
                </el-form-item>
                
                <el-form-item :label="t('idcardFImage')">
                    <upload-image v-model="formData.idcard_f_image" />
                </el-form-item>
                
                <el-form-item :label="t('businesslicenseImage')">
                    <upload-image v-model="formData.businesslicense_image" />
                </el-form-item>
                
                <el-form-item :label="t('tips')" >
                    <el-input v-model="formData.tips" clearable :placeholder="t('tipsPlaceholder')" class="input-width" />
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
import { addAuthentication, editAuthentication, getAuthenticationInfo, getWithUserList, getWithWebsiteList,getWithOrdertypeList } from '@/addon/ttcard/api/authentication'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    status: 'normal',
    examine_status: '4',
    user_id: '',
    website_id: '',
    ordertype_id: '',
    ordertype_diyname: '',
    name: '',
    idcard_num: '',
    idcard_z_image: '',
    idcard_f_image: '',
    businesslicense_image: '',
    tips: '',
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
    examine_status: [
        { required: true, message: t('examineStatusPlaceholder'), trigger: 'blur' },
        
    ]
,
    user_id: [
        { required: true, message: t('userIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    website_id: [
        { required: true, message: t('websiteIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    ordertype_id: [
        { required: true, message: t('ordertypeIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    ordertype_diyname: [
        { required: true, message: t('ordertypeDiynamePlaceholder'), trigger: 'blur' },
        
    ]
,
    name: [
        { required: true, message: t('namePlaceholder'), trigger: 'blur' },
        
    ]
,
    idcard_num: [
        { required: true, message: t('idcardNumPlaceholder'), trigger: 'blur' },
        
    ]
,
    idcard_z_image: [
        { required: true, message: t('idcardZImagePlaceholder'), trigger: 'blur' },
        
    ]
,
    idcard_f_image: [
        { required: true, message: t('idcardFImagePlaceholder'), trigger: 'blur' },
        
    ]
,
    businesslicense_image: [
        { required: true, message: t('businesslicenseImagePlaceholder'), trigger: 'blur' },
        
    ]
,
    tips: [
        { required: true, message: t('tipsPlaceholder'), trigger: 'blur' },
        
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
    let save = formData.id ? editAuthentication : addAuthentication

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
    let examine_statusList = ref([])
    const examine_statusDictList = async () => {
    examine_statusList.value = await (await useDictionary('认证审核')).data.dictionary
    }
    examine_statusDictList();
    watch(() => examine_statusList.value, () => { formData.examine_status = examine_statusList.value[0].value })
    let ordertype_diynameList = ref([])
    const ordertype_diynameDictList = async () => {
    ordertype_diynameList.value = await (await useDictionary('认证收费类型')).data.dictionary
    }
    ordertype_diynameDictList();
    watch(() => ordertype_diynameList.value, () => { formData.ordertype_diyname = ordertype_diynameList.value[0].value })

    
    const userIdList = ref([] as any[])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithUserList({})).data
    }
    setUserIdList()
    const websiteIdList = ref([] as any[])
    const setWebsiteIdList = async () => {
    websiteIdList.value = await (await getWithWebsiteList({})).data
    }
    setWebsiteIdList()

    const ordertypeIdList = ref([] as any[])
    const setOrdertypeIdList = async () => {
    ordertypeIdList.value = await (await getWithOrdertypeList({})).data
    }
    setOrdertypeIdList()
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getAuthenticationInfo(row.id)).data
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
