<template>
    <div class="main-container">
        <el-card class="card !border-none" shadow="never">

            <div class="text text-[14px] leading-[25px]">{{ t('posterEdit') }}</div>
            <el-form class="page-form mt-[20px]" :model="formData" label-width="150px" ref="formRef" v-loading="loading">
                <!-- <el-form-item :label="t('shareContent')" prop="share_content">
                    <el-input v-model.trim="formData.share_content" :placeholder="t('shareContentPlaceholder')" class="input-width" clearable maxlength="100"/>
                </el-form-item> -->
                <el-form-item :label="t('posterBg')">
                    <div>
                        <upload-image v-model="formData.poster_bg" :limit="1" />
                        <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('posterBgTip')}}</p>
                    </div>
                </el-form-item>
                <el-form-item :label="t('promotionSettings')">
                    <el-button type="primary" link @click="toLink('fenxiao_poster')">{{t("settings")}}</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" :loading="loading" @click="save(formRef)">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getFenxiaoPosterConfig, setFenxiaoPosterConfig } from '@/addon/shop_fenxiao/api/config'
import { FormInstance } from 'element-plus'
import { useRouter } from "vue-router";

const router = useRouter();

const loading = ref(true)

const formData = reactive<Record<string, string>>({
    share_content: '',
    poster_bg: ''
})

const setFormData = async () => {
    const data = await (await getFenxiaoPosterConfig()).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })

    loading.value = false
}
setFormData()

const formRef = ref<FormInstance>()

/**
 * 保存
 */
const save = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            setFenxiaoPosterConfig(formData).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
const toLink = (type: any)=>{
    let routeData = router.resolve(`/setting/agreement/edit?key=${type}`)
    window.open(routeData.href,' blank');
}
</script>

<style lang="scss" scoped></style>
