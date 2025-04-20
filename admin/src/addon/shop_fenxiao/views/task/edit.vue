<template>
    <div class="main-container" v-loading="loading">

        <!--返回-->
        <el-card class="card !border-none" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="back()" />
        </el-card>

        <el-card class="card mt-[15px] !border-none" shadow="never">
            <el-form class="page-form" :model="formData" label-width="120px" ref="taskFormRef" :rules="formRules">
                <el-form-item :label="t('taskNam')" prop="name">
                    <el-input v-model.trim="formData.name" clearable :placeholder="t('taskNamPlaceholder')" class="input-width" maxlength="60" show-word-limit />
                </el-form-item>
                <el-form-item :label="t('taskCover')">
                    <div>
                        <upload-image v-model="formData.cover" :limit="1" />
                    </div>
                </el-form-item>
                <el-form-item :label="t('taskTime')">
                    <el-radio-group v-model="formData.time_type" @change="timeTypeChangeFn($event,taskFormRef)">
                        <el-radio label="1">{{t('assigntTime')}}</el-radio>
                        <el-radio label="2">{{t('longTerm')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="" prop="time">
                    <el-date-picker
                        class="!w-[200px]"
                        v-model="formData.start_time"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        type="datetime"
                        :disabled-date="disabledPastDates"
                        :placeholder="t('startTimePlaceholder')"
                    />
                    <div class="flex">
                        <span class="mx-[10px]">至</span>
                        <span v-if="formData.time_type == 2">长期有效</span>
                        <el-date-picker
                            v-else
                            class="!w-[300px]"
                            v-model="formData.end_time"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            :disabled-date="disabledPastDates"
                            type="datetime"
                            :placeholder="t('endTimePlaceholder')"
                        />
                    </div>
                </el-form-item>
                <el-form-item :label="t('taskType')" prop="times">
                    <div class="flex flex-col">
                        <div>
                            <el-input v-model.trim="formData.times" maxlength="2" show-word-limit clearable :placeholder="t('timesRepeatablePlaceholder')" class="!w-[180px]" @keyup="filterNumber($event)" />
                            <span class="ml-[10px]">{{t('timesNext')}}</span>
                        </div>
                        <span class="text-[#999] text-[12px]">{{t('timesRepeatableHint')}}</span>
                    </div>
                </el-form-item>
                <el-form-item :label="t('level')">
                    <el-radio-group v-model="formData.level_type">
                        <el-radio label="1">{{t('allLevel')}}</el-radio>
                        <el-radio label="2">{{t('portionLevel')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="" v-if="formData.level_type == 2" prop="level">
                    <el-checkbox-group v-model="formData.level">
                        <el-checkbox :label="(item.level_id+'')" v-for="(item,index) in fenxiaoLevel" :key="index">{{item.level_name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item :label="t('taskIndex')" prop="type">
                    <el-radio-group v-model="formData.rules[0].condition.type[0]"  @change="conditionTypeChangeFn(taskFormRef)">
                        <div class="flex flex-col mt-[10px]">
                            <el-radio label="order_num" class="!h-[auto] !flex !items-start">
                                <div class="flex -mt-[9px]">
                                    <span>{{t('conditionOrderNum')}}</span>
                                    <div class="flex items-center ml-[2px] text-[#666]">
                                        <el-input v-model.trim="formData.rules[0].condition.order_num" clearable @keyup="filterNumber($event)" class="!w-[100px] ml-2" maxlength="7" show-word-limit :disabled="formData.rules[0].condition.type.indexOf('order_num') == -1" />
                                        <span class="ml-[10px]">{{t('conditionOrderNumTips2')}}</span>
                                    </div>
                                </div>
                            </el-radio>
                            <el-radio label="order_money" class="my-[15px] !h-[auto] !flex !items-start">
                                <div class="flex -mt-[9px]">
                                    <span>{{t('conditionOrderMoney')}}</span>
                                    <div class="flex items-center ml-[2px] text-[#666]">
                                        <el-input v-model.trim="formData.rules[0].condition.order_money" maxlength="7" @keyup="filterDigit($event)" show-word-limit clearable class="!w-[100px] ml-2" :disabled="formData.rules[0].condition.type.indexOf('order_money') == -1" />
                                        <span class="ml-[10px]">{{t('conditionOrderMoneyTips2')}}</span>
                                    </div>
                                </div>
                            </el-radio>
                            <el-radio label="child_num" class="!h-[auto] !flex !items-start">
                                <div class="flex -mt-[9px]">
                                    <span>{{t('conditionFenxiaoNum')}}</span>
                                    <div class="flex items-center ml-[2px] text-[#666]">
                                        <el-input v-model.trim="formData.rules[0].condition.child_num"  maxlength="7" @keyup="filterNumber($event)" show-word-limit clearable class="!w-[100px] ml-2" :disabled="formData.rules[0].condition.type.indexOf('child_num') == -1" />
                                        <span class="ml-[10px]">{{t('conditionFenxiaoNumTips2')}}</span>
                                    </div>
                                </div>
                            </el-radio>
                        </div>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('taskContent')" prop="rules[0].reward.commission">
                    <div class="flex items-center">
                        <span class="mr-[10px]">{{t('return')}}</span>
                        <el-input v-model.trim="formData.rules[0].reward.commission" clearable @keyup="filterDigit($event)" class="!w-[200px]" maxlength="7" show-word-limit />
                        <span class="ml-[10px]">{{t('brokerage')}}</span>
                    </div>
                </el-form-item>
                <el-form-item :label="t('awardTime')" prop="send_time_type">
                    <el-radio-group v-model="formData.send_time_type"  @change="sendTimeTypeChangeFn(taskFormRef)">
                        <div class="flex flex-col mt-[10px]">
                            <el-radio label="1" class="!h-[auto] !flex !items-start" :disabled="(formData.time_type == 2 ? true : false)" >
                                <div class="flex -mt-[9px]">
                                    <span class="mr-[10px]">{{t('fixedTime')}}</span>
                                    <el-date-picker
                                        class="!w-[200px]"
                                        v-model="formData.send_time"
                                        value-format="YYYY-MM-DD HH:mm:ss"
                                        type="datetime"
                                        :disabled="(formData.time_type == 2 || formData.send_time_type == 2 ? true : false)"
                                        :placeholder="t('selectTimePlaceholder')" />
                                </div>
                                <span></span>
                            </el-radio>
                            <el-radio label="2" class="mt-[15px] !h-[auto] !flex !items-start">
                                <div class="flex items-center text-[#666] -mt-[9px]">
                                    <span class="mr-[10px]">{{t('taskAttainment')}}</span>
                                    <el-input  class="!w-[100px] ml-2" v-if="formData.send_time_type == 1" disabled="true"  />
                                    <el-input v-model.trim="formData.send_time" maxlength="4" show-word-limit clearable class="!w-[100px] ml-2" v-else @keyup="filterNumber($event)" />
                                    <span class="ml-[10px]">{{t('taskAttainment1')}}</span>
                                </div>
                                <span></span>
                            </el-radio>
                        </div>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('remark')">
                    <el-input v-model.trim="formData.remark" maxlength="200" show-word-limit type="textarea" clearable :placeholder="t('remarkPlaceholder')" class="!w-[450px]" rows="6"/>
                </el-form-item>
            </el-form>
        </el-card>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(taskFormRef)">{{ t('save') }}</el-button>
                <el-button @click="back()">{{ t('back') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { t } from '@/lang'
import { FormInstance } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
import { timeStampTurnTime,filterNumber,filterDigit } from '@/utils/common'
import { useRoute, useRouter } from 'vue-router'
import { addTask, editTask, getTaskDetail } from '@/addon/shop_fenxiao/api/task'
import { getFenxiaoLevelListPage } from '@/addon/shop_fenxiao/api/level'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const repeat = ref(false)
const taskFormRef = ref<FormInstance>()

// 表单数据
const initialFormData = {
    id:'',
    name: '',
    time_type: '1',
    time: '', //时间
    start_time: '2024-01-22 12:52:00',
    end_time: '',
    level_type: '1',
    level: [],
    cover: '',
    times: '',
    rules: [{
        condition: {
            type: ['order_num']
        },
        reward: {commission:''}
    }],
    remark: '',
    send_time_type: '1',
    send_time: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })
formData.id = ref(route.query.id)

// 表单验证规则
const formRules = computed(() => {
    return {
        name: [
            { required: true, message: t('taskNamPlaceholder'), trigger: 'blur' }
        ],
        time: [
            {
                validator: (rule: any, value: string, callback: any) => {
                    if(!formData.start_time){
                        callback(new Error(t('startTimePlaceholder')))
                    }
                    if(formData.time_type != 2 && !formData.end_time){
                        callback(new Error(t('endTimePlaceholder')))
                    }
                    if(formData.time_type != 2 && timestampFn(formData.end_time) < timestampFn(formData.start_time)){
                        callback(new Error(t('tmePlaceholder1')))
                    }
                    callback()
                },
                trigger: ['blur', 'change']
            }
        ],
        times: [
            {
                required: true,
                validator: (rule: any, value: string, callback: any) => {
                    const regex = /^[1-9]\d*|0$/;
                    if(!regex.test(parseFloat(formData.times))){
                        callback(new Error(t('timesRepeatableRulesPlaceholder')))
                    }else callback()
                },
                trigger: ['blur', 'change']
            }
        ],
        level: [
            {
                validator: (rule: any, value: string, callback: any) => {
                    if(formData.level_type == 2 && !formData.level.length){
                        callback(new Error(t('levelPlaceholder')))
                    }else callback()
                },
                trigger: ['blur', 'change']
            }
        ],
        type: [
            {
                required: true,
                validator: (rule: any, value: string, callback: any) => {
                    if(!formData.rules[0].condition.type.length){
                        callback(new Error(t('leastSelectTaskIndex')))
                    }

                    // 检测是否是整数
                    const isDecimal = (str) =>{
                        const num = parseFloat(str);
                        return !isNaN(num) && num % 1 !== 0;
                    }
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
                    if(formData.rules[0].condition.type.indexOf('order_num') > -1 && (!formData.rules[0].condition.order_num ||formData.rules[0].condition.order_num <= 0 || isDecimal(formData.rules[0].condition.order_num))){
                        callback(new Error(t('conditionOrderNumTips3')))
                    }
                    if(formData.rules[0].condition.type.indexOf('order_money') > -1 && (!formData.rules[0].condition.order_money || formData.rules[0].condition.order_money <= 0 || !isMaxTwoDecimalPlaces(formData.rules[0].condition.order_money))){
                        callback(new Error(t('conditionOrderMoneyTips3')))
                    }
                    if(formData.rules[0].condition.type.indexOf('child_num') > -1 && (!formData.rules[0].condition.child_num || formData.rules[0].condition.child_num <= 0 || isDecimal(formData.rules[0].condition.child_num))){
                        callback(new Error(t('conditionFenxiaoNumTips3')))
                    }
                    callback()
                },
                trigger: ['blur']
            }
        ],
        send_time_type: [
            {
                required: true,
                validator: (rule: any, value: string, callback: any) => {
                    if(!formData.send_time){
                        callback(new Error(t('selectTimePlaceholder1')))
                    }
                    const regex = /^[1-9]\d*$/;
                    if(formData.send_time_type == 2 && !regex.test(formData.send_time)){
                        callback(new Error(t('selectTimePlaceholder2')))
                    }
                    if(formData.send_time_type == 1 && timestampFn(formData.end_time) > timestampFn(formData.send_time)){
                        callback(new Error(t('selectTimePlaceholder3')))
                    }

                    callback()
                },
                trigger: ['blur', 'change']
            }
        ],
       'rules[0].reward.commission':[
           { required: true, message: t('taskContentPlaceholder'), trigger: 'blur' },
           {
                validator: (rule: any, value: string, callback: any) => {
                    if(value <= 0){
                        callback(new Error(t('taskCommissionPlaceholder')))
                    }
                    callback()
                },
                trigger: ['blur', 'change']
            }
       ]
    }
})

// 获取分销等级不分页
const fenxiaoLevel = ref([]);
const getFenxiaoLevelListPageFn = ()=>{
    getFenxiaoLevelListPage().then(res=>{
        fenxiaoLevel.value = res.data;
    })
}
getFenxiaoLevelListPageFn();

// 获取任务详情
const loading = ref(true);
const getTaskDetailFn = ()=>{
    getTaskDetail({id: formData.id}).then(res=>{
        let data = cloneDeep(res.data);
        if (data && Object.keys(data).length) {
            formData.name = data.name;
            formData.cover = data.cover;
            formData.time_type = data.time_type;
            formData.start_time = data.start_time;
            formData.end_time = data.end_time;
            formData.level_type = data.level_type;
            formData.level = data.level;
            formData.times = (data.times).toString();
            formData.rules = data.rules;
            formData.remark = data.remark;
            formData.send_time_type = data.send_time_type;
            formData.send_time = data.send_time_type == 1 ? timeStampTurnTime(data.send_time) : data.send_time;
        }
        loading.value = false;
    })
}
if(formData.id)
    getTaskDetailFn();
else
    loading.value = false;

const onSave = async (formEl: FormInstance | undefined) => {
    if (repeat.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            let data = cloneDeep(formData);
            if(formData.time_type == 2){
                data.end_time = 0;
            }

            let api = data.id ? editTask : addTask
            api(data).then(res => {
                repeat.value = false
                router.push('/shop_fenxiao/task/list')
            }).catch(() => {
                repeat.value = false
            })
        }
    })
}

// 返回
const back = () => {
    router.push('/shop_fenxiao/task/list');
}

// 获取当前日期
const currTime = ()=>{
    var now = new Date();
    var year = now.getFullYear();
    var month = ("0" + (now.getMonth() + 1)).slice(-2); // 获取月份时需要加1，因为getMonth()返回的是0-11的数字
    var day = ("0" + now.getDate()).slice(-2);
    var hours = ("0" + now.getHours()).slice(-2);
    var minutes = ("0" + now.getMinutes()).slice(-2);
    var seconds = ("0" + now.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 设置当前日期
formData.start_time = currTime();
// 禁止选中当前时间的日期
const disabledPastDates = (date)=>{
    return date.valueOf() < Date.now();
}
// 时间格式转换时间戳
const timestampFn = (data)=>{
    var dateObject = new Date(data);
    return dateObject.getTime();
}

// 活动时间Change
const timeTypeChangeFn = (data,formEl)=>{
    if(data == '2') formData.send_time_type = '2';

    setTimeout(()=>{
        if (!formEl) return
        formEl.clearValidate('send_time_type')
    })
}

// 奖励发放时间
const sendTimeTypeChangeFn = (formEl)=>{
    formData.send_time = ''
    setTimeout(()=>{
        if (!formEl) return
        formEl.clearValidate('send_time_type')
    })
}

// 奖励指标
const conditionTypeChangeFn = (formEl)=>{
    // 重置input的框
    let arr = ['order_num', 'order_money', 'child_num'];
    let data = formData.rules[0].condition.type[0];
    arr.forEach((item,index)=>{
        if(item != data){
            formData.rules[0].condition[item] = '';
        }
    })

    setTimeout(()=>{
        if (!formEl) return
        formEl.clearValidate('type')
    })
}
</script>

<style lang="scss" scoped></style>
