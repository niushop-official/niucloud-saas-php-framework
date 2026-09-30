<template>
    <div class="main-container">
        <el-form class="page-form page-form--stacked form-page form-page--narrow loading-box" :model="formData" label-position="top" ref="formRef" :rules="formRules" v-loading="loading">
            <section class="form-section form-section--has-header">
                <div class="form-section__header">
                    <h3 class="form-section__title">{{ t('websiteInfo') }}</h3>
                </div>

                <div class="form-section__body">
                    <el-form-item :label="t('siteName')" prop="site_name">
                        <el-input v-model.trim="formData.site_name" :placeholder="t('siteNamePlaceholder')" class="input-width" clearable maxlength="20" show-word-limit />
                    </el-form-item>
                    <el-form-item :label="t('logo')" prop="logo">
                        <div>
                            <upload-image v-model="formData.logo" />
                            <p class="form-tip">{{ t('logoPlaceholder') }}</p>
                        </div>
                    </el-form-item>
                    <el-form-item :label="t('icon')" prop="icon">
                        <div>
                            <upload-image v-model="formData.icon" />
                            <p class="form-tip">{{ t('iconPlaceholder') }}</p>
                        </div>
                    </el-form-item>
                    <el-form-item :label="t('keywords')">
                        <el-input v-model.trim="formData.keywords" :placeholder="t('keywordsPlaceholder')" class="input-width" clearable maxlength="20" show-word-limit />
                    </el-form-item>
                    <el-form-item :label="t('desc')" class="form-item--wide">
                        <el-input v-model.trim="formData.desc" type="textarea" :rows="4" clearable :placeholder="t('descPlaceholder')" maxlength="100" show-word-limit />
                    </el-form-item>
                </div>
            </section>

            <section class="form-section form-section--has-header" v-show="appType == 'site'">
                <div class="form-section__header">
                    <h3 class="form-section__title">{{ t('frontEndInfo') }}</h3>
                </div>
                <div class="form-section__body">
                    <el-form-item :label="t('frontEndName')">
                        <el-input v-model.trim="formData.front_end_name" :placeholder="t('frontEndNamePlaceholder')" class="input-width" clearable maxlength="20" show-word-limit />
                    </el-form-item>
                    <el-form-item :label="t('phone')">
                        <el-input v-model.trim="formData.phone" :placeholder="t('phonePlaceholder')" class="input-width" clearable maxlength="20" show-word-limit />
                    </el-form-item>
                    <el-form-item :label="t('logo')">
                        <upload-image v-model="formData.front_end_logo" />
                    </el-form-item>
                    <el-form-item :label="t('icon')">
                        <upload-image v-model="formData.front_end_icon" />
                    </el-form-item>

                    <el-form-item :label="t('metaTitle')" class="form-item--wide">
                        <el-input v-model.trim="formData.meta_title" :placeholder="t('MetaPlaceholder')" clearable maxlength="40" show-word-limit />
                    </el-form-item>
                    <el-form-item :label="t('metaDescription')" class="form-item--wide">
                        <el-input v-model.trim="formData.meta_desc" :placeholder="t('metaDescriptionPlaceholder')" clearable maxlength="200" show-word-limit />
                    </el-form-item>
                    <el-form-item :label="t('metaKeywords')" class="form-item--wide">
                        <el-input v-model.trim="formData.meta_keyword" :placeholder="t('metaKeywordsPlaceholder')" clearable maxlength="200" show-word-limit />
                    </el-form-item>
                </div>
            </section>

            <section class="form-section form-section--has-header" v-if="appType == 'admin'">
                <div class="form-section__header">
                    <h3 class="form-section__title">{{ t('serviceInformation') }}</h3>
                </div>
                <div class="form-section__body">
                    <el-form-item :label="t('contactsTel')">
                        <el-input v-model.trim="formData.tel" :placeholder="t('contactsTelPlaceholder')" class="input-width" clearable maxlength="20" show-word-limit />
                    </el-form-item>
                    <!-- <el-form-item :label="t('wechatCode')">
                        <upload-image v-model="formData.wechat_code" />
                    </el-form-item>
                    <el-form-item :label="t('customerServiceCode')">
                        <upload-image v-model="formData.enterprise_wechat" />
                    </el-form-item> -->
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
import { setWebsite, getWebsite, getService } from '@/app/api/sys'
import { FormInstance, FormRules } from 'element-plus'
import { getAppType } from '@/utils/common'
import useUserStore from '@/stores/modules/user'
import useSystemStore from '@/stores/modules/system'
const loading = ref(true)
const appType = ref(getAppType())
const formData: any = reactive<Record<string, string>>({
    site_name: '',
    logo: '',
    desc: '',
    latitude: '',
    keywords: '',
    longitude: '',
    province_id: '',
    city_id: '',
    district_id: '',
    address: '',
    full_address: '',
    business_hours: '',
    phone: '',
    front_end_name: '',
    front_end_logo: '',
    front_end_icon: '',
    icon: '',
    wechat_code: '',
    enterprise_wechat: '',
    tel: '',
    site_login_logo: '',
    site_login_bg_img: '',
    meta_title: '',
    meta_desc: '',
    meta_keyword: ''
})

const setFormData = async () => {
    const data = await (await getWebsite()).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })

    const serviceData: any = await (await getService()).data
    formData.wechat_code = serviceData.wechat_code
    formData.enterprise_wechat = serviceData.enterprise_wechat
    formData.tel = serviceData.tel
    formData.site_login_logo = serviceData.site_login_logo
    formData.site_login_bg_img = serviceData.site_login_bg_img
    loading.value = false
}
setFormData()

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = reactive<FormRules>({
    site_name: [
        { required: true, message: t('siteNamePlaceholder'), trigger: 'blur' }
    ],
    logo: [
        { required: true, message: t('请选择长方形Logo'), trigger: 'blur' }
    ],
    icon: [
        { required: true, message: t('请选择正方形Logo'), trigger: 'blur' }
    ],
    front_end_name: [
        { required: true, message: t('frontEndNamePlaceholder'), trigger: 'blur' }
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
            setWebsite(formData).then(() => {
                loading.value = false
                appType.value == 'admin' ? useSystemStore().getWebsiteInfo() : useUserStore().getSiteInfo()
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped>
:deep(.loading-box .el-loading-spinner){
    top: 33%;
}
</style>
