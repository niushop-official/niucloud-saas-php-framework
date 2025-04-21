<template>
  <view class="bg-[#F6F8FA] min-h-screen overflow-hidden" :style="themeColor()">
    <view v-if="!loading">
      <view class="bg-[#fff] rounded-lg mx-3 mt-4 p-3">
        <view class="flex">
          <image class="w-[240rpx] h-[180rpx] rounded mr-3" :src="img(detail.goods.cover_thumb_mid)" mode="aspectFill" />
          <view class="flex flex-col py-1 flex-1">
            <view class="font-bold multi-hidden">{{ detail.goods.goods_name }}</view>
            <view class="text-xs text-[var(--text-color-light6)]" v-if="detail.goods.keywords">{{ detail.goods.keywords }}</view>
            <view class="mt-auto font-bold text-[#FF3223]">￥{{ detail.goods.price }}</view>
          </view>
        </view>
        <view class="flex flex-wrap items-center justify-between text-[var(--text-color-light6)] mt-4">
          <view class="text-xs">{{ t('createTime') }}：{{ detail.create_time }}</view>
          <view class="text-xs">{{ t('periodValidity') }}：{{ detail.expire_time_name }}</view>
        </view>
      </view>

      <view class="flex flex-col mx-3 mt-4 px-3 py-4 bg-[#fff] rounded-lg">
        <view class="self-center mb-3 font-bold">- {{ t('serviceContent') }} -</view>
        <view class="text-xs text-[#888] mb-2">
          <text v-if="detail.card_type == 'commoncard' && detail.total_num">{{ t('hitCount') + detail.total_num }}</text>
        </view>
        <view
          v-for="(item, index) in detail.member_card_item"
          :key="index"
          :class="['bg-[#FBF9FC] rounded-md flex p-2', { 'mb-3': detail.member_card_item.length - 1 != index }]"
        >
          <image class="w-[160rpx] h-[160rpx] rounded mr-3" :src="img(item.cover_thumb_small)" mode="" />
          <view class="flex-1 py-2 flex flex-col">
            <view class="multi-hidden font-bold">{{ item.goods_name }}</view>
            <view class="text-xs text-[var(--text-color-light6)] mt-auto" v-if="detail.card_type == 'oncecard'">{{ t('usable') }}x{{ detail.total_num }}</view>
            <view class="text-xs text-[var(--text-color-light6)] mt-1" v-if="detail.card_type == 'oncecard'"
              >{{ t('haveBeen') }}x{{ detail.total_use_num }}</view
            >
          </view>
          <button
            class="self-center border-[2rpx] border-solid border-[var(--primary-color)] ml-1 w-[128rpx] h-[48rpx] leading-[44rpx] rounded-xl px-[0] text-[var(--primary-color)] text-xs bg-[#fff]"
            @click="verificationFn(item)"
          >
            {{ t('verification') }}
          </button>
        </view>
        <view
          class="text-sm text-[#888] flex items-center self-center mt-4"
          @click="redirect({ url: '/addon/vipcard/pages/order/card_record', param: { card_id: detail.card_id } })"
        >
          <text>{{ t('usageRecord') }}</text>
          <text class="text-[26rpx] nc-iconfont nc-icon-youV6xx"></text>
        </view>
      </view>

      <u-popup :show="verificationShow" @close="verificationShow = false">
        <view class="text-center py-[30rpx] font-bold leading-none">
          <text>{{ t('verificationCode') }}</text>
        </view>
        <view class="flex flex-col p-3 pb-5 items-center">
          <image
            :src="verificationData.verify_code_barcode"
            mode="widthFix"
            class="mb-5 w-[546rpx] h-[auto] border-1 border-[#aba9aa] border-dashed p-1"
           />
          <image :src="verificationData.verify_code_qrcode" mode="widthFix" class="w-[326rpx] h-[auto] border-1 border-[#aba9aa] border-dashed" />
          <view class="text-xs text-[var(--text-color-light6)] mt-3">{{ t('codeDesc') }}</view>
        </view>
      </u-popup>

      <view class="flex flex-col mx-3 mt-4 px-3 py-4 bg-[#fff] rounded-lg">
        <view class="self-center mb-3 font-bold">- {{ t('instructions') }} -</view>
        <view class="mt-2">
          <u-parse :content="detail.goods.goods_content" :tagStyle="{ img: 'vertical-align: top;' }" v-if="detail.goods.goods_content"></u-parse>
          <view v-else>{{ t('noInstructions') }}</view>
        </view>
      </view>
    </view>

    <loading-page :loading="loading"></loading-page>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { img, redirect } from '@/utils/common'
  import { getMembercardDetail } from '@/addon/vipcard/api/vipcard'
  import { t } from '@/locale'

  let detail = ref({})
  let verificationShow = ref(false) //核销弹窗
  const loading = ref(true)
  onLoad((option: any) => {
    getCardDetailFn(option.card_id)
  })

  const getCardDetailFn = (id) => {
    getMembercardDetail(id)
      .then((res) => {
        detail.value = res.data
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
  }

  // 去核销
  let verificationData = ref({})
  const verificationFn = (data) => {
    verificationShow.value = true
    verificationData.value = data
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
</style>
