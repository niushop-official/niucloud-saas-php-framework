<template>
    <el-dialog v-model="dialogMemberVisible" title="满减信息"  width="500px">
        <div class="min-h-[150px] max-h-[300px] overflow-auto">
            <div v-for="(item,index) in data.content" :key="index" class="mb-[20px]">
                <div class="flex items-center">
                    <div class="nc-iconfont nc-icon-qianbaoyueV6xx !text-[14px] mr-[5px]"></div>
                    <div class="text-[14px] font-500">{{item.limit}}</div>
                </div>
                <div class="mt-[10px]">
                    <div v-if="item.goods && item.goods.length" class="flex mt-[10px]">
                        <div class="w-[50px] flex justify-end">
                            <div class="whitespace-nowrap bg-[var(--el-color-primary-light-9)] text-[var(--el-color-primary)] rounded-[3px] text-[12px] flex items-center justify-center px-[6px] h-[19px] mr-[3px]">赠品</div>
                        </div>
                        <div class="flex-1 ml-[4px]">
                            <div class="flex p-[10px] bg-[#f8f8f8] rounded-[10px] overflow-hidden" :class="{'mb-[10px]': goodsIndex != (item.goods.length-1)}" v-for="(goodsItem,goodsIndex) in item.goods" :key="goodsIndex" @click="goodsEvent(goodsItem.goods_id)">
                                <div class="min-w-[60px] h-[60px] flex items-center justify-center rounded-[5px] overflow-hidden">
                                    <el-image v-if="goodsItem.sku_image" class="w-[60px] h-[60px]" :src="img(goodsItem.sku_image)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[60px] h-[60px]" src="@/addon/shop_replace_buy/assets/goods_default.png" />
                                            </div>
                                        </template>
                                    </el-image>
                                    <img v-else class="w-[60px] h-[60px]" src="@/addon/shop_replace_buy/assets/goods_default.png" fit="contain" />
                                </div>
                                <div class="flex flex-1 w-0 flex-col justify-between ml-[10px] pt-[3px] pb-[5px]">
                                    <div class="truncate text-[#303133] text-[14px] leading-[16px]">{{goodsItem.goods_name}}</div>
                                    <div class="flex items-baseline">
                                        <div v-if="goodsItem.sku_name" class="truncate text-[12px] mt-[2px] text-[#999]">{{ goodsItem.sku_name }}</div>
                                        <div class="font-400 ml-[auto] flex items-center text-[14px] text-[#303133]">
                                            <div>x</div>
                                            <div>{{goodsItem.num}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <template v-if="item.give && item.give.length">
                        <div class="flex items-center mt-[12px]" v-for="(giveItem,giveIndex) in item.give" :key="giveIndex">
                            <div class="w-[50px] flex justify-end">
                                <div class="whitespace-nowrap bg-[var(--el-color-primary-light-9)] text-[var(--el-color-primary)] rounded-[3px] text-[11px] flex items-center justify-center px-[6px] h-[19px] mr-[3px]">{{giveItem.label}}</div>
                            </div>
                            <div class="text-[14px]">{{giveItem.content}}</div>
                        </div>
                    </template>
                    <div class="flex items-baseline mt-[12px]" v-if="item.coupon && item.coupon.length">
                        <div class="w-[50px] flex justify-end">
                            <div class="whitespace-nowrap bg-[var(--el-color-primary-light-9)] text-[var(--el-color-primary)] rounded-[3px] text-[11px] flex items-center justify-center px-[6px] h-[19px] mr-[3px]">优惠券</div>
                        </div>
                        <div class="flex flex-col flex-1">
                            <div class="flex items-center text-[14px] leading-[1.3]" :class="{'mb-[8px]': couponIndex != (item.coupon.length-1)}" v-for="(couponItem,couponIndex) in item.coupon" :key="couponIndex">
                                {{couponItem.num}}张{{couponItem.coupon_name || couponItem.title}}优惠券
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogMemberVisible = false">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { cloneDeep } from 'lodash-es'

const dialogMemberVisible = ref(false)

const emit = defineEmits(['confirm','load'])
const data: any = ref({});

const open = (obj:any) => {
    init(obj);
    dialogMemberVisible.value = true
}

const init = (parameter:any) =>{
    data.value = cloneDeep(parameter);
    data.value.content = [];
    data.value.rule_json.forEach((item,index)=>{
        if(item.is_show || item.is_show == undefined){
            let obj = {};
            obj.limit = `门槛满${data.value.condition_type == 'over_n_yuan' ? parseFloat(item.limit).toFixed(2) : item.limit }${data.value.condition_type == 'over_n_yuan' ? '元' : '件'}`;
            if(item.is_give_goods){
                obj.goods = cloneDeep(item.goods);
            }
            obj.give = [];
            if(item.is_discount && item.discount_money){
                obj.give.push({
                    label: '满减',
                    content: `订单金额${item.discount_type == 1 ? '减' : '打'}${item.discount_type == 1 ? parseFloat(item.discount_money).toFixed(2) : item.discount_money}${item.discount_type == 1 ? '元' : '折'}`
                })
            }
            if(item.is_free_shipping){
                obj.give.push({
                    label: '包邮',
                    content: '商品包邮'
                });
            }
            if(item.is_give_point && item.point){
                obj.give.push({
                    label: '积分',
                    content: `送${item.point}积分`
                });
            }
            if(item.is_give_balance && item.balance){
                obj.give.push({
                    label: '余额',
                    content: `送${parseFloat(item.balance).toFixed(2)}余额`
                });
            }
            if(item.is_give_coupon){obj.coupon = item.coupon;}
            data.value.content.push(obj);
        }
    });
}

const confirmFn = ()=>{
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
