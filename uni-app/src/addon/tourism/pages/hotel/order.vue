<template>
  <view :style="themeColor()">
    <view class="bg-[#f7f7f7] min-h-screen overflow-hidden" v-if="paymentData">
      <view class="chunk-wrap pb-2 pt-2">
        <view class="chunk-head h-[88rpx]">
          <text>{{ paymentData.goods_info.goods_name }}</text>
          <view class="text-[#797C8D] text-xs" @click="selectRoomTypeFn">
            <text class="!font-normal">房型详情</text>
            <text class="nc-iconfont nc-icon-youV6xx text-[26rpx]"></text>
          </view>
        </view>
        <view class="text-[26rpx] text-[#19293F] font-bold mt-3">{{ paymentData.start_time }} - {{ paymentData.end_time }} 共{{ paymentData.days }}晚</view>
        <view class="house-type">
          <text class="house-type-item" v-for="item in goodsAttribute">{{ item }}</text>
        </view>
        <view class="border-0 border-t border-solid border-[#F2F2F2] mt-2 h-[80rpx] flex items-center">
          <text class="nc-iconfont nc-icon-fengefuV6xx text-[#D1D7E0]"></text>
          <text class="text-xs">入住时间：14:00以后 离店时间：12:00以前</text>
        </view>
      </view>

      <view class="chunk-wrap">
        <view class="chunk-head">
          <text>入住信息</text>
        </view>
        <view class="py-2">
          <u--form labelPosition="left" ref="form1" labelWidth="90" :labelStyle="{ color: '#A3A3A3', fontSize: '14px' }">
            <u-form-item label="房间数" prop="userInfo.name" borderBottom @click="roomSelectShow = true">
              <view class="border-style relative">
                <view>{{ createData.num }}间</view>
                <view class="text-xs text-[#797C8D] absolute select-room">
                  <text>选择</text>
                  <text class="nc-iconfont nc-icon-youV6xx text-[26rpx]"></text>
                </view>
              </view>
            </u-form-item>
            <template v-for="index in createData.num">
              <u-form-item :label="createData.num > 1 ? '房间' + index : '入住人'" prop="userInfo.name" borderBottom>
                <view class="border-style">
                  <u--input
                    border="none"
                    placeholder="每间需要1位入住人姓名"
                    placeholderClass="text-sm"
                    v-model="createData.buyer_info[index - 1].name"
                  ></u--input>
                </view>
              </u-form-item>
            </template>
            <u-form-item label="手机号" prop="userInfo.name" borderBottom>
              <view class="border-style !border-0">
                <u--input border="none" placeholder="用于接收预订信息" placeholderClass="text-sm" v-model="createData.mobile" maxlength="11"></u--input>
              </view>
            </u-form-item>
          </u--form>
        </view>
      </view>

      <u-picker
        :show="roomSelectShow"
        :columns="roomNumList"
        keyName="label"
        :closeOnClickOverlay="true"
        @cancel="roomSelectShow = false"
        @confirm="updateNum"
        @close="roomSelectShow = false"
        :immediateChange="true"
      ></u-picker>

      <u-popup :show="detailPopupShow" @close="detailPopupShow = false">
        <view class="text-base font-bold flex justify-center items-center h-[96rpx] px-[26rpx] bg-[#fff] relative">
          <text class="text-[30rpx]">费用明细</text>
          <text
            class="iconfont iconguanbi text-[var(--text-color-light6)] absolute text-[32rpx] right-[26rpx]"
            style="font-size: 38rpx; color: #000"
            @click="detailPopupShow = false"
          ></text>
        </view>
        <scroll-view scroll-y="true" class="max-h-[40vh]">
          <view class="flex px-[30rpx] mt-[20rpx]">
            <view class="font-bold">总价</view>
            <view class="text-right flex-1 font-bold price-font">
              <text class="text-sm font-normal">￥</text>
              <text class="text-[38rpx]">{{ paymentData.order_money?.toFixed(2) }}</text>
            </view>
          </view>
          <view class="flex px-[30rpx] mt-[10rpx] text-sm text-gray-subtitle" v-for="(item, index) in paymentData.order_items">
            <view>{{ item.year }}-{{ item.month }}-{{ item.day }}</view>
            <view class="text-right flex-1">
              <text class="text-xs price-font">￥</text>
              <text class="price-font">{{ item.price }}</text>
              <text class="mx-[10rpx]">x</text>
              <text>{{ item.num }}</text>
            </view>
          </view>
          <view class="flex px-[30rpx] mt-[10rpx] text-sm text-gray-subtitle">
            <view>{{ createData.end_time }} 离店日</view>
            <view class="text-right flex-1"></view>
          </view>
        </scroll-view>
        <view class="h-[150rpx]"></view>
      </u-popup>

      <pay ref="payRef" @close="payClose"></pay>

      <view class="h-[148rpx] w-screen"></view>
      <view class="bg-white p-3 fixed bottom-0 left-0 right-0 flex items-center justify-between z-10 shadow">
        <view class="text-[#FA6400] text-xs">
          <text>总价</text>
          <text class="ml-[2rpx] price-font">￥</text>
          <text class="text-[38rpx] price-font">{{ paymentData.order_money?.toFixed(2) }}</text>
        </view>
        <view class="ml-auto mr-2" @click="detailPopupShow = !detailPopupShow">
          <text class="text-[#686868] text-xs mr-1">明细</text>
          <text class="nc-iconfont nc-icon-shangV6xx-1 text-[#C2C2C2] text-xs font-bold"></text>
        </view>
        <u-button
          text="提交订单"
          color="var(--primary-color)"
          shape="circle"
          :customStyle="{ lineHeight: '76rpx', margin: '0rpx', color: '#fff', width: '278rpx' }"
          type="primary"
          size="16"
          :loading="createLoading"
          @click="orderCreate"
        ></u-button>
      </view>

      <!-- 酒店房型详情 -->
      <u-popup :show="hotelType" mode="bottom" :round="10" @close="hotelType = false">
        <view class="flex flex-col rounded-t-3xl bg-[#f8f8f8] overflow-hidden relative z-10">
          <view class="text-base font-bold flex justify-between items-center h-[96rpx] px-[26rpx] bg-[#fff]">
            <text class="text-[30rpx]">{{ roomData.goods_name }}</text>
            <text class="iconfont iconguanbi text-[32rpx] text-[var(--text-color-light6)]" @click="hotelType = false"></text>
          </view>
          <scroll-view class="max-h-[60vh]" :scroll-y="true">
            <image :src="img(roomData.goods_cover)" class="w-[750rpx] h-[218]" mode="aspectFill" />
            <view class="px-4 bg-[#fff]">
              <view class="flex justify-between border-0 border-b-1 border-[#F2F2F2] border-solid px-1 py-4">
                <view class="flex flex-col items-center justify-center">
                  <text class="nc-iconfont nc-icon-chuangV6xx text-[36rpx] text-[#555] mb-1"></text>
                  <text class="text-xs font-bold">{{ roomData.room_bed || '双人床' }}</text>
                </view>
                <view class="flex flex-col items-center justify-center">
                  <text class="nc-iconfont nc-icon-loucengV6xx text-[36rpx] text-[#555] mb-1"></text>
                  <text class="text-xs font-bold">{{ roomData.room_floor || '1层' }}</text>
                </view>
                <view class="flex flex-col items-center justify-center">
                  <text class="nc-iconfont nc-icon-fangziV6xx text-[36rpx] text-[#555] mb-1"></text>
                  <text class="text-xs font-bold">{{ roomData.room_area || 0 }}㎡</text>
                </view>
                <view class="flex flex-col items-center justify-center">
                  <text class="nc-iconfont nc-icon-jiamengV6xx text-[36rpx] text-[#555] mb-1"></text>
                  <text class="text-xs font-bold">{{ roomData.room_stay || 1 }}人</text>
                </view>
                <view class="flex flex-col items-center justify-center">
                  <text class="nc-iconfont nc-icon-liebiaoV6xx text-[36rpx] text-[#555] mb-1"></text>
                  <text class="text-xs font-bold">{{ roomData.stock || 0 }}间</text>
                </view>
              </view>
              <view class="flex items-center my-4" v-if="roomData.goods_attribute">
                <text class="mr-2 text-sm">房间设施</text>
                <view>
                  <text
                    v-for="(item, index) in roomData.goods_attribute.split(',')"
                    :class="['mr-1 text-sm', { 'class-select': index < roomData.goods_attribute?.split(',')?.length - 1 }]"
                    >{{ item }}</text
                  >
                </view>
              </view>
            </view>
            <view class="mt-2 px-3 bg-[#fff]">
              <view class="border-0 border-b-1 border-[#F2F2F2] border-solid py-3 text-[30rpx] font-bold"> 房型详情 </view>
              <view class="py-3 px-1 scheduling-content">
                <u-parse :content="roomData.goods_content" :tagStyle="{ img: 'vertical-align: top;' }" v-if="roomData.goods_content"></u-parse>
                <view v-else>暂无房型详情</view>
              </view>
            </view>
          </scroll-view>
        </view>
      </u-popup>
    </view>
    <view class="w-screen h-screen flex flex-col justify-center items-center" v-if="error">
      <u-empty :icon="img('static/resource/images/order_empty.png')" :text="error" />
      <view class="w-[240rpx] mt-[40rpx]">
        <button class="bg-[var(--primary-color)] text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[28rpx]" @click="back">返回上一页</button>
      </view>
    </view>
    <loading-page :loading="loading"></loading-page>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, toRaw } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { hotelOrderConfirm, hotelOrderCalculate, hotelOrderCreate } from '@/addon/tourism/api/tourism'
  import { redirect, img } from '@/utils/common'
  import { useSubscribeMessage } from '@/hooks/useSubscribeMessage'

  const payRef = ref(null)
  const loading = ref(true)
  const error = ref('')
  const createData = ref<hotelOrderCreareOptions>(uni.getStorageSync('hotelCreateData') || {})
  const paymentData = ref<AnyObject | null>(null)
  const roomSelectShow = ref(false)
  const roomNumList = computed(() => {
    const list = []
    for (let i = 1; i <= paymentData.value.goods_info.stock; i++) {
      list.push({ label: `${i}间`, id: i })
    }
    return [list]
  })
  const detailPopupShow = ref(false)
  let hotelType = ref<boolean>(false)

  onLoad(() => {
    hotelOrderConfirm(createData.value)
      .then(({ data }) => {
        loading.value = false
        paymentData.value = data
        handleCreateData()
      })
      .catch((err) => {
        error.value = err.msg
        loading.value = false
      })
  })

  /**
   * 订单计算
   */
  const orderCalculate = () => {
    loading.value = true
    hotelOrderCalculate(createData.value)
      .then(({ data }) => {
        paymentData.value = data
        paymentData.value.start_time = timeFormat(paymentData.value?.start_time)
        paymentData.value.end_time = timeFormat(paymentData.value?.end_time)
        loading.value = false
      })
      .catch((err) => {
        loading.value = false
        uni.showToast({ title: err.msg, icon: 'none' })
      })
  }

  const createLoading = ref(false)
  const orderCreate = () => {
    if (createVerify()) {
      if (createLoading.value) return
      createLoading.value = true

      const data = uni.$u.deepClone(toRaw(createData.value))
      data.buyer_info = JSON.stringify(data.buyer_info)

      hotelOrderCreate(data)
        .then(({ data }) => {
          // 订阅消息
          useSubscribeMessage().request('tourism_order_pay,tourism_order_auto_close,tourism_order_use_remind')
          payRef.value?.open(data.trade_type, data.trade_id, `/addon/tourism/pages/order/detail?order_id=${data.trade_id}`)
          createLoading.value = false
        })
        .catch((err) => {
          createLoading.value = false
          uni.showToast({ title: err.msg, icon: 'none' })
        })
    }
  }

  const createVerify = () => {
    let res = true
    for (let i = 0; i < createData.value.buyer_info.length; i++) {
      const item = createData.value.buyer_info[i]
      if (uni.$u.test.isEmpty(item.name)) {
        res = false
        uni.showToast({ title: '请输入' + (i ? `房间${i + 1}的` : '') + '入住人姓名', icon: 'none' })
        break
      }
    }
    if (!res) return false

    let names = createData.value.buyer_info.map((item) => item.name)
    let nameSet = new Set(names)
    if (nameSet.size !== names.length) {
      uni.showToast({ title: '入住人姓名不能重复', icon: 'none' })
      return false
    }
    if (uni.$u.test.isEmpty(createData.value.mobile)) {
      uni.showToast({ title: '请输入手机号', icon: 'none' })
      return false
    }
    let mobile = /^1[3-9]\d{9}$/
    if (!mobile.test(createData.value.mobile)) {
      uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return false
    }

    return true
  }

  const handleCreateData = () => {
    createData.value.buyer_info = [{ name: '' }]
    createData.value.mobile = ''
    paymentData.value.start_time = timeFormat(paymentData.value?.start_time)
    paymentData.value.end_time = timeFormat(paymentData.value?.end_time)
  }

  const goodsAttribute = computed(() => {
    return paymentData.value ? paymentData.value.goods_info.goods_attribute.split(',') : []
  })

  const timeFormat = (date: string) => {
    const time = new Date(date)
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return uni.$u.timeFormat(time, 'mm月dd日 ') + week[time.getDay()]
  }

  /**
   * 改变房间数
   */
  const updateNum = (e: AnyObject) => {
    createData.value.num = e.value[0].id
    roomSelectShow.value = false
    for (let i = 0; i < createData.value.num; i++) {
      createData.value.buyer_info[i] == undefined && (createData.value.buyer_info[i] = { name: '' })
    }
    if (createData.value.buyer_info.length > createData.value.num)
      createData.value.buyer_info.splice(createData.value.num, createData.value.buyer_info.length - createData.value.num)
    orderCalculate()
  }

  const payClose = () => {
    redirect({ url: '/addon/tourism/pages/order/list', mode: 'redirectTo' })
  }

  // 房型详情
  let roomData = ref<Object<any>>({})
  const selectRoomTypeFn = () => {
    roomData.value = paymentData.value.goods_info
    hotelType.value = true
  }

  const back = () => {
    if (getCurrentPages().length > 1) {
      uni.navigateBack({
        delta: 1
      })
    } else {
      redirect({
        url: '/addon/tourism/pages/index',
        mode: 'reLaunch'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .text-color {
    color: $u-primary;
  }
  .chunk-wrap {
    @apply bg-white px-4 mb-2;
    .chunk-head {
      height: 84rpx;
      @apply flex justify-between items-center border-0 border-b border-solid border-[#F2F2F2] box-border;
      text {
        &:first-of-type {
          @apply font-bold;
        }
        .iconfont {
          @apply inline-block;
          margin-left: 2rpx;
        }
      }
    }
  }
  .border-style {
    @apply border-0 border-b-1 border-solid border-[#F2F2F2] '!rounded-none' py-2;
  }
  .chunk-wrap {
    :deep(.u-form-item__body) {
      flex: 1;
      padding: 0 !important;
      .u-form-item__body__right__content__slot > view {
        flex: 1;
      }
    }
  }
  .select-room {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .house-type {
    @apply flex mt-2;
    .house-type-item {
      color: #797c8d;
      @apply text-xs relative pr-3;
      &::after {
        content: '';
        @apply absolute;
        top: 50%;
        right: 12rpx;
        bottom: 0;
        transform: translateY(-50%);
        height: 60%;
        width: 2rpx;
        background-color: #797c8d;
      }
      &:last-of-type::after {
        background-color: transparent;
      }
    }
  }
  :deep(.scheduling-content img) {
    vertical-align: middle;
  }
</style>
