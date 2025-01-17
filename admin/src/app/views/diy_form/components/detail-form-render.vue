<template>
    <div class="form-render">{{ props.data.render_value }}</div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { t } from "@/lang";

const props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {}
        }
    }
})
</script>

<style lang="scss" scoped>
.form-render {
    word-wrap: break-word; /* 长单词或长字符串自动换行 */
    word-break: break-word; /* 强制断词换行 */
    white-space: pre-wrap; /* 保持空格和换行 */
}
</style>
