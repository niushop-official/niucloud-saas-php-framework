<template>
    <el-dialog v-model="dialogMemberVisible" title="优惠券列表"  width="400px">
        <div class="min-h-[150px] max-h-[300px] overflow-auto">
            <div class="flex flex-col" v-if="list.length">
                <template  v-for="(item,index) in list">
                    <div :key="index" v-if="item.is_normal" @click="selectCoupon(index)" :class="{'border-[var(--el-color-primary)]': currIndex == index}" class="ml-[5px] mr-[12px] mb-[15px] overflow-hidden relative flex flex-col px-[12px] py-[15px] border-[1px] border-[#eee] border-solid rounded-[5px] cursor-pointer" >
                        <div class="flex items-start border-0 !border-b border-[#eee] border-dashed pb-[10px]">
                            <div class="flex flex-col">
                                <span class="text-[15px] leading-[1.2] mb-[3px] truncate max-w-[150px]">{{item.title}}</span>
                                <span class="text-[15px] leading-[1]" v-if="Number(item.min_condition_money) > 0">满{{ item.min_condition_money }}可用</span>
                                <span class="text-[15px] leading-[1]" v-else>无门槛券</span>
                            </div>
                            <div class="text-[18px] ml-[auto]"><span class="text-[14px] mr-[2rpx]">￥</span>{{ item.price }}</div>
                        </div>
                        <div class="pt-[10px] text-[12px] text-[var(--text-color-light6)]">{{ item.create_time }} ~ {{ item.expire_time }}有效</div>
                    </div>
                </template>
            </div>
            <div v-else class="flex items-center justify-center w-[100%] min-h-[150px] text-[16px]">暂无优惠券</div>
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
import { getReplaceCoupon } from '@/addon/shop_replace_buy/api/order'

const dialogMemberVisible = ref(false)
const emit = defineEmits(['confirm','load'])

const open = (id:any) => {
    // 重置
    currIndex.value = -1;
    // 选中
    if(list.value.length){
        list.value.forEach((item,index)=>{
            if(item.id == id){
                currIndex.value = index;
            }
        })
    }
    dialogMemberVisible.value = true
}

const init = (obj:any) =>{
    getReplaceCouponFn(obj);
}

// 获取地址信息
const list = ref([])
const currIndex = ref(-1);

// 获取优惠券
const getReplaceCouponFn = (obj:any)=>{
    list.value = [];
    getReplaceCoupon(obj).then((res: any) => {
        let couponNum = 0
        res.data.forEach((item: any,index: any)=>{
            if(item.is_normal){
                couponNum++;
                list.value.push(item);
            }
        })
        emit('load',list.value[0],couponNum);
    })
}

const selectCoupon = (index: any)=>{
    if(currIndex.value == index){
        currIndex.value = -1;
    }else{
        currIndex.value = index;
    }
}

const confirmFn = ()=>{
    let data = list.value.length ? list.value[currIndex.value] : '';
    emit('confirm',data);
    dialogMemberVisible.value = false
}

defineExpose({
    dialogMemberVisible,
    init,
    open
})
</script>

<style lang="scss" scoped>

</style>
