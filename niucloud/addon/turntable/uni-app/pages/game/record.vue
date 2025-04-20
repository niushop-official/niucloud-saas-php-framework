<template>
  <view class="bg-gray-100 min-h-[100vh]" :class="{'bg-[#fff]':!gameDrawRecordList.length}" :style="themeColor()">
    <mescroll-body ref="recordRef" @init="mescrollInit" @down="downCallback" @up="gameDrawRecordListFn">
      <view class="record-item" v-for="(item, index) in gameDrawRecordList" :key="index">
        <view class="image-wrap">
          <image
              :src="img('/addon/turntable/point.png')"
              mode="widthFix"
              v-if="item.award_type == 1"
          ></image>
          <image
              :src="img('/addon/turntable/balance.png')"
              mode="widthFix"
              v-if="item.award_type == 2"
          ></image>
          <image
              :src="img('/addon/turntable/coupon.png')"
              mode="widthFix"
              v-if="item.award_type == 3"
          ></image>
          <image
              :src="img(item.award_img)"
              mode="widthFix"
              v-if="item.award_type == 4"
          ></image>
        </view>
        <view class="content">
          <view class="name">{{ item.award_name }}</view>
          <view class="cont font-size-goods-tag" v-if="item.award_type == 1"
          >奖励详情：{{ item.point }}个积分</view
          >
          <view class="cont font-size-goods-tag" v-if="item.award_type == 2"
          >奖励详情：{{ item.balance }}元红包</view
          >
          <view class="cont font-size-goods-tag" v-if="item.award_type == 3"
          >奖励详情：优惠券【{{ item.award_name }}】</view
          >
          <view class="cont font-size-goods-tag" v-if="item.award_type == 4"
          >奖励详情：线下实物【{{ item.award_name }}】</view
          >
          <view class="time font-size-goods-tag"
          >中奖时间：{{ item.create_time }}</view
          >
        </view>
        <view
            class="btn color-base-bg"
            v-if="item.award_type == 1"
            @tap="redirect({ url: '/app/pages/member/point'})"
        >查看</view
        >
        <view
            class="btn color-base-bg"
            v-if="item.award_type == 2"
            @tap="redirect({ url: '/app/pages/member/balance'})"
        >查看</view
        >
        <view
            class="btn color-base-bg"
            v-if="item.award_type == 3"
            @tap="redirect('/addon/shop/pages/member/my_coupon')"
        >查看</view
        >
        <view
            class="btn color-material-bg"
            v-if="item.award_type == 4 && item.is_receive ==0 "
            @click="claim(item.record_id)"
        >立即兑奖</view>
        <view v-if="item.award_type == 4 && item.is_receive ==1 " class="btn color-material-receive-bg">已对奖</view>
      </view>
      <mescroll-empty v-if="!gameDrawRecordList.length && loading" :option="{tip : '暂无中奖记录'}"></mescroll-empty>
    </mescroll-body>
  </view>
  <up-popup :show="show" mode="center"  @close="close" @open="open" closeOnClickOverlay round="20" :closeable="true">
    <AddressPanel :gameRecord="gameRecord" @close="close()"/>
  </up-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { redirect, img } from '@/utils/common';
import { gameDrawRecordApi } from "@/addon/turntable/api/turntable";
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app';
import AddressPanel from "@/addon/turntable/pages/components/address/addressPanel.vue";
const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);

const recordRef = ref(null);
const gameDrawRecordList = ref<Array<any>>([]);
const loading = ref<boolean>(false);

// 创建响应式数据
const show = ref(false);

const gameRecord = ref({
  game_id: 0,
  record_id:0
});

const gameDrawRecordListFn = (mescroll)=>{
  loading.value = false;
  gameDrawRecordApi({
    game_id: gameRecord.value.game_id,
    page: mescroll.num,
    limit: mescroll.size
  }).then(res => {
    let newArr = res.data.data;
    mescroll.endSuccess(newArr.length);
    //设置列表数据
    if (mescroll.num == 1) {
      gameDrawRecordList.value = []; //如果是第一页需手动制空列表
    }
    gameDrawRecordList.value = gameDrawRecordList.value.concat(newArr);
    loading.value = true;
  }).catch(() => {
    loading.value = true;
    mescroll.endErr(); // 请求失败, 结束加载
  })
}
const redirectTo = (redirectUrl:string)=>{
  redirect({ url: redirectUrl, mode: 'navigateTo'})
}
const claim = (record_id)=>{
  gameRecord.value.record_id = record_id
  show.value = true
}
//页面自动加载
onLoad((option) => {
  if (option.game_id) {
    gameRecord.value.game_id = option.game_id
  }
});

function close() {
  // 关闭逻辑，设置 show 为 false
  show.value = false;
  // console.log('close');
}
// 定义方法
function open() {
  // 打开逻辑，比如设置 show 为 true
  show.value = true;
  // console.log('open');
}
</script>

<style lang="scss" scoped>
page {
  height: 100%;
  background-color: #f4f4f4;
}
.scroll-view {
  flex: 1;
}
.record-item {
  display: flex;
  padding: 30rpx;
  margin: 20rpx 30rpx 0;
  background-color: #fff;
  border-radius: 10rpx;
  align-items: center;

  .image-wrap {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 10rpx;

    image {
      width: 80rpx;
    }
  }

  .content {
    flex: 1;
    padding: 0 20rpx;

    .name {
      line-height: 1;
      color: #303133;
      margin-bottom: 30rpx;
    }

    .time,
    .cont {
      color: #909399;
      line-height: 1;
      margin-top: 20rpx;
    }
    .font-size-goods-tag{
      font-size: 22rpx;
    }
  }

  .btn {
    width: 128rpx;
    color: #fff;
    padding: 6rpx 0;
    text-align: center;
    border-radius: 10rpx;
    font-size: 24rpx;
  }
  .color-base-bg {
    background-color: #ff4544;
  }
  .color-material-bg{
    background-color: #f29100;
  }
  .color-material-receive-bg{
    background-color: #c8c9cc;
  }
}
</style>
