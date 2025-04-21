<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="orderTable.searchParam" ref="searchFormRef">

                    <el-form-item :label="t('orderInfo')" prop='search_name'>
                        <el-select v-model="orderTable.searchParam.search_type" clearable class="input-item">
                            <el-option :label="t('orderNo')" value="order_no"></el-option>
                            <el-option :label="t('outTradeNo')" value="out_trade_no"></el-option>
                        </el-select>
                        <el-input class="input-item ml-3" v-model.trim="orderTable.searchParam.search_name" maxlength="20" />
                    </el-form-item>
                    <el-form-item :label="t('memberInfo')" prop='keyword'>
                        <el-input class="w-[200px]" v-model.trim="orderTable.searchParam.keyword" :placeholder="t('memberInfoPlaceholder')" maxlength="20" />
                    </el-form-item>
                    <el-form-item :label="t('payType')" prop='pay_type'>
                        <el-select v-model="orderTable.searchParam.pay_type" clearable class="input-item">
                            <el-option v-for="(item, index) in payTypeData" :key="index" :label="item.name" :value="item.key"></el-option>
                        </el-select>
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
                    </el-form-item>
                </el-form>
            </el-card>

            <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
                <el-tab-pane :label="t('all')" name=""></el-tab-pane>
                <el-tab-pane :label="t('toBePaid')" name="1"></el-tab-pane>
                <el-tab-pane :label="t('completed')" name="2"></el-tab-pane>
                <el-tab-pane :label="t('closed')" name="-1"></el-tab-pane>
            </el-tabs>

            <div>
                <el-table :data="orderTable.data" size="large" class="table-top" @select-all="selectAllCheck">
                    <el-table-column type="selection" width="40" />
                    <el-table-column :label="t('giftCard')" min-width="200" />
                    <el-table-column :label="t('cardNumber')" min-width="120" />
                    <el-table-column :label="t('cardRightType')" min-width="120" />
                    <el-table-column :label="t('orderMoney')" min-width="120" />
                    <el-table-column :label="t('buyInfo')" min-width="120" />
                    <el-table-column :label="t('orderStatus')" min-width="100" />
                    <el-table-column :label="t('payTime')" min-width="120" />
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
                                        <span class="ml-5" v-if="item.pay">{{ t('payType') }}：{{ (item as any).pay.type_name }}</span>
                                    </div>
                                    <div>
                                        <el-button type="primary" link @click="detailEvent(item)">{{ t('info') }}</el-button>
                                        <el-button type="primary" link @click="setNotes(item)">{{ t('notes') }}</el-button>
                                    </div>
                                </div>

                                <el-table :data="(item as any).order_gift_card" size="large" :show-header="false" ref="multipleTable" @select="handleSelectChange">
                                    <el-table-column type="selection" width="40" :selectable="selectable" />
                                    <el-table-column min-width="200">
                                        <template #default="{ row }">
                                            <div class="flex cursor-pointer">
                                                <div class="flex items-center min-w-[50px] mr-[10px]">
                                                    <img class="w-[50px] h-[50px]" v-if="row.card_cover" :src="img(row.card_cover)" alt="" />
                                                    <img class="w-[50px] h-[50px]" v-else src="" alt="" />
                                                </div>
                                                <div class="flex flex-col">
                                                    <el-tooltip class="box-item" effect="light" placement="top">
                                                        <template #content>
                                                            <div class="max-w-[250px]">{{ row.body }}</div>
                                                        </template>
                                                        <p class="multi-hidden text-[14px]">{{ row.body }}</p>
                                                    </el-tooltip>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="120">
                                        <template #default="{ row }">
                                            <div class="flex flex-col">
                                                <span class="text-[13px]">￥{{ row.card_price }}</span>
                                                <span class="text-[13px] mt-[5px]">{{ row.num }}{{ t('piece') }}</span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="120">
                                        <template #default="{ row }">
                                            <span class="text-[14px]">{{ row.card_right_type_name }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="120">
                                        <template #default="{ row }">
                                            <span class="text-[14px]">￥{{ row.order_money }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="120">
                                        <template #default="{ row }">
                                            <div class="flex flex-col">
                                                <span class="text-[12px] text-primary cursor-pointer" @click="memberEvent(row.member.member_id)">{{ row.member.nickname }}</span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100">
                                        <template #default="{ row }">
                                            <span class="text-[14px]">{{ row.status_name }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="120">
                                        <template #default="{ row }">
                                            <span class="text-[14px]" v-if="row.pay_time != 0">{{ row.pay_time }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="right" min-width="120">
                                        <template #default="{ row }">
                                            <template v-if="row.status == 1">
                                                <el-button type="primary" link @click="close(row)">{{ t('orderClose') }}</el-button>
                                            </template>
                                        </template>
                                    </el-table-column>
                                </el-table>

                                <div v-if="item.shop_remark"
                                     class="text-[14px] min-h-[30px] leading-[30px] px-3 bg-[#fff0e5] text-[#ff7f5b]">
                                    <span class="mr-[5px]">{{ t('notes') }}：</span>
                                    <span>{{ item.shop_remark }}</span>
                                </div>
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
        <order-notes ref="orderNotesDialog" @complete="loadOrderList" />
        <order-detail ref="orderDetailDialog" @load="loadOrderList()"></order-detail>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import {
    getShopGiftcardOrderList,
    closeShopGiftcardOrder,
    getOrderStatus,
    getOrderPayType
} from '@/addon/shop_giftcard/api/order'
import OrderNotes from '@/addon/shop_giftcard/views/order/components/order-notes.vue'
import { img ,setTablePageStorage,getTablePageStorage } from '@/utils/common'
import { ElMessageBox, FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import orderDetail from '@/addon/shop_giftcard/views/order/components/order-detail.vue'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title;
const activeName: any = ref(route.query.status || '')

const statusData = ref([])
const payTypeData = ref<any[]>([])
const orderDetailDialog: Record<string, any> | null = ref(null)

const setFormData = async() => {
    statusData.value = await (await getOrderStatus()).data
    payTypeData.value = await (await getOrderPayType()).data
}
setFormData()

const orderTable: any = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        search_type: 'order_no',
        search_name: '',
        keyword: '',
        pay_type: '',
        status: route.query.status || '',
        create_time: [],
        pay_time: [],
        giftcard_id: route.query.giftcard_id
    }
})

const searchFormRef = ref<FormInstance>()

const multipleSelection: any = reactive({}) // 选中数据
const multipleTable: Record<string, any> | null = ref(null)
const isSelectAll = ref(false)

const selectAllCheck = () => {
    if (!isSelectAll.value) {
        isSelectAll.value = true
        for (const i in orderTable.data) {
            let isAdd = false;
            for (const j in orderTable.data[i].order_gift_card) {
                if (orderTable.data[i].order_gift_card[j].status == 1) {
                    multipleTable.value[i].toggleRowSelection(orderTable.data[i].order_gift_card[j], true)
                    isAdd = true;
                }
            }
            if (isAdd) {
                multipleSelection['order_' + orderTable.data[i].order_id] = cloneDeep(orderTable.data[i]);
            }
        }
    } else {
        isSelectAll.value = false
        for (const v in orderTable.data) {
            multipleTable.value[v].clearSelection()
            delete multipleSelection['order_' + orderTable.data[v].order_id];
        }
    }
}

// 监听表格复选框
const handleSelectChange = (selection: any, row: any) => {

    // 是否选中
    let isSelected = false
    let item: any = null;

    for (let i = 0; i < orderTable.data.length; i++) {
        if (orderTable.data[i].order_id == row.order_id) {
            item = orderTable.data[i];
            break;
        }
    }

    for (let i = 0; i < selection.length; i++) {
        if (selection[i].order_id == row.order_id) {
            isSelected = true;
            break
        }
    }

    if (isSelected) {
        multipleSelection['order_' + row.order_id] = item
    } else {
        // 未选中，删除当前商品
        delete multipleSelection['order_' + row.order_id]
    }
}

const selectable = (row: any, index: number) => {
    return true
}

/**
 * 获取订单列表
 */
const loadOrderList = (page: number = 1) => {
    orderTable.loading = true
    orderTable.page = page

    getShopGiftcardOrderList({
        page: orderTable.page,
        limit: orderTable.limit,
        ...orderTable.searchParam
    }).then(res => {
        orderTable.loading = false;
        orderTable.data = res.data.data.map((el: any) => {
            el.order_gift_card = [el]
            return el
        })
        orderTable.total = res.data.total
        setTablePageStorage(orderTable.page, orderTable.limit, orderTable.searchParam);
    }).catch(() => {
        orderTable.loading = false
    })
}

loadOrderList(getTablePageStorage(orderTable.searchParam).page);

const handleClick = (event: any) => {
    orderTable.searchParam.status = event;
    isSelectAll.value = false;
    for (let key in multipleSelection) {
        delete multipleSelection[key];
    }
    loadOrderList()
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadOrderList()
}

// 订单详情
const detailEvent = (data: any) => {
    let parameter = { id: data.order_id };
    orderDetailDialog.value.setFormData(parameter);
    orderDetailDialog.value.showDialog = true;
}

const orderNotesDialog: Record<string, any> | null = ref(null)

/**
 * 设置备注
 */
const setNotes = (data: any) => {
    orderNotesDialog.value.setFormData(data)
    orderNotesDialog.value.showDialog = true
}

// 跳转会员详情
const memberEvent = (id: number) => {
    const routeUrl = router.resolve({
        path: '/member/detail',
        query: { id }
    })
    window.open(routeUrl.href, '_blank')
}

// 订单关闭
const close = (data: any) => {
    ElMessageBox.confirm(t('orderCloseTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        closeShopGiftcardOrder(data.order_id).then(() => {
            loadOrderList()
        })
    })
}

</script>

<style lang="scss" scoped>
.table-top :deep(.el-table__body-wrapper) {
    display: none;
}

.input-item {
    width: 150px !important;
}

:deep(.el-table) {
    --el-table-row-hover-bg-color: var(--el-transfer-border-color);
}

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
