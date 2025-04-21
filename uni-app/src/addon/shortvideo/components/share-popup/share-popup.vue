<template>
	<view class="">
		<up-popup class="share-popup" :show="showshare" mode="bottom" border-radius="14" :closeable="true"
			@close="tohide" :safe-area-inset-bottom="true" :mask-close-able="false">
			<view class="row row-center md bold mt30 mb30" style="margin:30rpx">分享至</view>
			<view class="  share-tab flex" style="justify-content: space-around;display: flex;flex-direction: row;">
				<!-- <view class="column column-center" @tap="getPoster" style="width:300rpx">
					<image mode="widthFix" class="share-icon"
						:src="img('addon/shortvideo/static/img/icon_generate_poster.png')">
					</image>
					<view class="" style="margin: 15rpx 0;">生成海报</view>
				</view> -->
				<!-- #ifdef MP-WEIXIN-->
				<button open-type="share" class="column column-center" hover-class="none" style="with:300rpx;margin:0;padding:0">
					<image class="share-icon" :src="img('addon/shortvideo/static/img/icon_wechat.png')">
					</image>
					<view class=""  style="margin: 15rpx 0;">微信好友</view>
				</button>
				<!-- #endif -->
				<!-- #ifdef H5 || APP-PLUS -->
				<view oclass="column column-center" @tap="shareWx" style="width:300rpx">
					<image class="share-icon" :src="img('addon/shortvideo/static/img/icon_wechat.png')">
					</image>
					<view class=""  style="margin: 15rpx 0;">微信好友</view>
				</view>
				<!-- #endif -->
			</view>
			<view class="" @tap="tohide" style="text-align: center;border: 10rpx solid #f5f5f5;padding:25rpx 0 15rpx">取消
			</view>
		</up-popup>
		<u-popup class="share-poster" :show="showPoster" mode="center" bgColor="transparent" :safeAreaInsetBottom="false" :closeable="true"
			@close="showPoster=false" :safe-area-inset-bottom="true">
			<view>
				<!-- #ifndef H5 -->
				<image style="width: 640rpx;" mode="widthFix" :src="posterData"></image>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<img style="width: 640rpx;" :src="posterData" />
				<!-- #endif -->
				<view class="save-btn" size="lg" @tap="savePoster">
					<!-- #ifndef H5 -->
					保存图片到相册
					<!-- #endif -->
					<!-- #ifdef H5 -->
					长按保存图片到相册
					<!-- #endif -->
				</view>
			</view>
		</u-popup>
		<!-- #ifdef H5 -->
		<u-popup :custom-style="{'background': 'none'}" class="share-tips" :show="showTips" mode="top">
			<view style="overflow: hidden;" @click="showTips=false">
				<image :src="img('addon/shortvideo/static/img/share_arrow.png')" class="share-arrow" />
				<view class="white" style="text-align: center;margin-top: 280rpx;color:#fff">
					<view class="bold lg">立即分享给好友吧</view>
					<view class="sm m-t-10">点击屏幕右上角将本页面分享给好友</view>
				</view>
			</view>
		</u-popup>
		<!-- #endif -->

<!-- // <poster v-if="enablePoster" :config="config" @success="handleSuccess" @fail="handleFail" /> -->
		
	</view>
</template>

<script setup>
	import {
		redirect,
		img
	} from '@/utils/common';
	// import poster from '@/addon/shortvideo/components/share-popup/poster';
	import {
		getposter
	} from '@/addon/shortvideo/api/video'
	import {
		ref,
		computed,
		defineEmits,
		watch
	} from 'vue';

	const props = defineProps({
		showshare: {
			type: Boolean,
			default: false,
		},
		shareId: {
			type: [String, Number],
			default: '',
		},
	});

	const posterData = ref('');
	const config = ref('');
	const enablePoster = ref(false);
	const showPoster = ref(false);
	const showTips = ref(false);
	const mnpQrcode = ref('');
	const bargainShare = {
		share_title: '',
		share_intro: '',
	};

	const emit = defineEmits(["hide"])


	function tohide() {
		emit("hide")
	}

	async function getPoster() {
		uni.showLoading({
			title:'海报生成中'
		})
		setTimeout(function(){
			uni.hideLoading();
		},2500)
		getposter({
				video_id: props.shareId
			})
			.then((res) => {
				enablePoster.value = true;
				console.log('enablePoster', enablePoster);
				config.value = res.data.data;
				config.value.headimg = img(config.value.headimg);
				enablePoster.value = true;
			});
	}

	function getMnpQrcode() {
		return new Promise((resolve, reject) => {
			getShareMnQrcode({
					id: props.shareId,
					url: props.pagePath,
					type: props.type,
				})
				.then((res) => {
					console.log('shareRes', res);
					resolve(res);
				})
				.catch(() => {
					reject();
				});
		});
	}

	function handleSuccess(val) {
		console.log(val);
		posterData.value = val;
		uni.hideLoading();
		 props.showshare = false;
		uni.hideLoading()
		emit("hide")
	}

	function handleFail() {
		uni.hideLoading({
			success: () => {
				uni.showToast({
					title: '生成失败',
				});
			},
		});
	}

	function shareWx() {
		// #ifdef H5
		showTips.value = true;
		// showshare.value = false;
		emit("hide")
		// #endif
		// #ifdef APP-PLUS
		uni.share({
			provider: 'weixin',
			scene: 'WXSceneSession',
			type: 0,
			href: getLink.value,
			title: props.config.name,
			summary: '',
			imageUrl: props.config.image,
			success: (res) => {
				console.log('分享成功');
			},
			fail: (err) => {
				uni.showToast({
					title: err.errMsg,
				});
			},
		});
		// #endif
	}

	async function savePoster() {

		// #ifdef H5
		var oA = document.createElement("a");
		oA.download = ''; // 设置下载的文件名，默认是'下载'
		oA.href = posterData.value;
		document.body.appendChild(oA);
		oA.click();
		oA.remove(); // 下载之后把创建的元素删除
		uni.showToast({
			title: "图片成功保存到本地",
			icon: "none"
		})
		// showshare.value = false;
		emit("hide");
		// #endif


		// #ifdef MP
		xcx_download(posterData.value);
		// #endif


	}



	function xcx_download(src) {
		console.log('开始下载....');
		console.log(src);
		var byte = src.replace("data:image/png;base64,", "");
		const fs = uni.getFileSystemManager(); //全局唯一的文件管理器
		var number = Math.random();
		fs.writeFile({
			filePath: wx.env.USER_DATA_PATH + '/code' + number + '.png',
			data: byte,
			encoding: "base64",
			success(res) {
				console.log(res);
				//图片保存到本地
				wx.saveImageToPhotosAlbum({
					// filePath: res.tempFilePath,
					filePath: wx.env.USER_DATA_PATH + '/code' + number + '.png',
					success: function(data) {
						
						wx.hideLoading()
						// showshare.value = false;
						emit("hide")
						setTimeout(function() {
							uni.showToast({
								title: "图片成功保存到本地",
								icon: "none"
							})
						}, 2500)
					},
					fail: function(err) {
						console.log(err);
						if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err
							.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err
							.errMsg === "saveImageToPhotosAlbum:fail authorize no response"
						) {
							// 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
							wx.showModal({
								title: '提示',
								content: '需要您授权保存相册',
								showCancel: false,
								success: modalSuccess => {
									wx.openSetting({
										success(settingdata) {
											console.log("settingdata",
												settingdata)
											if (settingdata
												.authSetting[
													'scope.writePhotosAlbum'
												]) {
												uni.showToast({
													title: "获取权限成功",
													icon: "none"
												})
											} else {
												uni.showToast({
													title: "获取权限失败",
													icon: "none"
												})
											}
										},
										fail(failData) {
											console.log("failData",
												failData)
										},
										complete(finishData) {
											console.log("finishData",
												finishData)
										}
									})
								}
							})
						}
					},
					complete(res) {
						wx.hideLoading()
					}
				})
			},
			fail(err) {
				console.log(err);
			}
		})
	}
</script>

<style scoped>
	.share-icon {
		width: 100rpx;
		height: 100rpx;
	}

	.share-tab {
		margin: 40rpx 0 20rpx;

	}

	.cancel {
		height: 98rpx;
	}

	.share-img {
		width: 640rpx;
		border-radius: 12rpx;
	}

	.column-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		justify-content: center;
		font-size: 16px;
	}

	button {
		background: none;
	}

	.save-btn {
		color: #fff;
		background: #666;
		text-align: center;
		line-height: 80rpx;
		height: 80rpx;
		margin-top: -15rpx;
	}

	.share-tips .share-arrow {
		width: 140rpx;
		height: 250rpx;
		float: right;
		margin: 15rpx 31rpx 0 0;
	}

	/deep/.u-safe-area-inset-bottom {
		padding-bottom: 0!important;
	}
</style>