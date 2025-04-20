<template>
    <!--用户详情-->
    <div class="main-container" v-loading="loading">

       <el-card class="card !border-none" shadow="never">
           <el-page-header :content="pageName" :icon="ArrowLeft" @back="back()" />
       </el-card>

        <el-card class="box-card mt-[15px] !border-none" shadow="never">
            <h3 class="panel-title !text-sm">{{ t('userInfo') }}</h3>

            <el-row :gutter="20" class="mt-[20px] mb-[20px]">
                <el-col :span="6">
                    <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('uid') }}</span>
                    <span class="text-[14px] text-[#666666]">
                        {{ detail.uid }}
                    </span>
                </el-col>
                <el-col :span="6" :offset="6">
                    <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('username') }}</span>
                    <span class="text-[14px] text-[#666666]">
                        {{ detail.username }}
                    </span>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mb-[20px]">
                <el-col :span="6">
                    <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('realname') }}</span>
                    <span class="text-[14px] text-[#666666]">
                        {{ detail.real_name || '--' }}
                    </span>
                </el-col>
                <el-col :span="6" :offset="6">
                    <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('addTime') }}</span>
                    <span class="text-[14px] text-[#666666]">
                        {{ detail.create_time }}
                    </span>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mb-[20px]">
                <el-col :span="6">
                    <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('lastLoginTime') }}</span>
                    <span class="text-[14px] text-[#666666]">
                        {{ detail.last_time || '' }}
                    </span>
                </el-col>
                <el-col :span="6" :offset="6">
                    <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('lastLoginIP') }}</span>
                    <span class="text-[14px] text-[#666666]">
                        {{ detail.last_ip || '' }}
                    </span>
                </el-col>
            </el-row>
        </el-card>

        <el-card class="box-card mt-[15px] !border-none" shadow="never">
            <el-tabs v-model="currTab" @tab-click="handleClick">
                <el-tab-pane :label="t('siteInfo')" name="siteInfo">
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
                </el-tab-pane>
                <el-tab-pane :label="t('userCreateSiteLimit')" name="userCreateSiteLimit" v-if="!detail.is_super_admin">
                    <div class="flex justify-end mb-[16px]">
                        <el-button type="primary" @click="createSiteLimitRef.setFormData()">{{ t('addSserCreateSiteLimit') }}</el-button>
                    </div>
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
                </el-tab-pane>
            </el-tabs>
        </el-card>

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

<style lang="scss" scoped></style>
