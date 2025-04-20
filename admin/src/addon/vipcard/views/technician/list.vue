<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" class="w-[100px]" @click="addEvent">
                    {{ t('addTechnician') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="technicianTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model="technicianTable.searchParam.name" clearable :placeholder="t('namePlaceholder')" class="input-width" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="technicianTable.searchParam.create_time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadTechnicianList()">{{ t('search') }}</el-button>
                        <el-button @click="searchFormRef?.resetFields()">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="technicianTable.data" size="large" v-loading="technicianTable.loading">
                    <template #empty>
                        <span>{{ !technicianTable.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column :show-overflow-tooltip="true" :label="t('technicianInfo')" min-width="200" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <img v-if="row.image_thumb_small" class="max-w-[60px] w-[60px] max-h-[60px]" :src="img(row.image_thumb_small)" />
                                <img v-else class="max-w-[60px] w-[60px] max-h-[60px]" src="@/app/assets/images/member_head.png" />
                                <a href="javascript:;" class="flex-1 multi-hidden ml-2" :title="row.name">{{ row.name }}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" :label="t('mobile')" min-width="150" />
                    <el-table-column :label="t('seniority')" min-width="120">
                        <template #default="{ row }">
                            <span v-if="row.seniority <= 0">{{ t('notOneYear') }}</span>
                            <span v-else>{{ row.seniority }}{{ t('year') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" :label="t('number')" min-width="150" />
                    <el-table-column prop="position" :label="t('position')" min-width="150" />
                    <el-table-column :label="t('status')" min-width="200" align="left">
                        <template #default="{ row }">
                            <span v-if="row.status == 0">{{ t('disabled') }}</span>
                            <span v-if="row.status == 1">{{ t('normal') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="180" />
                    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="200">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="statusEvent(row, 1)" v-if="row.status == 0" :loading="isfalse" :disabled="technicianTable.loading">{{ t('restore') }}</el-button>
                            <el-button type="primary" link @click="statusEvent(row, 0)" v-if="row.status == 1" :loading="isfalse" :disabled="technicianTable.loading">{{ t('disable') }}</el-button>
                            <el-button type="primary" link @click="editEvent(row, 1)">{{ t('edit') }}</el-button>
                            <el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination
                        v-model:current-page="technicianTable.page"
                        v-model:page-size="technicianTable.limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="technicianTable.total"
                        @size-change="loadTechnicianList()"
                        @current-change="loadTechnicianList"
                    />
                </div>
            </div>
        </el-card>
        <add-technician ref="editTechnicianDialog" @complete="loadTechnicianList" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getTechnicianList, editTechnicianStatus } from '@/addon/vipcard/api/vipcard'
import addTechnician from '@/addon/vipcard/views/technician/components/add-technician.vue'
import { img } from '@/utils/common'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance } from 'element-plus'

const route = useRoute()
const pageName = route.meta.title

const technicianTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        create_time: '',
        name: ''
    }
})
const isfalse = ref(false)
const searchFormRef = ref<FormInstance>()

/**
 * 获取商品表列表
 */
const loadTechnicianList = (page: number = 1) => {
    technicianTable.loading = true
    technicianTable.page = page

    getTechnicianList({
        page: technicianTable.page,
        limit: technicianTable.limit,
        ...technicianTable.searchParam
    }).then((res) => {
        technicianTable.loading = false
        technicianTable.data = res.data.data
        technicianTable.total = res.data.total
    }).catch(() => {
        technicianTable.loading = false
    })
}
loadTechnicianList()

const router = useRouter()

/**
 * 添加商品表
 */
const infoEvent = (data: any) => {
    router.push('/vipcard/goods/technician/info?id=' + data.id)
}

const editTechnicianDialog: Record<string, any> | null = ref(null)
/**
 * 添加预约
 */
const addEvent = () => {
    editTechnicianDialog.value.setFormData()
    editTechnicianDialog.value.showDialog = true
}

/**
 * 编辑预约
 * @param data
 */
const editEvent = (data: any) => {
    editTechnicianDialog.value.setFormData(data)
    editTechnicianDialog.value.showDialog = true
}

const statusEvent = (item: any, num: number) => {
    if (isfalse.value) return
    technicianTable.loading = true
    // isfalse.value = true
    editTechnicianStatus({ id: item.id, status: num }).then((res) => {
        loadTechnicianList()
    }).finally(() => {
        // isfalse.value = false
    })
}
</script>

<style lang="scss" scoped></style>
