<template>
    <view :style="themeColor()">
        <scroll-view scroll-y="true" class="w-screen h-screen bg-page" v-if="!loading">
            <view class="bg-[#fff] min-h-screen box-border overflow-hidden" v-if="Object.keys(technicianStat).length && Object.keys(technicianInfo).length">
                <view class="h-[552rpx] px-[30rpx] pt-[114rpx] box-border" :style="{ 'background-image': 'url(' + img('addon/o2o/technician/bg.png') + ')', 'background-size': '100%' }">
                    <view class="flex items-center">
                        <u--image
                            width="120rpx"
                            height="120rpx"
                            :src="img(technicianInfo.headimg ? technicianInfo.headimg : '')"
                            model="aspectFill"
                            shape="circle"
                            class="border-[#fff] border-[4rpx] border-solid rounded-full">
                            <template #error>
                                <image class="w-[120rpx] h-[120rpx] border-[#fff] border-[4rpx] border-solid rounded-full" :src="img('addon/o2o/technician/user.png')" />
                            </template>
                        </u--image>
                        <view class="flex-1 flex flex-col ml-[16rpx]">
                            <view>
                                <text class="text-[30rpx] font-bold text-[#ffffff] leading-[35rpx]">{{ technicianInfo.name }}</text>
                                <text class="ml-[8rpx] text-[18rpx] text-[#fff] leading-[21rpx]">{{ technicianInfo.position_name }}</text>
                            </view>
                            <view class="flex items-center mt-[14rpx] flex-wrap">
                                <template v-for="(item, index) in technicianInfo.label" :key="index">
                                    <view class="flex items-center bg-[#fff] py-[4rpx] pl-[7rpx] pr-[17rpx] rounded-full border-[1rpx] border-solid border-[#E18547] mr-[10px]">
                                        <image style="width: 16rpx; height: 16rpx" mode="aspectFill" :src="img('addon/o2o/technician/label.png')" />
                                        <text class="text-[16rpx] text-[var(--text-color-light6)] leading-[16rpx] ml-[5rpx]">{{ item }}</text>
                                    </view>
                                </template>
                            </view>
                        </view>
                    </view>
                    <view class="flex items-center mt-[20rpx] bg-[#ffffff] rounded-[16rpx] opacity-90 box-border">
                        <view class="flex items-center justify-between py-[20rpx] pl-[30rpx] pr-[24rpx] flex-1">
                            <view>
                                <view class="text-[36rpx] font-bold text-[#333] leading-[42rpx]" style="text-align: center">{{ technicianStat.status.all.num }}</view>
                                <view class="m-[6rpx] text-[24rpx] text-[var(--text-color-light6)] leading-[28rpx]">{{ t('orderNum') }}</view>
                            </view>
                            <image style="width: 84rpx; height: 84rpx" mode="aspectFill" :src="img('addon/o2o/technician/ordernum.png')" />
                        </view>
                        <view class="w-[1rpx] h-[80rpx] bg-[#D9D9D9]"></view>
                        <view class="flex items-center justify-between py-[20rpx] pl-[30rpx] pr-[24rpx] flex-1">
                            <view>
                                <view class="text-[36rpx] font-bold text-[#333] leading-[42rpx]" style="text-align: center">{{ technicianStat.order }}</view>
                                <view class="m-[6rpx] text-[24rpx] text-[var(--text-color-light6)] leading-[28rpx]">{{ t('orderAmount') }}</view>
                            </view>
                            <image style="width: 84rpx; height: 84rpx" mode="aspectFill" :src="img('addon/o2o/technician/ordermoney.png')"/>
                        </view>
                    </view>
                </view>
                <view class="p-[20rpx] bg-[#fff] mx-[30rpx] mt-[-150rpx] rounded-[10rpx]">
                    <view class="flex items-center justify-between mb-[30rpx]">
                        <text class="text-[32rpx] font-bold text-[#333] leading-[38rpx]">{{ t('orderManagement') }}</text>
                        <view class="flex items-center" @click="redirect({ url: '/addon/o2o/pages/master/task/list' })">
                            <text class="text-[var(--text-color-light9)] text-[24rpx]">{{ t('viewMore') }}</text>
                            <u-icon name="arrow-right" color="#999" size="24rpx"></u-icon>
                        </view>
                    </view>
                    <view class="flex flex-wrap justify-between">
                        <view class="p-[20rpx] w-[315rpx] box-border mb-[20rpx]"
                            :style="{ 'background-image': 'url(' + img('addon/o2o/technician/waitservice.png') + ')', 'background-size': '100%' }"
                            @click="redirect({ url: '/addon/o2o/pages/master/task/list', param: { order_status: 'wait_service' } })">
                            <view class="text-[32rpx] font-bold text-[#725200] leading-[38rpx] mb-[20rpx]">{{ t('pendingOrder') }}</view>
                            <view class="text-[26rpx] text-[#A89157] leading-[30rpx] mb-[40rpx]">{{ t('amount') }}{{ technicianStat.status.wait_service.num }}</view>
                            <view class="flex text-[#fff] text-[20rpx] font-bold leading-[23rpx]">
                                <text class="bg-wait rounded-full px-[20rpx] py-[4rpx]">{{ t('viewDetails') }}</text>
                            </view>
                        </view>
                        <view class="p-[20rpx] w-[315rpx] box-border mb-[20rpx]"
                            :style="{ 'background-image': 'url(' + img('addon/o2o/technician/inservice.png') + ')', 'background-size': '100%' }"
                            @click="redirect({ url: '/addon/o2o/pages/master/task/list', param: { order_status: 'in_service' } })">
                            <view class="text-[32rpx] font-bold text-[#014F17] leading-[38rpx] mb-[20rpx]">{{ t('orderInService') }}</view>
                            <view class="text-[26rpx] text-[#5EAC7D] leading-[30rpx] mb-[40rpx]">{{ t('amount') }}{{ technicianStat.status.in_service.num }}</view>
                            <view class="flex text-[#fff] text-[20rpx] font-bold leading-[23rpx]">
                                <text class="bg-service rounded-full px-[20rpx] py-[4rpx]">{{ t('viewDetails') }}</text>
                            </view>
                        </view>
                        <view class="p-[20rpx] w-[315rpx] box-border"
                            :style="{ 'background-image': 'url(' + img('addon/o2o/technician/finish.png') + ')', 'background-size': '100%' }"
                            @click="redirect({ url: '/addon/o2o/pages/master/task/list', param: { order_status: 'finish' } })">
                            <view class="text-[32rpx] font-bold text-[#0C596A ] leading-[38rpx] mb-[20rpx]">{{ t('finishedOrder') }}</view>
                            <view class="text-[26rpx] text-[#4B929B ] leading-[30rpx] mb-[40rpx]">{{ t('amount') }}{{ technicianStat.status.finish.num }}</view>
                            <view class="flex text-[#fff] text-[20rpx] font-bold leading-[23rpx]">
                                <text class="bg-finish rounded-full px-[20rpx] py-[4rpx]">{{ t('viewDetails') }}</text>
                            </view>
                        </view>
                        <view class="p-[20rpx] w-[315rpx] box-border"
                            :style="{ 'background-image': 'url(' + img('addon/o2o/technician/serviceitem.png') + ')', 'background-size': '100%' }"
                            @click="redirect({ url: '/addon/o2o/pages/technician/detail', param: { id: technicianInfo.id } })">
                            <view class="text-[32rpx] font-bold text-[#8C3700] leading-[38rpx] mb-[20rpx]">{{ t('serviceItem') }}</view>
                            <view class="text-[26rpx] text-[#9F6137] leading-[30rpx] mb-[40rpx]">{{ t('amount') }}{{ technicianInfo.goods.length }}</view>
                            <view class="flex text-[#fff] text-[20rpx] font-bold leading-[23rpx]">
                                <text class="bg-item rounded-full px-[20rpx] py-[4rpx]">{{ t('viewDetails') }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>

        <loading-page :loading="loading"></loading-page>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@/locale'
import { redirect, img } from '@/utils/common'
import { getStat } from '@/addon/o2o/api/o2o'
import { checkTechnician, getTechnicianDetail } from '@/addon/o2o/api/technician'
import { onShow } from '@dcloudio/uni-app'

const loading = ref(false)
const technicianId = ref(0)
const technicianStat = ref({})
const technicianInfo = ref({})
// 统计
const getStatFn = () => {
    getStat().then((res) => {
        technicianStat.value = res.data
    }).catch(() => {
    })
}
// 技师详情
const getTechnicianDetailFn = (id) => {
    getTechnicianDetail(id).then((res) => {
        technicianInfo.value = res.data
        if (technicianInfo.value.label != '') {
            technicianInfo.value.label = technicianInfo.value.label.split(',')
        } else {
            technicianInfo.value.label = []
        }
    }).catch(() => {
    })
}

const checkTechnicianFn = () => {
    loading.value = true
    checkTechnician().then((res) => {
        if (JSON.stringify(res.data) == '[]') {
            redirect({ url: '/addon/o2o/pages/index', mode: 'reLaunch' })
        } else {
            technicianId.value = res.data.id
            getStatFn()
            getTechnicianDetailFn(technicianId.value)
        }
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}

onShow(()=>{
	checkTechnicianFn()
})

// 跳转商品详情
const toLink = (goods_id: any) => {
    redirect({ url: '/addon/o2o/pages/goods/detail', param: { goods_id } })
}
</script>

<style lang="scss" scoped>
.bg-wait {
    background: linear-gradient(90deg, #eec356 0%, #edb015 100%);
}

.bg-service {
    background: linear-gradient(90deg, #65d089 0%, #3abe57 100%);
}

.bg-finish {
    background: linear-gradient(90deg, #5bc1cf 0%, #26b2c5 100%);
}

.bg-item {
    background: linear-gradient(90deg, #f19b62 0%, #f46100 100%);
}
</style>
