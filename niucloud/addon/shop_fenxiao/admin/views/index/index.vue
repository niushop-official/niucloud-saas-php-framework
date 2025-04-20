<template>
    <div class="main-container">
        <!-- 佣金概览 -->
        <el-card class="card !border-none" shadow="never">
            <el-row>
                <el-col :span="6">
                    <div class="ml-[10px]">
                        <el-statistic :precision="2" :value="fenxiaoAccount.sum_commission">
                            <template #title>
                                <div class="flex items-center mb-[10px]">
                                    <span class="mr-[3px] text-[14px] text-[#909399]">{{ t('sumCommission') }}</span>
                                    <el-tooltip class="box-item" effect="light" :content="t('sumCommissionTips')" placement="right">
                                        <el-icon size="14px">
                                            <QuestionFilled />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="ml-[10px]">
                        <el-statistic :precision="2" :value="fenxiaoAccount.sum_commission_get">
                            <template #title>
                                <div class="flex items-center mb-[10px]">
                                    <span class="mr-[3px] text-[14px] text-[#909399]">{{ t('sumCommissionGet') }}</span>
                                    <el-tooltip class="box-item" effect="light" :content="t('sumCommissionGetTips')" placement="right">
                                        <el-icon size="14px">
                                            <QuestionFilled />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="ml-[10px]">
                        <el-statistic :precision="2" :value="fenxiaoAccount.sum_commission_cash_outing">
                            <template #title>
                                <div class="flex items-center mb-[10px]">
                                    <span class="mr-[3px] text-[14px] text-[#909399]">{{ t('sumCommissionCashOuting') }}</span>
                                    <el-tooltip class="box-item" effect="light" :content="t('sumCommissionCashOutingTips')" placement="right">
                                        <el-icon size="14px">
                                            <QuestionFilled />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="ml-[10px]">
                        <el-statistic :precision="2" :value="fenxiaoAccount.unsettlement_commission">
                            <template #title>
                                <div class="flex items-center mb-[10px]">
                                    <span class="mr-[3px] text-[14px] text-[#909399]">{{ t('unsettlementCommission') }}</span>
                                    <el-tooltip class="box-item" effect="light" :content="t('unsettlementCommissionTips')" placement="right">
                                        <el-icon size="14px">
                                            <QuestionFilled />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <!-- 佣金概览 end -->

        <el-row :gutter="15" class="mt-[15px]">
            <el-col :span="14">
                <el-card class="card !border-none" shadow="never">
                    <template #header>
                        <span class="text-lg font-extrabold">{{ t('fenxiaoOverview') }}</span>
                    </template>
                    <el-row>
                        <el-col :span="8">
                            <div class="ml-[10px]">
                                <el-statistic :value="fenxiaoMember.apply_count">
                                    <template #title>
                                        <div class="flex items-center mb-[10px]">
                                            <span class="text-[14px] text-[#909399]">{{ t('applyCount') }}</span>
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="ml-[10px]">
                                <el-statistic :value="fenxiaoMember.fenxiao_count">
                                    <template #title>
                                        <div class="flex items-center mb-[10px]">
                                            <span class="text-[14px] text-[#909399]">{{ t('fenxiaoCount') }}</span>
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="ml-[10px]">
                                <el-statistic :value="fenxiaoMember.agent_count">
                                    <template #title>
                                        <div class="flex items-center mb-[10px]">
                                            <span class="text-[14px] text-[#909399]">{{ t('agentCount') }}</span>
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>

                <el-card class="card mt-[15px] !border-none" shadow="never">
                    <template #header>
                        <span class="text-lg font-extrabold">{{ t('addFenxiaoNum') }}</span>
                    </template>
                    <div ref="visitStat" v-loading="loading"  :style="{ width: '100%', height: '350px' }"></div>
                </el-card>
            </el-col>

            <el-col :span="10">
                <el-card class="card h-full !border-none" shadow="never">
                    <template #header>
                        <span class="text-lg font-extrabold">{{ t('fenxiaoCommission') }}</span>
                    </template>
                    <el-row class="mt-[80px]">
                        <el-col :span="12">
                            <div class="ml-[10px]">
                                <el-statistic :precision="2" :value="commissionTotal||0.00">
                                    <template #title>
                                        <div class="flex items-center mb-[10px]">
                                            <span class="mr-[3px] text-[14px] text-[#909399]">{{ t('commissionCount') }}</span>
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="ml-[10px]">
                                <el-statistic :precision="2" :value="fenxiaoCommission.sum_fenxiao_commission">
                                    <template #title>
                                        <div class="flex items-center mb-[10px]">
                                            <span class="mr-[3px] text-[14px] text-[#909399]">{{ t('sumFenxiaoCommission') }}</span>
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="mt-[80px]">
                        <el-col :span="12">
                            <div class="ml-[10px]">
                                <el-statistic :precision="2" :value="fenxiaoCommission.sum_task_commission">
                                    <template #title>
                                        <div class="flex items-center mb-[10px]">
                                            <span class="mr-[3px] text-[14px] text-[#909399]">{{ t('sumTaskCommission') }}</span>
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="ml-[10px]">
                                <el-statistic :precision="2" :value="fenxiaoCommission.sum_team_commission">
                                    <template #title>
                                        <div class="flex items-center mb-[10px]">
                                            <span class="mr-[3px] text-[14px] text-[#909399]">{{ t('sumTeamCommission') }}</span>
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="mt-[80px]">
                        <el-col :span="12">
                            <div class="ml-[10px]">
                                <el-statistic :precision="2" :value="fenxiaoCommission.sum_agent_commission">
                                    <template #title>
                                        <div class="flex items-center mb-[10px]">
                                            <span class="mr-[3px] text-[14px] text-[#909399]">{{ t('sumAgentCommission') }}</span>
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="ml-[10px]">
                                <el-statistic :precision="2" :value="fenxiaoCommission.sum_sale_commission">
                                    <template #title>
                                        <div class="flex items-center mb-[10px]">
                                            <span class="mr-[3px] text-[14px] text-[#909399]">{{ t('sumSaleCommission') }}</span>
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { t } from '@/lang'
import * as echarts from 'echarts'
import { getFenxiaoAccountStat, getFenxiaoMemberStat, getFenxiaoCommissionStat, getFenxiaoWeekStat } from '@/addon/shop_fenxiao/api/stat'

const commissionTotal = ref(null)
const fenxiaoAccount = ref([]) // 获取分销账户统计
const fenxiaoCommission = ref([])// 获取分销佣金统计
const fenxiaoMember = ref([]) // 获取分销商统计
const fenxiaoWeek = ref([]) // 分销周统计 (折线图)
const fenxiaoStat = ref({
    time: [],
    num: []
})

const loading = ref(true)
const getStatInfoFn = async () => {
    fenxiaoAccount.value = await (await getFenxiaoAccountStat()).data
    fenxiaoCommission.value = await (await getFenxiaoCommissionStat()).data
    fenxiaoMember.value = await (await getFenxiaoMemberStat()).data
    fenxiaoWeek.value = await (await getFenxiaoWeekStat()).data
    if (Object.keys(fenxiaoCommission.value).length) {
        commissionTotal.value = parseFloat(fenxiaoCommission.value.sum_fenxiao_commission) + parseFloat(fenxiaoCommission.value.sum_task_commission) + parseFloat(fenxiaoCommission.value.sum_team_commission) + parseFloat(fenxiaoCommission.value.sum_agent_commission) + parseFloat(fenxiaoCommission.value.sum_sale_commission)
    }
    if (fenxiaoWeek.value.length) {
        fenxiaoStat.value.time = []
        fenxiaoStat.value.num = []
        fenxiaoWeek.value.forEach((item: any) => {
            fenxiaoStat.value.time.push(item.date)
            fenxiaoStat.value.num.push(item.num)
        })
    }
    loading.value = false
    nextTick(() => {
        drawChart()
    })
}

getStatInfoFn()

const visitStat = ref<HTMLElement>()
const drawChart = () => {
    if (!visitStat.value) return
    const visitStatChart = echarts.init(visitStat.value)
    const visitStatOption = ref({
        // title: {
        // 	text: t('addFenxiaoNum')
        // },
        legend: {},
        xAxis: {
            data: []
        },
        yAxis: {},
        tooltip: {
            trigger: 'axis'
        },
        series: [
            {
                type: 'line',
                data: []
            }
        ]
    })
    visitStatOption.value.xAxis.data = fenxiaoStat.value.time
    visitStatOption.value.series[0].data = fenxiaoStat.value.num
    visitStatChart.setOption(visitStatOption.value)
    window.addEventListener('resize', () => {
        // 页面大小变化后Echarts也更改大小
        visitStatChart.resize()
    })
}

</script>

<style lang="scss" scoped></style>
