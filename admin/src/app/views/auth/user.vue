<template>
    <!--管理员-->
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">

            <div class="table-search-wrap table-search-wrap--panel flex justify-between items-center">
                        <el-form :inline="true" :model="userTableData.searchParam" ref="searchFormRef">
                            <el-form-item :label="t('accountNumber')" prop="search">
                                <el-input v-model.trim="userTableData.searchParam.search" class="input-width" :placeholder="t('accountNumberPlaceholder')" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="loadUserList()">{{ t('search') }}</el-button>
                                <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                    <div class="table-panel table-fill-page__panel">
                        <table-toolbar :title="pageName" :selectable="false">
                            <template #actions>
                                <el-button type="primary" @click="addEvent">{{ t('addUser') }}</el-button>
                            </template>
                        </table-toolbar>
                        <div class="table-fill-page__table">
                        <el-table height="100%" :data="userTableData.data" size="large" v-loading="userTableData.loading">
                            <template #empty>
                                <span>{{ !userTableData.loading ? t('emptyData') : '' }}</span>
                            </template>

                            <el-table-column :label="t('headImg')" width="100" align="left">
                                <template #default="{ row }">
                                    <div class="w-[35px] h-[35px] flex items-center justify-center">
                                        <img v-if="row.head_img" :src="img(row.head_img)" class="w-[35px] rounded-full" />
                                        <img v-else src="@/app/assets/images/member_head.png" class="w-[35px] rounded-full" />
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="username" :label="t('accountNumber')" min-width="120" show-overflow-tooltip />
                            <el-table-column prop="real_name" :label="t('userRealName')" min-width="120" show-overflow-tooltip>
                                <template #default="{ row }">
                                    <span>{{ row.real_name ? row.real_name :'--' }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :label="t('userRoleName')" min-width="120" show-overflow-tooltip>
                                <template #default="{ row }">
                                    <span v-if="row.is_admin">{{ t('administrator') }}</span>
                                    <span v-else-if="row.role_array.length">{{ row.role_array.join(' | ') }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :label="t('status')" min-width="90" align="center">
                                <template #default="{ row }">
                                    <el-tag class="ml-2" type="success" v-if="row.status == 1">{{ t('statusUnlock') }}</el-tag>
                                    <el-tag class="ml-2" type="error" v-if="row.status == 0">{{ t('statusLock') }}</el-tag>
                                </template>
                            </el-table-column>
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
                                    <table-actions v-if="row.is_admin != 1" :actions="rowActions(row)" />
                                    <el-button v-else link disabled>{{ t('adminDisabled') }}</el-button>
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
            <!-- <el-tabs v-model="activeName" class="mt-[20px]">
                <el-tab-pane :label="t('管理员')" name="userList">
                   
                </el-tab-pane>
                <el-tab-pane :label="t('管理员角色')" name="userRole">
                    <userRole></userRole>
                </el-tab-pane>
            </el-tabs> -->
            <edit-user ref="editUserDialog" @complete="loadUserList()" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getUserList, lockUser, unlockUser, deleteUser } from '@/app/api/site'
import EditUser from '@/app/views/auth/components/edit-user.vue'
import userRole from '@/app/views/auth/role.vue'
import { img } from '@/utils/common'
import { ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import TableActions from '@/components/table-actions/index.vue'
import TablePagination from '@/components/table-pagination/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import { useRoute } from 'vue-router'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'

const route = useRoute()
const pageName = route.meta.title

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()

/**
 * 表格行内操作：超过 2 个自动收进「更多」
 */
const rowActions = (row: any) => [
    { label: t('edit'), onClick: () => editEvent(row) },
    { label: row.status ? t('lock') : t('unlock'), onClick: () => (row.status ? lockEvent(row.uid) : unlockEvent(row.uid)) },
    { label: t('delete'), type: 'danger', onClick: () => deleteEvent(row.uid) }
]
const userTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        search: '',
        user_type: ''
    }
})
const activeName = ref('userList')
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
        username: userTableData.searchParam.search,
        user_type: userTableData.searchParam.user_type
    }).then(res => {
        userTableData.loading = false
        userTableData.data = res.data.data
        userTableData.total = res.data.total
    }).catch(() => {
        userTableData.loading = false
    })
}
loadUserList()

const editUserDialog: Record<string, any> | null = ref(null)

/**
 * 添加用户
 */
const addEvent = () => {
    editUserDialog.value.setFormData()
    editUserDialog.value.showDialog = true
}

/**
 * 编辑用户
 * @param data
 */
const editEvent = (data: any) => {
    editUserDialog.value.setFormData(data)
    editUserDialog.value.showDialog = true
}

/**
 * 锁定用户
 */
const lockEvent = (id: number) => {
    ElMessageBox.confirm(t('userLockTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        lockUser(id).then(() => {
            loadUserList()
        }).catch(() => {
        })
    })
}

/**
 * 解锁用户
 */
const unlockEvent = (id: number) => {
    ElMessageBox.confirm(t('userUnlockTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        unlockUser(id).then(() => {
            loadUserList()
        }).catch(() => {
        })
    })
}

const deleteEvent = (uid: number) => {
    ElMessageBox.confirm(t('userDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteUser(uid).then(() => {
            loadUserList()
        }).catch(() => {
        })
    })
}

</script>

<style lang="scss" scoped>
</style>
