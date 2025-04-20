<template>
    <div class="h-full bg-white flex justify-center items-center">
        <el-result title="404" sub-title="访问的页面不存在">
            <template #icon>
                <el-image :src="assetImg('/assets/images/not-found2.png')" />
            </template>
            <template #extra>
                <el-button type="primary" @click="router.push({ path: '/' })">返回首页</el-button>
            </template>
        </el-result>
    </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { assetImg } from "@/utils/common";

</script>

<style scoped lang="scss">
:root {
    background-color: #fff;
}
</style>
