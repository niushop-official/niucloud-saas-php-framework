<template>
    <view class="bg-[#f8f8f8] min-h-[100vh]" :style="themeColor()">
        <view class="fixed left-0 top-0 right-0 z-10" v-if="statusLoading">
            <scroll-view :scroll-x="true" class="tab-style-2">
                <view class="tab-content">
                    <view class="tab-items" :class="{ 'class-select': status === '' }" @click="statusFn('')">{{ t('all') }}</view>
                    <view class="tab-items" :class="{ 'class-select': status === key }" @click="statusFn(key)" v-for="(item, key) in statusList">{{ item }}</view>
                </view>
            </scroll-view>
        </view>
        <mescroll-body ref="mescrollRef" top="88rpx" @init="mescrollInit" :down="{ use: false }" @up="getCardReceiveRecordsPageListFn">
            <view class="sidebar-margin pt-[var(--top-m)]" v-if="list.length">
                <view v-for="(item, index) in list" @click="btnClick('use',item.card_id)" class="h-[430rpx] mb-[var(--top-m)] rounded-[var(--rounded-big)] overflow-hidden box-border relative">
                    <image v-if="item.card_cover" class="w-[100%] h-[100%] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img(item.card_cover || '')" @error="item.card_cover= defaultCard(item)" mode="aspectFill" />
                    <image v-else class="w-[100%] h-[100%] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img(defaultCard(item))" mode="aspectFill" />
                    <view class="flex flex-col justify-between w-full h-[430rpx] mb-[var(--top-m)] rounded-[var(--rounded-big)] overflow-hidden box-border absolute left-0 top-0 z-5">
                        <view class="flex py-[var(--pad-top-m)] px-[var(--pad-sidebar-m)]">
                            <view class="flex h-[38rpx] px-[10rpx] bg-[rgba(255,255,255,0.9)] rounded-[19rpx]">
                                <text class="mr-[8rpx] iconfont !text-[22rpx] !leading-[38rpx]" :class="{'iconchuzhikaV6mm !text-[#EF000C]':item.giftcard.card_right_type=='balance','iconduihuankaV6mm-1 !text-[#FF7700]':item.giftcard.card_right_type=='goods'}"></text>
                                <text v-if="item.giftcard.card_right_type=='balance'" class="!text-[26rpx] font-500 !leading-[38rpx]">{{ item.balance }}</text>
                                <text class="!text-[22rpx] font-400 !leading-[38rpx]">
                                    <text v-if="item.giftcard.card_right_type=='balance'">元</text>
                                    {{ item.giftcard.card_right_type_name }}
                                </text>
                            </view>
                        </view>
                        <view class="flex justify-between px-[var(--pad-sidebar-m)] mt-auto mb-[var(--pad-top-m)]">
                            <view class="h-[36rpx] leading-[36rpx] text-[26rpx] font-800 text-stroke">{{ item.card_no }}</view>
                        </view>
                        <view class="flex items-center justify-between bg-[rgba(255,255,255,0.9)] h-[80rpx] px-[var(--pad-sidebar-m)] box-border">
                            <view class="flex items-center">
                                <u-avatar :src="img(item.record_info.fromMember.headimg)" :size="'54rpx'" leftIcon="none" :default-url="img('static/resource/images/default_headimg.png')" />
                                <view class="w-[250rpx] text-[28rpx] font-400 leading-[38rpx] ml-[8rpx] truncate">{{ item.record_info.fromMember.nickname }}</view>
                            </view>
                            <view class="flex items-center">
                                <button v-if="item.status=='to_use' && item.giftcard.is_give"
                                        class="h-[50rpx] font-500 text-[22rpx] leading-[46rpx] !text-[#333] !bg-transparent m-0 rounded-[25rpx] px-[22rpx] border-[2rpx] border-solid border-[var(--text-color-light9)] box-border ml-[20rpx]"
                                        @click.stop="btnClick('give',item.card_id)">{{ t('giftToFriends') }}</button>
                                <button v-if="item.status=='to_use' || item.status=='can_use'"
                                        class="h-[50rpx] font-500 text-[22rpx] leading-[46rpx] !text-[var(--primary-color)] m-0 rounded-[25rpx] px-[22rpx] border-[2rpx] border-solid border-[var(--primary-color)] box-border ml-[20rpx]"
                                        @click.stop="btnClick('use',item.card_id)">{{ t('canUse') }}</button>
                                <button v-if="item.status=='used'"
                                        class="h-[50rpx] font-500 text-[22rpx] leading-[50rpx] !text-[var(--text-color-light6)] !bg-[rgba(221,221,221,0.8)] m-0 rounded-[25rpx] px-[22rpx] box-border ml-[20rpx]"
                                        @click.stop="btnClick('use',item.card_id)">{{ t('used') }}</button>
                                <button v-if="item.status=='invalid'"
                                        class="h-[50rpx] font-500 text-[22rpx] leading-[50rpx] !text-[var(--text-color-light6)] !bg-[rgba(221,221,221,0.8)] m-0 rounded-[25rpx] px-[22rpx] box-border ml-[20rpx]"
                                        @click.stop="btnClick('use',item.card_id)">{{ t('invalid') }}</button>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <mescroll-empty v-if="!list.length && !loading" :option="{tip : t('cardEmpty'), icon: img('addon/shop_giftcard/empty.png')}"></mescroll-empty>
        </mescroll-body>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { redirect, img } from '@/utils/common';
import { onLoad, onShow, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import { ref, reactive } from 'vue'
import { t } from '@/locale'
import { getCardReceiveRecordsPageList } from '@/addon/shop_giftcard/api/records';
import { getCardStatusList } from '@/addon/shop_giftcard/api/card';
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
import useMescroll from '@/components/mescroll/hooks/useMescroll.js';

const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
const list = ref<Array<Object>>([]);
const loading = ref<boolean>(true);
const statusLoading = ref(true)
const statusList = ref({})

onLoad((option: any) => {
    getCardStatusListFn();
});
onShow(() => {
    if (getMescroll()) getMescroll().resetUpScroll();
})
const getCardStatusListFn = () => {
    statusLoading.value = false;
    statusList.value = {};

    getCardStatusList().then((res: any) => {
        statusList.value = res.data
        statusLoading.value = true;
    }).catch(() => {
        statusLoading.value = true;
    })
}

const getCardReceiveRecordsPageListFn = (mescroll: any) => {
    loading.value = true;
    let data: object = {
        page: mescroll.num,
        limit: mescroll.size,
        status: status.value
    };

    getCardReceiveRecordsPageList(data).then((res: any) => {
        let newArr = (res.data.data as Array<Object>);
        //设置列表数据
        if (mescroll.num == 1) {
            list.value = []; //如果是第一页需手动制空列表
        }
        list.value = list.value.concat(newArr);
        mescroll.endSuccess(newArr.length);
        loading.value = false;
    }).catch(() => {
        loading.value = false;
        mescroll.endErr(); // 请求失败, 结束加载
    })
}

const status = ref('')
const statusFn = (val: any) => {
    status.value = val
    getMescroll().resetUpScroll();
}

const defaultCard = (data) => {
    let imgUrl = '';
    if (data.giftcard.card_right_type == 'balance') {
        imgUrl = 'addon/shop_giftcard/diy/index/value_card.jpg';
    } else {
        imgUrl = 'addon/shop_giftcard/diy/index/redemption_card.jpg';
    }
    return imgUrl;
}
const btnClick = (type: any, card_id: any) => {
    if (type == 'use') {
        redirect({ url: '/addon/shop_giftcard/pages/use_card', param: { card_id } })
    } else {
        if (uni.getStorageSync('give_id')) uni.removeStorageSync('give_id');
        redirect({ url: '/addon/shop_giftcard/pages/give', param: { card_id } })
    }
}
</script>

<style lang="scss" scoped>
//礼品卡描边
.text-stroke {
    -webkit-text-stroke-color: #FFF; /* 文字描边颜色 */
    -webkit-text-stroke-width: 1rpx; /* 文字描边宽度 */
}
</style>
