<template>
    <div class="main-container">
        <el-card class="card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-card class="card my-[10px] !border-none table-search-wrap" shadow="never">
                <el-form :inline="true" :model="salePeriodTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('settlementTime')" prop="settlement_time">
                        <el-date-picker v-model="salePeriodTable.searchParam.settlement_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item :label="t('sendTime')" prop="send_time">
                        <el-date-picker v-model="salePeriodTable.searchParam.send_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item :label="t('settlementStatus')" prop="is_settlement">
                        <el-select v-model="salePeriodTable.searchParam.is_settlement" :placeholder="t('settlementStatusPlaceholder')" clearable>
                            <el-option label="已结算" :value="1" />
                            <el-option label="待结算" :value="0" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('sendStatus')" prop="is_send">
                        <el-select v-model="salePeriodTable.searchParam.is_send" :placeholder="t('sendStatusPlaceholder')" clearable>
                            <el-option label="已发放" :value="1" />
                            <el-option label="待发放" :value="0" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadSalePeriodList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="salePeriodTable.data" size="large" v-loading="salePeriodTable.loading">
                    <template #empty>
                        <span>{{ !salePeriodTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="period_type_name" :label="t('periodType')" min-width="80" />
                    <el-table-column prop="sale_start_time" :label="t('saleStartTime')" min-width="140" />
                    <el-table-column prop="sale_end_time" :label="t('saleEndTime')" min-width="140" />
                    <el-table-column :label="t('orderMoney')" min-width="120" align="right">
                        <template #default="{ row }">
                            {{ moneyFormat(row.total_order_money) }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('rewardMoney')" min-width="120" align="right">
                        <template #default="{ row }">
                            {{ moneyFormat(row.total_reward_money) }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('settlementStatus')" min-width="150" align="center">
                        <template #default="{ row }">
                            {{ row.is_settlement > 0 ? '已结算' : '待结算' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('sendStatus')" min-width="150" align="center">
                        <template #default="{ row }">
                            {{ row.is_send > 0 ? '已发放' : '待发放' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('settlementTime')" min-width="150" align="center">
                        <template #default="{ row }">
                            {{ row.settlement_time || '--' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('sendTime')" min-width="150" align="center">
                        <template #default="{ row }">
                            {{ row.send_time || '--' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('operation')" align="right" fixed="right" min-width="120">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="detailEvent(row.id)">{{ t('detail') }}</el-button>
                            <el-button type="primary" v-if="row.is_settlement&&!row.is_send" link @click="grantEvent(row.id)">{{ t('grant') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="salePeriodTable.page"
                        v-model:page-size="salePeriodTable.limit" layout="total, sizes, prev, pager, next, jumper"
                        :total="salePeriodTable.total" @size-change="loadSalePeriodList()"
                        @current-change="loadSalePeriodList" />
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getSalePeriodList,setSaleSend } from '@/addon/shop_fenxiao/api/sale'
import { img, moneyFormat ,setTablePageStorage, getTablePageStorage} from '@/utils/common'
import type { ElMessageBox,FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const salePeriodTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        settlement_time: [],
        send_time: [],
        is_settlement:'',
        is_send:''
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取奖励周期列表
 */
const loadSalePeriodList = (page: number = 1) => {
    salePeriodTable.loading = true
    salePeriodTable.page = page

    getSalePeriodList({
        page: salePeriodTable.page,
        limit: salePeriodTable.limit,
        ...salePeriodTable.searchParam
    }).then(res => {
        salePeriodTable.loading = false
        salePeriodTable.data = res.data.data
        salePeriodTable.total = res.data.total
        setTablePageStorage(salePeriodTable.page, salePeriodTable.limit, salePeriodTable.searchParam);
    }).catch(() => {
        salePeriodTable.loading = false
    })
}
loadSalePeriodList(getTablePageStorage(salePeriodTable.searchParam).page)

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadSalePeriodList()
}

const detailEvent = (id:number) => {
    // let routeData = router.resolve(`/shop_fenxiao/sale/member_list?id=${id}`)
    // window.open(routeData.href,' blank');
    router.push(`/shop_fenxiao/sale/member_list?id=${id}`)
}

const grantEvent = (id:number) =>{
        ElMessageBox.confirm(t('grantTip'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
       setSaleSend(id).then((res)=>{
        loadSalePeriodList()
       })
    })

}
</script>

<style lang="scss" scoped></style>
