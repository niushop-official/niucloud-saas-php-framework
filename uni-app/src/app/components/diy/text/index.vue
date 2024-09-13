<template>
	<view :style="warpCss">
		<view :style="maskLayer"></view>
		<view class="diy-text relative">
			<view v-if="diyComponent.style == 'style-1'" class="px-[var(--pad-sidebar-m)]">
				<view @click="diyStore.toRedirect(diyComponent.link)">
					<view class="leading-[1]" :style="{
							fontSize: diyComponent.fontSize * 2 + 'rpx',
							color: diyComponent.textColor,
							fontWeight: (diyComponent.fontWeight == 'normal' ? 500 : diyComponent.fontWeight),
							textAlign : diyComponent.textAlign
						}">
						{{ diyComponent.text }}
					</view>
				</view>
			</view>
			<view v-if="diyComponent.style == 'style-2'" class=" px-[20rpx] flex items-center">
				<view @click="diyStore.toRedirect(diyComponent.link)">
					<view class="max-w-[200rpx] truncate leading-[1]" :style="{
							fontSize: diyComponent.fontSize * 2 + 'rpx',
							color: diyComponent.textColor,
							fontWeight: (diyComponent.fontWeight == 'normal' ? 500 : diyComponent.fontWeight)
						}">
						{{ diyComponent.text }}
					</view>
				</view>
				<text v-if="diyComponent.subTitle.text" :style="{background: diyComponent.subTitle.color}" class="mx-[10rpx] w-[2rpx] h-[24rpx] opacity-70"></text>
				<text class="max-w-[300rpx] truncate" :style="{ color: diyComponent.subTitle.color, fontSize: diyComponent.subTitle.fontSize * 2 + 'rpx', }">{{ diyComponent.subTitle.text }}</text>
				<view class="ml-auto text-right " v-if="diyComponent.more.isShow" :style="{ color: diyComponent.more.color }">
					<view @click="diyStore.toRedirect(diyComponent.more.link)" class="flex items-center">
						<text class="max-w-[200rpx] truncate text-[26rpx]">{{ diyComponent.more.text }}</text>
						<text class="nc-iconfont nc-icon-youV6xx text-[24rpx]" :style="{ color: diyComponent.more.color }"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	// 标题
	import { ref, computed, watch,onMounted,nextTick,getCurrentInstance } from 'vue';
	import useDiyStore from '@/app/stores/diy';
    import { img } from '@/utils/common';

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
        if(diyComponent.value.componentStartBgColor) {
            if (diyComponent.value.componentStartBgColor && diyComponent.value.componentEndBgColor) style += `background:linear-gradient(${diyComponent.value.componentGradientAngle},${diyComponent.value.componentStartBgColor},${diyComponent.value.componentEndBgColor});`;
            else style += 'background-color:' + diyComponent.value.componentStartBgColor + ';';
        }

        if(diyComponent.value.componentBgUrl) {
            style += `background-image:url('${ img(diyComponent.value.componentBgUrl) }');`;
            style += 'background-size: cover;background-repeat: no-repeat;';
        }

		if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		return style;
	})

    // 背景图加遮罩层
    const maskLayer = computed(()=>{
        var style = '';
        if(diyComponent.value.componentBgUrl) {
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
                    if (newValue && newValue.componentName == 'Text') {
                        refresh();
                    }
                }
            )
        }
    });

    const instance = getCurrentInstance();
    const height = ref(0)

    const refresh = ()=> {
        nextTick(() => {
            const query = uni.createSelectorQuery().in(instance);
            query.select('.diy-text').boundingClientRect((data: any) => {
                height.value = data.height;
            }).exec();
        })
    }
</script>

<style lang="scss" scoped>
</style>
