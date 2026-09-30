<template>
    <!--角色管理-->
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">

            <div class="table-search-wrap table-search-wrap--panel flex justify-between items-center">
                <el-form :inline="true" :model="roleTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('roleName')" prop="search">
                        <el-input v-model.trim="roleTableData.searchParam.search" class="w-[240px]" :placeholder="t('roleNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadRoleList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="table-panel table-fill-page__panel">
                <table-toolbar :title="pageName" :selectable="false">
                    <template #actions>
                        <el-button type="primary" @click="addEvent">{{ t('addRole') }}</el-button>
                    </template>
                </table-toolbar>
                <div class="table-fill-page__table">
                <el-table height="100%" :data="roleTableData.data" size="large" v-loading="roleTableData.loading">
                    <template #empty>
                        <span>{{ !roleTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="role_name" :label="t('roleName')" />
                    <el-table-column :label="t('status')">
                        <template #default="{ row }">
                            <el-tag type="success" v-if="row.status == 1" @click="modifyRoleStatusEvent(row.role_id, 0)" class="cursor-pointer">{{ row.status_name }}</el-tag>
                            <el-tag type="error" v-else @click="modifyRoleStatusEvent(row.role_id, 1)" class="cursor-pointer">{{ row.status_name }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="t('createTime')"></el-table-column>
                    <el-table-column :label="t('operation')" align="right" fixed="right" width="130">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <el-button type="primary" link @click="deleteEvent(row.role_id)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </div>

                <table-pagination
                    v-model:current-page="roleTableData.page"
                    v-model:page-size="roleTableData.limit"
                    :total="roleTableData.total"
                    @size-change="loadRoleList()"
                    @current-change="loadRoleList"
                />
            </div>

            <edit-role ref="editRoleDialog" @complete="loadRoleList()" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import { getRoleList, deleteRole, modifyRoleStatus } from '@/app/api/sys'
import { ElMessageBox, FormInstance } from 'element-plus'
import EditRole from '@/app/views/auth/components/edit-role.vue'
import TablePagination from '@/components/table-pagination/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import { useRoute } from 'vue-router'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'

const route = useRoute()
const pageName = route.meta.title

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()
const roleTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        search: ''
    }
})

const searchFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.resetFields()
    loadRoleList()
}
/**
 * 获取角色列表
 */
const loadRoleList = (page: number = 1) => {
    roleTableData.loading = true
    roleTableData.page = page

    getRoleList({
        page: roleTableData.page,
        limit: roleTableData.limit,
        role_name: roleTableData.searchParam.search
    }).then(res => {
        roleTableData.loading = false
        roleTableData.data = res.data.data
        roleTableData.total = res.data.total
    }).catch(() => {
        roleTableData.loading = false
    })
}
loadRoleList()

const editRoleDialog: Record<string, any> | null = ref(null)

/**
 * 添加角色
 */
const addEvent = () => {
    editRoleDialog.value.setFormData()
    editRoleDialog.value.showDialog = true
}

/**
 * 编辑角色
 * @param data
 */
const editEvent = (data: any) => {
    editRoleDialog.value.setFormData(data)
    editRoleDialog.value.showDialog = true
}

/**
 * 删除角色
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('roleDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteRole(id).then(() => {
            loadRoleList()
        }).catch(() => {
        })
    })
}

const isRepeat = ref(false)

// 修改状态
const modifyRoleStatusEvent = (role_id: any, status: any) => {
    if (isRepeat.value) return
    isRepeat.value = true

    modifyRoleStatus({
        role_id,
        status
    }).then((res) => {
        loadRoleList()
        isRepeat.value = false
    }).catch(() => {
        isRepeat.value = false
    })
}
</script>

<style lang="scss" scoped>
</style>
