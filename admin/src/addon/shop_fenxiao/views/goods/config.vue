<template>
    <div class="main-container" v-loading="loading">

        <!--返回-->
        <el-card class="card !border-none" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="back()" />
        </el-card>
        <!--返回 end-->

        <el-card class="card mt-[15px] !border-none" shadow="never" v-if="!loading">
            <el-form class="page-form" :model="formData" label-width="200px" ref="formRef" v-if="Object.keys(detail).length">
                <el-alert type="info">
                    <template #default>
                        <ul>
                            <li>{{ t('alertOne') }}</li>
                            <li>{{ t('alertTwo') }}</li>
                            <li>{{ t('alertthree') }}</li>
                        </ul>
                    </template>
                </el-alert>
                <div class="text mt-[20px] text-[14px] leading-[25px]">{{ t('titleOne') }}</div>
                <el-card class="card !border-none" shadow="never">
                    <el-form-item :label="t('goodsImage')">
                        <el-image v-if="detail.goods_info.goods_cover_thumb_small" class="w-[98px] h-[98px]" :src="img(detail.goods_info.goods_cover_thumb_small)" fit="contain">
                            <template #error>
                                <div class="image-slot">
                                    <img class="w-[98px] h-[98px]" src="@/addon/shop_fenxiao/assets/goods_default.png" />
                                </div>
                            </template>
                        </el-image>
                        <img v-else class="w-[98px] h-[98px]" src="@/addon/shop_fenxiao/assets/goods_default.png" fit="contain" />
                    </el-form-item>
                    <el-form-item :label="t('goodsName')">{{ detail.goods_info.goods_name }}</el-form-item>
                </el-card>
                <div class="text text-[14px] leading-[25px]">{{ t('titleTwo') }}</div>
                <el-card class="card !border-none" shadow="never">
                    <el-form-item :label="t('isFenxiao')">
                        <div>
                            <el-radio-group v-model="formData.is_fenxiao">
                                <el-radio :label="1">{{ t('isFenxiaoLabelOne') }}</el-radio>
                                <el-radio :label="0">{{ t('isFenxiaoLabelTwo') }}</el-radio>
                            </el-radio-group>
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('isFenxiaoTipOne') }}</p>
                        </div>
                    </el-form-item>
                    <template v-if="formData.is_fenxiao">
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
                                                    required: true,
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
                                                    <el-input v-model.trim="row.calculate_price" clearable class="input-width mr-[10px]" @keyup="filterDigit($event)">
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
                            <el-radio-group v-model="formData.fenxiao_type">
                                <el-radio :label="1">{{ t('typeLabelOne') }}</el-radio>
                                <el-radio :label="2">{{ t('typeLabelTwo') }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item v-if="formData.fenxiao_type == 1">
                            <el-table :data="detail.rule" size="large">
                                <el-table-column prop="level_name" :label="t('levelname')" min-width="120" />
                                <el-table-column prop="one_rate" :label="t('oneRate')" min-width="120">
                                    <template #default="{ row }">
                                        <span>{{ row.one_rate }}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="two_rate" :label="t('twoRate')" min-width="120">
                                    <template #default="{ row }">
                                        <span>{{ row.two_rate }}%</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                        <el-form-item v-else>
                            <el-table :data="detail.rule" size="large" class="rule">
                                <el-table-column :label="t('skuName')" min-width="120">
                                    <template #default="{ row }">
                                        <p class="h-[124px] flex items-center px-[16px] border-box"
                                            :class="{ 'border-b-[1px] border-solid border-[var(--el-table-border-color)]': index < (formData.skuList.length - 1) }"
                                            v-for="(item, index) in formData.skuList" :key="index">{{ item.sku_name || detail.goods_info.goods_name }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="t('price')" min-width="120">
                                    <template #default="{ row }">
                                        <p class="h-[124px] flex items-center px-[16px] border-box"
                                            :class="{ 'border-b-[1px] border-solid border-[var(--el-table-border-color)]': index < (formData.skuList.length - 1) }"
                                            v-for="(item, index) in formData.skuList" :key="index">￥{{ item.price }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="level_name" :label="t('rateName')" min-width="120">
                                    <template #default="{ row }">
                                        <p class="px-[16px] border-box">{{ row.level_name }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="t('oneRate')" min-width="120">
                                    <template #default="{ row }">
                                        <template v-for="(item, index) in formData.skuList" :key="index">
                                            <div class="h-[62px] border-box py-[15px] px-[16px]">
                                                <el-form-item v-if="formData.fenxiao_rule[item.sku_id][row.level_id]"
                                                    :prop="`fenxiao_rule[${item.sku_id}][${row.level_id}].one_rate`" :rules="[{
                                                        trigger: 'blur',
                                                        required: true,
                                                        validator: (rule: any, value: any, callback: any) => {
                                                            if (formData.fenxiao_rule[item.sku_id][row.level_id].one_money != '' && parseFloat(formData.fenxiao_rule[item.sku_id][row.level_id].one_money) != 0) {
                                                                return callback()
                                                            } else if (value) {
                                                                if (value >= 100) {
                                                                    return callback(t('oneRatePlaceholderThree'))
                                                                } else if (value < 0) {
                                                                    return callback(t('oneRatePlaceholderTwo'))
                                                                } else if (!regExp.digit.test(value)) {
                                                                    return callback(t('oneRatePlaceholderOne'))
                                                                } else {
                                                                    return callback()
                                                                }
                                                            } else if (!formData.fenxiao_rule[item.sku_id][row.level_id].one_money) {
                                                                return callback(t('oneRatePlaceholder'))
                                                            } else {
                                                                return callback()
                                                            }
                                                        }
                                                    }]" class="sku-form-item-wrap">
                                                    <el-input
                                                        v-model.trim="formData.fenxiao_rule[item.sku_id][row.level_id].one_rate"
                                                        clearable
                                                        :disabled="formData.fenxiao_rule[item.sku_id][row.level_id].one_money != '' && parseFloat(formData.fenxiao_rule[item.sku_id][row.level_id].one_money) != 0"
                                                        @blur="inputblur(`fenxiao_rule[${item.sku_id}][${row.level_id}].one_money`)"
                                                        class="input-width mr-[10px]" @keyup="filterDigit($event)">
                                                        <template #append>%</template>
                                                    </el-input>
                                                </el-form-item>
                                            </div>
                                            <div class="h-[62px] border-box py-[15px] px-[16px]"
                                                :class="{ 'border-b-[1px] border-solid border-[var(--el-table-border-color)]': index < (formData.skuList.length - 1) }">
                                                <el-form-item v-if="formData.fenxiao_rule[item.sku_id][row.level_id]"
                                                    :prop="`fenxiao_rule[${item.sku_id}][${row.level_id}].one_money`"
                                                    :rules="[{
                                                        trigger: 'blur',
                                                        required: true,
                                                        validator: (rule: any, value: any, callback: any) => {
                                                            if (formData.fenxiao_rule[item.sku_id][row.level_id].one_rate != '' && parseFloat(formData.fenxiao_rule[item.sku_id][row.level_id].one_rate) != 0) {
                                                                return callback()
                                                            } else if (value) {
                                                                if (value < 0) {
                                                                    return callback(t('oneMoneyPlaceholderTwo'))
                                                                } else if (!regExp.digit.test(value)) {
                                                                    return callback(t('oneMoneyPlaceholderOne'))
                                                                } else {
                                                                    return callback()
                                                                }
                                                            } else if (!formData.fenxiao_rule[item.sku_id][row.level_id].one_rate) {
                                                                return callback(t('oneRatePlaceholder'))
                                                            } else {
                                                                return callback()
                                                            }
                                                        }
                                                    }]" class="sku-form-item-wrap">
                                                    <el-input
                                                        v-model.trim="formData.fenxiao_rule[item.sku_id][row.level_id].one_money"
                                                        clearable
                                                        :disabled="formData.fenxiao_rule[item.sku_id][row.level_id].one_rate != '' && parseFloat(formData.fenxiao_rule[item.sku_id][row.level_id].one_rate) != 0"
                                                        @blur="inputblur(`fenxiao_rule[${item.sku_id}][${row.level_id}].one_rate`)"
                                                        class="input-width mr-[10px]" @keyup="filterDigit($event)">
                                                        <template #append>元</template>
                                                    </el-input>
                                                </el-form-item>
                                            </div>
                                        </template>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="two_rate" :label="t('twoRate')" min-width="120">
                                    <template #default="{ row }">
                                        <template v-for="(item, index) in formData.skuList" :key="index">
                                            <div class="h-[62px] border-box py-[15px] px-[16px]">
                                                <el-form-item v-if="formData.fenxiao_rule[item.sku_id][row.level_id]"
                                                    :prop="`fenxiao_rule[${item.sku_id}][${row.level_id}].two_rate`" :rules="[{
                                                        trigger: 'blur',
                                                        required: true,
                                                        validator: (rule: any, value: any, callback: any) => {
                                                            if (formData.fenxiao_rule[item.sku_id][row.level_id].two_money != '' && parseFloat(formData.fenxiao_rule[item.sku_id][row.level_id].two_money) != 0) {
                                                                return callback()
                                                            } else if (value) {
                                                                if (value >= 100) {
                                                                    return callback(t('twoRatePlaceholderThree'))
                                                                } else if (value < 0) {
                                                                    return callback(t('twoRatePlaceholderTwo'))
                                                                } else if (!regExp.digit.test(value)) {
                                                                    return callback(t('twoRatePlaceholderOne'))
                                                                } else {
                                                                    return callback()
                                                                }
                                                            } if (!formData.fenxiao_rule[item.sku_id][row.level_id].two_money && !formData.fenxiao_rule[item.sku_id][row.level_id].two_rate) {
                                                                return callback(t('twoRatePlaceholder'))
                                                            } else {
                                                                return callback()
                                                            }
                                                        }
                                                    }]" class="sku-form-item-wrap">
                                                    <el-input
                                                        v-model.trim="formData.fenxiao_rule[item.sku_id][row.level_id].two_rate"
                                                        clearable
                                                        :disabled="formData.fenxiao_rule[item.sku_id][row.level_id].two_money != '' && parseFloat(formData.fenxiao_rule[item.sku_id][row.level_id].two_money) != 0"
                                                        @blur="inputblur(`fenxiao_rule[${item.sku_id}][${row.level_id}].two_money`)"
                                                        class="input-width mr-[10px]" @keyup="filterDigit($event)">
                                                        <template #append>%</template>
                                                    </el-input>
                                                </el-form-item>
                                            </div>
                                            <div class="h-[62px] border-box py-[15px] px-[16px]"
                                                :class="{ 'border-b-[1px] border-solid border-[var(--el-table-border-color)]': index < (formData.skuList.length - 1) }">
                                                <el-form-item v-if="formData.fenxiao_rule[item.sku_id][row.level_id]"
                                                    :prop="`fenxiao_rule[${item.sku_id}][${row.level_id}].two_money`"
                                                    :rules="[{
                                                        trigger: 'blur',
                                                        required: true,
                                                        validator: (rule: any, value: any, callback: any) => {
                                                            if (formData.fenxiao_rule[item.sku_id][row.level_id].two_rate != '' && parseFloat(formData.fenxiao_rule[item.sku_id][row.level_id].two_rate) != 0) {
                                                                return callback()
                                                            } else if (value) {
                                                                if (value < 0) {
                                                                    return callback(t('twoMoneyPlaceholderTwo'))
                                                                } else if (!regExp.digit.test(value)) {
                                                                    return callback(t('twoMoneyPlaceholderOne'))
                                                                } else {
                                                                    return callback()
                                                                }
                                                            } else if (!formData.fenxiao_rule[item.sku_id][row.level_id].two_rate) {
                                                                return callback(t('twoRatePlaceholder'))
                                                            } else {
                                                                return callback()
                                                            }
                                                        }
                                                    }]" class="sku-form-item-wrap">
                                                    <el-input
                                                        v-model.trim="formData.fenxiao_rule[item.sku_id][row.level_id].two_money"
                                                        clearable
                                                        :disabled="formData.fenxiao_rule[item.sku_id][row.level_id].two_rate != '' && parseFloat(formData.fenxiao_rule[item.sku_id][row.level_id].two_rate) != 0"
                                                        @blur="inputblur(`fenxiao_rule[${item.sku_id}][${row.level_id}].two_rate`)"
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
import { ArrowLeft } from '@element-plus/icons-vue'
import { getFenxiaoGoodsInfo, setFenxiaoGoodsInfo } from '@/addon/shop_fenxiao/api/goods'
import { useRoute, useRouter } from "vue-router";
import { cloneDeep } from 'lodash-es'

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
    is_fenxiao: 1,
    fenxiao_type: 1,
    skuList: [],
    fenxiao_rule: {}
})
const formRef = ref<FormInstance>()
const getDetail = (id: number) => {
    loading.value = true
    getFenxiaoGoodsInfo(id).then((res: any) => {
        detail.value = res.data
        formData.value.id = route.query.goods_id
        formData.value.fenxiao_type = res.data.goods_info.fenxiao_type
        formData.value.is_fenxiao = res.data.goods_info.is_set_fenxiao
        formData.value.skuList = res.data.goods_info.skuList

        formData.value.fenxiao_rule = res.data.goods_info.fenxiaoGoods && Object.keys(res.data.goods_info.fenxiaoGoods.fenxiao_rule).length ? JSON.parse(res.data.goods_info.fenxiaoGoods.fenxiao_rule) : {};
        res.data.goods_info.skuList.forEach((item: any,index: any) => {
            item.calculate_price = item.calculate_price || '';
            if(!formData.value.fenxiao_rule[item.sku_id]){
                formData.value.fenxiao_rule[item.sku_id] = {}
                res.data.rule.forEach((subItem: any,subIndex: any) => {
                    formData.value.fenxiao_rule[item.sku_id][subItem.level_id] = cloneDeep(subItem);
                    formData.value.fenxiao_rule[item.sku_id][subItem.level_id].one_money = "0";
                    formData.value.fenxiao_rule[item.sku_id][subItem.level_id].two_money = "0";
                    
                });
            }
        });

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
    if (formData.value.fenxiao_type == 2) {
        formRef.value?.validate((valid) => {
            if (valid) {
                if (repeat.value) return
                repeat.value = true
                setFenxiaoGoodsInfo(formData.value).then((res) => {
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
        setFenxiaoGoodsInfo(formData.value).then((res) => {
            repeat.value = false
            back()
        }).catch(() => {
            repeat.value = false
        })
    }
}
const back = () => {
    router.push('/shop_fenxiao/management/goods')
};
</script>

<style lang="scss" scoped>
    .sku-form-item-wrap :deep(.el-form-item__content) {
        margin-left: 0 !important;
    }

    .el-input.el-input-group--append {
        width: 150px;
    }

    .rule :deep(.el-table__body .cell) {
        padding: 0;
    }
</style>
