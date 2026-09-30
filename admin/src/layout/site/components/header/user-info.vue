<template>
    <div class="user-info-root">
        <el-dropdown ref="dropdownRef" class="user-info-dropdown" @command="clickEvent" :tabindex="1" popper-class="layout-default-user-menu">
            <div class="userinfo navbar-hit flex h-full items-center">
                <div class="userinfo-avatar">
                    <img v-if="userStore.userInfo.head_img" :src="img(userStore.userInfo.head_img)" alt="">
                    <span v-else>{{ userInitial }}</span>
                </div>
            </div>
            <template #dropdown>
                <div class="userinfo-pop">
                    <div class="userinfo-pop-head">
                        <div class="userinfo-avatar is-lg">
                            <img v-if="userStore.userInfo.head_img" :src="img(userStore.userInfo.head_img)" alt="">
                            <span v-else>{{ userInitial }}</span>
                        </div>
                        <div class="userinfo-pop-info">
                            <div class="userinfo-pop-name">{{ userStore.userInfo.username }}</div>
                            <div class="userinfo-pop-role">个人中心</div>
                        </div>
                    </div>
                    <div class="userinfo-pop-divider"></div>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="toLink('/home/index')" v-if="isAllowChange">
                            <div class="userinfo-pop-item">
                                <span class="iconfont iconqiehuan"></span>
                                <span>切换站点</span>
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item @click="getUserInfoFn">
                            <div class="userinfo-pop-item">
                                <span class="iconfont iconshezhi1"></span>
                                <span>账号设置</span>
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item @click="changePasswordDialog=true">
                            <div class="userinfo-pop-item">
                                <span class="iconfont iconxiugai"></span>
                                <span>修改密码</span>
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item class="is-danger" @click="logout">
                            <div class="userinfo-pop-item">
                                <span class="iconfont icontuichudenglu"></span>
                                <span>退出登录</span>
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
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules, ElNotification } from 'element-plus'
import useUserStore from '@/stores/modules/user'
import { setUserInfo } from '@/app/api/personal'
import { t } from '@/lang'
import userInfoEdit from '@/app/components/user-info-edit/index.vue'
import { img } from '@/utils/common'

const isAllowChange = localStorage.getItem('isAllowChange') === 'true';
const userStore = useUserStore()
const dropdownRef = ref()
const open = () => {
    dropdownRef.value?.handleOpen()
}
defineExpose({ open })
const router = useRouter()
// 无头像时使用用户名首字作为默认头像
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
const toLink = (link) => {
    router.push(link)
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
/* ========== 头像 ========== */
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

/* ========== 用户下拉弹窗 ========== */
.userinfo-pop {
    width: 184px;
    padding: var(--space-2);
}

.userinfo-pop-head {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2);
}

.userinfo-pop-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.userinfo-pop-name {
    overflow: hidden;
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-base);
    font-weight: var(--sys-font-weight-semibold);
    text-overflow: ellipsis;
    white-space: nowrap;
}

.userinfo-pop-role {
    margin-top: 2px;
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);
}

.userinfo-pop-divider {
    height: 1px;
    margin: var(--space-1) 0;
    background-color: var(--sys-color-fill-light);
}

.userinfo-pop :deep(.el-dropdown-menu) {
    padding: 0;
    background-color: transparent;
}

.userinfo-pop :deep(.el-dropdown-menu__item) {
    padding: 0;
    border-radius: var(--sys-radius-sm);
    color: var(--sys-color-text-regular);
    font-size: var(--sys-font-size-sm);
    transition: background-color .2s, color .2s;

    &:hover,
    &:focus {
        background-color: var(--sys-color-fill-light);
        color: var(--sys-color-primary);
    }
}

.userinfo-pop :deep(.el-dropdown-menu__item.is-danger) {

    &:hover,
    &:focus {
        background-color: var(--sys-color-danger-soft);
        color: var(--sys-color-danger);
    }
}

.userinfo-pop-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: var(--space-2);
    line-height: 1;

    .iconfont {
        margin-right: var(--space-3);
        font-size: var(--sys-font-size-base);
    }
}
</style>

<style lang="scss">
/* 下拉面板被传送到 body，需使用非 scoped 样式覆盖 el-popper 默认外观 */
.layout-default-user-menu.el-dropdown__popper.el-popper {
    padding: 0;
    border: 1px solid var(--sys-color-border-light);
    border-radius: var(--sys-radius-lg);
    background-color: var(--cmp-dialog-bg);
    box-shadow: var(--cmp-dialog-shadow);

    .el-popper__arrow {
        display: none;
    }

    .el-dropdown-menu {
        padding: 0;
    }
}
</style>
