<template>
  <template v-if="gameData.gameInfo.template_name == 'passionate_energy'">
    <passionate-energy  :gameData="gameData" :memberInfo="memberInfo" @openRulePopup="openRulePopup" @lottery="lottery"/>
  </template>
  <template v-else-if="gameData.gameInfo.template_name == 'noble_purple'">
    <noble-purple  :gameData="gameData" :memberInfo="memberInfo" @openRulePopup="openRulePopup" @lottery="lottery"/>
  </template>
  <template v-else-if="gameData.gameInfo.template_name == 'ocean_blue'">
    <ocean-blue  :gameData="gameData" :memberInfo="memberInfo" @openRulePopup="openRulePopup" @lottery="lottery"/>
  </template>
  <template v-else-if="gameData.gameInfo.template_name == 'sunset_red'">
    <sunset-red  :gameData="gameData" :memberInfo="memberInfo" @openRulePopup="openRulePopup" @lottery="lottery"/>
  </template>
  <template v-else>
    <default :gameData="gameData" :memberInfo="memberInfo" @openRulePopup="openRulePopup" @lottery="lottery"/>
  </template>
  <!-- 活动规则 -->
  <up-popup
      :show="rulePopup"
      mode="center"
      :round="20"
      bgColor="transparent"
  >
    <view class="rule-wrap">
      <view class="content-wrap">
        <image :src="img('/addon/turntable/rule_head.png')" mode="widthFix" class="rule-head"/>
        <scroll-view scroll-y="true" class="rule">
          <view>
            <view class="tit">活动时间</view>
            <view class="text">{{ formatRange(gameData.gameInfo.start_time,gameData.gameInfo.end_time)}}</view>
            <view class="tit">参与规则</view>
            <view class="text" v-if="gameData.gameInfo.join_type == 0">每个用户活动期间共有{{ gameData.gameInfo.join_frequency }}次抽奖机会。</view>
            <view class="text" v-else>每个用户活动期间每天都有{{ gameData.gameInfo.join_frequency }}次抽奖机会，每天24点更新。</view>
            <view class="text">每次抽奖需消耗 {{ gameData.gameInfo.points }} 积分</view>
            <view class="text" v-if="gameData.gameInfo.level_id != 0">该活动只有{{ gameData.gameInfo.level_name }}等级的会员可参与。</view>
            <block v-if="gameData.gameInfo.remark != ''">
              <view class="tit">活动说明</view>
              <view class="text">{{ gameData.gameInfo.remark }}</view>
            </block>
          </view>
        </scroll-view>
        <text class="iconfont icon-round-close" @click="closeRulePopup"></text>
      </view>
    </view>
  </up-popup>
  <up-popup
      :show="resultPopup"
      mode="center"
      :round="20"
      bgColor="transparent"
  >
    <view class="result-wrap">
      <block v-if="gameData.result.is_winning">
        <view class="content-wrap yes">
          <image :src="img(gameData.gameInfo.award[gameData.resultIndex].award_img)" mode="widthFix" class="look"/>
          <view class="msg">恭喜您抽中{{ gameData.gameInfo.award[gameData.resultIndex].award_name }}</view>
          <view class="btn" @click="closePopup">继续抽奖</view>
          <text class="iconfont icon-round-close" @click="closePopup"></text>
        </view>
        <image :src="img('/addon/turntable/result_yes.png')" mode="widthFix" class="bg-img"></image>
      </block>
      <block v-else>
        <view class="content-wrap">
          <image :src="img('/addon/turntable/result_look.png')" mode="widthFix" class="look"/>
          <view class="msg">{{gameData.gameInfo.no_winning_desc }}</view>
          <view class="btn" @click="closePopup">继续抽奖</view>
          <text class="iconfont icon-round-close" @click="closePopup"></text>
        </view>
        <image :src="img('/addon/turntable/result_no.png')" mode="widthFix" class="bg-img"></image>
      </block>
    </view>
  </up-popup>
  <up-modal
      :show="modal.show"
      :title="modal.title"
      showCancelButton
      showConfirmButton
      width="550rpx"
      confirmColor="#e94236"
      :confirmText="modal.text"
      @confirm = "modalConfirm"
      @cancel="modalCancel"
    >
    <view class="slot-content text-[#999]">
      <rich-text :nodes="modal.content"></rich-text>
    </view>
  </up-modal>
</template>
<script setup lang="ts">
import {currRoute, currShareRoute, img, redirect} from "@/utils/common";
import { computed, ref, watch } from "vue";
import { onLoad, onShow,onHide } from "@dcloudio/uni-app";
import {getGameInfoApi, lotteryApi} from "@/addon/turntable/api/turntable";
import { getMemberInfo }  from "@/app/api/member"
import useMemberStore from "@/stores/member";
import {formatRange, inArray, cover, convertToQueryParams} from "@/addon/turntable/utils/utils";
import { useLogin } from '@/hooks/useLogin'
import LTime from '@/addon/turntable/pages/components/l-time/l-time.vue';
import PassionateEnergy from '@/addon/turntable/pages/components/template/passionate-energy.vue';
import NoblePurple from '@/addon/turntable/pages/components/template/noble-purple.vue';
import Default from "@/addon/turntable/pages/components/template/default.vue";
import OceanBlue from "@/addon/turntable/pages/components/template/ocean-blue.vue";
import SunsetRed from "@/addon/turntable/pages/components/template/sunset-red.vue";
//游戏规则弹出层组件 ref
const rulePopup = ref(false);
//抽奖结果弹出层组件 ref
const resultPopup = ref(false)

const gameData = ref({
  isClick: false,
  currentIndex: -1, // 当前选中
  maxRing: 6, // 最大圈数,
  currentRing: 1, // 当前圈数
  speed: 300, // 转数
  timer: null,
  gameId: 0, // 活动id
  gameInfo:{
    // 游戏信息
    award: [{
      award_img: '',
      award_name: ''
    }],
    surplus_num: ''
  },
  award: [],
  drawRecord:{},
  gameBanner:[],
  resultIndex: 0,
  result: {
    // 抽奖结果
    is_winning: 1
  },
  point: 0,
  luckyPoint:0,
  animate: false,
  scrollTimer: null,
  //分享时详情所用图片
  shareImg: ''

})
// 会员信息
const memberInfo = computed(() => useMemberStore().info);

// 会员信息
const getMemberPointInfo = ()=>{
  getMemberInfo().then(res=>{
    if(res.data){
      gameData.value.point = res.data.point
    }
  })
}
//游戏信息
const getGameInfo = ()=>{
  getGameInfoApi({
    game_id: gameData.value.gameId || ''
  }).then(res => {
    if(res.data){
      gameData.value.gameInfo = res.data.gameInfo
      gameData.value.gameInfo.award = res.data.award
      gameData.value.drawRecord = res.data.drawRecord.data
      gameData.value.award = []
      gameData.value.gameBanner = res.data.gameBanner
      res.data.award.forEach(e => {
        gameData.value.award.push(e.award_id);
      });
      // console.log(gameData.value.award)
      if (gameData.value.gameInfo.is_show_winner == 0 && gameData.value.drawRecord.length > 6) {
        gameData.scrollTimer = setInterval(scrollRecord, 2000);
      }
    }
  })
}
//抽奖
const lottery = () => {
  if (!memberInfo.value) { 
    useLogin().setLoginBack({ url: '/addon/turntable/pages/game/index', param: { game_id:gameData.value.gameId } })
    return false
  }
  if(gameData.value.gameInfo.status !=2){
      return false
  }
  if(gameData.value.gameInfo.surplus_num <=0){
    if(gameData.value.gameInfo.is_app === true ){
      showModal({
        title: "您的抽奖次数已用完",
        content:'去赚抽奖次数',
        text:'去赚次数'
      })
      return  false
    }
    uni.showToast({
      title: "您的抽奖次数已用完",
      icon:'none',
    })
    return false
  }
  if (gameData.value.gameInfo.points > 0 && gameData.value.point < gameData.value.gameInfo.points) {
    if(gameData.value.gameInfo.is_app === true ){
      showModal({
        title: "积分不足",
        content:'您可以参加活动去赚积分',
        text:'去赚积分'
      })
      return  false
    }
    uni.showToast({
      title: "积分不足",
      icon:'none',
    })
    return false
  }
  if(gameData.value.isClick) return
  lotteryApi({
    game_id: gameData.value.gameId || ''
  }).then(res => {
      // 初始化转盘参数
      initializeDial()

      gameData.value.result = res.data;
      if (res.data.is_winning) {
        gameData.value.resultIndex = inArray(res.data.award_id, gameData.value.award)
      }else{
        gameData.value.resultIndex = inArray(-1, gameData.value.award);
      }
      // 扣除次数 积分
      gameData.value.point -= gameData.value.gameInfo.points;
      gameData.value.gameInfo.surplus_num -= 1;
      if(res.data.award_type ==1){
        gameData.value.luckyPoint = res.data.point
      }
  }).catch(() => {
    gameData.value.isClick =  true
    gameData.value.resultIndex = inArray(-1, gameData.value.award);
  })
}
const initializeDial = ()=>{
  gameData.value.currentIndex = 0
  gameData.value.currentRing = 1
  gameData.value.speed = 300
  gameData.value.timer = setInterval(startRoll, gameData.value.speed);
}
const startRoll = ()=>{
  if (gameData.value.speed > 50) {
    gameData.value.speed -= 50;
  }
  if (gameData.value.currentRing >= gameData.value.maxRing - 1 && gameData.value.speed < 700) {
    gameData.speed += 100;
  }
  if (gameData.value.currentRing == gameData.value.maxRing && gameData.value.currentIndex == gameData.value.resultIndex) {
    clearInterval(gameData.value.timer);
    // 展示中奖结果
    resultPopup.value = true
    return;
  }
  if (gameData.value.currentIndex == 7) {
    gameData.value.currentRing += 1;
    gameData.value.currentIndex = 0;
  }else{
    gameData.value.currentIndex += 1;
  }
  clearInterval(gameData.value.timer);
  gameData.value.timer = setTimeout(startRoll, gameData.value.speed); //开始转动
}
const scrollRecord = ()=>{
  gameData.value.animate = true;
  setTimeout(() => {
    gameData.value.drawRecord.push(gameData.value.drawRecord[0]); // 将数组的第一个元素添加到数组的
    gameData.value.drawRecord.shift();
    gameData.value.animate = false;
  }, 1000);
}
//规则
const openRulePopup = ()=>{
  rulePopup.value = true
}
const closeRulePopup = ()=>{
  rulePopup.value = false
}
const closePopup = ()=>{
  gameData.value.isClick = false
  gameData.value.currentIndex = -1
  gameData.value.point += gameData.value.luckyPoint
  resultPopup.value = false
  gameData.value.luckyPoint = 0
}
/**
 * 转发分享
 */
// #ifdef MP-WEIXIN
const onShareAppMessage = (res)=>{
  var title = gameData.value.gameInfo.game_name;
  var path = currRoute() + '?'+convertToQueryParams(currShareRoute().params);
  return {
    title: title,
    path: path,
    imageUrl: '',
    success: res => {},
    fail: res => {}
  }
}
// #endif
// 分享到微信朋友圈
// #ifdef MP-WEIXIN
const onShareTimeline = (res)=>{
  var title = gameData.value.gameInfo.game_name;
  var path = currRoute() + '?'+convertToQueryParams(currShareRoute().params);
  return {
    title: title,
    query: path,
    imageUrl: '',
    success: res => {},
    fail: res => {}
  }
}
// #endif
onLoad((option) => {
  if (option.game_id) gameData.value.gameId = option.game_id;
  getMemberPointInfo()
  getGameInfo()
});
const show = ref(false)
const title = ref('')
const content = ref('')
const modal = ref({
  title   :'',
  content :'',
  show:false,
  text:''
})
const modalConfirm = () => {
  show.value = false
  redirect({ url: '/addon/dianz_invitation/pages/invitation/index'})
  return true
}
const modalCancel = ()=>{
  modal.value.show = false
}
const showModal = (e:any) => {
  modal.value.title = e.title
  modal.value.content = e.content
  modal.value.text = e.text
  modal.value.show = true
  console.log(modal)
};
onShow(()=>{
  getGameInfo()
})
onHide(()=>{
  clearInterval(gameData.scrollTimer);
})
</script>
<style lang="scss" scoped >
@import '@/addon/turntable/styles/turntable.scss';
.result-wrap {
  position: relative;

  .bg-img {
    width: 80vw;
  }

  .content-wrap {
    position: absolute;
    z-index: 5;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;

    .look {
      margin: 70rpx auto 0 auto;
      display: block;
      width: 120rpx;
    }

    .msg {
      margin: 10rpx auto 0 auto;
      padding: 0 20rpx;
      color: #da2b00;
      width: 70%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .btn {
      width: 50%;
      height: 70rpx;
      line-height: 70rpx;
      border-radius: 10rpx;
      text-align: center;
      color: #da2b00;
      background: linear-gradient(#ffe1ac, #fec965);
      margin: 146rpx auto 0 auto;
    }

    .icon-close {
      position: absolute;
      color: #fff;
      font-size: 70rpx;
      top: -120rpx;
      right: 0rpx;
    }
  }

  .yes {
    .look {
      width: 80rpx;
      height: 80rpx;
      margin-top: 60rpx;
    }

    .btn {
      margin-top: 214rpx;
    }
  }
}

.rule-wrap {
  border-radius: 10rpx;
  background-color: #ffd697;
  width: 80vw;
  padding: 12rpx;
  box-sizing: border-box;

  .content-wrap {
    background-color: #fff2dd;
    width: 100%;
    border-radius: 8rpx;
    position: relative;

    .rule-head {
      width: 100%;
      position: absolute;
      transform: translateY(-50%);
      left: 0;
      top: 0;
    }

    .rule {
      max-height: 880rpx;
      overflow: hidden;
      padding: 80rpx 30rpx 0 30rpx;
      box-sizing: border-box;

      .tit {
        font-weight: 600;
        color: #da2b00;
        margin-top: 10rpx;
      }
      .text {
        font-size: 26rpx;
        color: #da2b00;
      }
    }

    .icon-round-close::before {
      content: "\e609";
      color: #fff;
      text-align: center;
      position: absolute;
      bottom: -150rpx;
      left: 50%;
      transform: translateX(-50%);
      font-size: 70rpx;
    }
  }
}
</style>