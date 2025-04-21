<template>
  <text class="text-[20px]">{{ index }}</text>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {getIndex} from '@/addon/qiankun_recovery/api/index'
import {onLoad} from '@dcloudio/uni-app'

let index = ref('');
onLoad(() => {
  getIndex().then((res) => {
    index.value = res.data
  })
})
</script>
<style lang="scss" scoped>

</style>
