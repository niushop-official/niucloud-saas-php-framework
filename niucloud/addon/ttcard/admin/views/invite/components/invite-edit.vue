<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateInvite') : t('addInvite')" width="50%" class="diy-dialog-wrap"
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
                
                <el-form-item :label="t('fromUserId')" prop="from_user_id">
                    <el-select class="input-width" v-model="formData.from_user_id" clearable :placeholder="t('fromUserIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in fromUserIdList"
                            :key="index"
                            :label="item['nickname']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('fromWebsiteId')" prop="from_website_id">
                    <el-select class="input-width" v-model="formData.from_website_id" clearable :placeholder="t('fromWebsiteIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in fromWebsiteIdList"
                            :key="index"
                            :label="item['name']"
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
                
                <el-form-item :label="t('toUserCardId')" prop="to_user_card_id">
                    <el-select class="input-width" v-model="formData.to_user_card_id" clearable :placeholder="t('toUserCardIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in toUserCardIdList"
                            :key="index"
                            :label="item['name']"
                            :value="item['id']"
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
import { addInvite, editInvite, getInviteInfo, getWithUserList, getWithWebsiteList, getWithUserList2, getWithCardList } from '@/addon/ttcard/api/invite'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    status: 'normal',
    from_user_id: '',
    from_website_id: '',
    to_user_id: '',
    to_user_card_id: '',
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
    from_user_id: [
        { required: true, message: t('fromUserIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    from_website_id: [
        { required: true, message: t('fromWebsiteIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    to_user_id: [
        { required: true, message: t('toUserIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    to_user_card_id: [
        { required: true, message: t('toUserCardIdPlaceholder'), trigger: 'blur' },
        
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
    let save = formData.id ? editInvite : addInvite

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

    
    const fromUserIdList = ref([] as any[])
    const setFromUserIdList = async () => {
    fromUserIdList.value = await (await getWithUserList({})).data
    }
    setFromUserIdList()
    const fromWebsiteIdList = ref([] as any[])
    const setFromWebsiteIdList = async () => {
    fromWebsiteIdList.value = await (await getWithWebsiteList({})).data
    }
    setFromWebsiteIdList()
    const toUserIdList = ref([] as any[])
    const setToUserIdList = async () => {
    toUserIdList.value = await (await getWithUserList2({})).data
    }
    setToUserIdList()
    const toUserCardIdList = ref([] as any[])
    const setToUserCardIdList = async () => {
    toUserCardIdList.value = await (await getWithCardList({})).data
    }
    setToUserCardIdList()
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getInviteInfo(row.id)).data
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
