<!-- 仅用于 app/components 分包占位，使 preloadRule 可预下载该分包；勿作为业务页面跳转 -->
<template>
    <view class="mp-component-subpackage-placeholder" />
</template>
<script setup lang="ts"></script>
<style scoped>
.mp-component-subpackage-placeholder {
    display: none;
}
</style>
