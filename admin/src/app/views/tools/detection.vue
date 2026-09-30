<template>
    <!--环境检测-->
    <div class="main-container page-sections min-h-[70vh]" v-loading="loading">
        <!-- 顶部概览 -->
        <div>
            <div class="flex justify-between items-start flex-wrap">
                <div>
                    <div class="flex items-center flex-wrap">
                        <span class="text-[20px] font-bold mr-2">{{ t('pageTitle') }}</span>
                        <el-tag :type="envHealth.status == 'success' ? 'success' : (envHealth.status == 'warning' ? 'warning' : 'danger')" effect="light" round>
                            {{ t('health') }}{{ envHealth.label }}
                        </el-tag>
                    </div>
                    <div class="text-[14px] text-[#909399] mt-1">
                        <span>{{ t('serverTime') }}：{{ env.runtime?.server_time || '-' }}</span>
                    </div>
                </div>
                <el-button :loading="loading" @click="loadData">
                    <el-icon class="mr-1"><Refresh /></el-icon>{{ t('refresh') }}
                </el-button>
            </div>

            <!-- 统计 -->
            <div class="flex flex-wrap grid-cols-4 gap-[16px] mt-4">
                <div class="form-section !border-[var(--sys-color-border-default)] flex-1">
                    <div class="text-[13px] text-[#909399] mb-2">{{ t('healthScore') }}</div>
                    <div class="text-[22px] font-bold" :class="envHealth.status == 'success' ? '!text-[#67c23a]' : '!text-[#f56c6c]'">{{ envHealth.score }}</div>
                </div>
                <div class="form-section !border-[var(--sys-color-border-default)] flex-1 box-border">
                    <div class="text-[13px] text-[#909399] mb-2">{{ t('cpuCores') }}</div>
                    <div class="text-[22px] font-bold">{{ env.performance?.cpu_cores || '-' }}</div>
                </div>
                <div class="form-section !border-[var(--sys-color-border-default)] flex-1 box-border">
                    <div class="text-[13px] text-[#909399] mb-2">{{ t('memoryUsage') }}</div>
                    <div class="text-[22px] font-bold" :class="{ '!text-[#f56c6c]': (memory.usage_percent || 0) >= 85 }">{{ memory.usage_percent || 0 }}%</div>
                </div>
                <div class="form-section !border-[var(--sys-color-border-default)] flex-1 box-border">
                    <div class="text-[13px] text-[#909399] mb-2">{{ t('diskUsage') }}</div>
                    <div class="text-[22px] font-bold" :class="{ '!text-[#f56c6c]': (disk.usage_percent || 0) >= 85 }">{{ disk.usage_percent || 0 }}%</div>
                </div>
            </div>
        </div>

        <!-- 关键服务 -->
        <div>
            <div class="mb-4">
                <span class="text-[16px] font-bold mr-2">{{ t('keyService') }}</span>
                <span class="text-[13px] text-[#909399]">{{ t('keyServiceDesc') }}</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
                <div v-for="item in serviceHighlights" :key="item.label" class="form-section !border-[var(--sys-color-border-default)] flex items-start gap-3" :class="item.borderClass">
                    <div class="flex items-center justify-center w-[34px] h-[34px] rounded-md bg-[#f2f3f5] shrink-0">
                        <el-icon class="text-[18px]"><component :is="item.icon" /></el-icon>
                    </div>
                    <div class="min-w-0">
                        <div class="text-[13px] text-[#909399]">{{ item.label }}</div>
                        <div class="text-[17px] font-bold my-1 break-all">{{ item.value }}</div>
                        <div class="text-[12px] text-[#909399] break-all">{{ item.meta }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 资源使用 -->
        <div>
            <div class="mb-4">
                <span class="text-[16px] font-bold mr-2">{{ t('resourceUsage') }}</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- 内存 -->
                <div class="form-section !border-[var(--sys-color-border-default)]">
                    <div class="flex items-center justify-between min-h-[130px]">
                        <el-progress type="dashboard" :percentage="memory.usage_percent || 0" :status="progressStatus(memory.usage_percent || 0)" :width="110" />
                        <div class="flex flex-col gap-2 text-right">
                            <div class="text-[20px] font-bold">{{ memory.used_formatted || '-' }}</div>
                            <div class="text-[13px] text-[#909399]">{{ t('total') }} {{ memory.total_formatted || '-' }}</div>
                            <div class="text-[13px] text-[#909399]">{{ t('available') }} {{ memory.available_formatted || '-' }}</div>
                        </div>
                    </div>
                    <div class="text-[13px] text-[#909399] mt-2">{{ t('memory') }}</div>
                </div>

                <!-- 磁盘 -->
                <div class="form-section !border-[var(--sys-color-border-default)]">
                    <div class="flex items-center justify-between min-h-[130px]">
                        <el-progress type="dashboard" :percentage="disk.usage_percent || 0" :status="progressStatus(disk.usage_percent || 0)" :width="110" />
                        <div class="flex flex-col gap-2 text-right">
                            <div class="text-[20px] font-bold">{{ disk.used_formatted || '-' }}</div>
                            <div class="text-[13px] text-[#909399]">{{ t('total') }} {{ disk.total_formatted || '-' }}</div>
                            <div class="text-[13px] text-[#909399]">{{ t('remaining') }} {{ disk.free_formatted || '-' }}</div>
                        </div>
                    </div>
                    <div class="text-[13px] text-[#909399] mt-2">{{ t('disk') }}</div>
                </div>

                <!-- CPU / 负载 -->
                <div class="form-section !border-[var(--sys-color-border-default)]">
                    <div class="flex flex-col justify-center gap-3 min-h-[130px]">
                        <div class="rounded-md px-4">
                            <div class="text-[13px] text-[#909399]">{{ t('cpuCores') }}</div>
                            <div class="text-[20px] font-bold mt-1">{{ env.performance?.cpu_cores || '-' }}</div>
                        </div>
                        <div class="rounded-md px-4">
                            <div class="text-[13px] text-[#909399]">{{ t('loadAvg') }}</div>
                            <div class="text-[20px] font-bold mt-1">{{ loadAverageText }}</div>
                        </div>
                    </div>
                    <div class="text-[13px] text-[#909399] mt-2">{{ t('cpuLoad') }}</div>
                </div>
            </div>
        </div>

        <!-- 详细指标 -->
        <div>
            <div class="mb-4">
                <span class="text-[16px] font-bold mr-2">{{ t('serviceDetail') }}</span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="form-section !border-[var(--sys-color-border-default)]">
                    <div class="text-[14px] font-bold mb-3">{{ t('mysqlDetail') }}</div>
                    <div class="grid grid-cols-2 gap-3">
                        <div v-for="item in mysqlMetrics" :key="item.label" class="rounded-md">
                            <div class="text-[13px] text-[#909399]">{{ item.label }}</div>
                            <div class="text-[19px] font-bold mt-1 break-all">{{ item.value }}</div>
                        </div>
                    </div>
                </div>

                <div class="form-section !border-[var(--sys-color-border-default)]">
                    <div class="text-[14px] font-bold mb-3">{{ t('redisDetail') }}</div>
                    <div class="grid grid-cols-2 gap-3">
                        <div v-for="item in redisMetrics" :key="item.label" class="rounded-md">
                            <div class="text-[13px] text-[#909399]">{{ item.label }}</div>
                            <div class="text-[19px] font-bold mt-1 break-all">{{ item.value }}</div>
                        </div>
                    </div>
                    <div v-if="!redis.connected && redis.error" class="text-[12px] text-[#f56c6c] mt-2">{{ redis.error }}</div>
                </div>

                <div class="form-section !border-[var(--sys-color-border-default)]">
                    <div class="text-[14px] font-bold mb-3">{{ t('dbStorage') }}</div>
                    <div class="grid grid-cols-2 gap-3">
                        <div v-for="item in storageMetrics" :key="item.label" class="rounded-md">
                            <div class="text-[13px] text-[#909399]">{{ item.label }}</div>
                            <div class="text-[19px] font-bold mt-1 break-all">{{ item.value }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 数据表占用 Top -->
        <div v-if="largeTables.length">
            <div class="mb-4">
                <span class="text-[16px] font-bold mr-2">{{ t('tableTop') }}</span>
            </div>
            <div class="form-section !border-[var(--sys-color-border-default)] flex flex-col gap-2">
                <div v-for="item in largeTables" :key="item.table_name" class="flex items-center justify-between rounded-md border-b border-solid border-[var(--cmp-form-section-header-border)] p-2">
                    <div class="min-w-0">
                        <div class="text-[14px] font-bold truncate">{{ item.table_name }}</div>
                        <div class="text-[12px] text-[#909399] truncate">
                            {{ item.rows }} {{ t('rows') }} · {{ t('dataSize') }} {{ item.data_size_formatted }} · {{ t('indexSize') }} {{ item.index_size_formatted }}
                        </div>
                    </div>
                    <div class="text-[14px] font-bold shrink-0 ml-3">{{ item.total_size_formatted }}</div>
                </div>
            </div>
        </div>

        <!-- 运行环境 / 数据库 -->
        <div>
            <div class="mb-4">
                <span class="text-[16px] font-bold">{{ t('runtime') }}</span>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="form-section !border-[var(--sys-color-border-default)]">
                    <div class="text-[14px] font-bold mb-3">{{ t('serverEnv') }}</div>
                    <div class="info-kv-list">
                        <div class="info-kv-item">
                            <span class="info-kv-label">{{ t('os') }}</span>
                            <span class="info-kv-value">{{ env.runtime?.os || '-' }}</span>
                        </div>
                        <div class="info-kv-item">
                            <span class="info-kv-label">{{ t('phpVersion') }}</span>
                            <span class="info-kv-value">{{ env.runtime?.php_version || '-' }}</span>
                        </div>
                        <div class="info-kv-item">
                            <span class="info-kv-label">{{ t('runMode') }}</span>
                            <span class="info-kv-value">{{ env.runtime?.sapi || '-' }}</span>
                        </div>
                        <div class="info-kv-item">
                            <span class="info-kv-label">{{ t('serverTime') }}</span>
                            <span class="info-kv-value">{{ env.runtime?.server_time || '-' }}</span>
                        </div>
                        <div class="info-kv-item">
                            <span class="info-kv-label">{{ t('timezone') }}</span>
                            <span class="info-kv-value">{{ env.runtime?.timezone || '-' }}</span>
                        </div>
                    </div>
                </div>

                <div class="form-section !border-[var(--sys-color-border-default)]">
                    <div class="text-[14px] font-bold mb-3">{{ t('database') }}</div>
                    <div class="info-kv-list">
                        <div class="info-kv-item">
                            <span class="info-kv-label">{{ t('driver') }}</span>
                            <span class="info-kv-value">{{ env.database?.driver || '-' }}</span>
                        </div>
                        <div class="info-kv-item">
                            <span class="info-kv-label">{{ t('version') }}</span>
                            <span class="info-kv-value">{{ env.database?.version || '-' }}</span>
                        </div>
                        <div class="info-kv-item">
                            <span class="info-kv-label">{{ t('distribution') }}</span>
                            <span class="info-kv-value">{{ env.database?.variables?.version_comment || '-' }}</span>
                        </div>
                        <div class="info-kv-item">
                            <span class="info-kv-label">{{ t('inflow') }}</span>
                            <span class="info-kv-value">{{ env.database?.traffic?.received_formatted || '-' }}</span>
                        </div>
                        <div class="info-kv-item">
                            <span class="info-kv-label">{{ t('outflow') }}</span>
                            <span class="info-kv-value">{{ env.database?.traffic?.sent_formatted || '-' }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- PHP 配置（整宽）：基础配置 + 扩展检测 -->
        <div>
            <div class="mb-4">
                <span class="text-[16px] font-bold">{{ t('phpConfig') }}</span>
            </div>
            <div class="form-section !border-[var(--sys-color-border-default)]">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                    <div class="info-kv-item">
                        <span class="info-kv-label">memory_limit</span>
                        <span class="info-kv-value">{{ env.php?.memory_limit || '-' }}</span>
                    </div>
                    <div class="info-kv-item">
                        <span class="info-kv-label">upload_max_filesize</span>
                        <span class="info-kv-value">{{ env.php?.upload_max_filesize || '-' }}</span>
                    </div>
                    <div class="info-kv-item">
                        <span class="info-kv-label">post_max_size</span>
                        <span class="info-kv-value">{{ env.php?.post_max_size || '-' }}</span>
                    </div>
                    <div class="info-kv-item">
                        <span class="info-kv-label">max_execution_time</span>
                        <span class="info-kv-value">{{ env.php?.max_execution_time || '-' }}</span>
                    </div>
                    <div v-for="item in (env.php?.extensions || [])" :key="item.name" class="info-kv-item">
                        <span class="info-kv-label">{{ item.name }}</span>
                        <el-tag size="small" effect="light" :type="item.status ? 'success' : 'danger'">
                            {{ item.status ? t('enabled') : t('disabled') }}
                        </el-tag>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { t } from '@/lang'
import { getSystem } from '@/app/api/tools'
import { checkJobStatus } from '@/app/api/sys'
import { Coin, Cpu, DataLine, Refresh, Select, CloseBold } from '@element-plus/icons-vue'

const loading = ref(true)
const systemService = ref<any>({})

// 运行时环境指标
const env = computed<any>(() => systemService.value.environment || {})
const performance = computed<any>(() => env.value.performance || {})
const memory = computed<any>(() => performance.value.memory || {})
const disk = computed<any>(() => performance.value.disk || {})
// 后端 database 节点即 mysql 统计
const mysql = computed<any>(() => env.value.database || {})
const redis = computed<any>(() => env.value.redis || {})

const loadAverageText = computed(() => {
    const values = performance.value.load_average || []
    return values.length > 0 ? values.join(' / ') : '-'
})

const largeTables = computed<any[]>(() => {
    const list = mysql.value.storage?.large_tables || []
    if (list.length) return list
    // 接口暂无数据时用模拟列表，方便预览样式
    return [
        { table_name: 'ns_sys_user_log', rows: 10000, data_size_formatted: '37.2 MB', index_size_formatted: '7240.1 B', total_size_formatted: '37.2 MB' },
        { table_name: 'ns_sys_schedule_log', rows: 10000, data_size_formatted: '27.54 MB', index_size_formatted: '7244.5 B', total_size_formatted: '27.54 MB' },
        { table_name: 'ns_div_page', rows: 941, data_size_formatted: '14.62 MB', index_size_formatted: '1.0 B', total_size_formatted: '14.62 MB' },
        { table_name: 'ns_dy_form_records', rows: 5000, data_size_formatted: '5.82 MB', index_size_formatted: '351.0 B', total_size_formatted: '5.82 MB' },
        { table_name: 'ns_sys_attachment', rows: 5099, data_size_formatted: '4.12 MB', index_size_formatted: '624.4 B', total_size_formatted: '4.12 MB' },
        { table_name: 'ns_shop_coupon_member', rows: 20768, data_size_formatted: '3.69 MB', index_size_formatted: '1.17 MB', total_size_formatted: '3.69 MB' },
        { table_name: 'ns_sys_poster', rows: 5407, data_size_formatted: '2.52 MB', index_size_formatted: '0.0 B', total_size_formatted: '2.52 MB' },
        { table_name: 'ns_pintuan_order', rows: 500, data_size_formatted: '2.52 MB', index_size_formatted: '0.0 B', total_size_formatted: '2.52 MB' }
    ]
})

// 综合健康评分：内存、磁盘、MySQL 连接、Redis
const envHealth = computed(() => {
    const memoryPercent = memory.value.usage_percent || 0
    const diskPercent = disk.value.usage_percent || 0
    const mysqlConn = mysql.value.connections?.usage_percent || 0
    const redisPenalty = redis.value.connected ? 0 : 25
    const score = Math.max(0, Math.min(100,
        100
        - Math.max(0, memoryPercent - 60) * 0.7
        - Math.max(0, diskPercent - 70) * 0.6
        - Math.max(0, mysqlConn - 60) * 0.5
        - redisPenalty
    ))
    const rounded = Math.round(score)
    const status = rounded >= 75 ? 'success' : (rounded >= 60 ? 'warning' : 'exception')
    return {
        label: rounded >= 90 ? t('excellent') : (rounded >= 75 ? t('stable') : (rounded >= 60 ? t('attention') : t('alarm'))),
        score: rounded,
        status
    }
})

const serviceHighlights = computed(() => {
    const queue = (systemService.value.process || [])[0] || {}
    const largestTable = largeTables.value[0]
    return [
        {
            icon: DataLine,
            label: t('mySql'),
            value: `${mysql.value.queries?.qps || 0} QPS`,
            meta: `${t('connectCount')} ${mysql.value.connections?.current || 0}/${mysql.value.connections?.max || 0}`,
            borderClass: progressStatus(mysql.value.connections?.usage_percent || 0) == 'success' ? 'border-[#f0f0f0]' : 'border-[#fde2e2]'
        },
        {
            icon: Coin,
            label: t('redis'),
            value: redis.value.connected ? `${redis.value.stats?.ops_per_sec || 0} OPS` : t('abnormal'),
            meta: redis.value.connected
                ? `${t('clients')} ${redis.value.clients?.connected || 0}/${redis.value.clients?.max || 0}`
                : (redis.value.error || t('connectError')),
            borderClass: redis.value.connected ? 'border-[#f0f0f0]' : 'border-[#fde2e2]'
        },
        {
            icon: Cpu,
            label: t('queueProcess'),
            value: queue.checked === false ? t('checking') : (queue.status ? t('normal') : t('abnormal')),
            meta: queue.name || 'php think workerman',
            borderClass: queue.status ? 'border-[#f0f0f0]' : 'border-[#fde2e2]'
        },
        {
            icon: Coin,
            label: t('dbCapacity'),
            value: mysql.value.storage?.total_size_formatted || '-',
            meta: largestTable ? `${t('maxTable')} ${largestTable.table_name}` : t('noTableData'),
            borderClass: 'border-[#f0f0f0]'
        }
    ]
})

const mysqlMetrics = computed(() => [
    { label: t('connectUsage'), value: `${mysql.value.connections?.usage_percent || 0}%` },
    { label: t('connectCount'), value: `${mysql.value.connections?.current || 0} / ${mysql.value.connections?.max || 0}` },
    { label: 'QPS', value: mysql.value.queries?.qps || 0 },
    { label: t('slowQuery'), value: mysql.value.queries?.slow || 0 },
    { label: t('bufferHit'), value: `${mysql.value.innodb?.buffer_hit_rate || 0}%` },
    { label: t('runTime'), value: uptimeText(mysql.value.queries?.uptime_seconds || 0) }
])

const redisMetrics = computed(() => [
    { label: t('connectStatus'), value: redis.value.connected ? t('normal') : t('abnormal') },
    { label: t('clients'), value: `${redis.value.clients?.connected || 0} / ${redis.value.clients?.max || 0}` },
    { label: 'OPS', value: redis.value.stats?.ops_per_sec || 0 },
    { label: t('keys'), value: redis.value.keyspace?.selected_stats?.keys || 0 },
    { label: t('usedMemory'), value: redis.value.memory?.used_formatted || '-' }
])

const storageMetrics = computed(() => [
    { label: t('tableCount'), value: mysql.value.storage?.tables || 0 },
    { label: t('totalUsed'), value: mysql.value.storage?.total_size_formatted || '-' },
    { label: t('dataSize'), value: mysql.value.storage?.data_size_formatted || '-' },
    { label: t('indexSize'), value: mysql.value.storage?.index_size_formatted || '-' },
    { label: t('avgTableSize'), value: mysql.value.storage?.avg_table_size_formatted || '-' }
])

const progressStatus = (percent: number) => {
    if (percent >= 85) return 'exception'
    if (percent >= 65) return 'warning'
    return 'success'
}

const uptimeText = (seconds = 0) => {
    if (!seconds) return '-'
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}${t('day')} ${hours}${t('hour')} ${minutes}${t('minute')}`
}

// 队列进程检测需等待队列回执（约 5 秒），放在主数据返回之后异步执行，避免阻塞页面渲染
const loadJobStatus = () => {
    const process = systemService.value.process || []
    if (!process.length || process[0].checked === true) return
    checkJobStatus().then((res: any) => {
        process[0].status = !!res.data
        process[0].checked = true
    }).catch(() => {})
}

const loadData = () => {
    loading.value = true
    getSystem().then(res => {
        systemService.value = res.data
        loading.value = false
        loadJobStatus()
    }).catch(() => {
        loading.value = false
    })
}
loadData()
</script>

<style lang="scss" scoped>
.info-kv-list {
    display: flex;
    flex-direction: column;
}

.info-kv-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 40px;
    padding: 8px 0;
    border-bottom: 1px solid var(--cmp-form-section-header-border);

    &:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    &:first-child {
        padding-top: 0;
    }
}

.info-kv-label {
    flex-shrink: 0;
    color: var(--el-text-color-secondary);
    font-size: 13px;
    line-height: 20px;
}

.info-kv-value {
    min-width: 0;
    color: var(--el-text-color-primary);
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    text-align: right;
    word-break: break-all;
}
</style>
