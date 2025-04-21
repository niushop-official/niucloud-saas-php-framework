<template>
  <view :style="themeColor()">
    <view class="bg-[#F6F8FA] min-h-screen overflow-hidden py-[20rpx] px-[24rpx]" v-if="orderData">
      <!-- 上门地址 -->
      <view class="flex items-center py-[24rpx] px-[24rpx] bg-[#fff] rounded" @click="toSelectAddress">
        <view class="flex-1 w-0">
          <view v-if="!$u.test.isEmpty(orderData.delivery.take_address)">
            <view class="font-500 text-[30rpx] mb-[10rpx]">
              {{ orderData.delivery.take_address.name }}
              <text class="text-[30rpx]">{{ mobileHide(orderData.delivery.take_address.mobile) }}</text>
            </view>
            <view class="text-[26rpx] text-gray-subtitle mt-[10rpx] leading-[40rpx] line-feed">{{ orderData.delivery.take_address.full_address }}</view>
          </view>
          <view v-else class="text-[26rpx]">{{ t('addHomeAddress') }}</view>
        </view>
        <text class="nc-iconfont nc-icon-youV6xx text-[26rpx] text-[var(--text-color-light6)]"></text>
      </view>
      <view class="outline-border" v-for="(item, index) in orderData.goods_data">
        <u--image width="168rpx" height="168rpx" :src="img(item.sku_image)" model="aspectFill">
          <template #error>
            <image class="w-[168rpx] h-[168rpx]" :src="img('static/resource/images/diy/shop_default.jpg')" mode="aspectFill" />
          </template>
        </u--image>
        <view class="flex flex-col py-1 flex-1 ml-[10rpx]">
          <view class="text-ellipsis text-[#333] text-[26rpx] leading-normal font-500">{{ item.goods.goods_name }}</view>
          <view class="flex justify-between mt-auto">
            <view class="text-[var(--price-text-color)] font-500 price-font">
              <text class="text-xs">￥</text>
              <text>{{ moneyFormat(item.price) }}</text>
            </view>
            <view class="font-500 text-sm"> <text class="text-[26rpx]">x</text>{{ item.num }} </view>
          </view>
        </view>
      </view>
      <view class="bg-[#fff] mt-4 p-3 rounded-lg">
        <!-- 预约技师 -->
        <view class="flex justify-between items-center box-border py-[24rpx]">
          <view class="flex-align">
            <text class="text-[28rpx] text-[#4D4D4D] font-bold nc-iconfont nc-icon-qiuzhirenyuanV6xx1"></text>
            <text class="text-[28rpx] ml-2">{{ t('selectiveTechnician') }}</text>
          </view>
          <view class="flex-align text-[#63676D]" @click="userShow = true">
            <view class="text-[28rpx] ml-2 text-right">{{ createData.technician_name ? createData.technician_name : t('selectiveTechnician') }}</view>
            <text class="text-[26rpx] text-[var(--text-color-light6)] nc-iconfont nc-icon-youV6xx"></text>
          </view>
        </view>

       <u-picker :show="userShow" :columns="userList" keyName="label"  :closeOnClickOverlay="true" @confirm="userConfirmFn" @cancel="userShow = false"  @close="userShow = false"></u-picker>

        <!-- 预约时间 -->
        <view class="flex justify-between items-center box-border py-[24rpx]">
          <view class="flex-align">
            <text class="text-[28rpx] text-[#4D4D4D] font-bold nc-iconfont nc-icon-a-shijianV6xx-36"></text>
            <text class="text-[28rpx] ml-2">{{ t('addHomeTime') }}</text>
          </view>
          <view class="flex-align text-[#63676D]" @click="handleTime">
            <view class="text-[28rpx] ml-2 text-right">{{ createData.reserve_service_time ? createData.reserve_service_time : t('selectAddTimePlaceholder') }}</view>
            <text class="text-[26rpx] text-[var(--text-color-light6)] nc-iconfont nc-icon-youV6xx"></text>
          </view>
        </view>
        <ns-select-time
          ref="selectTime" :rules="service_time"  :isQuantum="true"  @change="getTime" @getStamp="getStamp" v-if="Object.keys(service_time).length"></ns-select-time>
        <!-- 备注 -->
        <view class="flex justify-between items-center box-border py-[24rpx]">
          <text class="text-[28rpx]">{{ t('buysMessage') }}</text>
          <view class="flex-align text-[#63676D]">
            <input class="uni-input text-[28rpx] ml-2 text-right" :placeholder="t('messagePlaceholder')" v-model="createData.member_remark" />
          </view>
        </view>
      </view>
      <view class="mt-[20rpx] p-[24rpx] rounded-md bg-white">
        <view class="flex font-500 py-[10rpx]">
          <view class="text-[28rpx] w-[150rpx]">{{ t('goodsMoney') }}</view>
          <view class="flex-1 w-0 text-right text-[var(--price-text-color)] price-font">
            <text class="text-[24rpx]">￥</text>
            <text>{{ moneyFormat(orderData.basic.goods_money) }}</text>
          </view>
        </view>
      </view>
      <view class="h-[148rpx] w-screen"></view>
      <u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
        <view class="flex-1 flex items-center justify-between">
          <view class="whitespace-nowrap px-[30rpx] text-color font-600 leading-[45rpx]">
            <text class="text-[#333333] text-[26rpx]">{{ t('total') }}</text>
            <text class="text-[24rpx] font-500 text-[var(--price-text-color)] price-font">￥</text>
            <text class="text-[34rpx] mr-[10rpx] font-500 text-[var(--price-text-color)] price-font">{{ moneyFormat(orderData.basic.order_money) }}</text>
          </view>
          <button class="!px-[40rpx] !h-[60rpx] text-[28rpx] mr-[30rpx] leading-[60rpx] rounded-full text-white bg-[var(--primary-color)]" @click="create">{{ t('submit') }}</button>
        </view>
      </u-tabbar>

      <pay ref="payRef" @close="payClose"></pay>
    </view>
    <!-- <loading-page :loading="loading"></loading-page> -->
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad, onShow } from '@dcloudio/uni-app'
  import { img, redirect, urlDeconstruction, moneyFormat, mobileHide, isWeixinBrowser } from '@/utils/common'
  import { getTechnicianGoods } from '@/addon/o2o/api/technician'
  import { orderCalculate, orderCreate } from '@/addon/o2o/api/order'
  import { getReserveConfig } from '@/addon/o2o/api/goods'
  import { t } from '@/locale'
  import useMemberStore from '@/stores/member'
  import { cloneDeep } from 'lodash-es'
  import nsSelectTime from '@/addon/o2o/components/ns-select-time'
  import { wechatSync } from '@/app/api/system'

  const loading = ref<boolean>(false)
  const userList = ref([[]]); // 技师列表
  const userShow = ref(false) // 控制技师列表
  const service_time = ref({}) //获取配置时间
  const orderData = ref(null)
  const createLoading = ref(false)
  // 向订单计算提交
  const createData = ref({
    order_key: '',
    technician_id: '',
    technician_name: '默认分配',
    reserve_service_time: '',
    reserve_service_time_stamp: '',
    member_remark: '',
    delivery: {
      take_address_id: ''
    }
  })
  uni.getStorageSync('o2oCreateData') && Object.assign(createData.value, uni.getStorageSync('o2oCreateData'))
  const goodsId = ref('')
  onLoad((option) => {
    goodsId.value = option.id
    getTechnicianGoodsFn(option.id)
    getReserveConfigFn()
  })

 // 获取默认分配技师
  const getTechnicianGoodsFn = (id) => {
    loading.value = true
    getTechnicianGoods(id)
      .then((res) => {
        userList.value[0].push({ label: '默认分配', id: '' })
        res.data.forEach((item, index) => {
          let obj = {}
          obj.label = item.name
          obj.id = item.id
          userList.value[0].push(obj)
          loading.value = false
        })
      })
      .catch(() => {
        loading.value = false
      })
  }

  // 获取选择时间计算
  const getReserveConfigFn = () => {
    getReserveConfig().then((res) => {
      service_time.value = res.data
    })
  }
  // 选择技师列表
  const userConfirmFn = (data) => {
    createData.value.technician_id = data.value[0].id
    createData.value.technician_name = data.value[0].label
    calculate()
    userShow.value = false
  }
  // 选择地址之后跳转回来
  const selectAddress = uni.getStorageSync('selectAddressCallback')
  if (selectAddress) {
    createData.value.delivery.take_address_id = selectAddress.address_id
    uni.removeStorage({ key: 'selectAddressCallback' })
  }

  /**
   * 选择地址
   */
  const toSelectAddress = () => {
    uni.setStorage({
      key: 'selectAddressCallback',
      data: {
        back: `/addon/o2o/pages/order/payment?id=${goodsId.value}`
      },
      success() {
        redirect({ url: '/addon/o2o/pages/address/index' })
      }
    })
  }

  // 验证地址方法
  const createVerify = () => {
    if (!orderData.value.delivery.take_address) {
      uni.showToast({ title: '请选择上门地址', icon: 'none' })
      return false
    }
    return true
  }

  // 验证上门时间
  const timeVerify = () => {
    if (!createData.value.reserve_service_time) {
      uni.showToast({ title: '请选择上门时间', icon: 'none' })
      return false
    }
    return true
  }

  /**
   * 订单计算
   */
  const calculate = () => {
    let data = cloneDeep(createData.value)
    data.sku = JSON.stringify(data.sku)
    orderCalculate(data).then((res) => {
        orderData.value = res.data
        createData.value.order_key = res.data.order_key
      }).catch(() => {})
  }
  calculate()

  let orderId = 0
  // 支付
  const payRef = ref(null)
  /**
   * 订单创建
   */
  const create = () => {
    if (!createVerify() || !timeVerify() || createLoading.value) return
    createLoading.value = true
    let data = cloneDeep(createData.value)
    orderCreate(data).then(({ data }) => {
        orderId = data.order_id
        if (orderData.value.basic.order_money == 0) {
          redirect({ url: '/addon/o2o/pages/order/detail', param: { order_id: orderId }, mode: 'redirectTo' })
        } else {
          payRef.value?.open(data.trade_type, data.order_id, `/addon/o2o/pages/order/detail?order_id=${data.order_id}`)
        }
      }).catch(() => {
        createLoading.value = false
      })
  }

  const selectTime = ref(null)
  const handleTime = () => {
    selectTime.value.show = true
  }
  // 时间(月日时间段)
  const getTime = (e) => {
    createData.value.reserve_service_time = e
    calculate()
  }
  // 时间(年-月-日)
  const getStamp = (e) => {
    createData.value.reserve_service_time_stamp = new Date(e).getTime() / 1000
  }
  /**
   * 支付弹窗关闭
   */
  const payClose = () => {
    redirect({ url: '/addon/o2o/pages/order/detail', param: { order_id: orderId }, mode: 'redirectTo' })
  }

  // 会员信息
  const memberStore = useMemberStore()

  // #ifdef H5
  const { query } = urlDeconstruction(location.href)
  if (query.code && isWeixinBrowser()) {
    wechatSync({ code: query.code }).then((res) => {
      memberStore.getMemberInfo()
    })
  }
  // #endif
</script>

<style lang="scss" scoped>
  .text-color {
    color: $u-primary;
  }

  .bg-color {
    background-color: $u-primary;
  }

  .text-scale {
    transform: scale(0.8);
  }

  .outline-border {
    @apply flex bg-[#fff] rounded-lg  mt-4 p-3;
  }

  .flex-justify {
    width: calc(100% - 48rpx);
    @apply flex justify-between items-center box-border;
  }

  .flex-align {
    @apply flex items-center;
  }

  uni-button:after {
    border: none !important;
  }
  .time-picker :deep(.uni-icons) {
    display: none;
  }
  .time-picker :deep(.uni-calendar-item--checked) {
    background-color: var(--primary-color);
  }
  .time-picker :deep(.uni-datetime-picker--btn) {
    background-color: var(--primary-color);
  }
  .line-feed {
    word-wrap: break-word;
    word-break: break-all;
  }
</style>
