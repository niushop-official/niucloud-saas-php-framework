<template>
    <view :style="themeColor()">

        <loading-page :loading="diy.getLoading()"></loading-page>

        <view v-show="!diy.getLoading()">

            <!-- 自定义模板渲染 -->
            <view class="diy-template-wrap bg-index" :style="diy.pageStyle()">

                <diy-group ref="diyGroupRef" :data="diy.data" />

            </view>

        </view>

        <!-- #ifdef MP-WEIXIN -->
        <!-- 小程序隐私协议 -->
        <wx-privacy-popup ref="wxPrivacyPopupRef"></wx-privacy-popup>
        <!-- #endif -->

    </view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useDiy } from '@/hooks/useDiy'
import { useShare } from '@/hooks/useShare'
import diyGroup from '@/addon/components/diy/group/index.vue'
import useSystemStore from '@/stores/system'
import { redirect } from '@/utils/common';

const systemStore = useSystemStore()
const { setShare } = useShare()
const diy = useDiy({
    name: 'DIY_SHOP_FENXIAO_ZONE'
})

const diyGroupRef = ref(null)

const wxPrivacyPopupRef: any = ref(null)

// 监听页面加载
diy.onLoad();

// 监听页面显示
diy.onShow((data: any) => {
    watch(
        () => systemStore.siteAddons,
        (newValue, oldValue) => {
            if (newValue && Object.keys(newValue).length) {

                if (!systemStore.siteAddons.includes('shop_fenxiao')) {
                    uni.showToast({
                        title: '该站点未安装分销插件',
                        icon: 'none'
                    });

                    setTimeout(() => {
                        if (getCurrentPages().length > 1) {
                            uni.navigateBack({
                                delta: 1
                            });
                        } else {
                            redirect({
                                url: '/addon/shop/pages/member/index',
                                mode: 'reLaunch'
                            });
                        }
                    }, 1500);
                }
            }
        },
        { deep: true }
    )
    let share = data.share ? JSON.parse(data.share) : null;
    setShare(share);
    diyGroupRef.value?.refresh();
    // #ifdef MP
    nextTick(() => {
        if (wxPrivacyPopupRef.value) wxPrivacyPopupRef.value.proactive();
    })
    // #endif
});

// 监听页面隐藏
diy.onHide();

// 监听页面卸载
diy.onUnload();

// 监听滚动事件
diy.onPageScroll()
</script>
<style lang="scss" scoped>
@import '@/styles/diy.scss';
</style>
<style lang="scss">
.diy-template-wrap {
    /* #ifdef MP */
    .child-diy-template-wrap {
        ::v-deep .diy-group {
            > .draggable-element.top-fixed-diy {
                display: block !important;
            }
        }
    }

    /* #endif */
}
</style>
