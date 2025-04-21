<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateCardmsg') : t('addCardmsg')" width="50%" class="diy-dialog-wrap"
        :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('typeStatus')" prop="type_status">
                    <el-radio-group  v-model="formData.type_status" :placeholder="t('typeStatusPlaceholder')">
                        <el-radio
                            v-for="(item, index) in type_statusList"
                            :key="index" :label="item.value">
                              {{ item.name }}
                        </el-radio>
                    </el-radio-group>
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
                
                <el-form-item :label="t('formUserId')" prop="form_user_id">
                    <el-select class="input-width" v-model="formData.form_user_id" clearable :placeholder="t('formUserIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in formUserIdList"
                            :key="index"
                            :label="item['nickname']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('toUserId')" prop="to_user_id">
                    <el-select class="input-width" v-model="formData.to_user_id" clearable :placeholder="t('toUserIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in toUserIdList"
                            :key="index"
                            :label="item['nickname']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('cardId')" prop="card_id">
                    <el-select class="input-width" v-model="formData.card_id" clearable :placeholder="t('cardIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in cardIdList"
                            :key="index"
                            :label="item['name']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('title')" prop="title">
                    <el-input v-model="formData.title" clearable :placeholder="t('titlePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('content')" prop="content">
                    <editor v-model="formData.content" />
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
import { addCardmsg, editCardmsg, getCardmsgInfo, getWithUserList, getWithUserList2, getWithCardList } from '@/addon/ttcard/api/cardmsg'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    type_status: '',
    status: '',
    form_user_id: '',
    to_user_id: '',
    card_id: '',
    title: '',
    content: '',
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
    type_status: [
        { required: true, message: t('typeStatusPlaceholder'), trigger: 'blur' },
        
    ]
,
    status: [
        { required: true, message: t('statusPlaceholder'), trigger: 'blur' },
        
    ]
,
    form_user_id: [
        { required: true, message: t('formUserIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    to_user_id: [
        { required: true, message: t('toUserIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    card_id: [
        { required: true, message: t('cardIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    title: [
        { required: true, message: t('titlePlaceholder'), trigger: 'blur' },
        
    ]
,
    content: [
        { required: true, message: t('contentPlaceholder'), trigger: 'blur' },
        
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
    let save = formData.id ? editCardmsg : addCardmsg

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
    let type_statusList = ref([])
    const type_statusDictList = async () => {
    type_statusList.value = await (await useDictionary('消息类型')).data.dictionary
    }
    type_statusDictList();
    watch(() => type_statusList.value, () => { formData.type_status = type_statusList.value[0].value })
    let statusList = ref([])
    const statusDictList = async () => {
    statusList.value = await (await useDictionary('消息审核状态')).data.dictionary
    }
    statusDictList();
    watch(() => statusList.value, () => { formData.status = statusList.value[0].value })

    
    const formUserIdList = ref([] as any[])
    const setFormUserIdList = async () => {
    formUserIdList.value = await (await getWithUserList({})).data
    }
    setFormUserIdList()
    const toUserIdList = ref([] as any[])
    const setToUserIdList = async () => {
    toUserIdList.value = await (await getWithUserList2({})).data
    }
    setToUserIdList()
    const cardIdList = ref([] as any[])
    const setCardIdList = async () => {
    cardIdList.value = await (await getWithCardList({})).data
    }
    setCardIdList()
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getCardmsgInfo(row.id)).data
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