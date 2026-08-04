<template>
    <view class="diy-group" id="componentList">
        <top-tabbar
            v-if="data.global && Object.keys(data.global).length && data.global.topStatusBar && data.global.topStatusBar.isShow"
            :scrollBool="scrollBoolFor('TopTabbar')" ref="topTabbarRef" :data="data.global"/>
        <pop-ads
            v-if="data.global && Object.keys(data.global).length && data.global.popWindow && data.global.popWindow.show"
            ref="popAbsRef" :data="data.global"/>
        <template v-for="(component, index) in data.value" :key="component.id">
            <view v-show="component.componentIsShow" @click="diyStore.changeCurrentIndex(index, component)"
                  :class="diyGroup.getComponentClass(index,component)" :style="component.pageStyle">
                <view class="relative"
                      :style="{ marginTop : component.margin.top < 0 ? (component.margin.top * 2) + 'rpx' : '0', marginBottom : component.margin.bottom < 0 ? (component.margin.bottom * 2) + 'rpx' : '0' }">

                    <view v-if="diyGroup.isShowPlaceHolder(index,component)" class="absolute w-full z-1"
                          :style="{ height : (component.margin.top * 2 * -1) + 'rpx' }"
                          @click.stop="diyGroup.placeholderEvent"></view>

                    <diy-dynamic-bridge
                        v-if="component.componentName"
                        :ref="(el) => bindDiyRef(component.componentName, el)"
                        :componentName="component.componentName"
                        :scrollBool="getScrollBool(component.componentName)"
                        :component="component"
                        :global="data.global"
                        :index="index"
                        @update:componentIsShow="component.componentIsShow = $event"
                    />
                </view>
            </view>
        </template>
        <template
            v-if="data.global && diyGroup.showCopyright?.value !== false && data.global.copyright && data.global.copyright.isShow">
            <copy-right :textColor="data.global.copyright.textColor"/>
        </template>

        <template
            v-if="diyStore.mode == '' && data.global && data.global.bottomTabBar && data.global.bottomTabBar.isShow">
            <view class="pt-[20rpx]"></view>
            <tabbar :addon="data.global.bottomTabBar.designNav?.key"/>
        </template>
    </view>
</template>
<script lang="ts" setup>
import topTabbar from '@/components/top-tabbar/top-tabbar.vue'
import popAds from '@/components/pop-ads/pop-ads.vue'
import { useDiyGroup } from './useDiyGroup'
import useDiyStore from '@/app/stores/diy';
import { getCurrentInstance } from 'vue';
import { resolveDiyMeta } from '@/utils/diy-component-registry'
import { ensureRuntimeDiyRegistry } from '@/utils/diy-component-runtime-registry'

const props = defineProps(['data']);
const instance: any = getCurrentInstance();
const getFormRef = () => {
    return {
        componentRefs: instance.refs
    }
}

const diyStore = useDiyStore();

const diyGroup = useDiyGroup({
    ...props,
    getFormRef
});

const data = diyGroup.data

function scrollBoolFor(name: string) {
    const box = diyGroup.componentsScrollBool as any
    const val = box?.value ?? box
    return val?.[name]
}

function getScrollBool(componentName: string) {
    const meta = resolveDiyMeta(componentName)
    if (!meta?.scrollBool) return undefined
    return scrollBoolFor(meta.vueComponentName)
}

function bindDiyRef(componentName: string, bridgeEl: any) {
    if (!instance?.refs || !bridgeEl) return
    const key = `diy${componentName}Ref`
    const inner = bridgeEl.getInnerRef?.() ?? null
    if (!inner) return
    const refs = instance.refs as Record<string, any>
    if (!refs[key]) {
        refs[key] = inner
        return
    }
    if (Array.isArray(refs[key])) {
        if (!refs[key].includes(inner)) refs[key].push(inner)
        return
    }
    refs[key] = [refs[key], inner]
}

diyGroup.onMounted()
diyGroup.onPageScroll()

// 主动触发运行时装修组件注册表扫描：项目部署模式（外部打包）插件的装修组件不在构建期
// 静态表 DIY_COMPONENT_MAP 中，需异步 import 插件入口并写入响应式 runtimeDiyMap 后才能解析。
// 若不在 diy-group 层主动触发，桥接组件会因 v-if 闸门为 false 而不挂载，导致内部重试永不执行、组件空白。
ensureRuntimeDiyRegistry().catch(() => {})

defineExpose({
    refresh: diyGroup.refresh,
    getFormRef
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
