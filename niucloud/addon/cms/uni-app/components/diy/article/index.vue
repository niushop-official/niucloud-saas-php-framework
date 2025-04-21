<template>
    <view :style="warpCss">
        <view :style="maskLayer"></view>
        <view class="diy-active relative">
            <view v-for="(item,index) in articleList" :key="item.id"
                class="item flex align-center px-[var(--pad-sidebar-m)] py-[var(--pad-top-m)]" @click="toLink(item.id)"
                :style="itemCss">
                <view class="w-[260rpx] h-[210rpx] rounded-[var(--goods-rounded-big)] overflow-hidden">
                    <u--image width="260rpx" height="210rpx" :radius="'var(--goods-rounded-big)'" :src="img(item.image)"
                        v-if="item.image" model="aspectFill">
                        <template #error>
                            <u-icon name="photo" color="var(--text-color-light9)" size="50"></u-icon>
                        </template>
                    </u--image>
                </view>
                <view class="flex-1 flex flex-col justify-between ml-[20rpx] py-[4rpx]">
                    <view class="text-[28rpx] leading-[36rpx] text-[#333] multi-hidden"
                        :style="{ color: diyComponent.textColor }">{{ item.title }}</view>
                    <view class="text-[24rpx] truncate mb-[auto] mt-[14rpx] text-[#999]"
                        style="width: calc(750rpx - 260rpx - var(--pad-sidebar-m) - var(--pad-sidebar-m));">{{
                        item.summary }}</view>
                    <view class="text-[22rpx] text-[#999] flex items-center mt-[10rpx]">
                        <text
                            class="nc-iconfont nc-icon-a-shijianV6xx-36 mr-[6rpx] font-500 -mb-[4rpx] !text-[20rpx]"></text>
                        <text>{{ item.create_time }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
// 文章
import { ref, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import { redirect, img } from '@/utils/common';
import useDiyStore from '@/app/stores/diy';
import { getArticleAll } from '@/addon/cms/api/article';

const props = defineProps(['component', 'index']);
const diyStore = useDiyStore();
const articleList = ref<Array<any>>([]);

const diyComponent = computed(() => {
    if (diyStore.mode == 'decorate') {
        return diyStore.value[props.index];
    } else {
        return props.component;
    }
})

const warpCss = computed(() => {
    var style = '';
    style += 'position:relative;';
    if (diyComponent.value.componentStartBgColor) {
        if (diyComponent.value.componentStartBgColor && diyComponent.value.componentEndBgColor) style += `background:linear-gradient(${ diyComponent.value.componentGradientAngle },${ diyComponent.value.componentStartBgColor },${ diyComponent.value.componentEndBgColor });`;
        else style += 'background-color:' + diyComponent.value.componentStartBgColor + ';';
    }

    if (diyComponent.value.componentBgUrl) {
        style += `background-image:url('${ img(diyComponent.value.componentBgUrl) }');`;
        style += 'background-size: cover;background-repeat: no-repeat;';
    }

    if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
    if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
    if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
    if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
    return style;
})

// 背景图加遮罩层
const maskLayer = computed(() => {
    var style = '';
    if (diyComponent.value.componentBgUrl) {
        style += 'position:absolute;top:0;width:100%;';
        style += `background: rgba(0,0,0,${ diyComponent.value.componentBgAlpha / 10 });`;
        style += `height:${ height.value }px;`;

        if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
        if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
        if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
        if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
    }

    return style;
});

const itemCss = computed(() => {
    var style = '';
    if (diyComponent.value.elementBgColor) style += 'background-color:' + diyComponent.value.elementBgColor + ';';
    if (diyComponent.value.topElementRounded) style += 'border-top-left-radius:' + diyComponent.value.topElementRounded * 2 + 'rpx;';
    if (diyComponent.value.topElementRounded) style += 'border-top-right-radius:' + diyComponent.value.topElementRounded * 2 + 'rpx;';
    if (diyComponent.value.bottomElementRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomElementRounded * 2 + 'rpx;';
    if (diyComponent.value.bottomElementRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomElementRounded * 2 + 'rpx;';
    return style;
})

const getArticleListFn = () => {
    interface dataStructure {
        ids?: Array<number>,
        limit?: number
    }

    let data: dataStructure = {};

    if (diyComponent.value.sources == "diy")
        data.ids = diyComponent.value.articleIds;
    else
        data.limit = diyComponent.value.count;

    interface takeDataStructure {
        data: Array<Object>,
        msg: string,
        code: number
    }

    getArticleAll(data).then((res: takeDataStructure) => {
        articleList.value = res.data;

        // 数据为空时隐藏整个组件
        // if(articleList.value.length == 0) {
        // 	diyComponent.value.pageStyle = '';
        // }
    });
}

onMounted(() => {
    refresh();
    // 装修模式下刷新
    if (diyStore.mode == 'decorate') {
        let obj = {
            image: "",
            summary: "文章摘要",
            title: "文章标题",
            create_time: "2023-03-28 09:00:00"
        };
        articleList.value.push(obj);
        articleList.value.push(obj);
        watch(
            () => diyComponent.value,
            (newValue, oldValue) => {
                if (newValue && newValue.componentName == 'Active') {
                    refresh();
                }
            }
        )
    } else {
        getArticleListFn();
    }
});

const instance = getCurrentInstance();
const height = ref(0)

const refresh = () => {
    nextTick(() => {
        const query = uni.createSelectorQuery().in(instance);
        query.select('.diy-active').boundingClientRect((data: any) => {
            height.value = data.height;
        }).exec();
    })
}

const toLink = (id: string) => {
    redirect({ url: '/addon/cms/pages/detail', param: { id } })
}
</script>

<style lang="scss" scoped>
</style>
