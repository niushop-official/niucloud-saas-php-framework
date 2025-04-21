<template>
  <div class="p-[10px] text-[#fff]">
    <div class="text-center menu-item" :class="{ active: key == 'cashier' }" @click="router.push('/')">
      <el-icon size="25">
        <Money />
      </el-icon>
      <div class="text-[#fff] text-[14px]">收银</div>
    </div>

    <div class="text-center menu-item" :class="{ active: key == 'hang' }" @click="router.push('/hang')">
      <el-icon size="25">
        <Money />
      </el-icon>
      <div class="text-[#fff] text-[14px]">挂单</div>
    </div>

    <div class="text-center menu-item" :class="{ active: key == 'order' }" @click="router.push('/order')">
      <el-icon size="25">
        <Money />
      </el-icon>
      <div class="text-[#fff] text-[14px]">订单</div>
    </div>

    <div class="text-center menu-item" :class="{ active: key == 'refund' }" @click="router.push('/refund')">
      <el-icon size="25">
        <Money />
      </el-icon>
      <div class="text-[#fff] text-[14px]">退货</div>
    </div>

    <div class="text-center menu-item" :class="{ active: key == 'user_list' }" @click="router.push('/user_list')">
      <el-icon size="25">
        <Money />
      </el-icon>
      <div class="text-[#fff] text-[14px]">用户</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue'

const key = ref("")
key.value = router.currentRoute.value.meta.key as string
</script>

<style scoped>
.menu-item {
  margin-bottom: 20px;
  padding: 10px 0;
  border-radius: 10px;
  cursor: pointer;

  &.active {
    background-color: #1890ff;
  }
}
</style>
