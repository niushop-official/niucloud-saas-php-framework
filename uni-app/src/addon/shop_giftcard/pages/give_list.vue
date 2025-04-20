<template>
    <view class="bg-[#f8f8f8] min-h-[100vh]" :style="themeColor()">
        <mescroll-body ref="mescrollRef" @init="mescrollInit" :down="{ use: false }" @up="getCardGiveRecordsPageListFn">
            <view class="sidebar-margin pt-[var(--top-m)]" v-if="list.length">
                <view v-for="(item, index) in list" @click="toLink(item.member_card_id)" class="h-[430rpx] mb-[var(--top-m)] rounded-[var(--rounded-big)] overflow-hidden box-border relative">
                    <image v-if="item.card_info.card_cover" class="w-[100%] h-[100%] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img(item.card_info.card_cover || '')" @error="item.card_info.card_cover= defaultCard(item)" mode="aspectFill" />
                    <image v-else class="w-[100%] h-[100%] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img(defaultCard(item))" mode="aspectFill" />
                    <view class="flex flex-col justify-between w-full h-[430rpx] mb-[var(--top-m)] rounded-[var(--rounded-big)] overflow-hidden box-border absolute left-0 top-0 z-5">
                        <view class="flex py-[var(--pad-top-m)] px-[var(--pad-sidebar-m)]">
                            <view class="flex h-[38rpx] px-[10rpx] bg-[rgba(255,255,255,0.9)] rounded-[19rpx]">
                                <text class="mr-[8rpx] iconfont !text-[24rpx] !leading-[38rpx]" :class="{'iconchuzhikaV6mm !text-[#EF000C]':item.card_info.giftcard.card_right_type=='balance','iconduihuankaV6mm-1 !text-[#FF7700]':item.card_info.giftcard.card_right_type=='goods'}"></text>
                                <text v-if="item.card_info.giftcard.card_right_type=='balance'" class="!text-[26rpx] font-500 !leading-[38rpx]">{{ item.card_info.balance }}</text>
                                <text class="!text-[22rpx] font-400 !leading-[38rpx]">
                                    <text v-if="item.card_info.giftcard.card_right_type=='balance'">{{ t('yuan') }}</text>
                                    {{ item.card_info.giftcard.card_right_type_name }}
                                </text>
                            </view>
                        </view>
                        <view class="flex justify-between px-[var(--pad-sidebar-m)] mt-auto mb-[var(--pad-top-m)]">
                            <view class="h-[36rpx] leading-[36rpx] text-[26rpx] font-800 text-stroke">{{ item.card_info.card_no }}</view>
                        </view>
                        <view class="flex items-center justify-between bg-[rgba(255,255,255,0.9)] h-[80rpx] px-[var(--pad-sidebar-m)] box-border">
                            <view class="flex items-center">
                                <u-avatar :src="img(item.giveMember.headimg)" :size="'54rpx'" leftIcon="none" :default-url="img('static/resource/images/default_headimg.png')" />
                                <view class="w-[250rpx] text-[28rpx] font-400 leading-[38rpx] ml-[8rpx] truncate">{{ item.giveMember.nickname }}</view>
                            </view>
                            <view class="flex items-center">
                                <button class="h-[50rpx] font-500 text-[22rpx] leading-[46rpx] !text-[#333] !bg-transparent m-0 rounded-[25rpx] px-[22rpx] border-[2rpx] border-solid border-[var(--text-color-light9)] box-border ml-[20rpx]">{{ t('viewDetails') }}</button>
                            </view>
                            <!-- <view class="price-font flex items-baseline" v-if="item.card_info.giftcard.card_right_type=='balance'">
                              <text class="text-[28rpx] font-400 mr-[4rpx]">￥</text>
                              <text class="text-[48rpx] font-500">{{ parseFloat(item.card_info.balance)}}</text>
                            </view> -->
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
import { onShow, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import { ref, reactive } from 'vue'
import { t } from '@/locale'
import { getCardGiveRecordsPageList } from '@/addon/shop_giftcard/api/records';
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
import useMescroll from '@/components/mescroll/hooks/useMescroll.js';

const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
const list = ref<Array<Object>>([]);
const loading = ref<boolean>(true);
onShow(() => {
    if (getMescroll()) getMescroll().resetUpScroll();
})
const defaultCard = (data) => {
    let imgUrl = '';
    if (data.card_info.giftcard.card_right_type == 'balance') {
        imgUrl = 'addon/shop_giftcard/diy/index/value_card.jpg';
    } else {
        imgUrl = 'addon/shop_giftcard/diy/index/redemption_card.jpg';
    }
    return imgUrl;
}

const getCardGiveRecordsPageListFn = (mescroll: any) => {
    loading.value = true;
    let data: object = {
        page: mescroll.num,
        limit: mescroll.size
    };

    getCardGiveRecordsPageList(data).then((res: any) => {
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

const toLink = (member_card_id: any) => {
    redirect({ url: '/addon/shop_giftcard/pages/give_detail', param: { member_card_id } })
}
</script>

<style lang="scss" scoped>
//礼品卡描边
.text-stroke {
    -webkit-text-stroke-color: #FFF; /* 文字描边颜色 */
    -webkit-text-stroke-width: 1rpx; /* 文字描边宽度 */
}
</style>
