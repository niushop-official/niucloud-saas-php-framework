<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex flex-wrap items-center justify-between gap-[10px]">
                <span class="text-page-title">{{ t('title') }}</span>
                <el-tag v-if="config.version" type="info" effect="plain">
                    {{ t('currentVersion') }}：{{ config.version }} ({{ config.version_code }})
                </el-tag>
            </div>

            <!-- 配置区 -->
            <div class="mt-[18px] flex flex-wrap items-end gap-[16px]">
                <div class="flex flex-col gap-[6px]">
                    <span class="text-[13px] text-[#606266]">{{ t('targetLabel') }}</span>
                    <el-select v-model="form.target" class="!w-[220px]" filterable
                        :placeholder="t('targetPlaceholder')" @change="resetResult">
                        <el-option v-for="item in targets" :key="item.key" :label="item.name" :value="item.key" />
                    </el-select>
                </div>

                <div class="flex flex-col gap-[6px]">
                    <span class="text-[13px] text-[#606266]">{{ t('algorithmLabel') }}</span>
                    <el-select v-model="form.algorithm" class="!w-[200px]" @change="onRuleChange">
                        <el-option v-for="item in algorithms" :key="item.value" :label="item.name" :value="item.value" />
                    </el-select>
                </div>

                <div class="flex flex-col gap-[6px]">
                    <span class="text-[13px] text-[#606266]">{{ t('pathLabel') }}</span>
                    <el-input v-model.trim="form.path" class="!w-[220px]" clearable
                        :placeholder="t('pathPlaceholder')" @change="resetResult" />
                </div>

                <div class="flex flex-col gap-[6px]">
                    <span class="text-[13px] text-[#606266]">{{ t('ruleLabel') }}</span>
                    <div class="flex h-[32px] items-center gap-[16px]">
                        <el-checkbox v-model="form.isBom" @change="onRuleChange">{{ t('ignoreBom') }}</el-checkbox>
                        <el-checkbox v-model="form.isCrlfLf" @change="onRuleChange">{{ t('ignoreEol') }}</el-checkbox>
                    </div>
                </div>

                <el-button type="primary" :loading="checking" :disabled="checking" @click="startCheck">
                    {{ checking ? t('checking') : (hasResult ? t('rescan') : t('startCheck')) }}
                </el-button>

                <el-tag :type="statusTag.type" effect="light">{{ statusTag.text }}</el-tag>
            </div>

            <div v-if="currentTarget" class="mt-[10px] text-[12px] text-[#909399]">
                {{ t('baselineFile') }}：{{ currentTarget.baseline_file || '-' }}
                <span v-if="baselineSourceLabel" class="ml-[10px]">（{{ baselineSourceLabel }}）</span>
                <span class="ml-[10px]">{{ t('rulesVersionLabel') }}：{{ currentTarget.rules_version || '-' }}</span>
            </div>

            <!-- 进度区 -->
            <div v-if="checking || hasResult" class="mt-[18px]">
                <el-progress :percentage="percentage" :stroke-width="10" :show-text="false" />
                <div class="mt-[6px] flex flex-wrap justify-between text-[12px] text-[#909399]">
                    <span>{{ t('scanned') }}：{{ progress.scanned }} / {{ progress.total }}</span>
                    <span v-if="!checking">{{ t('elapsed') }}：{{ progress.elapsed }} ms</span>
                </div>
            </div>

            <el-alert v-if="errorMessage" class="mt-[16px]" type="error" :closable="false" show-icon
                :title="errorMessage" />

            <!-- 后端告警：最典型的是「排除规则降级到内置兜底」——它会影响结果的可信度，必须显示 -->
            <el-alert v-for="(warning, index) in warnings" :key="'w' + index" class="mt-[16px]" type="warning"
                :closable="false" show-icon :title="warning" />

            <!-- 汇总卡片 -->
            <div v-if="hasResult" class="mt-[20px] grid grid-cols-1 gap-[16px] md:grid-cols-3">
                <div v-for="card in summaryCards" :key="card.key"
                    class="rounded-[10px] border border-solid border-[#ebeef5] bg-white p-[16px] transition-shadow hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <div class="text-[13px] text-[#909399]">{{ card.label }}</div>
                    <div class="mt-[6px] text-[26px] font-[600]" :style="{ color: card.color }">{{ card.value }}</div>
                </div>
            </div>

            <!-- 无差异 -->
            <el-alert v-if="hasResult && !hasDiff" class="mt-[20px]" type="success" :closable="false" show-icon
                :title="t('allMatched')" :description="t('allMatchedTip')" />

            <!-- 差异明细 -->
            <div v-if="hasResult && hasDiff" class="mt-[20px]">
                <div class="flex flex-wrap items-center justify-between gap-[10px]">
                    <span class="text-[14px] font-[500] text-[#303133]">{{ t('detailTitle') }}</span>
                    <div class="flex flex-wrap items-center gap-[10px]">
                        <el-select v-model="filterType" class="!w-[140px]">
                            <el-option :label="t('filterAll')" value="" />
                            <el-option :label="t('typeNew')" value="new" />
                            <el-option :label="t('typeModified')" value="modified" />
                            <el-option :label="t('typeDeleted')" value="deleted" />
                        </el-select>
                        <el-input v-model.trim="keyword" class="!w-[220px]" clearable
                            :placeholder="t('keywordPlaceholder')" />
                    </div>
                </div>

                <el-table class="mt-[10px]" :data="filteredRows" size="large" max-height="520">
                    <template #empty><span>{{ t('emptyData') }}</span></template>
                    <el-table-column prop="file" :label="t('filePath')" min-width="360" show-overflow-tooltip />
                    <el-table-column :label="t('changeType')" width="120">
                        <template #default="{ row }">
                            <el-tag :type="typeTag(row.status)" effect="light">{{ typeText(row.status) }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('fileSize')" width="110">
                        <template #default="{ row }">
                            <span class="text-[13px] text-[#606266]">{{ formatSize(row.size) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('fileHash')" width="140">
                        <template #default="{ row }">
                            <span class="text-[12px] text-[#909399]">{{ shortHash(row) }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { t } from '@/lang'
import {
    checkIntegrity,
    getIntegrityAlgorithms,
    getIntegrityConfig,
    getIntegrityTargets
} from '@/app/api/integrity'

interface TargetItem {
    key: string
    name: string
    version: string | null
    baseline_file: string
    baseline_status: string
    rules_version: string
}

interface DiffRow {
    file: string
    status: 'new' | 'modified' | 'deleted'
    /** 文件大小（字节）；删除项记为 0 */
    size: number
    /** 本地算出的哈希；删除项为空 */
    hashLocal: string
    /** 云端清单里的哈希；新增项为空 */
    hashBaseline: string
}

const targets = ref<TargetItem[]>([])
const algorithms = ref<Array<{ value: string, name: string }>>([])
const config = ref<Record<string, any>>({})

const form = reactive({ target: '', algorithm: 'crc32', path: '', isBom: true, isCrlfLf: true })
const checking = ref(false)
const hasResult = ref(false)
const errorMessage = ref('')
const baselineSource = ref('')
const warnings = ref<string[]>([])
const progress = reactive({ scanned: 0, total: 0, elapsed: 0 })
const rows = ref<DiffRow[]>([])
const summary = reactive({ new: 0, modified: 0, deleted: 0 })
const filterType = ref('')
const keyword = ref('')

const currentTarget = computed(() => targets.value.find(item => item.key === form.target))
const hasDiff = computed(() => rows.value.length > 0)

const percentage = computed(() => {
    if (!progress.total) return checking.value ? 0 : 100
    return Math.min(100, Math.floor(progress.scanned / progress.total * 100))
})

const baselineSourceLabel = computed(() => {
    if (baselineSource.value === 'cache') return t('baselineSourceCache')
    if (baselineSource.value === 'cloud') return t('baselineSourceCloud')
    return ''
})

const statusTag = computed(() => {
    const map: Record<string, { type: string, text: string }> = {
        ready: { type: 'success', text: t('statusReady') },
        missing: { type: 'warning', text: t('statusMissing') },
        version_mismatch: { type: 'warning', text: t('statusVersionMismatch') },
        config_mismatch: { type: 'warning', text: t('statusConfigMismatch') },
        rules_mismatch: { type: 'warning', text: t('statusRulesMismatch') },
        corrupted: { type: 'danger', text: t('statusCorrupted') },
        version_unknown: { type: 'danger', text: t('statusVersionUnknown') }
    }
    return map[currentTarget.value?.baseline_status || 'missing'] || map.missing
})

const summaryCards = computed(() => [
    { key: 'new', label: t('summaryNew'), value: summary.new, color: '#67c23a' },
    { key: 'modified', label: t('summaryModified'), value: summary.modified, color: '#e6a23c' },
    { key: 'deleted', label: t('summaryDeleted'), value: summary.deleted, color: '#f56c6c' }
])

const filteredRows = computed(() => rows.value.filter(row => {
    if (filterType.value && row.status !== filterType.value) return false
    if (keyword.value && !row.file.includes(keyword.value)) return false
    return true
}))

const typeText = (status: string) => {
    const map: Record<string, string> = {
        new: t('typeNew'),
        modified: t('typeModified'),
        deleted: t('typeDeleted')
    }
    return map[status] || status
}

const typeTag = (status: string) => {
    const map: Record<string, string> = { new: 'success', modified: 'warning', deleted: 'danger' }
    return map[status] || 'info'
}

/** 请求参数里统一带上当前的算法与忽略项 */
const ruleParams = () => ({
    algorithm: form.algorithm,
    is_bom: form.isBom ? 1 : 0,
    is_crlf_lf: form.isCrlfLf ? 1 : 0
})

const resetResult = () => {
    hasResult.value = false
    errorMessage.value = ''
    warnings.value = []
    rows.value = []
    summary.new = 0
    summary.modified = 0
    summary.deleted = 0
    progress.scanned = 0
    progress.total = 0
    progress.elapsed = 0
    baselineSource.value = ''
}

const appendChunk = (data: any) => {
    const list: DiffRow[] = []

    if (Array.isArray(data.details) && data.details.length) {
        // 新结构：带文件大小与两侧哈希
        data.details.forEach((item: any) => {
            list.push({
                file: item.file,
                status: item.status,
                size: item.size || 0,
                hashLocal: item.hash_local || '',
                hashBaseline: item.hash_baseline || ''
            })
            if (item.status === 'new') summary.new++
            if (item.status === 'modified') summary.modified++
            if (item.status === 'deleted') summary.deleted++
        })
    } else {
        // 回退：后端还没升级时仍按旧结构解析，避免页面直接不可用
        const changed = data.changed || {}

        Object.keys(changed).forEach(file => {
            list.push({ file, status: changed[file], size: 0, hashLocal: '', hashBaseline: '' })
            if (changed[file] === 'new') summary.new++
            if (changed[file] === 'modified') summary.modified++
        })

        ;(data.deleted || []).forEach((file: string) => {
            list.push({ file, status: 'deleted', size: 0, hashLocal: '', hashBaseline: '' })
            summary.deleted++
        })
    }

    if (list.length) rows.value = rows.value.concat(list)
}

/** 字节数转可读文本 */
const formatSize = (size: number) => {
    if (!size) return '0 B'
    if (size < 1024) return `${size} B`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
    return `${(size / 1024 / 1024).toFixed(1)} MB`
}

/** 哈希只展示前 8 位（crc32 本身就是 8 位，更长的算法截断显示） */
const shortHash = (row: DiffRow) => (row.hashLocal || row.hashBaseline || '').slice(0, 8) || '-'

const startCheck = () => {
    if (!form.target) {
        ElMessage({ message: t('targetRequired'), type: 'warning' })
        return
    }

    resetResult()
    checking.value = true

    const startedAt = Date.now()
    let cursor = 0

    const runChunk = () => {
        checkIntegrity({
            target: form.target,
            path: form.path,
            cursor,
            ...ruleParams()
        }).then(res => {
            const data = res.data
            progress.total = data.total
            progress.scanned += data.scanned
            baselineSource.value = data.baseline_source

            // 后端告警（如规则降级）必须展示，避免用户在「结果不完全可信」的情况下误信
            if (Array.isArray(data.warnings) && data.warnings.length) {
                warnings.value = warnings.value.concat(data.warnings)
            }

            appendChunk(data)

            if (data.done) {
                progress.elapsed = Date.now() - startedAt
                checking.value = false
                hasResult.value = true
                loadTargets()
            } else {
                cursor = data.next_cursor
                runChunk()
            }
        }).catch(err => {
            checking.value = false
            errorMessage.value = err?.msg || t('checkFailed')
        })
    }

    runChunk()
}

const loadTargets = () => {
    getIntegrityTargets(ruleParams()).then(res => {
        targets.value = res.data
        if (!form.target && targets.value.length) form.target = targets.value[0].key
    }).catch(err => {
        errorMessage.value = err?.msg || t('configLoadFailed')
    })
}

/** 切换算法或忽略项：清单文件会变成另一个，必须清空结果并提示 */
const onRuleChange = () => {
    resetResult()
    ElMessage({ message: t('ruleChangedTip'), type: 'warning' })
    loadTargets()
}

onMounted(() => {
    getIntegrityConfig().then(res => {
        config.value = res.data
        form.algorithm = res.data.default_algorithm || 'crc32'
        form.isBom = res.data.is_bom !== false
        form.isCrlfLf = res.data.is_crlf_lf !== false
        loadTargets()
    }).catch(err => {
        errorMessage.value = err?.msg || t('configLoadFailed')
    })

    getIntegrityAlgorithms().then(res => {
        algorithms.value = res.data
    }).catch(err => console.error(err))
})
</script>

<style lang="scss" scoped></style>
