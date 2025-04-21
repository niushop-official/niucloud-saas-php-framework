<template>
    <div class="main-container">
        <el-card class="card !border-none" shadow="never" v-loading="configLoading">

            <el-form class="page-form" :model="config" label-width="180px" :rules="formRules" ref="formRef">
                <div class="text text-[14px] leading-[25px]">{{ t('baseTitle') }}</div>
                <el-card class="card !border-none" shadow="never">
                    <el-form-item :label="t('isEnable')">
                        <el-radio-group v-model="config.is_open">
                            <el-radio label="1">{{ t('are') }}</el-radio>
                            <el-radio label="0">{{ t('no') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="t('salePeriodType')">
                        <el-radio-group v-model="config.period_type" @change="periodTypechangeFn(formRef)">
                            <el-radio v-for="(item,index) in salePeriodType" :key="index" :label="index">{{ item }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="t('salePeriod')" prop="period">
                        <div v-if="config.period_type == 'month'" class="flex flex-col">
                            <div>
                                <el-input class="!w-[214px]" v-model.trim="config.period" :placeholder="t('monthDatePlaceholder')" @keyup="filterNumber($event)" maxlength="2" />
                                <span class="text-[#666] ml-[5px]">日</span>
                            </div>
                            <span class="text-[#999] text-[12px]">{{t('monthQuarterPlaceholder')}}</span>
                        </div>
                        <div v-else-if="config.period_type == 'year'" class="flex flex-col">
                            <el-date-picker
                                v-model="config.period"
                                type="date"
                                :placeholder="t('selectDatePlaceholder')"
                                class="!w-[214px]"
                                format="MM-DD"
                                value-format="MM-DD"
                            />
                            <span class="text-[#999] text-[12px]">{{t('yearQuarterPlaceholder')}}</span>
                        </div>
                        <div v-else class="flex flex-col items-center">
                            <div class="flex flex-col mb-[5px]">
                                <div>
                                    <el-input class="!w-[214px]" v-model.trim="config.period" :placeholder="t('monthDatePlaceholder')" @keyup="filterNumber($event)" maxlength="2" />
                                    <span class="text-[#666] ml-[5px]">日</span>
                                </div>
                                <span class="text-[#999] text-[12px]">{{t('quarterPlaceholder')}}</span>
                                <span class="text-[#999] text-[12px]">{{t('monthQuarterPlaceholder')}}</span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item :label="t('saleSendType')">
                        <el-radio-group v-model="config.send_type">
                            <el-radio v-for="(item,index) in saleSendType" :key="index" :label="index">{{ item }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="t('condition')" prop="condition">
                        <el-checkbox-group v-model="conditionAssistObj.type">
                            <el-checkbox label="order_money" class="!h-[auto] !flex !items-center">
                                <div class="flex items-center">
                                    <span>{{t('orderMoney')}}</span>
                                    <div class="flex items-center ml-[10px] text-[#666]"  v-if="conditionAssistObj.type.indexOf('order_money') > -1">
                                        <el-input v-model.trim="conditionAssistObj.content.order_money" clearable class="!w-[100px]" maxlength="60" @keyup="filterDigit($event)" />
                                        <span class="ml-[10px]">{{t('orderMoneyTips1')}}</span>
                                    </div>
                                </div>
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item :label="t('reward')" prop="reward">
                        <div class="flex flex-col">
                            <div v-for="(item,index) in rewardAssistObj.index" :key="item">
                                <div class="flex flex-col w-[500px] mb-[10px]" v-if="config.reward[index]">
                                    <div class="border-0 mb-[10px] border-solid border-b-[1px] border-[var(--el-border-color-lighter)] flex justify-between">
                                        <span>{{item}}{{t('rewardTips1')}}</span>
                                        <span v-if="rewardAssistObj.index > 1" @click="deleteEvent(index)" class="text-[var(--el-color-primary)] cursor-pointer">{{t('delete')}}</span>
                                    </div>
                                    <div class="flex items-center pl-[30px]">
                                        <span>{{t('rewardIndex')}}</span>
                                        <div class="flex items-center">
                                            <span>{{t('rewardIndexTips1')}}</span>
                                            <el-input v-model.trim="config.reward[index].end" clearable class="!w-[100px] mx-[8px]" @keyup="filterNumber($event)" @change="rewardEndChange(index,$event)" />
                                            <span>{{t('rewardIndexTips2')}}</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center mt-[10px] pl-[30px]">
                                        <span>{{t('rewardContent')}}</span>
                                        <div class="flex items-center">
                                            <span>{{t('rewardContentTips1')}}</span>
                                            <el-input v-model.trim="config.reward[index].reward.commission" clearable @change="rewardCommissionChange(index,$event)" class="!w-[100px] mx-[8px]" @keyup="filterDigit($event)" />
                                            <span>{{t('rewardContentTips2')}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <el-button class="mt-[15px] w-[120px] ml-[30px]" type="primary" @click="addRewardFn(rewardAssistObj.index)">{{t('rewardTips2')}}{{rewardAssistObj.index+1}}{{t('rewardTips1')}}</el-button>
                        </div>
                    </el-form-item>
                </el-card>
            </el-form>
        </el-card>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(formRef)">{{ t('save') }}</el-button>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { t } from "@/lang";
import { getSaleConfig, setSaleConfig, getSalePeriodType, getSaleSendType } from '@/addon/shop_fenxiao/api/sale'
import { ElMessage, FormInstance } from 'element-plus'
import { useRoute, useRouter } from "vue-router";
import { filterNumber,filterDigit } from '@/utils/common'
import { cloneDeep } from 'lodash-es'

const route = useRoute();
const config = ref({
    is_open: '1',
    period_type: 'month',
    period: '',
    send_type: 'active',
    condition: [],
    reward: [{
        'end': 1,
        'reward': {
            'commission': 1
        }
    }]
});

const conditionAssistObj = ref({
    type: [],
    content: {order_money: 0}
})
const rewardAssistObj = ref({index: 0});
const configLoading = ref(true);
const formRef = ref<FormInstance>()

// 销售奖励配置
const getSaleConfigFn = ()=>{
    getSaleConfig().then((res:any)=>{
        config.value.is_open = res.data.is_open;
        config.value.period = res.data.period;
        config.value.period_type = res.data.period_type;

        config.value.send_type = res.data.send_type;

        config.value.reward = res.data.reward;
        rewardAssistObj.value.index = config.value.reward.length;

        config.value.condition = res.data.condition || {};

        conditionAssistObj.value.type = Object.keys(config.value.condition);
        conditionAssistObj.value.content = cloneDeep(config.value.condition);

        configLoading.value = false;
    })
}
getSaleConfigFn()

// 获取销售奖励结算周期类型
const salePeriodType = ref({});
const getSalePeriodTypeFn = ()=>{
    getSalePeriodType().then((res:any)=>{
        salePeriodType.value = res.data;
    })
}
getSalePeriodTypeFn()

// 获取销售奖励发放方式
const saleSendType = ref({});
const getSaleSendTypeFn = ()=>{
    getSaleSendType().then((res:any)=>{
        saleSendType.value = res.data;
    })
}
getSaleSendTypeFn()

// 周期类型change
const periodTypechangeFn = (formEl)=>{
    config.value.period = '';

    setTimeout(()=>{
        if (!formEl) return
        formEl.clearValidate('period')
    })
}

// 增加奖励
const addRewardFn =(index)=>{
    let obj = {
            'end': 1,
            'reward': {
                'commission': 1
            }
        };
    if(Object.keys(config.value.reward).length)
        obj.end = parseFloat(config.value.reward[index-1].end) + 1;
    config.value.reward.push(obj);
    rewardAssistObj.value.index = ++ rewardAssistObj.value.index;
}

// 删除规则奖励
const deleteEvent = (index)=>{
    config.value.reward.splice(index,1);
    rewardAssistObj.value.index = --rewardAssistObj.value.index;
}

// 监听规则奖励指标input框输入
const rewardEndChange = (index,data)=>{
    let front = (index < 0 || index >= 0 && data <= 0) ? 0 : config.value.reward[index-1].end;
    let queen = (index+1) >= config.value.reward.length ? '--' : config.value.reward[index+1].end;
    const regex = /^[1-9]\d*$/;
    if(!regex.test(data)){
        ElMessage.error(`${t('rewardTips5')}`);
        config.value.reward[index].end =  1;
        return false;
    }
    if(parseFloat(front) >= parseFloat(data)){
        ElMessage.error(`${t('rewardTips3')}${front}`);
        config.value.reward[index].end =  parseFloat(front) + 1;
        return false;
    }
    if(queen != '--' && parseFloat(queen) <= parseFloat(data)){
        ElMessage.error(`${t('rewardTips4')}${queen}`);
        config.value.reward[index].end =  parseFloat(queen) - 1;
        return false;
    }
}
// 监听规则奖励内容input框输入
const rewardCommissionChange = (index,data)=>{
    if(isNaN(data) || data == ''){
        ElMessage.error(`${t('correctNumber')}`);
        config.value.reward[index].reward.commission = 1;
        return false;
    }

    if(parseFloat(data) < 0){
        ElMessage.error(`${t('moreThanZero')}`);
        config.value.reward[index].reward.commission = 1;
        return false;
    }
}

// 表单验证规则
const formRules = computed(() => {
    return {
        period: [
            {
                validator: (rule: any, value: string, callback: any) => {
                    if(config.value.period_type == 'year' && !config.value.period){
                        callback(new Error(t('fillDatePlaceholder')))
                    }

                    let regex = /^(?:30|31|[1-2]?[0-9])$/;
                    if((config.value.period_type == 'month' || config.value.period_type == 'quarter') && (value <= 0 || !regex.test(value))){
                        callback(new Error(t('correctNumber1')))
                    }
                    callback();
                },
                trigger: ['blur', 'change']
            }
        ],
        condition: [
            {
                validator: (rule: any, value: string, callback: any) => {
                    if(!conditionAssistObj.value.type.length){
                        callback(new Error(t('selectConditionPlaceholder')))
                    }
                    conditionAssistObj.value.type.forEach((item,index)=>{
                        if(!conditionAssistObj.value.content[item]){
                            callback(new Error(t('fillConditionPlaceholder')))
                        }
                        if(item == 'order_money' && conditionAssistObj.value.content[item] <=0){
                            callback(new Error(t('orderMoneyPlaceholder')))
                        }
                    })
                    callback();
                },
                trigger: ['blur', 'change']
            }
        ],
        reward: [
            {
                validator: (rule: any, value: string, callback: any) => {
                     // 检测最多保留两位小数
                    const isMaxTwoDecimalPlaces = (data)=>{
                        let num = parseFloat(data)
                        // 先处理非数字的情况
                        if (typeof num !== 'number' || isNaN(num)) return false;

                        // 将数字转换为字符串并查找小数点位置
                        const numStr = num.toString();
                        const decimalIndex = numStr.indexOf('.');

                        // 如果没有小数点，那么自然满足条件
                        if (decimalIndex === -1) return true;

                        // 获取小数点后的长度
                        const decimalLength = numStr.length - decimalIndex - 1;

                        // 检查小数部分是否最多只有两位
                        return decimalLength <= 2;
                    }

                    if(config.value.reward.length && Number(config.value.is_open)){
                        config.value.reward.forEach((item,index)=>{
                            if(item.reward.commission <= 0 || !isMaxTwoDecimalPlaces(item.reward.commission)){
                                callback(new Error(t('rewardCommissionPlaceholder')))
                            }
                        })
                    }
                    // [index]
                    callback();
                },
                trigger: ['blur']
            }
        ]
    }
})

// 保存
let repeat = ref(false);
const onSave = async (formEl: FormInstance | undefined) => {
    if (repeat.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            let obj =  {};
            conditionAssistObj.value.type.forEach((item,index)=>{
                if(conditionAssistObj.value.content[item] != undefined ){
                    obj[item] = conditionAssistObj.value.content[item];
                }
            })
            config.value.condition = cloneDeep(obj);
            let data = cloneDeep(config.value);
            setSaleConfig(data).then(res => {
                repeat.value = false
            }).catch(() => {
                repeat.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped>
    .el-input.el-input-group--append {
        width: 150px;
    }
</style>
