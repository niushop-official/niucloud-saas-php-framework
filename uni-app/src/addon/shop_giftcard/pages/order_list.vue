<template>
    <view class="bg-[var(--page-bg-color)] min-h-screen overflow-hidden order-list" :style="themeColor()">
        <view class="fixed left-0 top-0 right-0 z-10" v-if="statusLoading">
            <scroll-view :scroll-x="true" class="tab-style-2 !p-[0]">
                <view class="tab-content !justify-around">
                    <view class="tab-items" :class="{ 'class-select': orderState === item.status.toString() }" @click="orderStateFn(item.status)" v-for="(item, index) in orderStateList">{{ item.name }}</view>
                </view>
            </scroll-view>
        </view>

        <mescroll-body ref="mescrollRef" top="88rpx" @init="mescrollInit" :down="{ use: false }" @up="getGiftcardOrderFn">
            <view class="sidebar-margin pt-[var(--top-m)]" v-if="list.length">
                <template v-for="(item, index) in list" :key="index">
                    <view class="mb-[var(--top-m)] card-template">
                        <view @click.stop="toLink(item)">
                            <view class="flex justify-between items-center">
                                <view class="text-[#303133] text-[26rpx] font-400 leading-[36rpx]">
                                    <text class="iconfont text-[var(--primary-color)] text-[34rpx]" :class="{'iconchuzhikaV6mm text-[#EF000C]':item.card_right_type=='balance','iconduihuankaV6mm-1 text-[#FF7700]':item.card_right_type=='goods'}"></text>
                                    <text class="ml-[12rpx] text-[28rpx]">{{ item.card_right_type_name }}</text>
                                </view>

                                <view class="text-[#303133] text-[26rpx] leading-[34rpx]" :class="{'text-primary': item.status  == 1,'!text-[var(--text-color-light9)]' : item.status  == -1}">{{ item.status_name }}</view>
                            </view>
                            <view class="flex box-border mt-[20rpx]" :key="index">
                                <u--image width="240rpx" height="170rpx" :radius="'var(--goods-rounded-big)'" :src="img(item.card_cover ? item.card_cover : '')" mode="aspectFill">
                                    <template #error>
                                        <image v-if="item.card_right_type=='balance'" class="w-[240rpx] h-[170rpx] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img('addon/shop_giftcard/diy/index/value_card.jpg')" mode="aspectFill" />
                                        <image v-else class="w-[240rpx] h-[170rpx] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img('addon/shop_giftcard/diy/index/redemption_card.jpg')" mode="aspectFill" />
                                    </template>
                                </u--image>
                                <view class="ml-[20rpx] flex flex-1 flex-col box-border">
                                    <view class="max-w-[402rpx] text-[28rpx] leading-[40rpx] font-400 truncate text-[#303133]">{{ item.body }}</view>
                                    <view v-if="item.card_right_type=='balance'" class="max-w-[402rpx] text-[#303133] text-[24rpx] font-400 leading-[36rpx] text-[var(--text-color-light6)] truncate mt-[14rpx]">{{ item.balance }}{{ t('yuanStoredValueCard') }}</view>
                                    <view class="flex justify-between items-baseline mt-auto">
                                        <view class="leading-[42rpx]">
                                            <text class="text-[22rpx] font-400 price-font">￥</text>
                                            <text class="text-[36rpx] font-500 price-font">{{ parseFloat(item.card_price).toFixed(2).split('.')[0] }}</text>
                                            <text class="text-[22rpx] font-500 price-font">.{{ parseFloat(item.card_price).toFixed(2).split('.')[1] }}</text>
                                        </view>
                                        <text class="text-right text-[26rpx] font-400 w-[90rpx] text-[var(--text-color-light6)] leading-[36rpx]">x{{ item.num }}</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="flex items-baseline justify-between mt-[20rpx]">
                            <view class="text-[22rpx] text-[var(--text-color-light9)] leading-[30rpx] mr-[6rpx]">{{ item.create_time }}</view>
                            <view class="flex items-end">
                                <view class="text-[22rpx] font-400 leading-[30rpx] text-[#303133]">{{ t('actualPayment') }}：</view>
                                <view class="leading-[1] text-[var(--price-text-color)]">
                                    <text class="text-[22rpx] leading-[26rpx] price-font">￥</text>
                                    <text class="text-[36rpx] font-500 leading-[40rpx] price-font">{{ parseFloat(item.order_money).toFixed(2).split('.')[0] }}</text>
                                    <text class="text-[22rpx] font-500 leading-[28rpx] price-font">.{{ parseFloat(item.order_money).toFixed(2).split('.')[1] }}</text>
                                </view>
                            </view>
                        </view>
                        <view class="flex justify-end text-[28rpx] mt-[20rpx] items-center" v-if="item.status == 1">
                            <view class="text-[24rpx] font-500 leading-[52rpx] h-[56rpx] min-w-[150rpx] text-center border-[2rpx] border-solid border-[var(--text-color-light9)] rounded-full text-[var(--text-color-light6)] box-border" @click.stop="orderBtnFn(item, 'close')" v-if="item.status == 1">{{ t('orderClose') }}</view>
                            <view class="text-[24rpx] font-500 flex-center h-[56rpx] min-w-[150rpx] text-center border-[0] text-[#fff] primary-btn-bg rounded-full ml-[20rpx] box-border" v-if="item.status == 1" @click.stop="orderBtnFn(item, 'pay')">{{ t('topay') }}</view>
                        </view>
                    </view>
                </template>
            </view>
            <mescroll-empty v-if="!list.length && loading" :option="{tip : t('cardEmpty'), icon: img('addon/shop_giftcard/empty.png')}"></mescroll-empty>
        </mescroll-body>
        <pay ref="payRef" @close="payClose"></pay>
        <!-- #ifdef MP-WEIXIN -->
        <!-- 小程序隐私协议 -->
        <wx-privacy-popup ref="wxPrivacyPopupRef"></wx-privacy-popup>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { t } from '@/locale'
import { img, redirect, getToken } from '@/utils/common'
import { getGiftCardOrderStatus, getGiftcardOrder, orderClose } from '@/addon/shop_giftcard/api/order';
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
import { onLoad, onShow, onPageScroll, onReachBottom } from '@dcloudio/uni-app';
import useConfigStore from "@/stores/config";
import { useLogin } from '@/hooks/useLogin'

const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
const list = ref<Array<Object>>([]);
const loading = ref<boolean>(false);
const statusLoading = ref<boolean>(false);
const orderState = ref('')
const orderStateList: any = ref([]);
const wxPrivacyPopupRef: any = ref(null)

onLoad((option: any) => {
    // 检测是否登录
    if (!getToken()) {
        useLogin().setLoginBack({
            url: '/addon/shop_giftcard/pages/order_list'
        })
        return false
    }
    orderState.value = option.status || "";
    getGiftCardOrderStatusFn();
    // #ifdef MP
    nextTick(() => {
        if (wxPrivacyPopupRef.value) wxPrivacyPopupRef.value.proactive();
    })
    // #endif
});
onShow(() => {
    if (getMescroll()) getMescroll().resetUpScroll();
})
const getGiftcardOrderFn = (mescroll: any) => {
    loading.value = false;
    let data: object = {
        page: mescroll.num,
        limit: mescroll.size,
        status: orderState.value
    };

    getGiftcardOrder(data).then((res: any) => {
        let newArr = (res.data.data as Array<Object>);
        //设置列表数据
        if (mescroll.num == 1) {
            list.value = []; //如果是第一页需手动制空列表
        }
        list.value = list.value.concat(newArr);
        mescroll.endSuccess(newArr.length);
        loading.value = true;
    }).catch(() => {
        loading.value = true;
        mescroll.endErr(); // 请求失败, 结束加载
    })
}

const getGiftCardOrderStatusFn = () => {
    statusLoading.value = false;
    orderStateList.value = [];
    let obj = { name: t('all'), status: '' };
    orderStateList.value.push(obj);

    getGiftCardOrderStatus().then((res: any) => {
        Object.values(res.data).forEach((item, index) => {
            orderStateList.value.push(item);
        });
        statusLoading.value = true;
    }).catch(() => {
        statusLoading.value = true;
    })
}

const orderStateFn = (status: any) => {
    orderState.value = status.toString();
    list.value = [];
    getMescroll().resetUpScroll();
};

const toLink = (data: any) => {
    redirect({ url: '/addon/shop_giftcard/pages/order_detail', param: { order_id: data.order_id } })
}

// 支付
const payRef = ref(null)
const orderBtnFn = (data: any, type = '') => {
    if (type == 'pay') {
        payRef.value?.open(data.order_type, data.order_id, `/addon/shop_giftcard/pages/order_detail?order_id=${ data.order_id }`);
    } else if (type == 'close') {
        close(data);
    }
}

//关闭订单
const close = (item: any) => {
    uni.showModal({
        title: t('tips'),
        content: t('tipsOne'),
        confirmColor: useConfigStore().themeColor['--primary-color'],
        success: res => {
            if (res.confirm) {
                orderClose(item.order_id).then((data) => {
                    getMescroll().resetUpScroll();
                })
            }
        }
    })
}
</script>
<style>
.order-list .mescroll-body {
    padding-bottom: constant(safe-area-inset-bottom) !important;
    padding-bottom: env(safe-area-inset-bottom) !important;
}

.order-list :deep(.u-count-down__text) {
    font-size: 24rpx !important;
    color: #EF000C !important;
}
</style>
<style lang="scss" scoped>
.text-color {
    color: var(--primary-color);
}

.bg-color {
    background-color: var(--primary-color);
}
</style>
