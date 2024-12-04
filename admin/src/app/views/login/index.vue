<template>
    <el-container :class="['w-full h-screen bg-page flex flex-col', { 'login-wrap': loginType == 'admin' }, { 'site-login-wrap': loginType == 'site' }]">
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
                    <h3 class="text-center text-2xl mb-[26px]">{{ webSite.site_name || t('siteTitle') }}{{ t('platform') }}</h3>
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
        <el-main class="login-main w-full login-site-main items-center h-screen justify-evenly bg-[#F8FAFF]" v-else-if="!imgLoading && loginType == 'site'">
            <div class="flex overflow-hidden h-screen w-full relative">
                <template v-if="loginConfig">
                    <img v-if="loginConfig.site_bg&&!imgLoading" class="hidden h-[100%] lg:block" :src="img(loginConfig.site_bg)" />
                    <img v-else class="hidden h-[100%] lg:block" src="@/app/assets/images/login/site_login_bg.png" />
                </template>
                <div class="w-[100%] lg:w-[60%] h-screen flex flex-col absolute right-0 top-0 bg-[#F8FAFF]">
                    <div class="flex justify-center items-center flex-1 h-0">
                        <div class="site-login-item w-[400px] h-[380px] p-[40px] rounded-2xl shadow bg-[#fff]">
                            <h3 class="text-3xl mb-[30px]">{{ t('siteLogin') }}</h3>
                            <el-form :model="form" ref="formRef" :rules="formRules">
                                <el-form-item prop="username">
                                    <el-input v-model.trim="form.username" @keyup.enter="handleLogin(formRef)" autocomplete="off" class="h-[40px]" :placeholder="t('userPlaceholder')"></el-input>
                                </el-form-item>

                                <el-form-item prop="password" class="mt-[30px]">
                                    <el-input type="password" v-model.trim="form.password" @keyup.enter="handleLogin(formRef)" autocomplete="new-password" :show-password="true" class="h-[40px]" :placeholder="t('passwordPlaceholder')"></el-input>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" class="mt-[30px] !h-[40px] w-full" @click="handleLogin(formRef)" :loading="loading">{{ loading ? t('logging') : t('login') }}</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>

                    <div class="flex items-center justify-center mt-[20px] pb-[20px] text-sm text-[#999]" v-if="copyright">
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
                </div>
            </div>
        </el-main>

        <div class="flex items-center justify-center mt-[20px] pb-[20px] text-sm text-[#999]" v-if="copyright && loginType == 'admin'">
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

const webSite = computed(() => useSystemStore().website)
// 判断登录页面[平台或者站点]
const loginType = ref(getAppType())

// 验证码 - start
const verifyRef = ref(null)
const success = (params:any) => {
    loginFn({ captcha_code: params.captchaVerification })
}
// 验证码 - end

const form = reactive({
    username: '',
    password: ''
})

// 获取登录配置信息
const loginConfig = ref(null)
const getLoginConfigFn = async () => {
    imgLoading.value = true
    const data = await (await getLoginConfig()).data
    loginConfig.value = data
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
            if (parseInt(loginConfig.value.is_captcha) && loginType.value == 'admin' || parseInt(loginConfig.value.is_site_captcha) && loginType.value == 'site') { verifyRef.value.show() } else { loginFn() }
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

.login-site-main {
    padding: 0 !important;
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

@media only screen and (max-width: 750px) {
    .login-main-left {
        display: none;
    }
}
</style>
