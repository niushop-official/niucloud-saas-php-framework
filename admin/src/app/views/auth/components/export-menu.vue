<template>
    <el-dialog v-model="showDialog" :title="t('exportMenu')" width="520px" :destroy-on-close="true" @open="onOpen">
        <el-form label-width="90px">
            <el-form-item :label="t('exportMenuScope')">
                <el-checkbox v-model="exportSystem">{{ t('exportMenuSystem') }}</el-checkbox>
            </el-form-item>

            <el-form-item v-if="addonOptions.length" :label="t('exportMenuApp')">
                <div class="addon-panel">
                    <div class="addon-panel__header">
                        <el-checkbox
                            v-model="checkAll"
                            :indeterminate="isIndeterminate"
                            @change="handleCheckAllChange"
                        >{{ t('exportMenuSelectAll') }}</el-checkbox>
                        <el-button link type="primary" @click="clearAddons">{{ t('exportMenuClear') }}</el-button>
                    </div>
                    <el-checkbox-group v-model="exportAddons" class="addon-panel__list" @change="handleCheckedChange">
                        <el-checkbox v-for="item in addonOptions" :key="item.key" :label="item.key">
                            {{ item.title }}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-form-item>
        </el-form>

        <div v-if="!exportSystem && !exportAddons.length" class="text-[12px] text-[var(--el-color-danger)]">
            {{ t('exportMenuScopeRequired') }}
        </div>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" :disabled="!exportSystem && !exportAddons.length"
                           @click="submitEvent">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { t } from '@/lang'
import { ElMessage } from 'element-plus'
import { getAddonDevelop } from '@/app/api/tools'
import { exportMenu } from '@/app/api/sys'
import { downloadBlob } from '@/utils/download'

const props = defineProps({
    appType: {
        type: String,
        default: 'admin'
    },
    // 当前页面的菜单树，用于提取可选的应用
    menus: {
        type: Array,
        default: () => []
    }
})

const showDialog = ref(false)
const loading = ref(false)
const exportSystem = ref(true)
const exportAddons = ref<string[]>([])
const addonOptions = ref<Array<{ key: string, title: string }>>([])
const checkAll = ref(false)

const isIndeterminate = computed(() => {
    const len = exportAddons.value.length
    return len > 0 && len < addonOptions.value.length
})

/**
 * 从菜单树中提取实际存在的应用
 * @param list
 * @param keys
 */
const collectAddonKeys = (list: any[], keys: string[]) => {
    list.forEach((item: any) => {
        if (item?.addon && !keys.includes(item.addon)) keys.push(item.addon)
        if (Array.isArray(item?.children) && item.children.length) collectAddonKeys(item.children, keys)
    })
}

/**
 * 同步全选状态
 */
const syncCheckAll = () => {
    const total = addonOptions.value.length
    const selected = exportAddons.value.length
    checkAll.value = total > 0 && selected === total
}

/**
 * 全选切换
 * @param val
 */
const handleCheckAllChange = (val: boolean | string | number) => {
    exportAddons.value = val ? addonOptions.value.map(item => item.key) : []
}

/**
 * 单项勾选变化
 */
const handleCheckedChange = () => {
    syncCheckAll()
}

/**
 * 清空应用勾选
 */
const clearAddons = () => {
    exportAddons.value = []
    checkAll.value = false
}

/**
 * 打开弹窗时初始化导出范围（默认全选，与"导出全部"行为一致）
 */
const onOpen = async () => {
    const keys: string[] = []
    collectAddonKeys(props.menus as any[], keys)

    const titleMap: Record<string, string> = {}
    if (keys.length) {
        try {
            const res: any = await getAddonDevelop({})
            ;(res?.data || []).forEach((item: any) => {
                if (item?.key) titleMap[item.key] = item.title || item.key
            })
        } catch (e) {
        }
    }
    addonOptions.value = keys.map(key => ({ key, title: titleMap[key] || key }))
    exportSystem.value = true
    exportAddons.value = addonOptions.value.map(item => item.key)
    syncCheckAll()
}

/**
 * 生成导出文件名：menu_{端类型}_{时间}.json（与后端保持一致）
 */
const buildFileName = () => {
    const d = new Date()
    const pad = (n: number) => `${ n }`.padStart(2, '0')
    const time = `${ d.getFullYear() }${ pad(d.getMonth() + 1) }${ pad(d.getDate()) }${ pad(d.getHours()) }${ pad(d.getMinutes()) }${ pad(d.getSeconds()) }`
    return `menu_${ props.appType }_${ time }.json`
}

/**
 * 导出
 */
const submitEvent = () => {
    if (loading.value) return
    if (!exportSystem.value && !exportAddons.value.length) {
        ElMessage.error(t('exportMenuScopeRequired'))
        return
    }

    const addons: string[] = exportSystem.value ? [ '' ] : []
    addons.push(...exportAddons.value)

    loading.value = true
    exportMenu(props.appType, addons).then(async (blob: any) => {
        // 下载成功才关闭弹窗并提示，失败时 downloadBlob 内部已给出错误提示
        const success = await downloadBlob(blob, buildFileName())
        if (success) {
            showDialog.value = false
            ElMessage.success(t('exportMenuSuccess'))
        }
    }).catch(() => {
    }).finally(() => {
        loading.value = false
    })
}

defineExpose({
    showDialog
})
</script>

<style lang="scss" scoped>
.addon-panel {
    width: 100%;
    border: 1px solid var(--cmp-module-card-border-color);
    border-radius: var(--cmp-control-radius);
    overflow: hidden;
}

.addon-panel__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-bottom: 1px solid var(--cmp-form-section-header-border);
}

.addon-panel__list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px 16px;
    max-height: 260px;
    padding: 12px;
    overflow-y: auto;

    :deep(.el-checkbox) {
        margin-right: 0;
        height: auto;
        white-space: normal;
        align-items: flex-start;

        .el-checkbox__label {
            // line-height: 20px;
            word-break: break-all;
        }
    }
}
</style>
