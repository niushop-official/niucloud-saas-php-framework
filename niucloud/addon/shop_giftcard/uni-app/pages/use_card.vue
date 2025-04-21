<template>
    <view class="bg-[#f8f8f8] min-h-[100vh]" :style="themeColor()">
        <template v-if="Object.keys(detail).length">
            <view class="px-[var(--sidebar-m)] py-[var(--top-m)]">
                <view class="w-full h-[430rpx] relative">
                    <image v-if="detail.card_cover" class="w-full h-[430rpx] rounded-[var(--rounded-mid)]" :src="img(detail.card_cover || '')" @error="detail.card_cover= defaultCard(detail)" mode="aspectFill" />
                    <image v-else class="w-full h-[430rpx] rounded-[var(--rounded-mid)]" :src="img(defaultCard(detail))" mode="aspectFill" />
                    <view class="absolute bottom-[var(--pad-top-m)] left-0 right-0 flex justify-center">
                        <button :class="{'!bg-[#EF000C]':detail.giftcard.card_right_type=='balance','!bg-[#FF7700]':detail.giftcard.card_right_type=='goods'}" class="h-[44rpx] font-500 text-[24rpx] !text-[#fff] m-0 rounded-[var(--rounded-big)] remove-border">
                            <text class="text-[20rpx] text-[24rpx] iconfont mr-[5rpx]" :class="{'iconchuzhikaV6mm':detail.giftcard.card_right_type=='balance','iconduihuankaV6mm-1':detail.giftcard.card_right_type=='goods'}"></text>
                            <text v-if="detail.giftcard.card_right_type=='balance'" class="leading-[44rpx]">{{ detail.balance }}{{ t('yuan') }}</text>
                            <text class="leading-[44rpx]">{{ detail.giftcard.card_right_type_name }}</text>
                        </button>
                    </view>
                    <view class="absolute top-[var(--pad-top-m)] left-0 right-0 flex justify-between px-[var(--pad-sidebar-m)]">
                        <view class="h-[36rpx] leading-[36rpx] text-[26rpx] font-800 text-stroke">{{ detail.card_no }}</view>
                    </view>
                </view>
                <view class="text-[34rpx] font-500 leading-[48rpx] px-[var(--sidebar-m)] mt-[var(--top-m)] text-center">{{ detail.giftcard.card_name }}</view>
                <!-- <view class="mt-[var(--top-m)] card-template">
                  <view class="card-template-item justify-between">
                    <text class="text-[28rpx] leading-[39rpx] font-400">卡片类型</text>
                    <text class="text-[28rpx] leading-[39rpx] font-400">{{detail.giftcard.card_right_type_name}}</text>
                  </view>
                  <view class="card-template-item justify-between">
                    <text class="text-[28rpx] leading-[39rpx] font-400">卡片面值</text>
                    <text class="text-[28rpx] leading-[39rpx] font-500">￥{{detail.balance}}</text>
                  </view>
                </view> -->
                <view v-if="detail.giftcard.card_right_type=='goods'" class="mt-[var(--top-m)] card-template">
                    <view class="flex items-center">
                        <text class="title !mb-0">{{ t('convertibleGoods') }}</text>
                        <text v-if="detail.giftcard.card_goods_type=='diy'" class="text-[24rpx] text-[var(--text-color-light9)] leading-[34rpx] ml-[10rpx]">{{ t('goodsTitleOne') }}{{ detail.total_num }}{{ t('goodsTitleOneAnd') }}</text>
                        <text v-else class="text-[24rpx] text-[var(--text-color-light9)] leading-[34rpx] ml-[10rpx]">{{ t('goodsTitleTwo') }}</text>
                    </view>
                    <template v-for="(item,index) in detail.cardGoods" :key='index'>
                        <view class="mt-[var(--pad-top-m)] flex" @click.stop="redirect({ url: '/addon/shop/pages/goods/detail',param:{ sku_id:item.sku_id }})">
                            <image v-if="item.sku_image" class="w-[210rpx] h-[210rpx] rounded-[var(--rounded-mid)]" :src="img(item.sku_image)" :mode="'aspectFill'" @error="item.sku_image='static/resource/images/diy/shop_default.jpg'" />
                            <image v-else class="w-[210rpx] h-[210rpx] rounded-[var(--rounded-mid)]" :src="img('static/resource/images/diy/shop_default.jpg')" :mode="'aspectFill'" />
                            <view class="ml-[20rpx] flex-1 flex flex-col justify-between">
                                <view class="w-full">
                                    <view class="max-w-[432rpx] text-[28rpx] leading-[40rpx] font-400 truncate text-[#303133]">{{ item.goods_name }}</view>
                                    <view class="mt-[15rpx] flex items-center justify-between">
                                        <view class="text-[24rpx] text-[var(--text-color-light6)] font-400 truncate leading-[34rpx] w-[432rpx]">{{ item.sku_name }}</view>
                                    </view>
                                    <view v-if="detail.giftcard.card_goods_type=='all'" class="mt-[20rpx] text-[24rpx] text-[var(--text-color-light6)] font-400 truncate leading-[34rpx] max-w-[432rpx]">{{ t('cardGoodsTypeAllTips') }}{{ item.total_num }}{{ t('cardGoodsTypeAllTipsAnd') }}{{ item.use_num }}{{ t('unit') }}</view>
                                </view>
                                <view class="flex items-center justify-between">
                                    <view class="text-[var(--price-text-color)] flex items-baseline">
                                        <text class="text-[22rpx] price-font">￥</text>
                                        <text class="text-[36rpx] font-500 price-font">{{ parseFloat(item.price).toFixed(2).split('.')[0] }}</text>
                                        <text class="text-[22rpx] font-500 price-font">.{{ parseFloat(item.price).toFixed(2).split('.')[1] }}</text>
                                    </view>
                                    <view v-if="detail.giftcard.card_goods_type=='all'" class="font-400 text-[28rpx] text-[#303133]">
                                        <text>x</text>
                                        <text>{{ item.total_num }}</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </template>
                </view>
                <view v-if="detail.giftcard.instruction" class="mt-[var(--top-m)] card-template">
                    <view class="title">{{ t('instruction') }}</view>
                    <view class="u-content">
                        <u-parse :content="detail.giftcard.instruction" :tagStyle="{img: 'vertical-align: top;',p:'overflow: hidden;word-break:break-word;' }"></u-parse>
                    </view>
                </view>
                <view v-if="detail.giftcard.card_desc" class="mt-[var(--top-m)] card-template">
                    <view class="title">{{ t('cardDesc') }}</view>
                    <view class="u-content">
                        <u-parse :content="detail.giftcard.card_desc" :tagStyle="{img: 'vertical-align: top;',p:'overflow: hidden;word-break:break-word;' }"></u-parse>
                    </view>
                </view>
            </view>
            <view class="tab-bar-placeholder"></view>
            <view class="border-[0] border-t-[2rpx] border-solid border-[#f5f5f5] w-[100%] flex justify-between pl-[30rpx] pr-[20rpx] bg-[#fff] box-border fixed left-0 bottom-0 tab-bar z-1 items-center">
                <view class="flex items-center mr-[30rpx]">
                    <view class="flex flex-col justify-center items-center" @click="toMyCardList">
                        <view class="iconfont nc-icon-kabao text-[36rpx]"></view>
                        <text class="text-[20rpx] mt-[10rpx]">{{ t('cardBag') }}</text>
                    </view>
                </view>
                <view class="flex-1 flex items-center">
                    <button v-if="detail.status=='to_use' && detail.giftcard.is_give" class="w-[300rpx] !h-[70rpx] font-500 text-[26rpx] !text-[var(--primary-color)] !m-0 !mr-[16rpx] leading-[66rpx] border-[var(--primary-color)] border-solid border-[2rpx] rounded-full !bg-[#fff]" @click="btnClick('give')">{{ t('giftToFriends') }}</button>
                    <button v-if="detail.status=='to_use' || detail.status=='can_use'" class="flex-1 min-w-[300rpx] !h-[70rpx] font-500 text-[26rpx] !text-[#fff] primary-btn-bg !m-0 leading-[70rpx] rounded-full remove-border" :class="{'opacity-40':disable}" @click="btnClick('use')">{{ t('canUse') }}</button>
                    <button v-if="detail.status=='used'" class="w-full h-[70rpx] font-500 text-[26rpx] leading-[70rpx] !text-[#fff] !bg-[var(--text-color-light9)] m-0 rounded-full opacity-40 remove-border">{{ t('used') }}</button>
                    <button v-if="detail.status=='invalid'" class="w-full h-[70rpx] font-500 text-[26rpx] leading-[70rpx] !text-[#fff] !bg-[var(--text-color-light9)] m-0 rounded-full opacity-40 remove-border">{{ t('invalid') }}</button>
                </view>
            </view>
            <uni-popup ref="popupRef" type="center" :is-mask-click="false">
                <view class="bg-[#fff] w-[530rpx] min-h-[504rpx] rounded-[var(--rounded-big)] box-border p-[32rpx] relative"
                    :style="{'background-image':'url('+img('addon/shop_giftcard/popup_bg.png')+')',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'top',}">
                    <image class="w-[327rpx] h-[327rpx] rounded-[var(--rounded-mid)] absolute left-[50%] top-[-163.5rpx] transform -translate-x-1/2 z-10" :src="img('addon/shop_giftcard/popup_top_balance.png')" :mode="'aspectFill'" />
                    <view class="text-[40rpx] leading-[56rpx] font-bold text-center pt-[174rpx]">{{ t('popupTipsOne') }}</view>
                    <view class="text-[24rpx] leading-[34rpx] text-center mt-[30rpx]">{{ detail.balance }}{{ t('popupTipsTwo') }}</view>
                    <button class="w-[370rpx] h-[80rpx] font-500 text-[26rpx] leading-[80rpx] !text-[#fff] primary-btn-bg m-0 !mx-auto rounded-[40rpx] remove-border mt-[90rpx]" @click="tolink">{{ t('gouToSee') }}</button>
                    <view class="nc-iconfont nc-icon-cuohaoV6xx text-[57rpx] text-[#fff] absolute left-[50%] bottom-[-117rpx] transform -translate-x-1/2 z-10" @click="close"></view>
                </view>
            </uni-popup>
        </template>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { redirect, img, getToken, goback } from '@/utils/common';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { ref, reactive } from 'vue'
import { t } from '@/locale'
import { getCardDetail, useGoods, useBalance } from '@/addon/shop_giftcard/api/card';
import { useLogin } from '@/hooks/useLogin'
import useMemberStore from '@/stores/member'

const memberStore = useMemberStore()
const detail: any = ref({})
const loading = ref(true)
const disable = ref(false)

onLoad((option: any) => {
    if (!option.card_id) {
        let parameter = {
            url: '/addon/shop_giftcard/pages/index',
            title: t('notCard'),
            mode: 'reLaunch'
        };
        goback(parameter)
    } else {
        // 检测是否登录
        if (!getToken()) {
            useLogin().setLoginBack({
                url: '/addon/shop_giftcard/pages/use_card',
                param: { card_id: option.card_id }
            })
            return false
        }
        getCardDetailFn(option.card_id)
    }
})

onShow(() => {
    if (Object.keys(detail.value).length) getCardDetailFn(detail.value.card_id)
})

/************** 获取卡详情 *****************/
const getCardDetailFn = (card_id: any) => {
    loading.value = true
    getCardDetail(card_id).then((res: any) => {
        detail.value = res.data
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}

const toMyCardList = () => {
    redirect({ url: '/addon/shop_giftcard/pages/my_card_list', mode: 'redirectTo' })
}
const defaultCard = (data) => {
    let imgUrl = '';
    if (data.giftcard.card_right_type == 'balance') {
        imgUrl = 'addon/shop_giftcard/diy/index/value_card.jpg';
    } else {
        imgUrl = 'addon/shop_giftcard/diy/index/redemption_card.jpg';
    }
    return imgUrl;
}
const popupRef = ref()
const btnClick = (type: any) => {
    if (type == 'use') {
        if (detail.value.giftcard.card_right_type == 'goods') {
            if (detail.value.giftcard.card_goods_type == 'all' && detail.value.giftcard.delivery_way == 'all') {
                if (disable.value) return
                let formData = {
                    card_id: detail.value.card_id,
                    sku_data: []
                }
                formData.sku_data = detail.value.cardGoods.map((el: any) => {
                    return {
                        sku_id: el.sku_id,
                        num: el.total_num - el.use_num
                    }
                })
                disable.value = true
                useGoods(formData).then((res: any) => {
                    disable.value = false
                    if (res.data) {
                        // 礼品卡兑换商品，无需支付
                        uni.setStorage({
                            key: 'orderCreateData',
                            data: res.data,
                            success: () => {
                                redirect({ url: '/addon/shop/pages/order/payment' })
                            }
                        });
                    }
                }).catch(() => {
                    disable.value = false;
                })
            } else {
                redirect({
                    url: '/addon/shop_giftcard/pages/use_goods_select',
                    param: {
                        card_id: detail.value.card_id
                    },
                })
            }

        } else {
            useBalance({ card_id: detail.value.card_id }).then((res) => {
                disable.value = false
                if (res.data) memberStore.getMemberInfo(() => {
                    popupRef.value.open()
                })
            }).catch(() => {
                disable.value = false;
            })
        }

    } else {
        if (uni.getStorageSync('give_id')) uni.removeStorageSync('give_id');
        redirect({
            url: '/addon/shop_giftcard/pages/give',
            param: {
                card_id: detail.value.card_id
            },
        })
    }
}

const tolink = () => {
    popupRef.value.close()
    redirect({ url: '/app/pages/member/balance' })
}
const close = () => {
    getCardDetailFn(detail.value.card_id)
    popupRef.value.close()
}
</script>

<style lang="scss" scoped>
.tab-bar-placeholder {
    padding-bottom: calc(constant(safe-area-inset-bottom) + 100rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 100rpx);
}

.tab-bar {
    padding-top: 16rpx;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 16rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 16rpx);
}

:deep(view[name="content"]) {
    transform: scaleX(1) scaleY(1) !important;
}

//礼品卡描边
.text-stroke {
    -webkit-text-stroke-color: #FFF; /* 文字描边颜色 */
    -webkit-text-stroke-width: 1rpx; /* 文字描边宽度 */
}
</style>
