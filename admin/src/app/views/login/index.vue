<template>
    <el-container :class="['w-full h-screen bg-page flex flex-col', { 'login-wrap': loginType == 'admin' }, { 'site-login-wrap': loginType == 'site' }]" :style="loginType == 'site' ? siteBackgroundStyle : {}">
        <!-- 平台端登录 -->
        <el-main class="login-main items-center justify-center flex-1 h-0" v-if="loginType == 'admin'">
            <div class="flex rounded-2xl shadow overflow-hidden">
                <div class="login-main-left w-[450px] flex flex-wrap justify-center">
                    <template v-if="loginConfig">
                        <el-image v-if="loginConfig.bg&&!imgLoading" class="w-[450px] h-[400px]" :src="img(loginConfig.bg)" fit="cover" />
                        <img v-else src="@/app/assets/images/login/login_index_left.png" alt="">
                    </template>
                </div>
                <div class="login flex flex-col w-[400px] h-[400px] p-[40px]">
                    <h3 class="text-center text-lg font-bold mb-[10px]">{{ webSite.site_name || t('siteTitle') }}</h3>
                    <h3 class="text-center text-2xl font-bold mb-[26px]">{{ t('platform') }}</h3>
                    <el-form :model="form" ref="formRef" :rules="formRules" class="mt-[30px]">
                        <el-form-item prop="username">
                            <el-input v-model.trim="form.username" :placeholder="t('userPlaceholder')" autocomplete="off" @keyup.enter="handleLogin(formRef)" class="h-[40px]"></el-input>
                        </el-form-item>

                        <el-form-item prop="password" class="mt-[30px]">
                            <el-input v-model.trim="form.password" :placeholder="t('passwordPlaceholder')" type="password" autocomplete="new-password" @keyup.enter="handleLogin(formRef)" :show-password="true" class="h-[40px]"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" class="mt-[30px] !h-[40px] w-full" @click="handleLogin(formRef)" :loading="loading">{{ loading ? t('logging') : t('login') }}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-main>

        <!-- 站点端登录 -->
        <el-main class="login-main w-full justify-center items-center  h-0" v-else-if="!imgLoading && loginType == 'site'">
            <div>
                <div class="login site-login-card flex flex-col w-[392px] rounded-[10px] px-[28px] pt-[26px] pb-[28px]">
                    <div class="flex justify-center mb-[10px]">
                        <el-image v-if="loginConfig && loginConfig.site_login_logo" class="w-[58px] h-[58px]" :src="img(loginConfig.site_login_logo)" fit="contain">
                            <template #error>
                                <img class="w-[58px] h-[58px] object-contain" src="@/app/assets/images/site_login_logo.png" alt="" />
                            </template>
                        </el-image>
                        <img v-else class="w-[58px] h-[58px] object-contain" src="@/app/assets/images/site_login_logo.png" alt="" />
                    </div>
                    <p class="text-center text-[14px] font-[500] leading-[20px] text-[#303133] mb-[6px]">{{ webSite.site_name || t('siteTitle') }}</p>
                    <h3 class="text-center text-[21px] leading-[28px] font-bold text-[#303133]">欢迎登录</h3>
                    <el-form :model="form" ref="formRef" :rules="formRules" class="mt-[22px] site-login-form">
                        <el-form-item prop="username">
                            <el-input v-model.trim="form.username" :placeholder="t('userPlaceholder')" autocomplete="off" @keyup.enter="handleLogin(formRef)" class="h-[40px]"></el-input>
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input v-model.trim="form.password" :placeholder="t('passwordPlaceholder')" type="password" autocomplete="new-password" @keyup.enter="handleLogin(formRef)" :show-password="true" class="h-[40px]"></el-input>
                        </el-form-item>
                        <el-form-item class="!mb-0">
                            <el-button type="primary" class="site-login-btn mt-[8px] !h-[40px] w-full" @click="handleLogin(formRef)" :loading="loading">{{ loading ? t('logging') : t('login') }}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

        </el-main>

        <div class="flex items-center justify-center mt-[20px] pb-[20px] text-sm" :class="[loginType == 'admin' ? 'text-[#666]' : 'text-[#fff]']" v-if="copyright">
            <a :href="copyright.copyright_link" target="_blank">
                <span class="mr-3" v-if="copyright.copyright_desc">{{ copyright.copyright_desc }}</span>
                <span class="mr-3" v-if="copyright.company_name">{{ copyright.company_name }}</span>
            </a>
            <a href="https://beian.miit.gov.cn/" v-if="copyright.icp" target="_blank">
                <span class="mr-3">{{ copyright.icp }}</span>
            </a>
            <a :href="copyright.gov_url" v-if="copyright.gov_record" target="_blank">
                <span class="mr-3">{{ copyright.gov_record }}</span>
            </a>
        </div>

        <!-- 验证组件 -->
        <verify @success="success" :mode="pop" captchaType="blockPuzzle" :imgSize="{ width: '330px', height: '155px' }" ref="verifyRef"></verify>
        <!-- <el-footer></el-footer> -->
    </el-container>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@/lang'
import storage from '@/utils/storage'
import { getLoginConfig } from '@/app/api/auth'
import useUserStore from '@/stores/modules/user'
import { img, getAppType } from '@/utils/common'
import { getWebCopyright } from '@/app/api/sys'
import useSystemStore from '@/stores/modules/system'
import Test from '@/utils/test'
import { ADMIN_ROUTE, SITE_ROUTE } from '@/router/routers'

const loading = ref(false)
const imgLoading = ref(false)
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const copyright = ref(null)

getWebCopyright().then(({ data }) => {
    copyright.value = data
})

route.redirectedFrom && (route.query.redirect = route.redirectedFrom.path)
const webSite: any = computed(() => useSystemStore().website)

const siteBackgroundStyle = computed(() => ({
    backgroundImage: loginConfig.value?.site_login_bg_img ? `url(${img(loginConfig.value.site_login_bg_img)})` : '',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
}))

// 判断登录页面[平台或者站点]
const loginType = ref(getAppType())

// 验证码 - start
const verifyRef: any = ref(null)
const success = (params:any) => {
    loginFn({ captcha_code: params.captchaVerification })
}
// 验证码 - end

const form = reactive({
    username: '',
    password: ''
})

// 获取登录配置信息
const loginConfig: any = ref(null)

const getLoginConfigFn = async () => {
    imgLoading.value = true
    loginConfig.value = await (await getLoginConfig()).data
    imgLoading.value = false
}
getLoginConfigFn()

const formRef = ref<FormInstance>()

const formRules = reactive<FormRules>({
    username: [
        { required: true, message: t('userPlaceholder'), trigger: 'blur' }
    ],
    password: [
        { required: true, message: t('passwordPlaceholder'), trigger: 'blur' }
    ]
})

const handleLogin = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate((valid, fields) => {
        if (valid) {
            if (parseInt(loginConfig.value.is_captcha) && loginType.value == 'admin' || parseInt(loginConfig.value.is_site_captcha) && loginType.value == 'site') {
                verifyRef.value.show()
            } else {
                loginFn()
            }
        }
    })
}

// data 验证码
const loginFn = (data = {}) => {
    loading.value = true
    userStore.login({ username: form.username, password: form.password, ...data }, loginType.value).then(res => {
        storage.set({ key: 'app_type', data: loginType.value })
        if (loginType.value == 'admin' && Test.empty(res.data.userrole)) {
            router.push('/home/index')
        } else {
            router.push({ name: loginType.value == 'admin' ? ADMIN_ROUTE.children[0].name : SITE_ROUTE.children[0].name })
        }
    }).catch(() => {
        loading.value = false
    })
}
</script>

<style lang="scss">
.login-wrap {
    background-image: url("@/app/assets/images/login/login_index_bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}

.site-login-wrap {
    background-repeat: no-repeat;
    background-size: cover;
}

.login-main {
    display: flex !important;

    .login {
        background: var(--el-bg-color);
    }

    .el-form-item__error {
        top : 45px;
    }

}
.site-login-card {
    box-shadow: 0 16px 44px rgba(15, 23, 42, .1), inset 0 1px rgba(255, 255, 255, .22);
}

.site-login-form {
    .el-form-item {
        margin-bottom: 18px;
    }

    .el-form-item__error {
        top: 40px;
    }

    .el-input__wrapper {
        box-shadow: 0 0 0 1px #dcdfe6 inset !important;
        background-color: #fff !important;
        border-radius: 6px !important;
        padding: 1px 14px !important;
    }

    .el-input__wrapper:hover {
        box-shadow: 0 0 0 1px #c0c4cc inset !important;
    }

    .el-input__wrapper.is-focus {
        box-shadow: 0 0 0 1px var(--el-color-primary) inset !important;
    }

    .el-checkbox__label {
        color: #606266;
        font-size: 14px;
    }
}

.site-login-btn {
    border-radius: 7px !important;
    font-size: 14px;
    font-weight: 600;
}

@media only screen and (max-width: 750px) {
    .login-main-left {
        display: none;
    }
}
</style>
