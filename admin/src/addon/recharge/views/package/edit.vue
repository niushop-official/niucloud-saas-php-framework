<template>
    <div  class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <el-page-header :content="recharge_id ? t('editRecharge') : t('addRecharge')" :icon="ArrowLeft" @back="back()" />
        </el-card>

        <el-card class="box-card mt-[15px] !border-none" shadow="never" v-loading="loading">
            <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('rechargeName')" prop="recharge_name">
                    <el-input v-model.trim="formData.recharge_name" clearable :placeholder="t('namePlaceholder')" class="input-width" maxlength="10" show-word-limit />
                </el-form-item>
                <el-form-item :label="t('faceValue')" prop="face_value">
                    <el-input v-model.trim="formData.face_value" clearable placeholder="0.00" class="input-width-short" maxlength="5">
                        <template #append>{{ t('yuan') }}</template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="t('price')" prop="buy_price">
                    <el-input v-model.trim="formData.buy_price" clearable placeholder="0.00" class="input-width-short" maxlength="5">
                        <template #append>{{ t('yuan') }}</template>
                    </el-input>
                </el-form-item>
                <div>
                    <package-gift v-if="!loading" ref="giftRef" v-model="formData.gift_json"/>
                </div>
                <el-form-item :label="t('sort')" prop="sort">
                    <el-input v-model.number="formData.sort" clearable placeholder="0" class="input-width-short" maxlength="8" @keyup="filterNumber($event)" @blur="formData.sort = $event.target.value" show-word-limit />
                </el-form-item>
                <el-form-item :label="t('status')" prop="status">
                    <el-switch v-model="formData.status" class="input-width" :active-value="1" :inactive-value="0" />
                </el-form-item>
            </el-form>

        </el-card>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="save()">{{ t("save") }}</el-button>
                <el-button @click="back()">{{ t("cancel") }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive} from "vue";
import { t } from "@/lang";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft } from "@element-plus/icons-vue";
import { FormInstance } from "element-plus";
import {img, filterNumber } from '@/utils/common'
import {addRechargePackage,editRechargePackage,getRechargePackageInfo} from "@/addon/recharge/api/recharge";
import packageGift from '@/addon/recharge/views/package/components/package-gift.vue'

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const recharge_id = route.query.recharge_id;
const formData = reactive({
    recharge_id:0,
    recharge_name: "",
    face_value: "",
    buy_price: "",
    sort: "",
    status: 1,
    gift_json:{}
});
const gifts = ref({})
const giftRef = ref(null)
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
        recharge_name: [{ required: true, message: t("namePlaceholder"), trigger: "blur" }],
        face_value: [{
            required: true,
            trigger: 'blur',
            validator: (rule: any, value: any, callback: any) => {
                if (value === null || value === '') {
                    callback(t('faceValuePlaceholder'))
                } else if (isNaN(value) || !regExp.digit.test(value)) {
                    callback(t('limitTips'))
                } else if (value <= 0) {
                    callback(t('faceValueMustBeGreaterThanZero'))
                } else {
                    callback();
                }
            }
        }],
        buy_price: [{
            required: true,
            trigger: 'blur',
            validator: (rule: any, value: any, callback: any) => {
                if (value === null || value === '') {
                    callback(t('pricePlaceholder'))
                } else if (isNaN(value) || !regExp.digit.test(value)) {
                    callback(t('limitTips'))
                } else if (value <= 0) {
                    callback(t('priceMustBeGreaterThanZero'))
                } else {
                    callback();
                }
            }
        }]
    };
});

const getRechargePackageInfoFn= () => {
    if (recharge_id) {
      // 获取详情
        loading.value = true;
        let data = {
            recharge_id: Number(recharge_id)
        }
        getRechargePackageInfo(data).then((res) => {
            const data = res.data;
            if (data) {
                Object.assign(formData, data);
                loading.value = false;
            }
        })
    }
};

getRechargePackageInfoFn();

const save = async () => {
    // 触发表单校验
    await formRef.value?.validate(async(valid) => {
        if (valid) {
            if (!await giftRef.value?.verify()) return
            loading.value = true
            if (recharge_id) {
                formData.recharge_id = Number(recharge_id);
                editRechargePackage(formData).then((res) => {
                    loading.value = false;
                    back()
                }).catch(() => {
                    loading.value = false;
                });
            } else {
                addRechargePackage(formData).then((res) => {
                    loading.value = false;
                    back()
                }).catch(() => {
                    loading.value = false;
                });
            }

        }
    });
};

const back = () => {
    router.push('/recharge/package/list')
};
</script>

<style lang="scss" scoped>
.input-width-short{
    width: 190px;
}
</style>
