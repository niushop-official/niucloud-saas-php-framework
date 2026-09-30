<template>
    <div class="user-info-root">
        <el-dropdown ref="dropdownRef" class="user-info-dropdown" @command="clickEvent" :tabindex="1" popper-class="layout-admin-user-menu">
            <div class="userinfo navbar-hit flex h-full items-center">
                <div class="userinfo-avatar">
                    <img v-if="userStore.userInfo.head_img" :src="img(userStore.userInfo.head_img)" alt="">
                    <span v-else>{{ userInitial }}</span>
                </div>
            </div>
            <template #dropdown>
                <div class="p-[10px]">
                    <div class="userinfo flex h-full items-center pb-[10px] border-b-[1px] border-solid border-[#e5e5e5]">
                        <div class="userinfo-avatar is-lg">
                            <img v-if="userStore.userInfo.head_img" :src="img(userStore.userInfo.head_img)" alt="">
                            <span v-else>{{ userInitial }}</span>
                        </div>
                        <div>
                            <div class="user-name pl-[8px] text-[14px]">{{ userStore.userInfo.username }}</div>
                            <div class="pl-[8px] text-[13px] text-[#9699B6]">个人中心</div>
                        </div>
                    </div>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="getUserInfoFn" class="rounded-[4px]">
                            <!-- <router-link to="/user/center"> -->
                                <div class="flex items-center leading-[1] py-[5px]">
                                    <span class="iconfont iconshezhi1 ml-[4px] !text-[14px] mr-[10px]"></span>
                                    <span class="text-[14px]">账号设置</span>
                                </div>
                            <!-- </router-link> -->
                        </el-dropdown-item>
                        <el-dropdown-item class="rounded-[4px]">
                            <router-link to="/tools/authorize">
                                <div class="flex items-center leading-[1] py-[5px]">
                                    <span class="iconfont iconshouquanxinxi2 ml-[4px] !text-[14px] mr-[10px]"></span>
                                    <span class="text-[14px]">授权信息</span>
                                </div>
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item @click="changePasswordDialog=true" class="rounded-[4px]">
                            <div class="flex items-center leading-[1] py-[5px]">
                                <span class="iconfont iconxiugai ml-[4px] !text-[14px] mr-[10px]"></span>
                                <span class="text-[14px]">修改密码</span>
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item @click="logout" class="is-danger rounded-[4px]">
                            <div class="flex items-center leading-[1] py-[5px]">
                                <span class="iconfont icontuichudenglu ml-[4px] !text-[14px] mr-[10px]"></span>
                                <span class="text-[14px]">退出登录</span>
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </div>
            </template>
        </el-dropdown>
        <el-dialog v-model="changePasswordDialog" width="450px" title="修改密码">
            <div>
                <el-form :model="saveInfo" label-width="90px" ref="formRef" :rules="formRules" class="page-form">
                    <el-form-item :label="t('originalPassword')" prop="original_password">
                        <el-input v-model="saveInfo.original_password" type="password" :placeholder="t('originalPasswordPlaceholder')" clearable class="input-width" maxlength="40" />
                    </el-form-item>
                    <el-form-item :label="t('newPassword')" prop="password">
                        <el-input v-model="saveInfo.password" type="password" :placeholder="t('passwordPlaceholder')" clearable class="input-width" maxlength="40" />
                        <div class="form-tip">{{t('passwordTip')}}</div>
                    </el-form-item>
                    <el-form-item :label="t('passwordCopy')" prop="password_copy">
                        <el-input v-model="saveInfo.password_copy" type="password" :placeholder="t('passwordPlaceholder')" clearable class="input-width" maxlength="40" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="changePasswordDialog = false">{{t('cancel')}}</el-button>
                    <el-button type="primary" @click="submitForm(formRef)">{{t('save')}}</el-button>
                </span>
            </template>
        </el-dialog>
        <user-info-edit ref="userInfoEditRef" />
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import type { FormInstance, FormRules, ElNotification } from 'element-plus'
import useUserStore from '@/stores/modules/user'
import { setUserInfo } from '@/app/api/personal'
import { t } from '@/lang'
import { img } from '@/utils/common'
import userInfoEdit from '@/app/components/user-info-edit/index.vue'

const userStore = useUserStore()
const dropdownRef = ref()
const open = () => {
    dropdownRef.value?.handleOpen()
}
defineExpose({ open })
const userInitial = computed(() => String(userStore.userInfo?.username || 'U').slice(0, 1).toUpperCase())

const clickEvent = (command: string) => {
    switch (command) {
        case 'logout':
            userStore.logout()
            break
    }
}

const logout = () => {
    userStore.logout()
}
const userInfoEditRef = ref(null)
const getUserInfoFn = () => {
    userInfoEditRef.value?.open()
}
// 修改密码 --- start
const changePasswordDialog = ref(false)
const formRef = ref<FormInstance>()
// 提交信息
const saveInfo = reactive({
    original_password: '',
    password: '',
    password_copy: ''
})
// 表单验证规则
const formRules = reactive<FormRules>({
    original_password: [
        { required: true, message: t('originalPasswordPlaceholder'), trigger: 'blur' }
    ],
    password: [
        { required: true, message: t('passwordPlaceholder'), trigger: 'blur' }
    ],
    password_copy: [
        { required: true, message: t('passwordPlaceholder'), trigger: 'blur' }
    ]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            let msg = ''
            if (saveInfo.password && !saveInfo.original_password) msg = t('originalPasswordHint')
            if (saveInfo.password && saveInfo.original_password && !saveInfo.password_copy) msg = t('newPasswordHint')
            if (saveInfo.password && saveInfo.original_password && saveInfo.password_copy && saveInfo.password != saveInfo.password_copy) msg = t('doubleCipherHint')
            if (msg) {
                ElNotification({
                    type: 'error',
                    message: msg
                })
                return
            }

            setUserInfo(saveInfo).then((res: any) => {
                changePasswordDialog.value = false
            })
        } else {
            return false
        }
    })
}
</script>

<style lang="scss" scoped>
.el-popper .el-dropdown-menu{
    width: 150px;
}

.userinfo-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    overflow: hidden;
    border: 2px solid var(--sys-color-bg-surface);
    border-radius: var(--sys-radius-full);
    background-color: var(--sys-color-primary);
    box-shadow: 0 0 0 1px var(--sys-color-border-default);
    color: var(--el-color-white);
    font-size: var(--sys-font-size-base);
    font-weight: var(--sys-font-weight-semibold);
    line-height: 1;
    transition: transform .2s, box-shadow .2s;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &.is-lg {
        width: 36px;
        height: 36px;
    }
}

.userinfo:hover .userinfo-avatar {
    transform: scale(1.05);
    box-shadow: 0 0 0 2px var(--el-color-primary-light-7);
}
</style>

<style lang="scss">
.layout-admin-user-menu .el-dropdown-menu__item.is-danger:hover,
.layout-admin-user-menu .el-dropdown-menu__item.is-danger:focus {
    background-color: var(--sys-color-danger-soft);
    color: var(--sys-color-danger);
}
</style>
