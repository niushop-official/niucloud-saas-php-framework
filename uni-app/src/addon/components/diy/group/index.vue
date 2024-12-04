<template>
    <view class="diy-group" id="componentList">
        <top-tabbar v-if="data.global && Object.keys(data.global).length && data.global.topStatusBar && data.global.topStatusBar.isShow" :scrollBool="diyGroup.componentsScrollBool.TopTabbar"  ref="topTabbarRef" :data="data.global" />
        <view v-for="(component, index) in data.value" :key="component.id" @click="diyStore.changeCurrentIndex(index, component)" :class="diyGroup.getComponentClass(index,component)" :style="component.pageStyle">
            <view class="relative" :style="{ marginTop : component.margin.top < 0 ? (component.margin.top * 2) + 'rpx' : '0' }">

                <!-- 装修模式下，设置负上边距后超出的内容，禁止选中设置 -->
                <view v-if="diyGroup.isShowPlaceHolder(index,component)" class="absolute w-full z-1" :style="{ height : (component.margin.top * 2 * -1) + 'rpx' }" @click.stop="diyGroup.placeholderEvent"></view>

                <template v-if="component.componentName == 'GraphicNav'">
                    <diy-graphic-nav :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount" />
                </template>
                <template v-if="component.componentName == 'HorzBlank'">
                    <diy-horz-blank :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount" />
                </template>
                <template v-if="component.componentName == 'HorzLine'">
                    <diy-horz-line :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount" />
                </template>
                <template v-if="component.componentName == 'HotArea'">
                    <diy-hot-area :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount" />
                </template>
                <template v-if="component.componentName == 'ImageAds'">
                    <diy-image-ads :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount" />
                </template>
                <template v-if="component.componentName == 'MemberInfo'">
                    <diy-member-info :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount" />
                </template>
                <template v-if="component.componentName == 'MemberLevel'">
                    <diy-member-level :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount" />
                </template>
                <template v-if="component.componentName == 'Notice'">
                    <diy-notice :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount" />
                </template>
                <template v-if="component.componentName == 'RubikCube'">
                    <diy-rubik-cube :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount" />
                </template>
                <template v-if="component.componentName == 'Text'">
                    <diy-text :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount" />
                </template>
                <template v-if="component.componentName == 'RichText'">
                    <diy-rich-text :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount"/>
                </template>
                <template v-if="component.componentName == 'ActiveCube'">
                    <diy-active-cube :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount"/>
                </template>
                <template v-if="component.componentName == 'FloatBtn'">
                    <diy-float-btn :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount"/>
                </template>
                <template v-if="component.componentName == 'CarouselSearch'">
                    <diy-carousel-search :scrollBool="diyGroup.componentsScrollBool.CarouselSearch" :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount" />
                </template>
				<template v-if="component.componentName == 'PictureShow'">
					<diy-picture-show :component="component" :global="data.global" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount" />
				</template>
            </view>
        </view>
        <template v-if="diyStore.mode == '' && data.global.bottomTabBarSwitch">
            <view class="pt-[20rpx]"></view>
            <tabbar />
        </template>
    </view>
</template>
<script lang="ts" setup>
    import topTabbar from '@/components/top-tabbar/top-tabbar.vue'

    import { useDiyGroup } from './useDiyGroup'
    import useDiyStore from '@/app/stores/diy';
    import { ref } from 'vue';

    const props = defineProps(['data', 'pullDownRefreshCount']);

    const topTabbarRef = ref(null);
    const diyStore = useDiyStore();
    const diyGroup = useDiyGroup({
        ...props,
        getFormRef() {
            return {
                topTabbarRef: topTabbarRef.value
            }
        }
    });

    const data = ref(diyGroup.data)

    // 监听页面加载完成
    diyGroup.onMounted()

    // 监听滚动事件
    diyGroup.onPageScroll()

    defineExpose({
        refresh: diyGroup.refresh
    })
</script>
<style lang="scss" scoped>
   @import './index.scss';
</style>
