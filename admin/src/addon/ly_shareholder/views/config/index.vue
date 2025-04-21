<template>
    <div class="main-container">
        <div class="flex ml-[18px] justify-between items-center mt-[20px]">
			<span class="text-page-title">{{pageName}}</span>
		</div>
        <el-form :model="formData" label-width="150px" ref="ruleFormRef" :rules="rules" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">

                <el-form-item :label="t('isOpen')">
                    <el-switch  v-model="formData.is_open" />
                </el-form-item>

                <template v-if="formData.is_open != '0'">
                    <!-- <el-form-item :label="t('isMax')"  prop="min">
                        <el-input v-model="formData.min" @keyup="filterDigit($event)" class="input-width" :placeholder="t('cashWithdrawalAmountPlaceholder')" />
                    </el-form-item> -->
                    <!-- 是否开启封顶功能 -->
                    <el-form-item :label="t('isMax')">
                        <el-radio-group v-model="formData.is_max">
                            <!-- <el-radio v-for="dict in is_openList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t(dict.value) }}</el-radio> -->
                            <el-radio label="0">{{ t('0') }}</el-radio>
                            <el-radio label="1">{{ t('1') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <!-- 是否开启分红条件 -->
                    <el-form-item :label="t('isCommission')">
                        <el-radio-group v-model="formData.is_commission">
                            <!-- <el-radio v-for="dict in is_openList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t(dict.value) }}</el-radio> -->
                            <el-radio label="0">{{ t('0') }}</el-radio>
                            <el-radio label="1">{{ t('1') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template v-if="formData.is_commission != '0'">
                        <el-form-item :label="t('minOrder')" style="margin-left: 100px;">
                            <div class="flex flex-col">
                                <el-input v-model="formData.min_order" clearable style="width: 300px;" @keyup="filterNumber($event)" >
                                    <template #append>单</template>
                                </el-input>
                                <span class="text-[#999] text-[12px]">{{t('min_order_tips')}}</span>
                            </div>
                        </el-form-item>
                        <el-form-item :label="t('minOrderAmount')" style="margin-left: 100px;">
                            <div class="flex flex-col">
                                <el-input v-model="formData.min_order_amount" clearable style="width: 300px;" @keyup="filterNumber($event)" >
                                    <template #append>元</template>
                                </el-input>
                                    <span class="text-[#999] text-[12px]">{{t('min_order_amount_tips')}}</span>
                            </div>
                        </el-form-item>
                    </template>

                    <!-- <el-form-item :label="t('iso2o')">
                        <el-radio-group v-model="formData.is_o2o">
                            <el-radio v-for="dict in is_openList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t(dict.value) }}</el-radio>
                        </el-radio-group>
                        <span class="text-[#999] text-[12px]" style="margin-left: 20px;">{{t('is_o2o_tips')}}</span>
                    </el-form-item> -->

                    <!-- 结算方式：营业额/利润 -->
                    <el-form-item :label="t('settleType')" >
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.settle_type">
                                    <!-- <el-radio v-for="dict in settle_typeList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t('settleType' + dict.value) }}</el-radio> -->
                                    <el-radio label="0">{{ t('settleType0') }}</el-radio>
                                    <el-radio label="1">{{ t('settleType1') }}</el-radio>
                                </el-radio-group>
                                <span class="text-[#999] text-[12px]">{{t('settleType_tips')}}</span>
                            </div>
                    </el-form-item>

                    <!-- 提成方式：余额、佣金、积分、数字积分 -->
                    <el-form-item :label="t('takeType')">
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.take_type">
                                    <!-- <el-radio v-for="dict in take_typeList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t('takeType' + dict.value) }}</el-radio> -->
                                    <el-radio label="0">{{ t('takeType0') }}</el-radio>
                                    <el-radio label="1">{{ t('takeType1') }}</el-radio>
                                </el-radio-group>
                                <span class="text-[#999] text-[12px]">{{t('takeType_tips')}}</span>
                            </div>
                    </el-form-item>

                    <!-- 结算周期：天、周、月 -->
                    <el-form-item :label="t('settleTime')">
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.settle_time">
                                    <!-- <el-radio v-for="dict in settle_timeList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t('settleTime' + dict.value) }}</el-radio> -->
                                    <el-radio label="0">{{ t('settleTime0') }}</el-radio>
                                    <el-radio label="1">{{ t('settleTime1') }}</el-radio>
                                    <el-radio label="2">{{ t('settleTime2') }}</el-radio>
                                </el-radio-group>
                                <span class="text-[#999] text-[12px]">{{t('settleTime_tips')}}</span>
                            </div>
                    </el-form-item>

                    <!-- 结算条件：支付后、完成后 -->
                    <!-- <el-form-item :label="t('settleCondition')">
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.settle_condition">
                                    <el-radio v-for="dict in settle_conditionList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t('settleCondition' + dict.value) }}</el-radio>
                                </el-radio-group>
                                <span class="text-[#999] text-[12px]">{{t('settleCondition_tips')}}</span>
                            </div>
                    </el-form-item> -->
              
                    <!-- <el-form-item :label="t('transferMode')"  class="items-center">
                        <el-checkbox-group v-model="formData.transfer_type" size="large">
                            <el-checkbox :label="item.key"  v-for="(item,index) in Transfertype" :key="'a'+index">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item> -->
                </template>
            </el-card>
        </el-form>
        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(ruleFormRef)">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getShareholderConfig, setShareholderConfig } from '@/addon/ly_shareholder/api/config'
import { FormRules, FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'
import { filterDigit } from '@/utils/common'
import { NumberFormat } from 'vue-i18n'
import { number } from 'echarts'

const route = useRoute()
const pageName = route.meta.title

const loading = ref(true)
const ruleFormRef = ref<FormInstance>()
const formData = reactive<Record<string, string | boolean | Array<string> >>({
 
    is_open: '0',
    is_max: '0',
    is_commission: '0',
    is_o2o: '0',
    min_order: '',
    min_order_amount: '',
    settle_type: '0',
    take_type: '0',
    settle_time: '0',
    settle_condition: '0',

})
const Transfertype = ref<Array<Object>>([])



// 获取会员的配置信息
const setFormData = async (id: number = 0) => {
    const data = await (await getShareholderConfig()).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    formData.is_open = Boolean(Number(formData.is_open))
    loading.value = false
}
setFormData()



// 选中数据
const selectData = ref<any[]>([])

// 字典数据
// const is_openList = ref([] as any[])
//     const is_openDictList = async () => {
//     is_openList.value = await (await useDictionary('is_open')).data.dictionary
//     }
//     is_openDictList();
//     const multiList = ref([] as any[])
//     const multiDictList = async () => {
//     multiList.value = await (await useDictionary('is_open')).data.dictionary
//     }
//     multiDictList();

//     const settle_typeList = ref([] as any[])
//     const settle_typeDictList = async () => {
//     settle_typeList.value = await (await useDictionary('settle_type')).data.dictionary
//     }
//     settle_typeDictList();
//     const take_typeList = ref([] as any[])
//     const take_typeDictList = async () => {
//     take_typeList.value = await (await useDictionary('take_type')).data.dictionary
//     }
//     take_typeDictList();
//     const settle_timeList = ref([] as any[])
//     const settle_timeDictList = async () => {
//     settle_timeList.value = await (await useDictionary('settle_time')).data.dictionary
//     }
//     settle_timeDictList();
    
//     const settle_conditionList = ref([] as any[])
//     const settle_conditionDictList = async () => {
//     settle_conditionList.value = await (await useDictionary('settle_condition')).data.dictionary
//     }
//     settle_conditionDictList();


const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            const save = { ...formData }
            save.is_open = Number(save.is_open).toString()

            setShareholderConfig(save).then(() => {
                loading.value = false
                // 刷新数据
                setFormData()
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped></style>
