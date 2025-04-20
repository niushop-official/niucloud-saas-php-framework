<template>
	<view :style="warpCss">
		<view :style="maskLayer"></view>
		<view v-if="diyStore.mode == 'decorate'" class="flex flex-wrap justify-center"
			:style="{ padding:diyComponent.padding* 2 + 'rpx', }">
			<view class="flex flex-col justify-center">
				<view>实名检查组件</view>
				<view>使用此组件会自动实名检测，未实名会强制实名</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
	import useDiyStore from '@/app/stores/diy';
	import { img, redirect } from '@/utils/common';
	import { checkRealFn } from '@/addon/tk_vip/utils/ts/common'
	const props = defineProps(['component', 'index', 'pullDownRefreshCount']);
	const diyStore = useDiyStore();
	checkRealFn()
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

</style>