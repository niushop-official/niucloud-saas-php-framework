<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getLevelList, getDetail, getShareholderOrderStat } from '@/addon/ly_shareholder/api/shareholder'
const activeIndex = ref(0)
const current = ref(0)
const translateX = ref(0)
let list1 = ref<any>([])
let loading = ref<boolean>(true)
// 当 swiper 下标发生变化时触发
const onChange = (ev) => {
  activeIndex.value = ev.detail.current
  // console.log(ev.detail.current)
  if (ev.detail.current > 0) {
    translateX.value = -(154 * ev.detail.current)
  } else {
    translateX.value = 0
  }
}
// 等级列表
const getConfigData = async () => {
  const res: any = await getLevelList()
  list1 = res.data.map((item: any) => {
    return {
      ...item,
      title: item.level_name,
    }
  })
  // console.log(list1)
}

// 订单数据统计
const ShareholderLIst = ref([])
const getShareholderOrderLIst = async () => {
  const res: any = await getShareholderOrderStat()
  ShareholderLIst.value = res.data
  loading.value = false
  // console.log(res.data)
}
// 当前等级
const detailList = ref([])
const detailList1 = ref()
const getDetailList = async () => {
  const res: any = await getDetail()
  detailList.value = res.data.shareholder_level
  detailList1.value = res.data.shareholder_id
  // console.log(res.data.shareholder_id)
}

// 页面加载
onLoad(() => {
  getConfigData()
  getDetailList().then(() => {
    getShareholderOrderLIst()
  })
  current.value = detailList.level_id
  translateX.value = -(154 * current.value)
})
</script>

<template>
  <view class="carousel" v-if="!loading">
    <!-- 会员头像和等级 -->
    <view class="userInfo">
      <view class="info">
        <image mode="scaleToFill" class="image" src="https://hbimg.b0.upaiyun.com/f20328ffb99e9115b1c9a043659e63b1dafc681028c9-yXUaxw_fw236"></image>
        <view class="gradeInfo">{{ detailList.level_name }}</view>
      </view>
      <view class="stepsPage" :style="{ transform: 'translateX(' + translateX + 'rpx)' }">
        <view ref="transformElement" class="vip">
          <view v-for="item in list1" :key="item.id" class="vipImg">
            <image v-if="detailList.level_id === item.level_id" class="vipClass" src="https://img0.baidu.com/it/u=3399285459,3072953455&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500" mode="aspectFit|aspectFill|widthFix" lazy-load="false"> </image>
          </view>
        </view>
        <uni-steps :options="list1" :active="activeIndex" active-color="#402BA4" />
      </view>
      <view class="triangle"></view>
    </view>
    <!-- 轮播图 -->
    <swiper :circular="true" :autoplay="false" :current="current" :interval="3000" @change="onChange" style="height: 500px">
      <swiper-item v-for="item in list1" :key="item.id">
        <view class="detailsPage">
          <text class="ratio">分红比例</text>
          <view class="ratioDetails">
            <image src="https://hbimg.b0.upaiyun.com/f20328ffb99e9115b1c9a043659e63b1dafc681028c9-yXUaxw_fw236" mode="aspectFit|aspectFill|widthFix" lazy-load="false"> </image>
            <view class="p1">{{ item.level_name }}分红比例</view>
            <view class="p2">{{ item.rate }}%</view>
          </view>
          <text class="ratio1">升级条件：{{ item.upgrade_type === 0 ? '满足任意条件' : '满足所有条件' }}</text>
          <view class="p1">自购订单总额</view>
          <view class="progressClass">
            <u-line-progress height="15" :percentage="((ShareholderLIst.order_money / item.order_money) * 100).toFixed(0)" activeColor="#402BA4"></u-line-progress><view class="percentageClass">{{ item.order_money }}元</view>
          </view>

          <view class="p1">自购订单总数</view>
          <view class="progressClass">
            <u-line-progress height="15" :percentage="((ShareholderLIst.order_num / item.order_num) * 100).toFixed(0)" activeColor="#402BA4"></u-line-progress><view class="percentageClass">{{ item.order_num }}单</view>
          </view>

          <view class="p1">充值金额</view>
          <view class="progressClass">
            <u-line-progress height="15" :percentage="((ShareholderLIst.recharge_money / item.recharge_money) * 100).toFixed(0)" activeColor="#402BA4"></u-line-progress><view class="percentageClass">{{ item.recharge_money }}元</view>
          </view>
          <!-- <text class="ratio3">{{ item.upgrade_type === 0 ? '满足任意条件' : '满足所有条件' }}</text> -->
        </view>
      </swiper-item>
    </swiper>
    <u-loading-page bg-color="rgb(248,248,248)" :loading="loading" loadingText="" fontSize="16" color="#333"></u-loading-page>
  </view>
</template>

<style lang="scss">
/* 轮播图 */
.carousel {
  height: 1200rpx;
  overflow: hidden;
  transform: translateY(0);
  .userInfo {
    position: relative;
    height: 300rpx;
    background-color: #6c7de9;
    .info {
      height: 50rpx;
      image {
        position: absolute;
        left: 20rpx;
        top: 10rpx;
        z-index: 2;
        width: 50rpx;
        height: 50rpx;
        border-radius: 50%;
      }
      .gradeInfo {
        background-color: #5d70cf;
        color: #fff;
        font-size: 28rpx;
        padding: 0 20rpx 0 35rpx;
        height: 50rpx;
        line-height: 50rpx;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        position: absolute;
        left: 45rpx;
        top: 10rpx;
      }
    }
    .vip {
      width: 1000rpx;
      display: flex;
      position: relative;
      z-index: 2;
      margin-right: -120rpx;
      margin-left: 350rpx;
      margin-top: 55rpx;
      .vipImg {
        width: 154rpx;
      }
    }
    .vipClass {
      display: flex;
      width: 60rpx;
      height: 60rpx;
    }
    .triangle {
      position: absolute;
      bottom: 0rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 18rpx solid transparent;
      border-right: 18rpx solid transparent;
      border-bottom: 18rpx solid #fff;
    }
  }
  .stepsPage {
    transition-duration: 1s;
    transition-timing-function: ease-in-outr;
  }
  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
  .detailsPage {
    padding: 0 35rpx;
    margin-top: 35rpx;
    .ratio {
      display: block;
      margin-bottom: 20rpx;
      font-weight: 700;
      font-family: Arial, sans-serif;
    }
    .ratio1 {
      display: block;
      margin-bottom: 20rpx;
      margin-top: 35rpx;
      font-weight: 700;
      font-family: Arial, sans-serif;
    }
    .ratio3 {
      display: block;
      margin-bottom: 20rpx;
      margin-top: 100rpx;
      color: #b7bdc6;
      font-family: Arial, sans-serif;
      text-align: center;
    }
    .ratioDetails {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60rpx;
      border-radius: 10rpx;
      background-color: #fef2e4;
      margin-bottom: 10rpx;
      padding: 0 15rpx;
      image {
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
      }
    }
  }
}
.p1 {
  flex: 1;
  color: #b79765;
}
.p2 {
  color: #b79765;
}
::v-deep.uni-steps__row-check {
  margin: 0px !important;
}
::v-deep.uni-steps__row-circle {
  margin: 0px !important;
}
::v-deep.uni-steps__row-circle {
  position: relative !important;
  width: 33rpx !important;
  height: 34rpx !important;
  background-color: #8652ef !important;
  &:before {
    content: '' !important;
    position: absolute !important;
    top: 8rpx !important;
    left: 8rpx !important;
    width: 18rpx !important;
    height: 18rpx !important;
    background-color: #c5a8fc !important;
    border-radius: 50% !important;
  }
}
::v-deep.uniui-checkbox-filled:before {
  content: '' !important;
}
::v-deep.uni-steps__row-check {
  position: relative !important;
  border-radius: 50% !important;
  background-color: #8652ef !important;
  width: 33rpx !important;
  height: 34rpx !important;
  &:before {
    content: '' !important;
    position: absolute !important;
    top: 8rpx !important;
    left: 8rpx !important;
    width: 18rpx !important;
    height: 18rpx !important;
    background-color: #c5a8fc !important;
    border-radius: 50% !important;
  }
}
::v-deep.uni-steps__row-line--before {
  position: relative;
  width: 60rpx !important;
}
::v-deep.uni-steps__row-line--after {
  position: relative;
  width: 60rpx !important;
}
::v-deep.uni-steps__row-line {
  flex: 1;
  height: 8rpx !important;
}
::v-deep.uni-steps__row-title {
  width: 154rpx !important;
}
::v-deep.uni-steps {
  margin-top: 25rpx;
  margin-left: 300rpx;
  width: auto !important;
}
::v-deep.uni-steps__row-text-container {
  margin-bottom: -51px !important;
}
::v-deep.u-line-progress {
  margin: 20rpx 0 !important;
}
.progressClass {
  display: flex;
  align-items: center;
  .percentageClass {
    width: 160rpx;
    margin-left: 10rpx;
    font-style: italic;
  }
}
</style>
