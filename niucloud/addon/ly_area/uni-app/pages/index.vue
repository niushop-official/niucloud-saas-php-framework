<template>
  <view
    class="box"
    style="background: #f6f6f6">
    <!-- 个人资料 -->
    <view class="top">
      <view class="topClass">
        <image
          v-if="info.member?.headimg"
          class="w-[90rpx] h-[90rpx] mr-[20rpx]"
          :src="img(info.member.headimg)"
          mode="widthFix"></image>
        <image
          v-else
          class="w-[90rpx] h-[90rpx] rounded-full mr-[20rpx]"
          :src="img('addon/shop_fenxiao/index/head.png')"
          mode="aspectFill"></image>
        <view
          style="flex: 1; color: #fff"
          class="text-[24rpx]">
          <view class="">{{ info.member?.nickname }}</view>
          <view class="mt-[12rpx]">{{ info.hasLevel?.level_name }}&nbsp;&nbsp;{{ info.create_time }}</view>
        </view>
        <button
          class="tixian"
          @click="applyCashOut">
          提现
        </button>
      </view>
      <view class="bottomClass text-[24rpx]">
        <view class="dataClass">
          <view class="text-[42rpx]"> {{ info.area_count_money || 0 }} </view>
          <view class="mt-[18rpx]"> 总收益 </view></view
        >
        <view class="dataClass">
          <view class="text-[42rpx]">
            {{ info.settle_count_money || 0 }}
          </view>
          <view class="mt-[18rpx]"> 已结算收益 </view></view
        >
        <view class="dataClass">
          <view class="text-[42rpx]">
            {{ info.amount_withdraw || 0 }}
          </view>
          <view class="mt-[18rpx]"> 已提现 </view></view
        >
      </view>
    </view>
    <!-- 我的团队和奖励明细 -->
    <view class="flex mt-[40rpx]">
      <view
        class="flex px-[30rpx] rounded-[16rpx] items-center flex-1 mx-[24rpx] h-[140rpx] team-bg"
        @click.stop="redirect({ url: '/addon/ly_area/pages/team' })">
        <image
          class="w-[80rpx] h-[80rpx] mr-[20rpx]"
          src="@/addon/ly_area/img/team1.png"
          mode="widthFix" />
        <view class="flex flex-col">
          <text class="text-[26rpx]">我的团队</text>
          <!-- <text class="text-[#666] text-[24rpx] mt-[20rpx]">{{ teamList.count || 0 }}人</text> -->
        </view>
      </view>
      <view
        class="flex px-[30rpx] rounded-[16rpx] items-center flex-1 mr-[24rpx] h-[140rpx] fenxiao-bg"
        @click.stop="redirect({ url: '/addon/ly_area/pages/sale' })">
        <image
          class="w-[80rpx] h-[80rpx] mr-[24rpx]"
          src="@/addon/ly_area/img/fenxiao.png"
          mode="widthFix" />
        <view class="flex flex-col">
          <text class="text-[26rpx]">奖励明细</text>
          <!-- <text class="text-[#666] text-[24rpx] mt-[10rpx]">{{ 0 }}人</text> -->
        </view>
      </view>
    </view>
	
	<!-- <view class="flex mt-[40rpx]" v-if="info.show_apply == 1"> -->
	<view class="flex mt-[40rpx]">
		<view class="flex w-full h-[110rpx] justify-center items-center" style="background: linear-gradient(to right, #FF6700, #FFA726); border-radius: 16rpx; margin: 0px 12px 0px 12px;"
		 @click.stop="redirect({ url: '/addon/ly_area/pages/apply' })">
			<text class="text-[30rpx] text-white" >申请代理区域</text>
		</view>
	</view>
	
    <!-- 常用功能 -->
    <view
      class="commission-bg mx-[24rpx] my-[20rpx] rounded-[16rpx] mt-[30rpx]">
      <view
        class="text-[32rpx] h-[90rpx] px-[24rpx] leading-[90rpx] border-0 border-b-[2rpx] border-solid border-[#E0E0E0] text-[28rpx] font-bold"
        >代理区域：<text>{{info.full_area || ''}}</text></view>
      <view class="flex flex-wrap common-module pt-[10rpx]">
        <!-- <view class="flex items-center flex-col w-[33.3%] py-[20rpx]" @click="redirect({ url: '/addon/shop_fenxiao/pages/promote' })"> -->
        <view class="flex items-center flex-col w-[50%] py-[20rpx]">
          <view class="flex">
            <view class="text-[36rpx] mt-[12rpx] text-red">{{
              areaOrderStat.order_num || '0'
            }}&nbsp;<text class="text--[16rpx]">单</text></view>
          </view>
          <view class="flex flex-col items-center mt-[30rpx] pb-15rpx">
            <text class="text-[24rpx]">区域订单总数</text>
          </view>
        </view>
        <!-- <view class="flex items-center flex-col w-[33.3%] py-[20rpx]" @click="redirect({ url: '/addon/shop_fenxiao/pages/order' })"> -->
        <view class="flex items-center flex-col w-[50%] py-[20rpx]">
          <view class="flex">
            <view class="text-[36rpx] mt-[12rpx] text-red">{{ areaOrderStat.order_money || '0'}}&nbsp;<text class="text--[16rpx]">元</text></view>
          </view>
          <view class="flex flex-col items-center mt-[30rpx] pb-15rpx">
            <text class="text-[24rpx]">区域订单总额</text>
          </view>
        </view>
		
      </view>
	  <view class="flex flex-wrap common-module pt-[10rpx]">
	    <!-- <view class="flex items-center flex-col w-[33.3%] py-[20rpx]" @click="redirect({ url: '/addon/shop_fenxiao/pages/promote' })"> -->
	    <view class="flex items-center flex-col w-[50%] py-[20rpx]">
	      <view class="flex">
	        <view class="text-[36rpx] mt-[12rpx] text-red">{{
	          areaOrderStat.pay_order || '0'
	        }}&nbsp;<text class="text--[16rpx]">单</text></view>
	      </view>
	      <view class="flex flex-col items-center mt-[30rpx] pb-15rpx">
	        <text class="text-[24rpx]">累计支付</text>
	      </view>
	    </view>
	    <!-- <view class="flex items-center flex-col w-[33.3%] py-[20rpx]" @click="redirect({ url: '/addon/shop_fenxiao/pages/order' })"> -->
	    <view class="flex items-center flex-col w-[50%] py-[20rpx]">
	      <view class="flex">
	        <view class="text-[36rpx] mt-[12rpx] text-red">{{ areaOrderStat.finish_order || '0'}}&nbsp;<text class="text--[16rpx]">单</text></view>
	      </view>
	      <view class="flex flex-col items-center mt-[30rpx] pb-15rpx">
	        <text class="text-[24rpx]">累计完结</text>
	      </view>
	    </view>
	  		
	  </view>
    </view>

    <!-- 绩效任务 -->
    <!-- <view
      class="commission-bg pb-[35rpx] mx-[24rpx] my-[20rpx] rounded-[16rpx] mt-[30rpx]" 
      v-if="taskList.is_show == 1">
      <view
        style="justify-content: space-between; align-items: center"
        class="flex text-[32rpx] h-[90rpx] px-[24rpx] leading-[90rpx] border-0 border-b-[2rpx] border-solid border-[#E0E0E0] text-[28rpx] font-bold"
        ><view>绩效任务</view>
        <view
          class="flex progressClass"
          style="justify-content: space-between; align-items: center">
          <u-line-progress
            height="15"
            :percentage="
              (
                (taskList.limit_days / taskList.level.task_limit_days) *
                100
              ).toFixed(0)
            "
            activeColor="#FC3E75"></u-line-progress
          ><view
            class="text-[24rpx]"
            style="margin-left: 12rpx"
            >剩余{{ taskList.limit_days }}天</view
          ></view
        >
      </view>
      <view class="px-[24rpx]">
        <view
          class="flex"
          v-if="taskList.level.task_boss_first === 1"
          style="
            height: 150rpx;
            border-bottom: 1px solid #f6f6f6;
            justify-content: space-between;
            align-items: center;
          "
          ><view class="left"
            ><view class="text-[28rpx] font-bold">前2直推升级Boss</view
            ><view
              class="mt-[12rpx] flex"
              style="justify-content: space-between; align-items: center"
              ><u-line-progress
                height="15"
                :percentage="((recommendTopList.count / 2) * 100).toFixed(0)"
                activeColor="#FC3E75"></u-line-progress
              ><view class="percentageClass"
                >{{ recommendTopList.count }}/ 2</view
              ></view
            ></view
          ><view
            class="right"
            v-if="((recommendTopList.count / 2) * 100).toFixed(0) == 100"
            >已完成</view
          >
          <view
            class="right"
            v-else
            >未完成</view
          ></view
        >
        <view
          v-if="taskList.level.task_boss_first === 1"
          class="topClass mt-[20rpx]"
          v-for="(item, index) in recommendTop"
          :key="index">
          <image
            v-if="item.lianMember?.headimg"
            class="w-[90rpx] h-[90rpx] mr-[20rpx]"
            :src="img(item.lianMember.headimg)"
            mode="widthFix"></image>
          <image
            v-else
            class="w-[90rpx] h-[90rpx] rounded-full mr-[20rpx]"
            :src="img('addon/shop_fenxiao/index/head.png')"
            mode="aspectFill"></image>
          <view
            style="flex: 1; color: #000"
            class="text-[24rpx]">
            <view style="font-weight: 700"
              >{{ item.lianMember?.nickname || "我的昵称" }}
              <span
                style="border: 1px solid red; color: red; padding: 2rpx 8rpx"
                >{{ item.lianLevel.level_name }}</span
              >
            </view>
            <view class="mt-[12rpx] text-gray-400">{{
              item.create_time || "时间"
            }}</view>
          </view>
        </view>
        <view
          v-if="taskList.level.task_boss_num > 0"
          class="flex"
          style="
            height: 150rpx;
            border-bottom: 1px solid #f6f6f6;
            justify-content: space-between;
            align-items: center;
          "
          ><view class="left"
            ><view class="text-[28rpx] font-bold">直推X人升级Boss</view>
            <view class="mt-[12rpx]"
              ><view
                class="mt-[12rpx] flex"
                style="justify-content: space-between; align-items: center"
                ><u-line-progress
                  height="15"
                  :percentage="
                    (
                      (bossList.count / taskList.level.task_boss_num) *
                      100
                    ).toFixed(0)
                  "
                  activeColor="#FC3E75"></u-line-progress
                ><view class="percentageClass"
                  >{{ bossList.count }}/{{ taskList.level.task_boss_num }}</view
                ></view
              ></view
            ></view
          ><view
            class="right"
            v-if="
              ((bossList.count / taskList.level.task_boss_num) * 100).toFixed(
                0
              ) == 100
            "
            >已完成</view
          >
          <view
            class="right"
            v-else
            >未完成</view
          ></view
        >
        <view 
          v-if="taskList.level.task_boss_num > 0"
          class="topClass mt-[20rpx] pb-[20rpx]"
          v-for="(item, index) in childList"
          :key="index">
          <image
            v-if="item.lianMember?.headimg"
            class="w-[90rpx] h-[90rpx] mr-[20rpx]"
            :src="img(item.lianMember.headimg)"
            mode="widthFix"></image>
          <image
            v-else
            class="w-[90rpx] h-[90rpx] rounded-full mr-[20rpx]"
            :src="img('addon/shop_fenxiao/index/head.png')"
            mode="aspectFill"></image>
          <view
            style="flex: 1; color: #000"
            class="text-[24rpx]">
            <view style="font-weight: 700"
              >{{ item.lianMember?.nickname || "我的昵称" }}
              <span
                style="border: 1px solid red; color: red; padding: 2rpx 8rpx"
                >{{ item.lianLevel.level_name }}</span
              >
            </view>
            <view class="mt-[12rpx] text-gray-400">{{item.create_time || "时间"}}</view>
          </view>
        </view>
      </view>
    </view> -->
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { onShow } from "@dcloudio/uni-app"
import { moneyFormat, img, redirect } from "@/utils/common"
import { t } from "@/locale"
import { getDetail, getTeam, getAccount, getAgentStat, getAreaOrderStat, getInfo, getReward, getOrderStatByArea} from "@/addon/ly_area/api/area_agent"
const detailList = ref([])
const teamList = ref([])
const recommendTopList = ref([])
const taskList = ref([])
const bossList = ref([])
const childList = ref([])
const recommendTop = ref([])
const info = ref([])
const rewardList = ref([])
const areaOrderStat = ref([])
onShow(() => {
  getDetail().then((res: any) => {
    let data = res.data
    if (Object.keys(data).length) {
      // console.log(res.data)
      detailList.value = res.data
    } else {
      //   redirect({ url: '/addon/shop_fenxiao/pages/apply', mode: 'redirectTo' })
    }
  })
  
  getInfo().then((res: any) => {
	  let data = res.data
	  if(Object.keys(data).length) {
		  info.value = res.data
	  } else {
		  
	  }
  })
  getReward().then((res: any) => {
  	  let data = res.data
  	  if(Object.keys(data).length) {
  		  rewardList.value = res.data
  	  } else {
  		  
  	  }
  })
  getOrderStatByArea().then((res: any) => {
  	  let data = res.data
  	  if(Object.keys(data).length) {
  		  areaOrderStat.value = res.data
  	  } else {
  		  
  	  }
  })
  
  
})

// 申请提现
const applyCashOut = () => {
  uni.setStorageSync("cashOutAccountType", "commission")
  redirect({ url: "/app/pages/member/apply_cash_out" })
}
</script>

<style lang="scss" scoped>
page {
  background: #f6f6f6;
  padding-bottom: 100rpx;
}
.top {
  padding: 36rpx;
  // background-color: #fe5a50;
  background: linear-gradient(to right, #fe5a50, #f48400); 

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
.level-wrap {
  background: linear-gradient(90deg, #fde4c0, #fdc274);
}

.commission-bg {
  background: linear-gradient(180deg, #fff9f3 5%, #ffffff 25%, #ffffff 100%);
}

.team-bg {
  background: linear-gradient(135deg, #fff9f9 10%, #ffffff 40%, #ffffff 100%);
}

.fenxiao-bg {
  background: linear-gradient(135deg, #f8feff 10%, #ffffff 40%, #ffffff 100%);
}

.commission-content > view {
  position: relative;
  width: 210rpx;

  &::after {
    content: "";
    position: absolute;
    width: 2rpx;
    height: 60rpx;
    background-color: #d9d9d9;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  &:last-of-type::after {
    width: 0;
    height: 0;
  }
}

.common-module > view {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 2rpx;
    height: 80rpx;
    background-color: #e0e0e0;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  &:nth-child(3n + 1)::after {
    width: 0;
    height: 0;
  }
}
.progressClass {
  .u-line-progress {
    flex: none;
    width: 300rpx;
    transform: rotate(180deg);
  }
  ::v-deep.u-line-progress__text {
    transform: rotate(180deg);
  }
}
::v-deep.u-line-progress {
  flex: none;
  width: 400rpx;
}
.right {
  width: 120rpx;
  height: 60rpx;
  background-color: #fb4674;
  line-height: 60rpx;
  text-align: center;
  border-radius: 30rpx;
  color: #fff;
}
.percentageClass {
  margin-left: 10rpx;
  font-style: italic;
}
</style>
