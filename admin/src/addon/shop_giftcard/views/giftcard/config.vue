<template>
    <div class="main-container">
        <el-card class="card !border-none" shadow="never" v-loading="loading">

            <el-form class="page-form" :model="formData" label-width="180px" :rules="formRules" ref="formRef" v-if="!loading">
                <div class="text text-[14px] leading-[25px]">{{ t('titleActivate') }}</div>
                <el-card class="card !border-none" shadow="never">
                    <el-form-item :label="t('labelBalance')" prop="banner">
                        <div>
                            <upload-image v-model="formData.banner" :limit="1" />
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('balanceTips')}}</p>
                        </div>
                    </el-form-item>
                    <el-form-item :label="t('labelTips')" prop="tips">
                        <editor v-model="formData.tips" :height="300" class="editor-width" />
                    </el-form-item>
                </el-card>
            </el-form>
        </el-card>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="save">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { t } from "@/lang";
import { getGiftcardConfig, setGiftcardConfig } from '@/addon/shop_giftcard/api/config'
import { FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'

const loading = ref<Boolean>(false)
/**
 * 表单数据
 */
 const initialFormData = {
    banner: '',
    tips: ''
};
const formData: Record<string, any> = reactive({ ...initialFormData });

// 表单验证规则
const formRules = computed(() => {
    return {
        banner: [
            { required: true, message: t('bannerPlaceholder'), trigger: 'blur' }
        ],
    }
})

const formRef = ref<FormInstance>()

const getGiftcardConfigFn=()=>{
    loading.value = true
    getGiftcardConfig().then((res:any)=>{
        Object.keys(formData).forEach((key:any)=>{
            if (res.data[key] != undefined) formData[key] = res.data[key]
            formData.goods_ids = res.data.goods_ids && res.data.goods_ids != '0' ?  res.data.goods_ids.split(',') : [];
        })
        loading.value = false
    })
}

getGiftcardConfigFn()
const repeat = ref<boolean>(false)
const save = ()=>{
    var data :any = cloneDeep(formData)
    formRef.value?.validate((valid) => {
        if(valid){
            if (repeat.value) return
            repeat.value = true
            setGiftcardConfig(data).then((res:any)=>{
                repeat.value = false
            }).catch(()=>{
                repeat.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped>
</style>
