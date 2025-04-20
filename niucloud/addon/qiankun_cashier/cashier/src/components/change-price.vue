<template>
    <el-dialog v-model="dialogVisible" title="订单改价" class="w-[50%] max-w-[800px]" @close="handleClose">
        <div class="flex m-10px">
            <el-input placeholder="金额" type="number" v-model="money" @input="changeMoney">
                <template #suffix>元</template>
            </el-input>
            <el-input placeholder="折扣" type="number" class="w-300px ml-10px" v-model="ratio" @input="changeRatio">
                <template #suffix>%</template>
            </el-input>
        </div>

        <template #footer>
            <div class="lc-btn-group mt-20px mini">
                <div class="lc-btn normal" @click="handleClose">取消</div>
                <div class="lc-btn" @click="handleConfirm">确定</div>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

const money = ref(props.price)
const ratio = ref(100)
const emit = defineEmits(['update:show', 'update:price'])

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
    ElMessage.success('改价成功');
    dialogVisible.value = false;
    ratio.value = 100
    emit('update:price', money.value);
}

const changeMoney = () => {
    console.log(money.value, props.price)
    ratio.value = parseFloat(((money.value / props.price) * 100).toFixed(2))
}
const changeRatio = () => {
    money.value = props.price * ratio.value / 100
}
</script>
