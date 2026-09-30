<template>
    <div class="main-container">
        <div class="page-card">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" @click="addEvent">{{ t('addStorageConfig') }}</el-button>
            </div>

            <div class="mt-[20px]" v-loading="loading">
                <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[12px]" v-if="configList.length">
                    <div v-for="item in configList" :key="item.id" class="storage-card" :class="{ 'is-active': item.is_use == 1 }">
                        <div class="flex justify-between items-center">
                            <div class="flex-1 mr-[8px] min-w-0">
                                <div class="flex items-center min-w-0">
                                    <span class="text-[14px] font-bold leading-[20px] truncate" :title="item.name">{{ item.name }}</span>
                                    <el-tooltip v-if="isConfigIncomplete(item)" placement="top"
                                                :content="t('storageConfigMissingTips') + (item.missing_params || []).join('、')">
                                        <el-tag type="warning" size="small" class="ml-[6px] shrink-0">{{ t('notConfigured') }}</el-tag>
                                    </el-tooltip>
                                </div>
                            </div>
                            <el-tooltip :disabled="!isConfigIncomplete(item)" :content="t('storageConfigNotCompleteTips')" placement="top">
                                <span class="inline-flex shrink-0">
                                    <el-switch v-model="item.is_use" :active-value="1" :inactive-value="0"
                                               :disabled="isSwitchDisabled(item)"
                                               :before-change="() => beforeChangeUse(item)"/>
                                </span>
                            </el-tooltip>
                        </div>

                        <div class="mb-[8px] mt-[4px] min-h-[56px]">
                            <div v-if="item.is_local" class="text-[12px] leading-[18px] text-[var(--el-text-color-secondary)]">
                                {{ localDesc }}
                            </div>
                            <template v-else>
                                <div v-for="(param, key) in item.params" :key="key" class="flex text-[12px] leading-[18px]">
                                    <span class="w-[72px] shrink-0 text-[var(--el-text-color-secondary)] truncate">{{ param.name }}：</span>
                                    <span class="flex-1 min-w-0 break-all">{{ param.value || '-' }}</span>
                                </div>
                            </template>
                        </div>

                        <div v-if="!item.is_local" class="mt-[auto] pt-[10px] border-t border-solid border-[var(--el-border-color-lighter)] flex justify-end items-center">
                            <el-button type="primary" link size="small" @click="editEvent(item)">{{ t('config') }}</el-button>
                            <el-button class="table-delete" link size="small" v-if="item.is_use != 1" @click="deleteEvent(item)">{{ t('delete') }}</el-button>
                        </div>
                    </div>
                </div>

                <div v-else-if="!loading" class="py-[40px] text-center text-[var(--el-text-color-secondary)]">{{ t('emptyData') }}</div>
            </div>

        </div>

        <el-dialog v-model="showDialog" :title="dialogTitle" width="900px" :destroy-on-close="true">
            <div class="flex items-stretch min-h-[420px]">
                <!-- 左侧：存储方式列表 -->
                <div class="storage-type-panel">
                    <template v-if="!isEdit">
                        <div v-for="item in typeList" :key="item.storage_type"
                             class="storage-type-item" :class="{ 'is-active': formData.storage_type == item.storage_type }"
                             @click="selectType(item)">
                            <el-icon class="storage-type-icon">
                                <component :is="typeIcon(item.storage_type)"/>
                            </el-icon>
                            <div class="flex-1 min-w-0 ml-[10px]">
                                <div class="text-[13px] font-bold leading-[20px] truncate">{{ item.name }}</div>
                            </div>
                            <el-icon class="shrink-0 text-[var(--el-text-color-placeholder)]">
                                <ArrowRight/>
                            </el-icon>
                        </div>
                    </template>
                    <div v-else class="storage-type-item is-active">
                        <el-icon class="storage-type-icon">
                            <component :is="typeIcon(formData.storage_type)"/>
                        </el-icon>
                        <div class="flex-1 min-w-0 ml-[10px]">
                            <div class="flex items-center min-w-0">
                                <span class="text-[13px] font-bold leading-[20px] truncate">{{ currentTypeName }}</span>
                                <el-tag v-if="editConfigStatus" :type="editConfigStatus.type" size="small" class="ml-[6px] shrink-0">{{ editConfigStatus.text }}</el-tag>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 右侧：该存储方式的配置表单 -->
                <div class="flex-1 min-w-0 pl-[16px]">
                    <!-- 头部：存储方式名称与状态 -->
                    <div class="flex justify-between items-start pb-[12px] mb-[16px] border-b border-solid border-[var(--el-border-color-lighter)]">
                        <div class="min-w-0">
                            <div class="text-[16px] font-bold leading-[24px] truncate">{{ currentTypeName || t('storageTypePlaceholder') }}</div>
                        </div>
                        <el-tag v-if="isEdit && editConfigStatus" :type="editConfigStatus.type" size="small" class="shrink-0 ml-[10px]">{{ editConfigStatus.text }}</el-tag>
                        <el-tag v-else-if="!isEdit" type="warning" size="small" class="shrink-0 ml-[10px]">{{ t('notConfigured') }}</el-tag>
                    </div>

                    <el-form label-position="top">
                        <el-form-item :label="t('configName')">
                            <el-input v-model.trim="formData.name" :placeholder="t('configNamePlaceholder')" maxlength="50" show-word-limit clearable/>
                        </el-form-item>
                    </el-form>

                    <!-- 各存储方式各自的配置表单（由存储类型返回的组件） -->
                    <component v-if="currentComponent" :is="currentComponent" :key="formData.storage_type" ref="typeFormRef"
                               inline :config-data="currentConfigData"/>
                    <div v-else class="py-[30px] text-center text-[var(--el-text-color-secondary)]">{{ t('storageTypePlaceholder') }}</div>
                </div>
            </div>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" :loading="submitLoading" @click="confirm">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router'
import {
    getStorageList,
    getStorageConfigList,
    addStorageConfig,
    editStorageConfig,
    useStorageConfig,
    deleteStorageConfig
} from '@/app/api/sys'
import { resolveAsyncComponent } from '@/utils/core-component-resolver'
import { Monitor, Files, Cloudy, PartlyCloudy, MostlyCloudy, ArrowRight } from '@element-plus/icons-vue'
import storage from '@/utils/storage'

const route = useRoute()
const pageName = route.meta.title

const loading = ref(true)
const submitLoading = ref(false)
const configList = ref<any[]>([])
const typeList = ref<any[]>([])
const showDialog = ref(false)
const isEdit = ref(false)
const editId = ref<number | string>('')
//存储方式配置表单组件实例
const typeFormRef = ref<any>(null)
//内嵌配置表单的初始数据（编辑时使用）
const currentConfigData = ref<any>(null)

/**
 * 通用表单数据
 */
const formData: Record<string, any> = reactive({
    storage_type: '',
    name: ''
})

const dialogTitle = computed(() => isEdit.value ? t('editStorageConfig') : t('addStorageConfig'))

//当前存储方式对应的配置表单组件
const currentComponent = computed(() => {
    const type = typeList.value.find((item: any) => item.storage_type == formData.storage_type)
    return type ? type.component : null
})

//当前存储方式名称（编辑时左侧展示）
const currentTypeName = computed(() => {
    const type = typeList.value.find((item: any) => item.storage_type == formData.storage_type)
    return type ? type.name : formData.storage_type
})

//存储方式图标（按类型映射，未识别的使用默认图标）
const typeIconMap: Record<string, any> = {
    local: Monitor,
    qiniu: Files,
    aliyun: Cloudy,
    tencent: PartlyCloudy,
    huaweicloud: MostlyCloudy
}
const typeIcon = (storage_type: string) => typeIconMap[storage_type] || Cloudy

//是否平台端（总后台）
const isPlatform = computed(() => Number(storage.get('siteId') || 0) === 0)

//本地存储说明：平台端为服务器本地磁盘，站点端为回退使用平台配置
const localDesc = computed(() => isPlatform.value ? t('localStorageTips') : t('localStorageTipsForSite'))

//存储方式描述（本地存储沿用平台/站点说明，云存储使用各自的描述）
const typeDescMap: Record<string, string> = {
    qiniu: 'qiniuStorageDesc',
    aliyun: 'aliStorageDesc',
    tencent: 'tencentStorageDesc',
    huaweicloud: 'huaweiStorageDesc'
}
const typeDesc = (storageType: string, isLocal: boolean) => {
    if (isLocal) return localDesc.value
    const key = typeDescMap[storageType]
    if (key) return t(key)
    const name = typeList.value.find((item: any) => item.storage_type == storageType)?.name || ''
    return t('storageTypeDesc').replace('{name}', name)
}

type TagType = 'success' | 'warning' | 'info' | 'danger' | 'primary'

//编辑时当前配置的状态
const editConfigStatus = computed<{ text: string, type: TagType } | null>(() => {
    const item = currentConfigData.value
    if (!item) return null
    if (item.is_use == 1) return { text: t('inUse'), type: 'success' }
    if (item.is_complete != 1) return { text: t('notConfigured'), type: 'warning' }
    return { text: t('configured'), type: 'info' }
})

/**
 * 获取存储方式列表（配置表单组件由存储方式定义返回）
 */
const loadTypeList = () => {
    getStorageList().then(({ data }) => {
        typeList.value = (data || [])
            .filter((item: any) => item.storage_type != 'local')
            .map((item: any) => ({
                ...item,
                component: item.component ? resolveAsyncComponent(item.component) : null
            }))
    })
}

/**
 * 获取配置列表
 */
const loadConfigList = () => {
    loading.value = true
    getStorageConfigList().then(({ data }) => {
        //接口返回的启用状态为字符串，统一转为数字，避免开关严格比较时状态显示不正确
        configList.value = (data || []).map((item: any) => ({
            ...item,
            is_use: Number(item.is_use),
            is_local: Number(item.is_local),
            is_complete: Number(item.is_complete)
        }))
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}

loadTypeList()
loadConfigList()

/**
 * 选择存储方式
 * @param item
 */
const selectType = (item: any) => {
    if (formData.storage_type == item.storage_type) return
    formData.storage_type = item.storage_type
    currentConfigData.value = null
}

/**
 * 新增配置
 */
const addEvent = () => {
    isEdit.value = false
    editId.value = ''
    formData.name = ''
    currentConfigData.value = null
    //默认选中第一个存储方式
    formData.storage_type = typeList.value[0]?.storage_type || ''
    showDialog.value = true
}

/**
 * 编辑配置
 * @param row
 */
const editEvent = (row: any) => {
    isEdit.value = true
    editId.value = row.id
    formData.name = row.name
    formData.storage_type = row.storage_type
    currentConfigData.value = row
    showDialog.value = true
}

/**
 * 确认保存
 */
const confirm = async () => {
    const formInstance = typeFormRef.value
    if (!formInstance) {
        ElMessage.warning(t('storageTypePlaceholder'))
        return
    }
    const valid = await formInstance.validate()
    if (!valid) return
    const typeData = formInstance.getFormData() || {}
    const params: Record<string, any> = {
        storage_type: formData.storage_type,
        name: formData.name
    }
    Object.keys(typeData).forEach((key: string) => {
        if (key == 'storage_type' || key == 'is_use') return
        params[key] = typeData[key]
    })
    submitLoading.value = true
    const request = isEdit.value ? editStorageConfig(editId.value, params) : addStorageConfig(params)
    request.then(() => {
        submitLoading.value = false
        showDialog.value = false
        loadConfigList()
    }).catch(() => {
        submitLoading.value = false
    })
}

/**
 * 配置是否未完善（接口未返回完善状态时不做判断，由服务端校验兜底）
 * @param item
 */
const isConfigIncomplete = (item: any) => {
    if (item.is_local) return false
    if (item.is_complete === undefined || item.is_complete === null || Number.isNaN(item.is_complete)) return false
    return item.is_complete != 1
}

/**
 * 开关是否禁用（本地存储启用后不可关闭；未完善的配置不可启用）
 * @param item
 */
const isSwitchDisabled = (item: any) => {
    if (item.is_local) return item.is_use == 1
    return isConfigIncomplete(item)
}

/**
 * 启停开关切换（开启：启用该配置；关闭：切换回本地（默认）存储）
 * @param row
 * @returns Promise<boolean>
 */
const beforeChangeUse = (row: any): Promise<boolean> => {
    //开启
    if (row.is_use != 1) {
        return new Promise((resolve) => {
            useStorageConfig(row.id).then(() => {
                loadConfigList()
                resolve(true)
            }).catch(() => {
                resolve(false)
            })
        })
    }
    //关闭（全局唯一启用，关闭即回退本地存储）
    return new Promise((resolve) => {
        ElMessageBox.confirm(t('disableStorageConfigTips'), t('warning'), {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }).then(() => {
            useStorageConfig('local').then(() => {
                loadConfigList()
                resolve(true)
            }).catch(() => {
                resolve(false)
            })
        }).catch(() => {
            resolve(false)
        })
    })
}

/**
 * 删除配置
 * @param row
 */
const deleteEvent = (row: any) => {
    ElMessageBox.confirm(t('storageConfigDeleteTips'), t('warning'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning'
    }).then(() => {
        deleteStorageConfig(row.id).then(() => {
            loadConfigList()
        })
    }).catch(() => {
    })
}
</script>

<style lang="scss" scoped>
/* 页面容器：与站点列表一致的白底卡片（圆角、边框、内边距） */
.page-card {
    box-sizing: border-box;
    padding: var(--sys-space-4);
    background-color: var(--cmp-card-bg);
    border: 1px solid var(--sys-color-border-default);
    border-radius: var(--sys-radius-lg);
}

/* 存储配置卡片：圆角、白底、内边距与悬浮动效与站点列表卡片保持一致 */
.storage-card {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    padding: 10px var(--cmp-module-card-padding);
    overflow: hidden;
    background-color: var(--cmp-module-card-bg);
    border: var(--cmp-module-card-border-width) solid var(--cmp-module-card-border-color);
    border-radius: var(--cmp-module-card-radius);
    transition: border-color .2s, box-shadow .2s, transform .2s;

    &:hover {
        border-color: var(--cmp-module-card-hover-border-color);
        box-shadow: var(--cmp-module-card-hover-shadow);
        transform: translateY(var(--cmp-module-card-hover-offset));
    }

    &.is-active {
        border-color: var(--sys-color-primary);
    }

    :deep(.el-button.table-delete.is-link:not(.is-disabled)) {
        color: var(--sys-color-danger);

        &:hover,
        &:focus {
            color: var(--sys-color-danger);
        }
    }
}

//左侧存储方式列表
.storage-type-panel {
    width: 190px;
    flex-shrink: 0;
    padding-right: 12px;
    border-right: 1px solid var(--el-border-color-lighter);
    overflow-y: auto;
}

.storage-type-item {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 8px;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: var(--cmp-control-radius);
    cursor: pointer;
    transition: all .2s;
    height: 55px;

    &:hover {
        border-color: var(--el-color-primary-light-5);
    }

    &.is-active {
        border-color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
    }
}

.storage-type-icon {
    font-size: 20px;
    color: var(--el-color-primary);
}
</style>
