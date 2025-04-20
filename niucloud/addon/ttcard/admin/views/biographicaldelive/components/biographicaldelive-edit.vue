<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateBiographicaldelive') : t('addBiographicaldelive')" width="50%" class="diy-dialog-wrap"
        :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('status')" prop="status">
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
                
                <el-form-item :label="t('recruitId')" prop="recruit_id">
                    <el-select class="input-width" v-model="formData.recruit_id" clearable :placeholder="t('recruitIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in recruitIdList"
                            :key="index"
                            :label="item['title']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('biographicalId')" prop="biographical_id">
                    <el-select class="input-width" v-model="formData.biographical_id" clearable :placeholder="t('biographicalIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in biographicalIdList"
                            :key="index"
                            :label="item['name']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('viewStatus')" prop="view_status">
                    <el-radio-group  v-model="formData.view_status" :placeholder="t('viewStatusPlaceholder')">
                        <el-radio
                            v-for="(item, index) in view_statusList"
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
import { addBiographicaldelive, editBiographicaldelive, getBiographicaldeliveInfo, getWithUserList, getWithUserList2, getWithRecruitList, getWithBiographicalList } from '@/addon/ttcard/api/biographicaldelive'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    status: '',
    from_user_id: '',
    to_user_id: '',
    recruit_id: '',
    biographical_id: '',
    view_status: '',
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
    to_user_id: [
        { required: true, message: t('toUserIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    recruit_id: [
        { required: true, message: t('recruitIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    biographical_id: [
        { required: true, message: t('biographicalIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    view_status: [
        { required: true, message: t('viewStatusPlaceholder'), trigger: 'blur' },
        
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
    let save = formData.id ? editBiographicaldelive : addBiographicaldelive

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
    let view_statusList = ref([])
    const view_statusDictList = async () => {
    view_statusList.value = await (await useDictionary('招聘者是否查看')).data.dictionary
    }
    view_statusDictList();
    watch(() => view_statusList.value, () => { formData.view_status = view_statusList.value[0].value })

    
    const fromUserIdList = ref([] as any[])
    const setFromUserIdList = async () => {
    fromUserIdList.value = await (await getWithUserList({})).data
    }
    setFromUserIdList()
    const toUserIdList = ref([] as any[])
    const setToUserIdList = async () => {
    toUserIdList.value = await (await getWithUserList2({})).data
    }
    setToUserIdList()
    const recruitIdList = ref([] as any[])
    const setRecruitIdList = async () => {
    recruitIdList.value = await (await getWithRecruitList({})).data
    }
    setRecruitIdList()
    const biographicalIdList = ref([] as any[])
    const setBiographicalIdList = async () => {
    biographicalIdList.value = await (await getWithBiographicalList({})).data
    }
    setBiographicalIdList()
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getBiographicaldeliveInfo(row.id)).data
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
