<template>
    <div class="main-container">
        <el-card class="card !border-none" shadow="never">

            <el-tabs v-model="activeName" @tab-change="tabChange">
                <el-tab-pane label="分销商" name="lists" />
                <el-tab-pane label="分销商申请" name="apply" />
            </el-tabs>

            <!-- 分销商 -->
            <div v-if="activeName == 'lists'">
                <div class="flex justify-between items-center">
                    <span class="text-page-title">{{ pageName }}</span>
                    <el-button type="primary" @click="addEvent">
                        {{ t('addFenxiao') }}
                    </el-button>
                </div>
                <el-card class="card my-[10px] !border-none table-search-wrap" shadow="never">
                    <el-form :inline="true" :model="fenxiaoTable.searchParam" ref="searchFormRef">
                        <el-form-item :label="t('fenxiaoName')" prop="keyword">
                            <el-input v-model.trim="fenxiaoTable.searchParam.keyword" :placeholder="t('fenxiaoNamePlaceholder')" maxlength="60" />
                        </el-form-item>
                        <el-form-item :label="t('fenxiaoLevel')" prop="level_id">
                            <el-select v-model="fenxiaoTable.searchParam.level_id" class="input-width" clearable :placeholder="t('fenxiaoLevelPlaceholder')">
                                <el-option v-for="item in config.levelList" :key="item.value" :label="item.level_name" :value="item.level_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="t('fenxiaoState')" prop="status">
                            <el-select v-model="fenxiaoTable.searchParam.status" class="input-width" clearable :placeholder="t('fenxiaoStatePlaceholder')">
                                <el-option v-for="item in config.statusList" :key="item.value" :label="item.label" :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="t('createTime')" prop="create_time">
                            <el-date-picker v-model="fenxiaoTable.searchParam.create_time" type="datetimerange"
                                value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                                :end-placeholder="t('endDate')" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getFenxiaoPageFn()">{{ t('search') }}</el-button>
                            <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-table :data="fenxiaoTable.data" size="large" v-loading="fenxiaoTable.loading" ref="goodsListTableRef" @selection-change="handleSelectionChange">
                    <template #empty>
                        <span>{{ !fenxiaoTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="goods_id" :label="t('fenxiaoInfo')" min-width="200">
                        <template #default="{ row }">
                            <div v-if="row.member" class="flex items-center cursor-pointer" @click="toMember(row.member_id)">
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
                                    <span v-if="row.member.nickname" :title="row.member.nickname" class="multi-hidden">{{row.member.nickname}}</span>
                                    <span v-else :title="row.member.nickname" class="multi-hidden">{{row.member.username}}</span>
                                    <span class="text-primary text-[12px]">{{row.member.mobile}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('fenxiaoLevel')" min-width="170">
                        <template #default="{ row }">
                            <div v-if="row.fenxiaoLevel" class="cursor-pointer price-wrap" @click="editLevelEvent(row)">
                                <span>{{row.fenxiaoLevel.level_name}}</span>
                                <el-icon class="ml-[5px]" :size="14"><EditPen /></el-icon>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('supFenxiao')" min-width="170">
                        <template #default="{ row }">
                            <div  class="cursor-pointer stock-wrap" @click="editSupEvent(row)">
                                <span>{{row.parentFenxiao?.nickname||row.parentFenxiao?.username||'无'}}</span>
                                <el-icon class="ml-[5px]" :size="14"><EditPen /></el-icon>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('commissionAccount')" min-width="150">
                        <template #default="{ row }">
                            <div class="flex flex-col text-[28rpx]" v-if="row.member">
                                <span>当前佣金：{{moneyFormat(row.member.commission)}}</span>
                                <span>已提现：{{moneyFormat(row.member.commission_get - row.member.commission)}}</span>
                            </div>
                        </template>
                    </el-table-column>
                   <!--- <el-table-column :label="t('teamSize')" min-width="150">
                        <template #default="{ row }">
                            <div class="flex flex-col text-[28rpx]">
                                <span>直推：200</span>
                                <span>间推：200</span>
                            </div>
                        </template>
                    </el-table-column>-->
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="120">
                        <template #default="{ row }">
                            {{row.create_time}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort" :label="t('currentState')" min-width="100">
                        <template #default="{ row }">
                            {{ row.status==0?'待审核':row.status==1?'正常':row.status==-1?'已冻结':'已拒绝' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="detailEvent(row)">{{ t('detail') }}</el-button>
                            <el-button v-if="row.status===1" type="primary" link @click="freezeOrRestoreEvent(row)">{{ t('freeze') }}</el-button>
                            <el-button v-if="row.status===-1" type="primary" link @click="freezeOrRestoreEvent(row)">{{ t('restore') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="fenxiaoTable.page" v-model:page-size="fenxiaoTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="fenxiaoTable.total"
                        @size-change="getFenxiaoPageFn()" @current-change="getFenxiaoPageFn" />
                </div>
            </div>
            <!-- 分销商申请 -->
            <div v-if="activeName == 'apply'">
                <div class="flex justify-between items-center">
                    <span class="text-page-title">分销商申请</span>
                </div>
                <el-card class="card my-[10px] !border-none table-search-wrap" shadow="never">
                    <el-form :inline="true" :model="applyTable.searchParam" ref="applySearchFormRef">
                        <el-form-item :label="t('memberInfo')" prop="keyword">
                            <el-input v-model.trim="applyTable.searchParam.keyword" :placeholder="t('memberInfoPlaceholder')" maxlength="60" />
                        </el-form-item>
                        <el-form-item :label="t('applyTime')" prop="create_time">
                            <el-date-picker v-model="applyTable.searchParam.create_time" type="datetimerange"
                                value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                                :end-placeholder="t('endDate')" />
                        </el-form-item>
                        <el-form-item :label="t('applyState')" prop="status">
                            <el-select v-model="applyTable.searchParam.status" class="input-width" clearable :placeholder="t('applyStatePlaceholder')">
                                <el-option v-for="(value, key) in config.applyStatus" :key="value" :label="value" :value="key" />
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="loadApplyList()">{{ t('search') }}</el-button>
                            <el-button @click="applyResetForm(applySearchFormRef)">{{ t('reset') }}</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-table :data="applyTable.data" size="large" v-loading="applyTable.loading" ref="goodsListTableRef">
                    <template #empty>
                        <span>{{ !applyTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="goods_id" :label="t('memberInfo')" min-width="200">
                        <template #default="{ row }">
                            <div v-if="row.member" class="flex items-center cursor-pointer" @click="toMember(row.member_id)">
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
                                    <span v-if="row.member.nickname" :title="row.member.nickname" class="multi-hidden">{{row.member.nickname}}</span>
                                    <span v-else :title="row.member.nickname" class="multi-hidden">{{row.member.username}}</span>
                                    <span class="text-primary text-[12px]">{{row.member.mobile}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('supReferrer')" min-width="120">
                        <template #default="{ row }">
                            <div class="stock-wrap">
                                <span>{{ Object.keys(row.parent_fenxiao).length ? row.parent_fenxiao.nickname : '无' }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('consumptionNumber')" min-width="150">
                        <template #default="{ row }">
                            <div class="flex flex-col text-[28rpx]">{{row.order_num}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('consumptionMoney')" min-width="150">
                        <template #default="{ row }">
                            <div class="flex flex-col text-[28rpx]">{{moneyFormat(row.order_money_sum)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="t('applyTime')" min-width="120"/>
                    <el-table-column prop="status_name" :label="t('currentState')" min-width="100" />
                    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="applyDetailEvent(row)">{{ t('applyDetail') }}</el-button>
                            <template v-if="row.status===1" >
                                <el-button type="primary" link @click="agreeFengxiaoFn(row.apply_id)">{{t('applyPass')}}</el-button>
                                <el-button type="primary" link @click="refuseFengxiaoFn(row.apply_id)">{{t('applyRefuse')}}</el-button>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="applyTable.page" v-model:page-size="applyTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="applyTable.total"
                        @size-change="loadApplyList()" @current-change="loadApplyList" />
                </div>
            </div>
            <!-- 分销商申请详情弹窗 -->
            <el-dialog v-model="applyDetailDialog" :title="t('applyDetail')" width="850px" :destroy-on-close="true">
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="t('logo')">
                            <div class="input-width">
                                <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                    <el-image v-if="applyData.member && applyData.member.headimg" class="w-[50px] h-[50px]" :src="img(applyData.member.headimg)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[50px] h-[50px] rounded-full" src="@/app/assets/images/member_head.png" alt="">
                                            </div>
                                        </template>
                                    </el-image>
                                    <img class="w-[50px] h-[50px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="applyData.member">
                        <el-form-item :label="t('nickname')">
                            <div class="input-width cursor-pointer" @click="toMember(applyData.member_id)">
                                <span v-if="applyData.member.nickname" :title="applyData.member.nickname" class="multi-hidden text-primary ">{{applyData.member.nickname}}</span>
                                 <span v-else :title="applyData.member.nickname" class="multi-hidden text-primary">{{applyData.member.username}}</span>
                             </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="t('supFenxiao')">
                            <div class="input-width" v-if="applyData.fenxiaoMember">{{ applyData.fenxiaoMember.is_fenxiao===1 ? applyData.fenxiaoMember.parentMember?.nickname:'无'}} </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="t('consumptionNumber')">
                            <div class="input-width" >{{applyData.order_num}} </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="t('consumptionMoney')">
                            <div class="input-width" >{{moneyFormat(applyData.order_money_sum)}} </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="t('applyTime')">
                            <div class="input-width" >{{applyData.create_time}} </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="t('currentState')">
                            <div class="input-width" >{{applyData.status_name}} </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="applyData.status == 3">
                        <el-form-item :label="t('refuseReason')">
                            <div class="input-width">{{applyData.refuse_reason }} </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-dialog>
            <!-- 编辑等级弹窗 -->
            <el-dialog v-model="fenxiaoLevelDialog" :title="t('editFenxiaoLevelTitle')" width="470px" :destroy-on-close="true" :close-on-click-modal="false">
                <div>
                    <el-form-item :label="t('fenxiaoLevel')">
                        <el-select v-model="formData.level_id" class="input-width" clearable :placeholder="t('fenxiaoLevelPlaceholder')">
                            <el-option v-for="item in config.levelList" :key="item.value" :label="item.level_name" :value="item.level_id" />
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
            <!-- 分销商详情弹窗 -->
            <fenxiao-detail ref="fenxiaoDetailDialog" @load="getFenxiaoPageFn"></fenxiao-detail>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import { img, moneyFormat ,setTablePageStorage,getTablePageStorage} from '@/utils/common'
import { cloneDeep } from 'lodash-es'
import { getFenxiaoPage, editFengxiao, getFenxiaoApplayPage, agreeFengxiao, refuseFengxiao, getFenxiaoApplayStatus } from '@/addon/shop_fenxiao/api/fenxiao'
import { getFenxiaoLevelList } from '@/addon/shop_fenxiao/api/level'
import fenxiaoOfSelectPopup from '@/addon/shop_fenxiao/views/components/fenxiao-of-select-popup.vue'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import fenxiaoDetail from '@/addon/shop_fenxiao/views/fenxiao/components/fenxiao-detail.vue'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const config :Record<string, any> = reactive({
    levelList: [],
    statusList: [
        { label: '正常', value: 1 },
        { label: '已冻结', value: -1 }
    ],
    applyStatus: []
})
// 弹窗
const fenxiaoLevelDialog = ref(false)

const fenxiaoTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: [{}],
    searchParam: {
        keyword: '',
        level_id: '',
        status: '',
        create_time: []
    }
})

const activeName = ref('lists')

// 添加分销商
const addEvent = () => {
    router.push('/shop_fenxiao/edit')
}
const getFenxiaoPageFn = (page: number = 1) => {
    fenxiaoTable.loading = true
    fenxiaoTable.page = page
    getFenxiaoPage({
        page: fenxiaoTable.page,
        limit: fenxiaoTable.limit,
        ...fenxiaoTable.searchParam
    }).then((res:any) => {
        fenxiaoTable.data = res.data.data
        fenxiaoTable.total = res.data.total
        fenxiaoTable.loading = false
        setTablePageStorage(fenxiaoTable.page, fenxiaoTable.limit, fenxiaoTable.searchParam)
    }).catch(() => {
        fenxiaoTable.loading = false
    })
}
getFenxiaoPageFn(getTablePageStorage(fenxiaoTable.searchParam).page)
// 获取分销等级
const getFenxiaoLevelListFn = (bool=false) => {
    getFenxiaoLevelList({
        page: 1,
        limit: 11
    }).then((res:any) => {
        config.levelList = res.data.data
        if(bool){
            ElMessage({
                message: t('refreshSuccess'),
                type: 'success'
            })
        }
    })
}
getFenxiaoLevelListFn()

//跳转分销等级列表页面
const addLevelFn = ()=>{
    const routeData = router.resolve('/shop_fenxiao/management/level')
    window.open(routeData.href)
}
// 获取分销商申请状态
const getFenxiaoApplayStatusFn = () => {
    getFenxiaoApplayStatus().then(res => {
        config.applyStatus = res.data
    })
}
getFenxiaoApplayStatusFn()
const formData: Record<string, any> = reactive({
    id: 0,
    level_id: null,
    parent: null,
    status: 1
})
const params:Record<string, any> = reactive({
    not_in: formData.parent,
    is_agent: 'all'
})
const setFormData = (value:any) => {
    const data = cloneDeep(value)
    formData.id = data.member_id
    formData.level_id = data.level_id
    formData.parent = data.parent
    params.not_in = data.child_ids ? [data.parent,data.member_id,...data.child_ids] : [data.parent,data.member_id]
    formData.status = data.status
}
// 打开分销商等级弹框
const editLevelEvent = (data:any) => {
    setFormData(data)
    fenxiaoLevelDialog.value = true
}
// 编辑分销等级回调
const fenxiaoLevelSubmit = () => {
    fenxiaoLevelDialog.value = false
    if (!formData.level_id) {
        ElMessage.error(t('fenxiaoLevelPlaceholder'))
        return
    }
    fenxiaoSubmit()
}
// 选择上级分销商弹框
const fenxiaoOfSelectPopupRef = ref<any>()
const editSupEvent = (row:any) => {
    setFormData(row)
    fenxiaoOfSelectPopupRef.value?.show()
}
// 选择回调
const selectFenxiaoCallbackFn = (row: any) => {
    formData.parent = row.member.member_id
    formData.parent_name = row.member.nickname
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
// 冻结
const freezeOrRestoreEvent = (row:any) => {
    setFormData(row)
    ElMessageBox.confirm(formData.status === 1 ? t('freezeTip') : t('restoreTip'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        formData.status = formData.status === 1 ? -1 : 1
        fenxiaoSubmit()
    })
}
const fenxiaoSubmit = () => {
    editFengxiao(formData).then(() => {
        getFenxiaoPageFn()
    })
}
// 查看分销商详情
const fenxiaoDetailDialog: Record<string, any> | null = ref(null)
const detailEvent = (row:any) => {
    setFormData(row)

    let data = {id: formData.id};
    fenxiaoDetailDialog.value.setFormData(data);
    fenxiaoDetailDialog.value.showDialog = true
}
// 重置查询
const searchFormRef = ref()
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    getFenxiaoPageFn()
}
// ******************* 分销商申请 *************************
const applyTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: [{}],
    searchParam: {
        keyword: '',
        create_time: [],
        status: ''
    }
})

const loadApplyList = (page: number = 1) => {
    applyTable.loading = true
    applyTable.page = page
    getFenxiaoApplayPage({
        page: applyTable.page,
        limit: applyTable.limit,
        ...applyTable.searchParam
    }).then((res:any) => {
        applyTable.data = res.data.data
        applyTable.total = res.data.total
        applyTable.loading = false
        setTablePageStorage(applyTable.page, applyTable.limit, applyTable.searchParam)
    }).catch(() => {
        applyTable.loading = false
    })
}
loadApplyList(getTablePageStorage(applyTable.searchParam).page)
// 重置查询
const applySearchFormRef = ref()
const applyResetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadApplyList()
}
// 跳转会员详情
const toMember = (id:number) => {
    const routeData = router.resolve(`/member/detail?id=${id}`)
    window.open(routeData.href, '_blank')
}
// 分销商申请详情
const applyDetailDialog = ref(false)
const applyData = ref({})
const applyDetailEvent = (row:any) => {
    applyData.value = row
    applyDetailDialog.value = true
}
// 审核通过
const agreeFengxiaoFn = (apply_id:number) => {
    ElMessageBox.confirm(t('applyPassTip'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        agreeFengxiao(apply_id).then(() => {
            loadApplyList()
        })
    })
}
// 审核拒绝
const refuseFengxiaoFn = (apply_id:number) => {
    ElMessageBox.prompt(t('applyRefuseTip'), t('warning'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        inputType: 'textarea',
        inputPlaceholder: t('applyRefusePlaceholder'),
        inputErrorMessage: t('applyRefusePlaceholder'),
        inputValidator: (value) => {
            if (!value) {
                return false
            } else if (value.length > 100) {
                return t('applyRefuseLength')
            }
        }
    }).then(({ value }) => {
        refuseFengxiao(apply_id, value).then(() => {
            loadApplyList()
        })
    }).catch(() => {
    })
}

// tab切换
const tabChange = (data: any)=>{
    if(data == 'lists'){
        getFenxiaoPageFn();
    }else if(data == 'apply'){
        loadApplyList();
    }
}
</script>

<style lang="scss" scoped></style>
