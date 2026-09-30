<template>
    <!-- 插件运营面板 -->
    <div ref="pageRef" class="main-container page-sections panel-page" :style="pageStyle">
        <!-- 顶部标题与汇总 -->
        <div class="page-card">
            <div class="panel-hero">
                <div class="hero-text">
                    <h2 class="hero-title">{{ t('panelTitle') }}</h2>
                    <p class="hero-sub">{{ t('panelSubTitle') }}</p>
                </div>
                <div class="hero-stats">
                    <div class="stat-pill" v-for="stat in summaryStats" :key="stat.key">
                        <span class="stat-value">{{ stat.value }}</span>
                        <span class="stat-label">{{ stat.label }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 筛选工具栏 -->
        <div class="page-card">
            <div class="panel-toolbar">
                <el-input
                    v-model="searchKey"
                    class="toolbar-search"
                    :placeholder="t('searchPlaceholder')"
                    clearable
                >
                    <template #prefix>
                        <el-icon><Search /></el-icon>
                    </template>
                </el-input>
                <el-radio-group v-model="activeType">
                    <el-radio-button label="all">{{ t('typeAll') }}</el-radio-button>
                    <el-radio-button label="app">{{ t('typeApp') }}</el-radio-button>
                    <el-radio-button label="addon">{{ t('typeAddon') }}</el-radio-button>
                </el-radio-group>
            </div>
        </div>

        <!-- 插件卡片网格：占满剩余高度，超出部分在区域内滚动。卡片自身是白底，不再外套一层白卡片 -->
        <div class="panel-list" v-loading="loading">
            <div class="panel-list-body page-scrollbar">
                <div class="app-grid" v-if="filteredList.length">
                    <div class="app-card" v-for="item in filteredList" :key="item.key" @click="openDetail(item)">
                        <div class="app-card-head">
                            <div class="app-card-avatar">
                                <el-image class="app-card-logo" :src="img(item.icon)" fit="cover">
                                    <template #error>
                                        <img class="app-card-logo-default" src="@/app/assets/images/index/app_default.png" />
                                    </template>
                                </el-image>
                            </div>
                            <div class="app-card-info">
                                <div class="app-card-name">{{ item.title }}</div>
                            </div>
                        </div>

                        <p class="app-card-desc" :title="item.desc">{{ item.desc }}</p>

                        <div class="app-card-foot">
                            <!-- 统计行左「使用站点」右「使用率」，进度条独占整行 -->
                            <div class="foot-stat">
                                <span class="foot-count">{{ item.site_count }} {{ t('siteInUseSuffix') }}</span>
                                <span class="foot-rate">{{ t('usageRate') }} {{ rateOf(item) }}%</span>
                            </div>
                            <div class="progress-track">
                                <div class="progress-fill" :style="{ width: rateOf(item) + '%' }"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <el-empty v-else-if="!loading" :description="t('emptyAddonData')" />
            </div>
        </div>

        <addon-stat-drawer ref="drawerRef" />
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { getAddonPanelList } from '@/app/api/stat'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'
import AddonStatDrawer from './components/addon-stat-drawer.vue'

interface PanelAddon {
    key: string
    title: string
    icon: string
    desc: string
    version: string
    author: string
    type: string
    type_name: string
    status: number
    install_time: number
    site_count: number
    usage_rate: number
    expire_soon_count: number
    // 即将到期站点中最早的剩余天数
    expire_soon_days: number
}

const loading = ref(true)
const addonList = ref<PanelAddon[]>([])
const summary = ref({ addon_count: 0, total_site_count: 0, avg_usage_rate: 0 })
const searchKey = ref('')
const activeType = ref('all')
const drawerRef = ref<{ open: (item: PanelAddon) => void }>()
const { pageRef, pageStyle } = useTablePageHeight()

/**
 * 进度条与百分比一起从 0 涨到目标值。
 * 两者读同一个动画值 rateOf()，所以条形宽度和数字永远同步，不会一个快一个慢。
 */
const animatedRates = ref<Record<string, number>>({})
const rateOf = (item: PanelAddon) => animatedRates.value[item.key] ?? item.usage_rate

const ANIM_DURATION = 800
let rafId = 0

const animateRates = () => {
    const targets: Record<string, number> = {}
    addonList.value.forEach((item) => { targets[item.key] = item.usage_rate })
    const keys = Object.keys(targets)
    if (!keys.length) return

    const startTime = performance.now()
    const step = (now: number) => {
        const progress = Math.min((now - startTime) / ANIM_DURATION, 1)
        // 三次缓出：起步快、收尾稳
        const eased = 1 - Math.pow(1 - progress, 3)
        const next: Record<string, number> = {}
        keys.forEach((key) => { next[key] = Number((targets[key] * eased).toFixed(1)) })
        animatedRates.value = next
        if (progress < 1) rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
}

onUnmounted(() => cancelAnimationFrame(rafId))

const summaryStats = computed(() => [
    { key: 'addon', label: t('addonCount'), value: summary.value.addon_count },
    { key: 'site', label: t('totalSiteCount'), value: summary.value.total_site_count },
    { key: 'rate', label: t('avgUsageRate'), value: `${ summary.value.avg_usage_rate }%` }
])

const filteredList = computed(() => {
    const keyword = searchKey.value.trim().toLowerCase()
    const list = addonList.value.filter((item) => {
        if (activeType.value !== 'all' && item.type !== activeType.value) return false
        if (keyword && !item.title.toLowerCase().includes(keyword)) return false
        return true
    })
    // 固定按使用站点数从多到少排
    return list.slice().sort((a, b) => b.site_count - a.site_count)
})

const getList = async () => {
    loading.value = true
    const res = await getAddonPanelList()
    const list: PanelAddon[] = res.data.list ?? []
    // 先全部归零，避免首帧先闪一下满格再回落
    const initial: Record<string, number> = {}
    list.forEach((item) => { initial[item.key] = 0 })
    animatedRates.value = initial
    addonList.value = list
    summary.value = {
        addon_count: res.data.addon_count ?? 0,
        total_site_count: res.data.total_site_count ?? 0,
        avg_usage_rate: res.data.avg_usage_rate ?? 0
    }
    loading.value = false
    animateRates()
}

const openDetail = (item: PanelAddon) => {
    drawerRef.value?.open(item)
}

onMounted(() => {
    getList()
})
</script>

<style lang="scss" scoped>
/* 与列表页同一套纵向间距，页高由 useTablePageHeight 锁定在可视区域 */
.panel-page {
    box-sizing: border-box;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    gap: var(--cmp-table-page-section-gap);
    /* 抵消布局右侧内边距，滚动条才能贴到主区域最右缘 */
    width: calc(100% + var(--cmp-layout-content-padding));
    margin-right: calc(var(--cmp-layout-content-padding) * -1);

    > .page-card:not(.panel-list) {
        flex-shrink: 0;
        margin-right: var(--cmp-layout-content-padding);
    }
}

/* 页面容器：与站点列表一致的白底卡片（圆角、边框、内边距） */
.page-card {
    box-sizing: border-box;
    padding: var(--sys-space-4);
    background-color: var(--cmp-card-bg);
    border: 1px solid var(--sys-color-border-default);
    border-radius: var(--sys-radius-lg);
    overflow: hidden;
}

.panel-hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    flex-wrap: wrap;
}

.hero-title {
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-xl);
    font-weight: var(--sys-font-weight-semibold);
}

.hero-sub {
    margin-top: var(--space-1);
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-sm);
}

.hero-stats {
    display: flex;
    gap: var(--space-3);
    flex-wrap: wrap;
}

.stat-pill {
    display: flex;
    flex-direction: column;
    min-width: 120px;
    padding: var(--space-3) var(--space-5);
    background-color: var(--sys-color-primary-soft);
    border-radius: var(--sys-radius-lg);

    .stat-value {
        color: var(--sys-color-primary);
        font-size: var(--sys-font-size-xl);
        font-weight: var(--sys-font-weight-semibold);
        line-height: 28px;
    }

    .stat-label {
        color: var(--sys-color-text-secondary);
        font-size: var(--sys-font-size-xs);
    }
}

.panel-list {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    margin-top: var(---sys-space-3);
}

.panel-list-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    /* 滚动条占掉的宽度算进右侧留白，卡片仍与上方卡片右缘对齐 */
    padding-right: calc(var(--cmp-layout-content-padding) - var(--page-scrollbar-size));
}

.panel-toolbar {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    flex-wrap: wrap;

    .toolbar-search {
        width: var(--cmp-control-default-width);
    }
}

.app-grid {
    display: grid;
    /* 与应用市场 .am-grid 同一档：最小 272px，间距用模块卡片 token */
    grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
    gap: var(--cmp-module-card-gap);
    align-items: stretch;
    /* 第一行上移和阴影画在滚动区域里，顶边留出空隙 */
    padding-top: var(--sys-space-2);
    padding-bottom: var(--sys-space-3);
}

.app-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
    /* 与应用市场 .am-card 同一套白底、圆角、内边距 */
    padding: var(--cmp-module-card-padding) var(--cmp-module-card-padding) var(--sys-space-3);
    background: var(--cmp-module-card-bg);
    border: var(--cmp-module-card-border-width) solid var(--cmp-module-card-border-color);
    border-radius: var(--cmp-module-card-radius);
    color: var(--cmp-module-card-text);
    cursor: pointer;
    transition: border-color .2s, box-shadow .2s, transform .2s;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: var(--cmp-module-card-accent-height);
        background: linear-gradient(90deg, var(--cmp-module-card-accent-start), var(--cmp-module-card-accent-end));
        opacity: 0;
        transition: opacity .3s;
    }

    &:hover {
        border-color: var(--cmp-module-card-hover-border-color);
        box-shadow: var(--cmp-module-card-hover-shadow);
        transform: translateY(var(--cmp-module-card-hover-offset));

        &::before {
            opacity: 1;
        }
    }
}

.app-card-head {
    display: flex;
    align-items: center;
    gap: 12px;
}

.app-card-avatar {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    overflow: hidden;
    border-radius: var(--sys-radius-md);
    background: var(--sys-color-primary-soft);
}

.app-card-logo,
.app-card-logo-default {
    display: block;
    width: 100%;
    height: 100%;
}

:deep(.app-card-logo .el-image__inner) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.app-card-info {
    flex: 1;
    min-width: 0;
}

.app-card-name {
    overflow: hidden;
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-base);
    font-weight: var(--sys-font-weight-semibold);
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.app-card-desc {
    margin-top: -4px;
    overflow: hidden;
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);
    line-height: 1.5;
    min-height: 18px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}

.app-card-foot {
    display: flex;
    flex-direction: column;
    gap: var(--sys-space-2);
    margin-top: auto;
}

.foot-stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sys-space-2);
}

.foot-count {
    overflow: hidden;
    color: var(--sys-color-text-regular);
    font-size: var(--sys-font-size-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
}

.foot-rate {
    flex-shrink: 0;
    // 数字上涨时字符宽度会变，固定占位，避免把左侧统计文字挤出去
    min-width: 82px;
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);
    text-align: right;
    white-space: nowrap;
}

.progress-track {
    height: 4px;
    overflow: hidden;
    background-color: var(--sys-color-fill-light);
    border-radius: var(--sys-radius-full);
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--sys-color-primary), var(--sys-color-primary-hover));
    border-radius: var(--sys-radius-full);
    // 宽度由 JS 逐帧写入（见 rateOf），不用 CSS 动画/过渡，避免与数字不同步
}

@media (max-width: 560px) {
    .app-grid {
        grid-template-columns: 1fr;
    }
}
</style>
