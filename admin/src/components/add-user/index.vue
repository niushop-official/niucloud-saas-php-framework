<template>
    <el-dialog v-model="showDialog" :title="t('addManagerTitle')" width="480px" :destroy-on-close="true" append-to-body>
        <el-form :model="formData" label-width="100px" ref="formRef" :rules="formRules" class="page-form" autocomplete="off" v-loading="loading">
            <el-form-item :label="t('addManagerUsername')" prop="username">
                <el-input v-model.trim="formData.username" clearable :placeholder="t('addManagerUsernamePlaceholder')" class="input-width" autocomplete="off" :readonly="usernameInput" @click="usernameInput = false" @blur="usernameInput = true" />
            </el-form-item>

            <el-form-item :label="t('addManagerPassword')" prop="password">
                <el-input v-model.trim="formData.password" clearable :placeholder="t('addManagerPasswordPlaceholder')" class="input-width" autocomplete="new-password" :show-password="true" type="password" :readonly="passwordInput" @click="passwordInput = false" @blur="passwordInput = true" />
            </el-form-item>

            <el-form-item :label="t('addManagerConfirmPassword')" prop="confirm_password">
                <el-input v-model.trim="formData.confirm_password" clearable :placeholder="t('addManagerConfirmPasswordPlaceholder')" class="input-width" autocomplete="new-password" :show-password="true" type="password" :readonly="confirmPasswordInput" @click="confirmPasswordInput = false" @blur="confirmPasswordInput = true" />
            </el-form-item>
        </el-form>

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
import { addUser } from '@/app/api/user'

const showDialog = ref(false)
const loading = ref(false)
const formRef = ref<FormInstance>()
const usernameInput = ref(true)
const passwordInput = ref(true)
const confirmPasswordInput = ref(true)

const formData = reactive({
    username: '',
    password: '',
    confirm_password: ''
})

const formRules = computed(() => {
    return {
        username: [
            { required: true, message: t('addManagerUsernamePlaceholder'), trigger: 'blur' }
        ],
        password: [
            { required: true, message: t('addManagerPasswordPlaceholder'), trigger: 'blur' }
        ],
        confirm_password: [
            { required: true, message: t('addManagerConfirmPasswordPlaceholder'), trigger: 'blur' },
            {
                validator: (_rule: any, value: string, callback: any) => {
                    if (value != formData.password) callback(new Error(t('addManagerConfirmPasswordError')))
                    else callback()
                },
                trigger: 'blur'
            }
        ]
    }
})

const emit = defineEmits(['success'])

const resetForm = () => {
    formData.username = ''
    formData.password = ''
    formData.confirm_password = ''
    usernameInput.value = true
    passwordInput.value = true
    confirmPasswordInput.value = true
}

const open = () => {
    resetForm()
    loading.value = false
    showDialog.value = true
}

const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (!valid) return
        loading.value = true
        addUser({
            username: formData.username,
            password: formData.password
        }).then((res: any) => {
            loading.value = false
            showDialog.value = false
            const uid = Number(res?.data?.uid || 0)
            emit('success', { uid, status: true })
        }).catch(() => {
            loading.value = false
        })
    })
}

defineExpose({
    open
})
</script>

<style lang="scss" scoped></style>
