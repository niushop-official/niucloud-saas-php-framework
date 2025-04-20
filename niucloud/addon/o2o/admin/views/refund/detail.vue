<template>
  <div class="main-container">
    <el-card class="card !border-none mb-[15px]" shadow="never">
      <el-page-header :content="pageName" :icon="ArrowLeft" @back="router.push({ path: '/o2o/order/refund' })" />
    </el-card>

    <el-form :model="formData" label-width="100px" class="page-form" v-loading="loading" label-position="left">
      <el-card class="box-card !border-none relative" shadow="never" v-if="formData">
        <h3 class="panel-title">{{ t('afterSales') }}</h3>
        <el-row class="row-bg px-[30px] mb-[20px]" :gutter="20">
          <el-col :span="8">
            <el-form-item :label="t('orderRefundNo')">
              <div class="input-width">{{ formData.refund_no }}</div>
            </el-form-item>
            <el-form-item :label="t('createTime')">
              <div class="input-width">{{ formData.create_time }}</div>
            </el-form-item>
            <el-form-item :label="t('refundVoucher')" v-if="formData.voucher">
              <div class="input-width flex">
                <div class="mr-3" v-for="(voucherItem, voucherIndex) in formData.voucher.split(',')" :key="voucherIndex">
                  <el-image
                    v-if="voucherItem"
                    class="w-[70px] h-[70px]"
                    :src="img(voucherItem)"
                    :preview-src-list="mapfor(formData.voucher.split(','))"
                    fit="contain"
                  >
                    <template #error>
                      <div class="image-slot">
                        <img class="w-[70px] h-[70px]" src="@/addon/o2o/assets/goods_default.png" />
                      </div>
                    </template>
                  </el-image>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('applyMoney')">
              <div class="input-width">￥{{ formData.apply_money }}</div>
            </el-form-item>
            <el-form-item :label="t('refundReason')">
              <div class="input-width">{{ formData.reason }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('realityMoney')" v-if="Number(formData.money)">
              <div class="input-width">￥{{ formData.money }}</div>
            </el-form-item>
            <el-form-item :label="t('refundRemark')" v-if="formData.remark">
              <div class="input-width">{{ formData.remark }}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <h3 class="panel-title">{{ t('refundStatus') }}</h3>
        <div class="mb-[20px]">
          <p>
            <span class="ml-[30px] text-[14px] mr-[20px]">{{ t('refundStatus') }}：</span>
            <span class="text-[14px]">{{ formData.status_name }}</span>
          </p>
          <div class="flex mt-[10px]" v-if="formData.status == 'wait_refund'">
            <span class="text-[14px] px-[15px] py-[5px] ml-[30px] text-[#5c96fc] bg-[#ebf3ff] cursor-pointer" @click="agreeEvent">{{ t('agree') }}</span>
            <span class="text-[14px] px-[15px] py-[5px] ml-[30px] text-[#5c96fc] bg-[#ebf3ff] cursor-pointer" @click="refuseEvent">{{ t('refuse') }}</span>
          </div>
        </div>

        <h3 class="panel-title">{{ t('goodsDetail') }}</h3>
        <el-table :data="[formData.order_item]" size="large">
          <el-table-column :label="t('goodsName')" align="left" width="400">
            <template #default="{ row }">
              <div class="flex">
                <div class="flex items-center w-[50px] h-[50px] mr-[10px]">
                  <el-image class="w-[50px] h-[50px]" :src="img(row.item_image ? row.item_image : '')" fit="cover">
                    <template #error>
                      <div class="image-slot">
                        <img class="w-[60px] h-[60px]" src="@/addon/o2o/assets/goods_default.png" />
                      </div>
                    </template>
                  </el-image>
                </div>
                <div class="flex flex-col flex-1">
                  <span>{{ row.item_name }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="item_money" :label="t('price')" min-width="300" align="left" />
          <el-table-column prop="unit" :label="t('unit')" min-width="350" align="left" />
        </el-table>
        <h3 class="mt-[50px] mb-[20px]" v-if="formData.refund_log.length > 0">{{ t('operateLog') }}</h3>
        <div class="mb-[100px]" style="min-height: 100px">
          <template v-if="formData.refund_log.length > 0">
            <div class="flex" v-for="(items, index) in formData.refund_log" :key="index">
              <div class="mr-[20px] min-w-[71px]">
                <div class="leading-[1] w-full text-[14px] w-[100px] flex justify-end">
                  {{ items.action_time.split(' ')[0] }}
                </div>
                <div class="leading-[1] w-full text-[14px] w-[100px] flex justify-end mt-[15px]">
                  {{ items.action_time.split(' ')[1] }}
                </div>
              </div>
              <div>
                <div class="w-[16px] h-[16px] flex items-center bg-[#D1EBFF] border-[1px] border-[#0091FF] rounded-[999px]">
                  <div class="w-[8px] h-[8px] mx-auto bg-[#0091FF] rounded-[999px]"></div>
                </div>
                <div v-if="index + 1 != formData.refund_log.length" class="w-[2px] h-[50px] bg-[#D1EBFF] mx-auto"></div>
              </div>
              <div>
                <div class="leading-[1] ml-[20px] text-[14px]">
                  {{ items.nickname }}
                </div>
                <div class="leading-[1] ml-[20px] text-[14px] mt-[15px]">
                  {{ items.action_name }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </el-card>
      <el-card class="box-card !border-none relative" shadow="never" v-if="!loading && !formData">
        <el-empty :description="t('orderInfoEmpty')" />
      </el-card>
    </el-form>
    <!-- 退款拒绝原因弹窗 -->
    <el-dialog v-model="refuseShowDialog" :title="t('orderRefundRefuse')" width="460px" class="diy-dialog-wrap" :destroy-on-close="true">
      <el-form :model="refuseFormData" label-width="90px" ref="refuseFormRef" :rules="refundFormRules" class="page-form">
        <el-form-item :label="t('refuseReason')" prop="refuse_reason">
          <el-input v-model="refuseFormData.refuse_reason" type="textarea" rows="4" clearable class="input-width" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="refuseShowDialog = false">{{ t('cancel') }}</el-button>
          <el-button type="primary" :loading="loading" @click="confirm(refuseFormRef)">{{ t('confirm') }}</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="agreeRefundDialog" :title="t('orderRefundAgree')" width="460px" class="diy-dialog-wrap" :destroy-on-close="true">
      <el-form :model="refuseFormData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
        <el-form-item :label="t('applyMoney')">
          <span>￥{{ refuseFormData.apply_money }}</span>
        </el-form-item>
        <el-form-item :label="t('agreeMoney')">
          <el-input v-model="refuseFormData.money" clearable class="input-width" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="agreeRefundDialog = false">{{ t('cancel') }}</el-button>
          <el-button type="primary" :loading="loading" @click="agreeRefundEvent(formRef)">{{ t('confirm') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue'
  import { t } from '@/lang'
  import { getRefundDetail, confirmRefund, refuseRefund } from '@/addon/o2o/api/order'
  import { useRoute, useRouter } from 'vue-router'
  import { img } from '@/utils/common'
  import { FormInstance } from 'element-plus'

  const route = useRoute()
  const router = useRouter()
  const pageName = route.meta.title
  const refundId = route.query.refund_no
  const loading = ref(true)

  const formData: Record<string, any> | null = ref(null)

  const setFormData = async (refundId: number = 0) => {
    loading.value = true
    formData.value = null
    await getRefundDetail(refundId)
      .then(({ data }) => {
        formData.value = data
      })
      .catch(() => {})
    loading.value = false
  }

  if (refundId) setFormData(refundId)
  else loading.value = false

  // 退款参数
  const refuseShowDialog = ref(false)
  const initialFormData = {
    refuse_reason: '',
    money: '',
    type: '',
    apply_money: 0.0
  }

  const refuseFormData: Record<string, any> = reactive({ ...initialFormData })
  const formRef = ref<FormInstance>()
  const refuseFormRef = ref<FormInstance>()
  // 表单验证规则
  const formRules = computed(() => {
    return {}
  })

  const refundFormRules = computed(() => {
    return {
      refuse_reason: [{ required: true, message: t('shopReasonPlaceholder'), trigger: 'blur' }]
    }
  })

  const agreeRefundDialog = ref(false) // 同意退款 弹窗
  // 同意退款 弹窗
  const agreeEvent = () => {
    refuseFormData.type = 'agree'
    refuseFormData.apply_money = formData.value.apply_money
    refuseFormData.money = formData.value.apply_money
    agreeRefundDialog.value = true
  }

  // 同意退款 提交
  const agreeRefundEvent = (data: any) => {
    loading.value = true
    confirmRefund({
      refund_id: formData.value.refund_id,
      money: refuseFormData.money
    })
      .then(() => {
        agreeRefundDialog.value = false
        loading.value = false
        setFormData(refundId)
      })
      .catch(() => {
        loading.value = false
        agreeRefundDialog.value = false
      })
  }

  // 拒绝退款 弹出
  const refuseEvent = () => {
    refuseFormData.type = 'refuse'
    refuseFormData.refuse_reason = ''
    refuseShowDialog.value = true
  }

  // 拒绝退款 拒绝收货 提交
  const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
      if (valid) {
        loading.value = true
        refuseRefund({
          refund_id: formData.value.refund_id,
          refuse_reason: refuseFormData.refuse_reason
        })
          .then((res) => {
            setFormData(refundId)
            loading.value = false
            refuseShowDialog.value = false
          })
          .catch(() => {
            loading.value = false
            refuseShowDialog.value = false
          })
      }
    })
  }
  const mapfor = (arr: any) => {
    return arr.map((item: any) => {

      return img(item)
    })
  }
</script>

<style lang="scss" scoped></style>
