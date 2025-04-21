<template>
	<div class="main-container p-4">
		<el-tabs v-model="activeName" class="demo-tabs" @tab-change="tabChange">
            <el-tab-pane label="股东" name="lists" />
            <!-- <el-tab-pane label="股东申请" name="apply" /> -->
        </el-tabs>

        <!-- 股东列表 -->
        <div v-if="activeName == 'lists'">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addShareholder') }}
                </el-button>
            </div>
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="fenxiaoTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('shareholderName')" prop="search">
                        <el-input v-model="fenxiaoTable.searchParam.search" :placeholder="t('shareholderNamePlaceholder')" maxlength="60" />
                    </el-form-item>
                    <el-form-item :label="t('shareholderLevel')" prop="level_id">
                        <el-select v-model="fenxiaoTable.searchParam.level_id"  clearable :placeholder="t('shareholderLevelPlaceholder')" style="width: 150px;">
                            <el-option v-for="item in config.leveList" :key="item.value" :label="item.level_name" :value="item.level_id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('shareholderState')" prop="status">
                        <el-select v-model="fenxiaoTable.searchParam.status"  clearable :placeholder="t('shareholderStatePlaceholder')" style="width: 150px;">
                            <el-option v-for="item in config.statusList" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
						<el-date-picker v-model="fenxiaoTable.searchParam.create_time" type="datetimerange"
							value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
							:end-placeholder="t('endDate')" />
					</el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="getShareholderPageFn()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-table :data="fenxiaoTable.data" size="large" v-loading="fenxiaoTable.loading" ref="goodsListTableRef" @selection-change="handleSelectionChange">
                <template #empty>
                    <span>{{ !fenxiaoTable.loading ? t('emptyData') : '' }}</span>
                </template>
                <!-- <el-table-column type="selection" width="55" /> -->

                <el-table-column prop="shareholder_id" :label="t('shareholderID')" min-width="80"  />

                <el-table-column prop="goods_id" :label="t('shareholderInfo')" min-width="200">
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

                <!-- 等级 -->
                <el-table-column :label="t('shareholderLevel')" min-width="170">
                    <template #default="{ row }">
                        <div v-if="row.shareholderLevel" class="cursor-pointer price-wrap" @click="editLevelEvent(row)">
                            <span>{{row.shareholderLevel.level_name}}</span>
                            <el-icon class="ml-[5px]" :size="14"><EditPen /></el-icon>
                        </div>
                    </template>
                </el-table-column>

               
                <el-table-column :label="t('amount')" min-width="150">
                    <template #default="{ row }">
                        <div class="flex flex-col text-[28rpx]" v-if="row.member">
                            <span>总分红：{{ row.amount }}</span>
                            <!-- <span>当前佣金：{{moneyFormat(row.member.commission)}}</span> -->
                            <!-- <span>已提现：{{moneyFormat(row.member.commission_get - row.member.commission)}}</span> -->
                        </div>
                    </template>
                </el-table-column>
               
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
                        <!-- <el-button type="primary" link @click="detailEvent(row.shareholder_id)">{{ t('detail') }}</el-button> -->
                        <el-button v-if="row.status===1" type="primary" link @click="freezeOrRestoreEvent(row)">{{ t('freeze') }}</el-button>
                        <el-button v-if="row.status===-1" type="primary" link @click="freezeOrRestoreEvent(row)">{{ t('restore') }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="fenxiaoTable.page" v-model:page-size="fenxiaoTable.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="fenxiaoTable.total"
                    @size-change="getShareholderPageFn()" @current-change="getShareholderPageFn" />
            </div>
        </div>
        
       
        <!-- 编辑等级弹窗 -->
        <el-dialog v-model="fenxiaoLevelDialog" :title="t('editShareholderLevelTitle')" width="470px" :close-on-press-escape="false" :destroy-on-close="true" :close-on-click-modal="false">
            <div>
                <el-form-item :label="t('shareholderLevel')">
                    <el-select v-model="formData.level_id" class="input-width" clearable :placeholder="t('shareholderLevelPlaceholder')">
                        <el-option v-for="item in config.leveList" :key="item.value" :label="item.level_name" :value="item.level_id" />
                    </el-select>
                    <span class="text-[var(--el-color-primary)] ml-[10px] cursor-pointer" @click="getShareholderLevelListFn(true)">刷新</span>
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
       
	</div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import { img, moneyFormat } from '@/utils/common'
import { cloneDeep } from 'lodash-es'
import { getShareholderPage, editShareholder } from '@/addon/ly_shareholder/api/shareholder'
import { getShareholderLevelList } from '@/addon/ly_shareholder/api/level'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const config :Record<string, any> = reactive({
    leveList: [],
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
        search: '',
        level_id: '',
        status: '',
        create_time: []
    }
})

const activeName = ref('lists')

// 添加股东
const addEvent = () => {
    router.push('/ly_shareholder/edit')
}
const getShareholderPageFn = (page: number = 1) => {
    fenxiaoTable.loading = true
    fenxiaoTable.page = page
    console.log('Search parameters:', fenxiaoTable.searchParam);
    getShareholderPage({
        page: fenxiaoTable.page,
        limit: fenxiaoTable.limit,
        ...fenxiaoTable.searchParam
    }).then((res:any) => {
        fenxiaoTable.data = res.data.data
        fenxiaoTable.total = res.data.total
        fenxiaoTable.loading = false
    }).catch(() => {
        fenxiaoTable.loading = false
    })
}
getShareholderPageFn()
// 获取股东等级
const getShareholderLevelListFn = (bool=false) => {
    getShareholderLevelList({
        page: 1,
        limit: 11
    }).then((res:any) => {
        config.leveList = res.data.data
        if(bool){
            ElMessage({
                message: t('refreshSuccess'),
                type: 'success'
            })
        }
    })
}
getShareholderLevelListFn()

//跳转股东等级列表页面
const addLevelFn = ()=>{
    const routeData = router.resolve('/ly_shareholder/shareholder_level')
    window.open(routeData.href)
}

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
    // formData.parent = data.parent
    params.not_in = [data.parent,data.member_id]
    formData.status = data.status
}
// 打开股东等级弹框
const editLevelEvent = (data:any) => {
    setFormData(data)
    fenxiaoLevelDialog.value = true
}
// 编辑股东等级回调
const fenxiaoLevelSubmit = () => {
    fenxiaoLevelDialog.value = false
    if (!formData.level_id) {
        ElMessage.error(t('shareholderLevelPlaceholder'))
        return
    }
    fenxiaoSubmit()
}
// 选择上级弹框
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
    editShareholder(formData).then(() => {
        getShareholderPageFn()
    })
}
// 查看股东详情
const detailEvent = (row:any) => {
    setFormData(row)
    router.push('/ly_shareholder/detail?shareholder_id=' + formData.id)
}
// 重置查询
const searchFormRef = ref()
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    getShareholderPageFn()
}



// 重置查询

// 跳转会员详情
const toMember = (id:number) => {
    const routeData = router.resolve(`/member/detail?id=${id}`)
    window.open(routeData.href, '_blank')
}




// tab切换
const tabChange = (data)=>{
    if(data == 'lists'){
        getShareholderPageFn();
    }
}
</script>

<style lang="scss" scoped></style>
