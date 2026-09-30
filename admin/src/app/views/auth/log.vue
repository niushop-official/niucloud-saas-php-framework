<template>
    <!--操作日志-->
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">

            <div class="table-search-wrap table-search-wrap--panel flex justify-between items-start">
                <el-form :inline="true" :model="sysUserLogTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('ip')" prop="ip">
                        <el-input v-model.trim="sysUserLogTableData.searchParam.ip" :placeholder="t('ipPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('username')" prop="username">
                        <el-input v-model.trim="sysUserLogTableData.searchParam.username" :placeholder="t('usernamePlaceholder')" />
                    </el-form-item>

                    <el-form-item :label="t('url')" prop="url">
                        <el-input v-model.trim="sysUserLogTableData.searchParam.url" :placeholder="t('urlPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('操作时间')" prop="create_time">
                        <el-date-picker v-model="sysUserLogTableData.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="loadSysUserLogList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="table-panel table-fill-page__panel">
                <table-toolbar :title="pageName" :selectable="false">
                    <template #actions>
                        <el-button type="primary" @click="clearEvent()">{{ t('清空日志') }}</el-button>
                    </template>
                </table-toolbar>
                <div class="table-fill-page__table">
                <el-table height="100%" :data="sysUserLogTableData.data" size="large" v-loading="sysUserLogTableData.loading">
                    <template #empty>
                        <span>{{ !sysUserLogTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="username" :label="t('username')" min-width="120" />
                    <el-table-column prop="ip" :label="t('ip')" min-width="100" align="left"/>
                    <el-table-column prop="operation" :label="t('operationLog')" min-width="200" align="left"/>
                    <el-table-column prop="url" :label="t('url')" min-width="180" />
                    <el-table-column prop="type" :label="t('type')" min-width="100" align="center"/>
                     <el-table-column :label="t('createTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('operation')" align="right" fixed="right" width="130">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="detailEvent(row)">{{ t('detail') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </div>

                <table-pagination
                    v-model:current-page="sysUserLogTableData.page"
                    v-model:page-size="sysUserLogTableData.limit"
                    :total="sysUserLogTableData.total"
                    @size-change="loadSysUserLogList()"
                    @current-change="loadSysUserLogList"
                />

                <user-log-detail ref="userLogDetailDialog" @complete="loadSysUserLogList()" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getLogList, logDestroy } from '@/app/api/site'
import UserLogDetail from '@/app/views/auth/components/user-log-detail.vue'
import { FormInstance } from 'element-plus'
import TablePagination from '@/components/table-pagination/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import { useRoute } from 'vue-router'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'

const route = useRoute()
const pageName = route.meta.title

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()
const sysUserLogTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        ip: '',
        username: '',
        url: '',
        create_time:''
    }
})

const searchFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.resetFields()
    loadSysUserLogList()
}
/**
 * 获取管理员操作记录表列表
 */
const loadSysUserLogList = (page: number = 1) => {
    sysUserLogTableData.loading = true
    sysUserLogTableData.page = page

    getLogList({
        page: sysUserLogTableData.page,
        limit: sysUserLogTableData.limit,
        ...sysUserLogTableData.searchParam
    }).then(res => {
        sysUserLogTableData.loading = false
        sysUserLogTableData.data = res.data.data
        sysUserLogTableData.total = res.data.total
    }).catch(() => {
        sysUserLogTableData.loading = false
    })
}
loadSysUserLogList()
const userLogDetailDialog: Record<string, any> | null = ref(null)
/**
 * 查看详情
 * @param data
 */
const detailEvent = (data: any) => {
    userLogDetailDialog.value.setFormData(data)
    userLogDetailDialog.value.showDialog = true
}

const clearEvent = () => {
    ElMessageBox.confirm(t('确定要全部清空操作日志吗?'), t('提示'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning'
    }).then(() => {
        logDestroy().then(() => {
            loadSysUserLogList()
        })
    }).catch(() => {
    })
}

</script>

<style lang="scss" scoped></style>
