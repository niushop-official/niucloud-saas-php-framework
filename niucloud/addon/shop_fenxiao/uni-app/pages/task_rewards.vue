<template>
    <view class="bg-[var(--page-bg-color)] min-h-[100vh]" :style="themeColor()">
        <template v-if="taskOpen == 1 && !pageLoading">
            <mescroll-body ref="mescrollRef" :top="mescrollTop" :down="{ use: false }" @init="mescrollInit" @up="getTaskListFn">
                <view class="fixed top-0 left-0 right-0 z-10" v-if="!loading">
                    <!-- #ifdef H5-->
                    <image class="w-[100vw] min-h-[100%] h-[100%] align-middle" mode="widthFix" :src="img('addon/shop_fenxiao/task_header_h5.png')" />
                    <!-- #endif -->
                    <!-- #ifdef MP-WEIXIN -->
                    <view class="w-[100%] h-[570rpx] background-size" :style="{ backgroundImage: 'url(' + img('addon/shop_fenxiao/task_header_wechat.png') + ')' }">
                        <top-tabbar :data="param" :scrollBool="topTabarObj.getScrollBool()" class="top-header" />
                    </view>
                    <!-- #endif -->
                    <view class="tab-style-2 rounded-tl-[var(--rounded-big)] rounded-tr-[var(--rounded-big)] relative z-10 -mt-[70rpx] !p-[0]">
                        <view class="tab-content !justify-around">
                            <view class="tab-items" :class="{ 'class-select': taskData.searchParam.status === item.value }" @click="statusSearchFn(item.value)" v-for="(item, index) in statusList">{{ item.label }}</view>
                        </view>
                    </view>
                </view>
                <view class="py-[var(--top-m)] sidebar-margin box-border relative z-2" v-if="taskData.data.length">
                    <template v-for="(item, index) in taskData.data" :key="index">
                        <view class="card-template overflow-hidden" :class="{ 'mt-[20rpx]': index }" @click="toDetail(item)">
                            <view class="flex box-border">
                                <view class="w-[200rpx] h-[200rpx] relative overflow-hidden">
                                    <image class="w-[200rpx] h-[200rpx] flex-shrink-0 rounded-[var(--goods-rounded-mid)]"
                                        mode="aspectFill" v-if="item.cover_thumb_mid" :src="img(item.cover_thumb_mid)"
                                        @error="item.cover_thumb_mid='addon/shop_fenxiao/task.png'" />
                                    <image class="w-[200rpx] h-[200rpx] flex-shrink-0 rounded-[var(--goods-rounded-mid)]"
                                        mode="aspectFit" v-else :src="img('addon/shop_fenxiao/task.png')" />
                                    <view class="absolute top-0 right-0 task rounded-tr-[var(--goods-rounded-mid)] rounded-bl-[var(--goods-rounded-mid)] px-[16rpx] leading-[30rpx] h-[36rpx] text-[#fff] flex-center"
                                        :class="{'bg-[#EF000C]':(item as any).status === 2,'bg-[var(--primary-color)]': (item as any).status === 1}">
                                        <template v-if="(item as any).status === 2">
                                            <u-count-down v-if="(item as any).time_type != '2'" :time="(item as any).time" format="HH:mm:ss" autoStart millisecond />
                                            <text v-if="(item as any).time_type === '2'" class="text-[22rpx]">长期有效</text>
                                        </template>
                                        <template v-if="(item as any).status === 1">
                                            <u-count-down :time="(item as any).time" format="HH:mm:ss" autoStart millisecond />
                                        </template>
                                    </view>
                                </view>
                                <view class="flex-1 flex flex-col ml-[20rpx] py-[6rpx]">
                                    <view class="leading-[40rpx] flex items-center justify-between">
                                        <text class="text-[28rpx] text-[#333] truncate max-w-[380rpx]">{{ (item as any).name }}</text>
                                        <text class="text-[26rpx] ml-[6rpx]" :class="{'!text-[var(--primary-color)]':item.status === 2,'!text-[#FF6A1A]':item.status === 1,' text-[var(--text-color-light9)]':item.status === 3}">{{ (item as any).status_name }}</text>
                                    </view>
                                    <view class="mt-[auto]">
                                        <u-line-progress :percentage="(item as any).task_member ? (item as any).task_member.task_data.show_progress.rate||2 : 2"
                                            :showText="false" active-color="var(--primary-color)"
                                            inactiveColor="#FFF1ED" height="10rpx"></u-line-progress>
                                        <view class="flex items-center justify-between mt-[10rpx]">
                                            <view class="flex items-baseline">
                                                <text class="text-[#303133] text-[24rpx] leading-[34rpx]">奖励佣金</text>
                                                <text class="text-[var(--price-text-color)] text-[26rpx] ml-[4rpx] leading-[36rpx] font-500"
                                                    :class="{'!text-[var(--text-color-light6)]':item.status === 3}">{{ moneyFormat((item as any).rules[0].reward?.commission) }}元</text>
                                            </view>
                                            <view class="text-[24rpx]">
                                                <view v-if="(item as any).task_member">
                                                    <text class="text-[var(--price-text-color)] text-[26rpx]" :class="{'!text-[var(--text-color-light9)]':item.status === 3}">{{ `${ (item as any).task_member.task_data.util == '元' ? moneyFormat((item as any).task_member.task_data.now_data) : (item as any).task_member.task_data.now_data }/` }}</text>
                                                    <text class="text-[var(--text-color-light6)] text-[24rpx]">{{ `${ (item as any).task_member.task_data.util == '元' ? moneyFormat((item as any).task_member.task_data.end_data) : (item as any).task_member.task_data.end_data }${ (item as any).task_member.task_data.util }` }}</text>
                                                </view>
                                                <view v-else>
                                                    <text class="text-[var(--primary-color)] text-[26rpx]" :class="{'!text-[var(--text-color-light9)]':item.status === 3}">0</text>
                                                    <text class="text-[var(--text-color-light6)] text-[24rpx]">/{{ (item as any).task_data.util == '元' ? moneyFormat((item as any).task_data.end_data) : (item as any).task_data.end_data }}{{ (item as any).task_data.util }}</text>
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </template>
                </view>
                <mescroll-empty :option="{ 'icon': img('static/resource/images/empty.png') }" v-if="!taskData.data.length && !loading&&!lastLoading"></mescroll-empty>
            </mescroll-body>
        </template>
        <view class="pt-[var(--top-m)] footer" v-if="taskOpen == 0 && !pageLoading">
            <!-- #ifdef MP-WEIXIN -->
            <top-tabbar :data="param" :scrollBool="topTabarObj.getScrollBool()" class="top-header" />
            <!-- #endif -->
            <mescroll-empty :option="{ 'icon': img('static/resource/images/empty.png'),tip:'任务奖励设置未开启' }"></mescroll-empty>
        </view>
        <loading-page :loading="pageLoading"></loading-page>

    </view>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { img, redirect, moneyFormat, pxToRpx } from '@/utils/common';
import { getTaskList, getTaskConfig } from '@/addon/shop_fenxiao/api/task'
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
import { onPageScroll, onReachBottom, onLoad } from '@dcloudio/uni-app';
import { topTabar } from '@/utils/topTabbar'

const { mescrollInit, getMescroll } = useMescroll(onPageScroll, onReachBottom);
/********* 自定义头部 - start ***********/
const topTabarObj = topTabar()
let param = topTabarObj.setTopTabbarParam({ title: '任务奖励' })

/********* 自定义头部 - end ***********/
// 获取系统状态栏的高度
let menuButtonInfo: any = {};
// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
menuButtonInfo = uni.getMenuButtonBoundingClientRect();
// #endif
/********* 头部样式 - start ***********/
const mescrollTop = computed(() => {
    if (Object.keys(menuButtonInfo).length) {
        // return (pxToRpx(Number(menuButtonInfo.height)) + pxToRpx(menuButtonInfo.top) + pxToRpx(8) + 414)+'rpx'
        return 570 + 18 + 'rpx'
    } else {
        return '414rpx'
    }
})
/********* 头部样式 - end ***********/

/********* 是否开启任务奖励设置 - start ***********/
const taskOpen = ref<any>('');
const pageLoading = ref<boolean>(true)
onLoad(async() => {
    await getTaskConfig().then(res => {
        taskOpen.value = res.data.is_open
        if (taskOpen.value == 0) {
            param = topTabarObj.setTopTabbarParam({
                title: '任务奖励',
                topStatusBar: { textColor: '#333', bgColor: '#fff' }
            })
        }
        pageLoading.value = false
    })
})

/********* 是否开启任务奖励设置  - end ***********/
const loading = ref<boolean>(true);//页面加载动画
const lastLoading = ref<boolean>(true);//页面加载动画
const statusList = ref<Array<any>>([
    { label: '未开始', value: 1 },
    { label: '进行中', value: 2 },
    { label: '已结束', value: 3 },
])
const taskData = reactive({
    data: [],
    searchParam: {
        status: 2,
    }
})

const statusSearchFn = (status: number) => {
    taskData.searchParam.status = status
    taskData.data = [];
    getMescroll().resetUpScroll();
}
const getTaskListFn = (mescroll: any) => {
    lastLoading.value = true;
    getTaskList({
        page: mescroll.num,
        limit: mescroll.size,
        ...taskData.searchParam
    }).then((res: any) => {
        let newArr = res.data.data.map((el: any) => {
            if (el.status === 1) {
                el.time = new Date(el.start_time).getTime() - new Date().getTime()
                el.time = el.time < 0 ? '' : el.time
            } else if (el.status === 2) {
                if (el.time_type != 2) {
                    el.time = new Date(el.end_time).getTime() - new Date().getTime()
                    el.time = el.time < 0 ? '' : el.time
                } else {
                    el.time = ''
                }
            }
            return el
        })
        //设置列表数据
        if (mescroll.num == 1) {
            taskData.data = []; //如果是第一页需手动制空列表
        }
        taskData.data = taskData.data.concat(newArr);
        loading.value = false;
        lastLoading.value = false
        mescroll.endSuccess(newArr.length);
    }).catch(() => {
        loading.value = false;
        lastLoading.value = false
        mescroll.endErr(); // 请求失败, 结束加载
    })
}

const toDetail = (item: any) => {
    redirect({ url: '/addon/shop_fenxiao/pages/task_detail', param: { id: item.id } })
}
</script>
<style lang="scss" scoped>
.background-size {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
}

:deep(.task .u-count-down) {
    display: flex;
    align-items: center;
}

:deep(.task .u-count-down__text) {
    font-size: 20rpx;
    color: #fff;
    line-height: 26rpx;
}

.footer :deep(.mescroll-empty) {
    margin-top: 0 !important;
}
</style>
