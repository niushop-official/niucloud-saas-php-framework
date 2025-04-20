<template>
	<view :style="themeColor()" class="bg-[var(--page-bg-color)] min-h-[100vh] overflow-hidden">
		<!-- <loading-page :loading="loading && memberInfo"></loading-page> -->
		<view v-if="!loading && memberInfo && list && list.length" class="min-h-[100vh] overflow-hidden flex flex-col"
			:style="{ backgroundColor: currLevelInfo.level_style.bg_color }">
			<!-- #ifdef MP -->
			<top-tabbar :data="topTabbarData" :scrollBool="topTabarObj.getScrollBool()" />
			<!-- #endif -->
			<view>
				<view class="pt-[40rpx] mb-[40rpx]">
					<!-- 轮播图 -->
					<view class="relative">
						<swiper class="swiper ns-indicator-dots relative" :style="{ height: '300rpx' }"
							@change="swiperChange" :current="swiperIndex" previous-margin="30rpx" next-margin="30rpx">
							<swiper-item class="swiper-item" v-for="(item, index) in list" :key="item.id">
								<view class="h-[300rpx] relative">
									<view v-if="memberInfo.member_level == item.level_id && swiperIndex == index"
										class="text-[24rpx] absolute top-0 left-0 z-10 h-[66rpx] !bg-contain w-[150rpx] flex pt-[12rpx] pl-[16rpx]  box-border"
										:style="{ background: 'url(' + img(currLevelInfo.level_tag) + ') no-repeat', color: currLevelInfo.level_style.level_color }">
										当前等级
									</view>
									<view
										class="absolute top-0 left-0 right-0 bottom-0 z-20 px-[30rpx] pt-[68rpx] box-border"
										:class="{ 'px-[50rpx]': swiperIndex != index }">
										<view class="flex items-center leading-[50rpx] mb-[90rpx]">
											<image class="h-[32rpx] w-[34rpx] align-middle"
												:src="img(item.level_icon ? item.level_icon : '')" mode="aspectFill" />
											<view class="text-[36rpx]  font-bold ml-[10rpx] max-w-[340rpx] truncate"
												:style="{ color: currLevelInfo.level_style.level_color }">
												{{ item.level_name }}
											</view>
										</view>

										<view class="flex items-baseline"
											:style="{ color: currLevelInfo.level_style.level_color }">
											<view class="text-[30rpx] font-500 leading-[38rpx]">
												会员编号:{{ memberInfo.member_no }}
											</view>

										</view>
										<view v-if="vipInfo && vipInfo.level_id > 0" class="flex items-baseline"
											:style="{ color: currLevelInfo.level_style.level_color }">

											<view class="text-[24rpx] font-500 leading-[38rpx]
											" :style="{ color: currLevelInfo.level_style.level_color }" v-if="vipInfo && vipInfo.level_id_name">
												等级:{{ vipInfo.level_id_name }}
											</view>
											<view class="text-[24rpx] font-500 leading-[38rpx] ml-2"
												:style="{ color: currLevelInfo.level_style.level_color }"
												v-if="vipInfo && dateChange(vipInfo.over_time) > Date.now()">
												{{ vipInfo.over_time }}
											</view>
											<view class="text-[24rpx] font-500 leading-[38rpx] ml-2 text-red"
												v-if="vipInfo && dateChange(vipInfo.over_time) < Date.now() && dateChange(vipInfo.over_time) > 0">
												已到期
											</view>
											<view class="text-[24rpx] font-500 leading-[38rpx] ml-2"
												:style="{ color: currLevelInfo.level_style.level_color }"
												v-if="vipInfo && vipInfo.over_time == 0">
												永久
											</view>
										</view>
										<view class="flex justify-between items-center mt-[10rpx]">
											<view class="flex flex-col flex-1">
												<view>
													<progress :percent="100" :border-radius="100"
														:activeColor="currLevelInfo.level_style.level_color"
														backgroundColor="#fff" stroke-width="4" />
												</view>
											</view>
										</view>
									</view>
									<view class="relatvie h-full w-full">
										<image class="h-full w-full" :src="img(item.level_bg)"
											:class="{ 'swiper-animation': swiperIndex != index }"
											:show-menu-by-longpress="true" />
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="mb-[30rpx] relative">
					<view class="bg-[#fff] opacity-15 h-[2rpx] w-full absolute top-[15rpx]"></view>
					<view :style="lineStyle" class="bg-[#fff] opacity-60 h-[2rpx]  absolute top-[15rpx] z-4 left-[50%]">
					</view>
					<view class="mx-[86rpx]">
						<scroll-view :scroll-x="true" scroll-with-animation
							:scroll-into-view="'id' + (levelIndex ? levelIndex - 1 : 0)">
							<view class="flex flex-nowrap py-[10rpx]">
								<block v-for="(item, index) in list" :key="item.id">
									<view :style="levelStyle"
										class=" flex-shrink-0 flex flex-col items-center justify-center"
										@click="changeLevel(index)" :id="'id' + index">
										<view class="w-[14rpx] h-[14rpx] level-class"
											:class="{ 'level-select': levelIndex == (index) }"></view>
										<view :style="maxWidth" class="text-[22rpx] text-[#aaa] mt-[16rpx] truncate"
											:class="{ '!text-[#fff]': levelIndex == (index) }">{{ item.level_name }}
										</view>
									</view>
								</block>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="flex mx-[var(--sidebar-m)] pt-[30rpx]  pb-[46rpx]  items-center flex-col level_benefits"
					:style="{ backgroundImage: 'url(' + img(currLevelInfo.member_bg) + ')' }">
					<view class="flex items-center justify-center">
						<text class="text-[#fff] text-[30rpx] font-500 leading-[44rpx]">会员权益</text>
					</view>
					<view class="flex flex-wrap w-[690rpx] mt-[40rpx] mb-8 justify-between">
						<view class="flex flex-col w-[25%] items-center"
							v-for="(item, index) in currLevelInfo.benefits_arr" :key="index">
							<image class="h-[88rpx] w-[88rpx]" :src="img(item.icon)" mode="heightFix" />
							<text class="text-[rgba(255,255,255,0.9)] mt-[16rpx] text-[24rpx] leading-[34rpx]">{{
								item.title }}</text>
						</view>
					</view>
				</view>
			</view>


			<!-- 购买sku展示 -->

			<view v-if="vipSku && vipSku.length > 0 && payStatus"
				class="flex-1 rounded-t-[40rpx] px-[30rpx] pt-[var(--pad-top-m)] mt-[-36rpx]  relative tab-bar"
				:style="{ background: `linear-gradient( 180deg, ${currLevelInfo.level_style.gift} 0%, #FFFFFF 20%)` }">
				<view class="pb-[20rpx] flex items-center">
					<text class="text-[30rpx] text-[#333] font-500 leading-[44rpx]">个性套餐</text>
				</view>
				<view @click="redirect({ url: '/addon/tk_vip/pages/real' })"
					v-if="realConfig && currLevelInfo && checkInfo && currLevelInfo.level_benefits.tk_vip_fee.is_real == 1 && realConfig.open_real == 1 && checkInfo.type != 'success'"
					class="rounded-[12rpx] text-white text-center p-2"
					:style="{ backgroundColor: currLevelInfo.level_style.bg_color }">
					<view v-if="realInfo && realInfo.status != 1">需实名认证，点击查看</view>
					<view v-else>当前等级需实名认证 点击认证</view>
				</view>
				<view class="grid grid-cols-3 p-2 md:grid-cols-3 gap-4 tk-card">
					<view v-for="(item, index) in vipSku" :key="index"
						class="relative bg-gray-100 rounded-lg hover:bg-orange-300" :style="{
							background: `linear-gradient( 180deg, ${currLevelInfo.level_style.gift} 0%, #FFFFFF 20%)`,
							border: select == index ? `2px solid ${currLevelInfo.level_style.progress[0]}` : ''
						}">
						<view @click="selectEvent(index)" class="p-1 text-center">
							<view class="tk-sltext text-gray-800 mt-1 font-bold">{{ item.name }}</view>
							<view class="price1 text-gray-900 mb-1"
								:style="{ color: currLevelInfo.level_style.progress[0] }">{{ item.price }}</view>
							<view v-if="item.over_type == 'fixed'" class="tk-sltext text-gray-400 mt-1 text-xs">
								{{ changeDate(item.over_time) }}
							</view>
							<view v-else class="tk-sltext text-gray-400 mt-1 text-xs">
								{{ item.day > 0 ? (item.price / item.day).toFixed(1) : 0 }}元/天
							</view>
						</view>
					</view>

				</view>

			</view>
		</view>
		<view class="empty-page" v-if="!loading && (!list || !list.length)">
			<image class="img" :src="img('static/resource/images/empty.png')" mode="aspectFill"></image>
			<text class="desc">暂无会员等级</text>
		</view>
		<view class="h-[240rpx]"></view>
		<view v-if="selectData && vipInfo && currLevelInfo && payStatus && (currLevelInfo.level_id >= vipInfo.level_id)"
			class="b-tabbar safe-area-inset-bottom">
			<view class="flex justify-center items-start mt-[30rpx]">
				<u-checkbox-group>
					<u-checkbox activeColor="var(--primary-color)" :checked="isAgree" shape="shape" size="14"
						@change="agreeChange" :customStyle="{ 'marginTop': '4rpx' }" />
				</u-checkbox-group>
				<view class="text-xs text-gray-400 flex flex-wrap">
					我已阅读并了解
					<view @click="redirect({ url: '/app/pages/auth/agreement?key=tk_vip_service' })">
						<text class="text-primary">《付费会员协议》</text>
					</view>
				</view>
			</view>
			<view class="b-tabbar-back" :style="{ backgroundColor: currLevelInfo.level_style.bg_color }">
				<view class="fb items-center ">
					<view class="">
						<view class="flex items-center">
							<view class="price">{{ selectData.price }}</view>
							<view class="text-white ml-2 mt-1">{{ selectData.name }}</view>
						</view>
					</view>
					<view>

					</view>
					<view
						v-if="vipInfo && currLevelInfo.level_id == vipInfo.level_id && dateChange(vipInfo.over_time) > 0"
						class="tt-bbut text-center leading-[70rpx] w-[200rpx] font-bold" @click="submitOrder('add')">
						立即续费
					</view>
					<view v-if="vipInfo && currLevelInfo.level_id == vipInfo.level_id && vipInfo.over_time == 0"
						class="tt-bbut text-center leading-[70rpx] w-[200rpx] font-bold">永久会员
					</view>
					<view v-if="!vipInfo || currLevelInfo.level_id != vipInfo.level_id || vipInfo.over_time > 0"
						class="tt-bbut text-center leading-[70rpx] w-[200rpx] font-bold" @click="submitOrder('create')">
						立即购买
					</view>
				</view>
			</view>
			<u-safe-bottom></u-safe-bottom>
		</view>
		<pay ref="payRef" @close="payLoading = false"></pay>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getTaskGrowth } from '@/app/api/member';
import { getMemberLevel, getVipInfo } from '@/addon/tk_vip/api/member';
import { createOrder } from '@/addon/tk_vip/api/order';
import { img, redirect, deepClone, getToken } from '@/utils/common';
import { getRealConfig, checkReal, getRealInfo } from '@/addon/tk_vip/api/real'
import useMemberStore from '@/stores/member'
import { topTabar } from '@/utils/topTabbar'
import { dateChange } from '@/addon/tk_vip/utils/ts/common'
import { confirm } from '@/addon/tk_vip/utils/ts/alert'
const checkInfo = ref()
checkReal().then((res) => {
	checkInfo.value = res.data
})
const realInfo = ref()
getRealInfo().then((res) => {
	realInfo.value = res.data
})
const memberStore = useMemberStore()
const loading = ref(false)
const changeDate = (dateString) => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的，所以需要加1
	const day = date.getDate().toString().padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const list = ref([]) // 会员等级
const upgradeSkills = ref([]) // 升级技巧
const swiperIndex = ref(0); //当前滑块的索引
const levelIndex = ref(0); //当前等级的索引
const vipInfo = ref()
const realConfig = ref()
getRealConfig().then((res) => {
	realConfig.value = res.data
})
const getVipInfoEvent = () => {
	getVipInfo().then((res: any) => {
		vipInfo.value = res.data
	})
}

/********* 自定义头部 - start ***********/
const topTabarObj = topTabar()
let topTabbarData = topTabarObj.setTopTabbarParam({ title: '会员等级' })
/********* 自定义头部 - end ***********/
onShow(() => {
	// 判断是否已登录
	if (getToken()) {
		getTaskGrowthFn();
		getMemberLevelFn();
		getVipInfoEvent();
	}
})

// 会员信息
const memberInfo = computed(() => {
	return memberStore.info
})

// 进度条值
const progress = (index: any) => {
	let indent = index;
	let num = 100
	if (list.value[indent] && list.value[indent].growth) {
		num = memberInfo.value.growth / list.value[indent].growth * 100
	}
	return num
}

// 所需的成长值
const upgradeGrowth = (index: any) => {
	let indent = index;
	let num = 0;
	if (list.value[indent] && list.value[indent].growth) {
		num = list.value[indent].growth - memberInfo.value.growth;
	}
	return num
}
const levelStyle = ref(''); // 等级样式
const maxWidth = ref(''); // 等级样式
const lineStyle = ref(''); // 线样式

const getMemberLevelFn = () => {
	loading.value = true;
	getMemberLevel().then((res: any) => {
		list.value = res.data || [];
		// 初始化会员等级数据
		let bool = true;
		if (memberInfo.value && list.value && list.value.length) {
			list.value.forEach((item: any, index) => {
				if (item.level_id == memberInfo.value.member_level) {
					bool = false;
					swiperIndex.value = index;
					levelIndex.value = swiperIndex.value;
					infoStructureFn(index);

				}
			})
		}
		if (bool) infoStructureFn(0);
		if (list.value && list.value.length >= 5) {
			levelStyle.value = 'width:115rpx;'
			maxWidth.value = 'max-width:115rpx;'
			lineStyle.value = `width:460rpx;transform: translateX(-235rpx);`
		} else if (list.value && list.value.length == 4) {
			levelStyle.value = 'width:144rpx;'
			maxWidth.value = 'max-width:144rpx;'
			lineStyle.value = `width:436rpx;transform: translateX(-218rpx);`
		} else if (list.value && list.value.length == 3) {
			levelStyle.value = 'width:192rpx;'
			maxWidth.value = 'max-width:192rpx;'
			lineStyle.value = `width:388rpx;transform: translateX(-194rpx);`
		} else if (list.value && list.value.length == 2) {
			levelStyle.value = 'width:289rpx;'
			maxWidth.value = 'max-width:289rpx;'
			lineStyle.value = `width:289rpx;transform: translateX(-144rpx);`
		} else {
			maxWidth.value = 'max-width:578rpx;'
			levelStyle.value = 'width:100%;'
		}
		loading.value = false;
	}).catch(() => {
		loading.value = false;
	})
}

const getTaskGrowthFn = () => {
	getTaskGrowth().then((res: any) => {
		upgradeSkills.value = res.data
	})
}

const swiperChange = (e: any) => {
	swiperIndex.value = e.detail.current;
	levelIndex.value = swiperIndex.value
	infoStructureFn(e.detail.current);

};
const isAgree = ref<boolean>(false)
const payRef = ref(null)
const payLoading = ref(false)
const agreeChange = () => {
	isAgree.value = !isAgree.value
}
const submitOrder = async (type) => {
	if (!isAgree.value) {
		uni.$u.toast('请先阅读并同意协议');
		return
	}
	//进行实名拦截  
	if (currLevelInfo.value.level_benefits.tk_vip_fee.is_real == 1 && realConfig.value.open_real == 1) {
		let real_info = await (await checkReal()).data
		if (real_info.type == 'redirect') {
			redirect({ url: real_info.page })
			return
		}
		if (real_info.type == 'msg') {
			uni.$u.toast(real_info.msg)
			return
		}

	}
	if (vipInfo.value.level_id == currLevelInfo.value.level_id && vipInfo.value.over_time == 0) {
		uni.$u.toast('已获取永久权限,不需升级');
		return
	}
	if (type == 'add' && selectData.value.over_type == 'fixed') {
		let vip = changeDate(vipInfo.value.over_time)
		let update = changeDate(selectData.value.over_time)
		if (vip == update) {
			uni.$u.toast('请等待商家更新新的周期时间');
			return
		}
		if (vip > update) {
			uni.$u.toast('当前存在更长生效周期，无需购买');
			return
		}
	}
	if (type == 'add') {
		confirm('付款成功后续费会立即生效，确定续费？', gopay, '')
	}
	if (type == 'create') {
		confirm('购买后新的权益周期将会立即生效，确定本次操作？', gopay, '')
	}


}
const gopay = async () => {
	let res = await createOrder({
		level_id: currLevelInfo.value.level_id,
		sku_info: selectData.value,
		level_index: levelIndex.value,
		sku_index: select.value
	})
	if (payRef.value && payRef.value.open) {
		await payRef.value.open(
			res.data.trade_type,
			res.data.trade_id,
			"/addon/tk_vip/pages/list"
		);
	}

}
const vipSku = ref()
const selectData = ref()
const select = ref(0)
const selectEvent = (e) => {
	select.value = e
	selectData.value = vipSku.value[e]
}
// 当前的会员等级信息
const currLevelInfo = ref<any>({});
const infoStructureFn = (index: number) => {
	let data: any = deepClone(list.value[index]);
	vipSku.value = data.level_benefits.tk_vip_fee.fee_info
	selectEvent(0)
	// 会员权益
	if (data && data.level_benefits) {
		data.benefits_arr = [];
		Object.values(data.level_benefits).forEach((item: any, index, Array) => {
			if (item.content) {
				data.benefits_arr.push(item.content)
			}
		})
	}

	// 升级礼包
	if (data && data.level_gifts) {
		data.gifts_arr = [];
		for (let key in data.level_gifts) {
			if (data.level_gifts[key].content) {
				// 增加类型
				data.level_gifts[key].content.forEach((item: any, index: any, Array: any) => {
					Array[index].type = key
				})
				data.gifts_arr = data.gifts_arr.concat(data.level_gifts[key].content);
			}
		}
	}
	currLevelInfo.value = data;
}
// 改变会员等级
const changeLevel = (index: any) => {
	levelIndex.value = index;
	swiperIndex.value = index;
	infoStructureFn(index);
}

// 判断支付窗口是否显示
// 判断条件是 用当前的窗户和当前的用户等级判断 及 判断 overtime 是否 = 0 
const payStatus = computed(() => {
	if (list.value && vipInfo.value && (list.value[levelIndex.value].level_id == vipInfo.value.level_id) && (vipInfo.value.over_time == 0) && vipInfo.value.level_id > 0) return false
	return true
})
</script>

<style lang="scss" scoped>
@import '@/addon/tk_vip/utils/styles/common.scss';

.b-tabbar {
	position: fixed;
	bottom: 12rpx;
	left: 0;
	right: 0;
	margin: 0rpx 24rpx;
	border-radius: 12rpx;
	background: linear-gradient(-175deg, rgba(255, 255, 248, 0.8) 50%, rgba(145, 12, 25, 0.3) 100%);
}

.b-tabbar-back {
	//background: linear-gradient(90deg, #292828 2%, #4B4B4A 100%);
	border-radius: 12rpx;
	// box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.1), 1px 1px 1px rgba(0, 0, 0, 0.1);
}

.tt-bbut {
	background: linear-gradient(90deg, #F8ECCF 2%, #F1DDA9 100%);
	border-radius: 8rpx;
	color: #383838;
	font-size: 28rpx;
}

.class-select {
	position: relative;
	background: #fffef3;
	border-radius: 12rpx;
	color: #F8EDB3;
	border: 4rpx solid #DDB677;
}


.title {
	color: #333333;
	font-weight: bold;
	font-size: 30rpx;
}

.price1 {
	font-weight: bold;
	font-size: 28rpx;
	color: #c8a56b;

	&::before {
		font-size: 28rpx;
		content: '￥';
	}


}

.price {
	font-weight: bold;
	font-size: 46rpx;
	color: #F8EDB3;

	&::before {
		font-size: 24rpx;
		content: '￥';
	}


}

.skill-btn {
	width: 120rpx;
	height: 54rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #333;
	background: linear-gradient(180deg, #FEE8AC 0%, #F5D36E 85%);
	border-radius: 100rpx;
	margin-left: auto;
	font-size: 22rpx;
}

.swiper-animation {
	transform: scale(0.95, 0.95);
	transition-duration: 0.3s;
	transition-timing-function: ease;
}

:deep(.uni-progress) .uni-progress-bar,
:deep(.uni-progress) .uni-progress-inner-bar {
	border-radius: 10rpx;
}

.tab-bar {
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}

.level-class {
	position: relative;

	&::before {
		content: "";
		position: absolute;
		width: 14rpx;
		height: 14rpx;
		background-color: #bbb;
		border-radius: 14rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
	}
}

.level-select {
	position: relative;

	&::after {
		content: "";
		position: absolute;
		width: 26rpx;
		height: 26rpx;
		background-color: #fff;
		opacity: 0.6;
		border-radius: 26rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	}

	&::before {
		background-color: #fff !important;
	}
}

.level_benefits {
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
</style>