<template>
    <div class="main-container">
        <el-card class="card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" @click="addEvent">{{ t('addAgent') }}</el-button>
            </div>

            <el-card class="card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="agentTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('memberInfo')" prop="keyword">
                        <el-input v-model.trim="agentTable.searchParam.keyword" :placeholder="t('memberInfoPlaceholder')" maxlength="60" />
                    </el-form-item>
                    <el-form-item :label="t('agentLevel')" prop="agent_level">
                        <el-select v-model="agentTable.searchParam.agent_level" :placeholder="t('selectAgentLevelPlaceholder')">
                            <el-option :label="t('all')" value=""/>
                            <el-option v-for="item in fenxiaoLevelOptions" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('fenxiaoState')" prop="agent_status">
                        <el-select v-model="agentTable.searchParam.agent_status" :placeholder="t('fenxiaoStatePlaceholder')">
                            <el-option :label="t('all')" value=""/>
                            <el-option v-for="item in fenxiaoStateOptions" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="agent_time">
                        <el-date-picker v-model="agentTable.searchParam.agent_time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getAgentListFn()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-table :data="agentTable.data" size="large" v-loading="agentTable.loading" ref="goodsListTableRef">
                <template #empty>
                    <span>{{ !agentTable.loading ? t('emptyData') : '' }}</span>
                </template>
                <el-table-column type="selection" width="55" />
                <el-table-column prop="fenxiao_info" :label="t('fenxiaoInfo')" min-width="200" >
                    <template #default="{ row }">
                        <div class="flex items-center cursor-pointer" @click="toFenxiao(row.member_id)">
                            <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                <el-image v-if="row.member && row.member.headimg" class="w-[50px] h-[50px]" :src="img(row.member.headimg)" fit="contain">
                                    <template #error>
                                        <div class="image-slot">
                                            <img class="w-[50px] h-[50px] rounded-full" src="@/app/assets/images/member_head.png" alt="">
                                        </div>
                                    </template>
                                </el-image>
                                <img class="w-[50px] h-[50px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                            </div>
                            <div class="ml-2">
                                <span :title="row.member && row.member.nickname" class="multi-hidden">{{row.member && row.member.nickname || row.member && row.member.username}}</span>
                                <span class="text-primary text-[12px]">{{row.member && row.member.mobile}}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="t('agentLevel')" min-width="120">
                    <template #default="{ row }">
                        <div class="cursor-pointer price-wrap">
                            <span>{{ row.agentLevel ? row.agentLevel.name : '--' }}</span>
                        </div>
                    </template>
                </el-table-column>
                 <el-table-column prop="agent_commission" :label="t('agentCommission')" min-width="100">
                    <template #default="{ row }">
                        {{ moneyFormat(row.agent_commission) }}
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" :label="t('createTime')" min-width="120">
                    <template #default="{ row }">
                        {{ row.agent_time || '--' }}
                    </template>
                </el-table-column>
                <el-table-column prop="sort" :label="t('currentState')" min-width="100">
                    <template #default="{ row }">
                        {{ row.agent_status_name }}
                    </template>
                </el-table-column>
                <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                        <el-button type="primary" link @click="spreadEvent(row)">{{ row.agent_status == 1 ? t('freeze') : t('normal') }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="agentTable.page" v-model:page-size="agentTable.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="agentTable.total"
                    @size-change="getAgentListFn()" @current-change="getAgentListFn" />
            </div>
        </el-card>

        <!-- 渠道代理商 -->
        <el-dialog v-model="agentDialog" :title="(isEditLevelDialog ? t('editAgent') : t('addAgent'))" width="450px" :destroy-on-close="true" :close-on-click-modal="false">
            <el-form ref="agentInfoRef" :model="agentDialogData"  :rules="formRules" label-width="110px">
                <el-form-item :label="t('fenxiao')" :prop="(!isEditLevelDialog ? 'member_id': '')">
                    <span v-if="agentDialogData.member_name" class="mr-[10px]">{{agentDialogData.member_name}}</span>
                    <el-button v-if="!isEditLevelDialog" type="primary" @click="selectFenxiaoFn">{{t('selectFenxiao')}}</el-button>
                </el-form-item>
                <el-form-item :label="t('agentLevel')" prop="agent_level">
                    <el-select v-model="agentDialogData.agent_level" :placeholder="t('selectAgentLevelPlaceholder')">
                        <el-option v-for="item in fenxiaoLevelOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <span class="text-[var(--el-color-primary)] ml-[10px] cursor-pointer" @click="getAgentLevelListFn(true)">刷新</span>
                    <span class="text-[var(--el-color-primary)] ml-[10px] cursor-pointer" @click="addLevelFn">添加</span>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="agentDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="saveAgent(agentInfoRef)">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 选择分销商弹窗 -->
        <fenxiao-of-select-popup ref="fenxiaoOfSelectPopupRef" :title="t('fenxiaoSelectPricePopupTitle')" :params="{is_agent:0}" @load="selectFenxiaoCallbackFn" />
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { img, moneyFormat,setTablePageStorage,getTablePageStorage } from '@/utils/common'
import { getAgentList, getAgentStatus, getAgentLevelList, editAgent, addAgent, editAgentStatus } from '@/addon/shop_fenxiao/api/agent'
import { t } from '@/lang'
import { cloneDeep } from 'lodash-es'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage, FormInstance } from 'element-plus'
import fenxiaoOfSelectPopup from '@/addon/shop_fenxiao/views/components/fenxiao-of-select-popup.vue'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const searchFormRef = ref<FormInstance>()

// 等级
const fenxiaoLevelOptions = ref([])
// 获取代理商等级
let getLevelLoad = false
const getAgentLevelListFn=(bool=false)=> {
    if (getLevelLoad) return false
    getLevelLoad = true
    getAgentLevelList().then((res: any) => {
        let data: any = []
        fenxiaoLevelOptions.value = []
        if (res.data.length) {
            res.data.forEach((item: any, index: any) => {
                let obj: any = {}
                obj.label = item.name
                obj.value = item.level_id
                data.push(obj)
            })
            fenxiaoLevelOptions.value = data
        }
        getLevelLoad = false
        if (bool) {
            ElMessage({
                message: t('refreshSuccess'),
                type: 'success'
            })
        }
    })
}
getAgentLevelListFn()

// 状态
const fenxiaoStateOptions = ref([])
// 获取代理商状态
const getAgentStatusFn = () => {
    getAgentStatus().then((res: any) => {
        let data = []
        fenxiaoStateOptions.value = []
        if (Object.keys(res.data).length) {
            for (let i in res.data) {
                let obj: any = {}
                obj.label = res.data[i]
                obj.value = i
                data.push(obj)
            }
            fenxiaoStateOptions.value = data
        }
    })
}
getAgentStatusFn()

// 重置搜索条件
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    agentTable.searchParam.keyword = ''
    agentTable.searchParam.agent_level = ''
    agentTable.searchParam.agent_time = []
    agentTable.searchParam.agent_status = ''
    formEl.resetFields()
    getAgentListFn()
}

const agentTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: [],
    searchParam: {
        keyword: '',
        agent_level: '',
        agent_time: [],
        agent_status: ''
    }
})

// 获取渠道代理商
const getAgentListFn = (page: number = 1) => {
    agentTable.loading = true
    agentTable.page = page

    const searchData = cloneDeep(agentTable.searchParam)
    getAgentList({
        page: agentTable.page,
        limit: agentTable.limit,
        ...searchData
    }).then((res: any) => {
        agentTable.data = res.data.data
        agentTable.total = res.data.total
        agentTable.loading = false
        setTablePageStorage(agentTable.page, agentTable.limit, searchData)
    })
}
getAgentListFn(getTablePageStorage(agentTable.searchParam).page)
// 选择分销商弹窗
const fenxiaoOfSelectPopupRef: any = ref(null)


/******************* 添加代理商等级 -start *****************************/
const addLevelFn = () => {
    const url = router.resolve({
        path: '/shop_fenxiao/agent/level/config'
    })
    window.open(url.href)
}
/******************* 添加代理商等级 -end *****************************/
/*************** 渠道代理商-start ***************/
let agentInfoRef = ref<FormInstance>()
const agentDialog = ref(false)
const isEditLevelDialog = ref(false)
const agentDialogData = ref({
    agent_level: '',
    member_id: '',
    member_name: '',
    status: ''
})
// 选择分销商
const selectFenxiaoFn = ()=>{
    fenxiaoOfSelectPopupRef.value.show()
}
// 选择分销商callback
const selectFenxiaoCallbackFn = (data: any)=>{
    agentDialogData.value.member_name = data.member.nickname || data.member.username
    agentDialogData.value.member_id = data.member_id
}
// 表单验证规则
const formRules = computed(() => {
    return {
        member_id:  [
            { required: true, message: t('selectFenxiaoPlaceholder'), trigger: 'blur' }
        ],
        agent_level: [
            { required: true, message: t('selectAgentLevelPlaceholder'), trigger: 'blur' }
        ]
    }
})
// 添加渠道代理商
const addEvent = ()=>{
    agentDialogData.value.agent_level = ''
    agentDialogData.value.member_id = ''
    agentDialogData.value.member_name = ''

    agentDialog.value = true
    isEditLevelDialog.value = false
}
// 编辑渠道代理商
const editEvent = (data: any)=>{
    agentDialogData.value.agent_level = data.agentLevel.level_id
    agentDialogData.value.member_id = data.member_id
    agentDialogData.value.member_name = data.member.nickname || data.member.username

    agentDialog.value = true
    isEditLevelDialog.value = true
}

const saveLoading = ref(false)
const saveAgent = async (formEl: FormInstance | undefined) => {
    if (saveLoading.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            saveLoading.value = true
            const data = agentDialogData.value
            const save = isEditLevelDialog.value ? editAgent : addAgent
            save(data).then(res => {
                saveLoading.value = false
                agentDialog.value = false
                getAgentListFn()
            }).catch(() => {
                saveLoading.value = false
            })
        }
    })
}
/*************** 渠道代理商-end ***************/

/*************** 修改代理商状态-start ***************/
let isStartRepeat = false
const spreadEvent = (data: any)=> {
    if (data.agent_status == 1) {
        freezeEvent(data.member_id)
    } else {
        normalEvent(data.member_id)
    }
}
const freezeEvent = (id) => {
    ElMessageBox.confirm(t('freezeAgentTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        if (isStartRepeat) return
        isStartRepeat = true
        let obj: any = {}
        obj.member_id = id
        obj.status = 2
        editAgentStatus(obj).then(() => {
            getAgentListFn()
            isStartRepeat = false
        }).catch(() => {
            isStartRepeat = false
        })
    })
}
//跳转会员详情
const toFenxiao = (id:number)=> {
    let routeData = router.resolve(`/shop_fenxiao/detail?id=${ id }`)
    window.open(routeData.href, ' blank')
}
const normalEvent = (id: any) => {
    ElMessageBox.confirm(t('normalAgentTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        if (isStartRepeat) return
        isStartRepeat = true
        let obj: any = {}
        obj.member_id = id
        obj.status = 1
        editAgentStatus(obj).then(() => {
            getAgentListFn()
            isStartRepeat = false
        }).catch(() => {
            isStartRepeat = false
        })
    })
}
/*************** 修改代理商状态-end ***************/
</script>

<style lang="scss" scoped></style>
