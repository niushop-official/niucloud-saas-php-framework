<template>
	<view>
		<u-loading-page class="" bg-color="props.bgColor" icon-size="props.iconSize" :loading="props.loading" loadingText=""></u-loading-page>
	</view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const props = defineProps({
	loading: {
		type: Boolean,
		default: false
	},
	iconSize: {
		type: String || Number,
		default: 30
	},
	bgColor: {
		type: String,
		default: "rgb(248,248,248)"
	}
});
</script>

<style lang="scss" scoped>
</style>