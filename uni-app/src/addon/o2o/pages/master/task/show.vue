<template>
  <view class="bg-[#F5F6FA] min-h-screen overflow-hidden" :style="themeColor()">
    <view class="mx-[30rpx] my-[20rpx] bg-[#fff] rounded-[16rpx]">
      <view class="text-[34rpx] p-[36rpx] border">{{ t('showServiceItem') }}</view>
      <u-form
        labelPosition="left"
        :model="formData"
        errorType="toast"
        ref="serviceRef"
        :labelWidth="100"
        class="px-[30rpx]"
        :labelStyle="{ paddingLeft: '30rpx', fontSize: '28rpx' }">
        <u-form-item :label="t('serviceItem')" prop="item_name">
          <!-- <u-input v-model="formData.item_name" border="none" readonly /> -->
          <view>{{ formData.item_name }}</view>
        </u-form-item>
        <u-form-item :label="t('price')" prop="price">
          <view>{{ formData.price }}{{ t('yuan') }}</view>
        </u-form-item>
        <u-form-item :label="t('serviceImg')" prop="images" class="form-images" v-if="formData.images.length">
          <view class="flex flex-wrap mt-[20rpx] px-[30rpx]">
            <template v-for="(imageItem, imageIndex) in formData.images" :key="'item' + imageIndex">
              <u--image
                class="rounded-[8rpx] overflow-hidden mb-[14rpx]"
                :class="{ 'mr-[18rpx]': (imageIndex + 1) % 3 != 0 }"
                width="168rpx"
                height="168rpx"
                :src="img(imageItem)"
                mode="aspectFill"
                @click="imgListPreview(imageItem)">
                <template #error>
                  <u-icon name="photo" color="#999" size="50"></u-icon>
                </template>
              </u--image>
            </template>
          </view>
        </u-form-item>
      </u-form>
    </view>
    <loading-page :loading="loading"></loading-page>
  </view>
</template>

<script setup lang="ts">
  import { t } from '@/locale'
  import { onLoad, onUnload } from '@dcloudio/uni-app'
  import { ref, reactive } from 'vue'
  import { img, redirect } from '@/utils/common'

  const loading = ref(false)
  const formData = ref<AnyObject>({
    order_id: '',
    order_item_id: '',
    item_name: '',
    price: 0,
    images: [],
    item_images: ''
  })

  onLoad((option: any) => {
    Object.keys(formData.value).forEach((key: string) => {
      if (option[key] != undefined) formData.value[key] = option[key]
      if (key == 'images') {
        formData.value[key] = []
        let img = option.item_images ? option.item_images : null
        if (img) {
          formData.value[key] = option.item_images.split(',')
        } else {
          formData.value[key] = []
        }
      }
    })
  })

  //预览图片
  const imgListPreview = (url) => {
    let urlList = []
    if (formData.value.images) {
      urlList = formData.value.images.map((item) => {
        return img(item)
      })
    }
    uni.previewImage({
      current: img(url),
      urls: urlList,
      indicator: 'number',
      loop: true
    })
  }

  // 关闭预览图片
  onUnload(() => {
    // #ifdef  H5 || APP
    uni.closePreviewImage()
    // #endif
  })
</script>

<style lang="scss" scoped>
  .border {
    border-bottom: 2rpx solid #f2f2f2;
  }

  .form-images :deep(.u-form-item__body) {
    flex-direction: column !important;
  }
</style>
