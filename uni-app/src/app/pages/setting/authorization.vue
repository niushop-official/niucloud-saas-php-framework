<template>
    <view :style="themeColor()">
        <view class="flex flex-col justify-center items-center gap-[20rpx] text-[#06c05d] w-full pt-[240rpx]" v-if="!loading">
            <text class="iconfont -mb-[4rpx] !text-[60rpx] iconxuanzhongduigou"></text>
            <text class="text-[50rpx] font-500">扫码成功</text>
        </view>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { t } from '@/locale'
import { bindMerchant } from '@/app/api/system'
import {handleOnloadParams} from "@/utils/common";

const loading = ref<boolean>(true);
const type = ref('')
onLoad((option: any) => {
  console.log("option",option)
  var params = handleOnloadParams(option)
    type.value = params.tp
    if(type.value == 'b_m'){
        submitAuthorizationFn()
    }
})

const submitAuthorizationFn =()=>{
    bindMerchant({
        'type ': type.value,
        'openid': uni.getStorageSync('openid')
    }).then(res => {
        loading.value = false
    })
}
</script>
<style lang="scss" scoped></style>
