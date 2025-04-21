<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import request from '@/utils/request';
import { onMounted } from "vue";
import storage from './utils/storage';

onMounted(() => {
  request.get('qiankun_cashier/public/site_info').then(res => {
    console.log(res)
    storage.set({ key: 'siteInfo', data: res.data })
  }).catch(err => {
    console.error(err)
  })
})
</script>

<style scoped></style>
