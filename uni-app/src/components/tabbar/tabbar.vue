<template>
    <template v-if="tabbar && Object.keys(tabbar).length">
        <u-tabbar :value="normalizedValue" zIndex="9999" :fixed="true" :placeholder="true" :safeAreaInsetBottom="false" :inactive-color="tabbar.value.textColor" :active-color="tabbar.value.textHoverColor" :border="props.border" class="custom-tabbar">
            <view class="safe-area flex bg-white" :style="{'background-color': tabbar.value.backgroundColor}">
                <template v-for="item in tabbar.value.list">
                    <u-tabbar-item class="py-[5rpx]" :custom-style="{'background-color': tabbar.value.backgroundColor}" :text="item.text" :icon="img(normalizedValue == normalizeRoute(item.link.url) ? item.iconSelectPath : item.iconPath)" :name="normalizeRoute(item.link.url)" v-if="tabbar.value.type == 1" @click="itemBtn(item.link.url)"></u-tabbar-item>
                    <u-tabbar-item class="py-[5rpx]" :custom-style="{'background-color': tabbar.value.backgroundColor}" :icon="img(normalizedValue == normalizeRoute(item.link.url) ? item.iconSelectPath : item.iconPath)" :name="normalizeRoute(item.link.url)" v-if="tabbar.value.type == 2" @click="itemBtn(item.link.url)"></u-tabbar-item>
                    <u-tabbar-item class="py-[5rpx]" :custom-style="{'background-color': tabbar.value.backgroundColor}" :text="item.text" :name="normalizeRoute(item.link.url)" v-if="tabbar.value.type == 3" @click="itemBtn(item.link.url)"></u-tabbar-item>
                </template>
            </view>
        </u-tabbar>
        <view class="tab-bar-placeholder"></view>
    </template>
</template>

<script setup lang="ts">
import { reactive, computed, watch, nextTick, getCurrentInstance } from 'vue'
import { redirect, currRoute, currShareRoute, img } from '@/utils/common'
import { getActiveAddonPageRoute } from '@/utils/addon-page-route'
import useConfigStore from '@/stores/config'
import { cloneDeep } from 'lodash-es'

const props = defineProps({
    addon: {
        type: String,
        default: ''
    },
    color: {
        type: Object,
        default: () => {
            return {
                backgroundColor: '', // 背景色
                textColor: '', // 文字颜色
                textHoverColor: '', // 文字选中颜色
            };
        }
    },
    border: {
        type: Boolean,
        default: true
    }
})

let addon: any = props.addon;

const configStore = useConfigStore()
if (!addon && configStore.addon) {
    addon = configStore.addon;
}

const tabbar: any = reactive({})
const setTabbar = () => {
    let list = cloneDeep(useConfigStore().tabbarList);
    if (list.length == 1) {
        Object.assign(tabbar, list[0]);
    } else {
        let isExist = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].key == addon) {
                Object.assign(tabbar, list[i]);
                isExist = true;
                break;
            }
        }

        if (!isExist) {

            // 检测是否单应用
            let count = 0;
            let singleTabbar = {}
            try {
                if (list) {
                    list.forEach((item: any) => {
                        if (item.info.type == 'app') {
                            count++;
                            singleTabbar = item;
                        }
                    })
                }

                if (count == 1) {
                    Object.assign(tabbar, singleTabbar);
                }

            } catch (e) {
            }
        }

    }
    if (props.color) {
        for (let key in props.color) {
            if (props.color[key] && tabbar.value[key]) {
                tabbar.value[key] = props.color[key];
            }
        }
    }
}

setTabbar()

// 移除原有的 "if (!props.addon)" 条件限制，直接监听 configStore.addon
watch(
    () => useConfigStore().addon,
    (newAddon, oldAddon) => {
        // 当 props.addon 为空时，才响应 configStore.addon 的变化
        if (!props.addon && newAddon !== oldAddon) {
            addon = newAddon; // 同步更新本地 addon 变量
            setTabbar(); // 重新设置 TabBar
        }
    },
    { immediate: true, deep: true } // 立即执行 + 深度监听
);

watch(
    () => props.addon,
    (newValue, oldValue) => {
        if (newValue && oldValue && newValue != oldValue) {
            setTabbar()
        }
    }
    , { immediate: true }
)

watch(
    () => props.color,
    (newValue, oldValue) => {
        if (newValue && oldValue && newValue != oldValue) {
            setTabbar()
        }
    }
    , { immediate: true, deep: true }
)

if (!props.addon) {
    watch(
        () => useConfigStore().tabbarList,
        (newValue, oldValue) => {
            if (newValue) {
                setTabbar()
            }
        }
        , { deep: true, immediate: true }
    )
}

watch(
    () => useConfigStore().tabbarList,
    (newValue, oldValue) => {
        if (newValue && newValue.length) {
            setTabbar()
        }
    },
    { deep: true }
)

const value = computed(() => {
    // 桥接进来的插件页：真实栈路由是 app/pages/addon-universal/index，无法与 tabbar.link.url 匹配，
    // 需使用 addon 桥接登记的逻辑路由（/addon/xxx/pages/yyy），否则当前项无法选中、图标始终用未选中态
    const activeRoute = getActiveAddonPageRoute()
    if (activeRoute) return activeRoute
    let query: any = currShareRoute().params;
    let str = [];
    for (let key in query) {
        str.push(key + '=' + query[key]);
    }
    return '/' + currRoute() + (str.length > 0 ? '?' + str.join('&') : '')
})

// 归一化路由用于匹配：去前导斜杠、去 query、去末尾多余的 /index（装修配置可能用短路径 /addon/xxx/pages/index）
const normalizeRoute = (r: string): string => {
    if (!r) return ''
    let s = r.split('?')[0]
    s = s.replace(/\/+/g, '/')
    if (s.startsWith('/')) s = s.slice(1)
    if (s.endsWith('/')) s = s.slice(0, -1)
    while (s.endsWith('/index')) s = s.slice(0, -('/index'.length))
    return s
}

// 用于高亮/图标判断的归一化当前路由
const normalizedValue = computed(() => normalizeRoute(value.value))

const itemBtn = (url: any) => {
    if (url.indexOf('http') != -1 || url.indexOf('http') != -1) {

        // #ifdef H5
        window.location.href = url;
        // #endif

        // #ifdef MP
        redirect({
            url: '/app/pages/webview/index',
            param: { src: encodeURIComponent(url) }
        });
        // #endif
    } else {
        let query: any = currShareRoute().params;
        let str = [];
        for (let key in query) {
            str.push(key + '=' + query[key]);
        }
        if (url == ('/' + currRoute()) && !str.length) return
        redirect({ url, mode: 'reLaunch' })
    }
}

const instance = getCurrentInstance();
nextTick(() => {
    const query = uni.createSelectorQuery().in(instance);
    query.select('.tab-bar-placeholder').boundingClientRect((data: any) => {
        let height = data ? data.height : 0;
        let tabbarInfo = {
            height: height
        };
        uni.setStorageSync('tabbarInfo', tabbarInfo);
    }).exec();
})
</script>

<style lang="scss" scoped>
.tab-bar-placeholder {
    padding-bottom: calc(constant(safe-area-inset-bottom) + 50px);
    padding-bottom: calc(env(safe-area-inset-bottom) + 50px);
}
.safe-area {
    background: white;
    width: 100%;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 1px);
    padding-bottom: calc(env(safe-area-inset-bottom) + 1px);
}
</style>

<style lang="scss">
.custom-tabbar {
    .u-tabbar-item__icon .u-icon__img {
        width: 19px !important;
        height: 19px !important;
    }

    .u-tabbar-item__text {
        font-size: 20rpx !important;
    }
}

/* #ifdef MP */
.u-tabbar {
    ::v-deep .u-tabbar-item__icon .u-icon .u-icon__img {
        width: 19px !important;
        height: 19px !important;
    }

    ::v-deep .u-tabbar-item__text {
        font-size: 20rpx !important;
    }
}
/* #endif */
</style>
