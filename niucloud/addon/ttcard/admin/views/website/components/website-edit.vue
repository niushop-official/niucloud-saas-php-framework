<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateWebsite') : t('addWebsite')" width="50%" class="diy-dialog-wrap" :close-on-click-modal="false"
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
                
                <el-form-item :label="t('userId')" >
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
                
                <el-form-item :label="t('cardId')" >
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
                
                <!-- <el-form-item :label="t('teamCardIds')" >
                    <el-input v-model="formData.team_card_ids" clearable :placeholder="t('teamCardIdsPlaceholder')" class="input-width" />
                </el-form-item> -->
                
                <el-form-item :label="t('industryId')" >
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
                
                <el-form-item :label="t('swiperImages')">
                    <upload-image v-model="formData.swiper_images" limit="10" />
                </el-form-item>
                
                <el-form-item :label="t('name')" >
                    <el-input v-model="formData.name" clearable :placeholder="t('namePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('phone')" >
                    <el-input v-model="formData.phone" clearable :placeholder="t('phonePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('wechatNum')" >
                    <el-input v-model="formData.wechat_num" clearable :placeholder="t('wechatNumPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('weixinImage')">
                    <upload-image v-model="formData.weixin_image" />
                </el-form-item>
                
                <el-form-item :label="t('address')" >
                    <el-input v-model="formData.address" clearable :placeholder="t('addressPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('logo')">
                    <upload-image v-model="formData.logo" />
                </el-form-item>
                
                <el-form-item :label="t('description')" >
                    <editor v-model="formData.description" />
                </el-form-item>
                <el-form-item :label="t('video')">
                    <upload-video v-model="formData.video" />
                </el-form-item>
                
                <el-form-item :label="t('images')">
                    <upload-image v-model="formData.images" limit="10" />
                </el-form-item>
                
                <el-form-item :label="t('minicodeImage')">
                    <upload-image v-model="formData.minicode_image" />
                </el-form-item>
                
                <el-form-item v-if="formData.id>0" :label="t('createTime')"  class="input-width">
                    <el-date-picker 
                        class="flex-1 !flex"
                        v-model="formData.create_time"
                        clearable
                        type="datetime"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        :placeholder="t('createTimePlaceholder')">
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
import { addWebsite, editWebsite, getWebsiteInfo, getWithUserList, getWithCardList, getWithIndustryList } from '@/addon/ttcard/api/website'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    status: 'normal',
    user_id: '',
    card_id: '',
    team_card_ids: '',
    industry_id: '',
    swiper_images: '',
    name: '',
    phone: '',
    wechat_num: '',
    weixin_image: '',
    address: '',
    logo: '',
    description: '',
    video: '',
    images: '',
    minicode_image: '',
    create_time: '',
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
    user_id: [
        { required: true, message: t('userIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    card_id: [
        { required: true, message: t('cardIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    team_card_ids: [
        { required: true, message: t('teamCardIdsPlaceholder'), trigger: 'blur' },
        
    ]
,
    industry_id: [
        { required: true, message: t('industryIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    swiper_images: [
        { required: true, message: t('swiperImagesPlaceholder'), trigger: 'blur' },
        
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
    wechat_num: [
        { required: true, message: t('wechatNumPlaceholder'), trigger: 'blur' },
        
    ]
,
    weixin_image: [
        { required: true, message: t('weixinImagePlaceholder'), trigger: 'blur' },
        
    ]
,
    address: [
        { required: true, message: t('addressPlaceholder'), trigger: 'blur' },
        
    ]
,
    logo: [
        { required: true, message: t('logoPlaceholder'), trigger: 'blur' },
        
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
    images: [
        { required: true, message: t('imagesPlaceholder'), trigger: 'blur' },
        
    ]
,
    minicode_image: [
        { required: true, message: t('minicodeImagePlaceholder'), trigger: 'blur' },
        
    ]
,
    create_time: [
        { required: true, message: t('createTimePlaceholder'), trigger: 'blur' },
        
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
    let save = formData.id ? editWebsite : addWebsite

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

    
    const userIdList = ref([] as any[])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithUserList({})).data
    }
    setUserIdList()
    const cardIdList = ref([] as any[])
    const setCardIdList = async () => {
    cardIdList.value = await (await getWithCardList({})).data
    }
    setCardIdList()
    const industryIdList = ref([] as any[])
    const setIndustryIdList = async () => {
    industryIdList.value = await (await getWithIndustryList({})).data
    }
    setIndustryIdList()
const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if(row){
        const data = await (await getWebsiteInfo(row.id)).data
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
