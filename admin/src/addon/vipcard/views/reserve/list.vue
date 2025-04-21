<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{pageName}}</span>
                <el-button type="primary" class="w-[100px]" @click="addEvent">
                    添加预约
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="vipcardReserveTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('reserveState')" prop="reserve_state">
                        <el-input v-model="vipcardReserveTable.searchParam.reserve_state" :placeholder="t('reserveStatePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-input v-model="vipcardReserveTable.searchParam.create_time" :placeholder="t('createTimePlaceholder')" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="loadVipcardReserveList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="vipcardReserveTable.data" size="large" v-loading="vipcardReserveTable.loading">
                    <template #empty>
                        <span>{{ !vipcardReserveTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="reserve_state" :label="t('reserveState')" min-width="120" />

                    <el-table-column :label="t('operation')" align="right" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.reserve_id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="vipcardReserveTable.page" v-model:page-size="vipcardReserveTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="vipcardReserveTable.total"
                        @size-change="loadVipcardReserveList()" @current-change="loadVipcardReserveList" />
                </div>
            </div>

            <vipcard-reserve-edit ref="editVipcardReserveDialog" @complete="loadVipcardReserveList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getReserveList, deleteReserve } from '@/addon/vipcard/api/vipcard'
import { ElMessageBox, FormInstance } from 'element-plus'
import VipcardReserveEdit from '@/addon/vipcard/views/reserve/components/vipcard-reserve-edit.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

const vipcardReserveTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        reserve_state: '',
        create_time: ''
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取预约列表
 */
const loadVipcardReserveList = (page: number = 1) => {
    vipcardReserveTable.loading = true
    vipcardReserveTable.page = page

    getReserveList({
        page: vipcardReserveTable.page,
        limit: vipcardReserveTable.limit,
        ...vipcardReserveTable.searchParam
    }).then(res => {
        vipcardReserveTable.loading = false
        vipcardReserveTable.data = res.data.data
        vipcardReserveTable.total = res.data.total
    }).catch(() => {
        vipcardReserveTable.loading = false
    })
}
loadVipcardReserveList()

const editVipcardReserveDialog: Record<string, any> | null = ref(null)

/**
 * 添加预约
 */
const addEvent = () => {
    editVipcardReserveDialog.value.setFormData()
    editVipcardReserveDialog.value.showDialog = true
}

/**
 * 编辑预约
 * @param data
 */
const editEvent = (data: any) => {
    editVipcardReserveDialog.value.setFormData(data)
    editVipcardReserveDialog.value.showDialog = true
}

/**
 * 删除预约
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('vipcardReserveDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteReserve(id).then(() => {
            loadVipcardReserveList()
        }).catch(() => {
        })
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadVipcardReserveList()
}
</script>

<style lang="scss" scoped></style>
