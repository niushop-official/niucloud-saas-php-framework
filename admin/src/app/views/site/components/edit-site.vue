<template>
    <el-dialog v-model="showDialog" :title="elDialogTitle" width="560px" :destroy-on-close="true">
        <el-form :model="formData" label-width="100px" ref="formRef" :rules="formRules" class="page-form" autocomplete="off" v-loading="loading">
            <div v-if="formData.site_id == 0">
                <el-form-item :label="t('siteName')" prop="site_name">
                    <el-input v-model.trim="formData.site_name" maxlength="20" clearable :placeholder="t('siteNamePlaceholder')" class="input-width" />
                </el-form-item>

                <el-form-item :label="t('groupId')" prop="group_id">
                    <el-select v-model="formData.group_id" clearable :placeholder="t('groupIdPlaceholder')" class="input-width">
                        <el-option :label="item['group_name']" :value="item['group_id']" v-for="(item,index) in groupList" :key="index"/>
                    </el-select>
                </el-form-item>
                <!-- 账号：''=未选择，0=新增站点管理员（下拉切换为登录账号），其余为选择已有管理员 -->
                <el-form-item :label="formData.uid === 0 ? t('addManagerUsername') : t('manager')" :prop="formData.uid === 0 ? 'username' : 'uid'">
                    <el-select
                        v-if="formData.uid !== 0"
                        v-model="formData.uid"
                        :placeholder="t('managerPlaceholder')"
                        filterable
                        class="input-width"
                        @change="onUidChange"
                    >
                        <el-option label="新增站点管理员" :value="0">
                            <template #default>
                                <div class="flex items-center">
                                    <el-icon class="mr-[10px]">
                                        <Plus />
                                    </el-icon>
                                    新增站点管理员
                                </div>
                            </template>
                        </el-option>
                        <el-option v-for="item in siteUser" :key="item.uid" :label="item.username" :value="item.uid">
                            <div class="flex items-center">
                                <el-avatar :src="img(item.head_img)" size="small" class="mr-[10px]" v-if="item.head_img" />
                                <img src="@/app/assets/images/member_head.png" alt="" class="mr-[10px] w-[24px]" v-else>
                                {{ item.username }}
                            </div>
                        </el-option>
                    </el-select>

                    <div v-else class="account-control">
                        <el-input
                            v-model.trim="formData.username"
                            clearable
                            :placeholder="t('addManagerUsernamePlaceholder')"
                            autocomplete="off"
                            :readonly="usernameInput"
                            @click="usernameInput = false"
                            @blur="usernameInput = true"
                        />
                        <el-button link type="primary" class="ml-[10px] shrink-0" @click="backToSelect">
                            选择
                        </el-button>
                    </div>
                </el-form-item>

                <div v-show="formData.uid === 0">
                    <el-form-item :label="t('addManagerPassword')" prop="password">
                        <el-input v-model.trim="formData.password" clearable :placeholder="t('addManagerPasswordPlaceholder')" class="input-width" autocomplete="new-password" :show-password="true" type="password" :readonly="passwordInput" @click="passwordInput = false" @blur="passwordInput = true" />
                    </el-form-item>

                    <el-form-item :label="t('addManagerConfirmPassword')" prop="confirm_password">
                        <el-input v-model.trim="formData.confirm_password" clearable :placeholder="t('addManagerConfirmPasswordPlaceholder')" class="input-width" autocomplete="new-password" :show-password="true" type="password" :readonly="confirmPasswordInput" @click="confirmPasswordInput = false" @blur="confirmPasswordInput = true" />
                    </el-form-item>
                </div>
            </div>
            <div v-else>
                <el-form-item :label="t('siteName')">
                    {{ formData.site_name }}
                </el-form-item>

                <el-form-item :label="t('groupId')" prop="group_id">
                    <el-select v-model="formData.group_id" clearable :placeholder="t('groupIdPlaceholder')" class="input-width">
                        <el-option :label="item['group_name']" :value="item['group_id']" v-for="(item,index) in groupList" :key="index"/>
                    </el-select>
                </el-form-item>

                <el-form-item :label="t('manager')" prop="uid">
                    <div class="input-width manager-field flex items-center">
                        <el-select v-model="formData.uid" :placeholder="t('managerPlaceholder')" class="min-w-0 flex-1" filterable>
                            <el-option v-for="item in siteUser" :key="item.uid" :label="item['username']" :value="item['uid']">
                                <div class="flex items-center">
                                    <el-avatar :src="img(item.head_img)" size="small" class="mr-[10px]" v-if="item.head_img" />
                                    <img src="@/app/assets/images/member_head.png" alt="" class="mr-[10px] w-[24px]" v-else>
                                    {{ item.username }}
                                </div>
                            </el-option>
                        </el-select>
                        <el-button class="ml-[8px] shrink-0" @click="openAddUser">{{ t('addManagerAction') }}</el-button>
                    </div>
                </el-form-item>
            </div>

            <el-form-item :label="t('siteDomain')" prop="site_domain">
                <el-input v-model.trim="formData.site_domain" clearable :placeholder="t('siteDomainPlaceholder')" class="input-width" />
                <div>
                    <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">{{ t('siteDomainTips') }}</p>
                    <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">{{ t('siteDomainTipsTwo') }}</p>
                    <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">{{ t('siteDomainTipsThree') }}</p>
                </div>
            </el-form-item>

            <el-form-item :label="t('expireTime')" prop="expire_time" class="input-width">
                <el-date-picker class="flex-1 !flex" v-model="formData.expire_time" clearable type="datetime" :placeholder="t('expireTimePlaceholder')" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
    <add-user ref="addUserRef" @success="onAddUserSuccess" />
</template>

<script lang="ts" setup>
import { ref, reactive, computed, nextTick } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { addSite, getSiteGroupAll, getSiteInfo, editSite } from '@/app/api/site'
import { getUserListSelect } from '@/app/api/user'
import { getInstalledAddonList } from '@/app/api/addon'
import { img } from '@/utils/common'
import AddUser from '@/components/add-user/index.vue'

const showDialog = ref(false)
const loading = ref(true)
const groupList = ref([])
const siteUser = ref([])
const siteType = ref([])
const addUserRef = ref()
const loadSiteUser = () => {
    return getUserListSelect({}).then(({ data }) => {
        siteUser.value = data
    })
}
loadSiteUser()

const openAddUser = () => {
    addUserRef.value?.open()
}

const onAddUserSuccess = (payload: { uid: number, status: boolean }) => {
    if (!payload.status) return
    loadSiteUser().then(() => {
        if (payload.uid) formData.uid = payload.uid
    })
}

const end = new Date()

end.setTime(end.getTime() + 3600 * 1000 * 2 * 360)
/**
 * 表单数据
 */
const initialFormData = {
    site_id: '',
    site_name: '',
    real_name: '',
    uid: '' as number | '',
    username: '',
    password: '',
    confirm_password: '',
    expire_time: end,
    site_domain: '',
    group_id: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()
const usernameInput = ref(true)
const passwordInput = ref(true)
const confirmPasswordInput = ref(true)

const resetAccountInputLock = () => {
    usernameInput.value = true
    passwordInput.value = true
    confirmPasswordInput.value = true
}

const clearNewManager = () => {
    formData.username = ''
    formData.password = ''
    formData.confirm_password = ''
    resetAccountInputLock()
}

const clearNewManagerValidate = () => {
    nextTick(() => {
        formRef.value?.clearValidate(['uid', 'username', 'password', 'confirm_password'])
    })
}

const onUidChange = () => {
    clearNewManager()
    clearNewManagerValidate()
}

const backToSelect = () => {
    clearNewManager()
    formData.uid = ''
    clearNewManagerValidate()
}

const setGroupList = async () => {
    groupList.value = await (await getSiteGroupAll()).data
}
setGroupList()

/**
 * 获取应用列表
 */
const addonList = ref([])
getInstalledAddonList().then(({ data }) => {
    addonList.value = data
}).catch()

const setFormData = async (row: any = null) => {
    loading.value = true
    Object.assign(formData, initialFormData)
    resetAccountInputLock()
    if (row) {
        const data = await (await getSiteInfo(row.site_id)).data
        siteType.value = data
        Object.keys(formData).forEach((key: string) => {
            if (data[key] != undefined) formData[key] = data[key]
        })
    }
    loading.value = false
}

// 表单验证规则
const formRules = computed(() => {
    const isNew = formData.site_id == 0 && formData.uid === 0
    return {
        site_name: [
            { required: true, message: t('siteNamePlaceholder'), trigger: 'blur' }
        ],
        group_id: [
            { required: true, message: t('groupIdPlaceholder'), trigger: 'blur' }
        ],
        uid: isNew ? [] : [
            { required: true, message: t('uIdPlaceholder'), trigger: 'change' },
            {
                validator: (rule: any, value: string, callback: any) => {
                    if (formData.uid === '') callback(new Error(t('managerPlaceholder')))
                    else callback()
                },
                trigger: 'change'
            }
        ],
        username: [{ required: isNew, message: t('addManagerUsernamePlaceholder'), trigger: 'blur' }],
        password: [{ required: isNew, message: t('addManagerPasswordPlaceholder'), trigger: 'blur' }],
        confirm_password: [
            { required: isNew, message: t('addManagerConfirmPasswordPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string, callback: any) => {
                    if (isNew && value != formData.password) callback(new Error(t('addManagerConfirmPasswordError')))
                    else callback()
                },
                trigger: 'blur'
            }
        ],
        expire_time: [
            { required: true, message: t('expireTimePlaceholder'), trigger: 'blur' }
        ]
    }
})

const emit = defineEmits(['complete'])

// 弹窗头部
const elDialogTitle = computed(() => {
    if (loading.value) return ''
    return formData.site_id ? t('editSite') : t('addSite')
})

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            const data: Record<string, any> = { ...formData }
            const isNewManager = data.site_id == 0 && data.uid === 0
            if (!isNewManager) {
                delete data.username
                delete data.password
                delete data.confirm_password
            } else {
                delete data.confirm_password
            }
            const save = data.site_id ? editSite : addSite
            save(data).then(res => {
                loading.value = false
                showDialog.value = false
                loadSiteUser()
                emit('complete')
            }).catch(() => {
                loading.value = false
                // showDialog.value = false
            })
        }
    })
}

defineExpose({
    showDialog,
    setFormData,
    loading
})
</script>

<style lang="scss" scoped>
.manager-field {
    :deep(.el-select) {
        width: 100%;
    }
}

.account-control {
    display: flex;
    align-items: center;

    :deep(.el-input) {
        width: var(--cmp-page-form-control-width, 320px);
        max-width: 100%;
        flex: 0 0 auto;
    }
}
</style>
