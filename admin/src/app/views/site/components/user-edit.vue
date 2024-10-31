<template>
    <el-dialog v-model="showDialog" :title="formData.uid ? t('updateUser') : t('addUser')" width="750px" :destroy-on-close="true">
        <el-scrollbar>
            <div class="max-h-[60vh]">
                <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" autocomplete="off" v-loading="loading">
                    <el-form-item :label="t('username')" prop="username">
                        <el-input v-model.trim="formData.username" clearable :placeholder="t('usernamePlaceholder')" class="input-width" :readonly="formData.uid" :disabled="formData.uid" @click="realnameInput = false" @blur="realnameInput = true" />
                    </el-form-item>

                    <el-form-item :label="t('headImg')">
                        <upload-image v-model="formData.head_img" />
                    </el-form-item>

                    <el-form-item :label="t('userRealName')" prop="real_name">
                        <el-input v-model.trim="formData.real_name" :placeholder="t('userRealNamePlaceholder')" :readonly="realnameInput" @click="realnameInput = false" @blur="realnameInput = true" clearable class="input-width" maxlength="10" show-word-limit />
                    </el-form-item>

                    <el-form-item :label="t('password')" prop="password">
                        <el-input v-model.trim="formData.password" clearable :placeholder="t('passwordPlaceholder')" class="input-width" :show-password="true" type="password" :readonly="passwordInput" @click="passwordInput = false" @blur="passwordInput = true"  />
                    </el-form-item>

                    <el-form-item :label="t('confirmPassword')" prop="confirm_password">
                        <el-input v-model.trim="formData.confirm_password" :placeholder="t('confirmPasswordPlaceholder')" type="password" :show-password="true" clearable class="input-width" :readonly="confirmPasswordInput" @click="confirmPasswordInput = false" @blur="confirmPasswordInput = true" />
                    </el-form-item>

                    <el-form-item :label="t('userCreateSiteLimit')" v-if="!formData.uid && Object.keys(siteGroup).length" prop="create_site_limit">
                        <div>
                            <div>{{ t('siteGroup') }}</div>
                            <el-checkbox-group v-model="formData.group_ids" @change="groupSelect">
                                <el-checkbox v-for="item in siteGroup" :label="item.group_id">{{ item.group_name }}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="w-full">
                            <div>{{ t('userCreateSiteLimit') }}</div>
                            <el-table :data="formData.create_site_limit" size="large" class="w-full">
                                <el-table-column :label="t('siteGroup')" :show-overflow-tooltip="true">
                                    <template #default="{ row }">
                                        {{ siteGroup[row.group_id] ? siteGroup[row.group_id].group_name : '' }}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="t('createSiteNum')">
                                    <template #default="{ $index }">
                                        <el-input v-model.number.trim="formData.create_site_limit[$index].num">
                                        </el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="t('siteMonth')">
                                    <template #default="{ $index }">
                                        <el-input v-model.number.trim="formData.create_site_limit[$index].month">
                                            <template #append>{{ t('month') }}</template>
                                        </el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-scrollbar>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import { t } from '@/lang'
import { FormInstance } from 'element-plus'
import { getSiteGroupAll } from '@/app/api/site'
import { addUser, getUserInfo, editUser } from '@/app/api/user'
import Test from '@/utils/test'

const showDialog = ref(false)
const loading = ref(true)
const formData = ref({
    uid: 0,
    username: '',
    password: '',
    head_img: '',
    real_name: '',
    confirm_password: '',
    create_site_limit: [],
    group_ids: []
})
const siteGroup = ref({})
const formRef = ref<FormInstance>()
const formRules = computed(() => {
    return {
        username: [
            { required: true, message: t('usernamePlaceholder'), trigger: 'blur' }
        ],
        password: [
            { required: formData.value.uid == 0, message: t('passwordPlaceholder'), trigger: 'blur' }
        ],
        real_name: [
            { required: true, message: t('userRealNamePlaceholder'), trigger: 'blur' }
        ],
        confirm_password: [
            { required: formData.value.uid == 0, message: t('confirmPasswordPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string, callback: any) => {
                    if (value != formData.value.password) callback(new Error(t('confirmPasswordError')))
                    else callback()
                },
                trigger: 'blur'
            }
        ],
        create_site_limit: [
            {
                validator: (rule: any, value: string, callback: any) => {
                    if (formData.value.uid) callback()
                    let verify = true
                    for (let i = 0; i < formData.value.create_site_limit.length; i++) {
                        const item = formData.value.create_site_limit[i]
                        if (Test.empty(item.num)) {
                            callback(t('siteNumPlaceholder'))
                            verify = false
                            break
                        }
                        if (item.num < 1) {
                            callback(t('siteNumCannotLtOne'))
                            verify = false
                            break
                        }
                        if (Test.empty(item.month)) {
                            callback(t('siteMonthPlaceholder'))
                            verify = false
                            break
                        }
                        if (item.month < 0) {
                            callback(t('siteMonthCannotLtOne'))
                            verify = false
                            break
                        }
                    }
                    if (verify) callback()
                }
            }
        ]
    }
})

getSiteGroupAll().then(({ data }) => {
    const list: any = {}
    data.forEach((item: any) => {
        list[item.group_id] = item
    })
    siteGroup.value = list
})

const setFormData = (uid: number = 0) => {
    if (uid) {
        getUserInfo(uid).then(({ data }) => {
            formData.value.uid = data.uid
            formData.value.username = data.username
            formData.value.real_name = data.real_name
            formData.value.head_img = data.head_img
            loading.value = false
            showDialog.value = true
        })
    } else {
        formData.value = {
            uid: 0,
            username: '',
            password: '',
            head_img: '',
            real_name: '',
            confirm_password: '',
            create_site_limit: [],
            group_ids: []
        }
        loading.value = false
        showDialog.value = true
    }
}

const emits = defineEmits(['complete'])

const groupSelect = (groupIds: number[]) => {
    let list:any = []
    groupIds.forEach(item => {
        list.push({
            group_id: item,
            num: 1,
            month: 1
        })
    })
    formData.value.create_site_limit = list
}

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            const save = formData.value.uid ? editUser : addUser

            save(formData.value).then(() => {
                loading.value = false
                showDialog.value = false
                emits('complete')
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

const realnameInput = ref(true)
const passwordInput = ref(true)
const confirmPasswordInput = ref(true)

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped>

</style>
