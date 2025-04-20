<template>
  <view class="bg-[#f7f7f7] min-h-screen overflow-hidden" :style="themeColor()">
    <view v-if="!loading">
      <u-swiper :list="carousel" height="380rpx" radius="0" @click="swiperClick"></u-swiper>
      <view class="chunk-wrap pt-4 pb-3 rounded-t-2xl relative -mt-[30rpx]">
        <view class="flex flex-wrap items-center">
          <view class="font-bold multi-hidden">
            {{ detail.hotel_name }}
          </view>
          <view class="font-bold multi-hidden text-[#ffaf00] flex items-center text-xs mt-[-4rpx] ml-2">
            <text class="iconfont iconxingxing mr-[4rpx] text-xs mt-[-4rpx]"></text>
            <text>{{ detail.hotel_star }}星</text>
          </view>
        </view>
        <view class="flex mt-[16rpx] justify-between items-center">
          <view class="flex">
            <template v-if="detail.hotel_tag.length">
              <template v-for="(item, index) in detail.hotel_tag">
                <text class="bg-[#F6F8F9] text-xs px-[10rpx] py-[4rpx] rounded" :class="{ 'mr-[20rpx]': index < 3 }" v-if="index < 4">{{ item }}</text>
              </template>
            </template>
            <template v-else>
              <template v-for="(item, index) in detail.hotel_attribute">
                <text class="bg-[#F6F8F9] text-xs px-[10rpx] py-[4rpx] rounded" :class="{ 'mr-[20rpx]': index < 3 }" v-if="index < 4">{{ item }}</text>
              </template>
            </template>
          </view>
          <view class="flex items-center" @click="hotelTab = !hotelTab">
            <view class="text-xs flex items-baseline">详情<text class="nc-iconfont nc-icon-fengefuV6xx text-xs"></text>设施</view>
            <text class="nc-iconfont nc-icon-youV6xx text-[26rpx]"></text>
          </view>
        </view>

        <u-popup :show="hotelTab" mode="bottom" :round="10" @close="hotelTab = false">
          <view class="flex flex-col p-3 rounded-t-3xl">
            <view class="text-base font-bold flex justify-between items-center">
              <text>{{ t('hotelTab') }}</text>
              <text class="iconfont iconguanbi text-[var(--text-color-light6)]" style="font-size: 38rpx; color: #000" @click="hotelTab = false"></text>
            </view>
            <view class="mt-2 flex flex-col">
              <view v-if="detail.hotel_tag">
                <view class="flex flex-wrap">
                  <text
                    v-for="(item, index) in detail.hotel_tag"
                    class="my-2 whitespace-nowrap text-xs px-[10rpx] py-[4rpx]"
                    :class="{ 'mr-[20rpx]': index < detail.hotel_attribute.length - 1 }"
                    >{{ item }}</text
                  >
                </view>
              </view>
              <view v-if="detail.hotel_attribute">
                <view v-for="(item, index) in Object.values(detail.hotel_attribute_array)" class="mt-2">
                  <view class="text-sm font-bold">{{ item.name }}</view>
                  <view class="flex flex-wrap">
                    <template v-for="(subItem, subIndex) in item.attr">
                      <text v-if="subItem[1]" class="m-2 whitespace-nowrap bg-[#F6F8F9] text-xs px-[10rpx] py-[4rpx] rounded">{{ subItem[0] }}</text>
                    </template>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </u-popup>

        <view class="flex items-center mt-3">
          <view class="flex-1 leading-tight text-[#19293F] text-[26rpx] font-bold">{{ detail.full_address }}</view>
          <view class="flex ml-auto">
            <view class="flex flex-col items-center justify-center mr-[20rpx]" @click="mapPopupShow = true">
              <text class="nc-iconfont nc-icon-dizhiguanliV6xx bg-[#F1F1F1] w-[44rpx] h-[44rpx] rounded-full flex items-center justify-center"></text>
              <text class="text-xs mt-1">{{ t('map') }}</text>
            </view>

            <view class="flex flex-col items-center justify-center mr-[20rpx]" @click="openShareFn">
              <text class="nc-iconfont nc-icon-fenxiangV6xx text-[30rpx] bg-[#F1F1F1] w-[44rpx] h-[44rpx] rounded-full flex items-center justify-center"></text>
              <text class="text-xs mt-1">分享</text>
            </view>
          </view>
        </view>
      </view>

      <u-popup :show="mapPopupShow" @close="mapPopupShow = false" :closeable="true">
        <view class="text-center py-[30rpx] font-bold leading-none">
          <text>地图</text>
        </view>
        <view>
          <map class="map-body w-full h-[600rpx]" :latitude="detail.latitude" :longitude="detail.longitude" :markers="covers"></map>
        </view>
      </u-popup>

      <view class="chunk-wrap pt-[34rpx] scheduling">
        <view class="flex justify-between items-center" @click="calendarShow = true">
          <view class="flex">
            <view class="flex items-center">
              <text class="font-bold text-[30rpx]">{{ timeShow.start_time }}</text>
              <text class="text-xs ml-1">{{ t('checkToday') }}</text>
            </view>
            <view class="flex items-center ml-[30rpx]">
              <text class="font-bold text-[30rpx]">{{ timeShow.end_time }}</text>
              <text class="text-xs ml-1">{{ t('checkTomorrow') }}</text>
            </view>
          </view>
          <view class="text-sm flex items-center">
            <text class="text-color">{{ t('common') }}{{ timeShow.day }}{{ t('lateness') }}</text>
            <text class="nc-iconfont nc-icon-youV6xx text-[26rpx] text-[var(--text-color-light6)]"></text>
          </view>
        </view>

        <view class="py-[20rpx]" v-if="roomList?.length">
          <view class="flex mb-[30rpx]" v-for="(item, index) in roomList" :key="item.goods_id" @click="selectRoomTypeFn(index)">
            <image class="w-[162rpx] h-[184rpx] mr-[20rpx] rounded-md" :src="img(item.cover_thumb_mid)" mode="aspectFill" />
            <view class="flex flex-col flex-1 py-[4rpx] relative">
              <view class="text-sm font-bold truncate">{{ item.goods_name }}</view>
              <view class="text-xs text-[#626262] mt-[10rpx]">
                <text v-for="(item, index) in item.attr_name" class="mr-[10rpx]">{{ item }}</text>
              </view>
              <!-- <view class="text-color text-[26rpx] mt-[10rpx]">15分钟内可免费取消</view> -->
              <view class="flex items-center mt-auto text-[#F55246] text-base font-bold price-font"
                ><text class="text-xs">￥</text>
                {{ goodsPrice(item) }}
                <image v-if="priceType(item) == 'member_price'" class="h-[22rpx] ml-[6rpx] w-[55rpx]" :src="img('addon/tourism/VIP.png')" mode="widthFix" />
              </view>
              <view
                v-if="item.stock"
                class="flex flex-col border-[2rpx] border-solid border-[#FC565F] border-md absolute right-0 bottom-[4rpx] rounded w-[90rpx]"
                @click.stop="toOrder(item)"
              >
                <text class="bg-[#FC565F] font-bold text-white font-bold text-[34rpx] text-center py-[8rpx]">{{ t('rob') }}</text>
                <text class="text-xs text-scale py-[2rpx] text-center text-[#FC565F]">{{ t('onlinePayment') }}</text>
              </view>
              <view
                v-else
                class="flex flex-col border-[2rpx] border-solid border-[#999] border-md absolute right-0 bottom-[4rpx] rounded w-[90rpx]"
                @click.stop="toOrder(item, 'empty')"
              >
                <text class="bg-[#999] font-bold text-white font-bold text-[34rpx] text-center py-[8rpx]">{{ t('rob') }}</text>
                <text class="text-xs text-scale py-[2rpx] text-center text-[var(--text-color-light9)]">{{ t('onlinePayment') }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 酒店房型详情 -->
        <u-popup v-if="Object.keys(roomData).length" :show="hotelType" mode="bottom" :round="10" @close="hotelType = false" zIndex="500">
          <view class="h-[1000rpx] relative rounded-t-3xl bg-[#f8f8f8] overflow-hidden">
            <view class="text-base font-bold flex justify-between items-center h-[96rpx] px-[26rpx] bg-[#fff] absolute top-0 left-0 right-0 z-10">
              <text class="text-[30rpx]">{{ roomData.goods_name }}</text>
              <text class="nc-iconfont nc-icon-guanbiV6xx text-[32rpx] text-[var(--text-color-light6)]" @click="hotelType = false"></text>
            </view>
            <scroll-view scroll-y="true" class="flex h-[1000rpx] flex-col bg-[#f8f8f8] !rounded-none">
              <view class="pt-[96rpx]"></view>
              <image
                :src="img(roomData.cover_thumb_big)"
                class="w-[750rpx] h-[218]"
                mode="aspectFill"
                @click="imgListPreview(roomData.cover_thumb_big)"
               />
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
                    <text class="text-xs font-bold">{{ roomData.room_area || 0 }}m²</text>
                  </view>
                  <view class="flex flex-col items-center justify-center">
                    <text class="nc-iconfont nc-icon-jiamengV6xx text-[36rpx] text-[#555] mb-1"></text>
                    <text class="text-xs font-bold">{{ roomData.room_stay || '0人' }}</text>
                  </view>
                  <view class="flex flex-col items-center justify-center">
                    <text class="nc-iconfont nc-icon-liebiaoV6xx text-[36rpx] text-[#555] mb-1"></text>
                    <text class="text-xs font-bold">{{ roomData.stock || '0间' }}</text>
                  </view>
                </view>
                <view class="flex items-baseline py-4" v-if="roomData.goods_attribute">
                  <text class="mr-3 text-sm">房间设施</text>
                  <view class="flex-1 flex flex-wrap">
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
                <view class="py-3 px-1">
                  <u-parse :content="roomData.goods_content" :tagStyle="{ img: 'vertical-align: top;' }" v-if="roomData.goods_content"></u-parse>
                  <view v-else>暂无房型详情</view>
                </view>
              </view>
              <view class="h-[136rpx]"></view>
            </scroll-view>
            <view class="flex justify-between items-center px-4 py-3 mt-2 bg-[#fff] absolute bottom-0 left-0 right-0 z-10">
              <text class="text-[var(--price-color)] price-font">
                ￥{{ goodsPrice(roomData) }}
                <image v-if="priceType(roomData) == 'member_price'" class="h-[22rpx] ml-[6rpx] w-[55rpx]" :src="img('addon/tourism/VIP.png')" mode="widthFix" />
              </text>
              <button
                v-if="roomData.stock"
                type="primary"
                class="w-[276rpx] h-[88rpx] rounded-3xl flex items-center justify-center text-base m-0 !bg-[var(--primary-color)]"
                @click.stop="toOrder(roomData)"
              >
                立即抢购
              </button>
              <button
                v-else
                type="primary"
                class="w-[276rpx] h-[88rpx] rounded-3xl flex items-center justify-center text-base m-0 !bg-[#999]"
                @click.stop="toOrder(roomData, 'empty')"
              >
                立即抢购
              </button>
            </view>
          </view>
        </u-popup>
      </view>

      <sow-show v-if="detail.sow_show_list" :items="detail.sow_show_list" class="!rounded-none"></sow-show>

      <view class="chunk-wrap pt-[34rpx] pb-[24rpx] scheduling mt-[20rpx]">
        <view class="text-center text-[34rpx] font-bold">-- 酒店介绍 --</view>
        <view class="scheduling-content">
          <u-parse :content="detail.hotel_desc" :tagStyle="{ img: 'vertical-align: top;' }" v-if="detail.hotel_desc"></u-parse>
          <view v-else>暂无酒店介绍</view>
        </view>
      </view>
    </view>
    <loading-page :loading="loading"></loading-page>

    <template v-if="isCalendarShow">
      <u-calendar
        :show="calendarShow"
        mode="range"
        @confirm="confirm"
        @close="calendarShow = false"
        :formatter="formatter"
        :startText="t('inHotel')"
        :endText="t('checkOut')"
        :confirmDisabledText="t('checkOutDate')"
        ref="calendar"
        monthNum="2"
        closeOnClickOverlay="true"
      ></u-calendar>
    </template>
    <share-poster ref="sharePosterRef" posterType="tourism_hotel" :posterId="detail.poster_id" :posterParam="posterParam" :copyUrlParam="copyUrlParam" />
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from 'vue'
  import { onLoad, onUnload } from '@dcloudio/uni-app'
  import { img, timeStampTurnTime, redirect, getToken, handleOnloadParams } from '@/utils/common'
  import { getHotelInfo, getTourismGoodsDay, getHotelRoom } from '@/addon/tourism/api/tourism'
  import { useLogin } from '@/hooks/useLogin'
  import { t } from '@/locale'
  import Map from '@/addon/tourism/utils/map/openMap.js'
  import sharePoster from '@/components/share-poster/share-poster.vue'
  import useMemberStore from '@/stores/member'
  import sowShow from '@/components/sow-show/sow-show.vue'

  let carousel = ref([])
  let detail = ref<Array<any>>([])
  let loading = ref<boolean>(true)
  let hotelTab = ref<boolean>(false)
  let hotelType = ref<boolean>(false)
  let mapPopupShow = ref<boolean>(false)
  let roomList = ref([])

  // 用于时间展示
  let timeShow = ref({
    start_time: '',
    end_time: '',
    day: 1
  })
  // 向待创建订单提交
  let orderData = {
    room_id: '',
    start_time: '',
    end_time: '',
    num: 1
  }

  // 控制日历弹出
  let calendarShow = ref<boolean>(false)
  // 控制日历显示
  let isCalendarShow = ref<boolean>(false)

  const memberStore = useMemberStore()

  // 会员信息
  const userInfo = computed(() => memberStore.info)

  const formatter = (day) => {
    const time = timeStampTurnTime(Date.parse(day.date) / 1000, 'year_month_day')
    return day
  }

  const confirm = (e) => {
    orderData.start_time = e[0]
    orderData.end_time = e[e.length - 1]

    timeShow.value.start_time = formatConverter(e[0])
    timeShow.value.end_time = formatConverter(e[e.length - 1])
    timeShow.value.day = e.length - 1
    calendarShow.value = false

    // 房型列表
    getHotelRoomFn(orderData.start_time)
  }

  let priceCalendar = {}
  const getTourismGoodsDayFn = (id) => {
    getTourismGoodsDay(id)
      .then((res) => {
        let data = res.data
        if (data) {
          priceCalendar = data
        }
        isCalendarShow.value = true
      })
      .catch(() => {
        loading.value = true
      })
  }
  let hotelId = ref('')
  let covers = ref([])
  onLoad((option: any) => {
    // #ifdef MP-WEIXIN
    // 处理小程序场景值参数
    option = handleOnloadParams(option)
    // #endif

    hotelId.value = option.id
    loading.value = true
    getTourismGoodsDayFn(option.id)
    getHotelInfo(option.id).then((res) => {
      detail.value = res.data
      covers.value.push({
        id: 1,
        latitude: detail.value.latitude,
        longitude: detail.value.longitude,
        iconPath: img('addon/tourism/tourism/map_icon.png'),
        height: 25
      })
      // 设置头部
      uni.setNavigationBarTitle({
        title: detail.value.hotel_name
      })
      // 酒店图片
      carousel.value = []
      if (detail.value.image_thumb_big && detail.value.image_thumb_big.length) {
        // detail.value.hotel_images = detail.value.hotel_images.split(",").filter((item)=>{
        // 	return item && item.trim();
        // })

        detail.value.image_thumb_big.forEach((item, index) => {
          carousel.value.push(img(item))
        })
      } else {
        carousel.value.push(img(detail.value.cover_thumb_big))
      }

      // 酒店标签
      if (detail.value.hotel_tag) {
        detail.value.hotel_tag = detail.value.hotel_tag.split('，').join(',').split(',')
        detail.value.hotel_tag = detail.value.hotel_tag.filter((item) => {
          return item && item.trim()
        })
      }

      // 酒店服务
      if (detail.value.hotel_attribute) {
        detail.value.hotel_attribute = detail.value.hotel_attribute.split('，').join(',').split(',')
        detail.value.hotel_attribute = detail.value.hotel_attribute.filter((item) => {
          return item && item.trim()
        })
      }

      // 酒店房型处理
      if (detail.value.room_list) {
        detail.value.room_list.forEach((item, index) => {
          item.attr_name = item.attr_name.split('|').filter((item, index) => {
            return item && item.trim()
          })
        })
      }

      // 房型列表
      roomList.value = detail.value.room_list || []
      copyUrlFn()
      loading.value = false
    })
  })

  // 房型详情
  let roomData = ref<Object<any>>({})
  const selectRoomTypeFn = (index) => {
    roomData.value = detail.value.room_list[index]
    hotelType.value = true
  }

  // 跳转到详情
  const toOrder = (data, type) => {
    if (type == 'empty') {
      uni.showToast({
        title: '入住时间当日房间已售空',
        icon: 'none'
      })
      return false
    }
    if (!getToken()) {
      useLogin().setLoginBack({ url: '/addon/tourism/pages/hotel/detail', param: { id: hotelId.value } })
      return false
    }
    orderData.room_id = data.goods_id
    uni.setStorageSync('hotelCreateData', orderData)
    redirect({ url: '/addon/tourism/pages/hotel/order' })
  }
  // 格式转换
  const formatConverter = (time) => {
    var arr = []
    if (time.indexOf('-') != -1) arr = time.split('-')
    else if (time.indexOf('/') != -1) arr = time.split('/')
    return arr[1] + '月' + arr[2] + '日'
  }

  // 获取某天的日期
  const getSpecificDate = (day) => {
    //计算出要加/ 减的毫秒数
    var num = 1000 * 60 * 60 * 24 * day
    var newDate = new Date(Date.now() + num)
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
  const initFn = () => {
    timeShow.value.start_time = formatConverter(config(getSpecificDate(0)))
    timeShow.value.end_time = formatConverter(config(getSpecificDate(1)))
    orderData.start_time = config(getSpecificDate(0))
    orderData.end_time = config(getSpecificDate(1))
  }
  initFn()

  //房型列表
  const getHotelRoomFn = (date) => {
    let obj = {}
    obj.date = date
    obj.hotel_id = detail.value.hotel_id

    getHotelRoom(obj).then((res) => {
      roomList.value = res.data
      // 酒店房型处理
      if (roomList.value) {
        roomList.value.forEach((item, index) => {
          item.attr_name = item.attr_name.split('|').filter((item, index) => {
            return item && item.trim()
          })
        })
      }
    })
  }

  /************* 分享海报-start **************/
  let sharePosterRef = ref(null)
  let copyUrlParam = ref('')
  let posterParam = {}

  // 分享海报链接
  const copyUrlFn = () => {
    copyUrlParam.value = '?id=' + detail.value.hotel_id
    if (userInfo.value && userInfo.value.member_id) copyUrlParam.value += '&mid=' + userInfo.value.member_id
  }

  const openShareFn = () => {
    posterParam.id = detail.value.hotel_id
    if (userInfo.value && userInfo.value.member_id) posterParam.member_id = userInfo.value.member_id
    sharePosterRef.value.openShare()
  }
  /************* 分享海报-end **************/

  // 价格类型
  let priceType = (data: any) => {
    let type = ''
    if (data.member_discount && getToken()) {
      type = 'member_price' // 会员价
    } else {
      type = ''
    }
    return type
  }
  // 商品价格
  let goodsPrice = (data: any) => {
    let price = '0.00'
    if (data.member_discount && getToken()) {
      price = data.member_price || data.price // 会员价
    } else {
      price = data.price
    }
    return parseFloat(price).toFixed(2)
  }

  const swiperClick = (index: any) => {
    imgListPreview(carousel.value, index)
  }
  //预览图片
  const imgListPreview = (item: any, index: any = 0) => {
    if (Array.isArray(item)) {
      if (!item.length) return false
      var urlList = item
      uni.previewImage({
        indicator: 'number',
        current: index,
        loop: true,
        urls: urlList
      })
    } else {
      if (item === '') return false
      var urlList = []
      urlList.push(img(item)) //push中的参数为 :src="item.img_url" 中的图片地址
      uni.previewImage({
        indicator: 'number',
        loop: true,
        urls: urlList
      })
    }
  }
  // 关闭预览图片
  onUnload(() => {
    // #ifdef  H5 || APP
    try {
      uni.closePreviewImage()
    } catch (e) {}
    // #endif
  })
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
        &:last-of-type {
          @apply text-xs text-[var(--text-color-light9)];
        }
        .iconfont {
          @apply inline-block;
          margin-left: 2rpx;
        }
      }
    }
  }
  .member-price {
    background: linear-gradient(90deg, #fef3e7 0%, #ffffff 100%);
  }
  .text-color {
    color: $u-primary;
  }
  .bg-color {
    background-color: $u-primary;
  }
  .word-all {
    word-break: keep-all;
  }
  .text-scale {
    transform: scale(0.8);
  }
  .class-select {
    position: relative;
    margin-right: 28rpx;
    &::after {
      content: '';
      position: absolute;
      background-color: #999;
      width: 2rpx;
      height: 70%;
      top: 50%;
      right: -14rpx;
      transform: translatey(-50%);
    }
  }
  :deep(.scheduling-content img) {
    vertical-align: middle;
  }
</style>
