import * as echarts from 'echarts'

/** 读取 CSS 变量（未取值或含 var() 时使用兜底值） */
export const cssVar = (name: string, fallback: string): string => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    if (!value || value.includes('var(')) return fallback
    return value
}

/** hex 颜色转 rgba，非 6 位 hex 原样返回 */
export const toRgba = (color: string, alpha: number): string => {
    const hex = color.replace('#', '')
    if (hex.length !== 6) return color
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return `rgba(${ r }, ${ g }, ${ b }, ${ alpha })`
}

/** 语义色板（跟随运行时主题） */
export const chartColors = () => ({
    primary: cssVar('--sys-color-primary', '#409EFF'),
    success: cssVar('--sys-color-success', '#67C23A'),
    warning: cssVar('--sys-color-warning', '#E6A23C'),
    danger: cssVar('--sys-color-danger', '#F56C6C'),
    info: cssVar('--sys-color-info', '#909399'),
    textRegular: cssVar('--sys-color-text-regular', '#606266'),
    textSecondary: cssVar('--sys-color-text-secondary', '#909399'),
    border: cssVar('--sys-color-border-default', '#E4E7ED'),
    fillLight: cssVar('--sys-color-fill-light', '#F2F3F5'),
    fillDarker: cssVar('--sys-color-fill-dark', '#E4E7ED'),
    surface: cssVar('--sys-color-bg-surface', '#FFFFFF')
})

/** 类目轴通用样式 */
export const categoryAxisStyle = () => {
    const color = chartColors()
    return {
        axisLine: { lineStyle: { color: color.border } },
        axisTick: { show: false },
        axisLabel: { color: color.textSecondary }
    }
}

/** 数值轴通用样式 */
export const valueAxisStyle = () => {
    const color = chartColors()
    return {
        minInterval: 1,
        splitLine: { lineStyle: { color: color.fillLight } },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: color.textSecondary }
    }
}

/** 图例通用样式 */
export const legendStyle = () => {
    const color = chartColors()
    return {
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        textStyle: { color: color.textRegular }
    }
}

/** 初始化图表实例 */
export const initChart = (el?: HTMLElement): echarts.ECharts | null => (el ? echarts.init(el) : null)

export { echarts }
