<template>
    <!--站点列表-->
    <div class="main-container">
        <el-card class="box-card !border-none setting-card" shadow="never">
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <div class="flex justify-between items-start">
                    <el-form :inline="true" :model="siteTableData.searchParam" ref="searchFormRef" class="search-form w-[80%]">
                        <el-form-item prop="keywords">
                            <el-input v-model.trim="siteTableData.searchParam.keywords" :placeholder="t('siteNamePlaceholder')" />
                        </el-form-item>

                        <el-form-item prop="site_domain" v-if="isShow">
                            <el-input v-model.trim="siteTableData.searchParam.site_domain" :placeholder="t('siteDomainPlaceholder')" />
                        </el-form-item>

                        <el-form-item prop="app">
                            <el-select v-model="siteTableData.searchParam.app" clearable @change="appChangeFn" :placeholder="t('appIdPlaceholder')" class="input-width">
                                <el-option :label="t('selectPlaceholder')" value="all" />
                                <el-option :label="item['title']" :value="item['key']" v-for="(item, index) in Object.values(addonList)"  :key="index"/>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="group_id">
                            <el-select v-model="siteTableData.searchParam.group_id" clearable :placeholder="t('groupIdPlaceholder')" class="input-width">
                                <el-option :label="t('selectPlaceholder')" value="" />
                                <el-option :label="item['group_name']" :value="item['group_id']" v-for="(item, index) in groupList.all" :key="index"/>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="status">
                            <el-select v-model="siteTableData.searchParam.status" clearable :placeholder="t('请选择状态')" class="input-width">
                                <el-option :label="t('selectPlaceholder')" value="" />
                                <el-option :label="item" :value="index" v-for="(item, index) in statusList" :key="index"/>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="create_time" v-if="isShow">
                            <el-date-picker v-model="siteTableData.searchParam.create_time" type="datetimerange"
                                value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                                :end-placeholder="t('endDate')" />
                        </el-form-item>

                        <el-form-item prop="expire_time" v-if="isShow">
                            <el-date-picker v-model="siteTableData.searchParam.expire_time" type="datetimerange"
                                value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                                :end-placeholder="t('endDate')" />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="loadSiteList()">{{ t('search') }}</el-button>
                            <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                            <el-button type="primary" link @click="isShow = !isShow">{{ isShow ? t('收起') : t('更多') }} <span class="iconfont iconjiantouxia ml-[4px] !text-[10px] mr-[10px] transition-transform duration-300" :class="{ 'rotate-180': isShow }"></span></el-button>
                        </el-form-item>
                    </el-form>
                    <div class="flex justify-end items-center w-[20%]">
                        <div>
                            <el-button type="primary" class="w-[100px]" @click="addEvent">
                                {{ t('addSite') }}
                            </el-button>
                            <el-button class="w-[100px]" @click="toSiteLink()">
                                {{ t('toSite') }}
                            </el-button>
                        </div>
                    </div>
                </div>
                
            </el-card>

            <div class="mt-[20px]">
                <el-table :data="siteTableData.data" size="large" v-loading="siteTableData.loading">
                    <template #empty>
                        <span>{{ !siteTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="site_id" :label="t('siteId')" width="100" :show-overflow-tooltip="true" />

                    <el-table-column :label="t('siteInfo')" width="300" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <img class="w-[54px] h-[54px] mr-[10px] rounded-[4px]" v-if="row.logo" :src="img(row.logo)" alt="">
                                <img class="w-[54px] h-[54px] mr-[10px] rounded-[4px]" v-else src="@/app/assets/images/site_default.png" alt="">
                                <div class="flex flex-col">
                                    <span>{{ row.site_name || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('manager')" width="150" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <div class="flex flex-col">
                                    <span>{{ row.admin.username || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="group_name" :label="t('groupId')" width="150" :show-overflow-tooltip="true" />
                    <el-table-column prop="site_domain" :label="t('siteDomain')" width="250" :show-overflow-tooltip="true" />
                    <el-table-column prop="create_time" :label="t('createTime')" width="200" :show-overflow-tooltip="true" />
                    <el-table-column prop="expire_time" :label="t('expireTime')" width="200" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-if="row.expire_time == 0">永久</div>
                            <div v-else>{{ row.expire_time }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('status')" width="100" align="center">
                        <template #default="{ row }">
                            <el-tag class="ml-2" type="success" v-if="row.status == 1">{{ row.status_name }}</el-tag>
                            <el-tag class="ml-2" type="error" v-else-if="row.status == 3">
                                {{ row.status_name }}
                            </el-tag>
                            <el-tag class="ml-2" type="error" v-else>
                                {{ row.status_name }}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" min-width="150" align="right" fixed="right">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="openClose(row.status, row.site_id)" v-if="row.status == 1 || row.status == 3">{{ row.status == 1 ? t('closeTxt') : t('openTxt') }}</el-button>
                            <el-button type="primary" link @click="toSiteLink(row.site_id)">{{ t('toSite') }}</el-button>
                            <!-- <el-dropdown>
                                <span class="el-dropdown-link ml-[12px] h-[20px] leading-[24px] text-[var(--el-color-primary)]">
                                    更多
                                </span>
                                <template #dropdown>
                                    <div class="flex flex-col py-[5px] px-[10px]">
                                        <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                                        <el-button type="primary" class="mt-[5px] !ml-[0]" link @click="deleteEvent(row)">{{ t('delete') }}</el-button>
                                        <el-button type="primary" class="mt-[5px] !ml-[0]" link @click="infoEvent(row)">{{ t('info') }}</el-button>
                                    </div>
                                </template>
                            </el-dropdown> -->
                            <div class="manage-option text-right">
                                <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                                <el-button type="primary" link @click="deleteEvent(row)">{{ t('delete') }}</el-button>
                                <el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="siteTableData.page" v-model:page-size="siteTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="siteTableData.total"
                        @size-change="loadSiteList()" @current-change="loadSiteList" />
                </div>
            </div>

        </el-card>
        <edit-site ref="addSiteDialog" @complete="loadSiteList()" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getToken, img } from '@/utils/common'
import { t } from '@/lang'
import { getSiteList, getSiteGroupAll, getStatusList, closeSite, openSite, deleteSite } from '@/app/api/site'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import EditSite from '@/app/views/site/components/edit-site.vue'
import { getInstalledAddonList } from '@/app/api/addon'
import useUserStore from '@/stores/modules/user'
import {deleteUser} from "@/app/api/user";

const prop = defineProps({
    status: {
        type: String,
        default: ''
    }
})

const groupList = ref({
    all: []
})
const isShow = ref(false)
const statusList = ref([])

const siteTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        keywords: '',
        group_id: '',
        app: 'all',
        status: '',
        site_domain: '',
        create_time: [],
        expire_time: []
    }
})
// siteTableData.searchParam.status = route.query.id || ''
siteTableData.searchParam.status = prop.status || ''
const setGroupList = async () => {
    const obj = await (await getSiteGroupAll({})).data

    groupList.value.all = obj
    obj.forEach((item:any, index:any) => {
        if (!groupList.value[item.app]) {
            groupList.value[item.app] = []
            groupList.value[item.app].push(item)
        } else {
            groupList.value[item.app].push(item)
        }
    })
}
setGroupList()

const setStatusList = async () => {
    statusList.value = await (await getStatusList()).data
}

setStatusList()

const searchFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.resetFields()
    loadSiteList()
}

/**
 * 应用选择
 */
const appChangeFn = () => {
    siteTableData.searchParam.group_id = ''
}

/**
 * 获取应用列表
 */
const addonList = ref([])
getInstalledAddonList().then(({ data }) => {
    addonList.value = data
}).catch()

/**
 * 获取站点列表
 */
const loadSiteList = (page: number = 1) => {
    siteTableData.loading = true
    siteTableData.page = page
    siteTableData.searchParam.app = siteTableData.searchParam.app == 'all' ? '' : siteTableData.searchParam.app
    getSiteList({
        page: siteTableData.page,
        limit: siteTableData.limit,
        ...siteTableData.searchParam
    }).then(res => {
        siteTableData.loading = false
        siteTableData.data = res.data.data
        siteTableData.total = res.data.total
    }).catch(() => {
        siteTableData.loading = false
    })
}
loadSiteList()

const router = useRouter()

const addSiteDialog: Record<string, any> | null = ref(null)
/**
 * 添加站点
 */
const addEvent = (data: any) => {
    addSiteDialog.value.setFormData()
    addSiteDialog.value.showDialog = true
}

/**
 * 站点详情
 * @param data
 */
const infoEvent = (data: any) => {
    router.push({ path: '/admin/site/info', query: { id: data.site_id } })
}

/**
 * 编辑站点详情
 * @param data
 */
const editEvent = (data: any) => {
    addSiteDialog.value.setFormData(data)
    addSiteDialog.value.showDialog = true
}

/**
 * 站点登录
 * @param siteId
 */
const toSiteLink = (siteId:number = 0) => {
    window.localStorage.setItem('site.token', getToken())
    window.localStorage.setItem('site.comparisonTokenStorage', getToken())
    window.localStorage.setItem('site.userinfo', JSON.stringify(useUserStore().userInfo))
    if (siteId) {
        const userinfo = useUserStore().userInfo
        if (userinfo.is_super_admin != undefined && !userinfo.is_super_admin) {
            const siteIds = userinfo.site_ids || []
            if (siteIds.indexOf(siteId) == -1) {
                ElMessage({
                    message: t('noPermission'),
                    type: 'warning'
                })
                return
            }
        }
        window.localStorage.setItem('site.siteId', siteId)
        window.localStorage.setItem('site.comparisonSiteIdStorage', siteId)
        window.open(`${location.origin}/site/`)
    } else {
        // window.open(`${location.origin}/home/index`)
        router.push({ path: '/home/index' })
    }

}

const openClose = (i, site_id) => {
    if (i == 1) {
        ElMessageBox.confirm(t('closeSiteTips'), t('warning'),
            {
                confirmButtonText: t('confirm'),
                cancelButtonText: t('cancel'),
                type: 'warning'
            }
        ).then(() => {
            closeSite({ site_id }).then(res => {
                loadSiteList()
            })
        })
    }
    if (i == 3) {
        openSite({ site_id }).then(res => {
            loadSiteList()
        })
    }
}

const deleteEvent = (data: any) => {
    ElMessageBox.confirm(t('siteDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteSite(data.site_id).then(res => {
            loadSiteList()
        }).catch(() => {
        })
    })
}
</script>

<style lang="scss" scoped>
:deep(.el-table tr td) {
    height: 100px !important;
}
:deep(.el-input__wrapper){
    box-shadow: none !important;
    border-radius: 4px !important;
    border: 1px solid #D1D5DB !important;
    height: 32px !important;
}
:deep(.el-select__wrapper){
    box-shadow: none !important;
    border-radius: 4px !important;
    border: 1px solid #D1D5DB !important;
    height: 32px !important;
}
:deep(.el-button){
    border-radius: 4px !important;
}
/* 设置 el-select 的 placeholder 颜色 */
:deep(.search-form .el-select__placeholder.is-transparent) {
    color: #C4C7DA;
    font-size: 12px;
}

/* 设置 el-select 选中后的颜色 */
:deep(.search-form .el-select__placeholder) {
    color: #4F516D;
    font-size: 12px;

}
/* 设置 el-input 的 placeholder 颜色 */
:deep(.search-form .el-input__inner::placeholder) {
    color: #C4C7DA;
    font-size: 12px;

}
/* 设置 el-input 输入内容后的颜色 */
:deep(.search-form .el-input__inner) {
    color: #4F516D;
    font-size: 12px;

}
/* 设置 el-date-picker 的 placeholder 颜色 */
:deep(.search-form .el-date-editor .el-range-input::placeholder) {
  color: #C4C7DA;
  font-size: 12px;
}

/* 设置 el-date-picker 的输入内容颜色 */
:deep(.search-form .el-date-editor .el-range-input) {
  color: #4F516D;
  font-size: 12px;
}
.manage-option {
    line-height: 50px;
    padding: 0 30px;
    position: absolute;
    right: 0;
    width: 100vw;
    bottom: 0;
    background-color: #f4f6f9;
    transition: all .3s;
    box-shadow: 0 4px 4px rgba(220, 220, 220, .3);
    opacity: 0;
    z-index: 999;
    white-space: nowrap;
}

/* 当行被 hover 时 */
:deep(.el-table__row:hover) {
    position: relative;
    z-index: 10;
}

/* 当行被 hover 时，其下的单元格允许溢出 */
:deep(.el-table__row:hover .el-table__cell) {
    overflow: visible;
}

/* 当行被 hover 时，显示 manage-option 并调整其位置 */
:deep(.el-table__row:hover .manage-option) {
    opacity: 1;
    bottom: -51px;
}

:deep(.el-table__fixed-body-wrapper:hover), 
:deep(.el-table__fixed-body-wrapper .el-table__row:hover) {
    z-index: 10;
}

:deep(.el-table__fixed-body-wrapper .el-table__row:hover .el-table__cell) {
    overflow: visible;
}

:deep(.setting-card .el-card__body){
    padding: 0 !important;
}
:deep(.el-scrollbar__view){
    margin-bottom: 50px !important;
}

</style>
