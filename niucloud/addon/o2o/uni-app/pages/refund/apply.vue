<template>
  <view class="bg-[#f8f8f8] min-h-screen overflow-hidden" v-if="detail" :style="themeColor()">
    <view class="bg-page">
      <view class="m-[24rpx] px-[24rpx] rounded-md bg-white">
        <view class="flex py-[30rpx] border-0 !border-b !border-[#f5f5f5] border-solid">
          <u--image width="120rpx" height="120rpx" :src="img(orderDetail.item_image)" model="aspectFill">
            <template #error>
              <u-icon name="photo" color="#999" size="50"></u-icon>
            </template>
          </u--image>
          <view class="flex flex-1  flex-col justify-between ml-[20rpx]">
            <view>
              <text class="text-[28rpx] text-item  leading-[40rpx]">{{ orderDetail.item_name }}</text>
            </view>
            <view class="text-[22rpx] mt-[14rpx]">
              <text class="text-[var(--primary-color)] rounded-[6rpx] py-[6rpx] bg-[var(--primary-color-light)] px-[10rpx]">
                {{ orderDetail.item_type_name }}
              </text>
            </view>
            <view class="text-[28rpx] mt-[14rpx] flex justify-between">
              <text class="text-[var(--primary-color)] price-font">￥{{ orderDetail.item_money }}</text>
              <text class="text-[22rpx] ml-[20rpx]">x{{ orderDetail.num }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="bg-page">
      <view class="m-[24rpx] px-[24rpx] rounded-md bg-white">
        <view class="py-[24rpx] flex justify-between items-center">
          <view class="text-sm">{{ t('refundReason') }}</view>
          <view class="flex items-center" @click="refundCausePopup = true">
            <view class="flex-1 text-right">
              <view class="text-xs text-gray-subtitle truncate w-[460rpx]">{{ formData.reason || t('placeholder') }}</view>
            </view>
            <text class="nc-iconfont nc-icon-youV6xx text-[26rpx] text-[var(--text-color-light6)]"></text>
          </view>
        </view>
      </view>
      <view class="m-[24rpx] px-[24rpx] rounded-md bg-white">
        <view class="py-[24rpx] flex items-center">
          <view class="text-sm">{{ t('refundMoney') }}</view>
          <view class="flex-1 text-right">
            <view class="flex justify-end items-center">
              <text class="font-bold text-sm leading-none">￥</text>
              <input type="digit" v-model.number="formData.apply_money" class="font-bold text-sm leading-none" :style="{ width: inputWidth(formData.apply_money) }">
            </view>
            <view class="text-xs text-gray-subtitle mt-[10rpx]">{{ t('moreInputMoney') }}{{ applyMoney }}</view>
          </view>
        </view>
      </view>
      <view class="m-[24rpx] px-[24rpx] rounded-md bg-white">
        <view class="py-[24rpx]">
          <view class="text-sm">{{ t('uploadProof') }}
            <text class="text-xs text-gray-subtitle ml-[10rpx]">{{ t('optional') }}</text>
          </view>
          <view class="p-[20rpx] bg-[#f5f5f5] rounded mt-[20rpx]">
            <u-upload :fileList="voucherListPreview" @afterRead="afterRead" @delete="deletePic" multiple :maxCount="9">
              <view class="flex items-center justify-center w-[140rpx] h-[140rpx] border-[2rpx] border-dashed border-[#ebebec] text-center text-[#888]">
                <view class="nc-iconfont nc-icon-xiangjiV6xx text-[50rpx]"></view>
              </view>
            </u-upload>
          </view>
        </view>
      </view>
      <view class="m-[24rpx] px-[24rpx] rounded-md bg-white">
        <view class="py-[24rpx]">
          <view class="text-sm">{{ t('description') }}
            <text class="text-xs text-gray-subtitle ml-[10rpx]">{{ t('optional') }}</text>
          </view>
          <view class="p-[20rpx] bg-[#f5f5f5] rounded mt-[20rpx] h-[300rpx] relative">
            <textarea v-model="formData.remark" :placeholder="t('descriptionPlaceholder')" placeholder-class="text-sm" :maxlength="100" class="w-full h-full"></textarea>
            <view class="absolute bottom-[20rpx] right-[20rpx]  text-[24rpx] text-[#808080]">
              {{ Number(formData.remark.length) >= 100 ? 100 : formData.remark.length }}/100
            </view>
          </view>
        </view>
      </view>
      <view class="mt-[40rpx] m-[24rpx]">
        <button class="bg-[var(--primary-color)] text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[28rpx]" @click="save" :loading="operateLoading">{{ t('submit') }}</button>
      </view>

      <!-- 退款原因 -->
      <u-popup :show="refundCausePopup" @close="refundCausePopup = false">
        <view class="popup-common" @touchmove.prevent.stop>
          <view class="title">退款原因</view>
          <scroll-view scroll-y="true" class="h-[450rpx] px-[30rpx] box-border">
            <u-radio-group v-model="currReasonName" placement="column" iconPlacement="right">
              <u-radio activeColor="var(--primary-color)" :labelSize="'30rpx'" labelColor="#333" :customStyle="{marginBottom: '34rpx'}" v-for="(item, index) in reason" :key="index" :label="item" :name="item">
              </u-radio>
            </u-radio-group>
          </scroll-view>
          <view class="btn-wrap">
            <button class="primary-btn-bg btn"   @click="refundCausePopupFn">{{ t('confirm') }}</button>
          </view>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { redirect, img, moneyFormat } from '@/utils/common'
import { t } from '@/locale'
import { getOrderDetail, refundApply, getRefundReason } from '@/addon/o2o/api/order'
import { uploadImage } from '@/app/api/system'

const detail = ref(null)
const orderDetail = ref({})
const orderItemId = ref(0)
const refundCausePopup = ref(false)
const formData = ref({
  order_id: detail.value?.order_id,
  order_item_id: orderItemId.value,
  apply_money: '',
  reason: '',
  remark: '',
  voucher: []
})

const reason = ref<string[]>([])
const currReasonName = ref('')
getRefundReason().then(({ data }) => {
  reason.value = data
  if (reason.value && reason.value.length) currReasonName.value = reason.value[0];
})

onLoad((data) => {
  orderItemId.value = data.order_item_id || 0
  formData.value.order_item_id = orderItemId.value
  formData.value.order_id = data.order_id || 0
  getOrderDetail(data.order_id).then(({ data }) => {
    detail.value = data
    detail.value.item.forEach((item, index) => {
      if (orderItemId.value == item.order_item_id) {
        orderDetail.value = item;
      }
    })
    formData.value.apply_money = applyMoney.value
  }).catch(() => {
  })
})

const applyMoney = computed(() => {
  let money = 0
  money = orderDetail.value.item_money
  return moneyFormat(money)
})

const inputWidth = computed((value) => {
  return function (value) {
    if (value == '' || value == 0) {
      return '60rpx';
    } else {
      return String(value).length * 17 + 'rpx';
    }
  };
})

const voucherListPreview = computed(() => {
  if (formData.value.voucher.length) {
    return formData.value.voucher.map(item => {
      return { url: img(item) }
    })
  }
})

const afterRead = (event) => {
  event.file.forEach(item => {
    uploadImage({
      filePath: item.url,
      name: 'file'
    }).then(res => {
      if (formData.value.voucher.length < 9) {
        formData.value.voucher.push(res.data.url)
      }
    }).catch(() => {
    })
  })
}

const deletePic = (event) => {
  formData.value.voucher.splice(event.index, 1)
}

const operateLoading = ref(false)
const save = () => {

  if (!formData.value.reason) {
    uni.showToast({
      title: '请选择退款原因',
      icon: 'none'
    });
    return false;
  }

  if (operateLoading.value) return
  operateLoading.value = true
  let data = formData.value
  data.voucher = data.voucher.toString()
  refundApply(data).then((res) => {
    operateLoading.value = false
    setTimeout(() => {
      redirect({ url: '/addon/o2o/pages/order/detail', param: { order_id: formData.value.order_id } })
    }, 1000)
  }).catch(() => {
    operateLoading.value = false
  })
}

const refundCausePopupFn = () => {
  formData.value.reason = currReasonName.value;
  refundCausePopup.value = false;
}
</script>

<style lang="scss" scoped>
:deep(.u-upload__button) {
  width: 70px !important;
  height: 70px !important;
  border: 1px dashed #ddd;
}

:deep(.u-upload__wrap__preview__image) {
  width: 70px !important;
  height: 70px !important;
}

</style>
