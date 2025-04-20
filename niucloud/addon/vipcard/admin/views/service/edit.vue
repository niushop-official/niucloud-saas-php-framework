<template>
    <div class="main-container">
        <el-card class="card !border-none mb-[15px]" shadow="never">
            <el-page-header :content="id ? t('editService') : t('addService')" :icon="ArrowLeft" @back="back" />
        </el-card>
        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('goodsName')" prop="goods_name">
                    <el-input v-model.trim="formData.goods_name" maxlength="30" show-word-limit clearable :placeholder="t('goodsNamePlaceholder')" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('categoryId')" prop="category_id">
                    <el-cascader class="input-width" v-model="formData.category_id" :options="categoryList"
                        :props="{ value: 'category_id', label: 'category_name' }" />
                    <div class="ml-[10px]">
                        <span class="cursor-pointer text-primary mr-[10px]" @click="refreshCategory(true)">{{ t('refresh') }}</span>
                        <span class="cursor-pointer text-primary" @click="toCategoryEvent">{{ t('addcategoryId') }}</span>
                    </div>
                </el-form-item>
                <el-form-item :label="t('price')" prop="price">
                    <el-input v-model.trim="formData.price" :placeholder="t('pricePlaceholder')" class="input-width">
                        <template #append>{{ t('unit') }}</template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="t('virtuallySale')">
                    <el-input v-model="formData.virtually_sale" clearable :placeholder="t('virtuallySalePlaceholder')"
                        class="input-width" />
                </el-form-item>
                <el-form-item :label="t('goodsCover')" prop="goods_cover">
                    <upload-image v-model="formData.goods_cover" />
                </el-form-item>
                <el-form-item :label="t('goodsImage')">
                    <upload-image v-model="formData.goods_image" />
                </el-form-item>
                <el-form-item :label="t('status')">
                    <el-radio-group v-model="formData.status" class="ml-4">
                        <el-radio :label="1">{{ t('up') }}</el-radio>
                        <el-radio :label="0">{{ t('down') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('reserve')">
                    <el-radio-group v-model="formData.is_reserve" class="ml-4">
                        <el-radio :label="0">{{ t('notNeedReserve') }}</el-radio>
                        <el-radio :label="1">{{ t('needReserve') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('reservePay')" v-if="formData.is_reserve == 1">
                    <div>
                        <el-radio-group v-model="formData.is_reserve_pay" class="ml-4">
                            <el-radio :label="0">{{ t('no') }}</el-radio>
                            <el-radio :label="1">{{ t('yes') }}</el-radio>
                        </el-radio-group>
                        <p class="text-[12px] text-[#a9a9a9]">预约支付指会员预约项目的同时需要支付项目费用,如果不进行预约支付,会员只是生成预约单,到店后根据消费支付核销</p>
                    </div>
                </el-form-item>
                <el-form-item :label="t('serviceDate')">
                    <el-radio-group v-model="formData.verify_validity_type" @change="verifyChangeFn" class="ml-4">
                        <el-radio :label="item.type" v-for="(item, index) in verifyTypeAll"
                            :key="index">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('serviceValidity')" v-if="formData.verify_validity_type != 0"
                    prop="verify_validity">
                    <el-input @keyup="filterNumber($event)" maxlength="4" show-word-limit  v-model="formData.verify_validity" :placeholder="t('serviceTimePlaceholder')"
                        class="input-width" v-if="formData.verify_validity_type == 1">
                        <template #append>{{ t('day') }}</template>
                    </el-input>

                    <div class="w-[300px]" v-if="formData.verify_validity_type == 2">
                        <el-date-picker v-model="formData.verify_validity" value-format="YYYY-MM-DD" type="date" />
                    </div>
                </el-form-item>
                <el-form-item :label="t('goodsContent')">
                    <editor v-model="formData.goods_content" />
                </el-form-item>
                <el-form-item :label="t('buyInfo')">
                    <editor v-model="formData.buy_info" />
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
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { getCategory, getServiceInfo, addService, editService, getVerifyType } from '@/addon/vipcard/api/vipcard'
import { useRoute, useRouter } from 'vue-router'

import { filterNumber } from '@/utils/common'
const router = useRouter()
const route = useRoute()
const id: number = parseInt(route.query.id)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    goods_id: 0,
    goods_name: '',
    goods_type: 0,
    goods_cover: '',
    goods_image: '',
    category_id: '',
    goods_content: '',
    buy_info: '',
    verify_validity_type: 0,
    verify_validity: 0,
    status: 1,
    card_type: 0,
    common_num: 0,
    price: '',
    stock: '',
    is_reserve: 0,
    is_reserve_pay: 0,
    virtually_sale: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const setFormData = async (id: number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getServiceInfo(id)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
}
if (id) setFormData(id)

const categoryList = ref([])
const checkCategory = async (row: any = null) => {
    categoryList.value = await (await getCategory({ type: 2 })).data
    loading.value = false
}
checkCategory()
const verifyChangeFn = (e:any) => {
    formData.verify_validity = ''
}

// 获取时间类型
const verifyTypeAll = ref([])
const getVerifyTypeFn = async () => {
    const data = await (await getVerifyType()).data

    verifyTypeAll.value = data
    formData.verify_validity_type = verifyTypeAll.value[0].type
}
getVerifyTypeFn()

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        goods_name: [
            { required: true, message: t('goodsNamePlaceholder'), trigger: 'blur' }
        ],
        goods_cover: [
            { required: true, message: t('goodsCoverPlaceholder'), trigger: 'blur' }
        ],
        category_id: [
            { required: true, message: t('categoryIdPlaceholder'), trigger: 'blur' }
        ],
        price: [
            { required: true, message: t('pricePlaceholder'), trigger: 'blur' }
        ],
        stock: [
            { required: true, message: t('stockPlaceholder'), trigger: 'blur' }
        ],
        verify_validity: [
            { required: true, validator: validatePass }
        ]
    }
})

const validatePass = (rule: any, value: any, callback: any) => {
    if (formData.verify_validity_type != 0 && formData.verify_validity == '') {
        callback(new Error(t('serviceTimePlaceholder')))
    }
    if (Number(formData.verify_validity) <= 0) {
        callback(new Error(t('serviceTimeRangePlaceholder')))
    }
    callback()
}

const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            const data = formData

            const save = id ? editService : addService
            save(data).then(res => {
                loading.value = false
                history.back()
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

// 跳转到项目分类 添加分类
const toCategoryEvent = () => {
    const url = router.resolve({
        path: '/vipcard/goods/service/category'
    })
    window.open(url.href)
}
// 项目分类
const refreshCategory = (bool = false) => {
    getCategory({ type: 2 }).then(res => {
        categoryList.value = res.data
        loading.value = false
        if (bool) {
        ElMessage({
            message: t('refreshSuccess'),
            type: 'success'
            })
        }
    })
}

refreshCategory()

const back = () => {
    history.back()
} 
</script>

<style lang="scss" scoped></style>
