<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addOrder') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="orderTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('orderNo')" prop="order_no">
                        <el-input v-model="orderTable.searchParam.order_no" :placeholder="t('orderNoPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('orderFrom')" prop="order_from">
                        <el-input v-model="orderTable.searchParam.order_from" :placeholder="t('orderFromPlaceholder')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('memberId')" prop="member_id">
                        <el-select class="w-[280px]" v-model="orderTable.searchParam.member_id" clearable :placeholder="t('memberIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in memberIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['member_id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('rechargeId')" prop="recharge_id">
                        <el-select class="w-[280px]" v-model="orderTable.searchParam.recharge_id" clearable :placeholder="t('rechargeIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in rechargeIdList"
                                       :key="index"
                                       :label="item['title']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('paid')" prop="paid">
                        <el-select class="" v-model="orderTable.searchParam.paid" clearable :placeholder="t('paidPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                    
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('payTime')" prop="pay_time">
                        <el-input v-model="orderTable.searchParam.pay_time" :placeholder="t('payTimePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('refundStatus')" prop="refund_status">
                        <el-input v-model="orderTable.searchParam.refund_status" :placeholder="t('refundStatusPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-input v-model="orderTable.searchParam.create_time" :placeholder="t('createTimePlaceholder')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadOrderList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="orderTable.data" size="large" v-loading="orderTable.loading">
                    <template #empty>
                        <span>{{ !orderTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="order_no" :label="t('orderNo')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="order_from" :label="t('orderFrom')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="order_type" :label="t('orderType')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="out_trade_no" :label="t('outTradeNo')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="member_id_name" :label="t('memberId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="recharge_id_name" :label="t('rechargeId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="give_coupon" :label="t('giveCoupon')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="give_integral" :label="t('giveIntegral')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="give_price" :label="t('givePrice')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="paid" :label="t('paid')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="pay_time" :label="t('payTime')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="refund_status" :label="t('refundStatus')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="orderTable.page" v-model:page-size="orderTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="orderTable.total"
                        @size-change="loadOrderList()" @current-change="loadOrderList" />
                </div>
            </div>

            <edit ref="editOrderDialog" @complete="loadOrderList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getOrderList, deleteOrder, getWithMemberList, getWithOptionsList } from '@/addon/qiankun_recharge/api/order'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/qiankun_recharge/views/order/components/order-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let orderTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "order_no":"",
      "order_from":"",
      "member_id":"",
      "recharge_id":"",
      "paid":"",
      "pay_time":"",
      "refund_status":"",
      "create_time":""
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    

/**
 * 获取充值订单列表
 */
const loadOrderList = (page: number = 1) => {
    orderTable.loading = true
    orderTable.page = page

    getOrderList({
        page: orderTable.page,
        limit: orderTable.limit,
         ...orderTable.searchParam
    }).then(res => {
        orderTable.loading = false
        orderTable.data = res.data.data
        orderTable.total = res.data.total
    }).catch(() => {
        orderTable.loading = false
    })
}
loadOrderList()

const editOrderDialog: Record<string, any> | null = ref(null)

/**
 * 添加充值订单
 */
const addEvent = () => {
    editOrderDialog.value.setFormData()
    editOrderDialog.value.showDialog = true
}

/**
 * 编辑充值订单
 * @param data
 */
const editEvent = (data: any) => {
    editOrderDialog.value.setFormData(data)
    editOrderDialog.value.showDialog = true
}

/**
 * 删除充值订单
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('orderDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteOrder(id).then(() => {
            loadOrderList()
        }).catch(() => {
        })
    })
}

    
    const memberIdList = ref([])
    const setMemberIdList = async () => {
    memberIdList.value = await (await getWithMemberList({})).data
    }
    setMemberIdList()
    const rechargeIdList = ref([])
    const setRechargeIdList = async () => {
    rechargeIdList.value = await (await getWithOptionsList({})).data
    }
    setRechargeIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadOrderList()
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
