<template>
    <!-- #ifndef MP -->
    <component
        v-if="Comp"
        :is="Comp"
        :ref="setInnerRef"
        v-bind="attrs"
        :component="component"
        :global="global"
        :index="index"
        :scrollBool="scrollBool"
        @update:componentIsShow="emit('update:componentIsShow', $event)"
        @loadingFn="emit('loadingFn', $event)"
    />
    <!-- #endif -->
</template>

<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<script setup lang="ts">
// #ifndef MP
import { shallowRef, ref, onMounted, watch, useAttrs, computed } from 'vue'
import { resolveDiyMeta } from '@/utils/diy-component-registry'
import { loadDiyComponent } from '@/utils/diy-component-loader'
import { ensureRuntimeDiyRegistry } from '@/utils/diy-component-runtime-registry'

const emit = defineEmits<{
    'update:componentIsShow': [value: boolean]
    loadingFn: [value: unknown]
}>()

const props = defineProps<{
    componentName?: string
    component?: object
    global?: object
    index?: number
    scrollBool?: number
}>()

const attrs = useAttrs()
const Comp = shallowRef<any>(null)
const innerRef = shallowRef<any>(null)
// 仅对“运行期才注册进来的外部插件”补扫一次，避免无限循环
const retried = ref(false)

const meta = computed(() => resolveDiyMeta(props.componentName || ''))

function setInnerRef(el: any) {
    innerRef.value = el
}

async function loadComp() {
    Comp.value = null
    innerRef.value = null
    const entry = meta.value
    if (!entry) {
        if (props.componentName) {
            console.warn('[diy-dynamic-bridge] unknown componentName:', props.componentName)
        }
        // 外部插件可能尚未被 import 注册到运行时注册表，触发一次补扫（无缓存，可重跑）；
        // 扫描完成后 runtimeDiyMap 变化会自动驱动 meta 重算并重新加载
        if (!retried.value) {
            retried.value = true
            void ensureRuntimeDiyRegistry().finally(loadComp)
        }
        return
    }
    const loaded = await loadDiyComponent(entry)
    if (!loaded) {
        console.warn(
            '[diy-dynamic-bridge] load empty:',
            props.componentName,
            entry.addonKey,
            entry.folder
        )
    }
    Comp.value = loaded
}

onMounted(loadComp)
watch(() => props.componentName, loadComp)
// 兜底：运行时注册表补充解析出外部插件组件后（meta 由 null 变为有效），需重新加载
watch(meta, loadComp)

defineExpose({
    getInnerRef: () => innerRef.value
})
// #endif
</script>
