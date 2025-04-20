<template>
    <el-dialog v-model="dialogVisible" title="充值弹窗" class="w-[50%] max-w-[800px]" @close="handleClose">
        <div class="flex justify-between items-center">
            <el-image
                :src="img('https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg')"
                class="w-[70px] h-[70px] rounded-full" fit="cover"></el-image>
            <div class="flex-1 flex justify-between ml-[10px]">
                <div>
                    <div class="font-bold text-lg">刘超</div>
                    <div class="text-sm">
                        <span>15523456789</span>
                        <span class="ml-[20px]">余额</span>
                        <span class="font-bold text-[#f5222d] text-lg ml-[5px]">15789.58</span>
                        <span class="ml-[20px]">积分</span>
                        <span class="font-bold text-[#f5222d] text-lg ml-[5px]">4864648</span>
                        <span class="ml-[20px]">付费会员到期</span>
                        <span class="ml-[5px] text-[#1890ff]">永久会员</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex mt-[40px] ml-50px mr-50px">
            <div class="text-sm w-[80px] font-bold">充值套餐</div>
            <div class="grid3 flex-1">
                <div class="rounded-[10px] p-[15px] text-center text-sm cursor-pointer"
                    :class="{ 'text-white bg-[#1890ff]': rechargeIndex == index, 'border border-[#1890ff]': rechargeIndex != index }"
                    v-for="(item, index) in 10" :key="index" @click="rechargeIndex = index">
                    <div>
                        <span>￥</span>
                        <span class="text-2xl">{{ item }}</span>
                    </div>
                    <div class="mt-[10px]">额外赠送：￥10</div>
                </div>
            </div>
        </div>
        <div class="flex mt-[20px] items-center ml-50px mr-50px">
            <div class="text-sm w-[80px] font-bold">自定义金额</div>
            <input type="number" v-model="rechargeMoney"
                class="h-35px border pl-10px rounded-5px w-400px max-w-[60%]">
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
import type { UserInfoInterface } from '@/interface/UserInfoInterface';
import { img } from '@/utils/common';

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    userInfo: {
        type: Object as () => UserInfoInterface,
        required: true,
    }
});

const emit = defineEmits(['update:show'])
const rechargeIndex = ref(0)
const rechargeMoney = ref(0)

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
    ElMessage.success('充值成功');
};
</script>
