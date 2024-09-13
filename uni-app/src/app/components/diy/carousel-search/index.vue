<template>
	<view :style="warpCss" class="goods-carousel-search-wrap">
		<view class="relative pb-[20rpx]">
			<view class="bg-img" :class="{'!-bottom-[200rpx]': diyComponent.bgGradient == true}">
				<image v-if="diyComponent.swiper.list && diyComponent.swiper.list[swiperIndex].imageUrl" :src="img(diyComponent.swiper.list[swiperIndex].imageUrl)" mode="scaleToFill" class="w-full h-full" :show-menu-by-longpress="true"/>
				<view v-else class="w-full h-full bg-[#ccc]"></view>
				<view class="bg-img-box" :style="bgImgBoxStyle"></view>
			</view>
			<view class="fixed-wrap" :style="fixedStyle">
				<view class="diy-search-wrap relative z-10" @click="diyStore.toRedirect(diyComponent.search.link)" :style="navbarInnerStyle">
					<view class="img-wrap" v-if="diyComponent.search.logo">
						<image :src="img(diyComponent.search.logo)" mode="aspectFit"/>
					</view>
					<view class="search-content" @click.stop="diyStore.toRedirect(diyComponent.search.link)">
						<text class="input-content text-[#fff] text-[24rpx] leading-[68rpx]">{{isShowSearchPlaceholder ? diyComponent.search.text : ''}}</text>
						<text class="nc-iconfont nc-icon-sousuo-duanV6xx1 text-[28rpx] text-[#fff]"></text>

						<swiper class="swiper-wrap" :interval="diyComponent.search.hotWord.interval * 1000" autoplay="true" vertical="true" circular="true" v-if="!isShowSearchPlaceholder">
							<swiper-item class="swiper-item" v-for="(item) in diyComponent.search.hotWord.list" :key="item.id">
								<view class=" leading-[64rpx] text-[24rpx]">{{ item.text }}</view>
							</swiper-item>
						</swiper>
					</view>

				</view>

				<view class="tab-list-wrap relative z-10" v-if="diyComponent.tab.control">
					<scroll-view scroll-x="true" class="scroll-wrap" :scroll-into-view="'a' + currTabIndex">
						<view @click="changeData({ source : 'home' },-1)" class="scroll-item" :class="[{ active: currTabIndex == -1 }]">
							<view class="name" :style="{'color': getTabColor(currTabIndex == -1)}">首页</view>
							<view class="line" :style="{'background-color': getTabColor(currTabIndex == -1)}" v-if="currTabIndex == -1"></view>
						</view>
						<view v-for="(item, index) in diyComponent.tab.list" class="scroll-item" :class="[{ active: index == currTabIndex }]" @click="changeData(item,index)" :id="'a' + index" :key="index">
							<view class="name" :style="{'color': getTabColor(index == currTabIndex)}">{{ item.text }}</view>
							<view class="line" :style="{'background-color': getTabColor(index == currTabIndex)}" v-if="index == currTabIndex"></view>
						</view>
					</scroll-view>
					<view v-if="diyComponent.tab.list.length" class="absolute tab-btn iconfont icona-yingyongliebiaoV6xx-32" @click="tabAllPopup = true"></view>
				</view>
                
				<view class="bg-img" v-if="fixedStyleBg">
					<image v-if="diyComponent.swiper.list && diyComponent.swiper.list[swiperIndex].imageUrl" :src="img(diyComponent.swiper.list[swiperIndex].imageUrl)" mode="scaleToFill" class="w-full h-full" :show-menu-by-longpress="true"/>
					<view v-else class="w-full h-full bg-[#ccc]"></view>
				</view>
			</view>
			
			<!-- 解决fixed定位后导航栏塌陷的问题 -->
			<template v-if="diyStore.mode != 'decorate'">
				<view v-if="diyComponent.positionWay == 'fixed' && props.scrollBool != -1" class="u-navbar-placeholder" :style="{ width: '100%', paddingTop: moduleHeight }"></view>
			</template>
			
			<!-- 轮播图 -->
			<view class="relative" :class="{'mx-[20rpx]': swiperStyle2}">
				<swiper v-if="diyComponent.swiper.control" class="swiper" :style="{ height: imgHeight }" autoplay="true" circular="true" @change="swiperChange"
					:class="{
						'swiper-left': diyComponent.swiper.indicatorAlign == 'left',
						'swiper-right': diyComponent.swiper.indicatorAlign == 'right',
						'ns-indicator-dots': diyComponent.swiper.indicatorStyle == 'style-2'
					}"
					:previous-margin="swiperStyle2 ? 0 : '26rpx'" :next-margin="swiperStyle2 ? 0 : '26rpx'"
				    :interval="diyComponent.swiper.interval * 1000" :indicator-dots="isShowDots"
				    :indicator-color="diyComponent.swiper.indicatorColor" :indicator-active-color="diyComponent.swiper.indicatorActiveColor">
					<swiper-item class="swiper-item" v-for="(item,index) in diyComponent.swiper.list" :key="item.id" :style="swiperWarpCss">
						<view @click="diyStore.toRedirect(item.link)">
							<view class="item" :style="{height: imgHeight}">
								<image v-if="item.imageUrl" :src="img(item.imageUrl)" mode="scaleToFill" :style="swiperWarpCss" :class="['w-full h-full',{'swiper-animation': swiperIndex != index}]" :show-menu-by-longpress="true"/>
								<image v-else :src="img('static/resource/images/diy/figure.png')" :style="swiperWarpCss" mode="scaleToFill" :class="['w-full h-full',{'swiper-animation': swiperIndex != index}]" :show-menu-by-longpress="true"/>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<!-- #ifdef MP-WEIXIN -->
				<view v-if="diyComponent.swiper.list.length > 1" :class="[
						'swiper-dot-box',
						{ 'straightLine': diyComponent.swiper.indicatorStyle == 'style-2' },
						{ 'swiper-left': diyComponent.swiper.indicatorAlign == 'left' },
						{ 'swiper-right': diyComponent.swiper.indicatorAlign == 'right' }
					]">
					<view v-for="(numItem, numIndex) in diyComponent.swiper.list" :key="numIndex" :class="['swiper-dot', { active: numIndex == swiperIndex }]" :style="[numIndex == swiperIndex ? { backgroundColor: diyComponent.swiper.indicatorActiveColor } : { backgroundColor: diyComponent.swiper.indicatorColor }]"></view>
				</view>
				<!-- #endif -->
			</view>
			
			<!-- 分类展开 -->
			<u-popup :safeAreaInsetTop="true" :show="tabAllPopup" mode="top" @close="tabAllPopup = false">
				<view class="text-sm px-[30rpx] pt-3" :style="{'padding-top':(menuButtonInfo.top+'px')}">全部分类</view>
				<view class="flex flex-wrap pl-[30rpx] pt-[30rpx]">
					<view @click="changeData({ source : 'home' },-1)" :class="['px-[26rpx] border-[2rpx] border-solid border-transparent h-[60rpx] mr-[30rpx] mb-[30rpx] flex items-center justify-center bg-[#F4F4F4] rounded-[8rpx] text-xs', { 'tab-select-popup': currTabIndex == -1 }]">
						首页
					</view>
					<text @click="changeData(item,index)" v-for="(item, index) in diyComponent.tab.list" :key="index"
						:class="['px-[26rpx] border-[2rpx] border-solid border-transparent h-[60rpx] mr-[30rpx] mb-[30rpx] flex items-center justify-center bg-[#F4F4F4] rounded-[8rpx] text-xs', { 'tab-select-popup': index == currTabIndex }]">
						{{ item.text }}
					</text>
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
	import { ref, reactive, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
	import { img } from '@/utils/common';
	import useDiyStore from '@/app/stores/diy';
    import diyGroup from '@/addon/components/diy/group/index.vue'
    import { getDiyInfo } from '@/app/api/diy';

	const instance = getCurrentInstance();
	const props = defineProps(['component', 'index', 'pullDownRefreshCount', 'global', 'scrollBool']);
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
        if(diyComponent.value.componentStartBgColor) {
            if (diyComponent.value.componentStartBgColor && diyComponent.value.componentEndBgColor) style += `background:linear-gradient(${diyComponent.value.componentGradientAngle},${diyComponent.value.componentStartBgColor},${diyComponent.value.componentEndBgColor});`;
            else style += 'background-color:' + diyComponent.value.componentStartBgColor + ';';
        }
		if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		return style;
	})

	watch(
		() => props.pullDownRefreshCount,
		(newValue, oldValue) => {
			// 处理下拉刷新业务
		}
	)

    const moduleHeight:any = ref('')

    const setModuleLocation = ()=> {
        nextTick(() => {
			setTimeout(()=>{
				const query = uni.createSelectorQuery().in(instance);
				query.select('.fixed-wrap').boundingClientRect((data:any) => {
					moduleHeight.value = (data.height || 0) + 'px';
				}).exec();
			})
        })
    }

    const fixedStyleBg = ref(false);
	const fixedStyle = computed(()=>{
        if (diyStore.mode == 'decorate') return '';
        var style = '';
        // #ifdef H5
        if(props.global.topStatusBar.isShow && props.global.topStatusBar.style == 'style-4') {
            style += 'top:' + diyStore.topTabarHeight + 'px;';
        }
        // #endif
		
        if(diyComponent.value.positionWay == 'fixed') {
			if (props.scrollBool != -1) {
				style += 'position: fixed;z-index: 10;left: 0;right: 0;';
			}
			
            // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
			menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			if(props.global.topStatusBar.isShow) {
				style += 'top:' + diyStore.topTabarHeight + 'px;';
			}
            // #endif
			
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

	const getTabColor = (flag:any)=>{
	    let color = '';
        if(flag){
            color = diyComponent.value.tab.selectColor;
            if(diyComponent.value.positionWay == 'fixed' && props.scrollBool == 1) {
                color = diyComponent.value.tab.fixedSelectColor;
            }
        }else{
            color = diyComponent.value.tab.noColor;
            if(diyComponent.value.positionWay == 'fixed' && props.scrollBool == 1) {
                color = diyComponent.value.tab.fixedNoColor;
            }
        }

        return color;
	}

	const isShowSearchPlaceholder = computed(()=> {
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
	const bgImgBoxStyle = computed(()=>{
		var style = '';
		let str = props.global.pageStartBgColor ? props.global.pageStartBgColor : 'rgba(255,255,255,1)';
		if(str.indexOf('(') > -1) {
            let arr = str.split('(')[1].split(')')[0].split(',');
            if (diyComponent.value.bgGradient == true) {
                style += `background: linear-gradient(rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, 0) 65%, rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, 0.6) 70%, rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, 0.85) 80%, rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, 0.95) 90%,  rgb(${arr[0]}, ${arr[1]}, ${arr[2]}, 1) 100%);`;
            }
        }else{
            style += `background: (${str});`;
		}
		return style;
	});

	// 轮播样式二
	const swiperStyle2 = computed(()=>{
		var style = diyComponent.value.swiper.swiperStyle == 'style-2' ? true : false;
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
        var style = '';
        if (diyComponent.value.swiper.topRounded) style += 'border-top-left-radius:' + diyComponent.value.swiper.topRounded * 2 + 'rpx;';
        if (diyComponent.value.swiper.topRounded) style += 'border-top-right-radius:' + diyComponent.value.swiper.topRounded * 2 + 'rpx;';
        if (diyComponent.value.swiper.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.swiper.bottomRounded * 2 + 'rpx;';
        if (diyComponent.value.swiper.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.swiper.bottomRounded * 2 + 'rpx;';
        return style;
    })

	const currTabIndex = ref(-1)

	const currentSource = ref('')

	const changeData = (item:any,index:any)=> {
        if (diyStore.mode == 'decorate') return false;
        currentSource.value = item.source;
        currTabIndex.value = index;
	    if(item.source == 'home'){

	        // 首页
            diyStore.topFixedStatus = 'home'

	    }else if (item.source == 'diy_page') {

            // 查询微页面数据
            diyStore.topFixedStatus = 'diy'
            getDiyInfoFn(item.diy_id);

        }
    }

    const tabAllPopup = ref(false);
    let menuButtonInfo: any = {};
    const navbarInnerStyle = ref('')

    onMounted(() => {
        refresh();
        // 装修模式下刷新
        if (diyStore.mode == 'decorate') {
            watch(
                () => diyComponent.value,
                (newValue, oldValue) => {
                    if (newValue && newValue.componentName == 'CarouselSearch') {
                        refresh();
                    }
                }
            )
        }

        // 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
        // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
	    if(diyComponent.value.positionWay == 'fixed') {
            menuButtonInfo = uni.getMenuButtonBoundingClientRect();
            // 导航栏内部盒子的样式
            // 导航栏宽度，如果在小程序下，导航栏宽度为胶囊的左边到屏幕左边的距离
            // 如果是各家小程序，导航栏内部的宽度需要减少右边胶囊的宽度
			if(props.global.topStatusBar.isShow == false) {
				let rightButtonWidth = menuButtonInfo.width ? menuButtonInfo.width * 2 + 'rpx' : '70rpx';
				navbarInnerStyle.value += 'padding-right:calc(' + rightButtonWidth + ' + 30rpx);';
				navbarInnerStyle.value += 'padding-top:' + menuButtonInfo.top + 'px;';
			}
			
        }
        // #endif

    });
	
	const refresh = ()=> {
        setModuleLocation();
		changeData({ source : 'home' },-1)
        diyComponent.value.swiper.list.forEach((item : any) => {
            if (item.imageUrl == '') {
                item.imgWidth = 690;
                item.imgHeight = 330;
            }
        });
    }

    const diyPageData = reactive({
        pageMode: 'diy',
        title: '',
        global: <any>{},
        value: []
    })

    const getDiyInfoFn = (id:any) => {
	    if(!id){
			diyPageData.pageMode = 'diy';
			diyPageData.title = '';
			diyPageData.global = {};
			diyPageData.value = [];
			return;
		}
        getDiyInfo({
            id
        }).then((res : any) => {
            if (res.data.value) {
                let data = res.data;
                diyPageData.pageMode = data.mode;
                diyPageData.title = data.title;

                let sources = JSON.parse(data.value);
                diyPageData.global = sources.global;
				diyPageData.global.topStatusBar.isShow = false; // 子页面不需要展示顶部导航栏
                diyPageData.global.bottomTabBarSwitch = false; // 子页面不需要展示底部导航
                diyPageData.value = sources.value;

                diyPageData.value.forEach((item: any, index) => {
                    item.pageStyle = '';
                    if(item.pageStartBgColor) {
                        if (item.pageStartBgColor && item.pageEndBgColor) item.pageStyle += `background:linear-gradient(${item.pageGradientAngle},${item.pageStartBgColor},${item.pageEndBgColor});`;
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
	if(componentsScrollVal && (typeof componentsScrollVal == "object")){
		componentsScrollVal.CarouselSearch = 20
		uni.setStorageSync('componentsScrollValGroup', componentsScrollVal);
	}else{
		let obj = {
			CarouselSearch: 20
		}
		uni.setStorageSync('componentsScrollValGroup', obj);
	}
	/******************************* 存储滚动值-end ***********************/ 

</script>

<style lang="scss" scoped>
	.goods-carousel-search-wrap{
		.bg-img{
			position: absolute;
			width: 100%;
			top: 0;
			bottom: 0;
			z-index: 0;
			-webkit-filter: blur(0);
			filter: blur(0);
			overflow: hidden;
			uni-image, image{
				-webkit-filter: blur(15px);
				filter: blur(15px);
				-webkit-transform: scale(1.5);
				transform: scale(1.5);
			}
			.bg-img-box{
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

	.diy-search-wrap{
		display: flex;
		position: relative;
		align-items: center;
		padding:20rpx;
		.img-wrap{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 140rpx;
			height: 60rpx;
			margin-right: 30rpx;
			image{
				width: 100%;
				height:100%;
			}
		}

		.search-content {
			display: flex;
			align-items: center;
			padding: 0 32rpx;
			border-radius: 50rpx;
			background-color: rgba(255,255,255,.2);
			flex: 1;
			position: relative;
			.input-content, .uni-input {
				box-sizing: border-box;
				display: block;
				height: 60rpx;
				line-height: 64rpx;
				width: 100%;
				padding-right: 20rpx;
				color: #fff;
				background: none;
			}
			.iconfont {
				font-size: 30rpx;
				font-weight: bold;
				color: #fff;
			}
			.swiper-wrap{
				position: absolute;
				width:80%;
				height: 64rpx;
				line-height: 64rpx;
				color:#fff;
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
			padding: 20rpx 80rpx 20rpx 20rpx;
		}
		.scroll-item {
			display: inline-block;
			text-align: center;
			vertical-align: top;
			width: auto;
			position: relative;
			padding: 0 20rpx;
			height:54rpx;
			.name {
				font-size: 28rpx;
				color: #333;
				line-height: 38rpx;
				margin-bottom: 15rpx;
			}
		
			&.active {
				position: relative;
				.name {
					font-size: 28rpx;
					line-height: 38rpx;
					font-weight: 700;
				}
				.line{
					position: absolute;
					bottom: 0rpx;
					width: 34rpx;
					height: 4rpx;
					border-radius: 2rpx;
					left: 50%;
					transform: translateX(-50%);
				}
			}
		}
		.tab-btn{
			font-size: 34rpx;
			/* #ifdef H5 */ 
			top: 22rpx;
			right: 20rpx;
			line-height: 1;
			color: #fff;
			&::after{
				content: "";
				position: absolute;
				top: 2rpx;
				bottom: -4rpx;
				left: -14rpx;
				width: 2rpx;
				background: linear-gradient( 180deg, #FFFFFF 16%, rgba(255,255,255,0) 86%);
			}
			/* #endif */
			/* #ifdef MP-WEIXIN */
			top: 24rpx;
			right: 20rpx;
			color: #fff;
			&::after{
				content: "";
				position: absolute;
				top: 2rpx;
				bottom: 0;
				left: -16rpx;
				width: 4rpx;
				background: linear-gradient( 180deg, #FFFFFF 16%, rgba(255,255,255,0) 92%);
			}
			/* #endif */
		}
	}
	.tab-select-popup{
		color: var(--primary-color);
		border-color: var(--primary-color);
		background-color: var(--primary-color-light);
	}
	.swiper-animation{
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
	.swiper :deep(.uni-swiper-dot) {
		width: 12rpx;
		height: 12rpx;
	}
	.swiper.ns-indicator-dots :deep(.uni-swiper-dot) {
		width: 18rpx;
		height: 6rpx;
		border-radius: 4rpx;
	}
	.swiper.ns-indicator-dots :deep(.uni-swiper-dot-active) {
		width: 36rpx;
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
				border-radius: 4rpx;
	
				&.active {
					width: 36rpx;
				}
			}
		}
	}
</style>