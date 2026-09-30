<template>
    <div class="addon-panel-host" :class="{ 'cover-mode': coverMode }">
        <!-- 动态加载目标插件的面板视图（core 实例加载，清单状态与主程序一致） -->
        <component
            v-if="panelComp"
            :is="panelComp"
            :key="addon + '_' + view + '_' + memberId"
            :member-id="memberId"
            :member-name="memberName"
            :mobile="mobile"
        />
        <el-empty v-else-if="loadError" :description="'面板加载失败：' + loadError" :image-size="80" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
// ★ 必须用 @/lang 的命名导出取 i18n 实例：部署构建会把 @/lang 与 @/lang/i18n
//   都 external 成同一个 /admin/assets/shared/admin-lang.js（scripts/shared-external.cjs
//   的 isAdminLangExternal + vite.config.core.ts 的 external/paths），是那个模块的 default
//   即 src/lang/index.ts 的 `{ install }` 插件对象、不是 i18n 实例；用默认导入时
//   i18n.global 为 undefined，dev 正常、线上走到下面的 mergeLocaleMessage 就抛
//   TypeError: Cannot read properties of undefined。（同坑见 components/file-diff/index.vue）
import { i18n } from '@/lang'
import useSystemStore from '@/stores/modules/system'
import { loadAddonView } from '@/utils/addon-loader'

/**
 * 插件面板宿主页（全屏无布局，供 iframe 嵌入）
 *
 * 统一面板协议：任何系统的面板 = 一个 URL。
 *   本系统插件：/addon_panel?addon=shop&view=customer_panel/order&member_id=1&member_name=xx&mobile=1xx
 *   外部系统：直接提供完整页面地址（聊天台 PanelContainer 原样 iframe）
 * 面板内推送商品卡片等结构化消息：window.parent.postMessage({ type:'shop_customer_send_message', msg_type:'goods', content:{...} }, '*')
 * 由聊天台 PanelContainer 监听转发，无需接触 WS 连接。
 */
const route = useRoute()
const systemStore = useSystemStore()
// ⚠️ 不能用 useI18n()：项目 i18n 为 legacy 模式创建，useI18n 会抛 "Not available in legacy mode" 导致整页空白
// 语言取值与框架守卫（router/index.ts loadLocaleMessages）一致，用 systemStore.lang
const locale = computed(() => systemStore.lang || 'zh-cn')

const addon = computed(() => String(route.query.addon || ''))
const view = computed(() => String(route.query.view || ''))
const memberId = computed(() => Number(route.query.member_id || 0))
const memberName = computed(() => String(route.query.member_name || ''))
const mobile = computed(() => String(route.query.mobile || ''))
const loadError = computed(() => (!addon.value || !view.value) ? '缺少 addon / view 参数' : '')

/**
 * 面板复用的组件里都是短 key（t('deliveryType') 等），路由级 loadLocaleMessages 只带 page 前缀 key 不命中。
 * 编译期 glob 所有插件语言 json，运行时把该插件当前语言的所有 key merge 到 i18n 根层级（不加前缀），
 * Set 去重避免重复 merge。
 */
const allAddonLangFiles = import.meta.glob('@/addon/**/lang/**/*.json', { eager: true }) as Record<string, { default: Record<string, string> }>
const loadedAddonLangs = new Set<string>()
function loadAddonAllLang(addonKey: string, localeKey: string) {
    const cacheKey = `${addonKey}:${localeKey}`
    if (loadedAddonLangs.has(cacheKey)) return
    loadedAddonLangs.add(cacheKey)

    const prefix = `/addon/${addonKey}/lang/${localeKey}/`
    const merged: Record<string, string> = {}
    for (const [path, mod] of Object.entries(allAddonLangFiles)) {
        if (path.includes(prefix) && mod?.default) {
            Object.assign(merged, mod.default)
        }
    }
    if (Object.keys(merged).length) {
        i18n.global.mergeLocaleMessage(localeKey, merged)
    }
}

// 目标面板异步组件（addon/view 变化时重新创建）
const panelComp = computed(() => {
    if (!addon.value || !view.value) return null
    return defineAsyncComponent(loadAddonView(addon.value, view.value))
})

watch([addon, view], () => {
    if (addon.value) loadAddonAllLang(addon.value, locale.value)
}, { immediate: true })

// ============ 弹窗全窗口化（cover 模式） ============
// 面板视口窄（约 320px），弹窗挤在面板里体验差。原理：
// 1. 本页 MutationObserver 监听 body 下 .el-overlay（el-dialog / el-message-box 遮罩）出现/消失
// 2. 状态变化时 postMessage 通知父页面 PanelContainer，把 iframe 临时扩为全屏（弹窗即居中于聊天台）
// 3. 本地同步加 cover-mode class，面板内容保持右侧 320px 原位，避免列表被拉宽
// 面板业务代码（order.vue / goods.vue 等）零改动，任何插件的任何弹窗自动生效
const coverMode = ref(false)
let overlayVisible = false
const syncOverlayState = () => {
    const overlays = document.querySelectorAll<HTMLElement>('.el-overlay')
    const visible = Array.from(overlays).some(el => el.style.display !== 'none')
    if (visible === overlayVisible) return
    overlayVisible = visible
    coverMode.value = visible
    if (window.parent !== window) {
        window.parent.postMessage({ type: 'shop_customer_panel_cover', open: visible }, '*')
    }
}
const overlayObserver = new MutationObserver(syncOverlayState)
onMounted(() => {
    overlayObserver.observe(document.body, { childList: true, subtree: true, attributeFilter: ['style'] })
})
onUnmounted(() => overlayObserver.disconnect())
</script>

<style lang="scss" scoped>
.addon-panel-host {
    height: 100%;
    min-height: 0;
    overflow: hidden;
    background: var(--el-bg-color, #fff);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}
.addon-panel-host > :deep(*) {
    flex: 1;
    min-height: 0;
    height: 100%;
}

/* cover 模式：iframe 已被父页面扩为全屏，面板内容保持右侧 320px 原位，
   避免列表被拉宽变形；弹窗遮罩（.el-overlay fixed 全屏）盖住聊天台，弹窗居中 */
.addon-panel-host.cover-mode {
    width: 320px;
    margin-left: auto;
    padding: 0;
    height: 100%;
    overflow: hidden;
    border-left: 1px solid var(--el-border-color-lighter, #ebeef5);
}
</style>

<style lang="scss">
/* iframe 内禁止整页滚动，只让面板内部列表滚动，避免双边滚动条宽度来回闪 */
html, body, #app {
    height: 100%;
    margin: 0;
    overflow: hidden;
}

/* iframe 面板弹窗自适应：面板视口窄（约 320px），面板复用后台的固定宽度弹窗（如备注 460px）会溢出错位。
   max-width 约束后弹窗自动收缩并居中于面板内；样式仅在宿主页（iframe）生效，不影响各插件后台原页面。
   注意 el-dialog teleport 到 body，必须用非 scoped 全局样式才能命中 */
.el-dialog {
    max-width: calc(100vw - 24px);
}
</style>
