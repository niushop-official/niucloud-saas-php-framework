<template>
    <div class="flex flex-col h-full">
        <Top></Top>
        <div class="flex flex-1" style="height: calc(100vh - 80px)">
            <Left class="w-[100px]"></Left>
            <UserList class="flex-1 rounded-[20px] bg-[#f5f5f5] text-[#333] p-[20px] h-full"></UserList>
        </div>
    </div>
</template>

<script setup lang="ts">
import Top from "@/components/top.vue";
import Left from "@/components/left.vue";
import UserList from "@/components/user-list.vue";
</script>

<style scoped lang="scss"></style>
