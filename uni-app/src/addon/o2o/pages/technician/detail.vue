<template>
  <view :style="themeColor()">
    <view class="bg-[#f8f8f8] min-h-screen overflow-hidden pb-3 box-border" v-if="Object.keys(technicianDetail).length">
      <view class="bg-linear h-[480rpx] pt-3">
        <view class="bg-[#fff] rounded-lg  mx-3  p-3 flex items-center">
          <view class="w-[80rpx] h-[80rpx]">
            <u-avatar :src="img(technicianDetail.headimg)" shape="circle" v-if="technicianDetail.headimg" :default-url="img('static/resource/images/default_headimg.png')" class="w-[80rpx] h-[80rpx]" />
            <u-avatar :src="img('static/resource/images/default_headimg.png')" shape="circle" v-else class="w-[80rpx] h-[80rpx]" />
          </view>
          <view class="flex-1 ml-2">
            <view>
              <text>{{ technicianDetail.name }}</text>
            </view>
            <view class="mt-[2rpx] flex flex-wrap items-center" v-if="technicianDetail.label != ''">
              <text class=" text-[22rpx] px-[10rpx] py-[6rpx] border-solid border-[2rpx] border-[var(--primary-color)] text-[var(--primary-color)] rounded-full mb-[4rpx] mr-[10rpx]" v-for="(item,index) in technicianDetail.label.split(',')" :key="index">{{ item }}</text>
            </view>
          </view>
          <view class="nc-iconfont nc-icon-dianhuaV6xx text-[36rpx]" @click="callPhoto(technicianDetail.mobile)"></view>
        </view>
        <view class="mt-[30rpx] bg-[#fff] mx-3  p-3 rounded-lg">
          <u-row justify="space-between">
            <u-col span="3">
              <view class="text-[28rpx] text-center">{{ technicianDetail.order_num }}</view>
              <view class="text-[24rpx] text-center text-[var(--text-color-light9)] mt-[10rpx]">{{ t('orderNum') }}</view>
            </u-col>
            <u-col span="3">
              <view class="text-[28rpx] text-center">{{ technicianDetail.working_age }}{{ t('year') }}</view>
              <view class="text-[24rpx] text-center text-[var(--text-color-light9)] mt-[10rpx]">{{ t('workingAge') }}</view>
            </u-col>
            <u-col span="3">
              <view class="text-[28rpx] text-center">{{ technicianDetail.age }}{{ t('annum') }}</view>
              <view class="text-[24rpx] text-center text-[var(--text-color-light9)] mt-[10rpx]">{{ t('age') }}</view>
            </u-col>
            <u-col span="3">
              <view class="text-[28rpx] text-center">{{ technicianDetail.position_name ? technicianDetail.position_name : '无' }}</view>
              <view class="text-[24rpx] text-center text-[var(--text-color-light9)] mt-[10rpx]">{{ t('position') }}</view>
            </u-col>
          </u-row>
        </view>
      </view>
      <view class="-mt-[185rpx]">
        <view class="mx-3 py-4 px-3 bg-[#fff] rounded-md  box-border" v-if="technicianDetail.desc">
          <view class="text-[28rpx]">{{ t('basicInfo') }}</view>
          <view class="text-[24rpx] mt-[20rpx] leading-[32rpx]">{{ technicianDetail.desc }}</view>
        </view>
      </view>
      <view class="mx-3 py-4 px-3 bg-[#fff] rounded-md box-border" :class="{'mt-[30rpx]':technicianDetail.desc != ''}">
        <view class="text-[28rpx] mb-[20rpx]">{{ t('serviceItem') }}</view>
        <template v-for="(subItem,index) in technicianDetail.goods" :key="index">
          <view class="flex" :class="{'mt-[20rpx]':index}">
            <view class="w-[160rpx] h-[160rpx]" @click="toLink(subItem.goods_info.goods_id)">
              <u--image class="rounded-[10rpx] overflow-hidden" width="160rpx" height="160rpx" :src="img(subItem.goods_info.cover_thumb_small ? subItem.goods_info.cover_thumb_small : '')" model="aspectFill">
                <template #error>
                  <u-icon name="photo" color="#999" size="50"></u-icon>
                </template>
              </u--image>
            </view>
            <view class="flex-1 ml-[20rpx]  flex flex-col justify-between">
              <view>{{ subItem.goods_info.goods_name }}</view>
              <text class="text-[var(--primary-color)] text-[28rpx] price-font">
                ￥{{ goodsPrice(subItem.goods_info) }}
                <image v-if="priceType(subItem.goods_info) == 'member_price'" class="h-[24rpx] ml-[4rpx] w-[60rpx]" :src="img('addon/o2o/VIP.png')" mode="heightFix" />
              </text>
            </view>
          </view>
        </template>
      </view>
    </view>
    <loading-page :loading="loading"></loading-page>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { t } from '@/locale'
import { img, redirect, getToken } from '@/utils/common';
import { getTechnicianDetail } from '@/addon/o2o/api/technician'
import { onLoad, onShow } from '@dcloudio/uni-app'

const loading = ref<boolean>(true);
const technicianDetail = ref({})
let id = 0
onLoad((option: any) => {
  id = option.id || 0
  getTechnicianDetailFn()
})

// 技师详情
const getTechnicianDetailFn = () => {
  loading.value = true
  getTechnicianDetail(id).then(res => {
    technicianDetail.value = res.data
    loading.value = false
  }).catch(() => {
    loading.value = false
  })
}

// 联系技师
const callPhoto = (tel) => {
  uni.makePhoneCall({
    phoneNumber: tel,
  });
}

// 跳转商品详情
const toLink = (goods_id: any) => {
  redirect({ url: '/addon/o2o/pages/goods/detail', param: { goods_id } })
}

// 价格类型
const priceType = (data: any) => {
  let type = "";
  if (data.member_discount && getToken()) {
    type = 'member_price' // 会员价
  } else {
    type = ""
  }
  return type;
}

// 商品价格
const goodsPrice = (data: any) => {
  let price = "0.00";
  if (data.member_discount && getToken()) {
    price = data.goodsSku.member_price // 会员价
  } else {
    price = data.goodsSku.price
  }
  return parseFloat(price).toFixed(2);
}
</script>

<style lang="scss" scoped>
.bg-linear {
  background: linear-gradient(360deg, #F8F8F8 0%, $u-primary 100%);
}
</style>
