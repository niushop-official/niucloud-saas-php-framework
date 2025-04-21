<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateCard') : t('addCard')" width="50%" class="diy-dialog-wrap" :close-on-click-modal="false"
        :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('userId')" prop="user_id">
                    <el-select class="input-width"  v-model="formData.user_id" clearable :placeholder="t('userIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in userIdList"
                            :key="index"
                            :label="item['nickname']"
                            :value="item['id']"
                        />
                    </el-select>
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
                
                <el-form-item :label="t('auditingStatus')" prop="auditing_status">
                    <el-select class="input-width"  v-model="formData.auditing_status" clearable :placeholder="t('auditingStatusPlaceholder')">
                    <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in auditing_statusList"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('industryId')" prop="industry_id">
                    <el-select class="input-width" v-model="formData.industry_id" clearable :placeholder="t('industryIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in industryIdList"
                            :key="index"
                            :label="item['name']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('avatar')">
                    <upload-image v-model="formData.avatar" />
                </el-form-item>
                
                <el-form-item :label="t('name')" prop="name">
                    <el-input v-model="formData.name" clearable :placeholder="t('namePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('gender')" >
                    <el-radio-group  v-model="formData.gender" :placeholder="t('genderPlaceholder')">
                        <el-radio
                            v-for="(item, index) in genderList"
                            :key="index" :label="item.value">
                              {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <el-form-item :label="t('age')" >
                    <el-input v-model="formData.age" clearable :placeholder="t('agePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('phone')" >
                    <el-input v-model="formData.phone" clearable :placeholder="t('phonePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('position')" >
                    <el-input v-model="formData.position" clearable :placeholder="t('positionPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('tags')" >
                    <el-input v-model="formData.tags" clearable :placeholder="t('tagsPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('email')" >
                    <el-input v-model="formData.email" clearable :placeholder="t('emailPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('address')" >
                    <el-input v-model="formData.address" clearable :placeholder="t('addressPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('wechatNum')" >
                    <el-input v-model="formData.wechat_num" clearable :placeholder="t('wechatNumPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('wechatCodeImage')">
                    <upload-image v-model="formData.wechat_code_image" />
                </el-form-item>
                
                <el-form-item :label="t('cardBgId')" >
                    <el-select class="input-width" v-model="formData.card_bg_id" clearable :placeholder="t('cardBgIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in cardBgIdList"
                            :key="index"
                            :label="item['title']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('cardDiyBg')">
                    <upload-image v-model="formData.card_diy_bg" />
                </el-form-item>
                
                <el-form-item :label="t('description')" >
                    <editor v-model="formData.description" />
                </el-form-item>
                <el-form-item :label="t('video')">
                    <upload-video v-model="formData.video" />
                </el-form-item>
                
                <el-form-item :label="t('recommend')" prop="recommend">
                    <el-radio-group  v-model="formData.recommend" :placeholder="t('recommendPlaceholder')">
                        <el-radio
                            v-for="(item, index) in recommendList"
                            :key="index" :label="item.value">
                              {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <el-form-item :label="t('defaultStatus')" prop="default_status">
                    <el-radio-group  v-model="formData.default_status" :placeholder="t('defaultStatusPlaceholder')">
                        <el-radio
                            v-for="(item, index) in default_statusList"
                            :key="index" :label="item.value">
                              {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <el-form-item :label="t('connectionsStatus')" prop="connections_status">
                    <el-radio-group  v-model="formData.connections_status" :placeholder="t('connectionsStatusPlaceholder')">
                        <el-radio
                            v-for="(item, index) in connections_statusList"
                            :key="index" :label="item.value">
                              {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                
               
                
                <el-form-item v-if="formData.id>0" :label="t('minicodeImage')">
                    <upload-image v-model="formData.minicode_image" />
                </el-form-item>

                <el-form-item :label="t('weigh')" >
                    <el-input v-model="formData.weigh" clearable :placeholder="t('weighPlaceholder')" class="input-width" />
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
import { addCard, editCard, getCardInfo, getWithUserList, getWithIndustryList, getWithCardbackgroundList } from '@/addon/ttcard/api/card'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    user_id: '',
    status: 'normal',
    auditing_status: '',
    industry_id: '',
    avatar: '',
    name: '',
    gender: '',
    age: '',
    phone: '',
    position: '',
    tags: '',
    email: '',
    address: '',
    wechat_num: '',
    wechat_code_image: '',
    card_bg_id: '',
    card_diy_bg: '',
    description: '',
    video: '',
    recommend: '0',
    default_status: '0',
    connections_status: '1',
    weigh: '',
    minicode_image: '',
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
    status: [
        { required: true, message: t('statusPlaceholder'), trigger: 'blur' },
        
    ]
,
    auditing_status: [
        { required: true, message: t('auditingStatusPlaceholder'), trigger: 'blur' },
        
    ]
,
    industry_id: [
        { required: true, message: t('industryIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    avatar: [
        { required: true, message: t('avatarPlaceholder'), trigger: 'blur' },
        
    ]
,
    name: [
        { required: true, message: t('namePlaceholder'), trigger: 'blur' },
        
    ]
,
    gender: [
        { required: true, message: t('genderPlaceholder'), trigger: 'blur' },
        
    ]
,
    age: [
        { required: true, message: t('agePlaceholder'), trigger: 'blur' },
        
    ]
,
    phone: [
        { required: true, message: t('phonePlaceholder'), trigger: 'blur' },
        
    ]
,
    position: [
        { required: true, message: t('positionPlaceholder'), trigger: 'blur' },
        
    ]
,
    tags: [
        { required: true, message: t('tagsPlaceholder'), trigger: 'blur' },
        
    ]
,
    email: [
        { required: true, message: t('emailPlaceholder'), trigger: 'blur' },
        
    ]
,
    address: [
        { required: true, message: t('addressPlaceholder'), trigger: 'blur' },
        
    ]
,
    wechat_num: [
        { required: true, message: t('wechatNumPlaceholder'), trigger: 'blur' },
        
    ]
,
    wechat_code_image: [
        { required: true, message: t('wechatCodeImagePlaceholder'), trigger: 'blur' },
        
    ]
,
    card_bg_id: [
        { required: true, message: t('cardBgIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    card_diy_bg: [
        { required: true, message: t('cardDiyBgPlaceholder'), trigger: 'blur' },
        
    ]
,
    description: [
        { required: true, message: t('descriptionPlaceholder'), trigger: 'blur' },
        
    ]
,
    video: [
        { required: true, message: t('videoPlaceholder'), trigger: 'blur' },
        
    ]
,
    recommend: [
        { required: true, message: t('recommendPlaceholder'), trigger: 'blur' },
        
    ]
,
    default_status: [
        { required: true, message: t('defaultStatusPlaceholder'), trigger: 'blur' },
        
    ]
,
    connections_status: [
        { required: true, message: t('connectionsStatusPlaceholder'), trigger: 'blur' },
        
    ]
,
    weigh: [
        { required: true, message: t('weighPlaceholder'), trigger: 'blur' },
        
    ]
,
    minicode_image: [
        { required: true, message: t('minicodeImagePlaceholder'), trigger: 'blur' },
        
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
    let statusList = ref([])
    const statusDictList = async () => {
    statusList.value = await (await useDictionary('展示状态')).data.dictionary
    }
    statusDictList();
    watch(() => statusList.value, () => { formData.status = statusList.value[0].value })
    let auditing_statusList = ref([])
    const auditing_statusDictList = async () => {
    auditing_statusList.value = await (await useDictionary('名片审核状态')).data.dictionary
    }
    auditing_statusDictList();
    watch(() => auditing_statusList.value, () => { formData.auditing_status = auditing_statusList.value[0].value })
    let genderList = ref([])
    const genderDictList = async () => {
    genderList.value = await (await useDictionary('性别')).data.dictionary
    }
    genderDictList();
    watch(() => genderList.value, () => { formData.gender = genderList.value[0].value })
    let recommendList = ref([])
    const recommendDictList = async () => {
    recommendList.value = await (await useDictionary('是否')).data.dictionary
    }
    recommendDictList();
    watch(() => recommendList.value, () => { formData.recommend = recommendList.value[0].value })
    let default_statusList = ref([])
    const default_statusDictList = async () => {
    default_statusList.value = await (await useDictionary('是否')).data.dictionary
    }
    default_statusDictList();
    watch(() => default_statusList.value, () => { formData.default_status = default_statusList.value[0].value })
    let connections_statusList = ref([])
    const connections_statusDictList = async () => {
    connections_statusList.value = await (await useDictionary('是否')).data.dictionary
    }
    connections_statusDictList();
    watch(() => connections_statusList.value, () => { formData.connections_status = connections_statusList.value[0].value })

    
    const userIdList = ref([] as any[])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithUserList({})).data
    }
    setUserIdList()
    const industryIdList = ref([] as any[])
    const setIndustryIdList = async () => {
    industryIdList.value = await (await getWithIndustryList({})).data
    }
    setIndustryIdList()
    const cardBgIdList = ref([] as any[])
    const setCardBgIdList = async () => {
    cardBgIdList.value = await (await getWithCardbackgroundList({})).data
    }
    setCardBgIdList()
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