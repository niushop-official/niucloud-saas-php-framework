<template>
    <slot />
    <!-- #ifdef APP-PLUS -->
    <update-version ref="updateVersionRef"/>
    <!-- #endif -->
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useSystemStore from '@/stores/system'
import updateVersion from '@/components/update-version/update-version.vue'

const systemStore = useSystemStore()

// #ifdef APP-PLUS
const updateVersionRef = ref(null)
watch(() => systemStore.updateVersionPopup, () => {
    if (systemStore.updateVersionPopup) updateVersionRef.value?.open() 
    else updateVersionRef.value?.close()
})
// #endif
</script>

<style lang="scss">
</style>