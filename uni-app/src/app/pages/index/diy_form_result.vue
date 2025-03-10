<template>
    <view :style="themeColor()">
        <view class="w-screen h-screen flex flex-col items-center" v-if="recordInfo">
            <top-tabbar ref="topTabbarRef" :data="topTabbarParam" />
            <view class="flex-1 flex flex-col items-center w-full pt-[180rpx]">
                <text class="nc-iconfont nc-icon-duihaoV6mm text-[#06ae56] mb-[30rpx] !text-[65rpx]"></text>
                <view class="px-[30rpx] text-center leading-[1.3] text-[42rpx] font-bold mb-[30rpx]">{{ recordInfo.submitConfig.tips_type == 'default' ? '填写成功' : recordInfo.submitConfig.tips_text }}</view>
                <view class="text-[32rpx] mt-[32rpx] text-[#576b95]" @click="toDetail()">{{ t('diyForm.viewFillingDetails') }}</view>
            </view>
            <view class="pb-[260rpx] action-wrap">
                <template v-if="recordInfo.submitConfig.success_after_action.finish">
                    <button class="w-[380rpx] !border-0 h-[80rpx] text-[28rpx] !text-[#ffffff] !bg-[#20bf64] flex-center font-500 rounded-[6rpx]" :plain="true" @click="finishFn">{{ t('complete') }}</button>
                </template>
                <template v-if="recordInfo.submitConfig.success_after_action.goBack">
                    <button class="w-[380rpx] !border-0 h-[80rpx] text-[28rpx] text-[#333] !bg-[#f2f2f2] flex-center font-500 rounded-[6rpx]" :plain="true" @click="goBack">{{ t('diyForm.back') }}</button>
                </template>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getFormResultInfo } from '@/app/api/diy_form';
import { t } from '@/locale'
import { redirect } from '@/utils/common'
import { topTabar } from '@/utils/topTabbar'

const recordInfo = ref<AnyObject | null>(null)
const recordId = ref(0)
const formId = ref(0)

/********* 自定义头部 - start ***********/
const topTabarObj = topTabar()
let topTabbarParam = topTabarObj.setTopTabbarParam({ title: '', isBack: false })
/********* 自定义头部 - end ***********/

onLoad((data: any) => {
    recordId.value = data.record_id || 0;
    formId.value = data.form_id || 0;
    getInfo()
})

/**
 * 获取表单填写信息
 */
const getInfo = () => {
    getFormResultInfo({
        record_id: recordId.value
    }).then((res: any) => {
        recordInfo.value = res.data
    })
}

const toDetail = () => {
    redirect({ url: '/app/pages/index/diy_form_detail', param: { record_id: recordId.value }, mode: 'redirectTo' })
}

const finishFn = () => {
    redirect({
        url: '/app/pages/index/index',
        mode: 'reLaunch'
    });
}

const goBack = () => {
    redirect({ url: '/app/pages/index/diy_form', param: { form_id: formId.value }, mode: 'redirectTo' })
}
</script>

<style lang="scss" scoped>
.action-wrap {
    button {
        margin-bottom: 30rpx;

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
