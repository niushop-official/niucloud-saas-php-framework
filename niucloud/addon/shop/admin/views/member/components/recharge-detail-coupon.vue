<template>
    <el-form ref="formRef" label-width="120px" :model="formData" :rules="formRules" label-position="left">
        <el-form-item class="mt-[15px]" :label="t('coupon')" >
            <div class="coupon_list">
                <el-table :data="formData.value " size="large" max-height="600" >
                    <el-table-column prop="title" :label="t('name')" min-width="120">
                        <template #default="{ row }">
                            <div>{{ row.title }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type_name" :label="t('type')" min-width="120">
                        <template #default="{ row }">
                            <div>{{ row.type_name }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" :label="t('couponPrice')" min-width="120">
                        <template #default="{ row }">
                            <div>￥{{ row.price }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column  :label="t('useThreshold')" min-width="130" >
                        <template #default="{ row }">
                            <span v-if="row.min_condition_money == '0.00'">无门槛</span>
                            <span v-else >满{{ row.min_condition_money }}元可用</span>
                        </template>
                    </el-table-column>
                    <el-table-column  :label="t('termOfValidity')" min-width="210">
                        <template #default="{ row }">
                            <span v-if="row.valid_type == 1">  领取之日起{{ row.length || '' }} 天内有效</span>
                            <span v-else> 使用截止时间至{{ row.valid_end_time || ''}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="num" :label="t('num')" min-width="120">
                        <template #default="{ row }">
                            <div>{{ row.num }}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import couponSelectPopup from '@/addon/shop/views/goods/components/coupon-select-popup.vue'
import { FormRules } from 'element-plus'
import {deepClone } from '@/utils/common'
import Test from '@/utils/test'
import { t } from "@/lang";

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => {
            return {}
        }
    }
})
const emits = defineEmits(['update:modelValue'])

const formData = ref({
    coupon_id: [],
    value: [],
})

const formRef = ref(null)
// 正则表达式
const regExp: any = {
    required: /[\S]+/,
    number: /^\d{0,10}$/,
    digit: /^\d{0,10}(.?\d{0,2})$/,
    special: /^\d{0,10}(.?\d{0,3})$/
}

const formRules = reactive<FormRules>({
})

// 选择优惠券
const couponSelect = (selectedCoupons: any, levelIndex: number) => {
    let arr = [];
    for (let key in selectedCoupons) {
        let coupons: any = selectedCoupons[key];
        let coupon: any = {
            price: coupons.price,
            title: coupons.title,
            type_name: coupons.type_name,
            coupon_id: coupons.id,
            min_condition_money: coupons.min_condition_money,
            valid_type: coupons.valid_type,
            valid_end_time: coupons.valid_end_time,
            length: coupons.length,
            num:1
        };

        if (formData.value.value.length) {
            formData.value.value.forEach((el: any) => {
            if (el.coupon_id == coupon.coupon_id) {
                coupon = Object.assign(coupon, el)
            }
        })
        }
        arr.push(deepClone(coupon))
    }
    formData.value.value = arr;
}

// 删除优惠券
const deleteCouponEvents = (row: any, levelIndex: number) => {
    const couponsIndex = formData.value.value.findIndex((el: any) => el.coupon_id === row.coupon_id);
    if (couponsIndex !== -1) {
        formData.value.value.splice(couponsIndex, 1);
    }

    const couponsIdIndex = formData.value.coupon_id.indexOf(row.coupon_id);
    if (couponsIndex !== -1) {
        formData.value.coupon_id.splice(couponsIdIndex, 1);
    }
};

const value = computed({
    get () {
        return props.modelValue
    },
    set (value) {
        emits('update:modelValue', value)
    }
})

watch(() => value.value, (nval, oval) => {
    if ((!oval || !Object.keys(oval).length) && Object.keys(nval).length) {
        formData.value = value.value
    }
}, { immediate: true })

watch(() => formData.value, () => {
    value.value = formData.value
}, { deep: true })

const verify = async () => {
    let verify = true
    await formRef.value?.validate((valid) => {
        verify = valid
    })
    return verify
}

defineExpose({
    verify
})
</script>

<style lang="scss" scoped>
.coupon_list :deep(.cell) {
    // min-height: 35px !important;
    overflow: initial !important;
}
.coupon_list :deep(.el-form-item__error ) {
    padding-top: 6px;
    left: 2px;
}
</style>
