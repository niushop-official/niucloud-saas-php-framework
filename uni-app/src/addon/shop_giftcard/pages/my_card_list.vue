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
        <mescroll-body ref="mescrollRef" top="88rpx" @init="mescrollInit" :down="{ use: false }" @up="getCardPageListFn">
            <view class="sidebar-margin pt-[var(--top-m)]" v-if="list.length">
                <view v-for="(item, index) in list" @click="btnClick('use',item)" class="h-[430rpx] mb-[var(--top-m)] rounded-[var(--rounded-big)] overflow-hidden box-border relative">
                    <image v-if="item.card_cover" class="w-[100%] h-[100%] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img(item.card_cover || '')" @error="item.card_cover= defaultCard(item)" mode="aspectFill" />
                    <image v-else class="w-[100%] h-[100%] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img(defaultCard(item))" mode="aspectFill" />
                    <view class="flex flex-col justify-between w-full h-[430rpx] mb-[var(--top-m)] rounded-[var(--rounded-big)] overflow-hidden box-border absolute left-0 top-0 z-5">
                        <view class="flex justify-between py-[var(--pad-top-m)] px-[var(--pad-sidebar-m)]">
                            <view class="flex h-[38rpx] px-[10rpx] bg-[rgba(255,255,255,0.9)] rounded-[19rpx]">
                                <text class="mr-[8rpx] iconfont !text-[24rpx] !leading-[38rpx]" :class="{'iconchuzhikaV6mm !text-[#EF000C]':item.card_right_type=='balance','iconduihuankaV6mm-1 !text-[#FF7700]':item.card_right_type=='goods'}"></text>
                                <text v-if="item.card_right_type=='balance'" class="!text-[26rpx] font-500 !leading-[38rpx]">{{ item.balance }}</text>
                                <text class="!text-[22rpx] font-400 !leading-[38rpx]">
                                    <text v-if="item.card_right_type=='balance'">{{ t('yuan') }}</text>
                                    {{ item.card_right_type_name }}
                                </text>
                            </view>
                        </view>
                        <view class="flex justify-between px-[var(--pad-sidebar-m)] mt-auto mb-[var(--pad-top-m)]">
                            <view class="h-[36rpx] leading-[36rpx] text-[26rpx] font-800 text-stroke">{{ item.tag == 'group' ? '' : item.card_no }}</view>
                            <template v-if="item.tag == 'group'">
                                <view v-if="item.status == ''" class="bg-[rgba(255,255,255,0.9)] text-right box-border h-[36rpx] leading-[36rpx] px-[15rpx] text-[22rpx] rounded-[18rpx]">{{ item.to_use_count + item.can_use_count }}/{{ item.total_count }}{{ t('unit') }}</view>
                                <view v-if="item.status == 'to_use'" class="bg-[rgba(255,255,255,0.9)] text-right box-border h-[36rpx] leading-[36rpx] px-[15rpx] text-[22rpx] rounded-[18rpx]">{{ item.to_use_count }}{{ t('unit') }}</view>
                                <view v-if="item.status == 'can_use'" class="bg-[rgba(255,255,255,0.9)] text-right box-border h-[36rpx] leading-[36rpx] px-[15rpx] text-[22rpx] rounded-[18rpx]">{{ item.can_use_count }}{{ t('unit') }}</view>
                                <view v-if="item.status == 'used'" class="bg-[rgba(255,255,255,0.9)] text-right box-border h-[36rpx] leading-[36rpx] px-[15rpx] text-[22rpx] rounded-[18rpx]">{{ item.used_count }}{{ t('unit') }}</view>
                                <view v-if="item.status == 'invalid'" class="bg-[rgba(255,255,255,0.9)] text-right box-border h-[36rpx] leading-[36rpx] px-[15rpx] text-[22rpx] rounded-[18rpx]">{{ item.invalid_count }}{{ t('unit') }}</view>
                            </template>

                        </view>
                        <view class="flex items-center justify-between bg-[rgba(255,255,255,0.9)] h-[80rpx] px-[var(--pad-sidebar-m)] box-border">
                            <template v-if="item.to_use_count && item.is_give">
                                <view class="h-[70rpx] leading-[70rpx] text-[24rpx] font-500 text-center w-[calc(50%-1rpx)]" @click.stop="btnClick('give',item)">{{ t('giftToFriends') }}</view>
                                <view class="w-[2rpx] h-[24rpx] bg-[var(--text-color-light9)] rounded-[2rpx]"></view>
                            </template>
                            <view v-if="item.tag == 'group'" class="flex-1 h-[70rpx] leading-[70rpx] text-[24rpx] font-500 text-center min-w-[calc(50%-1rpx)]" @click.stop="btnClick('use',item)">{{ t('seeCardBag') }}</view>
                            <template v-else>
                                <view v-if="item.to_use_count || item.can_use_count" class="flex-1 h-[70rpx] leading-[70rpx] text-[24rpx] font-500 text-center min-w-[calc(50%-1rpx)]" @click.stop="btnClick('use',item)">{{ t('canUse') }}</view>
                                <template v-else>
                                    <view v-if="item.invalid_count" class="flex-1 h-[70rpx] leading-[70rpx] text-[24rpx] font-500 text-center min-w-[calc(50%-1rpx)]" @click.stop="btnClick('use',item)">{{ t('invalid') }}</view>
                                    <view v-else class="flex-1 h-[70rpx] leading-[70rpx] text-[24rpx] font-500 text-center min-w-[calc(50%-1rpx)]" @click.stop="btnClick('use',item)">{{ t('used') }}</view>
                                </template>
                            </template>
                        </view>
                    </view>
                </view>

            </view>
            <mescroll-empty v-if="!list.length && !loading" :option="{tip : t('cardEmpty'), icon: img('addon/shop_giftcard/empty.png')}"></mescroll-empty>
            <tabbar />
        </mescroll-body>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { redirect, img, getToken } from '@/utils/common';
import { onLoad, onShow, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import { ref, reactive } from 'vue'
import { t } from '@/locale'
import { getCardPageList, getCardStatusList } from '@/addon/shop_giftcard/api/card';
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

const getCardPageListFn = (mescroll: any) => {
    if (!getToken()) {
        mescroll.endSuccess(0);
        loading.value = false;
        return;
    }
    loading.value = true;
    let data: object = {
        page: mescroll.num,
        limit: mescroll.size,
        status: status.value,
    };

    getCardPageList(data).then((res: any) => {
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
    if (data.card_right_type == 'balance') {
        imgUrl = 'addon/shop_giftcard/diy/index/value_card.jpg';
    } else {
        imgUrl = 'addon/shop_giftcard/diy/index/redemption_card.jpg';
    }
    return imgUrl;
}
const btnClick = (type: any, item: any) => {
    if (type == 'use') {
        if (item.tag == 'group') {
            redirect({ url: '/addon/shop_giftcard/pages/card_bag', param: { card_bag_id: item.card_bag_id } })
        } else {
            redirect({
                url: '/addon/shop_giftcard/pages/use_card',
                param: { card_id: item.card_id, status: status.value }
            })
        }

    } else {
        if (uni.getStorageSync('give_id')) uni.removeStorageSync('give_id');
        if (item.tag == 'group') {
            redirect({ url: '/addon/shop_giftcard/pages/give', param: { card_bag_id: item.card_bag_id } })
        } else {
            redirect({ url: '/addon/shop_giftcard/pages/give', param: { card_id: item.card_id } })
        }

    }
}
</script>

<style lang="scss" scoped>
:deep(.tab-bar-placeholder) {
    display: none !important;
}

:deep(.u-tabbar__placeholder) {
    display: none !important;
}

/*  #ifdef  H5  */
:deep(.mescroll-body) {
    padding-bottom: calc(50px + constant(safe-area-inset-bottom)) !important;
    padding-bottom: calc(50px + env(safe-area-inset-bottom)) !important;
}

/*  #endif  */
/*  #ifndef  H5  */
:deep(.mescroll-body) {
    padding-bottom: calc(100rpx + constant(safe-area-inset-bottom)) !important;
    padding-bottom: calc(100rpx + env(safe-area-inset-bottom)) !important;
}

/*  #endif  */
:deep(.mescroll-upwarp) {
    display: none;
}

//礼品卡描边
.text-stroke {
    -webkit-text-stroke-color: #FFF; /* 文字描边颜色 */
    -webkit-text-stroke-width: 1rpx; /* 文字描边宽度 */
}
</style>
