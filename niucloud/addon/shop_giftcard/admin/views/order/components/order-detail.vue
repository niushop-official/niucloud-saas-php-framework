<template>
    <el-drawer v-model="showDialog" :title="popTitle" direction="rtl" :before-close="handleClose" class="member-detail-drawer">
        <div class="main-container" v-loading="loading">
            <el-tabs v-model="activeName" class="pb-[10px]" @tab-change="tabChange">
                <el-tab-pane :label="t('orderInfo')" name="order" />
                <el-tab-pane :label="t('orderStatus')" name="state" />
                <el-tab-pane :label="t('cardListTitle')" name="goods" />
            </el-tabs>

            <el-form :model="formData" label-width="100px" ref="formRef" class="page-form" v-if="!loading" label-position="left">
                <div v-if="activeName == 'order'">
                    <el-row class="row-bg px-[30px] mb-[20px]" :gutter="20">
                        <el-col :span="8">
                            <el-form-item :label="t('orderNo')">
                                <div class="input-width">{{ formData.order_no }}</div>
                            </el-form-item>
                            <el-form-item :label="t('orderForm')">
                                <div class="input-width">{{ formData.order_from_name }}</div>
                            </el-form-item>
                            <el-form-item :label="t('outTradeNo')" v-if="formData.out_trade_no">
                                <div class="input-width">{{ formData.out_trade_no }}</div>
                            </el-form-item>
                            <el-form-item :label="t('orderStatus')">
                                <div class="input-width">{{ formData.status_name }}</div>
                            </el-form-item>
                            <el-form-item :label="t('buyInfo')">
                                <div class="input-width text-primary cursor-pointer" @click="toMemberDetailEvent(formData.member.member_id)">{{ formData.member.nickname }}</div>
                            </el-form-item>
                            <el-form-item :label="t('detailPayType')" v-if="formData.pay">
                                <div class="input-width">{{ formData.pay.type_name }}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('giftCardName')">
                                <div class="input-width line-feed">{{ formData.body }}</div>
                            </el-form-item>
                            <el-form-item :label="t('cardRightType')">
                                <div class="input-width line-feed">{{ formData.card_right_type_name }}</div>
                            </el-form-item>
                            <el-form-item :label="t('giftCardNum')">
                                <div class="input-width line-feed">{{ formData.num }}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('createTime')">
                                <div class="input-width">{{ formData.create_time }}</div>
                            </el-form-item>
                            <el-form-item :label="t('memberRemark')">
                                <div class="input-width line-feed">{{ formData.member_remark ?? '--' }}</div>
                            </el-form-item>
                            <el-form-item :label="t('notes')">
                                <div class="input-width line-feed">{{ formData.shop_remark ?? '--' }}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="activeName == 'state'">
                    <div class="mb-[20px]">
                        <div>
                            <span class="ml-[30px] text-[14px] mr-[20px]">{{ t('orderStatus') }}：</span>
                            <span class="text-[14px]">{{ formData.status_name }}</span>
                        </div>
                        <div class="flex mt-[10px]">
                            <span class="text-[14px] px-[15px] py-[5px] ml-[30px] text-[#ff7f5b] bg-[#fff0e5] cursor-pointer" @click="setNotes">{{ t('notes') }}</span>
                            <span class="text-[14px] px-[15px] py-[5px] ml-[30px] text-[#5c96fc] bg-[#ebf3ff] cursor-pointer" @click="close" v-if="formData.status == 1">{{ t('close') }}</span>
                        </div>
                        <div class="flex ml-[30px] mt-[15px]">
                            <span class="text-[14px] text-[#ff7f5b]">{{ t('remind') }}：</span>
                            <div class="ml-[10px]">
                                <p class="text-[14px] text-[#a4a4a4]">{{ t('remindTips1') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="activeName == 'goods'">
                    <el-table :data="formData.card" size="large" max-height="400">
                        <el-table-column :label="t('cardNo')" min-width="120">
                            <template #default="{ row }">
                                <span class="text-[14px]">{{ row.card_no }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="balance" :label="t('cardBalance')" min-width="120" :show-overflow-tooltip="true" v-if="formData.card_right_type == 'balance'">
                            <template #default="{ row }">
                                <span>￥{{ row.balance }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status_name" :label="t('cardStatus')" min-width="120" :show-overflow-tooltip="true" />
                        <el-table-column prop="validity_time" :label="t('validityTime')" min-width="120" :show-overflow-tooltip="true">
                            <template #default="{ row }">
                                <div v-if="row.validity_time">{{ row.validity_time }}</div>
                                <div v-else>{{ t('validityForever') }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="total_num" :label="t('totalNum')" min-width="120" :show-overflow-tooltip="true">
                            <template #default="{ row }">
                                <span>{{ row.use_num }}/{{ row.total_num }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('operation')" min-width="120" align="right">
                            <template #default="{ row }">
                                <el-button type="primary" link @click="toDetailEvent(row)">{{ t('toCardDetail') }}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form>

            <el-card class="box-card !border-none relative" shadow="never" v-if="!loading && !formData">
                <el-empty :description="t('orderInfoEmpty')" />
            </el-card>

            <order-notes ref="orderNotesDialog" @complete="resetFn" />
        </div>
    </el-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getShopGiftcardOrderInfo, closeShopGiftcardOrder } from '@/addon/shop_giftcard/api/order'
import OrderNotes from '@/addon/shop_giftcard/views/order/components/order-notes.vue'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const showDialog = ref(false)
const loading = ref(false)
let popTitle: string = '订单详情'
let orderId = '';

const router = useRouter()
const emit = defineEmits(['load'])

const handleClose = (done: () => void) => {
    showDialog.value = false;
}

const activeName = ref('order')
const formData: Record<string, any> | null = ref(null)

const getOrderInfoFn = async() => {
    loading.value = true
    if (orderId) {
        await getShopGiftcardOrderInfo(orderId).then(({ data }) => {
            formData.value = data
            loading.value = false;
        }).catch(() => {
        })
    } else {
        loading.value = false
    }
}

const orderNotesDialog: Record<string, any> | null = ref(null)

/**
 * 设置备注
 */
const setNotes = () => {
    orderNotesDialog.value.setFormData(formData.value)
    orderNotesDialog.value.showDialog = true
}

/**
 * 关闭订单
 */
const close = () => {
    ElMessageBox.confirm(t('orderCloseTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }).then(() => {
        closeShopGiftcardOrder(orderId).then(() => {
            resetFn();
        })
    })
}

// 跳转到礼品卡详情
const toDetailEvent = (data: any) => {
    const url = router.resolve({
        path: '/shop_giftcard/giftcard/card_detail',
        query: {
            card_id: data.card_id
        }
    })
    window.open(url.href)
}

/**
 * 跳转会员详情
 */
const toMemberDetailEvent = (member_id: any) => {
    const url = router.resolve({
        path: '/member/detail',
        query: {
            id: member_id
        }
    })
    window.open(url.href)
}

const setFormData = async(row: any = null) => {
    orderId = row.id;
    formData.value = null;
    activeName.value = 'order';
    getOrderInfoFn();
}

const resetFn = () => {
    showDialog.value = false;
    emit('load');
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss">
.member-detail-drawer {
    width: 1000px !important;
}
</style>
