<template>
  <div class="flex flex-col h-full">
    <Top></Top>
    <div class="flex flex-1" style="height: calc(100vh - 80px)">
      <Left class="w-[100px]"></Left>
      <Refund class="flex-1 rounded-[20px] bg-[#f5f5f5] text-[#333] p-[20px] h-full"></Refund>
    </div>
  </div>
</template>

<script setup lang="ts">
import Top from "@/components/top.vue";
import Left from "@/components/left.vue";
import Refund from "@/components/refund.vue";

</script>

<style scoped lang="scss"></style>
