<template>
	<view :style="warpCss">
		表单 地址组件
		<view class="relative">
			<view class="p-[10rpx]  flex items-center ">
				<view class="w-[27%] mr-[10rpx] flex items-center">
					<text class="text-overflow-ellipsis" :style="{'color': diyComponent.textColor,'font-size': (diyComponent.fontSize * 2) + 'rpx' ,'font-weight': diyComponent.fontWeight}">{{ diyComponent.field.name }}</text>
					<text class="text-[#ec0003]">{{ diyComponent.field.required ? '*' : '' }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	// 表单 地址组件
	import { ref, computed, watch,onMounted } from 'vue';
	import { img } from '@/utils/common';
	import useDiyStore from '@/app/stores/diy';

	const props = defineProps(['component', 'index','global']);
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

    onMounted(() => {
        refresh();
        // 装修模式下刷新
        if (diyStore.mode == 'decorate') {
            watch(
                () => diyComponent.value,
                (newValue, oldValue) => {
                    if (newValue && newValue.componentName == 'FormAddress') {
                        refresh();
                    }
                }
            )
        }else{
		}
    });

    const refresh = ()=> {
    }

	// 表单组件验证
	const verify = () => {
		const res = { code: true, message: '' }
		// todo 验证组件，diyComponent.value.field.value
		return res;
	}

	// 重置表单组件数据
	const reset = () => {
		// todo 清空组件数据，diyComponent.value.field.value = '';
	}

	defineExpose({
		verify,
		reset
	})
</script>

<style lang="scss" scoped>
	@import '@/styles/diy_form.scss';
	.text-overflow-ellipsis {
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
	}
</style>