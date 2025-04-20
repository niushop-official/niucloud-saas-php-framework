<template>
    <x-skeleton :type="skeleton.type" :loading="skeleton.loading" :config="skeleton.config">
        <view :style="warpCss">
            <view :style="maskLayer"></view>
            <view class="diy-fenxiao-goods-list relative flex flex-wrap justify-between" v-if="goodsList.length">
                <template v-if="diyComponent.style == 'style-1'">
                    <view class="bg-white w-full flex p-[20rpx] mx-[20rpx] overflow-hidden"
                          :class="{ 'mt-[20rpx]': index > -10,'mb-[20rpx]': (index+1) == goodsList.length }"
                          :style="itemCss" v-for="(item,index) in goodsList" :key="item.goods_id" @click="toLink(item)">
                        <u--image :radius="imageRounded.val" class="overflow-hidden" width="190rpx" height="190rpx" :src="img(item.goods_cover_thumb_mid || '')" model="aspectFill">
                            <template #error>
                                <image class="w-[190rpx] h-[190rpx] overflow-hidden" :style="imageRounded.style" :src="img('static/resource/images/diy/shop_default.jpg')" mode="aspectFill"/>
                            </template>
                        </u--image>
                        <view class="flex-1 flex flex-col ml-[20rpx] pt-[6rpx]">
                            <view class="text-[28rpx] leading-[40rpx] text-[#303133] multi-hidden mb-[10rpx]" :style="{ color : diyComponent.goodsNameStyle.color, fontWeight : diyComponent.goodsNameStyle.fontWeight }">{{ item.goods_name }}</view>
                            <view class="text-[var(--price-text-color)] mb-[10rpx] price-font flex items-baseline" v-if="parseFloat(item.commission) && item.fenxiao" :style="{ color : diyComponent.commissionStyle.color }">
                                <text class="text-[24rpx]">推广佣金</text>
                                <text class="text-[24rpx] mx-[4rpx]">￥</text>
                                <text class="text-[26rpx]">{{ parseFloat(item.commission).toFixed(2) }}</text>
                            </view>
                            <view class="mt-auto flex items-center">
                                <view class="price-font inline-block mr-[16rpx]" :style="{ color : diyComponent.priceStyle.mainColor }">
                                    <text class="text-[24rpx] font-500">￥</text>
                                    <text class="text-[40rpx] font-500">{{ parseFloat(item.goodsSku.price).toFixed(2).split('.')[0] }}</text>
                                    <text class="text-[24rpx] font-500">.{{ parseFloat(item.goodsSku.price).toFixed(2).split('.')[1] }}</text>
                                </view>
                                <text v-if="item.fenxiao" @click.stop="openShareFn(item)" class="nc-iconfont nc-icon-fenxiangV6xx-1 leading-0 flex items-center justify-center rounded-full ml-auto w-[48rpx] h-[48rpx] bg-[var(--price-text-color)] text-[#fff]" :style="{ 'background-color' : diyComponent.commissionStyle.color }"></text>
                                <text v-if="!item.fenxiao && diyComponent.is_become_fenxiao == 1"
                                      @click.stop="toFenxiaoLink()"
                                      class="leading-0 flex items-center justify-center rounded-[50rpx] ml-auto w-[150rpx] h-[50rpx] primary-btn-bg text-[22rpx] text-[#fff]"
                                      :style="{ 'background-color' : diyComponent.commissionStyle.color }">成为分销商</text>
                            </view>
                        </view>
                    </view>
                </template>
                <template v-if="diyComponent.style == 'style-2'">
                    <view class="flex flex-col bg-[#fff] box-border overflow-hidden" :class="{'mt-[24rpx]': index > 1}" :style="itemCss" v-for="(item,index) in goodsList" :key="item.goods_id" @click="toLink(item)">
                        <u--image :radius="imageRounded.val" :width="style2Width" :height="style2Width" :src="img(item.goods_cover_thumb_mid || '')" model="aspectFill">
                            <template #error>
                                <image :style="{'width': style2Width,'height': style2Width, 'border-radius': imageRounded.val}" :src="img('static/resource/images/diy/shop_default.jpg')" mode="aspectFill"/>
                            </template>
                        </u--image>
                        <view class="px-[16rpx] flex-1 pt-[16rpx] pb-[20rpx] flex flex-col justify-between">
                            <view class="text-[#333] leading-[40rpx] text-[28rpx] multi-hidden" :style="{ color : diyComponent.goodsNameStyle.color, fontWeight : diyComponent.goodsNameStyle.fontWeight }">{{ item.goods_name }}</view>
                            <view class="text-[24rpx] price-font flex items-baseline mt-[16rpx]" v-if="parseFloat(item.commission) && item.fenxiao" :style="{ color : diyComponent.commissionStyle.color }">
                                <text class="text-[24rpx]">推广佣金</text>
                                <text class="text-[26rpx] mx-[4rpx]">￥</text>
                                <text class="text-[26rpx]">{{ parseFloat(item.commission).toFixed(2) }}</text>
                            </view>
                            <view class="flex justify-between items-center mt-[20rpx]">
                                <view class="text-[var(--price-text-color)] price-font flex items-baseline" :style="{ color : diyComponent.priceStyle.mainColor }">
                                    <text class="text-[24rpx] font-500">￥</text>
                                    <text class="text-[40rpx] font-500">{{ parseFloat(item.goodsSku.price).toFixed(2).split('.')[0] }}</text>
                                    <text class="text-[24rpx] font-500">.{{ parseFloat(item.goodsSku.price).toFixed(2).split('.')[1] }}</text>
                                </view>
                                <text v-if="item.fenxiao" @click.stop="openShareFn(item)"
                                      class="nc-iconfont nc-icon-fenxiangV6xx-1 leading-0 flex items-center justify-center rounded-full ml-auto w-[48rpx] h-[48rpx] bg-[var(--price-text-color)] text-[#fff]"
                                      :style="{ 'background-color' : diyComponent.commissionStyle.color }"></text>
                                <text v-if="!item.fenxiao && diyComponent.is_become_fenxiao == 1" @click.stop="toFenxiaoLink()"
                                      class="leading-0 flex items-center justify-center rounded-[50rpx] ml-auto w-[150rpx] h-[50rpx] primary-btn-bg text-[22rpx] text-[#fff]"
                                      :style="{ 'background-color' : diyComponent.commissionStyle.color }">成为分销商</text>
                            </view>
                        </view>
                    </view>
                </template>
                <template v-if="diyComponent.style == 'style-3'">
                    <view :style="style3Css">
                        <scroll-view :id="'warpStyle3-'+diyComponent.id" class="whitespace-nowrap" :scroll-x="true">
                            <view :id="'item'+index+diyComponent.id"
                                  class="w-[214rpx] inline-block bg-[#fff] box-border overflow-hidden"
                                  :class="{'!mr-[0rpx]' : index === (goodsList.length-1)}" :style="itemCss+itemStyle3"
                                  v-for="(item,index) in goodsList" :key="item.goods_id" @click="toLink(item)">
                                <u--image width="214rpx" height="160rpx" :radius="imageRounded.val" :src="img(item.goods_cover_thumb_mid || '')" model="aspectFill">
                                    <template #error>
                                        <image class="w-[214rpx] h-[160rpx]" :style="imageRounded.style" :src="img('static/resource/images/diy/shop_default.jpg')" mode="aspectFill"/>
                                    </template>
                                </u--image>
                                <view class="px-[10rpx] py-[16rpx]">
                                    <view class="text-[26rpx] text-[#303133] truncate" :style="{ color : diyComponent.goodsNameStyle.color, fontWeight : diyComponent.goodsNameStyle.fontWeight }">{{ item.goods_name }}</view>
                                    <view class="text-[var(--price-text-color)] mt-[16rpx] price-font flex items-baseline ml-[2rpx]" :style="{ color : diyComponent.priceStyle.mainColor }">
                                        <text class="text-[20rpx] font-500">￥</text>
                                        <text class="text-[36rpx] font-500">{{ parseFloat(item.goodsSku.price).toFixed(2) }}</text>
                                    </view>
                                </view>
                            </view>
                        </scroll-view>
                    </view>
                </template>
            </view>
            <view v-else-if="!goodsList.length" class="empty-page">
                <image class="img" :src="img('static/resource/images/system/empty.png')" model="aspectFit" />
                <view class="desc">暂无商品</view>
            </view>
        </view>
        <share-poster ref="sharePosterRef" posterType="fenxiao_goods" :posterParam="posterParam" :copyUrlParam="copyUrlParam" :copyUrl="copyUrl" @close="closeSharePoster" />
    </x-skeleton>
</template>

<script setup lang="ts">
// 分销商品列表
import { ref, reactive, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import { redirect, img } from '@/utils/common';
import useDiyStore from '@/app/stores/diy';
import { getFenxiaoComponents } from '@/addon/shop_fenxiao/api/fenxiao';
import useMemberStore from '@/stores/member'
import sharePoster from '@/components/share-poster/share-poster.vue'
import { useShare } from '@/hooks/useShare'

const props = defineProps(['component', 'index', 'value']);
const diyStore = useDiyStore()

// 会员信息
const memberStore = useMemberStore()
const userInfo = computed(() => memberStore.info)

const skeleton = reactive({
    type: '',
    loading: diyStore.mode == 'decorate' ? false : true,
    config: {}
})

const goodsList = ref<Array<any>>([]);

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

const imageRounded = computed(() => {
    var obj = {
        val: '',
        style: ''
    };
    if (diyComponent.value.imgElementRounded) {
        obj.val = diyComponent.value.imgElementRounded * 2 + 'rpx';
        obj.style += 'border-radius:' + diyComponent.value.imgElementRounded * 2 + 'rpx;';
    }
    return obj;
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
    if (diyComponent.value.style == 'style-2') {
        if (diyComponent.value.margin && diyComponent.value.margin.both) style += 'width: calc((100vw - ' + (diyComponent.value.margin.both * 4) + 'rpx - 20rpx) / 2);'
        else style += 'width: calc((100vw - 20rpx) / 2 );'
    }
    return style;
})

const style2Width = computed(() => {
    var style = '';
    if (diyComponent.value.margin && diyComponent.value.margin.both) style += 'calc((100vw - ' + (diyComponent.value.margin.both * 4) + 'rpx - 20rpx) / 2)'
    else style += 'calc((100vw - 20rpx) / 2 )'
    return style;
})

const style3Css = computed(() => {
    var style = '';
    style += 'padding:0 20rpx;';
    if (diyComponent.value.margin && diyComponent.value.margin.both) {
        style += 'width: calc( 100vw - ' + ((diyComponent.value.margin.both * 4) + 40) + 'rpx);'
    } else {
        style += 'box-sizing: border-box; width: 100vw;';
    }
    return style;
})

//商品样式三
const itemStyle3 = ref('');
const setItemStyle3 = () => {
    // #ifdef  MP-WEIXIN
    uni.createSelectorQuery().in(instance).select('#warpStyle3-' + diyComponent.value.id).boundingClientRect((res: any) => {
        uni.createSelectorQuery().in(instance).select('#item0' + diyComponent.value.id).boundingClientRect((data: any) => {
            itemStyle3.value = `margin-right:${ (res.width - data.width * 3) / 2 }px;`
        }).exec()
    }).exec()
    // #endif
    // #ifdef  H5
    itemStyle3.value = 'margin-right:14rpx;'
    // #endif
}

const getGoodsListFn = () => {
    let data = {
        num: (diyComponent.value.source == 'all' || diyComponent.value.source == 'category') ? diyComponent.value.num : '',
        goods_category: diyComponent.value.source == 'category' ? diyComponent.value.goods_category : '',
        order: diyComponent.value.sortWay
    }
    getFenxiaoComponents(data).then((res: any) => {
        goodsList.value = res.data;
        skeleton.loading = false;
        setCurrentShare();
        if (diyComponent.value.componentBgUrl) {
            setTimeout(() => {
                const query = uni.createSelectorQuery().in(instance);
                query.select('.diy-fenxiao-goods-list').boundingClientRect((data: any) => {
                    height.value = data.height;
                }).exec();
            }, 1000)
        }
        nextTick(() => {
            setTimeout(() => {
                if (diyComponent.value.style == 'style-3') setItemStyle3()
            }, 500)
        })
    });
}

const initSkeleton = () => {
    if (diyComponent.value.style == 'style-1') {

        // 单列 风格
        skeleton.type = 'list'
        skeleton.type = 'list'
        skeleton.config = {
            textRows: 2
        };
    } else if (diyComponent.value.style == 'style-2') {

        // 两列 风格
        skeleton.type = 'waterfall'
        skeleton.config = {
            headHeight: '320rpx',
            gridRows: 1,
            textRows: 2,
            textWidth: ['100%', '80%']
        };
    } else if (diyComponent.value.style == 'style-3') {

        // 横向滑动 风格
        skeleton.type = 'waterfall'
        skeleton.config = {
            gridRows: 1,
            gridColumns: 3,
            headHeight: '200rpx',
            textRows: 2,
            textWidth: ['100%', '80%']
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
                if (newValue && newValue.componentName == 'FenxiaoGoodsList') {
                    nextTick(() => {
                        const query = uni.createSelectorQuery().in(instance);
                        query.select('.diy-fenxiao-goods-list').boundingClientRect((data: any) => {
                            height.value = data.height;
                        }).exec();
                        if (diyComponent.value.style == 'style-3') setItemStyle3()
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
        let obj = {
            goods_cover_thumb_mid: "",
            goods_name: "商品名称",
            sale_num: "100",
            commission: "10",
            unit: "件",
            fenxiaoGoods: {},
            goodsSku: { price: 100 }
        };
        goodsList.value.push(obj);
        goodsList.value.push(obj);
        nextTick(() => {
            if (diyComponent.value.style == 'style-3') setItemStyle3()
        })
    } else {
        initSkeleton();
        getGoodsListFn();
    }
}

const toLink = (data: any) => {
    redirect({ url: '/addon/shop/pages/goods/detail', param: { goods_id: data.goods_id } })
}

const toFenxiaoLink = () => {
    redirect({ url: '/addon/shop_fenxiao/pages/index' })
}

const shareType = ref('page') // page：分享页面，goods：分享商品
const { setShare } = useShare()

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
    copyUrl.value = '/addon/shop_fenxiao/pages/zone';
    copyUrlParam.value = '';

    let path = '/addon/shop_fenxiao/pages/zone';
    if (userInfo.value && userInfo.value.member_id) {
        copyUrlParam.value += '?mid=' + userInfo.value.member_id;
        path += '?mid=' + userInfo.value.member_id;
    }

    let share = {
        title: '分销专区',
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
</style>
