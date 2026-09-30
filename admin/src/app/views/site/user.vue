<template>
    <!--站点用户-->
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">

            <el-card class="box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search" shadow="never">
                <el-form :inline="true" :model="userTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('username')" prop="username">
                        <el-input v-model.trim="userTableData.searchParam.username" :placeholder="t('userNamePlaceholder')" />
                    </el-form-item>
                    <!-- <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="userTableData.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item> -->
                    <el-form-item :label="t('loginTime')" prop="last_time">
                        <el-date-picker v-model="userTableData.searchParam.last_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadUserList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="table-panel table-fill-page__panel">
                <table-toolbar :title="pageName" :selectable="false">
                    <template #actions>
                        <el-button type="primary" @click="userEditRef.setFormData()">{{ t('addUser') }}</el-button>
                    </template>
                </table-toolbar>
                <div class="table-fill-page__table">
                <el-table height="100%" :data="userTableData.data" size="large" v-loading="userTableData.loading">
                    <template #empty>
                        <span>{{ !userTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column :label="t('headImg')" width="100" align="left">
                        <template #default="{ row }">
                            <div class="w-[var(--cmp-table-composite-icon-size)] h-[var(--cmp-table-composite-icon-size)] flex items-center justify-center">
                                <img v-if="row.head_img" :src="img(row.head_img)" class="w-[var(--cmp-table-composite-icon-size)] h-[var(--cmp-table-composite-icon-size)] rounded-full" />
                                <img v-else src="@/app/assets/images/member_head.png" class="w-[var(--cmp-table-composite-icon-size)] h-[var(--cmp-table-composite-icon-size)] rounded-full" />
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="username" :label="t('accountNumber')" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="mobile" :label="t('手机号')" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="real_name" :label="t('userRealName')" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="site_num" :label="t('siteNum')" min-width="120" show-overflow-tooltip align="center" />
                    <!-- <el-table-column prop="create_time" :label="t('createTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="last_time" :label="t('lastLoginTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.last_time || '' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('lastLoginIP')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.last_ip || '' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('operation')" align="right" fixed="right" width="180">
                        <template #default="{ row }">
                            <table-actions :actions="rowActions(row)" />
                        </template>
                    </el-table-column>
                </el-table>
                </div>

                <table-pagination
                    v-model:current-page="userTableData.page"
                    v-model:page-size="userTableData.limit"
                    :total="userTableData.total"
                    @size-change="loadUserList()"
                    @current-change="loadUserList"
                />
            </div>

        </div>

        <user-edit ref="userEditRef" @complete="loadUserList()"/>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getUserList, deleteUser } from '@/app/api/user'
import { img } from '@/utils/common'
import type { FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'
import userEdit from './components/user-edit.vue'
import TableActions from '@/components/table-actions/index.vue'
import TablePagination from '@/components/table-pagination/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import { ElMessageBox } from "element-plus";

const router = useRouter()

/**
 * 表格行内操作：超过 2 个自动收进「更多」
 */
const rowActions = (row: any) => [
    { label: t('detail'), onClick: () => detailEvent(row.uid) },
    { label: t('edit'), show: !row.is_super_admin, onClick: () => editEvent(row.uid) },
    { label: t('userCreateSiteLimit'), show: !row.is_super_admin, onClick: () => detailEvent(row.uid, 'userCreateSiteLimit') },
    { label: t('delete'), type: 'danger', show: !row.is_super_admin, onClick: () => deleteEvent(row.uid) }
]
const route = useRoute()
const pageName = route.meta.title

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()
const userEditRef = ref(null)

const userTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        username: '',
        site_name: '',
        // create_time: [],
        last_time: []
    }
})

const searchFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.resetFields()
    loadUserList()
}

/**
 * 获取用户列表
 */
const loadUserList = (page: number = 1) => {
    userTableData.loading = true
    userTableData.page = page

    getUserList({
        page: userTableData.page,
        limit: userTableData.limit,
        ...userTableData.searchParam

    }).then(res => {
        userTableData.loading = false
        userTableData.data = res.data.data
        userTableData.total = res.data.total
    }).catch(() => {
        userTableData.loading = false
    })
}
loadUserList()

/**
 * 查看详情
 */
const detailEvent = (uid: number, tab: string = '') => {
    router.push({ path: '/admin/site/user_info', query: { uid, tab } })
}

/**
 * 编辑用户
 * @param uid
 */
const editEvent = (uid: number) => {
    userEditRef.value.setFormData(uid)
}

/**
 * 删除用户
 */
const deleteEvent = (uid: number) => {
    ElMessageBox.confirm(t('userDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteUser(uid).then(res => {
            loadUserList()
        }).catch(() => {
        })
    })
}
</script>
