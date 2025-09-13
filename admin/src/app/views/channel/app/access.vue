<template>
    <!--微信公众号-->
    <div class="main-container">
        <el-card class="card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-tabs v-model="activeName" class="my-[20px]" @tab-change="handleClick">
                <el-tab-pane :label="t('accessFlow')" name="/channel/app" />
                <el-tab-pane :label="t('versionManage')" name="/channel/app/version" />
            </el-tabs>

            <div class="p-[20px]">
                <h3 class="panel-title !text-sm">{{ t("appInlet") }}</h3>

                <el-row>
                    <el-col :span="20">
                        <el-steps class="!mt-[10px]" :active="3" direction="vertical">
                            <el-step>
                                <template #title>
                                    <p class="text-[14px] font-[700]">
                                        {{ t("uniappApp") }}
                                    </p>
                                </template>
                                <template #description>
                                    <span class="text-[#999]">{{ t("appAttestation1") }}</span>
                                    <div class="mt-[20px] mb-[40px] h-[32px]">
                                        <el-button type="primary" @click="linkEvent('https://dcloud.io/')">{{ t("toCreate") }}</el-button>
                                    </div>
                                </template>
                            </el-step>

                            <el-step>
                                <template #title>
                                    <p class="text-[14px] font-[700]">
                                        {{ t("appSetting") }}
                                    </p>
                                </template>
                                <template #description>
<!--                                    <span class="text-[#999]">{{ t("wechatSetting1") }}</span>-->
                                    <div class="mt-[20px] mb-[40px] h-[32px]">
                                        <el-button type="primary" @click="router.push('/channel/app/config')">{{ t("settingInfo") }}</el-button>
                                    </div>
                                </template>
                            </el-step>

                            <el-step>
                                <template #title>
                                    <p class="text-[14px] font-[700]">
                                        {{ t("versionManage") }}
                                    </p>
                                </template>
                                <template #description>
<!--                                    <span class="text-[#999]">{{ t("wechatAccess") }}</span>-->
                                    <div class="mt-[20px] mb-[40px] h-[32px]">
                                        <el-button type="primary" plain @click="router.push('/channel/app/version')">{{ t("releaseVersion") }}</el-button>
                                    </div>
                                </template>
                            </el-step>
                        </el-steps>
                    </el-col>

                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { getWechatConfig } from '@/app/api/wechat'
import { getAuthorizationUrl } from '@/app/api/wxoplatform'
import { getWxoplatform } from '@/app/api/sys'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const activeName = ref('/channel/app')
const qrcode = ref('')
const wechatConfig = ref({})
const oplatformConfig = ref({})

const onShowGetWechatConfig = async () => {
    await getWechatConfig().then(({ data }) => {
        wechatConfig.value = data
        qrcode.value = data.qr_code
    })
}

onMounted(async () => {
    await onShowGetWechatConfig()

    await getWxoplatform().then(({ data }) => {
        oplatformConfig.value = data
    })

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            onShowGetWechatConfig()
        }
    })
})

onUnmounted(() => {
    document.removeEventListener('visibilitychange', () => {
    })
})

const linkEvent = (url: string) => {
    window.open(url, '_blank')
}

const handleClick = (val: any) => {
    router.push({ path: activeName.value })
}

const authBindWechat = () => {
    getAuthorizationUrl().then(({ data }) => {
        window.open(data)
    })
}
</script>

<style lang="scss" scoped></style>
