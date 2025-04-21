<template>
    <view class="box" style="background: #f6f6f6">
      <!-- 个人资料 -->
      <view class="top">
        <view class="topClass">
          <image v-if="infoList.member?.headimg" class="w-[90rpx] h-[90rpx] mr-[20rpx]" :src="img(infoList.member.headimg)" mode="widthFix"></image>
          <image v-else class="w-[90rpx] h-[90rpx] rounded-full mr-[20rpx]" :src="img('addon/ly_area/head.png')" mode="aspectFill"></image>
          <view style="flex: 1; color: #fff" class="text-[24rpx]">
            <view class=""
              >{{ infoList.member?.nickname || '昵称' }}
              <span style="border: 1px solid white; color: white; padding: 4rpx 8rpx; margin-left: 10rpx">{{ infoList.hasLevel?.level_name }}</span>
            </view>
  
            <view class="mt-[22rpx]">{{ infoList.create_time || '简介' }}</view>
          </view>
        </view>
  
      </view>
      <image style="width: 100%; height: 80rpx" src="@/addon/ly_area/img/img.jpg" mode="scaleToFill" />
      <!-- 团队列表 -->
      <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getRewardData">
        <view class="listBox">
          <view class="listClass" v-for="(item, index) in rewardList" :key="index">
            <view class="topClass">
              <image v-if="item.buyMember?.headimg" class="w-[90rpx] h-[90rpx] mr-[20rpx]" :src="img(item.buyMember.headimg)" mode="widthFix"></image>
              <image v-else class="w-[90rpx] h-[90rpx] rounded-full mr-[20rpx]" :src="img('addon/ly_area/head.png')" mode="aspectFill"></image>
              <view style="flex: 1; color: #000" class="text-[24rpx]">
                <view style="font-weight: 700"
                  >{{ item.buyMember?.nickname || '我的昵称' }}
                  <!-- <span style="border: 1px solid red; color: red; padding: 2rpx 5rpx">{{ item.lianLevel.level_num }}</span> -->
                </view>
                <view class="mt-[12rpx] text-gray-400">{{ item.create_time || '时间' }}</view>
              </view>
              <view>
                <span v-if="item.status === 1" style="color: blue">已结算</span>
                <span v-else-if="item.status === 0" style="color: limegreen">待结算</span>
                <span v-else></span>
              </view>
            </view>
            <view class="bottomClass text-[24rpx]" style="padding-top: 20rpx; margin-top: 30rpx; border-top: 1px solid #fbfbfb">
              <view class="dataClass" style="color: #000">
                <view class="text-gray-400"> 奖励金额(元) </view><view class="mt-[22rpx] text-[38rpx]" style="color: #ff4500; font-weight: 540"> {{ item.dividend_amount || 0 }} </view></view
              >
              <!-- <view class="dataClass" style="color: #000">
                <view class="text-gray-400"> 订单金额(元) </view><view class="mt-[22rpx] text-[38rpx]" style="color: #ffb397; font-weight: 540"> {{ item.order_amount || 0 }} </view>
              </view> -->
              <view class="dataClass" style="color: #000">
                <view class="text-gray-400"> 下单区域 </view>
                <view class="mt-[22rpx] text-[30rpx]">
                  {{item.agent_area}}
                </view>
              </view>
            </view></view
          >
        </view>
      </mescroll-body>
    </view>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { onShow } from '@dcloudio/uni-app'
  import { moneyFormat, img, redirect } from '@/utils/common'
  import { t } from '@/locale'
  import { getReward, getInfo } from '@/addon/ly_area/api/area_agent'
  import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
  import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
  import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
  import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
  const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom)
  const rewardList = ref([])
  const infoList = ref([])
  onShow(() => {
    getInfo().then((res: any) => {
      let data = res.data
      if (Object.keys(data).length) {
        // console.log(res.data)
        infoList.value = res.data
      } else {
        //   redirect({ url: '/addon/shop_fenxiao/pages/apply', mode: 'redirectTo' })
      }
    })
  })
  const getRewardData = (mescroll) => {
    let data: object = {
      page: mescroll.num,
      limit: mescroll.size,
    }
    getReward(data)
      .then((res) => {
        let newArr = res.data.data as Array<Object>
        //设置列表数据
        if (mescroll.num == 1) {
          rewardList.value = [] //如果是第一页需手动制空列表
        }
        rewardList.value = rewardList.value.concat(newArr)
        mescroll.endSuccess(newArr.length)
        console.log(rewardList.value)
      })
      .catch(() => {
        mescroll.endErr() // 请求失败, 结束加载
      })
  }
  // 申请提现
  const applyCashOut = () => {
    uni.setStorageSync('cashOutAccountType', 'commission')
    redirect({ url: '/app/pages/member/apply_cash_out' })
  }
  </script>
  
  <style lang="scss" scoped>
  page {
    background: #f6f6f6;
  }
  .top {
    padding: 36rpx;
    background-color: #ff514a;
  }
  .topClass {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tixian {
      width: 110rpx;
      height: 60rpx;
      background-color: transparent;
      border: 1px solid #fff;
      border-radius: 15rpx;
      color: #fff;
      font-size: 26rpx;
      padding: 0;
      line-height: 60rpx;
    }
  }
  .bottomClass {
    padding: 0 36rpx;
    margin-top: 60rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .dataClass {
      // min-width: 226rpx;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      // &:nth-child(2) {
      //   border-left: 1px solid #fff;
      //   border-right: 1px solid #fff;
      // }
    }
  }
  .listBox {
    margin-top: -20rpx;
    background-color: #fff;
  }
  .listClass {
    padding: 30rpx;
    height: 220rpx;
    border-bottom: 15rpx solid #f2f2f2;
  }
  </style>
  