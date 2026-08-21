<template>
    <slot />
    <ns-toast />
    <!-- #ifdef APP-PLUS -->
    <update-version ref="updateVersionRef"/>
    <!-- #endif -->
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useSystemStore from '@/stores/system'
import updateVersion from '@/components/update-version/update-version.vue'
import nsToast from '@/components/ns-toast/ns-toast.vue'
</script>

<style lang="scss">
</style>