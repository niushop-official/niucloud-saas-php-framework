<template>
  <span>{{ formattedTime }}</span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedTime() {
      const time = new Date(this.text);
      const now = new Date();
      const diff = now - time;

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        return `${days}天前`;
      } else if (hours > 0) {
        return `${hours}小时前`;
      } else if (minutes > 0) {
        return `${minutes}分钟前`;
      } else {
        return '刚刚';
      }
    }
  }
};
</script>

<style scoped>
/* 样式可以根据需要自行添加 */
</style>
