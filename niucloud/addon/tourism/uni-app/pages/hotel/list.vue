<template>
  <view class="min-h-screen overflow-hidden" :style="themeColor()">
    <view class="fixed z-10 left-0 right-0 bg-white">
      <view class="flex items-center px-[24rpx] py-[20rpx]">
        <view class="flex items-center bg-[#F2F2F2] ml-auto pl-[30rpx] pr-[24rpx] rounded-3xl text-[#949494] flex-1 h-[74rpx]">
          <u--input :placeholder="t('searchHotelName')" class="w-[280rpx] text-sm" placeholderClass="text-sm" border="none" v-model="hotel_name"></u--input>
          <text class="nc-iconfont nc-icon-sousuoV6xx text-[32rpx]" @click="searchNameFn"></text>
        </view>
      </view>
    </view>

    <mescroll-body ref="mescrollRef" top="114rpx" @init="mescrollInit" :down="{ use: false }" @up="getHotelListFn">
      <view class="mt-[2rpx]">
        <view
          class="flex px-[24rpx] py-[30rpx] border-0 border-b-1 border-solid border-[#F0F0F0]"
          v-for="(item, index) in list"
          :key="item.hotel_id"
          @click="toLink(item.hotel_id)"
        >
          <image class="w-[238rpx] h-[238rpx] mr-[20rpx] rounded-md" :src="img(item.cover_thumb_mid)" mode="aspectFill" />
          <view class="flex flex-col flex-1 py-[10rpx]">
            <view class="text-sm font-bold multi-hidden">{{ item.hotel_name }}</view>
            <view class="font-bold multi-hidden text-[#ffaf00] flex items-center text-xs my-1">
              <text class="iconfont iconxingxing mr-[2rpx] text-xs"></text>
              <text>{{ item.hotel_star }}星</text>
            </view>
            <view class="flex flex-wrap text-xs text-[#646464]">
              <template v-for="(subItem, subIndex) in item.hotel_attribute" :key="subIndex">
                <text :class="['break-all', { 'class-select': subIndex != 2 }]" v-if="subIndex < 3">{{ subItem }}</text>
              </template>
            </view>
            <view class="flex items-center mt-auto text-[#F55246] text-xs">
              <view>
                <text class="price-font">￥</text>
                <text class="text-base price-font">{{ goodsPrice(item) }}</text>
                <text class="ml-[4rpx] mr-[4rpx]"> {{ t('rise') }} </text>
                <text>
                  <image v-if="priceType(item) == 'member_price'" class="h-[22rpx] ml-[4rpx] w-[50rpx]" :src="img('addon/tourism/VIP.png')" mode="widthFix" />
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <mescroll-empty :option="{ icon: img('static/resource/images/empty.png') }" v-if="!list.length && loading"></mescroll-empty>
    </mescroll-body>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from 'vue'
  import { redirect, img, getToken } from '@/utils/common'
  import { getHotelList } from '@/addon/tourism/api/tourism'
  import { t } from '@/locale'
  import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
  import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
  import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
  import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'

  const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom)

  let list = ref<Array<Object>>([])
  let loading = ref<boolean>(false)
  let hotel_name = ref('')
  let sortList = ref('all')
  let priceSort = ref('')

  interface acceptingDataStructure {
    data: acceptingDataItemStructure
    msg: string
    code: number
  }
  interface acceptingDataItemStructure {
    data: object
    [propName: string]: number | string | object
  }
  interface mescrollStructure {
    num: number
    size: number
    endSuccess: Function
    [propName: string]: any
  }
  const getHotelListFn = (mescroll: mescrollStructure) => {
    loading.value = false
    let data: object = {
      page: mescroll.num,
      limit: mescroll.size,
      hotel_name: hotel_name.value
    }

    if (sortList.value == 'price') {
      data.price = priceSort.value
    }

    getHotelList(data)
      .then((res: acceptingDataStructure) => {
        let newArr = res.data.data as Array<Object>
        console.log(res.data.total)
        console.log(list.value.length)
        //设置列表数据
        if (mescroll.num == 1) {
          list.value = [] //如果是第一页需手动制空列表
        }
        if (list.value.length == res.data.total) {
          mescroll.endSuccess(0)
          return
        }
        list.value = list.value.concat(newArr)

        list.value.forEach((item, index) => {
          if (item.hotel_attribute) {
            item.hotel_attribute = item.hotel_attribute.split(',').filter((item) => {
              return item && item.trim()
            })
          }
        })
        mescroll.endSuccess(newArr.length)
        loading.value = true
      })
      .catch(() => {
        loading.value = true
        mescroll.endErr() // 请求失败, 结束加载
      })
  }

  const searchNameFn = () => {
    list.value = []
    getMescroll().resetUpScroll()
  }

  const sortListFn = (data) => {
    sortList.value = data
    if (data == 'price') {
      priceSort.value = priceSort.value == 'asc' ? 'desc' : 'asc'
    } else {
      priceSort.value = ''
    }

    list.value = []
    getMescroll().resetUpScroll()
  }

  // 价格类型
  let priceType = (data: any) => {
    let type = ''
    if (data.goods.member_discount && getToken()) {
      type = 'member_price' // 会员价
    } else {
      type = ''
    }
    return type
  }
  // 商品价格
  let goodsPrice = (data: any) => {
    let price = '0.00'
    if (data.goods.member_discount && getToken()) {
      price = data.member_price // 会员价
    } else {
      price = data.price
    }
    return parseFloat(price).toFixed(2)
  }

  const toLink = (id: string) => {
    redirect({ url: '/addon/tourism/pages/hotel/detail', param: { id } })
  }
</script>
<style lang="scss" scoped>
  .font-scale {
    transform: scale(0.75);
  }
  .text-color {
    color: $u-primary;
  }
  .bg-color {
    background-color: $u-primary;
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
  .transform-rotate {
    transform: rotate(180deg);
  }
</style>
