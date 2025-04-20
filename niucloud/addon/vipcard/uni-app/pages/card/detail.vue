<template>
  <view :style="themeColor()">
    <view class="bg-[#f7f7f7] min-h-screen overflow-hidden px-[24rpx] pt-[20rpx]" v-if="!loading">
      <u-swiper :list="carousel" height="380rpx" radius="18rpx"></u-swiper>
      <view class="chunk-wrap pt-4 pb-3 rounded-lg relative mt-[24rpx]">
        <view class="font-bold multi-hidden">
          {{ detail.goods_name }}
        </view>
        <view class="flex items-center mt-2 text-[#F55246] text-base font-bold"><text class="text-xs">￥</text>{{ detail.price }}</view>
        <view class="flex items-center mt-[16rpx] justify-between">
          <text class="text-sm text-[#888]">{{ t('soldOut') }} {{ detail.sale_num }}</text>
          <text class="text-sm text-[#888]"
            >{{ t('create') }}：{{
              (detail.verify_validity_type == 0 && t('perpetual')) ||
              (detail.verify_validity_type == 1 && detail.verify_validity + t('day')) ||
              (detail.verify_validity_type == 2 && detail.verify_validity)
            }}</text
          >
        </view>
      </view>

      <view class="chunk-wrap pt-[34rpx] scheduling rounded-lg">
        <view class="flex justify-between items-center" @click="calendarShow = true">{{ t('packageIncluded') }}</view>
        <view class="text-xs text-[#888] mt-2" v-if="detail.card_type == 'timecard' || detail.card_type == 'commoncard'">
          {{ detail.card_type == 'commoncard' ? t('hitCount') + detail.common_num + ' ,' : '' }}
          {{ detail.card_type == 'timecard' ? t('unlimitedNumberTimes') : '' }} {{ t('periodValidity')
          }}{{
            (detail.verify_validity_type == 0 && t('perpetual')) ||
            (detail.verify_validity_type == 1 && detail.verify_validity + t('day')) ||
            (detail.verify_validity_type == 2 && detail.verify_validity)
          }}
        </view>
        <view class="py-[20rpx]">
          <view class="flex mb-[30rpx]" @click="toService(item)" v-for="(item, index) in itemList" :key="item.relate_goods_id">
            <image class="w-[162rpx] h-[184rpx] mr-[20rpx] rounded-md" :src="img(item.goods_cover)" mode="aspectFit" />
            <view class="flex flex-col flex-1 py-2 relative">
              <view class="text-sm font-bold truncate">{{ item.goods_name }}</view>
              <view class="text-[#888] text-xs mt-2 flex items-center justify-between" v-if="detail.card_type == 'oncecard'">
                <text>{{ t('usable') }}</text>
                <text>x{{ item.num }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="chunk-wrap pt-[34rpx] pb-[24rpx] scheduling rounded-lg">
        <view class="text-center text-[34rpx] font-bold">-- {{ t('purchaseNotes') }} --</view>
        <view class="scheduling-content mt-2">
          <u-parse :content="detail.buy_info" :tagStyle="{ img: 'vertical-align: top;' }" v-if="detail.buy_info"></u-parse>
          <view v-else>{{ t('noPurchaseNotes') }}</view>
        </view>
      </view>
      <view class="chunk-wrap pt-[34rpx] pb-[24rpx] scheduling rounded-lg">
        <view class="text-center text-[34rpx] font-bold">-- {{ t('cardDetail') }} --</view>
        <view class="scheduling-content mt-2">
          <u-parse :content="detail.goods_content" :tagStyle="{ img: 'vertical-align: top;' }" v-if="detail.goods_content"></u-parse>
          <view v-else>{{ t('noCardDetail') }}</view>
        </view>
      </view>
      <view class="h-[148rpx] tab-bar-placeholder w-screen"></view>
      <view class="flex justify-between bg-white px-3 tab-bar fixed bottom-0 left-0 right-0">
        <view class="flex items-center">
          <view class="flex flex-col items-center mr-[44rpx]" @click="redirect({ url: '/addon/vipcard/pages/index', mode: 'reLaunch' })">
            <image class="w-[44rpx] h-[44rpx]" :src="img('addon/vipcard/vipcard/service/index.png')" mode="aspectFill" />
            <text class="text-xs whitespace-nowrap text-[#454545] mt-1">{{ t('index') }}</text>
          </view>
          <view class="flex flex-col items-center mr-[44rpx]" @click="redirect({ url: '/app/pages/member/contact', mode: 'reLaunch' })">
            <image class="w-[44rpx] h-[44rpx]" :src="img('addon/vipcard/vipcard/service/service.png')" mode="aspectFill" />
            <text class="text-xs whitespace-nowrap text-[#454545] mt-1">{{ t('service') }}</text>
          </view>
          <view class="flex flex-col items-center mr-[44rpx]" @click="collect(detail)">
            <image class="w-[44rpx] h-[44rpx]" v-if="collectId > 0" :src="img('addon/vipcard/vipcard/service/select_collect.png')" mode="aspectFill" />
            <image class="w-[44rpx] h-[44rpx]" v-else :src="img('addon/vipcard/vipcard/service/collect.png')" mode="aspectFill" />
            <text class="text-xs whitespace-nowrap text-[#454545] mt-1">{{ t('collect') }}</text>
          </view>
        </view>
        <u-button :text="t('buy')" class="flex-1 !rounded-3xl !ml-1" type="primary" size="16" @click="toOrder(detail)"></u-button>
      </view>
    </view>
    <loading-page :loading="loading"></loading-page>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch } from 'vue'
  import { onLoad, onShow } from '@dcloudio/uni-app'
  import { img, redirect, getToken, timeStampTurnTime, handleOnloadParams } from '@/utils/common'
  import { getCardDetail, setCollect, getCollect, deleteCollect } from '@/addon/vipcard/api/vipcard'
  import useMemberStore from '@/stores/member'
  import { t } from '@/locale'
  import { useLogin } from '@/hooks/useLogin'

  let carousel = ref([])
  let detail = ref<Array<any>>([])
  let loading = ref<boolean>(true)
  const memberStore = useMemberStore()

  // 向待创建订单提交
  let orderData = {
    goods: [
      {
        num: 1,
        goods_id: ''
      }
    ]
  }

  let goodsId = ref('')
  let itemList = ref([])
  onLoad((option: any) => {
      // #ifdef MP-WEIXIN
      // 处理小程序场景值参数
      option = handleOnloadParams(option);
      // #endif
      goodsId.value = option.id
      loading.value = true
      if (getToken()) {
          memberStore.getMemberInfo()
      }

      getCardDetail(option.id).then((res) => {
          detail.value = res.data
          // 设置头部
          uni.setNavigationBarTitle({
              title: detail.value.goods_name
          })
          // 卡项图片
          carousel.value = []
          if (detail.value.goods_image) {
              detail.value.goods_image = detail.value.goods_image.split(',')
              detail.value.goods_image.forEach((item_img, index) => {
                  carousel.value.push(img(item_img))
              })
          } else {
              carousel.value.push(img(detail.value.goods_cover))
          }
          // 卡项商品列表
          itemList.value = detail.value.item
          loading.value = false
      })
  })

  // 跳转到详情
  const toOrder = (data) => {
    if (!getToken()) {
      useLogin().setLoginBack({ url: '/addon/vipcard/pages/card/detail', param: { id: data.goods_id } })
      return false
    }
    orderData.goods[0].goods_id = data.goods_id
    uni.setStorageSync('vipcardCreateData', orderData)
    redirect({ url: '/addon/vipcard/pages/order/payment' })
  }

  const collectId = ref(0)
  onShow(() => {
    if (getToken()) {
      setTimeout(function () {
        getMemberCollect()
      }, 700)
    }
  })

  const getMemberCollect = () => {
    getCollect({
      goods_id: goodsId.value,
      type: 'vipcard'
    }).then((res) => {
      if (res.data) collectId.value = res.data.id
      if (!res.data) collectId.value = 0
    })
  }

  const collect = (data) => {
    if (!getToken()) {
      useLogin().setLoginBack({ url: '/addon/vipcard/pages/card/detail', param: { id: data.goods_id } })
      return false
    }

    if (collectId.value > 0) {
      deleteCollect(collectId.value).then(() => {
        getMemberCollect()
      })
    } else {
      setCollect({
        goods_id: goodsId.value,
        type: 'vipcard'
      }).then(() => {
        getMemberCollect()
      })
    }
  }

  const toService = (data: AnyObject) => {
    redirect({ url: '/addon/vipcard/pages/service/detail', param: { id: data.relate_goods_id } })
  }
</script>

<style lang="scss" scoped>
  .chunk-wrap {
    @apply bg-white px-4 mb-3;
    .chunk-head {
      height: 84rpx;
      @apply flex justify-between items-center border-0 border-b border-solid border-[#F2F2F2] box-border;
      text {
        &:first-of-type {
          @apply font-bold;
        }
        &:last-of-type {
          @apply text-xs text-[var(--text-color-light9)];
        }
        .iconfont {
          @apply inline-block;
          margin-left: 2rpx;
        }
      }
    }
  }
  .member-price {
    background: linear-gradient(90deg, #fef3e7 0%, #ffffff 100%);
  }
  .text-color {
    color: $u-primary;
  }
  .bg-color {
    background-color: $u-primary;
  }
  .word-all {
    word-break: keep-all;
  }
  .text-scale {
    transform: scale(0.8);
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
  .tab-bar {
    padding-top: 16rpx;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 16rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 16rpx);
  }
  .tab-bar-placeholder {
    padding-bottom: calc(constant(safe-area-inset-bottom) + 32rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 32rpx);
  }
</style>
