<template>
    <el-dialog v-model="showDialog" :title="elDialogTitle" width="500px" :destroy-on-close="true">
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
                <!-- <el-form-item :label="t('realName')" prop="real_name" v-if="!formData.site_id && !loading">
                        <el-input v-model.trim="formData.real_name" clearable :placeholder="t('realNamePlaceholder')" class="input-width" />
                    </el-form-item> -->
                <el-form-item :label="t('manager')" prop="uid">
                    <el-select v-model="formData.uid" :placeholder="t('managerPlaceholder')" class="input-width" filterable>
                        <el-option :label="t('newAddManager')" :value="0">
                            <template #default>
                                <div class="flex items-center">
                                    <el-icon class="mr-[10px]">
                                        <Plus />
                                    </el-icon>
                                    {{ t('newAddManager') }}
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
                </el-form-item>

                <div v-show="formData.uid === 0">
                    <el-form-item :label="t('username')" prop="username">
                        <el-input v-model.trim="formData.username" clearable :placeholder="t('usernamePlaceholder')" class="input-width" :readonly="user_name_input" @click="inputClick('user_name_input')" @blur="user_name_input = true" />
                    </el-form-item>

                    <el-form-item :label="t('password')" prop="password">
                        <el-input v-model.trim="formData.password" clearable :placeholder="t('passwordPlaceholder')" class="input-width" :show-password="true" type="password" :readonly="password_input" @click="inputClick('password_input')" @blur="password_input = true" />
                    </el-form-item>

                    <el-form-item :label="t('confirmPassword')" prop="confirm_password">
                        <el-input v-model.trim="formData.confirm_password" :placeholder="t('confirmPasswordPlaceholder')" type="password" :show-password="true" clearable class="input-width" :readonly="confirm_password_input" @click="inputClick('confirm_password_input')" @blur="confirm_password_input = true" />
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
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { addSite, getSiteGroupAll, getSiteInfo, editSite } from '@/app/api/site'
import { getUserListSelect } from '@/app/api/user'
import { getInstalledAddonList } from '@/app/api/addon'
import { img } from '@/utils/common'

const showDialog = ref(false)
const loading = ref(true)
const groupList = ref([])
const siteUser = ref([])
const siteType = ref([])
const domain = location.hostname
getUserListSelect({}).then(({ data }) => {
    siteUser.value = data
})

const end = new Date()

end.setTime(end.getTime() + 3600 * 1000 * 2 * 360)
/**
 * 表单数据
 */
const initialFormData = {
    site_id: '',
    site_name: '',
    real_name: '',
    uid: '',
    username: '',
    password: '',
    confirm_password: '',
    expire_time: end,
    site_domain: '',
    group_id: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

const user_name_input = ref(true)
const password_input = ref(true)
const confirm_password_input = ref(true)
const inputClick=(key:any)=>{
    let time = setTimeout(() => {
        clearTimeout(time)
        if(key=='user_name_input') user_name_input.value = false
        if(key=='password_input') password_input.value = false
        if(key=='confirm_password_input') confirm_password_input.value = false
    }, 200);
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
    return {
        site_name: [
            { required: true, message: t('siteNamePlaceholder'), trigger: 'blur' }
        ],
        group_id: [
            { required: true, message: t('groupIdPlaceholder'), trigger: 'blur' }
        ],
        uid: [
            { required: true, message: t('uIdPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string, callback: any) => {
                    if (formData.uid === '') callback(new Error(t('managerPlaceholder')))
                    else callback()
                },
                trigger: 'blur'
            }
        ],
        username: [
            { required: formData.uid == 0, message: t('usernamePlaceholder'), trigger: 'blur' }
        ],
        password: [
            { required: formData.uid == 0, message: t('passwordPlaceholder'), trigger: 'blur' }
        ],
        real_name: [
            { required: true, message: t('userRealNamePlaceholder'), trigger: 'blur' }
        ],
        confirm_password: [
            { required: formData.uid == 0, message: t('confirmPasswordPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string, callback: any) => {
                    if (formData.uid == 0 && value != formData.password) callback(new Error(t('confirmPasswordError')))
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

            const data = formData
            const save = data.site_id ? editSite : addSite
            save(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete')
            }).catch(() => {
                loading.value = false
                // showDialog.value = false
            })
        }
    })
}

// 禁止点击input输入框时浏览器显示默认的账号信息
window.onload = function() {
    var inputs = document.getElementsByTagName('input');
    for(var i=0; i<inputs.length; i++) {
        inputs[i].setAttribute('autocomplete', 'off');
    }
};

defineExpose({
    showDialog,
    setFormData,
    loading
})
</script>

<style lang="scss" scoped></style>
