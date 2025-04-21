<template>
	<view>
		<l-painter
			css="width: 640rpx; padding-bottom: 35rpx; background-color: #fff; box-shadow: 0 20rpx 58rpx rgba(0,0,0,.15);border-radius: 10rpx;"
			isCanvasToTempFilePath @success="handleSuccess" @fail="handleFail"
			custom-style="position: fixed; left: 200%;top:0;z-index:888" >
			<l-painter-view css="margin: 70rpx 50rpx;border:1px solid #000;padding:20px">
				<l-painter-image :src="img(config.headimg)"
					css="margin-top: 15rpx; width: 72rpx;  height: 72rpx; border-radius: 50%;" />
				<l-painter-view css="margin-top: 30rpx; padding-left: 20rpx; display: inline-block">
					<l-painter-text :text="`来自${config.nickname}的分享`"
						css="display: block; padding-bottom: 10rpx; color: #333333; font-size: 28rpx;line-clamp:1;width: 100%;" />
				</l-painter-view>
				
				<l-painter-view css="margin-top: 20rpx;">
					<l-painter-text :text="`${config.name}`"
						css="display: block; padding-bottom: 10rpx; color: #333333; font-size: 14px;line-clamp:8;width: 100%;" /> 
						<l-painter-image :src="img(config.cover)"
							css="object-fit: cover;margin-top: 15rpx; width: 462rpx;  height: 462rpx; border-radius: 0" mo />
				</l-painter-view>
				
					
				<!-- <l-painter-view css="margin-top: 30rpx;background-color:#000;padding:20rpx 3%;color: #fff; font-size: 18px;">
					<l-painter-view css="display:flex;justify-content: center;">
						<l-painter-text text="#" css="color: #fff;" />
						<l-painter-text :text="`${config.name}`"
							css="line-clamp:2;" />
						<l-painter-text text="#" css="" />
					</l-painter-view>
					
					<l-painter-view css="display:flex;justify-content: center;color:#a29c62">
						<l-painter-text :text="'分享来自于'+`${config.site_name}`"
							css="  font-size: 12px;line-clamp:2;margin-top:10rpx" />
					</l-painter-view>
					
				</l-painter-view> -->
				<!-- <l-painter-image :src="config.details"
					css="object-fit: cover; object-position: center; width: 560rpx; height: 560rpx;margin-top: 15rpx;" /> -->
					<l-painter-view css="margin-top: 30rpx;display:flex;justify-content: center;">
						<l-painter-text :text="`${config.desc}`" css=" padding-bottom: 10rpx; color: #333333; font-size: 16px;" /> 
					</l-painter-view>
					
				<l-painter-view css="margin-top: 30rpx;display:flex;">

					<l-painter-view css="display: flex;">
						<!-- #ifdef H5 || APP-PLUS -->
						<l-painter-qrcode css="width: 168rpx; height: 168rpx;" :text="config.url">
						</l-painter-qrcode>
						<!--  #endif -->
						<!-- #ifdef MP -->
						<l-painter-image :src="config.mpcode" css="width: 168rpx; height: 168rpx;" />
						<!--  #endif -->
						<l-painter-view css="margin-left:20rpx;margin-top:50rpx">
							<l-painter-text text="长按识别二维码"
								css="display: block; padding-top: 10rpx; color: #666;font-size: 24rpx;" />
							<l-painter-text text="查看详情"
								css="display: block; padding-top: 10rpx; color: #666;font-size: 24rpx;" />
						</l-painter-view>
					</l-painter-view>
				</l-painter-view>
			</l-painter-view>
		</l-painter>
	</view>
</template>

<script>
	import lPainter from '@/addon/shortvideo/components/lime-painter/components/l-painter/l-painter.vue'
	import lPainterImage from '@/addon/shortvideo/components/lime-painter/components/l-painter-image/l-painter-image.vue'
	import lPainterText from '@/addon/shortvideo/components/lime-painter/components/l-painter-text/l-painter-text.vue'
	import lPainterView from '@/addon/shortvideo/components/lime-painter/components/l-painter-view/l-painter-view.vue'
	import lPainterQrcode from '@/addon/shortvideo/components/lime-painter/components/l-painter-qrcode/l-painter-qrcode.vue'
	import { redirect, img } from '@/utils/common';
	export default {
		name: "share-poster",
		components: {
			lPainter,
			lPainterImage,
			lPainterText,
			lPainterView,
			lPainterQrcode
		},
		props: {
			config: { // 相关配置
				type: Object,
				default: () => ({})
			},
			shareId: { // 分享id
				type: [Number, String],
				default: ''
			},
			qrcode: { // 二维码数据
				type: [String],
				default: ''
			},
			// pagePath:{  
			// 	type: String,
			// 	default: ''
			// },
			link: {
				type: String,
				default: ''
			},
			type: { // 生成海报需使用 0-会员分享海报 1-商品详情 2-砍价活动
				type: [String, Number],
				default: 1,
			},
		},
		data() {
			return {
				img:img
			};
		},
		computed: {
			price() {
				let {
					price
				} = this.config
				if (price == undefined) return {}
				price = String(parseFloat(price)).split('.')
				return {
					prev: price[0],
					next: price[1] ? `.${price[1]}` : ''
				}
			},
			marketPrice() {
				return `￥${parseFloat(this.config.marketPrice)}`
			}
		},
		methods: {
			handleSuccess(val) {
				console.log(val);
				this.$emit('success', val)
			},
			handleFail(err) {
				console.log(err);
				this.$emit('fail')
			}
		}
	}
</script>

<style>

</style>