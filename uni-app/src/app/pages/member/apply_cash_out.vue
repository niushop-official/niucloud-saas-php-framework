<template>
    <view :style="themeColor()">
		<scroll-view :scroll-y="true" class="w-screen h-screen bg-[var(--page-bg-color)]" v-if="!pageLoading && config.is_open == 1">
			<view class="sidebar-margin pt-[var(--top-m)]">
				<view class="card-template">
					<view class="font-500 text-[30rpx] text-[#333] leading-[42rpx]">{{t('cashOutMoneyTip')}}</view>
					<view class="flex pt-[30rpx] pb-[8rpx] items-center border-0 border-b-[2rpx] border-solid border-[#F1F2F5]">
						<text class="pt-[4rpx] text-[44rpx] text-[#333] iconfont iconrenminbiV6xx price-font "></text>
						<input type="digit" class="h-[76rpx] leading-[76rpx] pl-[10rpx] flex-1 font-500 text-[54rpx] bg-[#fff]" v-model="applyData.apply_money" maxlength="7" :placeholder="applyData.apply_money?'':(t('minWithdrawal') + t('currency') + moneyFormat(config.min))" placeholder-class="apply-price" :adjust-position="false"/>
						<text @click="clearMoney" v-if="applyData.apply_money" class="nc-iconfont nc-icon-cuohaoV6xx1 !text-[32rpx] text-[var(--text-color-light9)]"></text>
					</view>
					<view class="pt-[16rpx] flex items-center justify-between px-[4rpx]">
						<view class="text-[24rpx] text-[var(--text-color-light6)] leading-[36rpx]">
                            <text>{{t('money')}}：{{ t('currency') }}{{ moneyFormat(cashOutMoney) }}</text>
                            <text>，{{t('commissionTo')}}{{ config.rate + '%' }}</text>
                        </view>
						<view class="text-[24rpx] text-primary leading-[36rpx]" @click="allMoney">{{t('allTx')}}</view>
					</view>
				</view>

				<view class="mt-[20rpx] card-template">
                    <view class="font-500 text-[30rpx] text-[#333] leading-[42rpx] mb-[30rpx]">到账方式</view>
					<!-- 提现到微信 -->
					<view class="p-[20rpx] mb-[20rpx] flex items-center rounded-[var(--rounded-mid)] border-[1rpx] border-solid border-[#eee]" v-if="config.transfer_type.includes('wechatpay') && memberStore.info && (memberStore.info.wx_openid || memberStore.info.weapp_openid)"  @click="applyData.transfer_type = 'wechatpay'" :class="{'border-[#00C800] bg-[#ECF9EF]': applyData.transfer_type == 'wechatpay'}">
						<view>
                            <image class="h-[60rpx] w-[60rpx]" :src="img('static/resource/images/member/apply_withdrawal/wechat.png')" mode="widthFix" />
                        </view>
						<view class="flex-1 px-[20rpx]">
							<view class="text-[28rpx] text-[#333] leading-[40rpx] mb-[6rpx]">{{ t('cashOutToWechat') }}</view>
							<view class="text-[var(--text-color-light9)] text-[24rpx] leading-[34rpx]">{{ t('cashOutToWechatTips') }}</view>
						</view>
					</view>

					<!-- 提现到支付宝 -->
					<view class="p-[20rpx] mb-[20rpx] flex items-center rounded-[var(--rounded-mid)] border-[1rpx] border-solid border-[#eee]"  v-if="config.transfer_type.includes('alipay')" :class="{'border-[#009FE8] bg-[#EEF8FC]': applyData.transfer_type == 'alipay' && alipayAccountInfo}" >
						<view  @click="transferAlipay" >
                            <image class="h-[60rpx] w-[60rpx] align-middle" :src="img('static/resource/images/member/apply_withdrawal/alipay-icon.png')" mode="widthFix" />
                        </view>
						<view class="flex-1 px-[22rpx]"  @click="transferAlipay" >
							<view class="text-[28rpx] text-[#333] leading-[40rpx] mb-[6rpx]">{{ t('cashOutToAlipay') }}</view>
							<view class="text-[var(--text-color-light9)] text-[24rpx] leading-[34rpx]">
								<view  v-if="alipayAccountInfo" class="truncate max-w-[440rpx]">
                                    <text>{{ t('cashOutTo') }}{{ t('alipayAccountNo') }}</text>
                                    <text class="text-[#333]">{{ alipayAccountInfo.account_no }}</text> 
								</view>
								<view v-else>{{ t('cashOutToAlipayTips') }}</view>
							</view>
						</view>
						<view class="flex items-center">
							<button v-if="!alipayAccountInfo && !alipayLoading" hover-class="none" class="w-[110rpx] h-[54rpx] flex-center rounded-full p-[0] text-[var(--primary-color)] bg-transparent border-[2rpx] border-solid border-[var(--primary-color)] text-[22rpx]" @click="redirect({ url: '/app/pages/member/account', param: { type: 'alipay', mode: 'select' } , mode: 'redirectTo'})">{{t('toAdd')}}</button>
                            <text  v-else class="nc-iconfont nc-icon-youV6xx text-[28rpx] text-[var(--text-color-light9)] p-[10rpx]" @click.stop="redirect({ url: '/app/pages/member/account', param: { type: 'alipay', mode: 'select' } , mode: 'redirectTo'})"></text>
						</view>
					</view>

					<!-- 提现到银行卡 -->
					<view class="p-[20rpx] flex items-center rounded-[var(--rounded-mid)] border-[1rpx] border-solid border-[#eee]" v-if="config.transfer_type.includes('bank')" :class="{'border-[#089C98] bg-[#F6FFFF]': applyData.transfer_type == 'bank' && bankAccountInfo}">
						<view @click="transferBank" >
                            <image class="h-[42rpx] w-[60rpx] align-middle" :src="img('static/resource/images/member/apply_withdrawal/bank-icon.png')" mode="widthFix" />
						</view>
						<view class="flex-1 px-[20rpx]" @click="transferBank" >
							<view class="text-[28rpx] text-[#333] leading-[40rpx] mb-[6rpx]">{{ t('cashOutToBank') }}</view>
							<view class="text-[var(--text-color-light9)] text-[24rpx] leading-[34rpx]">
								<view v-if="bankAccountInfo" class="truncate max-w-[440rpx]">
                                    <text>{{ t('cashOutTo') }}{{ bankAccountInfo.bank_name }}{{ t('debitCard') }}</text>
									<text class="text-[#333]">{{ bankAccountInfo.account_no.substring(bankAccountInfo.account_no.length - 4) }} </text>
								</view>
								<view v-else>
									{{ t('cashOutToBankTips') }}
								</view>
							</view>
						</view>
						<view class="flex items-center">
							<button hover-class="none" class="h-[54rpx] flex-center rounded-full p-[0] w-[110rpx] text-[var(--primary-color)] bg-transparent border-[2rpx] border-solid border-[var(--primary-color)] text-[22rpx]" v-if="!bankAccountInfo && !bankLoading" @click="redirect({ url: '/app/pages/member/account', param: { type: 'bank', mode: 'select' }, mode: 'redirectTo' })">{{t('toAdd')}}</button>
							<text v-else class="nc-iconfont nc-icon-youV6xx text-[28rpx] text-[var(--text-color-light9)] p-[10rpx]" @click.stop="redirect({ url: '/app/pages/member/account', param: { type: 'bank', mode: 'select' }, mode: 'redirectTo' })"></text>
						</view>
					</view>
				</view>
				
				<view class="tab-bar-placeholder"></view>
				<view class="fixed bottom-[0] tab-bar left-0 right-0 px-[var(--sidebar-m)]">
					<button class="h-[80rpx] !text-[#fff] leading-[80rpx] primary-btn-bg rounded-[50rpx] text-[26rpx]" :disabled="applyData.apply_money == '' || applyData.apply_money == 0" :loading="loading" @click="cashOut">{{t('cashOutNow')}}</button>
					<view class="mt-[30rpx] text-center text-[26rpx] text-primary" @click.stop="redirect({ url: '/app/pages/member/cash_out'})">
						{{t('cashOutList')}}
					</view>
				</view>
				
			</view>
		</scroll-view>
        <view class="h-[100vh] w-[100vw] bg-[var(--page-bg-color)] overflow-hidden" v-if="config.is_open == 0 && !pageLoading">
            <view  class="empty-page">
                <image class="img" :src="img('addon/shop/cart-empty.png')" model="aspectFit" />
                <view class="desc">{{ t('isOpenApply') }}</view>
            </view>
		</view>
		<loading-page :loading="pageLoading"></loading-page>
    </view>
</template>

<script lang="ts" setup>
    import { ref, reactive, watch, computed } from 'vue'
    import { t } from '@/locale'
    import { moneyFormat, redirect, getToken ,img, deepClone } from '@/utils/common'
    import useMemberStore from '@/stores/member'
    import { cashOutConfig, cashOutApply, getFirstCashoutAccountInfo, getCashoutAccountInfo } from '@/app/api/member'
    import { onLoad } from '@dcloudio/uni-app'

    const pageLoading = ref(true)
    const loading = ref(false)
    const memberStore = useMemberStore()
	
    // 申请提现数据
    const applyData = reactive({
        apply_money: '',
        transfer_type: '',
        account_type: 'money',
        account_id: 0
    })

    // 可提现金额
    const cashOutMoney = computed(() => {
        return memberStore.info ? memberStore.info[ applyData.account_type ] : 0
    })

    watch(() => applyData.transfer_type, (nval) => {
        switch (nval) {
            case 'bank':
                applyData.account_id = bankAccountInfo.value ? bankAccountInfo.value.account_id : 0
                break;
            case 'alipay':
                applyData.account_id = alipayAccountInfo.value ? alipayAccountInfo.value.account_id : 0
                break;
            default:
                applyData.account_id = 0
        }
    }, { immediate: true })

    const config = reactive<AnyObject>({
        is_auto_transfer: 0, // 是否自动转账
        is_auto_verify: 0, // 是否自动审核
        is_open: 0, // 是否启用提现
        min: 0, // 最低提现金额
        rate: 0, // 手续费比率
        transfer_type: [] // 提现方式
    })

    let query:any = {}

    onLoad(async (data) => {
        query = data

        uni.getStorageSync('cashOutAccountType') && (applyData.account_type = uni.getStorageSync('cashOutAccountType'))
		
		if(getToken()){
			memberStore.getMemberInfo()
		}

        if (!['money', 'commission'].includes(applyData.account_type)) {
            uni.showToast({
                title: t('abnormalOperation'),
                icon: 'none',
                success() {
                    setTimeout(() => { 
                        if(getCurrentPages().length > 1){
                            uni.navigateBack({
                                delta: 1
                            });
                        }else{
                            redirect({
                                url: '/app/pages/member/index',
                                mode: 'reLaunch'
                            });
                        }
                    }, 1500)
                }
            })
            return
        }

        // 提现配置
        await cashOutConfig().then((res : any) => {
            for (let key in deepClone(res.data)) {
            	config[key] = deepClone(res.data[key]);
            }
            if (config.transfer_type.includes('wechatpay') && memberStore.info && (!memberStore.info.wx_openid && !memberStore.info.weapp_openid))  config.transfer_type.splice(config.transfer_type.indexOf('wechatpay'),1)
            config.transfer_type.includes('bank') && getBankAccountInfo()
            config.transfer_type.includes('alipay') && getAlipayAccountInfo()
            applyData.transfer_type = config.transfer_type[0]
			if(query.type){
                applyData.transfer_type = query.type
            }
            pageLoading.value = false
        })
    })

    //全部提现
    const allMoney = () => {
        if(parseFloat(cashOutMoney.value)) applyData.apply_money = moneyFormat(cashOutMoney.value)
    }

    // 清空提现金额
    const clearMoney = () => {
        applyData.apply_money = '';
    }

    const verify = () => {
        if (!applyData.transfer_type) {
            uni.showToast({ title: t('noAvailableCashOutType'),  icon: 'none' })
            return false
        }
        if (uni.$u.test.isEmpty(applyData.apply_money)) {
            uni.showToast({ title: t('applyMoneyPlaceholder'), icon: 'none' })
            return false
        }
        if (!uni.$u.test.amount(applyData.apply_money)) {
            uni.showToast({ title: t('moneyformatError'), icon: 'none' })
            return false
        }
        if (parseFloat(applyData.apply_money) > parseFloat(cashOutMoney.value)) {
            uni.showToast({ title: t('applyMoneyExceed'), icon: 'none' })
            return false
        }
        if (parseFloat(applyData.apply_money) < parseFloat(config.min)) {
            uni.showToast({ title: t('applyMoneyBelow'),  icon: 'none' })
            return false
        }
        return true;
    }

    /**
     * 获取支付宝提现账号信息
     */
     const alipayLoading = ref(false)
    const alipayAccountInfo:any = ref(null)
    const getAlipayAccountInfo =  () => {
        const data = { account_type: 'alipay', account_id: 0 }
        let request = getFirstCashoutAccountInfo

        if (query.type && query.type == 'alipay' && query.account_id) {
            request = getCashoutAccountInfo
            data.account_id = query.account_id
        }
        alipayLoading.value = true
        request(data).then((res: any) => {
            if (res.data && res.data.account_id) {
                alipayAccountInfo.value = res.data
                // 初始化赋值
                if(applyData.transfer_type == 'alipay' && !applyData.account_id){
                    applyData.account_id = alipayAccountInfo.value.account_id;
                }
            }
            alipayLoading.value = false
        })
    }

    /**
     * 获取银行卡提现账号信息
     */
    const bankLoading = ref(false)
    const bankAccountInfo: any = ref(null)
    const getBankAccountInfo = () => {
        const data = { account_type: 'bank', account_id: 0 }
        let request = getFirstCashoutAccountInfo

        if (query.type && query.type == 'bank' && query.account_id) {
            request = getCashoutAccountInfo
            data.account_id = query.account_id
        }
        bankLoading.value = true
        request(data).then((res: any) => {
            if (res.data && res.data.account_id) {
                bankAccountInfo.value = res.data
	            // 初始化赋值
                if(applyData.transfer_type == 'bank' && !applyData.account_id){
                    applyData.account_id = bankAccountInfo.value.account_id;
                }
            }
            bankLoading.value = false
        })
    }

    /**
     * 申请提现
     */
    const cashOut = ()=> {
        if (verify()) {
            if (loading.value) return
            loading.value = true

            cashOutApply(applyData).then(res => {
                loading.value = false
				memberStore.getMemberInfo(()=>{redirect({ url: '/app/pages/member/cash_out' })})
                
            }).catch(() => {
                loading.value = false
            })
        }
    }

    // 选中提现到支付宝
    const transferAlipay = () => {
        if(!alipayAccountInfo.value){
            uni.showToast({ title: t('cashOutToAlipayTips'), icon: 'none' })
            return false
        }
        applyData.transfer_type = 'alipay'
    }
    // 选中提现到银行卡
    const transferBank = () => {
        if(!bankAccountInfo.value){
            uni.showToast({ title: t('cashOutToBankTips'), icon: 'none' })
            return false
        }
        applyData.transfer_type = 'bank'
    }
</script>

<style lang="scss" scoped>
:deep(.apply-price){
    color: var(--text-color-light9);
    font-size: 26rpx;
    font-weight: normal;
    line-height: 76rpx;
}
.tab-bar-placeholder {
	padding-bottom: calc(constant(safe-area-inset-bottom) + 166rpx);
	padding-bottom: calc(env(safe-area-inset-bottom) + 166rpx);
}
.tab-bar {
	padding-bottom: calc(constant(safe-area-inset-bottom) + 30rpx);
	padding-bottom: calc(env(safe-area-inset-bottom) + 30rpx);
}
</style>
