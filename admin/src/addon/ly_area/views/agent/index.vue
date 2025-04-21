<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addAgent') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="agentTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('memberId')" prop="search">
                        <el-input v-model="agentTable.searchParam.search" :placeholder="t('memberIdPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('provinceName')" prop="full_area" class="w-[200px]">
                        <el-input v-model="agentTable.searchParam.full_area" :placeholder="t('provinceNamePlaceholder')" />
                    </el-form-item>

                    <!-- <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[120px]" v-model="agentTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="禁用" value="1"></el-option>
                            <el-option label="正常" value="0"></el-option>
                        </el-select>
                    </el-form-item> -->
                    
                    <el-form-item :label="t('agentLevel')" prop="agent_level">
                        <el-select class="w-[120px]" v-model="agentTable.searchParam.agent_level" clearable :placeholder="t('agentLevelPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="省级" value="1"></el-option>
                            <el-option label="市级" value="2"></el-option>
                            <el-option label="区级" value="3"></el-option>
                            <el-option label="街道" value="4" v-if="setData.is_street == '1'"></el-option>
                            <!-- <el-option v-for="item in agentTable.searchParam.agent_levelOptions" :key="item.value" :label="item.label" :value="item.value" /> -->
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('agentAt')" prop="agent_at">
                        <el-date-picker v-model="agentTable.searchParam.agent_at" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadAgentList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="agentTable.data" size="large" v-loading="agentTable.loading">
                    <template #empty>
                        <span>{{ !agentTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="agent_id" :label="t('agentId')" min-width="80" :show-overflow-tooltip="true"/>
                    
                    <!-- <el-table-column prop="member_id" :label="t('memberId')" min-width="120" :show-overflow-tooltip="true"/> -->
                    <el-table-column prop="member_id" :label="t('memberId')" min-width="200">
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
                    
                    <!-- 代理区域 -->
                    <el-table-column prop="full_area" :label="t('fullArea')" min-width="180" :show-overflow-tooltip="true"/>                                   
                    
                    <!-- 代理级别 -->
                    <el-table-column :label="t('agentLevel')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <!-- <div v-for="(item, index) in agent_levelList">
                                <div v-if="item.value == row.agent_level">{{ item.name }}</div>
                            </div> -->
                            <el-tag v-if="row.agent_level == 1" type="success">{{ t('level1') }}</el-tag>
                            <el-tag v-if="row.agent_level == 2" type="danger">{{ t('level2') }}</el-tag>
                            <el-tag v-if="row.agent_level == 3" type="warning">{{ t('level3') }}</el-tag>
                            <el-tag v-if="row.agent_level == 4 && row.setData.is_street ==1" type="info">{{ t('level4') }}</el-tag>
                        </template>
                    </el-table-column>
                    
                    <!-- <el-table-column prop="rate" :label="t('rate')" min-width="120" :show-overflow-tooltip="true"/> -->
                    
                    <!-- 累计分红金额 -->
                    <el-table-column prop="settle_count_money" :label="t('settleCountMoney')" min-width="120" :show-overflow-tooltip="true"/>

                    <!-- 已结算分红金额 -->
                    <el-table-column prop="already_settle_money" :label="t('alreadySettleMoney')" min-width="120" :show-overflow-tooltip="true"/>

                    <!-- 已提现金额 -->
                     <el-table-column prop="amount_withdraw" :label="t('alreadyWithdrawMoney')" min-width="120" :show-overflow-tooltip="true"/>
                    
                     <!-- 状态 -->
                    <el-table-column :label="t('status')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <el-tag v-if="row.status == 1" type="success">{{ t('normal') }}</el-tag>
                            <el-tag v-if="row.status == 2" type="danger">{{ t('disabled') }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.agent_id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="agentTable.page" v-model:page-size="agentTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="agentTable.total"
                        @size-change="loadAgentList()" @current-change="loadAgentList" />
                </div>
            </div>         
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getAgentList, deleteAgent } from '@/addon/ly_area/api/agent'
import { getAreaConfig } from '@/addon/ly_area/api/config'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let agentTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
        search: '',
        status:'',
        agent_level:'',
        agent_at:[],
        full_area: '',
        // agent_levelOptions: ''
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])


/**
 * 获取区域代理列表
 */
const loadAgentList = (page: number = 1) => {
    agentTable.loading = true
    agentTable.page = page

    getAgentList({
        page: agentTable.page,
        limit: agentTable.limit,
         ...agentTable.searchParam
    }).then(res => {
        agentTable.loading = false
        agentTable.data = res.data.data
        agentTable.total = res.data.total
    }).catch(() => {
        agentTable.loading = false
    })
}
loadAgentList()

const router = useRouter()

const setData = {
    is_street: '0',
}
// 获取配置信息
const setFormData = async (id: number = 0) => {
    const data = await (await getAreaConfig()).data
    Object.keys(agentTable).forEach((key: string) => {
        if (data[key] != undefined) agentTable[key] = data[key]
    })
    // agentTable.is_open = Boolean(Number(agentTable.is_open))
    setData.is_street = data.is_street;
    // // 根据 is_street 的值动态设置 levelWeightList
    // setData.value.levelWeightList = setData.is_street === '1'
    //    ? [
    //         { id: 1, name: '一级' },
    //         { id: 2, name: '二级' },
    //         { id: 3, name: '三级' },
    //         { id: 4, name: '四级' }
    //     ]
    //     : [
    //         { id: 1, name: '一级' },
    //         { id: 2, name: '二级' },
    //         { id: 3, name: '三级' }
    //     ];
    // if (setData.is_street === '1') {
    //     agentTable.searchParam.agent_levelOptions = [
    //         { label: '全部', value: '' },
    //         { label: '省级', value: 1 },
    //         { label: '市级', value: 2 },
    //         { label: '区级', value: 3 },
    //         { label: '街道', value: 4 }
    //     ];
    // } else {
    //     agentTable.searchParam.agent_levelOptions = [
    //         { label: '全部', value: '' },
    //         { label: '省级', value: 1 },
    //         { label: '市级', value: 2 },
    //         { label: '区级', value: 3 }
    //     ];
    // }
    // loading.value = false
}
setFormData()

/**
 * 添加区域代理
 */
const addEvent = () => {
    router.push('/ly_area/edit')
}

/**
 * 编辑区域代理
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/ly_area/edit?id='+data.agent_id)
}

/**
 * 删除区域代理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('agentDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteAgent(id).then(() => {
            loadAgentList()
        }).catch(() => {
        })
    })
}

    

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadAgentList()
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