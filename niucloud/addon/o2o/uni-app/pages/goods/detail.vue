<template>
    <view :style="themeColor()">
        <view class="bg-[#f7f7f7] min-h-screen overflow-hidden" v-if="!loading">
            <u-swiper :list="detail.goods.goods_image_thumb_mid" :autoplay="false" height="100vw" radius="0" @click="swiperClick"></u-swiper>
            <view class="px-[24rpx]">
                <view class="chunk-wrap pt-2 pb-3 rounded-lg relative mt-[14rpx]">
                    <view class="font-bold multi-hidden">{{ detail.goods.goods_name }}</view>
                    <view class="flex items-center justify-between mt-2 ">
                        <view class="flex items-center">
                            <view class="text-[var(--price-text-color)] text-[28rpx] font-bold flex items-center">
                                <text class="text-[28rpx] price-font">￥</text>
                                <text class="price-font text-[28rpx]">{{ goodsPrice }}</text>
                                <text v-if="detail.sku_unit">/{{ detail.sku_unit }}</text>
                                <image v-if="priceType == 'member_price'" class="h-[28rpx] ml-[12rpx] w-[60rpx]" :src="img('addon/o2o/VIP.png')" mode="heightFix" />
                            </view>
                            <view class="text-[24rpx] flex ml-[20rpx]">
                                <text class="text-[var(--primary-color)] rounded-[6rpx] py-[6rpx] bg-[var(--primary-color-light)] px-[10rpx]">{{ detail.goods.buy_type_name }}</text>
                            </view>
                        </view>
                        <view class="text-[20rpx]">{{ detail.goods.sale_num }}{{ t('selectNum') }}</view>
                    </view>
                </view>
                <view @click="buyFn" v-if="detail.skuList && detail.skuList.length>1" class="flex items-center h-[88rpx] px-[20rpx] bg-[#fff] rounded-lg mb-[20rpx]">
                    <text class="text-[var(--text-color-light9)] text-[30rpx] leading-[42rpx] font-500 mr-[20rpx]">{{ t('selected') }}</text>
                    <view class="flex-1 text-[#343434] text-sm leading-[42rpx] font-500">{{ detail.sku_name }}</view>
                    <text class="nc-iconfont nc-icon-youV6xx text-[26rpx] text-[var(--text-color-light6)]"></text>
                </view>
                <view class="chunk-wrap pt-[34rpx] pb-[24rpx] scheduling rounded-lg">
                    <view class="flex items-center">
                        <text :class="['text-[30rpx] text-center leading-[80rpx] flex-1 text-[var(--text-color-light6)]',{'class-select': goodsState == 'goods_content'}]" @click="changeGoodStatus('goods_content')">项目介绍</text>
                        <text :class="['text-[30rpx] text-center leading-[80rpx] flex-1 text-[var(--text-color-light6)]',{'class-select': goodsState == 'buy_info'}]" @click="changeGoodStatus('buy_info')">购买须知</text>
                        <text :class="['text-[30rpx] text-center leading-[80rpx] flex-1 text-[var(--text-color-light6)]',{'class-select': goodsState == 'price_list'}]" @click="changeGoodStatus('price_list')" v-if="detail.goods.buy_type == 'reservation'">价目表</text>
                    </view>
                    <view class="mt-[24rpx]">
                        <view class="scheduling-content mt-2" v-if="goodsState == 'goods_content'">
                            <u-parse :content="detail.goods.goods_content" :tagStyle="{img: 'vertical-align: top;'}" v-if="detail.goods.goods_content"></u-parse>
                            <view v-else class="h-[380rpx] flex">
                                <view class="mx-auto">
                                    <image class="w-[280rpx] h-[280rpx]" :src="img('addon/o2o/goods/empty01.png')" />
                                    <view class="text-center text-[#c1c1c1] text-[24rpx]">{{ t('noProjectInt') }}</view>
                                </view>
                            </view>
                        </view>
                        <view class="scheduling-content mt-2" v-if="goodsState == 'buy_info'">
                            <u-parse :content="detail.goods.buy_info" :tagStyle="{img: 'vertical-align: top;'}" v-if="detail.goods.buy_info"></u-parse>
                            <view v-else class="h-[380rpx] flex">
                                <view class="mx-auto">
                                    <image class="w-[280rpx] h-[280rpx]" :src="img('addon/o2o/goods/empty01.png')" />
                                    <view class="text-center text-[#c1c1c1] text-[24rpx]">{{ t('noPurchase') }}</view>
                                </view>
                            </view>
                        </view>
                        <view class="scheduling-content mt-2" v-if="goodsState == 'price_list'">
                            <view v-if="detail.goods.price_list && detail.goods.price_list.length">
                                <uni-table border stripe :emptyText="t('noMore')">
                                    <uni-tr>
                                        <uni-th width="80" align="center">{{ t('projectName') }}</uni-th>
                                        <uni-th width="50" align="center">{{ t('price') }}</uni-th>
                                        <uni-th width="50" align="center">{{ t('unit') }}</uni-th>
                                    </uni-tr>
                                    <uni-tr v-for="(item, index) in detail.goods.price_list" :key="index">
                                        <uni-td align="center">{{ item.name }}</uni-td>
                                        <uni-td align="center">
                                            <view class="name">{{ item.price }}</view>
                                        </uni-td>
                                        <uni-td align="center">{{ item.unit }}</uni-td>
                                    </uni-tr>
                                </uni-table>
                            </view>
                            <view v-else class="h-[380rpx] flex">
                                <view class="mx-auto">
                                    <image class="w-[280rpx] h-[280rpx]" :src="img('addon/o2o/goods/empty01.png')" />
                                    <view class="text-center text-[#c1c1c1] text-[24rpx]">{{ t('noPriceList') }}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="h-[148rpx] w-screen"></view>
                <view class="flex justify-between bg-white px-3 py-2 fixed bottom-0 left-0 right-0">
                    <view class="flex items-center">
                        <view class="flex flex-col items-center mr-[44rpx]" @click="redirect({ url: '/addon/o2o/pages/index', mode: 'reLaunch' })">
                            <image class="w-[43rpx] h-[43rpx] " :src="img('addon/o2o/service/index.png')" mode="aspectFill"/>
                            <text class="text-[24rpx] text-[#454545] mt-1.5">{{ t('index') }}</text>
                        </view>
                        <view class="flex flex-col items-center mr-[44rpx]" @click="openShareFn">
                            <view class="nc-iconfont nc-icon-fenxiangV6xx text-[36rpx] mt-[4rpx] mb-[6rpx] font-bold"></view>
                            <text class="text-[24rpx] text-[#454545] mt-1">{{ t('share') }}</text>
                        </view>

                        <view class="flex flex-col items-center mr-[44rpx]">
                            <image class="w-[44rpx] h-[44rpx]" :src="img('addon/o2o/service/service.png')" mode="aspectFill"/>
                            <text class="text-[24rpx] text-[#454545] mt-1">{{ t('service') }}</text>
                        </view>
                        <!-- <view class="flex flex-col items-center mr-[44rpx]" @click="collect(detail)">
                        <image class="w-[44rpx] h-[44rpx]" v-if="collect_id > 0" :src="img('static/resource/images/member/select_collect.png')" mode="aspectFill" />
                        <image class="w-[44rpx] h-[44rpx]" v-else :src="img('static/resource/images/member/collect.png')" mode="aspectFill" />
                        <text class="text-[24rpx] text-[#454545] mt-1">收藏</text>
                    </view> -->
                    </view>
                    <u-button :customStyle="{ marginLeft:'8rpx', borderRadius:'38rpx',flex: '1'}"
                              :color="detail.goods.status ? 'var( --primary-color)' :'#999'" size="16"
                              :text="detail.goods.status ? (detail.goods.buy_type == 'reservation' ? t('bookNow') : t('orderNow')) : t('delisted')"
                              @click="toOrder(detail)"></u-button>
                </view>
            </view>

            <share-poster ref="sharePosterRef" posterType="o2o_goods" :posterId="detail.goods.poster_id" :posterParam="posterParam" :copyUrlParam="copyUrlParam" />

        </view>
        <ns-goods-sku ref="goodsSkuRef" :goods-detail="detail" @change="specSelectFn"></ns-goods-sku>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app'
import { useLogin } from '@/hooks/useLogin';
import { img, redirect, getToken, handleOnloadParams } from '@/utils/common';
import { getGoodsDetail, setCollect, getCollect, deleteCollect } from '@/addon/o2o/api/goods';
import useMemberStore from '@/stores/member'
import { t } from '@/locale';
import nsGoodsSku from '@/addon/o2o/components/ns-goods-sku/ns-goods-sku.vue'
import uniTable from '@/addon/o2o/components/uni-table/components/uni-table/uni-table.vue'
import uniTr from '@/addon/o2o/components/uni-table/components/uni-tr/uni-tr.vue'
import uniTh from '@/addon/o2o/components/uni-table/components/uni-th/uni-th.vue'
import uniTd from '@/addon/o2o/components/uni-table/components/uni-td/uni-td.vue'
import sharePoster from '@/components/share-poster/share-poster.vue'

const detail = ref<Array<any>>([]);
const loading = ref<boolean>(true);
const memberStore = useMemberStore()
const goodsSkuRef = ref(null)

// 会员信息
const userInfo = computed(() => memberStore.info)

const goodsState = ref('goods_content')

// 切换状态
const changeGoodStatus = (status: any) => {
    goodsState.value = status
}

const goods = ref({
    sku_id: '',
    goods_id: ''
});
onLoad((option) => {
    // #ifdef MP-WEIXIN
    // 处理小程序场景值参数
    option = handleOnloadParams(option);
    // #endif

    goods.value.sku_id = option.sku_id
    goods.value.goods_id = option.goods_id
    loading.value = true
    if (getToken()) {
        memberStore.getMemberInfo()
    }
    getGoodsDetail(goods.value).then((res) => {
        if (JSON.stringify(res.data) === '{}') {
            uni.showToast({ title: '找不到该商品', icon: 'none' })
            setTimeout(() => {
                redirect({ url: '/addon/o2o/pages/index', mode: 'reLaunch' })
            }, 600)
            return false
        }
        detail.value = res.data
        detail.value.goods.goods_image_thumb_mid.forEach((item, index) => {
            detail.value.goods.goods_image_thumb_mid[index] = img(item);
        })
        loading.value = false;
        copyUrlFn();
    });
})

// 订单计算创建
let orderData = {
    sku: {
        num: 1,
        sku_id: ''
    }
}

// 跳转订单预约
const toOrder = (data) => {
    if (!getToken()) {
        useLogin().setLoginBack({ url: '/addon/o2o/pages/goods/detail', param: { sku_id: data.sku_id } })
        return false;
    }
    if (!data.goods.status) {
        return false
    }
    orderData.sku.sku_id = data.sku_id
    uni.setStorageSync('o2oCreateData', orderData);
    if (data.goods.buy_type == 'buy') {
        buyFn()
    } else {
        redirect({ url: '/addon/o2o/pages/order/payment', param: { id: data.goods_id } })
    }
}

const buyFn = () => {
    goodsSkuRef.value.open()
}

const specSelectFn = (id) => {
    detail.value.skuList.forEach((item, index) => {
        if (item.sku_id == id) {
            Object.assign(detail.value, item);
        }
    })
}
const swiperClick = (index: any) => {
    if (typeof index == 'number') imgListPreview(detail.value.goods.goods_image_thumb_mid, index)
}
//预览图片
const imgListPreview = (item: any, index: any) => {
    if (Array.isArray(item)) {
        if (!item.length) return false
        var urlList = item;
        uni.previewImage({
            indicator: "number",
            current: index,
            loop: true,
            urls: urlList
        })
    } else {
        if (item === '') return false
        var urlList = []
        urlList.push(img(item))  //push中的参数为 :src="item.img_url" 中的图片地址
        uni.previewImage({
            indicator: "number",
            loop: true,
            urls: urlList
        })
    }

}

/************* 分享海报-start **************/
const sharePosterRef = ref(null);
const copyUrlParam = ref('');
let posterParam = {};

// 分享海报链接
const copyUrlFn = () => {
    copyUrlParam.value = '?sku_id=' + detail.value.sku_id;
    if (userInfo.value && userInfo.value.member_id) copyUrlParam.value += '&mid=' + userInfo.value.member_id;
}

const openShareFn = () => {
    posterParam.sku_id = detail.value.sku_id;
    if (userInfo.value && userInfo.value.member_id) posterParam.member_id = userInfo.value.member_id;
    sharePosterRef.value.openShare()
}

/************* 分享海报-end **************/

// 价格类型
const priceType = ref('') //''=>原价，discount_price=>折扣价，member_price=>会员价

// 商品价格
const goodsPrice = computed(() => {
    let price = "0.00";
    if (Object.keys(detail.value).length && Object.keys(detail.value.goods).length && detail.value.goods.member_discount && getToken() && detail.value.member_price != detail.value.price) {
        // 会员价
        price = detail.value.member_price ? detail.value.member_price : detail.value.price
        priceType.value = 'member_price'
    } else {
        price = detail.value.price
        priceType.value = ''
    }
    return price;
})

// 关闭预览图片
onUnload(() => {
    // #ifdef  H5 || APP
    try {
        uni.closePreviewImage()
    } catch (e) {

    }
    // #endif
})
</script>

<style lang="scss" scoped>
.chunk-wrap {
    @apply bg-white px-4 mb-3;

    .chunk-head {
        height: 84rpx;
        @apply flex justify-between items-center border-0 border-b border-solid border-[#F2F2F2] box-border;

        text {
            &:first-of-type {
                @apply font-bold;
            }

            &:last-of-type {
                @apply text-[24rpx] text-[var(--text-color-light9)];
            }

            .iconfont {
                @apply inline-block;
                margin-left: 2rpx;
            }
        }
    }
}

.member-price {
    background: linear-gradient(90deg, #FEF3E7 0%, #FFFFFF 100%);
}

.text-color {
    color: $u-primary;
}

.bg-color {
    background-color: $u-primary;
}

.word-all {
    word-break: keep-all;
}

.text-scale {
    transform: scale(0.8);
}

.class-select {
    position: relative;
    font-weight: bold;
    color: var(--primary-color);

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        height: 6rpx;
        border-radius: 3rpx;
        background-color: $u-primary;
        width: 60rpx;
        left: 50%;
        transform: translateX(-50%);
    }
}

.scheduling-content :deep(.uni-table) {
    min-width: 100% !important;
}

:deep(.scheduling-content img) {
    vertical-align: middle;
}
</style>
