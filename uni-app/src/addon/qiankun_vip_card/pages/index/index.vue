<template>
	<text class="text-[20px]">{{index}}</text>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getIndexData } from '@/addon/qiankun_vip_card/api/index'
import { onLoad } from '@dcloudio/uni-app'
let index = ref('');
onLoad(() => {
    getIndexData().then((res) => {
      index.value = res.data
    })
})
</script>
<style lang="scss" scoped>

</style>
