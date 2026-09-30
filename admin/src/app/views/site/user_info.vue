<template>
    <!--用户详情-->
    <div class="user-detail" v-loading="loading">
        <el-page-header :content="pageName" :icon="ArrowLeft" @back="back()" />

        <section class="user-card user-header">
            <div class="user-identity">
                <img v-if="detail.head_img" class="user-avatar" :src="img(detail.head_img)" alt="">
                <img v-else class="user-avatar" src="@/app/assets/images/member_head.png" alt="">
                <div class="user-identity__text">
                    <div class="user-title-row">
                        <span class="user-name">{{ detail.username }}</span>
                        <span v-if="detail.is_super_admin" class="user-tag">超级管理员</span>
                    </div>
                    <div class="user-sub">
                        <span class="user-sub__label">{{ t('uid') }}</span>
                        <span class="user-sub__value">{{ detail.uid }}</span>
                    </div>
                </div>
            </div>
            <div class="user-meta">
                <div class="user-meta__item">
                    <span class="user-meta__label">{{ t('addTime') }}</span>
                    <span class="user-meta__value">{{ detail.create_time }}</span>
                </div>
                <i class="user-meta__divider"></i>
                <div class="user-meta__item">
                    <span class="user-meta__label">{{ t('lastLoginTime') }}</span>
                    <span class="user-meta__value">{{ detail.last_time || '' }}</span>
                </div>
                <i class="user-meta__divider"></i>
                <div class="user-meta__item">
                    <span class="user-meta__label">{{ t('lastLoginIP') }}</span>
                    <span class="user-meta__value">{{ detail.last_ip || '' }}</span>
                </div>
            </div>
        </section>

        <section class="user-card">
            <h2 class="user-section-title">{{ t('userInfo') }}</h2>
            <div class="user-info-grid">
                <div class="user-info-col">
                    <div class="user-field">
                        <span class="user-field__label">{{ t('uid') }}</span>
                        <span class="user-field__value">{{ detail.uid }}</span>
                    </div>
                    <div class="user-field">
                        <span class="user-field__label">{{ t('realname') }}</span>
                        <span class="user-field__value" :class="{ 'is-empty': !detail.real_name }">{{ detail.real_name || '--' }}</span>
                    </div>
                </div>
                <div class="user-info-col">
                    <div class="user-field">
                        <span class="user-field__label">{{ t('username') }}</span>
                        <span class="user-field__value">{{ detail.username }}</span>
                    </div>
                    <div class="user-field">
                        <span class="user-field__label">{{ t('手机号') }}</span>
                        <span class="user-field__value" :class="{ 'is-empty': !detail.mobile }">{{ detail.mobile || '--' }}</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="user-card user-tab-card">
            <el-tabs v-model="currTab" class="user-tabs">
                <el-tab-pane :label="t('siteInfo')" name="siteInfo">
                    <div class="table-panel">
                    <el-table :data="detail.roles" size="large">
                        <el-table-column prop="site_id" :label="t('siteId')" width="100px" />
                        <el-table-column prop="site_name" :label="t('siteName')" />
                        <el-table-column prop="is_admin" :label="t('isAdmin')" min-width="180" align="center">
                            <template #default="{ row }">
                                {{ row.is_admin ? t('yes') : t('no') }}
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('status')" min-width="80" align="center">
                            <template #default="{ row }">
                                <template v-if="row.site_status_name">
                                    <el-tag class="ml-2" type="success" v-if="row.site_status == 1">{{ row.site_status_name }}</el-tag>
                                    <el-tag class="ml-2" type="error" v-else-if="row.site_status == 3">
                                        {{ row.site_status_name }}
                                    </el-tag>
                                    <el-tag class="ml-2" type="error" v-else>
                                        {{ row.site_status_name }}
                                    </el-tag>
                                </template>
                                <el-tag class="ml-2" type="error" v-else>
                                    {{ t('siteEmpty') }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="expire_time" :label="t('expireTime')" />
                        <el-table-column :label="t('operation')" align="right" fixed="right">
                            <template #default="{ row }">
                                <el-button type="primary" link @click="siteInfo(row)" v-if="row.site_status_name">{{ t('info') }}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="t('userCreateSiteLimit')" name="userCreateSiteLimit" v-if="!detail.is_super_admin">
                    <div class="flex justify-end mb-[16px]">
                        <el-button type="primary" @click="createSiteLimitRef.setFormData()">{{ t('addSserCreateSiteLimit') }}</el-button>
                    </div>
                    <div class="table-panel">
                    <el-table :data="userCreateSiteLimit" size="large">
                        <el-table-column :label="t('siteGroup')">
                            <template #default="{ row }">
                                {{ siteGroup[row.group_id] ? siteGroup[row.group_id].group_name : '' }}
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('createdSiteNum')">
                            <template #default="{ row }">
                                {{ siteGroup[row.group_id] ? siteGroup[row.group_id].site_num : 0 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="num" :label="t('createSiteNum')" align="center"/>
                        <el-table-column prop="month" :label="t('createSiteTimeLimit')" align="center">
                            <template #default="{ row }">
                                {{ row.month }}个{{ t('month') }}
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('operation')" align="right" fixed="right">
                            <template #default="{ row }">
                                <el-button type="primary" link @click="createSiteLimitRef.setFormData(row.id)">{{ t('edit') }}</el-button>
                                <el-button type="primary" link @click="deleteCreateSiteTimeLimit(row.id)">{{ t('delete') }}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </section>

        <create-site-limit ref="createSiteLimitRef" :site-group="siteGroup" :uid="uid" @complete="getUserCreateSiteLimitFn"/>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import { useRoute, useRouter } from 'vue-router'
import { getUserInfo, getUserCreateSiteLimit, delUserCreateSiteLimit } from '@/app/api/user'
import { getUserSiteGroupAll } from '@/app/api/site'
import { ArrowLeft } from '@element-plus/icons-vue'
import { img } from '@/utils/common'
import createSiteLimit from './components/create-site-limit.vue'
import { ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const back = () => {
    router.push('/admin/site/user')
}
const uid: number = parseInt(route.query.uid || 0)
const loading = ref(true)
const detail = ref({})
const currTab = ref(route.query.tab || 'siteInfo')
const siteGroup = ref({})
const userCreateSiteLimit = ref([])
const createSiteLimitRef = ref(null)

getUserInfo(uid).then(({ data }) => {
    detail.value = data
    loading.value = false
}).catch()

getUserSiteGroupAll({ uid }).then(({ data }) => {
    const list: any = {}
    data.forEach((item: any) => {
        list[item.group_id] = item
    })
    siteGroup.value = list
})

const getUserCreateSiteLimitFn = () => {
    getUserCreateSiteLimit(uid).then(({ data }) => {
        userCreateSiteLimit.value = data
    })
}
getUserCreateSiteLimitFn()

/**
 * 站点详情
 * @param data
 */
const siteInfo = (data: any) => {
    router.push({ path: '/admin/site/info', query: { id: data.site_id } })
}

const deleteCreateSiteTimeLimit = (id: number) => {
    ElMessageBox.confirm(t('createSiteTimeLimitDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        delUserCreateSiteLimit(id).then(() => {
            getUserCreateSiteLimitFn()
        }).catch(() => {
        })
    })
}
</script>

<style lang="scss" scoped>
.user-detail {
    display: flex;
    flex-direction: column;
    gap: var(--sys-space-4);
}

.user-crumb,
.user-identity,
.user-title-row,
.user-sub {
    display: flex;
    align-items: center;
}

.user-crumb {
    gap: 10px;
}

.user-back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    color: var(--sys-color-text-secondary);
    background: var(--cmp-card-bg);
    border: 1px solid var(--sys-color-border-default);
    border-radius: var(--sys-radius-full);
    cursor: pointer;

    &:hover {
        color: var(--sys-color-primary);
        border-color: var(--sys-color-primary);
    }
}

.user-crumb__text,
.user-crumb__sep {
    color: var(--sys-color-text-placeholder);
    font-size: var(--sys-font-size-sm);
}

.user-crumb__current {
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-sm);
    font-weight: var(--sys-font-weight-medium);
}

.user-card {
    box-sizing: border-box;
    padding: var(--sys-space-6);
    background: var(--cmp-card-bg);
    border: 1px solid var(--sys-color-border-default);
    border-radius: 12px;
    box-shadow: none;
}

.user-header {
    display: flex;
    flex-direction: column;
    gap: var(--sys-space-5);
}

.user-identity {
    gap: var(--sys-space-4);
    min-width: 0;
}

.user-avatar {
    flex: none;
    width: 56px;
    height: 56px;
    object-fit: cover;
    background: var(--sys-color-primary-soft);
    border-radius: var(--sys-radius-full);
}

.user-identity__text {
    display: flex;
    flex-direction: column;
    gap: var(--sys-space-2);
    min-width: 0;
}

.user-title-row {
    flex-wrap: wrap;
    gap: var(--sys-space-3);
}

.user-name {
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-xl);
    font-weight: var(--sys-font-weight-semibold);
    line-height: 28px;
}

.user-tag {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: var(--sys-radius-full);
    background: var(--sys-color-primary-soft);
    color: var(--sys-color-primary);
    font-size: var(--sys-font-size-xs);
    font-weight: var(--sys-font-weight-medium);
    line-height: 18px;
}

.user-sub {
    gap: var(--sys-space-2);
}

.user-sub__label,
.user-field__label,
.user-meta__label {
    color: var(--sys-color-text-placeholder);
    font-size: var(--sys-font-size-xs);
    line-height: 18px;
}

.user-sub__value {
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);
    font-weight: var(--sys-font-weight-medium);
    line-height: 18px;
}

.user-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-self: flex-start;
    gap: var(--sys-space-4) var(--sys-space-8);
    padding: 12px 20px;
    background: var(--sys-color-fill-lighter);
    border-radius: var(--sys-radius-lg);
}

.user-meta__item,
.user-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.user-meta__value {
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-sm);
    font-weight: var(--sys-font-weight-medium);
    line-height: 20px;
}

.user-meta__divider {
    width: 1px;
    height: 32px;
    background: var(--sys-color-border-default);
}

.user-section-title {
    margin: 0;
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-md);
    font-weight: var(--sys-font-weight-semibold);
    line-height: 24px;
}

.user-info-grid {
    display: flex;
    gap: var(--sys-space-6);
    margin-top: var(--sys-space-5);
}

.user-info-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--sys-space-4);
    min-width: 0;
}

.user-field__value {
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-base);
    font-weight: var(--sys-font-weight-medium);
    line-height: 22px;

    &.is-empty {
        color: var(--sys-color-text-placeholder);
    }
}

.user-tab-card {
    padding: 0 var(--sys-space-6) var(--sys-space-6);

    :deep(.table-panel) {
        margin-top: 0 !important;
        padding: 0;
        background: transparent;
        border: none;
        border-radius: 0;
    }
}

.user-tabs {
    :deep(.el-tabs__header) {
        margin: 0 0 var(--sys-space-5);
    }

    :deep(.el-tabs__nav-wrap::after) {
        height: 1px;
        background-color: var(--sys-color-border-light);
    }

    :deep(.el-tabs__item) {
        height: 48px;
        color: var(--sys-color-text-secondary);
        font-size: var(--sys-font-size-base);
        font-weight: var(--sys-font-weight-regular);
    }

    :deep(.el-tabs__item.is-active),
    :deep(.el-tabs__item:hover) {
        color: var(--sys-color-primary);
    }

    :deep(.el-tabs__item.is-active) {
        font-weight: var(--sys-font-weight-medium);
    }

    :deep(.el-tabs__active-bar) {
        height: 2px;
        background-color: var(--sys-color-primary);
    }
}
</style>
