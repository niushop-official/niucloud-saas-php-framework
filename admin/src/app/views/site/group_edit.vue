<template>
    <!--站点套餐编辑-->
    <div class="main-container" v-loading="loading">

        <el-card class="card !border-none" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="back()" />
        </el-card>

        <el-card class="box-card mt-[15px] !border-none" shadow="never">
            <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('groupName')" prop="group_name">
                    <el-input v-model.trim="formData.group_name" :placeholder="t('groupNamePlaceholder')" clearable :disabled="formData.uid" class="input-width" maxlength="20" :show-word-limit="true" />
                </el-form-item>
                <el-form-item :label="t('groupDesc')" prop="group_desc">
                    <el-input v-model.trim="formData.group_desc" type="textarea" rows="4" clearable :placeholder="t('groupDescPlaceholder')" class="input-width" maxlength="100" />
                </el-form-item>
                <el-form-item :label="t('mainApp')" prop="app">
                    <div class="text-gray-400" v-if="!appList.length">{{ t('appListEmpty') }}</div>
                    <el-checkbox-group v-model="formData.app" class="flex flex-wrap w-full" v-else>
                        <template #default>
                            <div class="flex w-[300px]" v-for="(item, index) in appList" :key="index">
                                <el-checkbox :label="item.key" name="" class="w-full !h-auto border border-[var(--el-color-info-light-7)] border-solid p-[10px] !mr-[10px] !mb-[10px] rounded-md">
                                    <template #default>
                                        <div class="w-full">
                                            <div class="flex">
                                                <div class="w-[60px] h-[60px] mr-[10px] rounded-md overflow-hidden">
                                                    <el-image :src="item.icon" v-if="item.icon" class="w-full h-full" />
                                                    <el-image v-else class="w-full h-full">
                                                        <template #error>
                                                            <div class="image-error">
                                                                <el-icon><icon-picture /></el-icon>
                                                            </div>
                                                        </template>
                                                    </el-image>
                                                </div>
                                                <div class="flex-1 w-0 flex flex-col justify-center">
                                                    <div class="font-bold truncate">{{ item.title }}</div>
                                                    <div class="text-gray-400 mt-[10px] truncate" :title="item.desc">{{ item.desc }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </el-checkbox>
                            </div>
                        </template>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item :label="t('containAddon')">
                    <div class="text-gray-400" v-if="!addonList.length">{{ t('addonListEmpty') }}</div>
                    <el-checkbox-group v-model="formData.addon" class="flex flex-wrap w-full" v-else>
                        <template #default>
                            <div class="flex w-[300px]" v-for="(item, index) in addonList" :key="index">
                                <el-checkbox :label="item.key" name="" class="w-full !h-auto border border-[var(--el-color-info-light-7)] border-solid p-[10px] !mr-[10px] !mb-[10px] rounded-md">
                                    <template #default>
                                        <div class="w-full">
                                            <div class="flex">
                                                <div class="w-[60px] h-[60px] mr-[10px] rounded-md overflow-hidden">
                                                    <el-image :src="item.icon" v-if="item.icon" class="w-full h-full" />
                                                    <el-image v-else class="w-full h-full">
                                                        <template #error>
                                                            <div class="image-error">
                                                                <el-icon><icon-picture /></el-icon>
                                                            </div>
                                                        </template>
                                                    </el-image>
                                                </div>
                                                <div class="flex-1 w-0 flex flex-col justify-center">
                                                    <div class="font-bold truncate">{{ item.title }}</div>
                                                    <div class="text-gray-400 mt-[10px] truncate" :title="item.desc">{{ item.desc }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </el-checkbox>
                            </div>
                        </template>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>

            <div class="fixed-footer-wrap">
                <div class="fixed-footer">
                    <el-button type="primary" @click="confirm(formRef)">{{ t('save') }}</el-button>
                    <el-button @click="back()">{{ t('cancel') }}</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup async>
import { ref, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { menuRefresh } from '@/app/api/sys'
import { addSiteGroup, editSiteGroup, getSiteGroupInfo } from '@/app/api/site'
import { getInstalledAddonList } from '@/app/api/addon'
import { img, deepClone } from '@/utils/common'
import { useRouter, useRoute } from 'vue-router'

const loading = ref(true)
const appList = ref([])
const addonList = ref([])
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const saveLoading = ref(false)

/**
 * 表单数据
 */
const formData: Record<string, any> = ref({
    group_id: 0,
    group_name: '',
    group_desc: '',
    app: [],
    addon: []
})

let installAddon = []
const getInstalledAddonListFn = async () => {
    await getInstalledAddonList().then(({ data }) => {
        const apps: any[] = []
        const addons: any[] = []

        Object.keys(data).forEach(key => {
            installAddon.push(key)
            const item = data[key]
            item.type == 'addon' ? addons.push(item) : apps.push(item)
        })

        appList.value = apps
        addonList.value = addons
    }).catch()
}
getInstalledAddonListFn()

if (route.query.id) {
    getSiteGroupInfo(route.query.id).then((res) => {
        let data = deepClone(res.data)
        formData.value = data
        loading.value = false
    }).catch()
} else {
    loading.value = false
}

const back = () => {
    router.push('/admin/site/group')
}

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        group_name: [
            { required: true, message: t('groupNamePlaceholder'), trigger: 'blur' }
        ],
        app: [
            { required: true, message: t('mainAppPlaceholder'), trigger: 'blur' }
        ]
    }
})

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (saveLoading.value || !formEl) return
    const save = formData.value.group_id ? editSiteGroup : addSiteGroup

    await formEl.validate(async (valid) => {
        if (valid) {
            saveLoading.value = true
            save(formData.value).then(res => {
                menuRefreshFn()
                setTimeout(() => {
                    back()
                }, 1000)
            }).catch(() => {
                saveLoading.value = false
            })
        }
    })
}
const menuRefreshFn = () => {
    menuRefresh({}).then(res => {
    }).catch(() => {})
}
</script>

<style lang="scss" scoped>
    .image-error {
        background: var(--el-border-color-extra-light);
        width: 100%;
        height: 100%;
    }

    :deep(.el-checkbox__label) {
        width: 100%;
    }
</style>
