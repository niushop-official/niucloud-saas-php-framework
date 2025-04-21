<template>
    <div>
        <!-- 充值设置 -->
        <el-card class="box-card !border-none main-container" shadow="never">
            <div class="flex justify-between items-center mb-[10px]">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form">
                <el-card class="box-card !border-none" shadow="never">
                    <el-form-item :label="t('enableRecharge')" prop="is_use">
                        <div class="flex items-center mx-[5px]">
                            <el-switch v-model="formData.is_use" :active-value="1" :inactive-value="0" />
                        </div>
                    </el-form-item>
                   <el-form-item :label="t('rechargeExplain')" prop="recharge_explain">
                       <el-input v-model="formData.recharge_explain" :placeholder="t('rechargeExplainPlaceholder')" type="textarea" maxlength="500" show-word-limit rows="5" class="!w-[400px]" clearable />
                   </el-form-item>
                    <el-form-item :label="t('min_price')" prop="min_price">
                        <el-input v-model.trim="formData.min_price" clearable placeholder="0.00" class="input-width-short" maxlength="8" show-word-limit />
                    </el-form-item>
                    <el-form-item :label="t('closeOrderInfo')" prop="close_length">
                        <div>
                            <p class="!text-sm">
                                <span>{{ t('closeOrderInfoLeft') }}</span>
                                <el-input v-model.trim="formData.close_length" class="!w-[120px] mx-[10px]" @keyup="filterNumber($event)" clearable />
                                <span>{{ t('closeOrderInfoRight') }}</span>
                            </p>
                            <p class="text-[12px] text-[#a9a9a9] leading-normal  mt-[5px]">{{ t('closeOrderInfoBottom') }}</p>
                        </div>
                    </el-form-item>

                </el-card>
            </el-form>
        </el-card>

        <!-- 提交按钮 -->
        <div class="fixed-footer-wrap">
            <div class="fixed-footer h-[48px]">
                <el-button type="primary" @click="onSave">{{ t("save") }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { t } from "@/lang";
import { useRoute } from "vue-router";
import { FormInstance } from "element-plus";
import {setRechargeConfig ,getRechargeConfig} from "@/addon/recharge/api/recharge";
import { filterNumber } from '@/utils/common'

const route = useRoute();
const pageName = route.meta.title;

const formData = ref({
    is_use: 1,
    recharge_explain: "",
    min_price: "",
    close_length: ''
});
const formRef = ref<FormInstance>();

// 正则表达式
const regExp: any = {
    required: /[\S]+/,
    number: /^\d{0,10}$/,
    digit: /^\d{0,10}(.?\d{0,2})$/,
    special: /^\d{0,10}(.?\d{0,3})$/
}

const formRules = computed(() => {
    return {
        min_price: [{
            required: true,
            trigger: 'blur',
            validator: (rule: any, value: any, callback: any) => {
                if (value === null || value === '') {
                    callback(t('minPricePlaceholder'))
                } else if (isNaN(value) || !regExp.digit.test(value)) {
                    callback(t('limitTips'))
                } else if (value < 0.01) {
                    callback(t('limitTipsTwo'))
                } else {
                    callback();
                }
            }
        }],
        close_length: [
            { validator: validCloseLength, trigger: 'blur' }
        ],
    };
});

const validCloseLength = (rule:any, value:any, callback:Function) => {
    if (value) {
        if (value == '') {
            return callback(new Error(t('CloseLengthPlaceholder')))
        } else if (Number(value) >= 10 && Number(value) <= 1440) {
            return callback()
        } else {
            return callback(new Error(t('closeOrderInfoBottom')))
        }
    } else {
        return callback()
    }
}

const getRechargeConfigFn = () => {
    getRechargeConfig().then((res: any) => {
        formData.value = res.data;
    })
};

getRechargeConfigFn();

/**** 提交 ****/
const onSave = async () => {
    await formRef.value?.validate(async(valid) => {
        if (valid) {
            setRechargeConfig(formData.value).then(() => {
                getRechargeConfigFn();
            }).catch(() => {
            });
        }
    });
};
</script>

<style lang="scss" scoped>
.input-width-short{
    width: 150px;
}
</style>
