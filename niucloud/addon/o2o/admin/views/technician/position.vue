<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" class="w-[100px]" @click="addevent">
                    {{ t("addPosition") }}
                </el-button>
            </div>
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="technicianTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('positionName')" prop="name">
                        <el-input v-model.trim="technicianTable.searchParam.name" :placeholder="t('positionNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getPositionFn()">{{  t("search")}}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{t("reset")}}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <div class="mt-[10px]">
                <el-table :data="technicianTable.data" size="large" v-loading="technicianTable.loading">
                    <template #empty>
                        <span>{{ !technicianTable.loading ? t("emptyData") : "" }}</span>
                    </template>
                    <el-table-column prop="name" :label="t('positionName')" min-width="300" />
                    <el-table-column prop="desc" :label="t('remark')" min-width="300" />
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="300" />
                    <el-table-column :label="t('operation')" fixed="right" min-width="120" align="right">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="technicianTable.page" v-model:page-size="technicianTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="technicianTable.total"
                        @size-change="getPositionFn" @current-change="getPositionFn" />
                </div>
            </div>
        </el-card>
        <edit-position ref="editPositionRef" @complete="getPositionFn"></edit-position>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import editPosition from './components/edit-position.vue'
import { getPositionList, deletePosition } from '@/addon/o2o/api/technician'
import { setTablePageStorage,getTablePageStorage } from "@/utils/common";

const route = useRoute()
const pageName = route.meta.title
const technicianTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: [],
    searchParam: {
        name: ''
    }
})
const searchFormRef = ref()

const addevent = () => {
    editPositionRef.value.setFormData()
}
/**
 * 获取岗位列表
 */
const getPositionFn = (page: number = 1) => {
    technicianTable.loading = true
    technicianTable.page = page

    getPositionList({
        page: technicianTable.page,
        limit: technicianTable.limit,
        ...technicianTable.searchParam
    }).then(res => {
        technicianTable.loading = false
        technicianTable.data = res.data.data
        technicianTable.total = res.data.total
        setTablePageStorage(technicianTable.page, technicianTable.limit, technicianTable.searchParam)
    }).catch(() => {
        technicianTable.loading = false
    })
}
getPositionFn(getTablePageStorage(technicianTable.searchParam).page);
const editPositionRef = ref()
const resetForm = (formEl: any) => {
    if (!formEl) return
    formEl.resetFields()
    getPositionFn()
}
/**
 * 编辑
 * @param data
 */

const editEvent = (data: any) => {
    editPositionRef.value.setFormData(data)
}
/**
 * 删除
 * @param data
 */
const deleteEvent = (data: any) => {
    ElMessageBox.confirm('确定要删除这个岗位吗?', '删除',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        deletePosition(data).then(res => {
            getPositionFn()
        })
    })
}
</script>
<style lang="scss" scoped></style>
