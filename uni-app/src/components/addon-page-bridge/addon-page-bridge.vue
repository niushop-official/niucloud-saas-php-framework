<template>
    <!-- #ifndef MP -->
    <view v-if="loading" class="addon-page-bridge-loading">
        <loading-page :loading="true" />
    </view>
    <component v-else-if="PageComp" :is="PageComp" :key="pageKey" />
    <page-not-found v-else />
    <!-- #endif -->
</template>

<script setup lang="ts">
import { shallowRef, watch, ref, provide, computed, nextTick, type ComponentInternalInstance } from 'vue'
import { onLoad, onShow, onHide, onUnload } from '@dcloudio/uni-app'
import { loadAddonPage } from '@/utils/addon-loader'
import {
    ADDON_PAGE_QUERY_KEY,
    BRIDGE_ADDON_INSTANCE_KEY,
    invokeAddonPageHooks
} from '@/utils/addon-page-lifecycle'
import {
    setActiveAddonPageRoute,
    clearActiveAddonPageRoute
} from '@/utils/addon-page-route'
import loadingPage from '@/components/loading-page/loading-page.vue'
import pageNotFound from '@/components/page-not-found/page-not-found.vue'

const props = defineProps<{
    addonKey: string
    pagePath: string
    fullRoute?: string
}>()

const PageComp = shallowRef<any>(null)
const loading = shallowRef(false)
const pageQuery = ref<Record<string, unknown>>({})
const addonInstance = shallowRef<ComponentInternalInstance | null>(null)

const pageKey = computed(() => `${props.addonKey}:${props.pagePath}`)

provide(ADDON_PAGE_QUERY_KEY, pageQuery)
provide(BRIDGE_ADDON_INSTANCE_KEY, addonInstance)

let loadSeq = 0

onLoad((options) => {
    pageQuery.value = options || {}
})

async function loadPage() {
    const seq = ++loadSeq
    loading.value = true
    addonInstance.value = null
    setActiveAddonPageRoute(props.fullRoute || `/addon/${props.addonKey}/${props.pagePath}`)

    try {
        const mod = await loadAddonPage(props.addonKey, props.pagePath)()
        if (seq !== loadSeq) return

        if (!mod?.default) {
            console.error('[addon-page-bridge] empty component:', props.fullRoute || props.pagePath)
            PageComp.value = null
            return
        }

        PageComp.value = mod.default
    } catch (e) {
        if (seq !== loadSeq) return
        console.error('[addon-page-bridge]', props.fullRoute || props.pagePath, e)
        PageComp.value = null
    } finally {
        if (seq === loadSeq) {
            loading.value = false
        }
    }
}

onShow(() => {
    if (addonInstance.value) {
        loading.value = false
        invokeAddonPageHooks(addonInstance.value, 'onShow')
        return
    }

    if (!PageComp.value) {
        loadPage()
        return
    }

    // 分构建：PageComp 已挂载但 addon onShow 可能尚未注册，nextTick 后再转发
    loading.value = false
    nextTick(() => {
        if (addonInstance.value) {
            invokeAddonPageHooks(addonInstance.value, 'onShow')
        }
    })
})

onHide(() => {
    if (addonInstance.value) {
        invokeAddonPageHooks(addonInstance.value, 'onHide')
    }
})

onUnload(() => {
    loadSeq++
    clearActiveAddonPageRoute()
    if (addonInstance.value) {
        invokeAddonPageHooks(addonInstance.value, 'onUnload')
    }
    addonInstance.value = null
    PageComp.value = null
    loading.value = false
})

watch(
    () => [props.addonKey, props.pagePath] as const,
    () => {
        loadPage()
    }
)

// addon 实例就绪后补发 onShow（分构建异步加载时 bridge 可能已错过首次 onShow）
watch(
    () => addonInstance.value,
    (inst, prev) => {
        if (inst && !prev && PageComp.value) {
            nextTick(() => invokeAddonPageHooks(inst, 'onShow'))
        }
    }
)
</script>

<style scoped>
.addon-page-bridge-loading {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
