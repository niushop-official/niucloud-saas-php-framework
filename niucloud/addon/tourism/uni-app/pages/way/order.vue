<template>
    <view :style="themeColor()">
        <view class="bg-[#f7f7f7] min-h-screen overflow-hidden" v-if="paymentData">
            <view class="chunk-wrap pb-2 pt-4">
                <view class="font-bold">
                    {{paymentData.goods_info.goods_name}}
                </view>
                <view class="flex justify-between items-center mt-3">
                    <view class="text-xs text-[#888]">
                        <text class="text-[#FA6400] text-[26rpx]">￥</text>
                        <text class="text-[#FA6400] text-[38rpx]">{{paymentData.order_items[0].price}}</text>
                        /人起
                    </view>
                    <view class="text-xs">出发日期：{{createData.reserve_time.split('/').join('-')}}</view>
                </view>
                <view class="flex justify-between items-center mt-3">
                    <text class="text-sm">选择人数</text>
                    <u-number-box v-model="createData.num" :max="paymentData.goods_info.stock" @change="valChange"></u-number-box>
                </view>
                <view class="flex items-center justify-between mt-5 bg-[#FFF1E7] py-[16rpx] px-[18rpx] rounded-md">
                    <text class="text-xs text-[#E02020]">{{Number(wayRefund) ? '随时可退' : '购买后不可退款'}}</text>
                    <view class="flex items-center text-[#774C33] text-xs" @click="buyInfoShow = true">
                        <text>购买须知</text>
                        <text class="nc-iconfont nc-icon-youV6xx text-[26rpx]"></text>
                    </view>
                </view>
            </view>

            <!-- 购买须知弹窗 -->
            <u-popup :show="buyInfoShow" @close="buyInfoShow = false" :closeable="true">
                <view class="text-center py-[30rpx] font-bold leading-none">
                    <text>购买须知</text>
                </view>
                <view class="pt-[28rpx] pb-[40rpx] px-[28rpx]">
                    <scroll-view class="max-h-[60vh]" :scroll-y="true">
                        <u-parse :content="buyInfoContent" :tagStyle="{img: 'vertical-align: top;'}" v-if="buyInfoContent"></u-parse>
                        <text v-else class="block px-5">暂无购买须知</text>
                    </scroll-view>
                </view>
            </u-popup>

            <view class="chunk-wrap" >
                <view class="chunk-head">
                    <text>游客信息</text>
                    <view class="text-xs">需填写<text class="text-[#FF2F11]">1</text>位，用于入园身份验证</view>
                </view>
                <view class="py-2">
                    <u--form labelPosition="left" :model="createData" ref="form" labelWidth="90" :labelStyle="{color: '#A3A3A3', fontSize: '14px'}">
                        <u-form-item label="联系姓名" prop="buyer_info.name" borderBottom>
                            <view class="border-style">
                                <u--input border="none" placeholder="请输入联系姓名" placeholderClass="text-sm" v-model="createData.buyer_info.name"></u--input>
                            </view>
                        </u-form-item>
                        <u-form-item label="手机号" prop="mobile" borderBottom>
                            <view class="border-style">
                                <u--input border="none" placeholder="请输入手机号" placeholderClass="text-sm" v-model="createData.mobile" maxlength="11"></u--input>
                            </view>
                        </u-form-item>
                        <u-form-item label="证件类型" borderBottom>
                            <view class="border-style">
                                <text class="text-sm">身份证</text>
                            </view>
                        </u-form-item>
                        <u-form-item label="证件号" prop="buyer_info.id_card" borderBottom>
                            <view class="border-style !border-0">
                                <u--input border="none" placeholder="请输入证件号" placeholderClass="text-sm"  v-model="createData.buyer_info.id_card" maxlength="18"></u--input>
                            </view>
                        </u-form-item>
                    </u--form>
                </view>
            </view>

            <!-- <view class="chunk-wrap">
                <view class="chunk-head">
                    <text>支付方式</text>
                </view>
                <view class="flex justify-between items-center h-[80rpx]">
                    <view class="flex items-center">
                        <image class="w-[42rpx] h-[42rpx]" :src="img('addon/tourism/tourism/way/discount_coupon.png')" mode="widthFix" />
                        <text class="ml-1 text-xs">微信支付</text>
                    </view>
                    <u-radio :labelDisabled="true"></u-radio>
                </view>
            </view>

            <view class="chunk-wrap">
                <view class="chunk-head">
                    <text>优惠信息</text>
                </view>
                <view class="flex justify-between items-center h-[80rpx]">
                    <view class="flex items-center">
                        <image class="w-[42rpx] h-[42rpx]" :src="img('addon/tourism/tourism/way/discount_coupon.png')" mode="widthFix" />
                        <text class="ml-1 text-xs">抵用券</text>
                    </view>
                    <text class="text-[var(--text-color-light9)] text-xs flex items-center">查看<text class="nc-iconfont nc-icon-youV6xx text-[26rpx]"></text></text>
                </view>
            </view> -->

            <view class="h-[148rpx] w-screen"></view>
            <view class="bg-white p-3 fixed bottom-0 left-0 right-0 flex items-center justify-between">
                <view class="text-[#FA6400] text-xs">
                    <text>总价</text>
                    <text class="ml-[2rpx]">￥</text>
                    <text class="text-[38rpx]">{{ paymentData.order_money.toFixed(2)}}</text>
                </view>
                <view class="ml-auto mr-2" @click="detailPopupShow = !detailPopupShow">
                    <text class="text-[#686868] text-xs mr-1">明细</text>
                    <text class="nc-iconfont nc-icon-shangV6xx-1 text-[#C2C2C2] text-xs font-bold"></text>
                </view>
                <u-button text="提交订单" color="var(--primary-color)" shape="circle" :customStyle="{lineHeight:'76rpx', margin:'0rpx', color:'#fff',width:'278rpx'}"  type="primary" size="16" :loading="createLoading"  @click="orderCreate"></u-button>
            </view>
            <u-popup :show="detailPopupShow" @close="detailPopupShow = false" :closeable="true">
                <view class="text-center py-[30rpx] font-bold leading-none">
                    <text>费用明细</text>
                </view>
                <scroll-view scroll-y="true" class="max-h-[40vh]">
                    <view class="flex px-[30rpx] mt-[20rpx]">
                        <view class="font-bold">总价</view>
                        <view class="text-right flex-1 font-bold">
                            <text class="text-sm font-normal">￥</text>
                            <text class="text-[38rpx]">{{ paymentData.order_money.toFixed(2) }}</text>
                        </view>
                    </view>
                    <view class="flex px-[30rpx] mt-[10rpx] text-sm text-gray-subtitle" v-for="(item,index) in paymentData.order_items">
                        <!-- <view>{{ item.year }}-{{ item.month }}-{{ item.day }}</view> -->
                        <view>{{ paymentData.reserve_time }} 出发</view>
                        <view class="text-right flex-1">
                            <text class="text-xs">￥</text>
                            <text>{{ item?.price }}</text>
                            <text class="mx-[10rpx]">x</text>
                            <text>{{ item.num }}</text>
                        </view>
                    </view>
                    <!-- <view class="flex px-[30rpx] mt-[10rpx] text-sm text-gray-subtitle">
                        <view>{{ paymentData.reserve_time }} 出发</view>
                        <view class="text-right flex-1"></view>
                    </view> -->
                </scroll-view>
                <view class="h-[150rpx]"></view>
            </u-popup>
        </view>
        <pay ref="payRef" @close="payClose"></pay>

        <view class="w-screen h-screen flex flex-col justify-center items-center" v-if="error">
            <u-empty :icon="img('static/resource/images/order_empty.png')" :text="error" />
            <view class="w-[240rpx] mt-[40rpx]">
                <button class="bg-[var(--primary-color)] text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[28rpx]" @click="back">返回上一页</button>
            </view>
        </view>
		<loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
	import { ref, computed, toRaw } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { wayOrderConfirm, wayOrderCalculate, wayOrderCreate, wayRefundConfig } from '@/addon/tourism/api/tourism'
    import { useSubscribeMessage } from '@/hooks/useSubscribeMessage'
    import { redirect } from '@/utils/common'

	const valChange = (val)=>{
		createData.value.num = val.value;
		orderCalculate();
	}
	const form = ref(null)
	const payRef = ref(null)
	const loading = ref(true)
	const error = ref('')
	const createData = ref<wayOrderCreareOptions>(uni.getStorageSync('wayCreateData') || {})

	const paymentData = ref<AnyObject | null>(null)
	const detailPopupShow = ref(false)

	//购买须知
	const buyInfoShow = ref(false);
	const buyInfoContent = ref('');

	onLoad(() => {
	    wayOrderConfirm(createData.value).then(({ data }) => {
	        loading.value = false
	        paymentData.value = data
			buyInfoContent.value = data.goods_info.buy_info;
	        handleCreateData()
	    }).catch(err => {
	        error.value = err.msg
	        loading.value = false
	    })
	})

	/**
	 * 订单计算
	 */
	const orderCalculate = ()=> {
	    loading.value = true
	    wayOrderCalculate(createData.value).then(({ data }) => {
	        paymentData.value = data
			// paymentData.value.reserve_time = dayFormat(paymentData.value?.reserve_time)
	        loading.value = false
	    }).catch(err => {
	        loading.value = false
	        uni.showToast({ title: err.msg, icon: 'none' })
	    })
	}

	const createLoading = ref(false)
	const orderCreate = ()=> {
	    if (createVerify()) {
	        if (createLoading.value) return
			createLoading.value = true

			const data = uni.$u.deepClone(toRaw(createData.value))
			data.buyer_info = JSON.stringify(data.buyer_info)

			wayOrderCreate(data).then(({ data }) => {
				useSubscribeMessage().request('tourism_order_pay,tourism_order_auto_close,tourism_order_use_remind')
				payRef.value?.open(data.trade_type, data.trade_id, `/addon/tourism/pages/order/detail?order_id=${data.trade_id}`)
				createLoading.value = false
			}).catch(err => {
				createLoading.value = false
				uni.showToast({ title: err.msg, icon: 'none' })
			})

	    }
	}


	// 退款设置
	let wayRefund = ref("0");
	const wayRefundConfigFn = ()=> {
	    wayRefundConfig().then((res) => {
			wayRefund.value = res.data.is_allow_refund;
	    })
	}
	wayRefundConfigFn();

	const createVerify = () => {
		const item = createData.value.buyer_info
		if (uni.$u.test.isEmpty(item.name)) {
			uni.showToast({ title: '请输入联系人姓名', icon: 'none' })
			return false;
		}

	    if (uni.$u.test.isEmpty(createData.value.mobile)) {
	        uni.showToast({ title: '请输入手机号', icon: 'none' })
	        return false
	    }
		let mobile = /^1[3-9]\d{9}$/;
	    if (!mobile.test(createData.value.mobile)) {
	        uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
	        return false
	    }

		if (uni.$u.test.isEmpty(item.id_card)) {
			uni.showToast({ title: '请输入身份证号', icon: 'none' })
			return false;
		}

		let idreg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		if (!idreg.test(item.id_card)) {
		    uni.showToast({ title: '请输入正确的身份证号', icon: 'none' })
		    return false;
		}

	    return true
	}

	const handleCreateData = ()=> {
	    createData.value.buyer_info = {
			name: '',
			id_card: ''
		}
	    createData.value.mobile = ''
	    paymentData.value.reserve_time = dayFormat(paymentData.value?.reserve_time)
	}

	const goodsAttribute = computed(() => {
	    return paymentData.value ? paymentData.value.goods_info.goods_attribute.split(',') : []
	})

	const timeFormat = (date: string) => {
	    const time = new Date(date)
	    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
	    return uni.$u.timeFormat(time, 'mm月dd日 ') + week[ time.getDay() ]
	}
	const dayFormat = (date: string) => {
	    const time = new Date(date)
	    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
	    return uni.$u.timeFormat(time, 'yyyy-mm-dd ') + week[ time.getDay() ]
	}
	const payClose = ()=> {
        redirect({ url: '/addon/tourism/pages/order/list', mode: 'redirectTo' })
    }

	const back = () => {
	    if(getCurrentPages().length > 1){
            uni.navigateBack({
                delta: 1
            });
        }else{
            redirect({
                url: '/addon/tourism/pages/index',
                mode: 'reLaunch'
            });
        }
	}
</script>

<style lang="scss" scoped>
	.chunk-wrap{
		@apply bg-white px-4 mb-2;
		.chunk-head{
			height: 84rpx;
			@apply flex justify-between items-center border-0 border-b border-solid border-[#F2F2F2] box-border;
			text{
				&:first-of-type{
					@apply font-bold;
				}
				// &:last-of-type{
				// 	@apply text-xs text-[var(--text-color-light9)];
				// }
				.iconfont{
					@apply inline-block;
					margin-left: 2rpx;
				}
			}
		}
	}
	.border-style{
		@apply border-0 border-b-1 border-solid border-[#F2F2F2] '!rounded-none' py-2;
	}
	.chunk-wrap{
		:deep(.u-form-item__body){
			flex: 1;
			padding: 0 !important;
			.u-form-item__body__right__content__slot > view{
				flex: 1;
			}
		}
	}
</style>
