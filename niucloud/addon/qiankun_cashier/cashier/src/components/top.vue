<template>
  <div class="flex text-[#fff] p-[10px]">
    <el-image :src="siteInfo?.logo ? img(siteInfo?.logo) : ''" fit="cover" class="w-[50px] h-[50px]"></el-image>
    <div class="flex-1 flex ml-[10px]">
      <div class="flex-1 flex flex-col justify-center text-xl">{{ title }}</div>
      <div class="flex justify-center items-center">
        <el-image :src="userinfo?.avatar ? img(userinfo?.avatar) : ''"
          class="rounded-full w-[30px] h-[30px]"></el-image>
        <el-menu class="flex-1 width-[100px]" mode="horizontal" :ellipsis="false" :unique-opened="true" index="1"
          @select="handleSelect" style="--el-menu-bg-color: #001529; --el-menu-text-color: #fff;">
          <el-sub-menu>
            <template #title>{{ userinfo?.username }}</template>
            <el-menu-item index="profile">个人中心</el-menu-item>
            <el-menu-item index="logout">退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { img } from '@/utils/common';
import storage from '@/utils/storage';
import { ref } from 'vue'

const title = ref("")
title.value = router.currentRoute.value.meta.title as string
const siteInfo = storage.get('siteInfo')
const userinfo = ref<any>({})
userinfo.value = storage.get('userinfo')

const handleSelect = (key: string) => {
  if (key == 'logout') {
    storage.remove('token')
    storage.remove('userinfo')
    router.push('/login')
  }
  if (key == 'profile') {
    router.push('/profile')
  }
}
</script>

<style scoped>
:deep(.el-menu--horizontal.el-menu) {
  border-bottom: none;
}
</style>
