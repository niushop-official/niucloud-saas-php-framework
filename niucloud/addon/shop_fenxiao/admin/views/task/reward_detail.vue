<template>
    <div class="main-container" v-loading="loading">

        <!--返回-->
        <el-card class="card !border-none" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="back()" />
        </el-card>

        <el-card class="card mt-[15px] !border-none" shadow="never" v-if="!loading">
            <div class="text text-[14px] leading-[25px]">{{t('baseInfo')}}</div>
            <el-form class="page-form" :model="formData" label-width="120px" ref="taskFormRef">
                <el-form-item :label="t('taskNam')" prop="name">
                    <div>{{formData.name}}</div>
                </el-form-item>
                <el-form-item :label="t('recipient')" prop="name">
                    <div class="flex items-center">
                        <el-image class="w-[50px] h-[50px] mr-[10px]" v-if="formData.member.headimg" :src="img(formData.member.headimg)" fit="contain" />
                        <img class="w-[50px] h-[50px] mr-[10px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                        <div class="flex flex-col">
                            <span class="text-[14px] leading-[1]">{{formData.member.nickname || formData.member.username}}</span>
                            <span class="text-[14px] leading-[1] mt-[5px] text-[#666]">{{formData.mobile || '--'}}</span>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item :label="t('schedule')" prop="name">
                    <div>{{formData.progress}}%</div>
                </el-form-item>
                <el-form-item :label="t('status')" prop="name">
                    <div>{{formData.status_name}}</div>
                </el-form-item>
                <el-form-item :label="t('totalMoney')" prop="name">
                    <div>{{formData.total_reward_money}}</div>
                </el-form-item>
                <el-form-item :label="t('taskTime')">
                    <div class="flex items-center">
                        <span>{{formData.start_time}}</span>
                        <span class="mx-[10px]">至</span>
                        <span v-if="formData.time_type == 2">长期有效</span>
                        <span v-else>{{formData.end_time}}</span>
                    </div>
                </el-form-item>
            </el-form>

            <div class="text mt-[20px] text-[14px] leading-[25px]">{{t('rewardDetail')}}</div>

            <el-table :data="formData.task_member_reward" size="large" ref="tableRef">
                <template #empty>
                    <span>{{ !table.loading ? t('emptyData') : '' }}</span>
                </template>
                <el-table-column prop="name" :label="t('awardExplain')" min-width="150">
                    <template #default="{ row }">
                        {{ row.step }}{{t('stepAward')}}
                    </template>
                </el-table-column>
                <el-table-column prop="reward_money" :label="t('awardMoney')" min-width="100" />
                <el-table-column prop="reward_money" :label="t('awardStatus')" min-width="100">
                    <template #default="{ row }">
                        {{ row.is_send > 0 ? t('issued') : t('unissued') }}
                    </template>
                </el-table-column>
                <el-table-column prop="complete_time" :label="t('awardTimeRelease')" min-width="100" align="right" />
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { FormInstance } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
import { img } from '@/utils/common'
import { useRoute, useRouter } from 'vue-router'
import { getTaskMemberDetail } from '@/addon/shop_fenxiao/api/task'
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
    times: '1',
    timesNum: '', //次数
    rules: [{
        condition: {
            type: []
        },
        reward: {commission:''}
    }],
    remark: '',
    task_member_reward: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })
formData.id = ref(route.query.id)

// 奖励明细
const table = reactive({
    loading: true,
    data: []
});

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
const detailFn = ()=>{
    loading.value = true;
    getTaskMemberDetail({id: formData.id}).then(res=>{
        let data = cloneDeep(res.data);
        if (data) {
            formData.member = data.member;
            formData.name = data.task.name;
            formData.status_name = data.task.status_name;
            formData.progress = data.progress;
            formData.end_time = data.task.end_time;
            formData.start_time = data.task.start_time;
            formData.time_type = data.task.time_type;
            formData.total_reward_money = data.total_reward_money;
            formData.task_member_reward = data.task_member_reward;
        }
        loading.value = false;
    })
}
detailFn();

// 返回
const back = () =>{
    router.push('/shop_fenxiao/task/list');
}

</script>

<style lang="scss" scoped></style>
