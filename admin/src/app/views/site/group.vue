<template>
    <!--站点套餐：内容挂在「站点管理」页签内，页面高度由 site/manage.vue 统一分配-->
    <el-card class="box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search" shadow="never">
                <div class="flex justify-between items-center">
                    <el-form :inline="true" :model="siteGroupTableData.searchParam" ref="searchFormRef" @submit.native.prevent>
                        <el-form-item :label="t('groupName')" prop="keywords">
                            <el-input v-model.trim="siteGroupTableData.searchParam.keywords" :placeholder="t('groupNamePlaceholder')" />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="loadSiteGroupList()">{{ t('search') }}</el-button>
                            <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>

            <div class="table-panel table-fill-page__panel">
                <table-toolbar :title="pageName" :selectable="false">
                    <template #actions>
                        <el-button type="primary" @click="addEvent">
                            {{ t('addSiteGroup') }}
                        </el-button>
                    </template>
                </table-toolbar>
                <div class="table-fill-page__table">
                    <div class="group-card-list" v-loading="siteGroupTableData.loading">
                        <div v-if="!siteGroupTableData.loading && !siteGroupTableData.data.length" class="group-card-empty">
                            {{ t('emptyData') }}
                        </div>
                        <div v-else class="group-card-grid">
                        <div v-for="row in siteGroupTableData.data" :key="row.group_id" class="group-card">
                            <div class="group-card__head">
                                <div class="min-w-0">
                                    <div class="group-card__name">{{ row.group_name }}</div>
                                    <div class="group-card__time">{{ t('createTime') }} {{ row.create_time }}</div>
                                </div>
                                <div class="shrink-0">
                                    <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                                    <el-button type="primary" link @click="deleteEvent(row.group_id)">{{ t('delete') }}</el-button>
                                </div>
                            </div>
                            <div class="group-card__block">
                                <div class="group-card__label">{{ t('appName') }}<template v-if="row.app_list.length"> · 共{{ row.app_list.length }}项应用</template></div>
                                <div class="group-card__tags" v-fit-tags="`app-${row.group_id}`">
                                    <div v-if="row.app_list.length" class="group-card__tags-measure" aria-hidden="true">
                                        <el-tag v-for="item in row.app_list" :key="`m-${item.key}`" effect="plain">{{ item.title }}</el-tag>
                                        <span class="iconfont icongengduopc group-more"></span>
                                    </div>
                                    <template v-if="row.app_list.length">
                                        <el-tag v-for="item in visibleTags(`app-${row.group_id}`, row.app_list)" :key="item.key" effect="plain">{{ item.title }}</el-tag>
                                        <el-tooltip v-if="hiddenTags(`app-${row.group_id}`, row.app_list).length" placement="top" effect="dark">
                                            <template #content>
                                                <div class="group-more-tip">
                                                    <span v-for="item in hiddenTags(`app-${row.group_id}`, row.app_list)" :key="item.key">{{ item.title }}</span>
                                                </div>
                                            </template>
                                            <span class="iconfont icongengduopc group-more"></span>
                                        </el-tooltip>
                                    </template>
                                    <span v-else class="group-card__none">无</span>
                                </div>
                            </div>
                            <div class="group-card__block">
                                <div class="group-card__label">{{ t('addonName') }}<template v-if="row.addon_list.length"> · 共{{ row.addon_list.length }}项插件</template></div>
                                <div class="group-card__tags" v-fit-tags="`addon-${row.group_id}`">
                                    <div v-if="row.addon_list.length" class="group-card__tags-measure" aria-hidden="true">
                                        <el-tag v-for="item in row.addon_list" :key="`m-${item.key}`" effect="plain">{{ item.title }}</el-tag>
                                        <span class="iconfont icongengduopc group-more"></span>
                                    </div>
                                    <template v-if="row.addon_list.length">
                                        <el-tag v-for="item in visibleTags(`addon-${row.group_id}`, row.addon_list)" :key="item.key" effect="plain">{{ item.title }}</el-tag>
                                        <el-tooltip v-if="hiddenTags(`addon-${row.group_id}`, row.addon_list).length" placement="top" effect="dark">
                                            <template #content>
                                                <div class="group-more-tip">
                                                    <span v-for="item in hiddenTags(`addon-${row.group_id}`, row.addon_list)" :key="item.key">{{ item.title }}</span>
                                                </div>
                                            </template>
                                            <span class="iconfont icongengduopc group-more"></span>
                                        </el-tooltip>
                                    </template>
                                    <span v-else class="group-card__none">无</span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="group-pagination" v-if="siteGroupTableData.total">
                    <el-pagination
                        v-model:current-page="siteGroupTableData.page"
                        v-model:page-size="siteGroupTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="siteGroupTableData.total"
                        @size-change="loadSiteGroupList()"
                        @current-change="loadSiteGroupList"
                    />
                </div>
            </div>
</template>

<script lang="ts" setup>
import { ref, reactive, type Directive } from 'vue'
import { t } from '@/lang'
import { getSiteGroupList, deleteSiteGroup } from '@/app/api/site'
import { ElMessageBox, FormInstance } from 'element-plus'
import TableToolbar from '@/components/table-toolbar/index.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pageName = '站点套餐'

// 按当前行宽决定能放下几个标签，其余进「更多」，避免窗口变窄后换行
const visibleCountMap = reactive<Record<string, number>>({})
const fitTagsMap = new WeakMap<HTMLElement, { key: string, retry: number, observer: ResizeObserver, measure: () => void }>()

const measureFitTags = (el: HTMLElement) => {
    const state = fitTagsMap.get(el)
    if (!state) return
    const available = el.clientWidth
    if (available <= 0) return
    const measureEl = el.querySelector('.group-card__tags-measure') as HTMLElement | null
    if (!measureEl) return
    const tags = Array.from(measureEl.querySelectorAll('.el-tag')) as HTMLElement[]
    if (!tags.length) return
    if (tags.some(tag => tag.offsetWidth === 0)) {
        if (state.retry < 5) {
            state.retry += 1
            requestAnimationFrame(() => state.measure())
        }
        return
    }
    state.retry = 0
    const more = measureEl.querySelector('.group-more') as HTMLElement | null
    const moreWidth = more?.offsetWidth || 0
    const gap = parseFloat(getComputedStyle(measureEl).columnGap) || 0
    let used = 0
    let count = 0
    for (let i = 0; i < tags.length; i++) {
        const reserve = i < tags.length - 1 ? gap + moreWidth : 0
        const next = used + (count > 0 ? gap : 0) + tags[i].offsetWidth
        if (next + reserve > available) break
        used = next
        count++
    }
    if (visibleCountMap[state.key] !== count) visibleCountMap[state.key] = count
}

const vFitTags: Directive<HTMLElement, string> = {
    mounted(el, binding) {
        const state = {
            key: binding.value,
            retry: 0,
            observer: null as unknown as ResizeObserver,
            measure: () => {}
        }
        state.measure = () => measureFitTags(el)
        state.observer = new ResizeObserver(() => state.measure())
        fitTagsMap.set(el, state)
        state.observer.observe(el)
        state.measure()
        document.fonts?.ready.then(() => {
            if (fitTagsMap.get(el) === state) state.measure()
        })
    },
    updated(el, binding) {
        const state = fitTagsMap.get(el)
        if (!state) return
        state.key = binding.value
        state.measure()
    },
    unmounted(el) {
        const state = fitTagsMap.get(el)
        state?.observer.disconnect()
        fitTagsMap.delete(el)
        if (state?.key) delete visibleCountMap[state.key]
    }
}

const tagLineCount = (key: string, total: number) => {
    const count = visibleCountMap[key]
    return count == null ? total : count
}

const visibleTags = (key: string, list: any[]) => list.slice(0, tagLineCount(key, list.length))
const hiddenTags = (key: string, list: any[]) => list.slice(tagLineCount(key, list.length))

const searchFormRef = ref<FormInstance>()

const siteGroupTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        keywords: ''
    }
})

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.resetFields()
    loadSiteGroupList()
}

/**
 * 获取分组列表
 */
const loadSiteGroupList = (page: number = 1) => {
    siteGroupTableData.loading = true
    siteGroupTableData.page = page

    getSiteGroupList({
        page: siteGroupTableData.page,
        limit: siteGroupTableData.limit,
        ...siteGroupTableData.searchParam
    }).then(res => {
        siteGroupTableData.loading = false
        siteGroupTableData.data = res.data.data
        siteGroupTableData.total = res.data.total
    }).catch(() => {
        siteGroupTableData.loading = false
    })
}
loadSiteGroupList()

/**
 * 添加分组
 */
const addEvent = () => {
    router.push('/admin/site/group_edit')
}

/**
 * 编辑分组
 * @param data
 */
const editEvent = (data: any) => {
    router.push({ path: '/admin/site/group_edit', query: { id: data.group_id } })
}

/**
 * 删除分组
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('groupDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteSiteGroup(id).then(() => {
            loadSiteGroupList()
        }).catch(() => {
        })
    })
}
</script>

<style lang="scss" scoped>
.group-card-list {
    flex: 1;
    width: 100%;
    min-height: 0;
    overflow: auto;
    padding: 12px 16px 16px;
    box-sizing: border-box;
}

.group-card-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    align-content: start;
}

.group-pagination {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    padding: var(--space-3) 0;
}

:deep(.group-pagination .el-pagination) {
    --el-pagination-font-size: var(--sys-font-size-sm);
}

.group-card-empty {
    padding: 48px 0;
    text-align: center;
    color: var(--el-text-color-secondary);
}

.group-card {
    min-width: 0;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 8px;
    padding: 14px 16px;
    background: var(--el-bg-color);
}

.group-card__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
}

.group-card__name {
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
}

.group-card__time {
    margin-top: 4px;
    font-size: 12px;
    line-height: 18px;
    color: var(--el-text-color-secondary);
}

.group-card__block {
    margin-top: 12px;
}

.group-card__label {
    margin-bottom: 8px;
    overflow: hidden;
    font-size: 12px;
    line-height: 18px;
    color: var(--el-text-color-secondary);
    white-space: nowrap;
    text-overflow: ellipsis;
}

.group-card__tags {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 8px;
    min-width: 0;
    overflow: hidden;
}

.group-card__tags-measure {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 8px;
    width: max-content;
    visibility: hidden;
    pointer-events: none;
}

.group-card__tags :deep(.el-tag) {
    flex-shrink: 0;
    margin: 0;
}

.group-card__none {
    font-size: 13px;
    color: var(--el-text-color-placeholder);
}

.group-more {
    flex-shrink: 0;
    color: var(--el-color-primary);
    cursor: pointer;
    font-size: 32px;
    line-height: 24px;
}
</style>
<style>
.group-more-tip {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 10px;
    max-width: 360px;
}
</style>
