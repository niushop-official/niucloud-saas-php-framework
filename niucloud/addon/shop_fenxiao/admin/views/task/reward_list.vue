<template>
    <div class="main-container">

        <!--返回-->
        <el-card class="card !border-none" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="back()" />
        </el-card>

        <el-card class="card mt-[15px] !border-none" shadow="never">
            <el-card class="card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="table.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('memberInfo')">
                        <el-input v-model.trim="table.searchParam.search" :placeholder="t('memberInfoPlaceholder')" maxlength="60" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="getListFn()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-table :data="table.data" size="large" v-loading="table.loading" ref="tableRef">
                <template #empty>
                    <span>{{ !table.loading ? t('emptyData') : '' }}</span>
                </template>
                <el-table-column prop="name" :label="t('taskInfo')" min-width="150">
                    <template #default="{ row }">
                        <div class="flex items-center">
                            <el-image class="w-[50px] h-[50px] mr-[10px]" v-if="row.member.headimg" :src="img(row.member.headimg)" fit="contain" />
                            <img class="w-[50px] h-[50px] mr-[10px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                            <div class="flex flex-col">
                                <span class="text-[14px]">{{row.member.nickname || row.member.username}}</span>
                                <span class="text-[14px] text-[#666]">{{row.mobile || '--'}}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="total_reward_money" :label="t('totalMoney')" min-width="100" />
                <el-table-column :label="t('schedule')" min-width="100" >
                    <template #default="{ row }">
                        {{ row.progress }}%
                    </template>
                </el-table-column>
                <el-table-column prop="status_name" :label="t('status')" min-width="100">
                    <template #default="{ row }">
                        {{ row.task.status_name }}
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" :label="t('accomplishStatus')" min-width="100">
                    <template #default="{ row }">
                        {{ row.complete_num >= 1 ? '已完成' :  '未完成'}}
                    </template>
                </el-table-column>
                <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="detailEvent(row)">{{ t('detail') }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="table.page" v-model:page-size="table.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="table.total"
                    @size-change="getAgentListFn()" @current-change="getAgentListFn" />
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { getTaskMemberList } from '@/addon/shop_fenxiao/api/task'
import { t } from '@/lang'
import { img,setTablePageStorage,getTablePageStorage } from '@/utils/common'
import { cloneDeep } from 'lodash-es'
import { useRoute, useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const back = () =>{
    router.push('/shop_fenxiao/task/list')
}
const searchFormRef = ref<FormInstance>()
const id = ref(route.query.id) || 0

// 重置搜索条件
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    table.searchParam.search = "";
    formEl.resetFields()
    getListFn()
}

const table = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: [],
    searchParam: {
        search: ""
    }
});

// 获取任务列表
const getListFn=(page: number = 1)=> {
    table.loading = true
    table.page = page

    const searchData = cloneDeep(table.searchParam)
    getTaskMemberList({
        page: table.page,
        limit: table.limit,
        task_id: id.value,
        ...searchData
    }).then((res: any) => {
        table.data = res.data.data;
        table.total = res.data.total
        table.loading = false
        setTablePageStorage(table.page, table.limit, table.searchParam);
    })
}
getListFn(getTablePageStorage(table.searchParam).page);

/**
 * 任务详情
 */
const detailEvent = (data: any) => {
    router.push('/shop_fenxiao/task/reward_detail?id=' + data.id)
}

</script>

<style lang="scss" scoped></style>
