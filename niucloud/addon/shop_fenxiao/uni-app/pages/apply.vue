<template>
    <view class="bg-[var(--page-bg-color)] overflow-hidden min-h-[100vh]" :style="themeColor()" v-show="Object.values(repeatFlag).every((el) => el)">
        <template v-if="config.is_fenxiao == '0'">
            <view class="empty-page">
                <image class="img" mode="aspectFit" :src="img('addon/shop_fenxiao/inactive-fenxiao.png')" />
                <view class="desc">{{ t('fenxiaoNotOpen') }}</view>
            </view>
        </template>
        <template v-else-if="config.apply_type == 3">
            <view class="empty-page">
                <image class="img" mode="aspectFit" :src="img('addon/shop_fenxiao/unopened-fenxiao.png')" />
                <view class="desc">请联系客服成为分销商</view>
            </view>
        </template>
        <template v-else>
            <template v-if="info.status === 0 && Object.keys(config).length && config.apply_type != '3'">
                <!-- #ifdef MP-WEIXIN -->
                <view class="fixed top-0 left-0 right-0 z-10">
                    <top-tabbar :data="param" :scrollBool="topTabarObj.getScrollBool()" class="top-header" />
                </view>
                <image class="w-[100vw] min-h-[100%] h-[100%]" mode="widthFix" :src="img(config.apply_head || '')" />
                <!-- #endif -->
                <!-- #ifdef H5-->
                <image class="w-[100vw] min-h-[100%] h-[100%]" :style="screenTempStyle()" mode="widthFix" :src="img(config.apply_head || '')" />
                <!-- #endif -->
                <view
                    class="bg-[#fff] relative sidebar-margin mt-[-60rpx] rounded-[var(--rounded-big)] h-[100rpx] flex justify-between items-center px-[30rpx]">
                    <text class="text-[30rpx] font-500 text-[#333]">{{ t('referrer') }}</text>
                    <text class="text-[28rpx]" :class="{'text-[var(--text-color-light6)]': info.bindFenxiaoMember, 'text-[var(--text-color-light9)]': !info.bindFenxiaoMember}">{{ info.bindFenxiaoMember ? info.bindFenxiaoMember.nickname : t('notHave') }}</text>
                </view>

                <view class="apply-condition z-10 rounded-[var(--rounded-big)] mt-[var(--top-m)] box-border sidebar-margin"
                    v-if="['1','2','3'].indexOf(config.fenxiao_condition) > -1">
                    <view class="apply-condition-wrap z-10 rounded-[var(--rounded-big)] px-[10rpx] pb-[10rpx] box-border">
                        <view class="flex items-center justify-between min-h-[40rpx] px-[20rpx] pt-[26rpx] pb-[14rpx]">
                            <view class="text-[30rpx] font-500 text-[#fff]">申请条件</view>
                            <view class="flex items-baseline text-[26rpx] text-[#fff]" v-if="config.fenxiao_condition === '1'">
                                <text>累计消费</text>
                                <text class="text-[30rpx] price-font mx-[6rpx]">{{ config.order_count }}</text>
                                <text>次</text>
                            </view>
                            <view class="flex items-baseline text-[26rpx] text-[#fff]" v-if="config.fenxiao_condition === '2'">
                                <text>累计消费</text>
                                <text class="text-[30rpx] price-font mx-[6rpx]">{{ config.order_sum }}</text>
                                <text>元</text>
                            </view>
                            <view class="flex items-baseline text-[24rpx] text-[#fff]" v-if="config.fenxiao_condition === '3'">
                                <text>已购买</text>
                                <text class="text-[30rpx] price-font mx-[6rpx]">{{ config.goods_sum ? config.goods_sum : 0 }}</text>
                                <text>个商品</text>
                            </view>
                        </view>
                        <view class="bg-[#fff] px-[var(--pad-sidebar-m)] py-[var(--pad-top-m)] rounded-[var(--rounded-mid)]">
                            <view class="flex items-center" v-if="config.fenxiao_condition === '1'">
                                <image class="w-[32rpx] h-[32rpx] mr-[20rpx]" :src="img('addon/shop/apply/tiaojian.png')" />
                                <view class="text-[26rpx] text-[#333]">
                                    累计消费
                                    <text class="price-font text-[28rpx] mx-[5rpx]">{{ config.consume_count }}</text>
                                    次可申请分销商
                                </view>
                            </view>
                            <view class="flex items-center" v-if="config.fenxiao_condition === '2'">
                                <image class="w-[32rpx] h-[32rpx] mr-[20rpx]" :src="img('addon/shop/apply/tiaojian.png')" />
                                <view class="text-[26rpx] text-[#333]">
                                    累计消费
                                    <text class="price-font text-[28rpx] mx-[5rpx]">{{ config.consume_money }}</text>
                                    元可申请分销商
                                </view>
                            </view>
                            <template v-if="config.fenxiao_condition === '3'">
                                <view class="flex items-center pb-[10rpx]">
                                    <image class="w-[32rpx] h-[32rpx] mr-[20rpx]" :src="img('addon/shop/apply/tiaojian.png')" />
                                    <text class="text-[28rpx]">商品任选其一购买即可成为分销商</text>
                                </view>
                                <view class="flex py-[30rpx] relative fenxiao-goods-item" v-for="(item, key, index) in config.goods_list" :key="index" @click.stop="toLink(item.goods_id)">
                                    <u--image width="200rpx" height="200rpx" radius="var(--goods-rounded-big)" class="overflow-hidden" :src="img(item.goods_cover_thumb_mid ? item.goods_cover_thumb_mid : '')" model="aspectFill">
                                        <template #error>
                                            <image class="w-[200rpx] h-[200rpx] rounded-[var(--goods-rounded-big)] overflow-hidden" :src="img('static/resource/images/diy/shop_default.jpg')" mode="aspectFill" />
                                        </template>
                                    </u--image>
                                    <view class="flex flex-1 flex-col justify-between py-[6rpx] ml-[20rpx] goods-item-content">
                                        <view class="multi-hidden text-[26rpx] font-500 leading-[1.4]">{{ item.goods_name }}</view>
                                        <view class="flex items-end justify-between" v-if="item.goods_sku">
                                            <view class="text-[var(--price-text-color)] inline-block price-font leading-[1]">
                                                <text class="text-[24rpx]">￥</text>
                                                <text class="text-[40rpx]">{{ parseFloat(moneyFormat(item.goods_sku.price)).toFixed(2).toString().split('.')[0] }}</text>
                                                <text class="text-[24rpx]">.{{ parseFloat(moneyFormat(item.goods_sku.price)).toFixed(2).toString().split('.')[1] }}</text>
                                            </view>
                                            <text
                                                class=" nc-iconfont nc-icon-gouwucheV6xx6 text-[#fff] text-[28rpx] bg-[var(--primary-color)] h-[48rpx] w-[48rpx] text-center leading-[48rpx] rounded-[50rpx]"></text>
                                        </view>
                                    </view>
                                </view>
                            </template>
                        </view>
                    </view>
                </view>
                <view class="fixed btn-wrap flex justify-center flex-col bottom-[0] left-[0] right-[0] items-center bg-[#fff] py-[30rpx]">
                    <view class="w-[690rpx] h-[80rpx] text-[26rpx] rounded-[100rpx] text-center leading-[80rpx]"
                          :class="{'bg-[var(--primary-help-color4)] text-[#fff]': !Number(config.is_allow_apply), 'primary-btn-bg text-[#fff]': Number(config.is_allow_apply)}"
                          @click="save">{{ Number(config.is_allow_apply) ? '申请成为分销商' : '尚未达到申请条件' }}
                    </view>
                    <view class="flex justify-center items-baseline mt-[20rpx] -mb-[10rpx]" v-if="config.is_show_apply=='1' && config.is_allow_apply == '1'">
                        <u-checkbox-group>
                            <u-checkbox activeColor="var(--primary-color)" :checked="isAgree" shape="circle" size="14" @change="agreeChange" :customStyle="{ 'marginTop': '4rpx' }" />
                        </u-checkbox-group>
                        <view class="text-xs text-gray-400 flex items-center flex-wrap">
                            <text>我已阅读并了解</text>
                            <text @click="redirect({ url: '/app/pages/auth/agreement?key=fenxiao_service' })" class="text-primary">《分销申请协议》</text>
                        </view>
                    </view>
                </view>
                <view class="pt-[170rpx]" :class="{'h-[50rpx]': config.is_show_apply === '1'}"></view>
            </template>
            <template v-if="info.status === 1">
                <view class="empty-page">
                    <u--image class="img" width="400rpx" height="300rpx" :src="img('addon/shop_fenxiao/fenxiao.png')" model="aspectFill" />
                    <view class="desc">您已提交分销商申请，等待平台审核</view>
                </view>
            </template>

            <template v-if="info.status === 3">
                <view class="empty-page h-[auto] min-h-[710rpx] pt-[100rpx] pb-[80rpx]">
                    <text class="nc-iconfont nc-icon-cuohaoV6mm1 !text-[90rpx] text-[#c5c5c5] mb-[60rpx]"></text>
                    <view class="desc !text-[34rpx] !text-[#333]">您提交的分销商申请已被拒绝</view>
                    <view class="text-[28rpx] px-[40rpx] mt-[40rpx] leading-[1.3] text-[var(--text-color-light6)]">拒绝原因：{{ info.refuse_reason }}</view>
                    <button class="primary-btn-bg mt-[140rpx] h-[80rpx] flex-center text-[26rpx] rounded-[100rpx] w-[420rpx] text-[#fff]" hover-class="none" @click="info.status = 0">重新申请</button>
                </view>
            </template>
        </template>
        <!-- <loading-page :loading="loading"></loading-page> -->
    </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { img, redirect, moneyFormat } from '@/utils/common';
import { t } from '@/locale'
import { onShow } from '@dcloudio/uni-app'
import { getMemberInfo, getConfig, applyInfo, getCheck, apply } from '@/addon/shop_fenxiao/api/fenxiao'
import { topTabar } from '@/utils/topTabbar'

/********* 自定义头部 - start ***********/
const topTabarObj = topTabar()
let param = topTabarObj.setTopTabbarParam({ title: '分销商申请' })

/********* 自定义头部 - end ***********/
/********* 通屏 ***********/
const systemInfo = uni.getSystemInfoSync();
const screenTempStyle = () => {
    let style = "";
    // #ifdef H5
    // h5,上移的像素，采取的是平均值
    if (systemInfo.platform === 'android') {
        style = 'margin-top: -44.5px;';
    } else if (systemInfo.platform === 'ios') {
        style = 'margin-top: -55px;';
    }
    // #endif
    return style;
}
/********* 通屏 ***********/
const config: Record<string, any> = ref({})
const info: Record<string, any> = ref({})
// const loading = ref<boolean>(true)
const isAgree = ref<boolean>(false)
const repeatFlag: Record<string, any> = ref({
    memberInfo: false,
    applyInfo: false,
    config: false,
    check: false
})

const getMemberInfoFn = () => {
    getMemberInfo().then((res: any) => {
        info.value = Object.assign(info.value, res.data)
        if (info.value.is_fenxiao) {
            redirect({ url: '/addon/shop_fenxiao/pages/index', mode: 'redirectTo', param: {} })
        }
        repeatFlag.value.memberInfo = true
    }).catch(() => {
        repeatFlag.value.memberInfo = true
    })
}

const applyInfoFn = () => {
    applyInfo().then((res: any) => {
        info.value.status = res.data.status || 0
        if (info.value.status === 3) info.value.refuse_reason = res.data.refuse_reason || ''
        repeatFlag.value.applyInfo = true
    }).catch(() => {
        repeatFlag.value.applyInfo = true
    })
}
const getConfigFn = () => {
    getConfig().then((res: any) => {
        config.value = Object.assign(config.value, res.data.fenxiao_config)
        if (config.value.is_show_apply != '1') isAgree.value = true
        setTimeout(() => {
            repeatFlag.value.config = true
        }, 500)
    }).catch(() => {
        repeatFlag.value.config = true
    })
}
const getCheckFn = () => {
    getCheck().then((res: any) => {
        config.value = Object.assign(config.value, res.data.condition_data)
        // 统计已购买商品数量
        if (config.value.fenxiao_condition === '3') {
            let goodsCount = 0;
            Object.values(config.value.goods_list).forEach((item, index) => {
                if (item.is_buy) {
                    goodsCount = goodsCount + 1;
                }
            })
            config.value.goods_sum = goodsCount;
        }
        config.value.is_allow_apply = res.data.is_allow_apply
        repeatFlag.value.check = true
    }).catch(() => {
        repeatFlag.value.check = true
    })
}
onShow(() => {
    repeatFlag.value = {
        memberInfo: false,
        applyInfo: false,
        config: false,
        check: false
    }
    config.value = {}
    info.value = {}
    getMemberInfoFn()
    applyInfoFn()
    getConfigFn()
    getCheckFn()
})
const agreeChange = () => {
    isAgree.value = !isAgree.value
}
const lock = ref<boolean>(false)
const save = () => {
    if (!Number(config.value.is_allow_apply)) {
        return false
    }

    if (!isAgree.value && config.value.is_allow_apply) {
        uni.showToast({ title: '请阅读并同意《分销申请协议》', icon: 'none' })
        return false
    }

    if (lock.value) return false
    lock.value = true
    apply().then((res) => {
        lock.value = false
        repeatFlag.value = {
            memberInfo: false,
            applyInfo: false,
            config: false,
            check: false
        }
        config.value = {}
        info.value = {}
        getMemberInfoFn()
        applyInfoFn()
        getConfigFn()
        getCheckFn()
    }).catch(() => {
        lock.value = false
    })
}
const toLink = (goods_id: string) => {
    redirect({ url: '/addon/shop/pages/goods/detail', param: { goods_id } })
}
</script>
<style lang="scss" scoped>
.remove-border {
    &::after {
        border: none;
    }
}

.apply-message-title::before {
    content: "";
    display: block;
    position: absolute;
    width: 3px;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 6rpx;
    z-index: 10;
    background-color: var(--primary-color);
}

.btn-wrap {
    box-shadow: 0 -1rpx 2px 0 rgba(176, 198, 214, 0.2);
}

.application_color {
    background: linear-gradient(91deg, #EEB2AA 0%, #EE9D9A 100%), #E99490;
}

.apply-condition {
    background: linear-gradient(90deg, var(--primary-color) 0%, var(--primary-color) 100%);
}

.fenxiao-goods-item {
    .goods-item-content {
        position: relative;

        &::after {
            content: '';
            position: absolute;
            height: 2rpx;
            left: 0;
            right: 0;
            bottom: -30rpx;
            background-color: var(--temp-bg);
        }
    }

    &:last-of-type {
        padding-bottom: 0;

        &.goods-item-content::after {
            height: 0;
        }
    }
}
</style>
