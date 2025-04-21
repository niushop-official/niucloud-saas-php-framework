<template>
    <div class="main-container" v-loading="loading">
        <div class="detail-head" v-if="!loading">
            <div class="left" @click="back()">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{ t("returnToPreviousPage") }}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
        </div>
        <el-card class="box-card !border-none" shadow="never" v-if="!loading">
            <el-form :model="formData" label-width="200px" ref="formRef" class="page-form" v-if="Object.keys(detail).length">
                <!-- <el-alert class="warm-prompt " type="info">
                    <template #default>
                        <ul>
                            <li>{{ t('alertOne') }}</li>
                            <li>{{ t('alertTwo') }}</li>
                            <li>{{ t('alertthree') }}</li>
                        </ul>
                    </template>
                </el-alert> -->
                <div class="text-sm leading-[25px] title">{{ t('titleOne') }}</div>
                <el-card class="box-card !border-none" shadow="never">
                    <el-form-item :label="t('goodsImage')">
                        <el-image v-if="detail.goods_info.goods_cover_thumb_small" class="w-[98px] h-[98px]" :src="img(detail.goods_info.goods_cover_thumb_small)" fit="contain">
                            <template #error>
                                <div class="image-slot">
                                    <img class="w-[98px] h-[98px]" src="@/addon/ly_area/assets/goods_default.png" />
                                </div>
                            </template>
                        </el-image>
                        <img v-else class="w-[98px] h-[98px]" src="@/addon/ly_area/assets/goods_default.png" fit="contain" />
                    </el-form-item>
                    <el-form-item :label="t('goodsName')">{{ detail.goods_info.goods_name }}</el-form-item>
                </el-card>
                <div class="text-sm leading-[25px] title">{{ t('titleTwo') }}</div>
                <el-card class="box-card !border-none" shadow="never">
                    <el-form-item :label="t('isArea')">
                        <div>
                            <el-radio-group v-model="formData.is_area">
                                <el-radio :label="1">{{ t('isAreaLabelOne') }}</el-radio>
                                <el-radio :label="0">{{ t('isAreaLabelTwo') }}</el-radio>
                            </el-radio-group>
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('isAreaTipOne') }}</p>
                        </div>
                    </el-form-item>
                    <template v-if="formData.is_area">
                        <el-form-item :label="t('countPrice')">
                            <div class="w-full">
                                <el-table :data="formData.skuList" size="large">
                                    <el-table-column prop="sku_name" :label="t('skuName')" min-width="120">
                                        <template #default="{ row }">
                                            <span>{{ row.sku_name || detail.goods_info.goods_name }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="price" :label="t('skuPrice')" min-width="120" />
                                    <el-table-column prop="cost_price" :label="t('costPrice')" min-width="120" />
                                    <el-table-column :label="t('calculatePrice')" min-width="120">
                                        <template #default="{ row, $index }">
                                            <div class="h-[62px] border-box py-[15px]">
                                                <el-form-item :prop="'skuList[' + $index + '].calculate_price'" :rules="[{
                                                    trigger: 'blur',
                                                    required: false,
                                                    validator: (rule: any, value: any, callback: any) => {
                                                        if (value) {
                                                            if (value <= 0) {
                                                                return callback(t('calculatePricePlaceholderTwo'))
                                                            } else if (!regExp.digit.test(value)) {
                                                                return callback(t('calculatePricePlaceholderOne'))
                                                            } else {
                                                                return callback()
                                                            }
                                                        } else {
                                                            return callback()
                                                        }
                                                    }
                                                }]" class="sku-form-item-wrap">
                                                    <el-input v-model="row.calculate_price" clearable class="input-width mr-[10px]" @keyup="filterDigit($event)">
                                                        <template #append>元</template>
                                                    </el-input>
                                                </el-form-item>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('calculatePriceTip') }}</p>
                            </div>
                        </el-form-item>
                        <el-form-item :label="t('type')">
                            <el-radio-group v-model="formData.is_rule">
                                <el-radio :label="1">{{ t('typeLabelOne') }}</el-radio>
                                <el-radio :label="2">{{ t('typeLabelTwo') }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item v-if="formData.is_rule == 1">
                            <el-table :data="detail.rule" size="large">
                                <el-table-column prop="level_name" :label="t('levelname')" min-width="120" />
                                <el-table-column prop="level_rate" :label="t('oneRate')" min-width="120">
                                    <template #default="{ row }">
                                        <span>{{ row.level_rate }}%</span>
                                    </template>
                                </el-table-column>
                                
                            </el-table>
                        </el-form-item>
                        <el-form-item v-else>
                            <el-table :data="detail.rule" size="large" class="rule">
                                <el-table-column :label="t('skuName')" min-width="120">
                                    <template #default="{ row }">
                                        <p class="leading-[124px] px-[16px] border-box"
                                            :class="{ 'border-b-[1px] border-solid border-[var(--el-table-border-color)]': index < (formData.skuList.length - 1) }"
                                            v-for="(item, index) in formData.skuList" :key="index">{{ item.sku_name || detail.goods_info.goods_name }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="t('price')" min-width="120">
                                    <template #default="{ row }">
                                        <p class="leading-[124px] px-[16px] border-box"
                                            :class="{ 'border-b-[1px] border-solid border-[var(--el-table-border-color)]': index < (formData.skuList.length - 1) }"
                                            v-for="(item, index) in formData.skuList" :key="index">￥{{ item.price }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="level_name" :label="t('rateName')" min-width="120">
                                    <template #default="{ row }">
                                        <p class="px-[16px] border-box">{{ row.level_name }}</p>
                                    </template>
                                </el-table-column>
                                <!-- 分红比例 -->
                                <el-table-column :label="t('oneRate')" min-width="120">
                                    <template #default="{ row }">
                                        <template v-for="(item, index) in formData.skuList" :key="index">
                                            <div class="h-[62px] border-box py-[15px] px-[16px]">
                                                <el-form-item v-if="formData.area_rule[item.sku_id][row.level_id]"
                                                    :prop="`area_rule[${item.sku_id}][${row.level_id}].level_rate`" :rules="[{
                                                        trigger: 'blur',
                                                        required: false,
                                                        validator: (rule: any, value: any, callback: any) => {
                                                            if (formData.area_rule[item.sku_id][row.level_id].level_money!= '' && parseFloat(formData.area_rule[item.sku_id][row.level_id].level_money)!= 0) {
                                                                return callback()
                                                            } else if (value) {
                                                                if (value >= 100) {
                                                                    return callback(t('oneRatePlaceholderThree'))
                                                                } else if (value <= 0) {
                                                                    return callback(t('oneRatePlaceholderTwo'))
                                                                } else if (!regExp.digit.test(value)) {
                                                                    return callback(t('oneRatePlaceholderOne'))
                                                                } else {
                                                                    return callback()
                                                                }
                                                            } else if (!formData.area_rule[item.sku_id][row.level_id].level_money) {
                                                                return callback()
                                                            } else {
                                                                return callback()
                                                            }
                                                        }
                                                    }]" class="sku-form-item-wrap">
                                                    <el-input
                                                        v-model="formData.area_rule[item.sku_id][row.level_id].level_rate"
                                                        clearable
                                                        @blur="inputblur(`area_rule[${item.sku_id}][${row.level_id}].level_money`)"
                                                        class="input-width mr-[10px]" @keyup="filterDigit($event)">
                                                        <template #append>%</template>
                                                    </el-input>
                                                </el-form-item>
                                            </div>
                                            <div class="h-[62px] border-box py-[15px] px-[16px]"
                                                :class="{ 'border-b-[1px] border-solid border-[var(--el-table-border-color)]': index < (formData.skuList.length - 1) }">
                                                <el-form-item v-if="formData.area_rule[item.sku_id][row.level_id]"
                                                    :prop="`area_rule[${item.sku_id}][${row.level_id}].level_money`"
                                                    :rules="[{
                                                        trigger: 'blur',
                                                        required: false,
                                                        validator: (rule: any, value: any, callback: any) => {
                                                            if (formData.area_rule[item.sku_id][row.level_id].level_rate!= '' && parseFloat(formData.area_rule[item.sku_id][row.level_id].level_rate)!= 0) {
                                                                return callback()
                                                            } else if (value) {
                                                                if (value <= 0) {
                                                                    return callback(t('oneMoneyPlaceholderTwo'))
                                                                } else if (!regExp.digit.test(value)) {
                                                                    return callback(t('oneMoneyPlaceholderOne'))
                                                                } else {
                                                                    return callback()
                                                                }
                                                            } else if (!formData.area_rule[item.sku_id][row.level_id].level_rate) {
                                                                return callback()
                                                            } else {
                                                                return callback()
                                                            }
                                                        }
                                                    }]" class="sku-form-item-wrap">
                                                    <el-input
                                                        v-model="formData.area_rule[item.sku_id][row.level_id].level_money"
                                                        clearable
                                                        @blur="inputblur(`area_rule[${item.sku_id}][${row.level_id}].level_rate`)"
                                                        class="input-width mr-[10px]" @keyup="filterDigit($event)">
                                                        <template #append>元</template>
                                                    </el-input>
                                                </el-form-item>
                                            </div>
                                        </template>
                                    </template>
                                </el-table-column>
                                
                            </el-table>
                        </el-form-item>
                    </template>
                </el-card>
            </el-form>
        </el-card>
        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="save()">{{ t('save') }}</el-button>
                <el-button @click="back()">{{ t('back') }}</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { t } from "@/lang";
import { img,filterDigit } from '@/utils/common';
import { FormInstance } from 'element-plus'
import { getAreaGoodsInfo, setAreaGoodsInfo } from '@/addon/ly_area/api/goods'
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const pageName = route.meta.title;
const repeat = ref<Boolean>(false)
const loading = ref<Boolean>(false)
const detail = ref<any>({})
// 正则表达式
const regExp = {
    required: /[\S]+/,
    number: /^\d{0,10}$/,
    digit: /^\d{0,10}(.?\d{0,2})$/,
    special: /^\d{0,10}(.?\d{0,3})$/
}
const formData = ref<any>({
    id: 0,
    is_area: 1,
    is_rule: 1,
    skuList: [],
    area_rule: {}
})
const formRef = ref<FormInstance>()
const getDetail = (id: number) => {
    loading.value = true
    getAreaGoodsInfo(id).then((res: any) => {
        detail.value = res.data
        formData.value.id = route.query.goods_id
        formData.value.is_rule = res.data.goods_info.is_rule
        formData.value.is_area = res.data.goods_info.is_set_area
        formData.value.skuList = res.data.goods_info.skuList
        formData.value.area_rule = res.data.goods_info.areaGoods.area_rule ? JSON.parse(res.data.goods_info.areaGoods.area_rule) : {}
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}
let id = Number(route.query.goods_id)
getDetail(id)
//校验相邻input
const inputblur = (str: String) => {
    formRef.value?.validateField(str)
}
const save = () => {
    if (formData.value.is_rule == 2) {
        formRef.value?.validate((valid) => {
            console.log(valid)
            if (valid) {
                if (repeat.value) return
                repeat.value = true
                setAreaGoodsInfo(formData.value).then((res) => {
                    repeat.value = false
                    back()
                }).catch(() => {
                    repeat.value = false
                })
            }
        })
    } else {
        if (repeat.value) return
        repeat.value = true
        setAreaGoodsInfo(formData.value).then((res) => {
            repeat.value = false
            back()
        }).catch(() => {
            repeat.value = false
        })
    }
}
const back = () => {
    router.push('/ly_area/goods')
};
</script>
<style lang="scss" scoped>
.warm-prompt {
    margin-bottom: 18px;

    ul {
        padding-left: 20px;
    }

    li {
        list-style: initial;

        &::marker {
            color: var(--el-color-primary-dark-2)
        }
    }
}

.sku-form-item-wrap :deep(.el-form-item__content) {
    margin-left: 0 !important;
}

.el-input.el-input-group--append {
    width: 170px;
}

.rule :deep(.el-table__body .cell) {
    padding: 0;
}</style>