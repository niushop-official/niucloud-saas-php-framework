<template>
    <view @touchmove.prevent.stop class="update-version">
        <u-popup :show="show" @close="closeFn" mode="center" :round="10" :closeOnClickOverlay="!editionForce">
            <view class="update-version-wrap flex flex-col"  :style="{'background-image': 'url('+ img('static/resource/images/version_update_bg.png') +')'}">
                <view class="flex flex-col justify-center mx-[10rpx]">
                    <view class="text-[50rpx] font-bold">
                        发现新版本
                    </view>
                    <view class="text-[24rpx] mt-[12rpx] self-start rounded-bl-[14rpx] rounded-tr-[14rpx] py-[4rpx] px-[16rpx] text-[#FA0F1A] bg-[#FFD3D4]">
                        {{ versionInfo.version_name }}
                    </view>
                </view>
                <scroll-view scroll-y="true" class="mt-[40rpx] mb-[20rpx] mx-[10rpx] max-h-[290rpx]">
					<view class="text-[26rpx] text-[#333] text-with-newline">
						{{versionInfo.version_desc}}
					</view>
                </scroll-view>
                <view class="flex gap-[20rpx] mt-[auto]">
                    <view v-if="!editionForce" class="rounded-[60rpx] h-[76rpx] w-[240rpx] flex items-center justify-center bg-[#F5F5F5] text-[28rpx] text-[#666]" @click="closeFn" :disabled="downloading">下次更新</view>
                    <view class="rounded-[60rpx] h-[76rpx] w-[240rpx] flex items-center justify-center active-btn text-[#fff] text-[28rpx] text-[#999]" @click="confirm" :disabled="downloading">
                        <text v-if="!downloading">下载更新</text>
                        <text v-else>下载中({{downloadProgress}}%)</text>
                    </view>
                </view>
                <!-- 下载进度条 -->
                <view class="mt-[30rpx] mx-[10rpx]" v-if="downloading">
                    <view class="w-full h-[10rpx] bg-[#E0E0E0] rounded-full overflow-hidden">
                        <view class="h-full bg-[#F11C0C] rounded-full" :style="{ width: downloadProgress + '%' }" :class="downloading ? 'downloading-animation' : ''"></view>
                    </view>
                </view>
            </view>
            <view v-if="!editionForce" class="nc-iconfont nc-icon-cuohaoV6xx1 text-[#fff] text-center mt-[40rpx] text-[44rpx]" @click="closeFn"></view>
        </u-popup>
    </view>
</template>

<script setup lang="ts">
import { ref, version, computed } from 'vue'
import {onBackPress, onHide} from "@dcloudio/uni-app";
import useSystemStore from '@/stores/system';
import { img, getUrl } from '@/utils/common';

const systemStore = useSystemStore();

const show = computed({
    get() {
        return systemStore.updateVersionPopup
    },
    set(value: boolean){
        systemStore.updateVersionPopup = false
    }
})
const downloading = ref(false)
const downloadProgress = ref(0)
const versionInfo = ref({})
const editionForce = ref(0)

const open = () => {
    show.value = true
}

const closeFn = () => {
    if (!show.value) return
    // 下载过程中不允许关闭
    if (!downloading.value) {
        const lock = uni.getStorageSync('update_version_close_lock') || {}
        lock[versionInfo.value.version_code] = true
        uni.setStorageSync('update_version_close_lock', lock)
        show.value = false
    }else{
		uni.showToast({
			title: '下载过程中不允许关闭',
			icon: 'none'
		});
	}
}

const initFn = ()=>{
	useSystemStore().getVersionInfoFn(async (res) => {
		versionInfo.value = res
		versionInfo.value.version_desc = versionInfo.value.version_desc.replace(/\\n/g, '\n')
		editionForce.value = Number(res.is_forced_upgrade)
	})
}
initFn()



onBackPress(()=>{
	// 强制更新不允许返回
	if (editionForce.value) {
		return true;
	}
})

onHide(() => {
	editionForce.value = 0;
	show.value = false
})

const confirm = () => {
	if(downloading.value)  return false
	if(versionInfo.value.upgrade_type == 'hot'){
		uni.downloadFile({
			url: versionInfo.value.package_path,
			success: res => {
				if (res.statusCode === 200) {
					plus.runtime.install(
						res.tempFilePath, {
							force: true //true表示强制安装，不进行版本号的校验；false则需要版本号校验，
						},
						function() {
							uni.showModal({
								title: '更新提示',
								content: '新版本已经准备好，请重启应用',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										// console.log('用户点击确定');
										plus.runtime.restart()
									}
								}
							});
							// console.log('install success...');
						},
						function(e) {
							console.error('install fail...');
						}
					);
				}
			}
		});
	}else{
		//apk整包升级 下载地址必须以.apk结尾
		if (versionInfo.value.upgrade_type == 'app' && versionInfo.value.package_path.includes('.apk')) {
			editionForce.value = 0; 
			// #ifdef APP-PLUS
			plus.runtime.openURL(getUrl(versionInfo.value.package_path));
			// #endif
			show.value = false
			/* downloading.value = true
			const downloadTask = plus.downloader.createDownload(getUrl(versionInfo.value.package_path), {
				filename: '_downloads/'  // 下载到应用的downloads目录
			}, function(d, status) {
				console.log('整包下载 - d',d,d.filename)
				console.log('整包下载 - status',status)
				if (status === 200) {
					// 下载成功后打开APK进行安装
					plus.runtime.openURL(d.filename, function(error) {
						console.error('打开文件失败：- error' + error);
						console.error('打开文件失败：' + error.message);
						uni.showToast({
							title: '无法打开此文件',
							icon: 'none'
						});
					})
				} else {
					console.log('APK下载失败: ' + status);
				}
				downloading.value = false
				show.value = false
				downloadProgress.value = 0
			})
			
			// 监听下载进度
			downloadTask.addEventListener('statechanged', function(task, status) {
				if (task.state === 3) { // 3表示正在下载
					// 计算下载进度百分比
					const progress = (task.downloadedSize / task.totalSize) * 100
					downloadProgress.value = progress.toFixed(0)
					console.log(`下载进度: ${progress.toFixed(0)}%`);
				}
			});
			
			downloadTask.start()
			*/
		} else if(versionInfo.value.upgrade_type == 'market') {
			//外部下载 一般是手机应用市场或者其他h5页面
			editionForce.value = 0; // 解决跳转外部链接后，更新提示还在的问题 */
			// #ifdef APP-PLUS
			plus.runtime.openURL(getUrl(versionInfo.value.package_path));
			// #endif
			show.value = false
		}else {
			downloading.value = true
			//wgt资源包升级 下载地址必须以.wgt结尾
			download();
		}
	}
}

const download = () =>{
	// #ifdef APP-PLUS
	const downloadTask = uni.downloadFile({
		url: versionInfo.value.package_path,
		success: res => {
			uni.showToast({
				title: `下载状态${res.statusCode}`,
				icon:'none'
			})
			if (res.statusCode === 200) {
				plus.runtime.install(
					res.tempFilePath,
					{
						force: true //true表示强制安装，不进行版本号的校验；false则需要版本号校验，
					},
					function() {
						if (versionInfo.value.upgrade_type == 'hot') {
							plus.runtime.restart();
						}
					},
					function(e) {
						//提示部分wgt包无法安装的问题
						editionForce.value = 0;
						uni.showToast({
							title:e.message,
							icon:'none',
							duration:2500
						})
						setTimeout(()=>{
							show.value = false
						},2000)
						
					}
				);
				if (versionInfo.value.upgrade_type != 'hot') {
					// 解决安装app点击取消，更新还在的问题
					editionForce.value = 0;
					show.value = false
				}
			}
		},
		fail: (err) => {
		    console.error('下载失败:', err)
		    uni.showToast({
		        title: err,
		        icon: 'none'
		    })
		    downloading.value = false
		    downloadProgress.value = 0
		}
	});
	// 进度条
	downloadTask.onProgressUpdate(res => {
		downloadProgress.value = res.progress;
	});
	// #endif
}
defineExpose({
    open,
    close: closeFn
})
</script>

<style lang="scss" scoped>
.update-version {
    :deep(.u-popup__content) {
        background-color: transparent;
        .update-version-wrap{
            background-size: contain;
            width: 564rpx;
            height: 686rpx;
            padding: 130rpx 30rpx 40rpx;
            box-sizing: border-box;
        }
    }
    .active-btn{
        background: linear-gradient( 90deg, #FBA165 0%, #F11C0C 100%);
        transition: all 0.3s ease;
    }
    .active-btn:active {
        opacity: 0.8;
    }
    .active-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    .downloading-animation {
        transition: width 0.3s ease;
    }
}
.text-with-newline {
	/* 关键样式：让\n生效 */
	white-space: pre-line;
	line-height: 1.6;
}
</style>
