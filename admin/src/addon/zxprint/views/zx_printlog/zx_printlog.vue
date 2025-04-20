<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="zxPrintlogTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('orderId')" prop="order_id">
                        <el-select class="w-[280px]" v-model="zxPrintlogTable.searchParam.order_id" clearable :placeholder="t('orderIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in orderIdList"
                                       :key="index"
                                       :label="item['order_id']"
                                       :value="item['order_id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="zxPrintlogTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadZxPrintlogList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="zxPrintlogTable.data" size="large" v-loading="zxPrintlogTable.loading">
                    <template #empty>
                        <span>{{ !zxPrintlogTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('id')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="order_id" :label="t('orderId')" min-width="120" align="center" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('status')" min-width="120" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.status == 1 ? '已打印' : '未打印' }}
                        </template>
                    </el-table-column>
                    
                     <el-table-column :label="t('createTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('operation')" align="center" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="print_now(row.order_id)">{{ t('print') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="zxPrintlogTable.page" v-model:page-size="zxPrintlogTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="zxPrintlogTable.total"
                        @size-change="loadZxPrintlogList()" @current-change="loadZxPrintlogList" />
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getZxPrintlogList, deleteZxPrintlog, getWithOrderList, print } from '@/addon/zxprint/api/zx_printlog'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let zxPrintlogTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "order_id":"",
      "create_time":[]
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    

/**
 * 获取小票打印记录列表
 */
const loadZxPrintlogList = (page: number = 1) => {
    zxPrintlogTable.loading = true
    zxPrintlogTable.page = page

    getZxPrintlogList({
        page: zxPrintlogTable.page,
        limit: zxPrintlogTable.limit,
         ...zxPrintlogTable.searchParam
    }).then(res => {
        zxPrintlogTable.loading = false
        zxPrintlogTable.data = res.data.data
        zxPrintlogTable.total = res.data.total
    }).catch(() => {
        zxPrintlogTable.loading = false
    })
}
loadZxPrintlogList()

/**
 * 删除小票打印记录
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('zxPrintlogDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteZxPrintlog(id).then(() => {
            loadZxPrintlogList()
        }).catch(() => {
        })
    })
}

/**
 * 进行小票打印
 */
const print_now = (order_id: number) => {
    print(order_id).then(() => {
            loadZxPrintlogList()
    }).catch(() => {
    })
}

    
    const orderIdList = ref([])
    const setOrderIdList = async () => {
    orderIdList.value = await (await getWithOrderList({})).data
    }
    setOrderIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadZxPrintlogList()
}
</script>

<style lang="scss" scoped>
/* 多行超出隐藏 */
.multi-hidden {
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
