<template>
    <el-dialog v-model="dialogVisible" title="备注" class="w-[80%] max-w-[1000px]" @close="handleClose">
        <el-form-item label="退款金额">
            <el-input v-model="order.refund_money" placeholder="请输入退款金额" />
        </el-form-item>
        <el-form-item label="分单退款">
            <div>
                <el-switch v-model="order.split_refund" class="ml-2" inline-prompt active-text="开启"
                    inactive-text="关闭" />
                <div class="text-xs text-[#999]">可选择表格中的商品单独退款，退款后且不能撤回，请谨慎操作！</div>
            </div>
            <el-table ref="tableRef" :data="order.orderGoods" @selection-change="handleSelectionChange" max-height="500">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="name" label="商品名称" width="250">
                    <template #default="scope">
                        <div class="flex items-center">
                            <el-image :src="img(scope.row.image)" class="w-50px h-50px rounded-5px"></el-image>
                            <div class="flex-1 ml-5px">{{ scope.row.name }}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="attr" label="规格" />
                <el-table-column prop="price" label="单价" />
                <el-table-column prop="num" label="数量" width="100" />
                <el-table-column label="金额" width="100">
                    <template #default="scope">
                        {{ scope.row.num * scope.row.price }}
                    </template>
                </el-table-column>
                <el-table-column prop="refund_num" label="退款数量" width="180">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.refund_num" :max="scope.row.num" :min="0" @change="handleSelectionChange"
                            placeholder="请输入退款数量" />
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>

        <template #footer>
            <div class="lc-btn-group mt-20px mini">
                <div class="lc-btn normal" @click="handleClose">取消</div>
                <div class="lc-btn" @click="handleConfirm">确定</div>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { img } from '@/utils/common';
import { ElMessage, TableInstance } from 'element-plus';
import { computed, ref } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    order: {
        type: Object,
        required: true,
    }
});

const emit = defineEmits(['update:show', 'update:order'])

const dialogVisible = computed({
    get() {
        return props.show;
    },
    set(value) {
        emit('update:show', value);
    },
});

const order = computed({
    get() {
        return props.order;
    },
    set(value) {
        emit('update:order', value);
    },
});

const handleClose = () => {
    dialogVisible.value = false;
};
const handleConfirm = () => {
    ElMessage.success('成功');
    dialogVisible.value = false;
    emit('update:order', order.value);
}

const tableRef = ref<TableInstance>()
const handleSelectionChange = () => {
    order.value.refund_money = 0
    tableRef.value?.getSelectionRows().forEach((item: any) => {
        order.value.refund_money += item.refund_num * item.price
    });
}
</script>
