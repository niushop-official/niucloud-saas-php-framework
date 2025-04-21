<template>
    <el-dialog v-model="dialogMemberVisible" title="自提点列表"  width="400px">
        <div class="min-h-[150px] max-h-[300px] overflow-auto">
            <div class="flex flex-col" v-if="list.length">
                <div v-for="(item,index) in list" :key="index" @click="selectStore(index)" :class="{'border-[var(--el-color-primary)]': currIndex == index}" class="mb-[15px] overflow-hidden relative flex flex-col px-[12px] py-[15px] border-[1px] border-[#eee] border-solid rounded-[5px] mr-[8px] cursor-pointer" >
                    <div class="flex item-center">
                        <span class="text-[15px] leading-[1] truncate max-w-[150px]">{{item.store_name}}</span>
                        <span class="text-[15px] leading-[1] ml-[5px]">{{item.store_mobile}}</span>
                    </div>
                    <div class="text-[13px] leading-[1] mt-[8px] flex">
                        <span class="whitespace-nowrap">门店地址：</span>
                        <span class="flex-1 leading-[1.3]">{{item.full_address}}</span>
                    </div>
                    <div class="truncate text-[13px] leading-[1] mt-[5px]" v-if="item.trade_time">
                        <span class="whitespace-nowrap">营业时间：</span>
                        <span>{{item.trade_time}}</span>
                    </div>
                </div>
            </div>
            <div v-else class="flex items-center justify-center w-[100%] min-h-[150px] text-[16px]">暂无自提点</div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogMemberVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmFn(formRef)">保存</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@/lang'
import { getReplaceBuyStore } from '@/addon/shop_replace_buy/api/order'

const dialogMemberVisible = ref(false)

const open = (id:any) => {
    // 重置
    currIndex.value = -1;
    // 选中
    if(list.value.length){
        list.value.forEach((item: any,index)=>{
            if(item.store_id == id){
                currIndex.value = index;
            }
        })
    }
    dialogMemberVisible.value = true
}

// 获取地址信息
const list = ref([])
const currIndex = ref(-1);

// 获取自提点
const getReplaceStoreFn = ()=>{
    getReplaceBuyStore({}).then((res: any) => {
        list.value = res.data;
    })
}
getReplaceStoreFn();

const selectStore = (index: any)=>{
    currIndex.value = index;
}

const confirmFn = ()=>{
    let data = list.value.length ? list.value[currIndex.value] : '';
    emit('confirm',data);
    dialogMemberVisible.value = false
}

const emit = defineEmits(['confirm'])
defineExpose({
    dialogMemberVisible,
    open
})
</script>

<style lang="scss" scoped>

</style>
