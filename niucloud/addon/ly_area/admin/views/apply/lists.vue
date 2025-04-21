<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <!-- <el-button type="primary" @click="addEvent">
                    {{ t('addApply') }}
                </el-button> -->
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="applyTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('memberId')" prop="search">
                        <el-input v-model="applyTable.searchParam.search" :placeholder="t('memberIdPlaceholder')" />
                    </el-form-item>
                    <!-- <el-form-item :label="t('agentId')" prop="agent_id">
                        <el-input v-model="applyTable.searchParam.agent_id" :placeholder="t('agentIdPlaceholder')" />
                    </el-form-item> -->
                    <!-- 代理级别 -->
                    <el-form-item :label="t('levelArea')" prop="level_area">
                        <el-select class="" v-model="applyTable.searchParam.level_area" clearable :placeholder="t('levelAreaPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="省级" value="1">{{ t('levelArea1') }}</el-option>
                            <el-option label="市级" value="2">{{ t('levelArea2') }}</el-option>
                            <el-option label="区县" value="3">{{ t('levelArea3') }}</el-option>
                            <!-- <el-option label="街道" value="4">{{ t('levelArea4') }}</el-option> -->
                        </el-select>
                    </el-form-item>
                    <!-- 区域名称 -->
                    <el-form-item :label="t('applyArea')" prop="apply_area">
                        <el-input v-model="applyTable.searchParam.apply_area" :placeholder="t('applyAreaPlaceholder')" />
                    </el-form-item>
                    <!-- 状态 -->
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="" v-model="applyTable.searchParam.status" clearable :placeholder="t('levelAreaPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="待审核" value="0">{{ t('status0') }}</el-option>
                            <el-option label="已通过" value="1">{{ t('status1') }}</el-option>
                            <el-option label="已拒绝" value="2">{{ t('status2') }}</el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 创建时间 -->
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="applyTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadApplyList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <!-- 会员信息 -->
            <div class="mt-[10px]">
                <el-table :data="applyTable.data" size="large" v-loading="applyTable.loading">
                    <template #empty>
                        <span>{{ !applyTable.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="apply_id" :label="t('ID')" min-width="70" :show-overflow-tooltip="true"/>

                    <el-table-column prop="member_id" :label="t('memberId')" min-width="150" :show-overflow-tooltip="true" >
                        <template #default="{ row }">
                            <div v-if="row.member" class="flex items-center cursor-pointer" @click="toMember(row.member_id)">
                                <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                    <el-image v-if="row.member && row.member.headimg" class="w-[50px] h-[50px]" :src="img(row.member.headimg)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" />
                                            </div>
                                        </template>
                                    </el-image>
                                    <img v-else class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" fit="contain" />
                                </div>
                                <div class="ml-2">
                                    <span v-if="row.member.nickname" :title="row.member.nickname" class="multi-hidden">{{row.member.nickname}}</span>
                                    <span v-else :title="row.member.nickname" class="multi-hidden">{{row.member.username}}</span>
                                    <span class="text-primary text-[12px]">{{row.member.mobile}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <!-- <el-table-column prop="agent_id" :label="t('agentId')" min-width="120" :show-overflow-tooltip="true"/> -->
                    <!-- 申请级别 -->
                    <el-table-column prop="level_area" :label="t('levelArea')" min-width="120" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <el-tag v-if="row.level_area == 1">{{ t('levelArea1') }}</el-tag>
                            <el-tag v-if="row.level_area == 2">{{ t('levelArea2') }}</el-tag>
                            <el-tag v-if="row.level_area == 3">{{ t('levelArea3') }}</el-tag>
                            <!-- <el-tag v-if="row.level_area == 4">{{ t('levelArea4') }}</el-tag> -->
                        </template>
                    </el-table-column>

                    <!-- 申请区域 -->
                    <el-table-column prop="apply_area" :label="t('applyArea')" min-width="120" :show-overflow-tooltip="true"/>

                    <!-- 申请时间 -->
                    <el-table-column :label="t('createTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>

                    <!-- 审核状态 -->
                    <el-table-column prop="status" :label="t('status')" min-width="120" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <el-tag v-if="row.status == 0">{{ t('status0') }}</el-tag>
                            <el-tag v-if="row.status == 1">{{ t('status1') }}</el-tag>
                            <el-tag v-if="row.status == 2" type="danger">{{ t('status2') }}</el-tag>
                        </template>
                    </el-table-column>
                                  
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                            <!-- <el-button type="primary" link @click="applyDetailEvent(row)">{{ t('applyDetail') }}</el-button> -->
                            <template v-if="row.status===0" >
                                <el-button type="primary" link @click="agreeAreaAgentFn(row.apply_id)">{{t('applyPass')}}</el-button>
                                <el-button type="primary" link @click="refuseAreaAgentFn(row.apply_id)">{{t('applyRefuse')}}</el-button>
                            </template>

                           <!-- <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button> -->
                           <el-button type="primary" link @click="deleteEvent(row.apply_id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="applyTable.page" v-model:page-size="applyTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="applyTable.total"
                        @size-change="loadApplyList()" @current-change="loadApplyList" />
                </div>
            </div>

            <!-- <edit ref="editApplyDialog" @complete="loadApplyList" /> -->
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getApplyList, deleteApply, agreeAreaAgent, refuseAreaAgent, getAreaAgentApplyStatus} from '@/addon/ly_area/api/apply'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
// import Edit from '@/addon/ly_area/views/apply/components/apply-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

const config :Record<string, any> = reactive({
    leveList: [],
    statusList: [
        { label: '正常', value: 1 },
        { label: '已冻结', value: -1 }
    ],
    applyStatus: []
})

let applyTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
        search: '',
        member_id: '',
        agent_id: '',
        level_area: '',
        apply_area: '',
        status: '',
        create_time: []
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
  

// 获取代理申请状态
const getAreaAgentApplyStatusFn = () => {
    getAreaAgentApplyStatus().then(res => {
        config.applyStatus = res.data
    })
}
getAreaAgentApplyStatusFn()

/**
 * 获取区域代理申请记录列表
 */
const loadApplyList = (page: number = 1) => {
    applyTable.loading = true
    applyTable.page = page

    getApplyList({
        page: applyTable.page,
        limit: applyTable.limit,
         ...applyTable.searchParam
    }).then(res => {
        applyTable.loading = false
        applyTable.data = res.data.data
        applyTable.total = res.data.total
    }).catch(() => {
        applyTable.loading = false
    })
}
loadApplyList()

const editApplyDialog: Record<string, any> | null = ref(null)

/**
 * 添加区域代理申请记录
 */
 const addEvent = () => {
    editApplyDialog.value.setFormData()
    editApplyDialog.value.showDialog = true
}

/**
 * 编辑区域代理申请记录
 * @param data
 */
const editEvent = (data: any) => {
    editApplyDialog.value.setFormData(data)
    editApplyDialog.value.showDialog = true
}

/**
 * 删除区域代理申请记录
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('applyDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
         // 对传入的id参数进行类型检查和转换
        const validId = typeof id === 'string'? parseInt(id, 10) : id;

        deleteApply(validId).then(() => {
            loadApplyList()
        }).catch(() => {
        })
    })
}

// 代理申请详情
const applyDetailDialog = ref(false)
const applyData = ref({})
const applyDetailEvent = (row:any) => {
    applyData.value = row
    applyDetailDialog.value = true
}
// 审核通过
const agreeAreaAgentFn = (apply_id:number) => {
    ElMessageBox.confirm(t('applyPassTip'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        agreeAreaAgent(apply_id).then(() => {
            loadApplyList()
        })
    })
}
// 审核拒绝
const refuseAreaAgentFn = (apply_id:number) => {
    ElMessageBox.prompt(t('applyRefuseTip'), t('warning'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        inputType: 'textarea',
        inputPlaceholder: t('applyRefusePlaceholder'),
        inputErrorMessage: t('applyRefusePlaceholder'),
        inputValidator: (value) => {
            if (!value) {
                return false
            }
        }
    }).then(({ value }) => {
        refuseAreaAgent(apply_id, value).then(() => {
            loadApplyList()
        })
    }).catch(() => {
    })
}

    

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadApplyList()
}
</script>

<style lang="scss" scoped>
/* 多行超出隐藏 */
.multi-hidden {
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>