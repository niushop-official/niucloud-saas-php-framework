<template>
  <view :style="themeColor()">
    <template v-if="!loading">
      <view v-if="detail" class="bg-[#f7f7f7] min-h-screen overflow-hidden">
        <view class="bg-linear h-[480rpx] text-white px-3 pt-5">
          <view class="text-[42rpx] flex items-baseline text-[#fff]">
            <text class="nc-iconfont nc-icon-a-shijianV6xx-36 text-[42rpx] mr-1"></text>
            <text class="font-bold">{{ t('order') }}{{ detail?.order_status_info?.name }}</text>
          </view>
        </view>
        <view class="bg-[#fff] mx-3 p-[30rpx] -mt-[360rpx] rounded-[10rpx]">
          <view class="flex">
            <view class="min-w-[50rpx] flex items-center justify-center">
              <u-icon name="map" size="20"></u-icon>
            </view>
            <view class="flex flex-col ml-[20rpx]">
              <text class="text-[24rpx] mt-[10rpx] leading-[35rpx] line-feed">{{ detail.taker_full_address }}</text>
              <view>
                <text class="text-[24rpx]">{{ detail.taker_name }}</text>
                <text class="text-[24rpx] mt-[15rpx]">{{ detail.taker_mobile }}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="flex py-4 px-3 bg-white rounded-md box-border mx-3 mt-[20rpx] task-steps" v-if="detail.pay_time">
          <u-steps :current="current" activeColor="var(--primary-color)">
            <u-steps-item :title="t('placeOrder')" :desc="detail.create_time ? dataTurnTime(detail.create_time) : '---'"></u-steps-item>
            <u-steps-item :title="t('takeOrders')" :desc="detail.dispatch_time ? dataTurnTime(detail.dispatch_time) : '---'"></u-steps-item>
            <u-steps-item :title="t('start')" :desc="detail.service_time ? dataTurnTime(detail.service_time) : '---'"></u-steps-item>
            <u-steps-item :title="t('finish')" :desc="detail.finish_time ? dataTurnTime(detail.finish_time) : '---'"></u-steps-item>
          </u-steps>
        </view>
        <view class="mt-[20rpx]">
          <view class="bg-[#fff] mx-[30rpx] p-[30rpx] rounded-[10rpx]">
            <view class="order-goods-item py-[20rpx]" v-for="(goodsItem, goodsIndex) in detail.item" :key="goodsIndex">
              <view class="flex justify-between items-center" @click="toLink(goodsItem)">
                <view class="w-[160rpx] h-[160rpx] flex-2">
                  <u--image
                    class="rounded-[10rpx] overflow-hidden"
                    width="160rpx"
                    height="160rpx"
                    :src="img(goodsItem.item_image ? goodsItem.item_image : '')"
                    model="aspectFill">
                    <template #error>
                      <u-icon name="photo" color="#999" size="50"></u-icon>
                    </template>
                  </u--image>
                </view>
                <view class="ml-[20rpx] flex-1">
                  <view class="flex justify-between">
                    <text class="text-[28rpx] text-item leading-[40rpx] w-[360rpx]">{{ goodsItem.item_name }}</text>
                    <!-- <text class="text-[28rpx] text-item leading-[40rpx] max-h-[80rpx] w-[360rpx] multi-hidden">{{ goodsItem.item_name}}</text> -->
                    <text class="shrink-0 text-[24rpx] text-[var(--primary-color)] ml-[10rpx] leading-[40rpx]">{{ goodsItem.pay_time ? t('havePaid') : t('notPaid') }}</text>
                  </view>
                  <view class="text-[24rpx] mt-[20rpx] flex">
                    <text class="text-[var(--primary-color)] rounded-[6rpx] py-[6rpx] bg-[var(--primary-color-light)] px-[10rpx]">{{ goodsItem.item_type_name }}</text>
                  </view>
                  <view class="flex justify-between mt-[26rpx] items-center">
                    <text class="text-right text-[28rpx] text-[var(--price-text-color)] price-font">￥{{ goodsItem.price }}</text>
                    <text class="text-right text-sm"><text class="text-[26rpx]">x</text>{{ goodsItem.num }}</text>
                  </view>
                </view>
              </view>
              <view class="flex justify-end self-end w-[100%] mt-[10rpx]">
                <view v-if="goodsItem.refund_no && goodsItem.refund_status != '' && goodsItem.refund_status != 'cancel'"
                  class="text-[26rpx] leading-[56rpx] px-[30rpx] border-[3rpx] border-solid border-[#999] rounded-full ml-[10rpx]"
                  @click="redirect({ url: '/addon/o2o/pages/refund/detail', param: { refund_no: goodsItem.refund_no } })"
                  >{{ t('viewRefund') }}</view>
                <view
                  v-if="detail.order_status_info.is_refund && goodsItem.is_enable_refund && ['', 'cancel'].indexOf(goodsItem.refund_status) != -1"
                  class="text-[26rpx] leading-[56rpx] px-[30rpx] border-[3rpx] border-solid border-[#999] rounded-full ml-[10rpx]"
                  @click="refundApplyFn(goodsItem.order_item_id)"
                  >{{ t('applyRefund') }}</view>
                <template v-if="goodsItem.item_type == 'custom'">
                  <view v-if="!goodsItem.pay_time"
                    class="text-[26rpx] leading-[56rpx] px-[30rpx] border-[3rpx] border-solid border-[#999] rounded-full ml-[10rpx]"
                    @click="orderBtnFn('item_pay', goodsItem)"
                    >{{ t('goToPay') }}</view>
                  <view
                    class="text-[26rpx] leading-[56rpx] px-[30rpx] border-[3rpx] border-solid border-[#999] rounded-full ml-[10rpx]"
                    @click="showServiceFn(goodsItem)"
                    >{{ t('show') }}</view>
                </template>
              </view>
            </view>
          </view>
          <view class="bg-[#fff] mx-[30rpx] p-[30rpx] mt-[30rpx] rounded-[10rpx]" v-if="detail.check_code">
            <view v-if="detail.technician_id" class="flex justify-between text-[28rpx] border-top-[2rpx] border-[solid] border-[#f1f1f1]">
              <view>{{ t('servicePersonal') }}</view>
              <view
                class="text-[var(--text-color-light9)]"
                @click="redirect({ url: '/addon/o2o/pages/technician/detail', param: { id: detail.technician_id } })"
                >{{ detail.technician_id ? detail.technician_info.name : t('orderToBeSent') }}</view>
            </view>
            <view v-if="detail.technician_id" class="flex justify-between text-[28rpx] border-top-[2rpx] border-[solid] border-[#f1f1f1] mt-[30rpx]">
              <view>{{ t('contactNumber') }}</view>
              <view class="text-[var(--text-color-light9)]" @click="callPhoto(detail.technician_info.mobile)">{{ detail.technician_info.mobile }}</view>
            </view>
            <view class="flex justify-between text-[28rpx] mt-[30rpx]">
              <text>{{ t('serviceCode') }}</text>
              <text class="text-primary font-500 text-[32rpx]">{{ detail.check_code }}</text>
            </view>
            <view class="text-[20rpx] mt-[20rpx] text-[var(--text-color-light9)]">{{ t('explain') }}</view>
          </view>
          <view class="bg-[#fff] mx-[30rpx] p-[30rpx] mt-[30rpx] rounded-[10rpx]">
            <view class="flex justify-between text-[28rpx] border-top-[2rpx] border-[solid] border-[#f1f1f1] mt-[30rpx]">
              <view>{{ t('onOrder') }}</view>
              <view>{{ detail.order_no }}</view>
            </view>
            <view v-if="detail.out_trade_no" class="flex justify-between text-[28rpx] border-top-[2rpx] border-[solid] border-[#f1f1f1] mt-[30rpx]">
              <view>{{ t('transactionNumber') }}</view>
              <view>{{ detail.out_trade_no }}</view>
            </view>
            <view class="flex justify-between text-[28rpx] border-top-[2rpx] border-[solid] border-[#f1f1f1] mt-[30rpx]">
              <view>{{ t('createTime') }}</view>
              <view>{{ detail.create_time }}</view>
            </view>
            <view class="flex justify-between text-[28rpx] border-top-[2rpx] border-[solid] border-[#f1f1f1] mt-[30rpx]">
              <view>{{ t('reserveServiceTime') }}</view>
              <view>{{ detail.reserve_service_time }}</view>
            </view>
            <view class="flex justify-between text-[28rpx] border-top-[2rpx] border-[solid] border-[#f1f1f1] mt-[30rpx] box-border">
              <view class="shrink-0 mr-[18rpx] whitespace-pre">{{ t('remark') }}</view>
              <view class="max-w-[510rpx] leading-[38rpx] line-feed text-right">{{ detail.member_message ? detail.member_message : '无' }}</view>
            </view>
            <view v-if="detail.pay" class="flex justify-between text-[28rpx] border-top-[2rpx] border-[solid] border-[#f1f1f1] mt-[30rpx] mb-[18rpx]">
              <view>{{ t('modePayment') }}</view>
              <view>{{ detail.pay.type_name }}</view>
            </view>
            <view v-if="detail.pay && detail.member_id !== detail.pay.main_id && detail.pay.status == 2" class="flex justify-end">
              <view class="friend-pay relative px-[20rpx] py-[12rpx] bg-[#F2F2F2] rounded-[10rpx] flex items-center">
                <u-avatar
                  :src="img(detail.pay.pay_member_headimg)"
                  size="20"
                  leftIcon="none"
                  :default-url="img('static/resource/images/default_headimg.png')" />
                <text class="ml-[14rpx] text-[24rpx] using-hidden">{{ detail.pay.pay_member }}{{ t('helpPay') }}</text>
              </view>
            </view>
            <view v-if="detail.pay" class="flex justify-between text-[28rpx] border-top-[2rpx] border-[solid] border-[#f1f1f1] mt-[30rpx]">
              <view>{{ t('payTime') }}</view>
              <view>{{ detail.pay.pay_time }}</view>
            </view>
          </view>
          <view class="bg-[#fff] mx-[30rpx] p-[30rpx] mt-[30rpx] rounded-[10rpx]">
            <view class="flex justify-between text-[28rpx] pt-[20rpx] border-top-[2rpx] border-[solid] border-[#f1f1f1]">
              <view>{{ t('goodsMoney') }}</view>
              <view class="text-[var(--price-text-color)] price-font">￥{{ detail.total_money }}</view>
            </view>
            <view class="flex justify-between text-[28rpx] border-top-[2rpx] border-[solid] border-[#f1f1f1] mt-[40rpx]">
              <view>{{ t('realMoney') }}</view>
              <view class="text-[var(--price-text-color)] price-font">￥{{ detail.total_pay_money }}</view>
            </view>
          </view>
        </view>
        <view class="h-[160rpx] w-full"></view>
        <view class="flex z-2 justify-between items-center bg-[#fff] fixed left-0 right-0 bottom-0 min-h-[100rpx] px-1 flex-wrap pb-ios">
          <view class="flex ml-[30rpx] w-[70rpx] flex-col justify-center items-center" @click="orderBtnFn('index')">
            <text class="nc-iconfont nc-icon-shouye-xiaolianV6xx text-[36rpx]"></text>
            <text class="text-xs mt-1">{{ t('index') }}</text>
          </view>
          <view class="flex justify-end mr-[30rpx]" v-if="detail.order_status_info">
            <view
              v-for="(btnItem, btnIndex) in detail.order_status_info.member_action"
              :key="btnIndex"
              class="inline-block text-[26rpx] leading-[56rpx] px-[30rpx] border-[3rpx] border-solid border-[#999] rounded-full ml-[10rpx]"
              @click="orderBtnFn(btnItem.key)"
              >{{ btnItem.name }}</view>
          </view>
        </view>
      </view>
      <view class="w-screen h-screen flex flex-col justify-center items-center" v-else>
        <u-empty :icon="img('static/resource/images/order_empty.png')" text="未获取到订单信息" />
      </view>
      <!-- 刷新 -->
      <view
        class="fixed bottom-[calc(160rpx+env(safe-area-inset-bottom))] right-[30rpx] rounded-full bg-[#fff] w-[80rpx] h-[80rpx] flex flex-col items-center justify-center shadow-xl"
        @click="getDetail">
        <text class="nc-iconfont nc-icon-shuaxinV6xx text-[36rpx]"></text>
        <text class="text-[22rpx] mt-[6rpx]">{{ t('refresh') }}</text>
      </view>
    </template>
    <pay ref="payRef"></pay>
    <loading-page :loading="loading"></loading-page>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { img, redirect } from '@/utils/common'
  import { getOrderDetail, cancelOrder, deleteOrder } from '@/addon/o2o/api/order'
  import { t } from '@/locale'
  import useConfigStore from '@/stores/config'

  let orderId = 0
  const detail = ref<AnyObject | null>(null)
  const loading = ref(false)

  onLoad((option: any) => {
    orderId = option.order_id || 0
    getOrderDetailFu()
  })

  // 订单详情
  const getOrderDetailFu = () => {
      loading.value = true
      getOrderDetail(orderId).then((res) => {
          detail.value = res.data
          loading.value = false
          getStatus()
      }).catch(() => {
          loading.value = false
      })
  }

  const getDetail = () => {
      getOrderDetail(orderId).then((res) => {
          detail.value = res.data
          getStatus()
      }).catch(() => {
      })
  }

  // 支付
  const payRef = ref(null)
  const orderBtnFn = (type = '', data = '') => {
    if (type == 'pay') {
      payRef.value?.open(detail.value.order_type, detail.value.order_id, `/addon/o2o/pages/order/detail?order_id=${detail.value.order_id}`)
    } else if (type == 'item_pay') {
      payRef.value?.open('o2o_item', data.order_item_id, `/addon/o2o/pages/order/detail?order_id=${detail.value.order_id}`)
    } else if (type == 'cancel') {
      cancel(detail.value)
    } else if (type == 'delete') {
      deleteFn(detail.value)
    } else if (type == 'index') {
      redirect({
        url: '/addon/o2o/pages/index',
        mode: 'reLaunch'
      })
    }
  }

  // 取消订单
  const cancel = (item: any) => {
    uni.showModal({
      title: '提示',
      content: '您确定要取消该订单吗？',
      confirmColor: useConfigStore().themeColor['--primary-color'],
      success: (res) => {
        if (res.confirm) {
          cancelOrder(item.order_id).then((res) => {
            getOrderDetailFu()
          })
        }
      }
    })
  }

  // 删除订单
  const deleteFn = (data: any) => {
    uni.showModal({
      title: '提示',
      content: '您确定要删除该订单吗？',
      confirmColor: useConfigStore().themeColor['--primary-color'],
      success: (res) => {
        if (res.confirm) {
          deleteOrder(data.order_id)
            .then((res) => {
              redirect({ url: '/addon/o2o/pages/order/list' })
            })
            .catch(() => {})
        }
      }
    })
  }

  // 申请退款
  const refundApplyFn = (orderItemId) => {
    redirect({
      url: '/addon/o2o/pages/refund/apply',
      param: {
        order_id: detail.value.order_id,
        order_item_id: orderItemId
      }
    })
  }

  // 导航
  // const getAddress = () => {
  // 	uni.openLocation({
  // 		latitude: Number(detail.value.taker_latitude),
  // 		longitude: Number(detail.value.taker_longitude),
  // 		success: function () { }
  // 	});
  // }

  // 日期格式转成月日时分
  function dataTurnTime(timeStamp) {
    var time = new Date(timeStamp).getTime()
    if (time != undefined && time != '' && time > 0) {
      var date = new Date()
      date.setTime(time)
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      return m + '-' + d + ' ' + h + ':' + minute
    } else {
      return ''
    }
  }

  // 判断当前步骤条的状态
  const current = ref(0)
  function getStatus() {
    if (detail.value.order_status_info.status == 'dispatch') {
      return (current.value = 0)
    } else if (detail.value.order_status_info.status == 'wait_service') {
      return (current.value = 1)
    } else if (detail.value.order_status_info.status == 'in_service') {
      return (current.value = 2)
    } else if (detail.value.order_status_info.status == 'finish') {
      return (current.value = 3)
    }
  }

  // 跳转项目详情
  const toLink = (data: any) => {
    if (data.item_type == 'reservation' || data.item_type == 'buy') {
      redirect({
        url: `/addon/o2o/pages/goods/detail`,
        param: {
          sku_id: data.item_id
        }
      })
    }
  }

  // 联系技师
  const callPhoto = (tel) => {
    uni.makePhoneCall({
      phoneNumber: tel
    })
  }

  // 查看服务项
  const showServiceFn = (data) => {
    redirect({
      url: '/addon/o2o/pages/master/task/show',
      param: { order_id: data.order_id, order_item_id: data.order_item_id, item_name: data.item_name, price: data.item_money, item_images: data.item_images }
    })
  }
</script>

<style lang="scss" scoped>
  .bg-linear {
    background: linear-gradient(360deg, #f8f8f8 0%, $u-primary 100%);
  }
  .task-steps :deep(.u-text) {
    justify-content: center !important;
  }
  .line-feed {
    word-wrap: break-word;
    word-break: break-all;
  }
  .friend-pay {
    &::after {
      content: '';
      display: block;
      width: 20rpx;
      height: 20rpx;
      background-color: #f2f2f2;
      position: absolute;
      right: 30rpx;
      top: 0;
      transform: translateY(-50%) rotate(45deg);
      border-radius: 4rpx;
    }
  }
</style>
