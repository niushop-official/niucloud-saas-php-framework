<template>
    <view :style="themeColor()">
        <view class="bg-[var(--page-bg-color)] min-h-screen overflow-hidden" v-if="!loading">
            <view v-if="!loading" class="pb-20rpx">

                <view class="sidebar-margin card-template mt-[var(--top-m)]">
                    <view class="flex justify-between items-center">
                        <view class="text-[#303133] text-[26rpx] font-400 leading-[36rpx]">
                            <text class="iconfont text-[34rpx]" :class="{'iconchuzhikaV6mm text-[#EF000C]':detail.card_right_type=='balance','iconduihuankaV6mm-1 text-[#FF7700]':detail.card_right_type=='goods'}"></text>
                            <text class="ml-[12rpx] text-[28rpx]">{{ detail.card_right_type_name }}</text>
                        </view>
                        <view class="text-[#303133] text-[26rpx] leading-[34rpx]" :class="{'text-primary': detail.status  == 1,'!text-[var(--text-color-light9)]' : detail.status  == -1}">{{ detail.status_name }}</view>
                    </view>
                    <view class="order-goods-item flex justify-between flex-wrap mt-[30rpx]">
                        <view class="w-[240rpx] h-[170rpx] rounded-[var(--goods-rounded-big)] overflow-hidden" @click="cardEvent(detail.giftcard_id)">
                            <u--image radius="var(--goods-rounded-big)" width="279rpx" height="170rpx" :src="img(detail.card_cover ? detail.card_cover : '')" model="aspectFill">
                                <template #error>
                                    <image v-if="detail.card_right_type=='balance'" class="w-[240rpx] h-[170rpx] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img('addon/shop_giftcard/diy/index/value_card.jpg')" mode="aspectFill" />
                                    <image v-else class="w-[240rpx] h-[170rpx] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img('addon/shop_giftcard/diy/index/redemption_card.jpg')" mode="aspectFill" />
                                </template>
                            </u--image>
                        </view>

                        <view class="ml-[20rpx] flex flex-1 flex-col justify-between">
                            <view>
                                <view class="text-[28rpx] max-w-[402rpx] truncate leading-[40rpx] text-[#333]">{{ detail.body }}</view>
                                <view v-if="detail.card_right_type=='balance'" class="text-[26rpx] text-[var(--text-color-light9)] truncate max-w-[402rpx] leading-[28rpx] mt-[14rpx]">{{ detail.balance }}{{ t('yuanStoredValueCard') }}</view>
                            </view>
                            <view class="flex justify-between items-baseline leading-[28rpx] text-[#333] mt-auto">
                                <view class="price-font">
                                    <text class="text-[24rpx]">￥</text>
                                    <text class="text-[40rpx] font-500">{{ parseFloat(detail.card_price).toFixed(2).split('.')[0] }}</text>
                                    <text class="text-[24rpx] font-500">.{{ parseFloat(detail.card_price).toFixed(2).split('.')[1] }}</text>
                                </view>
                                <text class="text-right text-[26rpx] text-[var(--text-color-light9)]">x{{ detail.num }}</text>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="sidebar-margin mt-[var(--top-m)] card-template">
                    <view class="justify-between card-template-item">
                        <view class="text-[28rpx]">{{ t('orderNo') }}</view>
                        <view class="flex items-center text-[28rpx]">
                            <text>{{ detail.order_no }}</text>
                            <text class="w-[2rpx] h-[20rpx] bg-[#999] mx-[10rpx]"></text>
                            <text class="text-[#EF900A]" @click="copy(detail.order_no)">{{ t('copy') }}</text>
                        </view>
                    </view>
                    <view v-if="detail.out_trade_no" class="justify-between card-template-item">
                        <view class="text-[28rpx]">{{ t('orderTradeNo') }}</view>
                        <view class="text-[28rpx]">{{ detail.out_trade_no }}</view>
                    </view>
                    <view class="justify-between card-template-item">
                        <view class="text-[28rpx]">{{ t('createTime') }}</view>
                        <view class="text-[28rpx]">{{ detail.create_time }}</view>
                    </view>
                    <view v-if="detail.pay" class=" card-template-item justify-between">
                        <view class="text-[28rpx]">{{ t('payTypeName') }}</view>
                        <view class="text-[28rpx]">{{ detail.pay.type_name }}</view>
                    </view>
                    <view v-if="detail.pay" class=" card-template-item justify-between">
                        <view class="text-[28rpx]">{{ t('payTime') }}</view>
                        <view class="text-[28rpx]">{{ detail.pay.pay_time }}</view>
                    </view>
                    <view class=" card-template-item justify-between items-baseline">
                        <view class="text-[28rpx]">{{ t('orderMoney') }}</view>
                        <view class="text-[var(--price-text-color)]">
                            <text class="text-[22rpx] leading-[26rpx] price-font">￥</text>
                            <text class="text-[36rpx] font-500 leading-[40rpx] price-font">{{ parseFloat(detail.order_money).toFixed(2).split('.')[0] }}</text>
                            <text class="text-[22rpx] font-500 leading-[28rpx] price-font">.{{ parseFloat(detail.order_money).toFixed(2).split('.')[1] }}</text>
                        </view>
                    </view>
                </view>

                <!-- 订单留言 -->
                <view class="sidebar-margin mt-[var(--top-m)] card-template" v-if="detail.member_remark">
                    <view class="title">{{ t('orderMessage') }}</view>
                    <view class="text-[28rpx] w-full break-all">{{ detail.member_remark }}</view>
                </view>

                <view v-if="detail.status == 1" class="flex z-2 justify-between items-center bg-[#fff] fixed left-0 right-0 bottom-0 min-h-[100rpx] pl-[30rpx] pr-[20rpx] pb-ios">
                    <view class="flex  mr-[34rpx] flex-col justify-center items-center" @click="orderBtnFn('index')">
                        <view class="nc-iconfont nc-icon-shouyeV6xx11 text-[36rpx]"></view>
                        <text class="text-[20rpx] mt-[10rpx]">{{ t('index') }}</text>
                    </view>
                    <view class="flex items-center">
                        <view class="text-[26rpx] font-500 leading-[70rpx] h-[70rpx] w-[190rpx] text-center border-[2rpx] border-solid border-[var(--text-color-light9)] rounded-full text-[var(--text-color-light6)] box-border" @click.stop="orderBtnFn('close')">{{ t('orderClose') }}</view>
                        <button class="ml-[20rpx] w-[190rpx] h-[70rpx] font-500 text-[26rpx] leading-[70rpx] !text-[#fff] m-0  rounded-full  primary-btn-bg remove-border" hover-class="none" @click="orderBtnFn('pay')">{{ t('topay') }}</button>
                    </view>
                </view>
                <view v-if="detail.status == 2" class="flex z-2 justify-between items-center bg-[#fff] fixed left-0 right-0 bottom-0 min-h-[100rpx] pl-[30rpx] pr-[20rpx] pb-ios">
                    <view v-if="detail.have_count > 0" class="flex-1 box-border h-[70rpx] flex-center text-center text-[#fff] primary-btn-bg rounded-full" @click="orderBtnFn('myCard')">
                        <text class="iconfont iconkabaoV6mm text-[26rpx]"></text>
                        <text class="ml-[16rpx] text-[26rpx]">{{ t('seeCardBag') }}</text>
                    </view>
                    <view v-else class="flex-1 box-border h-[70rpx] flex-center !text-[var(--text-color-light9)] !bg-[#F7F7F7] m-0 rounded-full border-solid border-[2rpx] border-[#eee]">{{ t('transfergiftCard') }}</view>

                </view>
            </view>
            <view v-if="detail.status != -1" class="tab-bar-placeholder"></view>
            <logistics-tracking ref="materialRef"></logistics-tracking>
        </view>
        <pay ref="payRef"></pay>
        <loading-page :loading="loading"></loading-page>

        <!-- #ifdef MP-WEIXIN -->
        <!-- 小程序隐私协议 -->
        <wx-privacy-popup ref="wxPrivacyPopupRef"></wx-privacy-popup>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app'
import { t } from '@/locale'
import { img, redirect, copy, getToken, goback } from '@/utils/common';
import { getGiftcardOrderDetail, orderClose } from '@/addon/shop_giftcard/api/order';
import useConfigStore from "@/stores/config";
import { useLogin } from '@/hooks/useLogin'

const detail: any = ref<Object>({});
const loading = ref<boolean>(true);
const orderId = ref('')

const wxPrivacyPopupRef: any = ref(null)

onLoad((option: any) => {
    if (!option.order_id) {
        let parameter = {
            url: '/addon/shop_giftcard/pages/order_list',
            title: t('notOrderId')
        };
        goback(parameter);
    } else {
        // 检测是否登录
        if (!getToken()) {
            useLogin().setLoginBack({
                url: '/addon/shop_giftcard/pages/order_detail',
                param: { order_id: option.order_id }
            })
            return false
        }
        orderId.value = option.order_id;
        orderDetailFn(orderId.value);
        // #ifdef MP
        nextTick(() => {
            if (wxPrivacyPopupRef.value) wxPrivacyPopupRef.value.proactive();
        })
        // #endif
    }
});
onShow(() => {
    if (Object.keys(detail.value).length) orderDetailFn(orderId.value);
})
const orderDetailFn = (id: any) => {
    loading.value = true;
    getGiftcardOrderDetail(id).then((res: any) => {
        detail.value = res.data;
        loading.value = false;
    }).catch(() => {
        loading.value = false;
    })
}

const cardEvent = (giftcard_id: number) => {
    redirect({ url: '/addon/shop_giftcard/pages/detail', param: { giftcard_id } })
}

const payRef = ref(null)
const orderBtnFn = (type = '') => {
    if (type == 'pay') {
        payRef.value?.open(detail.value.order_type, detail.value.order_id, `/addon/shop_giftcard/pages/order_detail?order_id=${ detail.value.order_id }`);
    } else if (type == 'myCard') {
        redirect({ url: '/addon/shop_giftcard/pages/card_bag', param: { order_id: detail.value.order_id } })
    } else if (type == 'close') {
        close();
    } else if (type == 'index') {
        redirect({ url: '/addon/shop_giftcard/pages/index', mode: 'reLaunch' });
    }
}

//关闭订单
const close = () => {
    uni.showModal({
        title: t('tips'),
        content: t('tipsOne'),
        confirmColor: useConfigStore().themeColor['--primary-color'],
        success: res => {
            if (res.confirm) {
                orderClose(detail.value.order_id).then((data) => {
                    orderDetailFn(detail.value.order_id);
                })
            }
        }
    })
}
</script>
<style lang="scss" scoped>
.order-goods-item:nth-child(1) {
    margin-top: 0rpx;
}

.text-color {
    color: $u-primary;
}

.bg-color {
    background-color: $u-primary;
}

.tab-bar-placeholder {
    padding-bottom: calc(constant(safe-area-inset-bottom) + 100rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 100rpx);
}

:deep(.u-image__error) {
    background-color: transparent !important;
}
</style>
