<template>
  <view :style="themeColor()">
    <view class="bg-[#f8f8f8] min-h-screen overflow-hidden" v-if="!loading">
      <view class="bg-linear h-[480rpx] text-white px-4 pt-5">
        <view class="text-[42rpx] flex items-baseline" @click="orderStepsShow = true">
          <text class="nc-iconfont nc-icon-a-shijianV6xx-36 text-[42rpx] mr-1"></text>
          <text class="font-bold">订单{{ detail?.order_status_info?.name }}</text>
          <view class="text-xs flex items-center ml-[20rpx]"
            v-if="distance > 0 && detail.order_status_info.status == 0">
            <text>剩余支付时间：</text>
            <u-count-down :time="distance" format="HH:mm:ss"></u-count-down>
          </view>
        </view>
        <view class="text-xs mt-3" v-if="detail?.order_status_info.status == 0">您的订单{{ detail?.order_status_info?.name }}，欢迎再次预订！</view>
        <view class="text-xs mt-3" v-else>您的订单{{ detail?.order_status_info?.name }}，欢迎再次预订！</view>
      </view>

      <view class="bg-white mx-3 py-4 px-3 rounded-md -mt-[340rpx] box-border" @click="redirectTo">
        <view :class="['flex', { 'pb-4 border-0 border-b-1 border-dashed border-[#EAEAEA] mb-4': ['1', '10'].includes(detail.order_status) }]">
          <image class="w-[124rpx] h-[124rpx] mr-2 rounded" :src="img(detail.goods_image)" />
          <view class="flex-1 flex flex-col">
            <view class="text-[#1A2336] text-[30rpx] truncate font-bold w-[514rpx]">{{ detail[type][type + '_name'] }}【{{ detail.goods_name }}】</view>
            <view class="flex items-center text-[#7F7F85] text-xs mt-[12rpx]">
              <text class="mr-1">{{ dateFormat(detail.start_time, 'yearMonthDayWeek') }}</text>
              <!-- <text class="mr-1">周日</text> -->
              <text>当日有效</text>
            </view>
            <view class="font-bold text-sm text-[#222] mt-auto price-font">￥{{ detail.order_money }}</view>
          </view>
        </view>
        <template v-if="['1', '10'].includes(detail.order_status)">
          <view class="bg-[#F9FBFF] rounded-lg overflow-hidden mb-4">
            <view class="bg-[#EEF3FF] flex items-center text-sm py-3 justify-center triangle" v-if="type == 'hotel'">
              请提醒商家
              <text class="text-[#EA4B69]">【扫码核销】</text>
              使用
            </view>
            <view class="bg-[#EEF3FF] flex items-center text-sm py-3 justify-center triangle" v-else>
              凭
              <text class="text-[#EA4B69]">【身份证】</text>
              或
              <text class="text-[#EA4B69]">【手机号】</text>
              可直接入园
            </view>
            <view class="flex flex-col items-center pb-4">
              <image class="w-[326rpx] h-[326rpx] mt-4 mb-4" :src="detail.verify_code_qrcode" />
              <image class="w-[524rpx] h-[128rpx] mb-3" :src="detail.verify_code_barcode" />
              <view class="text-[var(--text-color-light6)] text-xs">未消费前请不要将券码提供给商家</view>
            </view>
          </view>
          <view>
            <view class="flex items-center justify-between">
              <view class="flex items-center">
                <text class="text-sm">{{ type == 'hotel' ? '券码' : '入园码' }} {{ detail.verify_code }}</text>
                <text class="nc-iconfont nc-icon-fuzhiV6xx text-[32rpx] ml-2 text-[#636363]"
                  @click.stop="copy(detail.verify_code)"></text>
              </view>
              <text class="text-[#696969] text-[26rpx]">{{ detail.order_status_info.name }}</text>
            </view>
          </view>
        </template>
      </view>

      <view class="mt-3 bg-white mx-3 px-3 py-4 rounded-md">
        <view class="text-[#1A2336] text-[30rpx] font-bold mb-4">订单信息</view>
        <view class="border-0 border-b-1 border-solid border-[#EAEAEA] mb-1 pb-4" v-if="type == 'hotel'">
          <view class="flex items-center">
            <view class="flex flex-col items-center">
              <text class="text-[26rpx] text-[#1A2336]">{{ dateFormat(detail.start_time, 'monthDayWeek') }}</text>
              <text class="text-xs text-[#888] mt-1">14:00后入住</text>
            </view>
            <view class="ml-4 mr-4 relative w-[136rpx] text-center">
              <text
                class="text-white relative z-10 text-xs font-scale bg-[#1C283E] px-2 py-1 rounded-xl w-[90rpx] box-border break-keep">共{{ detail.days }}晚</text>
              <text
                class="iconfont iconzhixiang absolute left-0 right-0 text-[90rpx] top-[50%] translate-y text-[#ABABAB]"></text>
            </view>
            <view class="flex flex-col items-center">
              <text class="text-[26rpx] text-[#1A2336]">{{ dateFormat(detail.end_time, 'monthDayWeek') }}</text>
              <text class="text-xs text-[#888] mt-1">12:00前离店</text>
            </view>
          </view>
          <view class="mt-4 text-[#1A2336] text-[26rpx] font-bold"> {{ detail.hotel.hotel_name }}（{{ detail.goods_name }}） </view>
          <view class="mt-1 text-[#1A2336] text-[26rpx] font-bold flex items-center">
            <text class="nc-iconfont nc-icon-fengefuV6xx text-[32rpx]"></text>
            <text>共{{ detail.num }}间</text>
          </view>
          <!-- <view class="mt-3 text-[#1A2336] text-[26rpx] font-bold">
                        无早餐
                    </view> -->
        </view>
        <u--form labelPosition="left" ref="form1" labelWidth="90" :labelStyle="{ color: '#A3A3A3', fontSize: '14px' }">
          <template v-if="detail.order_type == 'hotel'">
            <template v-for="(item, index) in detail.buyer_info">
              <u-form-item label="联系人姓名" prop="userInfo.name" borderBottom v-if="item.name">
                <view class="border-style">
                  {{ item.name }}
                </view>
              </u-form-item>
              <u-form-item label="身份证号" borderBottom v-if="item.id_card">
                <view class="border-style">
                  {{ item.id_card }}
                </view>
              </u-form-item>
            </template>
          </template>
          <template v-else>
            <u-form-item label="联系人姓名" prop="userInfo.name" borderBottom v-if="detail.buyer_info.name">
              <view class="border-style">
                {{ detail.buyer_info.name }}
              </view>
            </u-form-item>
            <u-form-item label="身份证号" borderBottom v-if="detail.buyer_info.id_card">
              <view class="border-style">
                {{ detail.buyer_info.id_card }}
              </view>
            </u-form-item>
          </template>

          <u-form-item label="联系电话" borderBottom v-if="detail.mobile">
            <view class="border-style">
              {{ detail.mobile }}
            </view>
          </u-form-item>
          <u-form-item label="订单编号" borderBottom v-if="detail.order_no">
            <view class="border-style w-full !border-0 flex justify-between items-center">
              <text>{{ detail.order_no }}</text>
              <text class="text-xs text-[#7D7C82]" @click="copy(detail.order_no)">复制</text>
            </view>
          </u-form-item>
          <u-form-item label="下单时间" borderBottom v-if="detail.create_time">
            <view class="border-style !border-0">
              {{ detail.create_time }}
            </view>
          </u-form-item>
          <u-form-item label="支付时间" borderBottom v-if="detail.pay_time">
            <view class="border-style !border-0">
              {{ detail.pay_time }}
            </view>
          </u-form-item>
          <u-form-item label="支付方式" v-if="detail.pay">
            <view>
              <view class="mb-[18rpx]">
                {{ detail.pay.type_name }}
              </view>
              <view class="friend-pay relative px-[20rpx] py-[12rpx] bg-[#F2F2F2] rounded-[10rpx] flex items-center"
                v-if="detail.pay && detail.member_id !== detail.pay.main_id && detail.pay.status == 2">
                <u-avatar :src="img(detail.pay.pay_member_headimg)" size="20" leftIcon="none"
                  :default-url="img('static/resource/images/default_headimg.png')" />
                <text class="ml-[14rpx] text-[24rpx] using-hidden">{{ detail.pay.pay_member }}{{ t('helpPay') }}</text>
              </view>
            </view>
          </u-form-item>
        </u--form>
      </view>

      <view class="h-[160rpx] w-full"></view>
      <view class="flex justify-end items-center bg-white px-3 py-1 fixed left-0 right-0 bottom-0 z-10">
        <view class="flex flex-col items-center justify-center mr-auto" @click="orderBtnFn(detail, 'index')">
          <text class="nc-iconfont nc-icon-shouye-xiaolianV6xx text-[46rpx] text-[#333]"></text>
          <text class="text-xs mt-[2rpx] font-scale">首页</text>
        </view>
        <view class="flex flex-wrap justify-end">
          <u-button :text="btnItem.name" color="var(--primary-color)" shape="circle"
            :customStyle="{ lineHeight: '70rpx', margin: '16rpx 0rpx 16rpx 24rpx', color: '#fff', width: '200rpx', height: '70rpx', fontSize: '26rpx' }"
            type="primary" @click="orderBtnFn(detail, btnItem.key)"
            v-for="(btnItem, btnIndex) in detail.order_status_info.member_action"></u-button>
          <u-button text="申请退款" v-if="detail.is_enable_refund && ['', 'refund_refuse'].includes(detail.refund_status)"
            type="primary" color="var(--primary-color)" shape="circle"
            :customStyle="{ lineHeight: '70rpx', margin: '16rpx 0rpx 16rpx 24rpx', color: '#fff', width: '200rpx', height: '70rpx', fontSize: '26rpx' }"
            @click="refundApplyFn(detail)" :loading="loading"></u-button>
          <u-button text="查看退款" v-if="detail.refund_no" type="primary" color="var(--primary-color)" shape="circle"
            :customStyle="{ lineHeight: '70rpx', margin: '16rpx 0rpx 16rpx 24rpx', color: '#fff', width: '200rpx', height: '70rpx', fontSize: '26rpx' }"
            @click="refundStepsShow = true"></u-button>
          <u-button text="取消退款" v-if="detail.refund_no && detail.refund_status == 'wait_refund'" type="primary"
            color="var(--primary-color)" shape="circle"
            :customStyle="{ lineHeight: '70rpx', margin: '16rpx 0rpx 16rpx 24rpx', color: '#fff', width: '200rpx', height: '70rpx', fontSize: '26rpx' }"
            @click="cancelRefundFn(detail)"></u-button>
        </view>
      </view>
      <u-modal :show="cancelRefundShow" confirmColor="var(--primary-color)" content="撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。"
        :showCancelButton="true" :closeOnClickOverlay="true" @cancel="refundCancel" @confirm="refundConfirm"></u-modal>

      <pay ref="payRef" @close="payClose"></pay>

      <u-popup :show="orderStepsShow" @close="orderStepsShow = false" :closeable="true">
        <view class="text-center py-[30rpx] font-bold leading-none">
          <text>订单进度</text>
        </view>
        <view class="px-6 pb-5 pt-2">
          <u-steps :current="orderStepsNum" direction="column">
            <u-steps-item :title="item.action" :desc="item.action_time" v-for="(item, index) in detail.order_log" :key="index"></u-steps-item>
          </u-steps>
        </view>
      </u-popup>

      <u-popup :show="refundStepsShow" @close="refundStepsShow = false" :closeable="true">
        <view class="text-center py-[30rpx] font-bold leading-none" v-if="refundStepsContent.refund_log">
          <text>退款进度</text>
        </view>
        <view class="px-6 pb-5 pt-2">
          <u-steps :current="refundStepsNum" direction="column">
            <u-steps-item :title="item.action_name" :desc="item.action_time"
              v-for="(item, index) in refundStepsContent.refund_log" :key="index">
              <template #desc v-if="item.action == 'refuse'">
                <view class="text-xs text-red">拒绝原因：{{ refundStepsContent.refuse_reason }}</view>
                <view class="text-xs text-[#909193]">{{ item.action_time }}</view>
              </template>
              <template #desc v-if="item.action == 'completed'">
                <view class="text-xs text-red">退款方式：原路退款，退款金额：{{ refundStepsContent.money }}</view>
                <view class="text-xs text-[#909193]">{{ item.action_time }}</view>
              </template>
            </u-steps-item>
          </u-steps>
        </view>
      </u-popup>
    </view>

    <loading-page :loading="loading"></loading-page>

    <!-- #ifdef MP-WEIXIN -->
    <!-- 小程序隐私协议 -->
    <wx-privacy-popup ref="wxPrivacyPopupRef"></wx-privacy-popup>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick } from 'vue'
import { t } from '@/locale'
import { onLoad } from '@dcloudio/uni-app'
import { img, redirect, copy } from '@/utils/common'
import { getMemberOrderDetail, deleteOrder, cancelOrder, refundApply, cancelRefund, refundDetail } from '@/addon/tourism/api/tourism'
import { useSubscribeMessage } from '@/hooks/useSubscribeMessage'

const loading = ref<boolean>(true)
let detail = ref<Array<Object>>({})
//   let loading = ref<boolean>(true)
let type = ref('')
let orderId = ref('')
let orderStepsNum = ref(1)
let orderStepsShow = ref(false)
let distance = ref(0)

const wxPrivacyPopupRef: any = ref(null)

onLoad((option: any) => {
  orderId.value = option.order_id
  getMemberOrderDetailFn(orderId.value)
  // #ifdef MP
  nextTick(() => {
    if (wxPrivacyPopupRef.value) wxPrivacyPopupRef.value.proactive()
  })
  // #endif
})

const getMemberOrderDetailFn = (id) => {
  loading.value = true
  getMemberOrderDetail(id)
    .then((res) => {
      detail.value = res.data
      orderStepsNum.value = detail.value.order_log.length ? detail.value.order_log.length - 1 : 0
      type.value = res.data.order_type
      if (res.data.refund_id) refundDetailFn(res.data.refund_id)
      if (detail.value.order_status_info.status == 0) {
        const now = new Date().getTime() / 1000
        distance.value = (detail.value.auto_close_time - now) * 1000
        let timer = setInterval(() => {
          if (distance.value <= 0) {
            clearInterval(timer)
            // getMemberOrderDetailFn(orderId.value);
          }
        }, 1000)
      }
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

// 取消订单
const cancelOrderFn = (data) => {
  cancelOrder(data)
    .then((res) => {
      getMemberOrderDetailFn(orderId.value)
    })
    .catch(() => {
      getMemberOrderDetailFn(orderId.value)
    })
}
// 删除订单
const deleteOrderFn = (data) => {
  deleteOrder(data.order_id)
    .then((res) => {
      redirect({ url: '/addon/tourism/pages/order/list' })
    })
    .catch(() => {
      getMemberOrderDetailFn(orderId.value)
    })
}

// 申请退款
const refundApplyFn = (data) => {
  loading.value = true
  let obj = {
    order_id: data.order_id
  }
  refundApply(obj).then((res) => {
    useSubscribeMessage().request('tourism_refund_success,tourism_refund_refuse')
    getMemberOrderDetailFn(orderId.value)
  })
}
const cancelRefundShow = ref(false)

// 取消申请退款
const refund_id = ref('')
const cancelRefundFn = (data) => {
  cancelRefundShow.value = true
  refund_id.value = data.refund_id
  // loading.value = true
  // cancelRefund(data.refund_id).then((res) => {
  //   getMemberOrderDetailFn(orderId.value)
  // })
}
const refundCancel = () => {
  cancelRefundShow.value = false
}
const refundConfirm = () => {
  loading.value = true
  cancelRefund(refund_id.value).then((res) => {
    getMemberOrderDetailFn(orderId.value)
    cancelRefundShow.value = false
  })
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

const toLink = (id: string) => {
  redirect({ url: '/addon/tourism/pages/order/detail', param: { order_id: id } })
}

const payRef = ref(null)
const orderBtnFn = (data: any, type = '') => {
  if (type == 'pay') payRef.value?.open(data.order_type, data.order_id, `/addon/tourism/pages/order/detail?order_id=${data.order_id}`)
  else if (type == 'cancel') {
    cancelOrderFn(data)
  } else if (type == 'delete') {
    deleteOrderFn(data)
  } else if (type == 'buy') {
    if (data.order_type == 'scenic') {
      redirect({ url: '/addon/tourism/pages/scenic/list' })
    } else if (data.order_type == 'way') {
      redirect({ url: '/addon/tourism/pages/way/list' })
    } else if (data.order_type == 'hotel') {
      redirect({ url: '/addon/tourism/pages/hotel/list' })
    }
  } else if (type == 'index') {
    redirect({ url: '/addon/tourism/pages/index', mode: 'reLaunch' })
  }
}

const dateFormat = (res, type) => {
  let data
  if (res.indexOf('/') != -1) {
    data = res.split('/')
  } else if (res.indexOf('-') != -1) {
    data = res.split('-')
  }

  let time
  const index = new Date(res).getDay()
  const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  if (type == 'yearMonthDay') time = data[0] + '年' + data[1] + '月' + data[2] + '日'
  else if (type == 'yearMonthDayWeek') {
    time = data[0] + '年' + data[1] + '月' + data[2] + '日 ' + week[index]
  } else if (type == 'monthDayWeek') time = data[1] + '月' + data[2] + '日 ' + week[index]
  else time = data[1] + '月' + data[2] + '日'

  return time
}

const redirectTo = () => {
  if (type.value == 'scenic') {
    redirect({ url: '/addon/tourism/pages/scenic/detail', param: { scenic_id: detail.value.scenic_id } })
  } else if (type.value == 'way') {
    redirect({ url: '/addon/tourism/pages/way/detail', param: { way_id: detail.value.way_id, goods_id: detail.value.goods_id } })
  } else if (type.value == 'hotel') {
    redirect({ url: '/addon/tourism/pages/hotel/detail', param: { id: detail.value.hotel_id } })
  }
}
</script>
<style lang="scss" scoped>
.text-color {
  color: $u-primary;
}

.bg-color {
  background-color: $u-primary;
}

.bg-linear {
  background: linear-gradient(360deg, #f8f8f8 0%, $u-primary 100%);
}

.font-scale {
  transform: scale(0.9);
}

.triangle {
  @apply relative;

  &::after {
    content: '';
    @apply absolute;
    width: 0;
    height: 0;
    position: absolute;
    bottom: -40rpx;
    border: 20rpx solid #eef3ff;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
  }
}

:deep(.u-count-down__text) {
  font-size: 24rpx !important;
  color: #fff !important;
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
