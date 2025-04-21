<template>
    <x-skeleton :type="skeleton.type" :loading="skeleton.loading" :config="skeleton.config">
        <view :style="warpCss">
            <view :style="maskLayer"></view>
            <view class="diy-shop-giftcard-list relative flex flex-wrap justify-between" v-if="giftcardList.length">
                <template v-if="diyComponent.style == 'style-1'">
                    <view class="flex flex-col bg-[#fff] box-border overflow-hidden border-[2rpx] border-solid border-[#F8F8F8]"
                        :class="{'mt-[24rpx]': index > 1}" :style="itemCss" v-for="(item,index) in giftcardList"
                        :key="item.giftcard_id" @click="toLink(item)">
                        <image v-if="item.cover" class="w-[100%] h-[210rpx] overflow-hidden" :src="img(item.cover? item.cover.split(',')[0] : '')" :style="goodsItemCss" @error="item.cover= defaultCard(item)" mode="aspectFill" />
                        <image v-else class="w-[100%] h-[210rpx] overflow-hidden" :style="goodsItemCss" :src="img(defaultCard(item))" mode="aspectFill" />
                        <view class="flex justify-between h-[80rpx] items-center px-[var(--pad-sidebar-m)]">
                            <view class="max-w-[250rpx] text-[28rpx] font-400 truncate text-[#303133]" :style="{ color : diyComponent.cardNameStyle.color, fontWeight : diyComponent.cardNameStyle.fontWeight }">{{ item.card_name }}</view>
							<text :class="['text-[30rpx]','iconfont',{'iconchuzhikaV6mm text-[#EF000C]': item.card_right_type == 'balance','iconduihuankaV6mm-1 text-[#FF7700]': item.card_right_type == 'goods'}]"></text>
                           <!-- <text class="text-[30rpx] iconfont" :class="{'iconchuzhikaV6mm text-[#EF000C]': item.card_right_type == 'balance','iconduihuankaV6mm-1 text-[#FF7700]': item.card_right_type == 'goods'}"></text> -->
                        </view>
                    </view>
                </template>
            </view>
            <view v-else-if="!giftcardList.length" class="empty-page">
                <image class="img" :src="img('static/resource/images/system/empty.png')" model="aspectFit" />
                <view class="desc">暂无礼品卡</view>
            </view>
        </view>
    </x-skeleton>
</template>

<script setup lang="ts">
// 礼品卡列表
import { ref, reactive, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import { redirect, img } from '@/utils/common';
import useDiyStore from '@/app/stores/diy';
import { getGiftCardListByComponents } from '@/addon/shop_giftcard/api/giftcard';

const props = defineProps(['component', 'index', 'value']);
const diyStore = useDiyStore();

const skeleton = reactive({
    type: '',
    loading: diyStore.mode == 'decorate' ? false : true,
    config: {}
})

const giftcardList = ref<Array<any>>([]);

const diyComponent = computed(() => {
    if (props.value) {
        return props.value;
    } else if (diyStore.mode == 'decorate') {
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
    if (diyComponent.value.style == 'style-1') {
        if (diyComponent.value.margin && diyComponent.value.margin.both) style += 'width: calc((100vw - ' + (diyComponent.value.margin.both * 4) + 'rpx - 20rpx) / 2);'
        else style += 'width: calc((100vw - 20rpx) / 2 );'
    }
    return style;
})

const goodsItemCss = computed(() => {
    var style = '';
    if (diyComponent.value.topElementRounded) style += 'border-top-left-radius:' + diyComponent.value.topElementRounded * 2 + 'rpx;';
    if (diyComponent.value.topElementRounded) style += 'border-top-right-radius:' + diyComponent.value.topElementRounded * 2 + 'rpx;';
    if (diyComponent.value.bottomElementRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomElementRounded * 2 + 'rpx;';
    if (diyComponent.value.bottomElementRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomElementRounded * 2 + 'rpx;';
    return style;
})

const style1Width = computed(() => {
    var style = '';
    if (diyComponent.value.margin && diyComponent.value.margin.both) style += 'calc((100vw - ' + (diyComponent.value.margin.both * 4) + 'rpx - 20rpx) / 2)'
    else style += 'calc((100vw - 20rpx) / 2 )'
    return style;
})

const getGiftCardFn = () => {
    let data = {
        num: (diyComponent.value.source == 'all' || diyComponent.value.source == 'category') ? diyComponent.value.num : '',
        giftcard_ids: diyComponent.value.source == 'custom' ? diyComponent.value.giftcard_ids : '',
        category_id: diyComponent.value.source == 'category' ? diyComponent.value.category_id : '',
        order: diyComponent.value.sortWay
    }
    getGiftCardListByComponents(data).then((res: any) => {
        giftcardList.value = res.data;
        skeleton.loading = false;
        if (diyComponent.value.componentBgUrl) {
            setTimeout(() => {
                const query = uni.createSelectorQuery().in(instance);
                query.select('.diy-shop-giftcard-list').boundingClientRect((data: any) => {
                    height.value = data.height;
                }).exec();
            }, 1000)
        }
    });
}

const initSkeleton = () => {
    if (diyComponent.value.style == 'style-1') {

        // 两列 风格
        skeleton.type = 'waterfall'
        skeleton.config = {
            headHeight: '160rpx',
            gridRows: 1,
            textRows: 1,
            textWidth: ['100%']
        };
    }
}

const instance = getCurrentInstance();
const height = ref(0)

onMounted(() => {
    refresh();
    // 装修模式下刷新
    if (diyStore.mode == 'decorate') {
        watch(
            () => diyComponent.value,
            (newValue, oldValue) => {
                if (newValue && newValue.componentName == 'GiftcardList') {
                    nextTick(() => {
                        const query = uni.createSelectorQuery().in(instance);
                        query.select('.diy-shop-giftcard-list').boundingClientRect((data: any) => {
                            height.value = data.height;
                        }).exec();
                    })
                }
            }
        )
    } else {
        watch(
            () => diyComponent.value,
            (newValue, oldValue) => {
                refresh();
            },
            { deep: true }
        )
    }
});

const refresh = () => {
    // 装修模式下设置默认图
    if (diyStore.mode == 'decorate') {
        giftcardList.value.push({
            cover: "addon/shop_giftcard/diy/index/value_card.jpg",
            card_name: "储值卡",
            card_right_type: 'balance'
        });
        giftcardList.value.push({
            cover: "addon/shop_giftcard/diy/index/redemption_card.jpg",
            card_name: "兑换卡",
            card_right_type: 'goods'
        });
    } else {
        initSkeleton();
        getGiftCardFn();
    }

}

const toLink = (data: any) => {
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
</style>
