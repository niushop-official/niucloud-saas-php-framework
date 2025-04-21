<template>
    <view :style="themeColor()" class="bg-[var(--page-bg-color)] min-h-[100vh] overflow-hidden">
        <view v-if="!loading">
            <template v-if="config.fenxiao_config.is_fenxiao == 1">
                <view :style="{ 'background': 'url(' + img('addon/shop_fenxiao/index/header_bg.png') + ') left top / 100% 100% no-repeat' }">
                    <!-- #ifdef MP-WEIXIN -->
                    <top-tabbar :data="param" class="top-header" :scrollBool="topTabarObj.getScrollBool()" />
                    <!-- #endif -->
                    <view class="h-[320rpx] box-border px-[var(--sidebar-m)] pt-[44rpx] flex flex-col justify-between">
                        <view class="flex items-center">
                            <view class="!w-[100rpx] !h-[100rpx] rounded-full flex-shrink-0 overflow-hidden">
                                <u-avatar v-if="detail.member.headimg" :default-url="img('static/resource/images/default_headimg.png')" :src="img(detail.member.headimg)" size="100rpx" leftIcon="none" />
                                <u-avatar v-else :src="img('static/resource/images/default_headimg.png')" size="100rpx" leftIcon="none" />
                            </view>
                            <view class="flex flex-col text-[#303133] ml-[32rpx]">
                                <view class="text-[30rpx] font-500 leading-[1.4] truncate max-w-[520rpx]">{{ detail.member.nickname }}</view>
                                <view class="text-[24rpx] text-[var(--text-color-light6)] mt-[20rpx]" v-if="detail.parent_fenxiao">上级分销商：{{ detail.parent_fenxiao.nickname }}</view>
                            </view>
                            <!-- <view class="flex items-center text-[#fff] text-[24rpx] ml-auto">
                                <text class="nc-iconfont nc-icon-a-bangzhuV6xx-36 mr-[10rpx]"></text>
                                <text>推广规则</text>
                            </view> -->
                        </view>
                        <view class="flex items-center h-[140rpx] box-border rounded-[var(--rounded-big)] px-[var(--pad-sidebar-m)] py-[var(--pad-top-m)]"
                            :style="{backgroundImage: 'url(' + img('addon/shop_fenxiao/index/head_bg.png') + ') ',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'cover'}"
                            @click="redirect({ url: '/addon/shop_fenxiao/pages/level' })">
                            <view class="flex flex-col">
                                <view class="flex items-center">
                                    <image class="w-[30rpx] h-[30rpx] mr-[10rpx]" :src="img('addon/shop_fenxiao/info_vip.png')" mode="widthFix" />
                                    <text class="text-[30rpx] truncate w-[320rpx] font-500 text-[#FDD6A1]">{{ Object.keys(detail.fenxiao_level).length && !detail.fenxiao_level.is_default ? detail.fenxiao_level.level_name : '等级未解锁' }}</text>
                                </view>
                                <text class="text-[26rpx] text-[#E8D3B6] mt-[16rpx]">下单、邀请好友均可提升等级</text>
                            </view>
                            <text class="ml-auto level-wrap w-[120rpx] h-[54rpx] text-center rounded-[54rpx] text-[22rpx] flex-center text-[#794200]">去升级</text>
                        </view>
                    </view>
                </view>

                <view class="commission-bg sidebar-margin my-[var(--top-m)] rounded-[var(--rounded-big)] pb-[30rpx]">
                    <view class="flex justify-between py-[30rpx] px-[24rpx] items-center border-0 border-b-[2rpx] border-[var(--temp-bg)] border-solid">
                        <text class="text-[30rpx] font-500">{{ t('billingInformation') }}</text>
                        <view class="text-[var(--text-color-light6)] text-[26rpx]" @click="cashOutList">
                            <text>佣金明细</text>
                            <text class="nc-iconfont nc-icon-youV6xx text-[var(--text-color-light9)] ml-[2rpx] !text-[24rpx]"></text>
                        </view>
                    </view>
                    <view class="flex mt-[50rpx] justify-around commission-content">
                        <view class="flex flex-col items-center" @click="toCommission">
                            <text class="text-[24rpx] text-[var(--text-color-light9)]">{{ t('commissionGet') }}</text>
                            <text class="text-[#303133] price-font text-[30rpx] font-500 mt-[16rpx]">{{ moneyFormat(detail.member.commission_get) }}</text>
                        </view>
                        <view class="flex flex-col items-center" @click="toCommission">
                            <text class="text-[24rpx] text-[var(--text-color-light9)]">{{ t('commission') }}</text>
                            <text class="text-[#303133] price-font text-[30rpx] font-500 mt-[16rpx]">{{ moneyFormat(detail.member.commission) }}</text>
                        </view>
                        <view class="flex flex-col items-center" @click="toCommission">
                            <text class="text-[24rpx] text-[var(--text-color-light9)]">已提现</text>
                            <text class="text-[#303133] price-font text-[30rpx] font-500 mt-[16rpx]">{{ moneyFormat(detail.member.commission_get - detail.member.commission - detail.member.commission_cash_outing) }}</text>
                        </view>
                        <view class="flex flex-col items-center" @click="toCommission">
                            <text class="text-[24rpx] text-[var(--text-color-light9)]">{{ t('commissionCashOuting') }}</text>
                            <text class="text-[#303133] price-font text-[30rpx] font-500 mt-[16rpx]">{{ moneyFormat(detail.member.commission_cash_outing) }}</text>
                        </view>
                    </view>
                    <view class="text-center mt-[60rpx] mx-auto w-[570rpx] h-[76rpx] flex-center level-wrap text-[#985400] rounded-[90rpx] text-[26rpx] font-500" @click="applyCashOut">提现</view>
                </view>

                <view class="flex">
                    <view class="flex px-[30rpx] rounded-[var(--rounded-big)] items-center flex-1 sidebar-margin h-[150rpx] team-bg"
                        @click.stop="redirect({ url: '/addon/shop_fenxiao/pages/team' })">
                        <image class="w-[80rpx] h-[80rpx] mr-[20rpx]" :src="img('addon/shop_fenxiao/index/team1.png')" mode="widthFix" />
                        <view class="flex flex-col">
                            <text class="text-[28rpx]">我的团队</text>
                            <text class="text-[var(--text-color-light6)] text-[24rpx] mt-[20rpx]">{{ fenxiaoTeamNum }}人</text>
                        </view>
                    </view>
                    <view class="flex px-[30rpx] rounded-[var(--rounded-big)] items-center flex-1 mr-[var(--sidebar-m)] h-[150rpx] fenxiao-bg" @click.stop="redirect({ url: '/addon/shop_fenxiao/pages/child_fenxiao' })">
                        <image class="w-[80rpx] h-[80rpx] mr-[20rpx]" :src="img('addon/shop_fenxiao/index/fenxiao.png')" mode="widthFix" />
                        <view class="flex flex-col">
                            <text class="text-[28rpx]">分销商</text>
                            <text class="text-[var(--text-color-light6)] text-[24rpx] mt-[10rpx]">{{ childFenxiaoNum }}人</text>
                        </view>
                    </view>
                </view>

                <view class="commission-bg pb-[35rpx] sidebar-margin my-[var(--top-m)] rounded-[var(--rounded-big)]">
                    <view class="py-[30rpx] px-[24rpx] border-0 border-b-[2rpx] border-solid border-[#f6f6f6] text-[30rpx] font-500">常用功能</view>
                    <view class="flex flex-wrap common-module pt-[7rpx]">
                        <view class="flex items-center flex-col w-[33.3%] py-[23rpx]" @click="redirect({ url: '/addon/shop_fenxiao/pages/promote' })">
                            <image class="w-[66rpx] h-[66rpx]" :src="img('addon/shop_fenxiao/index/code.png')" mode="widthFix" />
                            <view class="flex flex-col items-center mt-[16rpx]">
                                <text class="text-[26rpx]">邀请好友</text>
                                <text class="text-[22rpx] text-[var(--text-color-light9)] mt-[12rpx]">邀好友赚好礼</text>
                            </view>
                        </view>
                        <view class="flex items-center flex-col w-[33.3%] py-[23rpx]" @click="redirect({ url: '/addon/shop_fenxiao/pages/order' })">
                            <image class="w-[66rpx] h-[66rpx]" :src="img('addon/shop_fenxiao/index/order.png')" mode="widthFix" />
                            <view class="flex flex-col items-center mt-[16rpx]">
                                <text class="text-[26rpx]">分销订单</text>
                                <text class="text-[22rpx] text-[var(--text-color-light9)] mt-[12rpx]">分销订单明细</text>
                            </view>
                        </view>
                        <view class="flex items-center flex-col w-[33.3%] py-[23rpx]" v-if="config.team_config.is_open == 1" @click="redirect({ url: '/addon/shop_fenxiao/pages/team_dividend' })">
                            <image class="w-[66rpx] h-[66rpx]" :src="img('addon/shop_fenxiao/index/team2.png')" mode="widthFix" />
                            <view class="flex flex-col items-center mt-[16rpx]">
                                <text class="text-[26rpx]">团队分红</text>
                                <text class="text-[22rpx] text-[var(--text-color-light9)] mt-[12rpx]">团队分红</text>
                            </view>
                        </view>
                        <view class="flex items-center flex-col w-[33.3%] py-[23rpx]" v-if="config.agent_config.is_open == 1" @click="redirect({ url: '/addon/shop_fenxiao/pages/agent_list' })">
                            <image class="w-[66rpx] h-[66rpx]" :src="img('addon/shop_fenxiao/index/channel.png')" mode="widthFix" />
                            <view class="flex flex-col items-center mt-[16rpx]">
                                <text class="text-[26rpx]">渠道代理</text>
                                <text class="text-[22rpx] text-[var(--text-color-light9)] mt-[12rpx]">渠道代理</text>
                            </view>
                        </view>
                        <view class="flex items-center flex-col w-[33.3%] py-[23rpx]" v-if="config.task_config.is_open == 1" @click="redirect({ url: '/addon/shop_fenxiao/pages/task_rewards' })">
                            <image class="w-[66rpx] h-[66rpx]" :src="img('addon/shop_fenxiao/index/task.png')" mode="widthFix" />
                            <view class="flex flex-col items-center mt-[16rpx]">
                                <text class="text-[26rpx]">{{ t('task') }}</text>
                                <text class="text-[22rpx] text-[var(--text-color-light9)] mt-[12rpx]">{{ t('taskDesc') }}</text>
                            </view>
                        </view>
                        <view class="flex items-center flex-col w-[33.3%] py-[23rpx]" v-if="config.sale_config.is_open == 1" @click="redirect({ url: '/addon/shop_fenxiao/pages/sale' })">
                            <image class="w-[66rpx] h-[66rpx]" :src="img('addon/shop_fenxiao/index/market.png')" mode="widthFix" />
                            <view class="flex flex-col items-center mt-[16rpx]">
                                <text class="text-[26rpx]">{{ t('sale') }}</text>
                                <text class="text-[22rpx] text-[var(--text-color-light9)] mt-[12rpx]">{{ t('saleDesc') }}</text>
                            </view>
                        </view>
                        <view class="flex items-center flex-col w-[33.3%] py-[23rpx]" @click="redirect({ url: '/addon/shop_fenxiao/pages/goods' })">
                            <image class="w-[66rpx] h-[66rpx]" :src="img('addon/shop_fenxiao/index/fenxiao_goods_01.png')" mode="widthFix" />
                            <view class="flex flex-col items-center mt-[16rpx]">
                                <text class="text-[26rpx]">分销商品</text>
                                <text class="text-[22rpx] text-[var(--text-color-light9)] mt-[12rpx]">分销商品</text>
                            </view>
                        </view>
                        <!-- <view class="flex items-center flex-col w-[33.3%] py-[20rpx]" @click="redirect({ url: '/addon/shop_fenxiao/pages/zone' })">
                            <image class="w-[66rpx] h-[66rpx]" :src="img('addon/shop_fenxiao/index/fenxiao_prefecture.png')" mode="widthFix"/>
                            <view class="flex flex-col items-center mt-[12rpx]">
                                <text class="text-[24rpx]">分销专区</text>
                                <text class="text-[22rpx] text-[var(--text-color-light9)] mt-[12rpx]">分销专区</text>
                            </view>
                        </view> -->
                    </view>
                </view>
            </template>
            <template v-else>
                <!-- #ifdef MP-WEIXIN -->
                <top-tabbar :data="paramEmpty" class="top-header" :scrollBool="topTabarObj.getScrollBool()" />
                <!-- #endif -->
                <view class="empty-page">
                    <image class="img w-[260rpx] h-[152rpx]" mode="widthFix" :src="img('addon/shop_fenxiao/unopened-fenxiao.png')" />
                    <view class="desc">{{ t('fenxiaoNotOpen') }}</view>
                </view>
            </template>
        </view>
        <loading-page :loading="loading"></loading-page>
        <tabbar addon="shop" />
    </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { onShow } from '@dcloudio/uni-app'
import { moneyFormat, img, redirect } from '@/utils/common';
import { t } from '@/locale';
import { getFenxiaoDetail, getChildFenxiao, getFenxiaoTeam, getConfig } from '@/addon/shop_fenxiao/api/fenxiao';
import useSystemStore from '@/stores/system'
import { topTabar } from '@/utils/topTabbar'

/********* 自定义头部 - start ***********/
const topTabarObj = topTabar()
let param = topTabarObj.setTopTabbarParam({ title: '分销中心', topStatusBar: { textColor: '#333' } })
let paramEmpty = topTabarObj.setTopTabbarParam({
    title: '分销中心',
    topStatusBar: { textColor: '#333', bgColor: '#fff' }
})

/********* 自定义头部 - end ***********/

const systemStore = useSystemStore()
const detail = ref({ 'member': {}, 'fenxiao_level': {} });
const loading = ref<boolean>(true);

onShow(() => {
    watch(
        () => systemStore.siteAddons,
        (newValue, oldValue) => {
            if (newValue && Object.keys(newValue).length) {

                if (!systemStore.siteAddons.includes('shop_fenxiao')) {
                    uni.showToast({
                        title: '该站点未安装分销插件',
                        icon: 'none'
                    });

                    setTimeout(() => {
                        if (getCurrentPages().length > 1) {
                            uni.navigateBack({
                                delta: 1
                            });
                        } else {
                            redirect({
                                url: '/addon/shop/pages/member/index',
                                mode: 'reLaunch'
                            });
                        }
                    }, 1500);
                }
            }
        },
        { deep: true }
    )

    getConfigFn();
    getChildFenxiaoFn();
    getFenxiaoTeamFn();
    getFenxiaoDetail().then((res: any) => {
        let data = res.data;
        if (Object.keys(data).length) {
            detail.value = res.data;
            loading.value = false;
        } else {
            loading.value = true;
            redirect({ url: '/addon/shop_fenxiao/pages/apply', mode: 'redirectTo' })
        }
    });

});

const config: Record<string, any> = ref({})
const getConfigFn = () => {
    getConfig().then((res: any) => {
        config.value = Object.assign(config.value, res.data)

    })
}

// 分销商数
const childFenxiaoNum = ref(0);
const getChildFenxiaoFn = () => {
    getChildFenxiao().then((res: any) => {
        childFenxiaoNum.value = res.data.length || 0;
    }).catch(() => {
        childFenxiaoNum.value = 0;
    })
}

// 我的团队数
const fenxiaoTeamNum = ref(0);
const getFenxiaoTeamFn = () => {
    getFenxiaoTeam().then((res: any) => {
        fenxiaoTeamNum.value = (res.data.direct.length + res.data.indirect.length) || 0;
    }).catch(() => {
        fenxiaoTeamNum.value = 0;
    })
}

// 申请提现
const applyCashOut = () => {
    uni.setStorageSync('cashOutAccountType', 'commission')
    redirect({ url: '/app/pages/member/apply_cash_out' })
}
// 佣金明细
const cashOutList = () => {
    redirect({ url: '/app/pages/member/detailed_account', param: { type: 'commission' } })
}
// 我的佣金
const toCommission = () => {
    redirect({ url: '/app/pages/member/commission' })
}
</script>

<style lang="scss" scoped>
.level-wrap {
    background: linear-gradient(90deg, #FDE4C0, #FDC274);
}

.commission-bg {
    // background: linear-gradient(180deg, #FFF9F3 5%, #FFFFFF 25%, #FFFFFF 100%);
    background: #FFFFFF;
}

.team-bg {
    background: linear-gradient(135deg, #FFF9F9 10%, #FFFFFF 40%, #FFFFFF 100%);
}

.fenxiao-bg {
    background: linear-gradient(135deg, #F8FEFF 10%, #FFFFFF 40%, #FFFFFF 100%);
}

.commission-content > view {
    position: relative;
    width: 210rpx;

    &::after {
        content: "";
        position: absolute;
        width: 2rpx;
        height: 60rpx;
        background-color: var(--temp-bg);
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }

    &:last-of-type::after {
        width: 0;
        height: 0;
    }
}

.common-module > view {
    position: relative;

    &::after {
        content: "";
        position: absolute;
        width: 2rpx;
        height: 80rpx;
        background-color: var(--temp-bg);
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }

    &:nth-child(3n+1)::after {
        width: 0;
        height: 0;
    }
}
</style>
