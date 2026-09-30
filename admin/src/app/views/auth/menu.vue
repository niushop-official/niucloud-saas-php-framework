<template>
    <!--平台菜单-->
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">

            <div class="table-panel table-fill-page__panel">
                <table-toolbar :title="pageName" :selectable="false">
                    <template #actions>
                        <el-button @click="importEvent">
                            {{ t('importMenu') }}
                        </el-button>
                        <el-button @click="exportEvent">
                            {{ t('exportMenu') }}
                        </el-button>
                        <el-button :loading="refreshLoading" @click="refreshMenu">
                            {{ t('initializeMenu') }}
                        </el-button>
                        <el-button type="primary" @click="addEvent">
                            {{ t('addMenu') }}
                        </el-button>
                    </template>
                </table-toolbar>
            <div class="table-fill-page__table">
            <el-table height="100%" :data="menusTableData.data" row-key="menu_key" size="large" v-loading="menusTableData.loading">
                <template #empty>
                    <span>{{ !menusTableData.loading ? t('emptyData') : '' }}</span>
                </template>

                <el-table-column prop="menu_name" :show-overflow-tooltip="true" :label="t('menuName')" min-width="150" />
                <el-table-column :label="t('icon')" width="100" align="center">
                    <template #default="{ row }">
                        <icon v-if="row.icon" :name="row.icon" size="18px" />
                    </template>
                </el-table-column>
                <el-table-column :label="t('menuType')" width="80">
                    <template #default="{ row }">
                        <div v-if="row.menu_type == 0">{{ t('menuTypeDir') }}</div>
                        <div v-else-if="row.menu_type == 1">{{ t('menuTypeMenu') }}</div>
                        <div v-else-if="row.menu_type == 2">{{ t('menuTypeButton') }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="api_url" :label="t('authId')" min-width="150" align="left" />
                <el-table-column :label="t('status')" min-width="120" align="center">
                    <template #default="{ row }">
                        <el-tag class="ml-2" type="success" v-if="row.status == 1">{{ t('statusNormal') }}</el-tag>
                        <el-tag class="ml-2" type="error" v-if="row.status == 0">{{ t('statusDeactivate') }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="sort" :label="t('sort')" min-width="100" />
                <el-table-column :label="t('operation')" align="right" fixed="right" width="130">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                        <el-button type="primary" link @click="deleteEvent(row.menu_key)">{{ t('delete') }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>
            </div>

            <edit-menu ref="editMenuDialog" :menu-tree="menusTableData.data" @complete="getMenuList" app-type="admin" />
            <import-menu ref="importMenuDialog" app-type="admin" @complete="getMenuList" />
            <export-menu ref="exportMenuDialog" app-type="admin" :menus="menusTableData.data" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref,h } from 'vue'
import { getMenus, deleteMenu, menuRefresh } from '@/app/api/sys'
import { t } from '@/lang'
import { ElMessageBox } from 'element-plus'
import EditMenu from '@/app/views/auth/components/edit-menu.vue'
import ImportMenu from '@/app/views/auth/components/import-menu.vue'
import ExportMenu from '@/app/views/auth/components/export-menu.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()
const menusTableData = reactive({
    loading: true,
    data: []
})

/**
 * 获取菜单
 */
const getMenuList = () => {
    menusTableData.loading = true
    getMenus('admin').then(res => {
        menusTableData.loading = false
        menusTableData.data = res.data
    }).catch(() => {
    })
}
getMenuList()
// 重置菜单
const refreshLoading = ref(false)
const refreshMenu = () => {
    ElMessageBox.confirm(h('div', null, [
            h('p', null, t('initializeMenuTipsOne')),
            h('p', null, t('initializeMenuTipsTwo')),
        ]), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            // type: 'warning'
        }
    ).then(() => {
        refreshLoading.value = true
        menuRefresh({}).then(res => {
            refreshLoading.value = false
        }).catch(() => {
            refreshLoading.value = false
        })
    }).catch(() => {
    })
}

/**
 * 导入菜单
 */
const importMenuDialog: Record<string, any> | null = ref(null)
const importEvent = () => {
    importMenuDialog.value.showDialog = true
}

/**
 * 导出菜单
 */
const exportMenuDialog: Record<string, any> | null = ref(null)
const exportEvent = () => {
    exportMenuDialog.value.showDialog = true
}

/**
 * 添加菜单
 */
const editMenuDialog: Record<string, any> | null = ref(null)

const addEvent = () => {
    editMenuDialog.value.setFormData({ app_type: 'admin' })
    editMenuDialog.value.showDialog = true
}

/**
 * 编辑菜单
 * @param data
 */
const editEvent = (data: any) => {
    editMenuDialog.value.setFormData(data)
    editMenuDialog.value.showDialog = true
}

/**
 * 删除菜单
 */
const deleteEvent = (key: string) => {
    ElMessageBox.confirm(t('menuDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteMenu('admin', key).then(() => {
            getMenuList()
        }).catch(() => {
        })
    })
}
</script>

<style lang="scss" scoped></style>
