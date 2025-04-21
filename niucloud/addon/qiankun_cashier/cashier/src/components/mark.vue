<template>
    <el-dialog v-model="dialogVisible" title="备注" class="w-[50%] max-w-[800px]" @close="handleClose">
        <div class="flex m-10px">
            <el-input type="textarea" v-model="mark" placeholder="订单备注" :rows="6" show-word-limit
                maxlength="300"></el-input>
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
import { computed } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    remark: {
        type: String,
        required: true,
    }
});

const emit = defineEmits(['update:show', 'update:remark'])

const dialogVisible = computed({
    get() {
        return props.show;
    },
    set(value) {
        emit('update:show', value);
    },
});

const mark = computed({
    get() {
        return props.remark;
    },
    set(value) {
        emit('update:remark', value);
    },
});

const handleClose = () => {
    dialogVisible.value = false;
};
const handleConfirm = () => {
    ElMessage.success('备注成功');
    dialogVisible.value = false;
    emit('update:remark', mark.value);
}

</script>
