<template>
    <view class="bg-[var(--page-bg-color)] min-h-[100vh]" :style="themeColor()">
        <mescroll-body ref="mescrollRef" @init="mescrollInit" @up="getData" :down="{ use: false }">
            <view class="w-[100%] h-[340rpx]" :style="{ backgroundImage: 'url(' + img('addon/shop_fenxiao/fenxiao_goods_bg.png') + ')','background-size': 'cover' }"></view>
            <view class="bg-white flex card-template sidebar-margin rounded-[var(--rounded-big)] overflow-hidden mt-[var(--top-m)]"
                v-for='(item,index) in list' :key="index" :class="{ 'mb-[20rpx]': (index+1) == list.length}" @click="toLink(item)">
                <view class="w-[190rpx] h-[190rpx]">
                    <u--image width="190rpx" height="190rpx" radius="var(--goods-rounded-big)" :src="img(item.goods_cover_thumb_mid ? item.goods_cover_thumb_mid : '')" model="aspectFill">
                        <template #error>
                            <image class="w-[190rpx] h-[190rpx] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img('static/resource/images/diy/shop_default.jpg')" mode="aspectFill" />
                        </template>
                    </u--image>
                </view>
                <view class="flex-1 flex flex-col ml-[20rpx] py-[4rpx]">
                    <view class="text-[28rpx] text-[#333] leading-[40rpx]  multi-hidden mb-[10rpx]">{{ item.goods_name }}</view>
                    <view class="mt-auto flex justify-between items-end">
                        <view class="text-[var(--price-text-color)] price-font max-w-[194rpx] h-[40rpx] truncate">
                            <text class="text-[24rpx] font-500">￥</text>
                            <text class="text-[40rpx] font-500">{{ parseFloat(item.goodsSku.price).toFixed(2).split('.')[0] }}</text>
                            <text class="text-[24rpx] font-500">.{{ parseFloat(item.goodsSku.price).toFixed(2).split('.')[1] }}</text>
                        </view>
                        <view @click.stop="openShareFn(item)" class="text-[24rpx] box-border border-[2rpx] border-solid border-[var(--price-text-color)] px-[16rpx] h-[54rpx] flex-center rounded-[50rpx] text-[var(--price-text-color)]">
                            <text class="nc-iconfont nc-icon-fenxiangV6xx-1 mr-[6rpx] !text-[26rpx]"></text>
                            <text>赚</text>
                            <text class="max-w-[129rpx] truncate">{{ item.commission }}</text>
                            <text>元</text>
                        </view>
                    </view>
                </view>
            </view>
            <mescroll-empty :option="{'icon': img('static/resource/images/empty.png')}" v-if="!list.length && !tableLoading"></mescroll-empty>
        </mescroll-body>
        <share-poster ref="sharePosterRef" posterType="fenxiao_goods" :posterParam="posterParam" :copyUrlParam="copyUrlParam" :copyUrl="copyUrl" @close="closeSharePoster" />

        <!-- #ifdef MP-WEIXIN -->
        <!-- 小程序隐私协议 -->
        <wx-privacy-popup ref="wxPrivacyPopupRef"></wx-privacy-popup>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import { redirect, img } from '@/utils/common';
import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import { ref, computed, reactive, nextTick } from 'vue'
import { t } from '@/locale'
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
import { getFenxiaoGoodsList } from '@/addon/shop_fenxiao/api/fenxiao';
import useMemberStore from '@/stores/member'
import sharePoster from '@/components/share-poster/share-poster.vue'
import { useShare } from '@/hooks/useShare'

const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);

// 会员信息
const memberStore = useMemberStore()
const userInfo = computed(() => memberStore.info)

const list = ref([]);
const tableLoading = ref<boolean>(true);

const wxPrivacyPopupRef: any = ref(null)
const shareType = ref('page') // page：分享页面，goods：分享商品
const { setShare } = useShare()

onLoad(() => {
    // #ifdef MP
    nextTick(() => {
        if (wxPrivacyPopupRef.value) wxPrivacyPopupRef.value.proactive();
    })
    // #endif
})

const getData = (mescroll: any) => {
    let data: object = {
        page: mescroll.num,
        limit: mescroll.size
    };
    tableLoading.value = true;
    getFenxiaoGoodsList(data).then((res: any) => {
        let newArr: any = (res.data.data as Array<Object>);
        //设置列表数据
        if (mescroll.num == 1) {
            list.value = []; //如果是第一页需手动制空列表
        }
        list.value = list.value.concat(newArr);
        tableLoading.value = false;
        mescroll.endSuccess(newArr.length);

        setCurrentShare();
    }).catch(() => {
        tableLoading.value = false;
        mescroll.endErr(); // 请求失败, 结束加载
    })
}

const toLink = (data: any) => {
    redirect({ url: '/addon/shop/pages/goods/detail', param: { goods_id: data.goods_id } })
}

/************* 分享海报-start **************/
const sharePosterRef: any = ref(null);
const copyUrlParam = ref('');
const copyUrl = ref('');
let posterParam: any = {};
// 分享海报链接
const copyUrlFn = (data: any) => {
    copyUrl.value = '/addon/shop/pages/goods/detail';
    copyUrlParam.value = '?goods_id=' + data.goods_id;

    let path = '/addon/shop/pages/goods/detail?goods_id=' + data.goods_id;
    if (userInfo.value && userInfo.value.member_id) {
        copyUrlParam.value += '&mid=' + userInfo.value.member_id;
        path += '&mid=' + userInfo.value.member_id;
    }

    let share = {
        title: data.goods_name,
        path,
        url: data.goods_cover_thumb_mid
    }

    setShare({
        weapp: {
            ...share
        }
    });
}

const openShareFn = (data: any) => {
    posterParam.sku_id = data.goodsSku.sku_id;
    if (userInfo.value && userInfo.value.member_id) {
        posterParam.member_id = userInfo.value.member_id;
    }
    copyUrlFn(data);
    sharePosterRef.value.openShare()
    shareType.value = 'goods'
}

const closeSharePoster = () => {
    shareType.value = 'page'
    setCurrentShare();
}

const setCurrentShare = () => {
    copyUrl.value = '/addon/shop_fenxiao/pages/goods';
    copyUrlParam.value = '';

    let path = '/addon/shop_fenxiao/pages/goods';
    if (userInfo.value && userInfo.value.member_id) {
        copyUrlParam.value += '?mid=' + userInfo.value.member_id;
        path += '?mid=' + userInfo.value.member_id;
    }

    let share = {
        title: '分销商品',
        path
    }

    setShare({
        weapp: {
            ...share
        }
    });
}
/************* 分享海报-end **************/
</script>

<style lang="scss" scoped>
.mescroll-body {
    min-height: calc(100vh - 350rpx) !important;
}
</style>
