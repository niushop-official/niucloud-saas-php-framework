<template>
    <view class="bg-[var(--page-bg-color)] min-h-[100vh]" :style="themeColor()">
        <template v-if="!loading">
            <view class="w-[100%] h-[960rpx] relative background-size box-border" :style="{ backgroundImage: 'url(' + img('addon/shop_fenxiao/sale-detail-header.png') + ')' }">
                <view class="absolute top-[105rpx] left-0 right-0 flex justify-center">
                    <u--image width="341rpx" height="63rpx" :src="img('addon/shop_fenxiao/sale-detail-title.png')" model="aspectFill" />
                </view>
                <view class="side-tab" @click="toRanking">
                    <text class="iconfont iconpaihangbangV6xx1 icon"></text>
                    <text class="desc">排行榜</text>
                </view>
            </view>
            <view class="py-[24rpx] px-[var(--sidebar-m)] relative mt-[-560rpx] box-border">
                <view class="w-full box-border bg-[#fff] rounded-[var(--rounded-big)] overflow-hidden">
                    <view class="bg-[#fdf6ec] px-[var(--pad-sidebar-m)] py-[30rpx]">
                        <view class="text-[30rpx] font-500 text-[#b88230] mb-[20rpx]">当前业绩</view>
                        <view class="flex items-center mb-[10rpx]">
                            <view class="text-[24rpx] text-[#b88230]">奖励周期：</view>
                            <view class="flex">
                                <view class="text-[24rpx] text-[#b88230] leading-[32rpx]">{{ detail.sale_start_time.split(' ')[0].replace(/-/g,'.') }} </view>
                                <view class="text-[24rpx] text-[#b88230]  leading-[32rpx]">-{{ detail.sale_end_time.split(' ')[0].replace(/-/g,'.') }} </view>
                            </view>
                        </view>
                        <view class="text-[24rpx]  leading-[32rpx]  text-[#b88230]  " v-if="!detail.is_settlement&& detail.diff_data.diff_order_money">再卖{{detail.diff_data.diff_order_money}}元可获得{{moneyFormat(detail.diff_data.prev_reward)}}元</view>
                    </view>
                    <view class="w-full pt-[70rpx] flex justify-between box-border">
                        <view class="w-[50%] flex-shrink-0 box-border pl-[30rpx] pr-[24rpx]">
                            <view class="text-[28rpx] text-[#333]">个人奖金（元）</view>
                            <view class="text-[50rpx] font-500 text-left mt-[20rpx] price-font">{{moneyFormat(detail.reward_money)}}</view>
                        </view>
                        <view class="w-[50%] flex-shrink-0 box-border pr-[30rpx] pl-[24rpx]">
                            <view class="text-[28rpx] text-[#333]">团队销售（元）</view>
                            <view class="text-[50rpx] font-500 text-left mt-[20rpx] price-font">{{moneyFormat(detail.order_money)}}</view>
                        </view>
                    </view>
                    <view class="w-full pt-[90rpx] pb-[40rpx] flex justify-center">
                        <button class="w-[460rpx] h-[76rpx] text-[26rpx] flex-center rounded-[100rpx] !text-[#fff] m-0 primary-btn-bg remove-border font-500" shape="circle" @click="toShop">去推广商品</button>
                    </view>
                </view>
                <view class="w-full card-template overflow-hidden top-mar">
                    <view class="text-[30rpx] leading-[42rpx] flex items-center">
                        <text class="font-500">排名奖励规则</text>
                        <text class="text-[24rpx] text-[var(--text-color-light6)] ml-[10rpx]">参与门槛: 团队销售额{{moneyFormat(detail.condition_order_money)}}元</text>
                    </view>
                    <template v-for="(item,index) in config">
                        <view class="text-[26rpx] mt-[30rpx]" :class="{'mb-[34rpx]': index != config.length}">团队销售{{item.title}} 名，奖金 {{ moneyFormat(item.reward.commission) }} 元</view>
                    </template>
                </view>
            </view>
        </template>
		<loading-page :loading="loading"></loading-page>
    </view>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import { img, redirect,moneyFormat,goback } from '@/utils/common';
import { onLoad } from '@dcloudio/uni-app'
import { getSaleMemberInfo } from '@/addon/shop_fenxiao/api/sale'
import { getConfig } from '@/addon/shop_fenxiao/api/fenxiao'

const detail: Record<string, any> = ref({})
const config = ref<Array<any>>([])
onLoad((option: any) => {
    if (option.id) {
        getSaleMemberInfoFn(Number(option.id))
    } else {
        let parameter = {
            url: '/addon/shop_fenxiao/pages/sale',
            title: '缺少销售奖励id'
        };
        goback(parameter);
    }
})

const loading = ref<boolean>(true);//页面加载动画
const getSaleMemberInfoFn = (id: number) => {
    getSaleMemberInfo(id).then((res: any) => {
        detail.value.id = id
        detail.value.is_settlement = res.data.is_settlement
        detail.value.order_money = res.data.order_money
        detail.value.reward_money = detail.value.is_settlement?res.data.reward_money:res.data.diff_data.now_reward
        detail.value.sale_start_time = res.data.sale_start_time
        detail.value.sale_end_time = res.data.sale_end_time
        if(!detail.value.is_settlement) detail.value.diff_data = res.data.diff_data
        getConfigFn()
    }).catch(() => {
        loading.value = false
    })
}

const getConfigFn = () => {
    getConfig().then((res: any) => {
        detail.value.condition_order_money = res.data.sale_config.condition.order_money
        config.value = res.data.sale_config.reward.map((el:any,index:number)=>{
            if(index){
                el.title = Number(res.data.sale_config.reward[index-1].end)+1!=Number(el.end)?'第 '+(Number(res.data.sale_config.reward[index-1].end)+1)+'-'+el.end:'第 '+el.end
            }else{
                el.title = el.end>1?'前 '+el.end:'第 '+el.end
            }
            return el
        })
        loading.value = false
    }).catch(res => {
        loading.value = false
    })
}

const toRanking = ()=>{
    redirect({ url: '/addon/shop_fenxiao/pages/sale_ranking', param: {id:detail.value.id} })
}
const toShop = ()=>{
    redirect({ url: '/addon/shop/pages/index', mode: 'reLaunch'})
}
</script>
<style lang="scss">
.remove-border{
    &::after{
        border: none;
    }
}
.background-size {
    background-size: 100% 100%;
}

</style>
