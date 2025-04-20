<template>
    <div class="main-container">
        <el-card class="card !border-none" shadow="never" v-loading="loading">

            <el-form class="page-form" :model="formData" label-width="180px"  :rules="formRules" ref="formRef" v-if="!loading">
                <div class="text text-[14px] leading-[25px]">{{ t('titleOne') }}</div>
                <el-card class="card !border-none" shadow="never">
                    <el-form-item :label="t('isFenxiao')">
                        <el-radio-group v-model="formData.is_fenxiao">
                            <el-radio label="1">{{ t('open') }}</el-radio>
                            <el-radio label="0">{{ t('close') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template v-if="formData.is_fenxiao!='0'">
                        <el-form-item :label="t('level')">
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.level">
                                    <el-radio label="1">{{ t('levelLabelOne') }}</el-radio>
                                    <el-radio label="2">{{ t('levelLabelTwo') }}</el-radio>
                                </el-radio-group>
                                <span class="text-[#999] text-[12px]">{{t('fenxiaoHint')}}</span>
                            </div>
                        </el-form-item>
                        <el-form-item :label="t('isExamine')">
                            <el-radio-group v-model="formData.is_examine">
                                <el-radio label="1">{{ t('yes') }}</el-radio>
                                <el-radio label="0">{{ t('no') }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="t('selfPurchaseRebate')">
                            <div>
                                <el-radio-group v-model="formData.self_purchase_rebate">
                                    <el-radio label="1">{{ t('open') }}</el-radio>
                                    <el-radio label="0">{{ t('close') }}</el-radio>
                                </el-radio-group>
                                <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('selfPurchaseRebateTipOne') }}</p>
                                <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('selfPurchaseRebateTipTwo') }}</p>
                                <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('selfPurchaseRebateTipThree') }}</p>
                            </div>
                        </el-form-item>
                    </template>
                </el-card>
                <template v-if="formData.is_fenxiao!='0'">
                    <div class="text text-[14px] leading-[25px]">{{ t('titleTwo') }}</div>
                    <el-card class="card !border-none" shadow="never">
                        <el-form-item :label="t('childCondition')">
                            <div>
                                <el-radio-group v-model="formData.child_condition">
                                    <el-radio label="1">{{ t('childConditionLabelOne') }}</el-radio>
                                    <el-radio label="3">{{ t('childConditionLabelThree') }}</el-radio>
                                </el-radio-group>
                                <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">
                                    {{ formData.child_condition=='1'?t('childConditionTipOne'):t('childConditionTipThree') }}
                                </p>
                            </div>
                        </el-form-item>
                    </el-card>
                    <div class="text text-[14px] leading-[25px]">{{ t('titleThree') }}</div>
                    <el-card class="card !border-none" shadow="never">
                        <el-form-item :label="t('applyType')">
                            <div>
                                <el-radio-group v-model="formData.apply_type">
                                    <el-radio label="2">{{ t('applyTypeLabelTwo') }}</el-radio>
                                    <el-radio label="1">{{ t('applyTypeLabelOne') }}</el-radio>
                                    <el-radio label="3">{{ t('applyTypeLabelThree') }}</el-radio>
                                </el-radio-group>
                                <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('applyTypeTipTwo')}}</p>
                                <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('applyTypeTipOne')}}</p>
                                <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('applyTypeTipThree')}}</p>
                            </div>
                        </el-form-item>
                        <el-form-item v-if="formData.apply_type!='3'" :label="t('fenxiaoCondition')">
                            <div>
                                <el-radio-group v-model="formData.fenxiao_condition">
                                    <el-radio label="0">{{ t('fenxiaoConditionLabelOne') }}</el-radio>
                                    <el-radio label="1">{{ t('fenxiaoConditionLabelTwo') }}</el-radio>
                                    <el-radio label="2">{{ t('fenxiaoConditionLabelThree') }}</el-radio>
                                    <el-radio label="3">{{ t('fenxiaoConditionLabelFour') }}</el-radio>
                                </el-radio-group>
                                <p v-if="formData.fenxiao_condition=='0'" class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('fenxiaoConditionTipOne')}}</p>
                                <p v-if="formData.fenxiao_condition=='1'" class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('fenxiaoConditionTipTwo')}}</p>
                                <p v-if="formData.fenxiao_condition=='2'" class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('fenxiaoConditionTipThree')}}</p>
                                <p v-if="formData.fenxiao_condition=='3'" class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('fenxiaoConditionTipFour')}}</p>
                            </div>
                        </el-form-item>
                        <template v-if="formData.fenxiao_condition!='0'&&formData.apply_type!='3'">
                            <el-form-item v-if="formData.fenxiao_condition=='1'" :label="t('consumeCount')" prop="consume_count">
                                <el-input v-model.trim="formData.consume_count" clearable class="input-width" @keyup="filterNumber($event)">
                                    <template #append>次</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item v-if="formData.fenxiao_condition=='2'" :label="t('consumeMoney')" prop="consume_money">
                                <el-input v-model.trim="formData.consume_money" clearable class="input-width" @keyup="filterDigit($event)">
                                    <template #append>元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item v-if="formData.fenxiao_condition=='3'">
                                <goods-select-popup  ref="goodsSelectPopupRef" v-model="formData.goods_ids" :min="1" :max="9999" />
                            </el-form-item>
                            <el-form-item :label="t('consumeCondition')">
                                <el-radio-group v-model="formData.consume_condition">
                                    <el-radio label="1">{{ t('consumeConditionLabelOne') }}</el-radio>
                                    <el-radio label="2">{{ t('consumeConditionLabelTwo') }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </template>
                    </el-card>
                    <div class="text text-[14px] leading-[25px]">{{ t('titlefour') }}</div>
                    <el-card class="card !border-none" shadow="never">
                        <el-form-item :label="t('isShowApply')">
                            <el-radio-group v-model="formData.is_show_apply">
                                <el-radio label="1">{{ t('isShowApplyLabelOne') }}</el-radio>
                                <el-radio label="0">{{ t('isShowApplyLabelTwo') }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="t('applyHead')">
                            <div>
                                <upload-image v-model="formData.apply_head" :limit="1" />
                                <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('applyHeadTip')}}</p>
                            </div>
                        </el-form-item>
                        <el-form-item :label="t('protocolSettings')">
                            <el-button type="primary" link @click="toLink('fenxiao_service')">{{t("settings")}}</el-button>
                        </el-form-item>
                    </el-card>
                </template>
            </el-form>
        </el-card>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="save">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { t } from "@/lang";
import goodsSelectPopup from '@/addon/shop/views/goods/components/goods-select-popup.vue'
import { getFenxiaoConfig, setFenxiaoConfig } from '@/addon/shop_fenxiao/api/config'
import { ElMessage, FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { useRouter } from "vue-router";
import { filterNumber, filterDigit } from '@/utils/common'

const router = useRouter();
const loading = ref<Boolean>(false)
/**
 * 表单数据
 */
 const initialFormData = {
    is_fenxiao: '1',
    level: '1',
    is_examine:'1',
    self_purchase_rebate:'1',
    child_condition:'1',
    apply_type:'2',
    fenxiao_condition:'0',
    consume_count:'0',
    consume_money:'0',
    goods_ids: '',
    consume_condition:'1',
    is_show_apply:'1',
    apply_head:'',
    one_rate:'',
    two_rate:'',
    team_rate:'',
    team_flat_rate:''
};
const formData: Record<string, any> = reactive({ ...initialFormData });
// 正则表达式
const regExp = {
    required: /[\S]+/,
    number: /^\d{0,10}$/,
    digit: /^\d{0,10}(.?\d{0,2})$/,
    special: /^\d{0,10}(.?\d{0,3})$/
}
// 表单验证规则
const consumeCountCheck = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error(t('consumeCountPlaceholderOne')))
  }else if (value <= 0) {
    return callback(new Error(t('consumeCountPlaceholderTwo')))
  }else if(!regExp.number.test(value)){
    return callback(new Error(t('consumeCountPlaceholderThree')))
  }else{
    return callback()
  }
}
const consumeMoneyCheck = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error(t('consumeMoneyPlaceholderOne')))
  }else if(!regExp.digit.test(value)){
    return callback(new Error(t('consumeMoneyPlaceholderTwo')))
  }else if (value <= 0) {
    return callback(new Error(t('consumeMoneyPlaceholderThree')))
  }else{
    return callback()
  }
}
const formRules = computed(() => {
    return {
        consume_count: [ { required: true, validator: consumeCountCheck, trigger: 'blur' }],
        consume_money: [ { required: true, validator: consumeMoneyCheck, trigger: 'blur' }],
    }
})
const formRef = ref<FormInstance>()
const getFenxiaoConfigFn=()=>{
    loading.value = true
    getFenxiaoConfig().then((res:any)=>{
        Object.keys(formData).forEach((key:any)=>{
            if (res.data[key] != undefined) formData[key] = res.data[key]
            formData.goods_ids = res.data.goods_ids && res.data.goods_ids != '0' ? res.data.goods_ids.split(',') : [];
            formData.goods_ids = formData.goods_ids.map((item:any) => { return Number(item) })
        })
        loading.value = false
    })
}
getFenxiaoConfigFn()
const repeat = ref<boolean>(false)
const save = ()=>{
    var data :any = cloneDeep(formData)
    if(formData.apply_type!='3'&&formData.fenxiao_condition=='3'){
        if(!formData.goods_ids.length){
            ElMessage({
                type: 'warning',
                message: `${t('goodsIdsPlaceholder')}`
            })
        }
    }
    data.goods_ids = data.goods_ids.join()
    formRef.value?.validate((valid) => {
        if(valid){
            if (repeat.value) return
            repeat.value = true
            setFenxiaoConfig(data).then((res:any)=>{
                repeat.value = false
            }).catch(()=>{
                repeat.value = false
            })
        }
    })
}
const toLink = (type: any)=>{
    let routeData = router.resolve(`/setting/agreement/edit?key=${type}`)
    window.open(routeData.href,' blank');
}
</script>

<style lang="scss" scoped>
    .el-input.el-input-group--append {
        width: 150px;
    }
</style>
