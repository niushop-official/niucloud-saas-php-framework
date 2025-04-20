<template>
    <view :style="themeColor()">
        <view class="overflow-hidden bg-[var(--page-bg-color)] min-h-[100vh] px-[var(--sidebar-m)]" v-show="!loading">
			<view class="h-[200rpx] box-border pt-[46rpx] pl-[40rpx] mt-[20rpx] rounded-angle" :style="{backgroundImage: 'url(' + img('static/resource/images/member/point/mask_group.png') + ') ',backgroundSize: '100% 100%',backgroundRepeat: 'no-repeat'}">
				<view class="leading-[36rpx] text-[#ffffff] text-[26rpx]">当前余额(元)</view>
				<view class="text-[#fff] ml-[4rpx] text-[56rpx] mt-[16rpx] price-font"  v-if="info">
					{{info ? moneyFormat(info.balance) : '0.00'}}
				</view>
			</view>
			
            <view class="top-mar card-template">
				<view class="flex items-center border-0 border-b-[2rpx] border-solid border-[var(--temp-bg)] pb-[10rpx] pl-[4rpx]">
					<view class="text-[#333] text-[28rpx] iconfont iconrenminbiV6xx price-font"></view>
                    <view class="pl-[20rpx] flex items-center flex-1">
                    	<input type="digit" class="font-500 text-[54rpx] h-[70rpx] leading-[70rpx] bg-[#fff] price-font" v-model="rechargeAmount" maxlength="7" :placeholder="rechargeAmount?'':t('customRechargeAmount')" placeholder-class="apply-price price-font"  :adjust-position="false"/>
                    </view>
				</view>
                <view class=" flex-wrap justify-between px-[10rpx]">
					<view v-for="(item,index) in settingList" :key="index"
					    :class="['flex justify-center items-center  box-border border-[1rpx] text-center rounded-[var(--goods-rounded-big)] mt-[30rpx] border-[#ccc] border-solid',{'border-none text-white':rechargeId == item.setting_id && rechargeAmount == item.amount}]"
						:style="{'background': rechargeId == item.setting_id && rechargeAmount == item.amount?'linear-gradient( 283deg, #FD3923 11%, #FF7630 100%), #FFFFFF':''}"
					    @click="chooseSetting(item)">
							<view style="width: calc(100% - 60rpx);">
								<view class="flex text-center">
									<text class="text-[36rpx] font-500 leading-[28rpx] pt-[20rpx] pb-[20rpx]">{{t('yuan')}}{{item.amount}}</text>
									
								</view>
								
								<view v-if="item.money > 0" class="flex text-center pb-[20rpx]">
									<text class="text-[20rpx]">{{t('addAmount')}}：{{t('yuan')}}{{item.money}}</text>
									
								</view>
								
								<view v-if="item.jifen > 0" class="flex text-center pb-[20rpx]">
									<text class="text-[20rpx]">{{t('addJifen')}}：{{item.jifen}}</text>
									
								</view>
								
								<view v-if="item.level_id > 0" class="flex text-center pb-[20rpx]">
									<text class="text-[20rpx]">{{t('addLevel')}}：{{item.level_name}}</text>
									
								</view>
								
							</view>
							
					</view>
                </view>
            </view>
			
			<view class="fixed bottom-[30rpx] left-0 right-0 px-[var(--sidebar-m)]">
				<button class="primary-btn-bg h-[80rpx] leading-[80rpx] text-[#fff] text-[26rpx] border-[0] font-500 rounded-[50rpx]"  hover-class="none" :loading="rechargeLoading" @click="recharge" >{{t('confirm')}}</button>
				<view class="mt-[30rpx] text-center text-[26rpx] font-500 text-primary leading-[36rpx]" @click="redirect({ url: '/addon/yk_recharge/pages/recharge_record' })">
				    {{t('rechargeRecord')}}
				</view>
			</view>
            <pay ref="payRef" @close="rechargeLoading = false"></pay>
        </view>
		<loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
    import { ref, computed} from 'vue'
    import { t } from '@/locale'
    import { redirect, img, debounce, moneyFormat } from '@/utils/common'
    import { createRecharge,getRechargeCfgList } from '@/addon/yk_recharge/api/recharge'
    import { useSubscribeMessage } from '@/hooks/useSubscribeMessage'
	import useMemberStore from '@/stores/member'
	 import {onLoad} from '@dcloudio/uni-app'

    //const rechargePackage = ref([20, 30, 50, 100, 200, 300])
    const rechargeId =  ref(0);
    const rechargeAmount = ref<string | number>("");
    const rechargeLoading = ref(false)
    const payRef = ref(null)
    const loading = ref(false);
    const cfgloading = ref(false);
	const settingList = ref([]) ;
	
	// 账户金额
	const memberStore = useMemberStore();
	const info = computed(() => memberStore.info)
	
	onLoad(() => {
	    getRechargeCfgFn()
	})
	
	const getRechargeCfgFn = () => {
	    cfgloading.value = false;
	    getRechargeCfgList().then((res:any) => {
			settingList.value = res.data;
	        cfgloading.value = true;
	    }).catch(() => {
	        cfgloading.value = true;
	    })
	}
    /**
     * 发起充值
     */
    const recharge = debounce(() => {
        if (uni.$u.test.isEmpty(rechargeAmount.value)) {
            uni.showToast({title: t('customRechargeAmount'), icon: 'none'})
            return
        }
        if (!uni.$u.test.amount(rechargeAmount.value) || rechargeAmount.value <= 0) {
            uni.showToast({title: t('rechargeAmountError'), icon: 'none'})
            return
        }
		if(rechargeId.value){
			settingList.value.forEach((item: any)=>{
				if((rechargeId.value == item.setting_id) && (parseFloat(rechargeAmount.value) != parseFloat(item.amount))){
					rechargeId.value = 0;
				}
			})
		}
        if (rechargeLoading.value) return
        rechargeLoading.value = true

        createRecharge({recharge_money: rechargeAmount.value,setting_id:rechargeId.value}).then((res:any) => {
            useSubscribeMessage().request('recharge_success')
            payRef.value?.open(res.data.trade_type, res.data.trade_id,'/app/pages/member/index')
            loading.value = false
            rechargeLoading.value = false
        }).catch(() => {
            rechargeLoading.value = false
            loading.value = false
        })
    })
	
	const chooseSetting = (item : object) => {
		rechargeAmount.value = item.amount;
		rechargeId.value = item.setting_id;
		console.log(rechargeAmount,rechargeId)
	}

</script>

<style lang="scss" scoped>
:deep(.apply-price){
    color: var(--text-color-light9);
    font-size: 26rpx;
    font-weight: normal;
    line-height: 76rpx;
}
</style>
