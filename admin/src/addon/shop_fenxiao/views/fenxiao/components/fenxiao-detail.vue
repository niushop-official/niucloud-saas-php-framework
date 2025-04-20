<template>
    <el-drawer v-model="showDialog" title="分销商详情" direction="rtl" :before-close="handleClose" class="member-detail-drawer">
        <div class="main-container" v-loading="loading">
            <el-tabs v-model="activeName" class="pb-[10px]" @tab-change="handleClick">
                <el-tab-pane label="分销商信息" name="fenxiaoInfo" />
                <el-tab-pane label="佣金账户" name="commission" />
                <el-tab-pane label="团队信息" name="team" />
            </el-tabs>

            <el-form class="page-form" :model="formData" label-width="100px" ref="formRef" label-position="left" v-if="activeName == 'fenxiaoInfo' && Object.keys(formData).length && Object.keys(formData.member).length">
                <div class="text-[14px] min-w-[110px] border-solid border-l-[3px] border-[var(--el-color-primary)] pl-[5px]">{{ t('baseInfo') }}</div>
                <div class="flex px-[30px] mt-[20px] mb-[20px]">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item :label="t('logo')">
                                <div class="input-width">
                                    <el-image v-if="formData.member && formData.member.headimg" class="w-[70px] h-[70px]" :src="img(formData.member.headimg)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[70px] h-[70px] rounded-full" src="@/app/assets/images/member_head.png" alt="">
                                            </div>
                                        </template>
                                    </el-image>
                                    <img class="w-[70px] h-[70px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('nickname')">
                                <div class="input-width">
                                    <span v-if="formData.member.nickname" :title="formData.member.nickname" class="multi-hidden">{{formData.member.nickname}}</span>
                                    <span v-else :title="formData.member.nickname" class="multi-hidden">{{formData.member.username}}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('mobile')">
                                <div class="input-width">
                                    <span>{{formData.member.mobile}}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                            <el-col :span="8">
                            <el-form-item :label="t('fenxiaoNo')">
                                <div class="input-width">
                                    <span>{{formData.fenxiao_no}}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('fenxiaoLevel')">
                                <div class="cursor-pointer price-wrap input-width" @click="editLevelEvent(row)">
                                    <span>{{formData.fenxiaoLevel.level_name || '--'}}</span>
                                    <el-icon class="ml-[5px]" :size="14"><EditPen /></el-icon>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('supFenxiao')">
                                <div class="cursor-pointer price-wrap input-width" @click="editSupEvent(row)">
                                    <span>{{formData.parentFenxiao?.nickname||formData.parentFenxiao?.username||'无'}}</span>
                                    <el-icon class="ml-[5px]" :size="14"><EditPen /></el-icon>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>

                <div class="text-[14px] min-w-[110px] border-solid border-l-[3px] border-[var(--el-color-primary)] pl-[5px]">{{ t('accountStatistics') }}</div>
                <div class="flex px-[30px] mt-[20px] mb-[20px]">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item :label="t('commission')">
                                <div class="input-width">
                                    <span>{{moneyFormat(formData.member.commission) }}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('commissionGet')">
                                <div class="input-width">
                                    <span>{{moneyFormat(formData.member.commission_get)}}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('taking')">
                                <div class="input-width">
                                    <span>{{moneyFormat(formData.member.commission_cash_outing)}}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('distributionCommission')">
                                <div class="input-width">
                                    <span>{{moneyFormat(formData.fenxiao_commission)}}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('agentCommission')">
                                <div class="input-width">
                                    <span>{{moneyFormat(formData.agent_commission)}}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('reward')">
                                <div class="input-width">
                                    <span>{{moneyFormat(formData.sale_commission)}}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('teamDividends')">
                                <div class="input-width">
                                    <span>{{moneyFormat(formData.team_commission)}}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('taskRewards')">
                                <div class="input-width">
                                    <span>{{moneyFormat(formData.task_commission)}}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div v-if="activeName == 'commission'">
                <el-table :data="fenxiaoAccount.data" size="large" v-loading="fenxiaoAccount.loading">
                    <template #empty>
                        <span>{{ !fenxiaoAccount.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column :label="t('accountMoney')" min-width="120">
                        <template #default="{ row }">
                            <div>{{ row.account_data }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('source')" min-width="120">
                        <template #default="{ row }">
                            <div>{{ row.from_type_name }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('accountSum')" min-width="120">
                        <template #default="{ row }">
                            <div>{{ row.account_sum }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="120"></el-table-column>
                    <el-table-column prop="memo" :label="t('memo')" min-width="120"></el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="fenxiaoAccount.page" v-model:page-size="fenxiaoAccount.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="fenxiaoAccount.total"
                        @size-change="getFenxiaoAccountFn()" @current-change="getFenxiaoAccountFn" />
                </div>
            </div>
            <div v-if="activeName == 'team'">
                <div class="flex mb-[10px] text-[14px]">
                    <span class="px-[30px] py-[10px] border-[1px] border-solid border-[#f1f1f1] cursor-pointer" :class="{'bg-[#F2F3F5] text-primary' : fenxiaoTeam.searchParam.type == 'direct' }" @click="tabsClick('direct')">直推</span>
                    <span class="px-[30px] py-[10px] border-[1px] border-solid border-[#f1f1f1] cursor-pointer" :class="{'bg-[#F2F3F5] text-primary' : fenxiaoTeam.searchParam.type == 'indirect' }" @click="tabsClick('indirect')">间推</span>
                </div>
                <el-table :data="fenxiaoTeam.data" size="large" v-loading="fenxiaoTeam.loading">
                    <template #empty>
                        <span>{{ !fenxiaoTeam.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column :label="t('accountInfo')" min-width="120">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                    <el-image v-if="row.headimg && row.headimg" class="w-[50px] h-[50px]" :src="img(row.headimg)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[50px] h-[50px] rounded-full" src="@/app/assets/images/member_head.png" alt="">
                                            </div>
                                        </template>
                                    </el-image>
                                    <img class="w-[50px] h-[50px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                                </div>
                                <div class="ml-2">
                                    <span v-if="row.nickname" :title="row.nickname" class="multi-hidden">{{row.nickname}}</span>
                                    <span v-else :title="row.nickname" class="multi-hidden">{{row.username}}</span>
                                    <span class="text-[12px]">{{row.mobile ? row.mobile : '--'}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('isFenxiao')" min-width="150">
                        <template #default="{ row }">
                            <div>{{ Object.keys(row.fenxiao).length ? '是' : '否'  }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('type')" min-width="150">
                        <template #default="{ row }">
                            <div>{{ row.is_direct ? '直推' : '间推'  }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('addTime')" min-width="150">
                        <template #default="{ row }">
                            <div>{{ row.fenxiao.create_time ? row.fenxiao.create_time : '--'  }}</div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="fenxiaoTeam.page" v-model:page-size="fenxiaoTeam.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="fenxiaoTeam.total"
                        @size-change="getFenxiaoTeamFn()" @current-change="getFenxiaoTeamFn" />
                </div>
            </div>
        </div>

        <!-- 编辑等级弹窗 -->
        <el-dialog v-model="fenxiaoLevelDialog" :title="t('editFenxiaoLevelTitle')" width="470px" :destroy-on-close="true" :close-on-click-modal="false">
            <div>
                <el-form-item :label="t('fenxiaoLevel')">
                    <el-select v-model="levelFormData.level_id" class="input-width" clearable :placeholder="t('fenxiaoLevelPlaceholder')">
                        <el-option v-for="item in levelList" :key="item.value" :label="item.level_name" :value="item.level_id" />
                    </el-select>
                    <span class="text-[var(--el-color-primary)] ml-[10px] cursor-pointer" @click="getFenxiaoLevelListFn(true)">刷新</span>
                    <span class="text-[var(--el-color-primary)] ml-[10px] cursor-pointer" @click="addLevelFn">添加等级</span>
                </el-form-item>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="fenxiaoLevelDialog=false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="fenxiaoLevelSubmit">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 选择分销商弹窗 -->
        <fenxiao-of-select-popup :title="t('editSupFenxiaoTitle')" ref="fenxiaoOfSelectPopupRef" :params="params" @load="selectFenxiaoCallbackFn" />
    </el-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { img, moneyFormat } from '@/utils/common'
import { getFenxiaoInfo, getFenxiaoAccount, getFenxiaoTeam, editFengxiao } from '@/addon/shop_fenxiao/api/fenxiao';
import { getFenxiaoLevelList } from '@/addon/shop_fenxiao/api/level'
import fenxiaoOfSelectPopup from '@/addon/shop_fenxiao/views/components/fenxiao-of-select-popup.vue'
import { cloneDeep } from 'lodash-es'

const showDialog = ref(false)
const loading = ref(false)
const router = useRouter()

const activeName = ref('fenxiaoInfo')
const formData: any = ref({})
let id = ''

const emit = defineEmits(['load'])

const handleClose = (done: () => void) => {
    emit('load');
    activeName.value = 'fenxiaoInfo';
    showDialog.value = false;
}

const handleClick = (data: any) => {
    activeName.value = data
}

// 佣金账户明细
const fenxiaoAccount = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: []
})
// 分销商团队
const fenxiaoTeam = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: [],
    searchParam: {
        type: 'direct'
    }
})
const getDetail = (id: number) => {
    loading.value = true
    getFenxiaoInfo(id).then((res: any) => {
        formData.value = res.data
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}

const getFenxiaoAccountFn = () => {
    fenxiaoAccount.loading = true
    getFenxiaoAccount({
        page: fenxiaoAccount.page,
        limit: fenxiaoAccount.limit,
        id
    }).then((res:any) => {
        fenxiaoAccount.data = res.data.data
        fenxiaoAccount.total = res.data.total
        fenxiaoAccount.loading = false
    }).catch(() => {
        fenxiaoAccount.loading = false
    })
}

const getFenxiaoTeamFn = (page: number = 1) => {
    fenxiaoTeam.loading = true
    fenxiaoTeam.page = page
    getFenxiaoTeam({
        page: fenxiaoTeam.page,
        limit: fenxiaoTeam.limit,
        ...fenxiaoTeam.searchParam,
        id
    }).then((res:any) => {
        fenxiaoTeam.data = res.data.data
        fenxiaoTeam.total = res.data.total
        fenxiaoTeam.loading = false
    }).catch(() => {
        fenxiaoTeam.loading = false
    })
}

const tabsClick = (data: any) => {
    fenxiaoTeam.searchParam.type = data
    getFenxiaoTeamFn()
}

const params:Record<string, any> = reactive({
    not_in: formData.parent,
    is_agent: 'all'
})
const resetFormInfo = () => {
    const data = cloneDeep(formData.value)
    levelFormData.id = data.member_id
    levelFormData.level_id = data.level_id
    levelFormData.parent = data.parent
    params.not_in = data.child_ids ? [data.parent,data.member_id,...data.child_ids] : [data.parent,data.member_id]
    levelFormData.status = data.status
}
/******************* 上级分销商弹框start *************************/
// 选择上级分销商弹框
const fenxiaoOfSelectPopupRef = ref<any>()
const editSupEvent = (row:any) => {
    resetFormInfo()
    fenxiaoOfSelectPopupRef.value?.show()
}
// 选择回调
const selectFenxiaoCallbackFn = (row: any) => {
    levelFormData.parent = row.member.member_id
    levelFormData.parent_name = row.member.nickname
    ElMessageBox.confirm(t('editSupFenxiaoTip'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        fenxiaoSubmit()
    })
}
/******************* 上级分销商弹框end *************************/

/******************* 分销商等级弹框start *************************/
const levelList = ref([])
const levelFormData: Record<string, any> = reactive({
    id: 0,
    level_id: null,
    parent: null,
    status: 1
})
// 获取分销等级
const getFenxiaoLevelListFn = (bool=false) => {
    getFenxiaoLevelList({
        page: 1,
        limit: 11
    }).then((res:any) => {
        levelList.value = res.data.data
        if(bool){
            ElMessage({
                message: t('refreshSuccess'),
                type: 'success'
            })
        }
    })
}
getFenxiaoLevelListFn()

const fenxiaoLevelDialog = ref(false)
const editLevelEvent = (data:any) => {
    resetFormInfo();
    fenxiaoLevelDialog.value = true
}

// 编辑分销等级回调
const fenxiaoLevelSubmit = () => {
    fenxiaoLevelDialog.value = false
    if (!levelFormData.level_id) {
        ElMessage.error(t('fenxiaoLevelPlaceholder'))
        return
    }
    fenxiaoSubmit()
}
const fenxiaoSubmit = () => {
    editFengxiao(levelFormData).then(() => {
        getDetail(id)
    })
}

// 跳转分销等级列表页面
const addLevelFn = () => {
    const routeData = router.resolve('/shop_fenxiao/management/level')
    window.open(routeData.href, '_blank')
}
/******************* 分销商等级弹框end *************************/

const setFormData = (row: any = null) => {
    id = row.id;
    getDetail(id)
    getFenxiaoAccountFn()
    getFenxiaoTeamFn()
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss">
.member-detail-drawer{
    width: 1000px !important;
}
</style>
