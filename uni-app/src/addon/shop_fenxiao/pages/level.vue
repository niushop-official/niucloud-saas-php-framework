<template>
    <view :style="themeColor()">
        <view class="bg-[var(--page-bg-color)] min-h-[100vh]" v-if="!loading">

            <view class="text-[#fff] w-full" :style="headerStyle">
                <!-- #ifdef MP-WEIXIN -->
                <top-tabbar :data="param" :scrollBool="topTabarObj.getScrollBool()" class="top-header" />
                <!-- #endif -->

                <view class="pt-[40rpx]  flex items-center relative z-[20] mx-[30rpx] mb-[36rpx]">
                    <image class="w-[90rpx] h-[90rpx] rounded-[50%]" v-if="detail.member.headimg" :src="img(detail.member.headimg)" mode="aspectFill" />
                    <image class="w-[90rpx] h-[90rpx] rounded-[50%]" v-else :src="img('addon/shop_fenxiao/index/head.png')" mode="aspectFill" />
                    <text class="ml-[20rpx] text-[30rpx] truncate w-[300rpx] text-[#333] font-500 leading-[1.2]">{{ detail.member.nickname }}</text>
                </view>

                <view class="relative level-content sidebar-margin">
                    <view class="flex items-center ml-[10rpx]">
                        <view class="flex items-baseline mr-[10rpx]">
                            <image class="w-[30rpx] h-[24rpx]" :src="img('addon/shop_fenxiao/level/level_key.png')" mode="widthFix" />
                            <text class="text-[#333] font-500 text-[24rpx] -ml-[7rpx]">{{ currIndex + 1 }}</text>
                        </view>
                        <text class="ml-[6rpx] mr-[10rpx] text-[#333] font-500 text-[30rpx] truncate max-w-[200rpx]">{{ currLevel.level_name }}</text>
                        <text class="rounded-[50rpx] h-[36rpx] flex-center px-[16rpx] text-[20rpx] text-[#F7D6A7] bg-[#38311F]">已解锁</text>
                        <image class="w-[230rpx] h-[200rpx] right-[40rpx] -top-[130rpx] absolute" :src="img('addon/shop_fenxiao/level/level_icon.png')" mode="aspectFill" />
                    </view>

                    <view v-if="levelList[currIndex+1]" class="text-[var(--text-color-light9)] mt-[20rpx] flex items-center ml-[10rpx]">
                        <text class="text-[var(--text-color-light9)] text-[24rpx]">{{ levelList[currIndex + 1].upgrade_type == 1 ? t('arbitraryCondition') : t('allConditions') }}{{ t('upgradable') }}</text>
                        <text class="text-[var(--text-color-light9)] text-[24rpx]">为{{ levelList[currIndex + 1].level_name }}</text>
                        <view class="flex items-center text-[24rpx] ml-[16rpx] price-font">
                            <text class="text-[#CD6C00]">{{ levelInfo.complete > levelInfo.task_num ? levelInfo.task_num : levelInfo.complete }}</text>
                            <text class="text-[var(--text-color-light9)]">/{{ levelInfo.task_num }}</text>
                        </view>
                    </view>

                    <view class="flex my-[50rpx] ml-[10rpx]">
                        <view class="flex-1 text-left" v-if="config.fenxiao_config && config.fenxiao_config.level >= 1">
                            <view class="text-[var(--text-color-light9)] text-[24rpx]">一级分佣比率</view>
                            <view class="mt-[16rpx] price-font font-500 text-[#D97E1D] text-[36rpx]">
                                {{ currLevel.one_rate }}
                                <text class="text-[24rpx] ml-[4rpx]">%</text>
                            </view>
                        </view>
                        <view class="flex-1 text-left" v-if="config.fenxiao_config && config.fenxiao_config.level >= 2">
                            <view class="text-[var(--text-color-light9)] text-[24rpx]">二级分佣比率</view>
                            <view class="mt-[16rpx] price-font font-500 text-[#D97E1D] text-[36rpx]">
                                {{ currLevel.two_rate }}
                                <text class="text-[24rpx] ml-[4rpx]">%</text>
                            </view>
                        </view>
                        <view class="flex-1 text-left" v-if="config.team_config && config.team_config.is_open == 1">
                            <view class="text-[var(--text-color-light9)] text-[24rpx]">团队分佣比率</view>
                            <view class="mt-[16rpx] price-font font-500 text-[#D97E1D] text-[36rpx]">
                                {{ currLevel.team_rate }}
                                <text class="text-[24rpx] ml-[4rpx]">%</text>
                            </view>
                        </view>
                    </view>

                    <scroll-view scroll-y="true" class="flex flex-col upgrade-content bg-[#fff] rounded-[var(--rounded-mid)] px-[20rpx] py-[30rpx] box-border" v-if="levelInfo && levelInfo.task">
                        <view class="flex items-center justify-between" :class="{'pb-[40rpx]': (index != levelInfo.task.length-1)}" v-for="(item, index) in levelInfo.task" :key="index">
                            <view class="flex flex-col flex-1">
                                <text class="text-[28rpx] text-[#333] font-500">{{ item.title }}</text>
                                <view class="mt-[10rpx] mb-[12rpx] rounded-[12rpx] overflow-hidden">
                                    <progress :percent="item.progress" activeColor="#D97E1D" backgroundColor="#FAF0E5" stroke-width="4" />
                                </view>
                                <view class="flex items-center justify-between min-h-[34rpx]">
                                    <text class="text-[22rpx] text-[var(--text-color-light9)] price-font">{{ item.desc }}</text>
                                    <view class="flex items-center text-[28rpx] price-font">
                                        <text class="text-[#D97E1D]">{{ Number(item.value) }}</text>
                                        <text class="text-[#bbb]">/{{ Number(item.condition) }}</text>
                                    </view>
                                </view>
                            </view>
                            <text class="rounded-[50rpx] ml-[30rpx] w-[130rpx] h-[60rpx] flex-center text-[24rpx] text-[#F7D6A7] bg-[#38311F]">去邀请</text>
                        </view>
                    </scroll-view>
                </view>
            </view>
            <ns-goods-recommend></ns-goods-recommend>

        </view>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { img, moneyFormat } from '@/utils/common';
import { ref, computed } from 'vue'
import { t } from '@/locale'
import { getLevelList } from '@/addon/shop_fenxiao/api/level';
import { getFenxiaoDetail, getConfig } from '@/addon/shop_fenxiao/api/fenxiao';
import { onShow } from '@dcloudio/uni-app'
import { topTabar } from '@/utils/topTabbar'
import nsGoodsRecommend from '@/addon/shop/components/ns-goods-recommend/ns-goods-recommend.vue';

/********* 自定义头部 - start ***********/
const topTabarObj = topTabar()
let param = topTabarObj.setTopTabbarParam({ title: '分销商等级', topStatusBar: { textColor: '#333' } })
/********* 自定义头部 - end ***********/

const headerStyle = computed(() => {
    return {
        backgroundImage: 'url(' + img('addon/shop_fenxiao/level/level_top_bg.png') + ') ',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
    }
})

onShow(() => {
    getFenxiaoDetailFn();
    getConfigFn();
});

const loading = ref<boolean>(true);
const levelList = ref([]);
const currLevel = ref({});
// 等级列表
const getLevelListFn = () => {
    getLevelList().then((res: any) => {
        levelList.value = res.data;
        levelList.value.forEach((item, index) => {
            if (item.level_id == detail.value.level_id) {
                currIndex.value = index;
                currLevel.value = item;
            }
        })
        loading.value = false;
    });
}

// 分销系统设置
const config = ref({});
const getConfigFn = () => {
    getConfig().then((res: any) => {
        config.value = res.data;
    });
}

const detail: any = ref({});
const currIndex = ref(0);

// 分销详情
const getFenxiaoDetailFn = () => {
    getFenxiaoDetail().then((res: any) => {
        detail.value = res.data;
        getLevelListFn();
    });
}

const levelInfo = computed(() => {
    if (levelList.value.length && levelList.value[currIndex.value + 1]) {
        let level: any = levelList.value[currIndex.value + 1];
        level.task = [];
        level.complete = 0;

        if (level.fenxiao_order_num > 0) {
            let task = {
                title: '订单总数',
                desc: '一级分销订单总数满' + level.fenxiao_order_num + '个',
                condition: level.fenxiao_order_num,
                value: detail.value.fenxiao_order_num,
                progress: parseFloat(detail.value.fenxiao_order_num) > parseFloat(level.fenxiao_order_num) ? 100 : (parseFloat(detail.value.fenxiao_order_num) / parseFloat(level.fenxiao_order_num) * 100).toFixed(2)
            }
            if (task.progress == 100) level.complete += 1;
            level.task.push(task);
        }
        if (level.fenxiao_commission > 0) {
            let task = {
                title: '佣金总额',
                desc: '一级分销订单佣金总额满' + moneyFormat(level.fenxiao_commission) + '元',
                condition: moneyFormat(level.fenxiao_commission),
                value: moneyFormat(detail.value.fenxiao_commission),
                progress: parseFloat(detail.value.fenxiao_commission) > parseFloat(level.fenxiao_commission) ? 100 : (parseFloat(detail.value.fenxiao_commission) / parseFloat(level.fenxiao_commission) * 100).toFixed(2)
            }
            if (task.progress == 100) level.complete += 1;
            level.task.push(task);
        }
        if (level.fenxiao_order_money > 0) {
            let task = {
                title: '订单总额',
                desc: '分销订单总额满' + moneyFormat(level.fenxiao_order_money) + '元',
                condition: moneyFormat(level.fenxiao_order_money),
                value: moneyFormat(detail.value.fenxiao_total_order),
                progress: parseFloat(detail.value.fenxiao_total_order) > parseFloat(level.fenxiao_order_money) ? 100 : (parseFloat(detail.value.fenxiao_total_order) / parseFloat(level.fenxiao_order_money) * 100).toFixed(2)
            }
            if (task.progress == 100) level.complete += 1;
            level.task.push(task);
        }
        if (level.order_num > 0) {
            let task = {
                title: '自购订单总数',
                desc: '自购订单总数满' + level.order_num + '个',
                condition: level.order_num,
                value: detail.value.add_up_data.order_num,
                progress: parseFloat(detail.value.add_up_data.order_num) > parseFloat(level.order_num) ? 100 : (parseFloat(detail.value.add_up_data.order_num) / parseFloat(level.order_num) * 100).toFixed(2)
            }
            if (task.progress == 100) level.complete += 1;
            level.task.push(task);
        }
        if (level.order_money > 0) {
            let task = {
                title: '自购订单总额',
                desc: '自购订单总额满' + moneyFormat(level.order_money) + '元',
                condition: moneyFormat(level.order_money),
                value: moneyFormat(detail.value.add_up_data.order_sum),
                progress: parseFloat(detail.value.add_up_data.order_sum) > parseFloat(level.order_money) ? 100 : (parseFloat(detail.value.add_up_data.order_sum) / parseFloat(level.order_money) * 100).toFixed(2)
            }
            if (task.progress == 100) level.complete += 1;
            level.task.push(task);
        }
        if (level.child_num > 0) {
            let task = {
                title: '下线人数',
                desc: '下线人数达到' + level.child_num + '人',
                condition: level.child_num,
                value: detail.value.add_up_data.child_count,
                progress: parseFloat(detail.value.add_up_data.child_count) > parseFloat(level.child_num) ? 100 : (parseFloat(detail.value.add_up_data.child_count) / parseFloat(level.child_num) * 100).toFixed(2)
            }
            if (task.progress == 100) level.complete += 1;
            level.task.push(task);
        }
        if (level.child_fenxiao_num > 0) {
            let task = {
                title: '下线分销商',
                desc: '下线分销商人数达到' + level.child_fenxiao_num + '人',
                condition: level.child_fenxiao_num,
                value: detail.value.add_up_data.child_fenxiao_count,
                progress: parseFloat(detail.value.add_up_data.child_fenxiao_count) > parseFloat(level.child_fenxiao_num) ? 100 : (parseFloat(detail.value.add_up_data.child_fenxiao_count) / parseFloat(level.child_fenxiao_num) * 100).toFixed(2)
            }
            if (task.progress == 100) level.complete += 1;
            level.task.push(task);
        }
        level.task_num = level.upgrade_type == 1 ? 1 : level.task.length;
        return level;
    }
})
</script>

<style lang="scss" scoped>
.level-item-width {
    width: calc(100% - 30px);
    margin: 0 13px;
}

.level-wrap {
    transition: all .5s;
    display: flex;
    flex-direction: column;
    padding: 30rpx 40rpx;
    box-sizing: border-box;
    position: relative;
}

.level-card-one {
    background: linear-gradient(90deg, #FFB266, #FFD399);
}

.upgrade-content {
    max-height: calc(100vh - 320px);
}

.level-content {
    padding: var(--pad-top-m) var(--pad-sidebar-m);
    border: 2rpx solid #FFB948;
    border-radius: var(--rounded-big);
    background: linear-gradient(49deg, #FFF2DD 0%, #FEF9F0 49%, #FFF2DD 100%), linear-gradient(90deg, #FDF4E6 0%, #FFF9EF 50%, #FDF4E6 100%), linear-gradient(90deg, #FFE5BF 0%, #FDF2E4 50%, #FFE5BF 100%);
}
</style>
