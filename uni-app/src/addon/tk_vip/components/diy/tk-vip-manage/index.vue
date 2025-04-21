<template>
	<view :style="warpCss">
		<view :style="maskLayer"></view>
		<view v-if="diyStore.mode == 'decorate'" class="flex flex-wrap justify-center"
			:style="{ padding:diyComponent.padding* 2 + 'rpx', }">
			<image v-if="diyComponent.imageUrl" :src="img(diyComponent.imageUrl)"
				:style="{height: diyComponent.imageHeight+'rpx',borderRadius:diyComponent.imageRadius+'rpx'}"
				mode="aspectFill" class="!w-full" :show-menu-by-longpress="true" />
			<image v-else :src="img('static/resource/images/diy/figure.png')"
				:style="{height: diyComponent.imageHeight+'rpx',borderRadius:diyComponent.imageRadius+'rpx'}"
				mode="aspectFill" class="!w-full" :show-menu-by-longpress="true" />
		</view>
		<!-- #ifdef H5 -->
		<view v-if="diyStore.mode != 'decorate'&&isshow==true" @click="redirect({url:'/addon/tk_vip/pages/manage'})"
			class="flex flex-wrap justify-center" :style="{ padding:diyComponent.padding* 2 + 'rpx', }">
			<image v-if="diyComponent.imageUrl" :src="img(diyComponent.imageUrl)"
				:style="{height: diyComponent.imageHeight+'rpx',borderRadius:diyComponent.imageRadius+'rpx'}"
				mode="aspectFill" class="!w-full" :show-menu-by-longpress="true" />
			<image v-else :src="img('static/resource/images/diy/figure.png')"
				:style="{height: diyComponent.imageHeight+'rpx',borderRadius:diyComponent.imageRadius+'rpx'}"
				mode="aspectFill" class="!w-full" :show-menu-by-longpress="true" />
		</view>
		<!-- #endif -->
		<!-- #ifdef MP -->
		<view v-if="isshow==true" @click="redirect({url:'/addon/tk_vip/pages/manage'})"
			class="flex flex-wrap justify-center" :style="{ padding:diyComponent.padding* 2 + 'rpx', }">
			<image v-if="diyComponent.imageUrl" :src="img(diyComponent.imageUrl)"
				:style="{height: diyComponent.imageHeight+'rpx',borderRadius:diyComponent.imageRadius+'rpx'}"
				mode="aspectFill" class="!w-full" :show-menu-by-longpress="true" />
			<image v-else :src="img('static/resource/images/diy/figure.png')"
				:style="{height: diyComponent.imageHeight+'rpx',borderRadius:diyComponent.imageRadius+'rpx'}"
				mode="aspectFill" class="!w-full" :show-menu-by-longpress="true" />
		</view>
		<!-- #endif -->
	</view>
</template>

<script setup lang="ts">
	import { ref, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
	import useDiyStore from '@/app/stores/diy';
	import { img, redirect } from '@/utils/common';
	import { getCheckVerifier } from '@/app/api/verify'
	const isshow = ref(false)
	const checkEvent = async () => {
		getCheckVerifier().then((res : any) => {
			if (!res.data) {
				isshow.value = false
			} else {
				isshow.value = true
			}
		})
	}
	checkEvent()
	const props = defineProps(['component', 'index', 'pullDownRefreshCount']);
	const diyStore = useDiyStore();

	const diyComponent = computed(() => {
		if (diyStore.mode == 'decorate') {
			return diyStore.value[props.index];
		} else {
			return props.component;
		}
	})

	const warpCss = computed(() => {
		var style = '';
		style += 'position:relative;';
		if (diyComponent.value.componentStartBgColor) {
			if (diyComponent.value.componentStartBgColor && diyComponent.value.componentEndBgColor) style += `background:linear-gradient(${diyComponent.value.componentGradientAngle},${diyComponent.value.componentStartBgColor},${diyComponent.value.componentEndBgColor});`;
			else style += 'background-color:' + diyComponent.value.componentStartBgColor + ';';
		}

		if (diyComponent.value.componentBgUrl) {
			style += `background-image:url('${img(diyComponent.value.componentBgUrl)}');`;
			style += 'background-size: cover;background-repeat: no-repeat;';
		}

		if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		return style;
	})

	// 背景图加遮罩层
	const maskLayer = computed(() => {
		var style = '';
		if (diyComponent.value.componentBgUrl) {
			style += 'position:absolute;top:0;width:100%;';
			style += `background: rgba(0,0,0,${diyComponent.value.componentBgAlpha / 10});`;
			style += `height:${height.value}px;`;

			if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
			if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
			if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
			if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		}

		return style;
	});

	watch(
		() => props.pullDownRefreshCount,
		(newValue, oldValue) => {
			// 处理下拉刷新业务
		}
	)

	onMounted(() => {
		refresh();
		// 装修模式下刷新
		if (diyStore.mode == 'decorate') {
			watch(
				() => diyComponent.value,
				(newValue, oldValue) => {
					if (newValue && newValue.componentName == 'RichText') {
						refresh();
					}
				}
			)
		}
	});

	const instance = getCurrentInstance();
	const height = ref(0)

	const refresh = () => {
		nextTick(() => {
			const query = uni.createSelectorQuery().in(instance);
			query.select('.diy-rich-text').boundingClientRect((data : any) => {
				height.value = data.height;
			}).exec();
		})
	}
</script>

<style lang="scss" scoped>
	@import '@/addon/tk_vip/utils/styles/common.scss';

	.class-select {
		padding: 0rpx 20rpx;
		color: #2EA7E0;
		background: #E7F3FF;
		border-color: #B4DEF7;
	}

	.bottom {
		justify-content: space-between;
	}

	.price {
		color: #FF3D3D;
		font-size: 36rpx;
		font-weight: bold;

		&::before {
			content: '￥';
			font-size: 18rpx;
		}

		&::after {
			content: '起';
			font-size: 18rpx;
		}
	}

	.content {
		margin: 0 30rpx;
		background: white;
		border-radius: 24rpx;
		margin-top: 30rpx;
	}

	.goods {
		display: flex;
		padding-top: 24rpx;
		padding-left: 20rpx;
		justify-content: space-between;

		.cover {
			width: 180rpx;
			height: 180rpx;
			border-radius: 20rpx;
		}

		.details {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 204rpx;
			width: 416rpx;
			padding-right: 24rpx;
			padding-bottom: 24rpx;
			border-bottom: 2rpx solid #F2F2F2;
		}

		.title {
			width: 100%;
			font-weight: bold;
			font-size: 32rpx;
			color: #333333;
			line-height: 38rpx;
		}

		.bottom {
			justify-content: space-between;
		}

		.price {
			color: #FF3D3D;
			font-size: 36rpx;
			font-weight: bold;

			&::before {
				content: '￥';
				font-size: 24rpx;
			}

			&::after {
				content: '起';
				font-size: 24rpx;
			}
		}

		.buttton {

			overflow: hidden;
			display: flex;

			view {
				width: 112rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
			}

			.left {
				color: #2EA7E0;
				background: #E9F4FF;
			}

			.right {
				color: white;
				background: #2EA7E0;
				padding: 0 40rpx;
				border-radius: 40rpx;
			}

		}
	}

	.tk-card {
		background-color: rgba(255, 255, 255, 0.9);
		margin: 12rpx;
		border-radius: 12rpx;

		bbbox-shadow: 0 1px 1px 0 rgba(234, 234, 234, 0.2), 0 2px 2px 0 rgba(231, 231, 231, 0.2);
	}
</style>