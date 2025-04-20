<template>
    <div class="main-container">
        <el-card class="card !border-none mb-[15px]" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="router.push({ path: '/o2o/order/list' })" />
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
                        <el-form-item :label="t('member')" v-if="formData.member">
                            <div class="input-width cursor-pointer" @click="toLink(formData.member.member_id)">{{ formData.member.nickname }}</div>
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
                    <el-col :span="8">
                        <el-form-item :label="t('orderAddress')" >
                            <div class="input-width">{{ formData.taker_full_address }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('orderMobile')" >
                            <div class="input-width">{{ formData.taker_mobile }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formData.technician_info">
                        <el-form-item :label="t('technician')" >
                            <div class="input-width cursor-pointer text-primary" @click="toTechnician(formData.technician_info.name)">{{ formData.technician_info.name }}</div>
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
                    <!-- <el-col :span="8" v-if="formData.refund_status">
                        <el-form-item :label="t('refundStatus')" >
                            <div class="input-width">{{ formData.refund_status_name }}</div>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="8" v-if="formData.check_code">
                        <el-form-item :label="t('serviceCode')" >
                            <div class="input-width">{{ formData.check_code }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formData.service_time">
                        <el-form-item :label="t('serviceTime')" >
                            <div class="input-width">{{ formData.service_time }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formData.member_message">
                        <el-form-item :label="t('remark')" >
                            <div class="input-width line-feed">{{ formData.member_message }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3 class="panel-title">{{ t('orderDetail') }}</h3>
                <el-table :data="formData.itemList" size="large" style="width:1300px">
                    <template #empty>
                        <span>{{ t('emptyData') }}</span>
                    </template>
                    <el-table-column :label="t('goodsInfo')" min-width="200" :show-overflow-tooltip="true" align="left">
                        <template #default="{ row }">
                            <div class="flex">
                                <div class="w-[80px] h-[80px] shrink-0">
                                    <el-image v-if="row.item_image" class="w-[80px] h-[80px]"
                                    :src="img(row.item_image ? row.item_image :'')" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[80px] h-[80px]" src="@/addon/o2o/assets/goods_default.png" />
                                            </div>
                                        </template>
                                    </el-image>
                                     <img v-else class="w-[80px] h-[80px]" src="@/addon/o2o/assets/goods_default.png" fit="contain" />
                                </div>
                                <div class="ml-[10px] flex flex-col justify-between">
                                    <p class="text-sm text-gray-400 multi-hidden h-[40px] leading-[20px]" :title="row.item_name">{{ row.item_name }}</p>
                                    <div class="mt-auto"><el-tag>{{row.item_type_name}}</el-tag></div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" :label="t('price')" min-width="150" align="right" />
                    <el-table-column prop="num" :label="t('num')" min-width="150" align="right" />
                    <el-table-column prop="item_money" :label="t('total')" min-width="150" align="right" />
                </el-table>
                <div class="py-[12px] px-[16px] border-b border-color w-[1300px]">
                    <div class="flex width-full justify-end">
                        <div class="text-base">{{ t('orderMoney') }}：</div>
                        <div class="text-base">{{ formData.order_money }}</div>
                    </div>
                    <div class="flex width-full justify-end mt-[5px]">
                        <div class="text-base">{{ t('payMoney') }}：</div>
                        <div class="text-base">{{ formData.pay_money }}</div>
                    </div>
                </div>
                <div v-if="formData.itemCustom && formData.itemCustom.length">
                    <h3 class="mt-[50px] mb-[20px]">{{ t('newsServiceItem') }}</h3>
                    <el-table :data="formData.itemCustom" size="large" style="width:1300px">
                        <template #empty>
                            <span>{{ t('emptyData') }}</span>
                        </template>
                        <el-table-column :label="t('goodsInfo')" min-width="200" :show-overflow-tooltip="true" align="left">
                            <template #default="{ row }">
                                <div class="flex">
                                    <div class="w-[80px] h-[80px] shrink-0">
                                        <el-image v-if="row.item_image" class="w-[80px] h-[80px]"
                                        :src="img(row.item_image ? row.item_image :'')" fit="contain">
                                            <template #error>
                                                <div class="image-slot">
                                                    <img class="w-[80px] h-[80px]" src="@/addon/o2o/assets/goods_default.png" />
                                                </div>
                                            </template>
                                        </el-image>
                                        <img v-else class="w-[80px] h-[80px]" src="@/addon/o2o/assets/goods_default.png" fit="contain" />
                                    </div>
                                    <div class="ml-[10px] flex flex-col justify-between">
                                        <p class="text-sm text-gray-400 multi-hidden h-[40px] leading-[20px]" :title="row.item_name">{{ row.item_name }}</p>
                                        <div class="mt-auto"><el-tag>{{row.item_type_name}}</el-tag></div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('projectPicture')" min-width="280"  align="left">
                            <template #default="{ row }">
                                <div class="flex" v-if="row.item_images">
                                    <div class="w-[80px] h-[80px] shrink-0 mr-[10px]" v-for="(item, index) in row.item_images.split(',')" :key="index">
                                        <el-image  class="w-[80px] h-[80px]"
                                        :src="img(item)" fit="contain">
                                            <template #error>
                                                <div class="image-slot">
                                                    <img class="w-[80px] h-[80px]" src="@/addon/o2o/assets/goods_default.png" />
                                                </div>
                                            </template>
                                        </el-image>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" :label="t('price')" min-width="150" align="right" />
                    </el-table>
                </div>
                <h3 class="mt-[50px] mb-[20px]">{{ t('operateLog') }}</h3>
                <div style="min-height: 300px">
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
import { getOrderDetail } from '@/addon/o2o/api/order'
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
            formData.value.itemCustom = []
            formData.value.itemList = []
            formData.value.item.forEach(el => {
                if (el.item_type == 'custom') {
                    formData.value.itemCustom.push(el)
                } else {
                    formData.value.itemList.push(el)
                }
            })
        })
        .catch(() => {
        })
    loading.value = false
}
if (orderId) setFormData(orderId)
else loading.value = false
// 跳转会员详情
const toLink = (id: number) => {
    const url = router.resolve({
        path: '/member/detail',
        query: {
            id: id
        }
    })
    window.open(url.href)
}
// 跳转技师列表
const toTechnician = (data:string) => {
    const url = router.resolve({
        path: '/o2o/technician/list',
        query: {
            name: data
        }
    })
    window.open(url.href)
}
const memberEvent = (id: number) => {
    const routeUrl = router.resolve({
        path: '/member/detail',
        query: { id }
    })
    window.open(routeUrl.href, '_blank')
}
</script>

<style lang="scss" scoped>
 .multi-hidden {
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    .line-feed{
        word-wrap:break-word;
    }
</style>
