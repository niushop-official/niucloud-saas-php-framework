<template>
	<view class="min-h-[100vh] bg-[var(--page-bg-color)] overflow-hidden" :style="themeColor()">
		<view class="tab-style-1 !py-[24rpx] bg-[#fff] fixed top-0 left-0 right-0 z-10" v-if="statusList">
		    <view class="tab-left">
				<view class="tab-left-item" :class="{'!text-primary class-select': activeStatus=== ''}" @click="statusItemFn('')">全部</view>		
				<block v-for="(item,index) in statusList" :key="index">
					<!-- v-if="item.status != -1" -->
		        <view class="tab-left-item" :class="{'!text-primary class-select': activeStatus=== item.status}" @click="statusItemFn(item.status)">{{ item.name }}</view>
				</block>
		    </view>
		    <view class="tab-right" @click="handleSelect">
				<view class="tab-right-date leading-[34rpx]">日期</view>
				<view class="nc-iconfont nc-icon-a-riliV6xx-36 tab-right-icon"></view>
			</view>
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="{ use: false }" @up="getListFn" top="88rpx">
			<view v-for="(order,index) in list" :key="order.order_id" class="sidebar-margin card-template mt-[var(--top-m)]" @click="toDetailFn(order)">
				<view class="flex items-center justify-between  mb-[20rpx]">
					<view class="text-[36rpx] font-500 price-font text-active">{{ order.order_money }}</view>
					<view class="leading-[38rpx] text-[26rpx]" v-if="order.order_status_info">{{ order.order_status_info.name }}</view>
				</view>
				<view class="text-[24rpx] text-[var(--text-color-light6)] mb-[10rpx] leading-[34rpx]">充值方式: {{order.item[0].item_name}}</view>
				<view class="text-[24rpx] text-[var(--text-color-light6)] mb-[10rpx] leading-[34rpx]">支付时间: {{order.create_time}}</view>
			</view>
			<mescroll-empty v-if="!list.length && loading" :option="{tip : t('emptyTip') }"></mescroll-empty>
		</mescroll-body>
		<!-- 时间选择 -->
		<select-date ref="selectDateRef" @confirm="confirmFn" />
	</view>
</template>

<script setup lang="ts">
    import {ref} from 'vue'
    import {t} from '@/locale'
	import selectDate from '@/components/select-date/select-date.vue';
    import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
    import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
    import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
    import {getRechargeList,getRechargeStatusList} from '@/addon/yk_recharge/api/recharge'
    import {redirect} from '@/utils/common'
    import {onPageScroll, onReachBottom} from '@dcloudio/uni-app'

    const {mescrollInit, downCallback, getMescroll} = useMescroll(onPageScroll, onReachBottom)
	const statusList = ref(null)
	const getRechargeStatusListFn=()=>{
		getRechargeStatusList().then((res:any)=>{
			statusList.value = res.data
		})
	}
	// 类型搜索
	const activeStatus = ref('')
	const statusItemFn = (value:any) =>{
	    activeStatus.value = value;
	    getMescroll().resetUpScroll();
	}
	//日期筛选
	const create_time = ref([])
	const selectDateRef = ref()
	const handleSelect = () =>{
		selectDateRef.value.show = true
	}
	// 确定时间筛选
	const confirmFn = (data: any) =>{
		create_time.value = data;
		getMescroll().resetUpScroll();
	}
	
	getRechargeStatusListFn()
    const list = ref<Array<any>>([]),
        loading = ref<boolean>(false),
        mescrollRef = ref(null);
	
    interface mescrollStructure {
        num: number,
        size: number,
        endSuccess: Function,
        [propName: string]: any
    }

    const getListFn = (mescroll: mescrollStructure) => {
        loading.value = false;
        let data: Object = {
            page: mescroll.num,
            page_size: mescroll.size,
			order_status: activeStatus.value,
			create_time:create_time.value,
        };

        interface acceptingDataStructure {
            data: acceptingDataItemStructure,
            msg: string,
            code: number
        }

        interface acceptingDataItemStructure {
            data: object,
            [propName: string]: number | string | object
        }

        getRechargeList(data).then((res: acceptingDataStructure) => {
            let newArr = res.data.data;
            mescroll.endSuccess(newArr.length);
            //设置列表数据
            if (mescroll.num == 1) {
                list.value = []; //如果是第一页需手动制空列表
            }
            list.value = list.value.concat(newArr);
            loading.value = true;
        }).catch(() => {
            loading.value = true;
            mescroll.endErr(); // 请求失败, 结束加载
        })
    }

    const toDetailFn = (data) => {
        redirect({url: '/addon/yk_recharge/pages/recharge_record_detail', param: {id: data.order_id}});
    }
</script>

<style lang="scss" scoped>
.text-active{
    color: #FF0D3E;
}
</style>
