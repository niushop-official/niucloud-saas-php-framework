<template>
	<view :style="warpCss">
		<view :style="maskLayer"></view>
		<view class="diy-tourism-tickets relative goods-wrap spec py-[30rpx] px-[32rpx]" v-if="loading && list?.length">
			<view class="head">{{t('scenic')}}</view>
			<view class="content">
				<view v-if="diyComponent.layout == 'oneLines'" class="flex-1">
					<view class="flex mb-3" v-for="(item,index) in list" :key="item.way_id" @click="toLink(item)">
						<image :src="img(item.cover_thumb_mid)" class="w-[240rpx] h-[240rpx] mr-[20rpx] rounded-md" mode="aspectFill"/>
						<view class="flex flex-col flex-1 py-[10rpx]">
							<view class="text-sm font-bold multi-hidden">{{item.scenic_name}}</view>
							<view class="flex items-center mt-auto text-[#F55246] text-xs price-font">
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
				<template v-if="diyComponent.layout == 'twoLines'">
					<view class="goods-item" v-for="(item,index) in list" :key="item.way_id" @click="toLink(item)">
						<image :src="img(item.cover_thumb_mid)" class="w-[336rpx] h-[240rpx]" mode="aspectFill" />
						<view class="name truncate">{{item.scenic_name}}</view>
						<view class="text-[#F55246] bottom-2 left-3 px-1 rounded text-base flex items-baseline text-[24rpx]">
							<view>
								<text class="price-font">￥</text>
								<text class="price-font text-[32rpx]">{{goodsPrice(item)}}</text>
								<text class="ml-[4rpx] mr-[4rpx]"> {{t('rise')}} </text>
								<text>
									<image v-if="priceType(item) == 'member_price'" class="h-[22rpx] ml-[4rpx] w-[50rpx]" :src="img('addon/tourism/VIP.png')" mode="heightFix" />
								</text>
							</view>
						</view>
					</view>
				</template>
			</view>
			<view class="pt-1 w-screen justify-center flex items-center" @click="toLinkList()">
				<text class="text-xs mr-1 text-[var(--text-color-light6)]">{{t('seeMore')}}</text>
				<u-icon name="arrow-right" color="#666" size="14"></u-icon>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
    // 景点
    import { ref,computed, watch, onMounted, getCurrentInstance } from 'vue';
    import {redirect, img, getToken} from '@/utils/common';
    import useDiyStore from '@/app/stores/diy';
    import {getScenicRecommend} from '@/addon/tourism/api/tourism';
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
        redirect({url: '/addon/tourism/pages/scenic/detail', param: {scenic_id: data.scenic_id}})
    }

    const toLinkList = () => {
        redirect({url: '/addon/tourism/pages/scenic/list'})
    }

    const list = ref([]);
    const loading = ref(false);
    const getScenicRecommendFn = () => {
        let data: object = {
			goods_ids: diyComponent.value.source == 'custom' ? diyComponent.value.scenic_id : '',
            limit: diyComponent.value.source == 'all' ? diyComponent.value.num : 0
        };
        loading.value = false;
        getScenicRecommend(data).then((res) => {
            list.value = res.data;
            loading.value = true;
        }).catch(() => {
            loading.value = true;
        })
    }

    const refresh = () => {
        if (diyStore.mode == 'decorate') {
            let obj = {
                cover_thumb_big: img('static/resource/images/diy/block_placeholder.png'),
                cover_thumb_mid: img('static/resource/images/diy/block_placeholder.png'),
                scenic_name: '景点名称',
                price: 100.00
            };
            list.value.push(obj);
            list.value.push(obj);
            loading.value = true;
        } else {
            getScenicRecommendFn();
        }
    }

    onMounted(() => {
        refresh();
        // 装修模式下刷新
        if (diyStore.mode == 'decorate') {
            watch(
                () => diyComponent.value,
                (newValue, oldValue) => {
                    if (newValue && newValue.componentName == 'TourismTickets') {
                        const query = uni.createSelectorQuery().in(instance);
                        query.select('.diy-tourism-tickets').boundingClientRect((data: any) => {
                            height.value = data.height;
                        }).exec();
                    }
                }
            )
        }
    });

    const instance = getCurrentInstance();
    const height = ref(0)

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
		let price = data.price
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
					width: 100%;
				}

				.price {
					@apply absolute text-white bg-[#FE8700] bottom-2 left-3 p-1 rounded text-base flex items-center;
					text {
						@apply text-xs;
					}
				}
			}

			.name {
				@apply text-sm px-2 pt-2;
			}

			.desc {
				@apply text-[var(--text-color-light9)] text-xs pt-1 pb-4 px-2;
			}
		}
	}

	.spec.goods-wrap {
		@apply mb-3;
		.content {
			@apply flex flex-wrap justify-between;
			.goods-item {
				@apply flex flex-col pb-2 mb-3 border-1 border-[#F0F0F0] border-solid box-border;
				width: 336rpx;

				image {
					width: 100%;
				}

				.name {
					font-size: 28rpx;
					line-height: 1.5;
				}

			}
		}

		&:last-of-type {
			margin-bottom: 0 !important;
		}
	}
</style>
