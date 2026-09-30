<template>
    <div class="stat-charts">
        <!-- 使用站点累计趋势 -->
        <div class="chart-block">
            <div class="chart-head">
                <span class="chart-title">{{ t('trendTitle') }}</span>
                <el-radio-group v-model="currentDays" size="small" @change="onDaysChange">
                    <el-radio-button :label="7">{{ t('last7Days') }}</el-radio-button>
                    <el-radio-button :label="30">{{ t('last30Days') }}</el-radio-button>
                </el-radio-group>
            </div>
            <div ref="trendRef" class="chart-canvas chart-canvas--line"></div>
            <p class="chart-tip">{{ t('trendTip') }}</p>
        </div>

        <!-- 站点状态分布 / 新老站点构成 -->
        <div class="chart-row">
            <div class="chart-block">
                <div class="chart-head">
                    <span class="chart-title">{{ t('statusStatTitle') }}</span>
                </div>
                <div ref="statusRef" class="chart-canvas chart-canvas--ring"></div>
            </div>
            <div class="chart-block">
                <div class="chart-head">
                    <span class="chart-title">{{ t('ageStatTitle') }}</span>
                </div>
                <div ref="ageRef" class="chart-canvas chart-canvas--ring"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { t } from '@/lang'
import {
    echarts,
    toRgba,
    chartColors,
    categoryAxisStyle,
    valueAxisStyle,
    legendStyle,
    initChart
} from './chart-helpers'

const props = defineProps<{
    detail: Record<string, any>
    days: number
}>()

const emit = defineEmits(['change-days'])

const currentDays = ref(props.days)
const trendRef = ref<HTMLElement>()
const statusRef = ref<HTMLElement>()
const ageRef = ref<HTMLElement>()

let trendChart: echarts.ECharts | null = null
let statusChart: echarts.ECharts | null = null
let ageChart: echarts.ECharts | null = null

watch(() => props.days, (value) => {
    currentDays.value = value
})

const renderTrend = () => {
    const color = chartColors()
    const trend = props.detail?.trend ?? { date: [], total: [], daily: [] }
    const dates: string[] = trend.date ?? []
    const totals: number[] = trend.total ?? []
    const dailies: number[] = trend.daily ?? []

    trendChart = trendChart ?? initChart(trendRef.value)
    if (!trendChart) return

    trendChart.setOption({
        grid: { left: 4, right: 14, top: 20, bottom: 4, containLabel: true },
        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
                const list = Array.isArray(params) ? params : [ params ]
                const index = list[0]?.dataIndex ?? 0
                return `${ dates[index] ?? '' }<br/>${ t('trendTotal') }: ${ totals[index] ?? 0 }<br/>${ t('trendDaily') }: ${ dailies[index] ?? 0 }`
            }
        },
        xAxis: { type: 'category', boundaryGap: false, data: dates, ...categoryAxisStyle() },
        yAxis: { type: 'value', ...valueAxisStyle() },
        series: [{
            name: t('trendTotal'),
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 7,
            data: totals,
            itemStyle: { color: color.primary },
            lineStyle: { width: 3, color: color.primary },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: toRgba(color.primary, 0.28) },
                    { offset: 1, color: toRgba(color.primary, 0) }
                ])
            }
        }]
    }, true)
    trendChart.resize()
}

const renderRing = (chart: echarts.ECharts | null, el: HTMLElement | undefined, stat: any, colors: string[]): echarts.ECharts | null => {
    if (!el) return chart
    const instance = chart ?? echarts.init(el)
    const labels: string[] = stat?.type ?? []
    const values: number[] = stat?.value ?? []
    const data = labels.map((name, index) => ({ name, value: values[index] ?? 0 }))

    instance.setOption({
        color: colors,
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        legend: { bottom: 0, ...legendStyle() },
        series: [{
            type: 'pie',
            radius: ['52%', '72%'],
            center: ['50%', '44%'],
            avoidLabelOverlap: true,
            itemStyle: {
                borderColor: chartColors().surface,
                borderWidth: 2,
                borderRadius: 4
            },
            label: { show: false },
            labelLine: { show: false },
            data: data.some(item => item.value > 0) ? data : [{ name: t('noData'), value: 0 }]
        }]
    }, true)
    instance.resize()
    return instance
}

const renderAll = () => {
    const color = chartColors()
    renderTrend()
    statusChart = renderRing(statusChart, statusRef.value, props.detail?.status_stat,
        [ color.success, color.warning, color.danger, color.info ])
    ageChart = renderRing(ageChart, ageRef.value, props.detail?.age_stat,
        [ color.primary, color.success, color.info ])
}

const resizeAll = () => {
    trendChart?.resize()
    statusChart?.resize()
    ageChart?.resize()
}

const onDaysChange = (value: any) => {
    emit('change-days', value)
}

watch(() => props.detail, () => {
    nextTick(() => {
        renderAll()
        window.setTimeout(resizeAll, 320)
    })
}, { deep: true })

onMounted(() => {
    nextTick(() => {
        renderAll()
        window.setTimeout(resizeAll, 320)
    })
    window.addEventListener('resize', resizeAll)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeAll)
    trendChart?.dispose()
    statusChart?.dispose()
    ageChart?.dispose()
    trendChart = statusChart = ageChart = null
})
</script>

<style lang="scss" scoped>
.stat-charts {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
}

.chart-block {
    padding: var(--space-4);
    background-color: var(--sys-color-bg-surface);
    border: 1px solid var(--sys-color-border-light);
    border-radius: var(--sys-radius-lg);
}

.chart-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-4);

    @media (max-width: 560px) {
        grid-template-columns: minmax(0, 1fr);
    }
}

.chart-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-2);
}

.chart-title {
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-md);
    font-weight: var(--sys-font-weight-semibold);
}

.chart-canvas--line {
    height: 220px;
}

.chart-canvas--ring {
    height: 220px;
}

.chart-tip {
    margin-top: var(--space-2);
    color: var(--sys-color-text-placeholder);
    font-size: var(--sys-font-size-xs);
    line-height: 18px;
}
</style>
