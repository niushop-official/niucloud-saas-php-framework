<template>
	<div class="main-container">
		<el-form :model="formData" label-width="150px" ref="formRef" class="page-form" v-loading="loading">
			<el-card class="box-card !border-none relative" shadow="never" v-if="formData">
				<h3 class="panel-title">{{ t('orderInfo') }}</h3>

				<el-form-item :label="t('orderNo')">
					<div class="input-width">{{ formData.order_no }}</div>
				</el-form-item>

				<el-form-item :label="t('orderMoney')">
					<div class="input-width">{{ formData.order_money }}</div>
				</el-form-item>
				
				<el-form-item :label="t('addMoney')">
					<div class="input-width">{{ formData.add_money }}</div>
				</el-form-item>
				
				<el-form-item :label="t('addJifen')">
					<div class="input-width">{{ formData.add_jifen }}</div>
				</el-form-item>

				<el-form-item :label="t('addLevel')">
					<div class="input-width">{{ formData.level_name }}</div>
				</el-form-item>

				<el-form-item :label="t('orderDiscountMoney')">
					<div class="input-width">{{ formData.order_discount_money }}</div>
				</el-form-item>

				<el-form-item :label="t('member')">
					<div class="input-width">
						<span>{{ formData.member.nickname || '' }}</span>
					</div>
				</el-form-item>
				<el-form-item :label="t('mobile')">
					<div class="input-width">{{ formData.member.mobile || '' }}</div>
				</el-form-item>

				<el-form-item :label="t('ip')">
					<div class="input-width">{{ formData.ip }}</div>
				</el-form-item>

				<el-form-item :label="t('orderFromName')">
					<div class="input-width">{{ formData.order_from_name }}</div>
				</el-form-item>

				<el-form-item :label="t('orderStatus')">
					<div class="input-width">{{ formData.order_status_info.name }}</div>
				</el-form-item>

				<el-form-item :label="t('payTypeName')">
					<div class="input-width">{{ formData.pay_type_name }}</div>
				</el-form-item>

				<el-form-item :label="t('createTime')">
					<div class="input-width">{{ formData.create_time || '' }}</div>
				</el-form-item>

				<el-form-item :label="t('payTime')">
					<div class="input-width">{{ formData.pay_time || '' }}</div>
				</el-form-item>

				<el-form-item :label="t('remark')" v-if="formData.remark">
					<div class="input-width">{{ formData.remark || '' }}</div>
				</el-form-item>

				<el-form-item :label="t('memberMessage')" v-if="formData.member_message">
					<div class="input-width">{{ formData.member_message || '' }}</div>
				</el-form-item>

			</el-card>

		</el-form>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { getYkRechargeOrderInfo } from '@/addon/yk_recharge/api/recharge'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const orderId: number = parseInt(route.query.order_id as string)
const loading = ref(true)

const formData: Record<string, any> | null = ref(null)

const setFormData = async (orderId: number = 0) => {
	loading.value = true
	formData.value = null
	await getYkRechargeOrderInfo(orderId).then(({ data }) => {
		formData.value = data
	})
	loading.value = false
}

if (orderId) setFormData(orderId)
else loading.value = false

const formRef = ref<FormInstance>()

/**
 * 会员详情
 */
const toMember = (memberId: number) => {
    router.push(`/member/detail?id=${memberId}`)
}

</script>

<style lang="scss" scoped></style>
