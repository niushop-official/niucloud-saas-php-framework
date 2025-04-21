<template>
    <el-dialog v-model="dialogVisible" title="优惠券列表" class="w-[70%] max-w-[1200px]" @close="handleClose">
        <div class="flex flex-col h-500px bg-[#f1f1f1]">
            <el-scrollbar class="flex-1 relative">
                <div class="absolute left-0 top-0 w-full h-full" v-if="loading" v-loading="loading"
                    element-loading-text="加载中..."></div>
                <div class="grid3 m-10px">
                    <div class="flex rounded-10px relative bg-white justify-center cursor-pointer" @click="handleConfirm({})">
                        <div class="absolute left-110px top-[-10px] w-20px h-20px bg-[#f1f1f1] rounded-full"></div>
                        <div class="absolute left-110px bottom-[-10px] w-20px h-20px bg-[#f1f1f1] rounded-full"></div>
                        <div
                            class="w-120px border-r border-dashed border-[#f1f1f1] text-[#f5222d] text-center flex flex-col justify-center pt-20px pb-20px">
                            <div class="font-bold">
                                <span class="text-[28px]">不使用</span>
                            </div>
                        </div>
                        <div class="flex-1 flex flex-col justify-center pt-20px pb-20px pl-20px">
                            <div class="font-bold text-16px">不使用优惠券</div>
                        </div>
                        <div
                            class="w-30px flex flex-col justify-center items-center bg-[#ffebda] text-[#f70] radius-tr-10 radius-br-10">
                            <div>立</div>
                            <div>即</div>
                            <div>使</div>
                            <div>用</div>
                        </div>
                    </div>
                    <div class="flex rounded-10px relative"
                        :class="{ 'disabled cursor-not-allowed bg-[#ccc]': !item.canUse, 'cursor-pointer bg-white': item.canUse }"
                        v-for="(item, index) in couponList" :key="index" @click="handleConfirm(item)">
                        <div class="absolute left-110px top-[-10px] w-20px h-20px bg-[#f1f1f1] rounded-full"></div>
                        <div class="absolute left-110px bottom-[-10px] w-20px h-20px bg-[#f1f1f1] rounded-full"></div>
                        <div
                            class="w-120px border-r border-dashed border-[#f1f1f1] text-[#f5222d] text-center flex flex-col justify-center pt-20px pb-20px">
                            <div class="font-bold">
                                <span>￥</span>
                                <span class="text-[28px]">{{ parseFloat(item.price as string) }}</span>
                            </div>
                            <div>满{{ parseFloat(item.min_condition_money as string) }}元可用</div>
                        </div>
                        <div class="flex-1 flex flex-col justify-between pt-20px pb-20px pl-20px">
                            <div class="font-bold text-16px">{{ item.title }}</div>
                            <div class="mt-10px mb-10px"><span
                                    class="border border-[#f5222d] rounded-full pl-10px pr-10px text-[#f5222d]">{{
                                        getCouponType(item.type) }}</span></div>
                            <div>{{ item.expire_time }}</div>
                        </div>
                        <div
                            class="w-30px flex flex-col justify-center items-center bg-[#ffebda] text-[#f70] radius-tr-10 radius-br-10">
                            <div>立</div>
                            <div>即</div>
                            <div>使</div>
                            <div>用</div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { CouponInterface } from '@/interface/CouponInterface';
import { GoodsInterface } from '@/interface/GoodsInterface';
import request from '@/utils/request';
import { computed, ref, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    goods: {
        type: Array,
        required: true,
    }
});

const emit = defineEmits(['update:show', 'selected'])
const goods = ref<GoodsInterface[]>(props.goods as GoodsInterface[]);

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
const handleConfirm = (item: any) => {
    dialogVisible.value = false;
    emit('selected', item);
}

watch(() => props.show, (val) => {
    if (val) {
        getCouponList()
        goods.value = props.goods as GoodsInterface[]
    }
})

const loading = ref(false)
const couponList = ref<CouponInterface[]>([])
const getCouponList = () => {
    if (loading.value) return
    loading.value = true
    let params = {
        member_id: props.userId || 0
    }
    request.get('qiankun_cashier/user/coupon_list', { params }).then((res) => {
        loading.value = false
        let cartGoodsIds = goods.value.map((item: any) => {
            return item.goods_id
        })
        let cartGoodsCategory: number[] = []
        for (let i = 0; i < goods.value.length; i++) {
            for (let j in goods.value[i].goods_detail.goods_info.goods_category) {
                let cateId = goods.value[i].goods_detail.goods_info.goods_category[j]
                if (!cartGoodsCategory.includes(cateId)) {
                    cartGoodsCategory.push(cateId)
                }
            }
        }
        for (let i = 0; i < res.data.length; i++) {
            let goodsIds = res.data[i].goods.map((item: any) => {
                return item.goods_id
            })
            // 过滤掉goodsIds为0的元素
            goodsIds = goodsIds.filter((item: any) => {
                return item !== 0
            })
            let categoryIds = res.data[i].goods.map((item: any) => {
                return item.category_id
            })
            if (goodsIds.length == 0 && categoryIds.length == 0) {
                res.data[i].canUse = true
            } else {
                if (goodsIds.length) {
                    // 判断goodsIds和cartGoodsIds是否交集
                    if (goodsIds.filter((item: any) => {
                        return cartGoodsIds.includes(item)
                    }).length > 0) {
                        res.data[i].canUse = true
                    } else {
                        res.data[i].canUse = false
                    }
                } else if (categoryIds.length) {
                    if (categoryIds.filter((item: any) => {
                        return cartGoodsCategory.includes(item)
                    }).length > 0) {
                        res.data[i].canUse = true
                    } else {
                        res.data[i].canUse = false
                    }
                }
            }
            if (res.data[i].min_condition_money > 0 && res.data[i].min_condition_money > props.price) {
                res.data[i].canUse = false
            }
            // if (!res.data[i].canUse) {
            // 查看为什么不能使用
            // }
        }
        couponList.value = res.data
    }).catch((err) => {
        loading.value = false
        console.error(err)
    })
}

const getCouponType = (type: number | string) => {
    type = Number(type)
    // 1通用优惠券 2商品品类优惠券 3商品优惠券
    switch (type) {
        case 1:
            return '通用优惠券'
        case 2:
            return '商品品类优惠券'
        case 3:
            return '商品优惠券'
        default:
            return ''
    }
}
</script>
