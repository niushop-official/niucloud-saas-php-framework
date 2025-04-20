<template>
  <view class="bg-[#f8f8f8] min-h-screen overflow-hidden" :style="themeColor()">
    <mescroll-body ref="mescrollRef" top="30rpx" @init="mescrollInit" :down="{ use: false }" @up="getListFn">
      <view class="goods-wrap">
        <view class="goods-item" v-for="(item, index) in list" :key="item.order_id" @click="toLink(item)">
          <view class="goods-head">
            <text>{{ t('createTime') }}{{ dateFormat(item.create_time, 'yearMonthDayWeek') }}</text>
            <text>{{ item.order_status_name }}</text>
          </view>
          <view class="goods-content">
            <image class="w-[40rpx]" :src="img(item.goods.cover_thumb_small)" />
            <view class="flex flex-col py-1">
              <view class="name-wrap">
                <view class="multi-hidden">{{ item.goods.goods_name }}</view>
                <view>￥{{ item.goods.price }}</view>
              </view>
              <view class="desc" v-if="item.card_type == 'timecard'">{{ t('cardNumNoLimit') }}</view>
              <view class="desc" v-else>{{ t('cardNum') }}{{ item.total_num }}</view>
            </view>
          </view>
          <view class="btn-wrap">
            <button @click.stop="orderBtnFn(item.card_id)" v-if="item.status!='used'">{{ t('toUse') }}</button>
          </view>
        </view>
      </view>
      <mescroll-empty :option="{ icon: img('static/resource/images/empty.png') }" v-if="!list.length && loading"></mescroll-empty>
    </mescroll-body>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { img, redirect } from '@/utils/common'
  import { getMembercard } from '@/addon/vipcard/api/vipcard'
  import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
  import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
  import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
  import { t } from '@/locale'
  import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'

  const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom)
  let list = ref<Array<Object>>([])
  let loading = ref<boolean>(false)

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
  const getListFn = (mescroll: mescrollStructure) => {
    loading.value = false
    let data: object = {
      page: mescroll.num,
      limit: mescroll.size
    }

    getMembercard(data)
      .then((res: acceptingDataStructure) => {
        let newArr = res.data.data as Array<Object>
        //设置列表数据
        if (mescroll.num == 1) {
          list.value = [] //如果是第一页需手动制空列表
        }
        list.value = list.value.concat(newArr)
        mescroll.endSuccess(newArr.length)
        loading.value = true
      })
      .catch(() => {
        loading.value = true
        mescroll.endErr() // 请求失败, 结束加载
      })
  }

  const dateFormat = (res, type) => {
    const date = new Date(res)
    let data = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    let time
    const index = date.getDay()
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    if (type == 'yearMonthDay') time = data[0] + '年' + data[1] + '月' + data[2] + '日'
    else if (type == 'yearMonthDayWeek') time = data[0] + '年' + data[1] + '月' + data[2] + '日 ' + week[index]
    else time = data[1] + '月' + data[2] + '日'

    return time
  }

  const orderBtnFn = (id) => {
    redirect({ url: '/addon/vipcard/pages/order/my_card_detail', param: { card_id: id } })
  }
</script>

<style lang="scss" scoped>
  .serve-active {
    border: 2rpx solid $u-primary;
    color: $u-primary;
  }

  .transform-rotate {
    transform: rotate(180deg);
  }
  .font-scale {
    transform: scale(0.75);
  }
  .text-color {
    color: $u-primary;
  }
  .bg-color {
    background-color: $u-primary;
  }
  .goods-wrap {
    margin: 0 20rpx 20rpx;
    .goods-item {
      @apply w-full flex flex-col mb-3 bg-[#fff] py-3 px-4 box-border;
      border-radius: 18rpx;
      overflow: hidden;
      .goods-head {
        @apply flex justify-between pb-3 border-0 border-b-1 border-solid border-[#F0F0F0] mb-4;
        font-size: 26rpx;
        color: #666;
      }
      .goods-content {
        @apply flex;
        & > image {
          width: 240rpx;
          height: 180rpx;
          margin-right: 30rpx;
          border-radius: 18rpx;
        }
        & > view {
          flex: 1;
        }
        .name-wrap {
          @apply flex flex-col;
          & > view {
            &:first-of-type {
              font-weight: bold;
              font-size: 30rpx;
            }
            &:last-of-type {
              margin-top: 10rpx;
              color: #ea4b69;
              font-size: 28rpx;
              font-weight: bold;
            }
          }
        }
        .desc {
          color: #686868;
          font-size: 26rpx;
          margin-top: auto;
        }
        .time-wrap {
          display: flex;
          align-items: center;
          background-color: #f6f7fb;
          border-radius: 8rpx;
          height: 62rpx;
          font-size: 26rpx;
          padding: 0 16rpx;
          text {
            &:nth-child(1) {
              color: #444;
              margin-right: 14rpx;
            }
            &:nth-child(2) {
              color: #686868;
            }
            &:nth-child(3) {
              color: #333;
              font-weight: bold;
            }
          }
        }
      }
    }
    .btn-wrap {
      justify-content: flex-end;
      @apply flex margin-0 flex-wrap;
      button {
        width: 172rpx;
        height: 64rpx;
        font-size: 26rpx;
        @apply rounded-3xl;
        line-height: 64rpx;
        background-color: transparent;
        margin: 0;
        margin-left: 20rpx;
        @apply mt-2;
        border: 2rpx solid #e2e2e2;
        &[type='primary'] {
          background-color: $u-primary;
        }
        &::after {
          border: none;
        }
      }
    }
  }
</style>
