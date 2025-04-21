<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="orderTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('orderNo')" prop="order_no">
                        <el-input v-model.trim="orderTable.searchParam.order_no" :placeholder="t('orderNoPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('orderName')" prop="order_name">
                        <el-input v-model.trim="orderTable.searchParam.order_name" :placeholder="t('orderNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('technicianSearchText')" prop="technician_search_text">
                        <el-input v-model.trim="orderTable.searchParam.technician_search_text" :placeholder="t('technicianSearchTextPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('memberSearchText')" prop="member_search_text">
                        <el-input v-model.trim="orderTable.searchParam.member_search_text" :placeholder="t('memberSearchTextPlaceholder')" class="!w-[210px]" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="orderTable.searchParam.create_time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item :label="t('payTime')" prop="pay_time">
                        <el-date-picker v-model="orderTable.searchParam.pay_time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadOrderList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                        <el-button type="primary" @click="exportSelectEvent">{{ t('export') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-tabs v-model="orderTable.searchParam.order_status" class="demo-tabs" @tab-change="handleClick">
                <el-tab-pane :label="t('all')" name=""></el-tab-pane>
                <el-tab-pane :label="item.name" :name="key" v-for="(item, key) in orderStatus" :key="key"></el-tab-pane>
            </el-tabs>
            <div class="mt-[10px]">
                <el-table size="large" class="table-top">
                    <el-table-column :label="t('goodsInfo')" min-width="300" />
                    <el-table-column :label="t('technician')" min-width="200" />
                    <el-table-column :label="t('orderSource')" min-width="150" />
                    <el-table-column :label="t('memberInfo')" min-width="300" />
                    <el-table-column :label="t('orderMoney')" min-width="130" />
                    <el-table-column :label="t('orderStatus')" min-width="100" />
                    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120" />
                </el-table>
                <div class="table-body min-h-[150px]" v-loading="orderTable.loading">
                    <div v-if="!orderTable.loading">
                        <template v-if="orderTable.data.length">
                            <div v-for="(item, index) in orderTable.data" :key="index">
                                <div class="flex items-center justify-between bg-[#f7f8fa] mt-[10px] border-[#e4e7ed] border-solid border-b-[1px] px-3 h-[35px] text-[12px] text-[#666]">
                                    <div>
                                        <span>{{ t('orderNo') }}：{{ (item as any).order_no }}</span>
                                        <span class="ml-5">{{ t('createTime') }}：{{ (item as any).create_time }}</span>
                                        <span class="ml-5" v-if="item.pay_time">{{ t('payType') }}：{{ (item as any).pay_type_name }}</span>
                                    </div>
                                    <div>
                                        <el-button type="primary" link @click="infoEvent(item)">{{ t('info') }}</el-button>
                                    </div>
                                </div>
                                <el-table :data="item.item" size="large" v-loading="orderTable.loading" :show-header="false" :span-method="arraySpanMethod">
                                    <el-table-column :show-overflow-tooltip="true" :label="t('goodsInfo')" align="left" min-width="300">
                                        <template #default="{ row }">
                                            <div class="flex">
                                                <div class="w-[80px] h-[80px] mr-[10px]">
                                                    <el-image class="w-[80px] h-[80px]" :src="img(row.item_image ? row.item_image : '')" fit="cover">
                                                        <template #error>
                                                            <div class="image-slot">
                                                                <img class="w-[80px] h-[80px]" src="@/addon/o2o/assets/goods_default.png" />
                                                            </div>
                                                        </template>
                                                    </el-image>
                                                </div>
                                                <div class="flex-1 flex flex-col justify-between">
                                                    <a href="javascript:;" class="multi-hidden" :title="row.item_name">{{ row.item_name }}</a>
                                                    <div>
                                                        <el-tag>{{ row.item_type_name }}</el-tag>
                                                    </div>
                                                    <div class="flex items-center justify-between">
                                                        <span>￥{{ row.price }}</span>
                                                        <span>×{{ row.num }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="t('technician')" min-width="200" class-name=" border-solid border-[#ebeef5] border-l-[1px] ">
                                        <template #default>
                                            {{ item.technician_info ? item.technician_info.name : t('defaultAllocation') }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="t('orderSource')" min-width="150">
                                        <template #default>
                                            {{ item.order_from_name }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" :label="t('memberInfo')" align="left" min-width="300">
                                        <template #default>
                                            <div class="flex items-center cursor-pointer" @click="toMember(item.member.member_id)" v-if="item.member">
                                                <img class="w-[50px] h-[50px] mr-[10px]" v-if="item.member.headimg" :src="img(item.member.headimg)" alt="" />
                                                <img class="w-[50px] h-[50px] rounded-full mr-[10px]" v-else src="@/app/assets/images/member_head.png" alt="" />
                                                <div class="flex flex-col">
                                                    <span>{{ item.member.nickname || '' }}</span>
                                                    <span>{{ item.member.mobile || '' }}</span>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="t('orderMoney')" min-width="130">
                                        <template #default>
                                            <span>￥{{ item.total_money }}</span>
                                            <div v-if="item.pay">{{ item.member_id !== item.pay.main_id && item.pay.status == 2 ? item.pay.pay_type_name : '' }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="t('orderStatus')" min-width="100">
                                        <template #default="{ row }">
                                            <span>{{ item.order_status_info.name }}</span><div v-if="row.refund_status_name && row.refund_status" class="text-[var(--el-color-primary)] cursor-pointer" @click="toRefundDetail(row)">{{ row.refund_status_name.name }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="120" align="right">
                                        <template #default>
                                            <el-button type="primary" link v-for="(subItem, subInx) in item.order_status_info.action" :key="subInx" @click="handleSelect(item)">{{ subItem.name }}</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </template>
                        <el-empty v-else :image-size="1" :description="t('emptyData')" />
                    </div>
                </div>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="orderTable.page" v-model:page-size="orderTable.limit"
                                   layout="total, sizes, prev, pager, next, jumper" :total="orderTable.total"
                                   @size-change="loadOrderList()" @current-change="loadOrderList" />
                </div>
            </div>
        </el-card>
        <el-dialog v-model="dialogTechnicianVisible" title="请选择技师" width="720px">
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="technicianTable" ref="searchFormRef2">
                    <el-form-item :label="t('keyword')" prop="keyword">
                        <el-input v-model.trim="technicianTable.keyword" :placeholder="t('keywordPlaceholder')" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="getTechnicianListFn()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm2(searchFormRef2)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-table :data="technicianList.data" v-loading="technicianList.loading" class="technician-table">
                <template #empty>
                    <span>{{ !technicianList.loading ? t('emptyData') : '' }}</span>
                </template>
                <el-table-column prop="name" label="姓名" width="180" />
                <el-table-column prop="position_name" label="职位" />
                <el-table-column prop="mobile" label="手机号" width="180" />
                <el-table-column :label="t('operation')" fixed="right" min-width="50" align="right">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="sendOrderFn(row)">确定</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="technicianList.page" v-model:page-size="technicianList.limit" layout="total, sizes, prev, pager, next, jumper" :total="technicianList.total" @size-change="getTechnicianListFn" @current-change="getTechnicianListFn" />
            </div>
        </el-dialog>

        <order-export-select ref="selectExportDialog" @complete="exportEvent" />
        <export-sure ref="exportSureDialog" :show="flag" :type="export_type" :searchParam="orderTable.searchParam" @close="handleClose" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getOrderList, getOrderStatus, setSendOders } from '@/addon/o2o/api/order'
import { getTechnicianGoods } from '@/addon/o2o/api/technician'
import OrderExportSelect from '@/addon/o2o/views/order/components/order-export-select.vue'
import { img ,setTablePageStorage,getTablePageStorage} from '@/utils/common'
import { FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { AnyObject } from '@/types/global'

const technicianTable: Record<string, any> = reactive({})

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const orderTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        order_no: '',
        order_name: '',
        member_search_text: '',
        technician_search_text: '',
        order_status: '',
        create_time: [],
        pay_time: []
    }
})

const searchFormRef2 = ref<FormInstance>()

/**
 * 获取订单列表
 */
const loadOrderList = (page: number = 1) => {
    orderTable.loading = true
    orderTable.page = page

    getOrderList({
        page: orderTable.page,
        limit: orderTable.limit,
        ...orderTable.searchParam
    }).then((res) => {
        orderTable.loading = false
        orderTable.total = res.data.total
        orderTable.data = res.data.data.map((el: any) => {
            el.item.forEach((v: any) => {
                v.rowNum = el.item.length
            })
            return el
        })
        setTablePageStorage(orderTable.page, orderTable.limit, orderTable.searchParam)
    }).catch(() => {
        orderTable.loading = false
    })
}

loadOrderList(getTablePageStorage(orderTable.searchParam).page);

// 获取订单状态
const orderStatus = ref([])
const checkOrderStatus = () => {
    getOrderStatus().then((res) => {
        orderStatus.value = res.data
    })
}

checkOrderStatus()

// 切换订单状态
const handleClick = (event: any) => {
    orderTable.searchParam.order_status = event
    loadOrderList()
}
// 详情
const infoEvent = (info: AnyObject) => {
    router.push(`/o2o/order/detail?order_id=${ info.order_id }`)
}
// 技师列表
const technicianList = reactive({
    page: 1,
    limit: 10,
    total: 0,
    id: 0,
    loading: false,
    data: []
})
const getTechnicianListFn = (page: number = 1) => {
    technicianList.loading = true
    technicianList.page = page
    getTechnicianGoods({
        page: technicianList.page,
        limit: technicianList.limit,
        id: technicianList.id,
        ...technicianTable
    }).then((res: any) => {
        technicianList.loading = false
        technicianList.total = res.data.total
        technicianList.data = res.data.data
    })
}

// 派单
const sendOrderInfo = ref({
    order_id: '',
    technician_id: ''
})
const dialogTechnicianVisible = ref(false)
const handleSelect = (data) => {
    technicianList.id = data.item[0].goods_id
    getTechnicianListFn()
    dialogTechnicianVisible.value = true
    sendOrderInfo.value.order_id = data.order_id
}
const sendOrderFn = (data) => {
    sendOrderInfo.value.technician_id = data.id
    setSendOders(sendOrderInfo.value).then((res) => {
        dialogTechnicianVisible.value = false
        loadOrderList()
    })
}

/**
 * 订单导出
 */
const exportSureDialog = ref(null)
const export_type = ref('')
const flag = ref(false)
const handleClose = (val) => {
    flag.value = val
}
const exportEvent = (data: any) => {
    export_type.value = data
    flag.value = true
}

const selectExportDialog: Record<string, any> | null = ref(null)

/**
 * 订单导出类型选择
 */
const exportSelectEvent = () => {
    selectExportDialog.value.showDialog = true
}

// // 合并表格行
const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
    if (rowIndex === 0) {
        if (columnIndex > 0) {
            return [row.rowNum, 1]
        } else {
            return [1, 1]
        }
    } else {
        if (columnIndex > 0) {
            return [0, 0]
        } else {
            return [1, 1]
        }
    }
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadOrderList()
}
const resetForm2 = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    getTechnicianListFn()
}
// 跳转退款详情
const toRefundDetail = (data: string) => {
    router.push('/o2o/order/refund/detail?refund_no=' + data.refund_no)
}
</script>

<style lang="scss" scoped>
.technician-table :deep(.cell) {
    padding: 0 12px !important;
}

.table-top :deep(.el-table__body-wrapper) {
    display: none;
}

:deep(.el-table) {
    --el-table-row-hover-bg-color: var(--el-transfer-border-color);
}
</style>
