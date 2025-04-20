<template>
    <div class="goods-limit-wrap">
        <div class="flex items-center border-[1px] border-solid border-[#e5e7eb] h-[34px] w-[135px]">
            <span @click="minusFn" class="select-none cursor-pointer border-[0] border-r-[1px] border-solid border-[#e5e7eb] nc-iconfont nc-icon-jianV6xx flex items-center justify-center bg-[#f5f7fA] h-[100%] w-[32px] bg-[#f5f7fa]" :class="{'cursor-not-allowed': temp_range.off.num >= buyNum}"></span>
            <el-input-number class="buy-input" v-model="buyNum" @change="skuInputFn"/>
            <span @click="plusFn" class="select-none cursor-pointer border-[0] border-l-[1px] nc-iconfont nc-icon-jiahaoV6xx flex items-center justify-center bg-[#f5f7fA] h-[100%] w-[32px] bg-[#f5f7fa]" :class="{'cursor-not-allowed': temp_range.up.num <= buyNum}"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { t } from '@/lang'
import { cloneDeep } from 'lodash-es'
import { ElMessage } from 'element-plus'

const props = defineProps(['data']);
const data: any = ref({}); // 全部数据
const currGoodsData: any = ref({}); // data.goods下的数据
const buyNum = ref(0)

let temp_range = reactive({
    'up':{  num: 0, tips: ''}, // 上限
    'off':{ num: 0, tips: ''}  // 下限
});

let is_buy = ref(true);
const goodsLimitFn = ()=>{
    /******************* 起售-start ************************/
    temp_range.off.num = currGoodsData.value.min_buy > 0 ? currGoodsData.value.min_buy : 1;
    if(temp_range.off.num){
        if(currGoodsData.value.sku_stock <= 0){
            temp_range.off.tips = '商品库存不足';
            is_buy.value = false;
        }else if(temp_range.off.num > currGoodsData.value.sku_stock){
            temp_range.off.tips = '商品库存小于起售数量';
            is_buy.value = false;
        }else if(buyNum.value <= temp_range.off.num){
            temp_range.off.tips = `该商品${temp_range.off.num}件起购`;
            is_buy.value = false;
        }
    }
    /******************* 起售-end ************************/


    /******************* 限购-start ************************/
    if(currGoodsData.value.is_limit){
        is_buy.value = true;
        if(currGoodsData.value.max_buy){
            if(currGoodsData.value.limit_type == 1){ //单次限购
                temp_range.up.num = currGoodsData.value.max_buy;
                temp_range.up.tips = `该商品单次限购${currGoodsData.value.max_buy}件`;
            }else{ // 单人限购
                let buyVal = currGoodsData.value.max_buy - (currGoodsData.value.has_buy||0);
                temp_range.up.num = buyVal > 0 ? buyVal : 0;
                temp_range.up.tips = `该商品每人限购${currGoodsData.value.max_buy}件`;
                if(currGoodsData.value.has_buy > 0){
                    temp_range.up.tips += `,已购${currGoodsData.value.has_buy}件`;
                }
            }

            if(temp_range.up.num > currGoodsData.value.sku_stock){
                temp_range.up.num = currGoodsData.value.sku_stock;
                temp_range.up.tips = "商品库存不足";
            }

            // 限购数量或库存为零的情况
            if(temp_range.up.num <= 0){
                // temp_range.up.tips = "已达限购数量";
                // if(currGoodsData.value.sku_stock == 0){
                //     temp_range.up.tips = "商品库存不足";
                // }
                is_buy.value = false;
            }
        }
    }else{
        is_buy.value = true;
        temp_range.up.num = currGoodsData.value.sku_stock;
        temp_range.up.tips = "商品库存不足";
    }
    /******************* 限购-end ************************/
    // 设置默认数据
    if(is_buy.value && !buyNum.value){
        buyNum.value = temp_range.off.num;
    }

    if(currGoodsData.value.card_num){
        temp_range.up.num = temp_range.up.num - currGoodsData.value.card_num;
       temp_range.up.tips += `,已加入购物车${currGoodsData.value.card_num}件`;
    }

    verifyFn();
}

// 减号
const minusFn = ()=>{
    if(!is_buy.value || buyNum.value <= temp_range.off.num){
        ElMessage({
            message: temp_range.off.tips,
            type: 'warning'
        })
        return false;
    }
    buyNum.value = buyNum.value - 1;
}
// 加号
const plusFn = ()=>{
    if(!is_buy.value || buyNum.value >= temp_range.up.num){
        ElMessage({
            message: temp_range.up.tips,
            type: 'warning'
        });
        return false;
    }
    buyNum.value = buyNum.value + 1;
}

// input的change事件
const skuInputFn = ()=>{
    setTimeout(() => {
        verifyFn();
    },0)
}

const verifyFn = ()=>{
    if(temp_range.off.num > temp_range.up.num){
        buyNum.value = 0;
        is_buy.value = false;
    }else if(buyNum.value < temp_range.off.num){
        buyNum.value = temp_range.off.num;
    }else if(buyNum.value > temp_range.up.num){
        buyNum.value = temp_range.up.num;
    }else{
        buyNum.value = buyNum.value || temp_range.off.num;
    }
}

watch(
    () => props.data,
    (newValue, oldValue) => {
        data.value = cloneDeep(newValue);
        currGoodsData.value = cloneDeep(data.value.goods);
        currGoodsData.value.has_buy = data.value.has_buy;
        goodsLimitFn();
        if(data.value && data.value.num){
            buyNum.value = data.value.num;
        }
    }, { deep: true, immediate: true }
)

const getBuyNum = ()=>{
    return buyNum.value;
};

defineExpose({
    getBuyNum
})
</script>

<style lang="scss">
    .goods-limit-wrap .buy-input{
        flex: 1;
        height: 100%;
        .el-input__wrapper{
            padding: 0;
            box-shadow: initial !important;
            .el-input__inner{
                text-align: center;
            }
        }
        .el-input-number__increase, .el-input-number__decrease{
            display: none;
        }
    }
</style>
