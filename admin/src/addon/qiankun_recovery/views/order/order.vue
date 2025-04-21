<template>
  <div class="main-container">
    <el-card class="box-card !border-none" shadow="never">

      <div class="flex justify-between items-center">
        <span class="text-lg">{{ pageName }}</span>
        <el-button type="primary" @click="addEvent">
          {{ t('addOrder') }}
        </el-button>
      </div>

      <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
        <el-form :inline="true" :model="orderTable.searchParam" ref="searchFormRef">
          <el-form-item :label="t('orderNo')" prop="order_no">
            <el-input v-model="orderTable.searchParam.order_no" :placeholder="t('orderNoPlaceholder')"/>
          </el-form-item>
          <el-form-item :label="t('memberId')" prop="member_id">
            <el-input v-model="orderTable.searchParam.member_id" :placeholder="t('memberIdPlaceholder')"/>
          </el-form-item>
          <el-form-item :label="t('goodsId')" prop="goods_id">
            <el-input v-model="orderTable.searchParam.goods_id" :placeholder="t('goodsIdPlaceholder')"/>
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
          <el-table-column prop="order_no" :label="t('orderNo')" min-width="180" :show-overflow-tooltip="true"/>

          <el-table-column prop="member_id" :label="t('memberId')" min-width="280" :show-overflow-tooltip="true">
            <template #default="{ row }">
              <div class="flex items-center">
                <el-image v-if="row.member.headimg" class="w-[50px] h-[50px]" :src="img(row.member.headimg)" fit="contain">
                  <template #error>
                    <div class="image-slot">
                      <img class="w-[50px] h-[50px] rounded-full" src="@/app/assets/images/member_head.png" alt="">
                    </div>
                  </template>
                </el-image>
                <img class="w-[50px] h-[50px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                <div class="ml-[10px]">
                  <div>用户名：{{ row.member.nickname }}</div>
                  <div>手机号：{{ row.member.mobile || '未授权手机号' }}</div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="goods_name" :label="t('goodsId')" min-width="120" :show-overflow-tooltip="true"/>

          <el-table-column prop="sku_name" :label="t('skuId')" min-width="120" :show-overflow-tooltip="true"/>

          <el-table-column prop="goods_price" :label="t('goodsPrice')" min-width="120" :show-overflow-tooltip="true"/>

          <el-table-column prop="after" :label="t('after')" min-width="120" :show-overflow-tooltip="true" align="center">
            <template #default="{ row }">
              <div>{{ row.after }}%</div>
            </template>
          </el-table-column>

          <el-table-column prop="type" :label="t('type')" min-width="120" :show-overflow-tooltip="true" align="center">
            <template #default="{ row }">
              <el-tag :type="row.type?'primary':'success'">{{ t('type' + row.type) }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="is_full" :label="t('isFull')" min-width="120" :show-overflow-tooltip="true" align="center">
            <template #default="{ row }">
              <el-tag :type="row.is_full?'primary':'success'">{{ t('isFull' + row.is_full) }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="current" :label="t('current')" min-width="120" :show-overflow-tooltip="true" align="center"/>

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
                         @size-change="loadOrderList()" @current-change="loadOrderList"/>
        </div>
      </div>

      <edit ref="editOrderDialog" @complete="loadOrderList"/>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref, watch} from 'vue'
import {t} from '@/lang'
import {useDictionary} from '@/app/api/dict'
import {getOrderList, deleteOrder} from '@/addon/qiankun_recovery/api/order'
import {img} from '@/utils/common'
import {ElMessageBox, FormInstance} from 'element-plus'
import Edit from '@/addon/qiankun_recovery/views/order/components/order-edit.vue'
import {useRoute} from 'vue-router'

const route = useRoute()
const pageName = route.meta.title;

let orderTable = reactive({
  page: 1,
  limit: 10,
  total: 0,
  loading: true,
  data: [],
  searchParam: {
    "order_no": "",
    "member_id": "",
    "goods_id": ""
  }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据


/**
 * 获取推N返本订单列表
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
 * 添加推N返本订单
 */
const addEvent = () => {
  editOrderDialog.value.setFormData()
  editOrderDialog.value.showDialog = true
}

/**
 * 编辑推N返本订单
 * @param data
 */
const editEvent = (data: any) => {
  editOrderDialog.value.setFormData(data)
  editOrderDialog.value.showDialog = true
}

/**
 * 删除推N返本订单
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
