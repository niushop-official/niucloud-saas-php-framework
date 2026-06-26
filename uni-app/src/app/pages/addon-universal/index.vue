<template>
    <addon-page-bridge
        v-if="addonKey && pagePath"
        :addon-key="addonKey"
        :page-path="pagePath"
        :full-route="fullRoute"
    />
    <page-not-found v-else />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import addonPageBridge from '@/components/addon-page-bridge/addon-page-bridge.vue'
import pageNotFound from '@/components/page-not-found/page-not-found.vue'
import { ensureAddonProdReady } from '@/utils/addon-lang'
import useConfigStore from '@/stores/config'

const addonKey = ref('')
const pagePath = ref('')
const fullRoute = ref('')

interface BridgeOptions {
    addon?: string
    page?: string
    _orig?: string
}

onLoad((options: BridgeOptions) => {
    if (options?.addon && options?.page) {
        addonKey.value = options.addon
        const p = options.page.startsWith('pages/') ? options.page : `pages/${options.page}`
        pagePath.value = p
        fullRoute.value = `/addon/${options.addon}/${p}`
        useConfigStore().addon = options.addon
    }

    // 还原原始插件 URL（放在 onLoad 而非 onMounted，确保每次页面跳转都执行）
    // #ifdef H5
    const orig = options?._orig
    if (orig && addonKey.value) {
        const base = location.origin + location.pathname.replace(/\/app\/pages\/addon-universal\/index$/, '')
        history.replaceState(null, '', base + decodeURIComponent(orig))
    }
    // #endif
})

onMounted(() => {
    if (addonKey.value) {
        ensureAddonProdReady()
    }
})
</script>

<style scoped>
</style>
