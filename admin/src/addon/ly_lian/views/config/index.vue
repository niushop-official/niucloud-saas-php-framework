<template>
    <div class="main-container">
        <div class="flex ml-[18px] justify-between items-center mt-[20px]" style="margin-left: 80px;">
			<span class="text-page-title">{{pageName}}</span>
		</div>
        <el-form :model="formData" label-width="150px" ref="ruleFormRef" :rules="rules" class="page-form" v-loading="loading" style="margin-left: 80px;">
            <el-card class="box-card !border-none" shadow="never">

                <el-form-item :label="t('isOpen')">
                    <el-switch  v-model="formData.is_open" />
                </el-form-item>

                <template v-if="formData.is_open != '0'">
                    <!-- <el-form-item :label="t('isMax')"  prop="min">
                        <el-input v-model="formData.min" @keyup="filterDigit($event)" class="input-width" :placeholder="t('cashWithdrawalAmountPlaceholder')" />
                    </el-form-item> -->
                    <!-- 升级触发方式 -->
                    <el-form-item :label="t('upWay')">
                        <el-radio-group v-model="formData.up_way">
                            <!-- <el-radio v-for="dict in up_wayList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t('upWay' + dict.value) }}</el-radio> -->
                            <el-radio label="0">{{ t('upWay0') }}</el-radio>
                            <el-radio label="1">{{ t('upWay1') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <!-- 提成方式：余额、佣金、积分、数字积分 -->
                    <el-form-item :label="t('takeType')">
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.take_type">
                                    <!-- <el-radio v-for="dict in take_typeList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t('takeType' + dict.value) }}</el-radio> -->
                                    <el-radio label="0">{{ t('takeType0') }}</el-radio>
                                    <el-radio label="1">{{ t('takeType1') }}</el-radio>
                                    <el-radio label="2">{{ t('takeType2') }}</el-radio>
                                </el-radio-group>
                                <span class="text-[#999] text-[12px]">{{t('takeType_tips')}}</span>
                            </div>
                    </el-form-item>

                     <!-- 奖励计算基数：订单支付金额、商品现价、商品原价 -->
                     <el-form-item :label="t('countType')" >
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.count_type">
                                    <!-- <el-radio v-for="dict in count_typeList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t('countType' + dict.value) }}</el-radio> -->
                                    <el-radio label="0">{{ t('countType0') }}</el-radio>
                                    <el-radio label="1">{{ t('countType1') }}</el-radio>
                                    <el-radio label="2">{{ t('countType2') }}</el-radio>
                                </el-radio-group>
                                <!-- <span class="text-[#999] text-[12px]">{{t('countType_tips')}}</span> -->
                            </div>
                    </el-form-item>

                    <!-- 直推奖励冻结 -->
                    <el-form-item :label="t('firstReward')" >
                        <div class="flex flex-col">
                            <el-radio-group v-model="formData.first_reward_frozen">
                                <!-- <el-radio v-for="dict in first_reward_frozenList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t( dict.value) }}</el-radio> -->
                                <el-radio label="0">{{ t('firstReward0') }}</el-radio>
                                <el-radio label="1">{{ t('firstReward1') }}</el-radio>
                            </el-radio-group>
                            <span class="text-[#999] text-[12px]">{{t('firstReward_tips')}}</span>
                        </div>
                    </el-form-item>

                    <!-- 会员注册升级 -->
                    <el-form-item :label="t('regUp')" >
                        <div class="flex flex-col">
                            <el-radio-group v-model="formData.up_register">
                                <el-radio label="0">关闭</el-radio>
                                <el-radio label="1">开启</el-radio>
                            </el-radio-group>
                            <span class="text-[#999] text-[12px]">{{t('regUp_tips')}}</span>
                        </div>
                    </el-form-item>
                </template>
            </el-card>
        </el-form>

        <!-- titleTwo 结算设置 -->
        <div class="flex ml-[18px] justify-between items-center mt-[20px]" style="margin-left: 80px;">
			<span class="text-page-title">{{ t('titleTwo')}}</span>
		</div>

        <el-form :model="formData" label-width="150px" ref="ruleFormRef" :rules="rules" class="page-form" v-loading="loading" style="margin-left: 80px;">
            <el-card class="box-card !border-none" shadow="never">
                <!-- 结算周期：按天计算 -->
                <el-form-item :label="t('settleCycle')">
                    <div class="flex flex-col">
                        <el-input v-model="formData.settle_cycle" clearable style="width: 300px;" @keyup="filterNumber($event)" >
                            <template #append>天</template>
                        </el-input>
                        <!-- <span class="text-[#999] text-[12px]">{{t('up_proid_tips')}}</span> -->
                    </div>
                </el-form-item>

                <!-- 结算方式 订单支付后、订单完成后 -->
                <el-form-item :label="t('settleWay')">
                    <div class="flex flex-col">
                        <el-radio-group v-model="formData.settle_way">
                            <!-- <el-radio v-for="dict in settle_wayList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t('settleWay' + dict.value) }}</el-radio> -->
                            <el-radio label="0">{{ t('settleWay0') }}</el-radio>
                            <el-radio label="1">{{ t('settleWay1') }}</el-radio>
                        </el-radio-group>
                        <span class="text-[#999] text-[12px]">{{t('settleWay_tips')}}</span>
                    </div>
                </el-form-item>
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
import { getLianConfig, setLianConfig } from '@/addon/ly_lian/api/config'
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
    up_register: '0',
    up_way: '0',
    settle_way: '0',
    take_type: '0',
    settle_cycle: '0',
    settle_type: '0',
    count_type: '0',
    first_reward_frozen: '0',

})
const Transfertype = ref<Array<Object>>([])



// 获取配置信息
const setFormData = async (id: number = 0) => {
    const data = await (await getLianConfig()).data
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
const is_openList = ref([] as any[])
    const is_openDictList = async () => {
    is_openList.value = await (await useDictionary('is_open')).data.dictionary
    }
    is_openDictList();

    const multiList = ref([] as any[])
    const multiDictList = async () => {
    multiList.value = await (await useDictionary('is_open')).data.dictionary
    }
    multiDictList();

    const first_reward_frozenList = ref([] as any[])
    const first_reward_frozenDictList = async () => {
    first_reward_frozenList.value = await (await useDictionary('is_open')).data.dictionary
    }
    first_reward_frozenDictList();

    const count_typeList = ref([] as any[])
    const count_typeDictList = async () => {
    count_typeList.value = await (await useDictionary('count_type')).data.dictionary
    }
    count_typeDictList();

    const take_typeList = ref([] as any[])
    const take_typeDictList = async () => {
    take_typeList.value = await (await useDictionary('take_type')).data.dictionary
    }
    take_typeDictList();

    const settle_wayList = ref([] as any[])
    const settle_wayDictList = async () => {
    settle_wayList.value = await (await useDictionary('settle_condition')).data.dictionary
    }
    settle_wayDictList();
    

    const up_wayList = ref([] as any[])
    const up_wayDictList = async () => {
    up_wayList.value = await (await useDictionary('settle_condition')).data.dictionary
    }
    up_wayDictList();
   




// const onSave = async (formEl: FormInstance | undefined) => {
//     if (loading.value || !formEl) return
//     await formEl.validate((valid) => {
//         if (valid) {
//             const save = { ...formData }
//             save.is_open = Number(save.is_open).toString()

//             setShareholderConfig(save).then(() => {
//                 loading.value = false
//             }).catch(() => {
//                 loading.value = false
//             })
//         }
//     })
// }
const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            const save = { ...formData }
            save.is_open = Number(save.is_open).toString()

            setLianConfig(save).then(() => {
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
