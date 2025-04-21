<template>
	<view :style="warpCss">
		<view :style="maskLayer"></view>
		<view class="diy-vipcard-reserve relative goods-wrap py-[30rpx] px-[32rpx]" v-if="loading && list?.length">
			<view class="flex justify-between items-center w-full mb-4">
				<text class="font-bold">{{t('cardReserve')}}</text>
				<view class=" flex items-center" @click="redirect({ url: '/addon/vipcard/pages/service/list', mode: 'reLaunch'})">
					<text class="text-xs text-[var(--text-color-light6)] mr-[4rpx]">{{t('seeMore')}}</text>
					<text class="nc-iconfont nc-icon-xiangyouV6xx text-[var(--text-color-light6)] text-[28rpx]"></text>
				</view>
			</view>
			<view class="content">
				<view :class="['flex',{'mb-3': list.length-1 != index}]" v-for="(item,index) in list" :key="item.way_id" @click="toLink(item)">
					<image :src="img(item.cover_thumb_mid)" class="w-[240rpx] h-[180rpx] mr-[20rpx] rounded-md" mode="aspectFill" />
					<view class="flex flex-col flex-1 py-[20rpx]">
						<view class="text-sm font-bold multi-hidden">{{item.goods_name}}</view>
						<view class="flex items-center mt-2 text-[#F55246] font-bold text-xs">
							￥<text class="text-base">{{item.price}}</text>
						</view>
						<view class="flex items-center mt-auto justify-between">
							<view class="text-xs text-[var(--text-color-light6)] flex-1">{{t('soldOut')}} {{item.sale_num}}</view>
							<button type="primary" class="reserve-btn text-sm flex items-center justify-center mx-0">{{t('reserveBtn')}}</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
// 预约
import { ref,computed, watch, onMounted, nextTick,getCurrentInstance } from 'vue';
import { redirect, img } from '@/utils/common';
import useDiyStore from '@/app/stores/diy';
import { getIndexServiceList } from '@/addon/vipcard/api/vipcard';
import { t } from '@/locale'

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

	const toLink = (data) => {
		redirect({ url: '/addon/vipcard/pages/service/detail', param: { id: data.goods_id }})
	}

	let list = ref([]);
	let loading = ref(false);
	const getIndexServiceListFn = () => {
		let data : object = {
			limit: diyComponent.value.source == 'all' ? diyComponent.value.num : 0,
			goods_ids: diyComponent.value.source == 'custom' ? diyComponent.value.goods_ids : ''
		};
		loading.value = false;
		getIndexServiceList(data).then((res) => {
			list.value = res.data;
			loading.value = true;
		}).catch(() => {
			loading.value = true;
		})
	}

	const refresh = () => {
		if (diyStore.mode == 'decorate') {
			let obj = {
                cover_thumb_mid: img('static/resource/images/diy/block_placeholder.png'),
				scenic_name: '项目预约名称',
				price: 100.00,
				sale_num: 100
			};
			list.value.push(obj);
			list.value.push(obj);
			loading.value = true;
		} else {
			getIndexServiceListFn();
		}
	}

  onMounted(() => {
      refresh();
      // 装修模式下刷新
      if (diyStore.mode == 'decorate') {
          watch(
              () => diyComponent.value,
              (newValue, oldValue) => {
                  if (newValue && newValue.componentName == 'VipcardReserve') {
                      nextTick(() => {
                          const query = uni.createSelectorQuery().in(instance);
                          query.select('.diy-vipcard-reserve').boundingClientRect((data: any) => {
                              height.value = data.height;
                          }).exec();
                      })
                  }
              }
          )
      }
  });

  const instance = getCurrentInstance();
  const height = ref(0)
</script>

<style lang="scss" scoped>
	.goods-wrap{
		@apply pt-4 flex flex-col items-center;
		.content{
			@apply box-border w-full;
		}
		.goods-item{
			border-radius: 10rpx;
			overflow: hidden;
			.img-wrap{
				@apply relative flex overflow-hidden rounded ;
				image{
					width: 100%;
				}
				.price{
					@apply absolute text-white bg-[#FE8700] bottom-2 left-3 p-1 rounded text-base flex items-center;
					text{
						@apply text-xs;
					}
				}
			}
			.name{
				@apply text-base px-2 pt-2;
			}
			.desc{
				@apply text-[var(--text-color-light9)] text-xs pt-1 pb-4 px-2;
			}
		}
	}
	.reserve-btn{
		width:140rpx !important;
		height:62rpx !important;
		border-radius: 1rem !important;
	}
</style>
