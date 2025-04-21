<template>
  <view class="address-panel" :style="themeColor()">
    <!-- 标题 -->
    <view class="title">物流信息</view>
    <view class="content">
      <view class="px-[30rpx] pt-[10rpx]" >
        <u-form labelPosition="left" :model="formData" labelWidth="120rpx" errorType='toast' :rules="rules" ref="formRef">
          <view class="">
            <u-form-item label="收货人" prop="address_name" :border-bottom="true">
              <u-input  v-model.trim="formData.address_name" border="none" clearable maxlength="25" placeholder="请输入收货人姓名"/>
            </u-form-item>
          </view>
          <view class="mt-[10rpx]">
            <u-form-item label="手机号码" prop="mobile" :border-bottom="true">
              <u-input  v-model.trim="formData.mobile" border="none" clearable placeholder="请输入手机号码" maxlength="11"/>
            </u-form-item>
          </view>
          <view class="mt-[10rpx]">
            <u-form-item label="详细地址" prop="full_address" :border-bottom="true">
              <u-input v-model.trim="formData.full_address" border="none" clearable maxlength="120" placeholder="请填写详细地址"/>
            </u-form-item>
          </view>
          <view class="mt-[40rpx] mb-[20px]">
            <up-text type="info" text="填写信息后不可修改，请确认收货信息无误" prefixIcon="warning-fill" iconStyle="font-size: 14px;color:#f1a532" size="14"></up-text>
          </view>
          <view class="mt-[40rpx] mb-[20px]">
            <u-button type="primary" shape="circle" :text="t('save')" @click="save" :disabled="btnDisabled" :loading="operateLoading"></u-button>
          </view>
        </u-form>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
//定义接收父传入的props
import {saveAddressApi} from "@/addon/turntable/api/turntable";

const props = defineProps(['gameRecord']);
//子类调取父类方法
const emit = defineEmits<{
  (event: 'close'): void
}>()
import { ref, computed } from 'vue'
import { t } from '@/locale'
import {redirect} from "@/utils/common";

const btnDisabled = ref(false)
const operateLoading = ref(false)
const formRef = ref(null)
const formData = ref({
  address_name: '',
  mobile: '',
  full_address: '',
  record_id:0
})
const rules = computed(() => {
  return {
    'address_name': {
      type: 'string',
      required: true,
      message: '请输入收货人姓名',
      trigger: ['blur', 'change'],
    },
    'mobile': [
      {
        type: 'string',
        required: true,
        message: '请输入手机号码',
        trigger: ['blur', 'change'],
      },
      {
        validator(rule, value, callback) {
          let mobile = /^1[3-9]\d{9}$/;
          if (!mobile.test(value)){
            callback(new Error(t('mobileError')))
          } else {
            callback()
          }
        }
      }
    ],
    'full_address': {
      type: 'string',
      required: true,
      message: '详细地址如 1单元101',
      trigger: ['blur', 'change'],
    }
  }
})
const save = ()=>{
  formRef.value.validate().then(() => {
    if (operateLoading.value) return
    operateLoading.value = true
    btnDisabled.value = true
    formData.value.record_id = props.gameRecord.record_id
    saveAddressApi(formData.value).then((res) => {
      operateLoading.value = false
      setTimeout(() => {
        btnDisabled.value = false
        uni.showToast({
          title: '信息填写成功,等待客服回电',
          icon: 'none'
        });
        redirect({
          url: '/addon/turntable/pages/game/record',
          mode: 'redirectTo',
          param: {game_id: props.gameRecord.game_id}
        })
      },300)
    }).catch(() => {
      operateLoading.value = false
      btnDisabled.value = false
    })
  })
}
</script>
<style lang="scss" scoped >
.address-panel {
  position: relative;
  width: 90vw;
  border-radius: 10rpx 10rpx 0 0;
  background-color: #fff;
}

.title {
  line-height: 1;
  padding: 30rpx 20rpx;
  font-weight: normal;
  color: #444;
  font-size: large;
  background-color: #f4f4f5;
}
.content {
  min-height: 300rpx;
  max-height: 540rpx;
  overflow: auto;
}
</style>