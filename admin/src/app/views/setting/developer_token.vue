<template>
    <div class="main-container">
        <el-form class="page-form page-form--stacked form-page form-page--narrow" :model="formData" label-position="top" ref="formRef" :rules="formRules" v-loading="loading">
            <section class="form-section form-section--has-header">
                <div class="form-section__header">
                    <h3 class="form-section__title">{{ t('developerTokenEdit') }}</h3>
                </div>
                <div class="form-section__body">
                    <el-form-item prop="token" class="form-item--wide">
                        <el-input v-model.trim="formData.token" :placeholder="t('tokenPlaceholder')" clearable maxlength="30" />
                        <div class="form-tip">{{ t('tokenTips') }}</div>
                    </el-form-item>
                </div>
            </section>
        </el-form>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer fixed-footer--form">
                <div class="fixed-footer__inner fixed-footer__inner--narrow">
                    <el-button type="primary" :loading="loading" @click="save(formRef)">{{ t('save') }}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { setDeveloperToken, getDeveloperToken } from '@/app/api/sys'
import { FormInstance, FormRules } from 'element-plus'

const loading = ref(true)
const formData = ref({
    token: ''
})

getDeveloperToken().then(({ data }) => {
    loading.value = false
    data.token && (formData.value = data)
})

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = reactive<FormRules>({
    token: [
        { required: true, message: t('tokenPlaceholder'), trigger: 'blur' }
    ]
})

/**
 * 保存
 */
const save = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            setDeveloperToken(formData.value).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped></style>
