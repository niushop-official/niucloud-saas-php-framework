<template>
    <view class="bg-[#f8f8f8] min-h-[100vh]" :style="themeColor()">
        <template v-if="!loading && agentOpen == 1">
            <view class="flex items-center wrap-bg p-[50rpx]">
                <image class="w-[90rpx] h-[90rpx] rounded-full mr-[20rpx]" v-if="detail.member && detail.member.headimg" :src="img(detail.member.headimg)" mode="aspectFill"/>
                <image class="w-[90rpx] h-[90rpx] rounded-full mr-[20rpx]" v-else :src="img('addon/shop_fenxiao/index/head.png')" mode="aspectFill"/>
                <view class="flex flex-col">
                    <view class="flex items-center">
                        <text class="truncate text-[#fff] max-w-[380rpx] mr-[10rpx] font-500 text-[30rpx]">{{ detail.member.nickname || detail.member.username }}</text>
                        <text class="bg-primary-light !text-[var(--primary-color)] !text-[22rpx] px-[10rpx] h-[36rpx] ml-[10rpx] tag-item" v-if="detail.agent_level">{{ detail.agent_level.name }}</text>
                    </view>
                    <text class="text-[#fff] text-[24rpx] mt-[14rpx]" v-if="detail.agent_level">享{{ Number(detail.agent_level.discount) }}折优惠</text>
                    <text class="text-[#fff] text-[24rpx] mt-[14rpx]" v-else>您还不是渠道代理商</text>
                </view>
            </view>
            <view class="tab-style-3">
                <view class="tab-items" :class="{'class-select': isSettlement == 1}" @click="tabChange(1)">
                    <text>已结算</text>
                    <text>({{ moneyFormat(agentStat.agent_commission) }})</text>
                </view>
                <view class="tab-items" :class="{'class-select': isSettlement == 0}" @click="tabChange(0)">
                    <text>待结算</text>
                    <text>({{ moneyFormat(agentStat.unsettlement) }})</text>
                </view>
            </view>

            <mescroll-body ref="mescrollRef" bottom="100rpx" @init="mescrollInit" :down="{ use: false }" @up="getData">
                <view class="sidebar-margin pt-[var(--top-m)]" v-if="list.length">
                    <view class="mb-[var(--top-m)] card-template" v-for='(item,index) in list' :key="index">
                        <view class="flex items-center justify-between text-[26rpx] leading-[36rpx] text-[#333]">
                            <view>
                                <text>{{ t('orderNo') }}:</text>
                                <text class="ml-[10rpx]">{{ item.order_no }}</text>
                            </view>
                            <text class="text-[var(--text-color-light6)]">{{ item.is_settlement ? '已结算' : '未结算' }}</text>
                        </view>
                        <view class="flex pt-[20rpx]">
                            <image v-if="item.order_goods && item.order_goods.goods_image_thumb_mid" class="w-[180rpx] h-[180rpx] rounded-[var(--goods-rounded-big)]" :src="img(item.order_goods.goods_image_thumb_mid)" mode="aspectFill" />
                            <image v-else class="w-[160rpx] h-[160rpx] rounded-[var(--goods-rounded-big)]" :src="img('addon/shop_fenxiao/index/commission_rank.png')" mode="aspectFill" />
                            <view class="flex flex-1 flex-col ml-[20rpx] pb-[6rpx]">
                                <view class="w-[462rpx] text-[28rpx] truncate leading-[1.5]">{{ item.order_goods.goods_name }}</view>
                                <view class="text-[var(--text-color-light6)] flex items-center whitespace-nowrap mt-[20rpx] text-[24rpx]">
                                    <view class="flex items-center">
                                        <text>购买人：</text>
                                        <view class="max-w-[120rpx] truncate">{{ item.shop_order.member.nickname || '-' }}</view>
                                    </view>
                                </view>
                                <view class="flex items-center justify-between mt-[auto]">
                                    <view class="text-[var(--price-text-color)] inline-block leading-[1] price-font font-500">
                                        <text class="text-[22rpx]">￥</text>
                                        <text class="text-[36rpx]">{{ moneyFormat(item.order_goods.goods_money).split('.')[0] }}</text>
                                        <text class="text-[22rpx]">.{{ moneyFormat(item.order_goods.goods_money).split('.')[1] }}</text>
                                    </view>
                                    <view class="text-[24rpx] text-[var(--text-color-light9)]" v-if="item.order_goods && item.order_goods.status != 1 && item.order_goods.status_name">{{ t('refundStatus') }}{{ item.order_goods.status_name }}</view>
                                </view>
                            </view>
                        </view>
                        <view class="flex items-center justify-between mt-[20rpx] flex-wrap">
                            <view class="flex items-center text-[24rpx]">
                                <text class="mr-[4rpx]">折扣:</text>
                                <view class="text-[var(--price-text-color)]">{{ parseFloat(item.agent_discount) }}折</view>
                            </view>
                            <view class="text-[24rpx] flex items-center">
                                <text class="mr-[4rpx]">计算价:</text>
                                <text class="text-[var(--price-text-color)]">{{ moneyFormat(item.order_original_goods_money) || '0.00' }}</text>
                            </view>
                            <view class="text-[24rpx] flex items-center">
                                <text class="mr-[4rpx]">佣金:</text>
                                <text class="text-[var(--price-text-color)]">{{ moneyFormat(item.commission) || '0.00' }}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <mescroll-empty :option="{'icon': img('static/resource/images/empty.png')}" v-if="!list.length && !tableLoading"></mescroll-empty>
            </mescroll-body>
        </template>
        <view class="pt-[var(--top-m)] footer" v-if="agentOpen == 0 && !loading">
            <mescroll-empty
                :option="{'icon': img('static/resource/images/empty.png'),tip:'渠道代理设置未开启'}"></mescroll-empty>
        </view>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { redirect, img, moneyFormat } from '@/utils/common';
import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import { ref, reactive } from 'vue'
import { t } from '@/locale'
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
import { getAgentOrder, getAgentStat, getOrderAgentConfig } from '@/addon/shop_fenxiao/api/agent';
import { getFenxiaoDetail } from '@/addon/shop_fenxiao/api/fenxiao';

const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);

/********* 是否开启渠道代理设置 - start ***********/
const agentOpen = ref<any>('');
onLoad(async() => {
    await getOrderAgentConfig().then(res => {
        agentOpen.value = res.data.is_open
    })
})
/********* 是否开启渠道代理设置  - end ***********/

const list = ref([]);
const detail = ref({ member: {} });
const agentStat = ref({});
const loading = ref<boolean>(true);
const tableLoading = ref<boolean>(true);

const getFenxiaoDetailFn = () => {
    loading.value = true;
    getFenxiaoDetail().then((res: any) => {
        detail.value = res.data;
        loading.value = false;
    }).catch(() => {
        loading.value = false;
    });
}

getFenxiaoDetailFn();

const getData = (mescroll: any) => {
    let data: object = {
        is_settlement: isSettlement.value,
        page: mescroll.num,
        limit: mescroll.size,
    };
    tableLoading.value = true;
    getAgentOrder(data).then((res: any) => {
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
const getAgentStatFn = () => {
    getAgentStat().then((res: any) => {
        agentStat.value = res.data;
    })
}
getAgentStatFn();

const isSettlement = ref(1)
const tabChange = (data: any) => {
    isSettlement.value = data;
    list.value = [];
    getMescroll().resetUpScroll();
    getAgentStatFn();
}
</script>

<style lang="scss" scoped>
.wrap-bg {
    background: linear-gradient(to right, var(--primary-color) 40%, var(--primary-help-color3) 90%);
}

.mescroll-body {
    min-height: calc(100vh - 350rpx) !important;
}

.footer :deep(.mescroll-empty) {
    margin-top: 0 !important;
}

</style>
