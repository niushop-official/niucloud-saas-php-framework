<template>
  <view :style="themeColor()">
    <scroll-view scroll-y="true" class="container">
      <view class="head-wrap">
        <image v-if="gameData.gameInfo.banner_show == 1" :src="img(gameData.gameBanner[0]['banner_image'])" mode="widthFix"></image>
        <image v-else :src="img('/addon/turntable/turntable_head.png')" mode="widthFix"></image>
        <view class="rule-mark" @click="emit('openRulePopup')">规则</view>
      </view>
      <view class="turntable-wrap" :style="{ backgroundImage: 'url(' + img('/addon/turntable/turntable_bg.png') + ')' }">
        <view class="wrap">
          <view class="award-wrap" v-for="(item, index) in gameData.gameInfo.award" :key="index">
            <view class="box" :class="{ on: index == gameData.currentIndex }">
              <view class="award-img">
                <image :src="img(item.award_img)" mode="widthFix"></image>
              </view>
              <view class="award-text">{{ item.award_name }}</view>
            </view>
          </view>
          <block v-if="gameData.gameInfo.status == 2">
            <block v-if="gameData.gameInfo.surplus_num > 0 || !memberInfo">
              <view class="star-box" @click="emit('lottery')">
                <view class="text">立即抽奖</view>
                <view class="tips" v-if="memberInfo">剩余{{ gameData.gameInfo.surplus_num }}次</view>
                <view class="tips" v-else>请登录</view>
              </view>
            </block>
            <block v-else-if="gameData.gameInfo.is_app === true">
              <view class="star-box" @tap="redirect({url:'/addon/dianz_invitation/pages/invitation/index',mode:'redirectTo'})">
                <view class="text">去赚抽奖</view>
                <view class="tips">剩余{{ gameData.gameInfo.surplus_num }}次</view>
              </view>
            </block>
            <block v-else>
              <view class="star-box disabled">
                <view class="text">立即抽奖</view>
                <view class="tips">剩余{{ gameData.gameInfo.surplus_num }}次</view>
              </view>
            </block>
          </block>
          <block v-else-if="gameData.gameInfo.status == 1">
            <view class="status-box">
              <view>活动尚未开始</view>
            </view>
          </block>
          <block v-else>
            <view class="status-box">
              <view>活动已经结束</view>
            </view>
          </block>
        </view>
      </view>
      <view class="action-text">
        <view class="point">
          <text>我的积分：{{ gameData.point }}</text>
        </view>
        <view class="record" @click="toDetail(gameData.gameId)">
          <text>我的中奖记录</text>
        </view>
      </view>
      <!-- 中奖名单开始 -->
      <view class="record-wrap" v-if="gameData.gameInfo.is_show_winner == 0 && gameData.drawRecord.length">
        <view class="body-shade"></view>
        <view class="head">中奖名单</view>
        <view class="body">
          <view class="wrap" :class="{ animate: gameData.animate }">
            <view v-for="(item, index) in gameData.drawRecord" :key="index">
              <view class="tit">{{ cover(item.member_nick_name)}}</view>
              <view class="txt">
                <l-time :text="item.create_time "></l-time>
                获得 {{ item.award_name }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 中奖名单结束 -->
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import {img, redirect} from "@/utils/common";
import LTime from '@/addon/turntable/pages/components/l-time/l-time.vue';
import { cover } from "@/addon/turntable/utils/utils";
//定义接收父传入的props
defineProps<{
  gameData: {},
  memberInfo:{}
}>()
//调取父类方法
const emit = defineEmits<{
  (event: 'openRulePopup'): void
  (event:'lottery'):void
  (event:'toDetail'):void
}>()
const toDetail = (game_id: string | number) => {
  redirect({ url: '/addon/turntable/pages/game/record', param: { game_id: game_id }, mode: 'navigateTo'})
}
</script>
<style lang="scss" scoped >
.container {
  width: 100vw;
  height: 105vh;
  background-image: linear-gradient(#f3623f, #f74222);
}
.head-wrap {
  position: relative;

  image {
    width: 90%;
    margin: 0 auto;
    display: block;
  }

  .rule-mark {
    position: absolute;
    right: 0;
    top: 60rpx;
    background-color: #ffe854;
    color: #ff7908;
    height: 60rpx;
    line-height: 60rpx;
    padding: 0 30rpx;
    border-top-left-radius: 60rpx;
    border-bottom-left-radius: 60rpx;
  }
}
.turntable-wrap {
  margin: 30rpx;
  padding: 70rpx 50rpx 70rpx 70rpx;
  background-size: 100% 100%;
  border-radius: 16rpx;
  transform: translateY(-200rpx);
  .wrap {
    width: 100%;
    position: relative;
    overflow: hidden;
    height: 536rpx;
  }
  .star-box {
    position: absolute;
    width: calc(33.33333333% - 20rpx);
    height: 100rpx;
    background: linear-gradient(#ffe1ac, #fec965);
    top: 182rpx;
    left: 33.33333333%;
    height: 162rpx;
    border-radius: 8rpx;
    box-shadow: 0 0.25em 0 rgba(225, 157, 31, 1);
    text-align: center;

    .text {
      font-size: 34rpx;
      margin: 30rpx 0 0 0;
      line-height: 60rpx;
      font-weight: 600;
      color: #ff3301;
      text-align: center;

      &.no-tips {
        margin-top: 50rpx;
      }
    }

    .tips {
      font-size: 24rpx;
      display: inline-block;
      margin: 0 auto;
      background: #f0a71d;
      line-height: 1;
      color: #ff3301;
      padding: 6rpx 12rpx;
      border-radius: 24rpx;
    }

    &.disabled {
      box-shadow: 0 0.25em 0 #999;
      background: linear-gradient(#ccc, #aaa);

      .text {
        color: #888;
      }

      .tips {
        color: #777;
        background: #aaa;
      }
    }
    &.to-task {
      box-shadow: 0 0.25em 0 #ed9580;
      background: rgba(255, 255, 255, 0.6);
      .tips {
        color: #777;
        background: #aaa;
      }
    }
  }

  .status-box {
    position: absolute;
    width: calc(33.33333333% - 20rpx);
    background: #ed9580;
    top: 182rpx;
    left: 33.33333333%;
    height: 168rpx;
    border-radius: 8rpx;
    text-align: center;
    padding: 0 20rpx;
    box-sizing: border-box;

    view {
      color: #fff;
      font-size: 32rpx;
      letter-spacing: 4rpx;
      margin-top: 30rpx;
    }
  }

  .award-wrap {
    width: 33.33333333%;
    padding-right: 20rpx;
    position: absolute;
    box-sizing: border-box;

    .box {
      width: 100%;
      background: #fff;
      border-radius: 8rpx;
      padding: 20rpx 0;
      box-shadow: inset 0 0 48rpx 0 #ffd6ab, 0 0.25em 0 rgba(248, 166, 131, 0.96);

      &.on {
        background: linear-gradient(#ffe1ac, #fec965);
        box-shadow: 0 0.25em 0 rgba(225, 157, 31, 1);

        .award-text {
          color: #ff3301;
        }
      }

      .award-img {
        width: 70rpx;
        height: 70rpx;
        margin: 0 auto;
        display: flex;
        align-items: center;

        image {
          width: 70rpx;
          height: auto;
        }
      }

      .award-text {
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 10rpx;
        font-size: 24rpx;
        padding: 0 20rpx;
        color: #666;
      }
    }

    &:nth-child(1) {
      top: 0;
    }
    &:nth-child(2) {
      top: 0;
      left: 33.33333333%;
    }
    &:nth-child(3) {
      top: 0;
      left: 66.66666666%;
    }
    &:nth-child(4) {
      top: 182rpx;
      left: 66.66666666%;
    }
    &:nth-child(5) {
      top: 364rpx;
      left: 66.66666666%;
    }
    &:nth-child(6) {
      top: 364rpx;
      left: 33.33333333%;
    }
    &:nth-child(7) {
      top: 364rpx;
      left: 0;
    }
    &:nth-child(8) {
      top: 182rpx;
      left: 0;
    }
  }
}
.action-text {
  margin: 0 50rpx;
  display: flex;
  transform: translateY(-200rpx);

  & > view {
    flex: 1;
    line-height: 1;
  }

  .point {
    color: #fee331;
    .icon-jifen{
      font-size: 30rpx;
      padding-right: 5rpx;
      //vertical-align: middle;
    }
  }

  .record {
    color: #fff;
    text-align: right;
    .icon-wodejilu{
      font-size: 25rpx;
      padding-right: 5rpx;
    }
  }
}
.record-wrap {
  transform: translateY(-200rpx);
  margin: 80rpx 50rpx 30rpx 50rpx;
  border-radius: 10rpx;
  background-color: #ff6e43;
  padding: 12rpx;
  box-shadow: 0 0.45em 0 rgba(217, 42, 0, 1);
  position: relative;
  height: 430rpx;

  .body-shade {
    width: calc(100% - 24rpx);
    height: 60rpx;
    top: 12rpx;
    left: 12rpx;
    background-color: #da2b00;
    position: absolute;
    z-index: 2;
    border-radius: 8rpx;
  }

  .head {
    border: 6rpx solid #ff6e43;
    box-shadow: inset 0 0 10rpx 0 #d92a00, 0 0.45em 0 rgba(217, 42, 0, 1);
    background-color: #da2b00;
    position: absolute;
    z-index: 5;
    text-align: center;
    width: 300rpx;
    height: 70rpx;
    line-height: 70rpx;
    border-radius: 70rpx;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-weight: 600;
    letter-spacing: 4rpx;
  }

  .body {
    background-color: #da2b00;
    border-radius: 8rpx;
    height: 340rpx;
    box-shadow: inset 0 0 10rpx 0 #d92a00;
    padding: 60rpx 30rpx 30rpx 30rpx;
    overflow: hidden;

    .wrap {
      & > view {
        display: flex;
      }

      &.animate {
        transition: all 1s ease-in-out;
        transform: translateY(-60rpx);
      }
    }

    .tit {
      line-height: 60rpx;
      width: 220rpx;
      color: #fff;
    }

    .txt {
      line-height: 60rpx;
      flex: 1;
      color: #fee331;
    }
  }
}
</style>