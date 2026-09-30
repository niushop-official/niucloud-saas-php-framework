<template>
    <div class="main-container">
        <el-form class="page-form page-form--stacked form-page form-page--narrow" :model="formData" label-position="top" ref="ruleFormRef" v-loading="loading">
            <section class="form-section form-section--has-header">
                <div class="form-section__header">
                    <h3 class="form-section__title">{{ t('admin') }}</h3>
                </div>
                <div class="form-section__body">
                    <el-form-item :label="t('isCaptcha')">
                        <el-switch v-model="formData.is_captcha" :active-value="1" :inactive-value="0" />
                    </el-form-item>
                    <el-form-item :label="t('bgImg')">
                        <div>
                            <upload-image v-model="formData.bg" />
                            <div class="form-tip">{{ t('adminBgImgTip') }}</div>
                        </div>
                    </el-form-item>
                </div>
            </section>

            <section class="form-section form-section--has-header">
                <div class="form-section__header">
                    <h3 class="form-section__title">{{ t('site') }}</h3>
                </div>
                <div class="form-section__body">
                    <el-form-item :label="t('isCaptcha')">
                        <el-switch v-model="formData.is_site_captcha" :active-value="1" :inactive-value="0" />
                    </el-form-item>
                    <!-- <el-form-item :label="t('bgImg')">
                        <upload-image v-model="formData.site_bg" />
                        <div class="form-tip">{{ t('siteBgImgTip') }}</div>
                    </el-form-item> -->
                    <el-form-item :label="t('siteLoginLogo')">
                        <div>
                            <upload-image v-model="formData.site_login_logo" />
                            <div class="form-tip">{{ t('siteLoginLogoTips') }}</div>
                        </div>
                    </el-form-item>
                    <el-form-item :label="t('siteLoginBgImg')">
                        <div>
                            <upload-image v-model="formData.site_login_bg_img" />
                            <div class="form-tip">{{ t('siteLoginBgImgTips') }}</div>
                        </div>
                    </el-form-item>
                </div>
            </section>
        </el-form>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer fixed-footer--form">
                <div class="fixed-footer__inner fixed-footer__inner--narrow">
                    <el-button type="primary" @click="onSave(ruleFormRef)">{{ t('save') }}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getConfigLogin, setConfigLogin } from '@/app/api/sys'
import { FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'

const loading = ref(true)
const ruleFormRef = ref<FormInstance>()
const formData = reactive<Record<string, number | string>>({
    is_captcha: 0,
    is_site_captcha: 0,
    bg: '',
    site_bg: '',
    site_login_logo: '',
    site_login_bg_img: ''
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
