<template>
    <div class="main-container">
        <div class="detail-head">
            <div class="left" @click="back()">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{t('returnToPreviousPage')}}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
        </div>
        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('userId')" prop="user_id">
                    <el-select class="input-width" :disabled="formData.id>0" v-model="formData.user_id" clearable :placeholder="t('userIdPlaceholder')">
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
                
                <el-form-item :label="t('recruitStatus')" prop="recruit_status">
                    <el-radio-group  v-model="formData.recruit_status" :placeholder="t('recruitStatusPlaceholder')">
                        <el-radio
                            v-for="(item, index) in recruit_statusList"
                            :key="index" :label="item.value">
                              {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <el-form-item :label="t('websiteId')" prop="website_id">
                    <el-select class="input-width" v-model="formData.website_id" clearable :placeholder="t('websiteIdPlaceholder')">
                       <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in websiteIdList"
                            :key="index"
                            :label="item['name']"
                            :value="item['id']"
                        />
                    </el-select>
                </el-form-item>
                
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
                
                <el-form-item :label="t('scale')" >
                    <el-input v-model="formData.scale" clearable :placeholder="t('scalePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('title')" prop="title">
                    <el-input v-model="formData.title" clearable :placeholder="t('titlePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('position')" >
                    <el-input v-model="formData.position" clearable :placeholder="t('positionPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('typeStatus')" prop="type_status">
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
                
                <el-form-item :label="t('content')" >
                    <editor v-model="formData.content" />
                </el-form-item>
                <el-form-item :label="t('city')" >
                    <el-input v-model="formData.city" clearable :placeholder="t('cityPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('address')" >
                    <el-input v-model="formData.address" clearable :placeholder="t('addressPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('age')" >
                    <el-input v-model="formData.age" clearable :placeholder="t('agePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('monthSalary')" >
                    <el-input v-model="formData.month_salary" clearable :placeholder="t('monthSalaryPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('tags')" >
                    <el-input v-model="formData.tags" clearable :placeholder="t('tagsPlaceholder')" class="input-width" />
                </el-form-item>
                
            </el-form>
        </el-card>
         <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(formRef)">{{ t('save') }}</el-button>
                <el-button @click="back()">{{ t('cancel') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import type { FormInstance } from 'element-plus'
import { getRecruitInfo,addRecruit,editRecruit, getWithUserList, getWithWebsiteList, getWithIndustryList } from '@/addon/ttcard/api/recruit';
import { useRoute } from 'vue-router'

const route = useRoute()
const id:number = parseInt(route.query.id);
const loading = ref(false)
const pageName = route.meta.title



/**
 * 表单数据
 */
const initialFormData = {
    id: 0,
    user_id: '',
    status: '',
    recruit_status: '',
    website_id: '',
    industry_id: '',
    scale: '',
    title: '',
    position: '',
    type_status: '',
    education: '',
    content: '',
    city: '',
    address: '',
    age: '',
    month_salary: '',
    tags: '',
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const setFormData = async (id:number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getRecruitInfo(id)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
}
if(id) setFormData(id);

const formRef = ref<FormInstance>()
// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    let statusList = ref([])
    const statusDictList = async () => {
    statusList.value = await (await useDictionary('展示状态')).data.dictionary
    }
    statusDictList();
    watch(() => statusList.value, () => { formData.status = statusList.value[0].value })
    let recruit_statusList = ref([])
    const recruit_statusDictList = async () => {
    recruit_statusList.value = await (await useDictionary('招聘状态')).data.dictionary
    }
    recruit_statusDictList();
    watch(() => recruit_statusList.value, () => { formData.recruit_status = recruit_statusList.value[0].value })
    let type_statusList = ref([])
    const type_statusDictList = async () => {
    type_statusList.value = await (await useDictionary('应聘类型')).data.dictionary
    }
    type_statusDictList();
    watch(() => type_statusList.value, () => { formData.type_status = type_statusList.value[0].value })

    
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
    const industryIdList = ref([] as any[])
    const setIndustryIdList = async () => {
    industryIdList.value = await (await getWithIndustryList({})).data
    }
    setIndustryIdList()
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
    recruit_status: [
        { required: true, message: t('recruitStatusPlaceholder'), trigger: 'blur' },
        
    ]
,
    website_id: [
        { required: true, message: t('websiteIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    industry_id: [
        { required: true, message: t('industryIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    scale: [
        { required: true, message: t('scalePlaceholder'), trigger: 'blur' },
        
    ]
,
    title: [
        { required: true, message: t('titlePlaceholder'), trigger: 'blur' },
        
    ]
,
    position: [
        { required: true, message: t('positionPlaceholder'), trigger: 'blur' },
        
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
    content: [
        { required: true, message: t('contentPlaceholder'), trigger: 'blur' },
        
    ]
,
    city: [
        { required: true, message: t('cityPlaceholder'), trigger: 'blur' },
        
    ]
,
    address: [
        { required: true, message: t('addressPlaceholder'), trigger: 'blur' },
        
    ]
,
    age: [
        { required: true, message: t('agePlaceholder'), trigger: 'blur' },
        
    ]
,
    month_salary: [
        { required: true, message: t('monthSalaryPlaceholder'), trigger: 'blur' },
        
    ]
,
    tags: [
        { required: true, message: t('tagsPlaceholder'), trigger: 'blur' },
        
    ]

    }
})

const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
       if (valid) {
           loading.value = true
           let data = formData

           const save = id ? editRecruit : addRecruit
           save(data).then(res => {
               loading.value = false
               history.back()
           }).catch(err => {
               loading.value = false
           })

       }
    })
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
const back = () => {
    history.back()
}
</script>

<style lang="scss" scoped></style>
