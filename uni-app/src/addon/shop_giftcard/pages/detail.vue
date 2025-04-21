<template>
    <view :style="themeColor()">
        <view class="bg-[#f8f8f8] min-h-[100vh]" v-if="Object.keys(detail).length">
            <view class="px-[var(--sidebar-m)] py-[var(--top-m)]">
                <view class="w-full h-[430rpx] relative">
                    <image v-if="detail.material_list[activeIndex]" class="w-full h-[430rpx] rounded-[var(--rounded-mid)]" :src="img(detail.material_list[activeIndex].url || '')" @error="detail.material_list[activeIndex].url= defaultCard(detail)" mode="aspectFill" />
                    <image v-else class="w-full h-[430rpx] rounded-[var(--rounded-mid)]" :src="img(defaultCard(detail))" mode="aspectFill" />
                    <view class="absolute bottom-[var(--pad-top-m)] left-0 right-0 flex justify-center">
                        <button class="h-[44rpx] font-500 text-[24rpx] !text-[#fff] m-0 rounded-[var(--rounded-big)] remove-border"
                            :class="{'!bg-[#EF000C]':detail.card_right_type=='balance','!bg-[#FF7700]':detail.card_right_type=='goods'}">
                            <text class="text-[24rpx] leading-[44rpx] iconfont mr-[5rpx]" :class="{'iconchuzhikaV6mm':detail.card_right_type=='balance','iconduihuankaV6mm-1':detail.card_right_type=='goods'}"></text>
                            <text class="leading-[44rpx]">{{ detail.card_right_type_name }}</text>
                        </button>
                    </view>
                </view>
                <!-- <view v-if="detail.material_list.length>1" class="text-[28rpx] leading-[39rpx] font-400 mt-[var(--top-m)]">选择封面</view> -->
                <view class="h-[110rpx] mt-[var(--top-m)]" v-if="detail.material_list.length>1">

                    <!-- <swiper v-if="detail.material_list.length > 5" class="h-full" display-multiple-items='5' circular='true' previous-margin='0rpx'
                      next-margin='-160rpx' :current="current" @change="swiperChange" indicator-active-color='red'>
                      <template v-for="(item,index) in detail.material_list" :key='index'>
                        <swiper-item class="sitem" @click.stop="swiperCardClick(index)">
                          <view class="swiper-item flex justify-center items-center">
                            <image class="w-[144rpx] h-[90rpx] rounded-[var(--goods-rounded-small)] flex-shrink-0"
                            :class="{'!w-[180rpx] !h-[110rpx] box-border border-[2rpx] border-solid border-[var(--primary-color)]':index==activeIndex}"
                            :src="img(item.url)" mode="aspectFit"/>
                          </view>
                        </swiper-item>
                      </template>
                    </swiper> -->
                    <!-- :scroll-into-view="'id' + activeIndex" -->
                    <scroll-view :scroll-x="true">
                        <view class="flex items-center">
                            <template v-for="(item,index) in detail.material_list" :key='index'>
                                <image v-if="item.url" :id="'id' + index" @click.stop="swiperCardClick(index)"
                                       class="w-[144rpx] h-[90rpx] rounded-[var(--goods-rounded-small)] flex-shrink-0 mr-[20rpx]"
                                       :class="{'!w-[180rpx] !h-[110rpx] box-border border-[2rpx] border-solid border-[var(--primary-color)]':index==activeIndex}"
                                       :src="img(item.url)" @error="item.url= defaultCard(detail)"
                                       mode="aspectFill" />
                                <image v-else :id="'id' + index" @click.stop="swiperCardClick(index)"
                                       class="w-[144rpx] h-[90rpx] rounded-[var(--goods-rounded-small)] flex-shrink-0 mr-[20rpx]"
                                       :class="{'!w-[180rpx] !h-[110rpx] box-border border-[2rpx] border-solid border-[var(--primary-color)]':index==activeIndex}"
                                       :src="img(defaultCard(detail))" mode="aspectFill" />
                            </template>
                        </view>
                    </scroll-view>
                </view>
                <view class="mt-[var(--top-m)] card-template flex items-center justify-between !pr-0">
                    <text class="text-[28rpx] leading-[39rpx] font-400">{{ t('purchaseQuantity') }}</text>
                    <u-number-box v-model="giftcard_data.num" :min="1" :max="99" integer :step="1" input-width="68rpx" input-height="52rpx" @change="numBlurFn">
                        <template #minus>
                            <view class="text-[#303133] text-[24rpx] font-500 nc-iconfont nc-icon-jianV6xx leading-[50rpx] w-[60rpx] text-right box-border pr-[10rpx]" :class="{ '!text-[var(--text-color-light9)]': giftcard_data.num <= 1 }"></view>
                        </template>
                        <template #input>
                            <input class="text-[#303133] text-[28rpx] w-[80rpx] h-[44rpx] bg-[var(--temp-bg)] leading-[44rpx] text-center rounded-[6rpx]" type="number" v-model="giftcard_data.num" @input="numInputFn" @blur="numBlurFn" />
                        </template>
                        <template #plus>
                            <view class="text-[#303133] text-[24rpx] font-500 nc-iconfont nc-icon-jiahaoV6xx leading-[50rpx] w-[50rpx] box-border pl-[10rpx]" :class="{ '!text-[var(--text-color-light9)]': giftcard_data.num >= 99 }"></view>
                        </template>
                    </u-number-box>
                </view>
                <view v-if="detail.card_right_type=='balance'" class="mt-[var(--top-m)] card-template">
                    <view class="text-[#333] text-[26rpx] leading-[30rpx] font-400 shrink-0 mr-[20rpx]">{{ t('selectDenomination') }}</view>
                    <view class="flex flex-wrap gap-x-[31rpx]">
                        <template v-for="(item,index) in detail.balance_json" :key='index'>
                            <view @click="moneyClick(item.balance)" :class="{'border-0 primary-btn-bg !text-[#fff]':item.balance == giftcard_data.balance }"
                                  class="w-[200rpx] h-[88rpx] box-border flex items-center justify-center mt-[30rpx] border-[2rpx] border-solid border-[#ddd] rounded-[var(--rounded-small)]">
                                <view class="flex items-baseline font-500">
                                    <text class="text-[24rpx]">￥</text>
                                    <text class="text-[34rpx]">{{ item.balance }}</text>
                                </view>
                            </view>
                        </template>
                    </view>
                </view>
                <view v-if="detail.card_right_type=='goods'" class="mt-[var(--top-m)] card-template">
                    <view class="flex items-center">
                        <text class="title !mb-0">{{ t('convertibleGoods') }}</text>
                        <text v-if="detail.card_goods_type=='diy'" class="text-[24rpx] text-[var(--text-color-light9)] leading-[34rpx] ml-[10rpx]">{{ t('goodsTitleOne') }}{{ detail.card_goods_count }}{{ t('goodsTitleOneAnd') }}</text>
                        <text v-else class="text-[24rpx] text-[var(--text-color-light9)] leading-[34rpx] ml-[10rpx]">{{ t('goodsTitleTwo ') }}</text>
                    </view>
                    <template v-for="(item,index) in detail.goods_sku_list" :key='index'>
                        <view class="mt-[var(--pad-top-m)] flex" @click.stop="redirect({ url: '/addon/shop/pages/goods/detail',param:{ sku_id:item.sku_id }})">
                            <image v-if="item.sku.sku_image" class="w-[190rpx] h-[190rpx] rounded-[var(--rounded-mid)]" :src="img(item.sku.sku_image)" mode="aspectFill" @error="item.sku.sku_image='static/resource/images/diy/shop_default.jpg'" />
                            <image v-else class="w-[170rpx] h-[170rpx] rounded-[var(--rounded-mid)]" :src="img('static/resource/images/diy/shop_default.jpg')" mode="aspectFill" />
                            <view class="ml-[20rpx] flex-1 flex flex-col justify-between">
                                <view class="w-full">
                                    <view class="max-w-[472rpx] text-[28rpx] leading-[40rpx] font-400 truncate text-[#303133]">{{ item.goods.goods_name }}</view>
                                    <view class="mt-[15rpx] flex items-center justify-between">
                                        <view class="text-[24rpx] text-[var(--text-color-light6)] font-400 truncate leading-[34rpx] w-[452rpx]">{{ item.sku.sku_name }}</view>
                                    </view>
                                </view>
                                <view class="flex items-center justify-between">
                                    <view class="text-[var(--price-text-color)] flex items-baseline">
                                        <text class="text-[22rpx] price-font">￥</text>
                                        <text class="text-[36rpx] font-500 price-font">{{ parseFloat(item.sku.price).toFixed(2).split('.')[0] }}</text>
                                        <text class="text-[22rpx] font-500 price-font">.{{ parseFloat(item.sku.price).toFixed(2).split('.')[1] }}</text>
                                    </view>
                                    <view v-if="detail.card_goods_type=='all'"
                                          class="font-400 text-[28rpx] text-[#303133]">
                                        <text>x</text>
                                        <text>{{ item.num }}</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </template>
                </view>
                <view v-if="detail.instruction" class="mt-[var(--top-m)] card-template">
                    <view class="title">{{ t('instruction') }}</view>
                    <view class="u-content">
                        <u-parse :content="detail.instruction" :tagStyle="{img: 'vertical-align: top;',p:'overflow: hidden;word-break:break-word;' }"></u-parse>
                    </view>
                </view>
                <view v-if="detail.card_desc" class="mt-[var(--top-m)] card-template">
                    <view class="title">{{ t('cardDesc') }}</view>
                    <view class="u-content">
                        <u-parse :content="detail.card_desc" :tagStyle="{img: 'vertical-align: top;',p:'overflow: hidden;word-break:break-word;' }"></u-parse>
                    </view>
                </view>
            </view>

            <view class="tab-bar-placeholder"></view>

            <view class="border-[0] border-t-[2rpx] border-solid border-[#f5f5f5] w-[100%] flex justify-between pl-[30rpx] pr-[20rpx] bg-[#fff] box-border fixed left-0 bottom-0 tab-bar z-1 items-center">
                <view class="flex items-baseline">
                    <view class="text-[24rpx] leading-[34rpx] font-500 mr-[6rpx]">{{ t('price') }}:</view>
                    <view class="text-[var(--price-text-color)] flex items-baseline">
                        <text class="text-[26rpx] price-font">￥</text>
                        <text class="text-[44rpx] font-500 price-font">{{ parseFloat(totalPrice).toFixed(2).split('.')[0] }}</text>
                        <text class="text-[26rpx] font-500 price-font">.{{ parseFloat(totalPrice).toFixed(2).split('.')[1] }}</text>
                    </view>
                </view>
                <template v-if="detail.status == 1">
                    <template v-if="!isExpired">
                        <!-- #ifdef H5 -->
                        <button class="w-[300rpx] !h-[70rpx] font-500 text-[26rpx] !text-[#fff] primary-btn-bg !m-0 leading-[70rpx] rounded-full remove-border" @click="confirm">{{ t('buyNow') }}</button>
                        <!-- #endif -->

                        <!-- #ifdef MP-WEIXIN -->
                        <!--<button v-if="isBindMobile && info && !info.mobile" class="w-[300rpx] !h-[70rpx] font-500 text-[26rpx] !text-[#fff] primary-btn-bg !m-0 leading-[70rpx] rounded-full remove-border" open-type="getPhoneNumber" @getphonenumber="memberStore.bindMobile">{{t('buyNow')}}</button>-->
                        <!--<button v-else class="w-[300rpx] !h-[70rpx] font-500 text-[26rpx] !text-[#fff] primary-btn-bg !m-0 leading-[70rpx] rounded-full remove-border" @click="confirm">{{t('buyNow')}}</button>-->
                        <button class="w-[300rpx] !h-[70rpx] font-500 text-[26rpx] !text-[#fff] primary-btn-bg !m-0 leading-[70rpx] rounded-full remove-border" @click="confirm">{{ t('buyNow') }}</button>
                        <!-- #endif -->
                    </template>
                    <button v-else class="w-[300rpx] !h-[70rpx] font-500 text-[26rpx] !text-[#fff] bg-[#ccc] !m-0 leading-[70rpx] rounded-full remove-border">{{ t('EventEnds') }}</button>
                </template>
                <button v-if="detail.status == 0" class="w-[300rpx] !h-[70rpx] font-500 text-[26rpx] !text-[#fff] bg-[#ccc] !m-0 leading-[70rpx] rounded-full remove-border">{{ t('removed') }}</button>

            </view>

        </view>

        <!-- 强制绑定手机号 -->
        <bind-mobile ref="bindMobileRef" />

        <loading-page :loading="loading"></loading-page>

        <!-- #ifdef MP-WEIXIN -->
        <!-- 小程序隐私协议 -->
        <wx-privacy-popup ref="wxPrivacyPopupRef"></wx-privacy-popup>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick } from 'vue'
import { redirect, img, goback, timeTurnTimeStamp, handleOnloadParams } from '@/utils/common'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { t } from '@/locale'
import { getGiftCardDetail } from '@/addon/shop_giftcard/api/giftcard';
import { useLogin } from '@/hooks/useLogin'
import useMemberStore from '@/stores/member'
import { useShare } from '@/hooks/useShare'

const detail: any = ref({})
const activeIndex = ref(0) // 当前激活展示图
// const current = ref(0) // swiper当前处于最左侧item下标
const loading = ref(true)

const wxPrivacyPopupRef: any = ref(null)
const giftcard_data = ref({
    giftcard_id: '',
    num: 1,
    balance: '',
    material_id: ''
})

const totalPrice = ref(0)
// 分享
const { setShare } = useShare()

onLoad((option: any) => {
    // #ifdef MP-WEIXIN
    // 处理小程序场景值参数
    option = handleOnloadParams(option);
    // #endif
    giftcard_data.value.giftcard_id = option.giftcard_id || ''
    if (!option.giftcard_id) {
        let parameter = {
            url: '/addon/shop_giftcard/pages/list',
            title: t('lackCardId'),
            mode: 'reLaunch'
        };
        goback(parameter);
    } else {
        getGiftCardDetailFn(option.giftcard_id)
    }
})
onShow(() => {
    if (giftcard_data.value.giftcard_id) getGiftCardDetailFn(giftcard_data.value.giftcard_id);
})
// const swiperChange = (event:any)=> {
// 	if (detail.value.material_list.length > 5) {
// 		let index = event.detail.current
// 		activeIndex.value = index >= (detail.value.material_list.length - 2) ? index - (detail.value.material_list.length - 2) : index + 2
// 	}

// }

//img item点击
const swiperCardClick = (index: any) => {
    activeIndex.value = index
    // if (detail.value.material_list.length > 5) {
    // 	current.value = index > 1 ? index - 2 : detail.value.material_list.length - 1 - (1 - index)
    // }
}

const getGiftCardDetailFn = (giftcard_id: any) => {
    loading.value = true
    getGiftCardDetail(giftcard_id).then((res: any) => {
        if (!res.data || JSON.stringify(res.data) === '[]') {
            uni.showToast({ title: t('unableToFindGiftCard'), icon: 'none' })
            setTimeout(() => {
                redirect({ url: '/addon/shop_giftcard/pages/index', mode: 'reLaunch' })
            }, 600)
            return false
        }

        detail.value = res.data

        setTimeout(() => {
            let share = {
                title: detail.value.card_name,
                desc: '',
                url: img(detail.value.material_list[activeIndex.value].url)
            }

            setShare({
                wechat: {
                    ...share
                },
                weapp: {
                    ...share
                }
            });
        }, 600);

        uni.setNavigationBarTitle({
            title: detail.value.card_name
        })
        if (detail.value.card_right_type == 'goods') {
            totalPrice.value = detail.value.card_price * (giftcard_data.value.num || 1)
        }
        if (detail.value.card_right_type == 'balance') {
            giftcard_data.value.balance = detail.value.balance_json[0].balance
            let index = detail.value.balance_json.findIndex(item => item.balance == giftcard_data.value.balance)
            totalPrice.value = detail.value.balance_json[index].price * (giftcard_data.value.num || 1)
        }
        loading.value = false
        swiperCardClick(0)

        nextTick(() => {
            // #ifdef MP
            if (wxPrivacyPopupRef.value) wxPrivacyPopupRef.value.proactive();
            // #endif
        })
    })
}

//数量
const numInputFn = () => {
    setTimeout(() => {
        if (giftcard_data.value.num >= 99) {
            giftcard_data.value.num = 99;
        }
        giftcard_data.value.num = parseInt(giftcard_data.value.num)
    }, 0)
}

const numBlurFn = () => {
    setTimeout(() => {
        if (!giftcard_data.value.num || giftcard_data.value.num <= 0) {
            giftcard_data.value.num = 1;
        }
        if (giftcard_data.value.num >= 99) {
            giftcard_data.value.num = 99;
        }
        if (detail.value.card_right_type == 'goods') {
            totalPrice.value = detail.value.card_price * (giftcard_data.value.num || 1)
        }
        if (detail.value.card_right_type == 'balance') {
            let index = detail.value.balance_json.findIndex(item => item.balance == giftcard_data.value.balance)
            totalPrice.value = detail.value.balance_json[index].price * (giftcard_data.value.num || 1)
        }
    }, 0)

}

//面值点击
const moneyClick = (money: any) => {
    giftcard_data.value.balance = money
    let index = detail.value.balance_json.findIndex(item => item.balance == money)
    totalPrice.value = detail.value.balance_json[index].price * (giftcard_data.value.num || 1)
}

// 会员信息
const memberStore = useMemberStore()
const userInfo = computed(() => memberStore.info)
//强制绑定手机号
const bindMobileRef: any = ref(null)
const isBindMobile = ref(uni.getStorageSync('isBindMobile'))
const confirm = () => {

    // #ifdef H5
    // 绑定手机号
    if (!userInfo.value && uni.getStorageSync('isBindMobile')) {
        uni.setStorage({
            key: 'loginBack', data: {
                url: '/addon/shop_giftcard/pages/detail',
                param: { giftcard_id: detail.value.giftcard_id }
            }
        })
        bindMobileRef.value.open()
        return false
    }
    // #endif

    // 检测是否登录
    if (!userInfo.value) {
        useLogin().setLoginBack({
            url: '/addon/shop_giftcard/pages/detail',
            param: { giftcard_id: detail.value.giftcard_id }
        })
        return false
    }

    giftcard_data.value.material_id = detail.value.material_list[activeIndex.value].material_id
    if (!giftcard_data.value.num || giftcard_data.value.num <= 0) {
        giftcard_data.value.num = 1;
    }
    uni.setStorage({
        key: 'giftCardOrderCreateData',
        data: {
            giftcard_data: giftcard_data.value,
        },
        success: () => {
            redirect({ url: '/addon/shop_giftcard/pages/payment' })
        }
    });
}

// 判断卡片是否过期
const isExpired = computed(() => {
    let bool = false;
    if (detail.value && detail.value.validity_type == 'date' && (Date.now() / 1000) > timeTurnTimeStamp(detail.value.validity_time)) {
        bool = true;
    }
    return bool;
})
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
uni-swiper-item {
    overflow: inherit; //改为默认的就行
}

.swiper-item {
    width: 144rpx;
    height: 100%;
    border-radius: var(--rounded-small);
    position: relative;
}

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
