<!-- AUTO-GENERATED router by generate-diy-dynamic-bridge-mp.cjs -->
<template>
    <view v-if="componentName">
        <diy-dynamic-bridge-app
            v-if="routeBridge === 'app'"
            :ref="setInnerRef"
            :componentName="componentName"
            :component="component"
            :global="global"
            :index="index"
            :scrollBool="scrollBool"
            @update:componentIsShow="emit('update:componentIsShow', $event)"
            @loadingFn="emit('loadingFn', $event)"
        />
        <!-- MP_MERGE_ADDON_BRIDGE_VUE -->
    </view>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { resolveDiyMeta } from '@/utils/diy-component-registry'

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

const innerRef = shallowRef<any>(null)

function setInnerRef(el: any) {
    innerRef.value = el
}

const routeBridge = computed(() => {
    const meta = resolveDiyMeta(props.componentName || '')
    return meta?.addonKey || 'app'
})

defineExpose({
    getInnerRef: () => innerRef.value
})
</script>
