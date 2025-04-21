<template>
    <view class="bg-[#f8f8f8] min-h-[100vh] w-full" :style="themeColor()">
        <view class="w-full" v-if="Object.keys(detail).length">
            <view class="pb-[384rpx]" :style="headerStyle">
                <!-- #ifdef MP-WEIXIN -->
                <top-tabbar :data="param" class="top-header" />
                <!-- #endif -->
            </view>
            <view class="card-template sidebar-margin mt-[-56rpx]">
                <u-form labelPosition="left" :labelWidth="'136rpx'" :labelStyle="{'font-size':'28rpx','font-weight':'400','line-height':'39rpx'}" :model="formData" errorType='toast' :rules="rules" ref="formRef">
                    <view class="h-[88rpx] flex w-full items-center px-[var(--pad-sidebar-m)] rounded-[44rpx] box-border border-[2rpx] border-solid border-[#eee]">
                        <u-form-item :label="t('cardNo')" prop="card_no" :border-bottom="false">
                            <u-input v-model.trim="formData.card_no" border="none" maxlength="40"
                                     :placeholder="t('cardNumberPlaceholder')" autocomplete="off"
                                     class="!bg-transparent" :disabled="real_name_input" fontSize="26rpx"
                                     placeholderClass="!text-[var(--text-color-light9)] text-[26rpx]" />
                        </u-form-item>
                    </view>
                    <view class="mt-[30rpx] h-[88rpx] flex w-full items-center px-[var(--pad-sidebar-m)] rounded-[44rpx] box-border border-[2rpx] border-solid border-[#eee]">
                        <u-form-item :label="t('cardKey')" prop="card_key" :border-bottom="false">
                            <u-input v-model.trim="formData.card_key" border="none" type="password" maxlength="40"
                                     :placeholder="t('passwordPlaceholder')" autocomplete="off" class="!bg-transparent"
                                     :disabled="real_name_input" fontSize="26rpx" placeholderClass="!text-[var(--text-color-light9)] text-[26rpx]" />
                        </u-form-item>
                    </view>
                </u-form>
            </view>
            <view class="card-template sidebar-margin mt-[var(--sidebar-m)]" v-if="detail.tips">
                <view class="title">{{ t('reminder') }}</view>
                <view class="u-content">
                    <u-parse :content="detail.tips" :tagStyle="{img: 'vertical-align: top;',p:'overflow: hidden;word-break:break-word;' }"></u-parse>
                </view>
            </view>
            <view class="w-full footer">
                <view class="py-[var(--top-m)] px-[var(--sidebar-m)] bg-[#f8f8f8] footer w-full fixed bottom-0 left-0 right-0 box-border">
                    <button hover-class="none" class="primary-btn-bg text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[26rpx] font-500" :class="{'opacity-40':disable}" @click="save">{{ t('activateCard') }}</button>
                </view>
            </view>
            <uni-popup ref="popupRef" type="center" :is-mask-click="false">
                <view class="bg-[#fff] w-[530rpx] min-h-[504rpx] rounded-[var(--rounded-big)] box-border p-[32rpx] relative"
                    :style="{'background-image':'url('+img('addon/shop_giftcard/popup_bg.png')+')',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'top',}">
                    <image class="w-[327rpx] h-[327rpx] rounded-[var(--rounded-mid)] absolute left-[50%] top-[-163.5rpx] transform -translate-x-1/2 z-10"
                        :src="img('addon/shop_giftcard/popup_top.png')" :mode="'aspectFill'" />
                    <view class="text-[40rpx] leading-[56rpx] font-bold text-center pt-[174rpx]">{{ t('popupTipsOne') }}</view>
                    <view class="text-[24rpx] leading-[34rpx] text-center mt-[30rpx]">{{ t('popupTipsTwo') }}</view>
                    <button class="w-[370rpx] h-[80rpx] font-500 text-[26rpx] leading-[80rpx] !text-[#fff] primary-btn-bg m-0 !mx-auto rounded-[40rpx] remove-border mt-[90rpx]" @click="tolink">{{ t('gouToSee') }}</button>
                    <view class="nc-iconfont nc-icon-cuohaoV6xx text-[57rpx] text-[#fff] absolute left-[50%] bottom-[-117rpx] transform -translate-x-1/2 z-10" @click="close"></view>
                </view>
            </uni-popup>
        </view>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { redirect, img, getToken } from '@/utils/common';
import { onLoad } from '@dcloudio/uni-app'
import { ref, reactive, computed, onMounted } from 'vue'
import { activateCard } from '@/addon/shop_giftcard/api/card';
import { getGiftCardConfig } from '@/addon/shop_giftcard/api/giftcard';
import { t } from '@/locale'
import { topTabar } from '@/utils/topTabbar';
import { useLogin } from '@/hooks/useLogin'

/********* 自定义头部 - start ***********/
const topTabarObj = topTabar()
let param = topTabarObj.setTopTabbarParam({ title: t('cardEncryptionActivation') })
/********* 自定义头部 - end ***********/

const real_name_input = ref(true);
const detail: any = ref({})
const loading = ref(true)
const disable = ref(false)
const formData = ref({
    card_no: '',
    card_key: ''
})

const headerStyle = computed(() => {
    return {
        backgroundImage: 'url(' + img(detail.value.banner || '') + ') ',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
    }
})

onLoad(() => {
    getGiftCardConfigFn()
})

onMounted(() => {
    // 防止浏览器自动填充
    setTimeout(() => {
        real_name_input.value = false;
    }, 800)
});

const rules = computed(() => {
    return {
        'card_no': {
            type: 'string',
            required: true,
            message: t('cardNumberPlaceholder'),
            trigger: ['blur', 'change'],
        },
        'card_key': {
            type: 'string',
            required: true,
            message: t('passwordPlaceholder'),
            trigger: ['blur', 'change']
        },
    }
})

const getGiftCardConfigFn = () => {
    loading.value = true
    getGiftCardConfig().then((res: any) => {
        detail.value = res.data
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}

const popupRef = ref()
const formRef: any = ref(null)

const save = () => {
    if (!getToken()) {
        useLogin().setLoginBack({
            url: '/app/pages/index/index'
        })
        return false
    }
    if (disable.value) return
    formRef.value.validate().then(() => {
        disable.value = true
        activateCard(formData.value).then((res: any) => {
            if (res.data) {
                popupRef.value.open()
                // 激活成功，清空输入框内容
                formData.value.card_no = '';
                formData.value.card_key = '';
            }
            disable.value = false
        }).catch(() => {
            disable.value = false
        })
    })
}

const tolink = () => {
    popupRef.value.close()
    redirect({ url: '/addon/shop_giftcard/pages/my_card_list', mode: 'redirectTo' })
}
const close = () => {
    popupRef.value.close()
}
</script>

<style lang="scss" scoped>
:deep(.u-input) {
    background-color: transparent !important;
}

:deep(.u-checkbox) {
    margin: 0 !important;
}

:deep(.u-form-item) {
    flex: 1;

    .u-line {
        display: none;
    }
}

.footer {
    height: calc(80rpx + var(--top-m) + var(--top-m) + constant(safe-area-inset-bottom)) !important;
    height: calc(80rpx + var(--top-m) + var(--top-m) + env(safe-area-inset-bottom)) !important;
}

:deep(view[name="content"]) {
    transform: scaleX(1) scaleY(1) !important;
}
</style>
