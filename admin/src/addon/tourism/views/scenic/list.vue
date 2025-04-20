<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" class="w-[100px]" @click="addEvent">
                    {{ t('addTourismScenic') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="tourismScenicTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('scenicName')" prop="scenic_name">
                        <el-input v-model.trim="tourismScenicTable.searchParam.scenic_name"
                            :placeholder="t('scenicNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="tourismScenicTable.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadTourismScenicList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="tourismScenicTable.data" size="large" v-loading="tourismScenicTable.loading">
                    <template #empty>
                        <span>{{ !tourismScenicTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column :show-overflow-tooltip="true" :label="t('scenicInfo')" min-width="240" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <div class="min-w-[60px] h-[60px] flex items-center justify-center">
                                    <img class="max-w-[60px] max-h-[60px]" :src="img(row.cover_thumb_small)" />
                                </div>
                                <a href="javascript:;" :title="row.scenic_name" class="multi-hidden ml-2">{{ row.scenic_name }}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="scenic_level" :label="t('scenicLevel')" min-width="100">
                        <template #default="{ row }">
                            {{ star[row.scenic_level] }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="full_address" :label="t('fullAddress')" min-width="200" />
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="170" />
                    <el-table-column prop="status_name" :label="t('scenicStatus')" min-width="120" />
                    <el-table-column :label="t('operation')" align="right" fixed="right" min-width="200">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="renew(0, row.scenic_id)" v-if="row.scenic_status == 1">{{ t('down') }}</el-button>
                            <el-button type="primary" link @click="renew(1, row.scenic_id)" v-if="row.scenic_status == 0">{{ t('up') }}</el-button>
                            <el-button type="primary" link @click="ticketList(row)">{{ t('ticketManage') }}</el-button>
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="tourismScenicTable.page"
                        v-model:page-size="tourismScenicTable.limit" layout="total, sizes, prev, pager, next, jumper"
                        :total="tourismScenicTable.total" @size-change="loadTourismScenicList()"
                        @current-change="loadTourismScenicList" />
                </div>
            </div>

        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getScenicList, editScenicStatus } from '@/addon/tourism/api/tourism'
import { img,setTablePageStorage,getTablePageStorage } from '@/utils/common'
import { ElMessageBox, FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

const star = reactive<any>({
    1: t('oneStar'),
    2: t('twoStar'),
    3: t('threeStar'),
    4: t('fourStar'),
    5: t('fiveStar')
})

const tourismScenicTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        scenic_name: '',
        create_time: []
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取景点列表
 */
const loadTourismScenicList = (page: number = 1) => {
    tourismScenicTable.loading = true
    tourismScenicTable.page = page

    getScenicList({
        page: tourismScenicTable.page,
        limit: tourismScenicTable.limit,
        ...tourismScenicTable.searchParam
    }).then(res => {
        tourismScenicTable.loading = false
        tourismScenicTable.data = res.data.data
        tourismScenicTable.total = res.data.total
        setTablePageStorage(tourismScenicTable.page, tourismScenicTable.limit, tourismScenicTable.searchParam);
    }).catch(() => {
        tourismScenicTable.loading = false
    })
}
loadTourismScenicList(getTablePageStorage(tourismScenicTable.searchParam).page)

const router = useRouter()

/**
 * 添加景点
 */
const addEvent = () => {
    router.push('/tourism/product/scenic/edit_scenic')
}

const ticketList = (data: any) => {
    router.push('/tourism/product/scenic/ticket?id=' + data.scenic_id)
}

/**
 * 编辑景点
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/tourism/product/scenic/edit_scenic?id=' + data.scenic_id)
}

const renew = (status: number, id: number) => {
    const prompt = status == 1 ? t('upPrompt') : t('downPrompt')
    ElMessageBox.confirm(prompt, t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        editScenicStatus({
            scenic_id: id,
            scenic_status: status
        }).then(() => {
            loadTourismScenicList()
        })
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadTourismScenicList()
}
</script>

<style lang="scss" scoped></style>
