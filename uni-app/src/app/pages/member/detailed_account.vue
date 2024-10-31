<template>
	<view class="min-h-[100vh] bg-[var(--page-bg-color)]  overflow-hidden" :style="themeColor()">
		<view class="fixed left-0 right-0 top-0 z-99">
            <view class="bg-[#fff] px-[var(--sidebar-m)] py-[14rpx] flex items-center">
                <view class="search-input">
					<text class="nc-iconfont nc-icon-sousuo-duanV6xx1 btn" @click="searchTypeFn()"></text>
					<input class="input" maxlength="50" type="text" v-model="keyword"  placeholder="请输入搜索关键词" placeholderClass="text-[var(--text-color-light9)] text-[24rpx]" confirm-type="search"  @confirm="searchTypeFn()">
					<text v-if="keyword" class="nc-iconfont nc-icon-cuohaoV6xx1 clear" @click="keyword=''"></text>
                </view>
            </view>
            <view class="tab-style-1 pt-[4rpx] bg-[#fff]">
                <view class="tab-left">
                    <view class="tab-left-item" :class="{'!text-primary class-select':fromType.from_type === item.from_type && fromType.account_data_gt === item.account_data_gt}" v-for="(item,index) in accountTypeList" :key="index" @click="fromTypeFn(item,index)">{{ item.name }}</view>
                </view>
                <view class="tab-right" @click="handleSelect">
					<view class="tab-right-date">日期</view>
					<view class="nc-iconfont nc-icon-a-riliV6xx-36 tab-right-icon"></view>
				</view>
			</view>
        </view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="{ use: false }" @up="getListFn" top="152rpx">
			<view class="pt-[var(--top-m)] body-bottom" v-if="list.length">
				<view v-for="(item,index) in list" :key="item.id" class="sidebar-margin mb-[var(--top-m)] card-template relative">
					<view class="flex items-center justify-between mb-[20rpx]">
						<view class="text-[28rpx] font-500 text-[#333] leading-[40rpx]">{{item.from_type_name}}</view>
						<view class="absolute right-[30rpx] top-[30rpx] text-[36rpx] font-500 text-[#03B521] leading-[50rpx] price-font" :class="{'!text-[var(--price-text-color)]':item.account_data > 0}">{{ item.account_data > 0 ? '+' + item.account_data : item.account_data }}</view>
					</view>
					<view  class="text-[24rpx] text-[var(--text-color-light6)] mb-[14rpx]" v-if="item.memo">{{item.memo}}</view>
					<view class="text-[24rpx] text-[var(--text-color-light6)]">{{item.create_time}}</view>
				</view>
			</view>
			<mescroll-empty  :option="{tip : tip}" v-if="!list.length && loading"></mescroll-empty>
		</mescroll-body>
        <!-- 时间选择 -->
		<select-date ref="selectDateRef" @confirm="confirmFn" />
	</view>
</template>

<script setup lang="ts">
	import { ref,nextTick, reactive } from 'vue'
	import { t } from '@/locale'
	import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
	import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
	import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
	import { getBalanceList, getMoneyList, getCommissionList} from '@/app/api/member';
	import { onPageScroll, onReachBottom, onLoad, onShow } from '@dcloudio/uni-app';
    import selectDate from '@/components/select-date/select-date.vue';

	const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);

	const type = ref('')
	const tip = ref('')

	onLoad((options: any) => {
		type.value = options.type || 'balance';
        nextTick(()=>{
            setTimeout(()=>{
                if(type.value == 'balance'){
                    tip.value = t('balanceEmptyTip')
                }else if(type.value == 'money'){
                    tip.value = t('moneyEmptyTip')
                }else if(type.value == 'commission'){
                    tip.value = t('commissionEmptyTip')
                }
            },100);
        })
	});

	const keyword = ref<string>('')
	const create_time = ref([])
	//来源类型
	const fromType = ref({
		from_type:'',
		account_data_gt:''
	})
	const accountTypeList = ref([
		{name:'全部',from_type:'',account_data_gt: ''},
		{name:'佣金',from_type:'',account_data_gt: 0},
		{name:'提现',from_type:'cash_out',account_data_gt: ''},
	])
	const list = ref<Array<any>>([]),
		loading = ref<boolean>(false),
		mescrollRef = ref(null);

	interface mescrollStructure {
		num : number,
		size : number,
		endSuccess : Function,
		[propName : string] : any
	}

	const getListFn = (mescroll : mescrollStructure) => {
		loading.value = false;
		let data : Object = {
			page: mescroll.num,
			page_size: mescroll.size,
			keyword:keyword.value,
			create_time:create_time.value,
			from_type:fromType.value.from_type,
			account_data_gt: fromType.value.account_data_gt
		};
		interface acceptingDataStructure {
			data : acceptingDataItemStructure,
			msg : string,
			code : number
		}
		interface acceptingDataItemStructure {
			data : object,
			[propName : string] : number | string | object
		}

		let fnList:any = (params : any) => { };
		if (type.value == 'balance') fnList = getBalanceList;
		else if (type.value == 'money') fnList = getMoneyList;
		else if (type.value == 'commission') fnList = getCommissionList;

		fnList(data).then((res : any) => {
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

// 关键词搜索条件搜索
const searchTypeFn = () =>{
	list.value = [];
    getMescroll().resetUpScroll();
}
// 类型搜索
const fromTypeFn = (data : any ,index : number)=>{
	fromType.value.from_type = data.from_type
	fromType.value.account_data_gt = data.account_data_gt
	list.value = []
	getMescroll().resetUpScroll();
}

//日期筛选
const selectDateRef = ref()
const handleSelect = () =>{
	selectDateRef.value.show = true
}
// 确定时间筛选
const confirmFn = (data: any) =>{
	create_time.value = data;
	list.value = []
	getMescroll().resetUpScroll();
}
</script>

<style lang="scss">
 .body-bottom{
	padding-bottom:  calc(20rpx + constant(safe-area-inset-bottom));
	padding-bottom:  calc(20rpx + env(safe-area-inset-bottom));
}
</style>
