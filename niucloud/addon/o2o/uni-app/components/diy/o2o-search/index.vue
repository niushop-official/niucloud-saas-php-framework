<template>
	<view :style="warpCss">
		<view :style="maskLayer"></view>
		<view class="diy-o2o-search relative overflow-hidden flex items-center">
			<template  v-if="diyComponent.style == 'style1'">
				<view class="flex-1 flex items-center py-[12rpx] px-[30rpx] justify-between input-class" :style="{
						borderRadius: diyComponent.border_radius == 'square' ? '0rpx' : '84rpx',
						backgroundColor: diyComponent.bg_color,
						color:diyComponent.text_color}">
					<u--input v-model="searchName" border="none" :placeholder="diyComponent.search_text"  :color="diyComponent.text_color"
					:placeholderStyle='{color:diyComponent.text_color}' fontSize="24rpx"></u--input>
					<text class="nc-iconfont nc-icon-sousuo-duanV6xx1" @click="toLink"></text>
				</view>
			</template>
			<template v-if="diyComponent.style == 'style2'">
				<view class="flex-1 flex items-center py-[12rpx] px-[30rpx] justify-between " :style="{
						borderRadius: diyComponent.border_radius == 'square' ? '0rpx' : '84rpx',
						backgroundColor: diyComponent.bg_color,
						color:diyComponent.text_color}">
					<text class="nc-iconfont nc-icon-sousuo-duanV6xx1 mr-[13rpx] text-[28rpx]"></text>
					<u--input v-model="searchName" border="none" :placeholder="diyComponent.search_text"
					:placeholderStyle='{color:diyComponent.text_color}' :color="diyComponent.text_color" fontSize="24rpx"></u--input>
					<text class="text-[24rpx] normal ml-[60rpx]" @click="toLink">搜索</text>
				</view>
			</template>
		</view>
	</view>
</template>

<script setup lang="ts">
	// 搜索
  import { ref,computed, watch, onMounted, nextTick,getCurrentInstance } from 'vue';
	import { img, redirect } from '@/utils/common';
	import useDiyStore from '@/app/stores/diy';

	const props = defineProps(['component', 'index']);
	const diyStore = useDiyStore();
	const noticeShow = ref(false);
	const searchName = ref('');
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

    onMounted(() => {
        refresh();
        // 装修模式下刷新
        if (diyStore.mode == 'decorate') {
            watch(
                () => diyComponent.value,
                (newValue, oldValue) => {
                    if (newValue && newValue.componentName == 'O2oSearch') {
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
            query.select('.diy-o2o-search').boundingClientRect((data: any) => {
                height.value = data.height;
            }).exec();
        })
    }

	const toLink = ()=>{
		if (diyStore.mode == 'decorate') return false;
		redirect({ url: '/addon/o2o/pages/goods/list',param:{goods_name:searchName.value}})
	}

</script>

<style lang="scss" scoped>
	:deep(.input-placeholder){
		line-height:36rpx !important;
		height:36rpx !important;
		top:4rpx !important;
	}
	:deep(.u-input){
		line-height:36rpx !important;
	}
	.normal{
		line-height:normal;
	}
</style>
