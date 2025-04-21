<template>
    <view class="bg-[#f8f8f8] min-h-[100vh]" :style="themeColor()">
        <template v-if="Object.keys(detail).length&&Object.keys(sku_data).length">
            <view v-if="tips" class="h-[66rpx] bg-[#FCF2DF] flex items-center px-[var(--sidebar-m)]">
                <text class="iconfont iconshengyinpc !text-[26rpx]"></text>
                <text class="text-[24rpx] leading-[34rpx] ml-[16rpx] font-400">{{ t('pageTips') }}</text>
            </view>
            <view class="px-[var(--sidebar-m)] py-[var(--top-m)]">
                <view class="card-template">

                    <view class="flex items-center justify-between pb-[20rpx] border-0 !border-b-[2rpx] border-solid border-[#f8f8f8]">
                        <template v-if="detail.giftcard.card_goods_type=='diy'">
                            <text class="title !mb-0">{{ t('goodsTitle') }}{{ detail.total_num - detail.use_num }}{{ t('goodsTitleAnd') }}</text>
                            <view class="text-[30rpx] text-[var(--text-color-light6)]">
                                <text class="!text-[var(--primary-color)]">{{ use_num }}</text>
                                <text>/{{ detail.total_num - detail.use_num }}</text>
                            </view>
                        </template>
                        <template v-else>
                            <text class="title !mb-0">{{ t('goodsTitleTwo') }}</text>
                        </template>
                    </view>

                    <template v-for="(item,index) in detail.cardGoods" :key='item.sku_id'>
                        <view class="mt-[var(--pad-top-m)] flex">
                            <view class="w-[210rpx] h-[210rpx] rounded-[var(--rounded-mid)] relative">
                                <image v-if="item.sku_image" class="w-[210rpx] h-[210rpx] rounded-[var(--rounded-mid)]" :src="img(item.sku_image)" @error="item.sku_image='static/resource/images/diy/shop_default.jpg'" :mode="'aspectFill'" />
                                <image v-else class="w-[210rpx] h-[210rpx] rounded-[var(--rounded-mid)]" :src="img('static/resource/images/diy/shop_default.jpg')" :mode="'aspectFill'" />
                                <view v-if="!item.stock" class="absolute w-full w-[210rpx] h-[210rpx] bg-[rgba(51,51,51,0.6)] z-10 left-0 top-0 rounded-[var(--rounded-mid)]">
                                    <view class="text-[#fff] leading-[210rpx] text-center text-[24rpx] font-500">{{ t('goodsSellOut') }}</view>
                                </view>
                                <view v-else-if="!item.status" class="absolute w-full w-[210rpx] h-[210rpx] bg-[rgba(51,51,51,0.6)] z-10 left-0 top-0 rounded-[var(--rounded-mid)]">
                                    <view class="text-[#fff] leading-[210rpx] text-center text-[24rpx] font-500">{{ t('goodsRemove') }}</view>
                                </view>
                            </view>
                            <view class="ml-[20rpx] flex-1 flex flex-col justify-between">
                                <view class="w-full">
                                    <view class="max-w-[432rpx] text-[28rpx] leading-[40rpx] font-400 truncate text-[#303133]">{{ item.goods_name }}</view>
                                    <view class="mt-[20rpx] text-[24rpx] text-[var(--text-color-light6)] font-400 truncate leading-[34rpx] max-w-[432rpx]">{{ item.sku_name }}</view>
                                    <view v-if="detail.giftcard.card_goods_type == 'all'" class="mt-[20rpx] text-[24rpx] text-[var(--text-color-light6)] font-400 truncate leading-[34rpx] max-w-[432rpx]">{{ t('cardGoodsTypeAllTips') }}{{ item.total_num }}{{ t('cardGoodsTypeAllTipsAnd') }}{{ item.use_num }}{{ t('unit') }}</view>
                                </view>
                                <view class="flex items-center justify-between h-[52rpx]">
                                    <view class="text-[var(--price-text-color)] flex items-baseline">
                                        <text class="text-[22rpx] price-font">￥</text>
                                        <text class="text-[36rpx] font-500 price-font">{{ parseFloat(item.price).toFixed(2).split('.')[0] }}</text>
                                        <text class="text-[22rpx] font-500 price-font">.{{ parseFloat(item.price).toFixed(2).split('.')[1] }}</text>
                                    </view>
                                    <view v-if="sku_data[item.sku_id].max_num" class="flex items-center h-[52rpx]">
                                        <view @click.stop="skuNumChange(item.sku_id,'jian')"
                                              class="text-[24rpx] font-500 nc-iconfont nc-icon-jianV6xx leading-[52rpx] w-[52rpx] text-right box-border pr-[10rpx]"
                                              :class="{'text-[var(--text-color-light9)]':!sku_data[item.sku_id].num }"></view>
                                        <input
                                            class="text-[#303133] text-[28rpx] w-[80rpx] h-[44rpx] bg-[var(--temp-bg)] leading-[44rpx] text-center rounded-[6rpx]"
                                            type="number" @blur="skuNumChange(item.sku_id,'')"
                                            v-model="sku_data[item.sku_id].num" />
                                        <text @click.stop="skuNumChange(item.sku_id,'jia')"
                                              class="text-[24rpx] font-500 nc-iconfont nc-icon-jiahaoV6xx leading-[52rpx] w-[52rpx] box-border pl-[10rpx]"
                                              :class="{'text-[var(--text-color-light9)]':sku_data[item.sku_id].num == sku_data[item.sku_id].max_num}"></text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </template>
                </view>
            </view>
            <view class="tab-bar-placeholder"></view>
            <view class="border-[0] border-t-[2rpx] border-solid border-[#f5f5f5] w-[100%] flex justify-between pl-[30rpx] pr-[20rpx] bg-[#fff] box-border fixed left-0 bottom-0 tab-bar z-1 items-center">
                <view class="flex flex-shrink-0 items-center mr-[30rpx]">
                    <view class="flex flex-col justify-center items-center" @click="toMyCardList">
                        <view class="iconfont nc-icon-kabao text-[36rpx]"></view>
                        <text class="text-[20rpx] mt-[10rpx]">{{ t('cardBag') }}</text>
                    </view>
                </view>
                <view class="flex flex-1 items-center">
                    <button v-if="detail.status=='to_use' || detail.status=='can_use'"
                            class="w-full !h-[70rpx] font-500 text-[26rpx] !text-[#fff] primary-btn-bg !m-0 leading-[70rpx] rounded-full remove-border"
                            :class="{'opacity-40':disable}" @click="save">{{ t('confirmExchange') }}
                    </button>
                    <button v-if="detail.status=='used'" class="w-full !h-[70rpx] font-500 text-[26rpx]  !text-[#fff] !bg-[var(--text-color-light9)] !m-0 leading-[70rpx] rounded-full opacity-40 remove-border">{{ t('used') }}</button>
                    <button v-if="detail.status=='invalid'" class="w-full !h-[70rpx] font-500 text-[26rpx] !text-[#fff] !bg-[var(--text-color-light9)] !m-0 leading-[70rpx] rounded-full opacity-40 remove-border">{{ t('invalid') }}</button>
                </view>
            </view>
        </template>
        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { redirect, img, getToken, goback } from '@/utils/common';
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref, reactive, computed } from 'vue'
import { t } from '@/locale'
import { getCardDetail, useGoods } from '@/addon/shop_giftcard/api/card';
import { useLogin } from '@/hooks/useLogin'

const detail: any = ref({})
const loading = ref(true)
const disable = ref(false)
const formData: any = reactive({
    card_id: '',
    sku_data: []
})

const sku_data = ref<any>({})
const use_num = computed(() => {
    let num = 0
    Object.values(sku_data.value).forEach((el: any) => {
        num += parseInt(el.num || 0)
    })
    return num
})

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
                url: '/addon/shop_giftcard/pages/use_goods_select',
                param: { card_id: option.card_id }
            })
            return false
        }
        formData.card_id = option.card_id
        getCardDetailFn(option.card_id)
    }
})

onShow(() => {
    if (Object.keys(detail.value).length) getCardDetailFn(detail.value.card_id)
})

const tips = ref(false)
/************** 获取礼品卡详情 *****************/
const getCardDetailFn = (card_id: any) => {
    loading.value = true
    sku_data.value = {}
    getCardDetail(card_id).then((res: any) => {
        detail.value = res.data
        tips.value = false
        res.data.cardGoods.forEach((el: any) => {
            let surplus = 0
            if (detail.value.giftcard.card_goods_type == 'diy') {
                surplus = detail.value.total_num - detail.value.use_num
            } else {
                surplus = el.total_num - el.use_num
            }
            sku_data.value[el.sku_id] = {
                sku_id: el.sku_id,
                max_num: surplus > el.stock ? parseInt(el.stock) : surplus,
                stock: el.stock,
                num: 0
            }
            if (!tips.value && (!el.status || !el.stock)) tips.value = true
        })
        loading.value = false
    })
}

const updateMaxNum = () => {
    for (let key in sku_data.value) {
        let surplus = detail.value.total_num - detail.value.use_num
        let num = 0
        Object.values(sku_data.value).forEach((el: any) => {
            num += parseInt(el.num || 0)
        })
        surplus = surplus - (num - sku_data.value[key].num)
        sku_data.value[key].max_num = surplus > sku_data.value[key].stock ? parseInt(sku_data.value[key].stock) : surplus
    }
}

const skuNumChange = (sku_id: any, type: any) => {
    if (type == 'jia') {
        sku_data.value[sku_id].num = parseInt(sku_data.value[sku_id].num) + 1
    } else if (type == 'jian') {
        sku_data.value[sku_id].num = parseInt(sku_data.value[sku_id].num) - 1
    }
    if (sku_data.value[sku_id].num === '' || sku_data.value[sku_id].num == null) sku_data.value[sku_id].num = 0
    if (sku_data.value[sku_id].num < 0) sku_data.value[sku_id].num = 0
    if (sku_data.value[sku_id].num > sku_data.value[sku_id].max_num) sku_data.value[sku_id].num = parseInt(sku_data.value[sku_id].max_num)
    sku_data.value[sku_id].num = parseInt(sku_data.value[sku_id].num)
    if (detail.value.giftcard.card_goods_type == 'diy') updateMaxNum()
}

const toMyCardList = () => {
    redirect({ url: '/addon/shop_giftcard/pages/my_card_list', mode: 'redirectTo' })
}

const save = () => {
    if (disable.value) return
    if (!use_num.value) {
        uni.showToast({ title: t('saveTipsOne'), icon: 'none' })
        return
    }
    if (detail.value.giftcard.card_goods_type == 'diy' && detail.value.giftcard.delivery_way == 'all') {
        if (use_num.value < (detail.value.total_num - detail.value.use_num)) {
            uni.showToast({ title: t('saveTipsTwo'), icon: 'none' })
            return
        }
    }
    disable.value = true
    formData.sku_data = Object.values(sku_data.value).map(el => {
        return {
            sku_id: el.sku_id,
            num: el.num
        }
    }).filter(e => e.num)

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
</style>
