<template>
    <el-drawer v-model="visible" :size="drawerSize" :with-header="false" @closed="onClosed">
        <div class="drawer-body" v-loading="loading">
            <!-- 插件基础信息 -->
            <div class="drawer-head">
                <div class="head-main">
                    <div class="head-avatar">
                        <el-image class="w-full h-full" :src="img(addon.icon)" fit="contain">
                            <template #error>
                                <img class="w-full h-full" src="@/app/assets/images/index/app_default.png" />
                            </template>
                        </el-image>
                    </div>
                    <div class="head-info">
                        <div class="head-title-row">
                            <span class="head-title">{{ addon.title }}</span>
                        </div>
                        <p class="head-desc" v-if="addon.desc">{{ addon.desc }}</p>
                        <div class="head-meta" v-if="metaItems.length">
                            <template v-for="(meta, index) in metaItems" :key="meta">
                                <i class="dot" v-if="index > 0"></i>
                                <span>{{ meta }}</span>
                            </template>
                        </div>
                    </div>
                </div>
                <el-icon class="head-close" @click="visible = false"><Close /></el-icon>
            </div>

            <!-- 核心指标 -->
            <div class="metric-grid">
                <div class="metric-card" v-for="metric in metrics" :key="metric.key">
                    <span class="metric-value">{{ metric.value }}</span>
                    <span class="metric-label">{{ metric.label }}</span>
                </div>
            </div>

            <template v-if="detail.info">
                <!-- 使用站点累计趋势 / 站点状态与构成 -->
                <addon-stat-charts :detail="detail" :days="days" @change-days="changeDays" />
                <!-- 套餐渗透率 / 站点地域分布 / 插件共现 -->
                <addon-stat-related :detail="detail" />
                <!-- 站点排行 / 到期提醒 / 静默站点 -->
                <addon-stat-lists
                    :key="detail.info.key"
                    :sites="sites"
                    :silent-count="detail.overview?.silent_count ?? 0"
                />
            </template>
        </div>
    </el-drawer>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { getAddonPanelDetail, getAddonPanelSites } from '@/app/api/stat'
import AddonStatCharts from './addon-stat-charts.vue'
import AddonStatRelated from './addon-stat-related.vue'
import AddonStatLists from './addon-stat-lists.vue'

const visible = ref(false)
const loading = ref(false)
const addon = ref<Record<string, any>>({})
const detail = ref<Record<string, any>>({})
const sites = ref<Record<string, any>>({ expire_list: [], rank_list: [], silent_list: [] })
const days = ref(7)

const drawerSize = computed(() => (window.innerWidth < 992 ? '100%' : '720px'))

// 头部元信息：无内容的项直接不展示，避免出现「—」这类空占位
const metaItems = computed(() => {
    const items: string[] = []
    if (addon.value.author) items.push(`${ t('author') }: ${ addon.value.author }`)
    return items
})

const metrics = computed(() => {
    const overview = detail.value.overview ?? {}
    return [
        { key: 'site', label: t('useSiteCount'), value: overview.site_count ?? 0 },
        { key: 'rate', label: t('usageRate'), value: `${ overview.usage_rate ?? 0 }%` },
        { key: 'new', label: t('last7NewSite'), value: overview.new_site_count ?? 0 },
        { key: 'expire', label: t('expireSoonCount'), value: overview.expire_soon_count ?? 0 },
        { key: 'silent', label: t('silentCount'), value: overview.silent_count ?? 0 }
    ]
})

const loadData = async () => {
    if (!addon.value.key) return
    loading.value = true
    const [detailRes, sitesRes] = await Promise.all([
        getAddonPanelDetail(addon.value.key, { days: days.value }),
        getAddonPanelSites(addon.value.key)
    ])
    detail.value = detailRes.data
    sites.value = sitesRes.data
    loading.value = false
}

const open = (item: Record<string, any>) => {
    addon.value = item
    detail.value = {}
    sites.value = { expire_list: [], rank_list: [], silent_list: [] }
    days.value = 7
    visible.value = true
    loadData()
}

const changeDays = async (value: number) => {
    days.value = value
    const res = await getAddonPanelDetail(addon.value.key, { days: value })
    detail.value = res.data
}

const onClosed = () => {
    detail.value = {}
    sites.value = { expire_list: [], rank_list: [], silent_list: [] }
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
.drawer-body {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-height: 200px;
}

.drawer-head {
    position: relative;
    padding: var(--space-5);
    background: linear-gradient(135deg, var(--sys-color-primary-soft), var(--sys-color-bg-surface) 62%);
    border: 1px solid var(--sys-color-border-light);
    border-radius: var(--sys-radius-lg);

    .head-main {
        display: flex;
        gap: var(--space-3);
        align-items: flex-start;
    }

    .head-avatar {
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        overflow: hidden;
        border: 1px solid var(--sys-color-border-light);
        border-radius: var(--sys-radius-md);
        background-color: var(--sys-color-bg-surface);
    }

    .head-info {
        flex: 1;
        min-width: 0;
    }

    .head-title-row {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        flex-wrap: wrap;
    }

    .head-title {
        color: var(--sys-color-text-primary);
        font-size: var(--sys-font-size-xl);
        font-weight: var(--sys-font-weight-semibold);
    }

    .head-desc {
        margin-top: var(--space-1);
        color: var(--sys-color-text-secondary);
        font-size: var(--sys-font-size-sm);
        line-height: 20px;
    }

    .head-meta {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        margin-top: var(--space-3);
        color: var(--sys-color-text-placeholder);
        font-size: var(--sys-font-size-xs);
        flex-wrap: wrap;
    }

    .dot {
        width: 3px;
        height: 3px;
        border-radius: var(--sys-radius-full);
        background-color: var(--sys-color-border-darker);
    }

    .head-close {
        position: absolute;
        top: var(--space-4);
        right: var(--space-4);
        color: var(--sys-color-text-placeholder);
        font-size: 18px;
        cursor: pointer;
        transition: color .2s;

        &:hover {
            color: var(--sys-color-text-primary);
        }
    }
}

.metric-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--space-3);

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

.metric-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-4);
    background-color: var(--sys-color-bg-surface);
    border: 1px solid var(--sys-color-border-light);
    border-radius: var(--sys-radius-lg);

    .metric-value {
        color: var(--sys-color-primary);
        font-size: var(--sys-font-size-xl);
        font-weight: var(--sys-font-weight-semibold);
        line-height: 28px;
    }

    .metric-label {
        color: var(--sys-color-text-secondary);
        font-size: var(--sys-font-size-xs);
    }
}

</style>
