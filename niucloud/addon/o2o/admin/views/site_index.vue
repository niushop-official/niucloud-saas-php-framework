<template>
    <div class="main-container flex min-h-[300px]" v-loading="loading">
        <div class="main-body flex-1 mr-[15px]" v-if="!loading">
            <el-card class="box-card !border-none" shadow="never">
				<el-row :gutter="60">
					<el-col :span="19">
						<div class="mt-[40px]">
							<p class="text-[18px] font-bold mb-[18px]">{{ t('commonFunctions') }}</p>
							<el-row :gutter="15">
								<el-col :span="6">
									<div class="w-full py-[20px] flex items-center border-[#E6E6E6] border-[1px] cursor-pointer" @click="toLink('/site/member/member')">
										<div class="ml-[18px] mr-[21px]">
											<img class="min-w-[45px] h-[45px] max-w-[45px]" src="@/addon/o2o/assets/images/reserve.png" />
										</div>
										<div class="flex flex-wrap">
											<span class="w-full text-[14px]">{{ t('memberManage') }}</span>
											<span class="w-full text-[#999999] text-[12px]">{{ t('memberDesc') }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="w-full py-[20px] flex items-center border-[#E6E6E6] border-[1px] cursor-pointer" @click="toLink('/o2o/goods/list')">
										<div class="ml-[18px] mr-[21px]">
											<img class="min-w-[45px] h-[45px] max-w-[45px]" src="@/addon/o2o/assets/images/service.png" />
										</div>
										<div class="flex flex-wrap">
											<span class="w-full text-[14px]">{{ t('serviceManage') }}</span>
											<span class="w-full text-[#999999] text-[12px]">{{ t('serviceDesc') }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="w-full py-[20px] flex items-center border-[#E6E6E6] border-[1px] cursor-pointer" @click="toLink('/o2o/technician/list')">
										<div class="ml-[18px] mr-[21px]">
											<img class="min-w-[45px] h-[45px] max-w-[45px]" src="@/addon/o2o/assets/images/member.png" />
										</div>
										<div class="flex flex-wrap">
											<span class="w-full text-[14px]">{{ t('technician') }}</span>
											<span class="w-full text-[#999999] text-[12px]">{{ t('technicianDesc') }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="w-full py-[20px] flex items-center border-[#E6E6E6] border-[1px] cursor-pointer" @click="toLink('/o2o/order/list')">
										<div class="ml-[18px] mr-[21px]">
											<img class="min-w-[45px] h-[45px] max-w-[45px]" src="@/addon/o2o/assets/images/money.png" />
										</div>
										<div class="flex flex-wrap">
											<span class="w-full text-[14px]">{{ t('orderManage') }}</span>
											<span class="w-full text-[#999999] text-[12px]">{{ t('orderDesc') }}</span>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
						<div class="mt-[40px]">
							<p class="text-[18px] font-bold mb-[25px]">{{ t('dataSummary') }}</p>
							<el-row :gutter="30">
								<el-col :span="8">
									<div class="w-full py-[16px] px-[20px] border-[#E6E6E6] border-[1px]">
										<div class="flex justify-between">
											<span class="text-[18px]">{{ t('totalRevenue') }}</span>
										</div>
										<div class="my-[20px]">
											<div class="flex justify-center"><span class="text-[14px]">{{t('accumulateMoney') }}</span></div>
											<div class="flex justify-center"><span class="text-[28px]">{{statTotal.order_money }}</span></div>
										</div>
										<div class="flex justify-between">
											<span class="text-[14px]">{{ t('today') }}：{{ statToday.order_money }}</span>
											<span class="mr-[60px] text-[14px]">{{ t('thisMonth') }}：{{ statMonth.order_money }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="8">
									<div class="w-full py-[16px] px-[20px] border-[#E6E6E6] border-[1px]">
										<div class="flex justify-between">
											<span class="text-[18px]">{{ t('orderItemPay') }}</span>
										</div>
										<div class="my-[20px]">
											<div class="flex justify-center"><span class="text-[14px]">{{t('accumulateMoney') }}</span></div>
											<div class="flex justify-center"><span class="text-[28px]">{{statTotal.item_order_money }}</span></div>
										</div>
										<div class="flex justify-between">
											<span class="text-[14px]">{{ t('today') }}：{{ statToday.item_order_money}}</span>
											<span class="mr-[60px] text-[14px]">{{ t('thisMonth') }}：{{statMonth.item_order_money }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="8">
									<div class="w-full py-[16px] px-[20px] border-[#E6E6E6] border-[1px]">
										<div class="flex justify-between">
											<span class="text-[18px]">{{ t('refundMoney') }}</span>
										</div>
										<div class="my-[20px]">
											<div class="flex justify-center"><span class="text-[14px]">{{ t('accumulateMoney') }}</span></div>
											<div class="flex justify-center"><span class="text-[28px]">{{statTotal.refund_money }}</span></div>
										</div>
										<div class="flex justify-between">
										<span class="text-[14px]">{{ t('today') }}：{{ statToday.refund_money }}</span>
										<span class="mr-[60px] text-[14px]">{{ t('thisMonth') }}：{{statMonth.refund_money }}</span>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
						<div class="py-[16px] px-[20px] border-[1px] border-[#E6E6E6] mt-[35PX]">
							<p class="text-[16px]">{{ t('orderStat') }}</p>
							<el-row class="mt-[20px]">
								<el-col :span="8">
									<div>
										<div class="flex justify-center items-center"><span class="text-[14px]">{{t('orderNum') }}</span></div>
										<div class="flex justify-center items-center mt-[10px]"><span class="text-[28px]">{{statTotal.order_num }}</span></div>
									</div>
								</el-col>
								<el-col :span="8">
									<div>
										<div class="flex justify-center items-center"><span class="text-[14px]">{{t('refundOrderNum') }}</span></div>
										<div class="flex justify-center items-center mt-[10px]"><span class="text-[28px]">{{statTotal.refund_num }}</span></div>
									</div>
								</el-col>
								<el-col :span="8">
									<div>
										<div class="flex justify-center items-center"><span class="text-[14px]">{{t('orderItemNum') }}</span></div>
										<div class="flex justify-center items-center mt-[10px]"><span class="text-[28px]">{{statTotal.item_order_num }}</span></div>
									</div>
								</el-col>
							</el-row>
						</div>
					</el-col>
				</el-row>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import { getStat, getYesterdayStat, getTodayStat, getMonthStat } from '@/addon/o2o/api/stat'
import { useRouter } from 'vue-router'

const loading = ref(false)
const statYesterday = ref([])
const statToday = ref([])
const statMonth = ref([])
const statTotal = ref([])
const getStatInfoFn = async () => {
    statYesterday.value = await (await getYesterdayStat()).data
    statToday.value = await (await getTodayStat()).data
    statMonth.value = await (await getMonthStat()).data
    statTotal.value = await (await getStat()).data
    loading.value = false
}
getStatInfoFn()

const router = useRouter()
/**
 * 链接跳转
 */
const toLink = (link) => {
    router.push(link)
}

</script>

<style lang="scss" scoped>
</style>
