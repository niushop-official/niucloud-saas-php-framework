<template>
    <div v-if="dialogVisible" class="flex flex-1 flex-col justify-between">
        <div class="flex-1 ml-[20px] mr-[20px]">
            <div class="font-bold mt-[40px]">订单类型</div>
            <div class="lc-btn mr-[20px] mini text-small">全部</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">收银台订单</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">收银台订单</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">收银台订单</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">收银台订单</div>
            <div class="lc-btn mini text-small normal mt-[20px]">收银台订单</div>

            <div class="font-bold mt-[40px]">订单状态</div>
            <div class="lc-btn mr-[20px] mini text-small">全部</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">未支付</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">待评价</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">已完成</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">已删除</div>

            <div class="font-bold mt-[40px]">创建时间</div>
            <div class="lc-btn mr-[20px] mini text-small">全部</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">今天</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">昨天</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">近七天</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">近三十天</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">本月</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">本年</div>
            <div>
                <el-date-picker v-model="dateRange" class="mt-[20px] rounded-full bg-[#f1f2f4] border-0"
                    type="daterange" range-separator="To" start-placeholder="开始日期" end-placeholder="结束日期" />
            </div>

            <div class="font-bold mt-[40px]">店员</div>
            <div class="lc-btn mr-[20px] mini text-small">全部</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">刘超</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">张三</div>
            <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">李四</div>
        </div>
        <div class="flex m-[20px] lc-btn-group mini">
            <div class="lc-btn normal" @click="handleClose">重置</div>
            <div class="lc-btn" @click="handleConfirm">确定</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
const emit = defineEmits(['update:show'])

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    }
});

const dialogVisible = computed({
    get() {
        return props.show;
    },
    set(value) {
        emit('update:show', value);
    },
});

const handleClose = () => {
    dialogVisible.value = false;
};
const handleConfirm = () => {
    dialogVisible.value = false;
}
const dateRange = ref('')
</script>

<style scoped></style>
