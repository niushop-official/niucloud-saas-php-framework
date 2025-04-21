<template>
    <view class="bg-white" :style="themeColor()">
        <template v-if="!loading">
            <view class="p-[30rpx]">
                <view class="text-[32rpx] font-500 mb-[16rpx] multi-hidden leading-[1.4]">{{ articleDetail.title }}</view>
                <view class="text-[24rpx] text-[var(--text-color-light9)]">{{ articleDetail.create_time }}</view>
                <!-- <view class="items-center flex mt-[40rpx]">
                  <image class="w-[80rpx] h-[80rpx] mr-[14rpx]" :src="img('addon/shop/payment/position_01.png')" mode="aspectFit" />
                  <view class="flex flex-col mr-[20rpx] w-[540rpx]">
                    <text class="text-[28rpx] truncate text-[#333]">资讯中心</text>
                    <text class="text-[var(--text-color-light9)] truncate text-[24rpx] mt-[16rpx]">资讯中心的简单介绍</text>
                  </view>
                  <text class="!text-[32rpx] text-[var(--text-color-light9)] ml-[auto] nc-iconfont nc-icon-youV6xx"></text>
                </view> -->
                <view class="bg-[var(--temp-bg)] px-[var(--pad-sidebar-m)] py-[var(--pad-sidebar-m)] text-[26rpx] mb-[30rpx] mt-[40rpx] flex items-baseline rounded-[var(--rounded-big)]" v-if="articleDetail.summary">
                    <text class="text-[var(--text-color-light6)] whitespace-pre-wrap">{{ t('abstract') }}：</text>
                    <text class="leading-[1.3] flex-1 text-[#333]">{{ articleDetail.summary }}</text>
                </view>
                <u-parse :content="articleDetail.content" :tagStyle="style"></u-parse>
            </view>
            <!-- 功能暂无，先隐藏 -->
            <!-- <view class="flex justify-center py-[30rpx]">
              <view class="collect w-[150rpx] h-[80rpx] flex flex-col items-center justify-center border-[2rpx] border-solid rounded-[50rpx] mr-[80rpx] border-[#F41941]">
                <image class="w-[30rpx] h-[30rpx]" :src="img('addon/cms/detail/collect.png')" mode="aspectFit" />
                <text class="text-[20rpx] mt-[10rpx] text-[#F41B41]">收藏</text>
              </view>
              <view class="give-like w-[150rpx] h-[80rpx] flex flex-col items-center justify-center border-[2rpx] border-solid border-[#FF5400] rounded-[50rpx]">
                <image class="w-[30rpx] h-[30rpx]" :src="img('addon/cms/detail/give_like.png')" mode="aspectFit" />
                <text class="text-[20rpx] mt-[10rpx] text-[#FF5500]">点赞</text>
              </view>
            </view>
            <view class="flex justify-between pt-[40rpx] pb-[60rpx] px-[22rpx] border-0 border-t-[2rpx] border-solid border-[#f6f6f6]">
              <view class="flex items-center text-[#000]">
                <text class="!text-[30rpx] text-[#333] -mb-[4rpx] nc-iconfont nc-icon-zuoV6xx"></text>
                <text class="text-[26rpx] text-[#333]">上一篇</text>
              </view>
              <view class="flex items-center text-[#000]">
                <text class="text-[26rpx] text-[#333]">下一篇</text>
                <text class="!text-[30rpx] -mb-[4rpx] text-[#333] nc-iconfont nc-icon-youV6xx"></text>
              </view>
            </view> -->
        </template>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { redirect, img, goback } from '@/utils/common'
import { t } from '@/locale'
import { getArticleDetail, visit } from '@/addon/cms/api/article';
import { useShare } from '@/hooks/useShare'

const { setShare } = useShare()

const articleDetail: any = ref<Array<any>>([]);
const loading = ref<boolean>(true);
let style = {
    h2: 'margin-bottom: 15px;',
    p: 'margin-bottom: 10px;line-height: 1.5;word-break: break-all;',
    img: 'margin: 10px 0;vertical-align: top;',
};
onLoad((option: any) => {
    loading.value = true;
    if (!option.id) {
        let parameter = {
            url: '/addon/cms/pages/list',
            title: '缺少文章id'
        };
        goback(parameter)
        return false;
    }
    getArticleDetail(option.id).then((res: any) => {
        articleDetail.value = res.data;
        loading.value = false;
        visitFn( articleDetail.value.id)
        let share = {
            title: articleDetail.value.title,
            desc: articleDetail.value.intro,
            url: articleDetail.value.image
        }
        uni.setNavigationBarTitle({
            title: articleDetail.value.title
        })
        setShare({
            wechat: {
                ...share
            },
            weapp: {
                ...share
            }
        });
    });
})
const  visitFn = (id: number)=>{
    visit(id).then((res) =>{

    })
}
</script>
<style lang="scss" scoped>

</style>
