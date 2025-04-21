<template>
    <el-dialog v-model="dialogGoodsVisible" :title="t('goodsSelectTitle')"  width="500px">
        <div v-loading="loading" class="min-h-[100px] px-[10px]">
            <div v-if="goodsData">
                <div v-for="(item,index) in goodsData.goodsSpec" :key="index" class="flex flex-col mb-[10px]">
                    <span class="mb-[10px] text-[16px]">{{item.spec_name}}</span>
                    <div class="flex flex-wrap">
                        <span class="box-border cursor-pointer bg-[#f2f2f2] text-[12px] px-[22px] text-center h-[28px] leading-[28px] flex-center mr-[10px] mb-[10px] border-1 border-solid rounded-[25px] border-[var(--temp-bg)]"
                            :class="{'!border-[var(--el-color-primary)] text-[var(--el-color-primary)] !bg-[var(--el-color-primary-light-8)]': subItem.selected}"
                            v-for="(subItem,subIndex) in item.values" :key="subIndex"  @click="change(subItem, index)">{{subItem.name}}</span>
                    </div>
                </div>
                <div class="flex flex-col mb-[20px] mt-[5px]">
                    <span class="mb-[5px] text-[16px]">库存</span>
                    <span>{{currSpec.stock}}{{currSpec.unit}}</span>
                </div>
                <div class="flex flex-col">
                    <div class="flex items-center mb-[10px]">
                        <span class="text-[16px]">数量</span>
                        <span v-if="goodsData.goods.is_limit && goodsData.goods.min_buy > 1 && goodsData.goods.max_buy > 0" class="ml-[10px] text-[12px] text-primary">
                            ({{ goodsData.goods.min_buy }}{{ goodsData.goods.unit }}起售，限购{{ goodsData.goods.max_buy }}{{ goodsData.goods.unit }})
                        </span>
                        <span v-else-if="goodsData.goods.is_limit && goodsData.goods.max_buy > 0" class="ml-[10px] text-[12px] text-primary">(限购{{ goodsData.goods.max_buy }}{{ goodsData.goods.unit }})</span>
                        <span v-else-if="goodsData.goods.min_buy > 1" class="ml-[10px] text-[12px] text-primary">({{ goodsData.goods.min_buy }}{{ goodsData.goods.unit }}起售)</span>
                    </div>
                    <goods-limit ref="goodsLimitRef" :data="goodsData" />
                </div>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancelFn">{{t('cancel')}}</el-button>
                <el-button type="primary" @click="selectGoodsConfirm">{{t('confirm')}}</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@/lang'
import { cloneDeep } from 'lodash-es'
import goodsLimit from './goods-limit.vue'
import { getGoodsSkuInfo } from '@/addon/shop/api/marketing'
import { ElMessage } from 'element-plus'

const dialogGoodsVisible = ref(false)
const goodsData: any = ref(null);
const goodsLimitRef: any = ref(null);
const currSpec: any = ref({
    skuId: "",
    unit: "",
    stock: 0,
    name: []
})
const loading = ref(true);

const emit = defineEmits(['confirm'])

// 商品限购
const cartData = ref([]) // 加入购物车的数据

const open = (data:any, member_id:any, select:any) => {
    loading.value = true;
    currSpec.value.skuId = "";
    currSpec.value.stock = 0;
    currSpec.value.name = [];
    currSpec.value.unit = '';
    cartData.value = select || [];
    getSkuInfoFn(data.goodsSku.sku_id, member_id)
    dialogGoodsVisible.value = true
}

const getSkuInfoFn = (sku_id:any, member_id:any) => {
    loading.value = true;
    goodsData.value = null;
    getGoodsSkuInfo({
        sku_id,
        member_id
    }).then((res: any) => {
        goodsData.value = cloneDeep(res.data);
        if(!Object.keys(currSpec.value.name).length) currSpec.value.name = goodsData.value.sku_spec_format.split(",");

        // 更新规格项
        goodsData.value.goodsSpec.forEach((item: any,index: any)=>{
            let specName = item.spec_values.split(",");
            item.values = [];
            specName.forEach((specItem: any, specIndex: any)=>{
                item.values[specIndex] = {};
                item.values[specIndex].name = specItem;
                item.values[specIndex].selected = false;
                item.values[specIndex].disabled = false;

                // 选中规格
                currSpec.value.name.forEach((currSpecItem: any, currSpecIndex: any)=>{
                    if(currSpecIndex == index && currSpecItem == specItem){
                        item.values[specIndex].selected = true;
                    }
                })
            })
        })

        // 获取当前规格sku_id
        goodsData.value.skuList.forEach((skuItem: any, skuIndex: any)=>{
            if(skuItem.sku_spec_format == currSpec.value.name.toString()){
                currSpec.value.skuId = skuItem.sku_id
                currSpec.value.stock = skuItem.stock
            }
        })

        currSpec.value.unit = goodsData.value.goods.unit;

        // 设置当前规格下的库存
        goodsData.value.goods.sku_stock = currSpec.value.stock;

        setCartDataFn();
        loading.value = false;
    }).catch(() => {

    })
}

// 规格项
const change = (data: any, index: any)=>{
    currSpec.value.name[index] = data.name;

    // 更新规格项
    goodsData.value.goodsSpec.forEach((item: any,index: any)=>{
        let specName = item.spec_values.split(",");
        item.values = [];
        specName.forEach((specItem: any, specIndex: any)=>{
            item.values[specIndex] = {};
            item.values[specIndex].name = specItem;
            item.values[specIndex].selected = false;
            item.values[specIndex].disabled = false;
            // 选中规格
            currSpec.value.name.forEach((currSpecItem: any, currSpecIndex: any)=>{
                if(currSpecIndex == index && currSpecItem == specItem){
                    item.values[specIndex].selected = true;
                }
            })
        })
    })

    // 获取当前规格sku_id
    goodsData.value.skuList.forEach((skuItem: any, skuIndex: any)=>{
        if(skuItem.sku_spec_format == currSpec.value.name.toString()){
            currSpec.value.skuId = skuItem.sku_id
            currSpec.value.stock = skuItem.stock
        }
    })

    // 设置当前规格下的库存
    goodsData.value.goods.sku_stock = currSpec.value.stock;

    setCartDataFn();
}

// 设置加入购物车的数据
const setCartDataFn = ()=>{
    cartData.value.forEach((item: any,index) => {
        if(item.goods_id == goodsData.value.goods.goods_id && item.sku_id == currSpec.value.skuId){
            goodsData.value.goods.card_num = item.num;
        }
    });
}

// 取消
const cancelFn = () =>{
    dialogGoodsVisible.value = false;
}

// 确定
const selectGoodsConfirm = () =>{
    let num = goodsLimitRef.value.getBuyNum();
    if(num <= 0){
        ElMessage({
            message: '商品数量不能为空',
            type: 'warning'
        })
        return false;
    }
    goodsData.value.skuList.forEach((skuItem: any, skuIndex: any, skuArr:any)=>{
        if(skuItem.sku_spec_format == currSpec.value.name.toString()){
            skuArr[skuIndex].num = num;
        }
    })
    dialogGoodsVisible.value = false;
    emit('confirm',goodsData.value);
}

defineExpose({
    dialogGoodsVisible,
    open
})
</script>

<style lang="scss" scoped>

</style>
