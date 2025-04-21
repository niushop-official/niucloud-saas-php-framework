<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateOrdertype') : t('addOrdertype')" width="50%" class="diy-dialog-wrap" :close-on-click-modal="false"
        :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">

                <el-form-item v-if="formData.type!='authentication'" :label="t('status')" prop="status">
                    <el-radio-group  v-model="formData.status" :placeholder="t('statusPlaceholder')">
                        <el-radio
                            v-for="(item, index) in statusList"
                            :key="index" :label="item.value">
                              {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <el-form-item :label="t('name')" prop="name">
                    <el-input v-model="formData.name" disabled clearable :placeholder="t('namePlaceholder')" class="input-width" />
                </el-form-item>
                
                <!-- <el-form-item :label="t('diyName')" >
                    <el-input v-model="formData.diy_name" clearable :placeholder="t('diyNamePlaceholder')" class="input-width" />
                </el-form-item> -->
                
                <el-form-item :label="t('type')" prop="type">
                    <el-select class="input-width" disabled v-model="formData.type" clearable :placeholder="t('typePlaceholder')">
                    <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in typeList"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item v-if="formData.type!='authentication'" :label="t('duration')" prop="duration">
                    <el-input v-model="formData.duration" clearable :placeholder="t('durationPlaceholder')" class="input-width" />
                    <el-alert
                        title="*输入-1表示不限制"
                        style="font-size: 12px;padding:0 10px; width:170px;clear:both;display: block;"
                        :closable="false"
                        type="info">
                    </el-alert>
                </el-form-item>
                
                <el-form-item :label="t('tips')" prop="tips">
                    <el-input type="textarea"  :rows="4" v-model="formData.tips" clearable :placeholder="t('tipsPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item v-if="formData.type!='authentication'"  :label="t('createWebsiteNum')" prop="create_website_num">
                    <el-input v-model="formData.create_website_num" clearable :placeholder="t('createWebsiteNumPlaceholder')" class="input-width" />
                    <el-alert
                        title="*输入-1表示不限制"
                        style="font-size: 12px;padding:0 10px; width:170px;clear:both;display: block;"
                        :closable="false"
                        type="info">
                    </el-alert>
                </el-form-item>
                
                <el-form-item v-if="formData.type!='authentication'"  :label="t('createCardNum')" prop="create_card_num">
                    <el-input v-model="formData.create_card_num" clearable :placeholder="t('createCardNumPlaceholder')" class="input-width" />
                    <el-alert
                        title="*输入-1表示不限制"
                        style="font-size: 12px;padding:0 10px; width:170px;clear:both;display: block;"
                        :closable="false"
                        type="info">
                    </el-alert>
                </el-form-item>
                
                <el-form-item :label="t('originalprice')" prop="originalprice">
                    <el-input v-model="formData.originalprice" clearable :placeholder="t('originalpricePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('price')" prop="price">
                    <el-input v-model="formData.price" clearable :placeholder="t('pricePlaceholder')" class="input-width" />
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
import { addOrdertype, editOrdertype, getOrdertypeInfo } from '@/addon/ttcard/api/ordertype'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    status: '',
    name: '',
    diy_name: '',
    type: '',
    duration: '',
    tips: '',
    create_website_num: '',
    create_card_num: '',
    originalprice: '',
    price: '',
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
    name: [
        { required: true, message: t('namePlaceholder'), trigger: 'blur' },
        
    ]
,
    diy_name: [
        { required: true, message: t('diyNamePlaceholder'), trigger: 'blur' },
        
    ]
,
    type: [
        { required: true, message: t('typePlaceholder'), trigger: 'blur' },
        
    ]
,
    duration: [
        { required: true, message: t('durationPlaceholder'), trigger: 'blur' },
        
    ]
,
    tips: [
        { required: true, message: t('tipsPlaceholder'), trigger: 'blur' },
        
    ]
,
    create_website_num: [
        { required: true, message: t('createWebsiteNumPlaceholder'), trigger: 'blur' },
        
    ]
,
    create_card_num: [
        { required: true, message: t('createCardNumPlaceholder'), trigger: 'blur' },
        
    ]
,
    originalprice: [
        { required: true, message: t('originalpricePlaceholder'), trigger: 'blur' },
        
    ]
,
    price: [
        { required: true, message: t('pricePlaceholder'), trigger: 'blur' },
        
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
    let save = formData.id ? editOrdertype : addOrdertype

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
    let typeList = ref([])
    const typeDictList = async () => {
    typeList.value = await (await useDictionary('会员等级类型')).data.dictionary
    }
    typeDictList();
    watch(() => typeList.value, () => { formData.type = typeList.value[0].value })

    
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getOrdertypeInfo(row.id)).data
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