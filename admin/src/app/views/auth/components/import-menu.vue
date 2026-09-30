<template>
    <el-dialog v-model="showDialog" :title="t('importMenu')" width="760px" :destroy-on-close="true"
               :close-on-click-modal="!loading" @closed="reset">
        <!-- 导入中遮罩：接口耗时较长（逐条写库），给明确的等待反馈 -->
        <div v-loading="loading" :element-loading-text="t('importMenuImporting')" class="import-body">
            <el-scrollbar class="import-scrollbar">
                <div class="import-body__inner">
            <!-- 上传 + 预览（同一卡片） -->
            <div class="import-card import-file-card">
                <el-upload
                    ref="uploadRef"
                    class="w-full import-upload"
                    drag
                    :auto-upload="false"
                    :limit="1"
                    :show-file-list="false"
                    accept=".json"
                    :on-change="onFileChange"
                    :on-remove="onFileRemove"
                    :on-exceed="onExceed"
                >
                    <div class="upload-body">
                        <div class="upload-actions">
                            <el-button type="primary" class="upload-badge">{{ t('importMenuLocalUpload') }}</el-button>
                        </div>
                        <div class="upload-info">
                            <template v-if="!file">
                                <div class="upload-title">{{ t('importMenuUploadTitle') }}</div>
                                <div class="upload-desc">
                                    {{ t('importMenuUploadDesc') }}<template v-if="limitText">{{ t('importMenuUploadLimitInline') }}{{ limitText }}</template>
                                </div>
                                <div class="upload-tip">{{ limitAdjustTip }}</div>
                            </template>
                            <template v-else>
                                <div class="upload-title">{{ file?.name }}</div>
                                <div class="upload-desc">{{ formatSize(file?.size ?? 0) }} · {{ t('importMenuReplaceTips') }}</div>
                            </template>
                        </div>
                        <el-button v-if="file" link class="upload-remove" @click.stop="removeFile">{{ t('importMenuRemoveFile') }}</el-button>
                    </div>
                </el-upload>

                <div v-if="fileTooLarge" class="file-too-large">
                    {{ tooLargeTip }}
                </div>

                <!-- 文件预览（纯前端解析，默认收起，可点击标题栏展开/收起） -->
                <template v-if="file">
                    <div class="file-card-divider"></div>
                    <div class="preview-header" @click="togglePreview">
                        <span class="preview-title">
                            <el-icon class="preview-arrow" :class="{ 'is-open': showPreview }">
                                <ArrowRight />
                            </el-icon>
                            {{ t('importMenuPreview') }}
                        </span>
                        <span v-if="previewLoading || previewRendering" class="preview-brief">
                            {{ t('importMenuPreviewParsing') }}
                        </span>
                        <span v-else-if="!previewError && !showPreview" class="preview-brief">
                            {{ t('importMenuPreviewTotal') }}：{{ previewStats.total }}
                        </span>
                    </div>

                    <div v-if="showPreview" v-loading="previewLoading || previewRendering" class="preview-body">
                        <div v-if="previewError" class="preview-error">{{ previewError }}</div>

                        <template v-else>
                            <div class="preview-stats">
                                <span class="preview-stat">{{ t('importMenuPreviewTotal') }}：{{ previewStats.total }}</span>
                                <span class="preview-stat">{{ t('menuTypeDir') }}：{{ previewStats.dir }}</span>
                                <span class="preview-stat">{{ t('menuTypeMenu') }}：{{ previewStats.menu }}</span>
                                <span class="preview-stat">{{ t('menuTypeButton') }}：{{ previewStats.button }}</span>
                            </div>

                            <div class="preview-apps">
                                <span class="preview-app-label">{{ t('importMenuPreviewApp') }}：</span>
                                <div class="preview-app-list">
                                    <el-tag v-if="previewStats.hasSystem" size="small" type="info">
                                        {{ t('exportMenuSystem') }}
                                    </el-tag>
                                    <el-tag v-for="addon in previewStats.addons" :key="addon" size="small">
                                        {{ addon }}
                                    </el-tag>
                                    <span v-if="!previewStats.hasSystem && !previewStats.addons.length" class="preview-stat">-</span>
                                </div>
                            </div>

                            <el-table :data="previewMenus" row-key="__key" size="small" max-height="240"
                                      :tree-props="{ children: 'children' }" class="preview-table">
                                <el-table-column prop="menu_name" :label="t('menuName')" min-width="160" />
                                <el-table-column :label="t('menuType')" width="70" align="center">
                                    <template #default="{ row }">
                                        <el-tag size="small" :type="menuTypeTag(row.menu_type)">{{ menuTypeText(row.menu_type) }}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="menu_key" :label="t('menuKey')" min-width="140" />
                                <el-table-column prop="api_url" :label="t('authId')" min-width="140" />
                                <el-table-column :label="t('addon')" width="110">
                                    <template #default="{ row }">{{ row.addon || t('exportMenuSystem') }}</template>
                                </el-table-column>
                            </el-table>

                            <div v-if="previewTruncated" class="preview-tip">{{ t('importMenuPreviewTruncated') }}</div>
                        </template>
                    </div>
                </template>
            </div>

            <!-- 覆盖同名菜单 -->
            <div class="import-card overwrite-row">
                <div class="overwrite-row__text">
                    <div class="overwrite-row__title">{{ t('importMenuOverwrite') }}</div>
                    <div class="overwrite-row__desc">{{ t('importMenuOverwriteTips') }}</div>
                </div>
                <el-switch v-model="overwrite" />
            </div>

            <!-- 导入结果 -->
            <div v-if="result" class="import-card import-result">
                <div class="result-header">
                    <span class="result-title">{{ t('importMenuResult') }}</span>
                    <span class="result-status" :class="result.fail ? 'is-danger' : 'is-success'">
                        {{ result.fail ? t('importMenuHasFail') : t('importMenuDone') }}
                    </span>
                </div>

                <div class="legend">
                    <span class="legend__item">{{ t('importMenuTotal') }} {{ result.total }}</span>
                    <span class="legend__item">{{ t('importMenuInsert') }} {{ result.insert }}</span>
                    <span class="legend__item">{{ t('importMenuSkip') }} {{ result.skip }}</span>
                    <span class="legend__item" :class="{ 'is-fail': result.fail }">{{ t('importMenuFail') }} {{ result.fail }}</span>
                </div>

                <!-- 占比进度条：成功段（紫）+ 失败段（灰） -->
                <div class="ratio-bar">
                    <div v-for="seg in resultSegments" :key="seg.key" class="ratio-bar__seg"
                         :class="`seg--${ seg.key }`" :style="{ width: seg.width }"></div>
                </div>

                <!-- 失败明细 -->
                <template v-if="result.fail_list && result.fail_list.length">
                    <div class="section-head">
                        <span class="section-head__title">{{ t('importMenuFailList') }}</span>
                        <span class="section-head__meta">
                            {{ t('importMenuFail') }} {{ result.fail }} {{ t('importMenuUnit') }}
                            · {{ t('importMenuFailRatio') }} {{ failRatioText }}%
                        </span>
                    </div>

                    <div class="failure-list">
                        <el-scrollbar max-height="240px">
                            <div v-for="(item, index) in result.fail_list" :key="index" class="failure-list__row">
                                <div class="failure-list__name" :title="item.menu_name || item.menu_key">
                                    {{ item.menu_name || item.menu_key || '-' }}
                                </div>
                                <span class="failure-list__reason">{{ item.reason }}</span>
                            </div>
                        </el-scrollbar>
                    </div>
                </template>
            </div>
                </div>
            </el-scrollbar>
        </div>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="submitEvent">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed, nextTick } from 'vue'
import { t } from '@/lang'
import { ElMessage } from 'element-plus'
import type { UploadFile, UploadInstance, UploadRawFile } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import { importMenu, getMenuImportConfig } from '@/app/api/sys'

const props = defineProps({
    appType: {
        type: String,
        default: 'admin'
    }
})

const emit = defineEmits(['complete'])

const showDialog = ref(false)
const loading = ref(false)
const overwrite = ref(false)
const uploadRef = ref<UploadInstance>()
const file = ref<UploadRawFile | null>(null)
const result = ref<Record<string, any> | null>(null)

/**
 * 导入结果各状态占比（成功合并为一段绿色，失败红色）
 */
const resultSegments = computed(() => {
    const res = result.value || {}
    const total = Number(res.total || 0)
    if (!total) return []
    const ok = Number(res.insert || 0) + Number(res.update || 0) + Number(res.skip || 0)
    const fail = Number(res.fail || 0)
    const segments = [
        { key: 'ok', value: ok },
        { key: 'fail', value: fail }
    ]
    return segments
        .filter(item => item.value > 0)
        .map(item => ({ key: item.key, width: `${ (item.value / total) * 100 }%` }))
})

/**
 * 失败占比（百分比，保留一位小数）
 */
const failRatioText = computed(() => {
    const res = result.value || {}
    const total = Number(res.total || 0)
    const fail = Number(res.fail || 0)
    return total > 0 ? ((fail / total) * 100).toFixed(1) : '0.0'
})

// 导入文件业务上限（2M），与后端 IMPORT_FILE_MAX_BYTE 保持一致
const IMPORT_MAX_BYTE = 2 * 1024 * 1024
// 生效上传上限（字节）：PHP 限制更大时取 2M，更小时取 PHP 限制
const uploadLimit = ref(IMPORT_MAX_BYTE)
// 上限是否来自 PHP 配置（false 表示受业务上限限制）
const limitFromPhp = ref(false)
// 上传限制配置是否已加载
const limitConfigLoaded = ref(false)
const fileTooLarge = ref(false)

// 文件预览（纯前端解析，不调接口）
const PREVIEW_MAX = 2000
// 预览默认收起，由用户点击标题栏切换
const showPreview = ref(false)
const previewLoading = ref(false)
// 展开预览时的渲染过渡
const previewRendering = ref(false)
const previewMenus = ref<any[]>([])
const previewError = ref('')
const previewTruncated = ref(false)
const emptyPreviewStats = () => ({ total: 0, dir: 0, menu: 0, button: 0, addons: [] as string[], hasSystem: false })
const previewStats = ref(emptyPreviewStats())

/**
 * 字节数格式化
 * @param bytes
 */
const formatSize = (bytes: number) => {
    if (!bytes) return '-'
    if (bytes >= 1024 * 1024 * 1024) return `${ (bytes / 1024 / 1024 / 1024).toFixed(2) } GB`
    if (bytes >= 1024 * 1024) return `${ (bytes / 1024 / 1024).toFixed(2) } MB`
    if (bytes >= 1024) return `${ (bytes / 1024).toFixed(2) } KB`
    return `${ bytes } B`
}

/**
 * 上传上限文案
 */
const limitText = computed(() => formatSize(uploadLimit.value))

/**
 * 上限调整提示：受 PHP 配置限制时提示改 php.ini，否则提示拆分文件
 */
const limitAdjustTip = computed(() => t(limitFromPhp.value ? 'importMenuLimitAdjustPhp' : 'importMenuLimitAdjustSplit'))

/**
 * 文件超限提示
 */
const tooLargeTip = computed(() => t(limitFromPhp.value ? 'importMenuFileTooLarge' : 'importMenuFileOverMax'))

/**
 * 菜单类型文案
 * @param type
 */
const menuTypeText = (type: string) => {
    if (type === '0') return t('menuTypeDir')
    if (type === '1') return t('menuTypeMenu')
    if (type === '2') return t('menuTypeButton')
    return t('menuType')
}

/**
 * 菜单类型标签配色
 * @param type
 */
const menuTypeTag = (type: string): 'primary' | 'success' | 'warning' | 'info' | 'danger' => {
    if (type === '0') return 'info'
    if (type === '2') return 'warning'
    return 'success'
}

/**
 * 清空预览
 */
const clearPreview = () => {
    previewMenus.value = []
    previewError.value = ''
    previewTruncated.value = false
    previewStats.value = emptyPreviewStats()
}

/**
 * 统计整棵菜单树（用于预览摘要）
 * @param list
 * @param stats
 */
const collectPreviewStats = (list: any[], stats: ReturnType<typeof emptyPreviewStats>) => {
    list.forEach((item: any) => {
        if (!item || typeof item !== 'object') return

        stats.total++
        const type = String(item.menu_type ?? '')
        if (type === '0') stats.dir++
        else if (type === '1') stats.menu++
        else if (type === '2') stats.button++

        const addon = `${ item.addon ?? '' }`
        if (addon === '') {
            stats.hasSystem = true
        } else if (!stats.addons.includes(addon)) {
            stats.addons.push(addon)
        }

        if (Array.isArray(item.children) && item.children.length) collectPreviewStats(item.children, stats)
    })
}

/**
 * 构建预览节点：生成合成唯一键，并按上限深度优先截断
 * @param list
 * @param limit
 * @param counter
 * @param path
 */
const buildPreviewTree = (list: any[], limit: number, counter: { count: number }, path = ''): any[] => {
    const resultList: any[] = []
    list.forEach((item: any, index: number) => {
        if (counter.count >= limit || !item || typeof item !== 'object') return

        counter.count++
        const node: Record<string, any> = {
            __key: `${ path }/${ index }-${ item.menu_key ?? '' }`,
            menu_name: `${ item.menu_name ?? '' }`,
            menu_type: String(item.menu_type ?? ''),
            menu_key: `${ item.menu_key ?? '' }`,
            api_url: `${ item.api_url ?? '' }`,
            addon: `${ item.addon ?? '' }`
        }
        if (Array.isArray(item.children) && item.children.length) {
            node.children = buildPreviewTree(item.children, limit, counter, node.__key)
        }
        resultList.push(node)
    })
    return resultList
}

/**
 * 解析选中文件并生成预览（纯前端，不调接口）
 */
const parsePreview = async () => {
    clearPreview()
    if (!file.value) return

    previewLoading.value = true
    try {
        const text = await file.value.text()
        let data: any = null
        try {
            data = JSON.parse(text)
        } catch (e) {
            previewError.value = t('importMenuPreviewInvalid')
            return
        }
        if (!Array.isArray(data)) {
            previewError.value = t('importMenuPreviewInvalid')
            return
        }
        if (!data.length) {
            previewError.value = t('importMenuPreviewEmpty')
            return
        }

        const stats = emptyPreviewStats()
        collectPreviewStats(data, stats)
        previewStats.value = stats

        const counter = { count: 0 }
        previewMenus.value = buildPreviewTree(data, PREVIEW_MAX, counter)
        previewTruncated.value = stats.total > PREVIEW_MAX
    } catch (e) {
        previewError.value = t('importMenuPreviewInvalid')
    } finally {
        previewLoading.value = false
    }
}

/**
 * 展开/收起预览
 * 展开前先让出一帧渲染出 loading 遮罩，避免大表格渲染时界面无反馈
 */
const togglePreview = async () => {
    if (showPreview.value) {
        showPreview.value = false
        return
    }
    previewRendering.value = true
    // 双 rAF 确保 loading 遮罩已绘制后再渲染表格
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    showPreview.value = true
    await nextTick()
    previewRendering.value = false
}

/**
 * 获取PHP上传限制配置
 */
const getImportConfigFn = () => {
    if (limitConfigLoaded.value) return
    getMenuImportConfig().then((res: any) => {
        const data = res?.data || {}
        const phpLimit = Number(data.max_upload_byte || 0)
        // 优先取后端计算的 limit_byte；接口未返回该字段时前端兜底按 min(2M, PHP限制) 计算
        const limit = Number(data.limit_byte || 0) || Math.min(phpLimit > 0 ? phpLimit : IMPORT_MAX_BYTE, IMPORT_MAX_BYTE)
        if (limit > 0) uploadLimit.value = limit
        limitFromPhp.value = data.limit_source
            ? data.limit_source === 'php'
            : (phpLimit > 0 && phpLimit < IMPORT_MAX_BYTE)
        limitConfigLoaded.value = true
    }).catch(() => {
    })
}

watch(showDialog, (val) => {
    if (val) getImportConfigFn()
})

const onFileChange = async (uploadFile: UploadFile) => {
    result.value = null
    file.value = uploadFile.raw || null
    fileTooLarge.value = false
    if (file.value && file.value.size > uploadLimit.value) {
        fileTooLarge.value = true
        ElMessage.error(tooLargeTip.value)
    }
    await parsePreview()
}

const onFileRemove = () => {
    file.value = null
    fileTooLarge.value = false
    showPreview.value = false
    clearPreview()
}

// 移除已选文件，重新选择
const removeFile = () => {
    file.value = null
    result.value = null
    fileTooLarge.value = false
    showPreview.value = false
    clearPreview()
    uploadRef.value?.clearFiles()
}

// 只允许保留一个文件，超出时替换
const onExceed = (files: File[]) => {
    uploadRef.value?.clearFiles()
    const raw = files[0]
    if (raw) uploadRef.value?.handleStart(raw as UploadRawFile)
}

const reset = () => {
    loading.value = false
    overwrite.value = false
    file.value = null
    result.value = null
    fileTooLarge.value = false
    showPreview.value = false
    clearPreview()
    uploadRef.value?.clearFiles()
}

/**
 * 提交导入
 */
const submitEvent = () => {
    if (loading.value) return
    if (!file.value) {
        ElMessage.error(t('importMenuFileRequired'))
        return
    }
    if (fileTooLarge.value) {
        ElMessage.error(t('importMenuFileTooLarge'))
        return
    }

    // 开始导入后自动收起预览
    showPreview.value = false

    const data = new FormData()
    data.append('file', file.value)
    data.append('overwrite', overwrite.value ? '1' : '0')

    loading.value = true
    importMenu(props.appType, data).then((res: any) => {
        loading.value = false
        result.value = res.data || null
        emit('complete')
    }).catch(() => {
        loading.value = false
    })
}

defineExpose({
    showDialog
})
</script>

<style lang="scss" scoped>
.import-body {
    padding: 4px 0;
}

.import-scrollbar {
    :deep(.el-scrollbar__wrap) {
        max-height: min(60vh, calc(100vh - 300px));
    }
}

.import-body__inner {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-right: 12px;
}

.import-card {
    padding: 16px 18px;
    border-radius: 12px;
    border: var(--border-default);
}

.import-file-card {
    .file-too-large {
        margin-top: 8px;
        font-size: 12px;
        color: #ef4444;
    }

    .file-card-divider {
        height: 1px;
        margin: 14px 0;
        background: #e8e8eb;
    }

    .preview-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        user-select: none;
    }

    .preview-title {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.4;
        color: #1f2329;
    }
    .preview-arrow {
        font-size: 12px;
        margin-bottom: 2px;
        color: #1f2329;
    }

    .preview-icon {
        font-size: 15px;
        color: #1f2329;
    }

    .preview-brief {
        font-size: 12px;
        line-height: 1.4;
        color: #909399;
    }

    .preview-body {
        padding-top: 12px;
    }

    .preview-stats {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    .preview-stat {
        font-size: 12px;
        color: #909399;
    }

    .preview-apps {
        display: flex;
        align-items: flex-start;
        margin-top: 8px;
    }

    .preview-app-label {
        flex: none;
        margin-right: 4px;
        font-size: 12px;
        line-height: 24px;
        color: #909399;
    }

    .preview-app-list {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        gap: 5px;
        min-width: 0;
    }

    .preview-error {
        font-size: 12px;
        color: #ef4444;
    }

    .preview-table {
        margin-top: 10px;

        :deep(.el-table__cell .cell) {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .preview-tip {
        margin-top: 6px;
        font-size: 12px;
        color: var(--el-color-warning);
    }
}

.import-upload {
    :deep(.el-upload) {
        width: 100%;
    }

    :deep(.el-upload-dragger) {
        position: relative;
        width: 100%;
        height: auto;
        padding: 0;
        border: none;
        border-radius: 0;
        background: transparent;
        text-align: left;

        &:hover {
            border: none;
            background: transparent;
        }
    }

    .upload-body {
        display: flex;
        align-items: center;
        gap: 14px;
    }

    .upload-actions {
        flex: none;
    }

    .upload-badge {
        height: 30px;
        padding: 0 15px;
        border: none;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 500;
    }

    .upload-info {
        flex: 1;
        min-width: 0;
    }

    .upload-remove {
        flex: none;
        height: auto;
        padding: 0;
        color: #a0a3ab;
        font-size: 13px;

        &:hover {
            color: #606266;
        }
    }

    .upload-title {
        font-size: 14px;
        font-weight: 600;
        line-height: 1.4;
        color: #1f2329;
        word-break: break-all;
    }

    .upload-desc {
        margin-top: 4px;
        font-size: 12px;
        line-height: 1.5;
        color: #909399;
    }

    .upload-tip {
        margin-top: 4px;
        font-size: 12px;
        line-height: 1.5;
        color: #c0c4cc;
    }
}

.overwrite-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    &__text {
        flex: 1;
        min-width: 0;
    }

    &__title {
        font-size: 14px;
        font-weight: 600;
        color: #1f2329;
        line-height: 1.4;
    }

    &__desc {
        margin-top: 4px;
        font-size: 12px;
        line-height: 1.5;
        color: #909399;
    }
}

.import-result {
    .result-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
    }

    .result-title {
        font-size: 14px;
        font-weight: 600;
        line-height: 1.4;
        color: #1f2329;
    }

    .result-status {
        font-size: 13px;
        line-height: 1.4;
        white-space: nowrap;

        &.is-success {
            color: #22c55e;
        }

        &.is-danger {
            color: #ef4444;
        }
    }

    .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
    }

    .legend__item {
        font-size: 12px;
        line-height: 1.4;
        color: #606266;
        white-space: nowrap;

        &.is-fail {
            color: #ef4444;
        }
    }

    .ratio-bar {
        display: flex;
        height: 8px;
        margin-top: 12px;
        border-radius: 999px;
        overflow: hidden;
        background-color: #e8e8eb;
    }

    .ratio-bar__seg {
        height: 100%;

        &.seg--ok {
            background-color: var(--sys-color-primary);
        }

        &.seg--fail {
            background-color: #e8e8eb;
        }
    }

    .section-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-top: 18px;
    }

    .section-head__title {
        font-size: 14px;
        font-weight: 600;
        line-height: 1.4;
        color: #1f2329;
    }

    .section-head__meta {
        font-size: 12px;
        line-height: 1.4;
        color: #909399;
    }

    .failure-list {
        margin-top: 4px;
    }

    .failure-list__row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid #e8e8eb;

        &:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }
    }

    .failure-list__name {
        flex: 1;
        min-width: 0;
        font-size: 13px;
        color: #1f2329;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .failure-list__reason {
        flex: none;
        max-width: 62%;
        font-size: 13px;
        line-height: 1.4;
        color: #ef4444;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
