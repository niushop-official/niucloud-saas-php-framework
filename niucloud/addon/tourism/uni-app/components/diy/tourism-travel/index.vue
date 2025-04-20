<template>
	<view :style="warpCss">
		<view :style="maskLayer"></view>
		<view class="diy-tourism-travel relative goods-wrap py-[30rpx] px-[32rpx]" v-if="loading && list?.length">
			<view class="head">{{t('way')}}</view>
			<view class="content">
				<template v-if="diyComponent.layout == 'oneLines'">
					<view class="goods-item" v-for="(item,index) in list" :key="item.way_id" @click="toLink(item)">
						<view class="img-wrap">
							<image v-if="item.goods.cover_thumb_big" :src="img(item.goods.cover_thumb_big)" mode="aspectFill"/>
							<view class="absolute text-white bg-[#FE8700] bottom-2 left-3 p-1 rounded text-[24rpx] flex items-baseline">
								<view>
									<text class="price-font ">￥</text>
									<text class="price-font text-[32rpx]">{{goodsPrice(item)}}</text>
									{{t('rise')}}
								</view>
							</view>
						</view>
						<view class="name truncate">{{item.goods.goods_name}}</view>
					</view>
				</template>
				<view v-if="diyComponent.layout == 'twoLines'" class="flex flex-wrap justify-between">
					<view class="flex flex-col mt-[30rpx] w-[330rpx]" v-for="(item,index) in list" :key="item.way_id" @click="toLink(item)">
						<image class="w-[330rpx] h-[330rpx] rounded-md" :src="img(item.goods.cover_thumb_mid)" mode="aspectFill"/>
						<view class="flex flex-col flex-1 py-[10rpx]">
							<view class="text-sm font-bold truncate">{{item.goods.goods_name}}</view>
							<view class="flex items-center mt-auto text-[#F55246] text-xs">
								<view>
									<text class="price-font">￥</text>
									<text class="text-base price-font">{{goodsPrice(item)}}</text>
									<text class="ml-[4rpx] mr-[4rpx]"> {{t('rise')}} </text>
									<text>
										<image v-if="priceType(item) == 'member_price'" class="h-[22rpx] ml-[4rpx] w-[50rpx]" :src="img('addon/tourism/VIP.png')" mode="heightFix" />
									</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
    // 线路
    import { ref,computed, watch, onMounted, nextTick,getCurrentInstance } from 'vue';
    import {redirect, img, getToken} from '@/utils/common';
    import useDiyStore from '@/app/stores/diy';
    import {getWayRecommend} from '@/addon/tourism/api/tourism';
    import {t} from '@/locale'

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
        redirect({url: '/addon/tourism/pages/way/detail', param: {way_id: data.way_id, goods_id: data.goods.goods_id}})
    }

    const list = ref([]);
    const loading = ref(false);
    const getWayRecommendFn = () => {
      let data: object = {
        goods_ids: diyComponent.value.source == 'custom' ? diyComponent.value.way_id : '',
        limit: diyComponent.value.source == 'all' ? diyComponent.value.num : 0
      };
      loading.value = false;
      getWayRecommend(data).then((res) => {
        loading.value = true;
        list.value = res.data;
      }).catch(() => {
        loading.value = true;
      })
    }

    const refresh = () => {
      if (diyStore.mode == 'decorate') {
        let obj = {
          price: 100.00,
          goods: {
            cover_thumb_big: img('static/resource/images/diy/block_placeholder.png'),
            cover_thumb_mid: img('static/resource/images/diy/block_placeholder.png'),
            goods_name: '线路名称',
            price: 100.00,
          }
        };
        list.value.push(obj);
        list.value.push(obj);
        loading.value = true;
      } else {
        getWayRecommendFn();
      }
    }

    const instance = getCurrentInstance();
    const height = ref(0)

    onMounted(() => {
        refresh();
        // 装修模式下刷新
        if (diyStore.mode == 'decorate') {
            watch(
                () => diyComponent.value,
                (newValue, oldValue) => {
                    if (newValue && newValue.componentName == 'TourismTravel') {
                        nextTick(() => {
                            const query = uni.createSelectorQuery().in(instance);
                            query.select('.diy-tourism-travel').boundingClientRect((data: any) => {
                                height.value = data.height;
                            }).exec();
                        })
                    }
                }
            )
        }
    });

	// 价格类型
	let priceType = (data:any) =>{
		if (diyStore.mode == 'decorate') {
		    return data.price;
		}
		let type = "";
		if(data.goods) {
			let member_discount = ('member_discount' in data.goods) ? data.goods.member_discount : ''
			if (member_discount && getToken()) {
				type = 'member_price' // 会员价
			} else {
				type = ""
			}
		}
		return type;
	}
	// 商品价格
	let goodsPrice = (data:any) =>{
		if (diyStore.mode == 'decorate') {
		    return data.price;
		}
		let price = data.price;
		if(data.goods) {
			let member_discount = ('member_discount' in data.goods) ? data.goods.member_discount : ''
			if (member_discount && getToken()) {
				price = data.member_price || data.price // 会员价
			}
		}
		return parseFloat(price).toFixed(2);
	}
</script>

<style lang="scss" scoped>
	.goods-wrap {
		@apply pt-4 flex flex-col items-center;
		.head {
			@apply text-center font-bold relative mb-3;
			&::after, &::before {
				content: "";
				position: absolute;
				top: calc(50% - 2rpx);
				left: calc(-38rpx + -20rpx);
				width: 38rpx;
				height: 4rpx;
				background: linear-gradient(90deg, #EBEBEB 0%, #6D7278 100%);
			}

			&::before {
				left: calc(100% + 20rpx);
				background: linear-gradient(-90deg, #EBEBEB 0%, #6D7278 100%);
			}
		}

		.content {
			@apply box-border w-full;
		}

		.goods-item {
			border-radius: 10rpx;
			overflow: hidden;

			.img-wrap {
				@apply relative flex overflow-hidden rounded ;
				image {
					height: 260rpx;
					width: 686rpx;
				}

			}

			.name {
				@apply text-sm px-2 pt-2 pb-4;
			}
		}
	}
</style>
