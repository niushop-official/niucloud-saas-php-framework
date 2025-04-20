<template>
    <view :style="themeColor()">
        <view class="bg-[var(--page-bg-color)] min-h-[100vh]" v-if="orderData">
            <view class="pt-[var(--top-m)] sidebar-margin payment-bottom">
                <view class="mb-[var(--top-m)] card-template">
                    <view class="flex">
                        <u--image radius="var(--goods-rounded-big)" width="280rpx" height="200rpx" :src="img(orderData.goods_data.card_cover)" model="aspectFill">
                            <template #error>
                                <image v-if="orderData.goods_data.card_right_type=='balance'" class="w-[280rpx] h-[200rpx] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img('addon/shop_giftcard/diy/index/value_card.jpg')" mode="aspectFill" />
                                <image v-else class="w-[280rpx] h-[200rpx] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img('addon/shop_giftcard/diy/index/redemption_card.jpg')" mode="aspectFill" />
                            </template>
                        </u--image>
                        <view class="flex flex-1 w-0 flex-col justify-between ml-[20rpx] py-[6rpx]">
                            <view class="line-normal">
                                <view class="truncate text-[#303133] text-[28rpx] leading-[32rpx]">{{ orderData.goods_data.card_name }}</view>
                                <view v-if="orderData.goods_data.card_right_type=='balance'" class="mt-[20rpx] flex items-center justify-between">
                                    <text class="truncate text-[24rpx] text-[var(--text-color-light9)] leading-[28rpx]">{{ orderData.goods_data.balance }}{{ t('yuanStoredValueCard') }}</text>
                                </view>
                            </view>
                            <view class="flex justify-between items-baseline">
                                <view class="text-[var(--price-text-color)] flex items-baseline price-font">
                                    <text class="text-[24rpx] font-500 mr-[4rpx]">￥</text>
                                    <text class="text-[40rpx] font-500">{{ parseFloat(orderData.goods_data.card_price).toFixed(2).split('.')[0] }}</text>
                                    <text class="text-[24rpx] font-500">.{{ parseFloat(orderData.goods_data.card_price).toFixed(2).split('.')[1] }}</text>
                                </view>
                                <view class="font-400 text-[28rpx] text-[var(--text-color-light9)]">
                                    <text>x</text>
                                    <text>{{ orderData.goods_data.num }}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 购买数量 -->
                <!-- <view class="card-template mb-[var(--top-m)]">
                    <view class="card-template-item justify-between">
                        <view class="text-[28rpx] w-[150rpx] leading-[30rpx] text-[#303133]">购买数量</view>
                        <u-number-box :min="1" :max="stock" integer :step="1" input-width="68rpx" v-model="buyNum" input-height="52rpx">
                          <template #minus>
                            <text class="text-[30rpx] nc-iconfont nc-icon-jianV6xx font-500" :class="{ '!text-[var(--text-color-light9)]': buyNum <= 1 }"></text>
                          </template>
                          <template #input>
                            <input  class="text-[#303133] text-[28rpx] mx-[10rpx] w-[80rpx] h-[44rpx] bg-[var(--temp-bg)] leading-[44rpx] text-center rounded-[6rpx]" type="number" @input="goodsSkuInputFn" @blur="goodsSkuBlurFn" v-model="buyNum"  />
                          </template>
                          <template #plus>
                            <text class="text-[30rpx] nc-iconfont nc-icon-jiahaoV6xx font-500" :class="{ '!text-[var(--text-color-light9)]': buyNum >= stock }"></text>
                          </template>
                        </u-number-box>
                    </view>
                </view> -->

                <!-- 订单留言 -->
                <view class="card-template">
                    <view class="title">{{ t('orderMessage') }}</view>
                    <textarea v-model.trim="createData.member_remark"
                              class="text-[#333] leading-[1.3] w-[100%] h-[140rpx] text-[28rpx]"
                              :placeholder="t('remarkPlaceholder')" placeholder-class="text-[var(--text-color-light9)] text-[28rpx]" maxlength="200" />
                </view>

            </view>

            <u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="true" zIndex="10">
                <view class="flex-1 flex items-center justify-between pl-[30rpx] pr-[20rpx]">
                    <view class="flex items-baseline">
                        <text class="text-[26rpx] text-[#333] leading-[32rpx]">{{ t('total') }}：</text>
                        <view class="inline-block">
                            <text class="text-[26rpx] font-500 text-[var(--price-text-color)] price-font leading-[30rpx]">￥</text>
                            <text class="text-[44rpx]  font-500  text-[var(--price-text-color)] price-font leading-[46rpx]">{{ parseFloat(orderData.basic.order_money).toFixed(2).split('.')[0] }}</text>
                            <text class="text-[26rpx]  font-500  text-[var(--price-text-color)] price-font leading-[46rpx]">.{{ parseFloat(orderData.basic.order_money).toFixed(2).split('.')[1] }}</text>
                        </view>
                    </view>
                    <button class="w-[196rpx]  h-[70rpx] font-500 text-[26rpx] leading-[70rpx] !text-[#fff] m-0  rounded-full  primary-btn-bg remove-border" hover-class="none" @click="create">{{ t('placeOrder') }}</button>
                </view>
            </u-tabbar>

            <pay ref="payRef" @close="payClose" />
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@/locale'
import { orderCreateCalculate, orderCreate } from '@/addon/shop_giftcard/api/order'
import { redirect, img } from '@/utils/common'
import { useSubscribeMessage } from '@/hooks/useSubscribeMessage'

const createData: any = ref({
    order_key: '',
    member_remark: '',
    giftcard_data: {
        giftcard_id: '',
        num: 1,
        balance: '',
        material_id: ''
    }
})

// const buyNum = ref(1)
const orderData: any = ref(null)
const payRef = ref()
const createLoading = ref(false)
uni.getStorageSync('giftCardOrderCreateData') && Object.assign(createData.value, uni.getStorageSync('giftCardOrderCreateData'))

/**
 * 订单计算
 */
const calculate = () => {
    orderCreateCalculate(createData.value).then(({ data }) => {
        orderData.value = data
        createData.value.order_key = data.order_key
    }).catch()
}

calculate()

let orderId = 0

/**
 * 订单创建
 */
const create = () => {
    if (createLoading.value) return
    createLoading.value = true
    if (createData.value.member_remark.length > 200) {
        createData.value.member_remark = createData.value.member_remark.substr(0, 200);
    }

    // useSubscribeMessage().request('shop_giftcard_order_pay') // todo 暂无订阅消息模板

    orderCreate(createData.value).then(({ data }) => {
        orderId = data.order_id
        if (orderData.value.basic.order_money == 0) {
            redirect({
                url: '/addon/shop_giftcard/pages/order_detail',
                param: { order_id: orderId },
                mode: 'redirectTo'
            })
        } else {
            payRef.value?.open(data.trade_type, data.order_id, `/addon/shop_giftcard/pages/order_detail?order_id=${ data.order_id }`)
        }
    }).catch(() => {
        createLoading.value = false
    })
}

/**
 * 支付弹窗关闭
 */
const payClose = () => {
    redirect({ url: '/addon/shop_giftcard/pages/order_detail', param: { order_id: orderId }, mode: 'redirectTo' })
}
</script>

<style lang="scss" scoped>
.head-tab {
    .head-tab-item {
        .tab-image {
            left: 50%;
            transform: translateX(-50%);
        }

        &:nth-child(1).active {
            view {
                padding-right: 40rpx;
            }
        }

        &:nth-child(2) {
            .tab-image {
                width: 312rpx;
            }
        }

        &:nth-child(3).active {
            view {
                padding-left: 30rpx;
            }
        }

        &.active {
            view {
                font-weight: bold;
                color: var(--primary-color);
            }
        }

        .tab-img {
            left: 50%;
            transform: translateX(-50%);
        }

    }
}

:deep(.u-alert) {
    padding: 6rpx 16rpx !important;
    display: inline-block !important;
}

.alert-wrap {
    display: inline-block !important;

    :deep(.u-fade-enter-active) {
        display: inline-block !important;
    }
}

.text-ellipsis {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.line-normal {
    line-height: normal;
}

.bg-color {
    background: linear-gradient(94deg, var(--primary-help-color2) 0%, var(--primary-color) 69%), var(--primary-color);
}

.payment-bottom {
    padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
}
</style>
