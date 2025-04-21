<template>
	<div class="main-container">
		<el-card class="box-card !border-none" shadow="never">
			<div class="flex justify-between items-center mb-[5px]">
				<span class="text-page-title">{{ pageName }}</span>
				 <el-button type="primary" @click="addEvent">{{ t('addBalance') }}</el-button>
			</div>
			<div class="mt-[16px]">
				<el-table :data="orderTableData.data" size="large" v-loading="orderTableData.loading">
					<template #empty>
						<span>{{ !orderTableData.loading ? t('emptyData') : '' }}</span>
					</template>
					<el-table-column prop="amount" :show-overflow-tooltip="true" :label="t('amount')" align="center" min-width="140" />
					<el-table-column prop="money" :label="t('money')" align="center" min-width="140" />
					<el-table-column prop="jifen" :label="t('jifen')" align="center" min-width="140" />
					<el-table-column prop="level_name" :label="t('level')" align="center" min-width="140" />
					
					<el-table-column :label="t('operation')" fixed="right" width="130"  align="right">
					    <template #default="{ row }">
					        <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
					        <el-button type="primary" link @click="deleteEvent(row.setting_id)">{{ t('delete') }}</el-button>
					    </template>
					</el-table-column>
				</el-table>
	
				<div class="mt-[16px] flex justify-end">
					<el-pagination v-model:current-page="orderTableData.page" v-model:page-size="orderTableData.limit"
						layout="total, sizes, prev, pager, next, jumper" :total="orderTableData.total"
						@size-change="loadOrderList()" @current-change="loadOrderList" />
				</div>
			</div>
			
			 <edit-balance ref="editBalanceDialog" @complete="loadOrderList()" />
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import {
    getYkRechargeBalanceShow,
	deleteBalance
} from '@/addon/yk_recharge/api/recharge'
import { getChannelType } from '@/app/api/sys'
import { img } from '@/utils/common'
import { useRouter, useRoute } from 'vue-router'
import { AnyObject } from '@/types/global'
import type { ElMessageBox,FormInstance } from 'element-plus'
import EditBalance from '@/addon/yk_recharge/views/balance/components/edit-balance.vue'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const orderTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: []
})

const loadOrderList = (page: number = 1) => {
    orderTableData.loading = true
    orderTableData.page = page
    getYkRechargeBalanceShow({
        page: orderTableData.page,
        limit: orderTableData.limit,
        ...orderTableData.searchParam
    }).then(res => {
        orderTableData.loading = false
        orderTableData.data = res.data.data
        orderTableData.total = res.data.total
    }).catch(() => {
        orderTableData.loading = false
    })
}
loadOrderList()

const editBalanceDialog: Record<string, any> | null = ref(null)

/**
 * 添加配置
 */
const addEvent = () => {
    editBalanceDialog.value.setFormData()
    editBalanceDialog.value.showDialog = true
}

/**
 * 编辑配置
 * @param data
 */
const editEvent = (data: any) => {
    editBalanceDialog.value.setFormData(data)
    editBalanceDialog.value.showDialog = true
}


/**
 * 删除配置
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('amountDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteBalance(id).then(() => {
            loadOrderList()
        }).catch(() => {
        })
    })
}
</script>

<style lang="scss" scoped></style>
