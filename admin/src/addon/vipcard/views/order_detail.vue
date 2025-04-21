<template>
    <div class="main-container">
        <el-card class="card !border-none mb-[15px]" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="router.push({ path: '/vipcard/order/list' })" />
        </el-card>
        
        <el-form :model="formData" label-width="100px" ref="formRef" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none relative" shadow="never" v-if="formData">
                <h3 class="panel-title">{{ t('orderInfo') }}</h3>
                <el-row class="row-bg">
                    <el-col :span="8">
                        <el-form-item :label="t('orderNo')">
                            <div class="input-width">{{ formData.order_no }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('createTime')">
                            <div class="input-width">{{ formData.create_time || '' }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('orderFromName')">
                            <div class="input-width">{{ formData.order_from_name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('member')">
                            <div class="input-width">{{ formData.member.nickname }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('ip')">
                            <div class="input-width">{{ formData.ip }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('orderStatus')">
                            <div class="input-width">{{ formData.order_status_info.name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formData.pay_time">
                        <el-form-item :label="t('payTime')">
                            <div class="input-width">{{ formData.pay_time || '' }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formData.pay">
                        <el-form-item :label="t('payTypeName')">
                            <div class="input-width">{{ formData.pay.type_name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formData.pay && formData.member_id !== formData.pay.main_id && formData.pay.status == 2">
                        <el-form-item>
                            <div class="input-width">
                                <span>{{ formData.pay.pay_type_name }}, 帮付人：</span>
                                <span class="text-primary cursor-pointer" @click="memberEvent(formData.pay.main_id)">{{ formData.pay.pay_member }}</span>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('refundStatus')" v-if="formData.refund_status">
                            <div class="input-width">{{ formData.refund_status_name }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3 class="panel-title">{{ t('orderDetail') }}</h3>
                <el-table :data="formData.item" size="large">
                    <template #empty>
                        <span>{{ t('emptyData') }}</span>
                    </template>
                    <el-table-column :label="t('goodsInfo')" min-width="200" align="left">
                        <template #default="{ row }">
                            <div class="flex">
                                <img class="w-[80px] mr-[10px]" :src="img(row.item_image_thumb_small)" />
                                <div>
                                    <p class="text-sm text-gray-400">{{ row.item_name }}</p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" :label="t('price')" min-width="50" align="right" />
                    <el-table-column prop="num" :label="t('num')" min-width="50" align="center" />
                    <el-table-column prop="item_money" :label="t('total')" min-width="50" align="right" />
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
                <div v-if="formData.member_card && formData.member_card.length">
                    <h3 class="mt-[50px] mb-[20px]">{{ t('memberCard') }}</h3>
                    <el-table :data="formData.member_card" style="width: 100%">
                        <el-table-column type="expand">
                            <template #default="props">
                                <el-table :data="props.row.member_card_item" style="width: 100%" :border="false">
                                    <el-table-column width="50px"></el-table-column>
                                    <el-table-column :label="t('serviceName')" prop="goods_name" :show-overflow-tooltip="true" />
                                    <el-table-column :label="t('availableNum')" align="center">
                                        <template #default="row">
                                            {{ row.row.num ? row.row.num : t('notLimit') }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="t('useNum')" prop="use_num" align="center" />
                                    <el-table-column :label="t('verifyCode')" prop="verify_code" align="center" />
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('cardName')" prop="goods.goods_name" :show-overflow-tooltip="true" />
                        <el-table-column :label="t('cardType')" prop="card_type_name" align="center" />
                        <el-table-column :label="t('status')" prop="status_name" align="center" />
                        <el-table-column :label="t('availableNum')" align="center">

                          <template #default="row">
                              {{ row.row.total_num ? row.row.total_num : t('notLimit') }}
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('useNum')" prop="total_use_num" align="center" />
                        <el-table-column :label="t('expireTime')" prop="expire_time_name" align="center" :show-overflow-tooltip="true" />
                    </el-table>
                </div>
                <h3 class="mt-[50px] mb-[20px]">{{ t('operateLog') }}</h3>
                <div style="height: 300px">
                    <div class="flex" v-for="(items, index) in formData.order_log" :key="index">
                        <div class="mr-[20px] min-w-[71px]">
                            <div class="leading-[1] w-full text-[14px] w-[100px] flex justify-end">{{ items.action_time.split(' ')[0] }}</div>
                            <div class="leading-[1] w-full text-[14px]  w-[100px] flex justify-end mt-[5px]">{{ items.action_time.split(' ')[1] }}</div>
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
import { getOrderDetail } from '@/addon/vipcard/api/vipcard'
import { useRoute, useRouter } from 'vue-router'
import { img } from '@/utils/common'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const orderId: number = parseInt(route.query.order_id)
const loading = ref(true)

const formData: Record<string, any> | null = ref(null)

const setFormData = async (orderId: number = 0) => {
    loading.value = true
    formData.value = null
    await getOrderDetail(orderId)
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
