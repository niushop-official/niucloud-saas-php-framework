<template>
	<view :style="warpCss">
		<view :style="maskLayer"></view>
		<view class="o2o-technician relative">
			<view class="leading-0 overflow-hidden" :style="{height: imgHeight}" v-if="isTechnician">
				<view @click="redirect({ url: '/addon/o2o/pages/master/statistics/index' })">
					<image v-if="diyComponent.imageUrl" :src="img(diyComponent.imageUrl)" :style="{height: imgHeight}" mode="heightFix" class="w-full" :show-menu-by-longpress="true"/>
					<image v-else :src="img('static/resource/images/diy/figure.png')" :style="{height: imgHeight}" mode="heightFix" class="w-full" :show-menu-by-longpress="true"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
    // 技师中心
  import { ref,computed, watch, onMounted, nextTick,getCurrentInstance } from 'vue';
	import { img,redirect } from '@/utils/common';
	import {checkTechnician} from '@/addon/o2o/api/technician'
	import useDiyStore from '@/app/stores/diy';

	const props = defineProps(['component', 'index']);

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

    onMounted(() => {
        refresh();
        // 装修模式下刷新
        if (diyStore.mode == 'decorate') {
            watch(
                () => diyComponent.value,
                (newValue, oldValue) => {
                    if (newValue && newValue.componentName == 'O2oTechnician') {
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
            query.select('.o2o-technician').boundingClientRect((data: any) => {
                height.value = data.height;
            }).exec();
        })
    }

	const imgHeight = computed(() => {
		return (diyComponent.value.imageHeight * 2) + 'rpx';
	})

	// 验证是否是技师
    const isTechnician = ref(false)
	const checkTechnicianFn = () =>{
		if (diyStore.mode == 'decorate') {
			return isTechnician.value = true
		}else{
			checkTechnician().then(res =>{
				if(JSON.stringify(res.data) == '[]'){
					isTechnician.value= false
				}else{
					isTechnician.value = true
				}
			})
		}

	}
	checkTechnicianFn()
</script>

<style lang="scss" scoped>
</style>
