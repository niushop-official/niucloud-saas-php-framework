<template>
    <div class="list-block">
        <el-tabs v-model="activeTab">
            <!-- 站点排行 -->
            <el-tab-pane :label="t('rankTab')" name="rank">
                <el-table :data="sites.rank_list" size="large" :empty-text="t('noData')">
                    <el-table-column :label="t('rank')" width="80">
                        <template #default="{ $index }">
                            <span class="rank-badge" :class="rankClass($index)">{{ $index + 1 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="site_name" :label="t('siteName')" min-width="180" show-overflow-tooltip />
                    <el-table-column prop="member_count" :label="t('memberCount')" width="120" />
                    <el-table-column prop="status_name" :label="t('status')" width="100" />
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="130" />
                </el-table>
            </el-tab-pane>

            <!-- 到期提醒 -->
            <el-tab-pane :label="t('expireTab')" name="expire">
                <el-table :data="sites.expire_list" size="large" :empty-text="t('noData')">
                    <el-table-column prop="site_name" :label="t('siteName')" min-width="180" show-overflow-tooltip />
                    <el-table-column prop="expire_time" :label="t('expireTime')" min-width="140" />
                    <el-table-column :label="t('remainDays')" width="120">
                        <template #default="{ row }">
                            <span class="tag tag--warn">{{ row.days }} {{ t('dayUnit') }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>

            <!-- 静默站点 -->
            <el-tab-pane name="silent">
                <template #label>
                    <span>
                        {{ t('silentTab') }}
                        <span class="tab-count" v-if="silentCount > 0">({{ silentCount }})</span>
                    </span>
                </template>
                <p class="tab-tip">{{ t('silentTip') }}</p>
                <el-table :data="sites.silent_list" size="large" :empty-text="t('noData')">
                    <el-table-column prop="site_name" :label="t('siteName')" min-width="180" show-overflow-tooltip />
                    <el-table-column prop="member_count" :label="t('memberCount')" width="110" />
                    <el-table-column :label="t('lastMemberTime')" min-width="140">
                        <template #default="{ row }">{{ row.last_member_time || '—' }}</template>
                    </el-table-column>
                    <el-table-column :label="t('silentDays')" width="120">
                        <template #default="{ row }">
                            <span class="tag tag--warn">{{ row.silent_days }} {{ t('dayUnit') }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'

withDefaults(defineProps<{
    sites: Record<string, any>
    silentCount?: number
}>(), {
    silentCount: 0
})

const activeTab = ref('rank')

const rankClass = (index: number) => {
    if (index === 0) return 'rank-badge--gold'
    if (index === 1) return 'rank-badge--silver'
    if (index === 2) return 'rank-badge--bronze'
    return ''
}
</script>

<style lang="scss" scoped>
.list-block {
    padding: var(--space-4);
    background-color: var(--sys-color-bg-surface);
    border: 1px solid var(--sys-color-border-light);
    border-radius: var(--sys-radius-lg);
}

.tab-count {
    color: var(--sys-color-warning);
    font-size: var(--sys-font-size-xs);
}

.tab-tip {
    margin-bottom: var(--space-3);
    color: var(--sys-color-text-placeholder);
    font-size: var(--sys-font-size-xs);
    line-height: 18px;
}

.tag {
    display: inline-flex;
    align-items: center;
    height: var(--cmp-status-tag-height);
    padding: 0 var(--cmp-status-tag-padding-inline);
    font-size: var(--cmp-status-tag-font-size);
    border-radius: var(--cmp-status-tag-radius);

    &--warn {
        color: var(--cmp-status-tag-warning-text);
        background-color: var(--cmp-status-tag-warning-bg);
    }
}

.rank-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);
    font-weight: var(--sys-font-weight-semibold);
    border-radius: var(--sys-radius-full);
    background-color: var(--sys-color-fill-light);

    &--gold {
        color: #fff;
        background: linear-gradient(135deg, #f7ba2a, #e6a23c);
    }

    &--silver {
        color: #fff;
        background: linear-gradient(135deg, #c0c4cc, #909399);
    }

    &--bronze {
        color: #fff;
        background: linear-gradient(135deg, #d9a06b, #b8825a);
    }
}
</style>
