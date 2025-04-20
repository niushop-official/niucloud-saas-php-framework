<template>
    <div class="main-container">
        <el-card class="card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addTask') }}
                </el-button>
            </div>

            <el-card class="card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="table.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('taskName')">
                        <el-input v-model.trim="table.searchParam.name" :placeholder="t('taskNamePlaceholder')" maxlength="60" />
                    </el-form-item>
                    <el-form-item :label="t('status')">
                        <el-select v-model="table.searchParam.status" :placeholder="t('statusPlaceholder')">
                            <el-option :label="t('all')" value=""/>
                            <el-option v-for="(item,index) in taskStatus" :key="index" :label="item" :value="index" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('createTime')">
                        <el-date-picker v-model="table.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getAgentListFn()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-table :data="table.data" size="large" v-loading="table.loading" ref="tableRef">
                <template #empty>
                    <span>{{ !table.loading ? t('emptyData') : '' }}</span>
                </template>
                <el-table-column type="selection" width="55" />
                <!-- <el-table-column prop="name" :label="t('taskName')" min-width="150" /> -->
                <el-table-column :label="t('taskName')" min-width="150">
                        <template #default="{ row }">
                            <div class="flex items-center cursor-pointer">
                                <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                    <el-image v-if="row.cover_thumb_mid" class="w-[50px] h-[50px]" :src="img(row.cover_thumb_mid)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[50px] h-[50px]" src="@/addon/shop_fenxiao/assets/goods_default.png" fit="contain" />
                                            </div>
                                        </template>
                                    </el-image>
                                    <img v-else class="w-[50px] h-[50px]" src="@/addon/shop_fenxiao/assets/goods_default.png" fit="contain" />
                                </div>
                                <div class="ml-2">
                                    <span>{{row.name}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                <el-table-column :label="t('level')" min-width="100">
                    <template #default="{ row }">
                        {{ row.level_type == 1 && '全部等级' || row.level_type == 2 && Object.values(row.level_data).toString() }}
                    </template>
                </el-table-column>
                <el-table-column prop="status_name" :label="t('state')" min-width="100" />
                <el-table-column prop="create_time" :label="t('createTime')" min-width="200">
                    <template #default="{ row }">
                        {{ row.create_time || '--' }}
                    </template>
                </el-table-column>
                <el-table-column :label="t('taskTime')" min-width="200">
                    <template #default="{ row }">
                        {{ row.start_time || '--' }} 至 {{ row.time_type == 1 ? row.end_time : "长期有效" }}
                    </template>
                </el-table-column>
                <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="editEvent(row)" v-if="row.status == 1">{{ t('edit') }}</el-button>
                        <el-button type="primary" link @click="rewardEvent(row)" v-if="row.status != 1">{{t('awardDetail')}}</el-button>
                        <el-button type="primary" link @click="detailEvent(row)">{{ t('detail') }}</el-button>
                        <el-button type="primary" link @click="finishEvent(row)" v-if="row.status != 3">{{ t('finish') }}</el-button>
                        <el-button type="primary" link @click="deleteEvent(row)" v-if="row.status == 3">{{ t('delete') }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="table.page" v-model:page-size="table.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="table.total"
                    @size-change="getAgentListFn()" @current-change="getAgentListFn" />
            </div>
        </el-card>
        <task-detail ref="taskDetailDialog"></task-detail>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { getTaskList, deleteTask, taskFinish, getTaskStatus } from '@/addon/shop_fenxiao/api/task'
import { t } from '@/lang'
import { img ,setTablePageStorage,getTablePageStorage} from '@/utils/common'
import { cloneDeep } from 'lodash-es'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, FormInstance } from 'element-plus'
import taskDetail from '@/addon/shop_fenxiao/views/task/components/task-detail.vue'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const searchFormRef = ref<FormInstance>()
const repeat = ref(false)

// 重置搜索条件
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    table.searchParam.name = "";
    table.searchParam.status = "";
    table.searchParam.create_time = [];
    formEl.resetFields()
    getAgentListFn()
}

const table = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: [],
    searchParam: {
        name: "",
        status: "",
        create_time: []
    }
});

// 获取任务列表
const getAgentListFn=(page: number = 1)=> {
    table.loading = true
    table.page = page

    const searchData = cloneDeep(table.searchParam)
    getTaskList({
        page: table.page,
        limit: table.limit,
        ...searchData
    }).then((res: any) => {
        table.data = res.data.data;
        table.total = res.data.total
        table.loading = false
        setTablePageStorage(table.page, table.limit, searchData)
    })
}
getAgentListFn(getTablePageStorage(table.searchParam).page);

// 获取任务状态
const taskStatus = ref({});
const getTaskStatusFn=()=>{
    getTaskStatus().then((res:any)=>{
        taskStatus.value = res.data;
    })
}
getTaskStatusFn();

/**
 * 添加任务
 */
const addEvent = () => {
    router.push('/shop_fenxiao/task/task_edit')
}

/**
 * 任务详情
 */

const taskDetailDialog: Record<string, any> | null = ref(null)
const detailEvent = (data: any) => {
    let obj = {id: data.id};
    taskDetailDialog.value.setFormData(obj);
    taskDetailDialog.value.showDialog = true;
}

/**
 * 编辑任务
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/shop_fenxiao/task/task_edit?id=' + data.id)
}

/**
 * 奖励明细
 * @param data
 */
const rewardEvent = (data: any) => {
    router.push('/shop_fenxiao/task/reward?id=' + data.id)
}

/**
 * 删除任务
 * @param data
 */
const deleteEvent = (data: any) => {
    ElMessageBox.confirm(t('taskDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        if (repeat.value) return
        repeat.value = true
        deleteTask({
            id: data.id
        }).then(() => {
            getAgentListFn()
            repeat.value = false
        }).catch(() => {
            repeat.value = false
        })
    })
}

/**
 * 失效任务
 * @param data
 */
const finishEvent = (data: any) => {
    ElMessageBox.confirm(t('taskFinishTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        if (repeat.value) return
        repeat.value = true
        taskFinish({
            id: data.id
        }).then(() => {
            getAgentListFn()
            repeat.value = false
        }).catch(() => {
            repeat.value = false
        })
    })
}
</script>

<style lang="scss" scoped></style>
