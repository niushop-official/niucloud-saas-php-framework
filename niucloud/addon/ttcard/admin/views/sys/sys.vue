<template>
    <div class="main-container">

        <el-form class="page-form" :model="formData" label-width="150px" ref="formRef" :rules="formRules" v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">
                <h3 class="panel-title !text-sm">{{ t('小程序设置') }}</h3>
                <el-form-item :label="t('首页标题')" prop="miniappIndexTitle">
                    <el-input v-model.trim="formData.miniappIndexTitle" :placeholder="t('请输入')" class="input-width" clearable maxlength="30" show-word-limit />
                </el-form-item>
                <el-form-item :label="t('首页轮播')">
                    <div>
                        <upload-image :limit="10" v-model="formData.indexSwiper" />
                    </div>
                </el-form-item>

                <el-form-item  :label="t('微官网嵌套H5网页')" prop="website_switch">
                    <el-radio-group  v-model="formData.website_switch" >
                        <el-radio
                            v-for="(item, index) in statusList"
                            :key="index" :label="item.value">
                              {{ item.label }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item v-if="formData.website_switch==1" :label="t('H5网页URL')">
                    <el-input v-model="formData.website_url" :placeholder="t('请输入网址https://')" class="input-width" clearable  />
                </el-form-item>
                <p v-if="formData.website_switch==1" style="color: #a4a4a4;font-size: 13px;margin-left: 50px;">开启H5之后，请到微信官方小程序后台设置白名单</p>
            </el-card>
            <el-card class="box-card mt-[15px] !border-none" shadow="never">
                <h3 class="panel-title !text-sm">{{ t('业务配置') }}</h3>

                <el-form-item  :label="t('显示名片中联系方式')">
                    <el-radio-group  v-model="formData.miniappHiddenInformation" >
                        <el-radio
                            v-for="(item, index) in statusList"
                            :key="index" :label="item.value">
                              {{ item.label }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item  :label="t('用户留言审核')" prop="leaveamessage_switch">
                    <el-radio-group  v-model="formData.leaveamessage_switch" >
                        <el-radio
                            v-for="(item, index) in statusList"
                            :key="index" :label="item.value">
                              {{ item.label }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item  :label="t('发布名片审核')" prop="addCard_switch">
                    <el-radio-group  v-model="formData.addCard_switch" >
                        <el-radio
                            v-for="(item, index) in statusList"
                            :key="index" :label="item.value">
                              {{ item.label }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item  :label="t('VIP功能')" prop="vip_switch">
                    <el-radio-group  v-model="formData.vip_switch" >
                        <el-radio
                            v-for="(item, index) in statusList"
                            :key="index" :label="item.value">
                              {{ item.label }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item  :label="t('招聘版块')" prop="recruit_switch">
                    <el-radio-group  v-model="formData.recruit_switch" >
                        <el-radio
                            v-for="(item, index) in statusList"
                            :key="index" :label="item.value">
                              {{ item.label }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item  :label="t('身份认证收费')" prop="authentication_switch">
                    <el-radio-group  v-model="formData.authentication_switch" >
                        <el-radio
                            v-for="(item, index) in statusList"
                            :key="index" :label="item.value">
                              {{ item.label }}
                        </el-radio>
                    </el-radio-group>
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
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getSys, editSys } from  '@/addon/ttcard/api/sys'
import { img } from '@/utils/common'
import { FormInstance, FormRules } from 'element-plus'
import { getAppType } from '@/utils/common'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title
const loading = ref(true)
const appType = ref(getAppType())
const formData = reactive<Record<string, string>>({
    miniappIndexTitle: '',
    indexSwiper: '',
    website_switch: '0',
    website_url: '',
    miniappHiddenInformation: '0',
    leaveamessage_switch: '1',
    addCard_switch: '1',
    vip_switch: '1',
    recruit_switch: '1',
    authentication_switch: '1',
})
let statusList= [{label: '开启', value: '1'}, {label: '关闭', value: '0'}];
const setFormData = async () => {
    const data = await (await getSys()).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })

    const service_data = await (await getSys()).data
    loading.value = false
}
setFormData()

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = reactive<FormRules>({
    miniappIndexTitle: [
        { required: true, message: t('请输入'), trigger: 'blur' }
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

            editSys(formData).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped></style>
