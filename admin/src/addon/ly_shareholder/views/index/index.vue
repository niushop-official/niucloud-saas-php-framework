<template>
	<div class="min-h-[calc(100vh-84px)]">
	  <!-- <template v-if="!loading"> -->
	  <div class="main-container p-4 bg-[#eff0f4]">
		<!-- 分红概览 -->
		<div class="realtime-overview bg-white p-4">
		  <el-row>
			<el-col :span="6">
			  <div class="ml-[10px]">
				<el-statistic :precision="2" :value="fenxiaoAccount.sum_amount">
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
				<el-statistic :precision="2" :value="fenxiaoAccount.sum_amount_get">
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
				<el-statistic :precision="2" :value="fenxiaoAccount.sum_amount_cash_outing">
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
				<el-statistic :precision="2" :value="fenxiaoAccount.unsettlement_amount">
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
		</div>
	  </div>
	  <div class="main-container px-4 pb-4 bg-[#eff0f4]">
		<el-row :gutter="16">
		  <el-col :span="24">
			<div class="realtime-overview bg-white p-4">
			  <h3 class="text-[16px] mb-[20px]">{{ t('fenxiaoOverview') }}</h3>
			  <el-row>
				
				<el-col :span="8">
				  <div class="ml-[10px]">
					<el-statistic :value="fenxiaoMember.shareholder_count">
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
					<el-statistic :value="fenxiaoMember.black_shareholder_count">
					  <template #title>
						<div class="flex items-center mb-[10px]">
						  <span class="text-[14px] text-[#909399]">{{ t('blackShareholderCount') }}</span>
						</div>
					  </template>
					</el-statistic>
				  </div>
				</el-col>
				<el-col :span="8">
				  <div class="ml-[10px]">
					<el-statistic :value="fenxiaoMember.month_shareholder_count">
					  <template #title>
						<div class="flex items-center mb-[10px]">
						  <span class="text-[14px] text-[#909399]">{{ t('monthShareholderCount') }}</span>
						</div>
					  </template>
					</el-statistic>
				  </div>
				</el-col>
			  </el-row>
			</div>
			<div ref="visitStat" v-loading="loading" :style="{ width: '100%', height: '350px' }" class="bg-white p-4 mt-[10px]"></div>
		  </el-col>
		  
		</el-row>
	  </div>
	  <!-- </template> -->
	</div>
  </template>
  
  <script lang="ts" setup>
  import { nextTick, onMounted, ref } from 'vue'
  import { t } from '@/lang'
  import * as echarts from 'echarts'
  import { getShareholderAccountStat, getShareholderMemberStat,  getShareholderWeekStat } from '@/addon/ly_shareholder/api/stat'
  const commissionTotal = ref(null)
  const fenxiaoAccount = ref([]) // 获取股东账户统计
  const fenxiaoCommission = ref([]) // 获取股东佣金统计
  const fenxiaoMember = ref([]) // 获取股东统计
  const fenxiaoWeek = ref([]) // 股东周统计 (折线图)
  const fenxiaoStat = ref({
	time: [],
	num: [],
  })
  const loading = ref(true)
  const getStatInfoFn = async () => {
	fenxiaoAccount.value = await (await getShareholderAccountStat()).data
	// fenxiaoCommission.value = await (await getShareholderCommissionStat()).data
	fenxiaoMember.value = await (await getShareholderMemberStat()).data
	fenxiaoWeek.value = await (await getShareholderWeekStat()).data

	if (fenxiaoWeek.value.length) {
	  fenxiaoStat.value.time = []
	  fenxiaoStat.value.num = []
	  fenxiaoWeek.value.forEach((item: any) => {
		fenxiaoStat.value.time.push(item.date)
		fenxiaoStat.value.num.push(item.num)
	  })
	  // 反转时间和数据数组，使第七天在最右侧
      fenxiaoStat.value.time.reverse()
      fenxiaoStat.value.num.reverse()
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
	  title: {
		text: t('addFenxiaoNum'),
	  },
	  legend: {},
	  xAxis: {
		data: [],
	  },
	  yAxis: {},
	  tooltip: {
		trigger: 'axis',
	  },
	  series: [
		{
		  type: 'line',
		  data: [],
		},
	  ],
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
  
  <style lang="scss" scoped>
  .main-container {
	background-color: var(--el-bg-color-overlay);
	min-height: auto !important;
	overflow: hidden;
  }
  </style>
  