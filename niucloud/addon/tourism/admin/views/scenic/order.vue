<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="orderTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('orderNo')" prop="order_no">
                        <el-input v-model="orderTable.searchParam.order_no" :placeholder="t('orderNoPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('orderStatus')" prop="order_status">
                        <el-select v-model="orderTable.searchParam.order_status" clearable class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="" />
                            <el-option :label="item.name" :value="key" v-for="(item, key) in orderStatus" :key="key" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="orderTable.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item :label="t('payTime')" prop="pay_time">
                        <el-date-picker v-model="orderTable.searchParam.pay_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadOrderList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                        <el-button type="primary" @click="exportEvent">{{ t('export') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="orderTable.data" size="large" v-loading="orderTable.loading">
                    <template #empty>
                        <span>{{ !orderTable.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="order_no" :label="t('orderNo')" align="left" min-width="200" />
                    <el-table-column :label="t('scenicInfo')" align="left" min-width="200">
                        <template #default="{ row }">
                            <div class="flex items-center cursor-pointer ">
                                <div class="min-w-[60px] h-[60px] flex items-center justify-center mr-[10px]">
                                    <img class="max-w-[60px] max-h-[60px]" v-if="row.image_thumb_small" :src="img(row.image_thumb_small)" alt="">
                                    <img class="max-w-[60px] max-h-[60px]" v-else src="" alt="">
                                </div>
                                <div class="flex flex-col">
                                    <a href="javascript:;" :title="row.scenic.scenic_name" class="multi-hidden">{{ row.scenic.scenic_name }}</a>
                                    <span>{{ row.goods_name || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('orderMoney')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.order_money }}
                            <div v-if="row.pay">{{row.member_id !== row.pay.main_id && row.pay.status == 2 ? row.pay.pay_type_name:''}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="order_from_name" :label="t('orderSource')" align="center" min-width="200" />
                    <el-table-column :show-overflow-tooltip="true" :label="t('memberInfo')" align="left" min-width="200">
                        <template #default="{ row }">
                            <div class="flex items-center cursor-pointer " @click="toMember(row.member.member_id)" v-if="row.member">
                                <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.member.headimg" :src="img(row.member.headimg)" alt="">
                                <img class="w-[50px] h-[50px] mr-[10px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                                <div class="flex flex-col">
                                    <a href="javascript:;" :title="row.member.nickname" class="multi-hidden">{{ row.member.nickname }}</a>
                                    <span>{{ row.member.mobile || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('createTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('orderStatus')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.order_status_info.name }}
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" align="right" fixed="right" width="130">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="orderTable.page" v-model:page-size="orderTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="orderTable.total"
                        @size-change="loadOrderList()" @current-change="loadOrderList" />
                </div>
            </div>

            <!-- <order-edit ref="editOrderDialog" @complete="loadOrderList" /> -->
        </el-card>
      <export-sure ref="exportSureDialog" :show="flag" type="tourism_scenic_order" :searchParam="orderTable.searchParam"
                   @close="handleClose" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getScenicOrderList, getScenicOrderStatus } from '@/addon/tourism/api/tourism'
import { img ,setTablePageStorage,getTablePageStorage} from '@/utils/common'
import { FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { AnyObject } from '@/types/global'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

interface OrderTableType {
    page: number
    limit: number
    total: number
    loading: boolean
    data: AnyObject[]
    searchParam: {
        order_no: string
        order_status: string
        create_time: any[]
        pay_time: any[]
        status?:string|number
    }
}
const orderTable = reactive<OrderTableType>({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        order_no: '',
        order_status: '',
        create_time: [],
        pay_time: []
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取订单列表
 */
const loadOrderList = (page: number = 1) => {
    orderTable.loading = true
    orderTable.page = page

    getScenicOrderList({
        page: orderTable.page,
        limit: orderTable.limit,
        ...orderTable.searchParam
    }).then(res => {
        orderTable.loading = false
        orderTable.data = res.data.data
        orderTable.total = res.data.total
        setTablePageStorage(orderTable.page, orderTable.limit, orderTable.searchParam);
    }).catch(() => {
        orderTable.loading = false
    })
}
loadOrderList(getTablePageStorage(orderTable.searchParam).page)

// 获取订单状态
interface OrderStatusType {
    name: string
}
const orderStatus = ref<OrderStatusType[]>([])
const checkOrderStatus = () => {
    getScenicOrderStatus().then(res => {
        orderStatus.value = res.data
    })
}
checkOrderStatus()

/**
 * 订单导出
 */
const exportSureDialog = ref(null)
const flag = ref(false)
const handleClose = (val) => {
  flag.value = val
}
const exportEvent = (data: any) => {
  flag.value = true
}

const infoEvent = (info: AnyObject) => {
    const routeData = router.resolve({
        path: '/tourism/order/scenic/detail',
        query: { order_id: info.order_id }
    })

    window.open(routeData.href, '_blank')
}

// 重置
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadOrderList()
}
</script>

<style lang="scss" scoped></style>
