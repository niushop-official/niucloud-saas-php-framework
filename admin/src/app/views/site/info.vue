<template>
    <!--站点详情-->
    <div class="site-detail" v-loading="loading">
        <el-page-header :icon="ArrowLeft" @back="back()">
            <template #content>
                <span class="text-large font-600 mr-3">{{ pageName }}</span>
            </template>
        </el-page-header>

        <section class="site-card site-header">
            <div class="site-header__top">
                <div class="site-identity">
                    <el-image class="site-logo" :src="formData.logo ? img(formData.logo) : ''" fit="contain">
                        <template #error>
                            <img class="site-logo__fallback" src="@/app/assets/images/site_default.png" alt="">
                        </template>
                    </el-image>
                    <div class="site-identity__text">
                        <div class="site-title-row">
                            <span class="site-name">{{ formData.site_name || '--' }}</span>
                            <span v-if="formData.status_name" class="site-tag" :class="statusClass">
                                <i class="site-tag__dot"></i>{{ formData.status_name }}
                            </span>
                            <span v-if="formData.group_name" class="site-tag site-tag--primary">{{ formData.group_name }}</span>
                        </div>
                    </div>
                </div>
                <el-button type="primary" @click="editEvent">
                    <el-icon class="site-edit-icon"><Edit /></el-icon>
                    {{ t('updateSite') }}
                </el-button>
            </div>

            <div class="site-meta">
                <div class="site-meta__item">
                    <span class="site-meta__label">{{ t('siteDomain') }}</span>
                    <span class="site-meta__value">{{ formData.site_domain || '--' }}</span>
                </div>
                <i class="site-meta__divider"></i>
                <div class="site-meta__item">
                    <span class="site-meta__label">{{ t('addTime') }}</span>
                    <span class="site-meta__value">{{ createTimeText }}</span>
                </div>
                <i class="site-meta__divider"></i>
                <div class="site-meta__item">
                    <span class="site-meta__label">{{ t('expireTime') }}</span>
                    <span class="site-meta__value">{{ expireTimeText }}</span>
                </div>
            </div>
        </section>

        <section class="site-card">
            <div class="site-section-head">
                <h2 class="site-section-title">{{ t('app') }}</h2>
            </div>
            <div v-if="!appList.length" class="site-empty">{{ t('emptyApp') }}</div>
            <div v-else class="site-grid">
                <div class="site-tile" v-for="item in appList" :key="item.key">
                    <el-image class="site-tile__icon" :src="item.icon ? img(item.icon) : ''" fit="cover">
                        <template #error>
                            <div class="site-tile__icon-fallback">
                                <el-icon><Picture /></el-icon>
                            </div>
                        </template>
                    </el-image>
                    <div class="site-tile__text">
                        <div class="site-tile__name">{{ item.title }}</div>
                        <div class="site-tile__desc" :title="item.desc">{{ item.desc }}</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="site-card">
            <div class="site-section-head">
                <h2 class="site-section-title">{{ t('addon') }}</h2>
            </div>
            <div v-if="!addonList.length" class="site-empty">{{ t('emptyAddon') }}</div>
            <div v-else class="site-grid">
                <div class="site-tile" v-for="item in addonList" :key="item.key">
                    <el-image class="site-tile__icon" :src="item.icon ? img(item.icon) : ''" fit="cover">
                        <template #error>
                            <div class="site-tile__icon-fallback">
                                <el-icon><Picture /></el-icon>
                            </div>
                        </template>
                    </el-image>
                    <div class="site-tile__text">
                        <div class="site-tile__name">{{ item.title }}</div>
                        <div class="site-tile__desc" :title="item.desc">{{ item.desc }}</div>
                    </div>
                </div>
            </div>
        </section>

        <edit-site ref="editSiteDialog" @complete="loadSiteInfo()" />
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { t } from '@/lang'
import { ArrowLeft, Edit, Picture } from '@element-plus/icons-vue'
import { img } from '@/utils/common'
import { getSiteInfo } from '@/app/api/site'
import { useRoute, useRouter } from 'vue-router'
import EditSite from '@/app/views/site/components/edit-site.vue'
import useTabbarStore from '@/stores/modules/tabbar'

const tabbarStore = useTabbarStore()
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const id: number = parseInt(route.query.id as string)
const loading = ref(true)

const initialFormData = {
    site_id: 0,
    site_name: '',
    expire_time: 0,
    group_id: 0,
    group_name: '',
    logo: '',
    status: 0,
    create_time: '',
    site_addons: [] as Record<string, any>[],
    status_name: '',
    site_domain: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const addonItems = computed(() => Array.isArray(formData.site_addons) ? formData.site_addons : [])
const appList = computed(() => addonItems.value.filter((item: Record<string, any>) => item.type == 'app'))
const addonList = computed(() => addonItems.value.filter((item: Record<string, any>) => item.type == 'addon'))

const statusClass = computed(() => {
    if (formData.status == 1) return 'is-normal'
    if (formData.status == 2) return 'is-expired'
    return 'is-closed'
})

const parseTime = (value: unknown) => {
    if (value === 0 || value === '0' || value === '' || value == null) return null
    if (typeof value === 'number') {
        if (value <= 0) return null
        return value < 1e12 ? value * 1000 : value
    }
    const text = String(value).trim()
    if (!text || text.startsWith('1970-')) return null
    const matched = text.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2}))?/)
    if (!matched) return null
    return new Date(
        Number(matched[1]),
        Number(matched[2]) - 1,
        Number(matched[3]),
        Number(matched[4] || 0),
        Number(matched[5] || 0),
        Number(matched[6] || 0)
    ).getTime()
}

const displayTime = (value: unknown, emptyText: string) => {
    if (parseTime(value) == null) return emptyText
    if (typeof value === 'number') {
        const date = new Date(value < 1e12 ? value * 1000 : value)
        const pad = (num: number) => String(num).padStart(2, '0')
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    }
    return String(value)
}

const createTimeText = computed(() => displayTime(formData.create_time, '--'))
const expireTimeText = computed(() => displayTime(formData.expire_time, t('permanent')))
const appCountText = computed(() => t('appEnabledCount').replace('{count}', String(appList.value.length)))
const addonCountText = computed(() => t('itemCount').replace('{count}', String(addonList.value.length)))
const expireBadge = computed(() => {
    const time = parseTime(formData.expire_time)
    if (time == null) return ''
    const diff = time - Date.now()
    if (diff <= 0) return t('statusExpire')
    return t('expireSoon').replace('{days}', String(Math.ceil(diff / 86400000)))
})

const setFormData = async (siteId: number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getSiteInfo(siteId)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    loading.value = false
}
if (id) setFormData(id)
else loading.value = false

const loadSiteInfo = () => {
    setFormData(id)
}

const editSiteDialog: Record<string, any> | null = ref(null)

const editEvent = () => {
    editSiteDialog.value.setFormData(formData)
    editSiteDialog.value.showDialog = true
}

const back = () => {
    tabbarStore.removeTab(route.name as string)
    router.push({ path: '/admin/site/manage' })
}
</script>

<style lang="scss" scoped>
.site-detail {
    display: flex;
    flex-direction: column;
    gap: var(--sys-space-4);
}

.site-crumb {
    display: flex;
    align-items: center;
}

.site-back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    color: var(--sys-color-text-primary);
    cursor: pointer;

    &:hover {
        color: var(--sys-color-primary);
        border-color: var(--sys-color-primary);
    }
}

.site-crumb__text{
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-sm);
}

.site-crumb__current {
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-sm);
    font-weight: var(--sys-font-weight-medium);
}

.site-card {
    box-sizing: border-box;
    padding: var(--sys-space-6);
    background: var(--cmp-card-bg);
    border: 1px solid var(--sys-color-border-default);
    border-radius: 12px;
    box-shadow: none;
}

.site-header {
    display: flex;
    flex-direction: column;
    gap: var(--sys-space-5);
}

.site-header__top,
.site-identity,
.site-title-row,
.site-section-head {
    display: flex;
    align-items: center;
}

.site-header__top {
    justify-content: space-between;
    gap: var(--sys-space-4);
}

.site-identity {
    gap: var(--sys-space-4);
    min-width: 0;
}

.site-logo {
    flex: none;
    width: 56px;
    height: 56px;
    overflow: hidden;
    background: var(--sys-color-primary-soft);
    border-radius: 12px;
}

.site-logo__fallback {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.site-identity__text {
    min-width: 0;
}

.site-title-row {
    flex-wrap: wrap;
    gap: var(--sys-space-3);
}

.site-name {
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-xl);
    font-weight: var(--sys-font-weight-semibold);
    line-height: 28px;
}

.site-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: var(--sys-radius-full);
    background: var(--cmp-status-tag-default-bg);
    color: var(--cmp-status-tag-default-text);
    font-size: var(--sys-font-size-xs);
    font-weight: var(--sys-font-weight-medium);
    line-height: 18px;

    &.is-normal {
        background: var(--cmp-status-tag-success-bg);
        color: var(--cmp-status-tag-success-text);

        .site-tag__dot {
            background: var(--sys-color-success);
        }
    }

    &.is-expired {
        background: var(--cmp-status-tag-danger-bg);
        color: var(--cmp-status-tag-danger-text);

        .site-tag__dot {
            background: var(--sys-color-danger);
        }
    }
}

.site-tag__dot {
    width: 6px;
    height: 6px;
    border-radius: var(--sys-radius-full);
    background: var(--sys-color-text-placeholder);
}

.site-tag--primary {
    background: var(--sys-color-primary-soft);
    color: var(--sys-color-primary);
}

.site-edit-icon {
    margin-right: 6px;
}

.site-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-self: flex-start;
    gap: var(--sys-space-4) var(--sys-space-8);
    padding: 12px 20px;
    background: var(--sys-color-fill-lighter);
    border-radius: var(--sys-radius-lg);
}

.site-meta__item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.site-meta__label {
    color: var(--sys-color-text-placeholder);
    font-size: var(--sys-font-size-xs);
    line-height: 18px;
}

.site-meta__value {
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-sm);
    font-weight: var(--sys-font-weight-medium);
    line-height: 20px;
}

.site-meta__divider {
    width: 1px;
    height: 32px;
    background: var(--sys-color-border-default);
}

.site-expire {
    padding: 4px 10px;
    border-radius: var(--sys-radius-full);
    background: var(--cmp-status-tag-warning-bg);
    color: var(--cmp-status-tag-warning-text);
    font-size: var(--sys-font-size-xs);
    font-weight: var(--sys-font-weight-medium);
    line-height: 18px;
}

.site-section-head {
    gap: 10px;
}

.site-section-title {
    margin: 0;
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-md);
    font-weight: var(--sys-font-weight-semibold);
    line-height: 24px;
}

.site-empty {
    margin-top: var(--sys-space-4);
    color: var(--sys-color-text-placeholder);
    font-size: var(--sys-font-size-sm);
}

.site-count {
    padding: 2px 10px;
    border-radius: var(--sys-radius-full);
    background: var(--sys-color-fill-default);
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);
    font-weight: var(--sys-font-weight-medium);
    line-height: 18px;
}

.site-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--sys-space-4);
    margin-top: var(--sys-space-4);
}

.site-tile {
    display: flex;
    align-items: center;
    gap: var(--sys-space-3);
    min-width: 0;
    padding: 14px 16px;
    background: var(--cmp-card-bg);
    border: 1px solid var(--sys-color-border-default);
    border-radius: 10px;
    box-shadow: none;
    transition: border-color 0.2s;

    &:hover {
        border-color: var(--sys-color-primary-border);
    }
}

.site-tile__icon {
    flex: none;
    width: 44px;
    height: 44px;
    overflow: hidden;
    background: var(--sys-color-fill-light);
    border-radius: 10px;
}

.site-tile__icon-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--sys-color-text-placeholder);
    font-size: 18px;
}

.site-tile__text {
    flex: 1;
    min-width: 0;
}

.site-tile__name {
    overflow: hidden;
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-base);
    font-weight: var(--sys-font-weight-medium);
    line-height: 22px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.site-tile__desc {
    overflow: hidden;
    margin-top: 3px;
    color: var(--sys-color-text-placeholder);
    font-size: var(--sys-font-size-xs);
    line-height: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
