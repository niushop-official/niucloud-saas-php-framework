<template>
    <div class="main-container flex min-h-[300px]" v-loading="loading">
        <div class="main-body flex-1 mr-[15px]" v-if="!loading">
            <el-card class="box-card !border-none" shadow="never">
                <el-row :gutter="60">
                    <el-col :span="19">
                        <div class="flex items-end">
                            <div class="flex items-center w-[500px] h-[45px] border-[2px] border-primary rounded-l-lg">
                                <span class="h-[15px] ml-[10px] pr-[10px] border-r-[1px] border-[#DEE1E7] leading-[1]">
                                    <img class="w-[15px]" src="@/addon/vipcard/assets/images/write.png" />
                                </span>
                                <input class="w-[400px] h-[40px] outline-none pl-[10px] text-[18px] bg-transparent" v-model="verifycode" />
                            </div>
                            <div class="bg-primary h-[45px] flex items-center px-[20px] rounded-[10px] ml-[10px] text-[#fff] cursor-pointer" @click="handelVerify">
                                <span>{{ t('write') }}</span>
                            </div>
                            <div class="bg-primary h-[45px] flex items-center px-[20px] rounded-[10px] ml-[10px] text-[#fff] cursor-pointer" @click="toBlankLink('/order/vipcard/verify')">
                                <span>{{ t('viewWrite') }}</span>
                            </div>
                        </div>
                        <div class="mt-[40px]">
                            <p class="text-[18px] font-bold mb-[18px]">{{ t('commonFunctions') }}</p>
                            <el-row :gutter="15">
                                <el-col :span="6">
                                    <div class="w-full py-[20px] flex items-center border-[#E6E6E6] border-[1px] cursor-pointer" @click="toLink('/order/vipcard/index')">
                                        <div class="ml-[18px] mr-[21px]">
                                            <img class="min-w-[45px] h-[45px] max-w-[45px]" src="@/addon/vipcard/assets/images/reserve.png" />
                                        </div>
                                        <div class="flex flex-wrap">
                                            <span class="w-full text-[14px]">{{ t('reserveManage') }}</span>
                                            <span class="w-full text-[#999999] text-[12px]">{{ t('reserveDesc') }}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="w-full py-[20px] flex items-center border-[#E6E6E6] border-[1px] cursor-pointer" @click="toLink('/vipcard/service/list')">
                                        <div class="ml-[18px] mr-[21px]">
                                            <img class="min-w-[45px] h-[45px] max-w-[45px]" src="@/addon/vipcard/assets/images/service.png" />
                                        </div>
                                        <div class="flex flex-wrap">
                                            <span class="w-full text-[14px]">{{ t('serviceManage') }}</span>
                                            <span class="w-full text-[#999999] text-[12px]">{{ t('serviceDesc') }}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="w-full py-[20px] flex items-center border-[#E6E6E6] border-[1px] cursor-pointer" @click="toLink('/vipcard/technician/list')">
                                        <div class="ml-[18px] mr-[21px]">
                                            <img class="min-w-[45px] h-[45px] max-w-[45px]" src="@/addon/vipcard/assets/images/member.png" />
                                        </div>
                                        <div class="flex flex-wrap">
                                            <span class="w-full text-[14px]">{{ t('technician') }}</span>
                                            <span class="w-full text-[#999999] text-[12px]">{{ t('technicianDesc') }}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="w-full py-[20px] flex items-center border-[#E6E6E6] border-[1px] cursor-pointer" @click="toLink('/vipcard/card/list')">
                                        <div class="ml-[18px] mr-[21px]">
                                            <img class="min-w-[45px] h-[45px] max-w-[45px]" src="@/addon/vipcard/assets/images/money.png" />
                                        </div>
                                        <div class="flex flex-wrap">
                                            <span class="w-full text-[14px]">{{ t('cardPackage') }}</span>
                                            <span class="w-full text-[#999999] text-[12px]">{{ t('cardPackageDesc') }}</span>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="mt-[40px]">
                            <p class="text-[18px] font-bold mb-[25px]">{{ t('dataSummary') }}</p>
                            <el-row :gutter="30">
                                <el-col :span="12">
                                    <div class="w-full py-[16px] px-[20px] border-[#E6E6E6] border-[1px]">
                                        <div class="flex justify-between">
                                            <span class="text-[18px]">{{ t('totalRevenue') }}</span>
                                            <!-- <span class="block w-[50px] h-[24px] mr-[60px] flex items-center justify-center text-[#999] text-[12px] border-[1px] border-[#E6E6E6]">{{ t('yesterday') }}</span> -->
                                        </div>
                                        <div class="my-[20px]">
                                            <div class="flex justify-center"><span class="text-[14px]">{{ t('accumulateMoney') }}</span>
                                            </div>
                                            <div class="flex justify-center">
                                                <span class="text-[28px]">{{ statTotal.order_money }}</span>
                                            </div>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-[14px]">{{ t('today') }}：{{ statToday.order_money }}</span>
                                            <span class="mr-[60px] text-[14px]">{{ t('thisMonth') }}：{{ statMonth.order_money }}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="w-full py-[16px] px-[20px] border-[#E6E6E6] border-[1px]">
                                        <div class="flex justify-between">
                                            <span class="text-[18px]">{{ t('serviceConsumption') }}</span>
                                            <!-- <span class="block w-[50px] h-[24px] mr-[60px] flex items-center justify-center text-[#999] text-[12px] border-[1px] border-[#E6E6E6]">{{ t('yesterday') }}</span> -->
                                        </div>
                                        <div class="my-[20px]">
                                            <div class="flex justify-center">
                                                <span class="text-[14px]">{{ t('accumulateMoney') }}</span>
                                            </div>
                                            <div class="flex justify-center">
                                                <span class="text-[28px]">{{ statTotal.buy_service_money }}</span>
                                            </div>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-[14px]">{{ t('today') }}：{{ statToday.buy_service_money }}</span>
                                            <span class="mr-[60px] text-[14px]">{{ t('thisMonth') }}：{{ statMonth.order_money }}</span>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="30" class="mt-[35px]">
                                <el-col :span="12">
                                    <div class="w-full py-[16px] px-[20px] border-[#E6E6E6] border-[1px]">
                                        <div class="flex justify-between">
                                            <span class="text-[18px]">{{ t('refundMoney') }}</span>
                                            <!-- <span class="block w-[50px] h-[24px] mr-[60px] flex items-center justify-center text-[#999] text-[12px] border-[1px] border-[#E6E6E6]">{{ t('yesterday') }}</span> -->
                                        </div>
                                        <div class="my-[20px]">
                                            <div class="flex justify-center"><span
                                                class="text-[14px]">{{ t('accumulateMoney') }}</span></div>
                                            <div class="flex justify-center"><span
                                                class="text-[28px]">{{ statTotal.refund_money }}</span></div>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-[14px]">{{ t('today') }}：{{ statToday.refund_money }}</span>
                                            <span class="mr-[60px] text-[14px]">{{ t('thisMonth') }}：{{ statMonth.refund_money }}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="w-full py-[16px] px-[20px] border-[#E6E6E6] border-[1px]">
                                        <div class="flex justify-between">
                                            <span class="text-[18px]">{{ t('memberCard') }}</span>
                                            <!-- <span class="block w-[50px] h-[24px] mr-[60px] flex items-center justify-center text-[#999] text-[12px] border-[1px] border-[#E6E6E6]">{{ t('yesterday') }}</span> -->
                                        </div>
                                        <div class="my-[20px]">
                                            <div class="flex justify-center">
                                                <span class="text-[14px]">{{ t('accumulateMoney') }}</span>
                                            </div>
                                            <div class="flex justify-center">
                                                <span class="text-[28px]">{{ statTotal.buy_card_money }}</span>
                                            </div>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-[14px]">{{ t('today') }}：{{ statToday.buy_card_money }}</span>
                                            <span class="mr-[60px] text-[14px]">{{ t('thisMonth') }}：{{ statMonth.buy_card_money }}</span>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="py-[16px] px-[20px] border-[1px] border-[#E6E6E6] mt-[35PX]">
                            <p class="text-[16px]">{{ t('orderStat') }}</p>
                            <el-row class="mt-[20px]">
                                <el-col :span="6">
                                    <div>
                                        <div class="flex justify-center items-center">
                                            <span class="text-[14px]">{{ t('orderNum') }}</span>
                                        </div>
                                        <div class="flex justify-center items-center mt-[10px]">
                                            <span class="text-[28px]">{{ statTotal.order_num }}</span>
                                        </div>
                                        <!-- <div class="flex justify-center items-center mt-[20px]">
                                          <span class="text-[14px]">{{ t('today') }}：{{ statToday.order_num }}</span>
                                          <span class="w-[2px] h-[24px] bg-[#F0F0F0] mx-[10px] lg:mx-[42px]"></span>
                                          <span class="text-[14px]">{{ t('thisMonth') }}：{{ statMonth.order_num }}</span>
                                        </div> -->
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div>
                                        <div class="flex justify-center items-center">
                                            <span class="text-[14px]">{{ t('refundOrderNum') }}</span>
                                        </div>
                                        <div class="flex justify-center items-center mt-[10px]">
                                            <span class="text-[28px]">{{ statTotal.refund_num }}</span>
                                        </div>
                                        <!-- <div class="flex justify-center items-center mt-[20px]">
                                          <span class="text-[14px]">{{ t('today') }}：{{ statToday.refund_num }}</span>
                                          <span class="w-[2px] h-[24px] bg-[#F0F0F0] mx-[10px] lg:mx-[42px]"></span>
                                          <span class="text-[14px]">{{ t('thisMonth') }}：{{ statMonth.refund_num }}</span>
                                        </div> -->
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div>
                                        <div class="flex justify-center items-center">
                                            <span class="text-[14px]">{{ t('reserveNum') }}</span>
                                        </div>
                                        <div class="flex justify-center items-center mt-[10px]">
                                            <span class="text-[28px]">{{ statTotal.reserve_num }}</span>
                                        </div>
                                        <!-- <div class="flex justify-center items-center mt-[20px]">
                                          <span class="text-[14px]">{{ t('today') }}：{{ statToday.reserve_num }}</span>
                                          <span class="w-[2px] h-[24px] bg-[#F0F0F0] mx-[10px] lg:mx-[42px]"></span>
                                          <span class="text-[14px]">{{ t('thisMonth') }}：{{ statMonth.reserve_num }}</span>
                                        </div> -->
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div>
                                        <div class="flex justify-center items-center">
                                            <span class="text-[14px]">{{ t('cardNum') }}</span>
                                        </div>
                                        <div class="flex justify-center items-center mt-[10px]">
                                            <span class="text-[28px]">{{ statTotal.buy_card_num }}</span>
                                        </div>
                                        <!-- <div class="flex justify-center items-center mt-[20px]">
                                          <span class="text-[14px]">{{ t('today') }}：{{ statToday.buy_card_num }}</span>
                                          <span class="w-[2px] h-[24px] bg-[#F0F0F0] mx-[10px] lg:mx-[42px]"></span>
                                          <span class="text-[14px]">{{ t('thisMonth') }}：{{ statMonth.buy_card_num }}</span>
                                        </div> -->
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <p class="text-[18px] font-bold mb-[25px]">{{ t('toDo') }}</p>
                        <div>
                            <div class="reserve-item min-w-[200px] h-[90px] pt-[18px] w-full cursor-pointer" @click="toLink('/order/vipcard/index')">
                                <p class="ml-[16px] text-[14px] text-[#fff]">{{ t('reserveHandle') }}</p>
                                <p class="ml-[16px] text-[30px] text-[#fff]">{{ statTotal.reserve_num }}</p>
                            </div>
                            <!-- <div class="stock-item min-w-[200px] h-[90px] pt-[18px] mt-[18px] w-full">
                              <p class="ml-[16px] text-[14px] text-[#fff]">{{ t('stockWarning') }}</p>
                              <p class="ml-[16px] text-[30px] text-[#fff]">0</p>
                            </div> -->
                            <div class="refund-item min-w-[200px] h-[90px] pt-[18px] mt-[18px] w-full cursor-pointer" @click="toLink('/order/vipcard/refund')">
                                <p class="ml-[16px] text-[14px] text-[#fff]">{{ t("refundSales") }}</p>
                                <p class="ml-[16px] text-[30px] text-[#fff]">{{ statTotal.refund_num }}</p>
                            </div>
                            <!-- <div class="withdrawal-item min-w-[200px] h-[90px] pt-[18px] mt-[18px] w-full">
                              <p class="ml-[16px] text-[14px] text-[#fff]">{{ t('memberWithdrawal') }}</p>
                              <p class="ml-[16px] text-[30px] text-[#fff]">0</p>
                            </div> -->
                            <div class="service-item min-w-[200px] h-[90px] pt-[18px] mt-[18px] w-full cursor-pointer"
                                 @click="toLink('/order/vipcard/order')">
                                <p class="ml-[16px] text-[14px] text-[#fff]">{{ t('serviceFollow') }}</p>
                                <p class="ml-[16px] text-[30px] text-[#fff]">{{ statTotal.buy_service_num }}</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </div>
        <el-dialog v-model="showDialog" :title="title || t('verifyInfo')" width="500px" :destroy-on-close="true">

            <el-form :model="formData" label-width="110px" ref="formRef" class="page-form" v-loading="loading">
                <el-form-item :label="t('verifyCode')">
                    <div class="input-width"> {{ verifycode }}</div>
                </el-form-item>
                <el-form-item :label="t('goodsType')">
                    <div class="input-width"> {{ verifyInfo.goods_type_name }}</div>
                </el-form-item>
                <el-form-item :label="t('serviceName')" v-if="verifyInfo.goods_type == 'service'">
                    <div class="input-width"> {{ verifyInfo.goods_name }}</div>
                </el-form-item>
                <el-form-item :label="t('cardName')" v-else>
                    <div class="input-width"> {{ verifyInfo.goods_name }}</div>
                </el-form-item>
                <el-form-item :label="t('serviceImg')" v-if="verifyInfo.goods_type == 'service'">
                    <img v-if="verifyInfo.cover_thumb_samll" :src="img(verifyInfo.cover_thumb_samll)" />
                </el-form-item>
                <el-form-item :label="t('cardImg')" v-else>
                    <img v-if="verifyInfo.cover_thumb_samll" :src="img(verifyInfo.cover_thumb_samll)" />
                </el-form-item>
                <el-form-item :label="t('num')">
                    <div class="input-width"> {{ verifyInfo.num }}</div>
                </el-form-item>
                <el-form-item :label="t('useNum')">
                    <div class="input-width"> {{ verifyInfo.use_num }}</div>
                </el-form-item>
                <el-form-item :label="t('expireTime')">
                    <div class="input-width"> {{ verifyInfo.expire_time_name }}</div>
                </el-form-item>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="verifyCode">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import {
    getStat,
    getYesterdayStat,
    getTodayStat,
    getMonthStat,
    getVerifyDetail,
    verify
} from '@/addon/vipcard/api/vipcard'
import { ElMessage } from 'element-plus'
import { img } from '@/utils/common'
import { useRouter } from 'vue-router'

const loading = ref(false)
const statYesterday = ref<any>([])
const statToday = ref<any>([])
const statMonth = ref<any>([])
const statTotal = ref<any>([])
const getStatInfoFn = async() => {
    statYesterday.value = await (await getYesterdayStat()).data
    statToday.value = await (await getTodayStat()).data
    statMonth.value = await (await getMonthStat()).data
    statTotal.value = await (await getStat()).data
    loading.value = false
}
getStatInfoFn()

const verifycode = ref('')
const verifyInfo = ref<any>([])
const showDialog = ref(false)
const handelVerify = () => {
    if (verifycode.value == '') return
    getVerifyDetail(verifycode.value).then(res => {
        if (res.data != '') {
            showDialog.value = true
            verifyInfo.value = res.data
        } else {
            ElMessage(t('notVerifyDesc'))
        }
        loading.value = false
    })
}

const isSubmit = ref(false)
const verifyCode = () => {
    if (verifycode.value == '') return
    if (isSubmit.value) return
    isSubmit.value = true
    showDialog.value = false
    verify(verifycode.value).then(() => {
        isSubmit.value = false
    }).catch(() => {
        isSubmit.value = false
    })
}

const router = useRouter()
/**
 * 链接跳转
 */
const toLink = (link: any) => {
    router.push(link)
}

const toBlankLink = (link: any) => {
    const routeData = router.resolve({ path: link })
    window.open(routeData.href, '_blank')
}
</script>

<style lang="scss" scoped>.manage-item {
    background-color: rgba(0, 0, 0, 0.10);
}

.reserve-item {
    background-image: url('@/addon/vipcard/assets/images/reserve_bg.png');
    background-size: 100% 100%;
}

.stock-item {
    background-image: url('@/addon/vipcard/assets/images/stock_bg.png');
    background-size: 100% 100%;
}

.refund-item {
    background-image: url('@/addon/vipcard/assets/images/refund_bg.png');
    background-size: 100% 100%;
}

.withdrawal-item {
    background-image: url('@/addon/vipcard/assets/images/withdrawal_bg.png');
    background-size: 100% 100%;
}

.service-item {
    background-image: url('@/addon/vipcard/assets/images/service_bg.png');
    background-size: 100% 100%;
}</style>
