<template>
    <view class="bg-[#f8f8f8] min-h-[100vh] team-dividend" :style="themeColor()">
        <template v-if="!loading && teamOpen == 1">
            <view class="flex items-center wrap-bg p-[40rpx]">
                <image class="w-[90rpx] h-[90rpx] rounded-full mr-[20rpx]" v-if="fenxiaoInfo.member && fenxiaoInfo.member.headimg" :src="img(fenxiaoInfo.member.headimg)" mode="aspectFill" />
                <image class="w-[90rpx] h-[90rpx] rounded-full mr-[20rpx]" v-else :src="img('addon/shop_fenxiao/index/head.png')" mode="aspectFill" />
                <view class="flex flex-col">
                    <view class="flex items-center">
                        <text class="truncate max-w-[380rpx] mr-[10rpx] text-[30rpx] font-500 text-[#fff]">{{ fenxiaoInfo.member.nickname || fenxiaoInfo.member.username }}</text>
                        <text class="bg-primary-light !text-[var(--primary-color)] !text-[22rpx] px-[10rpx] h-[36rpx] ml-[10rpx] tag-item" v-if="fenxiaoInfo.fenxiao_level">{{ fenxiaoInfo.fenxiao_level.level_name }}</text>
                    </view>
                    <text class="text-[#fff] text-[24rpx] mt-[14rpx]" v-if="fenxiaoInfo.fenxiao_level">团队分红比率 {{ fenxiaoInfo.fenxiao_level.team_rate }}%</text>
                </view>
            </view>
            <view class="tab-style-3">
                <view class="tab-items" :class="{'class-select': isSettlement == 1}" @click="tabChange(1)">
                    <text>已结算</text>
                    <text>({{ moneyFormat(teamStat.team_commission) }})</text>
                </view>
                <view class="tab-items" :class="{'class-select': isSettlement == 0}" @click="tabChange(0)">
                    <text class="text-[28rpx]">待结算</text>
                    <text class="text-[28rpx]">({{ moneyFormat(teamStat.unsettlement) }})</text>
                </view>
            </view>

            <mescroll-body ref="mescrollRef" @init="mescrollInit" :down="{ use: false }" @up="getData">
                <view class="pt-[var(--top-m)]" v-if="list.length">
                    <view class="sidebar-margin mb-[var(--top-m)] card-template" v-for='(item,index) in list' :key="index">
                        <view class="flex items-center justify-between text-[26rpx] leading-[36rpx] text-[#333]">
                            <view>
                                <text>{{ t('orderNo') }}:</text>
                                <text class="ml-[10rpx]">{{ item.order_no }}</text>
                            </view>
                            <text class="text-[var(--text-color-light6)]">{{ item.is_settlement ? '已结算' : '未结算' }}</text>
                        </view>
                        <view class="flex pt-[20rpx]">
                            <image v-if="item.order_goods && item.order_goods.goods_image_thumb_mid" class="w-[180rpx] h-[180rpx] rounded-[var(--goods-rounded-big)]" :src="img(item.order_goods.goods_image_thumb_mid)" mode="aspectFill" />
                            <image v-else class="w-[180rpx] h-[180rpx] rounded-[var(--goods-rounded-big)]" :src="img('addon/shop_fenxiao/index/commission_rank.png')" mode="aspectFill" />
                            <view class="flex flex-1 flex-col ml-[20rpx] pb-[6rpx]">
                                <view class="w-[462rpx] text-[28rpx] truncate leading-[1.5] ">{{ item.order_goods.goods_name }}</view>
                                <view class="text-[var(--text-color-light6)] flex items-center whitespace-nowrap mt-[20rpx] text-[24rpx]">
                                    <text>购买人：</text>
                                    <view class="max-w-[120rpx] truncate">{{ item.shop_order.member.nickname || '-' }}</view>
                                </view>
                                <view class="flex justify-between items-center mt-[auto] pb-[6rpx]">
                                    <view class="text-[var(--price-text-color)] price-font font-500 inline-block leading-[1]">
                                        <text class="text-[22rpx] mr-[4rpx]">￥</text>
                                        <text class="text-[36rpx]">{{ moneyFormat(item.order_goods.goods_money).split('.')[0] }}</text>
                                        <text class="text-[22rpx]">.{{ moneyFormat(item.order_goods.goods_money).split('.')[1] }}</text>
                                    </view>
                                    <view class="text-[24rpx] text-[var(--text-color-light9)]" v-if="item.order_goods && item.order_goods.status != 1 && item.order_goods.status_name">{{ t('refundStatus') }}{{ item.order_goods.status_name }}</view>
                                </view>
                            </view>
                        </view>
                        <view class="flex items-center justify-between mt-[20rpx] flex-wrap">
                            <view class="flex items-center text-[24rpx] leading-[35rpx]">
                                <text class="mr-[4rpx]">分红比率:</text>
                                <view class="text-[var(--price-text-color)]" v-if="item.commission_rate||item.team_flat_rate">{{ item.team_flat_rate > 0 ? item.team_flat_rate + '%(平级分红比率)' : item.commission_rate + '%' }}</view>
                                <view class="flex items-center" v-else>--</view>
                            </view>
                            <view class="text-[24rpx] flex items-center leading-[35rpx]">
                                <text class="mr-[4rpx]">佣金:</text>
                                <text class="text-[var(--price-text-color)]">{{ moneyFormat(item.commission) || '0.00' }}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <mescroll-empty v-if="!list.length && !tableLoading" :option="{'icon': img('static/resource/images/empty.png')}"></mescroll-empty>

            </mescroll-body>
        </template>
        <view class="pt-[var(--top-m)] footer" v-if="teamOpen == 0 && !loading">
            <mescroll-empty :option="{tip : '团队分红设置未开启'}"></mescroll-empty>
        </view>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { img, moneyFormat } from '@/utils/common';
import { ref } from 'vue'
import { t } from '@/locale'
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
import { onPageScroll, onReachBottom, onLoad } from '@dcloudio/uni-app'
import { getFenxiaoInfo } from '@/addon/shop_fenxiao/api/fenxiao';
import { getTeamOrder, getTeamStat, getOrderTeamConfig } from '@/addon/shop_fenxiao/api/team';

const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);

/********* 是否开启团队分红设置 - start ***********/
const teamOpen = ref<any>('');
onLoad(async() => {
    await getOrderTeamConfig().then(res => {
        teamOpen.value = res.data.is_open
    })
})
/********* 是否开启团队分红设置  - end ***********/

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
    getTeamOrder(data).then((res: any) => {
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
const teamStat = ref({});
const getTeamStatFn = () => {
    getTeamStat().then((res: any) => {
        teamStat.value = res.data;
    })
}
getTeamStatFn();

// 分销商信息
const fenxiaoInfo = ref({});
const getFenxiaoInfoFn = () => {
    loading.value = true;
    getFenxiaoInfo().then((res: any) => {
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
    getTeamStatFn();
}
</script>

<style lang="scss" scoped>
.wrap-bg {
    background: linear-gradient(to right, var(--primary-color) 40%, var(--primary-help-color3) 90%);
}
</style>
<style>
:deep(.team-dividend .mescroll-body) {
    min-height: calc(100vh - 262rpx) !important;
}

.footer :deep(.mescroll-empty) {
    margin-top: 0 !important;
}
</style>
