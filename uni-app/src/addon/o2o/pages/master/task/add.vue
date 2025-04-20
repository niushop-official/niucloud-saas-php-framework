<template>
  <view class="bg-[#F5F6FA] min-h-screen overflow-hidden" :style="themeColor()">
    <view class="mx-[30rpx] px-[30rpx] my-[20rpx] bg-[#fff] rounded-[16rpx]">
      <view class="text-[34rpx] p-[36rpx] border">{{ formData.order_item_id ? t('editServiceItem') : t('addServiceItem') }}</view>
      <u-form labelPosition="left" :model="formData" errorType="toast" :rules="formRules" ref="serviceRef"
        :labelWidth="100" :labelStyle="{ paddingLeft: '30rpx', paddingReght: '30rpx', fontSize: '28rpx' }">

        <u-form-item :label="t('serviceItem')" prop="item_name" required>
          <u-input v-model.trim="formData.item_name" border="surround" clearable :placeholder="t('serviceItemPlaceholder')" maxlength="50" />
        </u-form-item>
        <u-form-item :label="t('price')" prop="price" required>
          <u-input v-model="formData.price" border="surround" clearable :placeholder="t('pricePlaceholder')" type="digit" maxlength="6">
            <template #suffix>
              <text>{{ t('yuan') }}</text>
            </template>
          </u-input>
        </u-form-item>
        <u-form-item :label="t('serviceImg')" prop="images">
          <view>
            <upload-img v-model="formData.images" :max-count="6" :multiple="true" />
          </view>
        </u-form-item>
        <u-form-item class="mt-[30rpx]">
          <u-button :text="t('save')" @click="onSave()"
            :customStyle="{ borderRadius: '38rpx', color: '#fff', margin: '30rpx 0', backgroundColor: 'var(--primary-color)' }"></u-button>
        </u-form-item>
      </u-form>
    </view>
    <loading-page :loading="loading"></loading-page>
  </view>
</template>

<script setup lang="ts">
import { t } from '@/locale'
import { onLoad } from '@dcloudio/uni-app'
import { ref, reactive } from 'vue'
import { img, redirect } from '@/utils/common'
import { addService, editService } from '@/addon/o2o/api/o2o'
import uploadImg from '@/addon/o2o/pages/master/task/components/upload-img.vue'
import { cloneDeep } from 'lodash-es'

const loading = ref(false)
const formData = ref<AnyObject>({
  order_id: '',
  order_item_id: '',
  item_name: '',
  price: 0,
  images: [],
  item_images: ''
})

onLoad((option) => {
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

const serviceRef = ref<any>(null)
// 表单验证规则
const price_pass = (rule: any, value: string, callback: any) => {
  if (value === '' || value == null) {
    callback(new Error('请输入价格'))
  } else if (Number(value) <= 0) {
    callback(new Error('价格需大于0'))
  } else {
    callback()
  }
}

const formRules = reactive({
  //表单校验不要使用计算属性，计算属性在使用i18n时会反复触发表单校验
  item_name: [{ required: true, message: '请输入服务项目', trigger: 'blur' }],
  price: [{ required: true, validator: price_pass, trigger: 'blur' }]
})

// 提交
const onSave = async () => {
  serviceRef.value.validate().then(() => {
    if (loading.value) return
    loading.value = true
    const data = cloneDeep(formData.value)
    data.item_images = data.images.toString()
    let api = formData.value.order_item_id ? editService : addService
    api(data).then((res) => {
        loading.value = false
        redirect({ url: '/addon/o2o/pages/master/task/detail', param: { order_id: formData.value.order_id } })
      }).catch(() => {
        loading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
.border {
  border-bottom: 2rpx solid #f2f2f2;
}

.form-images :deep(.u-form-item__body) {
  flex-direction: column !important;
}

:deep(.u-form-item .u-form-item__body__left__content__required) {
  left: 6px;
}
</style>
