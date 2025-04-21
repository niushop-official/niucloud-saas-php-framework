<template>
    <view class="min-h-[100vh]" :style="themeColor()">
        <view class="min-h-[100vh] px-[var(--sidebar-m)] pt-[30rpx] pb-[160rpx] box-border" :style="{ 'background': 'url(' + img('addon/shop_fenxiao/index/promote_bg.png') + ') #ff2d46 left top /100% no-repeat' }" v-if="!loading">
            <view class="mt-[230rpx] bg-[#fff] rounded-[var(--rounded-big)]">
                <view class="flex flex-col justify-center rounded-[var(--rounded-big)]">
                    <image class="w-[384rpx] h-[74rpx] m-auto -mt-[20rpx]" :src="img('addon/shop_fenxiao/index/my_earnings.png')" mode="" />
                    <view class="flex flex-col items-center justify-center text-[24rpx] pt-[50rpx] pb-[20rpx]">
                        <view class="inline-block mb-[14rpx]">
                            <text class="font-500 text-[26rpx]">￥</text>
                            <text class="text-[40rpx] ml-[4rpx] price-font" v-if="fenxiaoInfo.member">{{ moneyFormat(fenxiaoInfo.member.commission_get || 0) }}</text>
                        </view>
                        <view class="flex items-center">
                            <image class="w-[40rpx] h-[40rpx]" :src="img('addon/shop_fenxiao/index/money.png')" mode="" />
                            <view class="text-[var(--text-color-light6)]">累计收益</view>
                        </view>
                    </view>
                </view>
                <view class="flex justify-around pt-[30rpx] pb-[60rpx]">
                    <view class="flex items-center flex-col" @click="redirect({url:'/addon/shop_fenxiao/pages/team'})">
                        <text class="text-[#303133] text-[36rpx] font-500 ">{{ fenxiaoTeamNum }}</text>
                        <text class="text-[26rpx] text-[var(--text-color-light6)] mt-[20rpx]">我的团队人数</text>
                    </view>
                    <view class="flex items-center flex-col"
                          @click="redirect({url:'/addon/shop_fenxiao/pages/child_fenxiao'})">
                        <text class="text-[#303133] text-[36rpx] font-500">{{ childFenxiaoNum }}</text>
                        <text class="text-[26rpx] text-[var(--text-color-light6)] mt-[20rpx]">分销商人数</text>
                    </view>
                </view>
            </view>
            <view class="mt-[100rpx] bg-[#fff] rounded-[var(--rounded-big)] flex flex-col px-[var(--pad-sidebar-m)] pb-[50rpx]">
                <image class="w-[384rpx] h-[74rpx] m-auto -mt-[20rpx] mb-[30rpx]" :src="img('addon/shop_fenxiao/index/activity_rules.png')" mode="" />
                <view class="content" v-if="promoteContent">
                    <u-parse :content="promoteContent" :tagStyle="{img: 'vertical-align: top;',p:'overflow: hidden;word-break:break-word;' }"></u-parse>
                    <!-- <rich-text :nodes="promoteContent"></rich-text> -->
                </view>
                <view class="rules-empty" v-else>暂无活动规则</view>
            </view>
            <view class="fixed left-[var(--sidebar-m)] bottom-[30rpx] right-[var(--sidebar-m)] flex items-center z-10">
                <button class="w-[100%] h-[80rpx] flex-center level-wrap font-500 text-[#985400] rounded-[90rpx] text-[26rpx]" @click="toLink">邀请好友</button>
            </view>
        </view>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { redirect, img, moneyFormat } from '@/utils/common';
import { ref } from 'vue'
import { getChildFenxiao, getFenxiaoTeam, getFenxiaoInfo } from '@/addon/shop_fenxiao/api/fenxiao';
import { getAgreementInfo } from '@/app/api/system'

const loading = ref(true);
const promoteContent = ref({})

// 分销商数
const childFenxiaoNum = ref(0);
const getChildFenxiaoFn = () => {
    getChildFenxiao().then((res: any) => {
        childFenxiaoNum.value = res.data.length || 0;
    }).catch(() => {
        childFenxiaoNum.value = 0;
    })
}
getChildFenxiaoFn();

// 我的团队数
const fenxiaoTeamNum = ref(0);
const getFenxiaoTeamFn = () => {
    getFenxiaoTeam().then((res: any) => {
        fenxiaoTeamNum.value = (res.data.direct.length + res.data.indirect.length) || 0;
    }).catch(() => {
        fenxiaoTeamNum.value = 0;
    })
}
getFenxiaoTeamFn();

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

// 规则内容
const getAgreementInfoFn = () => {
    getAgreementInfo('fenxiao_poster').then((res: any) => {
        promoteContent.value = res.data.content
    })
}
getAgreementInfoFn();

const toLink = () => {
    redirect({ url: '/addon/shop_fenxiao/pages/promote_code', param: { id: fenxiaoInfo.value.member_id } })
}

</script>

<style lang="scss" scoped>
.wechat {
    background: #fff;
    // background: linear-gradient(to bottom, #FCEFDE , #FFAD41 90%);
}

.wechat.button-hover {
    color: #EF2233 !important;
}

.level-wrap {
    background: linear-gradient(90deg, #FDE4C0, #FDC274);
}
</style>
