<template>
  <view :style="themeColor()">
    <view class="bg-[#F6F6F6] min-h-[100vh]" v-if="!loading">
      <view class="h-[320rpx] box-border px-[32rpx] pt-[44rpx] flex flex-col justify-between" :style="{ background: 'url(' + img('addon/shop_fenxiao/index/header_bg.png') + ') left top / 100% 100% no-repeat' }">
        <view class="flex items-center">
          <view class="!w-[120rpx] !h-[120rpx] rounded-full flex-shrink-0 overflow-hidden">
            <u-avatar v-if="detailList.member.headimg !== ''" :src="img(detailList ? detailList.member.headimg : '')" size="120rpx" leftIcon="none"></u-avatar>
            <u-avatar v-else :src="img('addon/shop_fenxiao/index/head.png')" size="120rpx" leftIcon="none"></u-avatar>
          </view>
          <view class="flex flex-col text-[#303133] ml-[32rpx]">
            <view class="text-[30rpx] truncate max-w-[520rpx]">
              <text class="font-bold whitespace-nowrap">{{ detailList.member.nickname }}</text>
            </view>
          </view>
        </view>
        <view class="flex items-center h-[140rpx] box-border bg-[#233158] rounded-t-[20rpx] p-[30rpx]" @click="redirect({ url: '/addon/ly_shareholder/pages/share_level' })">
          <view class="flex flex-col">
            <view class="flex items-center">
              <image class="w-[30rpx] h-[30rpx] mr-[10rpx]" :src="img('addon/shop_fenxiao/info_vip.png')" mode="widthFix" />
              <text class="text-[28rpx] truncate w-[320rpx] font-bold text-[#FDD6A1] font-bold">{{ detailList.shareholder_level.level_name ? detailList.shareholder_level.level_name : '等级未解锁' }} </text>
            </view>
            <text class="text-[26rpx] text-[#E8D3B6] mt-[20rpx]">下单、邀请好友均可提升等级</text>
          </view>
          <text class="ml-auto level-wrap w-[140rpx] h-[46rpx] text-center rounded-[54rpx] text-[24rpx] leading-[48rpx] text-[#794200]">去升级</text>
        </view>
      </view>

      <view class="commission-bg mx-[24rpx] my-[20rpx] rounded-[16rpx] pb-[35rpx]">
        <view class="flex justify-between h-[90rpx] px-[24rpx] items-center border-0 border-b-[1rpx] border-[#E0E0E0] border-solid">
          <text class="text-[28rpx] font-bold">{{ t('billingInformation') }}</text>
          <view class="text-[#666] text-[26rpx]" @click="cashOutList">
            分红明细
            <text class="iconfont iconxiangyoujiantou !text-[24rpx]"></text>
          </view>
        </view>
        <view class="flex mt-[50rpx] justify-around commission-content">
          <view class="flex flex-col items-center">
            <text class="text-[22rpx] text-[#666]">{{ t('commissionGet') }}</text>
            <text class="text-[#303133] text-[28rpx] font-bold mt-[20rpx]">{{ moneyFormat(detailList.amount) }}</text>
          </view>
          <view class="flex flex-col items-center">
            <text class="text-[22rpx] text-[#666]">{{ t('commission') }}</text>
            <text class="text-[#303133] text-[28rpx] font-bold mt-[20rpx]">{{ moneyFormat(detailList.amount) }}</text>
          </view>
          <view class="flex flex-col items-center">
            <text class="text-[22rpx] text-[#666]">已提现</text>
            <text class="text-[#303133] text-[28rpx] font-bold mt-[20rpx]">{{ moneyFormat(detailList.amount_get) }}</text>
          </view>
          <view class="flex flex-col items-center">
            <text class="text-[22rpx] text-[#666]">{{ t('commissionCashOuting') }}</text>
            <text class="text-[#303133] text-[28rpx] font-bold mt-[20rpx]">{{ moneyFormat(detailList.amount_cash_outing) }}</text>
          </view>
        </view>
        <button class="mt-[40rpx] mx-auto w-[570rpx] h-[76rpx] leading-[76rpx] level-wrap text-[#985400] rounded-[90rpx] text-[28rpx]" @click="applyCashOut">{{ t('applyCashOut') }}</button>
      </view>
    </view>
    <u-loading-page bg-color="rgb(248,248,248)" :loading="loading" loadingText="" fontSize="16" color="#333"></u-loading-page>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { moneyFormat, img, redirect } from '@/utils/common'
import { t } from '@/locale'
import { getDetail } from '@/addon/ly_shareholder/api/shareholder'
let loading = ref<boolean>(true)
const detailList = ref([])
onShow(() => {
  getDetail().then((res: any) => {
    let data = res.data
    if (Object.keys(data).length) {
      // console.log(res.data);
      detailList.value = res.data
      loading.value = false
    } else {
      loading.value = true
      //   redirect({ url: '/addon/shop_fenxiao/pages/apply', mode: 'redirectTo' })
    }
  })
})

// 申请提现
const applyCashOut = () => {
  uni.setStorageSync('cashOutAccountType', 'commission')
  redirect({ url: '/app/pages/member/apply_cash_out' })
}
// 佣金明细
const cashOutList = () => {
  redirect({ url: '/app/pages/member/detailed_account', param: { type: 'commission' } })
}
</script>

<style lang="scss" scoped>
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
    content: '';
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
    content: '';
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
</style>
