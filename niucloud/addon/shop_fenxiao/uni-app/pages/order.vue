<template>
    <view class="bg-[#f8f8f8] min-h-[100vh]" :style="themeColor()">
        <template v-if="!loading">
            <view class="flex items-center order-bg-wrap p-[40rpx]">
                <image class="w-[80rpx] h-[80rpx] rounded-full mr-[20rpx]" v-if="fenxiaoInfo.member && fenxiaoInfo.member.headimg" :src="img(fenxiaoInfo.member.headimg)" mode="aspectFill" />
                <image class="w-[80rpx] h-[80rpx] rounded-full mr-[20rpx]" v-else :src="img('addon/shop_fenxiao/index/head.png')" mode="aspectFill" />
                <view class="flex flex-col">
                    <view class="flex items-center">
                        <text class="truncate max-w-[380rpx] text-[#fff] font-500 mr-[10rpx] text-[30rpx]">{{ fenxiaoInfo.member.nickname || fenxiaoInfo.member.username }}</text>
                        <text class="bg-primary-light !text-[var(--primary-color)] !text-[22rpx] px-[10rpx] h-[34rpx] ml-[10rpx] tag-item" v-if="fenxiaoInfo.fenxiao_level">{{ fenxiaoInfo.fenxiao_level.level_name }}</text>
                    </view>
                </view>
            </view>
            <view class="tab-style-3">
                <view class="tab-items" :class="{'class-select': isSettlement == 1}" @click="tabChange(1)">
                    <text class="text-[28rpx]">已结算</text>
                    <text class="text-[28rpx]">({{ moneyFormat(fenxiaoStat.fenxiao_commission) }})</text>
                </view>
                <view class="tab-items" :class="{'class-select': isSettlement == 0}" @click="tabChange(0)">
                    <text class="text-[28rpx]">待结算</text>
                    <text class="text-[28rpx]">({{ moneyFormat(fenxiaoStat.unsettlement) }})</text>
                </view>
            </view>

            <mescroll-body ref="mescrollRef" bottom="100rpx" @init="mescrollInit" :down="{ use: false }" @up="getData">
                <view class="sidebar-margin pt-[var(--top-m)]" v-if="list.length">
                    <view class="card-template mb-[var(--top-m)]" v-for='(item,index) in list' :key="index">
                        <view class="flex items-center justify-between text-[26rpx] leading-[36rpx] text-[#333]">
                            <view>
                                <text>{{ t('orderNo') }}:</text>
                                <text class="ml-[10rpx]">{{ item.order_no }}</text>
                            </view>
                            <text class="text-[var(--text-color-light6)]">{{ item.is_settlement ? '已结算' : '未结算' }}</text>
                        </view>
                        <view class="flex pt-[20rpx]">
                            <image v-if="item.order_goods && item.order_goods.goods_image_thumb_mid" class="w-[180rpx] h-[180rpx] rounded-[var(--goods-rounded-big)] shrink-0" :src="img(item.order_goods.goods_image_thumb_mid)" mode="aspectFill" />
                            <image v-else class="w-[180rpx] h-[180rpx] rounded-[var(--goods-rounded-big)] shrink-0" :src="img('addon/shop_fenxiao/index/commission_rank.png')" mode="aspectFill" />
                            <view class="flex flex-1 flex-col ml-[20rpx] w-[470rpx] pb-[6rpx]">
                                <view class="w-[462rpx] text-[28rpx] truncate leading-[1.5] ">{{ item.order_goods.goods_name }}</view>
                                <view class="text-[var(--text-color-light6)] flex items-center whitespace-nowrap mt-[20rpx] text-[24rpx]">
                                    <view class="flex items-center">
                                        <text>购买人：</text>
                                        <view class="max-w-[120rpx] truncate">{{ item.shop_order.member.nickname || '-' }}</view>
                                    </view>
                                </view>
                                <view class="flex items-center justify-between mt-[auto]">
                                    <view class="inline-block leading-[1]">
                                        <text class="text-[var(--price-text-color)] text-[22rpx] price-font font-500 mr-[4rpx]">￥</text>
                                        <text class="text-[var(--price-text-color)] text-[36rpx] price-font font-500">{{ moneyFormat(item.order_goods.goods_money).split('.')[0] }}</text>
                                        <text class="text-[var(--price-text-color)] text-[22rpx] price-font font-500">.{{ moneyFormat(item.order_goods.goods_money).split('.')[1] }}</text>
                                    </view>
                                    <view class="text-[24rpx] text-[var(--text-color-light9)]" v-if="item.order_goods && item.order_goods.status != 1 && item.order_goods.status_name">{{ t('refundStatus') }}{{ item.order_goods.status_name }}</view>
                                </view>

                            </view>
                        </view>
                        <view class="flex items-center justify-between mt-[20rpx] flex-wrap">
                            <!-- <view class="text-[24rpx] flex items-center leading-[35rpx]">
                              <text>购买人：</text>
                              <text class="text-[var(--primary-color)]">{{ item.shop_order.member.nickname||'-' }}</text>
                            </view> -->
                            <view class="text-[24rpx] flex items-center leading-[35rpx]">
                                <text class="mr-[4rpx]">计算价:</text>
                                <text class="text-[var(--price-text-color)]">￥{{ moneyFormat(item.order_goods_money) }}</text>
                            </view>
                            <view class="flex items-center text-[24rpx] leading-[35rpx]" v-if="item.calculate_type">
                                <text class="mr-[4rpx]">{{ item.calculate_type_name }}:</text>
                                <text class="text-[var(--price-text-color)]">{{ item.calculate_type != 1 ? '￥' + moneyFormat(item.commission) : item.commission_rate + '%' }}</text>
                            </view>
                            <view class="flex items-center text-[24rpx]">
                                <text class="mr-[4rpx]">佣金:</text>
                                <view class="text-[var(--primary-color)]">{{ moneyFormat(item.commission) || '0.00' }}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <mescroll-empty :option="{'icon': img('static/resource/images/empty.png')}" v-if="!list.length && !tableLoading"></mescroll-empty>
            </mescroll-body>
        </template>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { redirect, img, moneyFormat } from '@/utils/common';
import { ref, reactive } from 'vue'
import { t } from '@/locale'
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import { getFenxiaoOrder, getFenxiaoStat, getFenxiaoInfo } from '@/addon/shop_fenxiao/api/fenxiao';

const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);

const list = ref([]);
const loading = ref<boolean>(true);
const tableLoading = ref<boolean>(true);
const getData = (mescroll: any) => {
    let data: object = {
        is_settlement: isSettlement.value,
        page: mescroll.num,
        limit: mescroll.size,
    };
    tableLoading.value = true;
    getFenxiaoOrder(data).then((res) => {
        let newArr = (res.data.data as Array<Object>);
        //设置列表数据
        if (mescroll.num == 1) {
            list.value = []; //如果是第一页需手动制空列表
        }
        list.value = list.value.concat(newArr);
        tableLoading.value = false;
        mescroll.endSuccess(newArr.length);
    }).catch(() => {
        tableLoading.value = false;
        mescroll.endErr(); // 请求失败, 结束加载
    })
}

// 统计
const fenxiaoStat = ref({});
const getFenxiaoStatFn = () => {
    getFenxiaoStat().then((res) => {
        fenxiaoStat.value = res.data;
    })
}
getFenxiaoStatFn();

// 分销商信息
const fenxiaoInfo = ref({});
const getFenxiaoInfoFn = () => {
    loading.value = true;
    getFenxiaoInfo().then((res) => {
        fenxiaoInfo.value = res.data;
        loading.value = false;
    })
}
getFenxiaoInfoFn();

const isSettlement = ref(1)
const tabChange = (data: any) => {
    isSettlement.value = data;
    list.value = [];
    getMescroll().resetUpScroll();
    getFenxiaoStatFn();
}
</script>

<style lang="scss" scoped>
.mescroll-body {
    min-height: calc(100vh - 258rpx) !important;
}

.order-bg-wrap {
    background: linear-gradient(to right, var(--primary-color) 40%, var(--primary-help-color3) 90%);
}
</style>
