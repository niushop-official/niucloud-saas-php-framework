<template>
    <el-dialog v-model="showDialog" :title="formData.id ? t('updateAppVersion') : t('addAppVersion')" width="60%" class="diy-dialog-wrap" :destroy-on-close="true">

        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">

            <div v-show="step == 1" class="h-[400px]">
                <el-form-item :label="t('versionName')" prop="version_name">
                    <el-input v-model="formData.version_name" clearable :placeholder="t('versionNamePlaceholder')" class="input-width" />
                </el-form-item>

                <el-form-item :label="t('versionCode')" prop="version_code">
                    <el-input v-model="formData.version_code" clearable :placeholder="t('versionCodePlaceholder')" class="input-width" />
                    <div class="form-tip">{{ t('versionCodeTips') }}</div>
                </el-form-item>

                <el-form-item :label="t('versionDesc')" prop="version_desc">
                    <el-input v-model="formData.version_desc" type="textarea" rows="6" clearable :placeholder="t('versionDescPlaceholder')" class="input-width" />
                </el-form-item>

                <el-form-item :label="t('platform')" prop="platform">
                    <el-radio-group v-model="formData.platform">
                        <el-radio :label="key" size="large" v-for="(item, key) in appPlatform">{{ item }}</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item :label="t('isForcedUpgrade')" prop="is_forced_upgrade">
                    <el-switch v-model="formData.is_forced_upgrade" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
            </div>

            <div v-show="step == 2" class="h-[400px]">
                <el-scrollbar>
                    <el-form-item :label="t('upgradeType')">
                        <el-radio-group v-model="formData.upgrade_type">
                            <el-radio label="app" size="large">APP整包升级</el-radio>
                            <el-radio label="hot" size="large">wgt资源包升级</el-radio>
                            <el-radio label="market" size="large">应用市场升级</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    
                    <el-form-item :label="t('resourceFile')" v-show="formData.upgrade_type == 'app'">
                        <el-radio-group v-model="formData.package_type">
                            <el-radio label="file" size="large">上传资源包</el-radio>
                            <el-radio label="cloud" size="large">云打包</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    
                    <div v-show="formData.package_type == 'file' && formData.upgrade_type != 'market'">
                        <el-form-item label="" prop="package_path">
                            <div class="input-width" >
                                <upload-file v-model="formData.package_path" :accept="accept" api="sys/document/app_package"></upload-file>
                            </div>
                            <div class="form-tip" v-if="formData.upgrade_type == 'app'">{{ t('androidResourceFileTips') }}</div>
                            <div class="form-tip" v-if="formData.upgrade_type == 'hot'">{{ t('iosResourceFileTips') }}</div>
                        </el-form-item>
                    </div>
                    
                    <div v-show="formData.upgrade_type == 'market'">
                        <el-form-item label="应用市场链接" prop="package_path">
                            <el-input v-model="formData.package_path" clearable class="input-width" />
                        </el-form-item>
                    </div>
                    
                    <div v-show="formData.package_type == 'cloud'">
                        <el-form-item :label="t('icon')" prop="build.icon">
                            <div class="input-width" >
                                <upload-file v-model="formData.build.icon" accept=".zip" api="sys/document/applet"></upload-file>
                            </div>
                            <div class="form-tip !leading-[1.5]">应用图标和启动界面图片 icon.png为应用的图标 push.png为推送消息的图标 splash.png为应用启动页的图标 将icon.png、push.png、splash.png放置到drawable，drawable-ldpi，drawable-mdpi，drawable-hdpi，drawable-xhdpi，drawable-xxhdpi文件夹下压缩成压缩包上传，
                            具体详情可查看 <span class="text-primary cursor-pointer" @click="windowOpen('https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html')">uniapp App离线打包</span>中“配置应用图标和启动界面”片段</div>
                            <div class="form-tip !leading-[1.5]">只支持上传.zip 在drawable的根目录进行压缩</div>
                        </el-form-item>
                        <el-form-item :label="t('certType')">
                            <el-radio-group v-model="formData.cert.type">
                                <el-radio label="public" size="large">公共证书</el-radio>
                                <el-radio label="private" size="large">自有证书</el-radio>
                            </el-radio-group>
                            <div class="form-tip">{{ t('publicCertTips') }}</div>
                            <div class="form-tip !leading-[1.5]">{{ t('privateCertTips') }}<span class="text-primary cursor-pointer" @click="windowOpen('https://ask.dcloud.net.cn/article/35777')">《Android平台签名证书说明》</span></div>
                            <div class="form-tip flex items-center">证书可以自己生成也可通过niucloud提供的<span class="text-primary cursor-pointer" @click="generateSingCertRef.open()">证书生成工具生成</span></div>
                        </el-form-item>
                        <div v-show="formData.cert.type == 'private'">
                            <el-form-item :label="t('certFile')" prop="cert.file">
                                <div class="input-width" >
                                    <upload-file v-model="formData.cert.file" accept="" api="sys/document/android_cert"></upload-file>
                                </div>
                            </el-form-item>
                            <el-form-item :label="t('certAlias')" prop="cert.key_alias">
                                <el-input v-model="formData.cert.key_alias" clearable :placeholder="t('versionDescPlaceholder')" class="input-width" />
                            </el-form-item>
                            <el-form-item :label="t('certKeyPassword')" prop="cert.key_password">
                                <el-input v-model="formData.cert.key_password" clearable :placeholder="t('versionDescPlaceholder')" class="input-width" />
                            </el-form-item>
                            <el-form-item :label="t('certStorePassword')" prop="cert.store_password">
                                <el-input v-model="formData.cert.store_password" clearable :placeholder="t('versionDescPlaceholder')" class="input-width" />
                            </el-form-item>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <view v-show="step == 1">
                     <el-button type="primary" class="ml-3" @click="step = 2">{{
                             t('next')
                         }}</el-button>
                </view>
                <view v-show="step == 2">
                     <el-button type="primary" class="ml-3" @click="step = 1">{{
                             t('prev')
                         }}</el-button>
                    <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{ t('confirm') }}</el-button>
                </view>
            </span>
        </template>
    </el-dialog>
    
    <generate-sing-cert ref="generateSingCertRef"/>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { addVersion, editVersion, getVersionInfo, getAppPlatform } from '@/app/api/app'
import GenerateSingCert from '@/app/views/channel/app/components/generate-sing-cert.vue'

const showDialog = ref(false)
const loading = ref(false)
const appPlatform = ref({})
const step = ref(1)
const generateSingCertRef = ref(null)

const getAppPlatformFn = async () => {
    await getAppPlatform().then(({ data }) => {
        appPlatform.value = data
        initialFormData.platform = Object.keys(data)[0]
    })
}
getAppPlatformFn()

const accept = computed(() => {
    if (formData.upgrade_type == 'app') return '.apk'
    if (formData.upgrade_type == 'hot') return '.wgt'
    return ''
})

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    version_code: '',
    version_name: '',
    version_desc: '',
    platform: '',
    is_forced_upgrade: 0,
    package_path: '',
    package_type: 'file',
    upgrade_type: 'app',
    build: {
        icon: '',
    },
    cert: {
        type: 'public',
        file: '',
        key_alias: '',
        key_password: '',
        store_password: ''
    }
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

watch(() => formData.upgrade_type, () => {
    if (formData.upgrade_type == 'app' || formData.upgrade_type == 'hot') {
        formData.package_type = 'file'
    }
    formData.package_path = ''
    formData.cert.type = 'public'
})

// 表单验证规则
const formRules = computed(() => {
    return {
        version_code: [
            { required: true, message: t('versionCodePlaceholder'), trigger: 'blur' },
            {
                trigger: 'blur',
                validator: (rule: any, value: any, callback: any) => {
                    if (isNaN(value) || !/^\d{0,10}$/.test(value)) {
                        callback(new Error(t('versionCodeTips')))
                    } else if (value < 0) {
                        callback(new Error(t('versionCodeTips')))
                    } else {
                        callback()
                    }
                }
            }
        ],
        version_name: [
            { required: true, message: t('versionNamePlaceholder'), trigger: 'blur' }
        ],
        package_path: [
            { required: formData.upgrade_type != 'market' && formData.package_type == 'file', message: '请上传资源文件', trigger: 'blur' },
            { required: formData.upgrade_type == 'market', message: '请输入应用市场链接', trigger: 'blur' }
        ],
        'build.icon': [
            { required: formData.package_type == 'cloud', message: '请上传图标文件', trigger: 'blur' },
        ],
        'cert.file': [
            { required: formData.package_type == 'cloud' && formData.cert.type == 'private', message: '请上传证书文件', trigger: 'blur' }
        ],
        'cert.key_alias': [
            { required: formData.package_type == 'cloud' && formData.cert.type == 'private', message: '请输入证书别名', trigger: 'blur' }
        ],
        'cert.key_password': [
            { required: formData.package_type == 'cloud' && formData.cert.type == 'private', message: '请上传证书密码', trigger: 'blur' }
        ],
        'cert.store_password': [
            { required: formData.package_type == 'cloud' && formData.cert.type == 'private', message: '请上传证书库密码', trigger: 'blur' }
        ]
    }
})

const emit = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    const save = formData.id ? editVersion : addVersion

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            save(formData).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete')
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if (row) {
        const data = await (await getVersionInfo(row.id)).data
        if (data) Object.keys(formData).forEach((key: string) => {
            if (data[key] != undefined) formData[key] = data[key]
        })
    }
    loading.value = false
}

watch(() => showDialog.value, () => {
    step.value = 1
})

const windowOpen = (url: string) => {
    window.open(url)
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.diy-dialog-wrap .el-form-item__label{
    height: auto  !important;
}
</style>
