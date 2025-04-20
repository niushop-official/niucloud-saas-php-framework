<template>
    <el-drawer v-model="showDialog" title="任务详情" direction="rtl" :before-close="handleClose" class="member-detail-drawer">
        <div class="main-container" v-loading="loading">
            <el-form class="page-form" :model="formData" label-width="120px" ref="taskFormRef">
                <el-form-item :label="t('taskNam')" prop="name">
                    <div>{{formData.name}}</div>
                </el-form-item>
                <el-form-item :label="t('cover')">
                    <el-image v-if="formData.cover_thumb_mid" class="w-[100px] h-[100px]" :src="img(formData.cover_thumb_mid) || ''" fit="contain" >
                        <template #error>
                            <div class="image-slot">
                                <img class="w-[100px] h-[100px]" src="@/addon/shop_fenxiao/assets/goods_default.png" fit="contain" />
                            </div>
                        </template>
                    </el-image>
                    <img v-else class="w-[100px] h-[100px]" src="@/addon/shop_fenxiao/assets/goods_default.png" fit="contain" />
                </el-form-item>
                <el-form-item :label="t('taskTime')">
                    <div class="flex items-center">
                        <span>{{formData.start_time}}</span>
                        <span class="mx-[10px]">至</span>
                        <span v-if="formData.time_type == 2">长期有效</span>
                        <span v-else>{{formData.end_time}}</span>
                    </div>
                </el-form-item>
                <el-form-item :label="t('articipation')" v-if="formData.type===1">
                    <div>{{ formData.times != 0 ? formData.times+t('timesNext') : t('timesUnlimited') }}</div>
                </el-form-item>
                <el-form-item :label="t('level')">
                    <div v-if="formData.level_type == '1'">{{t('allLevel')}}</div>
                    <div v-if="formData.level_type == '2' && formData.level_data" class="flex">
                        <span v-for="(item,index) in  formData.level_data" :key="index" class="border-solid border-[1px] border-[var(--el-color-primary)] text-[var(--el-color-primary)] px-[5px] mr-[15px] h-[25px] leading-[25px] rounded text-[12px]">{{item}}</span>
                    </div>
                </el-form-item>

                <el-form-item :label="t('taskIndex')" prop="type">
                    <div class="flex flex-col">
                        <div class="flex items-center mt-[2px]" v-if="formData.rules[0].condition.type.indexOf('order_num') > -1">
                            <span class="mr-[5px]">{{t('conditionOrderNumTips1')}}</span>
                            <span class="text-[var(--el-color-primary)]">{{formData.rules[0].condition.order_num}}</span>
                            <span class="ml-[5px]">{{t('conditionOrderNumTips2')}}</span>
                        </div>
                        <div class="flex items-center mt-[2px]"  v-if="formData.rules[0].condition.type.indexOf('order_money') > -1">
                            <span class="mr-[5px]">{{t('conditionOrderMoneyTips1')}}</span>
                            <span class="text-[var(--el-color-primary)]">{{formData.rules[0].condition.order_money}}</span>
                            <span class="ml-[5px]">{{t('conditionOrderMoneyTips2')}}</span>
                        </div>
                        <div class="flex items-center mt-[2px]" v-if="formData.rules[0].condition.type.indexOf('fenxiao_num') > -1">
                            <span class="mr-[5px]">{{t('conditionFenxiaoNumTips1')}}</span>
                            <span class="text-[var(--el-color-primary)]">{{formData.rules[0].condition.fenxiao_num}}</span>
                            <span class="ml-[5px]">{{t('conditionFenxiaoNumTips2')}}</span>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item :label="t('awardTime')">
                    <div class="flex items-center">
                        <span v-if="formData.send_time_type == 1">{{formData.send_time}}</span>
                        <span v-if="formData.send_time_type == 2">{{t('taskAttainment')}}{{formData.send_time}}{{t('taskAttainment1')}}</span>
                    </div>
                </el-form-item>

                <el-form-item :label="t('taskContent')">
                    <div class="flex items-center">
                        <span class="mr-[5px]">{{t('return')}}</span>
                        <span class="text-[var(--el-color-primary)]">{{formData.rules[0].reward.commission}}</span>
                        <span class="ml-[5px]">{{t('brokerage')}}</span>
                    </div>
                </el-form-item>
                <el-form-item :label="t('remark')">
                    <div class="w-[750px]">{{formData.remark}}</div>
                </el-form-item>
            </el-form>
        </div>
    </el-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { getTaskDetail } from '@/addon/shop_fenxiao/api/task'
import { getFenxiaoLevelListPage } from '@/addon/shop_fenxiao/api/level'
import { cloneDeep } from 'lodash-es'

const showDialog = ref(false)
const loading = ref(false)

const handleClose = (done: () => void) => {
    showDialog.value = false;
}

// 表单数据
const initialFormData = {
    id:'',
    name: '',
    time_type: '1',
    start_time: '',
    end_time: '',
    level_type: '1',
    level: ['1'],
    level_data: [],
    times: '',
    rules: [{
        condition: {
            type: []
        },
        reward: {commission:''}
    }],
    remark: '',
    type_name:'',
    type:''
}
const formData: Record<string, any> = reactive({ ...initialFormData })
formData.id = ''

// 获取分销等级不分页
const fenxiaoLevel = ref([]);
const getFenxiaoLevelListPageFn = ()=>{
    getFenxiaoLevelListPage().then(res=>{
        fenxiaoLevel.value = res.data;
    })
}
getFenxiaoLevelListPageFn();

// 获取任务详情
const getTaskDetailFn = ()=>{
    getTaskDetail({id: formData.id}).then(res=>{
        let data = cloneDeep(res.data);
        if (data) {
            formData.name = data.name;
            formData.time_type = data.time_type;
            formData.start_time = data.start_time;
            formData.end_time = data.end_time;
            formData.level_type = data.level_type;
            formData.level = data.level;
            formData.times = (data.times).toString();
            formData.rules = data.rules;
            formData.remark = data.remark;
            formData.type_name = data.type_name;
            formData.type = data.type;
            formData.level_data = data.level_data;
            formData.cover_thumb_mid = data.cover_thumb_mid;
            formData.send_time_type = data.send_time_type;
            formData.send_time = data.send_time_type == 1 ? timeStampTurnTime(data.send_time) : data.send_time;
        }
        loading.value = false;
    })
}

const setFormData = async (row: any = null) => {
    if(row.id){
        formData.id = row.id;
        getTaskDetailFn();
    }
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss">
.member-detail-drawer{
    width: 600px !important;
}
</style>
