<template>
    <div class="main-container">

        <!--返回-->
        <el-card class="card !border-none" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="$router.back()" />
        </el-card>
        <!--返回 end-->

        <el-card class="card mt-[15px] !border-none" shadow="never">
            <div>
                <el-table :data="salePeriodTable.data" size="large" v-loading="salePeriodTable.loading">
                    <template #empty>
                        <span>{{ !salePeriodTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column :label="t('memberInfo')" min-width="160">
                        <template #default="{ row }">
                            <div class="flex items-center cursor-pointer">
                                <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                    <el-image v-if="row.member && row.member.headimg" class="w-[50px] h-[50px]" :src="img(row.member.headimg)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[50px] h-[50px] rounded-full" src="@/app/assets/images/member_head.png" alt="">
                                            </div>
                                        </template>
                                    </el-image>
                                    <img class="w-[50px] h-[50px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                                </div>
                                <div class="ml-2">
                                    <span :title="row.member && row.member.nickname" class="multi-hidden">{{row.member && row.member.nickname || row.member && row.member.username}}</span>
                                    <span class="text-primary text-[12px]">{{row.member && row.member.mobile}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sale_start_time" :label="t('saleStartTime')" min-width="130" />
                    <el-table-column prop="sale_end_time" :label="t('saleEndTime')" min-width="130" />
                    <el-table-column prop="order_money" :label="t('orderMoney')" min-width="120" align="right" />
                    <el-table-column prop="reward_money" :label="t('rewardMoney')" min-width="120" align="right" />
                    <el-table-column :label="t('settlementStatus')" min-width="120" align="center">
                        <template #default="{ row }">
                            {{ row.is_settlement > 0 ? '已结算' : '待结算' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('sendStatus')" min-width="120" align="center">
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
import { img } from '@/utils/common'
import { getSalePeriodMemberList, getSalePeriodInfo } from '@/addon/shop_fenxiao/api/sale'
import type { FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

const salePeriodTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        create_time: ''
    }
})
const formData: any = ref({});
const loading = ref<boolean>(false)
const getDetail = (id: number) => {
    loading.value = true
    getSalePeriodInfo(id).then((res: any) => {
        formData.value = res.data
        loading.value = false
    }).catch(()=>{
        loading.value = false
    })
}

let id = Number(route.query.id)
getDetail(id)
/**
 * 获取奖励周期列表
 */
const loadSalePeriodList = (page: number = 1) => {
    salePeriodTable.loading = true
    salePeriodTable.page = page

    getSalePeriodMemberList({
        page: salePeriodTable.page,
        limit: salePeriodTable.limit,
        period_id: id,
        ...salePeriodTable.searchParam
    }).then(res => {
        salePeriodTable.loading = false
        salePeriodTable.data = res.data.data
        salePeriodTable.total = res.data.total
    }).catch(() => {
        salePeriodTable.loading = false
    })
}
loadSalePeriodList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadSalePeriodList()
}
</script>

<style lang="scss" scoped></style>
