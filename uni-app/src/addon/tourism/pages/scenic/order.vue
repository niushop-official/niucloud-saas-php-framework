<template>
  <view class="bg-[#f7f7f7] min-h-screen overflow-hidden" v-if="paymentData" :style="themeColor()">
    <view class="chunk-wrap pb-2 pt-4">
      <view class="font-bold">{{ paymentData.goods_info.goods_name }}</view>
      <view class="mt-4">
        <view class="font-bold text-[30rpx]">选择日期</view>
        <view class="flex pt-[28rpx] pb-[24rpx]">
          <view
            :class="[
              'relative flex flex-col items-center justify-center w-[130rpx] h-[142rpx] border-1 border-solid border-[#F0F0F0] mr-[14rpx] text-sm rounded',
              { 'border-color': index == departureDateSelect, 'border-[#F0F0F0]': index != departureDateSelect }
            ]"
            v-for="(item, index) in departureDate"
            @click="departureDateFn(item, index)"
          >
            <view
              class="absolute bottom-[0] right-[0] bg-[var(--primary-color)] rounded-tl-[16rpx] flex items-center justify-center leading-[1] px-[2rpx] pt-[4rpx]"
              v-if="index == departureDateSelect"
            >
              <text class="nc-iconfont nc-icon-duihaoV6xx-1 text-[#fff] text-[28rpx]"></text>
            </view>
            <text class="text-[#9B9B9B] text-xs">{{ item.topInfo }}</text>
            <text class="mt-[4rpx]">{{ item.centerInfo }}</text>
            <text class="text-[#FA6400] text-xs" v-if="item.bottomInfo">{{ item.bottomInfo }}</text>
          </view>
          <view
            class="relative flex flex-col items-center justify-center w-[130rpx] h-[142rpx] border-1 border-solid border-[#F8F8F8] text-sm rounded bg-[#F8F8F8]"
            @click="scenicShow = true"
          >
            <text class="nc-iconfont nc-icon-a-riliV6xx-36 text-[44rpx] text-[#707070]"></text>
            <text class="text-xs text-[#9B9B9B] mt-[4rpx]">更多</text>
          </view>
        </view>
      </view>
      <view class="flex items-center justify-between mt-2 bg-[#FFF8DC] py-[16rpx] px-[18rpx] rounded-md">
        <text class="text-xs text-[#7A5238]">{{ Number(scenicRefund) ? '随时可退' : '购买后不可退款' }}</text>
        <view class="flex items-center text-[#7A5238] text-xs" @click="buyInfoShow = true">
          <text>购买须知</text>
          <text class="nc-iconfont nc-icon-youV6xx text-[26rpx]"></text>
        </view>
      </view>
      <view class="flex justify-between items-center mt-3">
        <text class="text-[30rpx] font-bold">购买数量</text>
        <u-number-box v-model="createData.num" :max="paymentData.goods_info.stock" @change="valChange"></u-number-box>
      </view>
    </view>
    <!-- 购买须知弹窗 -->
    <u-popup :show="buyInfoShow" @close="buyInfoShow = false" :closeable="true">
      <view class="text-center py-[30rpx] font-bold leading-none">
        <text>购买须知</text>
      </view>
      <view class="pt-[28rpx] pb-[40rpx] px-[28rpx]">
        <scroll-view class="max-h-[60vh]" :scroll-y="true">
          <u-parse :content="buyInfoContent" :tagStyle="{ img: 'vertical-align: top;' }" v-if="buyInfoContent"></u-parse>
          <text v-else class="block px-5">暂无购买须知</text>
        </scroll-view>
      </view>
    </u-popup>

    <!-- <view class="chunk-wrap">
			<view class="chunk-head">
				<text>游客1信息</text>
				<view class="text-xs">需填写<text class="text-[#FF2F11]">1</text>位，用于入园身份验证</view>
			</view>
			<view class="py-2">
				<view class="flex my-2">
					<view class="w-[164rpx] h-[80rpx] rounded-md border-1 border-solid border-[#F0F0F0] relative flex items-center justify-center mr-2 select-box-color text-[#222]">
						<text class="text-sm">吴优</text>
						<text class="iconfont iconxuanze1 absolute -right-[2rpx] -bottom-[2rpx]"></text>
					</view>
					<view class="w-[164rpx] h-[80rpx] rounded-md border-1 border-solid border-[#F0F0F0] relative flex items-center justify-center mr-2 text-[#222]">
						<text class="text-sm">胡歌</text>
						<text class="iconfont iconxuanze1 absolute -right-[2rpx] -bottom-[2rpx]"></text>
					</view>
					<view class="w-[164rpx] h-[80rpx] rounded-md border-1 border-solid border-[#F0F0F0] relative flex items-center justify-center text-[#222]">
						<text class="text-sm">新增</text>
						<text class="nc-iconfont nc-icon-youV6xx text-[26rpx]"></text>
					</view>
				</view>
				<u--form labelPosition="left" ref="form1" labelWidth="70" :labelStyle="{color: '#A3A3A3', fontSize: '14px'}">
					<u-form-item label="联系姓名" prop="userInfo.name" borderBottom>
						<view class="border-style">
							<u--input border="none" placeholder="请输入联系姓名" placeholderClass="text-sm" v-model="createData.buyer_info.name"></u--input>
						</view>
					</u-form-item>
					<u-form-item label="手机号" prop="userInfo.name" borderBottom>
						<view class="border-style">
							<u--input border="none" placeholder="请输入手机号" placeholderClass="text-sm" v-model="createData.mobile"></u--input>
						</view>
					</u-form-item>
					<u-form-item label="证件类型" borderBottom>
						<view class="border-style">
							<text class="text-sm">身份证</text>
						</view>
					</u-form-item>
					<u-form-item label="证件号" prop="userInfo.name" borderBottom>
						<view class="border-style !border-0">
							<u--input border="none" placeholder="请输入证件号" placeholderClass="text-sm"  v-model="createData.buyer_info.id_card"></u--input>
						</view>
					</u-form-item>
				</u--form>
			</view>
		</view> -->
    <template v-for="index in createData.num">
      <view class="chunk-wrap">
        <view class="chunk-head">
          <text>游客{{ index }}信息</text>
        </view>
        <view class="py-2">
          <u--form labelPosition="left" ref="form1" labelWidth="70" :labelStyle="{ color: '#A3A3A3', fontSize: '14px' }">
            <u-form-item label="联系姓名" prop="userInfo.name" borderBottom>
              <view class="border-style">
                <u--input border="none" placeholder="请输入联系姓名" placeholderClass="text-sm" v-model="createData.buyer_info[index - 1].name"></u--input>
              </view>
            </u-form-item>
            <u-form-item label="手机号" prop="userInfo.name" borderBottom v-if="index == 1">
              <view class="border-style">
                <u--input border="none" type="number" placeholder="请输入手机号" placeholderClass="text-sm" v-model="createData.mobile" maxlength="11"></u--input>
              </view>
            </u-form-item>
            <u-form-item label="证件类型" borderBottom>
              <view class="border-style">
                <text class="text-sm">身份证</text>
              </view>
            </u-form-item>
            <u-form-item label="证件号" prop="userInfo.name" borderBottom>
              <view class="border-style !border-0">
                <u--input
                  border="none"
                  type="idcard"
                  placeholder="请输入证件号"
                  placeholderClass="text-sm"
                  maxlength="18"
                  v-model="createData.buyer_info[index - 1].id_card"
                ></u--input>
              </view>
            </u-form-item>
          </u--form>
        </view>
      </view>
    </template>

    <!-- <view class="chunk-wrap">
			<view class="chunk-head">
				<text>支付方式</text>
			</view>
			<view class="flex justify-between items-center h-[80rpx]">
				<view class="flex items-center">
					<image class="w-[42rpx] h-[42rpx]" :src="img('addon/tourism/tourism/way/discount_coupon.png')" mode="widthFix" />
					<text class="ml-1 text-xs">微信支付</text>
				</view>
				<u-radio :labelDisabled="true"></u-radio>
			</view>
		</view>
		<view class="chunk-wrap">
			<view class="chunk-head">
				<text>优惠信息</text>
			</view>
			<view class="flex justify-between items-center h-[80rpx]">
				<view class="flex items-center">
					<image class="w-[42rpx] h-[42rpx]" :src="img('addon/tourism/tourism/way/discount_coupon.png')" mode="widthFix" />
					<text class="ml-1 text-xs">抵用券</text>
				</view>
				<text class="text-[var(--text-color-light9)] text-xs flex items-center">查看<text class="nc-iconfont nc-icon-youV6xx text-[26rpx]"></text></text>
			</view>
		</view> -->

    <view class="h-[148rpx] w-screen"></view>
    <view class="bg-white p-3 fixed bottom-0 left-0 right-0 flex items-center justify-between z-99">
      <view class="text-[#FA6400] text-xs">
        <text>总价</text>
        <text class="ml-[2rpx] price-font">￥</text>
        <text class="text-[38rpx] price-font">{{ paymentData.order_money?.toFixed(2) }}</text>
      </view>
      <view class="ml-auto mr-2" @click="detailPopupShow = !detailPopupShow">
        <text class="text-[#686868] text-xs mr-1">明细</text>
        <text class="nc-iconfont nc-icon-shangV6xx-1 text-[#C2C2C2] text-xs font-bold"></text>
      </view>
      <u-button v-if="paymentData.is_sell_out == 0"
        text="提交订单"
        color="var(--primary-color)"
        shape="circle"
        :customStyle="{ lineHeight: '76rpx', margin: '0rpx', color: '#fff', width: '278rpx' }"
        type="primary"
        size="16"
        :loading="createLoading"
        @click="orderCreate"
      ></u-button>
	  <u-button v-else
	    text="门票已售空"
	    color="#999"
	    shape="circle"
	    :customStyle="{ lineHeight: '76rpx', margin: '0rpx', color: '#fff', width: '278rpx' }"
	    type="primary"
	    size="16"
	    :loading="createLoading"
	  ></u-button>
    </view>
    <u-popup :show="detailPopupShow" @close="detailPopupShow = false" :closeable="true">
      <view class="text-center py-[30rpx] font-bold leading-none">
        <text>费用明细</text>
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
          <view>{{ paymentData.reserve_time }} 出发</view>
          <!-- <view>{{ item.year }}-{{ item.month }}-{{ item.day }}</view> -->
          <view class="text-right flex-1">
            <text class="text-xs price-font">￥</text>
            <text class="price-font">{{ item.price }}</text>
            <text class="mx-[10rpx]">x</text>
            <text>{{ item.num }}</text>
          </view>
        </view>
        <!-- <view class="flex px-[30rpx] mt-[10rpx] text-sm text-gray-subtitle">
		            <view>{{ paymentData.reserve_time }} 出发</view>
		            <view class="text-right flex-1"></view>
		        </view> -->
      </scroll-view>
      <view class="h-[150rpx]"></view>
    </u-popup>
    <pay ref="payRef" @close="payClose"></pay>

    <view class="w-screen h-screen flex flex-col justify-center items-center" v-if="error">
      <u-empty :icon="img('static/resource/images/order_empty.png')" :text="error" />
      <view class="w-[240rpx] mt-[40rpx]">
        <button class="bg-[var(--primary-color)] text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[28rpx]" @click="back">返回上一页</button>
      </view>
    </view>
    <loading-page :loading="loading"></loading-page>

    <!-- 出发日期 -->
    <template v-if="isScenicShow">
      <u-calendar
        :show="scenicShow"
        :defaultDate="createData.reserve_time"
        @confirm="confirm"
        @close="scenicShow = false"
        :formatter="formatter"
        confirmDisabledText="请选择离店日期"
        ref="calendar"
        monthNum="2"
        closeOnClickOverlay="true"
      ></u-calendar>
    </template>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, toRaw } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { scenicOrderConfirm, scenicOrderCalculate, scenicOrderCreate, getTicketGoodsDay, scenicRefundConfig } from '@/addon/tourism/api/tourism'
  import { img, timeStampTurnTime, redirect } from '@/utils/common'
  import { useSubscribeMessage } from '@/hooks/useSubscribeMessage'

  // 购买数量
  const valChange = (val) => {
    createData.value.num = val.value
    updateNum(val.value)
    // orderCalculate()
  }

  const payRef = ref(null)
  const loading = ref(true)
  const error = ref('')
  const createData = ref<scenicOrderCreareOptions>(uni.getStorageSync('scenicCreateData') || {})

  const paymentData = ref<AnyObject | null>(null)
  const detailPopupShow = ref(false)

  //购买须知
  const buyInfoShow = ref(false)
  const buyInfoContent = ref('')

  onLoad(() => {
    getTicketGoodsDayFn(createData.value.ticket_id)
    scenicOrderConfirm(createData.value)
      .then(({ data }) => {
        loading.value = false
        paymentData.value = data
        buyInfoContent.value = data.goods_info.buy_info
        handleCreateData()
      })
      .catch((err) => {
        error.value = err.msg
        loading.value = false
      })
	  orderCalculate()
  })

  /**
   * 订单计算
   */
  const orderCalculate = () => {
    loading.value = true
    scenicOrderCalculate(createData.value)
      .then(({ data }) => {
        paymentData.value = data
        paymentData.value.reserve_time = dayFormat(paymentData.value?.reserve_time)
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
      console.log(data.buyer_info)
      // 验证游客信息
      let res = true
      let idCardSet = new Set<string>()
      let nameSet = new Set<string>()
      let duplicateIdCards = new Set<string>()
      let duplicateNames = new Set<string>()

      for (let i = 0; i < createData.value.buyer_info.length; i++) {
        const item = createData.value.buyer_info[i]
        if (uni.$u.test.isEmpty(item.name)) {
          res = false
          uni.showToast({ title: '请输入游客' + (i + 1) + '的联系人姓名', icon: 'none' })
          break
        }
        if (uni.$u.test.isEmpty(item.id_card)) {
          res = false
          uni.showToast({ title: '请输入游客' + (i + 1) + '的身份证号', icon: 'none' })
          break
        }
        let idreg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/

        if (!idreg.test(item.id_card)) {
          res = false
          uni.showToast({ title: '请输入游客' + (i + 1) + '的正确身份证号', icon: 'none' })
          break
        }

        // 检查身份证号是否唯一
        if (idCardSet.has(item.id_card)) {
          res = false
          duplicateIdCards.add(item.id_card)
        } else {
          idCardSet.add(item.id_card)
        }

        // 检查姓名是否唯一
        if (nameSet.has(item.name)) {
          res = false
          duplicateNames.add(item.name)
        } else {
          nameSet.add(item.name)
        }
      }

      if (!res) {
        let duplicateIdCardsArray = Array.from(duplicateIdCards)
        let duplicateNamesArray = Array.from(duplicateNames)
        let message = ''
        if (duplicateIdCardsArray.length > 0) {
          message += '以下身份证号重复: ' + duplicateIdCardsArray.join(', ') + '\n'
        }
        if (duplicateNamesArray.length > 0) {
          message += '以下姓名重复: ' + duplicateNamesArray.join(', ')
        }
        uni.showToast({ title: message, icon: 'none' })
        createLoading.value = false
        return false
      }

      //结束
      data.buyer_info = JSON.stringify(data.buyer_info)

      scenicOrderCreate(data)
        .then(({ data }) => {
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
    if (uni.$u.test.isEmpty(createData.value.mobile)) {
      uni.showToast({ title: '请输入手机号', icon: 'none' })
      return false
    }
    let mobile = /^1[3-9]\d{9}$/
    if (!mobile.test(createData.value.mobile)) {
      uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return false
    }

    let res = true
    for (let i = 0; i < createData.value.buyer_info.length; i++) {
      const item = createData.value.buyer_info[i]
      if (uni.$u.test.isEmpty(item.name)) {
        res = false
        uni.showToast({ title: '请输入游客' + (i + 1) + '的联系人姓名', icon: 'none' })
        break
      }
      if (uni.$u.test.isEmpty(item.id_card)) {
        res = false
        uni.showToast({ title: '请输入游客' + (i + 1) + '的身份证号', icon: 'none' })
        break
      }
      let idreg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/

      if (!idreg.test(item.id_card)) {
        res = false
        uni.showToast({ title: '请输入游客' + (i + 1) + '的正确身份证号', icon: 'none' })
        break
      }
    }
    if (!res) return false

    return true
  }

  const handleCreateData = () => {
    createData.value.buyer_info = [
      {
        name: '',
        id_card: ''
      }
    ]
    createData.value.mobile = ''
    paymentData.value.reserve_time = dayFormat(paymentData.value?.reserve_time)
  }

  // 退款设置
  let scenicRefund = ref('0')
  const scenicRefundConfigFn = () => {
    scenicRefundConfig().then((res) => {
      scenicRefund.value = res.data.is_allow_refund
    })
  }
  scenicRefundConfigFn()

  /**
   * 改变游客信息
   */
  const updateNum = (e: Number) => {
    createData.value.num = e
    for (let i = 0; i < createData.value.num; i++) {
      createData.value.buyer_info[i] == undefined && (createData.value.buyer_info[i] = { name: '', id_card: '' })
    }
    if (createData.value.buyer_info.length > createData.value.num) {
      createData.value.buyer_info.splice(createData.value.num, createData.value.buyer_info.length - createData.value.num)
    }
    orderCalculate()
  }

  const goodsAttribute = computed(() => {
    return paymentData.value ? paymentData.value.goods_info.goods_attribute.split(',') : []
  })

  const timeFormat = (date: string) => {
    const time = new Date(date)
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return uni.$u.timeFormat(time, 'mm月dd日 ') + week[time.getDay()]
  }
  const dayFormat = (date: string) => {
    const time = new Date(date)
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return uni.$u.timeFormat(time, 'yyyy-mm-dd ') + week[time.getDay()]
  }
  const payClose = () => {
    redirect({ url: '/addon/tourism/pages/order/list', mode: 'redirectTo' })
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

  /************** 日期选择 **************/
  let scenicShow = ref<boolean>(false)
  let isScenicShow = ref<boolean>(false)
  // 出发日期展示
  let departureDate = ref([])
  let departureDateSelect = ref(0)

  // 价格日历
  let priceCalendar = {}
  const confirm = (e) => {
    createData.value.reserve_time = e[0]
    let time = new Date(e[0]).getTime()
    initFn(time)
    departureDateSelect.value = 0
    scenicShow.value = false
    orderCalculate()
  }
  const formatter = (day) => {
    const time = timeStampTurnTime(Date.parse(day.date) / 1000, 'year_month_day')
    if (priceCalendar[time]) {
      day.bottomInfo = priceCalendar[time]
    }
    return day
  }

  const getTicketGoodsDayFn = (id) => {
    getTicketGoodsDay(id)
      .then((res) => {
        let data = res.data
        if (data) {
          priceCalendar = data
        }
        isScenicShow.value = true
        initFn()
      })
      .catch(() => {
        loading.value = true
      })
  }

  // 格式转换
  const formatConverter = (time) => {
    var arr = []
    if (time.indexOf('-') != -1) arr = time.split('-')
    else if (time.indexOf('/') != -1) arr = time.split('/')
    return arr[1] + '-' + arr[2]
  }

  // 获取某天的日期
  const getSpecificDate = (day, dateVal = '') => {
    //计算出要加/ 减的毫秒数
    var num = 1000 * 60 * 60 * 24 * day
    var newDate
    if (dateVal) newDate = new Date(dateVal + num)
    else newDate = new Date(Date.now() + num)
    return newDate
  }
  const config = (time) => {
    // let d = new Date()
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDate()
    let date = `${year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)}`
    return date
  }
  const initFn = (dateVal = '') => {
    let day
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    departureDate.value = []
    for (let i = 0; i < 4; i++) {
      day = {}
      let time = config(getSpecificDate(i, dateVal))
      day.centerInfo = formatConverter(time)
      let time1 = time
        .split('/')
        .map((item) => {
          let data = ''
          if (item < 10) data = '0' + item
          else data = item
          return data
        })
        .join('-')
      day.bottomInfo = priceCalendar[time1] || ''
      day.topInfo = week[new Date(time1).getDay()]
      day.initInfo = time1
      departureDate.value.push(day)
    }
  }
  // 出发日期
  const departureDateFn = (item, index) => {
    departureDateSelect.value = index
    createData.value.reserve_time = item.initInfo
    orderCalculate()
  }
</script>

<style lang="scss" scoped>
  .chunk-wrap {
    @apply bg-white px-4 mb-2;
    .chunk-head {
      height: 84rpx;
      @apply flex justify-between items-center border-0 border-b border-solid border-[#F2F2F2] box-border;
      text {
        &:first-of-type {
          @apply font-bold;
        }
        // &:last-of-type{
        // 	@apply text-xs text-[var(--text-color-light9)];
        // }
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
  .select-box-color {
    border-color: $u-primary;
    color: $u-primary;
    background-color: $u-primary-light;
  }
  .border-color {
    border-color: var(--primary-color);
  }
</style>
