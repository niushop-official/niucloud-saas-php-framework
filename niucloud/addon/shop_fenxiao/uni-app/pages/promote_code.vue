<template>
    <view class="container" :style="themeColor()">
        <template v-if="!loading">
            <view class="poster-wrap">
                <image v-if="poster" :src="poster" mode="widthFix" :show-menu-by-longpress="true" />
            </view>

            <!-- #ifdef H5 -->
            <view class="tips">长按识别图中二维码</view>
            <!--  #endif -->

            <!-- #ifdef MP -->
            <view class="btn-poster-save primary-btn-bg" @click="save">保存海报</view>
            <!--  #endif -->

            <u-popup :show="show" @close="show = false" mode="center" :round="'var(--rounded-big)'" :safe-area-inset-bottom="false" :customStyle="{'overflow':'hidden'}">
                <view class="dialog-popup">
                    <view class="title">提示</view>
                    <view class="message">您拒绝了保存图片到相册的授权请求，无法保存图片到相册，如需正常使用，请授权之后再进行操作。</view>
                    <view class="action-wrap">
                        <view @click="closeDialog">取消</view>
                        <view class="flex items-end">
                            <button type="default" class="authorization-btn" open-type="openSetting" @opensetting="closeDialog" hover-class="none">立即授权</button>
                        </view>
                    </view>
                </view>
            </u-popup>
        </template>

        <loading-page :loading="loading"></loading-page>

        <!-- #ifdef MP-WEIXIN -->
        <!-- 小程序隐私协议 -->
        <wx-privacy-popup ref="wxPrivacyPopupRef"></wx-privacy-popup>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import { img, getToken, goback } from '@/utils/common';
import { ref, nextTick } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import { getPoster } from '@/app/api/system'
import { useShare } from '@/hooks/useShare'
import { useLogin } from '@/hooks/useLogin'

const show = ref(false);
const loading = ref(true);

const closeDialog = () => {
    show.value = false;
}

const wxPrivacyPopupRef: any = ref(null)

const { setShare } = useShare()

onLoad((option: any) => {

    if (!option.id) {
        let parameter = {
            url: '/addon/shop/pages/index',
            title: '缺少会员id',
            mode: 'reLaunch'
        };
        goback(parameter);
        return;
    }

    if (!getToken()) {
        useLogin().setLoginBack({
            url: '/addon/shop_fenxiao/pages/promote_code',
            param: { id: option.id, mid: option.mid }
        });
        return;
    }

    getPosterFn(option.id);

    let share = {
        title: "分销推广",
        desc: "分销推广"
    }

    setShare({
        wechat: {
            ...share
        },
        weapp: {
            ...share
        }
    });
    // #ifdef MP
    nextTick(() => {
        if (wxPrivacyPopupRef.value) wxPrivacyPopupRef.value.proactive();
    })
    // #endif
})

// 获取分享海报
const poster = ref('');
const getPosterFn = (id: any) => {
    loading.value = true;
    let obj = {
        type: 'fenxiao',
        param: { 'member_id': id }
    }
    getPoster(obj).then((res: any) => {
        poster.value = res.data && img(res.data) || '';
        loading.value = false;
    })
}

// 保存海报
const save = () => {
    // #ifdef MP
    uni.downloadFile({
        url: poster.value,
        success: res => {
            if (res.statusCode === 200) {
                uni.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: () => {
                        uni.showToast({
                            title: '保存成功',
                            icon: 'none'
                        });
                    },
                    fail: err => {
                        if (err.errno == 104) {
                            let msg = '用户未授权隐私权限，将图像保存到相册失败';
                            uni.showToast({ title: msg, icon: 'none' })
                        } else if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny" ||
                            err.errMsg == "saveImageToPhotosAlbum:fail:auth denied") {
                            show.value = true;
                        } else if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                            let msg = '用户取消将图片保存到相册';
                            uni.showToast({ title: msg, icon: 'none' })
                        } else {
                            uni.showToast({ title: err.errMsg, icon: 'none' })
                        }
                    }
                });
            } else {
                uni.showToast({
                    title: '下载失败',
                    icon: 'none'
                });
            }
        },
        fail: res => {
            uni.showToast({
                title: res.errMsg,
                icon: 'none'
            });
        }
    });
    // #endif
}
</script>

<style lang="scss">
.container {
    overflow: hidden;
    width: 100vw;
    min-height: 100vh;
    background-color: var(--page-bg-color);
}

.poster-wrap {
    width: calc(100vw - var(--sidebar-m) * 2);
    margin: var(--sidebar-m);
    line-height: 1;

    image {
        border-radius: 20rpx;
        overflow: hidden;
        width: 100%;
    }
}

.swiper {
    height: 1240rpx;
}

.btn-poster-save {
    margin: 30rpx 20rpx 30rpx;
    height: 80rpx;
    line-height: 80rpx;
    color: #fff;
    font-weight: 500;
    text-align: center;
    border-radius: 100rpx;
    font-size: 26rpx;
}

.tips {
    text-align: center;
    color: var(--text-color-light6);
    margin-top: var(--top-m);
    font-size: 28rpx;
}

.dialog-popup {
    width: 580rpx;
    background: #fff;
    border-radius: var(--rounded-small);
    overflow: hidden;
    height: 100%;
    margin-bottom: -2rpx;
    margin-right: -4rpx;

    .title {
        padding: 30rpx 30rpx 0 30rpx;
        text-align: center;
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
    }

    .message {
        padding: 0 var(--popup-sidebar-m);
        color: #333;
        text-align: center;
        line-height: 1.3;
        margin-top: 30rpx;
    }

    .action-wrap {
        margin-top: 60rpx;
        height: 80rpx;
        display: flex;

        & > view {
            flex: 1;
            text-align: center;
            border: 0;

            &:first-child {
                border-top: 2rpx solid #eee;
                color: var(--text-color-light6);
                height: 80rpx;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            button {
                border: none;
                border-top: 2rpx solid transparent;
                padding: 0;
                margin: 0;
                width: 100%;
                height: 80rpx;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    .authorization-btn {
        background-color: #07c160;
        color: #fff;
        font-size: 28rpx;
        border-radius: 0;
    }
}
</style>
