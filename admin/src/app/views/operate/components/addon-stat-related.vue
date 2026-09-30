<template>
    <div class="related-charts">
        <!-- 套餐分组分布 / 常一起搭配的插件 -->
        <div class="chart-row">
            <div class="chart-block">
                <div class="chart-head">
                    <span class="chart-title">{{ t('groupStatTitle') }}</span>
                </div>
                <el-empty v-if="!hasGroupData" :description="t('noData')" :image-size="60" />
                <div v-else ref="groupRef" class="chart-canvas chart-canvas--group"></div>
            </div>
            <div class="chart-block">
                <div class="chart-head">
                    <span class="chart-title">{{ t('coexistStatTitle') }}</span>
                </div>
                <el-empty v-if="!hasCoexistData" :description="t('noData')" :image-size="60" />
                <div v-else ref="coexistRef" class="chart-canvas chart-canvas--bar"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { t } from '@/lang'
import {
    echarts,
    toRgba,
    chartColors,
    categoryAxisStyle,
    valueAxisStyle
} from './chart-helpers'

const props = defineProps<{
    detail: Record<string, any>
}>()

const groupRef = ref<HTMLElement>()
const coexistRef = ref<HTMLElement>()

// 无数据时展示空状态，避免出现「只有坐标轴没有柱子」的空白图，与「图没渲染出来」区分开
const hasGroupData = computed(() => ((props.detail?.group_stat?.type ?? []) as string[]).length > 0)
const hasCoexistData = computed(() => ((props.detail?.coexist_stat?.type ?? []) as string[]).length > 0)

let groupChart: echarts.ECharts | null = null
let coexistChart: echarts.ECharts | null = null

interface RankBarOptions {
    // 柱子代表的量纲名（用于 tooltip），如「使用站点数」「搭配次数」
    seriesName: string
    baseColor: string
    // 柱尾标签的附加文本，与 values 同序，如渗透率 ['80%', '33.2%']
    labelExtras?: string[]
    // tooltip 的附加行，与 values 同序
    tooltipExtras?: string[]
}

const renderRankBar = (
    chart: echarts.ECharts | null,
    el: HTMLElement | undefined,
    stat: any,
    options: RankBarOptions
): echarts.ECharts | null => {
    if (!el) return chart
    const color = chartColors()
    const instance = chart ?? echarts.init(el)
    const types: string[] = stat?.type ?? []
    const values: number[] = stat?.value ?? []

    // 图表纵向由下往上渲染，故所有与 values 同序的数组都要反转
    const yTypes = types.length ? types.slice().reverse() : [ t('noData') ]
    const yValues = values.length ? values.slice().reverse() : [ 0 ]
    const labelExtras = options.labelExtras ? options.labelExtras.slice().reverse() : []
    const tooltipExtras = options.tooltipExtras ? options.tooltipExtras.slice().reverse() : []

    instance.setOption({
        grid: { left: 4, right: 34, top: 16, bottom: 4, containLabel: true },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params: any) => {
                const list = Array.isArray(params) ? params : [ params ]
                const index = list[0]?.dataIndex ?? 0
                const lines = [
                    `${ yTypes[index] ?? '' }`,
                    `${ options.seriesName }: ${ yValues[index] ?? 0 }`
                ]
                if (tooltipExtras[index]) lines.push(tooltipExtras[index])
                return lines.join('<br/>')
            }
        },
        xAxis: { type: 'value', ...valueAxisStyle() },
        yAxis: {
            type: 'category',
            ...categoryAxisStyle(),
            data: yTypes,
            axisLabel: { color: color.textRegular, width: 110, overflow: 'truncate' }
        },
        series: [{
            name: options.seriesName,
            type: 'bar',
            barWidth: 14,
            data: yValues,
            label: {
                show: true,
                position: 'right',
                color: color.textSecondary,
                fontSize: 11,
                formatter: (params: any) => {
                    const extra = labelExtras[params.dataIndex]
                    return extra ? `${ params.value } · ${ extra }` : `${ params.value }`
                }
            },
            itemStyle: {
                borderRadius: [ 0, 7, 7, 0 ],
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: toRgba(options.baseColor, 0.5) },
                    { offset: 1, color: options.baseColor }
                ])
            }
        }]
    }, true)
    instance.resize()
    return instance
}

const renderAll = () => {
    const color = chartColors()
    const siteCountName = t('useSiteCount')

    // 套餐分组分布：柱子=使用站点数，柱尾与 tooltip 附带该套餐的渗透率
    const groupStat: any = props.detail?.group_stat ?? {}
    const groupRate: number[] = groupStat.rate ?? []
    const groupTotal: number[] = groupStat.total ?? []

    groupChart = renderRankBar(groupChart, groupRef.value, groupStat, {
        seriesName: siteCountName,
        baseColor: color.primary,
        labelExtras: groupRate.map((rate) => `${ rate }%`),
        tooltipExtras: groupRate.map((rate, index) =>
            `${ t('groupTotal') }: ${ groupTotal[index] ?? 0 }<br/>${ t('groupRate') }: ${ rate }%`)
    })

    coexistChart = renderRankBar(coexistChart, coexistRef.value, props.detail?.coexist_stat, {
        seriesName: t('coexistCount'),
        baseColor: color.success
    })
}

const resizeAll = () => {
    groupChart?.resize()
    coexistChart?.resize()
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
    groupChart?.dispose()
    coexistChart?.dispose()
    groupChart = coexistChart = null
})
</script>

<style lang="scss" scoped>
.related-charts {
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

.chart-canvas--group {
    height: 240px;
}

// 与套餐分组分布同行，高度取齐，避免并排的两张卡片里图表一高一矮
.chart-canvas--bar {
    height: 240px;
}
</style>
