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
</script>

<style lang="scss">
</style>