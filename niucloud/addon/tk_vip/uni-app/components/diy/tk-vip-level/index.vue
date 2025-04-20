<template>
	<view :style="warpCss" class="overflow-hidden" v-if="info&&list && list.length">
		<view v-if="diyComponent.style == 'style-1'"
			class="flex items-center justify-between style-bg-1 py-[22rpx] px-[30rpx]">
			<view class="flex items-center">
				<image :src="img('static/resource/images/diy/member/VIP_02.png')" mode="aspectFit"
					class="w-[50rpx] h-[36rpx]" />
				<text
					class="text-[30rpx] text-[#FFDAA8] ml-[10rpx] font-500 max-w-[440rpx] truncate">{{info.member_level_name}}</text>
			</view>
			<view class="flex items-center justify-center rounded-[30rpx] box-border style-btn w-[140rpx] h-[56rpx]"
				@click="toLink('/addon/tk_vip/pages/index')">
				<text class="text-[24rpx] text-[#333]">{{ info.member_level>0 ? '去查看': '去解锁' }}</text>
				<text class="iconfont iconxiayibu1 ml-[4rpx] -mb-[2rpx] !text-[14rpx] text-[#333]"></text>
			</view>
		</view>
		<view v-if="diyComponent.style == 'style-2'" class="flex items-center justify-between style-bg-2 p-[30rpx]">
			<view class="flex flex-col">
				<view class="flex items-center">
					<image :src="img('static/resource/images/diy/member/VIP_01.png')" mode="aspectFit"
						class="w-[74rpx] h-[30rpx]" />
					<text
						class="text-[32rpx] text-[#FFE3B1] leading-[normal] ml-[14rpx] font-500 max-w-[420rpx] truncate">{{info.member_level_name}}</text>
				</view>
				<text class="text-[#FFE3B1] opacity-80 text-[24rpx] mt-[10rpx] leading-[32rpx]"
					v-if="benefits_arr && benefits_arr.length">{{info.member_level_name}}享{{benefits_arr[0].title}}权益</text>
			</view>
			<view class="flex items-center justify-center rounded-[30rpx] box-border style-btn w-[140rpx] h-[56rpx]"
				@click="toLink('/addon/tk_vip/pages/index')">
				<text class="text-[24rpx] text-[#333]">{{ info.member_level>0 ? '去查看': '去解锁' }}</text>
				<text class="iconfont iconxiayibu1 ml-[4rpx] -mb-[2rpx] !text-[14rpx] text-[#333]"></text>
			</view>
		</view>
		<view v-if="diyComponent.style == 'style-4'"
			class="flex items-center justify-between style-4 px-[24rpx] py-[20rpx]"
			:style="{'backgroundImage': 'url('+img('static/resource/images/diy/member/style4_bg.jpg')+')'}">
			<view class="flex flex-col">
				<view class="flex items-center">
					<image :src="img('static/resource/images/diy/member/style4_vip.png')" mode="aspectFit"
						class="w-[70rpx] h-[32rpx] pt-[1rpx]" />
					<text
						class="text-[30rpx] text-[#FFEFB0] leading-[normal] ml-[8rpx] font-500 max-w-[420rpx] truncate">{{info.member_level_name}}</text>
				</view>
				<view class="text-[#B0B0B0] text-[24rpx] mt-[10rpx] leading-[32rpx]"
					v-if="benefits_arr && benefits_arr.length">
					<text>{{info.member_level_name}}享</text>
					<text class="text-[#FFEFB0]">{{benefits_arr[0].title}}</text>
				</view>
			</view>
			<view class="flex items-center justify-center rounded-[30rpx] box-border style-btn w-[150rpx] h-[50rpx]"
				@click="toLink('/addon/tk_vip/pages/index')">
				<text
					class="text-[22rpx] text-[#333] mr-[8rpx]">{{ info.member_level ? (upgradeGrowth > 0 ? '去升级' : '点击查看') : '去解锁' }}</text>
				<image :src="img('static/resource/images/diy/member/style4_arrow.png')" mode="aspectFit"
					class="w-[26rpx] h-[26rpx] pt-[2rpx]" />
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { computed, ref, watch } from 'vue'
	import { img, redirect } from '@/utils/common'
	import useMemberStore from '@/stores/member'
	import { t } from '@/locale'
	import { getMemberLevel } from '@/app/api/member';
	import useDiyStore from '@/app/stores/diy'

	const props = defineProps(['component', 'index', 'pullDownRefreshCount']);
	const diyStore = useDiyStore();
	const memberStore = useMemberStore()

	const diyComponent = computed(() => {
		if (diyStore.mode == 'decorate') {
			return diyStore.value[props.index];
		} else {
			return props.component;
		}
	})

	const warpCss = computed(() => {
		var style = '';
		if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		return style;
	})

	watch(
		() => props.pullDownRefreshCount,
		(newValue, oldValue) => {
			// 处理下拉刷新业务
		}
	)

	// 获取会员等级列表
	const upgradeGrowth = ref(0) // 升级下级会员所需的成长值
	const currIndex = ref(0) //当前会员索引
	const afterCurrIndex = ref(-1)  // 下一个会员等级索引
	const benefits_arr : any = ref([]) //当前会员权益
	const wap_member_info = ref(uni.getStorageSync('wap_member_info'));
	const info : any = computed(() => {
		// 装修模式
		if (diyStore.mode == 'decorate') {
			upgradeGrowth.value = 0;
			benefits_arr.value = [{ 'title': '商品包邮' }];
			currIndex.value = 1;
			return {
				member_level_name: '会员等级',
				growth: 5
			}
		} else {
			return wap_member_info.value || {};
		}
	})
	const list : any = computed(() => {
		// 装修模式
		if (diyStore.mode == 'decorate') {
			return [{}];
		} else {
			getMemberLevelFn(memberStore.levelList)
			return memberStore.levelList
		}

	})
	const getMemberLevelFn = (list : any) => {
		if (!list || !list.length) return false;
		let isSet = false;
		// 刚进来处理会员等级数据
		if (info.value && list && list.length) {
			list.forEach((item : any, index : any) => {
				if (item.level_id == info.value.member_level) {
					currIndex.value = index + 1;
					// 会员权益
					if (item.level_benefits) {
						Object.values(item.level_benefits).forEach((bItem : any) => {
							if (bItem.content) {
								benefits_arr.value.push(bItem.content)
							}
						})
					}
				}

				if (item.growth > info.value.growth && !isSet) {
					afterCurrIndex.value = index;
					isSet = true;
				}
			})
		}

		if (info.value.member_level) {
			if (afterCurrIndex.value == -1) {
				afterCurrIndex.value = list.length - 1;
			}

			if (list[afterCurrIndex.value] && list[afterCurrIndex.value].growth) {
				upgradeGrowth.value = list[afterCurrIndex.value].growth - info.value.growth;
			}
		} else {
			// 当前会员没有会员等级，则展示会员等级中的最后一个等级
			info.value.member_level_name = list[0].level_name;
			upgradeGrowth.value = list[0].growth;
			afterCurrIndex.value = 0;
			currIndex.value = 1;
		}
	}

	// 进度条值
	let progress = () => {
		let num = 100
		if (list.value[afterCurrIndex.value] && list.value[afterCurrIndex.value].growth) {
			if (info.value.growth) {
				num = info.value.growth / list.value[afterCurrIndex.value].growth * 100
			} else {
				num = 0
			}
		}
		return num
	}

	// 跳转链接
	const toLink = (link : string) => {
		if (diyStore.mode == 'decorate') return false;
		redirect({ url: link })
	}
</script>

<style lang="scss" scoped>
	.style-bg-1 {
		background: linear-gradient(to right, #1F1313, #4D4646);
	}

	.style-btn {
		background: linear-gradient(to right, #FFEACB, #FFD195);
	}

	.style-bg-2 {
		background: linear-gradient(to right, #484846, #222222);
		border-bottom-left-radius: 320rpx 16rpx;
		border-bottom-right-radius: 320rpx 16rpx;
	}

	.style-bg-3 {
		background: linear-gradient(to right, #F9D9AC, #E9B46D);
	}

	.style-border-3 {
		position: relative;

		&:after {
			content: "";
			position: absolute;
			background: linear-gradient(to right, #F0D2A9, #DBA051);
			height: 2rpx;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
</style>