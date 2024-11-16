<template>
    <div class="main-container">

        <el-form class="page-form" :model="formData" label-width="150px" ref="ruleFormRef" v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">
                <h3 class="panel-title !text-sm">{{ t('admin') }}</h3>

                <el-form-item :label="t('isCaptcha')">
                    <el-switch v-model="formData.is_captcha" :active-value="1" :inactive-value="0" />
                </el-form-item>
                <el-form-item :label="t('bgImg')">
                    <upload-image v-model="formData.bg" />
                    <div class="form-tip">{{t('adminBgImgTip')}}</div>
                </el-form-item>
            </el-card>

            <el-card class="box-card mt-[15px] !border-none" shadow="never">
                <h3 class="panel-title !text-sm">{{ t('site') }}</h3>

                <el-form-item :label="t('isCaptcha')">
                    <el-switch v-model="formData.is_site_captcha" :active-value="1" :inactive-value="0" />
                </el-form-item>
                <el-form-item :label="t('bgImg')">
                    <upload-image v-model="formData.site_bg" />
                    <div class="form-tip">{{t('siteBgImgTip')}}</div>
                </el-form-item>
            </el-card>
        </el-form>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(ruleFormRef)">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getConfigLogin, setConfigLogin } from '@/app/api/sys'
import { FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'
import { cloneDeep } from 'lodash-es'

const route = useRoute()
const pageName = route.meta.title

const loading = ref(true)
const ruleFormRef = ref<FormInstance>()
const formData = reactive<Record<string, number | string>>({
    is_captcha: 0,
    is_site_captcha: 0,
    bg: '',
    site_bg: ''
})

const getFormData = async () => {
    const data = await (await getConfigLogin()).data
    Object.keys(formData).forEach((key: string) => {
        formData[key] = data[key]
    })
    loading.value = false
}
getFormData()

const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            const save = cloneDeep(formData)

            setConfigLogin(save).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped></style>
