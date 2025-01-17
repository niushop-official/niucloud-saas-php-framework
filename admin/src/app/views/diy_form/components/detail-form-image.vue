<template>
    <div>
        <el-image v-for="(item,index) in props.data.handle_field_value" :src="img(item)" class="w-[70px] h-[70px]" :class="{ 'mr-[5px]' : (index + 1) < props.data.handle_field_value.length }" fit="contain" :preview-src-list="imgList" :zoom-rate="1.2" :max-scale="7"
        :min-scale="0.2" :initial-index="index" :hide-on-click-modal="true" />
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { img } from '@/utils/common'
import { t } from "@/lang";

const props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {}
        }
    }
})
const imgList = computed(() => {
    return props.data.handle_field_value.map((item: any) => {
        return img(item)
    })
})

</script>

<style lang="scss" scoped>
</style>
