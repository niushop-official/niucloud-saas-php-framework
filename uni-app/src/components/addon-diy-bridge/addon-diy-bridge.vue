<template>
    <diy-dynamic-bridge
        v-if="resolvedComponentName"
        :componentName="resolvedComponentName"
        :component="component"
        :global="global"
        :index="index"
        @update:componentIsShow="emit('update:componentIsShow', $event)"
        @loadingFn="emit('loadingFn', $event)"
    />
</template>

<script setup lang="ts">
/**
 * 兼容旧分构建模板；新代码请直接使用 diy-dynamic-bridge + component.componentName
 */
import { computed } from 'vue'
import { resolveDiyMeta, listDiyComponentNames } from '@/utils/diy-component-registry'

const emit = defineEmits<{
    'update:componentIsShow': [value: boolean]
    loadingFn: [value: unknown]
}>()

const props = defineProps<{
    addonKey?: string
    componentName?: string
    component?: object
    global?: object
    index?: number
}>()

function folderToPascal(folder: string) {
    return folder
        .split('-')
        .map((s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : ''))
        .join('')
}

const resolvedComponentName = computed(() => {
    const folder = props.componentName
    const addonKey = props.addonKey
    if (!folder) return ''

    const guess = folderToPascal(folder)
    const byGuess = resolveDiyMeta(guess)
    if (byGuess && (!addonKey || byGuess.addonKey === addonKey) && byGuess.folder === folder) {
        return guess
    }

    for (const name of listDiyComponentNames()) {
        const meta = resolveDiyMeta(name)
        if (!meta || meta.folder !== folder) continue
        if (addonKey && meta.addonKey !== addonKey) continue
        return name
    }

    return guess
})
</script>
