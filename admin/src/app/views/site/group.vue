<template>
    <!--站点套餐-->
    <div class="main-container">
        <el-card class="box-card !border-none setting-card" shadow="never">
            <el-card class="box-card !border-none my-[10px]  table-search-wrap" shadow="never">
                <div class="flex justify-between items-center">
                    <el-form :inline="true" :model="siteGroupTableData.searchParam" ref="searchFormRef" @submit.native.prevent class="search-form">
                        <el-form-item prop="keywords">
                            <el-input v-model.trim="siteGroupTableData.searchParam.keywords" :placeholder="t('groupNamePlaceholder')" />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="loadSiteGroupList()">{{ t('search') }}</el-button>
                            <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="flex justify-between items-center">
                        <el-button type="primary" class="w-[100px]" @click="addEvent">
                            {{ t('addSiteGroup') }}
                        </el-button>
                    </div>
                </div>
            </el-card>

            <div class="mt-[20px] table-wrap">
                <el-table :data="siteGroupTableData.data" size="large" v-loading="siteGroupTableData.loading">

                    <template #empty>
                        <span>{{ !siteGroupTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="group_name" :label="t('groupName')" min-width="150" />
                    <el-table-column :label="t('appName')" min-width="250">
                        <template #default="{ row }">
                            <template v-if="row.app_list.length > 0">
                                <el-tooltip effect="dark"  placement="top-start" popper-class="tip-class">
                                    <template #content>
                                        <div class="flex flex-wrap gap-[8px] max-w-[315x]">
                                            <div v-for="(name, index) in row.app_list" :key="index" class="flex flex-col items-center">
                                                <img :src="name.icon" class="w-[54px] h-[54px] rounded-[4px]" />
                                                <span class="mt-1">{{ name.title }}</span>
                                            </div>
                                        </div>
                                    </template>
                                    <div class="flex items-center overflow-hidden whitespace-nowrap ">
                                        <div v-for="(name, index) in row.app_list" :key="index">
                                            <img :src="name.icon" v-if="index < 4" class="w-[54px] h-[54px] mr-[8px] shrink-0 rounded-[4px]" />
                                        </div>
                                        <div class="flex items-end h-[65px]" v-if="row.app_list.length > 4">
                                            <span class="ml-1 text-sm">...</span>
                                        </div>
                                    </div>
                                </el-tooltip>
                            </template>
                            <template v-else></template>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('addonName')" min-width="250">
                        <template #default="{ row }">
                            <template v-if="row.addon_list.length > 0">
                                <el-tooltip effect="dark"  placement="top-start" popper-class="tip-class">
                                    <template #content>
                                        <div class="flex flex-wrap gap-[8px] max-w-[315px]">
                                            <div v-for="(name, index) in row.addon_list" :key="index" class="flex flex-col items-center">
                                                <img :src="name.icon" class="w-[54px] h-[54px] rounded-[4px]" />
                                                <span class="mt-1">{{ name.title }}</span>
                                            </div>
                                        </div>
                                    </template>
                                    <div class="flex items-center overflow-hidden whitespace-nowrap min-w-[250px]">
                                        <div v-for="(name, index) in row.addon_list" :key="index">
                                            <img :src="name.icon" v-if="index < 4" class="w-[54px] h-[54px] mr-[8px] shrink-0 rounded-[4px]" />
                                        </div>
                                        <div class="flex items-end h-[65px]" v-if="row.addon_list.length > 4">
                                            <span class="ml-1 text-sm">...</span>
                                        </div>
                                    </div>
                                </el-tooltip>
                            </template>
                            <template v-else></template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="120"></el-table-column>
                    <el-table-column prop="group_roles" :label="t('operation')" align="right" fixed="right" min-width="120">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <el-button type="primary" link @click="deleteEvent(row.group_id)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="siteGroupTableData.page"
                        v-model:page-size="siteGroupTableData.limit" layout="total, sizes, prev, pager, next, jumper"
                        :total="siteGroupTableData.total" @size-change="loadSiteGroupList()"
                        @current-change="loadSiteGroupList" />
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import { getSiteGroupList, deleteSiteGroup } from '@/app/api/site'
import { ElMessageBox, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
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
:deep(.setting-card .el-card__body){
    padding: 0 !important;
}

:deep(.no-transform-arrow .el-popper__arrow) {
  transform: none !important;
}
:deep(.el-popper__arrow){
    transform: none !important;
}

</style>
<style>
.tip-class[data-popper-placement^="top"] > .el-popper__arrow:before {
  right: 35px !important;
}
</style>
