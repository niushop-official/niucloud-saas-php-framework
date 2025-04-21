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
				<!-- 总代理人数 -->
				<el-col :span="4">
				  <div class="ml-[10px]">
					<el-statistic :value="fenxiaoMember.agent_count">
					  <template #title>
						<div class="flex items-center mb-[10px]">
						  <span class="text-[14px] text-[#909399]">{{ t('fenxiaoCount') }}</span>
						</div>
					  </template>
					</el-statistic>
				  </div>
				</el-col>
                <!-- 冻结代理 -->
				<el-col :span="4">
				  <div class="ml-[10px]">
					<el-statistic :value="fenxiaoMember.black_agent_count">
					  <template #title>
						<div class="flex items-center mb-[10px]">
						  <span class="text-[14px] text-[#909399]">{{ t('blackShareholderCount') }}</span>
						</div>
					  </template>
					</el-statistic>
				  </div>
				</el-col>
                <!-- 省级代理人数 -->
				<el-col :span="4">
				  <div class="ml-[10px]">
					<el-statistic :value="fenxiaoMember.province_agent_count">
					  <template #title>
						<div class="flex items-center mb-[10px]">
						  <span class="text-[14px] text-[#909399]">{{ t('provinceAgentCount') }}</span>
						</div>
					  </template>
					</el-statistic>
				  </div>
				</el-col>
                <!-- 市级代理人数 -->
				<el-col :span="4">
				  <div class="ml-[10px]">
					<el-statistic :value="fenxiaoMember.city_agent_count">
					  <template #title>
						<div class="flex items-center mb-[10px]">
						  <span class="text-[14px] text-[#909399]">{{ t('cityAgentCount') }}</span>
						</div>
					  </template>
					</el-statistic>
				  </div>
				</el-col>
                <!-- 区县级代理人数 -->
				<el-col :span="4">
				  <div class="ml-[10px]">
					<el-statistic :value="fenxiaoMember.district_agent_count">
					  <template #title>
						<div class="flex items-center mb-[10px]">
						  <span class="text-[14px] text-[#909399]">{{ t('districtAgentCount') }}</span>
						</div>
					  </template>
					</el-statistic>
				  </div>
				</el-col>
                <!-- 月新增代理人数 -->
				<el-col :span="4">
				  <div class="ml-[10px]">
					<el-statistic :value="fenxiaoMember.month_agent_count">
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
  import { getAreaAgentAccountStat, getAreaAgentMemberStat,  getAreaAgentWeekStat } from '@/addon/ly_area/api/stat'
  const commissionTotal = ref(null)
  const fenxiaoAccount = ref([]) // 获取代理账户统计
  const fenxiaoCommission = ref([]) // 获取代理佣金统计
  const fenxiaoMember = ref([]) // 获取代理统计
  const fenxiaoWeek = ref([]) // 代理周统计 (折线图)
  const fenxiaoStat = ref({
	time: [],
	num: [],
  })
  const loading = ref(true)
  const getStatInfoFn = async () => {
	fenxiaoAccount.value = await (await getAreaAgentAccountStat()).data
	// fenxiaoCommission.value = await (await getAreaAgentCommissionStat()).data
	fenxiaoMember.value = await (await getAreaAgentMemberStat()).data
	fenxiaoWeek.value = await (await getAreaAgentWeekStat()).data

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
  