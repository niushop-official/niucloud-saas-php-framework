<template>
    <div class="main-container">
        <el-card class="card !border-none mb-[15px]" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="router.push({ path: '/tourism/order/way' })" />
        </el-card>

        <el-form :model="formData" label-width="100px" ref="formRef" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none relative" shadow="never" v-if="formData">
                <h3 class="panel-title">{{ t('orderInfo') }}</h3>
                <el-row class="row-bg">
                    <el-col :span="6">
                        <el-form-item :label="t('orderNo')">
                            <div class="input-width">{{ formData.order_no }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="t('createTime')">
                            <div class="input-width">{{ formData.create_time || '' }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="t('orderFromName')">
                            <div class="input-width">{{ formData.order_from_name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="t('member')">
                            <div class="input-width">{{ formData.member.nickname }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="t('mobile')">
                            <div class="input-width">{{ formData.mobile }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="t('ip')">
                            <div class="input-width">{{ formData.ip }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="t('orderStatus')">
                            <div class="input-width">{{ formData.order_status_info.name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="formData.pay_time">
                        <el-form-item :label="t('payTime')">
                            <div class="input-width">{{ formData.pay_time || '' }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="formData.pay">
                        <el-form-item :label="t('payTypeName')">
                            <div class="input-width">{{ formData.pay.type_name }} </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="formData.pay && formData.member_id !== formData.pay.main_id && formData.pay.status == 2">
                        <el-form-item>
                            <div class="input-width">
                                <span>{{ formData.pay.pay_type_name }}, 帮付人：</span>
                                <span class="text-primary cursor-pointer" @click="memberEvent(formData.pay.main_id)">{{ formData.pay.pay_member }}</span>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="t('refundStatus')" v-if="formData.refund_status">
                            <div class="input-width">{{ formData.refund_status_name }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3 class="panel-title">{{ t('reserveInfo') }}</h3>
                <el-row class="row-bg">
                    <el-col :span="24">
                        <el-form-item :label="t('reserveDate')">
                            <div class="input-width">{{ formData.start_time }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="row-bg">
                    <el-col :span="6">
                        <el-form-item :label="t('touristName')">
                            <div class="input-width">{{ formData.buyer_info.name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="t('touristCardType')">
                            <div class="input-width">{{ t('idCard') }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="t('touristCardNo')">
                            <div class="input-width">{{ formData.buyer_info.id_card }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3 class="panel-title">{{ t('orderDetail') }}</h3>
                <el-table :data="formData.item" size="large">
                    <template #empty>
                        <span>{{ t('emptyData') }}</span>
                    </template>
                    <el-table-column :label="t('wayInfo')" min-width="200" align="left">
                        <template #default="{ row }">
                            <div class="flex">
                                <img class="w-[100px] max-h-[60px] mr-[10px]" v-if="row.goods_image" :src="img(row.goods_image)" />
                                <div>
                                    <p>{{ row.goods_name }}</p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goods_money" :label="t('wayMoney')" min-width="50" align="left" />
                    <el-table-column prop="num" :label="t('wayNum')" min-width="50" align="center" />
                </el-table>
                <div class="py-[12px] px-[16px] border-b border-color">
                    <div class="flex width-full justify-end">
                        <div class="text-base">{{ t('orderMoney') }}：</div>
                        <div class="text-base">{{ formData.order_money }}</div>
                    </div>
                    <div class="flex width-full justify-end mt-[5px]">
                        <div class="text-base">{{ t('payMoney') }}：</div>
                        <div class="text-base">{{ formData.pay_money }}</div>
                    </div>
                </div>
                <h3 class="mt-[50px] mb-[20px]">{{ t('operateLog') }}</h3>
                <div style="height: 300px">
                    <div class="flex" v-for="(items, index) in formData.order_log" :key="index">
                        <div class="mr-[20px] min-w-[71px]">
                            <div class="leading-[1] text-[14px] w-[100px] flex justify-end">{{ items.action_time.split(' ')[0] }}</div>
                            <div class="leading-[1] text-[14px]  w-[100px] flex justify-end mt-[5px]">{{ items.action_time.split(' ')[1] }}</div>
                        </div>
                        <div>
                            <div class="w-[16px] h-[16px] flex items-center bg-[#D1EBFF] border-[1px] border-[#0091FF] rounded-[999px]">
                                <div class="w-[8px] h-[8px] mx-auto bg-[#0091FF] rounded-[999px]"></div>
                            </div>
                            <div v-if="index + 1 != formData.order_log.length" class="w-[2px] h-[50px] bg-[#D1EBFF] mx-auto">
                            </div>
                        </div>
                        <span class="leading-[1] ml-[20px] text-[14px]">{{ items.action }}</span>
                    </div>
                </div>
            </el-card>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import { getWayOrderInfo } from '@/addon/tourism/api/tourism'
import { useRoute, useRouter } from 'vue-router'
import { img } from '@/utils/common'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const orderId: number = parseInt(route.query.order_id as string)
const loading = ref(true)

const formData: Record<string, any> | null = ref(null)

const setFormData = async (orderId: number = 0) => {
    loading.value = true
    formData.value = null
    await getWayOrderInfo(orderId)
        .then(({ data }) => {
            formData.value = data
        })
        .catch(() => {

        })
    loading.value = false
}
if (orderId) setFormData(orderId)
else loading.value = false

const memberEvent = (id: number) => {
    const routeUrl = router.resolve({
        path: '/member/detail',
        query: { id }
    })
    window.open(routeUrl.href, '_blank')
}
</script>

<style lang="scss" scoped></style>
