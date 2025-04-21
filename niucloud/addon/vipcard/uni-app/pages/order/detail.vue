<template>
  <view :style="themeColor()">
    <template v-if="!loading">
      <view v-if="detail" class="bg-[#f7f7f7] min-h-screen overflow-hidden">
        <view class="bg-linear h-[480rpx] text-white px-4 pt-5">
          <view class="text-[42rpx] flex items-baseline" @click="orderStepsShow = true">
            <text class="nc-iconfont nc-icon-a-shijianV6xx-36 text-[42rpx] mr-1"></text>
            <text class="font-bold">{{ t('order') }}{{ detail?.order_status_info?.name }}</text>
          </view>
          <view class="text-xs mt-3">{{ t('yourOrder') }}{{ detail?.order_status_info?.name }}{{ t('rebook') }}</view>
        </view>

        <view class="-mt-[340rpx]">
          <view class="chunk-wrap p-3 bg-white mx-3 rounded-md">
            <view class="flex" v-for="(goodsItem, goodsIndex) in detail.item" :key="goodsIndex" @click="redirectTo(goodsItem)">
              <view class="w-[180rpx] h-[160rpx] mr-3 overflow-hidden rounded leading-none">
                <image :src="img(goodsItem.item_image_thumb_small)" mode="aspectFill"
                  class="w-[180rpx] h-[160rpx] leading-none" />
              </view>
              <view class="flex-1 w-0">
                <view class="font-bold truncate text-sm">{{ goodsItem.item_name }}</view>
                <view class="flex justify-between">
                  <view class="text-[#FA6400] text-xs mt-2">
                    <text class="ml-[2rpx]">{{ t('currency') }}</text>
                    <text class="text-[38rpx]">{{ goodsItem.price }}</text>
                  </view>
                  <view class="text-sm text-gray-400 flex items-end leading-none"> x{{ goodsItem.num }} </view>
                </view>
              </view>
            </view>

            <u--form labelPosition="left" ref="form1" labelWidth="70"
              :labelStyle="{ color: '#A3A3A3', fontSize: '14px' }">
              <u-form-item :label="t('annualPayment')" borderBottom>
                <view class="border-style w-full !border-0 flex justify-end items-end">
                  <view class="text-[#FA6400] text-xs font-bold">
                    <text class="ml-[2rpx]">{{ t('currency') }}</text>
                    <text class="text-[28rpx]">{{ detail.pay_money }}</text>
                  </view>
                </view>
              </u-form-item>
              <u-form-item :label="t('onOrder')" borderBottom v-if="detail.order_no">
                <view class="border-style w-full !border-0 flex justify-between items-end"
                  style="display: flex; align-items: center">
                  <text>{{ detail.order_no }}</text>
                  <text class="text-xs text-[#7D7C82]" @click="copy(detail.order_no)">{{ t('copy') }}</text>
                </view>
              </u-form-item>
              <u-form-item :label="t('transactionNumber')" borderBottom v-if="detail.out_trade_no">
                <view class="border-style w-full !border-0 flex justify-between items-end">
                  <text>{{ detail.out_trade_no }}</text>
                </view>
              </u-form-item>
              <u-form-item :label="t('orderTime')" borderBottom>
                <view class="border-style w-full !border-0 flex justify-between items-end">
                  <text>{{ detail.create_time }}</text>
                </view>
              </u-form-item>
              <u-form-item :label="t('offTime')" borderBottom v-if="detail.close_time">
                <view class="border-style !border-0">
                  {{ detail.close_time }}
                </view>
              </u-form-item>
              <u-form-item :label="t('payTime')" borderBottom v-if="detail.pay_time">
                <view class="border-style !border-0">
                  {{ detail.pay_time }}
                </view>
              </u-form-item>
              <u-form-item :label="t('modePayment')" v-if="detail.pay">
                <view>
                  <view class="mb-[18rpx]">
                    {{ detail.pay.type_name }}
                  </view>
                  <view class="friend-pay relative px-[20rpx] py-[12rpx] bg-[#F2F2F2] rounded-[10rpx] flex items-center"
                    v-if="detail.pay && detail.member_id !== detail.pay.main_id && detail.pay.status == 2">
                    <u-avatar :src="img(detail.pay.pay_member_headimg)" size="20" leftIcon="none"
                      :default-url="img('static/resource/images/default_headimg.png')" />
                    <text class="ml-[14rpx] text-[24rpx] using-hidden">{{ detail.pay.pay_member }}{{ t('helpPay')
                    }}</text>
                  </view>
                </view>
              </u-form-item>
            </u--form>
          </view>
        </view>

        <u-popup :show="orderStepsShow" @close="orderStepsShow = false" :closeable="true">
          <view class="text-center py-[30rpx] font-bold leading-none">
            <text>{{ t('orderSchedule') }}</text>
          </view>
          <view class="px-6 pb-5 pt-2">
            <u-steps :current="orderStepsNum" direction="column">
              <u-steps-item :title="item.action" :desc="item.action_time" v-for="(item, index) in detail.order_log"
                :key="index"></u-steps-item>
            </u-steps>
          </view>
        </u-popup>

        <u-popup :show="refundStepsShow" @close="refundStepsShow = false" :closeable="true">
          <view class="text-center py-[30rpx] font-bold leading-none" v-if="refundStepsContent.refund_log">
            <text>{{ t('refundProgress') }}</text>
          </view>
          <view class="px-6 pb-5 pt-2">
            <u-steps :current="refundStepsNum" direction="column">
              <u-steps-item :title="item.action_name" :desc="item.action_time"
                v-for="(item, index) in refundStepsContent.refund_log" :key="index">
                <template #desc v-if="item.action == 'refuse'">
                  <view class="text-xs text-red">{{ t('reasonRefusal') }}：{{ refundStepsContent.refuse_reason }}</view>
                  <view class="text-xs text-[#909193]">{{ item.action_time }}</view>
                </template>
                <template #desc v-if="item.action == 'completed'">
                  <view class="text-xs text-red">{{ t('refundMethod') }}{{ t('refundAmount') }}：{{
                    refundStepsContent.money }}</view>
                  <view class="text-xs text-[#909193]">{{ item.action_time }}</view>
                </template>
              </u-steps-item>
            </u-steps>
          </view>
        </u-popup>

        <view class="h-[100rpx] tab-bar-placeholder w-full"></view>
        <view class="flex justify-end tab-bar items-center bg-white px-3 fixed left-0 right-0 bottom-0 z-10">
          <view class="flex items-center mr-auto">
            <view class="flex flex-col items-center mr-[44rpx]"
              @click="redirect({ url: '/addon/vipcard/pages/index', mode: 'reLaunch' })">
              <image class="w-[44rpx] h-[44rpx]" :src="img('addon/vipcard/vipcard/service/index.png')"
                mode="aspectFill">
              </image>
              <text class="text-xs text-[#454545] mt-1">{{ t('index') }}</text>
            </view>
          </view>
          <view class="flex flex-wrap justify-end flex-1">
            <button type="primary"
              class="rounded-[50rpx] text-[26rpx] flex-1 !min-w-[160rpx] !h-[70rpx] !leading-[70rpx] mx-0 my-2 ml-3"
              @click="orderBtnFn(detail, 'use')" v-if="detail.order_status == 'wait_use' && !detail.refund_status">
              {{ t('toUse') }}
            </button>
            <button type="primary"
              class="rounded-[50rpx] flex-1 text-[26rpx] !min-w-[160rpx] !h-[70rpx] !leading-[70rpx] mx-0 my-2 ml-3"
              @click="orderBtnFn(detail, btnItem.key)"
              v-for="(btnItem, btnIndex) in detail.order_status_info.member_action">
              {{ btnItem.name }}
            </button>
            <button type="primary"
              v-if="detail.order_status_info.is_refund && ['', 'refund_refuse'].includes(detail.refund_status)"
              class="rounded-[50rpx] text-[26rpx] flex-1 !min-w-[160rpx] !h-[70rpx] !leading-[70rpx] mx-0 my-2 ml-3"
              @click="refundApplyFn()">
              {{ t('applyRefund') }}
            </button>
            <button type="primary" v-if="detail.refund_no"
              class="rounded-[50rpx] flex-1 text-[26rpx] !min-w-[160rpx] !h-[70rpx] !leading-[70rpx] mx-0 my-2 ml-3"
              @click="refundStepsShow = true">
              {{ t('viewRefund') }}
            </button>
            <button type="primary" v-if="detail.refund_no && detail.refund_status == 'wait_refund'"
              class="rounded-[50rpx] text-[26rpx] !min-w-[160rpx] !h-[70rpx] !leading-[70rpx] mx-0 my-2 ml-3 flex-1"
              @click="cancelRefundFn()">
              {{ t('cancelRefund') }}
            </button>
          </view>
        </view>
        <pay ref="payRef"></pay>
      </view>
      <view class="w-screen h-screen flex flex-col justify-center items-center" v-else>
        <u-empty :icon="img('static/resource/images/order_empty.png')" :text="t('emptyTips')" />
      </view>
    </template>
    <u-modal :show="cancelRefundShow" confirmColor="var(--primary-color)" :content="t('cancelRefundContent')"
      :showCancelButton="true" :closeOnClickOverlay="true" @cancel="refundCancel" @confirm="refundConfirm"></u-modal>
    <loading-page :loading="loading"></loading-page>

    <!-- #ifdef MP-WEIXIN -->
    <!-- 小程序隐私协议 -->
    <wx-privacy-popup ref="wxPrivacyPopupRef"></wx-privacy-popup>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { img, redirect, copy } from '@/utils/common'
import { getOrderDetail, cancelOrder, deleteOrder, refundApply, refundDetail, cancelRefund } from '@/addon/vipcard/api/vipcard'
import { t } from '@/locale'
import { useSubscribeMessage } from '@/hooks/useSubscribeMessage'

let orderId = 0
const detail = ref<AnyObject | null>(null)
const loading = ref(true)
const orderStepsNum = ref(1)
const orderStepsShow = ref(false)
const cancelRefundShow = ref(false)

const type = ref('')

const wxPrivacyPopupRef: any = ref(null)

onLoad((option: any) => {
  orderId = option.order_id || 0
  getOrderDetailFu()
  // #ifdef MP
  nextTick(() => {
    if (wxPrivacyPopupRef.value) wxPrivacyPopupRef.value.proactive()
  })
  // #endif
})

const getOrderDetailFu = () => {
  getOrderDetail(orderId)
    .then((res) => {
      detail.value = res.data
      type.value = res.data.order_type
      if (res.data.refund_id) refundDetailFn(res.data.refund_id)
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

// 支付
const payRef = ref(null)
const orderBtnFn = (data, type = '') => {
  if (type == 'pay') payRef.value?.open(data.order_type, data.order_id, `/addon/vipcard/pages/order/detail?order_id=${data.order_id}`)
  else if (type == 'cancel') {
    cancelOrder(data.order_id)
      .then((res) => {
        getOrderDetailFu()
      })
      .catch(() => {
        getOrderDetailFu()
      })
  } else if (type == 'delete') {
    deleteOrder(data.order_id)
      .then((res) => {
        redirect({ url: '/addon/vipcard/pages/order/list' })
      })
      .catch(() => {
        getOrderDetailFu()
      })
  } else if (type == 'index') {
    redirect({ url: '/addon/vipcard/pages/index', mode: 'reLaunch' })
  } else if (type == 'use') {
    redirect({ url: '/addon/vipcard/pages/order/my_card_detail', param: { card_id: data.member_card[0].card_id } })
  }
}

// 申请退款
const refundApplyFn = () => {
  let obj = {
    order_id: detail.value.order_id
  }
  refundApply(obj).then((res) => {
    useSubscribeMessage().request('vipcard_refund_success,vipcard_refund_refuse')
    getOrderDetailFu()
  })
}

// 取消申请退款
const cancelRefundFn = () => {
  cancelRefundShow.value = true;
}

const refundConfirm = () => {
  cancelRefund(detail.value.refund_id).then((res) => {
    cancelRefundShow.value = false;
    getOrderDetailFu()
  }).catch(() => {
    cancelRefundShow.value = false;
  })
}

const refundCancel = () => {
  cancelRefundShow.value = false;
}


// 申请退款详情
let refundStepsShow = ref(false)
let refundStepsContent = ref({})
let refundStepsNum = ref(1)
const refundDetailFn = (id) => {
  refundDetail(id).then((res) => {
    refundStepsContent.value = res.data
    refundStepsNum.value = res.data.refund_log.length ? res.data.refund_log.length - 1 : 0
  })
}


const redirectTo = (param: any) => {
  if (param.item_type == 'service') {
    redirect({ url: '/addon/vipcard/pages/service/detail', param: { id: param.item_id } })
  } else if (param.item_type == 'card') {
    redirect({ url: '/addon/vipcard/pages/card/detail', param: { id: param.item_id } })
  }
}
</script>

<style lang="scss" scoped>
.bg-linear {
  background: linear-gradient(360deg, #f8f8f8 0%, $u-primary 100%);
}

.tab-bar {
  padding-top: 16rpx;
  padding-bottom: calc(constant(safe-area-inset-bottom) + 16rpx);
  padding-bottom: calc(env(safe-area-inset-bottom) + 16rpx);
}

.tab-bar-placeholder {
  padding-bottom: calc(constant(safe-area-inset-bottom) + 32rpx);
  padding-bottom: calc(env(safe-area-inset-bottom) + 32rpx);
}

:deep(.u-form-item__body) {
  align-items: flex-start;
}

.friend-pay {
  &::after {
    content: '';
    display: block;
    width: 20rpx;
    height: 20rpx;
    background-color: #f2f2f2;
    position: absolute;
    left: 30rpx;
    top: 0;
    transform: translateY(-50%) rotate(45deg);
    border-radius: 4rpx;
  }
}
</style>
