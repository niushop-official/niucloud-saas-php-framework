<template>
    <view class="bg-[var(--page-bg-color)] min-h-[100vh]" :style="themeColor()">
        <template v-if="saleOpen == 1 && !pageLoading">
            <view class="fixed w-full z-2  !bg-[var(--page-bg-color)]">
                <view class="w-full overflow-hidden" :style="headerStyle">
                    <!-- #ifdef MP-WEIXIN -->
                    <top-tabbar :data="param" :scrollBool="topTabarObj.getScrollBool()" class="top-header" />
                    <!-- #endif -->
                    <view class="card-template sidebar-margin mt-[312rpx]">
                        <view class="flex flex-col  mb-[56rpx]" @click="applyCashOut">
                            <text class="text-[30rpx] h-[36rpx] leading-[36rpx] text-[#333] mb-[16rpx]">销售奖励（元）
                            </text>
                            <text class="text-[48rpx] price-font text-[var(--price-text-color)] min-h-[58rpx]">{{ moneyFormat(saleCommission.sale_commission) || 0.00 }}</text>
                        </view>
                        <view class="flex item-center justify-between">
                            <view class="flex flex-col w-[50%]">
                                <text class="text-[28rpx] h-[34rpx] text-[var(--text-color-light6)] mb-[10rpx]">待发放（元）</text>
                                <text class="text-[36rpx] min-h-[46rpx] text-[#333] price-font">{{ moneyFormat(saleCommission.wait_sale_commission) || 0.00 }}</text>
                            </view>
                            <view class="flex flex-col w-[50%]">
                                <text class="text-[28rpx] h-[34rpx] text-[var(--text-color-light6)] mb-[10rpx]">已发放（元）</text>
                                <text class="text-[36rpx] min-h-[46rpx] text-[#333] price-font">{{ moneyFormat(saleCommission.sale_commission_send) || 0.00 }}</text>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="tab-style-1  mt-[40rpx]">
                    <view class="tab-left">
                        <view class="tab-left-item" :class="{ 'class-select': fromType === item.key}" @click="fromTypeFn(item.key,index)" v-for="(item, index) in typeList">{{ item.name }}</view>
                    </view>
                </view>
            </view>
            <mescroll-body ref="mescrollRef" :down="{ use: false }" @init="mescrollInit" @up="getSaleMemberFn" :top="mescrollTop">
                <template v-if="info.length && !infoLoading && !loading">
                    <view v-for="(item,index) in info" :keys="index" class="flex justify-between items-center card-template mt-[var(--top-m)] sidebar-margin" @click="toDetail(item.period_id)">
                        <view class="flex flex-col">
                            <view v-if="item.is_settlement" class="text-[#333] text-[28rpx] flex items-center">
                                <text class="text-[28rpx] mr-[6rpx]">结算时间</text>
                                <text>{{ item.sale_end_time }}</text>
                            </view>
                            <view v-else class="text-[#333] text-[28rpx] flex items-center">
                                <text class="text-[28rpx] mr-[6rpx]">预计结算时间</text>
                                <text>{{ item.sale_end_time }}</text>
                            </view>
                            <view class="mt-[16rpx] h-[34rpx] flex items-center text-[24rpx] text-[var(--text-color-light6)]">销售金额：{{ item.order_money }}</view>
                        </view>
                        <view class="text-[28rpx] text-[var(--text-color-light6)]" :class="{'text-[#333]': item.is_send, 'text-[var(--primary-color)]': !item.is_send}">{{ item.is_send ? '已发放' : '待发放' }}</view>
                    </view>
                </template>
                <mescroll-empty
                    :option="{'icon': img('addon/shop_fenxiao/sale/empty.png'), 'tip': '暂无销售奖励记录', 'btnText': '去逛逛'}"
                    @emptyclick="redirect({ url: '/addon/shop_fenxiao/pages/goods' })"
                    v-if="!info.length && !infoLoading && !loading"></mescroll-empty>
            </mescroll-body>
        </template>
        <view class="h-[100vh] w-[100vw] overflow-hidden" v-if="saleOpen == 0 && !pageLoading">
            <!-- #ifdef MP-WEIXIN -->
            <top-tabbar :data="param" :scrollBool="topTabarObj.getScrollBool()" class="top-header" />
            <!-- #endif -->
            <view class="empty-page">
                <image class="img" :src="img('static/resource/images/system/empty.png')" mode="aspectFit" />
                <view class="desc">销售奖励设置未开启</view>
            </view>
        </view>
        <loading-page :loading="pageLoading"></loading-page>

    </view>
</template>
<script lang="ts" setup>
import { t } from '@/locale'
import { ref, computed } from 'vue'
import useMemberStore from '@/stores/member'
import { img, redirect, moneyFormat, pxToRpx } from '@/utils/common';
import {
    getSaleMemberList,
    getSaleMemberNowList,
    getSaleMemberCommission,
    getSaleConfig
} from '@/addon/shop_fenxiao/api/sale'
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
import { onPageScroll, onReachBottom, onLoad } from '@dcloudio/uni-app';
import { topTabar } from '@/utils/topTabbar'
import { cloneDeep } from 'lodash-es'

const memberStore = useMemberStore();
// 获取系统状态栏的高度
let menuButtonInfo: any = {};
// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
menuButtonInfo = uni.getMenuButtonBoundingClientRect();
// #endif
const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);

/********* 自定义头部 - start ***********/
const topTabarObj = topTabar()
let param = topTabarObj.setTopTabbarParam({ title: '销售奖励' })
/********* 自定义头部 - end ***********/

/********* 头部样式 - start ***********/
const headerStyle = computed(() => {
    let obj: any = {
        backgroundImage: 'url(' + img('addon/shop_fenxiao/sale/head_bg.png') + ') ',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    }
    // #ifdef H5
    obj.backgroundPositionY = '-170rpx';
    // #endif
    return obj
})

const mescrollTop = computed(() => {
    if (Object.keys(menuButtonInfo).length) {
        // pxToRpx(8) => 表示胶囊的padding-bottom  728 => 表示列表以上的该高度【不包括自定义头部】
        return (pxToRpx(Number(menuButtonInfo.height)) + pxToRpx(menuButtonInfo.top) + pxToRpx(8) + 728) + 'rpx'
    } else {
        // 表示列表以上的高度
        return '728rpx'
    }
})

/********* 头部样式 - end ***********/
/********* 是否开启销售奖励设置 - start ***********/
const saleOpen = ref<any>('');
const pageLoading = ref<boolean>(true);
onLoad(async() => {
    await getSaleConfig().then(res => {
        saleOpen.value = res.data.is_open
        if (saleOpen.value == 0) {
            param = topTabarObj.setTopTabbarParam({
                title: '销售奖励',
                topStatusBar: { textColor: '#333', bgColor: '#fff' }
            })
        }
        pageLoading.value = false;
    })
})
/********* 是否开启销售奖励设置  - end ***********/

/************ 类型筛选-start ************/
const typeList = ref([
    { name: '全部', key: 'all' },
    { name: '待发放', key: '0' },
    { name: '已发放', key: '1' }
])
const fromType = ref('all')
const subActive = ref(0)
const fromTypeFn = (key: any, index: any) => {
    fromType.value = key;
    subActive.value = index;
    info.value = [];
    getMescroll().resetUpScroll();
}

/************ 类型-start ************/
const loading = ref<boolean>(true);//页面加载动画
const infoLoading = ref<boolean>(true);//页面加载动画
const info: Record<string, any> = ref([])
const getSaleMemberFn = (mescroll: any) => {
    infoLoading.value = true;
    getSaleMemberList({
        page: mescroll.num,
        limit: mescroll.size,
        is_send: fromType.value
    }).then((res: any) => {
        let newArr = res.data.data
        //设置列表数据
        if (mescroll.num == 1) {
            info.value = []; //如果是第一页需手动制空列表
            if (fromType.value != '1') {
                getSaleMemberNowListFn(newArr);
            }
        }
        info.value = info.value.concat(newArr);
        infoLoading.value = false;
        mescroll.endSuccess(newArr.length);
    }).catch(() => {
        loading.value = false;
        infoLoading.value = false;
        mescroll.endErr(); // 请求失败, 结束加载
    })
}
const getSaleMemberNowListFn = async(newArr: any) => {
    loading.value = true;
    const res: any = await getSaleMemberNowList()
    let idArr = newArr.map(el => el.period_id);
    if (Object.keys(res.data).length && (idArr.length && idArr.indexOf(res.data.id) == -1 || !idArr.length)) {
        let obj = cloneDeep(res.data)
        obj.reward_money = obj.total_reward_money;
        obj.period_id = obj.id;
        obj.order_money = obj.total_order_money;
        info.value.unshift(obj);
    }
    loading.value = false;
}
const saleCommission = ref({})
const getSaleMemberCommissionFn = () => {
    getSaleMemberCommission().then((res: any) => {
        saleCommission.value = res.data;
    })
}
getSaleMemberCommissionFn()

// 我的佣金
const applyCashOut = () => {
    memberStore.getMemberInfo(() => {
        redirect({ url: '/app/pages/member/commission' })
    })
}

const toDetail = (id: any) => {
    redirect({ url: '/addon/shop_fenxiao/pages/sale_detail', param: { id: id } })
}
</script>
<style lang="scss" scoped>
.wechat {
    background: linear-gradient(to right, var(--primary-help-color3) 40%, var(--primary-color) 90%);
}
</style>
