<template>
    <!--小程序配置-->
    <div class="main-container">

        <el-card class="card !border-none" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="back()" />
        </el-card>

        <el-form class="page-form mt-[15px]" :model="formData" label-width="170px" ref="formRef" :rules="formRules" v-loading="loading">
            <el-card class="box-card !border-none mt-[15px]" shadow="never">
                <h3 class="panel-title !text-sm">{{ t('appInfo') }}</h3>

                <el-form-item :label="t('uniAppId')" prop="uni_app_id">
                    <el-input v-model.trim="formData.uni_app_id" placeholder="" class="input-width" clearable/>
                    <div class="form-tip flex items-center">
                        {{ t('uniAppIdTips') }}
                        <el-button link type="primary" @click="windowOpen('https://www.dcloud.io/')">{{ t('toCreate') }}</el-button>
                    </div>
                </el-form-item>

                <el-form-item :label="t('appName')" prop="app_name">
                    <el-input v-model.trim="formData.app_name" placeholder="" class="input-width" clearable/>
                </el-form-item>
                
                <el-form-item :label="t('androidAppKey')" prop="android_app_key">
                    <el-input v-model.trim="formData.android_app_key" placeholder="" class="input-width" clearable/>
                    <div class="form-tip">
                        {{ t('androidAppKeyTips') }}
                        <span class="text-primary cursor-pointer" @click="windowOpen('https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey.html')">查看详情</span>
                    </div>
                </el-form-item>
                
                <el-form-item :label="t('applicationId')" prop="application_id">
                    <el-input v-model.trim="formData.application_id" placeholder="" class="input-width" clearable/>
                    <div class="form-tip">
                        {{ t('applicationIdTips') }}
                    </div>
                </el-form-item>
            </el-card>
            <el-card class="box-card !border-none mt-[15px]" shadow="never">
                <h3 class="panel-title !text-sm">{{ t('wechatAppInfo') }}</h3>

                <el-form-item :label="t('wechatAppid')" prop="app_id">
                    <el-input v-model.trim="formData.wechat_app_id" :placeholder="t('appidPlaceholder')" class="input-width" clearable/>
                    <div class="form-tip">
                        {{ t('wechatAppidTips') }}
                    </div>
                </el-form-item>

                <el-form-item :label="t('wechatAppsecret')" prop="app_secret">
                    <el-input v-model.trim="formData.wechat_app_secret" :placeholder="t('appSecretPlaceholder')" class="input-width" clearable />
                </el-form-item>
            </el-card>
        </el-form>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" :loading="loading" @click="save(formRef)">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, computed } from 'vue'
import { t } from '@/lang'
import { getAppConfig, setAppConfig } from '@/app/api/app'
import { FormInstance } from "element-plus"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const loading = ref(true)

const formData = reactive<Record<string, any>>({
    uni_app_id: '',
    app_name: '',
    android_app_key: '',
    application_id: '',
    wechat_app_id: '',
    wechat_app_secret: ''
})

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {

    }
})

/**
 * 获取app配置
 */
getAppConfig().then(res => {
    Object.assign(formData, res.data)
    loading.value = false
})

/**
 * 保存
 */
const save = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            setAppConfig(formData).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

const windowOpen = (url: string) => {
    window.open(url)
}

const back = () => {
    router.push('/channel/app')
}
</script>

<style lang="scss" scoped></style>
