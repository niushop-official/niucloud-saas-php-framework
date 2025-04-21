<template>
    <view class="bg-[var(--page-bg-color)] min-h-[100vh]" :style="themeColor()">
        <view class="fixed top-0 inset-x-0 z-10">
            <view class='px-[30rpx] bg-[#fff] h-[100rpx] flex items-center'>
                <view class="flex-1 search-input">
                    <text @click.stop="searchFn" class="nc-iconfont nc-icon-sousuo-duanV6xx1 btn"></text>
                    <input class="input" maxlength="50" type="text" v-model="articleTitle"
                           :placeholder="t('searchPlaceholder')"
                           placeholderClass="text-[var(--text-color-light9)] text-[24rpx]" confirm-type="search"
                           @confirm="searchFn">
                    <text v-if="articleTitle" class="nc-iconfont nc-icon-cuohaoV6xx1 clear" @click="articleTitle=''"></text>
                </view>
            </view>
            <scroll-view :scroll-x="true" :enable-flex="true" class="tab-style-2 -mt-[14rpx]">
                <view class="tab-content !justify-start scroll-view-wrap">
                    <view
                        class="tab-items text-[28rpx] h-[90rpx] leading-[90rpx]"
                        :class="{'class-select': currCategoryId==item.category_id, ' mr-[50rpx]': index != categoryList.lengt-1}"
                        @click="loadCategory(item.category_id)" v-for="(item,index) in categoryList"
                        :key="item.category_id">
                        {{ item.name }}
                    </view>
                </view>
            </scroll-view>
        </view>

        <mescroll-body ref="mescrollRef" @init="mescrollInit" top="176rpx" :down="{ use: false }" @up="getArticleListFn">
            <view v-for="(item,index) in articleList" :key="item.id"
                  class="flex align-center px-[var(--pad-sidebar-m)] py-[var(--pad-top-m)] bg-[#fff] mx-[var(--sidebar-m)]  my-[var(--top-m)] rounded-[var(--rounded-big)]"
                  @click="toLink(item.id)">
                <u--image width="210rpx" height="160rpx" radius="var(--goods-rounded-big)" class="overflow-hidden" :src="img(item.image)" model="aspectFill">
                    <template #error>
                        <u-icon name="photo" color="#999" size="50"></u-icon>
                    </template>
                </u--image>
                <view class="flex-1 flex flex-col my-[4rpx] ml-[20rpx]">
                    <view class="text-[30rpx] leading-[1.3] multi-hidden">{{ item.title }}</view>
                    <view class="text-[var(--text-color-light9)] text-[24rpx] mt-auto flex items-center justify-between">
                        <text>{{ item.create_time.replace(/\-/g, '.') }}</text>
                        <view class="inline-block">
                            <text class="!text-[24rpx] -mb-[4rpx] iconfont iconyanjing mr-[6rpx]"></text>
                            <text>{{ parseInt(item.visit) + parseInt(item.visit_virtual) }}</text>
                        </view>
                    </view>
                </view>
            </view>
            <mescroll-empty v-if="!articleList.length && loading"></mescroll-empty>
        </mescroll-body>
        <tabbar />
    </view>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { t } from '@/locale'
import { redirect, img } from '@/utils/common';
import { getArticleList, getArticleCategory } from '@/addon/cms/api/article'
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app'

const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
const categoryList = ref<Array<Object>>([]);
const articleList = ref<Array<any>>([]);
const currCategoryId = ref<number | string>('');
const articleTitle = ref<string>('');
const mescrollRef = ref(null);
const loading = ref<boolean>(false);

interface acceptingDataStructure {
    data: acceptingDataItemStructure,
    msg: string,
    code: number
}

interface acceptingDataItemStructure {
    data: object,

    [propName: string]: number | string | object
}

onLoad(async(data) => {
    currCategoryId.value = data.category_id || ''
    await getArticleCategory().then((res: acceptingDataStructure) => {
        const initData = { name: t("all"), category_id: '' };
        categoryList.value.push(initData);
        categoryList.value = categoryList.value.concat(res.data.data);
    });
})

interface mescrollStructure {
    num: number,
    size: number,
    endSuccess: Function,
    [propName: string]: any
}

const getArticleListFn = (mescroll: mescrollStructure) => {
    loading.value = false;
    let data: object = {
        category_id: currCategoryId.value,
        title: articleTitle.value,
        page: mescroll.num,
        limit: mescroll.size
    };

    getArticleList(data).then((res: acceptingDataStructure) => {
        let newArr = (res.data.data as Array<Object>);
        //设置列表数据
        if (mescroll.num == 1) {
            articleList.value = []; //如果是第一页需手动制空列表
        }
        articleList.value = articleList.value.concat(newArr);
        mescroll.endSuccess(newArr.length);
        loading.value = true;
    }).catch(() => {
        loading.value = true;
        mescroll.endErr(); // 请求失败, 结束加载
    })
}

const loadCategory = (id: string) => {
    currCategoryId.value = id;
    getMescroll().resetUpScroll();
}

const searchFn = () => {
    getMescroll().resetUpScroll();
}

const toLink = (id: string) => {
    redirect({ url: '/addon/cms/pages/detail', param: { id } })
}

onMounted(() => {
    setTimeout(() => {
        getMescroll().optUp.textNoMore = t("end");
    }, 500)
});
</script>

<style lang="scss" scoped>
.nav-item {
    position: relative;

    &.active {
        color: $u-primary;
        font-weight: bold;

        &::after {
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 14rpx;
            height: 6rpx;
            width: 30rpx;
            background-color: $u-primary;
            border-radius: 20rpx;
        }
    }
}

.scroll-view-wrap {
    word-break: keep-all;
}
</style>
