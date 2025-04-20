<template>
  <view :style="themeColor()">
    <view class="overflow-hidden bg-[var(--page-bg-color)] min-h-[100vh] px-[var(--sidebar-m)]" v-show="!loading">
      <view class="h-[200rpx] box-border pt-[46rpx] pl-[40rpx] mt-[20rpx] rounded-angle" :style="{backgroundImage: 'url(' + img('addon/qiankun_recharge/mask_group.png') + ') ',backgroundSize: '100% 100%',backgroundRepeat: 'no-repeat'}">
        <view class="leading-[36rpx] text-[#ffffff] text-[26rpx]">当前余额(元)</view>
        <view class="text-[#fff] ml-[4rpx] text-[56rpx] mt-[16rpx] price-font">
          {{ info ? moneyFormat(info.balance) : '0.00' }}
        </view>
      </view>

      <view class="top-mar card-template">
        <view class="flex items-center border-0 border-b-[2rpx] border-solid border-[var(--temp-bg)] pb-[10rpx] pl-[4rpx]">
          <view class="text-[#333] text-[28rpx] iconfont iconrenminbiV6xx price-font"></view>
          <view class="pl-[20rpx] flex items-center flex-1">
            <input type="digit" class="font-500 text-[54rpx] h-[70rpx] leading-[70rpx] bg-[#fff] price-font" v-model="rechargeAmount" maxlength="8" :placeholder="rechargeAmount?'':(t('minWithdrawal')+ moneyFormat(rechargeConfigObj.min_recharge?rechargeConfigObj.min_recharge:'0.00')+'元')" placeholder-class="apply-price price-font" @input="onInputRecharge" @blur="onInputBlur" :adjust-position="false"/>
            <text @click="clearMoney" v-if="rechargeAmount" class="nc-iconfont nc-icon-cuohaoV6xx1 !text-[32rpx] text-[var(--text-color-light9)]"></text>
          </view>
        </view>
        <view class="flex justify-between item-center mt-[20rpx]  px-[10rpx]">
          <view>
            <text class="text-[24rpx] text-[#888888]">选择充值金额</text>
          </view>
          <view @click="redirect({ url: '/addon/recharge/pages/recharge_record' })">
            <text class="text-[24rpx] text-primary"> {{ t('rechargeRecord') }}</text>
          </view>
        </view>
        <view class="category-container px-[10rpx] mt-[20rpx] ">
          <view v-for="(item,index) in rechargePackage" :key="index"
                :class="['category-item overflow-hidden flex justify-center items-center w-[190rpx] h-[110rpx] box-border border-[1rpx] text-center rounded-[var(--goods-rounded-big)] border-[#ccc] border-solid',{'border-none text-white':activeIndex === index}]"
                :style="{'background': activeIndex === index?'linear-gradient( 283deg, #FD3923 11%, #FF7630 100%), #FFFFFF':''}"
                @click="selectCategory(item, index)">
            <view class="flex flex-col justify-around item-center h-[80rpx]">
              <view class="flex justify-center items-end">
                <text class="text-[36rpx] font-500 leading-[1] price-font">{{ item.recharge }}</text>
                <text class="text-[25rpx] ml-[6rpx] font-500 leading-[30rpx]">{{ t('yuan') }}</text>
              </view>
              <view class="flex justify-center items-center" :style="{'color': activeIndex === index?' #FFFFFF':'#888888'}">
                <text class="text-[22rpx] font-500  price-font mr-[10rpx]">赠送</text>
                <text class="text-[22rpx] font-500 price-font">{{ item.give_price }}</text>
                <text class="text-[22rpx] ml-[6rpx] font-500 ">{{ t('yuan') }}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="mt-[20rpx]" v-if="Object.keys(activeContent).length > 0" @click="rechargeShowRef = true">
          <text class="text-[22rpx] text-[#FF7630]">注：实际到账 {{ add(activeContent.recharge, activeContent.give_price) }}元</text>
          <text v-if="activeContent.give_integral||activeContent.give_price||activeContent.give_coupon.length>0 " class="text-[22rpx] text-[#FF7630]">，赠送：</text>
          <text v-if="activeContent.give_integral" class="text-[22rpx] text-[#FF7630]">{{ activeContent.give_integral }}积分</text>
          <text v-if="activeContent.give_integral && activeContent.give_price" class="text-[22rpx] text-[#FF7630]">，</text>
          <text v-if="activeContent.give_price" class="text-[22rpx] text-[#FF7630]">赠送{{ activeContent.give_price }}元</text>
          <text v-if="activeContent.coupon_id.length>0 && activeContent.give_price" class="text-[22rpx] text-[#FF7630]">，</text>
          <text v-if="activeContent.coupon_id.length>0" class="text-[22rpx] text-[#FF7630]">优惠券×{{ activeContent.coupon_id.length }}</text>
        </view>
      </view>

      <view class="top-mar card-template" v-if="rechargeConfigObj.recharge_explain ">
        <view class="">
          <text class="font-bold text-[33rpx]"> {{ t('rechargeInstructions') }}</text>
        </view>
        <view class="flex flex-col justify-between">
          <view class="">
            <text class="text-[26rpx] text-[#9f9f9f]">{{ rechargeConfigObj.recharge_explain }}</text>
          </view>
        </view>
      </view>
      <view class="tab-bar-placeholder"></view>
      <view class="fixed bottom-[0] tab-bar left-0 right-0 px-[var(--sidebar-m)]">
        <button class="primary-btn-bg h-[80rpx] leading-[80rpx] text-[#fff] text-[26rpx] border-[0] font-500 rounded-[50rpx]" hover-class="none" :style="{'background': disabled ? '#ccc' : '',  'color': disabled ? '#fff' : ''}" :disabled="disabled" :loading="rechargeLoading" @click="recharge">{{ t('confirm') }}</button>
      </view>
      <pay ref="payRef" @close="rechargeLoading = false"></pay>
    </view>
    <view @touchmove.prevent.stop>
      <u-popup :show="rechargeShowRef" @close="closeFn" mode="bottom" round="var(--rounded-big)">
        <view class=" min-h-[480rpx] px-[32rpx] popup-common center">
          <view class="mt-[20rpx]" v-if="Object.keys(activeContent).length > 0">
            <view class="title center !pb-[30rpx]">套餐详情</view>
            <view class="flex items-center mt-[24rpx]">
              <view class="w-[120rpx] flex justify-end">
                <view class="bg-[var(--primary-color-light)] text-[var(--primary-color)] rounded-[6rpx] text-[22rpx] flex items-center justify-center px-[12rpx] h-[38rpx] mr-[10rpx]">充值</view>
              </view>
              <text class="text-[24rpx]">{{ activeContent.recharge }}元</text>
            </view>
            <view class="flex items-center mt-[24rpx]">
              <view class="w-[120rpx] flex justify-end">
                <view class="bg-[var(--primary-color-light)] text-[var(--primary-color)] rounded-[6rpx] text-[22rpx] flex items-center justify-center px-[12rpx] h-[38rpx] mr-[10rpx]">赠送金额</view>
              </view>
              <text class="text-[24rpx]">{{ activeContent.give_price }}元</text>
            </view>
            <view class="flex items-center mt-[24rpx]" v-if="activeContent.give_integral">
              <view class="w-[120rpx] flex justify-end">
                <view class="bg-[var(--primary-color-light)] text-[var(--primary-color)] rounded-[6rpx] text-[22rpx] flex items-center justify-center px-[12rpx] h-[38rpx] mr-[10rpx]">赠送积分</view>
              </view>
              <text class="text-[24rpx]">送{{ activeContent.give_integral }}积分</text>
            </view>
            <view class="flex items-baseline mt-[24rpx]" v-if="activeContent.give_coupon && activeContent.give_coupon.length">
              <view class="w-[120rpx] flex justify-end">
                <view class="bg-[var(--primary-color-light)] text-[var(--primary-color)] rounded-[6rpx] text-[22rpx] flex items-center justify-center px-[12rpx] h-[38rpx] mr-[10rpx]">优惠券</view>
              </view>
              <view class="">
                <view class="flex mb-[10rpx] items-center text-[24rpx] leading-[1.3]" v-for="(couponItem,couponIndex) in activeContent.give_coupon" :key="couponIndex">
                  1张{{ couponItem.title }}优惠券
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="p-[20rpx] ">
          <button class="primary-btn-bg h-[80rpx] leading-[80rpx] text-[#fff] text-[26rpx] border-[0] font-500 rounded-[50rpx]" @click="rechargeShowRef = false">确定</button>
        </view>
      </u-popup>
    </view>
    <loading-page :loading="loading"></loading-page>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { t } from '@/locale'
import { redirect, img, debounce, moneyFormat } from '@/utils/common'
import { useSubscribeMessage } from '@/hooks/useSubscribeMessage'
import useMemberStore from '@/stores/member'
import { onLoad } from '@dcloudio/uni-app'
import request from '@/utils/request'

const rechargeShowRef: any = ref(null)

const rechargePackage = ref([])
const rechargeAmount = ref<string | number>('')
const rechargeLoading = ref(false)
const payRef = ref(null)
const loading = ref(false)
// 当前选中的分类的索引
const activeIndex = ref()
const activeContent = ref({})
// 账户金额
const memberStore = useMemberStore()
const info = computed(() => memberStore.info)
const rechargeConfigObj: any = reactive({})
const recharge_id = ref()
const selectCategory = ((item: any, index: any) => {
  activeIndex.value = index
  rechargeAmount.value = item.recharge
  recharge_id.value = item.id
  activeContent.value = item
})
const disabled = computed(() => {
  if (Object.keys(activeContent.value).length > 0) {
    return
  } else {
    return !rechargeAmount.value || Number(rechargeAmount.value) < Number(rechargeConfigObj.min_recharge)
  }
})

const onInputRecharge = (() => {
  recharge_id.value = null
  activeIndex.value = null
  activeContent.value = {}
  for (let i in rechargePackage.value) {
    if (parseFloat(rechargePackage.value[i].recharge) == parseFloat(rechargeAmount.value)) {
      activeIndex.value = parseInt(i)
      activeContent.value = rechargePackage.value[i]
      recharge_id.value = rechargePackage.value[i].id
      break
    }
  }
})
const onInputBlur = (() => {
  setTimeout(() => {
    if (rechargeAmount.value && Object.keys(activeContent.value).length <= 0) {
      if (Number(rechargeAmount.value) < Number(rechargeConfigObj.min_recharge)) {
        uni.showToast({
          title: t('rechargeAmountError') + rechargeConfigObj.min_recharge + '元',
          icon: 'none'
        })
      }
      // 校验金额格式
      if (!uni.$u.test.amount(rechargeAmount.value)) {
        rechargeAmount.value = parseFloat(rechargeAmount.value).toFixed(2)
      }
    }
  }, 100)
})

onLoad(async (data) => {
  // 提现配置
  await request.get('qiankun_recharge/config').then((res: any) => {
    for (let key in res.data) {
      rechargeConfigObj[key] = res.data[key]
    }
  })

  await request.get('qiankun_recharge/package_list').then((res) => {
    rechargePackage.value = res.data
  })
})

// 清空充值金额
const clearMoney = () => {
  rechargeAmount.value = ''
  recharge_id.value = null
  activeIndex.value = null
  activeContent.value = {}
}

const closeFn = () => {
  rechargeShowRef.value = false
}

/**
 * 发起充值
 */
const recharge = debounce(() => {
  if (uni.$u.test.isEmpty(rechargeAmount.value)) {
    uni.showToast({
      title: t('customRechargeAmount'),
      icon: 'none'
    })
    return
  }
  if (!uni.$u.test.amount(rechargeAmount.value)) {
    uni.showToast({
      title: t('rechargeAmountError'),
      icon: 'none'
    })
    return
  }
  if (rechargeLoading.value) return
  rechargeLoading.value = true
  let data = {
    recharge_money: rechargeAmount.value,
    recharge_id: recharge_id.value ? recharge_id.value : ''
  }
  request.post('qiankun_recharge/recharge', data, { showErrorMessage: true }).then((res: any) => {
    useSubscribeMessage().request('recharge_success')
    payRef.value?.open(res.data.trade_type, res.data.trade_id, '/app/pages/member/index')
    loading.value = false
    rechargeLoading.value = false
  }).catch(() => {
    rechargeLoading.value = false
    loading.value = false
  })
})

const add = (num1, num2) => {
  return parseFloat(num1) + parseFloat(num2)
}
</script>

<style lang="scss" scoped>
:deep(.apply-price) {
  color: var(--text-color-light9);
  font-size: 26rpx;
  font-weight: normal;
  line-height: 76rpx;
}

.tab-bar-placeholder {
  padding-bottom: calc(constant(safe-area-inset-bottom) + 166rpx);
  padding-bottom: calc(env(safe-area-inset-bottom) + 166rpx);
}

.tab-bar {
  padding-bottom: calc(constant(safe-area-inset-bottom) + 30rpx);
  padding-bottom: calc(env(safe-area-inset-bottom) + 30rpx);
}

.category-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 30rpx;
}

.category-item {
  flex: 0 0 calc(33.2% - 20rpx);
}
</style>
