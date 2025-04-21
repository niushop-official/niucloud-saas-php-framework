<template>
	<view :style="warpCss">
		<view :style="maskLayer"></view>
		<view class="diy-o2o-goods-list relative">
			<!-- 标题 -->
			<view class="flex justify-between items-center mb-[20rpx]" v-if="diyComponent.title_is_show">
				<view class="flex items-center">
					<view class="w-[38rpx] h-[38rpx] mr-[14rpx]" v-if="diyComponent.title_icon">
						<image :src="img(diyComponent.title_icon ? diyComponent.title_icon :'')" mode="aspectFill" class="w-[38rpx] h-[38rpx]" />
					</view>
					<view class="max-w-[200rpx] truncate line-normal" :style="{
							fontSize: diyComponent.title_font_size * 2 + 'rpx',
							color: diyComponent.title_text_color,
							fontWeight: diyComponent.title_font_weight
						}">
						{{ diyComponent.title_text }}
					</view>
					<view class="ml-[16rpx] max-w-[300rpx] truncate line-normal" :style="{ color: diyComponent.sub_title_color,fontSize: diyComponent.sub_title_font_size * 2 + 'rpx' }">
						{{diyComponent.sub_title_text}}
					</view>
				</view>
				<view class="ml-auto text-right " v-if="diyComponent.more_is_show" :style="{ color: diyComponent.more_color, fontSize: diyComponent.more_font_size * 2 + 'rpx',}">
					<view @click="diyStore.toRedirect(diyComponent.more_link)" class="flex items-center">
						<text class="max-w-[200rpx] mr-[6rpx] line-normal" :style="{ color: diyComponent.more_color, fontSize: diyComponent.more_font_size * 2 + 'rpx',}">
							{{ diyComponent.more_text }}
						</text>
						<u-icon name="arrow-right" size="12" color="diyComponent.more_color" class="line-normal"></u-icon>
					</view>
				</view>
			</view>
			<skeleton :style="diyComponent.style" v-if="loading && diyStore.mode != 'decorate'" />
			<template v-else>
				<view class="flex flex-wrap justify-between">
					<template v-if="diyComponent.style == 'style1'">
						<view :class="['w-[48%] bg-[#fff] box-border rounded-[12rpx] overflow-hidden',{'mt-[24rpx]': index > 1}]" v-for="(item,index) in goodsList" :key="item.goods_id" @click="toLink(item)">
							<u--image width="100%" height="332rpx" :src="img(item.cover_thumb_mid || '')" mode="aspectFill">
								<template #error>
									<u-icon name="photo" color="#999" size="50"></u-icon>
								</template>
							</u--image>
							<view class="px-[16rpx] mt-[18rpx] max-h-[40rpx] leading-[40rpx] text-[28rpx] truncate">
								{{item.goods_name}}
							</view>
							<view class="px-[16rpx] flex items-center mt-[10rpx]">
								<text class="text-[24rpx] text-[var(--primary-color)] px-[10rpx] py-[6rpx] rounded-[6rpx]  bg-[var(--primary-color-light)]">
									{{ item.buy_type_name }}
								</text>
							</view>
							<view class="px-[16rpx] pb-[20rpx] flex justify-between items-center mt-[12rpx]">
								<view class="text-[28rpx]  text-[var(--price-text-color)] font-600 price-font">

									<text>
										￥{{goodsPrice(item) }}
										<image  v-if="priceType(item) == 'member_price'" class="h-[24rpx] ml-[4rpx] w-[60rpx]" :src="img('addon/o2o/VIP.png')" mode="heightFix" />
									</text>
									<text v-if="item.goodsSku.unit">/{{item.goodsSku.unit }}</text>
								</view>
								<text class="text-[28rpx] text-[#fff] bg-[var(--primary-color)] px-[20rpx] py-[14rpx] rounded-[6rpx]">
									{{ item.buy_type =='reservation' ? '预约':'下单'}}
								</text>
							</view>
						</view>
					</template>
					<template v-if="diyComponent.style == 'style2'">
						<view :class="['bg-white w-full flex p-[20rpx] rounded-[16rpx]',{'mt-[20rpx]': index > 0}]" v-for="(item,index) in goodsList" :key="item.goods_id" @click="toLink(item)">
							<u--image class="rounded-[10rpx] overflow-hidden" width="200rpx" height="200rpx" :src="img(item.cover_thumb_mid || '')" mode="aspectFill">
								<template #error>
									<u-icon name="photo" color="#999" size="50"></u-icon>
								</template>
							</u--image>
							<view class="flex-1 flex flex-col ml-[20rpx]">
								<view class="text-[28rpx] h-[80rpx] leading-[40rpx]  text-[#333] multi-hidden mb-[10rpx]">{{item.goods_name}}</view>
								<view class="flex items-center">
									<text class="text-[24rpx] text-[var(--primary-color)] px-[10rpx] py-[6rpx] rounded-[6rpx] bg-[var(--primary-color-light)]">{{ item.buy_type_name }}</text>
								</view>
								<view class="mt-auto flex justify-between items-center">
									<view class="text-[28rpx]  text-[var(--price-text-color)] font-600 price-font">
										<text>
											￥{{goodsPrice(item) }}
											<image  v-if="priceType(item) == 'member_price'" class="h-[24rpx] ml-[4rpx] w-[60rpx]" :src="img('addon/o2o/VIP.png')" mode="heightFix" />
										</text>
										<text v-if="item.goodsSku.unit">/{{item.goodsSku.unit }}</text>
									</view>
									<text class="text-[28rpx] text-[#fff] bg-[var(--primary-color)] px-[20rpx] py-[14rpx] rounded-[6rpx]">
										{{ item.buy_type =='reservation' ? '立即预约':'立即下单'}}
									</text>
								</view>
							</view>
						</view>
					</template>
				</view>
				<scroll-view :scroll-x="true">
					<view class="flex items-center flex-nowrap">
						<template v-if="diyComponent.style == 'style3'">
							<view class="w-[31%] bg-[#fff] box-border rounded-[12rpx] border-box flex-shrink-0" :class="{'ml-[24rpx]': index}" v-for="(item,index) in goodsList" :key="item.goods_id" @click="toLink(item)">
								<u--image width="100%" height="200rpx" :src="img(item.cover_thumb_mid || '')" mode="aspectFill">
									<template #error>
										<u-icon name="photo" color="#999" size="30"></u-icon>
									</template>
								</u--image>
								<view class="px-[16rpx] mt-[28rpx] max-h-[40rpx] leading-[40rpx] text-[28rpx] truncate text-[#333]">
									{{item.goods_name}}
								</view>
								<view class="px-[16rpx] pb-[20rpx] flex items-center mt-[8rpx]">
									<view class="text-[28rpx]  text-[var(--price-text-color)] font-600 price-font">
										<text>
											￥{{goodsPrice(item) }}
											<image  v-if="priceType(item) == 'member_price'" class="h-[24rpx] ml-[4rpx] w-[60rpx]" :src="img('addon/o2o/VIP.png')" mode="heightFix" />
										</text>
										<text v-if="item.goodsSku.unit">/{{item.goodsSku.unit}}</text>
									</view>
								</view>
							</view>
						</template>
					</view>
				</scroll-view>
			</template>
		</view>
	</view>
</template>

<script setup lang="ts">
    // 商品列表
    import { ref,computed, watch, onMounted, nextTick,getCurrentInstance } from 'vue';
    import {redirect,img, getToken } from '@/utils/common';
    import useDiyStore from '@/app/stores/diy';
    import {getGoodsComponents} from '@/addon/o2o/api/goods';
    import skeleton from '@/addon/o2o/components/skeleton/index'

    const props = defineProps(['component', 'index']);
    const diyStore = useDiyStore();

    const goodsList = ref<Array<any>>([]);
    const loading = ref(true);
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

    const getGoodsListFn = () => {
        loading.value = true;

        let data = {
            num: diyComponent.value.source == 'all' ? diyComponent.value.num : '',
            goods_ids: diyComponent.value.source == 'custom' ? (diyComponent.value.goods_ids.length > 0 ? diyComponent.value.goods_ids : '-1') : '',
            goods_category: diyComponent.value.source == 'category' ? diyComponent.value.goods_category : ''
        }
        getGoodsComponents(data).then((res) => {
            goodsList.value = res.data;
            loading.value = false;
        }).catch(() => {
            loading.value = false;
        })
    }

    onMounted(() => {
        refresh();
        // 装修模式下刷新
        if (diyStore.mode == 'decorate') {
            let obj = {
                goods_cover: "",
                goods_name: "商品名称",
                buy_type_name: "标签",
                goodsSku: {price: 100, sku_unit: "次",}
            };
            goodsList.value.push(obj);
            goodsList.value.push(obj);
            watch(
                () => diyComponent.value,
                (newValue, oldValue) => {
                    if (newValue && newValue.componentName == 'O2oGoodsList') {
                        refresh();
                    }
                }
            )
        } else {
            getGoodsListFn();
        }
    });

    const instance = getCurrentInstance();
    const height = ref(0)

    const refresh = () => {
        // 装修模式下设置默认图
        nextTick(() => {
            const query = uni.createSelectorQuery().in(instance);
            query.select('.diy-o2o-goods-list').boundingClientRect((data: any) => {
                height.value = data.height;
            }).exec();
        })
    }

    const toLink = (data: any) => {
        if (diyStore.mode == 'decorate') return false;
        redirect({url: '/addon/o2o/pages/goods/detail', param: {sku_id: data.goodsSku.sku_id}})
    }

	// 价格类型
	let priceType = (data:any) =>{
		let type = "";
		if(data.member_discount && getToken() && data.goodsSku.member_price != data.goodsSku.price){
			type = 'member_price' // 会员价
		}else{
			type = ""
		}
		return type;
	}

	// 商品价格
	let goodsPrice = (data:any) =>{
		let price = "0.00";
		if(data.member_discount && getToken() && data.goodsSku.member_price != data.goodsSku.price){
			price = data.goodsSku.member_price || '0.00' // 会员价
		}else{
			price = data.goodsSku.price || '0.00'
		}
		return parseFloat(price).toFixed(2);
	}

</script>

<style lang="scss" scoped>
	.line-normal {
		line-height: normal;
	}
</style>
