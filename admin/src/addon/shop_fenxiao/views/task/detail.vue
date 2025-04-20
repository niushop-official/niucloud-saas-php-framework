<template>
    <div class="main-container" v-loading="loading">

        <!--返回-->
        <el-card class="card !border-none" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="back()" />
        </el-card>
        <!--返回 end-->

        <el-card class="card mt-[15px] !border-none" shadow="never">
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
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { FormInstance } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
import { img, timeStampTurnTime } from '@/utils/common'
import { useRoute, useRouter } from 'vue-router'
import { getTaskDetail } from '@/addon/shop_fenxiao/api/task'
import { getFenxiaoLevelListPage } from '@/addon/shop_fenxiao/api/level'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const taskFormRef = ref<FormInstance>()

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
formData.id = ref(route.query.id)

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

if(formData.id) {
    getTaskDetailFn();
}

// 返回
const back = () => {
    router.push('/shop_fenxiao/task/list');
}

</script>

<style lang="scss" scoped></style>
