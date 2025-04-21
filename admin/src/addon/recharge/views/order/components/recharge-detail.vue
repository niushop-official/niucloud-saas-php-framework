<template>
    <el-drawer v-model="showDialog" :title="popTitle" direction="rtl" :before-close="handleClose" class="member-detail-drawer">
        <div class="main-container" v-loading="loading">
            <el-form :model="formData" label-width="100px" ref="formRef" class="page-form" v-if="!loading" label-position="left">
                <el-row class="row-bg px-[30px]" :gutter="20">
                    <el-col :span="8">
                        <el-form-item :label="t('orderNo')">
                            <div class="input-width">{{ formData.order_no }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('orderMoney')">
                            <div class="input-width">{{ formData.order_money }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('orderDiscountMoney')">
                            <div class="input-width">{{ formData.order_discount_money }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('memberInfo')">
                            <div class="input-width">
                                <span>{{ formData.member.nickname || '' }}</span>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formData.member.mobile">
                        <el-form-item :label="t('mobile')">
                            <div class="input-width">{{ formData.member.mobile || '' }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('ip')">
                            <div class="input-width">{{ formData.ip }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('orderFromName')">
                            <div class="input-width">{{ formData.order_from_name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('orderStatus')">
                            <div class="input-width">{{ formData.order_status_info.name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formData.pay_type_name">
                        <el-form-item :label="t('payTypeName')">
                            <div class="input-width">{{ formData.pay_type_name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('createTime')">
                            <div class="input-width">{{ formData.create_time || '' }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formData.pay_time">
                        <el-form-item :label="t('payTime')">
                            <div class="input-width">{{ formData.pay_time || '' }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('remark')" v-if="formData.remark">
                            <div class="input-width">{{ formData.remark || '' }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('memberMessage')" v-if="formData.member_message">
                            <div class="input-width">{{ formData.member_message || '' }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@/lang'
import { getRechargeOrderInfo } from '@/addon/recharge/api/recharge'

const popTitle: string = '订单详情'
const loading = ref(false)
const formData: Record<string, any> | null = ref(null)
const showDialog = ref(false)
const handleClose = (done: () => void) => {
    showDialog.value = false
}

const setFormData = async (orderId: number = 0) => {
    loading.value = true
    formData.value = null
    await getRechargeOrderInfo(orderId).then(({ data }) => {
        formData.value = data
    })
    loading.value = false
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss">
.member-detail-drawer{
    width: 1000px !important;
}
</style>