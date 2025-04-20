<template>
    <view class="bg-[#f8f8f8] min-h-screen overflow-hidden" :style="themeColor()">
        <view class="fixed left-0 right-0 top-0 bg-[#fff] px-[24rpx] py-[10rpx] z-10">
            <view class="bg-[#F6F8F8] rounded-[36rpx] flex items-center pr-[20rpx]">
                <input class=" h-[70rpx] pl-[20rpx] text-sm flex-1  mr-[20px]" type="text" clearable v-model="searchName" :placeholder="t('searchPlaceholder')" @confirm="searchNameFn">
                <text class="nc-iconfont nc-icon-sousuoV6xx  !text-[28rpx] leading-[70px]" @click="searchNameFn"></text>
            </view>
        </view>
        <mescroll-body ref="mescrollRef" top="90rpx" @init="mescrollInit" :down="{ use: false }" @up="getTechnicianListFn">
            <template v-for="(item,index) in technicianList" :key="index">
                <view class="bg-[#fff] mx-3 mt-3  p-3 rounded" @click="toLink(item.id)">
                    <view class="flex">
                        <view class="w-[110rpx] h-[110rpx] flex justify-center">
                            <u-avatar :default-url="img('static/resource/images/default_headimg.png')" :src="img(item.headimg_mid)" shape="circle" size="55" v-if="item.headimg_mid" />
                            <u-avatar :src="img('static/resource/images/default_headimg.png')" size="55" v-else />
                        </view>
                        <view class="flex-1 flex flex-col  justify-between  ml-[20rpx] pb-[15rpx] border-0 border-solid border-b-[2rpx] border-[#ebeef5] ">
                            <view class="flex justify-between items-center">
                                <text class="text-[32rpx] font-600 leading-[34rpx]">{{ item.name }}</text>
                                <text class="text-[22rpx]">{{ item.working_age }}{{ t('year') }}</text>
                            </view>
                            <view class="mt-auto text-[26rpx]">
                                <view class="flex justify-between items-center">
                                    <view class="flex items-center">
                                        <view class="text-[22rpx]">
                                            <text class="iconfont iconxingxing text-[#fca943] !text-[28rpx]"></text>
                                            <text class="ml-[6rpx]">5.0</text>
                                            <text class="ml-[15rpx]">{{ t('service') }}{{ item.order_num }}单</text>
                                        </view>
                                    </view>
                                    <text>{{ item.position_name }}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="flex">
                        <view class="min-w-[110rpx] text-center">
                            <text class="text-[20rpx] bg-[#333333] text-[#a9a089] px-[10rpx] py-[6rpx] rounded-full mt-[10rpx]">{{ item.status == 1 ? t('service') : item.status == -1 ? t('haveLeft') : t('takeBreak') }}</text>
                        </view>
                        <view class="flex flex-1 ml-[20rpx] py-[10rpx] items-center text-[#aaaaaa] leading-[32rpx]">
                            <view class="flex items-center">
                                <text class="nc-iconfont nc-icon-dianxinxiV6xx text-[32rpx]"></text>
                                <text class="text-[22rpx] ml-[5rpx]">5</text>
                            </view>
                            <view class="flex items-center ml-[10rpx]">
                                <text class="nc-iconfont nc-icon-dakaixinxiV6xx text-[30rpx]"></text>
                                <text class="text-[22rpx] ml-[5rpx]">{{ t('detail') }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </template>
            <mescroll-empty :option="{'icon': img('static/resource/images/empty.png'),'tip': t('nothingMore')}"
                            v-if="!technicianList.length && loading"></mescroll-empty>
        </mescroll-body>
        <tabbar />
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { t } from '@/locale'
import { img, redirect } from '@/utils/common';
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app';
import { getTechnicianList } from '@/addon/o2o/api/technician'

const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);

const technicianList = ref<Array<Object>>([]);
const searchName = ref("");
const loading = ref<boolean>(false);
const getTechnicianListFn = (mescroll) => {
    loading.value = false;
    let data: object = {
        page: mescroll.num,
        limit: mescroll.size,
        name: searchName.value
    }
    getTechnicianList(data).then((res) => {
        let newArr = (res.data.data as Array<Object>);
        //设置列表数据
        if (mescroll.num == 1) {
            technicianList.value = []; //如果是第一页需手动制空列表
        }
        technicianList.value = technicianList.value.concat(newArr);
        mescroll.endSuccess(newArr.length);
        loading.value = true;
    }).catch(() => {
        loading.value = true;
        mescroll.endErr(); // 请求失败, 结束加载
    })
}
// 跳转详情页
const toLink = (id: any) => {
    redirect({ url: '/addon/o2o/pages/technician/detail', param: { id } })
}
// 搜索技师
const searchNameFn = () => {
    getMescroll().resetUpScroll()
}
</script>

<style lang="scss" scoped>
:deep(.u-tabbar__placeholder) {
    display: none !important;
}
</style>
