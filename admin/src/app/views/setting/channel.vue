<template>
    <div class="main-container">
        <el-form class="page-form" :model="formData" label-width="150px" ref="formRef" v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">
                <h3 class="text-[16px] text-[#1D1F3A] font-bold mb-4">{{ pageName }}</h3>

                <!-- H5/微信公众号端 -->
                <h4 class="flex items-center text-[14px] font-bold text-[#1D1F3A] mb-[15px]">
                    <span class="w-[4px] h-[14px] bg-[#1D1F3A] inline-block mr-[8px]"></span>
                    {{ t('h5Wechat') }}
                </h4>
                <el-form-item :label="t('serviceType')">
                    <el-radio-group v-model="formData.h5.type">
                        <el-radio label="none">{{ t('notEnabled') }}</el-radio>
                        <!-- 自建客服依赖 shop_customer 插件，仅安装后显示 -->
                        <el-radio label="self" v-if="shopCustomerInstalled">{{ t('selfService') }}</el-radio>
                        <el-radio label="work_weixin">{{ t('workWeixinService') }}</el-radio>
                        <el-radio label="third">{{ t('thirdService') }}</el-radio>
                        <el-radio label="phone">{{ t('phoneContact') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="formData.h5.type == 'work_weixin'" :label="t('workWeixinLink')" prop="h5.work_weixin_link" :rules="[{ required: true, message: t('workWeixinLinkPlaceholder'), trigger: 'blur' }]">
                    <div class="w-[500px]">
                        <el-input v-model.trim="formData.h5.work_weixin_link" :placeholder="t('workWeixinLinkPlaceholder')" clearable maxlength="500" />
                        <p class="text-[12px] text-[#a9a9a9] leading-[22px]">
                            {{ t('workWeixinH5Tips') }}
                            <el-link type="primary" :underline="false" href="https://developer.work.weixin.qq.com/document/path/94638" target="_blank">{{ t('inWechatPageAccess') }}</el-link>
                        </p>
                    </div>
                </el-form-item>
                <el-form-item v-if="formData.h5.type == 'third'" :label="t('thirdServiceLink')" prop="h5.third_link" :rules="[{ required: true, message: t('thirdServiceLinkPlaceholder'), trigger: 'blur' }]">
                    <el-input v-model.trim="formData.h5.third_link" :placeholder="t('thirdServiceLinkPlaceholder')" class="!w-[500px]" clearable maxlength="500" />
                </el-form-item>
                <el-form-item v-if="formData.h5.type == 'phone'" :label="t('contactsTel')" prop="h5.phone" :rules="[{ required: true, message: t('phonePlaceholder'), trigger: 'blur' }]">
                    <el-input v-model.trim="formData.h5.phone" :placeholder="t('phonePlaceholder')" class="!w-[500px]" clearable maxlength="20" />
                </el-form-item>

                <!-- 微信小程序端 -->
                <h4 class="flex items-center text-[14px] font-bold text-[#1D1F3A] mt-[20px] mb-[15px]">
                    <span class="w-[4px] h-[14px] bg-[#1D1F3A] inline-block mr-[8px]"></span>
                    {{ t('weappTerminal') }}
                </h4>
                <el-form-item :label="t('serviceType')">
                    <el-radio-group v-model="formData.weapp.type">
                        <el-radio label="none">{{ t('notEnabled') }}</el-radio>
                        <!-- 自建客服依赖 shop_customer 插件，仅安装后显示 -->
                        <el-radio label="self" v-if="shopCustomerInstalled">{{ t('selfService') }}</el-radio>
                        <el-radio label="weapp">{{ t('weappService') }}</el-radio>
                        <el-radio label="work_weixin">{{ t('workWeixinService') }}</el-radio>
                        <el-radio label="third">{{ t('thirdService') }}</el-radio>
                        <el-radio label="phone">{{ t('phoneContact') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="formData.weapp.type == 'work_weixin'" :label="t('corpId')" prop="weapp.corp_id" :rules="[{ required: true, message: t('corpIdPlaceholder'), trigger: 'blur' }]">
                    <el-input v-model.trim="formData.weapp.corp_id" :placeholder="t('corpIdPlaceholder')" class="!w-[500px]" clearable maxlength="100" />
                </el-form-item>
                <el-form-item v-if="formData.weapp.type == 'work_weixin'" :label="t('workWeixinLink')" prop="weapp.work_weixin_link" :rules="[{ required: true, message: t('workWeixinLinkPlaceholder'), trigger: 'blur' }]">
                    <div class="w-[500px]">
                        <el-input v-model.trim="formData.weapp.work_weixin_link" :placeholder="t('workWeixinLinkPlaceholder')" clearable maxlength="500" />
                        <p class="text-[12px] text-[#a9a9a9] leading-[22px]">
                            {{ t('workWeixinWeappTips') }}
                            <el-link type="primary" :underline="false" href="https://developer.work.weixin.qq.com/document/path/94739" target="_blank">{{ t('inWeappAccess') }}</el-link>
                        </p>
                    </div>
                </el-form-item>
                <el-form-item v-if="formData.weapp.type == 'third'" :label="t('thirdServiceLink')" prop="weapp.third_link" :rules="[{ required: true, message: t('thirdServiceLinkPlaceholder'), trigger: 'blur' }]">
                    <el-input v-model.trim="formData.weapp.third_link" :placeholder="t('thirdServiceLinkPlaceholder')" class="!w-[500px]" clearable maxlength="500" />
                </el-form-item>
                <el-form-item v-if="formData.weapp.type == 'phone'" :label="t('contactsTel')" prop="weapp.phone" :rules="[{ required: true, message: t('phonePlaceholder'), trigger: 'blur' }]">
                    <el-input v-model.trim="formData.weapp.phone" :placeholder="t('phonePlaceholder')" class="!w-[500px]" clearable maxlength="20" />
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
import { computed, reactive, ref } from 'vue'
import { t } from '@/lang'
import { getChannelSetting, setChannelSetting } from '@/app/api/sys'
import { FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'
import useUserStore from '@/stores/modules/user'

const route = useRoute()
const userStore = useUserStore()
const pageName = route.meta.title
const loading = ref(true)

// 自建客服依赖 shop_customer 插件，仅站点安装了该插件才显示对应选项
// 注意：shop_customer 属于 apps（saas 应用），不在 site_addons 里，两个列表需合并判断（与 layout 菜单逻辑一致）
const shopCustomerInstalled = computed(() => {
    const apps = userStore.siteInfo?.apps || []
    const siteAddons = userStore.siteInfo?.site_addons || []
    return [...apps, ...siteAddons].some((item: any) => item.key == 'shop_customer')
})

const formData = reactive<any>({
    h5: {
        type: 'none',
        work_weixin_link: '',
        third_link: '',
        phone: ''
    },
    weapp: {
        type: 'none',
        corp_id: '',
        work_weixin_link: '',
        third_link: '',
        phone: ''
    }
})

const setFormData = async () => {
    const data = await (await getChannelSetting()).data
    formData.h5 = {
        // 插件已卸载时历史配置的 self 无对应选项，回退为不启用
        type: (!shopCustomerInstalled.value && data.h5?.type == 'self') ? 'none' : (data.h5?.type || 'none'),
        work_weixin_link: data.h5?.work_weixin_link || '',
        third_link: data.h5?.third_link || '',
        phone: data.h5?.phone || ''
    }
    formData.weapp = {
        // 插件已卸载时历史配置的 self 无对应选项，回退为不启用
        type: (!shopCustomerInstalled.value && data.weapp?.type == 'self') ? 'none' : (data.weapp?.type || 'none'),
        corp_id: data.weapp?.corp_id || '',
        work_weixin_link: data.weapp?.work_weixin_link || '',
        third_link: data.weapp?.third_link || '',
        phone: data.weapp?.phone || ''
    }
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
            setChannelSetting(formData).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped></style>
