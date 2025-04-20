<template>
    <view class="bg-[var(--page-bg-color)] min-h-[100vh] box-border" :style="themeColor()">
        <template v-if="Object.keys(detail).length">
            <!-- #ifdef H5 -->
            <view class="w-[100%] h-[375rpx] relative  background-size box-border py-[24rpx] px-[var(--sidebar-m)]"
                  :style="{ backgroundImage: 'url(' + img('addon/shop_fenxiao/task_detail_wechat.png') + ')'}">
                <!-- #endif -->
                <!-- #ifdef MP-WEIXIN -->
                <view class="w-[100%] h-[550rpx] relative  background-size box-border py-[24rpx] px-[var(--sidebar-m)]"
                      :style="{ backgroundImage: 'url(' + img('addon/shop_fenxiao/task_detail_wechat.png') + ')' }">
                    <top-tabbar :data="param" :scrollBool="topTabarObj.getScrollBool()" class="top-header" />
                    <!-- #endif -->
                    <!-- 跳转个任务奖励明细 -->
                    <view class="side-tab" :style="{top: topStyle}" @click="toDetail">
                        <text class="iconfont iconlishijiluV6xx icon"></text>
                        <text class="desc">奖励明细</text>
                    </view>
                </view>
                <view class="px-[var(--sidebar-m)] pb-[20rpx] mt-[-75rpx]">
                    <!-- 活动未开始 -->
                    <view class="bg-[#fff] rounded-[var(--rounded-big)] py-[60rpx] text-center relative mb-[var(--top-m)]" v-if="detail.status === 1">
                        <view class="text-[#333] text-[30rpx] font-500 mb-[30rpx]">该任务还未开始</view>
                        <view class="text-[var(--text-color-light9)] text-[26rpx]">请您耐心等待...</view>
                    </view>
                    <view class="card-template relative" v-if="detail.status !== 1">
                        <view class="text-[30rpx] font-500 text-[#333] leading-[45rpx] multi-hidden text-center mb-[77rpx]">{{ detail.name }}</view>
                        <!-- 进度条 -->
                        <view class="relative pb-[58rpx] mb-[30rpx] mx-[30rpx]">
                            <view class="w-full h-[24rpx] rounded-[12rpx] bg-[#FFF2D0] flex">
                                <!-- 进度条 -->
                                <view class="h-[24rpx] rounded-[12rpx] bg-linear flex overflow-hidden" :style="{ width : detail.task_member && detail.task_member.task_data.show_progress.rate ? detail.task_member.task_data.show_progress.rate + '%' : 24 + 'rpx' }">
                                    <view class="mr-[10rpx] h-[24rpx] flex-1 flex items-center justify-end box-border" v-if="detail.task_member && detail.task_member.task_data.show_progress.rate">
                                        <text class="w-[4rpx] h-[4rpx] rounded-full bg-[#fff] mr-[6rpx]"></text>
                                        <text class="w-[6rpx] h-[6rpx] rounded-full bg-[#fff] mr-[6rpx]"></text>
                                        <text class="w-[8rpx] h-[8rpx] rounded-full bg-[#fff]"></text>
                                    </view>
                                </view>
                                <!-- 总进度图标 -->
                                <image class="w-[52rpx] h-[52rpx] align-middle absolute right-0 top-[12rpx] transform -translate-y-1/2" mode="widthFix" :src="img('addon/shop_fenxiao/task_icon.png')" />
                                <!-- 总进度金额 -->
                                <view class="money min-w-[60rpx] h-[36rpx] px-[12rpx] box-border bg-[var(--primary-color)] text-[#fff] absolute right-[26rpx] top-[-56rpx] transform translate-x-1/2 rounded-[18rpx] z-10 flex items-center">
                                    <text class="text-[24rpx]">￥</text>
                                    <text class="text-[24rpx]">{{ detail.rules[0].reward?.commission }}</text>
                                </view>
                            </view>
                            <!-- 当前完成进度文字 -->
                            <view ref="mytext" v-if="detail.task_member && detail.task_member.task_data.show_progress.rate != 100"
                                  class="absolute text-[26rpx] bottom-0  leading-[34rpx] text-[var(--primary-color)]"
                                  :class="{' transform -translate-x-1/2': detail.task_member && detail.task_member.task_data.show_progress.rate > 0}"
                                  :style="{ 'left': detail.task_member ? detail.task_member.task_data.show_progress.rate + '%' : 0 }">{{ detail.task_member.task_data.now_data + detail.task_member.task_data.util }}</view>
                            <!-- 需完成的总进度完成 -->
                            <view ref="overallText" class="absolute text-[26rpx] leading-[34rpx] flex-center min-w-[100rpx]  bottom-0 -right-[20rpx]">{{ detail.task_member ? (detail.task_member.task_data.util == '元' ? moneyFormat(detail.task_member.task_data.end_data) : detail.task_member.task_data.end_data) + detail.task_member.task_data.util : (detail.task_data.util == '元' ? moneyFormat(detail.task_data.end_data) : detail.task_data.end_data) + detail.task_data.util }}</view>
                        </view>
                        <view class="bg-[#FFF8EF] rounded-[var(--goods-rounded-big)] px-[30rpx] py-[30rpx]" v-if="detail.task_member">
                            <view class="text-center text-[28rpx] font-500 mb-[40rpx]">完成进度</view>
                            <view class="text-[26rpx] flex-1 w-[615rpx] break-all flex items-center mb-[34rpx]">
                                <text class="text-[#823D19]">{{ detail.task_member.task_data.util == '元' ? '完成金额：' : detail.task_member.task_data.util == '单' ? '完成单数：' : '推广人数' }}</text>
                                <view class="text-[26rpx] text-[#333]">
                                    {{ detail.task_member.task_data.title }}已达
                                    <text class="text-[var(--primary-color)]">{{ detail.task_member.task_data.util == '元' ? moneyFormat(detail.task_member.task_data.now_data) : detail.task_member.task_data.now_data }}</text>
                                    {{ detail.task_member.task_data.util }}
                                </view>
                            </view>
                            <view class="text-[26rpx] flex-1 w-[615rpx] break-all flex items-center mb-[34rpx]">
                                <text class="text-[#823D19]">完成次数：</text>
                                <view class="text-[26rpx] text-[#333]">
                                    <text class="text-[var(--primary-color)]">{{ detail.task_member.complete_num }}</text>
                                    <text>/{{ detail.times ? detail.times + '次' : '不限次' }}</text>
                                </view>
                            </view>
                            <view class="text-[26rpx] flex-1 w-[615rpx] break-all flex items-center">
                                <text class="text-[#823D19]">领取奖励：</text>
                                <text class="text-[#333]">累计领取{{ detail.task_member.complete_num }}次奖励共计{{ moneyFormat(detail.task_member.complete_num * detail.rules[0].reward?.commission) }}元</text>
                            </view>
                        </view>
                    </view>
                    <!-- 任务信息 -->
                    <view class="overflow-hidden mt-[20rpx] card-template">
                        <view class="title">任务信息</view>
                        <view class="text-[26rpx] flex-1 card-template-item">
                            <text class="text-[var(--text-color-light9)]">任务内容：</text>
                            <view v-if="!detail.task_member" class="text-[26rpx] text-[#333]">{{ detail.task_data.title }}达{{ detail.rules[0].condition?.type.includes('order_num') ? detail.rules[0].condition?.order_num : detail.rules[0].condition?.type.includes('order_money') ? detail.rules[0].condition?.order_money : detail.rules[0].condition?.child_num }}{{ detail.task_data.util }}</view>
                            <view v-else class="text-[26rpx] text-[#333]">{{ detail.task_member.task_data.title }}达{{ detail.rules[0].condition?.type.includes('order_num') ? detail.rules[0].condition?.order_num : detail.rules[0].condition?.type.includes('order_money') ? detail.rules[0].condition?.order_money : detail.rules[0].condition?.child_num }}{{ detail.task_member.task_data.util }}</view>
                        </view>
                        <view class="text-[26rpx] flex-1 card-template-item">
                            <text class="text-[var(--text-color-light9)]">任务奖励：</text>
                            <text class="text-[#333]">{{ moneyFormat(detail.rules[0].reward?.commission) }}元</text>
                        </view>
                        <view class="text-[26rpx] flex-1 card-template-item" v-if="detail.type===1">
                            <text class="text-[var(--text-color-light9)]">参与次数：</text>
                            <text class="text-[#333]">{{ detail.times ? detail.times + '次' : '不限次' }}</text>
                        </view>
                        <view class="text-[26rpx] flex-1 card-template-item">
                            <text class="text-[var(--text-color-light9)]">活动时间：</text>
                            <view class="text-[#333]">{{ detail.start_time ? detail.start_time.substring(0, 10) : '--' }} 至 {{ detail.time_type == 1 ? detail.end_time.substring(0, 10) : "长期有效" }}（{{ detail.status === 1 ? '未开始' : detail.status === 2 ? '已开始' : '已结束' }}）</view>
                        </view>
                    </view>
                    <!-- 奖励规则 -->
                    <view class="card-template overflow-hidden mt-[var(--top-m)]">
                        <view class="title">{{ t('rewardRules') }}</view>
                        <view class="text-[26rpx] flex-1 card-template-item">
                            <text class="text-[var(--text-color-light9)]">参与等级：</text>
                            <text class="text-[#333]">{{ detail.level_type == 1 && '全部等级' || detail.level_type == 2 && Object.values(detail.level_data).toString() }}</text>
                        </view>
                        <view class="text-[26rpx] flex-1 card-template-item">
                            <text class="text-[var(--text-color-light9)]">奖励指标：</text>
                            <text class="text-[#333]">{{ detail.task_member ? detail.task_member.task_data.title : detail.task_data.title }}</text>
                        </view>
                        <view v-if="!detail.task_member" class="text-[26rpx] card-template-item">
                            <text class="text-[var(--text-color-light9)]">奖励说明：</text>
                            <text class="text-[#333]">{{ detail.task_data.title }}达{{ detail.rules[0].condition?.type.includes('order_num') ? detail.rules[0].condition?.order_num : detail.rules[0].condition?.type.includes('order_money') ? detail.rules[0].condition?.order_money : detail.rules[0].condition?.child_num }}{{ detail.task_data.util }}即可获得{{ moneyFormat(detail.rules[0].reward?.commission) }}元佣金</text>
                        </view>
                        <view v-else class="text-[26rpx] card-template-item">
                            <text class="text-[var(--text-color-light9)]">奖励说明：</text>
                            <text class="text-[#333]">{{ detail.task_member.task_data.title }}达{{ detail.rules[0].condition?.type.includes('order_num') ? detail.rules[0].condition?.order_num : detail.rules[0].condition?.type.includes('order_money') ? detail.rules[0].condition?.order_money : detail.rules[0].condition?.child_num }}{{ detail.task_member.task_data.util }}即可获得{{ moneyFormat(detail.rules[0].reward?.commission) }}元佣金</text>
                        </view>
                    </view>
                    <!-- 任务说明 -->
                    <view v-if="detail.remark" class="card-template overflow-hidden mt-[var(--top-m)]">
                        <view class="title">{{ t('taskSpecification') }}</view>
                        <view class="text-[#333] text-[26rpx] leading-[1.6]">{{ detail.remark }}</view>
                    </view>
                </view>
        </template>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale';
import { ref, computed } from 'vue'
import { img, redirect, moneyFormat, pxToRpx, goback } from '@/utils/common';
import { onLoad } from '@dcloudio/uni-app'
import { getTaskInfo } from '@/addon/shop_fenxiao/api/task'
import { topTabar } from '@/utils/topTabbar'

/********* 自定义头部 - start ***********/
const topTabarObj = topTabar()
let param = topTabarObj.setTopTabbarParam({ title: '任务奖励详情' })
/********* 自定义头部 - end ***********/

//头部高度
const detail: Record<string, any> = ref({})
onLoad((option: any) => {
    if (!option.id) {
        let parameter = {
            url: '/addon/shop_fenxiao/pages/task_rewards',
            title: '缺少任务奖励id'
        };
        goback(parameter);
    } else {
        getTaskInfoFn(Number(option.id))
    }
})
const loading = ref<boolean>(true);//页面加载动画
const getTaskInfoFn = (id: number) => {
    getTaskInfo(id).then((res: any) => {
        detail.value = res.data
        if (detail.value.status === 1) {
            detail.value.time = new Date(detail.value.start_time).getTime() - new Date().getTime()
            detail.value.time = detail.value.time < 0 ? '' : detail.value.time
        } else if (detail.value.status === 2) {
            if (detail.value.time_type != 2) {
                detail.value.time = new Date(detail.value.end_time).getTime() - new Date().getTime()
                detail.value.time = detail.value.time < 0 ? '' : detail.value.time
            } else {
                detail.value.time = ''
            }
        }
        loading.value = false
    }).catch(() => {
        loading.value = false
    })

}

// 获取系统状态栏的高度
let menuButtonInfo: any = {};
// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
menuButtonInfo = uni.getMenuButtonBoundingClientRect();
// #endif
const topStyle = computed(() => {
    let style = Object.keys(menuButtonInfo).length ? (pxToRpx(Number(menuButtonInfo.height)) + pxToRpx(menuButtonInfo.top) + 50) + 'rpx;' : '50rpx'
    return style
})

const timeData: Record<string, any> = ref({})
//计算进度条上方文字极限展示位置
// const Progresslock: Record<string, any> = ref({
//     leftTranslateLock:false
// })
// const mytext = ref<HTMLElement>()//

// const Progress =()=>{
//     if(detail.task_member) {
//         detail.task_member.task_data.show_progress.rate
//     }
// }
const onChange = (e: any) => {
    timeData.value = e
}
const toDetail = () => {
    redirect({ url: '/addon/shop_fenxiao/pages/task_rewards_detail', param: { id: detail.value.id } })
}
</script>
<style lang="scss">
.time__hours,
.time__minutes,
.time__seconds {
    color: #fff;
    display: inline-block;
    background: var(--primary-color);
    width: 45rpx;
    height: 45rpx;
    text-align: center;
    line-height: 45rpx;
    border-radius: 3rpx;
}

.background-size {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
}

.bg-linear {
    background: linear-gradient(90deg, #FFB054 0%, #FF2524 100%);
}

.money {
    &::after {
        content: "";
        width: 8rpx;
        height: 8rpx;
        background-color: var(--primary-color);
        transform: rotate(45deg) translateX(-50%);
        position: absolute;
        bottom: -6rpx;
        left: 50%;
    }
}
</style>
