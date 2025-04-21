<template>
    <div class="main-container">
        <div class="detail-head">
            <div class="left" @click="back()">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{t('returnToPreviousPage')}}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
        </div>
        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('memberId')" prop="member_id">
                    <el-input v-model="formData.member_id" clearable :placeholder="t('memberIdPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('levelId')" prop="level_id">
                    <el-select v-model="formData.level_id" clearable :placeholder="t('levelIdPlaceholder')" class="input-width">
                        <el-option
                            label="选项1"
                            value="1"
                        />
                        <el-option
                            label="选项2"
                            value="2"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item :label="t('buyMid')" prop="buy_mid">
                    <el-input v-model="formData.buy_mid" clearable :placeholder="t('buyMidPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('orderId')" >
                    <el-input v-model="formData.order_id" clearable :placeholder="t('orderIdPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('orderGoodsId')" >
                    <el-input v-model="formData.order_goods_id" clearable :placeholder="t('orderGoodsIdPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('settleCycle')" >
                    <el-input v-model="formData.settle_cycle" clearable :placeholder="t('settleCyclePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('settleAmount')" >
                    <el-input v-model="formData.settle_amount" clearable :placeholder="t('settleAmountPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('giveRate')" >
                    <el-input v-model="formData.give_rate" clearable :placeholder="t('giveRatePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('giveAmount')" >
                    <el-input v-model="formData.give_amount" clearable :placeholder="t('giveAmountPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('frozenRate')" >
                    <el-input v-model="formData.frozen_rate" clearable :placeholder="t('frozenRatePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('frozenAmount')" >
                    <el-input v-model="formData.frozen_amount" clearable :placeholder="t('frozenAmountPlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('rewardType')" >
                    <el-select v-model="formData.reward_type" clearable :placeholder="t('rewardTypePlaceholder')" class="input-width">
                        <el-option
                            label="选项1"
                            value="1"
                        />
                        <el-option
                            label="选项2"
                            value="2"
                        />
                    </el-select>
                </el-form-item>
                
            </el-form>
        </el-card>
         <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(formRef)">{{ t('save') }}</el-button>
                <el-button @click="back()">{{ t('cancel') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import type { FormInstance } from 'element-plus'
import { getLianRewardInfo,addLianReward,editLianReward } from '@/addon/ly_lian/api/reward';
import { useRoute } from 'vue-router'

const route = useRoute()
const id:number = parseInt(route.query.id);
const loading = ref(false)
const pageName = route.meta.title



/**
 * 表单数据
 */
const initialFormData = {
    id: 0,
    member_id: 0,
    level_id: 0,
    buy_mid: 0,
    order_id: 0,
    order_goods_id: 0,
    settle_cycle: 0,
    settle_amount: '',
    give_rate: '',
    give_amount: '',
    frozen_rate: '',
    frozen_amount: '',
    reward_type: 0,
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const setFormData = async (id:number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getLianRewardInfo(id)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
}
if(id) setFormData(id);

const formRef = ref<FormInstance>()
// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    

    
// 表单验证规则
const formRules = computed(() => {
    return {
    member_id: [
        { required: true, message: t('memberIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    level_id: [
        { required: true, message: t('levelIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    buy_mid: [
        { required: true, message: t('buyMidPlaceholder'), trigger: 'blur' },
        
    ]
,
    order_id: [
        { required: true, message: t('orderIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    order_goods_id: [
        { required: true, message: t('orderGoodsIdPlaceholder'), trigger: 'blur' },
        
    ]
,
    settle_cycle: [
        { required: true, message: t('settleCyclePlaceholder'), trigger: 'blur' },
        
    ]
,
    settle_amount: [
        { required: true, message: t('settleAmountPlaceholder'), trigger: 'blur' },
        
    ]
,
    give_rate: [
        { required: true, message: t('giveRatePlaceholder'), trigger: 'blur' },
        
    ]
,
    give_amount: [
        { required: true, message: t('giveAmountPlaceholder'), trigger: 'blur' },
        
    ]
,
    frozen_rate: [
        { required: true, message: t('frozenRatePlaceholder'), trigger: 'blur' },
        
    ]
,
    frozen_amount: [
        { required: true, message: t('frozenAmountPlaceholder'), trigger: 'blur' },
        
    ]
,
    reward_type: [
        { required: true, message: t('rewardTypePlaceholder'), trigger: 'blur' },
        
    ]

    }
})

const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
       if (valid) {
           loading.value = true
           let data = formData

           const save = id ? editLianReward : addLianReward
           save(data).then(res => {
               loading.value = false
               history.back()
           }).catch(err => {
               loading.value = false
           })

       }
    })
}

// 验证手机号格式
const mobileVerify = (rule: any, value: any, callback: any) => {
    if (value && !/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error(t('generateMobile')))
    } else {
        callback()
    }
}

// 验证身份证号
const idCardVerify = (rule: any, value: any, callback: any) => {
    if (value && !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
        callback(new Error(t('generateIdCard')))
    } else {
        callback()
    }
}

// 验证邮箱号
const emailVerify = (rule: any, value: any, callback: any) => {
    if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
        callback(new Error(t('generateEmail')))
    } else {
        callback()
    }
}


// 验证请输入整数
const numberVerify = (rule: any, value: any, callback: any) => {
    if (!Number.isInteger(value)) {
        callback(new Error(t('generateNumber')))
    } else {
        callback()
    }
}
const back = () => {
    history.back()
}
</script>

<style lang="scss" scoped></style>