<template>
    <view class="bg-[#f8f8f8] min-h-[100vh] giftcard-list" :style="themeColor()">
        <view class="fixed left-0 top-0 right-0 z-10" v-if="categoryLoading">
            <scroll-view :scroll-x="true" class="tab-style-2" scroll-with-animation :scroll-into-view="'id' + cardCategory">
                <view class="tab-content">
                    <view class="tab-items mx-[20rpx]" :class="{ 'class-select': cardCategory === item.category_id }" :id="'id' + index" @click="cardCategoryFn(item.category_id)" v-for="(item, index) in cardCategoryList">{{ item.category_name }}</view>
                </view>
            </scroll-view>
        </view>
        <mescroll-body ref="mescrollRef" top="88rpx" @init="mescrollInit" :down="{ use: false }" @up="getGiftCardPageListFn">
            <view class="sidebar-margin pt-[var(--top-m)] flex justify-between flex-wrap" v-if="list.length">
                <view class="flex flex-col template-item rounded-[var(--goods-rounded-big)] overflow-hidden bg-[#fff] box-border border-[2rpx] border-solid border-[#F8F8F8] mb-[var(--top-m)]"
                    v-for="(item, index) in list" :key="index" @click.stop="toDetail(item)">
                    <image v-if="item.cover" class="w-[100%] h-[210rpx] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img(item.cover? item.cover.split(',')[0] : '')" @error="item.cover= defaultCard(item)" mode="aspectFill" />
                    <image v-else class="w-[100%] h-[210rpx] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img(defaultCard(item))" mode="aspectFill" />
                    <view class="flex justify-between h-[80rpx] items-center px-[var(--pad-sidebar-m)]">
                        <view class="max-w-[250rpx] text-[28rpx] font-400 truncate text-[#303133]">{{ item.card_name }}</view>
                        <text class="text-[30rpx] iconfont" :class="{'iconchuzhikaV6mm text-[#EF000C]':item.card_right_type=='balance','iconduihuankaV6mm-1 text-[#FF7700]':item.card_right_type=='goods'}"></text>
                    </view>
                </view>
            </view>
            <mescroll-empty v-if="!list.length && !loading" :option="{tip : t('cardEmpty'), icon: img('addon/shop_giftcard/empty.png')}"></mescroll-empty>
        </mescroll-body>
        <tabbar />
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { t } from '@/locale'
import { img, redirect } from '@/utils/common'
import { getGiftCardCategoryList } from '@/addon/shop_giftcard/api/category';
import { getGiftCardPageList } from '@/addon/shop_giftcard/api/giftcard';
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
import { onLoad, onShow, onPageScroll, onReachBottom } from '@dcloudio/uni-app';

const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
const list = ref<Array<Object>>([]);
const loading = ref<boolean>(true);
const categoryLoading = ref<boolean>(false);
const cardCategory = ref('')
const cardCategoryList: any = ref([]);

onLoad((option: any) => {
    getGiftCardCategoryListFn();
});

onShow(() => {
    if (getMescroll()) getMescroll().resetUpScroll();
})

const getGiftCardPageListFn = (mescroll: any) => {
    loading.value = true;
    let data: object = {
        page: mescroll.num,
        limit: mescroll.size,
        category_id: cardCategory.value
    };

    getGiftCardPageList(data).then((res: any) => {
        let newArr = (res.data.data as Array<Object>);
        //设置列表数据
        if (mescroll.num == 1) {
            list.value = []; //如果是第一页需手动制空列表
        }
        list.value = list.value.concat(newArr);
        mescroll.endSuccess(newArr.length);
        loading.value = false;
    }).catch(() => {
        loading.value = false;
        mescroll.endErr(); // 请求失败, 结束加载
    })
}

const getGiftCardCategoryListFn = () => {
    categoryLoading.value = false;
    cardCategoryList.value = [];
    let obj = { category_name: '全部', category_id: '' };
    cardCategoryList.value.push(obj);

    getGiftCardCategoryList().then((res: any) => {
        Object.values(res.data).forEach((item, index) => {
            cardCategoryList.value.push(item);
        });
        categoryLoading.value = true;
    }).catch(() => {
        categoryLoading.value = true;
    })
}

const cardCategoryFn = (category_id: any) => {
    cardCategory.value = category_id;
    list.value = [];
    getMescroll().resetUpScroll();
};

const toDetail = (data: any) => {
    redirect({ url: '/addon/shop_giftcard/pages/detail', param: { giftcard_id: data.giftcard_id } })
}
const defaultCard = (data) => {
    let imgUrl = '';
    if (data.card_right_type == 'balance') {
        imgUrl = 'addon/shop_giftcard/diy/index/value_card.jpg';
    } else {
        imgUrl = 'addon/shop_giftcard/diy/index/redemption_card.jpg';
    }
    return imgUrl;
}
</script>
<style lang="scss" scoped>
.tab-style-2 {
    .tab-content {
        justify-content: flex-start;

        .tab-items {
            &:nth-child(1) {
                margin-left: 0;
            }

            &:last-of-type {
                margin-right: 0;
            }
        }
    }
}

.template-item {
    width: calc(50% - 10rpx);
}

:deep(.tab-bar-placeholder) {
    display: none !important;
}

:deep(.u-tabbar__placeholder) {
    display: none !important;
}

/*  #ifdef  H5  */
:deep(.mescroll-body) {
    padding-bottom: calc(50px + constant(safe-area-inset-bottom)) !important;
    padding-bottom: calc(50px + env(safe-area-inset-bottom)) !important;
}

/*  #endif  */
/*  #ifndef  H5  */
:deep(.mescroll-body) {
    padding-bottom: calc(100rpx + constant(safe-area-inset-bottom)) !important;
    padding-bottom: calc(100rpx + env(safe-area-inset-bottom)) !important;
}

/*  #endif  */
// :deep(.mescroll-upwarp) {
// 	display: none;
// }
</style>
