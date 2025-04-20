<template>
    <view :style="themeColor()">
        <view class="error-msg">{{ errorMsg }}</view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { redirect } from '@/utils/common';
import { onLoad } from '@dcloudio/uni-app'
import { getMsgJumpPath } from '@/app/api/system'

const outTradeNo = ref('')
const errorMsg = ref('')

onLoad((options: any) => {
    if (options.merchant_trade_no) {
        outTradeNo.value = options.merchant_trade_no;
        getMsgJumpPathFn();
    } else {
        errorMsg.value = '缺少merchant_trade_no参数';
    }
});

const getMsgJumpPathFn = () => {
    getMsgJumpPath({
        out_trade_no: outTradeNo.value,
    }).then((res: any) => {
        if (res.data && res.data.path) {
            // 跳转到设置的页面
            redirect({ url: '/' + res.data.path, mode: 'reLaunch' })
        }
    });
}
</script>
<style lang="scss" scoped>
</style>
