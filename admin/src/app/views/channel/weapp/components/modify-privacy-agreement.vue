<template>
    <el-dialog v-model="showDialog" :title="t('privacyAgreementTitle')" width="900px" :destroy-on-close="true">
        <div class="h-[60vh]">
            <el-scrollbar>
                <el-form :model="formData" label-width="auto" label-position="left" ref="formRef" :rules="formRules"
                         class="page-form w-[700px] mx-auto" v-loading="loading">
                    <h3 class="text-center text-xl font-bold my-[20px]">{{ config.weapp_name }} 小程序隐私保护指引</h3>
                    <h4 class="text-lg my-[10px]">1. 开发者处理的信息</h4>
                    <div class="mb-[8px]">根据法律规定，开发者仅处理实现小程序功能所必要的信息。</div>
                    <div class="setting-list">
                        <setting-list v-model="formData.setting_list" ref="settingListRef"/>
                    </div>
                    <div>
                        <el-button type="primary" link @click="settingListRef.addSettingList()">{{ t('addSettingType') }}</el-button>
                    </div>
                    <h4 class="text-lg my-[10px]">2. 第三方插件信息/SDK信息</h4>
                    <div class="mb-[8px]">
                        为实现特定功能，开发者可能会接入由第三方提供的插件/SDK。第三方插件/SDK的个人信息处理规则，请以其公示的官方说明为准。{{ config.weapp_name }}小程序接入的第三方插件信息/SDK信息如下：
                    </div>
                    <div>
                        <div v-for="(item, index) in formData.sdk_privacy_info_list" class="mb-[15px]">
                            <el-form-item label="SDK名称" class="!mb-[8px]">
                                <el-input v-model="formData.sdk_privacy_info_list[index].sdk_name" class="input-width" placeholder="请输入SDK名称" />
                                <el-button type="primary" class="ml-[10px]" link @click="delSdk(index)">{{ t('delete') }}</el-button>
                            </el-form-item>
                            <el-form-item label="SDK提供方名称" class="!mb-[8px]">
                                <el-input v-model="formData.sdk_privacy_info_list[index].sdk_biz_name" class="input-width" placeholder="请输入SDK提供方名称" />
                            </el-form-item>
                            <setting-list v-model="formData.sdk_privacy_info_list[index].sdk_list" ref="sdkSettingListRef"/>
                            <el-form-item label="" class="!mb-[8px]">
                                <el-button type="primary" link @click="sdkSettingListRef[index].addSettingList()">{{ t('addSdkSettingList') }}</el-button>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <el-button type="primary" link @click="addSdk">{{ t('addSdkInfo') }}</el-button>
                    </div>
                    <h4 class="text-lg my-[10px]">3. 你的权益</h4>
                    <div class="mb-[8px]">3.1
                        关于收集你的位置信息，你可以通过以下路径：小程序主页右上角“…”—“设置”—点击特定信息—点击“不允许”，撤回对开发者的授权。</div>
                    <div class="mb-[8px]">3.2 关于收集你的微信昵称、头像、收集你的手机号，你可以通过以下路径：小程序主页右上角“...” — “设置” —
                        “小程序已获取的信息” — 点击特定信息 —
                        点击“通知开发者删除”，开发者承诺收到通知后将删除信息。法律法规另有规定的，开发者承诺将停止除存储和采取必要的安全保护措施之外的处理。</div>
                    <div class="mb-[8px]">3.3 关于你的个人信息，你可以通过以下方式与开发者联系，行使查阅、复制、更正、删除等法定权利。</div>
                    <div class="mb-[8px]">3.4
                        若你在小程序中注册了账号，你可以通过以下方式与开发者联系，申请注销你在小程序中使用的账号。在受理你的申请后，开发者承诺在十五个工作日内完成核查和处理，并按照法律法规要求处理你的相关信息。</div>
                    <div>
                        <el-form-item label="电话" class="!mb-[8px]">
                            <el-input v-model="formData.owner_setting.contact_phone" class="input-width" placeholder="请输入开发者的手机号" />
                        </el-form-item>
                         <el-form-item label="邮箱" class="!mb-[8px]">
                            <el-input v-model="formData.owner_setting.contact_email" class="input-width" placeholder="请输入开发者的邮箱" />
                         </el-form-item>
                        <el-form-item label="微信号" class="!mb-[8px]">
                            <el-input v-model="formData.owner_setting.contact_weixin" class="input-width" placeholder="请输入开发者的微信号" />
                        </el-form-item>
                        <el-form-item label="qq号" class="!mb-[8px]">
                            <el-input v-model="formData.owner_setting.contact_qq" class="input-width" placeholder="请输入开发者的qq号" />
                        </el-form-item>
                        <div class="form-tip">信息收集方（开发者）的联系方式，4种联系方式至少要填一种</div>
                    </div>
                    <h4 class="text-lg my-[10px]">4. 开发者对信息的存储</h4>
                    <div>
                        <el-radio-group v-model="formData.store_expire_type">
                            <div>
                                <el-radio :label="1">
                                    固定存储期限
                                    <div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="formData.store_expire_timestamp"/></div>
                                </el-radio>
                            </div>
                            <div>
                                <el-radio :label="0">开发者承诺，除法律法规另有规定外，开发者对你的信息的保存期限应当为实现处理目的所必要的最短时间。</el-radio>
                            </div>
                        </el-radio-group>
                    </div>
                    <h4 class="text-lg my-[10px]">5. 信息的使用规则</h4>
                    <div class="mb-[8px]">5.1 开发者将会在本指引所明示的用途内使用收集的信息</div>
                    <div class="mb-[8px]">
                        5.2 如开发者使用你的信息超出本指引目的或合理范围，开发者必须在变更使用目的或范围前，再次以
                        <div class="!w-[180px] inline-block">
                            <el-input v-model="formData.owner_setting.notice_method"/>
                        </div>
                        方式告知并征得你的明示同意。</div>
                    <h4 class="text-lg my-[10px]">6. 信息对外提供</h4>
                    <div class="mb-[8px]">6.1
                        开发者承诺，不会主动共享或转让你的信息至任何第三方，如存在确需共享或转让时，开发者应当直接征得或确认第三方征得你的单独同意。</div>
                    <div class="mb-[8px]">6.2
                        开发者承诺，不会对外公开披露你的信息，如必须公开披露时，开发者应当向你告知公开披露的目的、披露信息的类型及可能涉及的信息，并征得你的单独同意。</div>
                    <h4 class="text-lg my-[10px]">7.
                        你认为开发者未遵守上述约定，或有其他的投诉建议、或未成年人个人信息保护相关问题，可通过以下方式与开发者联系；或者向微信进行投诉。</h4>
<!--                    <h4 class="text-lg my-[10px]">8. 补充文档</h4>-->
                </el-form>
            </el-scrollbar>
        </div>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import SettingList from './setting-list.vue'
import { getWeappPrivacySetting, setWeappPrivacySetting } from '@/app/api/weapp'

const showDialog = ref(false)
const loading = ref(false)
const settingListRef = ref(null)
const sdkSettingListRef = ref(null)

const props = defineProps({
    config: {
        type: Object,
        default: () => {}
    }
})

/**
 * 表单数据
 */
const initialFormData = {
    setting_list: [
        {
            privacy_key: 'UserInfo',
            privacy_text: ''
        },
        {
            privacy_key: 'Location',
            privacy_text: ''
        },
        {
            privacy_key: 'PhoneNumber',
            privacy_text: ''
        }
    ],
    owner_setting: {
        notice_method: ''
    },
    sdk_privacy_info_list: [],
    store_expire_type: 0,
    store_expire_timestamp: ''
}

const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

const emit = defineEmits(['complete'])

const formRules = computed(() => {
    return {}
})

const addSdk = () => {
    formData.sdk_privacy_info_list.push({
        sdk_name: '',
        sdk_biz_name: '',
        sdk_list: []
    })
}

const delSdk = (index: number) => {
    formData.sdk_privacy_info_list.splice(index, 1)
}

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            if (loading.value) return
            loading.value = true

            const data = formData

            if (!data.store_expire_type) data.owner_setting.store_expire_timestamp = data.store_expire_timestamp

            setWeappPrivacySetting(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete', data)
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

const setFormData = async () => {
    getWeappPrivacySetting().then(({ data }) => {
        loading.value = false
        Object.assign(formData, initialFormData)
        if (data) {
            Object.keys(formData).forEach((key: string) => {
                if (data[key] != undefined) formData[key] = data[key]
            })
            if (data.owner_setting.store_expire_timestamp) {
                formData.store_expire_type = 1
                formData.store_expire_timestamp = data.owner_setting.store_expire_timestamp
            }
        }
        showDialog.value = true
    })
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
