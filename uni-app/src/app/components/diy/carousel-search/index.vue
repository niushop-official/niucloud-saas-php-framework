<template>
    <view :style="warpCss" class="goods-carousel-search-wrap">
        <view class="relative pb-[20rpx]">
            <view class="bg-img" :class="{'imp-minus-bottom200': diyComponent.bgGradient == true}">
                <image
                    v-if="diyComponent.swiper.control && diyComponent.swiper.list && diyComponent.swiper.list[swiperIndex].imageUrl"
                    :src="img(diyComponent.swiper.list[swiperIndex].imageUrl)" mode="scaleToFill" class="w-full h-full"
                    :show-menu-by-longpress="true" />
                <view v-else class="w-full h-full bg-[#fff]"></view>
                <view class="bg-img-box" :style="bgImgBoxStyle"></view>
            </view>
            <view class="fixed-wrap" :style="fixedStyle">
                <!-- 风格1：返回箭头 + 上传图片 + 搜索框。
                     与风格3 同理：整行不再兜底绑「跳搜索页」，否则箭头与图片之间、图片与搜索框之间
                     的空白（以及搜索框圆角外侧）点了都会跳搜索；而上传的 logo 图本身没有点击，
                     以前点它会 fallthrough 到整行 → 跳搜索页，与风格3 的「误触定位区域跳搜索」是同一类问题。 -->
                <view v-if="diyComponent.search.style == 'style-1'" class="diy-search-wrap relative z-10"
                      :style="searchWrapStyle">
                    <!-- 风格1：返回箭头置于上传图片左侧，受公共设置项「返回箭头」控制 -->
                    <view class="header-back" v-if="headerConfig.backIsShow" @click.stop="goBack">
                        <text class="nc-iconfont nc-icon-zuoV6xx" :style="{ color: headerConfig.iconColor }"></text>
                    </view>
                    <!-- <view class="img-wrap" v-if="diyComponent.search.logo">
                        <image :src="img(diyComponent.search.logo)" mode="aspectFit" />
                    </view> -->
                    <image :src="img(diyComponent.search.logo)" v-if="diyComponent.search.logo" mode="aspectFit" class="max-h-[60rpx] w-[152rpx] mr-[20rpx]" />
                    <view class="search-hit-wrap" @click="diyStore.toRedirect(diyComponent.search.link)">
                        <view class="search-content" :style="{backgroundColor: diyComponent.search.bgColor }">
                            <text class="input-content text-[#fff] text-[24rpx] leading-[68rpx]" :style="{color: diyComponent.search.color }">{{ isShowSearchPlaceholder ? diyComponent.search.text : '' }}</text>
                            <text class="w-[100rpx] h-[52rpx] flex items-center justify-center rounded-[50rpx] text-[24rpx] text-[#fff]"
                                :style="{backgroundColor: diyComponent.search.btnBgColor, color: diyComponent.search.btnColor }">搜索</text>
                            <swiper class="swiper-wrap" :interval="diyComponent.search.hotWord.interval * 1000" autoplay="true" vertical="true" circular="true" v-if="!isShowSearchPlaceholder">
                                <swiper-item class="swiper-item" v-for="(item) in diyComponent.search.hotWord.list" :key="item.id">
                                    <view class="leading-[64rpx] text-[24rpx]" :style="{color: diyComponent.search.color }">{{ item.text }}</view>
                                </swiper-item>
                            </swiper>
                        </view>
                    </view>
                </view>
                <!-- 风格2：两行结构（第一行 返回箭头 + 生活圈图片 + 副标题；第二行 地址定位 + 搜索框）。
                     整行不再兜底绑「跳搜索页」：这个兜底盖住的是「两行 + 行间 16rpx 间距 + 行的内边距」，
                     也就是第一行的标题栏区域（图片、副标题、以及它们之间的空白）点了全都跳搜索页，
                     比风格1/3 更离谱——第一行根本不是搜索区。现在跳搜索只由搜索框自己负责。 -->
                <view v-if="diyComponent.search.style == 'style-2'" class="diy-search-wrap style-2 relative z-10">
                    <view class="flex items-center" :style="style2TopRowStyle">
                        <!-- 风格2：返回箭头置于生活圈（上传图片）左侧，受公共设置项「返回箭头」控制 -->
                        <view class="header-back" v-if="headerConfig.backIsShow" @click.stop="goBack">
                            <text class="nc-iconfont nc-icon-zuoV6xx" :style="{ color: headerConfig.iconColor }"></text>
                        </view>
                        <!-- <view class="img-wrap" v-if="diyComponent.search.logo"><image :src="img(diyComponent.search.logo)" mode="aspectFit" /></view> -->
                        <image :src="img(diyComponent.search.logo)" v-if="diyComponent.search.logo" mode="aspectFit" class="max-h-[60rpx] w-[152rpx] mr-[10rpx]" />
                        <view :style="searchSubTitleCss" class="max-w-[360rpx] text-[24rpx] h-[38rpx] rounded-r-[20rpx] rounded-t-[20rpx] rounded-bl-[2rpx]" v-if="diyComponent.search.subTitle.text">
                            <view class="truncate leading-[38rpx] h-[38rpx]  px-[12rpx]">{{ diyComponent.search.subTitle.text }}</view>
                        </view>
                    </view>
                    <!-- 第二行：第一行有内容时与它隔开 16rpx；第一行空时不再留间距，直接顶上来与胶囊同行 -->
                    <view class="flex items-center w-full" :class="{ 'mt-[16rpx]': style2TopRowVisible }"
                          :style="style2SearchRowStyle">
                          <!-- 风格2：地址定位内嵌在搜索框左侧，受公共设置项「地址定位」控制。
                             与风格3 用的是同一套结构与样式类（第一行 城市 + 箭头，第二行 具体地址），
                             保证两个风格的定位外观一致。 -->
                        <view @click.stop="locationVal.reposition()" v-if="headerConfig.positionIsShow && systemStore.diyAddressInfo" :style="{color: diyComponent.search.positionColor}" class="mr-[16rpx] flex-shrink-0">
                            <view class="flex items-baseline font-500">
                                <text class="text-[24rpx]" :style="{color: headerConfig.textColor}">{{ systemStore.diyAddressInfo.city }}</text>
                                <text class="nc-iconfont nc-icon-youV6xx !text-[24rpx] header-position-arrow" :style="{color: headerConfig.iconColor}"></text>
                            </view>
                            <view class="text-[18rpx] mt-[10rpx] truncate max-w-[160rpx]" v-if="systemStore.diyAddressInfo.community" :style="{color: headerConfig.textColor}">{{ systemStore.diyAddressInfo.community }}</view>
                        </view>
                        <!-- 定位数据还没回来时先显示默认地址，避免这一行在首屏左右跳动 -->
                        <view @click.stop="locationVal.reposition()" v-else-if="headerConfig.positionIsShow" class="text-[24rpx] mr-[16rpx] truncate max-w-[160rpx] flex-shrink-0" :style="{color: headerConfig.textColor}">{{ systemStore.defaultPositionAddress }}</view>
                        <view class="search-hit-wrap" @click="diyStore.toRedirect(diyComponent.search.link)">
                            <view class="search-content" :style="{backgroundColor: diyComponent.search.bgColor }">
                                <text class="input-content text-[#fff] text-[24rpx] leading-[68rpx]" :style="{color: diyComponent.search.color }">{{ isShowSearchPlaceholder ? diyComponent.search.text : '' }}</text>
                                <!-- flex-shrink-0：搜索框左侧多了地址定位后，可用宽度变窄，别让「搜索」按钮被挤变形 -->
                                <text class="w-[100rpx] h-[52rpx] flex items-center justify-center rounded-[50rpx] text-[24rpx] text-[#fff] flex-shrink-0"
                                    :style="{backgroundColor: diyComponent.search.btnBgColor, color: diyComponent.search.btnColor }">搜索</text>
                                <swiper class="swiper-wrap" :interval="diyComponent.search.hotWord.interval * 1000"
                                        autoplay="true" vertical="true" circular="true" v-if="!isShowSearchPlaceholder">
                                    <swiper-item class="swiper-item" v-for="(item) in diyComponent.search.hotWord.list" :key="item.id">
                                        <view class="leading-[64rpx] text-[24rpx]" :style="{color: diyComponent.search.color }">{{ item.text }}</view>
                                    </swiper-item>
                                </swiper>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="tab-list-wrap relative z-10" v-if="diyComponent.tab.control">
                    <scroll-view scroll-x="true" class="scroll-wrap" :scroll-into-view="'a' + currTabIndex">
                        <view @click="changeData({ source : 'home' },-1)" class="scroll-item" :class="[{ active: currTabIndex == -1 }]">
                            <view class="name" :style="{'color': getTabColor(currTabIndex == -1)}">首页</view>
                            <!-- <view class="line" :style="{'background-color': getTabColor(currTabIndex == -1)}" v-if="currTabIndex == -1"></view> -->
                        </view>
                        <view v-for="(item, index) in diyComponent.tab.list" class="scroll-item" :class="[{ active: index == currTabIndex }]" @click="changeData(item,index)" :id="'a' + index" :key="index">
                            <view class="name" :style="{'color': getTabColor(index == currTabIndex)}">{{ item ? item.text : '' }}</view>
                            <!-- <view class="line" :style="{'background-color': getTabColor(index == currTabIndex)}" v-if="index == currTabIndex"></view> -->
                        </view>
                    </scroll-view>
                    <view v-if="diyComponent.tab.list.length" class="absolute tab-btn iconfont icona-yingyongliebiaoV6xx-32" @click="tabAllPopup = true"></view>
                </view>

                <view class="bg-img" v-if="fixedStyleBg">
                    <image v-if="diyComponent.swiper.control && diyComponent.swiper.list && diyComponent.swiper.list[swiperIndex].imageUrl"
                        :src="img(diyComponent.swiper.list[swiperIndex].imageUrl)" mode="widthFix" class="w-full h-full"
                        :show-menu-by-longpress="true" />
                    <view v-else class="w-full h-full bg-[#fff]"></view>
                </view>
            </view>

            <!-- 解决fixed定位后导航栏塌陷的问题 -->
            <template v-if="diyStore.mode != 'decorate'">
                <view v-if="diyComponent.positionWay == 'fixed' && props.scrollBool != undefined && props.scrollBool != -1"
                    class="u-navbar-placeholder" :style="{ width: '100%', paddingTop: moduleHeight }"></view>
            </template>

            <!-- 轮播图 -->
            <view class="relative" :class="{'mx20': swiperStyleBool && diyComponent.swiper.swiperStyle != 'style-3', 'swiper-style-3': diyComponent.swiper.swiperStyle == 'style-3'}" :style="carouselSwiperStyle()">
                <swiper v-if="diyComponent.swiper.control" class="swiper" :style="{ height: imgHeight }" autoplay="true"
                        circular="true" @change="swiperChange"
                        :class="{ 'swiper-left': diyComponent.swiper.indicatorAlign == 'left', 'swiper-right': diyComponent.swiper.indicatorAlign == 'right', 'ns-indicator-dots': diyComponent.swiper.indicatorStyle == 'style-2', 'ns-indicator-dots-three': diyComponent.swiper.indicatorStyle == 'style-3' }"
                        :previous-margin="swiperStyleBool ? 0 : '26rpx'" :next-margin="swiperStyleBool ? 0 : '26rpx'"
                        :interval="diyComponent.swiper.interval * 1000" :indicator-dots="isShowDots"
                        :indicator-color="diyComponent.swiper.indicatorColor"
                        :indicator-active-color="diyComponent.swiper.indicatorActiveColor">
                    <swiper-item class="swiper-item" v-for="(item,index) in diyComponent.swiper.list" :key="item.id" :style="swiperWarpCss">
                        <view @click="diyStore.toRedirect(item.link)">
                            <view class="item" :style="{height: imgHeight}">
                                <image v-if="item.imageUrl" :src="img(item.imageUrl)" mode="scaleToFill" :style="swiperWarpCss"
                                       :class="['w-full h-full',{'swiper-animation': (swiperIndex != index && diyComponent.swiper.indicatorStyle != 'style-3')}]"
                                       :show-menu-by-longpress="true" />
                                <image v-else :src="img('static/resource/images/diy/figure.png')" :style="swiperWarpCss"
                                       mode="scaleToFill"
                                       :class="['w-full h-full',{'swiper-animation': (swiperIndex != index && diyComponent.swiper.indicatorStyle != 'style-3')}]"
                                       :show-menu-by-longpress="true" />
                            </view>
                        </view>
                    </swiper-item>
                </swiper>
                <!-- #ifdef MP-WEIXIN -->
                <view v-if="diyComponent.swiper.list.length > 1" :class="[
						'swiper-dot-box',
						{ 'straightLine': diyComponent.swiper.indicatorStyle == 'style-2' },
						{ 'straightLineStyle2': diyComponent.swiper.indicatorStyle == 'style-3' },
						{ 'swiper-left': diyComponent.swiper.indicatorAlign == 'left' },
						{ 'swiper-right': diyComponent.swiper.indicatorAlign == 'right' }
					]">
                    <view v-for="(numItem, numIndex) in diyComponent.swiper.list" :key="numIndex"
                          :class="['swiper-dot', { active: numIndex == swiperIndex }]"
                          :style="[numIndex == swiperIndex ? { backgroundColor: diyComponent.swiper.indicatorActiveColor } : { backgroundColor: diyComponent.swiper.indicatorColor }]"></view>
                </view>
                <!-- #endif -->
            </view>

            <!-- 分类展开 -->
            <u-popup :safeAreaInsetTop="true" :show="tabAllPopup" mode="top" @close="tabAllPopup = false">
                <view class="text-sm px-[30rpx] pt-3" :style="{'padding-top':(systemStore.menuButtonInfo.top+'px')}">全部分类</view>
                <view class="flex flex-wrap pl-[30rpx] pt-[30rpx]">
                    <view @click="changeData({ source : 'home' },-1)" class="tab-wrap text-xs" :class="[{ 'tab-select-popup': currTabIndex == -1 }]">首页</view>
                    <text @click="changeData(item,index)" v-for="(item, index) in diyComponent.tab.list" :key="index" class="tab-wrap text-xs" :class="[{ 'tab-select-popup': index == currTabIndex }]">{{ item.text }}</text>
                </view>
            </u-popup>
        </view>

        <!-- 展示微页面数据 -->
        <template v-if="currentSource == 'diy_page'">

            <view class="child-diy-template-wrap bg-index">

                <diy-group :data="diyPageData"></diy-group>

            </view>
        </template>
    </view>
</template>

<script setup lang="ts">
// 轮播搜索
import { ref, reactive, computed, watch, onMounted, nextTick, getCurrentInstance, onUnmounted } from 'vue';
import { img, getTopFixedStatusName, redirect, currAddon } from '@/utils/common';
import { getFirstPage } from '@/utils/pages';
import useDiyStore from '@/app/stores/diy';
import diyGroup from '@/addon/components/diy/group/index.vue';
import { getDiyInfo } from '@/app/api/diy';
import { useLocation } from '@/hooks/useLocation'
import useSystemStore from '@/stores/system';

const systemStore = useSystemStore();
const instance = getCurrentInstance();
const props = defineProps(['component', 'index', 'global', 'scrollBool']);
const diyStore = useDiyStore();
const diyComponent = computed(() => {
    if (diyStore.mode == 'decorate') {
        return diyStore.value[props.index];
    } else {
        // 解决在电脑端，切换微页面时，装修页与h5页面之间的相互影响
        if(uni.getStorageSync(getTopFixedStatusName(props.global))){
            diyStore.topFixedStatus = uni.getStorageSync(getTopFixedStatusName(props.global));
        }else{
            diyStore.topFixedStatus = 'home'
        }
        return props.component;
    }
})

/************** 顶部标题栏-start ****************/
// 各搜索风格对顶部标题栏的兼容策略
// style-1：返回箭头并入搜索行（置于上传图片左侧），标题与地址定位不适用于该风格
// style-2：返回箭头并入生活圈行（置于上传图片左侧）；地址定位并入搜索行左侧，仍受定位开关控制
// style-3：返回箭头并入搜索行（置于地址定位左侧），标题不适用；地址定位内嵌在行内，仍受定位开关控制
const searchStyleCompat = computed(() => {
    const style = diyComponent.value.search?.style || '';
    if (style == 'style-1') {
        return { useHeaderBar: false, titleEnabled: false, positionEnabled: false };
    }
    if (style == 'style-2' || style == 'style-3') {
        return { useHeaderBar: false, titleEnabled: false, positionEnabled: true };
    }
    return { useHeaderBar: true, titleEnabled: true, positionEnabled: true };
})

// 顶部标题栏默认标题，按当前所在应用区分
const headerDefaultTitle = computed(() => {
    const titleMap: any = {
        mall: '商城'
    };
    return titleMap[currAddon()] || '商城';
})

// 顶部标题栏配置，兼容未保存过该字段的历史数据
// 默认值口径与后端组件字典、装修端编辑器一致：返回箭头关 / 标题关 / 地址定位开，
// 所以返回箭头与标题用 `=== true`（缺失即关），地址定位用 `!== false`（缺失即开）。
// 各风格支持的项不同，不支持的项不会被渲染，这里的取值只影响「支持的项」。
const headerConfig = computed(() => {
    const header = diyComponent.value.header || {};
    return {
        backIsShow: header.backIsShow === true, // 返回箭头
        titleIsShow: header.titleIsShow === true, // 标题
        positionIsShow: header.positionIsShow !== false, // 地址定位
        title: header.title || headerDefaultTitle.value,
        textColor: header.textColor || '#333333',
        iconColor: header.iconColor || '#333333'
    };
})

// 通用标题栏是否展示：当前风格不使用标题栏、或三个元素都关闭时隐藏
const isShowHeader = computed(() => {
    if (!searchStyleCompat.value.useHeaderBar) return false;
    const header = headerConfig.value;
    return !!(header.backIsShow || header.titleIsShow || header.positionIsShow);
})

// 顶部标题栏地址文案
const headerPositionText = computed(() => {
    const info = systemStore.diyAddressInfo;
    if (info) return info.community || info.city || systemStore.defaultPositionAddress;
    return systemStore.defaultPositionAddress;
})

// 顶部标题栏返回：回到系统首页
// 优先走 navigateBack 退回页面栈里已存在的首页：
//   - switchTab 会清空页面栈、且没有转场动画，iOS 上 tab 页被回收后回去还要重建，观感就是「像重新打开一个页面」；
//   - navigateBack 走的是原生返回转场动画，页面状态也保留，两端表现一致。
// 只有页面栈里查不到首页时（分享直达、被 redirectTo 替换掉等）才退回 switchTab。
// 注：H5 曾因为「返回后底部导航图标丢失」绕开 navigateBack 改走 redirect，
// 现在图标已改成 view + CSS 背景图（不再依赖 uni-h5 <image> 的生命周期），该绕行已撤掉，别再加回来。
const goBack = () => {
    const pages = getCurrentPages();
    if (!pages.length) return;

    const homePage = getFirstPage();
    const routes = pages.map((page: any) => `/${ page.route }`);
    const index = routes.lastIndexOf(homePage);

    // 当前已经在首页，不做处理（避免小程序 navigateBack/switchTab 到当前页报 fail）
    if (index === routes.length - 1) return;

    if (index !== -1) {
        uni.navigateBack({
            delta: routes.length - 1 - index,
            fail: () => redirect({ url: homePage })
        });
        return;
    }

    // 栈里没有首页，只能切换到首页 tab
    redirect({ url: homePage });
}
/************** 顶部标题栏-end ****************/

/************** 定位-start ****************/
let isOpenLocation = false;
if (diyComponent.value && diyComponent.value.search.style == 'style-2' && diyStore.mode != 'decorate') {
    isOpenLocation = true;
}

const locationVal = useLocation(isOpenLocation);
locationVal.onLoad();
locationVal.init();
/************** 定位-end ****************/

const warpCss = computed(() => {
    let style = '';
    if (diyComponent.value.componentStartBgColor) {
        if (diyComponent.value.componentStartBgColor && diyComponent.value.componentEndBgColor) style += `background:linear-gradient(${ diyComponent.value.componentGradientAngle },${ diyComponent.value.componentStartBgColor },${ diyComponent.value.componentEndBgColor });`;
        else style += 'background-color:' + diyComponent.value.componentStartBgColor + ';';
    }
    if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
    if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
    if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
    if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
    return style;
})

const moduleHeight: any = ref('')
const setModuleLocation = () => {
    nextTick(() => {
        setTimeout(() => {
            if (diyComponent.value.swiper.swiperStyle != 'style-3') {
                const query = uni.createSelectorQuery().in(instance);
                query.select('.fixed-wrap').boundingClientRect((data: any) => {
                    moduleHeight.value = (data.height || 0) + 'px';
                }).exec();
            } else {
                moduleHeight.value = '';
            }
        })
    })
}

const fixedStyleBg = ref(false);
const fixedStyle = computed(() => {
    let style = '';
    if (diyComponent.value.swiper.swiperStyle == 'style-3') {
        style += 'position: absolute;z-index: 99;left: 0;right: 0;';
    }

    // #ifdef H5
    if (props.global.topStatusBar.isShow && props.global.topStatusBar.style == 'style-4') {
        style += 'top:' + diyStore.topTabarHeight + 'px;';
    }
    if (diyComponent.value.swiper.swiperStyle == 'style-3') {
        // h5,上移的像素，采取的是平均值
        if (systemStore.systemInfo.platform === 'ios') {
            style += 'top: 55px;';
        } else {
            style += 'top: 44.5px;';
        }
    }
    // #endif

    if (diyStore.mode == 'decorate') return style;

    if (diyComponent.value.positionWay == 'fixed') {
        if (props.scrollBool != undefined && props.scrollBool != -1) {
            style += 'position: fixed;z-index: 99;top: 0;left: 0;right: 0;';
        }

        if (props.scrollBool == 1 || props.scrollBool == 2) {
            // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
            if (props.global.topStatusBar.isShow) {
                style += 'top:' + diyStore.topTabarHeight + 'px;';
            }
            // #endif
            // #ifdef H5
            if (props.global.topStatusBar.isShow && props.global.topStatusBar.style == 'style-4') {
                style += 'top:' + diyStore.topTabarHeight + 'px;';
            }
            // #endif
        }

        fixedStyleBg.value = false;
        if (props.scrollBool == 1) {
            let str = diyComponent.value.fixedBgColor || "";
            let arr = str.split(',');
            let num = diyComponent.value.fixedBgColor ? parseInt(arr[arr.length - 1]) : 0;
            if (!diyComponent.value.fixedBgColor || num == 0) {
                fixedStyleBg.value = true;
            } else {
                fixedStyleBg.value = false;
                style += 'background-color:' + diyComponent.value.fixedBgColor + ';';
            }
        }
    }
    return style;
})

// 轮播样式
const carouselSwiperStyle = () => {
    let style = "";
    if (diyComponent.value.swiper.swiperStyle == 'style-3') {
        // #ifdef H5
        // h5,上移的像素，采取的是平均值
        if (systemStore.systemInfo.platform === 'ios') {
            style = 'margin-top: -55px;';
        } else {
            style = 'margin-top: -44.5px;';
        }
        // #endif
    }
    return style;
}

const getTabColor = (flag: any) => {
    let color = '';
    if (flag) {
        color = diyComponent.value.tab.selectColor;
        if (diyComponent.value.positionWay == 'fixed' && props.scrollBool == 1) {
            color = diyComponent.value.tab.fixedSelectColor;
        }
    } else {
        color = diyComponent.value.tab.noColor;
        if (diyComponent.value.positionWay == 'fixed' && props.scrollBool == 1) {
            color = diyComponent.value.tab.fixedNoColor;
        }
    }

    return color;
}

const isShowSearchPlaceholder = computed(() => {
    let flag = true;
    for (let i = 0; i < diyComponent.value.search.hotWord.list.length; i++) {
        let item = diyComponent.value.search.hotWord.list[i];
        if (item.text) {
            flag = false;
            break;
        }
    }
    return flag;
})

// 背景渐变
const bgImgBoxStyle = computed(() => {
    let style = '';
    let str = props.global.pageStartBgColor ? props.global.pageStartBgColor : 'rgba(255,255,255,1)';
    if (str.indexOf('(') > -1) {
        let arr = str.split('(')[1].split(')')[0].split(',');
        if (diyComponent.value.bgGradient == true) {
            style += `background: linear-gradient(rgba(${ arr[0] }, ${ arr[1] }, ${ arr[2] }, 0) 65%, rgba(${ arr[0] }, ${ arr[1] }, ${ arr[2] }, 0.6) 70%, rgba(${ arr[0] }, ${ arr[1] }, ${ arr[2] }, 0.85) 80%, rgba(${ arr[0] }, ${ arr[1] }, ${ arr[2] }, 0.95) 90%,  rgb(${ arr[0] }, ${ arr[1] }, ${ arr[2] }, 1) 100%);`;
        }
    } else {
        style += `background: (${ str });`;
    }
    return style;
});

// 轮播样式二
const swiperStyleBool = computed(() => {
    const style = diyComponent.value.swiper.swiperStyle == 'style-2' || diyComponent.value.swiper.swiperStyle == 'style-3' ? true : false;
    return style;
})

const imgHeight = computed(() => {
    return (diyComponent.value.swiper.imageHeight * 2) + 'rpx';
})

const swiperIndex = ref(0);

const swiperChange = e => {
    swiperIndex.value = e.detail.current;
};

const swiperWarpCss = computed(() => {
    let style = '';
    if (diyComponent.value.swiper.topRounded) style += 'border-top-left-radius:' + diyComponent.value.swiper.topRounded * 2 + 'rpx;';
    if (diyComponent.value.swiper.topRounded) style += 'border-top-right-radius:' + diyComponent.value.swiper.topRounded * 2 + 'rpx;';
    if (diyComponent.value.swiper.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.swiper.bottomRounded * 2 + 'rpx;';
    if (diyComponent.value.swiper.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.swiper.bottomRounded * 2 + 'rpx;';
    return style;
})

const searchSubTitleCss = computed(() => {
    let style = '';
    if (diyComponent.value.search.subTitle.textColor) style += 'color:' + diyComponent.value.search.subTitle.textColor + ';';
    if (diyComponent.value.search.subTitle.startColor && diyComponent.value.search.subTitle.endColor) style += `background:linear-gradient(${ diyComponent.value.search.subTitle.startColor }, ${ diyComponent.value.search.subTitle.endColor });`;
    else style += 'background-color:' + (diyComponent.value.search.subTitle.startColor || diyComponent.value.search.subTitle.endColor) + ';';
    return style;
})

const currTabIndex = ref(-1)

const currentSource = ref('')

const changeData = (item: any, index: any) => {
    if (diyStore.mode == 'decorate') return false;
    currentSource.value = item.source;
    currTabIndex.value = index;
    if (item.source == 'home') {

        // 首页
        diyStore.topFixedStatus = 'home'

    } else if (item.source == 'diy_page') {

        // 查询微页面数据
        diyStore.topFixedStatus = 'diy'
        getDiyInfoFn(item.diy_id);
    }
    uni.setStorageSync(getTopFixedStatusName(props.global), diyStore.topFixedStatus);
}

const tabAllPopup = ref(false);
// 无标题栏时搜索行要用的避让样式（padding-top 让出状态栏 + padding-right 让出胶囊），
// 具体实现见下方「小程序胶囊避让」区块里的 navbarInnerStyle

/************** 小程序胶囊避让-start ****************/
// 内容右边缘与胶囊之间的固定视觉间距（px）——想调松紧只改这一个值
const CAPSULE_GAP_PX = 10;

// 胶囊右侧避让：必须按「胶囊真实 px 几何」算，不能掺 rpx。
// 各机型胶囊的绝对尺寸基本恒定（约 87×32px），而 rpx 随屏宽线性缩放：
//   旧写法 info.width * 2 + 'rpx'（= 把胶囊宽的 px 数按 750 设计稿折算成 rpx）在窄屏会被压小、
//   在宽屏会被放大 —— 360/375 屏：避让 ≈98~102px 而实际需要 ≈100px → 搜索框几乎顶到胶囊；
//   414/430 屏：避让 ≈113~117px 而实际只需 ≈95px → 又空出一大截。同一套样式在不同机型上表现不一致。
// 正确距离 = 胶囊左边缘到屏幕右边缘 = (100vw - right) + width，再加固定间距。
const capsulePaddingRight = computed(() => {
    const info: any = systemStore.menuButtonInfo || {};
    if (!Number(info.height)) return '';
    const right = Number(info.right) || 0;
    const width = Number(info.width) || 0;
    if (right && width) {
        return `padding-right:calc(100vw - ${ right }px + ${ width }px + ${ CAPSULE_GAP_PX }px);`;
    }
    // 拿不到胶囊几何时按常见机型兜底（≈ 胶囊宽 + 右边距 + 间距）
    return `padding-right:${ 100 + CAPSULE_GAP_PX }px;`;
})

// 状态栏避让（仅 APP 生效）：APP 端是沉浸式状态栏、且没有小程序胶囊，
// menuButtonInfo.height 恒为 0，上面按胶囊几何避让的所有分支都会返回空。
// 这里单独取 statusBarHeight 供各避让样式在 height 为 0 时兜底，
// 取值口径与项目其他页面（top-tabbar 等）一致，读 systemStore.systemInfo.statusBarHeight。
// 小程序端 top 本身已包含状态栏、H5 端没有状态栏概念，均返回 0，不影响原有逻辑。
const appStatusBarHeight = computed(() => {
    let height = 0;
    // #ifdef APP-PLUS
    height = Number(systemStore.systemInfo?.statusBarHeight) || 0;
    // #endif
    return height;
})

// 无标题栏时搜索行（风格4 / 兜底分支）的避让样式：padding-top 让出状态栏 + padding-right 让出胶囊
// 必须是 computed 而不是「顶层拼字符串 / onMounted 拼字符串」：
// menuButtonInfo 在 store 里的初值是 {height:0,top:0,...}，真实值要等 getMenuButtonInfoFn() 执行后才有，
// 而这发生在异步的站点信息请求之后。把 padding-top 固化进 ref 的话，拼的那一刻 top 还是 0，
// 之后胶囊信息到位了样式也不会再变（padding-top:0px → 搜索行顶到状态栏里，机型不同表现还不一样）。
// 改成 computed 后随 menuButtonInfo 变化自动重算，与 headerWrapStyle / searchWrapStyle 保持同一套取值口径。
const navbarInnerStyle = computed(() => {
    if (props.global.topStatusBar?.isShow) return '';
    const info: any = systemStore.menuButtonInfo || {};
    const top = Number(info.top) || 0;
    const height = Number(info.height) || 0;
    // height 为 0：H5 端无胶囊无需避让；APP 端没有胶囊，只让出状态栏（见 appStatusBarHeight）
    if (!height) return appStatusBarHeight.value ? `padding-top:${ appStatusBarHeight.value }px;` : '';
    return `padding-top:${ top }px;` + capsulePaddingRight.value;
})

// 与胶囊同行时，把胶囊真实高度以 CSS 变量注入搜索行：scss 里搜索框高度读这个变量
// 原因与右侧避让同源 —— 搜索框高 60rpx 是设计稿尺寸（随屏宽缩放），胶囊高恒为 32px：
//   430px 屏：60rpx = 34.4px → 搜索框比胶囊高 2.4px（iPhone 15 Pro Max 上肉眼可见）
//   320px 屏：60rpx = 25.6px → 又比胶囊矮 6.4px
// 仅在「搜索框与胶囊同一行」时注入：无标题栏的风格1/3/4，以及风格2 的第一行没有内容时（见下方）。
// 有标题栏、风格2 第一行有内容（搜索框在下一行）、H5（胶囊高为 0）都不注入，保持原设计稿尺寸。
//
// 注意：光靠「顶边对齐」是不够的 —— 搜索框顶边与胶囊顶边都落在 top 上，高度不等时中心必然偏移
// （实测截图：搜索框 28px、胶囊 31px，顶边重合 → 中心偏上 1.7px）。
// 让两者等高，中心才会重合。
const capsuleHeightVar = computed(() => {
    const height = Number(systemStore.menuButtonInfo?.height) || 0;
    if (!height) return '';
    return `--nc-capsule-h:${ height }px;`;
})

// 顶部标题栏样式：padding-top 让出状态栏，height 取「状态栏 + 胶囊高」并配合 align-items:center，
// 使返回箭头/标题/定位与胶囊处于同一条水平线
const headerWrapStyle = computed(() => {
    if (props.global.topStatusBar?.isShow) return '';
    const info: any = systemStore.menuButtonInfo || {};
    const top = Number(info.top) || 0;
    const height = Number(info.height) || 0;
    // height 为 0：H5 端无胶囊无需避让；APP 端没有胶囊，只让出状态栏（见 appStatusBarHeight）
    if (!height) return appStatusBarHeight.value ? `padding-top:${ appStatusBarHeight.value }px;` : '';
    return `padding-top:${ top }px;height:${ top + height }px;` + capsulePaddingRight.value;
})

// 搜索行（风格1~4）避让：
// - 无标题栏时搜索行是顶部第一个元素，沿用 navbarInnerStyle（padding-top 避开状态栏 + padding-right 避开胶囊）
// - 有标题栏时标题栏已完整让出「状态栏 + 胶囊」整块区域，搜索行落在胶囊下方，无需再做任何避让
//   （早期这里少了标题栏的 height，导致搜索行被顶进胶囊的垂直范围而被遮挡）
// - 内嵌单行风格（风格1 返回箭头+logo+搜索框 / 风格3 返回箭头+定位+搜索框）额外处理：
//   整行内容都不高于胶囊，必须给出 height 把内容区锁定成胶囊高，
//   否则该行高度由内容自身撑开，内容中心会偏离胶囊中心，搜索框与胶囊不在同一条水平线上
// - 风格2 特殊：这条 :style 绑在「第一行（返回箭头 + 生活圈 + 副标题）」上，而不是外层容器。
//   外层 .diy-search-wrap 自带 padding-top 16rpx(8px)，内层再叠一份 padding-top 会连多沉 8px，
//   表现就是这一行「像底部对齐」。所以要把外层那 8px 减掉，再锁内容区高度做居中。
//   （第二行搜索框在胶囊下方，不需要任何避让）
const searchWrapStyle = computed(() => {
    if (props.global.topStatusBar?.isShow) return '';
    if (isShowHeader.value) return '';
    const info: any = systemStore.menuButtonInfo || {};
    const top = Number(info.top) || 0;
    const height = Number(info.height) || 0;
    const style = diyComponent.value?.search?.style || '';
    if (style == 'style-2' && height) {
        // 外层已贡献 16rpx(8px) 的 padding-top，这里用 calc 扣掉，让内容顶边正好落在胶囊顶边；
        // box-sizing 显式声明 border-box 后再用 height = padding-top + 胶囊高，使 content-box 恰好等于胶囊高，
        // 配合 align-items:center 即内容中心 == 胶囊中心
        return `box-sizing:border-box;padding-top:calc(${ top }px - 16rpx);`
             + `height:calc(${ top }px - 16rpx + ${ height }px);` + capsulePaddingRight.value;
    }
    if ((style == 'style-1' || style == 'style-3') && height) {
        // height 里补回 scss 的 padding-bottom(16rpx)，否则 border-box 下 content-box 会被压掉 8px，
        // 内容中心随之整体上移，同样对不齐胶囊
        return `padding-top:${ top }px;height:calc(${ top }px + ${ height }px + 16rpx);`
             + capsulePaddingRight.value + capsuleHeightVar.value;
    }
    // 兜底（含风格4 无标题栏）：让出状态栏 + 胶囊，同时把胶囊高传给搜索框
    return navbarInnerStyle.value + capsuleHeightVar.value;
})

// 风格2 的第一行（返回箭头 / 生活圈 logo / 副标题）是否有可见内容。
// 三项全部关掉时这一行什么都不显示，但仍被上面的避让样式锁成「胶囊那一行」的高度，
// 结果顶部留一条空白、还把搜索框往下顶了一行。
const style2TopRowVisible = computed(() => {
    const search = diyComponent.value?.search || {};
    return !!(headerConfig.value.backIsShow || search.logo || search.subTitle?.text);
})

// 风格2 第一行：有内容时按原逻辑避让并锁高；没有内容时彻底不占位（高度塌到 0）
const style2TopRowStyle = computed(() => style2TopRowVisible.value ? searchWrapStyle.value : '')

// 风格2 第二行（搜索框本身）：第一行有内容时它落在胶囊下方、不做任何避让；
// 第一行空时它会顶上来和胶囊同一行，由它自己承担避让并跟随胶囊高度。
// 这里要和 searchWrapStyle 保持一致的开关口径：全局已有导航栏时不避让、也不注入高度。
//
// 不能直接复用 navbarInnerStyle（那是给块级容器用的），本行有两个额外约束：
//   1) 本行是 w-full(width:100%) 的 flex item。content-box 下 padding-right 只会在右侧溢出、
//      内容宽度完全不变 —— 表现就是搜索框照旧整条顶到胶囊底下（实测截图：搜索框右边缘 352.7，
//      与父级内容右边缘重合，胶囊左边缘才 265，压住 87px）。必须显式 border-box，让 padding 真正挤窄内容。
//   2) 外层 .diy-search-wrap 自带 padding: 16rpx，和 searchWrapStyle 的风格2 分支同理要扣掉，
//      否则整行比胶囊低 16rpx（实测：搜索框顶边 52.0 vs 胶囊 44.3）。
// 最小复现验证（360 视口、胶囊 top 44.3/高 32）：A 现状 → 右边缘 352.3、顶边 52.0；
//   B 仅加 border-box → 右 248.3、顶边 52.0；C 再加 padding-top 扣 16rpx → 右 248.3、顶边 44.3 = 胶囊顶边。
// C 的结果与风格4（用户已确认正常的那版）完全一致。
const style2SearchRowStyle = computed(() => {
    if (style2TopRowVisible.value) return '';
    if (props.global.topStatusBar?.isShow) return '';
    const info: any = systemStore.menuButtonInfo || {};
    const top = Number(info.top) || 0;
    const height = Number(info.height) || 0;
    // APP 端没有胶囊（height 为 0），只让出状态栏；与下方小程序分支同理，
    // 要显式 border-box 并扣掉外层 .diy-search-wrap 的 16rpx padding，整行才不会比预期低 8px
    if (!height) {
        return appStatusBarHeight.value ? `box-sizing:border-box;padding-top:calc(${ appStatusBarHeight.value }px - 16rpx);` : '';
    }
    return `box-sizing:border-box;padding-top:calc(${ top }px - 16rpx);`
         + capsulePaddingRight.value + capsuleHeightVar.value;
})
/************** 小程序胶囊避让-end ****************/
// APP 端的状态栏避让已并入上方 computed 链（appStatusBarHeight / navbarInnerStyle /
// headerWrapStyle / style2SearchRowStyle 的 height 为 0 兜底分支）。
// 旧写法「navbarInnerStyle.value += 'padding-top:...'」是重构前的遗留：navbarInnerStyle 现在是
// 只读 computed，对它赋值既会告警、也会在下次重算时被覆盖，实际早已不生效，故移除。

onMounted(() => {
    refresh();
    // 装修模式下刷新
    if (diyStore.mode == 'decorate') {
        watch(
            () => diyComponent.value,
            (newValue, oldValue) => {
                if (newValue && newValue.componentName == 'CarouselSearch') {
                    diyStore.topFixedStatus = 'home'; // 装修页的微页面始终展示home
                    refresh();
                }
            }
        )
    }
    // 判断让轮播指示器是否出现
    // #ifdef H5
    isShowDots = computed(() => {
        return diyComponent.value?.swiper?.list?.length > 1;
    });
    // #endif
    // 胶囊避让已全部改为 computed（navbarInnerStyle / headerWrapStyle / searchWrapStyle），
    // 不再需要在挂载时手工拼字符串：拼早了胶囊信息还没到位，拼晚了又会留下 0 值
});

onUnmounted(() => {
    uni.removeStorageSync(getTopFixedStatusName(props.global))
})

const refresh = () => {
    setModuleLocation();
    // 刷新定位
    locationVal.refresh();
    changeData({ source: 'home' }, -1)
    diyComponent.value.swiper.list.forEach((item: any) => {
        if (item.imageUrl == '') {
            item.imgWidth = 690;
            item.imgHeight = 330;
        }
    });
}

const diyPageData = reactive({
    pageMode: 'diy',
    title: '',
    global: {},
    value: []
});

const getDiyInfoFn = (id: any) => {
    if (!id) {
        diyPageData.pageMode = 'diy';
        diyPageData.title = '';
        diyPageData.global = {};
        diyPageData.value = [];
        return;
    }
    getDiyInfo({
        id
    }).then((res: any) => {
        if (res.data.value) {
            let data = res.data;
            diyPageData.pageMode = data.mode;
            diyPageData.title = data.title;

            let sources = JSON.parse(data.value);
            diyPageData.global = sources.global;
            diyPageData.global.topStatusBar.isShow = false; // 子页面不需要展示顶部导航栏
            diyPageData.global.bottomTabBar.isShow = false; // 子页面不需要展示底部导航
            diyPageData.value = sources.value;

            diyPageData.value.forEach((item: any, index) => {
                item.componentIsShow = true // 是否显示
                item.pageStyle = '';
                if (item.pageStartBgColor) {
                    if (item.pageStartBgColor && item.pageEndBgColor) item.pageStyle += `background:linear-gradient(${ item.pageGradientAngle },${ item.pageStartBgColor },${ item.pageEndBgColor });`;
                    else item.pageStyle += 'background-color:' + item.pageStartBgColor + ';';
                }

                if (item.margin) {
                    if (item.margin.top > 0) {
                        item.pageStyle += 'padding-top:' + item.margin.top * 2 + 'rpx' + ';';
                    }
                    item.pageStyle += 'padding-bottom:' + item.margin.bottom * 2 + 'rpx' + ';';
                    item.pageStyle += 'padding-right:' + item.margin.both * 2 + 'rpx' + ';';
                    item.pageStyle += 'padding-left:' + item.margin.both * 2 + 'rpx' + ';';
                }
            });
            uni.setNavigationBarTitle({
                title: diyPageData.title
            })
        }
    });
}

// 轮播指示器
let isShowDots = ref(true)
// #ifdef H5
isShowDots.value = true;
// #endif

// #ifdef MP-WEIXIN
isShowDots.value = false;
// #endif

/******************************* 存储滚动值-start ***********************/
    // 键名和组件名一致即可
let componentsScrollVal = uni.getStorageSync('componentsScrollValGroup')
if (componentsScrollVal && (typeof componentsScrollVal == "object")) {
    componentsScrollVal.CarouselSearch = 20
    uni.setStorageSync('componentsScrollValGroup', componentsScrollVal);
} else {
    let obj = {
        CarouselSearch: 20
    }
    uni.setStorageSync('componentsScrollValGroup', obj);
}
/******************************* 存储滚动值-end ***********************/
</script>

<style lang="scss" scoped>
.goods-carousel-search-wrap {
    .bg-img {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        z-index: 0;
        -webkit-filter: blur(0);
        filter: blur(0);
        overflow: hidden;
        &.imp-minus-bottom200 {
            bottom: -200rpx !important;
        }

        uni-image, image {
            -webkit-filter: blur(15px);
            filter: blur(15px);
            -webkit-transform: scale(2) translateY(15%);
            transform: scale(2) translateY(15%);
        }

        &.no-filter {
            uni-image, image {
                -webkit-filter: blur(0);
                filter: blur(0);
            }
        }

        .bg-img-box {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
    }
}

.fixed-wrap {
    &.fixed {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 991;
        transition: background .3s;
    }
}

// 返回箭头：通用标题栏与内嵌风格（风格1 搜索行 / 风格2 生活圈行 / 风格3 定位左侧）共用
.header-back {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    // 更大的点击热区，与小程序胶囊体量相当
    min-width: 56rpx;
    min-height: 56rpx;

    .nc-iconfont {
        font-size: 44rpx;
        font-weight: bold;
        line-height: 1;
    }
}

// 顶部标题栏：返回箭头 + 标题 + 地址定位
.diy-header-wrap {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 16rpx 16rpx 0;

    .header-back {
        // 箭头热区（56rpx）已比图标（44rpx）左右各多出 6rpx 视觉留白，
        // 这里不再额外加 margin/padding，否则箭头与标题之间会空一大截
        margin-right: 0;
    }

    .header-title {
        flex-shrink: 0;
        max-width: 320rpx;
        margin-right: 20rpx;
        // 字号保持与返回箭头同量级；字重用 500 而非 700 —— 36rpx 下 700 视觉过重，
        // 500 在 iOS 为 medium、Android 多为 regular/medium，重量感刚好
        font-size: 36rpx;
        font-weight: 500;
        line-height: 1.2;
    }

    .header-position {
        display: flex;
        align-items: center;
        min-width: 0;
        font-size: 24rpx;
        line-height: 1.2;

        .nc-iconfont {
            flex-shrink: 0;
            font-size: 28rpx;
            line-height: 1;
            // 图标字形在 em 盒内天然偏上：与同排地址文字相比，墨迹中心偏高。
            // Chrome 实测 @375 视口：定位图标偏上 0.52px、右箭头 1.02px。
            // 该偏差来自浏览器字形渲染，只出现在 H5；小程序端为原生渲染，本身已对齐，
            // 若同样下移反而偏低（实测胶囊行整体视觉下沉），所以仅 H5 生效。
            /* #ifdef H5 */
            margin-top: 2rpx;
            /* #endif */
        }

        // 向右箭头字形更小、墨迹完全不越过基线，比定位图标再多下移一档（同样仅 H5）
        .nc-iconfont.header-position-arrow {
            /* #ifdef H5 */
            margin-top: 3rpx;
            /* #endif */
        }

        .header-position-text {
            min-width: 0;
            // 限制最大宽度：长地址不要几乎占满顶部整行，超出走省略号
            max-width: 260rpx;
            // 小程序下 <text> 默认为 inline，需显式 overflow 才能让 truncate 生效
            overflow: hidden;
            // 右侧不留间距，交给 .header-position-arrow 的负外边距把箭头拉近
            margin: 0 0 0 4rpx;
        }
    }
}

// 定位/地址右侧的向右箭头：图标字形自带左右空白，只靠 margin 永远看着有距离，
// 用负外边距把它拉回文字旁边（字号不同则字形空白不同，按需覆盖）
.header-position-arrow {
    margin-left: -4rpx;
}

.diy-search-wrap {
    display: flex;
    position: relative;
    align-items: center;
    padding: 16rpx;
    // 显式声明：风格3 依赖 border-box 计算内容区高度来与胶囊对齐，不能依赖全局 reset
    box-sizing: border-box;

    // 返回箭头热区加宽（56rpx → 76rpx，28px → 38px）：
    // 箭头字形 44rpx，热区原本 56rpx（28px）远小于 44px 的舒适点击区，瞄着箭头点、手指偏一点
    // 就落到紧贴着它的元素上（风格1/2 是上传的 logo 图，风格3 是地址定位文字）。
    // 用负外边距把加宽出来的部分收回去，箭头墨迹仍是 [22rpx, 66rpx]，下一个元素的起始位置也不变：
    //   风格1/2 的 logo 仍从 72rpx 起，风格3 的地址定位由下面 style-3 的 -6rpx 保证仍从 76rpx 起。
    .header-back {
        position: relative;
        // 热区右侧那几 rpx 与相邻元素有极小重叠，抬一层保证以「返回」为准：
        // 用户瞄的是箭头，宁可多判成返回，也不要跳到别处
        z-index: 2;
        min-width: 76rpx;
        margin-left: -10rpx;
        margin-right: -10rpx;
    }

    // 搜索框的点击热区：搜索框是 50rpx 圆角，border-radius 会把可点区域裁成圆角矩形，
    // 圆角外侧的点击会穿透到父级。以前由整行父级兜着跳搜索，于是「元素之间的空白」也跳搜索；
    // 现在父级不再兜底，改由这个不带圆角的矩形包裹层承载——点在搜索框盒子里（含圆角外侧）都能进搜索页。
    .search-hit-wrap {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
    }

    .img-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 140rpx;
        height: 60rpx;
        margin-right: 20rpx;

        image {
            width: 100%;
            height: 100%;
        }
    }

    .search-content {
        display: flex;
        align-items: center;
        padding-left: 32rpx;
        padding-right: 6rpx;
        border-radius: 50rpx;
        background-color: rgba(255, 255, 255, .2);
        flex: 1;
        position: relative;

        // 搜索框与胶囊同行时（容器上由 JS 注入 --nc-capsule-h），高度改跟胶囊真实高度走：
        // 60rpx 是设计稿尺寸、随屏宽线性缩放，而胶囊高恒为 32px —— 430px 屏折算 34.4px（比胶囊高 2.4px）、
        // 320 屏只有 25.6px（又比胶囊矮 6.4px），于是同一套样式在宽屏上搜索框高出胶囊一截。
        // 未注入该变量时（有标题栏 / 风格2 搜索框在下一行 / H5）保持原设计稿尺寸不变。
        .input-content, .uni-input {
            box-sizing: border-box;
            display: block;
            height: var(--nc-capsule-h, 60rpx);
            line-height: var(--nc-capsule-h, 64rpx);
            width: 100%;
            padding-right: 20rpx;
            color: #fff;
            background: none;
            flex: 1;
        }

        .iconfont {
            font-size: 30rpx;
            font-weight: bold;
            color: #fff;
        }

        // 热词轮播与搜索框同高（否则容器被压到胶囊高后，绝对定位的它仍按 64rpx 撑出去）
        .swiper-wrap {
            position: absolute;
            width: 80%;
            height: var(--nc-capsule-h, 64rpx);
            line-height: var(--nc-capsule-h, 64rpx);
            color: #fff;
        }
    }

    &.style-2 {
        flex-direction: column;
        align-items: baseline;

        .img-wrap {
            margin-right: 10rpx;
        }

        // 地址定位并入搜索行左侧后，与风格3 同字号（24rpx），箭头字形空白也一致，负外边距同样收一点
        .header-position-arrow {
            margin-left: -2rpx;
        }
    }
}

.tab-list-wrap {
    .scroll-wrap {
        left: 0;
        right: 0;
        z-index: 5;
        width: 100%;
        white-space: nowrap;
        box-sizing: border-box;
        padding: 24rpx 80rpx 26rpx 20rpx;
        line-height: 1;
    }

    .scroll-item {
        display: inline-block;
        text-align: center;
        vertical-align: top;
        width: auto;
        position: relative;
        padding: 0 20rpx;

        .name {
            font-size: 28rpx;
            color: #333;
            line-height: 32rpx;
        }

        &.active {
            position: relative;

            .name {
                font-size: 30rpx;
                font-weight: 500;
            }
        }
    }

    .tab-btn {
        font-size: 34rpx;
        /* #ifdef H5 */
        top: 22rpx;
        right: 20rpx;
        line-height: 1;
        color: #fff;

        &::after {
            content: "";
            position: absolute;
            top: 2rpx;
            bottom: -4rpx;
            left: -14rpx;
            width: 2rpx;
            background: linear-gradient(180deg, #FFFFFF 16%, rgba(255, 255, 255, 0) 86%);
        }

        /* #endif */
        /* #ifdef MP-WEIXIN */
        top: 24rpx;
        right: 20rpx;
        color: #fff;

        &::after {
            content: "";
            position: absolute;
            top: 2rpx;
            bottom: 0;
            left: -16rpx;
            width: 4rpx;
            background: linear-gradient(180deg, #FFFFFF 16%, rgba(255, 255, 255, 0) 92%);
        }

        /* #endif */
    }
}

.tab-select-popup {
    color: var(--primary-color);
    border-color: var(--primary-color);
    background-color: var(--primary-color-light);
}

.swiper-animation {
    transform: scale(0.96, 0.96);
    transition-duration: 0.3s;
    transition-timing-function: ease;
}

// 轮播指示器
.swiper-right :deep(.uni-swiper-dots-horizontal) {
    right: 80rpx;
    display: flex;
    justify-content: flex-end;
    transform: translate(0);
}

.swiper-left :deep(.uni-swiper-dots-horizontal) {
    left: 80rpx;
    transform: translate(0);
}

// 指示器样式一
.swiper :deep(.uni-swiper-dot) {
    width: 12rpx;
    height: 12rpx;
}

// 指示器样式二
.swiper.ns-indicator-dots :deep(.uni-swiper-dot) {
    width: 18rpx;
    height: 6rpx;
    border-radius: 4rpx;
}

.swiper.ns-indicator-dots :deep(.uni-swiper-dot-active) {
    width: 36rpx;
}

// 指示器样式三
.swiper.ns-indicator-dots-three :deep(.uni-swiper-dot) {
    width: 8rpx;
    height: 8rpx !important;
    border-radius: 6rpx;
    margin-right: 14rpx;
}

.swiper.ns-indicator-dots-three :deep(.uni-swiper-dot):last-of-type {
    margin-right: 0;
}

.swiper.ns-indicator-dots-three :deep(.uni-swiper-dot-active) {
    width: 30rpx;
}

.swiper-dot-box {
    position: absolute;
    bottom: 20rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 80rpx 8rpx;
    box-sizing: border-box;

    &.swiper-left {
        justify-content: flex-start;
    }

    &.swiper-right {
        justify-content: flex-end;
    }

    .swiper-dot {
        background-color: #b2b2b2;
        width: 12rpx;
        border-radius: 50%;
        height: 12rpx;
        margin: 8rpx;
    }

    &.straightLine {
        .swiper-dot {
            width: 18rpx;
            height: 6rpx;
            border-radius: 6rpx;

            &.active {
                width: 36rpx;
            }
        }
    }

    &.straightLineStyle2 {
        .swiper-dot {
            width: 10rpx;
            height: 10rpx;
            border-radius: 6rpx;
            margin: 0 14rpx 0 0;

            &.last-of-type {
                margin-right: 0;
            }

            &.active {
                width: 30rpx;
            }
        }
    }
}

.swiper-style-3 {
    :deep(.uni-swiper-dots-horizontal) {
        bottom: 46rpx !important;
    }

    .swiper-dot-box {
        bottom: 38rpx !important;
    }
}
.mx20 {
    margin-left: 20rpx;
    margin-right: 20rpx;
}
.tab-wrap {
    padding-left: 26rpx;
    padding-right: 26rpx;
    border-width: 2rpx;
    border-style: solid;
    border-color: transparent;
    height: 60rpx;
    margin-right: 30rpx;
    margin-bottom: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F4F4F4;
    border-radius: 8rpx;
}
</style>
