<template>
  <view class="bg-[#F6F8FA] min-h-screen pt-3" v-if="detail" :style="themeColor()">
    <view class="p-3 bg-[#fff] mx-3 mb-3 rounded-md" v-for="(item, index) in detail.member_card_item" :key="index">
      <view class="flex border-[#F4F4F4] border-solid border-0 border-b-1 pb-3 mb-3">
        <image :src="img(item.cover_thumb_small)" class="w-[160rpx] h-[160rpx] mr-4 rounded" mode="aspectFill" />
        <view class="flex-1">
          <view class="font-bold text-sm">
            {{ item.goods_name }}
          </view>
        </view>
      </view>

      <view class="px-3 bg-page recard-list">
        <view class="py-2 border-[#eee] border-solid border-0 border-b-1" v-for="(logItem, index) in item.member_card_verify">
          <view class="flex mb-2">
            <view class="text-sm">使用时间</view>
            <view class="flex-1 text-right text-sm">{{ logItem.create_time }}</view>
          </view>
          <view class="flex">
            <view class="text-sm">使用次数</view>
            <view class="flex-1 text-right text-sm">{{ logItem.num }}次</view>
          </view>
        </view>
        <view class="py-2 text-xs" v-if="!item.member_card_verify.length">还没有过使用记录</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { img, redirect } from '@/utils/common'
  import { getMembercardDetail } from '@/addon/vipcard/api/vipcard'
  import { t } from '@/locale'

  const detail = ref(null)
  const loading = ref(true)
  let cardId = 0
  onLoad((option) => {
    option?.card_id && (cardId = option.card_id)

    getMembercardDetail(cardId)
      .then(({ data }) => {
        detail.value = data
        loading.value = true
      })
      .catch(() => {
        loading.value = true
      })
  })
</script>

<style lang="scss" scoped>
  .class-select {
    position: relative;
    font-weight: bold;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 6rpx;
      background-color: $u-primary;
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .recard-list > view:last-child {
    border-bottom: 0;
  }
</style>
