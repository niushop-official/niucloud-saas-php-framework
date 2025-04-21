<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="orderTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('outTradeNo')" prop="out_trade_no">
                    	<el-input v-model="orderTable.searchParam.out_trade_no"
                    		:placeholder="t('outTradeNoPlaceholder')" />
                    </el-form-item>
                    
                   <!-- <el-form-item :label="t('orderStatus')" prop="order_status">
                    	<el-select v-model="orderTable.searchParam.order_status" clearable class="input-width">
                    		<el-option :label="t('selectPlaceholder')" value="" />
                    		<el-option :label="item['name']" :value="item['status']" v-for="(item,index) in statusList"
                    			:key="index" />
                    	</el-select>
                    </el-form-item> -->
                    
                    <!-- <el-form-item :label="t('memberId')" prop="member_id">
                    	<el-select class="w-[280px]" v-model="orderTable.searchParam.member_id" clearable
                    		:placeholder="t('memberIdPlaceholder')">
                    		<el-option v-for="(item, index) in memberIdList" :key="index" :label="item['nickname']"
                    			:value="item['member_id']" />
                    	</el-select>
                    </el-form-item> -->
                    <el-form-item :label="t('createTime')" prop="create_time">
                    	<el-date-picker v-model="orderTable.searchParam.create_time" type="datetimerange"
                    		value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                    		:end-placeholder="t('endDate')" />
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
                    <el-table-column prop="order_id" :label="t('orderId')" min-width="80"
                    	:show-overflow-tooltip="false" />
                    
                    <el-table-column prop="order_no" :label="t('orderNo')" min-width="120"
                    	:show-overflow-tooltip="true" />
                    <el-table-column prop="log_id" :label="t('转赠记录ID')" min-width="120"
                    	:show-overflow-tooltip="false" />
                    <!-- <el-table-column prop="order_from" :label="t('orderFrom')" min-width="120"
                    	:show-overflow-tooltip="false" /> -->
                    
                    <el-table-column prop="out_trade_no" :label="t('outTradeNo')" min-width="120"
                    	:show-overflow-tooltip="true" />
                    <el-table-column :label="t('orderStatus')" min-width="120" align="center">
                    	<template #default="{ row }">
                    		{{ row.order_status_info.name }}
                    	</template>
                    </el-table-column>
                    <el-table-column prop="member_id_name" :label="t('memberId')" min-width="120"
                    	:show-overflow-tooltip="true" />
                    
                    <el-table-column prop="order_money" :label="t('orderMoney')" min-width="120"
                    	:show-overflow-tooltip="false" />
                    
                    <el-table-column prop="pay_type_name" :label="t('支付方式')" align="center" min-width="140" />
                    
                    <el-table-column :label="t('createTime')" min-width="180" align="center">
                    	<template #default="{ row }">
                    		{{ row.create_time || '' }}
                    	</template>
                    </el-table-column>
                    
                    <el-table-column :label="t('payTime')" min-width="180" align="center">
                    	<template #default="{ row }">
                    		{{ row.pay_time || '' }}
                    	</template>
                    </el-table-column>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                    	<template #default="{ row }">
                    		<el-button type="primary" link
                    			@click="deleteEvent(row.order_id)">{{ t('delete') }}</el-button>
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
import { getOrderList, deleteOrder } from '@/addon/transfer/api/order'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/transfer/views/order/components/order-edit.vue'
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
      "site_id":"",
      "order_no":"",
      "order_from":"",
      "out_trade_no":"",
      "order_status":"",
      "member_id":"",
      "ip":"",
      "order_money":"",
      "create_time":"",
      "pay_time":"",
      "close_time":"",
      "log_id":"",
      "order_type":""
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    

/**
 * 获取转赠支付订单列表
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
 * 添加转赠支付订单
 */
const addEvent = () => {
    editOrderDialog.value.setFormData()
    editOrderDialog.value.showDialog = true
}

/**
 * 编辑转赠支付订单
 * @param data
 */
const editEvent = (data: any) => {
    editOrderDialog.value.setFormData(data)
    editOrderDialog.value.showDialog = true
}

/**
 * 删除转赠支付订单
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
