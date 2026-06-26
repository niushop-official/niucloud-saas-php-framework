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
import { shallowRef, onMounted, watch, useAttrs, computed } from 'vue'
import { resolveDiyMeta } from '@/utils/diy-component-registry'
import { loadDiyComponent } from '@/utils/diy-component-loader'

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

defineExpose({
    getInnerRef: () => innerRef.value
})
// #endif
</script>
