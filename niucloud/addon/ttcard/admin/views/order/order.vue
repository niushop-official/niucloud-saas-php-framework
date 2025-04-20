<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="orderTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('orderNum')" prop="order_num">
                        <el-input v-model="orderTable.searchParam.order_num" :placeholder="t('orderNumPlaceholder')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('payStatus')" prop="pay_status" style="width: 200px;">
                        <el-select class="w-[280px]" v-model="orderTable.searchParam.pay_status" clearable :placeholder="t('payStatusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in pay_statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="t('ordertypeId')" prop="ordertype_id">
                        <el-select class="w-[280px]" v-model="orderTable.searchParam.ordertype_id" clearable :placeholder="t('ordertypeIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in ordertypeIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['real_id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('userId')" prop="user_id">
                        <el-select class="w-[280px]" v-model="orderTable.searchParam.user_id" clearable :placeholder="t('userIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in userIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <!-- <el-form-item :label="t('authenticationId')" prop="authentication_id">
                        <el-input v-model="orderTable.searchParam.authentication_id" :placeholder="t('authenticationIdPlaceholder')" />
                    </el-form-item> -->
                    
                    
                    
                    <!-- <el-form-item :label="t('ordertypeViptype')" prop="ordertype_viptype">
                        <el-input v-model="orderTable.searchParam.ordertype_viptype" :placeholder="t('ordertypeViptypePlaceholder')" />
                    </el-form-item> -->
                   
                    <el-form-item :label="t('paytime')" prop="paytime">
                        <el-date-picker v-model="orderTable.searchParam.paytime" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="orderTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
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
                    <el-table-column prop="order_num" :label="t('orderNum')" width="220" :show-overflow-tooltip="true"/>
                    <el-table-column prop="user_id_name" :label="t('userId')" width="160" :show-overflow-tooltip="true"/>

                    <el-table-column prop="ordertype_id_name" :label="t('ordertypeId')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column :label="t('payStatus')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in pay_statusList">
                                <div v-if="item.value == row.pay_status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="price" :label="t('price')" min-width="120" :show-overflow-tooltip="true"/>
                    <el-table-column prop="buy_num" :label="t('buyNum')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="total_price" :label="t('totalPrice')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <!--
                    <el-table-column prop="authentication_id" :label="t('authenticationId')" min-width="120" :show-overflow-tooltip="true"/> -->
                    
                   
                    
                    <!-- <el-table-column prop="ordertype_viptype" :label="t('ordertypeViptype')" min-width="120" :show-overflow-tooltip="true"/> -->
                    
                    <!-- <el-table-column prop="order_type_diyname" :label="t('orderTypeDiyname')" min-width="120" :show-overflow-tooltip="true"/> -->
                    
                     <el-table-column :label="t('paytime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.paytime || '' }}
                        </template>
                    </el-table-column>
                    
                     <el-table-column :label="t('createTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button v-if="row.pay_status==2" type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
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
import { getOrderList, deleteOrder, getWithUserList, getWithOrdertypeList } from '@/addon/ttcard/api/order'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/order/components/order-edit.vue'
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
      "order_num":"",
      "pay_status":"",
      "user_id":"",
      "authentication_id":"",
      "ordertype_id":"",
      "ordertype_viptype":"",
      "order_type_diyname":"",
      "paytime":"",
      "create_time":""
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    const pay_statusList = ref([] as any[])
    const pay_statusDictList = async () => {
    pay_statusList.value = await (await useDictionary('支付状态')).data.dictionary
    }
    pay_statusDictList();

/**
 * 获取订单管理列表
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
 * 添加订单管理
 */
const addEvent = () => {
    editOrderDialog.value.setFormData()
    editOrderDialog.value.showDialog = true
}

/**
 * 编辑订单管理
 * @param data
 */
const editEvent = (data: any) => {
    editOrderDialog.value.setFormData(data)
    editOrderDialog.value.showDialog = true
}

/**
 * 删除订单管理
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

    
    const userIdList = ref([])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithUserList({})).data
    }
    setUserIdList()
    const ordertypeIdList = ref([])
    const setOrdertypeIdList = async () => {
    ordertypeIdList.value = await (await getWithOrdertypeList({})).data
    }
    setOrdertypeIdList()

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
